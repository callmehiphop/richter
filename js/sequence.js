/**
 * Sequences are used to manage sprite animations
 * @param {string} name
 * @param {string} sheet
 * @param {array}  frames
 * @param {number} once
 */
var Sequence = function(name, sheet, frames, once) {

  /**
   * The sequence name
   */
  this.name = name;

  /**
   * The name of the spritesheet that contains the cells
   * for this particular sequence
   */
  this.sheet = sheet;

  /**
   * JSON data describing the properties for each
   * frame in the sequence (width, height, x, y, etc.)
   */
  this.frames = frames;

  /**
   * Number of frames in this sequence
   */
  this.frameCount = frames.length;

  /**
   * Does this sequence loop or only run once?
   * Defaults to infinite loop
   */
  this.once = !!once;

  /**
   * Time of when sequence started
   */
  this.created = Date.now();

};


extend(Sequence.prototype, {

  /**
   * Retrieves current frame properties
   * @return {object} properties
   */
  getFrame: function(time) {
    var index;

    time = time || Date.now();
    index = Math.floor((time - this.created) / 1000 * this.frameCount) % this.frameCount;

    return this.frames[index];
  }

});