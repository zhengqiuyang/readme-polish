# Readme polish

An Agent Skill and DeepSeek Harness plugin that upgrades an **existing** README to the standard of the top repositories in its own ecosystem.

It is not a generator. It reads the README, samples the ecosystem's head repositories, and decides what this particular README should look like — then rewrites it and enforces the result with a deterministic gate.

## What it does

1. **Ecosystem calibration** — samples two or three head repositories in the same category (single tool, list, framework, commercial) and picks an archetype: minimal typographic, or full-component.
2. **Component selection** — a decision table for badges, mermaid diagrams, native callouts, `<details>` blocks, centered heroes and banners, each with the condition under which it earns its place.
3. **Rewrite** — hero with one-line value proposition, explicit anchors, comparison tables where they beat prose, bilingual structure when the repository serves two audiences.
4. **Deterministic gate** — `scripts/check_readme.py` checks dead local links, broken or placeholder images, Chinese auto-anchor drift, broken anchors, mermaid node count, table width, badge count, and whether an install command appears above the fold.

## Usage

Ask in natural language:

- "把我的 README 打磨一下"
- "this README looks too plain, compare it with popular repos"
- "add badges / mermaid / callouts to the README"

The skill works in any Agent Skills-compatible agent; in DeepSeek Harness the plugin makes it available through the profile skill catalog.

## Limitations

- It upgrades an existing README; a brand-new README belongs to a generation skill.
- The gate only checks what can be decided statically. It does not verify that a badge's target exists, nor whether a component is worth adding — those remain human decisions.
- Ecosystem sampling needs network access to the platform's API; without it the skill falls back to a conservative default and says so.
