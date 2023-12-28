import { Box } from "./box";
import { hash } from "./hash";

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
        initializationSequence
            .split(",")
            .forEach ( part => {
                if ( part.endsWith("-")) {
                    this.applyRemovePart ( part );
                } else {
                    this.applyAddOrReplace( part );
                }
            })
    }

    applyAddOrReplace(part: string) {
        let split = part.split("=");
        let hashOfLabel = hash(split[0]);

        this._boxes[hashOfLabel].addOrReplaceLens( split[0], Number(split[1]));
    }

    applyRemovePart(part: string) {
        let label = part.split("-")[0];
        let hashOfLabel = hash(label);
        this._boxes[hashOfLabel].removeLens(label);
    }

    evaluateInitialization(): any {
        return this._boxes.reduce ( (prev, curr, index ) => prev + curr.sumOfFocusingPower() * ( index+1), 0);
    }
    
}