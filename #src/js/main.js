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

//* ----------------------------------------------------------------------------
console.log(
  '%c РОССИЯ ',
  'background: blue; color: yellow; font-size: x-large; ' +
    'border-left: 5px solid black; border-top: 30px solid white; ' +
    'border-right: 2px solid black; border-bottom: 30px solid red;'
);
//* ----------------------------------------------------------------------------
