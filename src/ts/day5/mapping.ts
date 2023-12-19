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
        let foundMap = this.findMapFor ( source );

        if ( foundMap != null ) {
            return foundMap.map(source);
        } else {
            return source;
        }
    }

    findMapFor( source: number ) : SingleMap | null {
        let mapIndex = this.mappings.length-1;
        while (mapIndex > 0 && this.mappings[mapIndex].getSourceStart() > source ) {
            mapIndex--;
        }

        let foundMap = this.mappings[mapIndex].isCovered(source) ? this.mappings[mapIndex] : null; 

        return foundMap;
    }




}