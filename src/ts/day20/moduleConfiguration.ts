import { ConjunctionModule, Module } from "./module";

export class ModuleConfiguration {
    
    private _modules: Map<string, Module> = new Map();
    
    constructor ( configuration: string ) {
        configuration.split("\n")
            .filter ( line => line.trim() != "")
            .map ( line => Module.createFromString( line ))
            .forEach(module => {
                this._modules.set(module.name, module);
            });

        for ( let module of this._modules.values() ) {
            for ( let receiver of module.outputs) {
                let receivingModule = this._modules.get(receiver);
                if( receivingModule?.constructor.name == "ConjunctionModule") {
                    (receivingModule as ConjunctionModule).addInputModule ( module.name );
                } 
            }
        }
    }

    getNumberOfModules(): number {
        return this._modules.size;
    }

    getModule( name: string ) : Module | undefined {
        return this._modules.get(name);
    }
}