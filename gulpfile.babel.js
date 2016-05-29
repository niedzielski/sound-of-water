/* eslint-disable node/no-unpublished-import */
// Most of these dependencies should appear only in devDependencies since this
// is a build script.
import WebpackDevCfg from './webpack/dev'
import del from 'del'
import eslint from 'gulp-eslint'
import eslintThreshold from 'gulp-eslint-threshold'
import gulp from 'gulp'
import jsonlint from 'gulp-jsonlint'
import path from 'path'
import webpackStream from 'webpack-stream'
/* eslint-enable node/no-unpublished-import */

const SRC_DIR = './src'
const WEBPACK_DIR = './webpack'
const DIST_DIR = './dist'
const DIST_WWW_DIR = path.resolve(DIST_DIR, 'www')
const JS_FILES = [path.resolve(SRC_DIR, '**.js'),
  path.resolve(WEBPACK_DIR, '**.js'), '.eslintrc.js', '*.js']
const JSON_FILES = [path.resolve(SRC_DIR, '**.json'), '*.json']

gulp.task('lint', ['jsonlint', 'jslint'])

gulp.task('jsonlint', () =>
  gulp
    .src(JSON_FILES)
    .pipe(jsonlint())
    .pipe(jsonlint.reporter())
)

gulp.task('jslint', () =>
  gulp
    .src(JS_FILES)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslintThreshold.afterWarnings(0, warnings => {
      throw new Error(`${warnings} ESLint warnings`)
    }))
)

gulp.task('clean', () =>
  del(DIST_DIR)
)

gulp.task('default', ['pack:dev'])

gulp.task('pack:dev', bundleTask(WebpackDevCfg))

/** @param {object} cfg
    @return {function} */
function bundleTask(cfg) {
  return () =>
    gulp
      .src(SRC_DIR)
      .pipe(webpackStream(cfg))
      .pipe(gulp.dest(DIST_WWW_DIR))
}