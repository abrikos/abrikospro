import React from "react";
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import storeRedux from "app/storeRedux";
import API from "app/API"
import {useDispatch} from "react-redux";
import "./App.sass"
import logo from "./images/logo.png";
import VideoJS from "./VideoJS";
import CardArchive from "./CardArchive";

function App() {
    const dispatch = useDispatch();
    const api = API(dispatch);
    console.log('STORE', storeRedux.getState())

    const handlePlayerReady = (player) => {
        // you can handle player events here
        player.on('play', () => {
            console.log('dddddddd');
        });

        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    return (
        <div className="App">
            <img src={logo}/>
        </div>
    );
}

export default App;
