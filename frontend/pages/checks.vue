<template lang="pug">
  div
    div.upload
      v-btn(@click="btnClick()" color="primary") {{$t('Upload JSON')}}
      small {{$t('app_description')}}
      a( href='https://play.google.com/store/apps/details?id=ru.fns.billchecker&hl=ru&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank")
        img(alt='Доступно в Google Play' src='/googleplay_RU.png')
      input(type="file" accept=".json" @change="upload" ref="uploadInput" hidden)
    v-tabs(v-model="tab")
      v-tab {{$t('All')}}
      v-tab {{$t('By month')}}
      v-tab {{$t('By good')}}
    v-tabs-items(v-model="tab")
      v-tab-item
        ChecksAll(:checks="checks")
      v-tab-item
        ChecksMonthly
      v-tab-item
        GoodsAll

</template>

<script>
import ChecksAll from "~/components/ChecksAll.vue";
import GoodsAll from "~/components/GoodsAll";
import ChecksMonthly from "~/components/ChecksMonthly";

export default {
  name: "checks",
  components: {ChecksMonthly, GoodsAll, ChecksAll},
  data() {
    return {
      tab: 1,
      checks:[]
    }
  },
  fetch(){
    this.loadData()
  },
  methods: {
    async upload(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await this.$axios.$put('/check/upload/json', formData)
      this.$refs.uploadInput.value = null
    },
    btnClick() {
      this.$refs.uploadInput.click()
    },
    async loadData() {
      this.checks = await this.$axios.$get('/check/list')
    },

  }
}
</script>

<style scoped lang="sass">
.upload
  //border: 1px solid silver
  padding: 10px
  display: flex
  flex-direction: column
  align-items: center

  img
    max-height: 40px
//width: 230px
</style>