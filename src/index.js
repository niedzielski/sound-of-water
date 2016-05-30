const Phaser = require('./phaser')
const scene = require('./scene')

/** @type {Phaser.Game} */
let game

/** @return {void} */
(function main() {
  game = new Phaser.Game({width: '100%', height: '100%', renderer: Phaser.AUTO,
    parent: '', state: {preload: onPreload, update: scene.update},
    transparent: false, antialias: false})
})()

/** @return {void} */
function onPreload() {
  // Don't antialias canvas primitives.
  Phaser.Canvas.setImageRenderingCrisp(game.canvas)

  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
  game.scale.setResizeCallback(onResize, null)

  // Force initial frame to scale.
  resize(game)

  scene.preload(game)
}

/**
 * @arg {Phaser.Game} game
 * @return {void}
 */
function onResize(game) {
  // todo: fix this hack. Without a threshold, this callback is invoked in an
  //       infinite loop. It seems to have to do with the game size being larger
  //       than the screen area. However, I've not had much luck with overflow
  //       hidden or scrollbars disabled. Possibly related to
  //       https://github.com/photonstorm/phaser/issues/1400. If a proper fix
  //       cannot be made, this should probably use a timeout instead (maybe a
  //       multiple of the internal timeout).
  const threshold = 20
  const deltaWidth = Math.abs(window.innerWidth - game.width)
  const deltaHeight = Math.abs(window.innerHeight - game.height)
  const delta = deltaWidth + deltaHeight
  console.log(`onResize delta=${delta}`) // eslint-disable-line no-console
  if (delta > threshold) {
    resize()
  }
}

/** @return {void} */
function resize() {
  scaleGameToSceenHeight()
  scene.resizeToScreenWidth()
  resizeGameToScene()
  resetCameraBoundsToScreen()
}

/** @return {void} */
function resizeGameToScene() {
  game.scale.setGameSize(scene.width, scene.height)
}

/** @return {void} */
function scaleGameToSceenHeight() {
  const scale = window.innerHeight / scene.height
  game.scale.setUserScale(scale, scale)
}

/** @return {void} */
function resetCameraBoundsToScreen() {
  const topLeft = new Phaser.Point(-scene.width / 2, -scene.height / 2)
  game.camera.bounds = new Phaser.Rectangle(topLeft.x, topLeft.y, scene.width,
    scene.height)
}