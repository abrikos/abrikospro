import React from 'react';
import TopMenu from "components/TopMenu";
import 'bootstrap/dist/css/bootstrap.css';
import {Alert} from "reactstrap";
import {A, useRoutes} from "hookrouter";
import routes from "./RouteSvg";
import {t,changeLanguage} from "Translator";


export default function LayoutSvg(props) {
    const routeResult = useRoutes(routes(props));
    let {children, alert, ...rest} = props;
    const menuItems = [
        {label: t('Home'), path: '/'},
        {label: t('Contacts'), path: '/contacts'},
        {label: 'Language', items:[
                {label:'RU', onClick:()=>changeLanguage('ru')},
                {label:'EN', onClick:()=>changeLanguage('en')},
            ]},
    ];

    return <div className={'content minesweeper'}>
        <TopMenu {...rest} items={menuItems} title={t('Minesweeper')}/>
        <div className={'container p-2'}>
            <Alert {...alert}/>
            {routeResult}
        </div>
        <footer className={'bg-dark text-center'}>
            <a href={'https://www.abrikos.pro'} className={'text-light'}>Abrikos.pro</a>
        </footer>
    </div>

}


