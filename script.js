/* ============================================
   Dr. Dhobb — Vascular Surgery Marbella
   Script: Navigation, Language Toggle, Animations
   ============================================ */

(function () {
  'use strict';

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // --- Mobile Navigation ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var navHeight = navbar.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Language Toggle ---
  var currentLang = 'en';
  var langToggle = document.getElementById('langToggle');
  var langOptions = langToggle.querySelectorAll('.lang-option');

  langToggle.addEventListener('click', function (e) {
    var clickedOption = e.target.closest('.lang-option');
    if (!clickedOption) return;

    var newLang = clickedOption.getAttribute('data-lang');
    if (newLang === currentLang) return;

    currentLang = newLang;

    // Update toggle UI
    langOptions.forEach(function (opt) {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === currentLang);
    });

    // Update all translatable elements
    document.querySelectorAll('[data-' + currentLang + ']').forEach(function (el) {
      var text = el.getAttribute('data-' + currentLang);
      if (text) {
        el.textContent = text;
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update page title
    if (currentLang === 'es') {
      document.title = 'Dr. Francis M. Dhobb | Cirujano Vascular Marbella, Costa del Sol';
    } else {
      document.title = 'Dr. Francis M. Dhobb | Vascular Surgeon Marbella, Costa del Sol';
    }
  });

  // --- Scroll Reveal Animations ---
  var reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      var revealPoint = 120;
      if (top < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  window.addEventListener('load', checkReveal);
  // Initial check
  checkReveal();

  // --- Active Nav Highlighting ---
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + navbar.offsetHeight + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + id) {
            link.style.color = '#c8a96e';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
