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
