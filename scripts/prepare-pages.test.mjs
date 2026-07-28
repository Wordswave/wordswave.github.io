import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { preparePages } from './prepare-pages.mjs'

test('copies the application shell to every Pages route and 404.html', async () => {
  const tempDir = await mkdtemp(join(tmpdir(), 'wordswave-pages-'))
  const shell = '<!doctype html><div id="root"></div>'

  try {
    await writeFile(join(tempDir, 'index.html'), shell)
    await preparePages(tempDir)

    for (const route of ['product', 'use-cases', 'docs', 'about']) {
      assert.equal(await readFile(join(tempDir, route, 'index.html'), 'utf8'), shell)
    }
    assert.equal(await readFile(join(tempDir, '404.html'), 'utf8'), shell)
  } finally {
    await rm(tempDir, { recursive: true, force: true })
  }
})
