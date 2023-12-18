import { SetOfCubes } from "./setOfCubes";

export class SetOfDraws {
    draws: SetOfCubes[] = [];

    isPossibleWith ( setOfCubes: SetOfCubes ) : boolean {
        return this.draws
            .map( set => setOfCubes.contains(set))
            .reduce((prev, current, index) => prev && current);
    }

    static createFromString(representation: string): SetOfDraws {
        let result = new SetOfDraws();

        representation
            .split(";")
            .map( draw => SetOfCubes.createFromString(draw.trim()))
            .forEach( set => result.draws.push(set) )

        return result;
    }
}