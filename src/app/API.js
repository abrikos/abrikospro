import axios from "axios";
import {alertAdd} from "../features/alerts/alertSlice";
import React from "react";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import moment from "moment";


function API(dispatch) {
    const {t} = useTranslation();

    const api = {
        language: i18next.language,
        t,
        get: async function (url, data) {
            return this.fetch(url, data, 'GET')
        },
        post: async function (url, data) {
            return this.fetch(url, data, 'POST')
        },
        fetch: async function (url, data, method) {
            let res;
            try {
                if (method === 'POST') {
                    console.log('POST')
                    res = await axios.post(url, data)
                } else {
                    console.log('GET')
                    res = await axios(url)
                }

            } catch (error) {
                console.log(url, ': AXIOS ERROR', error);
                dispatch(alertAdd({
                    variant: 'danger',
                    text: <span><strong>{url}:</strong> {error.message}</span>
                }))
                //res = {error}
            }
            return res;
        },

        login() {
            this.saveStorage('authUser', {name: 'Abr Ikos', date: moment().format('YYYY-MM-DD HH:mm:ss')});
            return this.getStorage('authUser')
        },

        logout() {
            this.saveStorage('authUser', {});
        },

        getStorage(key) {
                try {
                    return JSON.parse(localStorage[key])
                } catch (e) {
                    console.log(key, e)
                    return  localStorage[key]
                }
        },

        saveStorage(key, val) {
            localStorage.setItem(key,val)
            //localStorage[key] = JSON.stringify(val);
        }
    }
    return api;
}

export default API;