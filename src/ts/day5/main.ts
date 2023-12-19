import { consoleApp } from "../consoleApp";
import {Almanach} from "./almanach";

consoleApp (input => {
    console.log ( "lowest location number for input almanach: ");
    console.log ( new Almanach(input).getLowestLocationNumber());
})