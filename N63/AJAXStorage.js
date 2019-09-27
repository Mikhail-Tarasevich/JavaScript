var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var stringName='TARASEVICH_N63';

class AJAXStorage {
    constructor(storename) {
        this.updatePassword;
        this.storeName = stringName + '_' + storename; 
        this.storeValue = {};
        this.isStoreInit = false;
        this.restoreInfo();
    };
    
    addValue(key,value) {
        if (this.IsStorageInit()) {
            this.storeValue[key] = value;
            this.storeInfo();
        }
    }
    
    getValue(key) {
        if (this.IsStorageInit()) {
            this.restoreInfo();
            return this.storeValue[key];
        }
    }
    
    deleteValue(key) {
        if (this.IsStorageInit()) {
            if (key in this.storeValue) {
                delete this.storeValue[key];
                this.storeInfo();
                return true;
              }
              else {
                return false;
              }
        }
    }
    
    getKeys() {
        if (this.IsStorageInit()) {
            this.restoreInfo();
            return Object.keys(this.storeValue)
        }
        else {
            return null;
        }
    }

    insertInfo() {
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'INSERT', n : this.storeName, v : JSON.stringify(this.storeValue) },
            success : (callresult)=>this.updateReady(callresult), error : (jqXHR,statusStr,errorStr)=>this.errorHandler(jqXHR,statusStr,errorStr)
        }
        );
    }
    
    storeInfo() {
        this.updatePassword=Math.random();
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.storeName, p : this.updatePassword },
                success : (callresult)=>this.lockGetReady(callresult), error : (jqXHR,statusStr,errorStr)=>this.errorHandler(jqXHR,statusStr,errorStr)
            }
        );
    }
    
    lockGetReady(callresult) {
        if ( callresult.error!=undefined )
            alert("lockGetReady: " + callresult.error);
        else {
            this.postInfo();
        }
    }
    
    postInfo() {
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : this.storeName, v : JSON.stringify(this.storeValue), p : this.updatePassword },
                success : (callresult)=>this.updateReady(callresult), error : (jqXHR,statusStr,errorStr)=>this.errorHandler(jqXHR,statusStr,errorStr)
            }
        );
    }
    
    updateReady(callresult) {
        if ( callresult.error!=undefined )
            alert("updateReady: "+callresult.error);
    }
    
    restoreInfo() {
        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.storeName },
                success : (callresult)=>this.readReady(callresult), error : (jqXHR,statusStr,errorStr)=>this.errorHandler(jqXHR,statusStr,errorStr)
            }
        );
    }
    
    readReady(callresult) {
        this.isStoreInit = true;
        if ( callresult.error!=undefined ) {
            alert("readReady: "+callresult.error);
            this.isStoreInit = false;
        }
        else if ( callresult.result!="" ) {
            this.storeValue=JSON.parse(callresult.result);
        }
    }
    
    errorHandler(jqXHR,statusStr,errorStr) {
        alert("errorHandler: "+statusStr+' '+errorStr);
    }

    IsStorageInit() {
        if (!this.isStoreInit) {
            alert("Данные еще не загружены - попробуйте позже")
            return false;
        }
        else {
            return true;
        };
    }

}







