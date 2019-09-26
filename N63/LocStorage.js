class LocStorage {
    constructor(storename) {
        this.storeName = storename;
      };
    
      addValue(key,value) {
        var storeValue = JSON.parse(window.localStorage.getItem(this.storeName));
        if (storeValue==null) {storeValue={};};
        storeValue[key] = value;
        window.localStorage.setItem(this.storeName, JSON.stringify(storeValue));
      }
    
      getValue(key) {
        var storeValue = JSON.parse(window.localStorage.getItem(this.storeName));
        return (storeValue==null)?null:storeValue[key];
      }
    
      deleteValue(key) {
        var storeValue = JSON.parse(window.localStorage.getItem(this.storeName));
        if (storeValue==null) {return false};
        if (key in storeValue) {
          delete storeValue[key];
          window.localStorage.setItem(this.storeName, JSON.stringify(storeValue));
          return true;
        }
        else {
          return false;
        }
      }
    
      getKeys() {
        var storeValue = JSON.parse(window.localStorage.getItem(this.storeName));
        return (storeValue==null)?null:Object.keys(storeValue)
      }
  }