import { Game } from "./game";
import { SetOfCubes } from "./setOfCubes";

export function computeSumOfPossibleGames ( input: string, checkWithSet : string ) : number {
    const setOfCubes = SetOfCubes.createFromString(checkWithSet);

    return input
        .split ("\n")
        .map( line => Game.createFromString(line))
        .filter ( game => game.isPossibleWith(setOfCubes) )
        .map ( game => game.getNumber())
        .reduce( (prev, current, index ) => prev+current );
}