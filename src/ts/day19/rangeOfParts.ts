import { Part } from "./part";

export class RangeOfParts {
    private _max: Part;
    private _min: Part;

    private static readonly standardMinValue = 0;

    private static readonly standardMaxValue = 4000;

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
    static standardRange(): RangeOfParts {
        return new RangeOfParts(
            new Part(RangeOfParts.standardMinValue,RangeOfParts.standardMinValue,RangeOfParts.standardMinValue,RangeOfParts.standardMinValue), 
            new Part(RangeOfParts.standardMaxValue,RangeOfParts.standardMaxValue,RangeOfParts.standardMaxValue,RangeOfParts.standardMaxValue));
    }

}