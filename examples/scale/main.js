import tegn, { init } from '../../src';

const width = 1900;
const height = 1000;

const ctx = init(width, height);

const imageFromString = {

  // Just add a src property and you're done.
  src: 'assets/star.png',

  pixelate: false,

  scale: [1, 1],

  x: 80,
  y: 0
};

const img = document.createElement('img');
img.src = 'assets/star.png';

const imageFromDOMElement = {

  // It can either be a string or a image element or a canvas element.
  src: img,

  pixelate: true,

  scale: [5, 5],

  x: 1,
  y: 1,

  children: [imageFromString]
};

// We loop the render to make sure the images will be drawn when they have been loaded
const loop = () => {
  requestAnimationFrame(loop);

  tegn(ctx, {
    fill: '#333',

    width, height,

    children: [
      imageFromString,
      imageFromDOMElement
    ]
  });
};

loop();
