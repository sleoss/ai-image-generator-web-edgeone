// Edge Functions for AI Image Generation
// Replaces the Cloudflare Worker functionality using EdgeOne Pages Functions

// Main request handler for the root path
export function onRequest(context) {
  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShowImageWeb - AI图像生成器</title>
    <link rel="stylesheet" href="/assets/style">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        <!-- 侧边栏 -->
        <aside class="sidebar">
            <div class="sidebar-content">
                <div class="sidebar-header">
                    <h1>控制台</h1>
                </div>

                <div class="api-config">
                    <h4>🔑 API 配置</h4>
                    <div class="input-group">
                        <label for="apiEndpoint">🌐 API Endpoint</label>
                        <input type="text" id="apiEndpoint" value="https://z-api.aioec.tech/proxy/generate" placeholder="API接口地址">
                    </div>
                    <div class="input-group">
                        <label for="apiKey">🔐 API Key</label>
                        <input type="password" id="apiKey" placeholder="sk-...">
                    </div>
                </div>

                <div class="divider"></div>

                <div class="generation-params">
                    <h4>⚙️ 生成参数</h4>
                    <div class="input-group">
                        <label for="seedInput">🎲 随机种子</label>
                        <input type="number" id="seedInput" value="42" min="0">
                    </div>
                    <div class="input-group">
                        <label class="switch-label">
                            <input type="checkbox" id="useRandom" checked>
                            <span class="switch-text">🎯 随机种子模式</span>
                        </label>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="ui-settings">
                    <h4>🎨 界面设置</h4>
                    <div class="input-group">
                        <label for="galleryCols">📐 画廊列数</label>
                        <input type="range" id="galleryCols" min="1" max="4" value="2">
                        <span id="galleryColsValue">2</span>
                    </div>
                </div>

                <div class="divider"></div>

                <div class="stats">
                    <h4>📊 统计信息</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value" id="generatedCount">0</div>
                            <div class="stat-label">🖼️ 已生成</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="avgDuration">0s</div>
                            <div class="stat-label">⚡ 平均耗时</div>
                        </div>
                    </div>

                    <button id="clearHistory" class="btn-secondary">🗑️ 清空历史记录</button>
                </div>

                <div class="sidebar-footer">
                    <div class="footer-divider"></div>
                    <p>✨ Powered by AI</p>
                </div>
            </div>
        </aside>

        <!-- 主内容区 -->
        <main class="main-content">
            <div class="main-header floating">
                <h1>ShowImageWeb</h1>
                <p>🎨 AI图像生成 - 将您的想象力转化为视觉艺术</p>
            </div>

            <div class="input-section">
                <div class="input-grid">
                    <div class="prompt-container">
                        <textarea
                            id="promptInput"
                            placeholder="🎯 描述您的创意... 例如：一座漂浮在云端的未来城市，玻璃建筑反射着阳光，8K超高清"
                            rows="6"
                        ></textarea>
                    </div>

                    <div class="button-container">
                        <button id="generateBtn" class="btn-primary">
                            <span class="btn-text">✨ 立即生成</span>
                        </button>
                    </div>
                </div>

                <div class="divider"></div>

                <div id="inspirationSection" class="inspiration-section">
                    <h4>💡 灵感示例</h4>
                    <div class="inspiration-grid">
                        <button class="inspiration-btn" data-prompt="一座宏伟的童话城堡坐落在云朵之上，高耸的塔楼闪烁着金色的光芒">🏰 童话城堡</button>
                        <button class="inspiration-btn" data-prompt="春日樱花盛开的日式庭院，粉色花瓣飘落在青石板上">🌸 樱花庭院</button>
                        <button class="inspiration-btn" data-prompt="未来主义科幻太空站，巨大的环形结构悬浮在星空之中">🚀 科幻太空站</button>
                        <button class="inspiration-btn" data-prompt="古老的巨龙守护着神秘的森林入口，鳞片在月光下闪闪发亮">🐉 巨龙守护者</button>
                        <button class="inspiration-btn" data-prompt="赛博朋克风格的未来都市，霓虹灯闪烁的摩天大楼">🌆 赛博都市</button>
                    </div>
                </div>
            </div>

            <div class="gallery-section">
                <div class="gallery-header">
                    <h2>🎨 AI 作品画廊</h2>
                    <div class="gallery-divider"></div>
                </div>

                <div id="emptyGallery" class="empty-gallery">
                    <div class="empty-content">
                        <div class="empty-icon">🎨</div>
                        <h3>开始您的创作之旅</h3>
                        <p>还没有生成的图像，<br>在上方描述您的创意，让AI为您创作独特的艺术作品吧！</p>
                        <div class="empty-features">
                            <span class="feature-tag">✨ 高质量生成</span>
                            <span class="feature-tag">🚀 秒级出图</span>
                            <span class="feature-tag">💾 一键下载</span>
                        </div>
                    </div>
                </div>

                <div id="galleryContainer" class="gallery-container"></div>

                <div id="galleryStats" class="gallery-stats">
                    <h4>📊 创作统计</h4>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value" id="totalImages">0</div>
                            <div class="stat-label">🖼️ 作品总数</div>
                        </div>
                        <div class="stat-value" id="totalAvgDuration">0s</div>
                        <div class="stat-value" id="totalDuration">0s</div>
                    </div>
                </div>
            </div>

            <footer class="footer">
                <div class="footer-content">
                    <p>
                        <span>🚀 <strong>极速生成</strong> - 秒级出图</span>
                        <span>🎨 <strong>高品质</strong> - 专业AI算法</span>
                        <span>💾 <strong>无限存储</strong> - 永久保存</span>
                    </p>
                    <p>Powered by Advanced AI Technology | <span class="highlight">ShowImageWeb</span> © 2025</p>
                </div>
            </footer>
        </main>
    </div>

    <div id="loadingOverlay" class="loading-overlay hidden">
        <div class="loading-content">
            <div class="spinner"></div>
            <div class="loading-text">🚀 AI 正在处理您的请求...</div>
        </div>
    </div>

    <script src="/assets/script"></script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}