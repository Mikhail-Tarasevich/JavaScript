var drinkLocalStorage;
var dishLocalStorage;

function run() {
  drinkLocalStorage = new LocStorage("drink");
  dishLocalStorage = new LocStorage("dish");
}

function newDrink() {
  var drinkname = prompt("Укажите название напитка:");
  var drink = {};
  drink.IsAlcohol = confirm("он алкогольный?");
  drink.Recept = prompt("Укажите рецепт его приготовления");
  drinkLocalStorage.addValue(drinkname, drink);
}

function newdish() {
  var dishname = prompt("Укажите название блюда:");
  var dish = {};
  dish.IsAlcohol = confirm("оно сладкое?");
  dish.Recept = prompt("Укажите рецепт его приготовления");
  dishLocalStorage.addValue(dishname, dish);
}

function getDrinkInfo() {
  var drinkname = prompt("Укажите название напитка:");
  var drink = drinkLocalStorage.getValue(drinkname);
  if (drink==undefined) {
    alert("В списке нет напитка " + drinkname)
  }
  else {
    var msg = "Напиток " + drinkname + "\n";
    msg = msg + "алкогольный: " + ((drink["IsAlcohol"])?"да":"нет") + "\n";
    msg = msg + "рецепт приготовления:\n" + drink["Recept"]
    alert(msg)
  }
}

function getdishInfo() {
  var dishname = prompt("Укажите название блюда:");
  var dish = dishLocalStorage.getValue(dishname);
  if (dish==undefined) {
    alert("В списке нет блюда " + dishname)
  }
  else {
    var msg = "Блюдо " + dishname + "\n";
    msg = msg + "сладкое: " + ((dish["IsAlcohol"])?"да":"нет") + "\n";
    msg = msg + "рецепт приготовления:\n" + dish["Recept"]
    alert(msg)
  }
}

function deleteDrink() {
  var drinkname = prompt("Укажите название напитка:");
  if (drinkLocalStorage.deleteValue(drinkname)) {
    alert("напиток " + drinkname + " удален")
  }
  else {
    alert("В списке нет напитка " + drinkname)
  }
}

function deletedish() {
  var dishname = prompt("Укажите название блюда:");
  if (dishLocalStorage.deleteValue(dishname)) {
    alert("блюдо " + dishname + " удалено")
  }
  else {
    alert("В списке нет блюда " + dishname)
  }
}

function getDrinkList() {
  var keys = drinkLocalStorage.getKeys();
  if (keys==null) {
    alert("Перечень пуст!!!");
  }
  else {
    alert(keys.join("\n"))
  }
  
}

function getdishList() {
  var keys = dishLocalStorage.getKeys();
  if (keys==null) {
    alert("Перечень пуст!!!");
  }
  else {
    alert(keys.join("\n"))
  }
  
}
