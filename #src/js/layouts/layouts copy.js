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
        // document.body.classList.add('no-scroll');
        toggleSidebarMenu(sidebarMenu);
        header.classList.add('with-shadow');
      } else if (!burgerButton.classList.contains('is-active')) {
        // document.body.classList.remove('no-scroll');
        toggleSidebarMenu(sidebarMenu);
        header.classList.remove('with-shadow');
      }
    });
  });
}

export function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    ///* Компенсируем исчезновение scroll bar (если нужно)

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

    handleScrollbarOffset();
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

//* - [ Управление открытием модальных окон ]
export function toggleModal() {
  const requestButtons = document.querySelectorAll('.button-request');
  const requestModal = document.querySelector('.request-form');
  const btnCloseRequest = requestModal.querySelector('.btn-close');

  const callButtons = document.querySelectorAll('.ordercall-button');
  const orderCall = document.querySelector('.order-call-form');
  const btnCloseOrderCall = orderCall.querySelector('.btn-close');

  const questionButtons = document.querySelectorAll('.button-question');
  const questionForm = document.querySelector('.question-form');
  const btnCloseQuestion = questionForm.querySelector('.btn-close');

  requestButtons.forEach((modalButton) => {
    modalButton.addEventListener('click', () => {
      handleScrollbarOffset(requestModal);
      document.body.classList.add('no-scroll');
      requestModal.classList.add('is-open');
    });
  });

  btnCloseRequest.addEventListener('click', () => {
    resetScrollbarOffset(requestModal);
    requestModal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  });
  //* -
  callButtons.forEach((modalButton) => {
    modalButton.addEventListener('click', () => {
      handleScrollbarOffset(orderCall);
      document.body.classList.add('no-scroll');
      orderCall.classList.add('is-open');
    });
  });

  btnCloseOrderCall.addEventListener('click', () => {
    resetScrollbarOffset(orderCall);
    orderCall.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  });
  //* -
  questionButtons.forEach((modalButton) => {
    modalButton.addEventListener('click', () => {
      handleScrollbarOffset(questionForm);
      document.body.classList.add('no-scroll');
      questionForm.classList.add('is-open');
    });
  });

  btnCloseQuestion.addEventListener('click', () => {
    resetScrollbarOffset(questionForm);
    questionForm.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  });
}

function handleScrollbarOffset(el) {
  let scrollY = 0;
  //* запомнаем текущее положение прокрутки
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
    }
  }
}
//* - [ Устраняем смещение Content'a  ]
function resetScrollbarOffset(el) {
  document.documentElement.style.removeProperty('--scroll-position');

  if (el) {
    el.style.paddingRight = '';
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
      console.log('работает');
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
