//класс для сохранения,загрузки и очистки (из LocalStorage)
export class LocalStorageMgr {

    saveToLS(result,uniqueName) {
    //проверим ключ на уникальность
    let nameIsUnique;
    let keys = Object.keys(localStorage);
        keys.forEach(key => {
            uniqueName !== key ?
            nameIsUnique = true : nameIsUnique = false;
        });
        if(nameIsUnique){
            localStorage.setItem(uniqueName,JSON.stringify(result));
        }else {
            alert('Такое имя уже есть, придумайте новое');
        }
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
}