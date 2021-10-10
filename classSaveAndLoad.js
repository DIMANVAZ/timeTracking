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
            localStorage.setItem(uniqueName,JSON.stringify(result));
            return 'Сохранено'
        } else return 'Ошибка: такое имя уже есть'
    }

    loadFromLS(providedName){
        try{
            return JSON.parse(localStorage.getItem(providedName));
        }
        catch (e) {
            console.error(`Что-то не так с именем, ошибка: ${e}`);
        }
    }

    clearLS(){
        localStorage.clear();
    }

    saveInterface(){
        return ``
    }
}