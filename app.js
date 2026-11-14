/* ==========================================================================
   Tasty Bites - Google login, Indian menu, cart, offers and Gmail notifications
   Fill in the values in CONFIG below (see SETUP.md for the 5-minute setup).
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------ SETTINGS ------------------------------ */
  const CONFIG = {
    // 1) Google sign-in: OAuth Client ID (Google Cloud Console)
    GOOGLE_CLIENT_ID: '736818950439-cn8tud77tdoef7mqvsbajfn2tm3i9j39.apps.googleusercontent.com',

    // 2) Gmail notifications through EmailJS (emailjs.com)
    EMAILJS_PUBLIC_KEY: 'PASTE_EMAILJS_PUBLIC_KEY',
    EMAILJS_SERVICE_ID: 'PASTE_EMAILJS_SERVICE_ID',
    EMAILJS_TEMPLATE_ID: 'PASTE_EMAILJS_TEMPLATE_ID',

    // Optional: your own email, to receive a copy of every new order
    OWNER_EMAIL: '',

    // Pricing rules
    DELIVERY_FEE: 40,
    FREE_DELIVERY_ABOVE: 499, // automatic offer
    GST_PERCENT: 5,

    // Demo order tracking emails (only sent while the page stays open)
    STATUS_EMAILS: true,
    STATUS_DELAYS_MS: [20000, 45000], // "out for delivery", "delivered"
  };

  /* -------------------------------- MENU -------------------------------- */
  const MENU = [
    { id: 'butter-chicken', name: 'Butter Chicken', desc: 'Tandoori chicken in rich, creamy tomato-butter gravy', price: 320, veg: false, cat: 'north', emoji: '🍗', hue: 18, rating: 4.8 },
    { id: 'paneer-butter', name: 'Paneer Butter Masala', desc: 'Soft paneer cubes in a silky tomato-cashew gravy', price: 260, veg: true, cat: 'north', emoji: '🧀', hue: 38, rating: 4.7 },
    { id: 'dal-makhani', name: 'Dal Makhani', desc: 'Slow-cooked black lentils finished with butter and cream', price: 210, veg: true, cat: 'north', emoji: '🥘', hue: 28, rating: 4.6 },
    { id: 'chole-bhature', name: 'Chole Bhature', desc: 'Spicy chickpea curry with fluffy fried bhature', price: 150, veg: true, cat: 'north', emoji: '🍲', hue: 12, rating: 4.5 },
    { id: 'tandoori-chicken', name: 'Tandoori Chicken (Half)', desc: 'Charcoal-grilled chicken marinated in yogurt and spices', price: 340, veg: false, cat: 'north', emoji: '🍖', hue: 8, rating: 4.7 },
    { id: 'butter-naan', name: 'Butter Naan', desc: 'Soft tandoor-baked bread brushed with butter', price: 45, veg: true, cat: 'north', emoji: '🍞', hue: 42, rating: 4.6 },
    { id: 'samosa', name: 'Punjabi Samosa (2 pcs)', desc: 'Crispy pastry stuffed with spiced potato and peas', price: 50, veg: true, cat: 'north', emoji: '🥟', hue: 34, rating: 4.4 },
    { id: 'pav-bhaji', name: 'Pav Bhaji', desc: 'Buttery mashed vegetable curry with toasted pav', price: 140, veg: true, cat: 'north', emoji: '🥖', hue: 5, rating: 4.6 },

    { id: 'chicken-biryani', name: 'Hyderabadi Chicken Biryani', desc: 'Dum-cooked basmati rice layered with marinated chicken', price: 280, veg: false, cat: 'biryani', emoji: '🍛', hue: 30, rating: 4.8 },
    { id: 'mutton-biryani', name: 'Mutton Biryani', desc: 'Tender mutton and fragrant rice, slow-cooked on dum', price: 360, veg: false, cat: 'biryani', emoji: '🍛', hue: 22, rating: 4.7 },
    { id: 'veg-biryani', name: 'Veg Dum Biryani', desc: 'Garden vegetables and saffron rice with raita', price: 220, veg: true, cat: 'biryani', emoji: '🍛', hue: 48, rating: 4.5 },

    { id: 'masala-dosa', name: 'Masala Dosa', desc: 'Crisp rice crepe with potato masala, sambar and chutneys', price: 120, veg: true, cat: 'south', emoji: '🥞', hue: 40, rating: 4.7 },
    { id: 'idli-sambar', name: 'Idli Sambar (3 pcs)', desc: 'Steamed rice cakes with hot sambar and coconut chutney', price: 80, veg: true, cat: 'south', emoji: '🍚', hue: 55, rating: 4.6 },
    { id: 'medu-vada', name: 'Medu Vada (2 pcs)', desc: 'Crunchy urad dal fritters served with sambar', price: 70, veg: true, cat: 'south', emoji: '🍩', hue: 32, rating: 4.5 },
    { id: 'chettinad-chicken', name: 'Chettinad Chicken Curry', desc: 'Fiery Tamil Nadu curry with freshly ground spices', price: 300, veg: false, cat: 'south', emoji: '🍲', hue: 10, rating: 4.7 },

    { id: 'gulab-jamun', name: 'Gulab Jamun (2 pcs)', desc: 'Warm milk dumplings soaked in cardamom syrup', price: 90, veg: true, cat: 'sweets', emoji: '🍮', hue: 15, rating: 4.7 },
    { id: 'rasmalai', name: 'Rasmalai (2 pcs)', desc: 'Soft paneer discs in chilled saffron milk', price: 110, veg: true, cat: 'sweets', emoji: '🍨', hue: 50, rating: 4.6 },
    { id: 'masala-chai', name: 'Masala Chai', desc: 'Hot Indian tea with ginger and cardamom', price: 30, veg: true, cat: 'sweets', emoji: '☕', hue: 25, rating: 4.5 },
    { id: 'filter-coffee', name: 'Filter Coffee', desc: 'Strong South Indian decoction coffee with frothy milk', price: 40, veg: true, cat: 'sweets', emoji: '☕', hue: 30, rating: 4.6 },
    { id: 'mango-lassi', name: 'Mango Lassi', desc: 'Thick chilled yogurt drink blended with Alphonso mango', price: 80, veg: true, cat: 'sweets', emoji: '🥭', hue: 45, rating: 4.6 },
  ];

  const FILTERS = [
    ['all', 'All'], ['veg', 'Veg'], ['nonveg', 'Non-Veg'], ['biryani', 'Biryani'],
    ['north', 'North Indian'], ['south', 'South Indian'], ['sweets', 'Desserts & Drinks'],
  ];

  /* ------------------------------- OFFERS ------------------------------- */
  const money = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

  const COUPONS = {
    WELCOME50: {
      title: 'First order offer',
      text: '50% off your first order (max ₹100)',
      apply: ({ sub, user, firstOrder }) => {
        if (!user) return { ok: false, msg: 'Sign in with Google to use WELCOME50' };
        if (!firstOrder) return { ok: false, msg: 'WELCOME50 is valid on your first order only' };
        return { ok: true, discount: Math.min(Math.round(sub * 0.5), 100) };
      },
    },
    SAVE20: {
      title: 'Big basket saver',
      text: '20% off on orders above ₹599 (max ₹150)',
      apply: ({ sub }) =>
        sub < 599
          ? { ok: false, msg: `Add ${money(599 - sub)} more to use SAVE20` }
          : { ok: true, discount: Math.min(Math.round(sub * 0.2), 150) },
    },
    VEG15: {
      title: 'Pure veg treat',
      text: '15% off on vegetarian items (max ₹100)',
      apply: ({ lines }) => {
        const vegSub = lines.filter((l) => l.item.veg).reduce((s, l) => s + l.item.price * l.qty, 0);
        return vegSub === 0
          ? { ok: false, msg: 'Add a vegetarian item to use VEG15' }
          : { ok: true, discount: Math.min(Math.round(vegSub * 0.15), 100) };
      },
    },
    FREEDEL: {
      title: 'Free delivery',
      text: 'Free delivery on orders above ₹299',
      apply: ({ sub }) =>
        sub < 299
          ? { ok: false, msg: `Add ${money(299 - sub)} more to use FREEDEL` }
          : { ok: true, discount: 0, freeDelivery: true },
    },
  };

  /* ------------------------------ HELPERS ------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const load = (key, fallback) => {
    try {
      const v = JSON.parse(localStorage.getItem(key));
      return v ?? fallback;
    } catch (e) {
      return fallback;
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* storage unavailable */ }
  };
  const isSet = (v) => typeof v === 'string' && v.trim() !== '' && !v.startsWith('PASTE');

  // Demo email login: passwords are hashed before being saved in this browser.
  const hash = async (text) => {
    if (window.crypto && window.crypto.subtle) {
      const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 5381; // fallback when crypto.subtle is unavailable (not localhost/https)
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
    return 'f' + (h >>> 0).toString(16);
  };

  /* -------------------------------- STATE -------------------------------- */
  let user = load('tb_user', null);
  let cart = load('tb_cart', {});
  let couponCode = load('tb_coupon', '');
  let filter = 'all';
  let googleReady = false;

  /* ------------------------------- TOASTS ------------------------------- */
  function toast(message, type = 'info') {
    const box = $('#toasts');
    if (!box) return;
    const el = document.createElement('div');
    el.className = 'tb-toast ' + type;
    el.textContent = message;
    box.appendChild(el);
    setTimeout(() => el.classList.add('hide'), 4200);
    setTimeout(() => el.remove(), 4700);
  }

  /* ------------------------------- EMAIL ------------------------------- */
  const emailConfigured = () =>
    isSet(CONFIG.EMAILJS_PUBLIC_KEY) && isSet(CONFIG.EMAILJS_SERVICE_ID) && isSet(CONFIG.EMAILJS_TEMPLATE_ID);

  async function sendEmail(to, toName, subject, bodyHtml) {
    if (!to || !emailConfigured() || !window.emailjs) return false;
    try {
      await window.emailjs.send(
        CONFIG.EMAILJS_SERVICE_ID,
        CONFIG.EMAILJS_TEMPLATE_ID,
        { to_email: to, to_name: toName || 'Foodie', subject, message: emailShell(subject, bodyHtml) },
        { publicKey: CONFIG.EMAILJS_PUBLIC_KEY }
      );
      return true;
    } catch (err) {
      console.error('EmailJS error:', err);
      return false;
    }
  }

  function emailShell(title, body) {
    return (
      '<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;border:1px solid #eee;border-radius:10px;overflow:hidden">' +
      '<div style="background:#ff3838;color:#fff;padding:18px 22px;font-size:20px;font-weight:bold">🍽️ Tasty Bites</div>' +
      '<div style="padding:22px;color:#333;font-size:15px;line-height:1.6">' +
      `<h2 style="margin:0 0 12px;font-size:20px">${esc(title)}</h2>${body}</div>` +
      '<div style="background:#f7f7f7;padding:12px 22px;color:#888;font-size:12px">This is an automated message from Tasty Bites.</div></div>'
    );
  }

  function orderTableHtml(order) {
    const rows = order.items
      .map(
        (i) =>
          `<tr><td style="padding:6px 0">${esc(i.name)} × ${i.qty}</td><td style="text-align:right">${money(i.price * i.qty)}</td></tr>`
      )
      .join('');
    const b = order.bill;
    const line = (label, val, style = '') =>
      `<tr style="${style}"><td style="padding:4px 0">${label}</td><td style="text-align:right">${val}</td></tr>`;
    return (
      '<table style="width:100%;border-collapse:collapse;margin:10px 0">' + rows +
      '<tr><td colspan="2"><hr style="border:none;border-top:1px solid #eee"></td></tr>' +
      line('Subtotal', money(b.sub)) +
      (b.discount ? line(`Discount (${esc(b.code)})`, '− ' + money(b.discount), 'color:#16a34a') : '') +
      line('GST', money(b.tax)) +
      line('Delivery', b.delivery ? money(b.delivery) : 'FREE') +
      line('<b>Total</b>', `<b>${money(b.total)}</b>`, 'font-size:17px') +
      '</table>'
    );
  }

  /* -------------------------------- CART -------------------------------- */
  const cartLines = () =>
    Object.entries(cart)
      .map(([id, qty]) => ({ item: MENU.find((m) => m.id === id), qty }))
      .filter((l) => l.item && l.qty > 0);

  const isFirstOrder = () => !!user && !load('tb_orders', []).some((o) => o.email === user.email);

  function computeBill() {
    const lines = cartLines();
    const sub = lines.reduce((s, l) => s + l.item.price * l.qty, 0);
    let discount = 0;
    let freeDelivery = false;
    let couponMsg = '';
    let couponOk = false;

    if (couponCode && COUPONS[couponCode] && sub > 0) {
      const r = COUPONS[couponCode].apply({ lines, sub, user, firstOrder: isFirstOrder() });
      if (r.ok) {
        couponOk = true;
        discount = r.discount || 0;
        freeDelivery = !!r.freeDelivery;
        couponMsg = `${couponCode} applied` + (discount ? ` - you save ${money(discount)}` : ' - delivery is free');
      } else {
        couponMsg = r.msg;
      }
    }
    const afterDiscount = sub - discount;
    const autoFree = afterDiscount >= CONFIG.FREE_DELIVERY_ABOVE;
    const delivery = sub === 0 ? 0 : freeDelivery || autoFree ? 0 : CONFIG.DELIVERY_FEE;
    const tax = Math.round((afterDiscount * CONFIG.GST_PERCENT) / 100);
    return {
      lines, sub, discount, delivery, tax, total: afterDiscount + tax + delivery,
      code: couponOk ? couponCode : '', couponOk, couponMsg, autoFree,
    };
  }

  function changeQty(id, delta) {
    const next = (cart[id] || 0) + delta;
    if (next <= 0) delete cart[id];
    else cart[id] = next;
    save('tb_cart', cart);
    renderCart();
  }

  function setCoupon(code) {
    couponCode = code;
    save('tb_coupon', couponCode);
    renderCart();
  }

  /* ------------------------------ RENDERING ------------------------------ */
  function renderOffers() {
    const grid = $('#offerGrid');
    if (!grid) return;
    const cards = Object.entries(COUPONS)
      .map(
        ([code, c]) => `
        <div class="tb-offer">
          <span class="tb-offer-tag">${esc(c.title)}</span>
          <h3>${esc(c.text)}</h3>
          <div class="tb-offer-code"><code>${code}</code><button type="button" data-coupon="${code}">Apply</button></div>
        </div>`
      )
      .join('');
    grid.innerHTML =
      cards +
      `<div class="tb-offer auto">
         <span class="tb-offer-tag">Automatic</span>
         <h3>Free delivery on orders above ${money(CONFIG.FREE_DELIVERY_ABOVE)}</h3>
         <p>No code needed. Applied at checkout.</p>
       </div>`;
  }

  function renderMenu() {
    const chips = $('#menuChips');
    const grid = $('#menuGrid');
    if (!chips || !grid) return;
    chips.innerHTML = FILTERS.map(
      ([key, label]) => `<button type="button" class="${key === filter ? 'active' : ''}" data-filter="${key}">${label}</button>`
    ).join('');

    const items = MENU.filter((m) =>
      filter === 'all' ? true : filter === 'veg' ? m.veg : filter === 'nonveg' ? !m.veg : m.cat === filter
    );
    grid.innerHTML = items
      .map((m) => {
        const qty = cart[m.id] || 0;
        const action = qty
          ? `<div class="tb-stepper"><button type="button" data-dec="${m.id}" aria-label="Remove one">−</button><span>${qty}</span><button type="button" data-inc="${m.id}" aria-label="Add one">+</button></div>`
          : `<button type="button" class="tb-add" data-add="${m.id}">Add +</button>`;
        return `
        <article class="tb-dish">
          <div class="tb-dish-art" style="background:linear-gradient(135deg,hsl(${m.hue} 95% 93%),hsl(${m.hue} 90% 80%))">
            <span class="tb-emoji" aria-hidden="true">${m.emoji}</span>
            <span class="tb-veg ${m.veg ? 'veg' : 'non'}" title="${m.veg ? 'Vegetarian' : 'Non-vegetarian'}"></span>
            <span class="tb-rating">★ ${m.rating}</span>
          </div>
          <div class="tb-dish-body">
            <h3>${esc(m.name)}</h3>
            <p>${esc(m.desc)}</p>
            <div class="tb-dish-foot"><strong>${money(m.price)}</strong>${action}</div>
          </div>
        </article>`;
      })
      .join('');
  }

  function renderCart() {
    const b = computeBill();
    const count = b.lines.reduce((s, l) => s + l.qty, 0);
    $('#cartCount').textContent = count;
    $('#cartCount').style.display = count ? 'flex' : 'none';

    // Drawer
    const drawerItems = $('#drawerItems');
    drawerItems.innerHTML = b.lines.length
      ? b.lines
          .map(
            (l) => `
          <div class="tb-line">
            <div><b>${esc(l.item.name)}</b><small>${money(l.item.price)} each</small></div>
            <div class="tb-stepper"><button type="button" data-dec="${l.item.id}">−</button><span>${l.qty}</span><button type="button" data-inc="${l.item.id}">+</button></div>
            <div class="tb-line-total">${money(l.item.price * l.qty)}</div>
          </div>`
          )
          .join('')
      : '<p class="tb-empty">Your cart is empty.<br>Add something tasty from the menu.</p>';
    $('#drawerTotal').innerHTML = b.lines.length
      ? `<span>Subtotal</span><strong>${money(b.sub)}</strong>`
      : '';

    // Checkout summary
    $('#summaryItems').innerHTML = b.lines.length
      ? b.lines
          .map((l) => `<div class="tb-row"><span>${esc(l.item.name)} × ${l.qty}</span><span>${money(l.item.price * l.qty)}</span></div>`)
          .join('')
      : '<p class="tb-empty">No items yet. <a href="#menu">Browse the Indian menu</a></p>';

    $('#couponInput').value = couponCode;
    const msg = $('#couponMsg');
    msg.textContent = couponCode && b.lines.length ? b.couponMsg : '';
    msg.className = 'tb-coupon-msg ' + (b.couponOk ? 'ok' : 'bad');

    $('#billBox').innerHTML = b.lines.length
      ? `
        <div class="tb-row"><span>Subtotal</span><span>${money(b.sub)}</span></div>
        ${b.discount ? `<div class="tb-row green"><span>Discount (${esc(b.code)})</span><span>− ${money(b.discount)}</span></div>` : ''}
        <div class="tb-row"><span>GST (${CONFIG.GST_PERCENT}%)</span><span>${money(b.tax)}</span></div>
        <div class="tb-row"><span>Delivery</span><span>${b.delivery ? money(b.delivery) : '<b class="green-text">FREE</b>'}</span></div>
        ${!b.autoFree && b.delivery ? `<small class="tb-hint">Add ${money(CONFIG.FREE_DELIVERY_ABOVE - (b.sub - b.discount))} more for free delivery</small>` : ''}
        <div class="tb-row total"><span>Total</span><span>${money(b.total)}</span></div>`
      : '';

    renderMenu();
  }

  /* --------------------------------- AUTH -------------------------------- */
  function renderAuth() {
    const area = $('#authArea');
    if (!area) return;

    if (user) {
      const initial = esc((user.name || '?').charAt(0).toUpperCase());
      area.innerHTML = `
        <div class="tb-user">
          ${user.picture ? `<img src="${esc(user.picture)}" alt="" referrerpolicy="no-referrer">` : `<span class="tb-avatar">${initial}</span>`}
          <span class="tb-user-name">${esc((user.name || '').split(' ')[0])}</span>
          <button type="button" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</button>
        </div>`;
    } else if (googleReady) {
      area.innerHTML = '<div id="gsiBtn"></div>';
      window.google.accounts.id.renderButton($('#gsiBtn'), {
        theme: 'outline', size: 'large', text: 'signin_with', shape: 'pill',
      });
    } else {
      area.innerHTML = '<button type="button" class="tb-google-fallback" id="googleFallback"><i class="fab fa-google"></i> Sign in with Google</button>';
    }
    fillForm();
    renderGate();
  }

  function fillForm() {
    const form = $('#orderForm');
    if (!form) return;
    const notice = $('#loginNotice');
    form.elements.name.value = user ? user.name : form.elements.name.value;
    form.elements.email.value = user ? user.email : '';
    form.elements.email.placeholder = user ? '' : 'Sign in with Google to fill your email';
    notice.innerHTML = user
      ? `<p class="tb-ok">✓ Signed in as <b>${esc(user.email)}</b>. Order updates will be emailed to this address.</p>`
      : '<p class="tb-warn">Please sign in with Google (top right) to place your order. Order updates are sent to your Gmail.</p>';
    renderCart();
  }

  function decodeJwt(token) {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(b64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(json);
  }

  async function completeLogin(profile) {
    user = profile;
    save('tb_user', user);
    renderAuth();
    toast(`Welcome, ${user.name.split(' ')[0]}! You are signed in.`, 'success');

    const welcomed = load('tb_welcomed', []);
    if (!welcomed.includes(user.email)) {
      welcomed.push(user.email);
      save('tb_welcomed', welcomed);
      const ok = await sendEmail(
        user.email, user.name, 'Welcome to Tasty Bites 🎉',
        `<p>Hi ${esc(user.name.split(' ')[0])}, thanks for signing in!</p>
         <p>Here is a gift for your first order: use code <b style="color:#ff3838">WELCOME50</b> for <b>50% off</b> (up to ₹100).</p>
         <p>Try our Indian specials - Butter Chicken, Hyderabadi Biryani, Masala Dosa and more.</p>`
      );
      if (ok) toast('Welcome email sent to your Gmail.', 'success');
    }
  }

  async function onGoogleCredential(response) {
    try {
      const p = decodeJwt(response.credential);
      await completeLogin({ name: p.name || p.email, email: p.email, picture: p.picture || '' });
    } catch (err) {
      console.error(err);
      toast('Google sign-in failed. Please try again.', 'error');
    }
  }

  /* ----------------------------- LOGIN PAGE ----------------------------- */
  let gateMode = 'login';

  function renderGate() {
    const gate = $('#loginPage');
    if (!gate) return;
    const locked = !user;
    gate.classList.toggle('open', locked);
    document.body.classList.toggle('tb-locked', locked);
    if (!locked) return;

    const box = $('#gateGoogle');
    if (googleReady) {
      box.innerHTML = '<div id="gateGsi"></div>';
      window.google.accounts.id.renderButton($('#gateGsi'), {
        theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill', width: 320,
      });
    } else {
      box.innerHTML = '<button type="button" class="tb-google-big" id="gateFallback"><i class="fab fa-google"></i> Continue with Google</button>';
    }
  }

  function setGateMode(mode) {
    gateMode = mode;
    document.querySelectorAll('[data-gate-tab]').forEach((b) => b.classList.toggle('active', b.dataset.gateTab === mode));
    $('#gateNameRow').hidden = mode !== 'signup';
    $('#gateSubmit').textContent = mode === 'signup' ? 'Create account' : 'Log in';
    $('#g-pass').autocomplete = mode === 'signup' ? 'new-password' : 'current-password';
    $('#gateError').textContent = '';
  }

  async function gateSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const err = $('#gateError');
    err.textContent = '';
    const name = f.elements.gname.value.trim();
    const email = f.elements.gemail.value.trim().toLowerCase();
    const pw = f.elements.gpassword.value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return (err.textContent = 'Enter a valid email address.');
    if (pw.length < 6) return (err.textContent = 'Password must be at least 6 characters.');

    const accounts = load('tb_accounts', []);
    if (gateMode === 'signup') {
      if (name.length < 2) return (err.textContent = 'Please enter your full name.');
      if (accounts.some((x) => x.email === email)) return (err.textContent = 'An account with this email already exists. Please log in.');
      accounts.push({ name, email, passwordHash: await hash(pw) });
      save('tb_accounts', accounts);
      await completeLogin({ name, email, picture: '' });
    } else {
      const acc = accounts.find((x) => x.email === email);
      if (!acc || acc.passwordHash !== (await hash(pw))) {
        return (err.textContent = 'Incorrect email or password. New here? Click Sign up.');
      }
      await completeLogin({ name: acc.name, email: acc.email, picture: '' });
    }
    f.reset();
  }

  function logout() {
    try {
      if (window.google && window.google.accounts) window.google.accounts.id.disableAutoSelect();
    } catch (e) { /* ignore */ }
    user = null;
    localStorage.removeItem('tb_user');
    renderAuth();
    toast('You have been logged out.', 'info');
  }

  function initGoogle() {
    if (!(window.google && window.google.accounts && window.google.accounts.id)) return false;
    if (!isSet(CONFIG.GOOGLE_CLIENT_ID)) return false;
    window.google.accounts.id.initialize({
      client_id: CONFIG.GOOGLE_CLIENT_ID,
      callback: onGoogleCredential,
      auto_select: false,
    });
    googleReady = true;
    renderAuth();
    return true;
  }

  /* ------------------------------- CHECKOUT ------------------------------- */
  const stepsHtml = (text) => `<p>${text}</p>`;

  async function placeOrder(e) {
    e.preventDefault();
    const form = e.target;
    const err = $('#formError');
    err.textContent = '';

    if (!user) {
      err.textContent = 'Please sign in with Google first.';
      toast('Sign in with Google to place your order.', 'error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const b = computeBill();
    if (!b.lines.length) return (err.textContent = 'Your cart is empty. Add items from the menu.');

    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const address = form.elements.address.value.trim();
    if (name.length < 2) return (err.textContent = 'Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(phone)) return (err.textContent = 'Enter a valid 10-digit Indian mobile number.');
    if (address.length < 10) return (err.textContent = 'Please enter your full delivery address.');

    const order = {
      id: 'TB' + Date.now().toString().slice(-8),
      email: user.email,
      name, phone, address,
      payment: form.elements.payment.value,
      notes: form.elements.notes.value.trim(),
      items: b.lines.map((l) => ({ name: l.item.name, price: l.item.price, qty: l.qty })),
      bill: { sub: b.sub, discount: b.discount, code: b.code, tax: b.tax, delivery: b.delivery, total: b.total },
      time: new Date().toISOString(),
    };

    const orders = load('tb_orders', []);
    orders.push(order);
    save('tb_orders', orders);

    cart = {};
    couponCode = '';
    save('tb_cart', cart);
    save('tb_coupon', couponCode);
    form.elements.address.value = '';
    form.elements.notes.value = '';
    renderCart();
    showSuccess(order);

    const delivered = `<p><b>Order ID:</b> ${order.id}<br><b>Payment:</b> ${esc(order.payment)}<br><b>Deliver to:</b> ${esc(order.name)}, ${esc(order.phone)}<br>${esc(order.address)}</p>`;
    const ok = await sendEmail(
      order.email, order.name, `Order confirmed - ${order.id}`,
      `<p>Hi ${esc(order.name.split(' ')[0])}, your order is confirmed and being prepared. Estimated delivery: <b>35-40 minutes</b>.</p>` +
        orderTableHtml(order) + delivered
    );
    if (ok) toast('Order confirmation sent to your Gmail.', 'success');
    else if (!emailConfigured()) toast('Order placed. Email is not set up yet (see SETUP.md).', 'info');
    else toast('Order placed, but the email could not be sent. Check your EmailJS settings.', 'error');

    if (isSet(CONFIG.OWNER_EMAIL)) {
      sendEmail(CONFIG.OWNER_EMAIL, 'Tasty Bites', `New order ${order.id} - ${money(order.bill.total)}`,
        `<p>New order from <b>${esc(order.name)}</b> (${esc(order.email)}).</p>` + orderTableHtml(order) + delivered);
    }
    trackOrder(order);
  }

  function trackOrder(order) {
    const [t1, t2] = CONFIG.STATUS_DELAYS_MS;
    setTimeout(() => {
      toast(`Order ${order.id} is out for delivery 🛵`, 'info');
      if (CONFIG.STATUS_EMAILS)
        sendEmail(order.email, order.name, `Out for delivery - ${order.id}`,
          stepsHtml('Good news! Your food has left the kitchen and our delivery partner is on the way 🛵.'));
    }, t1);
    setTimeout(() => {
      toast(`Order ${order.id} delivered. Enjoy your meal! 🍽️`, 'success');
      if (CONFIG.STATUS_EMAILS)
        sendEmail(order.email, order.name, `Delivered - ${order.id}`,
          stepsHtml('Your order has been delivered. Enjoy your meal! Thank you for ordering with Tasty Bites 🍽️'));
    }, t2);
  }

  function showSuccess(order) {
    $('#successBody').innerHTML = `
      <div class="tb-check">✓</div>
      <h2>Order placed!</h2>
      <p>Order ID <b>${order.id}</b></p>
      <p>Total paid on delivery: <b>${money(order.bill.total)}</b></p>
      <p>Estimated delivery: <b>35-40 minutes</b></p>
      <p class="tb-note">Updates are sent to ${esc(order.email)}</p>`;
    $('#successModal').classList.add('open');
  }

  /* ------------------------------ DRAWER ------------------------------ */
  const openCart = () => {
    $('#cartDrawer').classList.add('open');
    $('#overlay').classList.add('open');
  };
  const closeCart = () => {
    $('#cartDrawer').classList.remove('open');
    $('#overlay').classList.remove('open');
  };

  /* ------------------------------- EVENTS ------------------------------- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button, a');
    if (!t) return;

    if (t.dataset.add) {
      changeQty(t.dataset.add, 1);
      const item = MENU.find((m) => m.id === t.dataset.add);
      toast(`${item.name} added to cart`, 'success');
    } else if (t.dataset.inc) changeQty(t.dataset.inc, 1);
    else if (t.dataset.dec) changeQty(t.dataset.dec, -1);
    else if (t.dataset.filter) {
      filter = t.dataset.filter;
      renderMenu();
    } else if (t.dataset.coupon) {
      setCoupon(t.dataset.coupon);
      toast(`${t.dataset.coupon} saved. It will be applied at checkout.`, 'success');
      document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    } else if (t.id === 'cartBtn') openCart();
    else if (t.id === 'closeCart' || t.id === 'goCheckout') closeCart();
    else if (t.id === 'logoutBtn') logout();
    else if (t.dataset.gateTab) setGateMode(t.dataset.gateTab);
    else if (t.id === 'googleFallback' || t.id === 'gateFallback')
      toast(
        isSet(CONFIG.GOOGLE_CLIENT_ID)
          ? 'Could not load Google sign-in. Check your internet and open the site on http://localhost:5500'
          : 'Google sign-in is not set up yet. Add your Client ID in app.js (see SETUP.md).',
        'error'
      );
    else if (t.id === 'applyCoupon') {
      const code = $('#couponInput').value.trim().toUpperCase();
      if (!code) return setCoupon('');
      if (!COUPONS[code]) {
        setCoupon('');
        $('#couponInput').value = code;
        const msg = $('#couponMsg');
        msg.textContent = 'Invalid coupon code';
        msg.className = 'tb-coupon-msg bad';
        return;
      }
      setCoupon(code);
    } else if (t.id === 'closeSuccess') $('#successModal').classList.remove('open');
  });

  $('#overlay').addEventListener('click', closeCart);
  $('#orderForm').addEventListener('submit', placeOrder);
  $('#gateForm').addEventListener('submit', gateSubmit);
  $('#menu-bar').addEventListener('click', () => $('.navbar').classList.toggle('active'));
  $('.navbar').addEventListener('click', () => $('.navbar').classList.remove('active'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      $('#successModal').classList.remove('open');
    }
  });

  /* -------------------------------- START -------------------------------- */
  renderOffers();
  renderAuth();
  renderCart();

  if (emailConfigured() && window.emailjs) window.emailjs.init({ publicKey: CONFIG.EMAILJS_PUBLIC_KEY });

  let tries = 0;
  const timer = setInterval(() => {
    if (initGoogle() || ++tries > 40) clearInterval(timer);
  }, 250);
})();
