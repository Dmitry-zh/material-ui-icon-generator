import fs from 'fs'
import path from 'path'

import { generateIconFile } from './generate'
import { parseSvgFileAsTree } from './parse'

type T = () => Promise<void>

export const parseInputDir = () => {
  const inputDir = path.join(__dirname, '..', '..', 'input')

  fs.readdir(inputDir, async (err, files) => {
    if (err) console.log(err)
    else {
      const generations: T[] = []
      files.forEach((file) => {
        if (path.extname(file) == '.svg') {
          const gen = async () => {
            const tree = await parseSvgFileAsTree(path.join(inputDir, file))
            if (tree) {
              generateIconFile(tree, file)
            }
          }
          generations.push(gen)
        }
      })
      await Promise.allSettled(generations.map(async (foo) => foo())).then(
        (results) => results.forEach((result) => console.log(result.status)),
      )
      console.log('end')
    }
  })
}
