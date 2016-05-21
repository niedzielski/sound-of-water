const Entity = require('./entity')
const Palette = require('../palette')

class Sun extends Entity {
  /** @param {int} width
      @param {int} height
      @return {void} */
  update(width, height) {
    super.update(width, height)
    const diameter = height / 7
    this._gfx.beginFill(Palette.YELLOW)
    this._gfx.drawRect(0, 0, diameter, diameter)
    this._gfx.endFill()

    this._gfx.x = 30
    this._gfx.y = diameter / 2 - height / 2
  }
}
module.exports = Sun