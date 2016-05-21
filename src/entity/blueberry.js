const Entity = require('./entity')
const Palette = require('../palette')

class Blueberry extends Entity {
  /** @param {int} width
      @param {int} height
      @return {void} */
  update(width, height) {
    super.update(width, height)
    this._gfx.beginFill(Palette.BLUE)
    this._gfx.drawRect(0, 0, 2, 2)
    this._gfx.endFill()
    this._gfx.x = 5
    this._gfx.y = height / 2 - 4
  }
}
module.exports = Blueberry