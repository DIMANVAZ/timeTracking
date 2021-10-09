import {Time} from "./classTime.js";
import {LocalStorageMgr} from "./classSaveAndLoad.js";

let time = new Time();
let LSM = new LocalStorageMgr();

const app = document.getElementById('app');
const clock = document.getElementById('clock');
const date = document.getElementById('date');
const notifier = document.getElementById('recordNotifier');
const timeTable = document.getElementById('timeTable');

//часы:минуты в данную секунду времени, автоматически обновляется через setInterval
setInterval(() => {
    clock.innerHTML = time.hms();
},1000)

date.innerHTML = time.getTime().fullDateTimeString.split(',')[0]

let isRecording = false;
clock.onclick = () => {

    if(!isRecording){
        time.memento(time.startTime);
        isRecording = true;

        notifier.classList.remove('hidden');
        clock.classList.toggle('blink');

    } else {
        time.memento(time.endTime);
        isRecording = false;

        notifier.classList.add('hidden');
        clock.classList.toggle('blink');

        timeTable.insertAdjacentHTML('beforeend', time.makeTableRow(time.i))
        time.i++;
        timeTable.insertAdjacentHTML('beforeend', time.makeFinalRow())
       //alert(Object.values(time.sumHoursAndMins(startTime, endTime)))
    }
}


document.addEventListener("DOMContentLoaded", () => {
});

$(function () {
    $('#switch-btn-1').click(function () {
        $(this).toggleClass('switch-on');
        if ($(this).hasClass('switch-on')) {
            $(this).trigger('on.switch');
        } else {
            $(this).trigger('off.switch');
        }
    });
    $('#switch-btn-1').on('on.switch', function () {
        $('#block-1').addClass('bl-hide');
        $('#block-2').removeClass('bl-hide');
    });
    $('.switch-btn').on('off.switch', function () {
        $('#block-1').removeClass('bl-hide');
        $('#block-2').addClass('bl-hide');
    });
});