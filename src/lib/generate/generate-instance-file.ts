import path from 'path'
import fs from 'fs'

export const generateInstanceFile = async () => {
  let fileContent = ''
  const outputDir = path.join(__dirname, '..', '..', '..', 'output')

  await new Promise((resolve, reject) => {
    fs.readdir(outputDir, async (err, files) => {
      if (err) reject(err.message)

      files.forEach((file, index) => {
        const fileName = path.parse(file).name
        fileContent += `export {default as ${fileName}} from './${fileName}'`
        fileContent += '\n'
        if (index === files.length - 1) {
          resolve('done')
        }
      })
    })
  })

  return fs.writeFileSync(
    path.join(outputDir, 'index.js'),
    Buffer.from(fileContent),
  )
}
