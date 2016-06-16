// @flow

const
  Entity = require('./entity'),
  Palette = require('../palette')

class Sun extends Entity {
  update(width: number, height: number): void {
    super.update(width, height)
    const diameter: number = height / 7 // eslint-disable-line no-magic-numbers
    this.gfx().beginFill(Palette.YELLOW)
    this.gfx().drawRect(0, 0, diameter, diameter)
    this.gfx().endFill()

    this.gfx().x = 30
    this.gfx().y = diameter / 2 - height / 2
  }
}

module.exports = Sun