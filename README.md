<a id="top"></a>

<div align="center">

# 📝 readme-polish

**Upgrade an existing README to the standard of the top repos in its own ecosystem — with a deterministic gate instead of taste alone.**

把一个**已有**的 README 升级到同生态头部仓库的水准：先做原型校准，再选组件，最后用确定性门禁验收。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-compatible-8A2BE2?style=flat-square)](https://agentskills.io)
[![Stars](https://img.shields.io/github/stars/zhengqiuyang/readme-polish?style=flat-square&color=0969da)](https://github.com/zhengqiuyang/readme-polish/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/zhengqiuyang/readme-polish?style=flat-square&label=updated)](https://github.com/zhengqiuyang/readme-polish/commits/main)

```bash
npx skills add zhengqiuyang/readme-polish
```

[What it is](#what) · [What it does](#does) · [Real runs](#runs) · [The gate](#gate) · [Install](#install) · [Structure](#structure)

Works with **Claude Code · Codex · Cursor · Gemini CLI** and any [Agent Skills](https://agentskills.io)-compatible agent. In DeepSeek Harness, install the plugin [`dsh-readme-polish`](https://github.com/zhengqiuyang/dsh-readme-polish).

</div>

---

<a id="what"></a>

## What it is / 这是什么

A skill that reads an existing README, samples the head repositories of its own category, and decides what that README should look like — then rewrites it and enforces the result with a deterministic gate. It is not a template generator.

一个读取已有 README、先取样同生态头部仓库、再决定它该长什么样的技能——改完后用确定性门禁验收，而不是套模板。

<a id="does"></a>

## What it does / 做什么

1. **Ecosystem calibration** — samples two or three head repositories in the same category and classifies them as minimal-typographic or full-component. A single tool does not get a banner because a list repo has one.
2. **Component selection** — a decision table for badges, mermaid diagrams, callouts, `<details>`, centered heroes and banners, with the condition under which each earns its place. Restraint is part of the output.
3. **Rewrite** — hero with one line of value, explicit anchors, comparison tables where they beat prose, bilingual structure when the repository serves two audiences.
4. **Verification** — run the gate, then the 15-second test: value proposition above the fold, install command on the first screen, what/why/how answered in the first three sections.

<a id="runs"></a>

## Three real runs / 三次真实运行

| Repository | What the run caught | Output |
|---|---|---|
| `monetize-skill` | No factual errors; a full rewrite was the right call | ~100 lines, 5 real badges, 7-node mermaid |
| `WattWatch` | Dead screenshot link, no LICENSE, no topics, one wrong test count | Structural rebuild |
| `clipbrain` | **Zero** factual errors, but a fake bilingual pair and a broken License badge | Small surgery, +99/−73 |

The last row is the point: when the content is already good, the correct output is small. Volume is not the goal — calibration and catching structures that lie about themselves are. Full write-ups: [references/case-study.md](references/case-study.md).

<a id="gate"></a>

## The gate / 门禁

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

Ask in natural language: *"把我的 README 打磨一下"*, *"this README looks plain, compare it with popular repos"*, *"add badges / mermaid / callouts"*.

<a id="install"></a>

## Install / 安装

```bash
npx skills add zhengqiuyang/readme-polish
```

Or copy this directory into `~/.agents/skills/readme-polish`; the skill is self-contained.

<a id="structure"></a>

## Structure / 结构

```
SKILL.md                  # the skill
references/               # component syntax, case studies, competitor survey
scripts/check_readme.py   # deterministic gate
```

## Limitations / 限制

- It upgrades an existing README; generating one from scratch belongs to a different skill.
- The gate only settles what is statically decidable. Whether a badge points at something real, and whether a component is worth adding, stay human calls.
- Ecosystem sampling needs the platform API; offline, the skill falls back to a conservative default and says so.

## License

MIT
