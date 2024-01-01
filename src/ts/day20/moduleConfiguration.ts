import { Module } from "./module";

export class ModuleConfiguration {
    
    private _modules: Module[];
    
    constructor ( configuration: string ) {
        this._modules = configuration.split("\n")
            .filter ( line => line.trim() != "")
            .map ( line => Module.createFromString( line ));

    }

    getNumberOfModules(): any {
        return this._modules.length;
    }
}