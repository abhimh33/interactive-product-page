// Page interactions: nav, product gallery, subscription form, stats, collection accordion
//
// Gallery + bottles: paths align with Figma exports in /assets (Original / Lily / Rose frames).

const PRODUCT_GALLERY_SLIDES = [
  { src: 'assets/a206a3992f8dd3b83e58b96d68af3ba37d448aff.png', alt: 'GTG Original — grey background' },
  { src: 'assets/Group%201000004093.png', alt: 'GTG fragrance lifestyle' },
  { src: 'assets/Group%201000004283.png', alt: 'GTG perfumes lifestyle' },
  { src: 'assets/pexels-cottonbro-4659793.png', alt: 'GTG lifestyle' },
];

/** Eight thumbnails (4×2), each mapped to a slide index 0–3 — all from /assets */
const PRODUCT_GALLERY_THUMBS = [
  { src: 'assets/a206a3992f8dd3b83e58b96d68af3ba37d448aff.png', slide: 0 },
  { src: 'assets/Group%201000003958.png', slide: 0 },
  { src: 'assets/Group%201000004093.png', slide: 1 },
  { src: 'assets/Group%201000004012.png', slide: 1 },
  { src: 'assets/Group%201000004283.png', slide: 2 },
  { src: 'assets/Group%201000003968.png', slide: 2 },
  { src: 'assets/pexels-cottonbro-4659793.png', slide: 3 },
  { src: 'assets/Group%201000003967.png', slide: 3 },
];

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initProductGallery() {
  const imgEl = document.querySelector('[data-gallery-image]');
  const dots = document.querySelector('[data-gallery-dots]');
  const thumbsRoot = document.querySelector('[data-gallery-thumbs]');
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  if (!imgEl || !dots || !thumbsRoot || !prev || !next) return;

  const slides = PRODUCT_GALLERY_SLIDES;
  const thumbs = PRODUCT_GALLERY_THUMBS;
  let slideIndex = 0;

  function syncThumbsActive() {
    thumbsRoot.querySelectorAll('.product-thumb').forEach((btn, i) => {
      btn.classList.toggle('is-active', thumbs[i].slide === slideIndex);
    });
  }

  function render() {
    const item = slides[slideIndex];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    dots.querySelectorAll('button').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === slideIndex);
    });
    syncThumbsActive();
  }

  function goToSlide(i) {
    slideIndex = (i + slides.length) % slides.length;
    render();
  }

  dots.innerHTML = slides
    .map(
      (_, i) =>
        `<button type="button" class="${i === 0 ? 'is-active' : ''}" aria-label="Slide ${i + 1}" data-slide="${i}"></button>`,
    )
    .join('');

  dots.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-slide]');
    if (!btn) return;
    const i = Number(btn.getAttribute('data-slide'));
    if (!Number.isNaN(i)) goToSlide(i);
  });

  thumbsRoot.innerHTML = thumbs
    .map(
      (t, i) => `
        <button type="button" class="product-thumb${t.slide === 0 ? ' is-active' : ''}" data-thumb-index="${i}" aria-label="Thumbnail ${i + 1}">
          <img src="${t.src}" alt="" loading="lazy" />
        </button>
      `,
    )
    .join('');

  thumbsRoot.addEventListener('click', (e) => {
    const btn = e.target.closest('.product-thumb');
    if (!btn) return;
    const i = Number(btn.getAttribute('data-thumb-index'));
    if (Number.isNaN(i)) return;
    goToSlide(thumbs[i].slide);
  });

  prev.addEventListener('click', () => goToSlide(slideIndex - 1));
  next.addEventListener('click', () => goToSlide(slideIndex + 1));

  render();
}

