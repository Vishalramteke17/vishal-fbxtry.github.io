'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);

document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.portfolio-slider');

  sliders.forEach(slider => {
      let isDown = false;
      let startX;
      let scrollLeft;

      slider.addEventListener('mousedown', (e) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
      });

      slider.addEventListener('mouseleave', () => {
          isDown = false;
          slider.classList.remove('active');
      });

      slider.addEventListener('mouseup', () => {
          isDown = false;
          slider.classList.remove('active');
      });

      slider.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 3; //scroll-fast
          slider.scrollLeft = scrollLeft - walk;
      });

      // Scroll snapping effect
      slider.addEventListener('scroll', () => {
          if (!isDown) {
              const slides = slider.querySelectorAll('.slide');
              let closestSlide = slides[0];
              let closestDistance = Math.abs(slider.scrollLeft - slides[0].offsetLeft);

              slides.forEach(slide => {
                  const distance = Math.abs(slider.scrollLeft - slide.offsetLeft);
                  if (distance < closestDistance) {
                      closestSlide = slide;
                      closestDistance = distance;
                  }
              });

              slider.scrollTo({
                  left: closestSlide.offsetLeft,
                  behavior: 'smooth'
              });
          }
      });
  });
});



/**
 * header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

