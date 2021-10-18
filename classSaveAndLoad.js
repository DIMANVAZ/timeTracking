//класс для сохранения,загрузки и очистки (из LocalStorage)
export class LocalStorageMgr {

    addTT(string){
        return `tt-`+string;
    }

    delTT(string){
        if(string.indexOf('tt-') === 0)
        {return string.slice(3)}
        else return `No tt-`
    }

    wasViewed(){ //проверяем, новый юзер или нет
        let wasViewed = false;
        Object.keys(localStorage).forEach(key => {
            if (key === "wasViewed-tt"){
                wasViewed = true
            }
        })
        if (!wasViewed)
            {localStorage.setItem("wasViewed-tt", "true")};
        return wasViewed;
    }

    saveToLS(uniqueName,result) {
    //проверим ключ на уникальность
    let ableToSave;
    let keys = Object.keys(localStorage);

        if(uniqueName && !keys.length){
            ableToSave = true;
        } else if (uniqueName && keys.length) {
            ableToSave = true;
            keys.forEach(key =>{
                if(key === uniqueName){ //если такое имя уже есть
                    ableToSave = false;
                }
            })
        }

        if(ableToSave){
            localStorage.setItem(this.addTT(uniqueName),JSON.stringify(result));
            return 'Сохранено'
        } else return 'Ошибка: имя пустое или уже есть'
    }

    //загрузить из локального хранилища по имени
    loadFromLS(providedName){
        try{
            return JSON.parse(localStorage.getItem(providedName));
        }
        catch (e) {
            console.error(`Что-то не так с именем, ошибка: ${e}`);
        }
    }

    //получить все записи из ЛС, которые относятся к нашей программе (не вперемешку с чужими)
    // вставить проверку, чтобы key начинался на tt-
    getRecords(){
        let keys = [];
        let records = [];
        for (let i = 0; i < localStorage.length; i++) {
            if(localStorage.key(i).slice(0,3) === "tt-") { //проверка, что ключ "наш", то есть не из другой проги
                keys.push(localStorage.key(i));
            }
        }
            keys.forEach(key=>{
                records.push(JSON.parse(localStorage.getItem(key)));
            })
            return keys;
        //return records;
    }

    // показать все записи но!
    // выводить их в виде flex ?
    showRecords(){
        // let tr = `<tr>` ------- это для таблицы
        // this.getRecords().forEach(key=>{
        //     tr +=`<td>${this.delTT(key)}</td>`
        // });
        // tr += `</tr>`
        // return tr;

        let allDivs = ``
        this.getRecords().forEach(key=>{
            allDivs +=`<div class="flexCell">${this.delTT(key)}</div>`
        });
        return allDivs;
    }

    clearAllRecords(){
        localStorage.clear();
    }

    clearThisRecord(key){
        localStorage.removeItem(key);
    }

}