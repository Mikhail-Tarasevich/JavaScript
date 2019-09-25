class ClockViewDOM extends ClockView {
    hourhand = null;
    minutehand = null;
    secondhand = null;
    clockDig = null;
    clockDigNum = null;
    modelName = ""; // для отладки, чтобы понимать, какая модель

    constructor(view, model) {
        super(view, model);
        this.modelName = model.ClockName;

        var elem = document.getElementById('clock'+this.thisModel.modelID);
        for (var h=1; h<=CLOCK_POINT_COUNT; h++) {
            var grad = -(90 + (30 * h));
            var circle = document.createElement('DIV');
            circle.style.position = 'absolute';
            circle.style.height = CIRCLE_RADIUS_DOUBLE + 'px';
            circle.style.width = CIRCLE_RADIUS_DOUBLE + 'px';
            circle.style.backgroundColor = CIRCLE_COLOR;
            circle.style.borderRadius = CIRCLE_RADIUS_DOUBLE + 'px';
            circle.style.top = ((elem.offsetHeight / 2) - CIRCLE_RADIUS + CIRCLE_HEIGTH*Math.cos(PI2 - grad*(PI180))) + 'px'; 
            circle.style.left = (((elem.offsetWidth / 2) - CIRCLE_RADIUS - CIRCLE_HEIGTH*Math.sin(PI2 - grad*(PI180)))) + 'px';
            circle.style.textAlign = "center";
            circle.style.lineHeight = CIRCLE_RADIUS_DOUBLE + 'px';
            circle.style.zIndex="1"
            elem.appendChild(circle);

            var circle2 = document.createElement('DIV');
            circle2.innerHTML = h;
            circle2.style.fontSize = '65%';
            circle.appendChild(circle2);

        }

        this.clockDig = document.createElement('DIV');
        this.clockDig.style.position = 'absolute';
        this.clockDig.style.height = CLOCK_RADIUS_HALF + 'px';
        this.clockDig.style.width = CLOCK_RADIUS_DOUBLE + 'px';
        this.clockDig.style.top = (elem.offsetHeight / 4) + 'px';
        this.clockDig.style.textAlign = "center";
        this.clockDig.style.lineHeight = CIRCLE_RADIUS_DOUBLE + 'px';
        this.clockDig.style.zIndex="1";
        elem.appendChild(this.clockDig);

        var d = new Date(this.thisModel.ClockTime);
        this.clockDigNum = document.createElement('DIV');
        this.clockDigNum.style.fontSize = '65%';
        this.clockDigNum.innerHTML = d.toLocaleTimeString();
        this.clockDig.appendChild(this.clockDigNum);

        this.handHour = document.getElementById('hourhand'+this.thisModel.modelID);
        this.handHour.style.borderRadius = CLOCK_HOURHAND_HEIGTH_HALF + 'px';
        this.handHour.style.height = CLOCK_HOURHAND_HEIGTH + 'px';
        this.handHour.style.width = CLOCK_HOURHAND_WIDTH + 'px';
        this.handHour.style.top = (CLOCK_CENTER_X - 25) + 'px'; // (elem.offsetHeight / 2) + 'px';// центр часов
        this.handHour.style.left = (CLOCK_CENTER_Y - 25) + 'px'; // ((elem.offsetWidth / 2) - CLOCK_HOURHAND_HEIGTH_HALF) + 'px';// центр часов
        this.handHour.style.display='none';
        this.handHour.style.zIndex="2"
        
        this.handMinute = document.getElementById('minutehand'+this.thisModel.modelID);
        this.handMinute.style.borderRadius = CLOCK_MINUTEHAND_HEIGTH_HALF + 'px';
        this.handMinute.style.height = CLOCK_MINUTEHAND_HEIGTH + 'px';
        this.handMinute.style.width = CLOCK_MINUTEHAND_WIDTH + 'px';
        this.handMinute.style.top = (CLOCK_CENTER_X - 25) + 'px'; // (elem.offsetHeight / 2) + 'px';// центр часов
        this.handMinute.style.left = (CLOCK_CENTER_Y - 25) + 'px'; // ((elem.offsetWidth / 2) - CLOCK_MINUTEHAND_HEIGTH_HALF) + 'px';// центр часов
        this.handMinute.style.display='none';
        this.handMinute.style.zIndex="2"

        this.handSecond = document.getElementById('secondhand'+this.thisModel.modelID);
        this.handSecond.style.borderRadius = CLOCK_SECONDHAND_HEIGTH_HALF + 'px';
        this.handSecond.style.height = CLOCK_SECONDHAND_HEIGTH + 'px';
        this.handSecond.style.width = CLOCK_SECONDHAND_WIDTH + 'px';
        this.handSecond.style.top = (CLOCK_CENTER_X - 25) + 'px'; // (elem.offsetHeight / 2) + 'px';// центр часов
        this.handSecond.style.left = (CLOCK_CENTER_Y - 25) + 'px'; // ((elem.offsetWidth / 2) - CLOCK_SECONDHAND_HEIGTH_HALF) + 'px';// центр часов
        this.handSecond.style.display='none';
        this.handSecond.style.zIndex="2"
    }

    update() {
        if (this.requestId!=null) {
            cancelAnimationFrame(this.requestId);
        };

        this.thisModel.updateRealTime();
        this.ButtonName.innerHTML = this.thisModel.ClockName + " (GMT" + ((this.thisModel.ClockOffset==0)?"":"+"+this.thisModel.ClockOffset) + ")";

        this.setHand();
        this.handHour.style.display='block';
        this.handMinute.style.display='block';
        this.handSecond.style.display='block';
  
        requestAnimationFrame(()=>this.update())
    }

    setHand() {
        var d = new Date(this.thisModel.ClockTime);
        var gradHour = 30*(d.getHours() + (1/60)*d.getMinutes());  // угол для часов
        this.handHour.style.transform = 'rotate(' + (gradHour-180) + 'deg)';
        var gradMinute = 6*(d.getMinutes() + (1/60)*d.getSeconds()); // угол для минут
        this.handMinute.style.transform = 'rotate(' + (gradMinute-180) + 'deg)';
        var gradSecond = 6*d.getSeconds();  // угол для секунд
        this.handSecond.style.transform = 'rotate(' + (gradSecond-180) + 'deg)';
        this.clockDigNum.innerHTML = d.toLocaleTimeString();
    }
}