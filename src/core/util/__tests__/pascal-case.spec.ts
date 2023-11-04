import { describe, it, expect } from 'vitest'

import { pascalCase } from '../index'

describe('Pascal case util test', () => {
  it.each([
    ['foo bar', 'FooBar'],
    ['fooBar', 'FooBar'],
    ['--foo---Bar', 'FooBar'],
    ['FooBar', 'FooBar'],
    ['', ''],
  ])(
    'should correctly transform input: "%s" to PascalCase "%s"',
    (input, expected) => {
      expect(pascalCase(input)).toBe(expected)
    },
  )

  it('should throw error when input not defined', () => {
    expect(() => pascalCase(undefined)).toThrow()
  })
})
