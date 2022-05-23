import React from "react";
import Routes from "./Routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import storeRedux from "app/storeRedux";
import API from "app/API"
import {useDispatch} from "react-redux";
import "./App.sass"
import logo from "./images/logo.png";

function App() {
    const dispatch = useDispatch();
    const api = API(dispatch);
    console.log('STORE', storeRedux.getState())

    return (
        <div className="App">
            <video>
                <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h265/1080/Big_Buck_Bunny_1080_10s_30MB.mp4" type='video/mp4; codecs="hvc1"' />
            </video>
            <img src={logo}/>
        </div>
    );
}

export default App;
