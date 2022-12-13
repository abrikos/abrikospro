export default function ({app}, inject) {

    inject('gameList', () => {
        return [
            {name: app.i18n.t('Tic Tac Toe'), description:app.i18n.t('5 cells in a line wins the game'), to:'/game/tic-tac-toe'},
            {name: app.i18n.t('Rock Paper Scissors'), description:'', to:''},
            {name: app.i18n.t('Tic Tac Toe'), description:'', to:''},
            {name: app.i18n.t('Tic Tac Toe'), description:'', to:''},
        ]
    })
}