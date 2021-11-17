import stachePlugin from 'rollup-plugin-stache';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import path from 'path';

export default [
  {
    input: 'index.js',
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: 'inline',
    },
    plugins: [
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify( 'production')
      }),
      nodeResolve({
        moduleDirectories: [path.join(__dirname, '../../node_modules')]
      }),
      commonjs({
        include: path.join(__dirname, '../../node_modules/**'),
      }),
      ...stachePlugin()
    ]
  },
]
