var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (p) {
        this.products.push(p);
    };
    Scales.prototype.getSumScale = function () {
        var sum = 0;
        this.products.forEach(function (element) {
            var e = element;
            sum = sum + e.getScale();
        });
        return sum;
    };
    Scales.prototype.getNameList = function () {
        return this.products.map(function (p) {
            return p.getName();
        });
    };
    return Scales;
}());
var Apple = /** @class */ (function () {
    function Apple(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    Apple.prototype.getName = function () {
        return this.name;
    };
    return Apple;
}());
var Tomato = /** @class */ (function () {
    function Tomato(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Tomato.prototype.getScale = function () {
        return this.scale;
    };
    Tomato.prototype.getName = function () {
        return this.name;
    };
    return Tomato;
}());
var scl = new Scales();
var apl1 = new Apple("Антоновка", 100);
var apl2 = new Apple("Антоновка белая", 120);
var apl3 = new Apple("Антоновка-каменичка", 80);
var tom1 = new Tomato("Абаканский розовый", 111);
var tom2 = new Tomato("Чио-чио-сан", 121);
var tom3 = new Tomato("Де Барао", 81);
scl.add(apl1);
scl.add(apl2);
scl.add(apl3);
scl.add(tom1);
scl.add(tom2);
scl.add(tom3);
scl.getNameList().forEach(function (e) {
    console.log(e);
});
console.log(scl.getSumScale());
//# sourceMappingURL=app.js.map