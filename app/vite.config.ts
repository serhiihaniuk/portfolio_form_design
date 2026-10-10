import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths, so the build also works from a sub-folder on GitHub Pages.
  base: './',
  plugins: [react(), tailwindcss()],
})
