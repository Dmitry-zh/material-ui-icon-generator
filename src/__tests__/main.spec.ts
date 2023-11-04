import path from 'path'
import fs from 'fs'

import { describe, vi, it, expect, beforeEach, afterEach } from 'vitest'
import { path as rootPath } from 'app-root-path'

import { main } from '~/core/main'
import { logger } from '~/util'

vi.mock('~/constants', async () => ({
  IN_DIR: path.join(rootPath, 'src', '__tests__', 'fixtures'),
  OUT_DIR: path.join(rootPath, 'src', '__tests__', 'test_result'),
}))
vi.mock('~/util', async () => {
  const actual = await vi.importActual<typeof import('~/util')>('~/util')
  return {
    ...actual,
    logger: {
      info: vi.fn(),
      error: vi.fn(),
    },
  }
})
describe('Main func test', () => {
  const generatedDir = path.join(__dirname, 'test_result')

  beforeEach(async () => {
    await main()
  })
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should generate Sun icon file', async () => {
    const sunResultPath = path.join(generatedDir, 'Sun.js')
    const sunOutput = fs.readFileSync(sunResultPath, { encoding: 'utf-8' })

    expect(sunOutput).toMatchSnapshot()
  })

  it('should generate index instance', async () => {
    const indexPath = path.join(generatedDir, 'index.js')
    const indexOutput = fs.readFileSync(indexPath, { encoding: 'utf-8' })

    expect(indexOutput).toMatchSnapshot()
  })

  it('should write correct logs', async () => {
    const mockInfo = vi.fn()
    vi.mocked(logger.info).mockImplementation(mockInfo)
    await main()

    expect(mockInfo).toHaveBeenCalledWith('GENERATION STARTED')
    expect(mockInfo).toHaveBeenCalledWith('OUTPUT DIR WAS CREATED')
    expect(mockInfo).toHaveBeenCalledWith('FOUND: %d .svg FILES TO GENERATE', 1)
    expect(mockInfo).toHaveBeenCalledWith('GENERATED %d / %d files', 1, 1)
    expect(mockInfo).toHaveBeenCalledWith('WRITTEN ICONS FOR FILES: %s', [
      'sun.svg',
    ])
    expect(mockInfo).toHaveBeenCalledWith('GENERATION COMPLETED')
  })
})
