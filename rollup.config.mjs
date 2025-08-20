import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: ['src/code.js', 'src/examples.js'],
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [resolve(), commonjs()],
};
