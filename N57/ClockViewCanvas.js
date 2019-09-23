class ClockViewCanvas extends ClockView {
    /*
    thisModel = null;
    thisView = null;
    Clock = null;
    Buttons = null;
    ButtonStart = null;
    ButtonStop = null;
    ButtonName = null;
    requestId = null;
*/
    constructor(view, model) {
        super(view, model);
        /*
        this.thisModel = model;
        this.thisView = view;
        var el = view.firstElementChild
        while (el) {
            switch (el.id) {
                case "buttons":
                    this.Buttons = el;
                    break;
                case "clock":
                    this.Clock = el;
                    break;
                default:
            }
            el = (this.Buttons!=null && this.Clock!=null)?null:el.nextElementSibling;
        }

        if (this.Buttons!=null) {
            el = this.Buttons.firstElementChild
            while (el) {
                switch (el.id) {
                    case "buttonStart":
                        this.ButtonStart = el;
                        break;
                    case "buttonStop":
                        this.ButtonStop = el;
                        break;
                    case "gmt":
                        this.ButtonName = el;
                        break;
                    default:
                }
                el = (this.ButtonStart!=null && this.ButtonStop!=null && this.ButtonName!=null)?null:el.nextElementSibling;
            }
        }
        */
    }

    update() {
        if (this.requestId!=null) {
            cancelAnimationFrame(this.requestId);
        };

        this.thisModel.updateRealTime();
        this.Clock.innerHTML = this.thisModel.ClockTime;
        this.ButtonName.innerHTML = this.thisModel.ClockName + " (GMT" + ((this.thisModel.ClockOffset==0)?"":"+"+this.thisModel.ClockOffset) + ")";
        
        requestAnimationFrame(()=>this.update())
    }
}