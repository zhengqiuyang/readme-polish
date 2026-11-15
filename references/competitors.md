# 竞品清单（采样于 2026-11-09）

维护者文档。星数为当日 GitHub API 估值，会变；**引用前复核**。检索方法：

```bash
gh api "search/repositories?q=readme+skill+in:name,description+topic:claude-skill&sort=stars&per_page=30" \
  --jq '.items[] | "\(.full_name) | ⭐\(.stargazers_count)"'
gh api "search/repositories?q=readme+skill+in:name,description+topic:agent-skills&sort=stars&per_page=30" \
  --jq '.items[] | "\(.full_name) | ⭐\(.stargazers_count)"'
gh api "repos/<owner>/<repo>" --jq '.stargazers_count'          # 复核单个
gh api -H "Accept: application/vnd.github.raw" "repos/<o>/<r>/contents/<path>/SKILL.md"
```

## 1. 视觉资产流

| 项目 | ⭐ | 核心机制 | 与本技能的关系 |
|---|---|---|---|
| [oil-oil/beautify-github-readme](https://github.com/oil-oil/beautify-github-readme) | 1,953 | 确定性 SVG 作布局系统，纯 SVG / 混合 SVG+栅格；先问「整页 README 还是只造资产」；读仓库真实信息再设计；保留用户改动，未授权不 commit/push | 赛道头部，重心是**造图**；本技能重心是**选组件与定档位**。要 hero 图时应指向它 |

## 2. 大而全模式库（含同名 readme-polish）

| 项目 | ⭐ | 核心机制 | 与本技能的关系 |
|---|---|---|---|
| [yzhao062/anywhere-agents](https://github.com/yzhao062/anywhere-agents) · `skills/readme-polish/SKILL.md` | 261（父库） | Phase 1 审计 11 问、Phase 2 组件模式库、Phase 3 渲染验收清单、Common Pitfalls；明确 "When NOT to Use: … Do not thrash for style"；含跨语言 drift、WCAG AA、渲染资产源文件提交 | **直接同名且更详尽**。它的「内容已好就别 thrash」与我们的克制边界重合 |
| [proflead/codex-skills-library](https://github.com/proflead/codex-skills-library) · `skills/docs/readme-polish/SKILL.md` | 168（父库） | 同名但只有约 20 行：补 install/run/test、环境变量、FAQ | 同名弱实现，不构成方法论竞争 |

## 3. 原型 / 同类校准流（正面竞品，最需要正视）

| 项目 | ⭐ | 核心机制 | 与本技能的关系 |
|---|---|---|---|
| [Systemartis/readmedaddy](https://github.com/Systemartis/readmedaddy) | 8 | archetype 检测（CLI / library / framework / app / infra / data-ML / agent skill…）+ 10 个按类目加权的质量门 + 候选排序 + claim verification + drift hook | 原文："A README is judged by its archetype … **Match the work to its peers, not to a checklist**"。几乎是「生态校准 + 档位」的工程化完整版 |
| [chromoany/readme-atlas](https://github.com/chromoany/readme-atlas) | 4 | 从 200 个开源项目蒸馏；fact map；按仓库类型选 reader journey；Create / Improve / Review / Translate 四模式 | 原文："**A popular project's README is evidence of one editorial choice, not a universal template**"。比"不照搬最佳实践"说得更准 |
| [Spkicn/mimic](https://github.com/Spkicn/mimic) | 3 | 读 5–7 个可比项目，每个写明「为什么可比 / 为什么至少拒绝一个 / 许可证」；"every statement … must trace to something you actually read or ran"；区分 confident invention 与 inert presence | **同类取样 + 反捏造比本技能更硬**：我们只要求 2–3 个头部仓库，且没要求断言可追溯 |
| [boffti/github-profile-readme](https://github.com/boffti/github-profile-readme) | 10 | 520 个真实 profile（181 精选 + 339 搜索）→ 9 种原型；"a coherent style with real substance beats a pile of widgets" | 原型分类 + 克制的另一个版本；但对象是 profile README，不是项目 README |
| [automagik-dev/genie](https://github.com/automagik-dev/genie) · `mikro/.mikro/agents/readme-polish/TASK.md` | — | 逐条核对 README 里的命令 / flag / 路径 / 断言是否与当前代码一致；要求复查上一轮报告每条 WRONG/STALE/GAP，标记 CLOSED 或 STILL OPEN 并附新证据 | **事实审计比本技能严**，是"诚实红线"的更强实现 |

## 4. 事实与校验流

| 项目 | ⭐ | 核心机制 | 与本技能的关系 |
|---|---|---|---|
| [ZardLi1115/readme-skill](https://github.com/ZardLi1115/readme-skill) | 38 | fact-based README drafting | 旧版文档列过，2026-11-09 复核仍在，星数 38 属实 |
| [FrekiJoms/better-md-skill](https://github.com/FrekiJoms/better-md-skill) | 8 | CommonMark/GFM 规范、markdownlint 风格检查、validation gate、51 例 anti-fabrication fixtures、明确 "Never invent URLs, icon URLs, badge URLs" | 通用 Markdown 工程化；全量规范校验应指向它 |
| [tanmayai23/README-Editor-skill](https://github.com/tanmayai23/README-Editor-skill) | 2 | `verify_readme.py` 核对每条命令/env var/path、`check_links.py`、`score_readme.py`、bench 验证集 | **确定性校验脚本不是空白**：已有人做了，但聚焦命令/事实/链接，不覆盖 GitHub 渲染特有的坑 |
| [pekral/github-readme-generator](https://github.com/pekral/github-readme-generator) | 6 | 从 verified code / manifests / scripts / tests 写 README，声明 "no invented commands, badges or claims" | 诚实红线的同类实现 |

其他同类（未逐一深读）：[CreativesLibrary/oss-launch](https://github.com/CreativesLibrary/oss-launch) 16⭐、[KieranGao/general-readme-skill](https://github.com/KieranGao/general-readme-skill) 41⭐、[liang-senbei/curating-readme](https://github.com/liang-senbei/curating-readme) 2⭐、[Elio-SiChien/readme-polish-skill](https://github.com/Elio-SiChien/readme-polish-skill) 0⭐（有 `references/quality-check.md` 与 `sources.md`，fact-checked 路线）。

## 5. 检索噪声：高星但不同赛道

`xianyu110/awesome-openclaw-tutorial` 4,576⭐（教程合集）、`anuraghazra/github-readme-stats` 79,843⭐（动态统计卡片）、`study8677/Readme.skill` 176⭐（把 CLI 历史生成开发者档案 + SVG poster）、`tianfuzhibuyuci/readme-visual-kit` 207⭐（生成三张说明图）、`geekjourneyx/readme-generator` 50⭐（生成）。**别拿这些当竞品给自己壮胆，也别拿它们论证赛道空白。**

## 6. 结论：我们真正占的是什么

不是"升级现有 README"（红海），不是"生态校准"（四家做过且更工程化），不是"诚实"（至少五家写过），也不是"确定性校验"（已有人做了脚本）。能站住的只有三件小事的**组合**：

1. 中文语境的档位判断（中文标题自动锚点、中英双文件漂移、国内类目参照）
2. 「刻意没做什么」作为一等产出 + 「内容越好、产出越小」的反向验收指标
3. 把本技能**自己的克制规则**做成 gate：`scripts/check_readme.py` 覆盖中文锚点 / 裂图与占位徽章 / 占位图 / mermaid 节点 / 表格列数 / 徽章数量 / 安装命令首屏——现有校验脚本多聚焦命令、事实、Markdown 语法，未覆盖这组 GitHub 渲染特有的坑

这三条是**组合优势，不是单点独家**。对外描述时不要写成"首个 / 唯一 / 空白生态位"，被搜一下就会翻车。

## 7. 已失效引用（诚实红线自查）

旧版 SKILL.md 竞品段列过 `tommy0103/better-readme`（30⭐）与 `swyxio/ai-readme`，2026-11-09 用 `gh api repos/...` 查询**均返回 404**（改名 / 删库 / 记错）。已删除，不再作为可验证断言。
