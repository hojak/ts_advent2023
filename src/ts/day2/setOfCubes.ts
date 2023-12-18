export class SetOfCubes {
    green: number;
    blue: number;
    red: number;

    constructor ( blue: number, green: number, red: number ) {
        this.blue = blue;
        this.green = green;
        this.red = red;
    }


    contains(compareTo: SetOfCubes): any {
        return compareTo.blue <= this.blue
            && compareTo.red <= this.red
            && compareTo.green <= this.green;
    }


    static createFromString(representation: string): any {
        if ( representation == "1 blue" ) {
            return new SetOfCubes(1,0,0);
        }
        throw new Error("Method not implemented.");
    }

}