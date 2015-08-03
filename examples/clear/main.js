import tegn, { init } from '../../src';

let ctx = init(1280, 720);

tegn(ctx, {
  width: 200,
  height: 200,

  fill: '#334',

  children: [{
    fill: 'clear',

    x: 20, y: 20,

    width: 20, height: 20
  }]
});
