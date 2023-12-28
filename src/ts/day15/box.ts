export class Box {

    private _lenses: Lens[] = [];

    addLens(label: string, focalLength: number) : this {
        this._lenses.push ( { label: label, focalLength: focalLength } );
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