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

}

