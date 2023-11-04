import path from 'path'

import { path as rootPath } from 'app-root-path'

const OUT_DIR = path.join(rootPath, 'output')
const IN_DIR = path.join(rootPath, 'input')

export { OUT_DIR, IN_DIR }
