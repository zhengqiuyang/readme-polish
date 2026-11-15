# readme-polish

[![license](https://img.shields.io/github/license/zhengqiuyang/readme-polish)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/zhengqiuyang/readme-polish?style=flat)](https://github.com/zhengqiuyang/readme-polish/stargazers)

**Upgrade an existing README to the standard of the top repos in its own ecosystem — with a deterministic gate instead of taste alone.**

把一个**已有**的 README 升级到同生态头部仓库的水准：先做原型校准，再选组件，最后用确定性门禁验收。

An [Agent Skills](https://agentskills.io)-compatible skill. For DeepSeek Harness, install the plugin [`dsh-readme-polish`](https://github.com/zhengqiuyang/dsh-readme-polish) instead.

[Install](#install) · [What it does](#what) · [The gate](#gate) · [Verification](#verification) · [Structure](#structure)

<a id="install"></a>

## Install

```bash
npx skills add zhengqiuyang/readme-polish
```

Or copy this directory into `~/.agents/skills/readme-polish`; the skill is self-contained.

<a id="what"></a>

## What it does

1. **Ecosystem calibration** — samples two or three head repositories in the same category and classifies them as minimal-typographic or full-component. A single tool does not get a banner because a list repo has one.
2. **Component selection** — a decision table for badges, mermaid diagrams, callouts, `<details>`, centered heroes and banners, with the condition under which each earns its place. Restraint is part of the output.
3. **Rewrite** — hero with one line of value, explicit anchors, comparison tables where they beat prose, bilingual structure when the repository serves two audiences.
4. **Verification** — run the gate, then the 15-second test: value proposition above the fold, install command on the first screen, what/why/how answered in the first three sections.

Ask in natural language: *"把我的 README 打磨一下"*, *"this README looks plain, compare it with popular repos"*, *"add badges / mermaid / callouts"*.

<a id="gate"></a>

## The gate

`python scripts/check_readme.py README.md` — zero dependencies, no network, no LLM:

| Check | Catches |
|---|---|
| R001 | local link whose target does not exist |
| R002 | broken image or placeholder badge |
| R003 | placeholder image |
| R004 | Chinese heading whose auto-anchor drifted |
| R005 | broken in-page anchor |
| R006 | mermaid diagram with more than seven nodes |
| R007 | table wider than five columns |
| R008 | more than six shields.io badges |
| R009 | no install command above the fold |

Exit codes `0/1/2`; `--strict` also fails on warnings; `--json` for CI.

<a id="verification"></a>

## Verification

This README passes its own gate:

```bash
python scripts/check_readme.py README.md
```

<a id="structure"></a>

## Structure

```
SKILL.md                  # the skill
references/               # component syntax, case studies, competitor survey
scripts/check_readme.py   # deterministic gate
```

## Limitations

- It upgrades an existing README; generating one from scratch belongs to a different skill.
- The gate only settles what is statically decidable. Whether a badge points at something real, and whether a component is worth adding, stay human calls.
- Ecosystem sampling needs the platform API; offline, the skill falls back to a conservative default and says so.

## License

MIT
