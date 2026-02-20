// Mobile Navigation Toggle
(function() {
  'use strict';
  
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  
  if (!navToggle || !siteNav) {
    return; // Elements not found, exit
  }
  
  // Toggle menu function
  function toggleMenu() {
    const isOpen = siteNav.classList.contains('is-open');
    
    if (isOpen) {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      siteNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  }
  
  // Toggle menu on button click
  navToggle.addEventListener('click', toggleMenu);
  
  // Close menu when clicking on a nav link (mobile only)
  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      // Only close on mobile (check window width)
      if (window.innerWidth <= 768) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Close menu when window is resized to desktop size
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }, 250);
  });
})();
