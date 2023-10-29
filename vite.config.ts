import { resolve } from 'path'

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'output/index.js'),
      // TODO: from envs
      name: 'material-ui-my-icons',
      formats: ['umd'],
    },
    outDir: 'lib',
  },
})
