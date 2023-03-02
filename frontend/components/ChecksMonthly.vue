<template lang="pug">
  v-row
    v-col
      table
        tr
          th {{$t('Year')}}
          th {{$t('Month')}}
          th {{$t('Sum')}}
        tr(v-for="item of items" )
          td {{item.year}}
          td {{item.month}}
          td {{item.totalSum.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}}
          td
            v-btn(@click="byMonth(item)" icon)
              v-icon mdi-eye
    v-col(v-if="checks.length" )
      ChecksAll(:checks="checks")
</template>

<script>
export default {
  name: "ChecksMonthly",
  data(){
    return {
      items:[],
      checks:[],
      data:null
    }
  },
  created() {
    this.loadData()
  },
  methods:{
    async loadData(){
      this.items = await this.$axios.$get('/check/month')
    },
    async byMonth(item){
      this.checks =  await this.$axios.$post('/check/month', item)
    }
  }
}
</script>

<style scoped lang="sass">
table
  td
    text-align: right
    width: 100px
</style>