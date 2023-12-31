import { transpileModule } from "typescript";
import { Hand } from "./Hand";

export class ListOfHands {
    handsWithBids : [Hand, number][] = [];
    jAsJoker: boolean;


    constructor( input: string, jAsJoker: boolean = false ) {
        this.jAsJoker = jAsJoker;
        this.handsWithBids = input.split("\n").filter(s => s.trim() != "").map ( line => {
            let split = line.split(" ");
            return [
                new Hand ( split[0], jAsJoker),
                Number(split[1])
            ];
        });
    }

    getTotalWinnings(): number {
        return this.handsWithBids
            .sort ( (a : [Hand, number] ,b: [Hand,number]) => a[0].compareTo (b[0]) )
            .map ( (handAndBit : [Hand, number] ) => handAndBit[1] )
            .reduce ( (prev, curr, index ) => prev + curr * (index+1));
    }


}