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

    initializeFromSnapshot(brickLines: string) {
        let bricks = brickLines.split("\n")
            .map ( line => new Brick(line))
            .sort ( (a,b) => a.start.z - b.start.z )
            .forEach ( brick => this.add ( brick ));
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

    isRemovable(candidate: Brick): boolean {
        let needToCheck : Set<Brick> = this.getListOfBricksToCheckForRemoval(candidate);

        for ( let brickToCheck of needToCheck ) {
            let foundOtherSupport = this.stillHasSupportIfBricksAreRemoved(brickToCheck, new Set<Brick>([candidate]));

            if ( ! foundOtherSupport ) {
                return false;
            }
        }

        return true;
    }


    private getListOfBricksToCheckForRemoval( candidate: Brick ): Set<Brick> {
        let result : Set<Brick> =new Set();

        for ( let block of candidate.getBlocks() ) {
            let brickAboveBlock = this.getBrickAt ( block.plus ( new Coordinates ( 0,0,1)));
            if ( brickAboveBlock != undefined && brickAboveBlock != candidate ) {
                result.add(brickAboveBlock);
            }
        }

        return result;
    }

    private stillHasSupportIfBricksAreRemoved(brickToCheck: Brick, removedBricks: Set<Brick>) {
        let foundOtherSupport = false;
        for (let block of brickToCheck.getBlocks()) {
            let possibleBrickBelow = this.getBrickAt(block.minus(new Coordinates(0, 0, 1)));
            if (possibleBrickBelow != undefined && possibleBrickBelow != brickToCheck && !removedBricks.has(possibleBrickBelow)) {
                foundOtherSupport = true;
            }
        }
        return foundOtherSupport;
    }

    getNumberOfRemovableBricks(): number {
        let result = 0;

        for ( let brick of this._bricks ) {
            if ( this.isRemovable ( brick )) {
                result++;
            }
        }

        return result;
    }


    howManyBricksWouldFall(candidate: Brick): number {        
        let result = 0;

        let queueOfFallingOrRemovedBricks = [candidate];
        let fallingOrRemoved = new Set<Brick>(queueOfFallingOrRemovedBricks);

        while ( queueOfFallingOrRemovedBricks.length > 0 )  {
            let brick = queueOfFallingOrRemovedBricks.shift();
            if ( brick == undefined) {
                continue;
            }

            let needToCheck = this.getListOfBricksToCheckForRemoval(brick);

            for ( let possiblyFalling of needToCheck ) {
                if ( ! fallingOrRemoved.has(possiblyFalling) && ! this.stillHasSupportIfBricksAreRemoved (possiblyFalling, fallingOrRemoved)) {
                    fallingOrRemoved.add ( possiblyFalling );
                    queueOfFallingOrRemovedBricks.push(possiblyFalling)
                    result ++;
                }
            }
        }

        return result;
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