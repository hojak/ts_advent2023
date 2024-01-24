import { consoleApp } from "../consoleApp";
import { ModuleConfiguration } from "./moduleConfiguration";

consoleApp (input => {
    console.log ( "working on module configuration");

    let moduleConfiguration = new ModuleConfiguration ( input );

    for ( let i=0; i<1000; i++ ) {
        moduleConfiguration.pushTheButton();
    }

    let[sumOfLow, sumOfHigh] = moduleConfiguration.getNumberOfProcessedSignals();
    
    console.log ( "Processed Low Signals: " + sumOfLow);
    console.log ( "Processed High Signale: " + sumOfHigh);
    console.log ( "Result: "+ (sumOfHigh *sumOfLow));
})