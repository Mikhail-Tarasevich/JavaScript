"use strict";

var SPAState={};
var articlesHTML = {};
var articlesFile = {};
var articlesFileName = {};

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
    var UpdatePage = true;
    var pageHTML="";
    switch ( SPAState.pagename ) {
        case 'StartPage':
            pageHTML+="<h2>Энциклопедия</h2>";
            pageHTML+="<br>";
            pageHTML+="<input type=button value='список статей здесь' onclick=switchToState({pagename:'Contents'})>";
            break;
        case 'Contents':
            $.ajax("Contents.json", { type:'GET', dataType:'json', success:readContents, error:errorHandler } );
            UpdatePage = false;
            break;
        default:
            // обработка Page_i_j
            if (SPAState.pagename.slice(0,5)=="Page_") {
                if (Object.keys(articlesFileName).length == 0) { // если список файлов не подгружен (например, обновили страницу), то подгрудаем его
                    $.ajax("Contents.json", { type:'GET', dataType:'json', success:readAllContents, error:errorHandler } );
                }
                else {
                    let pagename = "Page_" + SPAState.pagename.slice(5,6) + "_" + SPAState.pagename.slice(7,8);
                    $.ajax(articlesFileName[pagename], { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
                }
            }
            UpdatePage = false;
            break;
    }
    if (UpdatePage) {document.getElementById('IPage').innerHTML=pageHTML};
}

function switchToState(newState) {
    location.hash=encodeURIComponent(JSON.stringify(newState));
}

function readHTMLContents(data) {
    if (SPAState.pagename.slice(0,5)=="Page_") {
        let pagename = "Page_" + SPAState.pagename.slice(5,6) + "_" + SPAState.pagename.slice(7,8);
        console.log("загружено: " + pagename);
        document.getElementById('IPage').innerHTML=articlesHTML[pagename];
        document.getElementById('IPage2').innerHTML=data;
    }
}

function readContents(data) {
    let value= data;
    // код для страницы 2-го уровня
    var ContentsHTML = "<h2>Оглавление</h2>";
    ContentsHTML+="<br>";
    for (let i=0; i<value.Contents.length; i++) {
        var l = value.Contents[i];
        ContentsHTML+= "<h3>" + l.letter + "</h3>";
        ContentsHTML+="<br>";
        for (let j=0; j<l.articles.length; j++) {
            let pagename = "Page_" + i + "_" + j ;
            ContentsHTML+= "<input type=button value='" + l.articles[j][0] + "' onclick=switchToState({pagename:'" + pagename + "'})>";
            ContentsHTML+="<br>";
            articlesFileName[pagename] = l.articles[j][1];
            // код для страницы 3-го уровня
            let FileHTML = `<div style="float: left; margin: 5px"><div style="float: left; width:100px">`;
            FileHTML+=`<h3>` + l.letter + `</h3>`;
            FileHTML+="<br>";
            for (let k=0; k<l.articles.length; k++) {
                let pagename2 = "Page_" + i + "_" + k ;
                FileHTML+="<input type=button value='" + l.articles[k][0] + "' onclick=switchToState({pagename:'" + pagename2 + "'})>";
                FileHTML+="<br>";
            }
            FileHTML+=`</div><div style="width:auto"><div id='IPage2'></div></div>`;
            articlesHTML[pagename] = FileHTML;
        }
        ContentsHTML+="<br>";
    }
    document.getElementById('IPage').innerHTML=ContentsHTML;
}

function readAllContents(data) {
        let value= data;
        // код для страницы 2-го уровня
        for (let i=0; i<value.Contents.length; i++) {
            var l = value.Contents[i];
            for (let j=0; j<l.articles.length; j++) {
                let pagename = "Page_" + i + "_" + j ;
                articlesFileName[pagename] = l.articles[j][1];
                // код для страницы 3-го уровня
                let FileHTML = `<div style="float: left; margin: 5px"><div style="float: left; width:100px">`;
                FileHTML+=`<h3>` + l.letter + `</h3>`;
                FileHTML+="<br>";
                for (let k=0; k<l.articles.length; k++) {
                    let pagename2 = "Page_" + i + "_" + k ;
                    FileHTML+="<input type=button value='" + l.articles[k][0] + "' onclick=switchToState({pagename:'" + pagename2 + "'})>";
                    FileHTML+="<br>";
                }
                FileHTML+=`</div><div style="width:auto"><div id='IPage2'></div></div>`;
                articlesHTML[pagename] = FileHTML;
            }
        }

        if (SPAState.pagename.slice(0,5)=="Page_") {
            let pagename = "Page_" + SPAState.pagename.slice(5,6) + "_" + SPAState.pagename.slice(7,8);
            $.ajax(articlesFileName[pagename], { type:'GET', dataType:'html', success:readHTMLContents, error:errorHandler } );
        }
    }
  
function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
 

function run() {
    window.onhashchange=switchToStateFromURLHash;
    switchToStateFromURLHash();
}


