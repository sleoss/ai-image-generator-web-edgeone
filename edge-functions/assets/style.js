// Edge Functions for serving CSS assets
// Handles CSS requests at /assets/style.css

// Main request handler for the /assets/style.css endpoint
export function onRequest(context) {
  return handleStylesRequest();
}

// Return CSS styles
function handleStylesRequest() {
  const css = `
    :root {
        --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        --success-gradient: linear-gradient(135deg, #13B497 0%, #59D4A8 100%);
        --warning-gradient: linear-gradient(135deg, #FFA500 0%, #FF6347 100%);
        --glass-bg: rgba(255, 255, 255, 0.25);
        --glass-border: rgba(255, 255, 255, 0.18);
        --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
        --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
        --shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
        --shadow-xl: 0 20px 40px rgba(0,0,0,0.15);
        --border-radius-sm: 12px;
        --border-radius-md: 16px;
        --border-radius-lg: 24px;
        --transition-fast: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-slow: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        background-attachment: fixed;
        min-height: 100vh;
        position: relative;
        color: white;
        overflow-x: hidden;
    }

    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background:
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
        z-index: -1;
        animation: floatGradient 20s ease infinite;
    }

    @keyframes floatGradient {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        33% { transform: translate(-20px, -20px) rotate(1deg); }
        66% { transform: translate(20px, -10px) rotate(-1deg); }
    }

    .app-container {
        display: flex;
        min-height: 100vh;
    }

    .sidebar {
        width: 300px;
        background: linear-gradient(180deg, #1a1a2e 0%, #0f0f23 100%);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255,255,255,0.1);
        box-shadow: 4px 0 20px rgba(0,0,0,0.3);
        padding: 2rem 1.5rem;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
    }

    .sidebar-header h1 {
        background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-align: center;
        font-size: 2.5rem !important;
        font-weight: 800 !important;
        text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);
        animation: glow 3s ease-in-out infinite alternate;
        margin-bottom: 2rem !important;
    }

    @keyframes glow {
        from { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.3)); }
        to { filter: drop-shadow(0 0 30px rgba(240, 147, 251, 0.5)); }
    }

    .sidebar h4 {
        color: #ffffff !important;
        font-weight: 600 !important;
        margin-bottom: 1rem !important;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem !important;
    }

    .input-group {
        margin-bottom: 1.5rem;
    }

    .input-group label {
        display: block;
        color: #e5e7eb !important;
        font-weight: 400 !important;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    }

    .input-group input {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.1) !important;
        border: 2px solid rgba(102, 126, 234, 0.3) !important;
        border-radius: var(--border-radius-sm) !important;
        color: #ffffff !important;
        backdrop-filter: blur(10px);
        transition: var(--transition-normal) !important;
        font-size: 1rem !important;
    }

    .input-group input:focus {
        background: rgba(255, 255, 255, 0.15) !important;
        border-color: rgba(102, 126, 234, 0.8) !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;
        outline: none !important;
    }

    .switch-label {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .switch-label input {
        width: auto;
        margin-right: 0.5rem;
    }

    .switch-text {
        color: #e5e7eb !important;
        font-weight: 400 !important;
    }

    .divider {
        height: 1px;
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.3), rgba(102, 126, 234, 0.1), transparent);
        margin: 1rem 0;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1.5rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(15px) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        border-radius: var(--border-radius-md) !important;
        padding: 1.5rem !important;
        text-align: center;
        transition: var(--transition-normal) !important;
    }

    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        background: rgba(255, 255, 255, 0.2);
    }

    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
    }

    .stat-label {
        font-size: 0.8rem;
        opacity: 0.8;
    }

    .btn-secondary {
        width: 100%;
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        border-radius: var(--border-radius-sm) !important;
        color: white !important;
        font-weight: 600 !important;
        cursor: pointer;
        transition: var(--transition-normal) !important;
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.15) !important;
    }

    .sidebar-footer {
        margin-top: auto;
        text-align: center;
    }

    .footer-divider {
        height: 2px;
        background: linear-gradient(90deg, transparent, #667eea, transparent);
        border-radius: 5px;
        margin: 1rem 0 0.5rem 0;
    }

    .sidebar-footer p {
        color: #e5e7eb;
        font-size: 0.8rem;
        margin: 0;
    }

    .main-content {
        flex: 1;
        padding: 2rem;
        margin-left: 10px;
    }

    .main-header {
        text-align: center;
        margin-bottom: 3rem;
        position: relative;
    }

    .main-header h1 {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        font-size: 4rem !important;
        font-weight: 900 !important;
        background: linear-gradient(135deg, #ffffff, #f0f0f0, #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 0 50px rgba(255,255,255,0.3);
        margin-bottom: 1rem !important;
        animation: titleFloat 6s ease-in-out infinite;
    }

    @keyframes titleFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .main-header p {
        font-size: 1.3rem !important;
        color: rgba(255,255,255,0.9) !important;
        font-weight: 400 !important;
        margin: 0 !important;
    }

    .input-section {
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: var(--border-radius-lg);
        padding: 2rem;
        margin-bottom: 2rem;
        box-shadow: var(--shadow-xl);
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .input-grid {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 1rem;
    }

    .prompt-container {
        flex: 1;
    }

    .prompt-container textarea {
        width: 100%;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1) !important;
        border: 2px solid rgba(102, 126, 234, 0.3) !important;
        border-radius: var(--border-radius-md) !important;
        color: #ffffff !important;
        backdrop-filter: blur(10px);
        transition: var(--transition-normal) !important;
        font-size: 1rem !important;
        font-family: inherit;
        resize: vertical;
        min-height: 150px;
    }

    .prompt-container textarea:focus {
        background: rgba(255, 255, 255, 0.15) !important;
        border-color: rgba(102, 126, 234, 0.8) !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2) !important;
        outline: none !important;
    }

    .button-container {
         margin-top: 3rem;
        align-items: flex-end;
    }

    .btn-primary {
        background: var(--primary-gradient) !important;
        color: white !important;
        border: none !important;
        border-radius: var(--border-radius-sm) !important;
        font-weight: 700 !important;
        font-size: 1.1rem !important;
        padding: 1rem 2rem !important;
        transition: var(--transition-normal) !important;
        box-shadow: var(--shadow-md) !important;
        position: relative;
        overflow: hidden;
        text-transform: uppercase;
        letter-spacing: 1px;
        width: 100%;
        cursor: pointer;
    }

    .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transition: left 0.5s;
    }

    .btn-primary:hover::before {
        left: 100%;
    }

    .btn-primary:hover {
        transform: translateY(-3px) scale(1.02) !important;
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3) !important;
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: var(--shadow-md) !important;
    }

    .inspiration-section {
        margin-top: 0.5rem;
        text-align: center;
    }

    .inspiration-section h4 {
        color: rgba(255,255,255,0.9);
        margin-bottom: 0.8rem;
    }

    .inspiration-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
    }

    .inspiration-btn {
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.1) !important;
        border: 1px solid rgba(102, 126, 234, 0.3) !important;
        border-radius: var(--border-radius-sm) !important;
        color: white !important;
        cursor: pointer;
        transition: var(--transition-normal) !important;
        font-size: 0.8rem;
    }

    .inspiration-btn:hover {
        background: rgba(255, 255, 255, 0.15) !important;
        transform: translateY(-2px);
    }

    .gallery-section {
        margin-top: 3rem;
    }

    .gallery-header {
        text-align: center;
        margin-bottom: 2rem;
    }

    .gallery-header h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }

    .gallery-divider {
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #667eea);
        background-size: 300% 100%;
        animation: gradientShift 3s ease infinite;
        border-radius: 5px;
        margin: 0 auto;
        width: 200px;
    }

    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .empty-gallery {
        text-align: center;
        padding: 4rem 2rem;
        margin: 2rem 0;
    }

    .empty-content {
        color: #667eea;
    }

    .empty-icon {
        font-size: 5rem;
        margin-bottom: 2rem;
    }

    .empty-content h3 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    .empty-content p {
        color: rgba(255,255,255,0.9);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .empty-features {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .feature-tag {
        background: rgba(102, 126, 234, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
    }

    .gallery-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .gallery-card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-md);
        overflow: hidden;
        transition: var(--transition-normal);
        position: relative;
        box-shadow: var(--shadow-md);
        aspect-ratio: 1/1;
    }

    .gallery-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        background: rgba(255, 255, 255, 0.25);
    }

    .gallery-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-slow);
        background: rgba(0,0,0,0.1);
        border-radius: var(--border-radius-md);
    }

    .gallery-card:hover img {
        transform: scale(1.05);
    }

    .image-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        color: white;
        padding: 1rem;
        opacity: 0;
        transform: translateY(20px);
        transition: var(--transition-normal);
    }

    .gallery-card:hover .image-info {
        opacity: 1;
        transform: translateY(0);
    }

    .download-btn {
        width: 100%;
        padding: 0.75rem 1.5rem;
        background: var(--success-gradient) !important;
        border-radius: var(--border-radius-sm) !important;
        font-weight: 600 !important;
        transition: var(--transition-normal) !important;
        border: none;
        color: white;
        cursor: pointer;
        margin-top: 1rem;
    }

    .download-btn:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(19, 180, 151, 0.3) !important;
    }

    .gallery-stats {
        text-align: center;
        margin-top: 3rem;
    }

    .gallery-stats h4 {
        color: #667eea;
        margin-bottom: 1rem;
    }

    .footer {
        margin-top: 4rem;
        padding: 2rem 0;
        border-top: 1px solid rgba(255,255,255,0.1);
        text-align: center;
        color: rgba(255,255,255,0.6);
    }

    .footer-content p {
        margin-bottom: 1rem;
    }

    .highlight {
        color: #667eea;
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .loading-overlay.hidden {
        display: none;
    }

    .loading-content {
        text-align: center;
        color: white;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255,255,255,0.3);
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-text {
        font-size: 1.2rem;
    }

    @media (max-width: 1200px) {
        .app-container {
            flex-direction: column;
        }

        .sidebar {
            width: 100%;
            height: auto;
            position: relative;
        }

        .main-content {
            margin-left: 0;
        }

        .input-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .button-container {
            padding-top: 0;
        }

        .inspiration-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .main-header h1 {
            font-size: 2.5rem !important;
        }

        .input-section {
            padding: 1.5rem;
        }

        .gallery-container {
            grid-template-columns: 1fr;
        }

        .stats-grid {
            grid-template-columns: 1fr;
        }

        .inspiration-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .sidebar {
            padding: 1rem;
        }

        .main-content {
            padding: 1rem;
        }

        .gallery-card:hover img {
            transform: scale(1.02);
        }

        .gallery-card {
            margin-bottom: 0.75rem;
        }

        .inspiration-grid {
            grid-template-columns: 1fr;
        }
    }
  `;

  return new Response(css, {
    headers: {
      'Content-Type': 'text/css',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}