let insertButton = document.getElementById('intervalInserter');
let countButton = document.getElementById('counter')
let tbody = document.querySelector('tbody');
let oneIntervalHTML = `<tr><td><input type="time" ></td><td><input type="time" ></td></tr>`;
let totalTimeField = document.querySelector('span');
let startTime = document.getElementById('start');
let endTime = document.getElementById('end');

function addInterval(){
    tbody.insertAdjacentHTML('beforeEnd',oneIntervalHTML);
}

insertButton.onclick =() => {
    addInterval();
}
countButton.onclick = () => {
    let totalTime = totalTimeCounter(
        intervalDuration(
            timeParser(startTime.value),timeParser(endTime.value)))
    totalTimeField.innerText = `${totalTime.totalHours} hours, ${totalTime.remainedMinutes} mins`
}


function timeParser(string){
    let hoursMins = {};
    hoursMins.hours = parseInt(string.split(":")[0]);
    hoursMins.mins = parseInt(string.split(":")[1]);
    return hoursMins;
}

function intervalDuration(time1,time2) {
    let intervalMinutes = (time2.hours - time1.hours) * 60 + (time2.mins - time1.mins);
    return intervalMinutes;
}

function totalTimeCounter(...minutes) {
    let totalTime = {};
    let totalMinutes = minutes.reduce((acc,val) => acc + val);
    totalTime.totalHours = Math.floor(totalMinutes / 60);
    totalTime.remainedMinutes = totalMinutes % 60;
    return totalTime;
}