export default {
    suits: ['S', 'C', 'D', 'H'],
    values: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    get _deck() {
        const d = [];
        for (const suit of this.suits) {
            for (let idx = 0; idx < this.values.length; idx++) {
                d.push({suit, value: this.values[idx], idx, name: `${this.values[idx]}${suit}`})
            }
        }
        return d;
    },
    get deckRandom() {
        return this._deck.sort(function () {
            return 0.5 - Math.random()
        })
    },
}