<script setup lang="ts">
const cols = ref(10)
const rows = ref(10)
const bombsPercent = 13
const bombsCount = computed(()=>Math.floor(bombsPercent / 100 * cols.value * rows.value))
const cells = computed(() => {
    const c = []
    for (let row = 1; row <= rows.value; row++) {
        for (let col = 1; col <= cols.value; col++) {
            c.push({idx: idx(row, col), col, row})
        }
    }
    return c
})
function idx(row: number, col: number) {
    return (row - 1) * rows.value + col - 1
}
function getCell(row: number, col: number) {
    return cells.value[idx(row, col)]
}
function cellClick(row: number, col: number) {
    console.log(cells.value[idx(row, col)])
}

</script>

<template lang="pug">
div {{bombsCount}}
    div#miner
        div.row(v-for="row of rows" :key="row")
            div.cell(v-for="col of cols" :key="col" @click="cellClick(row,col)") {{getCell(row,col)}}

</template>

<style scoped lang="sass">
#miner
    .row
        display: flex
        flex-wrap: wrap

        .cell
            border: 1px solid silver
            width: 80px
            height: 80px
</style>