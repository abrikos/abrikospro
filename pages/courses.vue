<script setup lang="ts">
  const {data} = await useFetch('/api/courses')
  console.log(data.value)
</script>

<template lang="pug">
div {{data}}
  iframe(src="https://goldbroker.com/widget/live/XAU?currency=USD&height=320" scrolling="no" frameborder="0" width="100%" height="320" style="border: 0; overflow: hidden;")
  iframe(src="https://goldbroker.com/widget/live/XAU?currency=RUB&height=320" scrolling="no" frameborder="0" width="100%" height="320" style="border: 0; overflow: hidden;")

</template>

<style scoped lang="sass">

</style>