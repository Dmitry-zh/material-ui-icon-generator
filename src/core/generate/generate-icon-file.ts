import path from 'path'
import fs from 'fs'

import { SvgTree } from '~/types'
import { logger } from '~/util'
import { OUT_DIR } from '~/constants'

import { pascalCase } from '../util'

import { createJsxIconTemplate } from './create-jsx-icon-template'

export const generateIconFile = async (
  tree: SvgTree['children'],
  iconFileName: string,
) => {
  return new Promise((resolve, reject) => {
    const name = pascalCase(path.parse(iconFileName).name)

    const outputDir = path.join(OUT_DIR, name + '.js')
    const template = createJsxIconTemplate({ iconName: name, elements: tree })

    fs.writeFile(outputDir, Buffer.from(template), (error) => {
      if (error) {
        return reject(
          logger.error(
            'ERROR OCCURRED WRITING ICON: %s on file %s',
            error.message,
            name,
          ),
        )
      }
      return resolve(name)
    })
  })
}
