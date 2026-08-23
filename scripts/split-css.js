import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const lines = readFileSync(join(root, 'src/styles/main.css'), 'utf8').split('\n')

function slice(from, to) {
  return lines.slice(from - 1, to).join('\n').trim()
}

function write(relPath, content) {
  const full = join(root, relPath)
  mkdirSync(dirname(full), { recursive: true })
  writeFileSync(full, content + '\n', 'utf8')
}

write(
  'src/styles/global.css',
  slice(1, 22) + '\n\n' + slice(2166, 2176),
)

write('src/styles/header.css', slice(24, 281))
write('src/styles/hero.css', slice(287, 474))
write('src/styles/projects.css', slice(475, 744))
write('src/styles/discover.css', slice(745, 929) + '\n\n' + slice(1104, 1148))
write('src/styles/payment-modal.css', slice(931, 1102))
write('src/styles/crowdfeed.css', slice(1150, 1359))
write('src/styles/how-it-works.css', slice(1361, 1438))
write('src/styles/footer.css', slice(1439, 1613))
write('src/styles/responsive.css', slice(1615, 2162))
write('src/styles/start-campaign.css', slice(2178, 2456))

console.log('CSS split complete')
