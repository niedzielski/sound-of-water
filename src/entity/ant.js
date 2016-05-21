const Entity = require('./entity')
const Palette = require('../palette')

/** Rendered actor. */
class Ant extends Entity {
  /** @param {int} width
      @param {int} height
      @return {void} */
  update(width, height) {
    super.update(width, height)
    this._gfx.beginFill(Palette.BLACK)
    this._gfx.drawRect(0, 0, 2, 1)
    this._gfx.endFill()
    this._gfx.x = 3
    this._gfx.y = height / 2 - 2
  }
}
module.exports = Ant