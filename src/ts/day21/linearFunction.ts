export class LinearFunction {
    private _a: number;
    private _b: number;


    constructor( a: number, b: number) {
        this._a = a;
        this._b = b;
    }

    toString () {
        return "f(x) = " + this._a + " + " + this._b + "*x";
    }

    public get a(): number {
        return this._a;
    }

    public get b(): number {
        return this._b;
    }

    getValue(x: number) {
        return this._a + this._b * x;
    }


    static createFromPoints(p1: Point, p2: Point): LinearFunction {
        let b = (p2.y-p1.y)/(p2.x-p1.x);
        let a = p1.y-b*p1.x;

        return new LinearFunction(a,b);
    }

}

export interface Point {
    x: number,
    y: number
}

