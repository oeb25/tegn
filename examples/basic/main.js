import tegn, { init } from '../../src';

const width = 90;
const height = 90;

// This creates a canvas with the given width and height, adds it to the document
// and then returns the canvas context.
const ctx = init(width, height, document.body);

// The objects to be drawn are pure JS objects, nothing fancy.
const guy = {
  // You set properties much like you would do with the default canvas.
  fill: '#eee',

  // x and y are essential, alltho not needed as they default to 0
  x: 30,
  y: 30,

  // width and height is used to size the object, aswell as images
  width: 30,
  height: 30,

  // children are stored in arrays and can contain any amount of children, and
  // can be nested.
  children: [
    {
      fill: '#333',

      x: 10,
      y: 10,

      width: 4,
      height: 6,
    },
    {
      fill: '#333',

      x: 16,
      y: 10,

      width: 4,
      height: 6,
    }
  ]
};

// The tegn function takes the canvas context and the state, aswell as offset
// which should not be used, but is needed internaly.
tegn(ctx, {
  fill: '#333',

  width,
  height,

  children: [ guy ]
});

let times = [];

let loop = () => {
  console.clear();
  let start = Date.now();
  console.time('total');
  tegn(ctx, {
    fill: '#333',

    width,
    height,

    children: [ guy ]
  });
  console.timeEnd('total');
  times.push(Date.now() - start);

  console.log('Averange:', ~~((times.reduce((a, b) => a+b) / times.length) * 100));

  setTimeout(loop, 1);
}

loop();
