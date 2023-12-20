import { consoleApp } from "../consoleApp";
import { ListOfHands } from "./listOfHands";

consoleApp (input => {
    console.log ( "comput winnigns for input: ");
    console.log ( new ListOfHands(input).getTotalWinnings());

})