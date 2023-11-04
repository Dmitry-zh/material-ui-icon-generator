import fs from 'fs'

import { OUT_DIR } from '~/constants'

export const processOutputDir = () => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(OUT_DIR)) {
      return fs.rm(OUT_DIR, { force: true, recursive: true }, (e) => {
        if (e) {
          reject('error')
        } else {
          fs.mkdirSync(OUT_DIR)
          resolve('ok')
        }
      })
    }
    fs.mkdirSync(OUT_DIR)
    resolve('ok')
  })
}
