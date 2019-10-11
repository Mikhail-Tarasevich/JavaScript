"use strict";

var SPAState={};
var ContentsHTML = "";
var articlesHTML = {};
var articlesFile = {};

function switchToMainPage() 
{
    console.log("run switchToMainPage"); 
    return false
}

function switchToStateFromURLHash() {
    var URLHash=window.location.hash;

    var stateJSON=decodeURIComponent(URLHash.substr(1));

    if ( stateJSON!="" )
      {SPAState=JSON.parse(stateJSON)} // если JSON непустой, читаем из него состояние и отображаем
    else
      {SPAState={pagename:'StartPage'}}; // иначе показываем главную страницу

    console.log('Новое состояние приложения:');
    console.log(SPAState);

    // обновляем вариабельную часть страницы под текущее состояние
    // это реализация View из MVC - отображение состояния модели в HTML-код
    var pageHTML="";
    var pagename = "";
    switch ( SPAState.pagename ) {
        case 'StartPage':
            pageHTML+="<h2>Энциклопедия</h2>";
            pageHTML+="<br>";
            pageHTML+="<input type=button value='список статей здесь' onclick=switchToState({pagename:'Contents'})>";
            break;
        case 'Contents':
            pageHTML+=ContentsHTML;
            break;
        default:
            // обработка Page_i_j
            if (SPAState.pagename.slice(0,5)=="Page_") {
                pagename = "Page_" + SPAState.pagename.slice(5,6) + "_" + SPAState.pagename.slice(7,8);
                pageHTML=articlesHTML[pagename]
            }
            break;
    }
    document.getElementById('IPage').innerHTML=pageHTML;
    if (pagename!="") {
        document.getElementById('IPage2').innerHTML=articlesFile[pagename];
    }
}

function switchToState(newState) {
    location.hash=encodeURIComponent(JSON.stringify(newState));
}

function readHTMLContents(data) {
    let pagename = data.slice(5,13); // получаем название страницы <!--Page_0_0-->
    articlesFile[pagename] = data;
}

function readContents(data) {
    let value = JSON.parse(data);
    // код для страницы 2-го уровня
    ContentsHTML = "<h2>Оглавление</h2>";
    ContentsHTML+="<br>";
    for (let i=0; i<value.Contents.length; i++) {
        var l = value.Contents[i];
        ContentsHTML+= "<h3>" + l.letter + "</h3>";
        ContentsHTML+="<br>";
        for (let j=0; j<l.articles.length; j++) {
            let pagename = "Page_" + i + "_" + j ;
            ContentsHTML+= "<input type=button value='" + l.articles[j][0] + "' onclick=switchToState({pagename:'" + pagename + "'})>";
            ContentsHTML+="<br>";
            // код для страницы 3-го уровня
            let FileHTML = `<div style="float: left; margin: 5px"><div style="float: left; width:100px">`;
            FileHTML+=`<h3>` + l.letter + `</h3>`;
            FileHTML+="<br>";
            for (let k=0; k<l.articles.length; k++) {
                let pagename2 = "Page_" + i + "_" + k ;
                FileHTML+="<input type=button value='" + l.articles[k][0] + "' onclick=switchToState({pagename:'" + pagename2 + "'})>";
                FileHTML+="<br>";
            }
//            FileHTML+=`</div><div style="float: left; width:auto"><iframe src="` + l.articles[j][1] + `" width=500px height=500px"></iframe></div>`;
            FileHTML+=`</div><div style="float: left; width:auto"><div id='IPage2'></div></div>`;
            articlesHTML[pagename] = FileHTML;
        }
        ContentsHTML+="<br>";
    }
}
  
function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
 

function run() {
//    $.ajax("Contents.json", { type:'GET', dataType:'json', success:readContents, error:errorHandler } );
    var data = `{        "Contents": [          {            "letter": "A",            "articles": [              [                "статья А1",                "indexA1.html"              ],              [                "статья А2",                "indexA2.html"              ],              [                "статья А3",                "indexA3.html"              ]            ]          },          {            "letter": "B",            "articles": [              [                "статья B1",                "indexB1.html"              ],              [                "статья B2",                "indexB2.html"              ],              [                "статья B3",                "indexB3.html"              ]            ]          },          {            "letter": "C",            "articles": [              [                "статья C1",               "indexC1.html"              ],              [                "статья C2",                "indexC2.html"              ],              [                "статья C3",                "indexC3.html"              ]            ]          }        ]      }`;
    readContents(data);

    /*
    $.ajax("indexA1.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexA2.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexA3.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexB1.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexB2.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexB3.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexC1.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexC2.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    $.ajax("indexC3.html", { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
    */
    data = `<!--Page_0_1-->
    <div>
      <h1>Создать проект ANKETA. </h1>
      Спросить у пользователя:
      <ul style='margin-top: 6px; margin-bottom: 6px'>
      <li>фамилию, имя, отчество РАЗДЕЛЬНО (оператором prompt)
      <li>возраст в годах (оператором prompt)
      <li>пол (оператором confirm, например, "ваш пол - мужской?")
      </ul>
      и вывести оператором alert анкету пользователя по примеру:
      <div style='margin-top: -5px; margin-bottom: 10px'>
      ваше ФИО: Иванов Иван Иванович
      ваш возраст в годах: 20
      ваш возраст в днях: 7300
      через 5 лет вам будет: 25
      ваш пол: мужской
      вы на пенсии: нет
      </div>
      Должен быть контроль корректности вводимых пользователем данных (например, фамилия не должна быть пустой, возраст должен быть корректной цифрой и т.д.).
      <div style='height: 8px'></div>
      Оператор alert в коде должен использоваться ровно один раз.
    </div>`;
    readHTMLContents(data);
    data = `<!--Page_1_0-->
    <h1>N.07 Домашнее задание VOWELS</h1>
          <div>
          Написать &laquo;чистую&raquo; функцию для <b>эффективного</b> подсчёта количества русских гласных букв в строке.
          <br>Регулярные выражения (кто умеет) не использовать.
          <br>Спросить у пользователя строку. Вывести в консоль количество русских гласных букв в ней.
          </div>`;
    readHTMLContents(data);

    window.onhashchange=switchToStateFromURLHash;
    switchToStateFromURLHash();
}


