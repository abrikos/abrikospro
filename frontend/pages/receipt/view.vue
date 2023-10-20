<template lang="pug">
    div
        v-btn(v-for="btn of buttons" :to="`?content=${btn.id}`" :color="btn.id===page ? 'secondary' : ''" :key="btn.id") {{btn.label}}
        ChecksMonthly(v-if="!page || page==='monthly'" )
        GoodsAll(v-if="page==='good'" )
        ChecksAll(v-if="page==='all'" )

</template>

<script>
import ChecksAll from "~/components/ChecksAll.vue";
import GoodsAll from "~/components/GoodsAll.vue";
import ChecksMonthly from "~/components/ChecksMonthly.vue";
import layout from '~/middleware/layouts'

export default {
    layout,
    name: "checks",
    components: {ChecksMonthly, GoodsAll, ChecksAll},
    data(){
      return {
          buttons:[
              {id:'monthly', label:this.$t('By month')},
              {id:'good', label:this.$t('By good')},
              {id:'all', label:this.$t('All')},
          ]
      }
    },
    computed:{
        page(){
            return this.$route.query.content
        }
    },
    mounted() {
        console.log(this.$route)
    }
}
</script>

<style scoped lang="sass">
</style>