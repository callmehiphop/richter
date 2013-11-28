var Clock = function() {
  this.tick();
};

extend(Clock.prototype, {

  tick: function() {
    var now = Date.now();

    this.previous = this.now || now;
    this.now = now;
    this.elapsed = this.now - this.previous;
  }

});