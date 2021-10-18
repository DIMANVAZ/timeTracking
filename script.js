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
const recordsTable = document.getElementById('recordsTable');
const recordsFlexDiv = document.getElementById('recordsFlexDiv');
const showHideButton = document.getElementById('showHideButton');

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
    alert(status);                                   //
    recordsTable.innerHTML = `${LSM.showRecords()}`; //чтобы список обновился, если мы сохранили
    nameField.value = ''
}

//повесить проверку пустоты\полноты LS на любое событие?
//подвал с "загрузить" должен появиться, только когда в ЛС есть записи

showHideButton.onclick =() => { // показать\скрыть должны обновляться при изменении сохранённого - удалении или добавлении
    //recordsTable.classList.toggle('hidden'); -------это всё таблицы
    //recordsTable.innerHTML = `${LSM.showRecords()}`;

    recordsFlexDiv.classList.toggle('hidden');
    recordsFlexDiv.innerHTML = `${LSM.showRecords()}`;
}

document.addEventListener("DOMContentLoaded", () => {
    if (LSM.wasViewed() === false){
        alert("\n Это инструмент для хронометража - фиксации и подсчёта времени. Например, вам интересно, сколько часов в день вы тратите на образование." +
            "Жмите на часы для старта отсчёта, для прекращения отсчёта нажмите снова. " +
            "Получившиеся интервалы автоматически суммируются. Для сохранения результата введите уникальное название и нажмите Сохранить");
    } else console.log('Старый пользователь');
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
