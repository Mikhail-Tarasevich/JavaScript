"use strict";

/*
TODO
1) не сделана задача: Домен извлекать из поля «URL сайта» с помощью регулярного выражения.
2) сделать накопление проверенных доменов в списке
если домен проверяли, то повторно не проверять
этим решится проблема повторной проверки и ожидания при нажатии на кнопку Отправить
*/

var ajaxHandlerScript="http://fe.it-academy.by/TestAjax3.php";
var isDomainCheck = false;

function run() {
  var elem=document.getElementById('razr');
  elem.addEventListener("blur", validRazr, false);

  elem=document.getElementById('sitename');
  elem.addEventListener("blur", validSiteName, false);

  elem=document.getElementById('siteurl');
  elem.addEventListener("blur", validSiteURL, false);

  elem=document.getElementById('sitedate');
  elem.addEventListener("blur", validSiteDate, false);

  elem=document.getElementById('sitestat');
  elem.addEventListener("blur", validSiteStat, false);

  elem=document.getElementById('siteemail');
  elem.addEventListener("blur", validSiteEMail, false);

  elem=document.getElementById('catalog');
  elem.addEventListener("blur", validCatalog, false);
  elem.addEventListener("click", validCatalog, false);

  elem=document.getElementById('radio1');
  elem.addEventListener("blur", validRadio, false);
  elem.addEventListener("click", validRadio, false);
  elem=document.getElementById('radio2');
  elem.addEventListener("blur", validRadio, false);
  elem.addEventListener("click", validRadio, false);
  elem=document.getElementById('radio3');
  elem.addEventListener("blur", validRadio, false);
  elem.addEventListener("click", validRadio, false);

  elem=document.getElementById('checkcomment');
  elem.addEventListener("blur", validCheckComment, false);
  elem.addEventListener("click", validCheckComment, false);

  elem=document.getElementById('sitecomment');
  elem.addEventListener("blur", validSiteComment, false);

  elem=document.getElementById('submit');
  elem.onclick = sendForm;
}

function validRazr(setfocus) {
  var elem=document.getElementById('razr');
  var error = document.getElementById('errorrazr');
  var errorCount = 0;
  var Reg61 = new RegExp("^.*[^A-zА-яЁё].*$"); // только НЕ буквы латиницы или кириллицы
  var errtext = '';
  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  else if (Reg61.test(elem.value)) {
    errtext = 'Должны быть только буквы!'
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validSiteName(setfocus) {
  var elem=document.getElementById('sitename');
  var error = document.getElementById('errorsitename');
  var errorCount = 0;
  var errtext = '';
  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validCatalog(setfocus) {
  var elem=document.getElementById('catalog');
  var error = document.getElementById('errorcatalog');
  var errorCount = 0;
  var errtext = '';
  if (elem.value=='0') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validSiteURL(setfocus) {
  var elem=document.getElementById('siteurl');
  var error = document.getElementById('errorsiteurl');
  var errorCount = 0;
  var Reg61 = new RegExp("^(http|https):\/\/", "i"); // строка должна начинаться с http:// или https:// независимо от регистра
  var errtext = '';
  isDomainCheck = false;
  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
//  else if (!Reg61.test(elem.value)) {
  //  errtext = 'Неправильный адрес сайта!'
    //errorCount++;
  //}
  else {
    errtext = "идет проверка домена "+elem.value+"...";
    $.ajax(ajaxHandlerScript,
      { type:'GET', dataType:'text', data:{func:'GET_DOMAIN_IP',domain:elem.value},
            success: loaded, error:errorHandler }
    );
  }

  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function loaded(data) {
  if (data=="") {
    setErrorToURL()
  }
  else {
    var error = document.getElementById('errorsiteurl');
    var errtext = ''
    error.className = "error";
    error.innerHTML = errtext;
    isDomainCheck = true;
    console.log('проверка успешно пройдена');
  }
}

function errorHandler(jqXHR,statusStr,errorStr) {
  setErrorToURL();
}

function setErrorToURL() {
  var elem=document.getElementById('siteurl');
  var error = document.getElementById('errorsiteurl');
  var errorCount = 1;
  var errtext = 'Такой домен не существует!'
  error.className = "error";
  error.innerHTML = errtext;
  elem.focus();
  console.log('Такой домен не существует!');
}

function validSiteDate(setfocus) {
  var elem=document.getElementById('sitedate');
  var error = document.getElementById('errorsitedate');
  var errorCount = 0;
  var errtext = '';
  var checkdate = Date.parse(elem.value);

  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  else if (checkdate!==checkdate) {
    errtext = 'Неправильная дата сайта!'
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validSiteStat(setfocus) {
  var elem=document.getElementById('sitestat');
  var error = document.getElementById('errorsitestat');
  var errorCount = 0;
  var errtext = '';
  var checknumber = isFinite(elem.value);

  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  else if (!checknumber) {
    errtext = 'Неправильно указано количество посетителей!'
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validSiteEMail(setfocus) {
  var elem=document.getElementById('siteemail');
  var error = document.getElementById('errorsiteemail');
  var Reg61 = new RegExp(".+@.+\..+", "i"); // в адресе должна быть  одна или несколько точек, потом @ потом две и более точек, а между ними текст
  var errorCount = 0;
  var errtext = '';
  var checknumber = isFinite(elem.value);

  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  else if (!Reg61.test(elem.value)) {
    errtext = 'Неправильно указан e-mail!'
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validRadio(setfocus) {
  var error = document.getElementById('errorradio');
  var errorCount = 0;
  var errtext = '';
  var count = 0;
  for (var i=1; i<4; i++) {
    var elem=document.getElementById('radio'+i);
    if (elem.checked) { count++}
  }

  if (count==0) { 
      errtext = 'Не заполнено поле!';
      errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validCheckComment(setfocus) {
  var elem=document.getElementById('checkcomment');
  var error = document.getElementById('errorcheckcomment');
  var errorCount = 0;
  var errtext = '';
  var count = 0;

  if (!elem.checked) { 
    errtext = 'Мы принимаем заявки только с разрешенными отзывами!';
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function validSiteComment(setfocus) {
  var elem=document.getElementById('sitecomment');
  var error = document.getElementById('errorsitecomment');
  var errorCount = 0;
  var errtext = '';

  if (elem.value=='') { 
    errtext = 'Не заполнено поле!';
    errorCount++;
  }
  else if (elem.value.length<50) {
    errtext = 'Опишите сайт более подробно!'
    errorCount++;
  }
  error.className = "error";
  error.innerHTML = errtext;

  if (errorCount>0 & setfocus) {
    elem.focus();
  }

  return errorCount;
}

function sendForm(event) {
  var errorCount = 0;
  errorCount+=validRazr(!errorCount);
  errorCount+=validSiteName(!errorCount);
  errorCount+=validSiteURL(!errorCount);
  errorCount+=validSiteDate(!errorCount);
  errorCount+=validSiteStat(!errorCount);
  errorCount+=validSiteEMail(!errorCount);
  errorCount+=validCatalog(!errorCount);
  errorCount+=validRadio(!errorCount);
  errorCount+=validCheckComment(!errorCount);
  errorCount+=validSiteComment(!errorCount);
  if (errorCount>0) {
    event.preventDefault(); 
  }
  else if (!isDomainCheck) {
    event.preventDefault(); 
    alert("Обождите окончание проверки домена");
  }
}