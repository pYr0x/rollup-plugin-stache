const StachePlugin = require('../../src/index');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('@rollup/plugin-replace');
const path = require('path');

module.exports = [
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
      resolve(),
      commonjs({
        include: path.join(__dirname, '../../node_modules/**'),
      }),
      StachePlugin()
    ]
  },
]
