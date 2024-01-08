
export class QuadraticFunction {
    private _a: number;
    private _b: number;
    private _c: number;
    
    constructor ( a: number, b: number, c: number ) {
        this._a = a;
        this._b = b;
        this._c = c;
    }

    getValue(x: number): number {
        return this._a + x*this._b + x*x*this._c;
    }

    toString () {
        return "f(x) = " + this._a + " + " + this._b + "*x + " + this._c + "*x²";
    }


    static createFromPoints(p1: Point, p2: Point, p3: Point): QuadraticFunction {
        let c = (p3.y-p1.y) / ((p3.x-p1.x)*(p3.x-p2.x)) - (p2.y-p1.y)/((p2.x-p1.x)*(p3.x-p2.x));
        let b = (p2.y-p1.y)/(p2.x-p1.x) - (p2.x+p1.x)*c;
        let a = p1.y - p1.x*p1.x * c - p1.x*b;

        return new QuadraticFunction(a,b,c);
    }

}


export interface Point {
    x: number,
    y: number
}

