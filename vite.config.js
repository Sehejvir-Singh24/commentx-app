import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [{
    name: 'replace-import-meta',
    renderChunk(code, chunk) {
      if (chunk.name === 'content') {
        return code.replace(/import\.meta\.url/g, "''");
      }
      return code;
    }
  }],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/popup/popup.html'),
        content: resolve(__dirname, 'src/content/index.js'),
        background: resolve(__dirname, 'src/background/service-worker.js')
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'content') return 'src/content/index.js';
          if (chunkInfo.name === 'background') return 'src/background/service-worker.js';
          return 'assets/[name].js';
        }
      }
    }
  }
});
