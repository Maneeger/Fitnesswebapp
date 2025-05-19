'use strict'
import Swiper from 'swiper';

import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import only the modules you need
import 'swiper/css'; // Import Swiper's CSS
import 'swiper/css/navigation';  // Import module-specific CSS
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

// Initialize Swiper
const mySwiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination, Autoplay], // Register the modules you're using
  // Your Swiper configuration
  slidesPerView: 3,
  spaceBetween: 10,
  autoplay: {
  delay: 2500,
  disableOnInteraction: false,
  },
  pagination: {
  el: '.swiper-pagination',
  },
  navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
  },
  //scrollbar: {  // You weren't using scrollbar in your example, so I removed it.  If you need it, import it and add it to the modules array.
  //  el: '.swiper-scrollbar',
  //},
  });

const topheader = document.querySelector('.topheader');
console.log(topheader)
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


