//класс для сохранения,загрузки и очистки (из LocalStorage)
export class LocalStorageMgr {

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
            localStorage.setItem(`tt-${uniqueName}`,JSON.stringify(result));
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
            keys.push(localStorage.key(i));
        }
        keys.forEach(key=>{
            records.push(JSON.parse(localStorage.getItem(key)))
        })
        return keys;
        //return records;
    }

    // показать все записи но! удалить у имён префикс tt-  вынести в отдельную функцию проверку на наличие tt и удаление для вывода?? или не надо
    showRecords(){
        let tr = `<tr>`
        this.getRecords().forEach(key=>{
            tr +=`<td>${key}</td>`
        });
        tr += `</tr>`
        return tr;
    }

    clearLS(){
        localStorage.clear();
    }

}