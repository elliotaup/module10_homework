/* Задание 3
1) Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат

2) Добавить в чат механизм отправки гео-локации. При клике на кнопку «Гео-локация» необходимо отправить данные серверу
 и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно
 эхо-сервер, не выводить.

 */

const wsUri = "wss://echo.websocket.org/";

function pageLoaded() {
    const infoOutput = document.querySelector(".info_output");
    const chatOutput = document.querySelector(".chat_output");
    const textarea = document.querySelector("textarea");
    const output = document.querySelector(".output")
    const sendBtn = document.querySelector(".textButton");
    const geoLocation = document.querySelector(".geoLocation")

    let socket = new WebSocket(wsUri);

    socket.onopen = () => {
        infoOutput.innerText = "Соединение установлено";
    }

    socket.onmessage = (event) => {
        writeToChat(event.data, true);
    }

    socket.onerror = () => {
        infoOutput.innerText = "При передаче данных произошла ошибка";
    }

    sendBtn.addEventListener("click", sendMessage);
    geoLocation.addEventListener("click", getLocation);

    function getLocation() {
        if ("geolocation" in navigator) {
            let locationOptions = {
                enableHighAccuracy: true
            };
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
        } else {
            writeOutput("Ваш браузер не поддерживает функцию определения местоположения");
        }
    }

    function sendMessage() {
        if (!textarea.value) return;
        socket.send(textarea.value);
        writeToChat(textarea.value, false);
        textarea.value === "";
    }

    function writeToChat(message, isRecieved) {
        let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
        chatOutput.innerHTML += messageHTML;
    }

    function writeOutput(message) {
        output.innerHTML = `<p>${message}</p>`;
    }

    function locationSuccess(data) {
        let link = `http://www.openstreetmap.org/index.html?lat=${data.coords.latitude}&lon=${data.coords.longitude}`;
        chatOutput.innerHTML = `<a href="${link}" target="_blank">Гео-локация</a>`;
    }

    function locationError() {
        writeOutput("При получении местоположения произошла ошибка");
    }
}

document.addEventListener("DOMContentLoaded", pageLoaded);