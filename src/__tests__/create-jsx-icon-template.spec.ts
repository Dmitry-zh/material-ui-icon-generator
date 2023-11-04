import { describe, expect, it } from 'vitest'

import { createJsxIconTemplate } from '~/core/generate/create-jsx-icon-template'

import { SvgTree } from '../types'

import { sunTree } from './fixtures/sun-tree'

describe('generate lib tests', () => {
  it('should generate correct template', async () => {
    expect(
      createJsxIconTemplate({
        elements: sunTree as SvgTree['children'],
        iconName: 'sun',
      }),
    ).toMatchSnapshot()
  })
})
