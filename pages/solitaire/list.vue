<script setup lang="ts">
import cards from '~/server/utils/cards'
const de = cards.deckRandom
console.log(de)
</script>

<template lang="pug">
//img(v-for="img of de" :key="img.name" :src="`/cards/${img.name}.svg`")
</template>

<style scoped lang="sass">

</style>