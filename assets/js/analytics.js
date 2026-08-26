(() => {
  'use strict';

  const MEASUREMENT_ID = 'G-VBNM5LKVBF';
  const CONSENT_KEY = 'openea.analyticsConsent.v1';
  const CONSENT_GRANTED = 'granted';
  const CONSENT_DENIED = 'denied';

  let googleTagLoaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  const readConsent = () => {
    try {
      const value = window.localStorage.getItem(CONSENT_KEY);
      return value === CONSENT_GRANTED || value === CONSENT_DENIED ? value : null;
    } catch (_) {
      return null;
    }
  };

  const writeConsent = value => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (_) {
      // If storage is unavailable, the choice applies only to this page load.
    }
  };

  const queueDefaultConsent = () => {
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      personalization_storage: 'denied',
      security_storage: 'granted'
    });
  };

  const queueAnalyticsGrant = () => {
    window.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    });
  };

  const deleteCookie = (name, domain = '') => {
    const domainPart = domain ? `; domain=${domain}` : '';
    document.cookie = `${name}=; Max-Age=0; path=/${domainPart}; SameSite=Lax; Secure`;
  };

  const clearAnalyticsCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_')) {
        deleteCookie(name);
        deleteCookie(name, window.location.hostname);
        if (window.location.hostname.endsWith('.openea.dev') || window.location.hostname === 'openea.dev') {
          deleteCookie(name, '.openea.dev');
        }
      }
    });
  };

  const loadGoogleTag = () => {
    if (googleTagLoaded || document.querySelector(`script[data-openea-ga="${MEASUREMENT_ID}"]`)) {
      return;
    }

    googleTagLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
    script.dataset.openeaGa = MEASUREMENT_ID;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID, {
      send_page_view: true,
      allow_ad_personalization_signals: false
    });
  };

  const analyticsAllowed = () => readConsent() === CONSENT_GRANTED;

  const track = (eventName, parameters = {}) => {
    if (!analyticsAllowed()) return;
    window.gtag('event', eventName, parameters);
  };

  const classifyLink = link => {
    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (_) {
      return null;
    }

    const path = url.pathname.replace(/\/+$/, '') || '/';
    const host = url.hostname.toLowerCase();

    if (host === 'demo.openea.dev') return 'demo_launch';
    if (path === '/try') return 'try_openea';
    if (path === '/docs' || (host === 'github.com' && /\/docs(?:\/|$)/.test(path))) return 'docs_open';
    if (path === '/download') return 'download_open';
    if (path === '/releases' || (host === 'github.com' && /\/releases(?:\/|$)/.test(path))) return 'releases_open';
    if (host === 'github.com' || host.endsWith('.github.com')) return 'github_visit';

    return null;
  };

  const attachEventTracking = () => {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (!link) return;

      const eventName = classifyLink(link);
      if (!eventName) return;

      let url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (_) {
        return;
      }

      track(eventName, {
        link_url: url.href,
        link_domain: url.hostname,
        link_text: (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
        page_path: window.location.pathname
      });
    }, { capture: true });
  };

  const getBanner = () => document.querySelector('[data-analytics-consent]');

  const updateBannerState = () => {
    const banner = getBanner();
    if (!banner) return;
    const current = readConsent();
    const status = banner.querySelector('[data-consent-status]');
    if (status) {
      status.textContent = current === CONSENT_GRANTED
        ? 'Analytics is currently enabled.'
        : current === CONSENT_DENIED
          ? 'Analytics is currently disabled.'
          : '';
    }
  };

  const hideBanner = () => {
    const banner = getBanner();
    if (banner) banner.hidden = true;
  };

  const showBanner = (manageMode = false) => {
    const banner = getBanner();
    if (!banner) return;
    banner.hidden = false;
    banner.dataset.manageMode = manageMode ? 'true' : 'false';
    updateBannerState();
    const focusTarget = banner.querySelector('[data-consent-accept]');
    window.setTimeout(() => focusTarget?.focus({ preventScroll: true }), 0);
  };

  const acceptAnalytics = () => {
    writeConsent(CONSENT_GRANTED);
    queueAnalyticsGrant();
    loadGoogleTag();
    hideBanner();
  };

  const declineAnalytics = () => {
    const wasGranted = analyticsAllowed();
    writeConsent(CONSENT_DENIED);
    clearAnalyticsCookies();
    hideBanner();

    // If Analytics had already been loaded on this page, reload so the next
    // page load runs in Basic Consent Mode with the Google tag fully blocked.
    if (wasGranted && googleTagLoaded) {
      window.location.reload();
    }
  };

  const buildBanner = () => {
    if (getBanner()) return;

    const banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.dataset.analyticsConsent = '';
    banner.setAttribute('aria-label', 'Analytics preferences');
    banner.setAttribute('role', 'region');
    banner.hidden = true;
    banner.innerHTML = `
      <div class="analytics-consent__inner">
        <div class="analytics-consent__copy">
          <strong>Help improve OpenEA</strong>
          <p>We use Google Analytics only if you allow it, to understand how people use openea.dev. Advertising storage and personalization remain disabled.</p>
          <span class="analytics-consent__status" data-consent-status aria-live="polite"></span>
          <a href="/privacy/">Privacy &amp; analytics details</a>
        </div>
        <div class="analytics-consent__actions">
          <button type="button" class="button button-primary" data-consent-accept>Allow analytics</button>
          <button type="button" class="button button-secondary" data-consent-decline>Decline</button>
        </div>
      </div>`;

    document.body.appendChild(banner);
    banner.querySelector('[data-consent-accept]')?.addEventListener('click', acceptAnalytics);
    banner.querySelector('[data-consent-decline]')?.addEventListener('click', declineAnalytics);
  };

  const attachPreferenceButtons = () => {
    document.querySelectorAll('[data-consent-settings]').forEach(button => {
      button.addEventListener('click', () => showBanner(true));
    });
  };

  const initialize = () => {
    queueDefaultConsent();
    buildBanner();
    attachPreferenceButtons();
    attachEventTracking();

    const consent = readConsent();
    if (consent === CONSENT_GRANTED) {
      queueAnalyticsGrant();
      loadGoogleTag();
    } else if (consent === null) {
      showBanner(false);
    }
  };

  window.OpenEAAnalytics = {
    measurementId: MEASUREMENT_ID,
    getConsent: readConsent,
    showPreferences: () => showBanner(true),
    track
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
