/** Where every "Download Duocap" button goes. ONE place to flip.
 *  - Self-hosted DMG (current): the file lives in public/downloads/, which is git-ignored
 *    on main and shipped ONLY through the force-pushed gh-pages deploy — so only the
 *    current installer is ever exposed and it can be pulled by redeploying without it.
 *    (Internal-keyed build; user decision 2026-08-17: direct download from the button.)
 *  - Mac App Store link once the review passes: "https://apps.apple.com/app/id<ID>"
 */
export const DOWNLOAD_URL = '/downloads/Duocap-0.4.45-macOS.dmg'
export const DOWNLOAD_IS_EXTERNAL = false
export const DOWNLOAD_FILENAME = 'Duocap-0.4.45-macOS.dmg'
export const MAC_VERSION = '0.4.45'

/** Windows build (added 2026-09-03, user decision: ship it publicly but label it clearly).
 *
 *  ⚠️ THIS BUILD HAS NEVER RUN ON REAL WINDOWS HARDWARE. It cross-compiles from macOS and
 *  its unit tests pass (198), the Soniox + Gemini logic layer was verified end-to-end against
 *  the real services — but audio CAPTURE (WASAPI loopback, microphone + echo cancellation)
 *  and the WPF windows have never been executed once. That is why every Windows affordance
 *  on the site is labelled a test build; see WIN_NOTE.
 *
 *  It also trails the Mac app: 0.3.7 vs 0.4.45, and it does NOT contain the 2026-09-02
 *  caption staleness gate.
 *
 *  Portable zip (no installer): unpack and run Duocap_EN.exe.
 */
export const WIN_DOWNLOAD_URL = '/downloads/Duocap_EN-win-x64-0.3.7.zip'
export const WIN_DOWNLOAD_FILENAME = 'Duocap_EN-win-x64-0.3.7.zip'
export const WIN_VERSION = '0.3.7'
export const WIN_NOTE =
  'Windows 11 · x64 · v0.3.7 — test build. Not yet validated on real hardware: audio capture may not work on your machine. Portable zip — unpack and run Duocap_EN.exe.'
