<script>
import layout from '~/middleware/layouts'
export default {
    layout,
    name: "about"
}
</script>

<template lang="pug">
    div Приложение служит для анализа информации из кассовых чеков.
        div Агрегация по месяцам позволяет наблюдать ежемесячные расходы.
        div Поиск по товарам позволяет наблюдать изменения цен на определенные товары.
        div Ввод чеков производится путем загрузки JSON файла полученного из приложения "Проверка чеков ФНС России"

</template>

<style scoped>

</style>