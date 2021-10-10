//класс для сохранения,загрузки и очистки (из LocalStorage)
export class LocalStorageMgr {

    saveToLS(uniqueName,result) {
    //проверим ключ на уникальность
    let nameIsUnique;
    let keys = Object.keys(localStorage);

    localStorage.setItem(uniqueName,JSON.stringify(result));

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