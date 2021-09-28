import React from "react";
import Home from "pages/main/home";
import Test from "pages/Test";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import TopMenu from "./layouts/TopMenu";
import {AlertsList} from "./features/alerts/AlertsList";

export default function Routes(props) {
    return <Router>
        <TopMenu {...props}/>
        <AlertsList/>
        <Switch>
            <Route exact path='/test'><Test {...props}/></Route>
            <Route exact path='/'><Home {...props}/></Route>

        </Switch>

    </Router>;
}
