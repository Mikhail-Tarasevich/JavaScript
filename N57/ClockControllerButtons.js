class ClockControllerButtons {
    thisModel = null;
    thisView = null;
    ButtonStart = null;
    ButtonStop = null;

    constructor(view, model) {
        this.thisModel = model;
        this.thisView = view;

        this.ButtonStart = this.thisView.ButtonStart;
        this.ButtonStart.onclick = this.thisModel.ClockStart;
        this.ButtonStart.thisModel = this.thisModel;
        this.ButtonStop = this.thisView.ButtonStop;
        this.ButtonStop.onclick = this.thisModel.ClockStop;
        this.ButtonStop.thisModel = this.thisModel;
    }
}