import {Time} from "./classTime.js";
import {LocalStorageMgr} from "./classSaveAndLoad.js";

let time = new Time();
let LSM = new LocalStorageMgr();

const app = document.getElementById('app');
const clock = document.getElementById('clock');
const date = document.getElementById('date');
const notifier = document.getElementById('recordNotifier');
const timeTable = document.getElementById('timeTable');
const sumRow = document.getElementById('sumRow');

//дата в верху страницы
date.innerHTML = time.getTime().fullDateTimeString.split(',')[0]

//часы:минуты в данную секунду времени, автоматически обновляется
setInterval(() => {
    clock.innerHTML = time.hms();
},1000)

let isRecording = false;

// нажатие на часы
clock.onclick = () => {

    if (!isRecording){
        time.memento(time.startTime);   //записали время
        isRecording = true;
        notifier.classList.toggle('hidden');
        clock.classList.toggle('blink');

    } else {
        time.memento(time.endTime);     //записали время
        isRecording = false;
        notifier.classList.toggle('hidden');
        clock.classList.toggle('blink');

        let nextRow = document.createElement('tr'); //вставляем строку со временем в таблицу
        nextRow.innerHTML = time.makeTableRow(++time.rows);
        sumRow.parentNode.insertBefore(nextRow, sumRow);

        if(time.rows >=1) {
            timeTable.classList.remove('hidden');  //показываем таблицу, в т.ч. шапку
        }

        if(time.rows >=2) {
            sumRow.innerHTML =  time.makeFinalRow();     //показываем строку итогового подсчёта
            sumRow.classList.remove('hidden');
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
});

/*
//блок кнопок-переключателей
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
*/
