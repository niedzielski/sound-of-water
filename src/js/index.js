// @flow

const
  Phaser = require('./phaser'),
  scene = require('./scene')

let game: ?Phaser.Game

(function main(): void {
  game = new Phaser.Game({width: '100%', height: '100%', renderer: Phaser.AUTO,
    parent: '', state: {preload: onPreload, update: scene.update},
    transparent: false, antialias: false})
})()

function onPreload(): void {
  // Don't antialias canvas primitives.
  Phaser.Canvas.setImageRenderingCrisp(game.canvas)

  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
  game.scale.setResizeCallback(onResize)

  // Force initial frame to scale.
  resize(game)

  scene.preload(game)
}

function onResize(game): void {
  // todo: fix this hack. Without a threshold, this callback is invoked in an
  //       infinite loop. It seems to have to do with the game size being larger
  //       than the screen area. However, I've not had much luck with overflow
  //       hidden or scrollbars disabled. Possibly related to
  //       https://github.com/photonstorm/phaser/issues/1400. If a proper fix
  //       cannot be made, this should probably use a timeout instead (maybe a
  //       multiple of the internal timeout).
  const
    threshold: number = 20,
    deltaWidth: number = Math.abs(window.innerWidth - game.width),
    deltaHeight: number = Math.abs(window.innerHeight - game.height),
    delta: number = deltaWidth + deltaHeight
  console.log(`onResize delta=${delta}`) // eslint-disable-line no-console
  if (delta > threshold) {
    resize()
  }
}

function resize(): void {
  scaleGameToSceenHeight()
  scene.resizeToScreenWidth()
  resizeGameToScene()
  resetCameraBoundsToScreen()
}

function resizeGameToScene(): void {
  game.scale.setGameSize(scene.width, scene.height)
}

function scaleGameToSceenHeight(): void {
  const scale: number = window.innerHeight / scene.height
  game.scale.setUserScale(scale, scale)
}

function resetCameraBoundsToScreen(): void {
  const topLeft = new Phaser.Point(-scene.width / 2, -scene.height / 2)
  game.camera.bounds = new Phaser.Rectangle(topLeft.x, topLeft.y, scene.width,
    scene.height)
}