import { Area } from "./Area";

export class ListOfAreas {
    areas: Area[];

    constructor ( input: string ) {
        this.areas = input.split("\n\n").map(area => new Area (area));
    }

    getRate(): any {
        return this.areas.map( area => area.getRate() ).reduce ( (prev, curr, index) => prev + curr);
    }

    getRateWithOneFlaw(): any {
        return this.areas.map( area => area.getRateWithOneFlaw() ).reduce ( (prev, curr, index) => prev + curr);
    }


}