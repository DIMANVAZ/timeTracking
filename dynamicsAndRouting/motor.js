let app = document.getElementById('app');

let a = "<p>Это текст для варианта А</p>";
let blockA = `<div>${a}</div>`;

let b = '<p>Это текст для варианта Б</p>';
let blockB = `<div>${b}</div>`;

let c_textOnly = "Это просто текст в кавычках";
let c_textInDiv = "<div>Это текст в теге див и кавычках</div>";
let c_textAndFormula = `<div>Это текст в литералах и вычисление: ${5+6}</div>`;

let c_emptyInput = '<input type="text" value="anyText"/>'

//c_emptyInput.setAttribute('type','time')
//Uncaught TypeError: c_emptyInput.setAttribute is not a function

let c_createdByDocument = document.createElement('h1')
c_createdByDocument.innerText = 'текст внутри h1, созданного через CreateElement';

// let selectAbutton = document.getElementById('selectA');
// let selectBbutton = document.getElementById('selectB');
let selectCbutton = document.getElementById('selectC');

selectCbutton.onclick = () => {
    //app.append(c_textOnly) //внутри нашего дива появится просто текст
    //app.append(c_textInDiv) //--"-- появится текст с HTML-тегами
    //app.append(c_textAndFormula) // --"-- появится HTML-конструкция в виде текста и посчитанной формулы
    //app.append(c_createdByDocument)// большая надпись, и внутри diva вставился h1 по структуре

    //app.appendChild(c_createdByDocument)// большая надпись, и внутри diva вставился h1 по структуре
    // всё остальное - нет (т.к. это не ДОМ-ноды)

    //app.insertAdjacentHTML('beforebegin',c_textOnly) //вставится просто текст, не обёрнутый в теги
    //app.insertAdjacentHTML('beforebegin',c_textInDiv) //в структуру HTML вставится div с текстом
    //app.insertAdjacentHTML('beforebegin',c_textAndFormula) //аналогично, только формула посчиталась
    app.insertAdjacentHTML('beforebegin',c_emptyInput) // вставилось пустое инпут-поле
    c_emptyInput = document.querySelector('input')
    //c_emptyInput.setAttribute('value','superText')
    c_emptyInput.value = 'supertext 2'

}



// selectAbutton.onclick = () => {
//     app.insertAdjacentHTML('beforeend',blockA)
// }
//
// selectBbutton.onclick = () => {
//     app.append(blockB)
// }

