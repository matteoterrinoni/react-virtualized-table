import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import alias from 'rollup-plugin-alias';
const pkg = require('./package.json')

const libraryName = 'react-virtualized-table'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: "_",
        'react-virtualized': "reactVirtualized"
      },
      sourcemap: true
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react', 'react-dom', 'lodash', 'react-virtualized'],

  watch: {
    include: 'src/**',
  },

  plugins: [

    postcss({
        minimize: true,
        sourceMap: true,
        extract: 'dist/style.css',
      }
    ),

    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      namedExports: {
        'node_modules/react-virtualized/dist/commonjs/index.js': [ 'WindowScroller', 'List' ]
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    alias({
      src: './src'
    }),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
