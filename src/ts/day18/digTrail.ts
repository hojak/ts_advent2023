import { Position } from "./position";
import { getDelta } from "./groundPlan";
import { TrailSegment } from "./trailSegment";
import { EndOfLineState, ModuleResolutionKind } from "typescript";

export class DigTrail {
    private _lines: string[];
    _horizontalSegments: TrailSegment[] = [];
    _verticalSegments: TrailSegment[] = [];
    
    public get numberOfSegments() : number {
        return this._lines.length;
    }

    constructor ( input: string ) {
        this._lines = input.split("\n").filter(line => line.trim() != "");

        let currentPosition = new Position (0,0);
        for ( let line of this._lines ) {
            let [direction, numberString] = line.split(" ").map ( part => part.trim()).filter ( part => part.length > 0);

            let directionDelta = getDelta(direction);
            let numberOfSteps = Number(numberString);

            let endPosition = currentPosition.add ( directionDelta.multiply(numberOfSteps));

            const newSgement = new TrailSegment(currentPosition, endPosition, direction);
            if ( direction == "U" || direction == "D") {
                this._verticalSegments.push(newSgement);
            } else {
                this._horizontalSegments.push(newSgement);
            }

            currentPosition = endPosition;
        }

        this._horizontalSegments.sort ( TrailSegment.compare );
        this._verticalSegments.sort ( TrailSegment.compare );

    }

    getLength(): number {
        return this._horizontalSegments.concat(this._verticalSegments)
            .map ( segment => segment.length )
            .reduce((prev, curr) => prev+curr) 
        - this._horizontalSegments.length - this._verticalSegments.length;
    }

    getSizeOfHole(): number {
        let result = 0;

        let topLeft = this.getTopLeft();
        let bottomRight = this.getBottomRight();

        let currentVerticals : TrailSegment[] = [];

        let verticalIndex = 0;
        let horizontalIndex = 0;

        let currentPosition = new Position(0,0);
        for ( currentPosition.y = topLeft.y; currentPosition.y <= bottomRight.y; currentPosition.y++ ) {
            currentVerticals = currentVerticals.filter ( vertical => vertical.end.y >= currentPosition.y);

            while (verticalIndex < this._verticalSegments.length && this._verticalSegments[verticalIndex].start.y == currentPosition.y) {
                currentVerticals.push ( this._verticalSegments[verticalIndex] );
                verticalIndex++;
            }
            currentVerticals.sort ( (seg1, seg2) => seg1.start.x-seg2.start.x );

            let open = false;
            let lastX = topLeft.x;

            let currentVerticalIndex = 0;
            while ( currentVerticalIndex < currentVerticals.length ) {
                let vertical = currentVerticals[currentVerticalIndex];

                if ( currentVerticals[currentVerticalIndex].isMidPosition(currentPosition.y)) {
                    if ( open ) {
                        result += vertical.start.x - lastX +1;
                    } else {
                        result ++;
                    }
                    currentVerticalIndex++;    
                    open = ! open;
                    lastX = vertical.start.x +1;
                } else {
                    let currentHorizontal = this._horizontalSegments[horizontalIndex];
                    result += currentHorizontal.length;

                    if ( open ) {
                        result += vertical.start.x - lastX;
                    }

                    if ( currentVerticals[currentVerticalIndex].start.equals (currentHorizontal.start)
                        && currentVerticals[currentVerticalIndex+1].end.equals(currentHorizontal.end)
                        || currentVerticals[currentVerticalIndex].end.equals (currentHorizontal.start)
                        && currentVerticals[currentVerticalIndex+1].start.equals(currentHorizontal.end)
                        ) {
                            open = ! open;
                        }

                    horizontalIndex++;
                    currentVerticalIndex+=2;
                    lastX = currentHorizontal.end.x +1;
                }
            }
        }

        return result;
    }

    getTopLeft() {
        let result = new Position(0,0);
        result.y = this._verticalSegments[0].start.y;
        result.x = this._verticalSegments.map ( segment => segment.start.x ).reduce ( (prev, curr) => Math.min ( prev, curr));
        return result;
    }

    getBottomRight() {
        let result = new Position(0,0);
        result.y = this._verticalSegments[this._verticalSegments.length-1].end.y;
        result.x = this._verticalSegments.map ( segment => segment.end.x ).reduce ( (prev, curr) => Math.max ( prev, curr));
        return result;
    }

}

