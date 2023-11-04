import fs from 'fs'
import path from 'path'

import { path as rootPath } from 'app-root-path'

import { generateIconFile, generateInstanceFile } from './generate'
import { parseSvgFileAsTree } from './parse'

type T = () => Promise<void>

export const parseInputDir = () => {
  const inputDir = path.join(rootPath, 'input')

  fs.readdir(inputDir, async (err, files) => {
    if (err) console.log(err)
    else {
      const generations: T[] = []
      files.forEach((file) => {
        if (path.extname(file) == '.svg') {
          const gen = async () => {
            const tree = await parseSvgFileAsTree(path.join(inputDir, file))
            if (tree) {
              await generateIconFile(tree, file)
            }
          }
          generations.push(gen)
        }
      })
      await Promise.allSettled(generations.map(async (foo) => foo())).then(
        (results) => results.forEach((result) => console.log(result.status)),
      )
      await generateInstanceFile()
      console.log('END!')
    }
  })
}
