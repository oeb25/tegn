'use strict';

exports.__esModule = true;
exports['default'] = tegn;
exports.init = init;
var cache = {};

function tegn(ctx, state) {
  var offset = arguments.length <= 2 || arguments[2] === undefined ? [0, 0] : arguments[2];

  if (!state) return false;

  if (Array.isArray(state)) {
    state.map(function (child) {
      return tegn(ctx, child, offset);
    });

    return state;
  }

  var x = offset[0] + (state.x || 0);
  var y = offset[1] + (state.y || 0);

  if (x < ctx.canvas.width && y < ctx.canvas.height) {
    if (state.fill) {
      if (ctx.fillStyle !== state.fill) ctx.fillStyle = state.color || state.fill;
      ctx.fillRect(x, y, state.width || 0, state.height || 0);
    }

    if (state.stroke) {
      ctx.strokeStyle = state.stroke;
      ctx.strokeRect(x, y, state.width || 0, state.height || 0);
    }

    if (state.src) {
      if (state.width && state.height) {
        ctx.drawImage(image(state.src), x, y, state.width, state.height);
      } else {
        ctx.drawImage(image(state.src), x, y);
      }
    }

    if (state.text) {
      if (state.font) {
        ctx.font = state.font;
      }
      if (state.color) {
        ctx.fillStyle = state.color;
      }

      ctx.fillText(state.text, x, y);
    }
  }

  if (state.children) {
    var len = state.children.length;

    for (var i = 0; i < len; i++) {
      tegn(ctx, state.children[i], [x, y]);
    }
  }

  return state;
}

function init(width, height) {
  var elm = arguments.length <= 2 || arguments[2] === undefined ? document.body : arguments[2];

  var canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  ctx.offscreenCanvas = document.createElement('canvas');
  ctx.offscreenCtx = ctx.offscreenCanvas.getContext('2d');

  ctx.offscreenCanvas.width = width;
  ctx.offscreenCanvas.height = height;

  return ctx;
}

function image(src) {
  if (typeof src !== 'string') return src;

  if (cache[src]) return cache[src];

  var img = document.createElement('img');
  img.src = src;

  return cache[src] = img;
}