function initProductForm() {
  const form = document.querySelector('[data-product-form]');
  if (!form) return;

  const cartLink = form.querySelector('[data-cart-link]');
  const panelSingle = form.querySelector('[data-panel="single"]');
  const panelDouble = form.querySelector('[data-panel="double"]');

  function updateCartHref() {
    const purchase = form.querySelector('input[name="purchase"]:checked')?.value || 'single-sub';
    const f1 = form.querySelector('input[name="fragrance"]:checked')?.value;
    const f2a = form.querySelector('input[name="fragrance1"]:checked')?.value;
    const f2b = form.querySelector('input[name="fragrance2"]:checked')?.value;
    if (!cartLink) return;
    if (purchase === 'double-sub') {
      const a = f2a || 'original';
      const b = f2b || 'original';
      cartLink.href = `#add-to-cart?purchase=${encodeURIComponent(purchase)}&fragrance1=${encodeURIComponent(a)}&fragrance2=${encodeURIComponent(b)}`;
    } else {
      const f = f1 || 'original';
      cartLink.href = `#add-to-cart?purchase=${encodeURIComponent(purchase)}&fragrance=${encodeURIComponent(f)}`;
    }
  }

  function syncPanels() {
    const purchase = form.querySelector('input[name="purchase"]:checked')?.value;
    if (panelSingle) panelSingle.hidden = purchase !== 'single-sub';
    if (panelDouble) panelDouble.hidden = purchase !== 'double-sub';

    const featured = form.querySelector('.product-sub--featured');
    const compact = form.querySelector('.product-sub--compact');
    if (featured) featured.classList.toggle('is-collapsed', purchase === 'double-sub');
    if (compact) compact.classList.toggle('is-expanded', purchase === 'double-sub');

    updateCartHref();
  }

  form.addEventListener('change', (e) => {
    if (e.target instanceof HTMLInputElement) syncPanels();
  });

  syncPanels();
}

function initIncludedPickers() {
  const root = document.querySelector('[data-product-form]');
  if (!root) return;
  const group = root.querySelector('.product-included[role="radiogroup"]');
  if (!group) return;

  function sync() {
    group.querySelectorAll('.product-included__option').forEach((opt) => {
      const input = opt.querySelector('input[type="radio"]');
      const on = input && input.checked;
      opt.classList.toggle('product-included__option--active', Boolean(on));
    });
  }

  group.addEventListener('change', sync);
  sync();
}

function initCountup() {
  const els = document.querySelectorAll('[data-countup]');
  if (!els.length) return;
  const seen = new WeakSet();

  function animate(el) {
    const target = Number(el.getAttribute('data-target')) || 0;
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const progress = Math.min(1, (now - start) / duration);
      const value = Math.floor(progress * target);
      el.textContent = `${value}%`;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = `${target}%`;
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          animate(entry.target);
        }
      });
    },
    { threshold: 0.4 },
  );

  els.forEach((el) => observer.observe(el));
}

function initCollectionAccordion() {
  const accordion = document.querySelector('[data-collection-accordion]');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('.collection-accordion__item'));

  function closeItem(item) {
    const trigger = item.querySelector('.collection-accordion__trigger');
    const content = item.querySelector('[data-accordion-content]');
    if (!trigger || !content) return;
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = '0px';
  }

  function openItem(item) {
    const trigger = item.querySelector('.collection-accordion__trigger');
    const content = item.querySelector('[data-accordion-content]');
    if (!trigger || !content) return;
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    content.style.maxHeight = `${content.scrollHeight}px`;
  }

  items.forEach((item) => {
    const trigger = item.querySelector('.collection-accordion__trigger');
    const content = item.querySelector('[data-accordion-content]');
    if (!trigger || !content) return;

    if (item.classList.contains('is-open')) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      trigger.setAttribute('aria-expanded', 'true');
    } else {
      content.style.maxHeight = '0px';
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
      const shouldOpen = !item.classList.contains('is-open');
      items.forEach((entry) => closeItem(entry));
      if (shouldOpen) openItem(item);
    });
  });

  window.addEventListener('resize', () => {
    items.forEach((item) => {
      if (!item.classList.contains('is-open')) return;
      const content = item.querySelector('[data-accordion-content]');
      if (!content) return;
      content.style.maxHeight = `${content.scrollHeight}px`;
    });
  });
}

function init() {
  initNav();
  initProductGallery();
  initProductForm();
  initIncludedPickers();
  initCountup();
  initCollectionAccordion();
}

document.addEventListener('DOMContentLoaded', init);
