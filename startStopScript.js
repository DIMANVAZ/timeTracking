let timePlace = document.getElementById('timePlace')

const rusMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября','Октября','Ноября','Декабря']

function timeShower(D = new Date()) {
    let [year,month,day,hour,minutes,seconds] = [D.getFullYear(),D.getMonth(),D.getDate(),D.getHours(),D.getMinutes(), D.getSeconds()];
    let ymdhms = `${year} ${rusMonths[month]} ${day} ${hour} ${minutes} ${seconds}`
    let hm = `${hour} ${minutes}`;
    return [ymdhms, hm]
}

setInterval(() => {
    timePlace.innerText = `${timeShower()[0]}`
},1000)