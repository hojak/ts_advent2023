import { SingleMap } from "./singleMap";

export class Mapping {
    mappings : SingleMap[] = [];

    constructor ( definition: string ) {
        this.mappings = definition.split("\n")
            .filter (line => line.trim() != "")
            .map( line => SingleMap.createFromString(line))
            .sort( (map1: SingleMap, map2: SingleMap) => map1.getSourceStart() - map2.getSourceStart());
    }

    map(source: number): number {
        return this.findMapFor ( source ).map(source);
    }

    findMapFor( source: number ) : SingleMap {
        let mapIndex = this.mappings.length-1;
        while (mapIndex > 0 && this.mappings[mapIndex].getSourceStart() > source ) {
            mapIndex--;
        }

        if ( this.mappings[mapIndex].isCovered(source) ) {
            return this.mappings[mapIndex];
        } else {
            let intermediateEnd : number, intermediateStart : number;
            if ( mapIndex == 0 && source < this.mappings[mapIndex].getSourceStart() ) {
                intermediateStart = 0;
                intermediateEnd = this.mappings[mapIndex].getSourceStart() -1;
            } else if (mapIndex == this.mappings.length-1 && source > this.mappings[mapIndex].getSourceEnd()) {
                intermediateStart = this.mappings[mapIndex].getSourceEnd() +1;
                intermediateEnd = source; 
            } else {
                intermediateStart = this.mappings[mapIndex].getSourceEnd()+1;
                intermediateEnd = mapIndex == this.mappings.length -1 ? source : this.mappings[mapIndex+1].getSourceStart()-1;
            }

            let intermediateLength = intermediateEnd - intermediateStart +1;
            return new SingleMap (intermediateStart, intermediateStart, intermediateLength);
        }
    }

    mapRange(interval: number[]): number[][] {
        let result :number [][] = [];

        let start = interval[0];
        let end = start + interval[1] -1;

        let largestSourceCoveredByMapping = this.mappings[this.mappings.length-1].getSourceEnd();

        do {
            let map = this.findMapFor(start);

            if ( map.getSourceEnd() >= end ) {
                result.push ( [map.map(start), end-start+1]);
                start = end+1;
            } else {
                let length = map.length - (start-map.getSourceStart()) ;
                if ( start > largestSourceCoveredByMapping ) {
                    length = end - start+1;
                }
                result.push ( [map.map(start), length ] );
                start += length;
            }
        } while (start <= end);

        return result.sort ( (a,b) => a[0] - b[0]);
    }


}