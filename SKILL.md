---
name: readme-polish
description: Upgrade an existing README to the visual and structural standard of top repos in its own ecosystem — archetype calibration, component selection, restraint boundaries, honesty rules, and a deterministic lint gate. Use when the user wants to 美化/升级/优化/打磨 a README, says their README looks plain, asks for 徽章/badges/mermaid/callout/折叠块, or wants to compare with popular repos. For a brand-new README or for hero assets, point to dedicated generation or design skills instead.
version: 1.1.0
---

# README 打磨（README Polish）

把一个**已有** README 升级到它所在生态头部仓库的档位。

核心信念：高级感 = 15 秒内能扫完的信息层级 + 每个组件都挣得了自己的位置。**克制也是高级感的一部分。**

## 定位与红线（先读这个）

- 本技能做"升级现有 README"，不做"从零生成"。**这不是空白生态位**：同类 skill 已有几十个，头部近 2000 星，见文末竞品表。我们用差异化定位，不用"没人做过"骗自己
- **诚实红线**：不为不存在的实体添加组件。没有 Discord 就不上 Discord 徽章，没有赞助商就不放赞助表，没有 demo 截图就不放截图占位。星数/更新时间徽章指向的是仓库真实状态，这没问题；伪造"下载量 1M+"是禁止的。查不到的竞品仓库也不写进文档
- **不照搬最佳实践**：不存在普适的"好 README"。先看用户仓库**所在类目**的头部玩家怎么做，再定档位
- **数据时效**：本文与案例库里的星数、竞品结论采样于 **2026-11-09**，仅用于说明流派差距，不用于精确排序；复核时重新查

## 第 0 步：生态校准（工作方法，不是独家专利）

1. **找头部**：用 gh api 找用户仓库所在生态（同 topic / 同工具链 / 同受众）的 2-3 个头部仓库，按星数 + 活跃度排序：
   ```bash
   gh api "search/repositories?q=topic:<topic>&sort=stars&per_page=10" --jq '.items[] | "\(.full_name) | ⭐\(.stargazers_count) | \(.pushed_at[:10])"'
   gh api repos/<owner>/<repo>/readme -H "Accept: application/vnd.github.raw" | head -60
   ```
   注意：本地网络可能不通 github.com 的 HTTPS，**用 gh api（api.github.com）而不是 WebFetch 硬试**
2. **降级路径**：gh 未登录 / 离线 / 用户拒绝授权 / 类目太小找不到可比仓库时，**跳过取样**，直接按下面的类型表取保守默认（单工具 → 中间路线），并在报结论时明确写"未做生态校准，档位取保守默认"。**不要假装校准过**
3. **归流派**：把头部 README 归入两个原型之一
   - **极简排版派**：零徽章零图，纯信息架构 + 文案语气立威（标杆：obra/superpowers，约 30 万⭐）
   - **全组件派**：banner 图 + 徽章墙 + 居中 hero + 赞助商表（标杆：VoltAgent/awesome-agent-skills，约 3.7 万⭐）
4. **定档位**：按用户仓库的类型选视觉档位

| 仓库类型 | 推荐档位 | 理由 |
|---|---|---|
| 单工具 / 单技能 | **中间路线**：徽章排 + mermaid + 原生警告框，不上 banner | banner 是列表/框架仓库的配置，单技能用了显得用力过猛 |
| 列表 / 合集仓库 | 可走全组件派 | 门面即产品，banner 值回票价 |
| 框架 / 方法论 | 两端皆可，偏极简 | 极简传递自信，superpowers 用零徽章立住了 30 万星 |
| 企业 / 商业产品 | 全组件派 + 明暗自适应图 | 品牌资产是真实的，该展示 |

5. **向用户报校准结论再动手**：一句话（"你的类目头部偏 X 派，建议档位 Y，理由 Z"），避免闷头重写后方向不对；走了降级路径也要说明

## 第 1 步：现状审计

- **组件盘点**：现有 README 里有什么组件、缺什么、哪些徽章是死链或指向过期资源
- **15 秒测试（可勾选，三项全过才算通过）**：
  1. 不滚动的首屏能看到一句话价值主张
  2. 前 40 行内能找到一条可直接复制的安装命令（gate 的 R009 会兜底）
  3. "这是什么 / 我为什么要用 / 怎么装"三问的答案都能在 hero + 前三段找到
  任一不过就记为待修项，重写后复测
- **事实清单**：列出所有可验证断言（数字、链接、徽章、对比），逐条标注真实 / 过期 / 虚构。升级时只保留真实的，虚构的删除而不是保留

## 第 2 步：组件选型（决策表）

| 组件 | 风险 | 何时值回票价 | 何时跳过 |
|---|---|---|---|
| GitHub 原生警告框 `> [!NOTE]` 等 | 零（原生渲染） | 安装提示 / 真实运行凭证 / 免责声明 | 无脑到处加会稀释注意力 |
| mermaid 流程图 | 零（原生渲染） | 工作流漏斗、决策检查点 | 架构全景图、>7 节点的大图 |
| `<details>` 折叠 | 零 | 报告结构、长配置、FAQ 全文 | 折叠核心卖点（别把价值藏起来） |
| shields.io 徽章排 | 低 | License / 规范兼容 / 星数 / 更新时间——**全部指向真实** | 给不存在的实体上徽章 |
| 居中 hero + 导航锚点 | 低 | 中间路线 / 全组件派；极简档位只留居中标题 + 一句话价值主张 | 中文/emoji 标题自动锚点不可靠，导航一律显式 `<a id>`；极简档位不要塞徽章排 |
| banner 大图 | 中 | 列表 / 框架 / 商业仓库 | 单工具仓库、没有设计资产时 |
| TOC | 低 | README >300 行 | 短文档（顶部导航链接已够用） |
| 赞助商表 / 社区徽章 | 高 | 实体真实存在时 | 一律先问有没有实体 |

