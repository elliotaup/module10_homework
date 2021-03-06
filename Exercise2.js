/* Задание 2.
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.
 */

const btn = document.querySelector('button');

btn.addEventListener('click', (e) => {
    let height = window.screen.height;
    let width = window.screen.width;
    alert(`Ширина экрана - ${width}, Высота экрана -  ${height}`)
})