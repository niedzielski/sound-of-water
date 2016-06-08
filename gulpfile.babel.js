/// <reference path="typings/globals/browserify/index.d.ts" />
/// <reference path="typings/globals/browser-sync/index.d.ts" />
/// <reference path="typings/globals/del/index.d.ts" />
/// <reference path="typings/globals/gulp/index.d.ts" />
/// <reference path="typings/globals/gulp-cached/index.d.ts" />
/// <reference path="typings/globals/gulp-if/index.d.ts" />
/// <reference path="typings/globals/gulp-uglify/index.d.ts" />
/// <reference path="typings/globals/gulp-util/index.d.ts" />
/// <reference path="typings/globals/minimist/index.d.ts" />
/// <reference path="typings/globals/node/index.d.ts" />
/// <reference path="typings/globals/vinyl-source-stream/index.d.ts" />

// Most of these requires should appear only in devDependencies since this is a
// build script.
/* eslint-disable node/no-unpublished-require */
const babelify = require('babelify')
const browserify = require('browserify')
const browserSync = require('browser-sync')
const cache = require('gulp-cached')
const del = require('del')
const eslint = require('gulp-eslint')
const eslintThreshold = require('gulp-eslint-threshold')
const exorcist = require('exorcist')
const flow = require('gulp-flowtype')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const gutil = require('gulp-util')
const jsonlint = require('gulp-jsonlint')
const parseArgs = require('minimist')
const path = require('path')
const source = require('vinyl-source-stream')
const uglify = require('gulp-uglify')
/* eslint-enable node/no-unpublished-require */

const SRC_DIR = './src'
const JS_DIR = path.resolve(SRC_DIR, 'js')
const STATIC_DIR = path.resolve(SRC_DIR, 'static')
const DIST_DIR = './dist'
const DIST_WWW_DIR = path.resolve(DIST_DIR, 'www')

const prod = parseArgs(process.argv.slice(2)).prod

gulp.task('default', ['serveDbg'])

gulp.task('serveDbg', ['build'], () => {
  browserSync({server: {baseDir: DIST_WWW_DIR}, open: false})

  gulp.watch(path.resolve(STATIC_DIR, '**'),
    () => copyStatic().pipe(browserSync.stream()))
  gulp.watch(path.resolve(JS_DIR, '**'),
    () => typecheck()
            .pack()
            .pipe(browserSync.stream()))
})

gulp.task('build', ['typecheck', 'copyStatic', 'pack'])

gulp.task('copyStatic', copyStatic)
function copyStatic() {
  return gulp.src(path.resolve(STATIC_DIR, '**'))
    .pipe(gulp.dest(DIST_WWW_DIR))
}

gulp.task('pack', pack)
function pack() {
  const bundleFile = 'bundle.js'
  const sourceMapFile = path.resolve(DIST_WWW_DIR, bundleFile, '.map')
  return browserify({entries: JS_DIR, debug: !prod})
    .transform(babelify)
    .bundle()
    .pipe(gulpif(!prod, exorcist(sourceMapFile)))
    .pipe(source(bundleFile))
    .pipe(gulpif(prod, uglify()))
    .pipe(gulp.dest(DIST_WWW_DIR))
}

gulp.task('clean', () => del(DIST_DIR))

gulp.task('lint', ['eslint', 'jsonlint'])

gulp.task('typecheck', typecheck)
function typecheck() {
  return gulp.src([path.resolve(JS_DIR, '**.js'), '*.js', '.*.js'])
    .pipe(flow({
      // todo: enable once https://github.com/facebook/flow/issues/869 is fixed.
      all: false
    }))
}

gulp.task('eslint', () =>
  gulp.src([path.resolve(JS_DIR, '**.js'), '*.js', '.*.js'])
    .pipe(cache('eslint'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result(result => {
      if (result.warningCount || result.errorCount) {
        Reflect.deleteProperty(cache.caches.eslint,
          path.resolve(result.filePath))
      }
    }))
    .pipe(eslint.failAfterError())
    .pipe(eslintThreshold.afterWarnings(0, count => {
      throw new gutil.PluginError('ESLint', `${count} warnings`)
    }))
)

gulp.task('jsonlint', () =>
  gulp.src([path.resolve(SRC_DIR, '**.json'), '*.json'])
    .pipe(jsonlint())
    .pipe(jsonlint.reporter())
)