组件语法速查（徽章 URL 模板、警告框五种类型、mermaid 示例、显式锚点写法）→ **references/components.md**

## 第 3 步：重写

- **Hero 区**（居中）：标题 + 一句话价值主张（双语场景下中英各一行）+ 徽章排 + 安装一行命令 + 导航链接；极简档位按上表收窄
- **显式锚点**：`<a id="install"></a>` 放在标题前，导航链接指向它——中文/emoji 标题的自动锚点不可靠
- **对比型价值主张**用 before/after 表格（"一次性提示词 vs 结构化工作流"式），比小标题罗列有力
- **双语结构**：EN 为主时中文内嵌每节标题下；中文为主时 EN 放摘要。不要做成两个独立文件除非用户要求；若已存在双文件，检查是否真的互为翻译（案例 #3 就是假双语对）
- **警告框分工**：NOTE=操作提示，TIP=凭证与亮点，WARNING=风险与免责
- **mermaid ≤7 节点**：只画流程、漏斗、带检查点的决策，不画全景架构

## 第 4 步：验收（缺了这步等于没做）

0. **先跑确定性 gate**（零依赖、无网络、无 LLM，Python 3.8+）：
   ```bash
   python scripts/check_readme.py README.md README.zh-CN.md
   python scripts/check_readme.py --strict --json README.md   # CI 用法
   ```
   覆盖 R001 死链 / R002 裂图与占位徽章 / R003 占位图 / R004 中文自动锚点 / R005 断锚点 / R006 mermaid >7 节点 / R007 表格 >5 列 / R008 徽章 >6 枚 / R009 安装命令不在首屏。默认 error 失败、warning 提示，`--strict` 连 warning 一起失败；退出码 0/1/2。
   **脚本只管能静态判定的**：它不判断"该不该加这个组件"，也不联网验证徽章指向的实体是否真实存在，那两件事仍归人。案例 #2 首跑漏掉的 `[功能](#功能)` 正是 R004，案例 #3 的 License 裂图徽章正是 R002——这两类现在会在提 PR 前被拦下
1. **渲染检查**：mermaid / 徽章 / 警告框只有渲染后才算数——让用户在 GitHub 页面上过一遍，发现裂图/语法错误回来修
2. **诚实审计**：逐个点徽章和链接，确认指向真实存在的实体
3. **锚点检查**：顶部导航每个链接都可达（gate 已静态覆盖，仍需在页面上点一遍）
4. **窄屏检查**：表格 >5 列在手机上会碎，关键表格拆分或换列表
5. **复跑 15 秒测试**：三项重新勾一遍

验收清单不是形式：作者自己首跑就漏过 R004（见案例 #2）。

## 案例库

本技能方法论的真实案例（含流派判断、选型、克制决策、以及一次自我违规的完整过程）→ **references/case-study.md**

## 竞品与生态位（采样于 2026-11-09，星数为当日估值）

| 流派 | 代表 | 管什么 |
|---|---|---|
| 视觉资产 | oil-oil/beautify-github-readme（1,953⭐） | 确定性 SVG 造 hero/banner/图；先问整页还是只造资产 |
| 大而全模式库 | yzhao062/anywhere-agents（父库 261⭐，内含同名 readme-polish）、proflead/codex-skills-library（168⭐，内含同名） | 组件清单、审计问题、坑清单；前者还写了"内容已好就别 thrash" |
| **原型 / 同类校准（正面竞品）** | Systemartis/readmedaddy（8⭐）、chromoany/readme-atlas（4⭐）、Spkicn/mimic（3⭐）、boffti/github-profile-readme（10⭐） | archetype 检测 + 同类取样 + 加权 rubric；200 项目蒸馏 + reader journey；5–7 个可比项目且每条断言可追溯；181 个真实 profile → 9 原型 |
| 事实与校验 | ZardLi1115/readme-skill（38⭐）、FrekiJoms/better-md-skill（8⭐）、tanmayai23/README-Editor-skill（2⭐）、pekral/github-readme-generator（6⭐） | fact-based 起草；51 例反捏造测试 + validation gate；`verify_readme.py`/`check_links.py`；不发明命令与徽章 |

同名但很轻：Elio-SiChien/readme-polish-skill（0⭐）。旧版文档列过的 `tommy0103/better-readme`、`swyxio/ai-readme` 在 2026-11-09 查询均 404，已删除——查不到的仓库不写进文档，这是诚实红线对自己的要求。完整清单与检索方法 → **references/competitors.md**。

**所以不要再说"升级现有 README 是空白生态位"，也不要说"生态校准是独家"。** 原型判断、同类取样、事实核验、甚至确定性校验脚本都有人做了，且多家比本技能更工程化（rubric 加权、候选排序、fact map、可追溯断言、drift hook）。本技能真正占位的是三件小事的**组合**：

1. **中文语境的档位判断**：中文标题自动锚点、中英双文件漂移、国内类目参照
2. **把"刻意没做什么"写成一等产出**，以及"内容越好、产出越小"这个反向验收指标
3. **把本技能自己的克制规则做成可执行 gate**：现有校验脚本多聚焦命令/事实/Markdown 语法，未覆盖中文锚点、裂图徽章、占位图、mermaid 节点、表格列数这组 GitHub 渲染特有的坑

分工：从零生成 → 生成类技能；造 hero 图 → beautify-github-readme；全量 Markdown 规范校验 → better-md-skill。别抢它们的活。
