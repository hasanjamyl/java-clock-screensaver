
import { defineConfig } from 'vite';

export default defineConfig({
  // Set this to your repository name if hosting at username.github.io/repo-name/
  // Use '/' if hosting at a custom domain or username.github.io
  base: './', 
  build: {
    outDir: 'dist',
  }
});
