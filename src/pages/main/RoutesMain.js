import React from "react";
import Home from "src/pages/main/home";
import Contacts from "src/pages/main/contacts";
import Portfolio from "src/pages/main/portfolio";

export default function RoutesMain(props){

    return {
        "/": () => <Home {...props}/>,
        "/portfolio": () => <Portfolio {...props}/>,
        "/contacts": () => <Contacts {...props}/>
    };
}
