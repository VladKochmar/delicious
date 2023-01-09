"use strict"

window.addEventListener('load', windowLoad);

function windowLoad() {
   document.addEventListener('click', documentActions)
}

function documentActions(e) {
   const targetElement = e.target;
   // Menu Burger
   if (targetElement == document.querySelector('.menu__icon')) {
      let header = document.querySelector('.header');
      header.classList.toggle('_menu-open');
      document.body.classList.toggle('_lock');
   }
   // Scroll to...
   if (targetElement.hasAttribute('data-goto')) {
      const gotoElement = document.querySelector(`${targetElement.dataset.goto}`);
      const headerHeight = document.querySelector('.header').offsetHeight;

      if (gotoElement) {
         if (document.querySelector('.header').classList.contains('_menu-open')) {
            document.querySelector('.header').classList.remove('_menu-open');
            document.body.classList.remove('_lock');
         }
         window.scrollTo({
            top: gotoElement.offsetTop - headerHeight,
            behavior: 'smooth'
         });
      }
      e.preventDefault();
   }
}

// Check Operation system
let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

// Fix fullscreen
function fullVHfix() {
   const fullScreens = document.querySelectorAll('[data-fullscreen]');
   if (fullScreens.length && isMobile.any()) {
      window.addEventListener('resize', fixHeight);
      function fixHeight() {
         let vh = window.innerHeight * 0.01;
         document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      fixHeight();
   }
}

// Datepicker
flatpickr("[data-picker]", {
   dateFormat: 'm/d'
});

// Header scroll
let addWindowScrollEvent = false;

function headerScroll() {
   addWindowScrollEvent = true;
   const header = document.querySelector('header.header');
   const headerShow = header.hasAttribute('data-scroll-show');
   const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
   const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
   let scrollDirection = 0;
   let timer;
   document.addEventListener('windowScroll', function (e) {
      const scrollTop = window.scrollY;
      clearTimeout(timer);
      if (scrollTop >= startPoint) {
         !header.classList.contains('_header-scroll') ? header.classList.add('_header-scroll') : null;
         if (headerShow) {
            if (scrollTop > scrollDirection) {
               header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
            } else {
               !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null;
            }
            timer = setTimeout(() => {
               !header.classList.contains('_header-show') ? header.classList.add('_header-show') : null
            }, headerShowTimer);
         }
      } else {
         header.classList.contains('_header-scroll') ? header.classList.remove('_header-scroll') : null;
      } if (headerShow) {
         header.classList.contains('_header-show') ? header.classList.remove('_header-show') : null;
      }
      scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
   });
}

setTimeout(() => {
   if (addWindowScrollEvent) {
      let windowScroll = new Event("windowScroll");
      window.addEventListener("scroll", function (e) {
         document.dispatchEvent(windowScroll);
      });
   }
}, 0);

headerScroll();

// Tabs
function tabs() {
   const tabTitles = document.querySelectorAll('[data-tab-title]');
   const tabsContent = document.querySelectorAll('[data-tab-body]');
   let tabName;

   tabTitles.forEach(title => {
      title.addEventListener('click', selectTabTitle);
   });

   function selectTabTitle() {
      tabTitles.forEach(title => {
         title.classList.remove('_tab-active');
      });

      this.classList.add('_tab-active');
      tabName = this.getAttribute('data-tab-title');
      selectTabContetn(tabName);
   }

   function selectTabContetn(tabName) {
      tabsContent.forEach(item => {
         item.getAttribute('data-tab-body') == tabName ? item.classList.add('_tab-active') : item.classList.remove('_tab-active');
      })
   }
}

tabs();

// Swiper
const swiper = new Swiper('.specialties__swiper', {
   loop: true,
   slidesPerView: 1,
   pagination: {
      el: '.slide-specialties-pagination',
      clickable: true,
   },
});

// Custom selects
const defaultSelects = () => {
   const elements = document.querySelectorAll('.js-choice');

   elements.forEach(select => {
      const choices = new Choices(select, {
         searchEnabled: false,
         itemSelectText: "",
      });
   });
}

defaultSelects();
