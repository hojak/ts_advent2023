import { forEachChild, isWhiteSpaceLike } from "typescript";
import { Mapping } from "./mapping";

export class Almanach {
    seeds: number[];
    maps: any[];

    constructor ( input: string ) {
        let splitInput = input.split ("\n\n");

        this.seeds = Almanach.getSeedsFromHeader(splitInput.splice(0, 1)[0]);

        this.maps = splitInput
            .map ( mapWithHeader => mapWithHeader.split(":")[1].trim())
            .map ( mapDefinition => new Mapping(mapDefinition));
    }

    getLowestLocationNumber(): number {
        let workNumbers = this.seeds;

        for ( let mapIndex = 0; mapIndex<this.maps.length; mapIndex ++ ) {
            workNumbers = workNumbers.map ( nr => this.maps[mapIndex].map(nr));
        }

        return workNumbers.reduce( (prev, curr, index) => Math.min (prev, curr));
    }

    getSeeds(): number[] {
        return this.seeds;
    }

    static getSeedsFromHeader ( header: string ) : number[] {
        return header
            .substring(header.indexOf(":")+1)
            .split(" ")
            .filter( part => part != "")
            .map ( (seedString: string) => Number ( seedString.trim() ))
            .sort ( (a: number,b: number) => a-b);
    }
}