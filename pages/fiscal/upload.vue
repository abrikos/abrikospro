<script setup lang="ts">
const input = ref()
const loading =ref()

async function upload(e: any) {
    loading.value = true
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    await useNuxtApp().$POST('/fiscal/upload', formData)
    loading.value = false
    input.value.value = null
}
</script>

<template lang="pug">
input(type="file" ref="input" @change="upload" accept=".json" hidden)
v-btn(@click="()=>input.click()" :loading="loading") Выбрать JSON файл отправленный приложением
v-divider.ma-3

a(href='https://play.google.com/store/apps/details?id=ru.fns.billchecker&hl=ru&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank")
    img( alt='Доступно в Google Play' src='https://raw.githubusercontent.com/steverichey/google-play-badge-svg/266d2b2df26f10d3c00b8129a0bd9f6da6b19f00/img/ru_get.svg' width="200")
    div Приложение "Проверка чеков ФНС России"
</template>

<style scoped>

</style>