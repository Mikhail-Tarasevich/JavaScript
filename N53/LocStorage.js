class LocStorage {
    constructor(storename) {
        this.storeName = storename;
    };
  
    save(value) {
        window.localStorage.setItem(this.storeName, JSON.stringify(value));
    };
  
    load() {
      return JSON.parse(window.localStorage.getItem(this.storeName));
    };
  
    delete() {
        window.localStorage.removeItem(this.storeName);
    };
  }