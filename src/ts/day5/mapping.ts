import { SingleMap } from "./singleMap";

export class Mapping {
    mappings : SingleMap[] = [];

    constructor ( definition: string ) {
        this.mappings = definition.split("\n")
            .filter (line => line.trim() != "")
            .map( line => SingleMap.createFromString(line))
            .sort( (map1: SingleMap, map2: SingleMap) => map1.getSourceStart() - map2.getSourceStart());

        console.log(this.mappings );
    }


    map(source: number): number {
        let mapIndex = this.mappings.length-1;
        while (mapIndex > 0 && this.mappings[mapIndex].getSourceStart() > source ) {
            mapIndex--;
        }
        if ( this.mappings[mapIndex].isCovered(source) ) {
            return this.mappings[mapIndex].map(source);
        } else {
            return source;
        }
    }

}