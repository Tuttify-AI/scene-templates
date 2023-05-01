import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import url from '@rollup/plugin-url';
import image from '@rollup/plugin-image';
import files from 'rollup-plugin-import-file';
import autoprefixer from 'autoprefixer';
import svgr from '@svgr/rollup';
import styles from 'rollup-plugin-styles';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: false,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    styles({
      modules: true,
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    url(),
    image(),
    svgr(),
    files({
      output: `build/`,
      plugins: [autoprefixer()],
      extensions: /\.(mp3)$/,
    }),
  ],
};
