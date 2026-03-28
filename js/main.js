// Simple scaffolding for interactions

const galleryImages = [
  { src: "assets/hero-1.jpg", thumb: "assets/hero-1-thumb.jpg", alt: "Product angle 1" },
  { src: "assets/hero-2.jpg", thumb: "assets/hero-2-thumb.jpg", alt: "Product angle 2" },
  { src: "assets/hero-3.jpg", thumb: "assets/hero-3-thumb.jpg", alt: "Product angle 3" },
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

function initGallery() {
  const imgEl = document.querySelector('[data-gallery-image]');
  const dots = document.querySelector('[data-gallery-dots]');
  const thumbs = document.querySelector('[data-gallery-thumbs]');
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  if (!imgEl || !dots || !thumbs || !prev || !next) return;

  let index = 0;

  function render() {
    const item = galleryImages[index];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    dots.querySelectorAll('button').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });
    thumbs.querySelectorAll('.thumb').forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });
  }

  function goTo(i) {
    index = (i + galleryImages.length) % galleryImages.length;
    render();
  }

  dots.innerHTML = galleryImages
    .map((_, i) => `<button aria-label="Show image ${i + 1}"></button>`)
    .join('');

  thumbs.innerHTML = galleryImages
    .map(
      (item, i) => `
        <button class="thumb${i === 0 ? ' is-active' : ''}" aria-label="Thumb ${i + 1}">
          <img src="${item.thumb}" alt="${item.alt}" loading="lazy" />
        </button>
      `,
    )
    .join('');

  dots.addEventListener('click', (e) => {
    if (e.target instanceof HTMLButtonElement) {
      const i = Array.from(dots.children).indexOf(e.target);
      if (i >= 0) goTo(i);
    }
  });

  thumbs.addEventListener('click', (e) => {
    if (e.target instanceof HTMLImageElement && e.target.parentElement instanceof HTMLButtonElement) {
      const btn = e.target.parentElement;
      const i = Array.from(thumbs.children).indexOf(btn);
      if (i >= 0) goTo(i);
    }
    if (e.target instanceof HTMLButtonElement) {
      const i = Array.from(thumbs.children).indexOf(e.target);
      if (i >= 0) goTo(i);
    }
  });

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));

  render();
}

function initRadios() {
  const form = document.querySelector('[data-product-form]');
  const cartLink = document.querySelector('[data-cart-link]');
  const accordion = document.querySelector('[data-accordion]');
  if (!form || !cartLink) return;

  function updateLink() {
    const fragrance = form.querySelector('input[name="fragrance"]:checked')?.value;
    const purchase = form.querySelector('input[name="purchase"]:checked')?.value;
    if (!fragrance || !purchase) return;
    const url = `#add-to-cart?fragrance=${encodeURIComponent(fragrance)}&purchase=${encodeURIComponent(purchase)}`;
    cartLink.href = url;
    if (!accordion) return;
    accordion.querySelectorAll('.accordion__item').forEach((item) => {
      const key = item.getAttribute('data-accordion-panel');
      item.classList.toggle('is-open', key === purchase && (key === 'single-sub' || key === 'double-sub'));
    });
  }

  form.addEventListener('change', (e) => {
    if (e.target instanceof HTMLInputElement && e.target.type === 'radio') {
      updateLink();
    }
  });

  updateLink();
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
  initGallery();
  initRadios();
  initCountup();
  initCollectionAccordion();
}

document.addEventListener('DOMContentLoaded', init);
