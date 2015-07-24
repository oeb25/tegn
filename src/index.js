const cache = {};

export default function tegn(ctx, state = {}, offset = [0, 0]) {
  if (Array.isArray(state)) return state.map(child => tegn(ctx, child, offset));

  const x = offset[0] + (state.x || 0);
  const y = offset[1] + (state.y || 0);

  if (state.fill) {
    ctx.fillStyle = state.fill;
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

  if (state.children) {
    state.children.map(child => tegn(ctx, child, [x, y]));
  }

  return state;
}

export function init(width, height, elm = document.body) {
  const canvas = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  document.body.appendChild(canvas);

  return canvas.getContext('2d');
}

function image(src) {
  if (typeof src !== 'string') return src;

  if (cache[src]) return cache[src];

  const img = document.createElement('img');
  img.src = src;

  return cache[src] = img;
}
