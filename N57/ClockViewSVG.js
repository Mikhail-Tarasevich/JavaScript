class ClockViewSVG extends ClockView {

    constructor(view, model) {
        super(view, model);
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
            strSVG = strSVG + '<circle cx="' + x + '" cy="' + y + '" r="' + CIRCLE_RADIUS + '" fill="' + CIRCLE_COLOR + '" /><text x="' + x + '" y="' + y + '" font-size="' + CIRCLE_NUMBER_SIZE + '" dominant-baseline="middle" text-anchor="middle" fill="' + CIRCLE_NUMBER_COLOR + '">' + h + '</text>';
        };

        var d = new Date(this.thisModel.ClockTime);
        strSVG = strSVG + '<text id="clockDig" x="' + CLOCK_CENTER_X + '" y="' + (CLOCK_CENTER_Y - (CLOCK_MINUTEHAND_HEIGTH / 2)) + '" font-size="' + CLOCK_DIGITAL_NUMBER_SIZE + '" dominant-baseline="middle" text-anchor="middle" fill="black">' + d.toLocaleTimeString() + '</text>';

        strSVG = strSVG + '<rect id="hourhand" x="' + CLOCK_CENTER_X + '" y="' + CLOCK_CENTER_X + '" rx="' + CLOCK_HOURHAND_HEIGTH_HALF + '" ry="' + CLOCK_HOURHAND_HEIGTH_HALF + '" width="' + CLOCK_HOURHAND_WIDTH + '" height="' + CLOCK_HOURHAND_HEIGTH + '" fill="' + CLOCK_HOURHAND_COLOR + '" fill="' + CLOCK_HOURHAND_COLOR + '" />';
        strSVG = strSVG + '<rect id="minutehand" x="' + CLOCK_CENTER_X + '" y="' + CLOCK_CENTER_X + '" rx="' + CLOCK_MINUTEHAND_HEIGTH_HALF + '" ry="' + CLOCK_MINUTEHAND_HEIGTH_HALF + '" width="' + CLOCK_MINUTEHAND_WIDTH + '" height="' + CLOCK_MINUTEHAND_HEIGTH + '" fill="' + CLOCK_MINUTEHAND_COLOR + '" fill="' + CLOCK_MINUTEHAND_COLOR + '" />';
        strSVG = strSVG + '<rect id="secondhand" x="' + CLOCK_CENTER_X + '" y="' + CLOCK_CENTER_X + '" width="' + CLOCK_SECONDHAND_WIDTH + '" height="' + CLOCK_SECONDHAND_HEIGTH + '" fill="' + CLOCK_SECONDHAND_COLOR + '" />';

        this.Clock.innerHTML = strSVG + '</svg>';

        var hourhand = document.getElementById('hourhand');
        var minutehand = document.getElementById('minutehand');
        var secondhand = document.getElementById('secondhand');
        var clockDig = document.getElementById('clockDig');

        hourhand.style.display='none';
        minutehand.style.display='none';
        secondhand.style.display='none';
        this.setHand();
        hourhand.style.display='block';
        minutehand.style.display='block';
        secondhand.style.display='block';
        
        requestAnimationFrame(()=>this.update())
    }

    setHand() {
        var d = this.thisModel.ClockRealTime;
        clockDig.textContent = d.toLocaleTimeString();
        var x = CLOCK_CENTER_X + CLOCK_HOURHAND_HEIGTH_HALF * Math.cos(-CLOCK_HOURHAND_HEIGTH_HALF);
        var y = CLOCK_CENTER_Y + CLOCK_HOURHAND_HEIGTH_HALF * Math.sin(-CLOCK_HOURHAND_HEIGTH_HALF);
        var gradHour = 180+30*(d.getHours() + (1/60)*d.getMinutes());  // угол для часов
        hourhand.setAttribute("transform","rotate(" + gradHour + "," + x + "," + y + ")");
        x = CLOCK_CENTER_X + CLOCK_MINUTEHAND_HEIGTH_HALF * Math.cos(-CLOCK_MINUTEHAND_HEIGTH_HALF);
        y = CLOCK_CENTER_Y + CLOCK_MINUTEHAND_HEIGTH_HALF * Math.sin(-CLOCK_MINUTEHAND_HEIGTH_HALF);
        var gradMinute = 180+6*(d.getMinutes() + (1/60)*d.getSeconds()); // угол для минут
        minutehand.setAttribute("transform","rotate(" + gradMinute + "," + x + "," + y + ")");
        x = CLOCK_CENTER_X + CLOCK_SECONDHAND_HEIGTH_HALF * Math.cos(-CLOCK_SECONDHAND_HEIGTH_HALF);
        y = CLOCK_CENTER_Y + CLOCK_SECONDHAND_HEIGTH_HALF * Math.sin(-CLOCK_SECONDHAND_HEIGTH_HALF);
        var gradSecond = 180+6*d.getSeconds();  // угол для секунд
        secondhand.setAttribute("transform","rotate(" + gradSecond + "," + x + "," + y + ")");
      }
}