export function validateForm() {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.form-order').forEach((form, index) => {
      const name = form.querySelector('.input.name');
      const phone = form.querySelector('.input.phone');
      const checkbox = form.querySelector('.checkbox__input');
      const sendButton = form.querySelector('.send-button');
      const buttonContainer = form
        .querySelector('.send-button')
        .closest('.button-container');

      if ([name, phone, checkbox, sendButton, buttonContainer].includes(null))
        return;

      /**
       * @param {HTMLElement} el — элемент или его контейнер для анимации
       * @param {Object} options
       * @param {number} options.maxSpread  — максимальный «размах» тени (px)
       * @param {number} options.duration   — общее время анимации (ms)
       * @param {number} options.pulses     — количество «туда‑обратно» за это время
       */

      function animateError(
        el,
        { maxSpread = 12, duration = 1000, pulses = 3 } = {}
      ) {
        const container = el.closest('.button-container') || el.parentElement;
        if (!container) return;

        let startTime = null;
        const totalTime = duration;

        function frame(ts) {
          if (!startTime) startTime = ts;
          const elapsed = ts - startTime;
          const progress = Math.min(elapsed / totalTime, 1);
          const wave = Math.abs(Math.sin(progress * pulses * Math.PI));
          const spread = maxSpread * wave;

          container.style.boxShadow = `0 0 ${spread}px ${spread / 2}px rgba(255,0,0,0.6)`;

          if (elapsed < totalTime) {
            requestAnimationFrame(frame);
          } else {
            container.style.boxShadow = '';
          }
        }

        requestAnimationFrame(frame);
      }

      function validateFormFields() {
        const nameVal = name.value.trim();
        const phoneVal = phone.value.trim();
        const isValid =
          nameVal.length >= 3 && phoneVal.length === 18 && checkbox.checked;

        buttonContainer.classList.toggle('is-disabled', !isValid);
        sendButton.disabled = !checkbox.checked;
        return isValid;
      }

      function showValidationErrors() {
        if (name.value.trim().length < 3) animateError(name);
        if (phone.value.trim().length !== 18) animateError(phone);
        if (!checkbox.checked) animateError(checkbox);
      }

      name.addEventListener('input', validateFormFields);
      phone.addEventListener('input', validateFormFields);
      checkbox.addEventListener('change', validateFormFields);

      validateFormFields();

      buttonContainer.addEventListener('click', (e) => {
        if (buttonContainer.classList.contains('is-disabled')) {
          e.preventDefault();
          console.warn(`⚠️ [Форма ${index + 1}] Невалидная попытка отправки`);
          showValidationErrors();
        }
      });

      sendButton.addEventListener('click', () => {
        if (
          !sendButton.disabled &&
          !buttonContainer.classList.contains('is-disabled')
        ) {
          // Получаем название цели для аналитики из кнопки
          let goalName = '';
          if (sendButton) {
            goalName = sendButton.getAttribute('goal-name') || '';
          }

          // Собираем данные из формы
          const formData = new FormData();
          formData.append('action', 'send_telegram_message');

          // Получаем номер телефона
          if (phone && phone.value) {
            formData.append('phone', phone.value.trim());
          }

          // Получаем имя
          if (name && name.value) {
            formData.append('name', name.value.trim());
          }

          // Добавляем имя цели (если есть)
          formData.append('goalName', goalName);

          // Отправляем данные через AJAX
          fetch(localizedVars.ajax_url, {
            method: 'POST',
            headers: {
              'X-WP-Nonce': localizedVars.ajax_nonce,
            },
            body: formData,
          })
            .then((response) => response.text())
            .then((responseText) => {
              alert('Ваш запрос отправлен.');
              console.log('Ответ сервера:', responseText);

              // Очищаем форму
              if (phone) phone.value = '';
              if (name) name.value = '';
              if (checkbox) checkbox.checked = false;

              // Делаем форму неактивной
              sendButton.classList.toggle('is-disabled', true);
            })
            .catch((error) => {
              console.error('Ошибка при отправке:', error);
              alert('Произошла ошибка при отправке данных.');
            });
        }
      });
    });
  });
}
