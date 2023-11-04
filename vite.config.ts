import { resolve } from 'path'

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
      },
    },
    lib: {
      entry: resolve(__dirname, 'output/index.js'),
      formats: ['es'],
    },
    outDir: 'lib',
  },
})
