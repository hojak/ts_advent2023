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
        const matcher = /^(\d+) (blue)$/i;
        let match = matcher.exec(representation);

        if ( match != null ) {
            let blue = Number ( match[1]);
            return new SetOfCubes(blue, 0, 0);
        }

        throw new Error("Method not implemented.");
    }



}