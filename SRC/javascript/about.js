import Swiper from 'swiper';

import { Navigation, Pagination, Autoplay,EffectFade } from 'swiper/modules'; // Import only the modules you need
import 'swiper/css'; // Import Swiper's CSS
import 'swiper/css/navigation';  // Import module-specific CSS
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade'; 
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
const topheader = document.querySelector('.topheader');
// const section_one = document.getElementById('section-one')// Select the navbar element



window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Add the 'scroll' class if scrolled more than 20px
        topheader.classList.add('scroll');
    } else {
        topheader.classList.remove('scroll'); // Remove the 'scroll' class when scrolled back up
    }
});


const swiper = new Swiper('.swiper-container', {
  // Enable autoplay
  autoplay: {
    delay: 3000, // Delay between slides in milliseconds (optional)
    disableOnInteraction: false, // Autoplay will not be disabled after user interactions (optional)
  },

  // Set the desired effect (e.g., 'fade', 'cube', 'coverflow', 'flip', 'cards', 'creative')
  effect: 'fade', // Replace 'fade' with your desired effect

  // Other Swiper options as needed
  loop: true, // Enable looping (optional)
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

 
});

