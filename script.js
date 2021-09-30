let insertButton = document.getElementById('intervalInserter');
let countButton = document.getElementById('counter')
let tbody = document.querySelector('tbody');
let oneIntervalHTML = `<tr class="time"><td><input type="time" ></td><td><input type="time" ></td></tr>`;
let totalTimeField = document.querySelector('span');
let saveButton = document.getElementById('saveButton');
let saveAs = document.getElementById('saveAs')

document.addEventListener('keydown', function () {
    if(event.key === "Enter"){
        addInterval()
    }
})

function addInterval(){
    tbody.insertAdjacentHTML('beforeEnd',oneIntervalHTML);
}

insertButton.onclick =() => {
    addInterval();
}

countButton.onclick = () => {
    missedFinder();
    let totalTime = totalBashHaHaHa();
    totalTimeField.innerText = `Часов: ${totalTime.totalHours}, минут: ${totalTime.remainedMinutes}`;
}

saveButton.onclick =() => {
    console.log(saveAs.value)
    localStorage.setItem(`${saveAs.value}`,JSON.stringify(totalTimeField.innerText))
}

function timeParser(stringTime){
    let hoursMins = {};
    hoursMins.hours = parseInt(stringTime.split(":")[0]);
    hoursMins.mins = parseInt(stringTime.split(":")[1]);
    return hoursMins;
}

function intervalDuration(time1,time2) {
    //случаи 1,2: часы2 >= часы1, минуты2 >= минуты1 - всё норм
    //случай 3: часы2 = часы1, минуты2 < минуты1 -ОШИБКА- добавить 24ч
    //случай 4: часы2 < часы1, минуты2 <= минуты1 - ОШИБКА - добавить 24 ч
    //случай 5: часы2 < часы1, минуты2 > минуты1 - ОШИБКА - добавить 24 ч
    if(time2.hours === time1.hours && time2.mins < time1.mins) {
        time2.hours += 24
    }

    if(time2.hours < time1.hours /*&& time2.mins <= time1.mins*/) {
        time2.hours += 24
    }

    // if(time2.hours < time1.hours && time2.mins <= time1.mins) {
    //     time2.hours += 24
    // }

    let intervalMinutes = (time2.hours - time1.hours) * 60 + (time2.mins - time1.mins);
    return intervalMinutes;
}

function totalBashHaHaHa (){
    let allIntervals = document.querySelectorAll('.time') // массив строк
        //самая верхняя строка <tr> - последний элемент в массиве, самая нижняя - нулевой
        //let intervalsAmount = allIntervals.length
    let totalDuration = 0;
    allIntervals.forEach(interval =>{
        let twoTimeFields = interval.querySelectorAll('input') //массив из 2-т тайм-инпутов строки

        totalDuration += intervalDuration(
            timeParser(twoTimeFields[0].value),
            timeParser(twoTimeFields[1].value)
        )
    })
    let totalTime = {};
        totalTime.totalHours = Math.floor(totalDuration / 60);
        totalTime.remainedMinutes = totalDuration % 60;
    return totalTime;
}

function missedFinder(){ //на случай незаполненного поля
    let hasRed = false;
    document.querySelectorAll('input').forEach(input => {
        if (!input.value && input.id !== "saveAS"){
            input.style.backgroundColor = 'red'
            input.value = "00:00"
            hasRed = true;
        } else {input.style.backgroundColor = 'white'}
    })
    if (hasRed){
        alert('Заполните красные поля')
    }
}