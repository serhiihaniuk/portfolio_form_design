// Copies the production build (app/dist) to the repo root, which GitHub Pages serves:
// index.html + assets/. Old root assets are removed first so stale hashed files don't pile up.
// Run with: npm run publish:pages   (builds first)
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const app = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(app, 'dist')
const root = join(app, '..')

if (!existsSync(join(dist, 'index.html'))) throw new Error('No build found — run `npm run build` first.')

rmSync(join(root, 'assets'), { recursive: true, force: true })
cpSync(join(dist, 'assets'), join(root, 'assets'), { recursive: true })
cpSync(join(dist, 'index.html'), join(root, 'index.html'))
for (const f of ['favicon.svg', 'icons.svg']) if (existsSync(join(dist, f))) cpSync(join(dist, f), join(root, f))
// Serve files as they are (no Jekyll processing on GitHub Pages).
writeFileSync(join(root, '.nojekyll'), '')
console.log('Published app/dist to the repo root.')
