// Edge Functions for serving JavaScript assets
// Handles JavaScript requests at /assets/script.js

// Main request handler for the /assets/script.js endpoint
export function onRequest(context) {
  return handleScriptRequest();
}

// Return JavaScript code
function handleScriptRequest() {
  const js = `
    // Global state
    let history = JSON.parse(localStorage.getItem('imageHistory') || '[]');
    let isGenerating = false;
    let savedPrompt = '';

    // DOM Elements
    const elements = {
      promptInput: document.getElementById('promptInput'),
      generateBtn: document.getElementById('generateBtn'),
      apiKey: document.getElementById('apiKey'),
      apiEndpoint: document.getElementById('apiEndpoint'),
      seedInput: document.getElementById('seedInput'),
      useRandom: document.getElementById('useRandom'),
      galleryCols: document.getElementById('galleryCols'),
      galleryColsValue: document.getElementById('galleryColsValue'),
      clearHistory: document.getElementById('clearHistory'),
      galleryContainer: document.getElementById('galleryContainer'),
      emptyGallery: document.getElementById('emptyGallery'),
      loadingOverlay: document.getElementById('loadingOverlay'),
      generatedCount: document.getElementById('generatedCount'),
      avgDuration: document.getElementById('avgDuration'),
      totalImages: document.getElementById('totalImages'),
      totalAvgDuration: document.getElementById('totalAvgDuration'),
      totalDuration: document.getElementById('totalDuration'),
      inspirationSection: document.getElementById('inspirationSection'),
      inspirationBtns: document.querySelectorAll('.inspiration-btn')
    };

    // Initialize the application
    function init() {
      setupEventListeners();
      updateGallery();
      updateStats();

      // Load saved prompt if available
      if (savedPrompt) {
        elements.promptInput.value = savedPrompt;
      }

      // Update gallery columns display
      elements.galleryColsValue.textContent = elements.galleryCols.value;
    }

    // Set up event listeners
    function setupEventListeners() {
      elements.generateBtn.addEventListener('click', handleGenerate);
      elements.clearHistory.addEventListener('click', clearHistory);
      elements.galleryCols.addEventListener('input', (e) => {
        elements.galleryColsValue.textContent = e.target.value;
        updateGallery();
      });

      // Inspiration buttons
      elements.inspirationBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const prompt = e.target.getAttribute('data-prompt');
          elements.promptInput.value = prompt;
          savedPrompt = prompt;
        });
      });

      // Auto-save prompt
      elements.promptInput.addEventListener('input', (e) => {
        if (!isGenerating) {
          savedPrompt = e.target.value;
        }
      });
    }

    // Handle image generation
    async function handleGenerate() {
      const prompt = elements.promptInput.value.trim();
      const apiKey = elements.apiKey.value.trim();

      if (!apiKey) {
        showNotification('请先在左侧侧边栏配置 API Key', 'error');
        return;
      }

      if (!prompt) {
        showNotification('请输入提示词', 'error');
        return;
      }

      isGenerating = true;
      updateButtonState();

      try {
        showLoading();

        const seed = elements.useRandom.checked
          ? Math.floor(Math.random() * 1000000000)
          : parseInt(elements.seedInput.value);

        const startTime = Date.now();

        // Update loading text
        document.querySelector('.loading-text').textContent = '🚀 AI 正在处理您的请求...';

        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
          },
          body: JSON.stringify({ prompt, seed })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'API请求失败');
        }

        const data = await response.json();

        if (!data.base64) {
          throw new Error('服务器返回成功但缺少图片数据');
        }

        const duration = (Date.now() - startTime) / 1000;

        // Add to history
        addToHistory(prompt, data.base64, seed, duration);

        // Update UI
        updateGallery();
        updateStats();

        showNotification('作品创作完成!', 'success');

        // Hide loading
        hideLoading();

        // Reset input
        elements.promptInput.value = '';
        savedPrompt = '';

      } catch (error) {
        console.error('Generation error:', error);
        showNotification(error.message, 'error');
        hideLoading();
      } finally {
        isGenerating = false;
        updateButtonState();
      }
    }

    // Add image to history
    function addToHistory(prompt, base64Image, seed, duration) {
      const timestamp = new Date().toLocaleTimeString();
      const id = Date.now().toString();

      const newItem = {
        id,
        prompt,
        base64Image,
        seed,
        time: timestamp,
        duration: duration.toFixed(2) + 's'
      };

      history.unshift(newItem);
      localStorage.setItem('imageHistory', JSON.stringify(history));
    }

    // Update gallery display
    function updateGallery() {
      if (history.length === 0) {
        elements.emptyGallery.style.display = 'block';
        elements.galleryContainer.innerHTML = '';
        return;
      }

      elements.emptyGallery.style.display = 'none';

      const cols = parseInt(elements.galleryCols.value);
      elements.galleryContainer.style.gridTemplateColumns = \`repeat(\${cols}, 1fr)\`;

      elements.galleryContainer.innerHTML = history.map(item => \`
        <div class="gallery-card">
          <img src="data:image/png;base64,\${item.base64Image}" alt="AI Generated Image" loading="lazy">
          <div class="image-info">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.9rem;">⏱️ \${item.duration}</span>
              <span style="font-size: 0.9rem;">🌱 \${item.seed}</span>
            </div>
            <div style="font-size: 0.8rem; margin-top: 0.5rem; opacity: 0.8;">
              \${item.time}
            </div>
          </div>
        </div>
        <button class="download-btn" onclick="downloadImage('\${item.base64Image}', '\${item.id}')">
          💾 下载作品 #\${item.id.slice(-6)}
        </button>
      \`).join('');
    }

    // Update statistics
    function updateStats() {
      const count = history.length;
      elements.generatedCount.textContent = count;
      elements.totalImages.textContent = count;

      if (count > 0) {
        const recent = history.slice(0, 5);
        const avgDuration = recent.reduce((sum, item) => sum + parseFloat(item.duration), 0) / recent.length;
        elements.avgDuration.textContent = \`\${avgDuration.toFixed(1)}s\`;

        const totalDuration = history.reduce((sum, item) => sum + parseFloat(item.duration), 0);
        elements.totalAvgDuration.textContent = \`\${(totalDuration / count).toFixed(1)}s\`;
        elements.totalDuration.textContent = \`\${Math.round(totalDuration)}s\`;
      } else {
        elements.avgDuration.textContent = '0s';
        elements.totalAvgDuration.textContent = '0s';
        elements.totalDuration.textContent = '0s';
      }
    }

    // Clear history
    function clearHistory() {
      if (confirm('确定要清空所有历史记录吗？')) {
        history = [];
        localStorage.removeItem('imageHistory');
        updateGallery();
        updateStats();
        showNotification('历史记录已清空', 'info');
      }
    }

    // Show loading overlay
    function showLoading() {
      elements.loadingOverlay.classList.remove('hidden');
    }

    // Hide loading overlay
    function hideLoading() {
      elements.loadingOverlay.classList.add('hidden');
    }

    // Update button state
    function updateButtonState() {
      elements.generateBtn.disabled = isGenerating;
      elements.promptInput.disabled = isGenerating;

      const btnText = isGenerating ? '⏳ 生成中...' : '✨ 立即生成';
      elements.generateBtn.querySelector('.btn-text').textContent = btnText;
    }

    // Show notification
    function showNotification(message, type = 'info') {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = \`notification \${type}\`;
      notification.textContent = message;

      // Style the notification
      Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        zIndex: '1001',
        maxWidth: '300px',
        wordWrap: 'break-word'
      });

      // Set background based on type
      switch(type) {
        case 'success':
          notification.style.background = 'linear-gradient(135deg, #13B497, #59D4A8)';
          break;
        case 'error':
          notification.style.background = 'linear-gradient(135deg, #FF6B6B, #FFE66D)';
          break;
        default:
          notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
      }

      document.body.appendChild(notification);

      // Remove after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }

    // Download image function
    function downloadImage(base64Data, id) {
      const link = document.createElement('a');
      link.download = \`AI-Art-\${id}.png\`;
      link.href = \`data:image/png;base64,\${base64Data}\`;
      link.click();
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);
  `;

  return new Response(js, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}