import { defineConfig } from 'tsup';
import { builtinModules } from 'module';

export default defineConfig(() => ({
  splitting: false,
  minify: true,
  shims: true,
  dts: true,
  clean: true,
  format: ['esm', 'cjs'],
  entry: {
    index: 'src/index.ts'
  },
  external: [...builtinModules]
}));
