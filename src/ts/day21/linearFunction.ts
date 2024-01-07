import { Point, QuadraticFunction } from "./quadraticFunction";

export class LinearFunction {
    private _b: number;
    private _a: number;

    constructor( a: number, b: number) {
        this._a = a;
        this._b = b;
    }

    toString () {
        return "f(x) = " + this._a + " + " + this._b + "*x";
    }

    getIntegral(): any {
        return new QuadraticFunction(0, this._a, this._b/2);
    }

    static createFromPoints(p1: Point, p2: Point): LinearFunction {
        let b = (p2.x-p1.x)/(p2.y-p1.y);
        let a = p1.y-b*p1.x;

        return new LinearFunction(a,b);
    }


}