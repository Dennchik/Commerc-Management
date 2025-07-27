import anime from 'animejs';

//* ----------------------------------------------------------------------------
export function buttonShow() {
	let drawer_open = false;
	const openButtons = document.querySelectorAll('._open-button');
	openButtons.forEach(openButton => {
		openButton.addEventListener(
			'mouseup', function () {
				cta_button_hide.play();
			});
	});
	document.querySelector('._close-button').addEventListener(
		'mouseup', function () {
			if (drawer_open) {
				slideDown.play();
				cta_button_show.play();
			}
		});
	let cta_button_show = anime({
		targets: '._open-button',
		translateY: ['-15', '0'],
		opacity: ['0', '1'],
		easing: 'easeInOutSine',
		delay: anime.stagger(200),
		autoplay: false,
		// loop: false
		duration: 500,
		complete: function () {
		}
	});
	let cta_button_hide = anime({
		targets: '._open-button',
		translateY: ['0', '-15'],
		opacity: ['1', '0'],
		easing: 'easeInOutSine',
		delay: anime.stagger(200),
		autoplay: false,
		// loop: false
		duration: 500,
		complete: function () {
			slideUp.play();
			drawer_open = true;
		}
	});
	let slideDown = anime({
		targets: '.page__form-modal',
		translateY: ['0', '100%'],
		duration: 1000,
		autoplay: false,
		begin: function () {
			show_hideCTA('flex');
			drawer_open = false;
		}
	});
	let slideUp = anime({
		targets: '.page__form-modal',
		translateY: ['100%', '0'],
		autoplay: false,
		begin: function () {
			show_hideCTA('none');
		}
	});
	function show_hideCTA(param) {
		document.querySelector('._open-button').style.display = param;
		// document.querySelector('.cta-text').style.display = param;
	}
}

//* ----------------------------------------------------------------------------
export function timeLineTextItem() {
	let timeline = anime.timeline({
		duration: 750,
	});
	timeline.add({
		targets: '.el-1',
		translateY: [200, 0],
		opacity: [0, 1], duration: 1250,
		delay: anime.stagger(50, { start: 50 }),
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'opacity 0.3s ease-out';
			});
		}
	}).add({
		targets: '.el-2',
		opacity: [0, 0.7],
		translateX: [1500, 0],
		scaleX: [5, 0.7],
		scaleY: [5, 1.5],
		delay: anime.stagger(100, { start: 100 }),
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'all 0.3s ease-out';
			});
		}
	}).add({
		targets: '.el-3',
		opacity: [0, 1],
		translateY: [-100, 0], duration: 750,
		delay: anime.stagger(0, { start: 0 }),
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'opacity 0.3s ease-out';
			});
		}
	}, 730);
}
//* ----------------------------------------------------------------------------
export function timeLineHeaderItem() {
	let timeline = anime.timeline({
		duration: 750,
	});
	timeline.add({
		targets: '.header__item',
		opacity: [0, 1],
		translateY: [-100, 0],
		delay: anime.stagger(100, { start: 100 }),
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'all 0.3s ease-out';
			});
		}
	}).add({
		targets: '.header__item',
		delay: anime.stagger(100, { start: 500 }),
		easing: 'easeInOutSine',
	}, '-=250').add({
		targets: '.el-logo',
		opacity: [0, 1],
		translateX: [-200, 0],
		duration: 1250,
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'opacity 0.3s ease-out';
			});
		}
	}, 50).add({
		targets: '.el-community',
		opacity: [0, 1],
		translateX: [200, 0],
		// translateY: [9, 10],
		duration: 1250,
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'opacity 0.3s ease-out';
			});
		}
	}, 50);
}

//* ----------------------------------------------------------------------------
export function fadeInSlide() {
	let fadeInSlide = anime.timeline({
		duration: 750,
	});
	fadeInSlide.add({
		targets: '.swiper-slide-active .main-slide__title',
		opacity: [0, 1],
		translateY: [80, 0],
		delay: anime.stagger(100, { start: 500 }),
		easing: 'easeInOutSine',
		duration: 1000,
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'opacity 0.3s ease-out';
			});
		}
	}, 50).add({
		targets: '.swiper-slide-active .main-slide__text',
		opacity: [0, 1],
		translateY: [100, 0],
		delay: anime.stagger(100, { start: 500 }),
		duration: 1000,
		easing: 'easeInOutSine',
		begin: function (anim) {
			anim.animatables.forEach(function (animatable) {
				animatable.target.style.transition = 'opacity 0.3s ease-out';
			});
		}
	}, 130);
}

//* --------------------------- Анимация линий ---------------------------------
export function animationSvgLine(target, reverse) {
	const path = target.querySelector('.services-slide__image .lines path');
	// Создаем переменную path
	anime({
		targets: path,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 500,
		opacity: [0, 1],
		delay: function (el, i) {
			return i * 250;
		},
		// Устанавливаем направление анимации в зависимости от параметра reverse
		direction: reverse ? 'reverse' : 'normal',
		begin: () => {
			// Добавляем класс при начале анимации
			target.classList.add('animating');
		},
		complete: () => {
			if (reverse) {
				// Удаляем класс после завершения анимации в обратном направлении
				target.classList.remove('animating');
				path.setAttribute('stroke-dashoffset', anime.setDashoffset);
			}
		}
	});
}

//* --------------------------- Анимация текста --------------------------------
export function animationSvgText(target, reverse) {
	// Создаем переменную path
	const textPath = target.querySelectorAll(
		'.services-slide__image .lines-text path');

	anime({
		targets: textPath,
		strokeDashoffset: [0, anime.setDashoffset],
		easing: 'easeInOutSine',
		duration: 300,
		opacity: 1,
		delay: function (el, i) {
			return i * 200;
		},

		// Устанавливаем направление анимации в зависимости от параметра reverse
		direction: reverse ? 'reverse' : 'normal',
		begin: () => {
			// Добавляем класс при начале анимации
			target.classList.add('animating');
		},
		complete: () => {
			if (reverse) {
				// Удаляем класс после завершения анимации в обратном направлении
				target.classList.remove('animating');
				textPath.forEach(path => {
					path.setAttribute('stroke-dashoffset', anime.setDashoffset);
				});
			}
		}
	});
}

//* ----------------------------------------------------------------------------

