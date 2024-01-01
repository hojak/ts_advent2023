import { consoleApp } from "../consoleApp";
import { ModuleConfiguration } from "./moduleConfiguration";
import { SignalType } from "./signal";

consoleApp (input => {
    console.log ( "working on module configuration");

    let moduleConfiguration = new ModuleConfiguration ( input );

    let sumOfHigh = 0;
    let sumOfLow = 0;
    for ( let i=0; i<1000; i++ ) {
        let [low, high ] = moduleConfiguration.process ( {
            type: SignalType.Low,
            receiver: "broadcaster",
            sender: "button"
        });
        sumOfHigh += high;
        sumOfLow += low;
    }
    
    console.log ( "Processed Low Signals: " + sumOfLow);
    console.log ( "Processed High Signale: " + sumOfHigh);
    console.log ( "Result: "+ (sumOfHigh *sumOfLow));


    console.log ( "\ntrying to reach rx");
    moduleConfiguration = new ModuleConfiguration(input + "\nrx -> ");
    let numberOfStep = 0;
    do  {
        numberOfStep++;

        if ( numberOfStep % 1000000 == 0) {
            console.log ( numberOfStep );
        }

        moduleConfiguration.process ( {
            type: SignalType.Low,
            receiver: "broadcaster",
            sender: "button"
        });
    } while ( ! moduleConfiguration.getModule("rx")?.hasReceivedLow );

    console.log ( "Number of necessary steps: " + numberOfStep);
})