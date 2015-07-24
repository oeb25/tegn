import tegn, { init } from '../../src';

const width = 190;
const height = 100;

const ctx = init(width, height);

const imageFromString = {

  // Just add a src property and you're done.
  src: 'assets/star.png',

  x: 100,
  y: 10
};

const img = document.createElement('img');
img.src = 'assets/star.png';

const imageFromDOMElement = {

  // It can either be a string or a image element.
  src: img,

  x: 10,
  y: 10
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
