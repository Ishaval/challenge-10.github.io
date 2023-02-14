const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const shapeOptions = ['circle', 'triangle', 'square'];
const logoWidth = 300;
const logoHeight = 200;

const askForText = (callback) => {
  readline.question('Enter up to three characters: ', (text) => {
    if (text.length > 3) {
      console.error('Input exceeded three characters');
      process.exit(1);
    }
    callback(text);
  });
};

const askForColor = (callback) => {
  readline.question('Enter a color keyword or hexadecimal number: ', (color) => {
    callback(color);
  });
};

const askForShape = (callback) => {
  console.log('Available shapes:');
  shapeOptions.forEach((shape, index) => {
    console.log(`${index + 1}. ${shape}`);
  });
  readline.question('Enter the number of the desired shape: ', (shapeNumber) => {
    const shape = shapeOptions[shapeNumber - 1];
    if (!shape) {
      console.error('Invalid shape number');
      process.exit(1);
    }
    callback(shape);
  });
};

const generateSvg = (text, textColor, shape, shapeColor) => {
  let shapeSvg = '';
  if (shape === 'circle') {
    shapeSvg = `<circle cx="150" cy="100" r="80" fill="${shapeColor}" />`;
  } else if (shape === 'triangle') {
    shapeSvg = `<polygon points="150,20 280,180 20,180" fill="${shapeColor}" />`;
  } else if (shape === 'square') {
    shapeSvg = `<rect x="50" y="50" width="200" height="100" fill="${shapeColor}" />`;
  }
  const svg = `<svg version="1.1" width="${logoWidth}" height="${logoHeight}" xmlns="http://www.w3.org/2000/svg">
    ${shapeSvg}
    <text x="50%" y="50%" font-size="70%" text-anchor="middle" fill="${textColor}">${text}</text>
  </svg>`;
  return svg;
};



const main = async () => {
  console.log('Creating logo.svg...');
  const text = await new Promise(resolve => askForText(resolve));
  const textColor = await new Promise(resolve => askForColor(resolve));
  const shape = await new Promise(resolve => askForShape(resolve));
  const shapeColor = await new Promise(resolve => askForColor(resolve));

  const svg = generateSvg(text, textColor, shape, shapeColor);
  require('fs').writeFileSync('logo.svg', svg);

  console.log('Generated logo.svg');
};

main();
