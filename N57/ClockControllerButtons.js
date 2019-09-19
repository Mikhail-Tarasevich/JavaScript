class ClockControllerButtons {
    var thisModel = null;
    var thisView = null;
    var buttonStart = null;
    var buttonStop = null;

    constructor(view, model) {
        thisModel = model;
        thisView = view;

        buttonStart = thisView.getElementById('buttonStart');
        buttonStart.onclick = thisModel.ClockStart;
        buttonStop = thisView.getElementById('buttonStop');
        buttonStop.onclick = thisModel.ClockStart;
    }
}