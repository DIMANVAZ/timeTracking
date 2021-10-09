export class Time {
   rusMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября','Ноября','Декабря'];

   getTime(D = new Date()) {
       let [year,month,day,hours,minutes,seconds] = [D.getFullYear(),D.getMonth(),D.getDate(),D.getHours(),D.getMinutes(), D.getSeconds()];
       let fullDateTimeString = `${day} ${this.rusMonths[month]} ${year}, ${hours}:${minutes}:${seconds}`;
       return {fullDateTimeString,year,month,day,hours,minutes,seconds};
   };

    hms(){
        return `${this.addZero(this.getTime().hours)[0]}:
            ${this.addZero(this.getTime().minutes)[0]}:
            ${this.addZero(this.getTime().seconds)[0]}`
    }

   minutesDuration(startMins, endMins){
       if(endMins >= startMins){
           return endMins-startMins;
       } else return (endMins+60)-startMins
   }

   hoursDuration(startHours, endHours){
       if(endHours >= startHours){
           return endHours-startHours;
       } else return (endHours+24)-startHours
   }

   sumHoursAndMins(startTime = {hours:0, minutes:0}, endTime = {hours:0, minutes:0}){
       let hoursSum = this.hoursDuration(startTime.hours, endTime.hours);
       let minutesSum = this.minutesDuration(startTime.minutes, endTime.minutes);
       return {hoursSum, minutesSum};
   }

   addZero(number){
       if(number < 10){
           return [`0${number}`,number]; // [0] = string!
       } else return [`${number}`,number];
   }

   startTime = {};
   endTime = {};
   rows = 0;
   sumOfAll = {allHours:0, allMinutes:0};

   memento(timeStamp){
       timeStamp.hours = this.getTime().hours;
       timeStamp.minutes = this.getTime().minutes;
   }

   makeTableRow(rows){
        // просто сокращения
        let sum = this.sumHoursAndMins(this.startTime, this.endTime);
        let stT = this.startTime;
        let edT = this.endTime;

        this.sumOfAll.allHours += sum.hoursSum;
        this.sumOfAll.minutes += sum.minutesSum;

    return `<tr>
                <td>${rows} </td>
                <td>${stT.hours}: ${stT.minutes} - ${edT.hours}: ${edT.minutes}</td>
                <td>${sum.hoursSum} ч, ${sum.minutesSum} мин </td>
            </tr>`
   }

    makeFinalRow(){
       return `<td>Всего</td><td>${this.sumOfAll.allHours} ч, ${this.sumOfAll.allMinutes} мин</td>`
    }

}
// почему не считается общее время? Его будем и показывать, и записывать
// как вставлять динамические строки в середину
// как перевернуть вставляемый список?

// time1 = {hours:23, minutes:8};
// time2 = {hours:5, minutes:36};
//
// let time = new Time();
// console.log(time.sumHoursAndMins(time1, time2))