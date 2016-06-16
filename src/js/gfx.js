// @flow

const Phaser = require('./phaser')

/**
 * Phaser.Graphics.lineTo seems to be better suited for antialiased lines. Use a
 * classic Bresenham line instead.
 * @see http://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#JavaScript
 */
function bline(gfx: Phaser.Graphics, p0: Phaser.Point, p1: Phaser.Point): void {
  let
    x0: number = Math.floor(p0.x),
    y0: number = Math.floor(p0.y)
  const
    x1: number = Math.floor(p1.x),
    y1: number = Math.floor(p1.y)

  const // eslint-disable-line one-var
    dx: number = Math.abs(x1 - x0),
    dy: number = Math.abs(y1 - y0),
    sx: number = x0 < x1 ? 1 : -1,
    sy: number = y0 < y1 ? 1 : -1
  let err: number = (dx > dy ? dx : -dy) / 2 // eslint-disable-line one-var

  pixel(gfx, x0, y0)
  while (x0 !== x1 || y0 !== y1) {
    const prevErr: number = err
    if (prevErr > -dx) {
      err -= dy
      x0 += sx
    }
    if (prevErr < dy) {
      err += dx
      y0 += sy
    }
    pixel(gfx, x0, y0)
  }
}

function pixel(gfx: Phaser.Graphics, x: number, y: number): void {
  // Phaser / PIXI doesn't expose a set pixel method and Canvas / WebGL seem to
  // try to antialias on boundaries even with
  // Phaser.Canvas.setImageRenderingCrisp enabled. Use a tiny width and diameter
  // so the chance of bleeding into other pixels is small.
  const diameter: number = .01
  gfx.drawCircle(x, y, diameter)
}

module.exports = {
  bline,
  pixel
}