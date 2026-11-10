/* =========================================================
   THE ART OF ANCHORING — anchor portfolio
   Vanilla JS, no libraries. Sections:
     0. CONFIG  (✏️ the only part you need to edit)
     1. Personalisation (fills the page from CONFIG)
     2. Opening transition
     3. Navigation
     4. Scroll reveal
     5. Golden motes (canvas)
     6. Card pointer-glow
     7. Lightbox
     8. Enquiry form (WhatsApp / email)
   ========================================================= */

/* ---------------------------------------------------------
   0. CONFIG — fill in only what you know. Anything left empty
   ("" or []) stays hidden, or shows a clearly marked placeholder.
   --------------------------------------------------------- */
const CONFIG = {
  herName: "Nishmitha Nayak",          // e.g. "Priya"  → replaces every "[Her Name]"
  bio: "",              // optional: 1–3 lines shown in the About section

  // Optional quick facts under the bio. Rows with an empty value are hidden.
  facts: [
    { label: "Based in",      value: "Belthangady" },   // e.g. "Mangaluru"
    { label: "Languages",     value: "Kannada" },   // e.g. "English · Hindi · Kannada"
    { label: "Experience",    value: "2 years" },   // e.g. "3 years"
    { label: "Events hosted", value: "10+" },   // e.g. "25+"
  ],

  // Optional "Highlights" section — shown only if you add real events.
  highlights: [
    // { title: "Event name", meta: "Role · Month Year", note: "One line about it." },
  ],

  // Optional "What people say" section — shown only if you add real quotes.
  testimonials: [
    // { quote: "She had the whole hall in the palm of her hand.", author: "Name", role: "Organiser, Event" },
  ],

  // Contact. whatsapp = digits only with country code, e.g. "919876543210"
  contact: {
    whatsapp: "918792258937",
    email: "nishmithanayak.anchor@gmail.com",
  },

  // Optional social links, e.g. { label: "Instagram", url: "https://instagram.com/…" }
  socials: [
     {
        label: "Instagram", url: "https://www.instagram.com/i_n_i_shh.__"
     }
  ],

  showCredit: true,     // the small "Crafted by Ashwith" line in the footer
};

