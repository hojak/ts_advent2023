import { Vector } from "./vector";

export class Line {
    private _startPosition: Vector;
    private _direction: Vector;

    public get startPosition(): Vector {
        return this._startPosition;
    }
    public get direction(): Vector {
        return this._direction;
    }

    constructor ( description: string ) {
        let split = description.split ( "@");
        this._startPosition = Vector.createFromString ( split[0].trim());
        this._direction = Vector.createFromString ( split[1].trim());
    }


    getCrossingPointXY(that: Line) {
        if ( this._direction.isParallelInXY( that._direction )) {
            return new Vector(NaN, NaN, NaN);
        }

        let thisFactor = (that.startPosition.x - this.startPosition.x) / this._direction.x
            + that._direction.x / this._direction.x 
                * (this._direction.x*(that._startPosition.y - this._startPosition.y)-this._direction.y*(that.startPosition.x - this.startPosition.x))
                / (that.direction.x*this.direction.y - that.direction.y*this.direction.x)

        return new Vector ( 
            Math.round((this.startPosition.x + this._direction.x * thisFactor) * 1000) / 1000,
            Math.round((this.startPosition.y + this._direction.y * thisFactor) * 1000) / 1000,
            0
        );                
    }

}