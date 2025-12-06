// ==UserScript==
// @name         Auto Slot Machine
// @version      1.0.1
// @description  在页面右上角添加一个悬浮按钮，每 6 秒自动点击一次 button#spinButton 来进行抽奖
// @match        https://quota.kyx03.de/
// @match        https://quota.wpgzs.top/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let intervalId = null;
  let running = false;

  // 创建悬浮按钮容器
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0.5rem';
  container.style.right = '1.5rem';
  container.style.zIndex = '9999';
  container.style.width = '3rem';
  container.style.height = '3rem';
  container.style.borderRadius = '50%';
  container.style.backgroundColor = '#007bff';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.cursor = 'pointer';
  container.style.color = 'white';
  container.style.fontSize = '20px';
  container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
  container.title = '开始自动点击';

  // 使用 emoji 图标
  container.textContent = '▶️';

  // 定义 spin 函数
  function spin() {
    const btn = document.querySelector('button#spinButton');
    if (btn) {
      btn.click();
    } else {
      console.warn('[AutoClick] 找不到 button#spinButton');
    }
  }

  // 点击切换状态
  container.addEventListener('click', () => {
    running = !running;

    if (running) {
      container.textContent = '⏹️';
      container.title = '停止自动点击';
      spin(); // 先立即抽取一次
      intervalId = setInterval(spin, 6000);
    } else {
      container.textContent = '▶️';
      container.title = '开始自动点击';
      clearInterval(intervalId);
      intervalId = null;
    }
  });

  document.body.appendChild(container);
})();