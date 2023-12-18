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
        result.draws.push ( SetOfCubes.createFromString(representation));
        return result;
    }

}