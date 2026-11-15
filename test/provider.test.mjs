import assert from 'node:assert/strict'
import { apply } from '../index.js'

let captured = null
const ctx = {
  skills: {
    registerProvider(factory) {
      captured = factory({ invalidate() {} })
      return () => {}
    },
  },
  logger: { warn: () => {} },
}

apply(ctx, {})

assert.ok(captured, 'a provider must be registered')
assert.equal(captured.name, 'dsh-readme-polish')

const listed = await captured.list({})
assert.equal(listed.complete, true)
assert.equal(listed.candidates.length, 1)

const [candidate] = listed.candidates
assert.equal(candidate.name, 'readme-polish')
assert.equal(candidate.provider, 'dsh-readme-polish')
assert.equal(candidate.source, 'bundled')
assert.equal(candidate.invocation.modelInvocable, true)
assert.equal(candidate.invocation.userInvocable, true)
assert.equal(candidate.resourceBase.kind, 'directory')
assert.ok(candidate.description.length > 100, 'description must be a real summary')
assert.ok(candidate.locator.endsWith('SKILL.md'))

const loaded = await captured.get(candidate, {})
assert.equal(loaded.name, 'readme-polish')
assert.ok(loaded.content.startsWith('# '), 'skill body must start with a heading')
assert.ok(loaded.content.includes('README 打磨'), 'skill body must include the skill title')
assert.ok(!('rank' in loaded), 'rank is a catalog detail, not part of the loaded skill')

console.log('ok: provider lists and loads the bundled skill')
