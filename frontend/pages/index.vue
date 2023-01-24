<template>
  <div>
    <Receipt v-if="layout === 'receiptLayout'"/>
    <Game v-else-if="layout === 'gameLayout'"/>
    <Default v-else/>
  </div>
</template>

<script>
import layout from '~/middleware/layouts'
import Game from "~/pages/game/gameIndex.vue";
import Receipt from "~/pages/receipt/receiptIndex.vue";
import Default from "~/pages/default/defaultIndex.vue";

export default {
  name: "index",
  layout,
  components:{Game,Receipt, Default},
  computed:{
    layout(){
      return layout
    }
  }
}
</script>

<style scoped>

</style>