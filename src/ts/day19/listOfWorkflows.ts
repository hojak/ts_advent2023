import { Part, createPartFromString } from "./part";
import { RangeOfParts } from "./rangeOfParts";
import { Workflow } from "./workflow";

export class ListOfWorkflows {
    private _workflows : Map<string, Workflow> = new Map();


    constructor ( description: string ) {
        for ( let line of description.split("\n").filter ( line => line.trim() != "")) {
            let workflow = new Workflow ( line );
            this._workflows.set ( workflow.name, workflow);
        }
    }

    getNumberOfWorkflows(): number {
        return this._workflows.size;
    }

    runOnPart(aPart: Part): string {
        let currentWorkflow = "in";

        while ( this._workflows.has ( currentWorkflow) ) {
            let workflow = this._workflows.get ( currentWorkflow );
            if ( workflow == undefined ) {
                // cannot be possible, is necessary because of compiler...
                throw new Error ( "no workflow found");
            }
            currentWorkflow = workflow.perform ( aPart );
        }

        return currentWorkflow;
    }

    getAcceptedPartsOfInput(input: string): Part[] {
        let accepted :Part[] = [];
        for ( let line of input.split("\n").filter ( line => line.trim() != "")) {
            let part = createPartFromString(line);
            if ( this.runOnPart(part) == "A") {
                accepted.push(part)
            }
        }
        return accepted;
    }


    getAcceptedRanges(inputRange: RangeOfParts) : RangeOfParts[] {
        const startWorkflow = this._workflows.get('in');
        if (startWorkflow == undefined) {
            return [];
        }
        return this._getAcceptedRanges ( [], startWorkflow, inputRange);
    }

    private _getAcceptedRanges(previousDecisions: Decision[], upcomingWorkflow: Workflow | undefined, range: RangeOfParts): RangeOfParts[] {
        if ( upcomingWorkflow == undefined ) {
            return [];
        }

        let result : RangeOfParts[] = [];
        previousDecisions.push({ 
            workflow: upcomingWorkflow,
            descicionIndex: 0
        });

        for ( let stepIndex = 0; stepIndex< upcomingWorkflow.steps.length; stepIndex++ ) {
            let step = upcomingWorkflow.steps[stepIndex];

            let rangeForStep = range.withStepMatching ( step );
            if ( rangeForStep.size > 0 ) {
                if ( step.target == "A") {
                    result.push ( rangeForStep );
                } else if ( step.target != "R") {
                    previousDecisions[previousDecisions.length-1].descicionIndex = stepIndex;
                    result = result.concat ( this._getAcceptedRanges(previousDecisions, this._workflows.get(step.target), rangeForStep));
                }
            }

            range = range.withStepNotMatching(step);
        }
        previousDecisions.pop();

        return result;
    }

}


export function evaluateParts ( parts: Part[]) {
    return parts.map ( part => part.getSum() ).reduce ( (prev, curr) => prev+curr);
}


interface Decision {
    workflow: Workflow,
    descicionIndex: number;
}