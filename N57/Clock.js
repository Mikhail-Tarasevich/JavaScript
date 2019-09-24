class Clock {
    isRun = true; // true - часы идут, false - часы стоят
    ClockTime = ""; // отображаемое на часах время
    ClockName = ""; // название часов
    ClockOffset = 0; // смещение относительно utc в часах
    ClockRealTime = null; // актуальное время
    thisView = null;
    thisModel = this;
    modelID = 0; // ID модели

    constructor(name, gmt, run, view, id) {
        this.modelID = id + "";
        this.thisView = view;
        this.ClockName = name;
        this.thisModel.isRun = run;
        this.ClockOffset = gmt;
        this.ClockStart();
        this.updateRealTime();
    }

    // обновляет текущее время с учетем указанного часового пояса
    updateRealTime() {
        var d = new Date();
        var localTime = d.getTime();
        var localOffset = d.getTimezoneOffset() * 60000;
        // вычисляем время UTC в милисекундах
        var utc = localTime + localOffset;
        // создаем новую дата-время с учетом смещения в часах
        this.ClockRealTime = new Date(utc + (3600000*this.ClockOffset));
        if (this.isRun) {this.ClockTime = this.ClockRealTime.getTime()}; // {this.ClockTime = this.ClockRealTime.toLocaleString()};
    }

    ClockStart() {
        this.thisModel.isRun = true;
    }

    ClockStop() {
        this.thisModel.isRun = false;
    }
}