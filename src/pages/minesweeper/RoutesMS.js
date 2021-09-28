import React from "react";
import Contacts from "src/pages/main/contacts";
import Table from "src/pages/minesweeper/Table";

export default function RoutesMain(props){
    return {
        "/": () => <Table {...props}/>,
        "/contacts": () => <Contacts {...props}/>
    };
}
