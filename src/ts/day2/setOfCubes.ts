export class SetOfCubes {
    green: number;
    blue: number;
    red: number;

    constructor ( blue: number, green: number, red: number ) {
        this.blue = blue;
        this.green = green;
        this.red = red;
    }

    contains(compareTo: SetOfCubes): boolean {
        return compareTo.blue <= this.blue
            && compareTo.red <= this.red
            && compareTo.green <= this.green;
    }

    getPower(): any {
        return this.red * this.blue * this.green;
    }

    getSuperSetWith(anotherSet: SetOfCubes): any {
        return new SetOfCubes(
            Math.max(this.blue, anotherSet.blue),
            Math.max(this.green, anotherSet.green), 
            Math.max(this.red, anotherSet.red)
        );
    }

    static createFromString(representation: string): any {
        let splitted = representation.split(",").map( str => str.trim());
        let foundValues: { [color: string] : number } = {
            "red" : 0,
            "blue": 0,
            "green" : 0
        }
        const matcher = /^(\d+) +(blue|red|green)$/i;

        splitted.forEach ( part => {
            let match = matcher.exec(part);

            if ( match != null ) {
                foundValues[match[2]] = Number(match[1]);
            }    
        })

        return new SetOfCubes(foundValues['blue'], foundValues['green'], foundValues['red']);
    }



}