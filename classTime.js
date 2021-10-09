export class Time {
    rusMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября','Ноября','Декабря'];
    startTime = {};
    endTime = {};
    rowId = 0;
    summary = [];

    getTime(D = new Date()) {
       let [year,month,day,hours,minutes,seconds] = [D.getFullYear(),D.getMonth(),D.getDate(),D.getHours(),D.getMinutes(), D.getSeconds()];
       let fullDateTimeString = `${day} ${this.rusMonths[month]} ${year}, ${hours}:${minutes}:${seconds}`;
       return {fullDateTimeString,year,month,day,hours,minutes,seconds};
    }

    hmsString(){    //СТРОКА h:m:s для часов
        return `${this.addZero(this.getTime().hours)}:
                ${this.addZero(this.getTime().minutes)}:
                ${this.addZero(this.getTime().seconds)}`
    }

    minutesDuration(startMins, endMins){    //разница между минутами
       if(endMins >= startMins){
           return endMins-startMins;
       } else return (endMins+60)-startMins;
    }

    hoursDuration(startHours, endHours){    //разница между часами
       if(endHours >= startHours){
           return endHours-startHours;
       } else return (endHours+24)-startHours;
    }

    sumHoursAndMins(startTime, endTime){    //разница между нач и кон временем в форматах {hours:0, minutes:0}
       let hoursSum = this.hoursDuration(startTime.hours, endTime.hours);
       let minutesSum = this.minutesDuration(startTime.minutes, endTime.minutes);
       return {hoursSum, minutesSum};
    }

    addZero(number){    //добавляет 0 перед цифрой<10 и возвращает string!
       if(number < 10){
           return `0${number}`;
       } else return `${number}`;
    }

    memento(startOrEnd){    //снимок: пишет в startTime{} или endTime{} текущие часы и минуты
        if(startOrEnd === 'start'){
            this.startTime = this.getTime();
        } else if (startOrEnd === 'end'){
            this.endTime = this.getTime();
        } else console.log('unknown command');
    }

    makeTableRow(rows){    //возвращает содержимое для строки из трёх столбцов
        // просто сокращения
        let sum = this.sumHoursAndMins(this.startTime, this.endTime);
        let stT = this.startTime;
        let edT = this.endTime;

        this.recordOneRow(this.rowId, stT, edT, sum);

        return `<td>${rows} </td>
                <td>${stT.hours}: ${this.addZero(stT.minutes)} - ${edT.hours}: ${this.addZero(edT.minutes)}</td>
                <td>${sum.hoursSum} ч, ${sum.minutesSum} мин </td>
                `
    }

    recordOneRow(rowId, startTime, endTime, totalDuration){ //записать 1 строку в массив объектов-строк
        let rowObject = {rowId, startTime, endTime, totalDuration};
        this.summary.push(rowObject);
    }

    makeFinalRow(){    //заполнить подвал таблицы финальными данными
       return `<td>Всего</td>
               <td>${this.sumAllRows(this.summary).hours} ч, 
                   ${this.sumAllRows(this.summary).minutes} мин</td>`
    }

    sumAllRows(summaryArray){
        let sumAll = {hours: 0, minutes: 0};
        summaryArray.forEach(record => {
            sumAll.hours += record.totalDuration.hoursSum;
            sumAll.minutes += record.totalDuration.minutesSum;
        })
        console.log(sumAll)
        return sumAll
    }
}
// почему не считается общее время? Его будем и показывать, и записывать
