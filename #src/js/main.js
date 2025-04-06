import loaded from './assets/preloader.js';
import { maskPhone } from './layouts/layouts.js';
import { dynamicAdaptive } from './assets/dynamic-adaptive.js';

loaded('.preloader');
dynamicAdaptive();
document.addEventListener('DOMContentLoaded', () => {
	maskPhone('.phone');
});

//* ----------------------------------------------------------------------------
console.log('%c РОССИЯ ',
	'background: blue; color: yellow; font-size: x-large; ' +
	'border-left: 5px solid black; border-top: 30px solid white; ' +
	'border-right: 2px solid black; border-bottom: 30px solid red;');
//* ----------------------------------------------------------------------------