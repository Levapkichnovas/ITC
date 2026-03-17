/**
 * Версия для слабовидящих (ГОСТ Р 52872-2019)
 * - Размер шрифта (3 ступени)
 * - Цветовая схема (4 варианта)
 * - Отключение изображений
 * - Межстрочный интервал (3 ступени)
 * - Сохранение в localStorage
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'a11y_settings';

  var defaults = {
    fontSize: 'normal',
    colorScheme: 'normal',
    images: 'on',
    spacing: 'normal'
  };

  function getSettings() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) { /* ignore */ }
    return Object.assign({}, defaults);
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) { /* ignore */ }
  }

  function applySettings(settings) {
    var body = document.body;

    // Font size
    body.classList.remove('a11y-font-medium', 'a11y-font-large');
    if (settings.fontSize === 'medium') body.classList.add('a11y-font-medium');
    if (settings.fontSize === 'large') body.classList.add('a11y-font-large');

    // Color scheme
    body.classList.remove('a11y-bw', 'a11y-wb', 'a11y-bc');
    if (settings.colorScheme === 'bw') body.classList.add('a11y-bw');
    if (settings.colorScheme === 'wb') body.classList.add('a11y-wb');
    if (settings.colorScheme === 'bc') body.classList.add('a11y-bc');

    // Images
    body.classList.remove('a11y-no-images');
    if (settings.images === 'off') body.classList.add('a11y-no-images');

    // Line spacing
    body.classList.remove('a11y-spacing-medium', 'a11y-spacing-large');
    if (settings.spacing === 'medium') body.classList.add('a11y-spacing-medium');
    if (settings.spacing === 'large') body.classList.add('a11y-spacing-large');

    // Update active buttons
    updateActiveButtons(settings);
  }

  function updateActiveButtons(settings) {
    // Font size buttons
    document.querySelectorAll('[data-a11y-font]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-a11y-font') === settings.fontSize);
    });

    // Color scheme buttons
    document.querySelectorAll('[data-a11y-color]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-a11y-color') === settings.colorScheme);
    });

    // Images buttons
    document.querySelectorAll('[data-a11y-images]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-a11y-images') === settings.images);
    });

    // Spacing buttons
    document.querySelectorAll('[data-a11y-spacing]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-a11y-spacing') === settings.spacing);
    });
  }

  function init() {
    var settings = getSettings();
    var panel = document.getElementById('a11yPanel');
    var toggleBtn = document.getElementById('accessibilityToggle');

    if (!panel || !toggleBtn) return;

    // Apply saved settings on load
    applySettings(settings);

    // Toggle panel
    toggleBtn.addEventListener('click', function () {
      panel.classList.toggle('active');
    });

    // Font size
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y-font]');
      if (btn) {
        settings.fontSize = btn.getAttribute('data-a11y-font');
        applySettings(settings);
        saveSettings(settings);
      }
    });

    // Color scheme
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y-color]');
      if (btn) {
        settings.colorScheme = btn.getAttribute('data-a11y-color');
        applySettings(settings);
        saveSettings(settings);
      }
    });

    // Images
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y-images]');
      if (btn) {
        settings.images = btn.getAttribute('data-a11y-images');
        applySettings(settings);
        saveSettings(settings);
      }
    });

    // Spacing
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-a11y-spacing]');
      if (btn) {
        settings.spacing = btn.getAttribute('data-a11y-spacing');
        applySettings(settings);
        saveSettings(settings);
      }
    });

    // Reset
    var resetBtn = document.getElementById('a11yReset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        settings = Object.assign({}, defaults);
        applySettings(settings);
        saveSettings(settings);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
