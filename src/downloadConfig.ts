/** Where every "Download Duocap" button goes. ONE place to flip when the public build lands.
 *  - Mac App Store link once the review passes: "https://apps.apple.com/app/id<ID>"
 *  - Self-hosted DMG:  "/downloads/Duocap_EN-<ver>-arm64.dmg"  (drop the file in public/downloads/)
 *  Until then, beta access is by request — the internal DMG carries API keys and can't
 *  be published on this public repo (2026-08-17). */
export const DOWNLOAD_URL =
  'mailto:support@duocap.app?subject=Duocap%20beta%20access&body=Hi%2C%20I%27d%20like%20to%20try%20Duocap%20on%20my%20Mac.'
export const DOWNLOAD_IS_EXTERNAL = false
