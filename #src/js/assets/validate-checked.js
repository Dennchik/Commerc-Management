export function validateChecked() {
  const fieldsets = document.querySelectorAll(
    'fieldset.form-question__fieldset-table'
  );

  fieldsets.forEach((fieldset) => {
    const nextButtonWrapper = fieldset.querySelector(
      '.form-question__button._btn-next'
    );
    const nextButton = nextButtonWrapper?.querySelector('button');

    const checkInputs = () => {
      const radios = fieldset.querySelectorAll('input[type="radio"]');
      const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
      const textareas = fieldset.querySelectorAll('textarea');

      let isValid = false;

      radios.forEach((radio) => {
        if (radio.checked) isValid = true;
      });

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) isValid = true;
      });

      textareas.forEach((textarea) => {
        if (textarea.value.trim() !== '') isValid = true;
      });

      if (nextButton) {
        nextButton.disabled = !isValid;
      }
    };

    fieldset.addEventListener('input', checkInputs);
    checkInputs(); // начальная проверка
  });
}
