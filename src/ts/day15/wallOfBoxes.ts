import { Box } from "./box";

export class WallOfBoxes {

    private _boxes : Box[];

    constructor ( initializationSequence : string ) {
        this._boxes = [];
        for ( let number = 0; number <= 255; number ++) {
            this._boxes[number] = new Box();
        }

        this.runSequence ( initializationSequence );
    }

    runSequence(initializationSequence: string) {
        if ( initializationSequence == "rn=1") {
            this._boxes[0].addOrReplaceLens("rn",1);
        }
    }

    evaluateInitialization(): any {
        return this._boxes.reduce ( (prev, curr, index ) => prev + curr.sumOfFocusingPower() * ( index+1), 0);
    }
    
}