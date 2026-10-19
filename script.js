(() => {
  // Local dashboard previews are only available in the same browser. Live public updates
  // require replacing config.js in the repository and publishing a new GitHub Pages build.
  try {
    const saved = localStorage.getItem('restaurantAdminPreview');
    if (saved) window.RESTAURANT_CONFIG = JSON.parse(saved);
  } catch (error) { console.warn('Could not load local restaurant preview.', error); }
  const c = window.RESTAURANT_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => { const el = $(selector); if (el && value) el.textContent = value; };
  const safeText = (value) => String(value ?? "");
  const money = (value) => `${c.currency || "₦"}${Number(value || 0).toLocaleString("en-NG")}`;
  const waNumber = safeText(c.whatsapp).replace(/\D/g, "");
  const orderUrl = (itemName = "") => `https://wa.me/${waNumber}?text=${encodeURIComponent(itemName ? `Hello ${c.name || "there"}, I would like to order ${itemName}. Please confirm availability and total price.` : `Hello ${c.name || "there"}, I would like to ask about your menu and place an order.`)}`;

  document.documentElement.style.setProperty("--primary", c.primaryColor || "#064e3b");
  document.documentElement.style.setProperty("--accent", c.accentColor || "#f6b938");
  document.title = `${c.name || "Restaurant"} | ${c.tagline || "Menu and Orders"}`;
  setText("#brand-name", c.name); setText("#footer-name", c.name); setText("#copyright-name", c.name);
  setText("#brand-tagline", c.tagline); setText("#footer-tagline", c.tagline);
  setText("#hero-brand", safeText(c.name).toUpperCase());
  setText("#hero-title", c.heroTitle); setText("#hero-description", c.heroDescription);
  setText("#about-title", c.aboutTitle); setText("#about-text", c.aboutText);
  setText("#contact-address", c.address); setText("#contact-phone", c.phoneDisplay);
  setText("#contact-hours", c.openingHours); setText("#footer-address", c.address);
  setText("#year", new Date().getFullYear());

  document.querySelectorAll(".whatsapp-link").forEach(link => {
    link.href = waNumber ? orderUrl() : "#contact";
    link.setAttribute("aria-label", `Contact ${c.name || "the restaurant"} on WhatsApp`);
  });
  const callLink = $("#call-link");
  if (callLink) callLink.href = `tel:${safeText(c.phoneDial).replace(/[^\d+]/g, "")}`;
  const mapLink = $("#map-link");
  if (mapLink) mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery || c.address || "")}`;

  const menuGrid = $("#menu-grid");
  (menuGrid ? (c.menu || []) : []).forEach(item => {
    const card = document.createElement("article"); card.className = "dish-card";
    const img = document.createElement("img"); img.className = "dish-image"; img.src = item.image || ""; img.alt = item.name || "Menu item"; img.loading = "lazy";
    const info = document.createElement("div"); info.className = "dish-info";
    const title = document.createElement("h3"); title.textContent = item.name || "Menu item";
    const desc = document.createElement("p"); desc.textContent = item.description || "";
    const bottom = document.createElement("div"); bottom.className = "dish-bottom";
    const price = document.createElement("span"); price.className = "price"; price.textContent = money(item.price);
    const order = document.createElement("a"); order.className = "order-mini"; order.href = orderUrl(item.name); order.target = "_blank"; order.rel = "noopener"; order.textContent = "Order";
    bottom.append(price, order); info.append(title, desc, bottom); card.append(img, info); menuGrid.append(card);
  });

  const gallery = $("#gallery-grid");
  (gallery ? (c.gallery || []) : []).forEach((url, i) => {
    const img = document.createElement("img"); img.src = url; img.alt = `${c.name || "Restaurant"} food gallery photo ${i + 1}`; img.loading = "lazy"; gallery.append(img);
  });

  const toggle = $("#menu-toggle"), nav = $("#site-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); toggle?.setAttribute("aria-expanded", "false");
  }));
})();
