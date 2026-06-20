import '../scss/style.scss';
import Swiper from 'swiper';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const isDesktop = () => window.innerWidth >= 1366;

// Header scroll
const header = $('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
}, { passive: true });

// Burger / sidebar
const burger  = $('.header__burger');
const sidebar = $('.sidebar');
const overlay = $('.overlay');

function openMenu() {
  sidebar.classList.add('is-open');
  overlay.classList.add('is-visible');
  document.body.classList.add('menu-open');
  burger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  sidebar.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded', 'false');
}

burger.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);
$('.sidebar__close').addEventListener('click', closeMenu);

$$('.sidebar__link').forEach(link => {
  link.addEventListener('click', () => {
    if (!isDesktop()) closeMenu();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Swipers — only on mobile/tablet
if (!isDesktop()) {
  new Swiper('.brands__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 12,
    pagination: {
      el: '.brands__pagination',
      clickable: true,
    },
  });

  new Swiper('.repair-types__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 12,
    pagination: {
      el: '.repair-types__pagination',
      clickable: true,
    },
  });
}

// Show all — brands
const brandsToggle = $('.brands__toggle');
const brandsGrid   = $('.brands__grid');

if (brandsToggle && brandsGrid) {
  brandsToggle.addEventListener('click', () => {
    const isExpanded = brandsGrid.classList.toggle('is-expanded');
    brandsToggle.classList.toggle('is-expanded', isExpanded);
    brandsToggle.querySelector('span').textContent = isExpanded ? 'Hide' : 'Show all';
  });
}

// Show all — repair types
const repairToggle = $('.repair-types__toggle');
const repairGrid   = $('.repair-types__grid');

if (repairToggle && repairGrid) {
  repairToggle.addEventListener('click', () => {
    const isExpanded = repairGrid.classList.toggle('is-expanded');
    repairToggle.querySelector('span').textContent = isExpanded ? 'Hide' : 'Show all';
  });
}

// Language switcher
$$('.lang__btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const group = this.closest('.lang');
    $$('.lang__btn', group).forEach(b => b.classList.remove('lang__btn--active'));
    this.classList.add('lang__btn--active');
  });
});

// Services tabs
$$('.services__tab').forEach(tab => {
  tab.addEventListener('click', function () {
    $$('.services__tab').forEach(t => t.classList.remove('services__tab--active'));
    this.classList.add('services__tab--active');
  });
});

// Order buttons
$$('.prices__order').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Your order has been received! We will call you back shortly.');
  });
});