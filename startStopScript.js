let timePlace = document.getElementById('timePlace')
let startButton = document.getElementById('start')
let stopButton = document.getElementById('stop')
let timeStampsArea = document.getElementById('timeStampsArea')
let timeStampsTableBody = document.getElementById('timeStampsTableBody')
const rusMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября','Ноября','Декабря']

function timeViewer(D = new Date()) {
    let [year,month,day,hour,minutes,seconds] = [D.getFullYear(),D.getMonth(),D.getDate(),D.getHours(),D.getMinutes(), D.getSeconds()];
    let ymdhms = `${year} ${rusMonths[month]} ${day} ${hour} ${minutes} ${seconds}`;
    return [ymdhms, hour, minutes];
}

startButton.onclick = () => { //создаёт tr, добавляет 1 td
    // let tr = document.createElement("tr");
    // tr.classList.add("timeRow");
    // let td = document.createElement("td");
    // td.classList.add("timeRowD");
    // tr.innerHTML = `${td}`;
    // timeStampsTableBody.appendChild(tr)
}

stopButton.onclick = () => { //добавляет 2-й td в tr
    timeStampsArea.appendChild(timeStamp("stop"));
}

function timeStamp(param = "start"){
    let mins = addZero(timeViewer()[2]);
    let hours = addZero(timeViewer()[1]);
    let timeStampInput = document.createElement('input');

    timeStampInput.type = "time";
    timeStampInput.value = `${hours}:${mins}`;
    timeStampInput.classList.add(`${param}`);
    return timeStampInput;
}

function addZero(p) {
    p < 10 ?
          p = `0${p}`
        : p = `${p}`
    return p
}

setInterval(() => {
    timePlace.innerText = `${timeViewer()[0]}`
},1000)