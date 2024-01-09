import { Position } from "./position";
import { getDelta } from "./groundPlan";
import { TrailSegment } from "./trailSegment";

export class DigTrail {
    private _lines: string[];
    segments: TrailSegment[] = [];
    
    public get numberOfSegments() : number {
        return this._lines.length;
    }

    constructor ( input: string ) {
        this._lines = input.split("\n").filter(line => line.trim() != "");

        let currentPosition = new Position (0,0);
        for ( let line of input.split("\n").filter(line => line.trim() != "") ) {
            let lineSplit = line.split(" ").map ( part => part.trim()).filter ( part => part.length > 0);

            let directionDelta = getDelta(lineSplit[0]);
            let numberOfSteps = Number(lineSplit[1]);

            let endPosition = currentPosition.add ( directionDelta.multiply(numberOfSteps));

            this.segments.push ( new TrailSegment(currentPosition, endPosition, lineSplit[0]));

            currentPosition = endPosition;
        }
    }

    getLength(): number {
        return this.segments
            .map ( segment => segment.length )
            .reduce((prev, curr) => prev+curr) 
        - this.segments.length;
    }


}

