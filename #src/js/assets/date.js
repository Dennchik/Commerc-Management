export function name(element) {
	let dateContainer = document.querySelector(element);
	if (!dateContainer) return;

	let now = new Date();
	let options = { month: 'short' }; // Сокращённое название месяца
	let day = now.getDate();
	let month = new Intl.DateTimeFormat('ru-RU', options).format(now);

	// Убираем точку и делаем первую букву заглавной
	month = month.replace('.', '').charAt(0).toUpperCase() + month.slice(1, -1);
	dateContainer.innerHTML = `<div class="day">${day}</div> <div class="data-wrapper">
<div class="month">${month}</div></div>`;

}