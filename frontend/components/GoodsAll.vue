<template lang="pug">
  div.pa-3
    v-text-field(v-model="search" :placeholder="$t('Input name of good')" )
    div {{$t('Sum')}}:
        span(style="color:red") &nbsp; {{sumFiltered}}
    table
      tr(v-for="good of goodsFiltered")
        td.date {{good.date}}
        td.retailPlace {{good.retailPlace}}
        td.name {{good.name}}
        td.price {{good.price}}
        td.quantity {{good.quantity}}
        td.sum {{good.sum}}
</template>

<script>
export default {
  name: "GoodsAll",
  data() {
    return {
      search: '',
      goods: []
    }
  },
  computed: {
    goodsFiltered() {
      //return this.goods
      if (!this.search) return []
      return this.goods.filter(g => g.name.toLowerCase().match(this.search.toLowerCase()))
    },
    sumFiltered(){
        return this.goodsFiltered.map(g=>g.sum).reduce((partialSum, a) => partialSum + a, 0).toFixed(2)
    }
  },
  created() {
    this.loadGoods()
  },
  methods: {
    async loadGoods() {
      this.goods = await this.$axios.$get('/check/goods')
    }
  }
}
</script>

<style scoped lang="sass">
table
  td
    border-bottom: 1px solid silver
  .date
    width: 150px

  .name
    width: 400px

  .price, .quantity, .sum
    width: 100px
    text-align: right

</style>