(() => {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const clean = (v) => (typeof v === "string" ? v.trim() : "");

  /* -------------------------------------------------------
     1. Personalisation
     ------------------------------------------------------- */
  const name = clean(CONFIG.herName);
  $$("[data-her-name]").forEach((el) => {
    if (name) { el.textContent = name; el.classList.remove("is-placeholder"); }
    else      { el.classList.add("is-placeholder"); }
  });
  if (name) document.title = `${name} — Event Anchor & Host`;

  if (clean(CONFIG.bio)) {
    const bio = $("#bio");
    bio.textContent = clean(CONFIG.bio);
    bio.hidden = false;
  }

  const facts = CONFIG.facts.filter((f) => clean(f.value));
  if (facts.length) {
    const dl = $("#facts");
    facts.forEach((f) => {
      const row = document.createElement("div");
      const dt = document.createElement("dt"); dt.textContent = f.label;
      const dd = document.createElement("dd"); dd.textContent = clean(f.value);
      row.append(dt, dd); dl.appendChild(row);
    });
    dl.hidden = false;
  }

  if (CONFIG.highlights.length) {
    const list = $("#highlightsList");
    CONFIG.highlights.forEach((h, i) => {
      const li = document.createElement("li");
      li.className = "highlight reveal"; li.style.setProperty("--d", `${i * 0.08}s`);
      const t = document.createElement("h3"); t.textContent = h.title || "";
      li.appendChild(t);
      if (clean(h.meta)) { const m = document.createElement("p"); m.className = "highlight__meta"; m.textContent = h.meta; li.appendChild(m); }
      if (clean(h.note)) { const n = document.createElement("p"); n.textContent = h.note; li.appendChild(n); }
      list.appendChild(li);
    });
    $("#highlights").hidden = false;
  }

  if (CONFIG.testimonials.length) {
    const grid = $("#testimonialsGrid");
    CONFIG.testimonials.forEach((q, i) => {
      const li = document.createElement("li");
      li.className = "quote reveal"; li.style.setProperty("--d", `${i * 0.1}s`);
      const bq = document.createElement("blockquote"); bq.textContent = q.quote || "";
      const cap = document.createElement("figcaption"); cap.textContent = q.author || "";
      if (clean(q.role)) { const s = document.createElement("span"); s.textContent = q.role; cap.appendChild(s); }
      const fig = document.createElement("figure"); fig.style.margin = "0";
      fig.append(bq, cap); li.appendChild(fig); grid.appendChild(li);
    });
    $("#testimonials").hidden = false;
  }

  const socials = CONFIG.socials.filter((s) => clean(s.url));
  if (socials.length) {
    const list = $("#socials");
    socials.forEach(({ label, url }) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = url; a.textContent = label || url; a.target = "_blank"; a.rel = "noopener noreferrer";
      li.appendChild(a); list.appendChild(li);
    });
    list.hidden = false;
  }

  if (!CONFIG.showCredit) $("#credit").remove();

  /* -------------------------------------------------------
     2. Opening transition: light → voice → magic → hero
     ------------------------------------------------------- */
  const intro = $("#intro");
  const lines = $$(".intro__line", intro);
  let introDone = false;
  const timers = [];

  const startHero = () => body.classList.add("is-ready");

  function finishIntro() {
    if (introDone) return;
    introDone = true;
    timers.forEach(clearTimeout);
    intro.dataset.step = "4";                       // light blooms outward
    lines.forEach((l) => { l.classList.remove("is-on"); l.classList.add("is-off"); });
    window.scrollTo(0, 0);
    setTimeout(() => {
      intro.classList.add("is-done");
      body.classList.remove("is-intro");
      startHero();
      updateNav();
    }, 450);
    setTimeout(() => intro.remove(), 1800);
  }

  if (reduceMotion) {
    introDone = true;
    intro.remove();
    body.classList.remove("is-intro");
    startHero();
  } else {
    const STEP = 1050;                              // ms per line
    lines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        if (i > 0) lines[i - 1].classList.replace("is-on", "is-off");
        line.classList.add("is-on");
        intro.dataset.step = String(i + 1);
      }, 350 + i * STEP));
    });
    timers.push(setTimeout(finishIntro, 350 + lines.length * STEP + 250));
    $("#introSkip").addEventListener("click", finishIntro);
    intro.addEventListener("click", finishIntro);
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }

  /* -------------------------------------------------------
     3. Navigation — slides in after the hero
     ------------------------------------------------------- */
  const nav = $("#nav");
  function updateNav() {
    nav.classList.toggle("is-shown", introDone && window.scrollY > window.innerHeight * 0.7);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  /* -------------------------------------------------------
     4. Scroll reveal (fade/slide + image wipe)
     ------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* -------------------------------------------------------
     5. Golden motes — one tiny canvas, pre-rendered glow sprite
     ------------------------------------------------------- */
  const canvas = $("#particles");
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, dpr = 1, motes = [], running = false, lastT = 0;

  const sprite = document.createElement("canvas");   // one soft golden dot, reused by every mote
  sprite.width = sprite.height = 64;
  {
    const s = sprite.getContext("2d");
    const g = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,236,180,1)");
    g.addColorStop(0.25, "rgba(255,200,110,.7)");
    g.addColorStop(1, "rgba(255,160,60,0)");
    s.fillStyle = g; s.fillRect(0, 0, 64, 64);
  }

  const rand = (a, b) => a + Math.random() * (b - a);
  const makeMote = (anywhere) => ({
    x: rand(0, W), y: anywhere ? rand(0, H) : H + 12,
    r: rand(2.5, 7), vy: rand(0.10, 0.34), vx: rand(-0.06, 0.06),
    ph: rand(0, 6.28), tw: rand(0.5, 1.4), a: rand(0.25, 0.7),
  });

  function sizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function initMotes() {
    const count = Math.max(16, Math.min(44, Math.round((W * H) / 24000)));
    motes = Array.from({ length: count }, () => makeMote(true));
  }

  function frame(t) {
    if (!running) return;
    const dt = Math.min((t - lastT) / 16.7, 3) || 1; lastT = t;
    ctx.clearRect(0, 0, W, H);
    for (const m of motes) {
      m.y -= m.vy * dt; m.x += (m.vx + Math.sin(t / 1800 + m.ph) * 0.05) * dt;
      if (m.y < -12) Object.assign(m, makeMote(false));
      ctx.globalAlpha = m.a * (0.55 + 0.45 * Math.sin(t / 1000 * m.tw + m.ph));
      ctx.drawImage(sprite, m.x - m.r, m.y - m.r, m.r * 2, m.r * 2);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  const startMotes = () => { if (!running) { running = true; lastT = performance.now(); requestAnimationFrame(frame); } };
  const stopMotes  = () => { running = false; };

  sizeCanvas(); initMotes();
  if (reduceMotion) {                                   // one calm static frame, no loop
    motes.forEach((m) => { ctx.globalAlpha = m.a * 0.7; ctx.drawImage(sprite, m.x - m.r, m.y - m.r, m.r * 2, m.r * 2); });
  } else {
    startMotes();
    document.addEventListener("visibilitychange", () => (document.hidden ? stopMotes() : startMotes()));
  }
  let lastW = W;
  window.addEventListener("resize", () => {             // ignore phone address-bar height jitter
    const w = window.innerWidth;
    sizeCanvas();
    if (w !== lastW) { lastW = w; initMotes(); }
  });

  /* -------------------------------------------------------
     6. Cards: warm light follows the pointer
     ------------------------------------------------------- */
  $$(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* -------------------------------------------------------
     7. Lightbox — click, ← → keys, Esc, swipe
     ------------------------------------------------------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), lbCount = $("#lbCount"), lbCaption = $("#lbCaption");
  const tiles = $$(".tile__btn");
  const photos = tiles.map((btn) => {
    const img = $("img", btn);
    return { src: img.getAttribute("src"), alt: img.alt, caption: btn.dataset.caption || "" };
  });
  let current = 0, lastFocus = null, closing = null;

  function show(i, instant) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    const apply = () => {
      lbImg.src = p.src; lbImg.alt = p.alt;
      lbCount.textContent = `${String(current + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;
      lbCaption.textContent = p.caption;
      lbImg.classList.remove("is-swapping");
    };
    if (instant || reduceMotion) return apply();
    lbImg.classList.add("is-swapping");
    setTimeout(apply, 220);
    [1, -1].forEach((d) => { new Image().src = photos[(current + d + photos.length) % photos.length].src; });
  }

  function openLightbox(i) {
    clearTimeout(closing);
    lastFocus = document.activeElement;
    lb.hidden = false;
    show(i, true);
    void lb.offsetWidth;                               // register `hidden=false` before fading in
    lb.classList.add("is-open");
    body.style.overflow = "hidden";
    $(".lb-btn--close", lb).focus();
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    body.style.overflow = "";
    closing = setTimeout(() => { lb.hidden = true; }, reduceMotion ? 0 : 450);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  tiles.forEach((btn, i) => btn.addEventListener("click", () => openLightbox(i)));
  $$("[data-lb-close]", lb).forEach((el) => el.addEventListener("click", closeLightbox));
  $("#lbPrev").addEventListener("click", () => show(current - 1));
  $("#lbNext").addEventListener("click", () => show(current + 1));

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "Tab") {                         // keep focus inside the viewer
      const f = $$("button", lb); const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX; touchX = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  /* -------------------------------------------------------
     8. Enquiry form — builds a message, opens WhatsApp / email.
        (Static site: nothing is sent to any server of ours.)
     ------------------------------------------------------- */
  const form = $("#enquiry");
  const waBtn = $("#sendWhatsApp"), mailBtn = $("#sendEmail");
  const wa = clean(CONFIG.contact.whatsapp).replace(/\D/g, "");
  const email = clean(CONFIG.contact.email);

  waBtn.disabled = !wa;
  mailBtn.disabled = !email;
  if (!wa && !email) $("#contactNote").hidden = false;
  if (!wa) waBtn.hidden = true;
  if (!email) mailBtn.hidden = true;
  if (!wa && !email) { waBtn.hidden = false; mailBtn.hidden = false; }   // show disabled buttons + note until configured

  function buildMessage() {
    const f = new FormData(form);
    const lines = [
      `Hi${name ? " " + name : ""}, I'd like to enquire about anchoring for my event.`,
      "",
      `Name: ${clean(f.get("name"))}`,
      `Event type: ${f.get("type")}`,
    ];
    if (f.get("date")) lines.push(`Date: ${f.get("date")}`);
    if (clean(f.get("details"))) lines.push(`Details: ${clean(f.get("details"))}`);
    return lines.join("\n");
  }
  function valid() {
    const input = $("#fName");
    const ok = clean(input.value).length > 0;
    input.classList.toggle("is-invalid", !ok);
    if (!ok) input.focus();
    return ok;
  }
  $("#fName").addEventListener("input", () => $("#fName").classList.remove("is-invalid"));

  waBtn.addEventListener("click", () => {
    if (!wa || !valid()) return;
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
  });
  mailBtn.addEventListener("click", () => {
    if (!email || !valid()) return;
    const subject = `Event enquiry — ${$("#fType").value}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
  });
})();
