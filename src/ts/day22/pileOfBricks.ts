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

        this.placeBrickAt (placeAt);
    }

    placeBrickAt(placeAt: Coordinates) {
        if ( this._occupied[placeAt.x] == undefined ) {
            this._occupied[placeAt.x] = [];
        }
        if ( this._occupied[placeAt.x][placeAt.y] == undefined ) {
            this._occupied[placeAt.x][placeAt.y] = [];
        }

        this._occupied[placeAt.x][placeAt.y][placeAt.z] = true;
    }

}