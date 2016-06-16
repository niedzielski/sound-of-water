// @flow

const
  Entity = require('./entity'),
  Palette = require('../palette')

class Floor extends Entity {
  update(width: number, height: number): void {
    super.update(width, height)
    this.gfx().beginFill(Palette.GOLD)
    this.gfx().drawRect(Math.floor(-width / 2), height / 2 - 1, width, 1)
    this.gfx().endFill()
  }
}

module.exports = Floor