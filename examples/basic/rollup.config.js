const StachePlugin = require('../../src/index');
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from '@rollup/plugin-replace';
import path from 'path';

export default [
  {
    input: 'basic.js',
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
      resolve(),
      commonjs({
        include: path.join(__dirname, '../../node_modules/**'),
      }),
      StachePlugin()
    ]
  },
]
