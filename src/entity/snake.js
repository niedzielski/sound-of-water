const Phaser = require('../phaser')
const Gfx = require('../gfx')
const Palette = require('../palette')
const Entity = require('./entity')

/** Coiled upside down snake. When coiled, appears as an upside down triangle.
    When biting, uncoils to the bite point. Additionally, when coiled,
    occasionally flicks its tongue.

    coil
      3|ooooo
      2| ooo
      1|  o
      0|
      +----- links

    Σ links = coil²
    links(0) = 0
    links(coil) = 2 * coil - 1 where coil > 0

    @prop {Phaser.Graphics} gfx
*/
class Snake extends Entity {
  /** @arg {Phaser.Graphics} gfx */
  constructor(gfx) {
    super(gfx)
    this._bitePt = null
    this._timer = 60
  }

  /**
   * @arg {int} width
   * @arg {int} height
   * @return {void}
   */
  update(width, height) {
    super.update(width, height)

    this._gfx.y = -height / 2
    this._gfx.clear()

    let coils = this._coils(this._coilLinks(height))
    let x = Math.floor(-this._links(coils) / 2)
    let y = 1
    this._gfx.lineStyle(1, Palette.GREEN)
    for (; coils; --coils) {
      this._gfx.moveTo(x, y)
      this._gfx.lineTo(x + this._links(coils), y)
      x += 1
      y += 2
    }

    if (this._bitePt) this._updateUncoil(x, y)
    else this._checkFlick(x, y)

    // todo: use time not updates.
    this._timer += 1
  }

  /**
   * @arg {int} x
   * @arg {int} y
   * @return {void}
   */
  _checkFlick(x, y) {
    const fps = 60
    const periodSecs = 6
    const periodFrames = fps * periodSecs
    const flickPeriodSecs = 1
    const flickPeriodFrames = fps * flickPeriodSecs

    if (this._timer % periodFrames < flickPeriodFrames) {
      this._updateTongueFlick(x, y - 1)
    }
  }

  /**
   * @arg {Phaser.Point} pt
   * @return {void}
   */
  bite(pt) {
    this._bitePt = this._worldToLocal(pt)
  }

  /**
   * @arg {int} height The scene height.
   * @return {int} The number of coil links.
   */
  _coilLinks(height) {
    const links = Math.sqrt(2 * height * height)
    return links - this._uncoilLinks(links)
  }

  /**
   * @arg {int} links The total number of links.
   * @return {int} The number of uncoil links (>= 0 && <= links).
   */
  _uncoilLinks(links) {
    if (!this._bitePt) return 0
    const x = this._bitePt.x
    const y = this._bitePt.y
    return Math.min(links, Math.sqrt(x * x + y * y))
  }

  /**
   * @arg {int} x The x coordinate of the uncoil anchor.
   * @arg {int} y The y coordinate of the uncoil anchor.
   * @return {void}
   */
  _updateUncoil(x, y) {
    Gfx.bline(this._gfx, new Phaser.Point(x, y - 1), this._bitePt)
    this._bitePt = null
    this._timer = 60
  }

  /**
   * @arg {int} x
   * @arg {int} y
   * @return {void}
   */
  _updateTongueFlick(x, y) {
    this._gfx.lineStyle(1, Palette.RED)
    Gfx.pixel(this._gfx, x, y)
  }

  /**
   * @arg {Phaser.Point} pt
   * @return {Phaser.Point}
   */
  _worldToLocal(pt) {
    return pt.subtract(this._gfx.position.x, this._gfx.position.y)
  }

  /**
   * @arg {int} coil The coil (row) to reference.
   * @return {int} The width in links (columns or pixels) of the given coil
   *               (row).
   */
  _links(coil) {
    return coil === 0 ? 0 : 2 * coil - 1
  }

  /**
   * @arg {int} links The total number of links (columns or pixels).
   * @return {int} The number of coils (rows) allowed.
   */
  _coils(links) {
    return Math.floor(Math.sqrt(links))
  }
}
module.exports = Snake