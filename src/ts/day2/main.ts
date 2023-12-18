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


let input = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on ('data', function (part) {
    input += part
})

process.stdin.on ('end', function () {
    console.log ("computing sum of possible games");
    console.log ( "result: " + computeSumOfPossibleGames ( input, "12 red, 13 green, 14 blue" ));
})

