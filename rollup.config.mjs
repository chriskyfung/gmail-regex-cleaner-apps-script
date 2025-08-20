import copy from 'rollup-plugin-copy';

export default {
  input: ['src/code.js'],
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    copy({
      targets: [{ src: 'src/appsscript.json', dest: 'dist' }],
    }),
  ],
};
