const LIFF_ID = import.meta.env.VITE_LINE_LIFF_ID || '2010432240-mRjM2C9g';
const LIFF_SDK_URL = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
const LINE_LOGIN_PENDING_KEY = 'warm-paws:line-login-pending';

function loadScript() {
  if (window.liff) return Promise.resolve(window.liff);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${LIFF_SDK_URL}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.liff));
      existing.addEventListener('error', reject);
      return;
    }
    const script = document.createElement('script');
    script.src = LIFF_SDK_URL;
    script.async = true;
    script.onload = () => resolve(window.liff);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function getLineLoginPayload() {
  const liff = await loadScript();
  await liff.init({ liffId: LIFF_ID });
  if (!liff.isLoggedIn()) {
    try {
      sessionStorage.setItem(LINE_LOGIN_PENDING_KEY, '1');
    } catch {
      // Some mobile private browsers can block sessionStorage.
    }
    liff.login({ redirectUri: window.location.origin + window.location.pathname });
    return null;
  }
  const [profile, idToken] = await Promise.all([liff.getProfile(), Promise.resolve(liff.getIDToken())]);
  clearPendingLineLogin();
  return { profile, idToken };
}

export function hasPendingLineLogin() {
  try {
    return sessionStorage.getItem(LINE_LOGIN_PENDING_KEY) === '1' || new URLSearchParams(window.location.search).has('liff.state');
  } catch {
    return false;
  }
}

export function clearPendingLineLogin() {
  try {
    sessionStorage.removeItem(LINE_LOGIN_PENDING_KEY);
  } catch {
    // Ignore private browsing storage failures.
  }
}
