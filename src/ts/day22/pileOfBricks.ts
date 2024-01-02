import { Brick } from "./brick";
import { Coordinates } from "./coordinates";

export class PileOfBricks {
    private _occupied : Brick[][][] = [];
    private _bricks: Brick[] = [];

    public get bricks(): Brick[] {
        return this._bricks;
    }

    numberOfOccupiedSpaces(): number {
        return this._occupied.flat().flat().filter ( occ => occ ).length;
    }

    isOccupied(coordinates: Coordinates): boolean {
        return this.getBrickAt(coordinates) != undefined;
    }

    add(brick: Brick) : this {
        let toCheck = brick.getBlocks();
        if ( brick.isZDirection ()) {
           toCheck = [brick.start];
        }

        let moveDown = new Coordinates(0,0,-brick.start.z);
        for ( let block of toCheck ) {
            let mayMoveDown = this.emptySpaceBelow ( block );
            if ( mayMoveDown.z > moveDown.z ) {
                moveDown = mayMoveDown;
            }
        }
        this.placeBrickAt (brick, brick.start.plus ( moveDown));
        this._bricks.push(brick.move(moveDown));

        return this;
    }

    emptySpaceBelow(coordinates: Coordinates) : Coordinates {
        let directionDown = new Coordinates ( 0,0,-1);
    
        let lowestFreeSpace = coordinates;
        while ( lowestFreeSpace.z > 0 &&  ! this.isOccupied ( lowestFreeSpace.plus(directionDown))) {
            lowestFreeSpace = lowestFreeSpace.plus(directionDown);
        }
    
        return lowestFreeSpace.minus(coordinates);
    }

    placeBrickAt(brick: Brick, placeForBrickStart: Coordinates) {
        let movement = placeForBrickStart.minus(brick.start);

        for ( let blockOfBrick of brick.getBlocks() ) {
            this.markPlaceAsOccupiedBy(blockOfBrick.plus(movement), brick);
        }
    }

    getBrickAt(coordinates: Coordinates) :Brick | undefined {
        try {
            return this._occupied[coordinates.x][coordinates.y][coordinates.z];
        } catch ( error ) {
            // out of bound is not occupied
            return undefined;
        }
    }


    private markPlaceAsOccupiedBy(placeForBrickStart: Coordinates, brick: Brick) {
        if (this._occupied[placeForBrickStart.x] == undefined) {
            this._occupied[placeForBrickStart.x] = [];
        }
        if (this._occupied[placeForBrickStart.x][placeForBrickStart.y] == undefined) {
            this._occupied[placeForBrickStart.x][placeForBrickStart.y] = [];
        }

        this._occupied[placeForBrickStart.x][placeForBrickStart.y][placeForBrickStart.z] = brick;
    }
}