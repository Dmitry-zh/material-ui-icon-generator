import path from 'path'
import fs from 'fs'

import { OUT_DIR } from '~/constants'

export const generateTypes = async () => {
  let fileContent = ''

  await new Promise((resolve, reject) => {
    fs.readdir(OUT_DIR, async (err, files) => {
      if (err) reject(err.message)

      files.forEach((file, index) => {
        const fileName = path.parse(file).name
        fileContent += `export {default as ${fileName}} from '@mui/material/SvgIcon'`
        fileContent += '\n'
        if (index === files.length - 1) {
          resolve('done')
        }
      })
    })
  })

  return fs.writeFileSync(
    path.join(OUT_DIR, 'index.d.ts'),
    Buffer.from(fileContent),
  )
}
