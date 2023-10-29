import path from 'path'
import fs from 'fs'

import { SvgTree } from '../../types'
import { pascalCase } from '../util'

import { createJsxIconTemplate } from './create-jsx-icon-template'

export const generateIconFile = (
  tree: SvgTree['children'],
  iconFileName: string,
) => {
  const name = pascalCase(path.parse(iconFileName).name)

  const outputDir = path.join(
    __dirname,
    '..',
    '..',
    '..',
    'output',
    name + '.js',
  )
  const template = createJsxIconTemplate({ iconName: name, elements: tree })

  fs.writeFile(outputDir, Buffer.from(template), (err) => {
    if (err) console.log(err)
    else {
      console.log('File written successfully: ', name)
    }
  })
}
