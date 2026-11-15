import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

/** Skill id bundled by this plugin. */
const SKILL = 'readme-polish'
/** Standard precedence rank for packaged skill providers. */
const RANK = 600

export const inject = ['skills']
export const name = 'dsh-readme-polish'

/**
 * Split the bundled SKILL.md into its description and body.
 * The description is read from the YAML frontmatter without pulling a YAML
 * dependency: this package ships one skill with a single-line description.
 */
function parseSkill(raw) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/u.exec(raw)
  if (match === null) throw new Error('dsh-readme-polish: SKILL.md has no YAML frontmatter')
  const line = /^description:\s*([\s\S]*?)(?=\r?\n[a-zA-Z][\w-]*:|$)/mu.exec(match[1])
  if (line === null) throw new Error('dsh-readme-polish: SKILL.md has no description')
  let description = line[1].trim()
  if ((description.startsWith('"') && description.endsWith('"')) || (description.startsWith("'") && description.endsWith("'"))) {
    description = description.slice(1, -1)
  }
  description = description.replace(/\s+/gu, ' ').trim()
  if (description.length === 0) throw new Error('dsh-readme-polish: SKILL.md has an empty description')
  return { description, content: raw.slice(match[0].length).trim() }
}

/**
 * Register the bundled skill with the Harness skill registry.
 * @param ctx - Context carrying the skill registry.
 * @param config - Optional `assetRoot` override; defaults to the package root.
 */
export function apply(ctx, config) {
  const assetRoot = config?.assetRoot ?? fileURLToPath(new URL('./', import.meta.url))
  const directory = assetRoot.split('\\').join('/').replace(/\/$/u, '')
  const locator = join(assetRoot, 'SKILL.md')
  const read = async (signal) => parseSkill(
    await readFile(locator, { encoding: 'utf8', signal }),
  )

  ctx.skills.registerProvider((control) => ({
    name: 'dsh-readme-polish',
    async list(options) {
      try {
        const { description } = await read(options?.signal)
        return {
          candidates: [{
            name: SKILL,
            description,
            invocation: { modelInvocable: true, userInvocable: true },
            provider: 'dsh-readme-polish',
            source: 'bundled',
            rank: RANK,
            resourceBase: { kind: 'directory', path: directory },
            locator,
          }],
          complete: true,
        }
      } catch (error) {
        ctx.logger?.warn?.(`dsh-readme-polish: skill unavailable: ${String(error)}`)
        control.invalidate()
        return { candidates: [], complete: false }
      }
    },
    async get(candidate, options) {
      const { content } = await read(options?.signal)
      const { rank: _rank, locator: _locator, ...summary } = candidate
      return { ...summary, content }
    },
  }))
}
