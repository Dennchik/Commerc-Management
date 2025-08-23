//* import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

export function swiperSlide(Slide) {
  if (Slide) {
    new Swiper(Slide, {
      speed: 800,
      spaceBetween: 60,
      loop: true,
      grabCursor: true,
      slidesPerView: 5,
      centeredSlides: false,
      autoplay: {
        delay: 1500,
        disableOnInteraction: true,
        waitForTransition: true,
      },

      breakpoints: {
        260: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        490: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        691: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1241: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
        1440: {
          slidesPerView: 5,
        },
      },
    });
  }
}
