// @flow

const Phaser = require('../phaser')

class Entity {
  _gfx: Phaser.Graphics;

  constructor(game: Phaser.Game) : void {
    this._gfx = game.add.graphics()
  }

  update(_width: number, _height: number) : void {
    //
  }

  // todo: consider adding a resize method here. Not everything needs to be
  //       drawn each update.
}
module.exports = Entity