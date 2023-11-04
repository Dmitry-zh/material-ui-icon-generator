import fs from 'fs'

import { OUT_DIR } from '~/constants'
import { logger } from '~/util'

const createOutputDir = () => {
  fs.mkdirSync(OUT_DIR)

  return logger.info('OUTPUT DIR WAS CREATED')
}

export const processOutputDir = () => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(OUT_DIR)) {
      return resolve(createOutputDir())
    }

    fs.rm(OUT_DIR, { force: true, recursive: true }, (error) => {
      if (error) {
        return reject(
          logger.error('ERROR OCCURRED CREATING OUT DIR: %s', error.message),
        )
      }

      return resolve(createOutputDir())
    })
  })
}
