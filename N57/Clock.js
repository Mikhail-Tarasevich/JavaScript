class Clock {
    isRun = true; // true - часы идут, false - часы стоят
    ClockTime = ""; // отображаемое на часах время
    ClockName = ""; // название часов
    ClockOffset = 0; // смещение относительно utc в часах
    ClockRealTime = null; // актуальное время
    thisView = null;

    constructor(name, gmt, run, view) {
        this.thisView = view;
        this.ClockName = name;
        this.isRun = run;
        this.ClockOffset = gmt;
        ClockStart();
        updateRealTime();
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
        if (isRun) {this.ClockTime = this.ClockRealTime.toLocaleString()};
    }

    ClockStart() {
        this.isRun = true;
    }

    ClockStop() {
        this.isRun = false;
    }
}