import React from "react";
import Contacts from "src/pages/main/contacts";
import Table from "src/pages/minesweeper/Table";
import HomeSvg from "src/pages/svg/home-svg";

export default function RoutesSvg(props){
    return {
        "/": () => <HomeSvg {...props}/>,
        "/contacts": () => <Contacts {...props}/>
    };
}
