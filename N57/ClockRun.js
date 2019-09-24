var CLOCK_RADIUS = 100; // радиус часов
var CLOCK_RADIUS_DOUBLE = CLOCK_RADIUS * 2; // диаметр часов
var CLOCK_RADIUS_HALF = (CLOCK_RADIUS / 2); // полрадиуса часов
var CLOCK_COLOR = '#fcca66'; // цвет часов
var CLOCK_POINT_COUNT = 12; // 12 или 24 часа на циферблате
var CLOCK_CENTER_X = 125; // х центра часов
var CLOCK_CENTER_Y = 125; // y центра часов

var CLOCK_HOURHAND_WIDTH = 12; // толщина часовой стрелки
var CLOCK_HOURHAND_HEIGTH = 50; // длина часовой стрелки
var CLOCK_HOURHAND_HEIGTH_HALF = (CLOCK_HOURHAND_WIDTH / 2); // половина длины часовой стрелки
var CLOCK_HOURHAND_COLOR = '#000'; // цвет часовой стрелки

var CLOCK_MINUTEHAND_WIDTH = 6; // толщина минутной стрелки
var CLOCK_MINUTEHAND_HEIGTH = 75; // длина минутной стрелки
var CLOCK_MINUTEHAND_HEIGTH_HALF = (CLOCK_MINUTEHAND_WIDTH / 2); // половина длины минутной стрелки
var CLOCK_MINUTEHAND_COLOR = '#000'; // цвет минутной стрелки

var CLOCK_SECONDHAND_WIDTH = 2; // толщина секундной стрелки
var CLOCK_SECONDHAND_HEIGTH = 90; // длина секундной стрелки
var CLOCK_SECONDHAND_HEIGTH_HALF = (CLOCK_SECONDHAND_WIDTH / 2); // половина длины секундной стрелки
var CLOCK_SECONDHAND_COLOR = '#000'; // цвет секундной стрелки

var CIRCLE_HEIGTH = 80; // расстояние от центра часов до центра круга цифры
var CIRCLE_RADIUS = 13; // радиус круга под цифрой
var CIRCLE_RADIUS_DOUBLE = (CIRCLE_RADIUS * 2); // диаметр круга
var CIRCLE_COLOR = '#46b583'; //цвет круга
var CIRCLE_NUMBER_SIZE = '20'; // размер цифры
var CIRCLE_NUMBER_COLOR = '#000'; //цвет цифры
var CIRCLE_CENTER = ((CLOCK_MINUTEHAND_HEIGTH + CLOCK_SECONDHAND_HEIGTH) / 2) // расстояние от центра часов до центра маленького круга

var CLOCK_DIGITAL_NUMBER_SIZE = '11'; // размер цифр цифровых часов

var PI2 = Math.PI/2;
var PI180 = Math.PI/180;

var modelID = 0; // счетчик для ID модели

function run() {
    var view1 = null;
    var model1 = null;
    var contr1 = null;
    var block1 = null;

    var view2 = null;
    var model2 = null;
    var contr2 = null;
    var block2 = null;

    var view3 = null;
    var model3 = null;
    var contr3 = null;
    var block3 = null;

    var view4 = null;
    var model4 = null;
    var contr4 = null;
    var block4 = null;

    var view5 = null;
    var model5 = null;
    var contr5 = null;
    var block5 = null;

    var view6 = null;
    var model6 = null;
    var contr6 = null;
    var block6 = null;
    
    block1 = document.getElementById("blockclock1");
    //model1 = new Clock("Нью-Йорк", 5, true, block1, ++modelID);
    model1 = new Clock("Нью-Йорк", 0, true, block1, ++modelID);
    view1 = new ClockViewSVG(block1, model1);
    contr1 = new ClockControllerButtons(view1, model1);
    view1.update();

    block2 = document.getElementById("blockclock2");
//    model2 = new Clock("Лондон", 0, true, block2, ++modelID);
    model2 = new Clock("Лондон", 3, true, block2, ++modelID);
    view2 = new ClockViewSVG(block2, model2);
    contr2 = new ClockControllerButtons(view2, model2);
    view2.update();
    
    block3 = document.getElementById("blockclock3");
//    model3 = new Clock("Берлин ", 1, true, block3, ++modelID);
model3 = new Clock("Берлин ", 6, true, block3, ++modelID);
    view3 = new ClockViewSVG(block3, model3);
    contr3 = new ClockControllerButtons(view3, model3);
    view3.update();

    block4 = document.getElementById("blockclock4");
    //model4 = new Clock("Минск", 3, true, block4, ++modelID);
    model4 = new Clock("Минск", 9, true, block4, ++modelID);
    view4 = new ClockViewSVG(block4, model4);
    contr4 = new ClockControllerButtons(view4, model4);
    view4.update();

    block5 = document.getElementById("blockclock5");
//    model5 = new Clock("Токио", 9, true, block5, ++modelID);
model5 = new Clock("Токио", 12, true, block5, ++modelID);
    view5 = new ClockViewSVG(block5, model5);
    contr5 = new ClockControllerButtons(view5, model5);
    view5.update();

    block6 = document.getElementById("blockclock6");
    model6 = new Clock("Владивосток", 10, true, block6, ++modelID);
    view6 = new ClockViewSVG(block6, model6);
    contr6 = new ClockControllerButtons(view6, model6);
    view6.update();
}