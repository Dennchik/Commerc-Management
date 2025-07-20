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

export function sidebarMenuHandle() {
  const burgerButtons = document.querySelectorAll('.burger-button');
  const header = document.querySelector('.header');
  const sidebarMenu = document.querySelector('.sidebar-menu');

  burgerButtons.forEach((burgerButton) => {
    burgerButton.addEventListener('click', () => {
      burgerButton.classList.toggle('is-active');

      if (burgerButton.classList.contains('is-active')) {
        document.body.classList.add('no-scroll');
        header.classList.add('with-shadow');
        toggleSidebarMenu(sidebarMenu);
      } else if (!burgerButton.classList.contains('is-active')) {
        document.body.classList.remove('no-scroll');
        toggleSidebarMenu(sidebarMenu);
        header.classList.remove('with-shadow');
      }
    });
  });
}

//* - [ Управление преключением меню ] -
export function toggleSidebarMenu(sidebarMenu) {
  const asideButton = document.querySelector('.page__aside-button');
  if (sidebarMenu.classList.contains('_open-menu')) {
    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.remove('_open-menu');
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
    // burgerButtons.classList.add('is-active');
    sidebarMenu.style.transition = 'transform 0.3s ease';
    sidebarMenu.classList.add('_open-menu');
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
