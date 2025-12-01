# AI 图像生成器 - edge one 实现

基于 https://github.com/kaima2022/ShowImageWeb 改造

此项目将原有的 Python Streamlit 应用重新实现为 edge one，提供相同的 AI 图像生成功能，但具有更好的性能、可扩展性和成本效益。

## 功能特性

- **AI 图像生成**: 通过 API 调用生成高质量图像
- **响应式 UI**: 现代化的用户界面，支持各种设备
- **历史记录**: 本地存储生成的图像历史
- **参数控制**: 支持种子、API 配置等参数
- **实时预览**: 生成图像的即时预览
- **下载功能**: 支持下载生成的图像

## 架构设计

### 前端 (HTML/CSS/JavaScript)

- **HTML**: 提供用户界面结构
- **CSS**: 实现现代化的玻璃态设计
- **JavaScript**: 处理用户交互和 API 调用

### 后端 (Cloudflare Worker)

- **API 代理**: 转发图像生成请求到 AI 服务
- **CORS 支持**: 处理跨域请求
- **缓存策略**: 优化静态资源加载
- **安全验证**: API 密钥验证

## 部署说明

### 环境要求

- Node.js 16+
- npm 或 yarn
- edge one 账户

### 安装方法一步骤
1.直接下载该代码，然后console.tencentcloud.com/edgeone/pages，创建项目，直接上传文件

### 安装方法二步骤
1.github fork 该代码，然后console.tencentcloud.com/edgeone/pages，创建项目，导入 Git 仓库

### 安装方法三步骤
基于edgeone cli 部署
1. 安装
   在准备工作阶段克隆下来的项目中，可以通过 npm 来安装 CLI：

   ```bash
   npm install -g edgeone
   ```

   通过 `edgeone -v` 命令，可以查看是否安装成功。通过 `edgeone -h` 命令，可以查看相关的所有命令。

2. 登录
   执行登录命令，按照提示选择 Global （国际站）或 China （中国站），建议选择 Global 以确保获取准确的数据和信息，然后在弹出的浏览器窗口完成登录。

   ```bash
   edgeone login
   ```

   完成登录后可以执行 `edgeone whoami` 查看当前登录账号的信息。

3. 部署到 edgeone:

   ```bash
   edgeone pages deploy --name zplus
   ```

### 本地开发

```bash
edgeone pages deploy -e preview
```

## API 接口

### 生成图像

- **端点**: `POST /api/generate`
- **请求体**:

  ```json
  {
    "prompt": "图像描述",
    "seed": 42
  }
  ```

- **响应**:

  ```json
  {
    "base64": "图像的 base64 编码"
  }
  ```

### 获取配置

- **端点**: `GET /api/config`
- **响应**: 配置信息

## 安全考虑

- API 密钥通过环境变量或请求头传递
- CORS 策略限制跨域访问
- 输入验证防止恶意请求

## 性能优化

- 静态资源缓存
- 图像懒加载
- 响应式设计
- CDN 分发

## 与原 Python 应用的对比

| 特性 | 原 Python Streamlit | Cloudflare Worker |
|------|---------------------|-------------------|
| 部署复杂度 | 需要服务器 | 无服务器 |
| 扩展性 | 需要手动扩展 | 自动扩展 |
| 延迟 | 取决于服务器位置 | 全球 CDN |
| 成本 | 服务器成本 | 按请求计费 |
| 安全性 | 需要额外配置 | 内置安全 |