import {
  animate,
  createTimeline,
  createScope,
  stagger,
  text,
  onScroll,
} from 'animejs';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

export function fadeInColumn(elements) {
  document.querySelectorAll(elements).forEach((el, index) => {
    if (!isMobile) {
      const offsets = [
        { enter: 'bottom-=50 top', leave: 'bottom-=200 top' },
        { enter: 'bottom-=50 top', leave: 'bottom-=450 top' },
        { enter: 'bottom-=50 top', leave: 'bottom-=650 top' },
      ];

      const offset = offsets[index] || offsets[0]; // На всякий случай — если больше 3

      animate(el, {
        y: ['10%', '0%'],
        opacity: [0.3, 1],
        ease: 'linear',
        autoplay: onScroll({
          enter: offset.enter,
          leave: offset.leave,
          sync: 0.25,
          // debug: true,
        }),
      });
    }
  });
}

export function fadeInItem(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        y: ['50%', '0%'],
        opacity: [0.3, 1],
        ease: 'linear',

        autoplay: onScroll({
          enter: 'bottom-=10 top',
          leave: 'bottom-=250 top',
          sync: 0.25,
          // debug: true,
        }),
      });
    }
  });
}

export function fadeInBlock(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        y: ['20%', '0%'],
        ease: 'linear',

        autoplay: onScroll({
          enter: 'bottom-=10 top',
          leave: 'bottom-=350 top',
          sync: 0.25,
          // debug: true,
        }),
      });
    }
  });
}

export function smoothScrollTitle(elements) {
  document.querySelectorAll(elements).forEach((el) => {
    if (!isMobile) {
      animate(el, {
        x: ['50%', '0%'],
        ease: 'linear',

        autoplay: onScroll({
          enter: 'bottom-=100 top',
          leave: 'bottom-=250 bottom',
          sync: 0.15,
          // debug: true,
        }),
      });
    }
  });
}

export function animateHeader() {
  function loopAnimation() {
    document.querySelectorAll('.header-blink, .button-blink').forEach((el) => {
      animate(el, {
        left: ['-100%', '150%'],
        duration: 3000,
        easing: 'easeOutSine',
        direction: 'alternate',
        loop: false,
        complete: () => {
          setTimeout(loopAnimation, 6000); // Пауза между циклами
        },
      });
    });
  }

  loopAnimation();

  //* - [Анимация главного блока] -
  const timeline = createTimeline({
    defaults: { delay: 300, duration: 950 },
  });

  timeline
    .add('.tl-1', { x: { from: '15rem' }, opacity: [0, 1] })
    .add('.tl-2', { x: { from: '15rem' }, opacity: [0, 1] }, 600)
    .add('.tl-3', { x: { from: '40rem' }, opacity: [0, 1] }, 1200);

  //* - [Анимация Links] -
  document.querySelectorAll('.header__link-key').forEach((el) => {
    createScope({
      root: el,
      defaults: {
        ease: 'outQuad',
        duration: 500,
      },
    }).add((scope) => {
      const { root, methods } = scope;

      // Разбиваем текст на символы
      text.split(root, {
        chars: {
          class: 'char',
          clone: 'left',
          wrap: 'clip',
        },
      });

      //* Создаём анимацию
      const rotateAnim = createTimeline({
        autoplay: false,
        defaults: { ease: 'inOutQuad', duration: 400 },
      }).add('.char > span', { x: '100%' }, stagger(5, { use: 'data-char' }));

      //* Обработчики наведения
      if (!isMobile) {
        scope.add('onEnter', () => animate(rotateAnim, { progress: 1 }));
        scope.add('onLeave', () => animate(rotateAnim, { progress: 0 }));
      }

      root.addEventListener(
        'pointerenter',
        /** @type {EventListener} */ (methods.onEnter)
      );
      root.addEventListener(
        'pointerleave',
        /** @type {EventListener} */ (methods.onLeave)
      );
    });
  });
}
