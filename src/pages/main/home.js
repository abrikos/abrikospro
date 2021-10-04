import React from 'react';
import logo from "images/logo.png"

export default function Home(props) {
    return  <div className={'text-center'}>
                    <h1>{props.t('Abrikos HP')}</h1>
        <img src={logo}/>
            </div>

}


