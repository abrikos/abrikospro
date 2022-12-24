<template lang="pug">
  div
    div.upload
      v-btn(@click="btnClick()" color="primary") Загрузить JSON
      small Загрузка JSON чеков из приложения "Проверка чеков ФНС России"
      a( href='https://play.google.com/store/apps/details?id=ru.fns.billchecker&hl=ru&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank")
        img(alt='Доступно в Google Play' src='/googleplay_RU.png')
      input(type="file" accept=".json" @change="upload" ref="uploadInput" hidden)
    v-tabs(v-model="tab")
      v-tab Все
      v-tab По датам
    v-tabs-items(v-model="tab")
      v-tab-item
        ChecksAll
      v-tab-item
        div By date 22
</template>

<script>
import ChecksAll from "~/components/ChecksAll.vue";

export default {
  name: "checks",
  components: {ChecksAll},
  data() {
    return {
      tab:'all',
    }
  },
  methods: {
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
.upload
  border: 1px solid silver
  padding: 10px
  display: flex
  flex-direction: column
  align-items: center
  img
    max-height: 40px
    //width: 230px
</style>