function run() {
  var ajaxHandlerScript1="formDef1.json";

  $.ajax(ajaxHandlerScript1, { type:'GET', dataType:'json', success:readFormDef1, error:errorHandler } );
}

function setElements(form,elem) {
  var res = "";
  for (var i=0; i<=elem.length; i++) {
    var j = elem[i];
    if (j!=undefined) {

      var div = document.createElement('div');

      switch (j.kind) {
      case 'number':
        var element1 = document.createElement("label");
        element1.innerText=j.label;
        div.appendChild(element1); 

        var element2 = document.createElement("input");
        element2.name=j.name;
          element2.type='number';
        div.appendChild(element2); 

        break;
      case 'longtext':
        var element1 = document.createElement("label");
        element1.innerText=j.label;
        div.appendChild(element1); 

        var element2 = document.createElement("input");
        element2.name=j.name;
        element2.style.width='453px';
        div.appendChild(element2); 

        break;
      case 'shorttext':
        var element1 = document.createElement("label");
        element1.innerText=j.label;
        div.appendChild(element1); 

        var element2 = document.createElement("input");
        element2.name=j.name;
        element2.style.width='200px';
        div.appendChild(element2); 

        break;
      case 'submit':
        var element2 = document.createElement("button");
        element2.innerHTML=j.label;
        element2.type='button';
        div.appendChild(element2); 

        break;
      case 'memo':
        var element1 = document.createElement("label");
        element1.innerText=j.label;
        div.appendChild(element1); 

        var element2 = document.createElement("textarea");
        element2.name=j.name;
        element2.cols='80';
        element2.rows='20';
        div.appendChild(element2); 

        break;
      case 'combo':
        var element1 = document.createElement("label");
        element1.innerText=j.label;
        div.appendChild(element1); 

        var element2 = document.createElement("select");
        var opt = null;
        for(r=0; r<=j.variants.length; r++) {
          var txt = j.variants[r];
          if (txt!=undefined) {
            opt = document.createElement('option');
            var t = document.createTextNode(txt['text']);
            opt.value = txt['text'];
            opt.appendChild(t);
            element2.appendChild(opt);
          }
        }

        div.appendChild(element2); 

        break;
      case 'radio':
        var element1 = document.createElement("label");
        element1.innerText=j.label;
        div.appendChild(element1); 
        var checked = true;

        for(r=0; r<=j.variants.length; r++) {
          var txt = j.variants[r];
          if (txt!=undefined) {
            var element2 = document.createElement("input");
            element2.name = j.name;
            element2.type='radio';
            element2.setAttribute('value', txt['text']);
            if (checked) {
              element2.setAttribute('checked', 'checked');
              checked = false;
            };
            div.appendChild(element2); 
            div.innerHTML += "<span>" + txt['text'] + "</span>";  
          }
        }
        break;
      }

      form.appendChild(div); 
      document.body.appendChild(form);
    }
  }
}

function readFormDef1(data) {
  var ajaxHandlerScript2="formDef2.json";
  setElements(document.forms.form1,data);
  $.ajax(ajaxHandlerScript2, { type:'GET', dataType:'json', success:readFormDef2, error:errorHandler } );
}

function readFormDef2(data) {
  setElements(document.forms.form2,data);
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

