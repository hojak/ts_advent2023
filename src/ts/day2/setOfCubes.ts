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

}