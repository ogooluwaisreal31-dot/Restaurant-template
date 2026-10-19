# Restaurant Website Template

A responsive multi-page restaurant website template intended for customization for individual restaurant clients.

## Pages
- `index.html` — homepage
- `menu.html` — menu and WhatsApp order links
- `about.html` — restaurant story
- `gallery.html` — photo gallery
- `contact.html` — contact information, map and opening hours
- `admin.html` — browser-based configuration dashboard

## Quick customization
1. Open `admin.html` after deploying the website, or open it locally in a browser.
2. Edit restaurant details, contact information, colours, menu items, prices and gallery image URLs.
3. Click **Save preview in this browser** to preview the changes in the same browser.
4. Click **Download updated config.js** when ready to publish.
5. Replace the repository's existing `config.js` with the downloaded file and commit the change to GitHub. GitHub Pages will rebuild the live website.

You can also edit `config.js` manually. Use a real WhatsApp number in international format with digits only, e.g. `2348012345678`. Replace all demo details and verify prices, image permissions, address, opening hours and phone numbers before client delivery.

## Important: static hosting limitations
This project uses static HTML, CSS and JavaScript. The dashboard does **not** have a backend, secure login, database or automatic publishing. A saved preview is stored only in the current browser's local storage; it does not change the public website for other visitors. For public updates, download `config.js`, upload it to the repository and commit the change. Do not enter sensitive information in this dashboard. Do not rely on it as a protected admin system.

For a real restaurant-owner login where changes sync across devices and publish automatically, connect a backend/CMS (for example, a hosted database and authentication service) or use a CMS-backed hosting platform.
