import IMask from 'imask';

export function maskPhone(selector) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return; // Убедитесь, что элементы существуют

  elements.forEach((element) => {
    let mask = null;

    // Функция для инициализации маски
    function initializeMask() {
      mask = IMask(element, {
        mask: '+7 (000) 000-00-00',
        lazy: true, // Показывать маску только при фокусе
      });
      mask.updateValue(); // Сразу обновляем значение маски
    }

    // При фокусе на поле ввода, показываем маску
    element.addEventListener('focus', function () {
      if (!mask) {
        initializeMask(); // Инициализируем маску только при первом фокусе
      }
      if (element.value === '') {
        element.value = '+7 '; // Устанавливаем начальное значение
      }
      mask.updateValue(); // Обновляем значение маски
    });

    // При потере фокуса, если поле пустое, очищаем его
    element.addEventListener('blur', function () {
      if (element.value.trim() === '+7') {
        element.value = ''; // Очищаем поле
        if (mask) {
          mask.updateValue(''); // Очищаем маску
        }
      }
    });
  });
}

export function shadowScrollHeader() {
  const handleScroll = () => {
    const headerMain = document.querySelector('.header');
    const pageContainer = document.querySelector('.page__main-content');
    const pageContainerTop = pageContainer.getBoundingClientRect().top;

    if (headerMain) {
      if (pageContainerTop < -50) {
        headerMain.classList.add('with-shadow');
      } else if (pageContainerTop <= 0) {
        headerMain.classList.remove('with-shadow');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Очистка слушателя событий при размонтировании компонента
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

//* - [ Управление переключением меню ] -
export function sidebarMenuHandle() {
  const burgerButtons = document.querySelectorAll('.burger-button');
  const header = document.querySelector('.header');
  const sidebarMenu = document.querySelector('.sidebar-menu');

  burgerButtons.forEach((burgerButton) => {
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle('is-active');

      if (burgerButton.classList.contains('is-active')) {
        toggleSidebarMenu(sidebarMenu);
        header.classList.add('with-shadow');
      } else if (!burgerButton.classList.contains('is-active')) {
        toggleSidebarMenu(sidebarMenu);
        header.classList.remove('with-shadow');
      }
    });
  });

  window.addEventListener('resize', () => {
    burgerButtons.forEach((burgerButton) => {
      if (burgerButton.classList.contains('is-active')) {
        document.body.classList.remove('no-scroll');
        sidebarMenu.classList.remove('_open-menu');
        burgerButton.classList.remove('is-active');
      }
    });
  });
}

export function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    //* Компенсируем исчезновение scroll bar (если нужно)
    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.remove('_open-menu');

    resetScrollbarOffset();
    document.body.classList.remove('no-scroll');
    resetTransitionOnce(sidebarMenu);

    if (asideButton) {
      setTimeout(() => {
        asideButton.style.opacity = '1';
        asideButton.style.transition = 'opacity 0.3s ease';
        asideButton.style.pointerEvents = 'all';
      }, 300);
    }
  } else {
    if (asideButton) {
      asideButton.style.opacity = '0';
      asideButton.style.transition = 'opacity 0.3s ease';
      asideButton.style.pointerEvents = 'none';
    }

    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.add('_open-menu');

    handleScrollbarOffset(sidebarMenu);
    document.body.classList.add('no-scroll');
    resetTransitionOnce(sidebarMenu);
  }

  function resetTransitionOnce(element) {
    function transitionEndHandler() {
      element.style.transition = '';
      element.removeEventListener('transitionend', transitionEndHandler);
    }

    element.addEventListener('transitionend', transitionEndHandler);
  }
}

