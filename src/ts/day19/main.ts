import { consoleApp } from "../consoleApp";
import { ListOfWorkflows, evaluateParts } from "./listOfWorkflows";

consoleApp (input => {
    console.log ( "working on pile of parts...")

    let workflows, parts : string;
    [workflows, parts] =  input.split ( "\n\n", 2);

    let listOfWorkflows = new ListOfWorkflows ( workflows);
    let acceptedParts = listOfWorkflows.getAcceptedPartsOfInput(parts);

    console.log ( evaluateParts(acceptedParts) );
})