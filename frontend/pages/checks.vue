<template lang="pug">
  div
    input(type="file" accept=".json" @change="upload" ref="uploadInput" hidden)
    v-btn(@click="btnClick()" color="primary") Загрузить JSON
    div      {{totalSum}}
    div.check(v-for="check of checks")
      h3
        span {{check.retailPlace}}
        i {{check.date}}

      table
        thead
          tr
            th Товар
            th Кол-во
            th Цена
            th Сумма
        tbody
          tr(v-for="good of check.goods")
            td {{good.name}}
            td.number {{good.quantity}}
            td.number {{good.price}}
            td.number {{good.sum}}
          tr
            td(colspan="3") Сумма
            td.number {{check.sum}}
      span {{check.retailPlaceAddress}}
</template>

<script>
export default {
  name: "checks",
  data() {
    return {
      checks: [],
      json: ''
    }
  },
  async fetch() {
    await this.loadData()
  },
  computed:{
    totalSum(){
      return this.checks.reduce((a,b)=>a+b.sum,0).toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    }
  },
  methods: {
    async loadData() {
      this.checks = await this.$axios.$get('/check/list')
    },
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await this.$axios.$put('/check/add/list', formData)
      await this.loadData()
    },
    btnClick() {
      this.$refs.uploadInput.click()
    },
  }
}
</script>

<style scoped lang="sass">
.check
  h3
    display: flex
    justify-content: space-between
  border: 1px solid silver
  margin-bottom: 10px
  //box-shadow: 2px 2px 2px 1px silver
  padding: 10px
  span
    padding: 5px
table
  //width: 100%
  margin-bottom: 10px
  td.number
    text-align: right
  tr:first-child
    th
      border-bottom: 1px solid red
  tr:nth-child(even)
    background: gray
</style>