// controls..
var left = key(37);
var right = key(39);
var shift = key(16);
var space = key(32);

// constants
var HEIGHT = 0;
var WIDTH = 0;

// richter!
var avatar;

var Game = function() {
  HEIGHT = document.body.offsetHeight;
  WIDTH = document.body.offsetWidth;

  this.canvas = document.createElement('canvas');
  this.canvas.height = HEIGHT;
  this.canvas.width = WIDTH;

  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled = false;
  this.ctx.webkitImageSmoothingEnabled = false;

  this.time = new Clock();

  avatar = new Sprite('img/richter.png', richter, 2.5);
  avatar.setSequence('idle');
  avatar.canJump = true;

  requestAnimationFrame(this.loop.bind(this));
};

extend(Game.prototype, {

  loop: function() {
    requestAnimationFrame(this.loop.bind(this));

    this.time.tick();
    this.update();
    this.clear();
    this.render();
  },

  update: function() {
    var goRight = right.isPressed();
    var goLeft = left.isPressed();
    var run = shift.isPressed();
    var jumping = space.isPressed();
    var vx = run ? avatar.vx * avatar.scale : avatar.vx;

    if (!avatar.isJumping && avatar.canJump && jumping) {
      avatar.canJump = false;
      avatar.isJumping = true;
      avatar.setSequence('jump');
    } else if (!goRight && !goLeft && !avatar.isJumping) {
      avatar.setSequence('idle');
    } else if (run && !avatar.isJumping) {
      avatar.setSequence('run');
    } else if (!avatar.isJumping) {
      avatar.setSequence('walk');
    }

    if (goRight) {
      avatar.x  += vx;
    }

    if (goLeft) {
      avatar.x -= vx;
    }

    if (avatar.isJumping) {
      var time = this.time.now - avatar.sequence.created;

      avatar.y += Math.sin(time / 75) * (6 * avatar.scale);

      // this is wrong.. but I'unno
      if (time > 500) {
        avatar.isJumping = false;
        avatar.y = 0;
      }
    }

    if (!jumping && !avatar.isJumping) {
      avatar.canJump = true;
    }

  },

  clear: function() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, WIDTH, HEIGHT);
    this.ctx.fillStyle = '#80FF80';
    this.ctx.fill();
  },

  render: function() {
    var frame = avatar.currentFrame(this.time.now);

    this.ctx.drawImage(
      sheetCache[avatar.src],
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      avatar.x,
      HEIGHT - avatar.height() - avatar.y,
      avatar.width(),
      avatar.height()
    );
  }

});