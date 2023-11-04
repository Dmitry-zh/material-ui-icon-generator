import { HTMLElement } from 'node-html-parser'

import { SvgTree, ParsedHtml, WithRawTagName } from '~/types'

export class SvgTreeObject implements SvgTree {
  constructor(el: ParsedHtml) {
    this.tag = (el as WithRawTagName<HTMLElement>).rawTagName ?? null
    this.attributes = (el as WithRawTagName<HTMLElement>).attributes ?? null
    this.children = []
  }

  addChild(child: SvgTreeObject) {
    this.children.push(child)
  }

  tag: SvgTree['tag']
  attributes: SvgTree['attributes']
  children: SvgTree['children']
}
