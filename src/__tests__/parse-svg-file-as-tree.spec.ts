import path from 'path'

import { describe, expect, it } from 'vitest'

import { parseSvgFileAsTree } from '../lib/parse'

describe('parseSvg lib test', () => {
  it('should generate correct template', async () => {
    const input = path.join(__dirname, 'fixtures', 'sun.svg')
    const result = await parseSvgFileAsTree(input)
    expect(result).toMatchSnapshot()
  })
})
