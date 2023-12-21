import { consoleApp } from "../consoleApp";
import { ListOfHands } from "./listOfHands";

consoleApp (input => {
    console.log ( "compute winnigns for input: ");
    console.log ( new ListOfHands(input).getTotalWinnings());

    console.log ( "use J as joker: ");
    console.log ( new ListOfHands(input, true).getTotalWinnings());
})