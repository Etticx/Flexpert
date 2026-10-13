import { defineConfig } from 'vite';

export default defineConfig({
  // Serve from root (index.html is at project root)
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
