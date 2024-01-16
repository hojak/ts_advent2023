import { Position } from "./position";

export class TrailSegment {
    private _start: Position;
    private _end: Position;
    private _direction: string;

    constructor ( start: Position, end: Position, directionCode: string ) {
        if ( start.y > end.y || start.y == end.y && start.x > end.x) {
            [start, end] = [end, start];
        } 

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

    static compare(segment1: TrailSegment, segment2: TrailSegment) {
        if ( segment1.start.y < segment2.start.y) {
            return -10;
        } else if ( segment1.start.y > segment2.start.y) {
            return 10;
        } else if ( segment1.start.x < segment2.start.x) {
            return -5;
        } else if ( segment1.start.x > segment2.start.x) {
            return 5;
        } else {
            return 0;
        }
    }

    hasPosition(pos: Position) : boolean {
        if ( this._direction == "U" || this._direction == "D") {
            return pos.x == this.start.x && this.start.y <= pos.y && pos.y <= this.end.y;
        } else {
            return pos.y == this.start.y && this.start.x <= pos.x && pos.x <= this.end.x;
        }
    }

    isMidPosition(y: number) {
        return this._start.y < y && this._end.y > y;
    }


}
