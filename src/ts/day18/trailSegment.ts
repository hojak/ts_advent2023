import { Position } from "./position";

export class TrailSegment {
    private _start: Position;
    private _end: Position;
    private _direction: string;

    constructor ( start: Position, end: Position, directionCode: string ) {
        this._start = start;
        this._end = end;
        this._direction = directionCode;
    }

    public get start(): Position {
        return this._start;
    }
    public get end(): Position {
        return this._end;
    }
    public get direction(): string {
        return this._direction;
    }

    public get length() : number {
        if ( this._direction ==  "U" || this._direction == "D") {
            return Math.abs ( this._start.y - this._end.y) +1;
        } else {
            return Math.abs ( this._start.x - this._end.x) +1;
        }
    }


}
