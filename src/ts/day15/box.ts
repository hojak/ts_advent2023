export class Box {

    private _lenses: Lens[] = [];

    addOrReplaceLens(label: string, focalLength: number) : this {
        let found = this._lenses.filter( lens => lens.label == label );
        if ( found.length > 0 ) {
            found[0].focalLength = focalLength;
        } else {
            this._lenses.push ( { label: label, focalLength: focalLength } );
        }

        return this;
    }


    sumOfFocusingPower(): number {
        return this._lenses.reduce ( (prev, curr, index) => prev + curr.focalLength * (index+1), 0 );
    }

}

interface Lens {
    label: string;
    focalLength: number;
}