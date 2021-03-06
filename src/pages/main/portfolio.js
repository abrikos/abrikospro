import React from 'react';

export default function Portfolio(props) {

    const sites = [
        {url: 'https://hh.ru/resume/1de9aaf1ff07792fc30039ed1f7a7662674833', description: 'Резюме'},
        {url: 'https://gobip.pro', description: 'Сайт P2P мини-игр'},
        {url: 'https://github.com/abrikos/weather-widget', description: 'Weather widget'},
        {url: 'http://iltumen.ru/', description: 'Государственное собрание (ИЛ ТУМЭН) РС(Я)'},
        {url: 'http://sakhaenergo.ru/', description: 'АО «Сахаэнерго»(ОАО «Сахаэнерго»)'},
        {url: 'https://kadry.sakha.gov.ru/', description: 'Кадровый портал РС(Я)'},
        {url: 'https://asrsya.ru/', description: 'Академия Наук РС(Я)'},
    ]
    return <div>
        <h1>{props.t('Portfolio')}</h1>
        <dl>
            {sites.map((s, i) => <div key={i}>
                <dt><a href={s.url} target={'_blank'}>{s.url}</a></dt>
                <dd>{s.description}</dd>
            </div>)}
        </dl>

        {/*<div><a href={"http://purchases.abrikos.pro/"} target={'_blank'}>Сервис управления списками закупок</a></div>*/}
        {/*<div><a href={"https://svg.abrikos.pro"} target={'_blank'}>Эксперименты с SVG</a></div>*/}
        {/*<div><a href={"https://minesweeper.abrikos.pro"} target={'_blank'}>Классическая игра "Сапер"</a></div>
        <div><a href={"https://minter-earth.com"} target={'_blank'}>Гео визитки</a></div>
        <div><a href={"https://telegram.me/AbrikosLottery_bot"} target={'_blank'}>Бот крипто лотерей</a></div>
        <div><a href={"http://minter-cities.abrikos.pro/"} target={'_blank'}>Города где живут Минтерианцы</a></div>*/}
    </div>

}


