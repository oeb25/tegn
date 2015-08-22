const cache = {};

export default function tegn(ctx, state, offset = [0, 0], scale = [1, 1], pixelate = false) {
  if (!state) return false;

  if (Array.isArray(state)) {
    state.map(child => tegn(ctx, child, offset));

    return state;
  }

  const p = !(state.pixelate !== void 0 ? state.pixelate : pixelate);

  ctx['imageSmoothingEnabled'] = p;
  ctx['mozImageSmoothingEnabled'] = p;
  ctx['oImageSmoothingEnabled'] = p;
  ctx['webkitImageSmoothingEnabled'] = p;
  ctx['msImageSmoothingEnabled'] = p;

  const s = state.scale || [1, 1];

  const sx = scale[0] * (s[0] || 1);
  const sy = scale[1] * (s[1] || 1);

  const x = offset[0] + (state.x || 0) * sx;
  const y = offset[1] + (state.y || 0) * sy;

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
      let img = image(state.src);

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
    let len = state.children.length;

    for (let i = 0; i < len; i++) {
      tegn(ctx, state.children[i], [x, y], [sx, sy], !p);
    }
  }

  return state;
}

export function init(width, height, elm = document.body) {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')

  ctx.offscreenCanvas = document.createElement('canvas');
  ctx.offscreenCtx = ctx.offscreenCanvas.getContext('2d');

  ctx.offscreenCanvas.width = width;
  ctx.offscreenCanvas.height = height;

  return ctx;
}

function image(src) {
  if (typeof src !== 'string') return src;

  if (cache[src]) return cache[src];

  const img = document.createElement('img');
  img.src = src;

  return cache[src] = img;
}
