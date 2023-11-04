import fs from 'fs'
import path from 'path'

import { IN_DIR } from '~/constants'
import { logger } from '~/util'
import { GenCallback } from '~/types'

import {
  generateIconFile,
  generateInstanceFile,
  processOutputDir,
} from './generate'
import { parseSvgFileAsTree } from './parse'

export const main = () => {
  return new Promise((resolve, reject) => {
    logger.info('GENERATION STARTED')
    fs.readdir(IN_DIR, async (error, files) => {
      if (error) {
        logger.error('ERROR OCCURRED READING INPUT DIR: %s', error.message)
        reject()
        return
      }
      // remove previous gen and create OUT_DIR
      await processOutputDir()
      const generations: GenCallback[] = []
      const svgFiles = files.filter((file) => path.extname(file) === '.svg')
      logger.info('FOUND: %d .svg FILES TO GENERATE', svgFiles.length)
      let generatedQty = 0
      svgFiles.forEach((file) => {
        generations.push(async () => {
          const tree = await parseSvgFileAsTree(path.join(IN_DIR, file))
          if (tree) {
            await generateIconFile(tree, file)
            generatedQty = generatedQty + 1
            logger.info(
              'GENERATED %d / %d files',
              generatedQty,
              svgFiles.length,
            )

            return file
          }
        })
      })

      await Promise.allSettled(generations.map((foo) => foo())).then(
        (results) => {
          const succeed = results.filter(({ status }) => status === 'fulfilled')

          logger.info(
            'WRITTEN ICONS FOR FILES: %s',
            succeed.map((r) => (r as { value: string }).value),
          )
        },
      )
      await generateInstanceFile()
      resolve(logger.info('GENERATION COMPLETED'))
    })
  })
}
