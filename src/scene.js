const Phaser = require('./phaser')
const Palette = require('./palette')

const Ant = require('./entity/ant')
const Blueberry = require('./entity/blueberry')
const Floor = require('./entity/floor')
const Snake = require('./entity/snake')
const Sun = require('./entity/sun')

// Height is constant. Width is proportionally scaled to screen size. Origin is
// at (0, 0) in the top left.
module.exports.height = 48
module.exports.width = exports.height

let snake
const entities = []
entities.update = function() {
  for (const entity of this) {
    entity.update(exports.width, exports.height)
  }
}

/** @return {void} */
function resizeToScreenWidth() {
  const scale = window.innerWidth / window.innerHeight
  exports.width = Math.floor(exports.height * scale)
}
module.exports.resizeToScreenWidth = resizeToScreenWidth

/** @param {Phaser.Game} game
    @return {void} */
function preload(game) {
  game.stage.backgroundColor = Palette.WHITE

  entities.push(new Sun(game))
  entities.push(new Floor(game))
  entities.push(new Ant(game))
  entities.push(new Blueberry(game))

  snake = new Snake(game)
  entities.push(snake)

  game.input.onDown.add(pt => {
    snake.bite(new Phaser.Point(pt.worldX, pt.worldY))
  })
}
module.exports.preload = preload

/** @param {Phaser.Game} _game
    @return {void} */
function update(_game) {
  entities.update(exports.width, exports.height)
}
module.exports.update = update