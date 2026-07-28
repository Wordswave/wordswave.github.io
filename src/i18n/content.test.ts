import { describe, expect, it } from 'vitest'
import { content } from './content'

function contentShape(value: unknown): unknown {
  if (Array.isArray(value)) {
    return {
      length: value.length,
      items: value.map(contentShape),
    }
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, contentShape(item)]),
    )
  }

  return typeof value
}

describe('bilingual content contract', () => {
  it('keeps the complete English and Chinese trees structurally equivalent', () => {
    expect(contentShape(content.en)).toEqual(contentShape(content.zh))
  })

  it('uses the approved direct product language', () => {
    expect(content.en.home.hero.lines).toEqual([
      'Describe the part',
      'Create the model',
      'Review the result',
    ])
    expect(content.zh.home.hero.lines).toEqual([
      '描述零件需求',
      '生成 CAD 模型',
      '检查输出结果',
    ])
    expect(content.en.product.demo.toolbar).toBe('WordsWave / Interactive preview')
    expect(content.zh.product.demo.toolbar).toBe('WordsWave / 交互预览')
    expect(content.en.product.video).not.toHaveProperty('support')
    expect(content.zh.product.video).not.toHaveProperty('support')
  })

  it('does not contain retired slogans or the old visible brand', () => {
    const runtimeCopy = JSON.stringify(content)

    expect(runtimeCopy).not.toMatch(
      /Build with evidence|Geometry, decisions, and evidence stay connected|Evidence stays with the geometry|Watch the current CAD creation and review workflow|让模型带上证据|让几何、决策与证据始终相连|证据始终与几何相连|了解当前 CAD 创建与检查流程|CAD\s*\/\s*AGENT/,
    )
  })

  it('snapshots every runtime string in both languages', () => {
    expect(content).toMatchSnapshot()
  })
})
