import { Part } from "./part";
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
            console.log ( "step: " + currentWorkflow);
            
            let workflow = this._workflows.get ( currentWorkflow );
            if ( workflow == undefined ) {
                // cannot be possible, is necessary because of compiler...
                throw new Error ( "no workflow found");
            }
            currentWorkflow = workflow.perform ( aPart );
        }

        return currentWorkflow;
    }


}

