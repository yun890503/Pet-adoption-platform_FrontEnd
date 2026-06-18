const LIFF_ID = import.meta.env.VITE_LINE_LIFF_ID || '2010432240-mRjM2C9g';
const LIFF_SDK_URL = 'https://static.line-scdn.net/liff/edge/2/sdk.js';

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
    liff.login({ redirectUri: window.location.href });
    return null;
  }
  const [profile, idToken] = await Promise.all([liff.getProfile(), Promise.resolve(liff.getIDToken())]);
  return { profile, idToken };
}
