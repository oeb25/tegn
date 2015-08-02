const cache = {};

export default function tegn(context, state, opts = { initial: true }) {
  if (!state) return false;

  const { offset = [0, 0], initial } = opts;

  const ctx = initial ? context.offscreenCtx : context;

  if (Array.isArray(state)) {
    state.map(child => tegn(ctx, child, offset));
  } else {
    const x = offset[0] + (state.x || 0);
    const y = offset[1] + (state.y || 0);

    if (state.fill) {
      ctx.fillStyle = state.color || state.fill;
      ctx.fillRect(x, y, state.width || 0, state.height || 0);
    }

    if (state.stroke) {
      ctx.strokeStyle = state.stroke;
      ctx.strokeRect(x, y, state.width || 0, state.height || 0);
    }

    if (state.src) {
      if (state.width && state.height)
        ctx.drawImage(image(state.src), x, y, state.width, state.height);
      else
        ctx.drawImage(image(state.src), x, y);
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

    if (state.children) {
      state.children.map(child =>
        tegn(ctx, child, { offset: [x, y], initial: false }));
    }
  }

  if (initial) {
    context.drawImage(context.offscreenCanvas, 0, 0);
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
