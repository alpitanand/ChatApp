class Alpit{
    constructor(){
        this.alpit = [1,2,3,4];
         this.sum =1;
         this.min =2;
         this.sub =5;
    }
    calc(){
        var t = this.sum+this.min;
        console.log(t);
    }
}

var al = new Alpit();
al.calc();
console.log(al.sub);
