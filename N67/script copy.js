"use strict";

var SPAState={};
var ContentsHTML = "";
var articlesFiles = {};

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
                pageHTML=articlesFiles["Page_" + SPAState.pagename.slice(5,6) + "_" + SPAState.pagename.slice(7,8)]
            }
            break;
    }
    document.getElementById('IPage').innerHTML=pageHTML;
}

function switchToState(newState) {
    location.hash=encodeURIComponent(JSON.stringify(newState));
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
            FileHTML+=`</div><div style="float: left; width:auto"><iframe src="` + l.articles[j][1] + `" width=500px height=500px"></iframe></div>`;
            articlesFiles[pagename] = FileHTML;
        }
        ContentsHTML+="<br>";
    }
}
  
function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
 

function run() {
//    $.ajax("Contents.json", { type:'GET', dataType:'json', success:readContents, error:errorHandler } );
//    var data = `{        "Contents": [          {            "letter": "A",            "articles": [              [                "статья А1",                "indexA1.html"              ],              [                "статья А2",                "indexA2.html"              ],              [                "статья А3",                "indexA3.html"              ]            ]          },          {            "letter": "B",            "articles": [              [                "статья B1",                "indexB1.html"              ],              [                "статья B2",                "indexB2.html"              ],              [                "статья B3",                "indexB3.html"              ]            ]          },          {            "letter": "C",            "articles": [              [                "статья C1",               "indexC1.html"              ],              [                "статья C2",                "indexC2.html"              ],              [                "статья C3",                "indexC3.html"              ]            ]          }        ]      }`;
    var data = `{        "Contents": [          {            "letter": "A",            "articles": [              [                "статья А1",                "indexA1.html"              ],              [                "статья А2",                "indexA2.html"              ],              [                "статья А3",                "indexA3.html"              ]            ]          },          {            "letter": "B",            "articles": [              [                "статья B1",                "indexB1.html"              ],              [                "статья B2",                "indexB2.html"              ],              [                "статья B3",                "indexB3.html"              ]            ]          },          {            "letter": "C",            "articles": [              [                "статья C1",               "indexC1.html"              ],              [                "статья C2",                "indexC2.html"              ],              [                "статья C3",                "indexC3.html"              ]            ]          }        ]      }`;
    readContents(data);

    window.onhashchange=switchToStateFromURLHash;
    switchToStateFromURLHash();
}


