import { Brick } from "./brick";
import { Coordinates } from "./coordinates";

export class PileOfBricks {
    private _occupied : boolean[][][] = [];

    numberOfOccupiedSpaces(): number {
        return this._occupied.flat().filter ( occ => occ ).length;
    }

    isOccupied(coordinates: Coordinates): boolean {
        try {
            return this._occupied[coordinates.x][coordinates.y][coordinates.z] == true;
        } catch ( error ) {
            // out of bound is not occupied
            return false;
        }
    }

    add(brick: Brick) {
        let directionDown = new Coordinates ( 0,0,-1);

        let placeAt = brick.start;
        while ( placeAt.z > 0 &&  ! this.isOccupied ( placeAt.plus(directionDown))) {
            placeAt = placeAt.plus(directionDown);
        }

        this.placeBrickAt (brick, placeAt);
    }

    placeBrickAt(brick: Brick, placeForBrickStart: Coordinates) {
        let movement = placeForBrickStart.minus(brick.start);

        for ( let blockOfBrick of brick.getBlocks() ) {
            this.markPlaceAsOccupied(blockOfBrick.plus(movement));
        }
    }


    private markPlaceAsOccupied(placeForBrickStart: Coordinates) {
        if (this._occupied[placeForBrickStart.x] == undefined) {
            this._occupied[placeForBrickStart.x] = [];
        }
        if (this._occupied[placeForBrickStart.x][placeForBrickStart.y] == undefined) {
            this._occupied[placeForBrickStart.x][placeForBrickStart.y] = [];
        }

        this._occupied[placeForBrickStart.x][placeForBrickStart.y][placeForBrickStart.z] = true;
    }
}