import { BroadcasterModule, ConjunctionModule, Module } from "./module";
import { Signal, SignalType } from "./signal";

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

    getNumberOfProcessedSignals () : number[] {
        return Array.from(this._modules.values()).map( module => [
            module.received.numberOfLowSignals,
            module.received.numberOfHighSignals
        ]).reduce ( (prev, curr) => [prev[0]+curr[0], prev[1]+curr[1]], [0,0] );
    }

    getNumberOfModules(): number {
        return this._modules.size;
    }

    getModule( name: string ) : Module | undefined {
        return this._modules.get(name);
    }

    process(initialSignal: Signal) {
        let queue : Signal[] = [ initialSignal ];

        while ( queue.length > 0 ) {
            let currentSignal = queue.shift();
            if ( currentSignal == undefined) {
                continue;
            }

            let receiver = this._modules.get(currentSignal.receiver);

            if ( receiver == undefined ) {
                receiver = new BroadcasterModule(currentSignal.receiver, []);
                this._modules.set ( currentSignal.receiver, receiver);
            }

            let newSignals = receiver.process(currentSignal);
            newSignals.forEach ( newSignal => queue.push ( newSignal ))    
        }
    }

    pushTheButton() {
        this.process ( {
            type: SignalType.Low,
            receiver: "broadcaster",
            sender: "button"
        });
    }
}

function queueToString(queue: Signal[]) :string {
    return queue.map ( signal => signal.sender + ":" + signal.type + "->" + signal.receiver).join(",");
}
