import loaded from './assets/preloader.js';
loaded('.preloader');
import { smoother } from './animations/animations.jsx';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if (!isMobile) {
  smoother();
}

import { validateForm } from './assets/validate-form.js';
validateForm();
import {
  animateHeader,
  smoothScrollTitle,
  fadeInItem,
  fadeInBlock,
  fadeInColumn,
  fadeInItemLeft,
  fadeInItemRight,
} from './animations/anime-js.jsx';

fadeInColumn('.its-col');
fadeInBlock('.its-block');
fadeInItem('.its-el');
fadeInItemLeft('.its-el-left');
fadeInItemRight('.its-el-right');
animateHeader();
smoothScrollTitle('.el-item');
import {
  maskPhone,
  cookiesAccept,
  shadowScrollHeader,
  sidebarMenuHandle,
  toggleModal,
  lineMarquee,
} from './layouts/layouts.js';

import { dynamicAdaptive } from './assets/dynamic-adaptive.js';
import { anchorsSmoothScrolling } from './assets/anchors-smooth-scrolling.js';
document.addEventListener('DOMContentLoaded', () => {
  cookiesAccept('.cookies-accept', '.cookies-accept__button');
});
document.addEventListener('DOMContentLoaded', () => {
  lineMarquee('.running-line__marquee');
});
anchorsSmoothScrolling();
sidebarMenuHandle();
dynamicAdaptive();
shadowScrollHeader();
toggleModal();
document.addEventListener('DOMContentLoaded', () => {
  maskPhone('.phone');
});

//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
