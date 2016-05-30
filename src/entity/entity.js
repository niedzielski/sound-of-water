class Entity {
  /** @arg {Phaser.Game} game */
  constructor(game) {
    this._gfx = game.add.graphics()
  }

  /**
   * @arg {int} _width
   * @arg {int} _height
   * @return {void}
   */
  update(_width, _height) {
    //
  }

  // todo: consider adding a resize method here. Not everything needs to be
  //       drawn each update.
}
module.exports = Entity