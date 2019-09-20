class ClockViewCanvas {
    thisModel = null;
    thisView = null;
    Clock = null;
    requestId = null;

    constructor(view, model) {
        this.thisModel = model;
        this.thisView = view;
        this.Clock = thisView.getElementById('clock');
    }

    update() {
        Clock.innerHTML = thisModel.ClockTime;

        if (this.requestId!=null) {
            cancelAnimationFrame(this.requestId);
        };
        this.requestId = requestAnimationFrame(function measure() {
            thisModel.update();
            update();
            requestId = requestAnimationFrame(measure);
        });
    }
}