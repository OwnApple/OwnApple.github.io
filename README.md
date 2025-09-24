# OwnApple 的个人作品集网站

这是一个融合哆啦A梦元素的现代化个人作品集网站，具有以下特点：

## 特点

- 响应式设计，适配移动端和桌面端
- 现代化的设计风格，融合哆啦A梦主题元素
- 哆啦A梦交互式导航菜单
- GitHub项目自动展示
- Steam实时数据集成
- 流畅的CSS过渡动画效果
- 展示个人项目、技能和联系方式

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 后端：Node.js, Express
- API集成：GitHub API, Steam Web API

## 本地运行说明

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
# 开发模式
npm run dev

# 或者生产模式
npm start
```

### 3. 访问网站

打开浏览器访问 `http://localhost:3001`

## 项目结构

```
/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── main.js         # 前端JavaScript文件
├── server.js       # 后端服务器文件
├── package.json    # 项目配置文件
├── images/         # 图片资源文件夹
└── README.md       # 项目说明文档
```

## 功能说明

### 哆啦A梦交互式导航
- 点击右下角的哆啦A梦头像
- 哆啦A梦会先说一句话，然后显示圆形气泡菜单选项
- 选择菜单选项可以导航到不同页面部分
- 菜单选项包括：主页、项目、Steam、关于、联系

### GitHub集成
- 自动获取GitHub项目信息
- 显示项目名称、描述和技术标签
- 提供查看代码和演示的链接
- 显示关注者数量

### Steam集成
- 获取游戏库数量
- 显示最近玩过的游戏
- 展示个人资料信息
- 显示在线状态

## 自定义内容

你可以通过修改以下文件来自定义网站内容：

- `index.html`: 更新个人信息、项目描述等
- `styles.css`: 调整样式和主题颜色
- `main.js`: 添加新的交互功能
- `server.js`: 修改API集成逻辑
- `images/`: 替换图片资源

## 部署说明

本项目可以直接部署到任何支持Node.js的服务器平台，如：
- Heroku
- Vercel (需要配置)
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## 安全提醒

请勿将API密钥直接暴露在前端代码中。本项目使用后端代理来保护API密钥的安全。