const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '..', 'assets', 'images', 'tiles');
const outputFile = path.join(__dirname, '..', 'utils', 'tileImages.ts');

const imageFiles = fs.readdirSync(imageDir).filter(file => 
  file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
);

const imports = imageFiles.map((file, index) => 
  `  require('@/assets/images/tiles/${file}'),`
).join('\n');

const fileContent = `const tileImages = [\n${imports}\n];`;

fs.writeFileSync(outputFile, fileContent);

console.log(`Generated ${outputFile} with ${imageFiles.length} images.`);
