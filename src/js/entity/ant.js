// @flow

const
  Entity = require('./entity'),
  Palette = require('../palette')

class Ant extends Entity {
  update(width: number, height: number): void {
    super.update(width, height)
    this.gfx().beginFill(Palette.BLACK)
    this.gfx().drawRect(0, 0, 2, 1)
    this.gfx().endFill()
    this.gfx().x = 3
    this.gfx().y = height / 2 - 2
  }
}

module.exports = Ant