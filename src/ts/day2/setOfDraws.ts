import { SetOfCubes } from "./setOfCubes";

export class SetOfDraws {

    isPossibleWith ( setOfCubes: SetOfCubes ) : boolean {
        return true;
    }

    static createFromString(representation: string): SetOfDraws {
        return new SetOfDraws();
    }

}