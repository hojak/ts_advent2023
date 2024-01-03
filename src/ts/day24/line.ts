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

        let thisFactor = this.getCrossingFactor(that)

        return new Vector ( 
            Math.round((this.startPosition.x + this._direction.x * thisFactor) * 1000) / 1000,
            Math.round((this.startPosition.y + this._direction.y * thisFactor) * 1000) / 1000,
            0
        );                
    }


    private getCrossingFactor(that: Line) :number {
        return (that.startPosition.x - this.startPosition.x) / this._direction.x
            + that._direction.x / this._direction.x
            * (this._direction.x * (that._startPosition.y - this._startPosition.y) - this._direction.y * (that.startPosition.x - this.startPosition.x))
            / (that.direction.x * this.direction.y - that.direction.y * this.direction.x);
    }

    hasCriticalCrossing(thatLine: Line, topLeft: Vector, bottomRight: Vector): boolean {
        if ( this._direction.isParallelInXY( thatLine._direction )) {
            return false;
        }

        let thisFactor = this.getCrossingFactor(thatLine);
        if ( thisFactor < 0 ) {
            return false;
        }

        let thatFactor = thatLine.getCrossingFactor(this);
        if ( thatFactor < 0 ) {
            return false;
        }
        
        let crossingPoint = new Vector ( 
            Math.round((this.startPosition.x + this._direction.x * thisFactor) * 1000) / 1000,
            Math.round((this.startPosition.y + this._direction.y * thisFactor) * 1000) / 1000,
            0
        );  

        return topLeft.x <= crossingPoint.x && topLeft.y <= crossingPoint.y 
            && bottomRight.x >= crossingPoint.x && bottomRight.y >= crossingPoint.y;
    }

}