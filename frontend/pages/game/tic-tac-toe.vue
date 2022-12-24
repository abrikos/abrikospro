<template>
  <div>
    <h1>{{ $t('Tic Tac Toe') }}</h1>
    <table>
      <tr v-for="row in fieldLength" :key="row">
        <td v-for="col in fieldLength" :key="col" @click="cellClick(row,col)" :class="getCellFigure(row,col)">
          {{ cellIndex(row, col) }}
        </td>
      </tr>
    </table>
    <v-btn @click="init">Clear</v-btn>
    {{ win }}
  </div>
</template>

<script>
export default {
  name: "tic-tac-toe",
  data() {
    return {
      fieldLength: 10,
      winCount: 4,
      cells: [],
      win: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    getCellFigure(row, col) {
      const cell = this.cells[this.cellIndex(row, col)]
      if(!cell) return ''
      return cell.figure
    },
    cellIndex(row, col) {
      return (row - 1) * this.fieldLength + (col - 1)
    },
    testCell(row, col) {
      const test = (r, c) => {
        let check = 0
        for (let i = 0; i < this.winCount; i++) {
          if (this.getCellFigure(row + i * r, col + i * c) === 'tic') check++
          //console.log(row + i * r, col + i * c,this.cellIndex(row + i * r, col + i * c))
        }
        if (check === this.winCount) return 1
      }
      const result = [
        test(0, 1),
        test(1, 0),
        test(1, 1),
        test(0, -1),
        test(-1, 0),
        test(-1, -1)
      ]
      console.log(result.includes(1))
      return result.includes(1)
    },

    cellClick(row, col) {
      this.cells[this.cellIndex(row, col)].figure = 'tic'
      if(this.testCell(row, col)) this.win = 'WINNER'
      return
      const free = this.cells.filter(c => !c.figure)
      const f = free[Math.floor(Math.random() * free.length)]
      if (f)
        f.figure = 'toc'
    },
    init() {
      this.win = null
      this.cells = Array.from(Array(this.fieldLength * this.fieldLength).keys()).map(c => ({figure: ''}))
    }
  }
}
</script>

<style scoped lang="sass">
table
  border-spacing: 0
  border-collapse: collapse

  td:last-child
    border-right: none

  td:first-child
    border-left: none

  tr:first-child
    td
      border-top: none

  tr:last-child
    td
      border-bottom: none

  td.tic
    background: #3e8ddd

  td.toc
    background: red

  td
    cursor: pointer
    border: .5px solid silver
    width: 50px
    height: 50px
</style>