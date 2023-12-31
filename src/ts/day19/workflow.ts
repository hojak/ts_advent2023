import {Part} from './part';

export class Workflow {
    private _steps : Step[] = [];
    private _name: string;

    constructor  ( description: string ) {
        this._name = description.substring(0, description.indexOf("{"));

        let instructions = description.substring( description.indexOf("{")+1, description.indexOf("}"));

        for ( let stepDescription of instructions.split(",")) {
            this._steps.push ( createStep ( stepDescription));
        }
    }

    perform(part: Part): string {
        for ( let step of this._steps) {
            if ( step.condition == null ) {
                return step.target;
            }
        }

        throw Error ( "No accepting step reached!")
    }

    public get name(): string {
        return this._name;
    }
}



interface Step {
    target: string,
    condition: Condition | null
}

interface Condition {
    attribute : string,
    larger: boolean,
    value: number
}

function createStep(stepDescription: string): Step {
    if ( stepDescription.indexOf (":") == -1 ) {
        return { target: stepDescription, condition: null};
    } else {
        let regex = /^([xmas])(>|<)([0-9]+):([a-zA-Z]+)$/;
        let groups = regex.exec(stepDescription);
        if ( groups == undefined || groups?.length < 4) {
            throw new Error ( stepDescription + " is not a step description");
        }
        return {
            target: groups[4],
            condition: {
                attribute: groups[1],
                larger: groups[2] == ">",
                value: Number ( groups[3])
            }
        };
    }
}
