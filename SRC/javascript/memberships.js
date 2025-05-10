'use strict'
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const swiper = new Swiper('.swiper', {
  // Optional parameters

  // loop: true,
  slidesPerView: 3,
  spaceBetween: 10,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

const topheader = document.querySelector('.top-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) { // Add the 'scroll' class if scrolled more than 20px
    topheader.classList.add('scroll');
  } else {
    topheader.classList.remove('scroll'); // Remove the 'scroll' class when scrolled back up
  }
});




// Select all elements you want to fade in on scroll
const items = document.querySelectorAll('.fade-on-scroll');


// Intersection Observer options
const options = {
  rootMargin: '0px 0px 100px 0px', // Adjust margins if needed (e.g., for bottom loading)
  threshold: 0.5, // Adjust visibility threshold (0 for fully visible, 1 for completely out of view)
};

// Create a new IntersectionObserver instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const item = entry.target;
    if (entry.isIntersecting) {
      item.classList.add('fade-in'); // Add 'fade-in' class for animation
    } else {
      item.classList.remove('fade-in'); // Remove 'fade-in' class on scroll away
    }
  });
}, options);

// Observe each item for intersection changes
items.forEach(item => observer.observe(item));


