/** Graphics.lineTo seems to be better suited for antialiased lines. Use a
    classic Bresenham line instead.
    @param {Phaser.Graphics} gfx
    @param {Phaser.Point} p0
    @param {Phaser.Point} p1
    @return {void}
    @see http://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#JavaScript */ // eslint-disable-line max-len
function bline(gfx, p0, p1) {
  let x0 = Math.round(p0.x)
  let y0 = Math.round(p0.y)
  const x1 = Math.round(p1.x)
  const y1 = Math.round(p1.y)

  const dx = Math.abs(x1 - x0)
  const dy = Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = (dx > dy ? dx : -dy) / 2

  pixel(gfx, x0, y0)
  while (x0 !== x1 || y0 !== y1) {
    const prevErr = err
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
module.exports.bline = bline

/** @param {Phaser.Graphics} gfx
    @param {number} x
    @param {number} y
    @return {void} */
function pixel(gfx, x, y) {
  // Phaser / PIXI doesn't expose a set pixel method and Canvas / WebGL seem to
  // try to antialias on boundaries even with
  // Phaser.Canvas.setImageRenderingCrisp enabled. Use a tiny width and diameter
  // so the chance of bleeding into other pixels is small.
  const diameter = .01
  gfx.drawCircle(x, y, diameter)
}
module.exports.pixel = pixel