import { resolve } from 'path'

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      outDir: 'lib',
      entryRoot: 'output',
      copyDtsFiles: true,
    }),
  ],
  build: {
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
      },
    },
    lib: {
      entry: resolve(__dirname, 'output'),
      formats: ['es'],
      name: 'icons',
    },
    outDir: 'lib',
  },
})
