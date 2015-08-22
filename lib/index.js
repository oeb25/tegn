'use strict';

exports.__esModule = true;
exports['default'] = tegn;
exports.init = init;
var cache = {};

function tegn(ctx, state) {
  var offset = arguments.length <= 2 || arguments[2] === undefined ? [0, 0] : arguments[2];
  var scale = arguments.length <= 3 || arguments[3] === undefined ? [1, 1] : arguments[3];
  var pixelate = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

  if (!state) return false;

  if (Array.isArray(state)) {
    state.map(function (child) {
      return tegn(ctx, child, offset);
    });

    return state;
  }

  var p = !(state.pixelate !== void 0 ? state.pixelate : pixelate);

  ctx['imageSmoothingEnabled'] = p;
  ctx['mozImageSmoothingEnabled'] = p;
  ctx['oImageSmoothingEnabled'] = p;
  ctx['webkitImageSmoothingEnabled'] = p;
  ctx['msImageSmoothingEnabled'] = p;

  var s = state.scale || [1, 1];

  var sx = scale[0] * (s[0] || 1);
  var sy = scale[1] * (s[1] || 1);

  var x = offset[0] + (state.x || 0) * sx;
  var y = offset[1] + (state.y || 0) * sy;

  if (x < ctx.canvas.width && y < ctx.canvas.height) {
    if (state.fill) {
      if (state.fill === 'clear') {
        ctx.clearRect(x, y, state.width * sx || 0, state.height * sy || 0);
      } else {
        if (ctx.fillStyle !== state.fill) {
          ctx.fillStyle = state.color || state.fill;
        }
        ctx.fillRect(x, y, state.width * sx || 0, state.height * sy || 0);
      }
    }

    if (state.stroke) {
      ctx.strokeStyle = state.stroke;
      ctx.strokeRect(x, y, state.width * sx || 0, state.height * sy || 0);
    }

    if (state.src) {
      var img = image(state.src);

      if (state.width && state.height) {
        ctx.drawImage(image(state.src), x, y, state.width * sx, state.height * sy);
      } else {
        ctx.drawImage(image(state.src), x, y, img.width * sx, img.height * sy);
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
      tegn(ctx, state.children[i], [x, y], [sx, sy], !p);
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