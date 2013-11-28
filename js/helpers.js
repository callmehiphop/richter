var slice = Array.prototype.slice;

var isArray = Array.isArray || function(thing) {
  return Object.prototype.toString(thing) === '[object Array]';
};

function each(things, callback, context) {
  var i, length;
  context = context || this;

  if (isArray(things)) {

    for (i = 0, length = things.length; i < length; i++) {
      if (callback.call(context, things[i], i, things) === false) {
        break;
      }
    }

  } else {

    for (i in things) {
      if (callback.call(context, i, things[i], things) === false) {
        break;
      }
    }

  }
}

function extend(target) {
  each(slice.call(arguments, 1), function(obj) {
    each(obj, function(key, value) {
      target[key] = value;
    });
  });

  return target;
}

function inArray(needle, haystack) {
  return !!~haystack.indexOf(needle);
}

var keys = Object.keys || function(obj) {
  var results = [];

  each(obj, function(key) {
    results.push(key);
  });

  return keys;
};

function first(obj) {
  var thing = {};

  each(obj, function(key, value) {
    thing.key = key;
    thing.value = value;

    return false;
  });

  return thing;
}