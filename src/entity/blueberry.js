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
    const blueberryHeight = 2
    const antHeight = 1
    const floorHeight = 1
    const offset = blueberryHeight + antHeight + floorHeight
    this._gfx.y = height / 2 - offset
  }
}
module.exports = Blueberry