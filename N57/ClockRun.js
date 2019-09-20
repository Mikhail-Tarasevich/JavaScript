function run() {
    var view = null;
    var model = null;
    var controller = null;

    view = new ClockViewCanvas(view, model);
    model = new Clock("Moscow", 3, true, view);
    var divbutton = document.getElementById("buttons1");
    controller = new ClockViewCanvas(divbutton, model);
    view.update();
}