/** Graphics.lineTo seems to be better suited for antialiased lines. Use a
    classic Bresenham line instead.
    @param {Phaser.Graphics} gfx
    @param {Phaser.Point} p0
    @param {Phaser.Point} p1
    @return {void}
    @see http://rosettacode.org/wiki/Bitmap/Bresenham%27s_line_algorithm#JavaScript */ // eslint-disable-line max-len
function bline(gfx, p0, p1) {
  const dx = Math.abs(p1.x - p0.x)
  const dy = Math.abs(p1.y - p0.y)
  const sx = p0.x < p1.x ? 1 : -1
  const sy = p0.y < p1.y ? 1 : -1
  let err = (dx > dy ? dx : -dy) / 2

  pixel(gfx, p0.x, p0.y)
  while (p0.x !== p1.x || p0.y !== p1.y) {
    const prevErr = err
    if (prevErr > -dx) { err -= dy; p0.x += sx }
    if (prevErr < dy) { err += dx; p0.y += sy }
    pixel(gfx, p0.x, p0.y)
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
  gfx.drawCircle(x, y, .01)
}
module.exports.pixel = pixel