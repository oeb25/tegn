'use strict';

exports.__esModule = true;
exports['default'] = tegn;
exports.init = init;
var cache = {};

function tegn(ctx) {
  var state = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var offset = arguments.length <= 2 || arguments[2] === undefined ? [0, 0] : arguments[2];

  if (Array.isArray(state)) return state.map(function (child) {
    return tegn(ctx, child, offset);
  });

  var x = offset[0] + (state.x || 0);
  var y = offset[1] + (state.y || 0);

  if (state.fill) {
    ctx.fillStyle = state.fill;
    ctx.fillRect(x, y, state.width || 0, state.height || 0);
  }

  if (state.stroke) {
    ctx.strokeStyle = state.stroke;
    ctx.strokeRect(x, y, state.width || 0, state.height || 0);
  }

  if (state.src) {
    if (state.width && state.height) ctx.drawImage(image(state.src), x, y, state.width, state.height);else ctx.drawImage(image(state.src), x, y);
  }

  if (state.children) {
    state.children.map(function (child) {
      return tegn(ctx, child, [x, y]);
    });
  }

  return state;
}

function init(width, height) {
  var elm = arguments.length <= 2 || arguments[2] === undefined ? document.body : arguments[2];

  var canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  document.body.appendChild(canvas);

  return canvas.getContext('2d');
}

function image(src) {
  if (typeof src !== 'string') return src;

  if (cache[src]) return cache[src];

  var img = document.createElement('img');
  img.src = src;

  return cache[src] = img;
}