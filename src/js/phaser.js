/// <reference path="../../node_modules/phaser/typescript/phaser.comments.d.ts" />

// https://github.com/photonstorm/phaser#browserify--cjs
window.PIXI = require('phaser/build/custom/pixi')
window.p2 = require('phaser/build/custom/p2')
// window.Phaser = require('phaser/build/custom/phaser-split')

module.exports = require('phaser')