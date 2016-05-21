/** Rendered actor. */
class Entity {
  /** @param {Phaser.Game} game */
  constructor(game) {
    this._gfx = game.add.graphics()
  }

  /** @param {int} width
      @param {int} height
      @return {void} */
  update(width, height) { }

  // todo: consider adding a resize method here. Not everything needs to be
  //       drawn each update.
}
module.exports = Entity