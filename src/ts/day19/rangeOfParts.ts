import { Part } from "./part";
import { Step } from "./workflow";

export class RangeOfParts {
    private _max: Part;
    private _min: Part;

    private static readonly standardMinValue = 1;

    private static readonly standardMaxValue = 4000;

    constructor ( min: Part, max: Part) {
        this._min = min;
        this._max = max;
    }

    get size() : number{
        if ( isNaN (this._min.x) ||isNaN ( this._min.m) || isNaN ( this._min.a) || isNaN ( this._min.s) ) {
            return 0;
        }
        return (this._max.x - this._min.x +1) 
             * (this._max.m - this._min.m +1) 
             * (this._max.a - this._min.a +1) 
             * (this._max.s - this._min.s +1);
    }

    withStepMatching(step: Step) : RangeOfParts {
        let result = new RangeOfParts (
            this._min.copy(),
            this._max.copy()
        )

        if ( step.condition != null ) {
            switch(step.condition.attribute) {
                case "x":
                    [result._min.x, result._max.x] = getMinMax ( result._min.x, result._max.x, step.condition.larger, step.condition.value);
                    break;
                case "m":
                    [result._min.m, result._max.m] = getMinMax ( result._min.m, result._max.m, step.condition.larger, step.condition.value);
                    break;
                case "a":
                    [result._min.a, result._max.a] = getMinMax ( result._min.a, result._max.a, step.condition.larger, step.condition.value);
                    break;
                case "s":
                    [result._min.s, result._max.s] = getMinMax ( result._min.s, result._max.s, step.condition.larger, step.condition.value);
                    break;
            }            
        } 

        return result;
    }

    withStepNotMatching(step: Step): RangeOfParts {
        if ( step.condition == null ) {
            return new RangeOfParts( new Part(NaN, NaN, NaN, NaN), new Part(NaN, NaN, NaN, NaN) );
        }

        step.condition.larger = !step.condition.larger;
        step.condition.value += (step.condition.larger) ? -1 : 1;
        return this.withStepMatching( step );
    }



    static standardRange(): RangeOfParts {
        return new RangeOfParts(
            new Part(RangeOfParts.standardMinValue,RangeOfParts.standardMinValue,RangeOfParts.standardMinValue,RangeOfParts.standardMinValue), 
            new Part(RangeOfParts.standardMaxValue,RangeOfParts.standardMaxValue,RangeOfParts.standardMaxValue,RangeOfParts.standardMaxValue));
    }

}

function getMinMax(min: number, max: number, larger: boolean, value: number): [number, number] {
    if ( larger ) {
        if ( max <= value) {
            return [NaN, NaN];
        } else {
            return [Math.max ( min, value+1), max];
        }
    } else {
        if ( min >= value ) {
            return [NaN, NaN];
        } else {
            return [min, Math.min ( max, value -1)];
        }
    }
}
