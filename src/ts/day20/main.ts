import { consoleApp } from "../consoleApp";
import { ModuleConfiguration } from "./moduleConfiguration";

consoleApp (input => {
    console.log ( "working on module configuration");

    let moduleConfiguration = new ModuleConfiguration ( input );

    moduleConfiguration.pushTheButton(1000);

    let[sumOfLow, sumOfHigh] = moduleConfiguration.getNumberOfProcessedSignals();
    
    console.log ( "Processed Low Signals: " + sumOfLow);
    console.log ( "Processed High Signale: " + sumOfHigh);
    console.log ( "Result: "+ (sumOfHigh *sumOfLow));

    moduleConfiguration.analyzeModuleLoops();

    for (const moduleName of moduleConfiguration.moduleNames.sort( (a,b) => moduleConfiguration.getDistanceToButton(a) - moduleConfiguration.getDistanceToButton(b))) {
        console.log ( "Module: " + moduleName + ", distance: " + moduleConfiguration.getDistanceToButton(moduleName));
        console.log ( "Loops: " + (moduleConfiguration.getModuleLoops(moduleName) ?? []).join(" | "));
        console.log ();
    }

})