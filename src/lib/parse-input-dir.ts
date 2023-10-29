import fs from 'fs'
import path from 'path'

import { generateIconFile } from './generate'
import { parseSvgFileAsTree } from './parse'

export const parseInputDir = () => {
  const inputDir = path.join(__dirname, '..', '..', 'input')

  fs.readdir(inputDir, (err, files) => {
    if (err) console.log(err)
    else {
      files.forEach(async (file) => {
        if (path.extname(file) == '.svg') {
          const tree = await parseSvgFileAsTree(path.join(inputDir, file))
          if (tree) {
            generateIconFile(tree, file)
          }
        }
      })
    }
  })
}
