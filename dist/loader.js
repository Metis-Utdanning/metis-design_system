/**
 * Metis Design System - Theme Loader
 * Versjon: 1.0.0
 *
 * Laster automatisk base CSS og valgt tema.
 *
 * BRUK:
 *
 * 1. Auto-detect fra data-theme attributt:
 *    <script src="loader.js" data-theme="bpg"></script>
 *
 * 2. Auto-detect fra URL parameter:
 *    yoursite.com?theme=metis-vgs
 *
 * 3. Programmatisk:
 *    MetisTheme.load('privatist');
 *
 * 4. Lytt på endringer:
 *    window.addEventListener('metis-theme-change', (e) => {
 *      console.log('Nytt tema:', e.detail.theme);
 *    });
 */

(function() {
  'use strict';

  // CDN base URL - oppdater ved deploy
  var CDN_BASE = 'https://cdn.jsdelivr.net/gh/Metis-Utdanning/metis-design_system@latest/dist';

  // Tilgjengelige temaer
  var THEMES = {
    'bpg': {
      name: 'Bergen Private Gymnas',
      file: 'themes/bpg.css',
      status: 'production'
    },
    'metis-vgs': {
      name: 'Metis Videregående',
      file: 'themes/metis-vgs.css',
      status: 'production'
    },
    'privatist': {
      name: 'Metis Privatist',
      file: 'themes/privatist.css',
      status: 'production'
    },
    'privatlarer': {
      name: 'Metis Privatlærer',
      file: 'themes/privatlarer.css',
      status: 'production'
    },
    'metis': {
      name: 'Metis Utdanning',
      file: 'themes/metis.css',
      status: 'production'
    }
  };

  // Default tema
  var DEFAULT_THEME = 'metis';

  /**
   * MetisTheme - Hovedobjekt
   */
  var MetisTheme = {
    version: '1.0.0',
    _initialized: false,
    _currentTheme: null,

    /**
     * Last et tema
     * @param {string} themeId - Tema-ID (f.eks. 'bpg', 'metis-vgs')
     * @param {object} options - Valgfrie innstillinger
     */
    load: function(themeId, options) {
      options = options || {};

      var theme = THEMES[themeId];
      if (!theme) {
        console.warn('[MetisTheme] Ukjent tema: ' + themeId + '. Bruker default: ' + DEFAULT_THEME);
        themeId = DEFAULT_THEME;
        theme = THEMES[themeId];
      }

      if (theme.status === 'placeholder') {
        console.info('[MetisTheme] Tema "' + themeId + '" er placeholder. Farger kan endres.');
      }

      // Fjern eksisterende tema-CSS
      var existingTheme = document.querySelector('link[data-metis-theme]');
      if (existingTheme) {
        existingTheme.remove();
      }

      // Last base CSS hvis ikke allerede lastet
      if (!document.querySelector('link[data-metis-base]')) {
        this._loadCSS(this._resolvePath('metis-base.css'), { 'data-metis-base': 'true' });
      }

      // Last tema-CSS
      this._loadCSS(this._resolvePath(theme.file), { 'data-metis-theme': themeId });

      // Sett data-theme attributt på html
      document.documentElement.setAttribute('data-theme', themeId);

      // Lagre i localStorage
      if (options.persist !== false) {
        try {
          localStorage.setItem('metis-theme', themeId);
        } catch (e) {
          // localStorage ikke tilgjengelig
        }
      }

      this._currentTheme = themeId;

      // Dispatch event
      window.dispatchEvent(new CustomEvent('metis-theme-change', {
        detail: {
          theme: themeId,
          name: theme.name,
          status: theme.status
        }
      }));

      return this;
    },

    /**
     * Hent tilgjengelige temaer
     * @returns {array} Liste over temaer
     */
    getAvailable: function() {
      var result = [];
      for (var id in THEMES) {
        if (THEMES.hasOwnProperty(id)) {
          result.push({
            id: id,
            name: THEMES[id].name,
            status: THEMES[id].status
          });
        }
      }
      return result;
    },

    /**
     * Hent aktivt tema
     * @returns {string|null} Aktivt tema-ID
     */
    getCurrent: function() {
      return this._currentTheme || document.documentElement.getAttribute('data-theme') || null;
    },

    /**
     * Sjekk om et tema er tilgjengelig
     * @param {string} themeId
     * @returns {boolean}
     */
    isAvailable: function(themeId) {
      return THEMES.hasOwnProperty(themeId);
    },

    /**
     * Sett CDN base URL (for lokal utvikling)
     * @param {string} url
     */
    setCdnBase: function(url) {
      CDN_BASE = url.replace(/\/$/, '');
      return this;
    },

    /**
     * Last CSS-fil
     * @private
     */
    _loadCSS: function(href, attributes) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;

      for (var key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          link.setAttribute(key, attributes[key]);
        }
      }

      document.head.appendChild(link);
    },

    /**
     * Resolve path (relativ eller CDN)
     * @private
     */
    _resolvePath: function(path) {
      // Hvis vi kjører lokalt (file:// eller localhost), bruk relativ path
      var isLocal = window.location.protocol === 'file:' ||
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1';

      if (isLocal) {
        // Finn script-taggen og bruk dens path som base
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i].src.indexOf('loader.js') > -1) {
            var scriptPath = scripts[i].src;
            var basePath = scriptPath.substring(0, scriptPath.lastIndexOf('/') + 1);
            return basePath + path;
          }
        }
      }

      return CDN_BASE + '/' + path;
    },

    /**
     * Auto-init
     * @private
     */
    _init: function() {
      if (this._initialized) return;
      this._initialized = true;

      // Finn tema fra ulike kilder (prioritet: URL > data-theme > localStorage > default)
      var urlParams = new URLSearchParams(window.location.search);
      var urlTheme = urlParams.get('theme');

      var scriptTheme = null;
      var scripts = document.getElementsByTagName('script');
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf('loader.js') > -1 && scripts[i].getAttribute('data-theme')) {
          scriptTheme = scripts[i].getAttribute('data-theme');
          break;
        }
      }

      var savedTheme = null;
      try {
        savedTheme = localStorage.getItem('metis-theme');
      } catch (e) {}

      var theme = urlTheme || scriptTheme || savedTheme || DEFAULT_THEME;

      this.load(theme);
    }
  };

  // Auto-init når DOM er klar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      MetisTheme._init();
    });
  } else {
    MetisTheme._init();
  }

  // Eksporter til window
  window.MetisTheme = MetisTheme;

})();
