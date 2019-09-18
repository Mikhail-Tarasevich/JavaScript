var drinkStorage;
var drinkLocalStorage;
var dishStorage;
var dishLocalStorage;

function run() {
  drinkLocalStorage = new LocStorage("drink");
  drinkStorage = new HashStorage("", "");
  var loadstorage = drinkLocalStorage.load();
  if (loadstorage!=null) {drinkStorage.storage = loadstorage}

  dishLocalStorage = new LocStorage("dish");
  dishStorage = new HashStorage("", "");
  var loadstorage = dishLocalStorage.load();
  if (loadstorage!=null) {dishStorage.storage = loadstorage}
}

function newDrink() {
  var drinkname = prompt("Укажите название напитка:");
  var drink = {};
  drinkStorage.addValue(drinkname, drink);
  drinkStorage.getValue(drinkname)["IsAlcohol"] = confirm("он алкогольный?");
  drinkStorage.getValue(drinkname)["Recept"] = prompt("Укажите рецепт его приготовления");
  saveLocalStorage(drinkLocalStorage, drinkStorage);
}

function saveLocalStorage(thisLocalStorage, thisStorage) {
  thisLocalStorage.save(thisStorage.storage);  
}

function getDrinkInfo() {
  var drinkname = prompt("Укажите название напитка:");
  if (drinkStorage.getValue(drinkname)==undefined) {
    alert("В списке нет напитка " + drinkname)
  }
  else {
    var msg = "Напиток " + drinkname + "\n";
    msg = msg + "алкогольный: " + ((drinkStorage.getValue(drinkname)["IsAlcohol"])?"да":"нет") + "\n";
    msg = msg + "рецепт приготовления:\n" + drinkStorage.getValue(drinkname)["Recept"]
    alert(msg)
  }
}

function deleteDrink() {
  var drinkname = prompt("Укажите название напитка:");
  if (drinkStorage.getValue(drinkname)==undefined) {
    alert("В списке нет напитка " + drinkname)
  }
  else {
    drinkStorage.deleteValue(drinkname);
    saveLocalStorage(drinkLocalStorage, drinkStorage);
    alert("напиток " + drinkname + " удален")
  }
}

function getDrinkList() {
  var keys = drinkStorage.getKeys();
  alert(keys.join("\n"))
}

function newdish() {
  var dishname = prompt("Укажите название блюда:");
  var dish = {};
  dishStorage.addValue(dishname, dish);
  dishStorage.getValue(dishname)["IsAlcohol"] = confirm("оно сладкое?");
  dishStorage.getValue(dishname)["Recept"] = prompt("Укажите рецепт его приготовления");
  savedishs();
}

function getdishInfo() {
  var dishname = prompt("Укажите название блюда:");
  if (dishStorage.getValue(dishname)==undefined) {
    alert("В списке нет блюда " + dishname)
  }
  else {
    var msg = "Блюдо " + dishname + "\n";
    msg = msg + "сладкое: " + ((dishStorage.getValue(dishname)["IsAlcohol"])?"да":"нет") + "\n";
    msg = msg + "рецепт приготовления:\n" + dishStorage.getValue(dishname)["Recept"]
    alert(msg)
  }
}

function deletedish() {
  var dishname = prompt("Укажите название блюда:");
  if (dishStorage.getValue(dishname)==undefined) {
    alert("В списке нет блюда " + dishname)
  }
  else {
    dishStorage.deleteValue(dishname);
    saveLocalStorage(dishLocalStorage, dishStorage);
    alert("блюдо " + dishname + " удалено")
  }
}

function getdishList() {
  var keys = dishStorage.getKeys();
  alert(keys.join("\n"))
}
