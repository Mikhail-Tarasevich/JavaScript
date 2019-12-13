interface IStorageEngine {

    addItem(item:Product):void;
    getItem(index:number):Product;
    getCount():number;
}

class StorageEngine implements IStorageEngine { // способ хранения добавленных на весы элементов

    constructor() {

    }

    addItem(item:Product) {

    }

    getItem(index:number) {
        let p:Product;

        return p
    }

    getCount() {
        let count:number;

        return count
    }
}

class ScalesStorageEngineArray extends StorageEngine { // для хранения в Array<тип>

    items: Product[];

    constructor() {
        super();
        this.items=[];
    }
}

class ScalesStorageEngineLocalStorage extends StorageEngine { // для хранения в localStorage

}

class Scales {

    products:Product[];

    constructor() {
        this.products = [];
    }

    add(p:Product):void {
        this.products.push(p);
    }

    getSumScale():number {
        let sum:number = 0;
        this.products.forEach(element => {
            sum = sum + element.getScale()
        });

        return sum;
    }
    
    getNameList():string[] {
        return this.products.map(function(p) { 
            return p.getName();
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
    
    getScale():number {
        return this.scale;
    }

    getName():string {
        return this.name;
    }
}

class Apple extends Product{

    constructor(_name:string, _scale:number) {
        super(_name, _scale);
    }
}

class Tomato extends Product{

    constructor(_name:string, _scale:number) {
        super(_name, _scale);
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


