'use strict'
const topheader = document.querySelector('.top-header');
const section_one = document.getElementById('section-one')// Select the navbar element

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Add the 'scroll' class if scrolled more than 20px
        topheader.classList.add('scroll');
    } else {
        topheader.classList.remove('scroll'); // Remove the 'scroll' class when scrolled back up
    }
});
const options = {
    rootMargin: "0px",
    threshold: 0.2,
};

const observer = new IntersectionObserver(intersect, options);

function intersect(entries) {
    entries.forEach(entry => {
        const sectionId = entry.target.id;
        console.log(sectionId)
        const spanValues = entry.target.querySelectorAll('.value');

        if (entry.isIntersecting) {
            console.log(`${sectionId} is in view`);

            spanValues.forEach(spanValue => {
                let currentVal = 0;
                const finalVal = parseFloat(spanValue.getAttribute('data-value'));
                const duration = Math.floor(5000 / finalVal);

                const watcher = setInterval(() => {
                    currentVal++;
                    spanValue.textContent = currentVal;
                    if (currentVal === finalVal) {
                        clearInterval(watcher);
                    }
                }, duration);

                // Store the interval ID for later clearing (optional, for more control)
                // window[intervalId] = watcher;
            });
        } else {
            console.log(`${sectionId} is out of view`);
            // Optionally, you could clear the interval here if needed
            clearInterval()
        }
    });
}
observer.observe(section_one)







