const LIFF_ID = import.meta.env.VITE_LINE_LIFF_ID || '2010432240-mRjM2C9g';
const LIFF_SDK_URL = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
const LINE_LOGIN_PENDING_KEY = 'warm-paws:line-login-pending';
const LINE_LOGIN_RETURN_KEY = 'warm-paws:line-login-return-to';

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
    await beginLineLogin();
    return null;
  }
  const [profile, idToken] = await Promise.all([liff.getProfile(), Promise.resolve(liff.getIDToken())]);
  clearPendingLineLogin();
  return { profile, idToken };
}

export async function beginLineLogin(returnTo) {
  const liff = await loadScript();
  await liff.init({ liffId: LIFF_ID });
  const nextReturnTo = returnTo || window.location.pathname + window.location.search || '/';
  const redirectUri = `${window.location.origin}/login?lineCallback=1`;

  try {
    sessionStorage.setItem(LINE_LOGIN_PENDING_KEY, '1');
    localStorage.setItem(LINE_LOGIN_PENDING_KEY, '1');
    localStorage.setItem(LINE_LOGIN_RETURN_KEY, nextReturnTo);
  } catch {
    // Some mobile private browsers can block storage.
  }

  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri });
    return null;
  }

  return getLineLoginPayload();
}

export function hasPendingLineLogin() {
  try {
    return (
      sessionStorage.getItem(LINE_LOGIN_PENDING_KEY) === '1' ||
      localStorage.getItem(LINE_LOGIN_PENDING_KEY) === '1' ||
      new URLSearchParams(window.location.search).has('lineCallback') ||
      new URLSearchParams(window.location.search).has('liff.state')
    );
  } catch {
    return false;
  }
}

export function clearPendingLineLogin() {
  try {
    sessionStorage.removeItem(LINE_LOGIN_PENDING_KEY);
    localStorage.removeItem(LINE_LOGIN_PENDING_KEY);
  } catch {
    // Ignore private browsing storage failures.
  }
}

export function getLineLoginReturnTo() {
  try {
    const value = localStorage.getItem(LINE_LOGIN_RETURN_KEY) || '/';
    localStorage.removeItem(LINE_LOGIN_RETURN_KEY);
    return value.startsWith('/') ? value : '/';
  } catch {
    return '/';
  }
}
