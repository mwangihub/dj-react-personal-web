
(function () {
    "use strict";
    /* Easy selector helper function*/
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /*Easy event listener function*/
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /*Easy on scroll event listener */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /* Navbar links active state on scroll*/
    let navbarlinks = [];
    window.addEventListener("load", function (event) {
        navbarlinks = select('#navbar .scrollto', true);
    });
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }

    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /*Scrolls to an element with header offset*/
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

   
    /* Scrool with ofset on links with a class name .scrollto*/
    window.addEventListener("load", function (event) {
        on('click', '.scrollto', function (e) {
            if (select(this.hash)) {
                e.preventDefault()
                let body = select('body')
                if (body.classList.contains('mobile-nav-active')) {
                    body.classList.remove('mobile-nav-active')
                    let navbarToggle = select('.mobile-nav-toggle')
                    navbarToggle.classList.toggle('bi-list')
                    navbarToggle.classList.toggle('bi-x')
                }
                scrollto(this.hash)
            }
        }, true)
    });
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /* Portfolio details slider portfolio-details-slider*/
    window.addEventListener("load", function (event) {
        let element = document.querySelector('.portfolio-details-slider');
        return new Swiper(element, {
            speed: 400,
            loop: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    });

    /**
     * Testimonials slider 
     */
     window.addEventListener('load', e => {
        new Swiper('.testimonials-slider', {
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            slidesPerView: 'auto',
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            }
        })
    })

    /**
   * Animation on scroll
   */
     window.addEventListener('load', () => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        })
      });
      /**
   * Preloader
   */
//   let preloader = select('#preloader');
//   if (preloader) {
//     window.addEventListener('load', () => {
//       preloader.remove()
//     });
//   }
})()