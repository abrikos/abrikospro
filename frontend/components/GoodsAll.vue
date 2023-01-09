<template lang="pug">
  div
    v-text-field(v-model="search" placeholder="Введите название продукта" )
    div
      div(v-for="good of goodsFiltered").row
        span.date {{good.date}}
        span.retailPlace {{good.retailPlace}}
        span.name {{good.name}}
        span.price {{good.price}}
        span.quantity {{good.quantity}}
        span.sum {{good.sum}}
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
      if (!this.search) return []
      return this.goods.filter(g => g.name.toLowerCase().match(this.search.toLowerCase()))
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
.row
  display: flex
  justify-content: space-around
  align-items: center
  border-bottom: 1px solid silver

  span
    padding: 10px

  .date
    width: 150px

  .name
    width: 400px

  .price, .quantity, .sum
    width: 100px
    text-align: right

</style>