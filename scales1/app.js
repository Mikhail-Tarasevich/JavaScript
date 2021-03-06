var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
            sum = sum + element.getScale();
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
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Product.prototype.getScale = function () {
        return this.scale;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(_name, _scale) {
        return _super.call(this, _name, _scale) || this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(_name, _scale) {
        return _super.call(this, _name, _scale) || this;
    }
    return Tomato;
}(Product));
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