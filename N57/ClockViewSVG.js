class ClockViewSVG extends ClockView {
    hourhand = null;
    minutehand = null;
    secondhand = null;
    clockDig = null;
    modelName = ""; // для отладки, чтобы понимать, какая модель

    constructor(view, model) {
        super(view, model);
        this.modelName = model.ClockName;
    }

    update() {
        if (this.requestId!=null) {
            cancelAnimationFrame(this.requestId);
        };

        this.thisModel.updateRealTime();
        this.ButtonName.innerHTML = this.thisModel.ClockName + " (GMT" + ((this.thisModel.ClockOffset==0)?"":"+"+this.thisModel.ClockOffset) + ")";

        var strSVG = '<svg height="' + (CLOCK_RADIUS * 3) + '" width="' + (CLOCK_RADIUS * 3) + '">';
        strSVG = strSVG + '<circle id="clock" cx="' + CLOCK_CENTER_X + '" cy="' + CLOCK_CENTER_Y + '" r="' + CLOCK_RADIUS + '" fill="' + CLOCK_COLOR + '" />';

        for (var h=1; h<=CLOCK_POINT_COUNT; h++) {
            var x = CLOCK_CENTER_X + CIRCLE_CENTER * Math.cos(-30*h*(PI180) + PI2);
            var y = CLOCK_CENTER_Y - CIRCLE_CENTER * Math.sin(-30*h*(PI180) + PI2);
            strSVG = strSVG + '<circle cx="' + x + '" cy="' + y + '" r="' + CIRCLE_RADIUS + '" fill="' + CIRCLE_COLOR + '" /><text x="' + x + '" y="' + y + '" font-size="10" dominant-baseline="middle" text-anchor="middle" fill="' + CIRCLE_NUMBER_COLOR + '">' + h + '</text>';
        };

        var d = new Date(this.thisModel.ClockTime);
        strSVG = strSVG + '<text id="clockDig' + this.thisModel.modelID + '" x="' + CLOCK_CENTER_X + '" y="' + (CLOCK_CENTER_Y - (CLOCK_MINUTEHAND_HEIGTH / 2)) + '" font-size="' + CLOCK_DIGITAL_NUMBER_SIZE + '" dominant-baseline="middle" text-anchor="middle" fill="black">' + d.toLocaleTimeString() + '</text>';

        strSVG = strSVG + '<rect id="hourhand' + this.thisModel.modelID + '" x="' + (CLOCK_CENTER_X - CLOCK_HOURHAND_WIDTH_HALF) + '" y="' + CLOCK_CENTER_Y + '" rx="' + CLOCK_HOURHAND_WIDTH_HALF + '" ry="' + CLOCK_HOURHAND_WIDTH_HALF + '" width="' + CLOCK_HOURHAND_WIDTH + '" height="' + CLOCK_HOURHAND_HEIGTH + '" fill="' + CLOCK_HOURHAND_COLOR + '" fill="' + CLOCK_HOURHAND_COLOR + '" />';
        strSVG = strSVG + '<rect id="minutehand' + this.thisModel.modelID + '" x="' + (CLOCK_CENTER_X - CLOCK_MINUTEHAND_WIDTH_HALF) + '" y="' + CLOCK_CENTER_Y + '" rx="' + CLOCK_MINUTEHAND_WIDTH_HALF + '" ry="' + CLOCK_MINUTEHAND_WIDTH_HALF + '" width="' + CLOCK_MINUTEHAND_WIDTH + '" height="' + CLOCK_MINUTEHAND_HEIGTH + '" fill="' + CLOCK_MINUTEHAND_COLOR + '" fill="' + CLOCK_MINUTEHAND_COLOR + '" />';
        strSVG = strSVG + '<rect id="secondhand' + this.thisModel.modelID + '" x="' + CLOCK_CENTER_X + '" y="' + CLOCK_CENTER_Y + '" width="' + CLOCK_SECONDHAND_WIDTH + '" height="' + CLOCK_SECONDHAND_HEIGTH + '" fill="' + CLOCK_SECONDHAND_COLOR + '" />';

        this.Clock.innerHTML = strSVG + '</svg>';

        this.hourhand = document.getElementById('hourhand' + this.thisModel.modelID);
        this.minutehand = document.getElementById('minutehand' + this.thisModel.modelID);
        this.secondhand = document.getElementById('secondhand' + this.thisModel.modelID);
        this.clockDig = document.getElementById('clockDig' + this.thisModel.modelID);

        this.hourhand.style.display='none';
        this.minutehand.style.display='none';
        this.secondhand.style.display='none';
        this.setHand();
        this.hourhand.style.display='block';
        this.minutehand.style.display='block';
        this.secondhand.style.display='block';
        
        requestAnimationFrame(()=>this.update())
    }

    setHand() {
        var d = new Date(this.thisModel.ClockTime);
        this.clockDig.textContent = d.toLocaleTimeString();
        var gradHour = 180 + 30*(d.getHours() + (1/60)*d.getMinutes());  // угол для часов
        this.hourhand.setAttribute("transform","rotate(" + gradHour + "," + CLOCK_CENTER_X + "," + CLOCK_CENTER_Y + ")");
        var gradMinute = 180 + 6*(d.getMinutes() + (1/60)*d.getSeconds()); // угол для минут
        this.minutehand.setAttribute("transform","rotate(" + gradMinute + "," + CLOCK_CENTER_X + "," + CLOCK_CENTER_Y + ")");
        var gradSecond = 180 + 6*d.getSeconds();  // угол для секунд
        this.secondhand.setAttribute("transform","rotate(" + gradSecond + "," + CLOCK_CENTER_X + "," + CLOCK_CENTER_Y + ")");
    }
}