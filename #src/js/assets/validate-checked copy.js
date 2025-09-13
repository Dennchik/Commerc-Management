export function validateChecked() {
  const fieldsets = document.querySelectorAll(
    'fieldset.form-question__fieldset-table'
  );

  fieldsets.forEach((fieldset) => {
    const nextButton = fieldset.querySelector('._btn-next button');

    const checkInputs = () => {
      const radios = fieldset.querySelectorAll('input[type="radio"]');
      const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
      const textareas = fieldset.querySelectorAll('textarea');

      let isValid = false;

      // Проверка radio buttons
      radios.forEach((radio) => {
        if (radio.checked) isValid = true;
      });

      // Проверка checkboxes
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) isValid = true;
      });

      // Проверка текстовых полей
      textareas.forEach((textarea) => {
        if (textarea.value.trim() !== '') isValid = true;
      });

      // Активация или деактивация кнопки
      nextButton.disabled = !isValid;
    };

    // Навешиваем обработчики на все элементы
    fieldset.addEventListener('input', checkInputs);
    checkInputs(); // начальная проверка
  });
}
