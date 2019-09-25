class ClockViewCanvas extends ClockView {
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

        var canvas = document.getElementById('clock'+this.thisModel.modelID);
        if (!canvas.getContext){ return; };

        var ctx = canvas.getContext('2d');
        // циферблат
        ctx.beginPath();
        ctx.arc(CLOCK_CENTER_X, CLOCK_CENTER_X, CLOCK_RADIUS, 0, DoublePI, true);
        ctx.fillStyle = CLOCK_COLOR;
        ctx.fill();
        // круги и цифры часов
        for (var h=1; h<=CLOCK_POINT_COUNT; h++) {
        var x = CLOCK_CENTER_X + CIRCLE_CENTER * Math.cos(-30*h*(PI180) + PI2);
        var y = CLOCK_CENTER_Y - CIRCLE_CENTER * Math.sin(-30*h*(PI180) + PI2);
        ctx.beginPath();
        ctx.arc(x, y, CIRCLE_RADIUS, 0, DoublePI, true);
        ctx.fillStyle = CIRCLE_COLOR;
        ctx.fill();

        ctx.font = CIRCLE_NUMBER_SIZE;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = CIRCLE_NUMBER_COLOR;
        ctx.fillText(h, x, y);
        };
        // цифровые часы
        var d = new Date(this.thisModel.ClockTime);
        ctx.beginPath();
        ctx.font = CLOCK_DIGITAL_NUMBER_SIZE;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = CIRCLE_NUMBER_COLOR;
        ctx.fillText(d.toLocaleTimeString(), CLOCK_CENTER_X, (CLOCK_CENTER_Y - (CLOCK_MINUTEHAND_HEIGTH / 2)));
        ctx.stroke();
        // секундная стрелка
        var grad = PI2 - ((6*d.getSeconds())*PI180);
        var x1 = CLOCK_CENTER_X + CLOCK_SECONDHAND_WIDTH_HALF * Math.cos(grad);
        var y1 = CLOCK_CENTER_Y - CLOCK_SECONDHAND_WIDTH_HALF * Math.sin(grad);
        var x2 = CLOCK_CENTER_X + (CLOCK_SECONDHAND_HEIGTH - CLOCK_SECONDHAND_WIDTH_HALF) * Math.cos(grad);
        var y2 = CLOCK_CENTER_Y - (CLOCK_SECONDHAND_HEIGTH - CLOCK_SECONDHAND_WIDTH_HALF) * Math.sin(grad);
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = CLOCK_SECONDHAND_WIDTH;
        ctx.fillStyle = CLOCK_SECONDHAND_COLOR;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.arc(x1, y1, CLOCK_SECONDHAND_WIDTH_HALF-1, 0, DoublePI, true);
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(x2,y2);
        ctx.arc(x2, y2, CLOCK_SECONDHAND_WIDTH_HALF-1, 0, DoublePI, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        // минутная стрелка
        grad = PI2 - ((6*(d.getMinutes() + (1/60)*d.getSeconds()))*PI180);
        x1 = CLOCK_CENTER_X + CLOCK_MINUTEHAND_WIDTH_HALF * Math.cos(grad);
        y1 = CLOCK_CENTER_Y - CLOCK_MINUTEHAND_WIDTH_HALF * Math.sin(grad);
        x2 = CLOCK_CENTER_X + (CLOCK_MINUTEHAND_HEIGTH - CLOCK_MINUTEHAND_WIDTH_HALF) * Math.cos(grad);
        y2 = CLOCK_CENTER_Y - (CLOCK_MINUTEHAND_HEIGTH - CLOCK_MINUTEHAND_WIDTH_HALF) * Math.sin(grad);
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = CLOCK_MINUTEHAND_WIDTH;
        ctx.fillStyle = CLOCK_MINUTEHAND_COLOR;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.arc(x1, y1, CLOCK_MINUTEHAND_WIDTH_HALF-1, 0, DoublePI, true);
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(x2,y2);
        ctx.arc(x2, y2, CLOCK_MINUTEHAND_WIDTH_HALF-1, 0, DoublePI, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        // часовая стрелка
        grad = PI2 - (30*(d.getHours() + (1/60)*d.getMinutes())*PI180);
        x1 = CLOCK_CENTER_X + CLOCK_HOURHAND_WIDTH_HALF * Math.cos(grad);
        y1 = CLOCK_CENTER_Y - CLOCK_HOURHAND_WIDTH_HALF * Math.sin(grad);
        x2 = CLOCK_CENTER_X + (CLOCK_HOURHAND_HEIGTH - CLOCK_HOURHAND_WIDTH_HALF) * Math.cos(grad);
        y2 = CLOCK_CENTER_Y - (CLOCK_HOURHAND_HEIGTH - CLOCK_HOURHAND_WIDTH_HALF) * Math.sin(grad);
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth = CLOCK_HOURHAND_WIDTH;
        ctx.fillStyle = CLOCK_HOURHAND_COLOR;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.arc(x1, y1, CLOCK_HOURHAND_WIDTH_HALF-1, 0, DoublePI, true);
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.moveTo(x2,y2);
        ctx.arc(x2, y2, CLOCK_HOURHAND_WIDTH_HALF-1, 0, DoublePI, true);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
        requestAnimationFrame(()=>this.update())
    }
}