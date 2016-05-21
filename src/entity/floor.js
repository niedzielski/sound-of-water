const Entity = require('./entity')
const Palette = require('../palette')

class Floor extends Entity {
  /** @param {int} width
      @param {int} height
      @return {void} */
  update(width, height) {
    super.update(width, height)
    this._gfx.beginFill(Palette.GOLD)
    this._gfx.drawRect(Math.floor(-width / 2), height / 2 - 1, width, 1)
    this._gfx.endFill()
  }
}
module.exports = Floor