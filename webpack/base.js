import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const ROOT_DIR = '..'
const SRC_DIR = './src'

// https://github.com/photonstorm/phaser#webpack
// https://github.com/photonstorm/phaser/issues/1974#issuecomment-186923141
const PHASER = function() {
  const dir = './node_modules/phaser/build/custom'
  const phaser = path.resolve(dir, 'phaser-split.min.js')
  const pixi = path.resolve(dir, 'pixi.min.js')
  const p2 = path.resolve(dir, 'p2.min.js')

  return {
    loaders: [
      { test: pixi, loader: 'script' },
      { test: p2, loader: 'script' }
    ],
    aliases: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}()

module.exports = {
  context: path.resolve(__dirname, ROOT_DIR),
  entry: SRC_DIR,
  output: {
    path: path.resolve(__dirname, ROOT_DIR, 'dist/www'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_DIR, 'index.html')
    })
  ],
  module: {
    preLoaders: [{ test: /\.js$/, loader: 'source-map-loader' }],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        // Override ../.babelrc which is used by gulpfile.babel.js.
        presets: 'es2015-webpack',
        query: {
          only: SRC_DIR
        }
      }
    ].concat(PHASER.loaders)
  },
  resolve: {
    alias: PHASER.aliases
  }
}
