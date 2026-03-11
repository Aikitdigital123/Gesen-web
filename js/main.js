// Mobile Navigation Toggle
(function() {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const contactForm = document.querySelector('#contact-form');
  const mobileNavQuery = window.matchMedia('(max-width: 900px)');

  if (!navToggle || !siteNav) {
    return;
  }

  function closeMenu() {
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    siteNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
  }

  function toggleMenu() {
    const isOpen = siteNav.classList.contains('is-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  navToggle.addEventListener('click', function(event) {
    event.stopPropagation();
    toggleMenu();
  });

  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (mobileNavQuery.matches) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', function(event) {
    if (!mobileNavQuery.matches || !siteNav.classList.contains('is-open')) {
      return;
    }

    if (siteNav.contains(event.target) || navToggle.contains(event.target)) {
      return;
    }

    closeMenu();
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {
      if (!mobileNavQuery.matches) {
        closeMenu();
      }
    }, 150);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const company = (formData.get('company') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const subjectBase = company || name || 'Nová poptávka';
      const subject = 'Poptávka Gesen - ' + subjectBase;
      const body = [
        'Jméno: ' + (name || '-'),
        'Firma: ' + (company || '-'),
        'E-mail: ' + (email || '-'),
        'Telefon: ' + (phone || '-'),
        '',
        'Zpráva:',
        message || '-'
      ].join('\n');

      window.location.href = 'mailto:info@gesen.cz?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
