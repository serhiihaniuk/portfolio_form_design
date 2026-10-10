import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Relative paths, so the build also works from a sub-folder (GitHub Pages).
  base: './',
  // viteSingleFile: the build is ONE minified index.html — JS, CSS and the font inlined, nothing else to deploy.
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
