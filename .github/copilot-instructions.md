## 快速目标
让 AI 代理快速上手并完成可交付的更改：前端为单页静态应用，后端为一个简单的 Express 静态/代理服务器，内容多为本地 JSON 数据替代实时 API。

## 一键启动（开发）
- 安装依赖：`npm install`
- 开发启动（nodemon）：`npm run dev` — 启动项在 `package.json`，server.js 中默认端口为 `3002`，浏览器访问 `http://localhost:3002` 做快速校验。

## 大体架构与数据流（必须组合阅读）
- 静态单页：`index.html` + `styles.css` + `main.js`（负责 DOM、事件、所有数据加载与页面逻辑）
- 静态内容：`data/*.json`（about-data.json、achievements-data.json、github-data.json、steam-data.json）——前端通过 fetch 读取这些文件作为“离线”/兜底数据源。
- 后端代理：`server.js`（Express）静态托管项目根目录并提供一个 Steam API 代理路由 `/api/steam/info`。注意：仓库中含有明确的 STEAM_API_KEY 字符串，尽量不要把真实 key 提交到远程仓库。

## 项目特有约定（请照搬）
- 优先修改 `data/*.json` 来更新页面内容而非直接改 `main.js`；前端以这些 JSON 的结构为“契约”。
- `github-data.json` 必要字段示例：`{ userInfo: {followers, public_repos, ...}, repositories: [{name, description, language, html_url, homepage}, ...] }`。
- `about-data.json` 中 `skills` 项的 shape：`{ name, level (0-100), color, icon }`。技能进度环半径与 `main.js` 中的常量 54 有耦合（stroke-dashoffset 计算）。
- `achievements-data.json` 中每项包含 `{ id, title, issuer, date, description, image, category }`，前端点击会打开 lightbox（参见 `openLightbox`）。

## 常见修改场景 & 示例
- 增加/修改个人简介或技能：编辑 `data/about-data.json`，然后在浏览器刷新查看。
- 更新项目卡片：编辑 `data/github-data.json.repositories` 中的条目，保证 `name` 与 `html_url` 字段存在以在 UI 中显示链接。
- 更换 Doraemon 的吐司消息：编辑 `messages.txt`（每行一条），`main.js` 会随机读取并展示。

## 注意事项与易错点
- 端口与 README 不一致：README 提到 `3001`，但实际 `server.js` 使用 `PORT = 3002`，以 `server.js` 为准。
- 敏感信息：`server.js` 内含 STEAM_API_KEY；不要把真实密钥移动到前端或提交到公共仓库。更改时可改为通过环境变量读取。
- 弃用代码：`main.js` 注释有“旧 API 已弃用”的说明，当前页面依赖静态 `data/*.json`。若要恢复实时 API，需同时修改前端调用逻辑与后端代理。
- 没有自动测试或 lint：仓库没有测试框架，提交前请本地手动 smoke-test（浏览器打开主页、检查控制台错误）。

## 代码位置速查
- UI/逻辑：`main.js`（事件、加载流程、DOM 更新函数，如 `loadAllStaticData`, `updateSkillsDisplay`, `loadStaticSteamData`）。
- Server / proxy：`server.js`（静态托管 + `/api/steam/info`）。
- 内容：`data/*.json`, `messages.txt`。
- 样式：`styles.css`（包含大量 CSS 动画与响应式断点）。

## 简短 PR 检查清单（AI 生成改动时）
1. 修改内容后运行 `npm run dev`，打开 `http://localhost:3002` 验证视觉与交互（主要功能：projects、steam、about、achievements）。
2. 检查浏览器控制台无明显错误（特别是 JSON parsing、fetch 路径、CORS 问题）。
3. 内容改动首选 `data/*.json`；样式改动限 `styles.css`；行为改动限 `main.js` 并避免破坏现有 DOM id/class。
4. 若改动涉及后端，把密钥改为 process.env，并在 README 或 PR 描述中说明如何配置环境变量。

## 如果不确定，请看这些文件：
- `main.js`（加载/渲染流程和 DOM contract）
- `server.js`（端口、代理、静态托管）
- `data/github-data.json`、`data/about-data.json`、`data/steam-data.json`（数据形状样例）

请审阅这份说明并告诉我哪些地方需要更详细的示例或补充（例如要把 STEAM_API_KEY 改为环境变量的具体补丁或添加简单的 smoke test）。

## GitHub Pages 部署注意（重要）
- 本项目主站点部署目标是 GitHub Pages（纯静态托管）。这意味着：
	- 不要依赖仓库内的 `server.js` 在生产上提供 API；GitHub Pages 不运行 Node。`server.js` 仅作本地开发/调试（或自行部署到 Vercel/Heroku 等）用途。
	- 保持 `index.html` 与静态资源引用为相对路径（仓库当前做法已经是相对路径），避免在构建/发布时破坏静态结构。

- 如果你需要“实时” Steam / GitHub 数据，请采取其中之一：
	1. 部署一个独立的代理（Vercel/Netlify/Heroku），把真实的 STEAM_API_KEY 放在该平台的环境变量中，然后将 `main.js` 中的调用指向该代理（比如 `https://my-proxy.example.com/api/steam/info`）。
	2. 保持仓库内的静态 `data/steam-data.json` 作为默认/兜底数据，前端在生产环境下（非 localhost）优先使用静态文件：
		 - 推荐模式（不修改后端）：在 `main.js` 中使用条件 fetch，例如：
			 - 如果 hostname 是 `localhost` 或端口 `3002`，调用 `/api/steam/info`；否则 fetch `./data/steam-data.json`。
		 - 这样可以保证 GitHub Pages 上始终可用且不泄露密钥。

- 安全提示：仓库中已有明文 `STEAM_API_KEY`（存在于 `server.js`），建议移除/替换：
	- 把密钥从仓库删除并添加到 `.gitignore` 的任何密钥文件，或改为只通过部署平台的环境变量提供；
	- 如果你希望我提交补丁，我可以：
		- 将 `server.js` 修改为从 `process.env.STEAM_API_KEY` 读取（保留原逻辑），并在仓库中添加说明如何在本地用 `cross-env` 或 `.env` 提供（但不提交实际密钥）；或
		- 直接删除仓库内的明文密钥并提交一个 `.env.example`。

请告知是否要我替你：
- 把 `server.js` 改为环境变量读取并移除硬编码密钥，还是
- 在 `main.js` 中加入生产环境使用静态 `data/steam-data.json` 的条件-fetch 模式（这不会影响 GitHub Pages 部署）。
