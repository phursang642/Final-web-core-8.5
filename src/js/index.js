console.log('index.js loaded')
import '../scss/style.scss'
import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => [...document.querySelectorAll(sel)]
const isDesktop = () => window.innerWidth >= 1366
const isMobile = () => window.innerWidth < 768

// Header scroll
const header = $('.header')
window.addEventListener(
  'scroll',
  () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10)
  },
  { passive: true }
)

// Burger / sidebar
const burger = $('.header__burger')
const sidebar = $('.sidebar')
const overlay = $('.overlay')

function openMenu() {
  sidebar.classList.add('is-open')
  overlay.classList.add('is-visible')
  document.body.classList.add('menu-open')
  burger.setAttribute('aria-expanded', 'true')
}

function closeMenu() {
  sidebar.classList.remove('is-open')
  overlay.classList.remove('is-visible')
  document.body.classList.remove('menu-open')
  burger.setAttribute('aria-expanded', 'false')
}

const closeBtn = $('.sidebar__close')

burger.addEventListener('click', () => {
  console.log('Burger clicked')
  openMenu()
})

closeBtn.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()
  closeMenu()
})

overlay.addEventListener('click', closeMenu)

// Initialize all swipers always
new Swiper('.brands__swiper', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 12,
  pagination: {
    el: '.brands__pagination',
    clickable: true
  }
})

new Swiper('.repair-types__swiper', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 12,
  pagination: {
    el: '.repair-types__pagination',
    clickable: true
  }
})

new Swiper('.prices__swiper', {
  modules: [Pagination],
  slidesPerView: 'auto',
  spaceBetween: 16,
  pagination: {
    el: '.prices__pagination',
    clickable: true
  }
})

// Show all — brands (tablet and desktop)
const brandsToggle = $('.brands__toggle')
const brandsGrid = $('.brands__grid')

if (brandsToggle && brandsGrid) {
  brandsToggle.addEventListener('click', () => {
    const isExpanded = brandsGrid.classList.toggle('is-expanded')
    brandsToggle.classList.toggle('is-expanded', isExpanded)
    brandsToggle.querySelector('span').textContent =
      isExpanded ? 'Hide' : 'Show all'
  })
}

// Show all — repair types
const repairToggle = $('.repair-types__toggle')
const repairGrid = $('.repair-types__grid')

if (repairToggle && repairGrid) {
  repairToggle.addEventListener('click', () => {
    const isExpanded = repairGrid.classList.toggle('is-expanded')
    repairToggle.querySelector('span').textContent = isExpanded
      ? 'Hide'
      : 'Show all'
  })
}

// Language switcher
$$('.lang__btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const group = this.closest('.lang')
    $$('.lang__btn', group).forEach((b) =>
      b.classList.remove('lang__btn--active')
    )
    this.classList.add('lang__btn--active')
  })
})

// Services tabs
$$('.services__tab').forEach((tab) => {
  tab.addEventListener('click', function () {
    $$('.services__tab').forEach((t) =>
      t.classList.remove('services__tab--active')
    )
    this.classList.add('services__tab--active')
  })
})

// Order buttons
$$('.prices__order').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('Your order has been received! We will call you back shortly.')
  })
})