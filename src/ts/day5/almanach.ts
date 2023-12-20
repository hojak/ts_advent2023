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


    getLowestLocationNumberForArrayOfSeeds ( seeds: number[]) : number {
        let workNumbers = seeds;

        for ( let mapIndex = 0; mapIndex<this.maps.length; mapIndex ++ ) {
            workNumbers = workNumbers.map ( nr => this.maps[mapIndex].map(nr));
        }

        return workNumbers.reduce( (prev, curr, index) => Math.min (prev, curr));

    }


    getLowestLocationNumber(): number {
        return this.getLowestLocationNumberForArrayOfSeeds(this.seeds);
    }


    getLowestLocationNumberForRanges(): any {
        let currentRanges : number[][] = [];
        
        for ( let i=0; i<this.seeds.length; i+=2) {
            currentRanges.push ( [ this.seeds[i], this.seeds[i+1]]);
        }

        for ( let mapIndex = 0; mapIndex<this.maps.length; mapIndex ++ ) {
            let newRanges : number[][] = [];

            newRanges=currentRanges.flatMap( range => this.maps[mapIndex].mapRange ( range ) );

            currentRanges = newRanges.sort ( (a,b)=>a[0]-b[0]);
        }

        return currentRanges[0][0];
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
    }
}