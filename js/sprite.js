var sheetCache = {};

/**
 * Creates a new Sprite
 * @param {string} src
 * @param {object} sequences
 * @param {number} scale
 */
var Sprite = function(src, sequences, scale) {

  // this is probably bad
  sheetCache[src] = new Image();
  sheetCache[src].src = src;

  /**
   * source of sprite sheet
   */
  this.src = src;

  /**
   * x coordinate
   */
  this.x = 0;

  /**
   * y coordinate
   */
  this.y = 0;

  /**
   * x velocity
   */
  this.vx = 5;

  /**
   * y velocity
   */
  this.vy = 5;

  /**
   * Sprite Sequences
   */
  this.sequences = sequences;

  /**
   * How much are we scaling the sprite
   */
  this.scale = scale || 1;

  /**
   * Current Sequence
   */
  this.sequence = null;

};

extend(Sprite.prototype, {

  /**
   * Set sequence by alias
   * @param {string} name
   * @param {date} time
   */
  setSequence: function(name) {
    // this feels prettttty dirty
    if (this.sequence && this.sequence.name === name) {
      return;
    }

    var data = this.sequences[name];

    if (data) {
      this.sequence = new Sequence(name, data.sheet, data.frames);
    } else {
      throw new Error('No sequence found for ' + name + '!');
    }
  },

  currentFrame: function(time) {
    return this.sequence.getFrame(time);
  },

  /**
   * Returns current sprite width
   * @return {number}
   */
  width: function() {
    var frame = this.sequence.getFrame();
    return frame.width * this.scale;
  },

  /**
   * Returns current sprite height
   * @return {number}
   */
  height: function() {
    var frame = this.sequence.getFrame();
    return frame.height * this.scale;
  }

})