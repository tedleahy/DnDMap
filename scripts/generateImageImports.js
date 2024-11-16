const fs = require('fs')
const path = require('path')

const outputFile = path.join(__dirname, '..', 'utils', 'mapAssets.ts')

const imageDirs = fs.readdirSync(path.join(__dirname, '..', 'assets', 'images', 'maps'))

let imagesCount = 0
let fileContent = `const mapAssets: Record<string, number[]> = {\n`

for (const dir of imageDirs) {
  const dirPath = path.join(__dirname, '..', 'assets', 'images', 'maps', dir)

  fileContent += `  ${dir}: [\n`

  fileContent += fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.png'))
    .map(file => {
      imagesCount++
      return `    require('@/assets/images/maps/${dir}/${file}'),`
    })
    .join('\n')

  fileContent += '\n  ],\n'
}

fileContent += '};\n\nexport default mapAssets;'

fs.writeFileSync(outputFile, fileContent)

console.log(`Generated ${outputFile} with ${imagesCount} images.`)
