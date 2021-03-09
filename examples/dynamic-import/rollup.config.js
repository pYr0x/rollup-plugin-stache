import StachePlugin from '../../src/index';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from "rollup-plugin-terser";
import cleanup from 'rollup-plugin-cleanup';

import path from 'path';

export default [
  {
    input: 'index.js',
    output: {
      dir: 'dist',
      format: 'esm',
      // sourcemap: 'inline',
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify( 'production')
      }),
      resolve({ browser:true, preferBuiltins: true }),
      commonjs({
        include: path.join(__dirname, '../../node_modules/**'),
      }),
      StachePlugin(),
      terser({
        output: {
          comments: "all"
        }
      }),
      cleanup({
        comments: "license"
      })
    ]
  },
]
