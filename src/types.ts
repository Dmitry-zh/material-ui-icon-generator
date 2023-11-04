import { HTMLAttributes } from 'react'
import { HTMLElement, Node } from 'node-html-parser'

export type RawTagName = string | null

export type WithRawTagName<T> = T & { rawTagName: RawTagName }

export type ParsedHtml = WithRawTagName<HTMLElement> | Node

export type SvgTree = {
  tag: RawTagName
  attributes: HTMLAttributes<SVGElement> | null
  children: SvgTree[]
}

export type GenCallback = () => Promise<string | undefined>
