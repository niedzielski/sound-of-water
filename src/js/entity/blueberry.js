// @flow

const
  Entity = require('./entity'),
  Palette = require('../palette')

class Blueberry extends Entity {
  update(width: number, height: number): void {
    super.update(width, height)
    this.gfx().beginFill(Palette.BLUE)
    this.gfx().drawRect(0, 0, 2, 2)
    this.gfx().endFill()
    this.gfx().x = 5
    const
      blueberryHeight: number = 2,
      antHeight: number = 1,
      floorHeight: number = 1,
      offset: number = blueberryHeight + antHeight + floorHeight
    this.gfx().y = height / 2 - offset
  }
}

module.exports = Blueberry