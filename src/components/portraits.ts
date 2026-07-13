/**
 * GlyphDrawing.Club-style ASCII busts for the dialogue cast.
 * Rendered in a <pre>, colored per character.
 */
export const PORTRAITS: Record<'rosana' | 'leo', string> = {
  rosana: String.raw`
    _____________
   //           \\
  ///¯¯¯¯¯¯¯¯¯\\\\
 |||           |||
 |||  ø     ø  |||
°|||     ç     |||°
 |||   \___/   |||
  \\\         ///
   \\\_______///
       |   |
    ___|   |___`,
  leo: String.raw`
     __________
    /\/\/\/\/\/\
   |            |
   |            |
   | [ø]===[ø]  |
   |      ç     |
   |    \___/   |
    \    ...   /
     \________/
       |    |
    ___|    |___`,
}
