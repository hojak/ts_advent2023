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
        let currentMinimum = NaN;
        let checked = 0;

        for ( let rangeStart = 0; rangeStart < this.seeds.length; rangeStart+=2 ) {
            for ( let i=0; i< this.seeds[rangeStart+1]; i++) {
                checked++;
                let value = this.getLowestLocationNumberForArrayOfSeeds([ this.seeds[rangeStart] +i ])
                if ( isNaN(currentMinimum) || value < currentMinimum ) {
                    currentMinimum = value;
                }
            }    
        }

        console.log ( "we checked for " + checked + " seeds" );

		return currentMinimum;
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