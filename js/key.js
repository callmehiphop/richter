// all the currently pressed keys
var pressed = [];


document.addEventListener('keydown', recordKey, false);
document.addEventListener('keyup',   clearKey,  false);


function recordKey(event) {
  if (!inArray(event.keyCode, pressed)) {
    pressed.push(event.keyCode);
  }
}


function clearKey(event) {
  var keyCode = event.keyCode;

  each(pressed, function(key, i) {
    if (key === keyCode) {
      pressed.splice(i, 1);
      return false;
    }
  });
}


var key = function key(keyCode) {
  if (!(this instanceof key)) {
    return new key(keyCode);
  }

  this.keyCode = keyCode;
};


key.prototype.isPressed = function() {
  return inArray(this.keyCode, pressed);
};