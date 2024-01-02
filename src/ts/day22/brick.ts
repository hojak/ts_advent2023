import { Coordinates } from "./coordinates";

export class Brick {
    private _start: Coordinates;
    private _end: Coordinates;

    constructor ( definition: string ) {
        let startAndEnd = definition.split("~");
        this._start = Coordinates.createFromString(startAndEnd[0]);
        this._end = Coordinates.createFromString(startAndEnd[1]);
    }

    public get start(): Coordinates {
        return this._start;
    }

    public get end(): Coordinates {
        return this._end;
    }

    getBlocks(): Coordinates[] {
        let directionStep = this._start.getDirectionTo(this._end);

        let result : Coordinates[] = [];
        let currentCoordinate = this._start;

        while (! currentCoordinate.equals ( this._end )) {
            result.push ( currentCoordinate );
            currentCoordinate = currentCoordinate.plus ( directionStep );
        }

        result.push ( currentCoordinate );

        return result;
    }
}
