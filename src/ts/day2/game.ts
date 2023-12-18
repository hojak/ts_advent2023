import { SetOfCubes } from "./setOfCubes";

export class Game {
    draws: SetOfCubes[] = [];
    number: any = 0;

    getNumber(): any {
        return this.number;
    }

    isPossibleWith ( setOfCubes: SetOfCubes ) : boolean {
        return this.draws
            .map( set => setOfCubes.contains(set))
            .reduce((prev, current, index) => prev && current);
    }

    getMinimalSetOfCubes(): SetOfCubes {
        return new SetOfCubes(0,0,0);
    }

    static createFromString(representation: string): Game {
        let result = new Game();

        let splitHeader = representation.split(":");
        let matchHader = /^Game +(\d+)$/.exec ( splitHeader[0]);
        if ( matchHader != null ) {
            result.number = Number ( matchHader[1]);
        }

        splitHeader[1]
            .split(";")
            .map( draw => SetOfCubes.createFromString(draw.trim()))
            .forEach( set => result.draws.push(set) )

        return result;
    }
}