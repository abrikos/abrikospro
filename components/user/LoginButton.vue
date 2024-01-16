<script setup lang="ts">
const {$event, $listen} = useNuxtApp()
$listen('login:close', async () => {
    showDialog.value = false
})

const showDialog = ref()
</script>

<template lang="pug">
v-btn(@click="showDialog=true") {{$t('Login')}}
v-dialog(width="500" v-model="showDialog" )
    UserLogin
</template>

<style scoped lang="sass">

</style>