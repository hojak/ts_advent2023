import { BroadcasterModule, ConjunctionModule, Module } from "./module";
import { Signal, SignalType } from "./signal";

export class ModuleConfiguration {    
    private _modules: Map<string, Module> = new Map();
    private _numberOfPushes = 0;
    private _distanceToButton: Map<string, number> = new Map();
    private _moduleLoops: Map<string, string[][]> = new Map();
    
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

    public get moduleNames () : string[] {
        return Array.from(this._modules.keys());
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

    pushTheButton(times: number) {
        for ( let push = 0; push < times; push ++ ) {
            this._numberOfPushes ++;

            this.process ( {
                type: SignalType.Low,
                receiver: "broadcaster",
                sender: "button",
                push: this._numberOfPushes
            });
        }
    }



    analyzeModuleLoops() {
        let queue : string[][] = [ ["broadcaster"] ];

        this._distanceToButton = new Map<string, number>();
        this._distanceToButton.set ( "broadcaster", 1);

        while ( queue.length > 0) {
            const currentPath : string[] = queue.shift() ?? [];
            const nameOfCurrentModule = currentPath[currentPath.length - 1];
            const currentModule = this._modules.get(nameOfCurrentModule);

            if (currentModule == undefined) {
                continue;
            }

            for ( let connected of currentModule.outputs ) {
                const indexInPath = currentPath.indexOf(connected);
                if ( indexInPath >= 0 ) {
                    this._registerLoopAtSteps(currentPath.splice(indexInPath));
                } else {
                    if ( ! this._distanceToButton.has(connected)) {
                        this._distanceToButton.set ( connected, this.getDistanceToButton(nameOfCurrentModule)+1);
                    }
                    queue.push ( currentPath.concat([connected]));
                }
            }    
        }
    }

    private _registerLoopAtSteps(loop: string[]) {
        for (const pathModule of loop) {
            let registeredLoops = this._moduleLoops.get(pathModule);
            if (registeredLoops == undefined) {
                registeredLoops = [];
            }
            registeredLoops.push(loop);
            this._moduleLoops.set(pathModule, registeredLoops);
        }
    }

    getDistanceToButton(moduleName: string): number {
        return this._distanceToButton.get(moduleName) ?? NaN;
    }

    getModuleLoops(moculeName: string): any {
        return this._moduleLoops.get ( moculeName );
    }

}

function queueToString(queue: Signal[]) :string {
    return queue.map ( signal => signal.sender + ":" + signal.type + "->" + signal.receiver).join(",");
}
