/* Задание 1.
Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео).
При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
 */

const btn = document.querySelector('button');
const svg = document.querySelector('svg')

const full = 'bi-arrow-down-left-circle-full'
const empty = 'bi-arrow-down-left-circle'

btn.addEventListener('click', (e) => {
    if (svg.classList.contains(empty)) {
        svg.classList.remove(empty)
        svg.classList.add(full)
    } else {
        svg.classList.remove(full)
        svg.classList.add(empty)
    }
})