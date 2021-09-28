import React, {useState} from 'react';
import {t} from "Translator";


const AccessDenied = () => {
    return <div>
        <h1>403 {t('Access denied')}</h1>
    </div>
};

export default AccessDenied;