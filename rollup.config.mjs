import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/code.js',
  output: {
    file: 'dist/code.js',
    format: 'iife',
  },
  treeshake: {
    moduleSideEffects: 'no-external',
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
  ],
};
