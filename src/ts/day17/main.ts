import { consoleApp } from "../consoleApp";
import { HeatMap } from "./heatMap"

consoleApp (input => {
    console.log ( "finding the best way");
    console.log ( new HeatMap(input).findHeatLossForBestRoute());
})