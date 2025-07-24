import loaded from './assets/preloader.js';
loaded('.preloader');

import {
  maskPhone,
  cookiesAccept,
  shadowScrollHeader,
  sidebarMenuHandle,
  toggleModal,
} from './layouts/layouts.js';
import { dynamicAdaptive } from './assets/dynamic-adaptive.js';
import { anchorsSmoothScrolling } from './assets/anchors-smooth-scrolling.js';
document.addEventListener('DOMContentLoaded', () => {
  cookiesAccept('.cookies-accept', '.cookies-accept__button');
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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.question-sheet__content');

  const updateContainerHeight = () => {
    const active = container.querySelector(
      '.question-sheet__fieldset-table.active'
    );

    if (active) {
      const height = active.offsetHeight;
      container.style.height = `${height}px`;
    }
  };

  const fieldsets = document.querySelectorAll(
    '.question-sheet .question-sheet__fieldset-table'
  );
  let current = 0;

  const showFieldset = (index) => {
    fieldsets.forEach((fs) => fs.classList.remove('active'));
    fieldsets[index].classList.add('active');
    updateContainerHeight();
  };
  showFieldset(current);

  document.querySelectorAll('._btn-next').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current < fieldsets.length - 1) {
        current++;
        showFieldset(current);
      }
    });
  });

  document.querySelectorAll('._btn-prew').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        showFieldset(current);
      }
    });
  });

  const questionForm = document.querySelector('.question-sheet');
  const btnCloseQuestion = questionForm.querySelector('.btn-close');
  btnCloseQuestion.addEventListener('click', () => {
    // Сброс формы
    questionForm.reset();

    // Возврат к первому шагу
    current = 0;
    showFieldset(current);

    // Обновление высоты
    updateContainerHeight();
  });
});
