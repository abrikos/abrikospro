import {useTranslation} from "react-i18next";
import {Dropdown} from "react-bootstrap";

export default function LangSwitch(props) {
    const {i18n} = useTranslation();
    const {language} = i18n;
    const buttons = [
        {language: 'en-US', text: <strong>EN</strong>},
        {language: 'ru-RU', text: <strong>RU</strong>},
    ]
    const activeButton = buttons.find(b=>b.language === language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        props.saveStorage('language', language)
    };
    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {activeButton ? activeButton.text : buttons[0].text}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {buttons.filter(b => b.language !== language)
                    .map(b => <Dropdown.Item key={b.language} onClick={() => changeLanguage(b.language)}>{b.text}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>

    )
}