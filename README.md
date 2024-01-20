# Агрегация кассовых чеков
Приложение служит для анализа информации из кассовых чеков.
Агрегация по месяцам позволяет наблюдать ежемесячные расходы.
Поиск по товарам позволяет наблюдать изменения цен на определенные товары.
Ввод чеков производится путем загрузки JSON файла полученного из приложения
"Проверка чеков ФНС России"
https://play.google.com/store/apps/details?id=ru.fns.billchecker

Для доступа к своим чекам необходимо пройти процедуру аутентификации

Репозиторий демонстрирует способы взаимодействия
frontend и backend web-приложения на основе технологий
nodejs, monogodb, nuxt, vuetify, pug

По всем вопросам обращаться me@abrikos.pro

## Установка приложения на собственном сервере
Создать файл переменных окружения .env
```
MONGODB_URI=mongodb://localhost:27017/dbname
BOT_TOKEN=TG_BOT_API_TOKEN
COOKIE_MAX_AGE=18000
COOKIE_MAX_AGE_REFRESH=9000
MAIL_USER=email
MAIL_PASSWORD=password

```
MAIL_... служит для процедур восстановления пароля зарегистрированных пользователей

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3008 
$ yarn dev

# build for production and launch server
$yarn build
$ pm2 start pm2.config.js
```

## Update and reload
```bash
$./reload.sh
```

For detailed explanation on how things work, check out the [Nuxt documentation](https://nuxt.com).
