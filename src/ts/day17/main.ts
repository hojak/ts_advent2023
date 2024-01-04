import { consoleApp } from "../consoleApp";
import { HeatMap } from "./heatMap"

consoleApp (input => {
    console.log ( "finding the heat loss for the best way");
    console.log ( new HeatMap(input).findHeatLossForBestRoute());

    console.log ( "and now for ultra cubicles");
    console.log ( new HeatMap(input).findHeatLossForBestRoute(true));
})