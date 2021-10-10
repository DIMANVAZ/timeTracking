import {Time} from "./classTime.js";
import {LocalStorageMgr} from "./classSaveAndLoad.js";

let timeInstance = new Time();
let LSM = new LocalStorageMgr();

const app = document.getElementById('app');
const clock = document.getElementById('clock');
const date = document.getElementById('date');
const notifier = document.getElementById('recordNotifier');
const timeTable = document.getElementById('timeTable');
const sumRow = document.getElementById('sumRow');
const saveBlock = document.getElementById('saveBlock');
const submitSave = document.getElementById('submitSave');
const nameField = document.getElementById('nameField');

//дата в верху страницы
date.innerHTML = timeInstance.getTime().fullDateTimeString.split(',')[0]

//часы:минуты в данную секунду времени, автоматически обновляется
setInterval(() => {
    clock.innerHTML = timeInstance.hmsString();
},1000)

let isRecording = false;

// нажатие на часы
clock.onclick = () => {

    if (!isRecording){
        timeInstance.memento('start');   //записали время
        isRecording = true;
        notifier.classList.toggle('hidden');
        clock.classList.toggle('blink');

    } else {
        timeInstance.memento('end');     //записали время
        isRecording = false;
        notifier.classList.toggle('hidden');
        clock.classList.toggle('blink');

        let nextRow = document.createElement('tr'); //вставляем строку со временем в таблицу
        nextRow.innerHTML = timeInstance.makeTableRow(++timeInstance.rowId);
        sumRow.parentNode.insertBefore(nextRow, sumRow);

        if(timeInstance.rowId >=1) {
            timeTable.classList.remove('hidden');  //показываем таблицу, в т.ч. шапку
            saveBlock.classList.remove('hidden'); //показываем интерфейс сохранения
        }

        if(timeInstance.rowId >=2) {
            sumRow.innerHTML =  timeInstance.makeFinalRow();     //показываем строку итогового подсчёта
            sumRow.classList.remove('hidden');
        }
    }
}

//нажатие на div "сохранить"
submitSave.onclick = () => {
    let status = LSM.saveToLS(nameField.value, timeInstance.summary);
    alert(status);
    nameField.value = ''
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
