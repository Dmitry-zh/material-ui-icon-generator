import fs from 'fs'

import { parse as parseAsHtml } from 'node-html-parser'

import { ParsedHtml, SvgTree } from '../../types'
import { SvgTreeObject } from '../../models'

const getInputSvgTree = (el: ParsedHtml, depth = 0): SvgTreeObject => {
  const leaf = new SvgTreeObject(el)

  if (el.childNodes) {
    el.childNodes.forEach((elChild) => {
      const child = getInputSvgTree(elChild, depth + 1)
      if (depth === 0 || child.tag) {
        leaf.addChild(child)
      }
    })
  }

  return leaf
}

const findSvgChildren = (svg: SvgTree): SvgTree['children'] => {
  if (svg.tag === 'svg') {
    return svg.children
  }

  return svg.children
    .map((child) => findSvgChildren(child))
    .flat(Infinity) as SvgTree[]
}

export const parseSvgFileAsTree = async (
  pathToSvg: string,
): Promise<SvgTree['children'] | undefined> => {
  try {
    console.log(pathToSvg)
    const svgFile = fs.readFileSync(pathToSvg, { encoding: 'utf-8' })
    const svgHtml = parseAsHtml(svgFile)
    const svgObject = getInputSvgTree(svgHtml)

    return findSvgChildren(svgObject)
  } catch (err: any) {
    console.log('ERR OCCUR', err.message)
  }
}
