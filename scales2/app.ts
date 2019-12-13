interface IScalable {

    getScale():number;
    getName():string;

}

class Scales {

    Products:Product[];
    pIndex:number;

    constructor() {
        this.Products = [];
        this.pIndex = 0;
    }

    add(p:Product):void {
        this.Products[this.pIndex] = p;
        this.pIndex++;
    }

    getSumScale():number {
        let sum = 0;
        this.Products.forEach(element => {
            sum = sum + element.getScale()
        });

        return sum;
    }
    
    getNameList():any {
        return this.Products.map(function(p) { 
            var ret:any = <any>p.getName();
            return ret;
        })
    }
}

class Product{

    name:string;
    scale:number;

    constructor(_name:string, _scale:number) {
        this.name = _name;
        this.scale = _scale;
    }

}

class Apple extends Product implements IScalable{

    constructor(_name:string, _scale:number) {
        super(_name, _scale);
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }

}

class Tomato extends Product implements IScalable{

    constructor(_name:string, _scale:number) {
        super(_name, _scale);
    }

    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

let scl:Scales=new Scales();

let apl1:Apple=new Apple("Антоновка", 100);
let apl2:Apple=new Apple("Антоновка белая", 120);
let apl3:Apple=new Apple("Антоновка-каменичка", 80);

let tom1:Tomato=new Tomato("Абаканский розовый", 111);
let tom2:Tomato=new Tomato("Чио-чио-сан", 121);
let tom3:Tomato=new Tomato("Де Барао", 81);

scl.add(apl1);
scl.add(apl2);
scl.add(apl3);
scl.add(tom1);
scl.add(tom2);
scl.add(tom3);

scl.getNameList().forEach(e => {
    console.log(<string>e)
});

console.log(scl.getSumScale());


