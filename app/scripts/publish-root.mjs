// Copies the production build to the repo root, which GitHub Pages serves.
// The build is a single minified index.html (vite-plugin-singlefile), so that is the only file to publish;
// leftovers from older multi-file builds (assets/, favicon.svg) are removed.
// Run with: npm run publish:pages   (builds first)
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(app, 'dist')
const root = join(app, '..')

if (!existsSync(join(dist, 'index.html'))) throw new Error('No build found — run `npm run build` first.')

rmSync(join(root, 'assets'), { recursive: true, force: true })
rmSync(join(root, 'favicon.svg'), { force: true })
cpSync(join(dist, 'index.html'), join(root, 'index.html'))
// Serve files as they are (no Jekyll processing on GitHub Pages).
writeFileSync(join(root, '.nojekyll'), '')
console.log('Published app/dist/index.html to the repo root.')
