import tegn, { init } from '../../src';

const ctx = init(1280, 720);

let particles = [];

let tick = 0;

const Particle = (x, y) => {
  const num = Math.random();

  const dir = num * 100;
  const speed = num * 3 + 1;

  return {
    x, y,

    fill: '#aae',

    width: 2 * speed,
    height: 2 * speed,

    velocity: {
      x: Math.cos(dir) * speed,
      y: Math.sin(dir) * speed,
    }
  };
}

const loop = () => {
  requestAnimationFrame(loop);

  if (tick++ % 1 === 0) {
    particles
      //.filter(p => p.y < 720)
      .forEach(p => {
        p.x = p.x + p.velocity.x;
        p.y = p.y + p.velocity.y;
        p.velocity = {
          x: p.velocity.x * 0.999,
          y: p.velocity.y + 0.004
        };
      });

    particles.push(Particle(1280 / 2, 720 / 2));
  }

  if (tick % 50 === 0) {
    console.log(particles.length);
  }

  tegn(ctx, {

    fill: '#333',

    width: 1280,
    height: 720,

    children: [
      {
        children: particles
      },
      {
        x: 20,
        y: 35,

        font: '24px sans-serif',
        color: '#eaa',

        text: 'Welcome'
      }
    ]
  });
};

loop();
