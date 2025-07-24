document.addEventListener('DOMContentLoaded', () => {
  const fieldsets = document.querySelectorAll(
    '.question-sheet .question-sheet__fieldset-table'
  );
  console.log(fieldsets);
  let current = 0;

  const showFieldset = (index) => {
    fieldsets.forEach((fs, i) => {
      fs.style.display = i === index ? 'block' : 'none';
    });
  };

  showFieldset(current); // Показываем первый шаг

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
});
