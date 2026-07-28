import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

export const pageRoutes = ['product', 'use-cases', 'docs', 'about']

export async function preparePages(distDir = resolve('dist')) {
  const shellPath = join(distDir, 'index.html')

  for (const route of pageRoutes) {
    const target = join(distDir, route, 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await copyFile(shellPath, target)
  }

  await copyFile(shellPath, join(distDir, '404.html'))
}

const entryPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : ''
if (import.meta.url === entryPath) {
  await preparePages()
}