//* - [Компенсируем отступы при открытии Modal]
const pageHeader = document.querySelector('.page__header');
export function handleScrollbarOffset(el) {
  let scrollY = 0;
  //* запоминаем текущее положение прокрутки
  scrollY = window.scrollY || document.documentElement.scrollTop;
  document.documentElement.style.setProperty(
    '--scroll-position',
    `${scrollY}px`
  );

  //* Компенсируем исчезновение scroll bar (если нужно)
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (el) {
      el.style.paddingRight = `${scrollbarWidth}px`;
      pageHeader.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
}

//* - [ Управление открытием модальных окон ]
export function toggleModal() {
  const modals = [
    {
      triggerSelector: '.button-request',
      modalSelector: '.request-form',
    },
    {
      triggerSelector: '.ordercall-button',
      modalSelector: '.order-call-form',
    },
    {
      triggerSelector: '.button-question',
      modalSelector: '.questions-form',
    },
  ];

  modals.forEach(({ triggerSelector, modalSelector }) => {
    const modal = document.querySelector(modalSelector);
    const triggers = document.querySelectorAll(triggerSelector);
    const closeBtn = modal.querySelector('.btn-close');

    triggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        handleScrollbarOffset(modal);
        document.body.classList.add('no-scroll');
        modal.classList.add('is-open');

        if (modalSelector === '.questions-form') {
          const { showFieldset } = fieldsetsToggle(); // Получаем showFieldset
          showFieldset(0); // Активируем первый fieldset
        }
      });
    });

    closeBtn.addEventListener('click', () => {
      resetScrollbarOffset(modal);
      modal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');

      if (modalSelector === '.questions-form') {
        const active = modal.querySelector(
          '.form-question__fieldset-table.active'
        );
        if (active) {
          active.classList.remove('active');
          console.log('Класс active удалён');
        } else {
          console.log('Нет активного fieldset');
        }
      }
    });
  });
}

//* - [Переключение полей формы]
export function fieldsetsToggle() {
  const container = document.querySelector('.form-question__content');
  const fieldsets = document.querySelectorAll(
    '.form-question .form-question__fieldset-table'
  );
  let current = 0;

  const updateContainerHeight = () => {
    const active = container.querySelector(
      '.form-question__fieldset-table.active'
    );
    if (active) {
      const height = active.offsetHeight;
      container.style.height = `${height}px`;
    }
  };

  const showFieldset = (index) => {
    fieldsets.forEach((fs) => fs.classList.remove('active'));
    fieldsets[index].classList.add('active');
    updateContainerHeight();
  };

  document.querySelectorAll('._btn-next button').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current < fieldsets.length - 1) {
        current++;
        showFieldset(current);
      }
    });
  });

  document.querySelectorAll('._btn-prev button').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        showFieldset(current);
      }
    });
  });

  return {
    showFieldset, // 👈 экспортируем
  };
}

//* - [ Устраняем смещение Content'a  ]
function resetScrollbarOffset(el) {
  document.documentElement.style.removeProperty('--scroll-position');

  if (el) {
    el.style.paddingRight = '';
    pageHeader.style.paddingRight = ``;
  }

  document.body.style.paddingRight = ''; // Убираем компенсацию scroll bar
  window.scrollTo(0, scrollY);
}

//* - [ Управление оповещением cookies ] -
export function cookiesAccept(el, trigger) {
  const cookiesAccept = document.querySelector(el);
  const button = document.querySelector(trigger);

  if (!cookiesAccept) {
    console.log('Элемент cookiesAccept не найден');
    return;
  }

  if (button) {
    button.addEventListener('click', () => {
      cookiesAccept.style.transform = 'translateY(100%)';
      cookiesAccept.style.transition = 'transform 0.5s ease';
    });
  } else {
    console.log('кнопка не найдена');
  }

  setTimeout(() => {
    cookiesAccept.style.transform = 'translateY(0)';
    cookiesAccept.style.transition = 'transform 0.5s ease';
  }, 3000);
}

//* - [ Запуск анимации lineMarquee (бегущей строки) ] -
export function lineMarquee(element) {
  const marquee = document.querySelector(element);
  if (!marquee) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          marquee.style.animationPlayState = 'running';
        } else {
          marquee.style.animationPlayState = 'paused';
        }
      });
    },
    {
      threshold: 0.1, // 10% блока видно → запуск
    }
  );

  observer.observe(marquee);
}
