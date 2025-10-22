import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    cssCodeSplit: true,
    lib: {
      entry: 'src/lib.ts',
      fileName: (format, entryName) => {
        if (format === 'es') {
          return `${entryName}.mjs`;
        }
        if (format === 'cjs') {
          return `${entryName}.cjs`;
        }
        return `${entryName}.js`;
      },
      formats: ['es', 'cjs'],
    },
    outDir: 'lib',
    rollupOptions: {
      external: (id) => !id.startsWith('.') && !path.isAbsolute(id) && !id.endsWith('.css') && !id.endsWith('.scss'),
      output: {
        banner: '"use client";',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
  plugins: [
    react(),
    dts({
      exclude: ['stories'],
      insertTypesEntry: true,
    }),
  ],
  sourcemap: false,
});
