import { Part } from "./part";

export class RangeOfParts {
    private _max: Part;
    private _min: Part;

    constructor ( min: Part, max: Part) {
        this._min = min;
        this._max = max;
    }

    get size() : number{
        return (this._max.x - this._min.x +1) 
             * (this._max.m - this._min.m +1) 
             * (this._max.a - this._min.a +1) 
             * (this._max.s - this._min.s +1);
    }

}