import React from "react";
import Home from "src/pages/main/home";
import Contacts from "src/pages/main/contacts";
import Portfolio from "src/pages/main/portfolio";
import HomeFiller from "src/pages/filler/home-filler";

export default function RoutesFiller(props){

    return {
        "/": () => <HomeFiller {...props}/>,
    };
}
