<script setup lang="ts">
const leftDrawerOpen = ref(true)
const config = useRuntimeConfig()
</script>

<template lang="pug">
q-drawer(v-model="leftDrawerOpen" bordered)
  q-list
    q-item-label(header) {{$t('Main')}}
    q-item(to="/courses")
      q-item-section(avatar)
        q-avatar(icon="mdi-currency-usd")
      q-item-section {{$t('Courses')}}
    q-item(to="/metamask" v-if="config.public.devMode")
      q-item-section(avatar)
        q-avatar(icon="mdi-ethereum")
      q-item-section {{$t('Metamask')}}

    q-separator(spaced)

    q-item-label(header) {{$t('Games')}}
    q-item(to="/minesweeper/list")
      q-item-section(avatar)
        q-avatar(icon="mdi-mine")
      q-item-section {{$t('Minesweeper')}}
    q-item(to="/sea-battle/list" v-if="config.public.devMode")
      q-item-section(avatar)
        q-avatar(icon="mdi-ship-wheel")
      q-item-section {{$t('Sea battle')}}
    q-item(to="/solitaire/list" v-if="config.public.devMode")
      q-item-section(avatar)
        q-avatar(icon="mdi-cards-playing-club-multiple")
      q-item-section {{$t('Solitaire')}}

    q-separator(spaced)

    q-item-label(header) {{$t('Receipts')}}
    q-item(to="/fiscal/upload")
      q-item-section(avatar)
        q-avatar(icon="mdi-upload-box")
      q-item-section {{$t('Upload')}}
    q-item(to="/fiscal/monthly")
      q-item-section(avatar)
        q-avatar(icon="mdi-calendar-month")
      q-item-section {{$t('Monthly')}}
    q-item(to="/fiscal/list")
      q-item-section(avatar)
        q-avatar(icon="mdi-format-list-bulleted")
      q-item-section {{$t('List')}}
    q-item(to="/fiscal/goods")
      q-item-section(avatar)
        q-avatar(icon="mdi-basket-fill")
      q-item-section {{$t('Goods')}}

//v-menu
            v-list-group(value="games")
              template(v-slot:activator="{props}")
                v-list-item(v-bind="props" prepend-icon="mdi-nintendo-game-boy" ) Игры
              v-list-item(to="/minesweeper/list" prepend-icon="mdi-mine" ) {{$t('Minesweeper')}}
              v-list-item(v-if="config.public.devMode" to="/solitaire/list" prepend-icon="mdi-cards-playing-club-multiple" ) {{$t('Solitaire')}}
              v-list-item(v-if="config.public.devMode" to="/sea-battle/list" prepend-icon="mdi-ship-wheel" ) {{$t('Sea battle')}}
            v-divider
</template>

<style scoped lang="sass">

</style>
