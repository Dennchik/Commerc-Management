import loaded from './assets/preloader.js';
import { smoother } from './animations/animations.jsx';
import { validateForm } from './assets/validate-form.js';
import { dynamicAdaptive } from './assets/dynamic-adaptive.js';
import { anchorsSmoothScrolling } from './assets/anchors-smooth-scrolling.js';
import { validateChecked } from './assets/validate-checked.js';
import {
  animateHeader,
  smoothScrollTitle,
  fadeInItem,
  fadeInBlock,
  fadeInColumn,
  fadeInItemLeft,
  fadeInItemRight,
} from './animations/anime-js.jsx';
import {
  maskPhone,
  cookiesAccept,
  shadowScrollHeader,
  sidebarMenuHandle,
  toggleModal,
  lineMarquee,
} from './layouts/layouts.js';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
loaded('.preloader');
fadeInColumn('.its-col');
fadeInBlock('.its-block');
fadeInItem('.its-el');
fadeInItemLeft('.its-el-left');
fadeInItemRight('.its-el-right');
smoothScrollTitle('.el-item');
validateForm();
animateHeader();
anchorsSmoothScrolling();
sidebarMenuHandle();
dynamicAdaptive();
shadowScrollHeader();
toggleModal();
if (!isMobile) {
  smoother();
}

document.addEventListener('DOMContentLoaded', () => {
  validateChecked();
  cookiesAccept('.cookies-accept', '.cookies-accept__button');
  lineMarquee('.running-line__marquee');
  maskPhone('.phone');
});

if (isMobile) {
  const subItems = document.querySelectorAll('.header__sub-item');

  subItems.forEach((subItem) => {
    const trigger = subItem.closest('.header__link-key');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const hoverItem = subItem.closest('.header__menu-items');

      if (hoverItem) {
        const opened = hoverItem.querySelector('.hover');
        if (opened && opened !== subItem) {
          opened.classList.remove('hover');
        }
      }
      trigger.classList.toggle('hover');
    });
  });
}
//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
