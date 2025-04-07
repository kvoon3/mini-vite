import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { rimraf } from 'rimraf'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: [
    './src/main.ts',
    './src/client.ts',
  ],
  output: {
    dir: 'dist',
  },
  plugins: [
    json(),
    commonjs(),
    typescript(),
    nodeResolve(),
    {
      name: 'rollup-plugin-clean-dist',
      buildStart() {
        return rimraf('./dist', {
          preserveRoot: true,
        })
      },
    },
  ],
})
