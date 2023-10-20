<template lang="pug">
  div.pa-3
    v-text-field(v-model="search" :placeholder="$t('Input name of good')" )
    div {{$t('Sum')}}:
        span(style="color:red") &nbsp; {{sumFiltered}}
    div#list
        div(v-for="good of goodsFiltered").good
            div.date {{good.date}}
            div.retailPlace {{good.retailPlace}}
            div.name
                strong {{good.name}}
            div.flex
                div.price {{good.price}}
                div.quantity {{good.quantity}}
                div.sum {{good.sum}}
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
.flex
    display: flex
    justify-content: space-between
div#list
    .good
        border: 1px solid silver
        padding: 2px
        margin-bottom: 2px
    .date
        text-align: right
        font-size: .8em

@media only screen and (max-width: 600px)
    table
        display: none
@media only screen and (min-width: 600px)
    div#list
        display: none
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