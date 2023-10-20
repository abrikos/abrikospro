<template lang="pug">
    div
        div.d-flex.justify-space-between.align-center
            v-checkbox(v-model="showAll" :label="$t('Show all')" )
            span.red--text {{$t('Total')}}: &nbsp; {{totalSum}}
        div.check(v-for="check of checks")
            div.d-flex.justify-space-between.align-center(style="cursor:pointer" @click="checkToDisplay=checkToDisplay===check.id?false:check.id")
                i {{check.date}}
                span {{check.retailPlace}} ({{check.goods.length}})
                span {{check.sum.toFixed(2)}}
            div.table( v-if="showAll || checkToDisplay===check.id")
                table
                    thead
                        tr
                            th {{$t('Good')}}
                            th {{$t('Quantity')}}
                            th {{$t('Price')}}
                            th {{$t('Sum')}}
                    tbody
                        tr(v-for="good of check.goods")
                            td {{good.name}}
                            td.number {{good.quantity}}
                            td.number {{good.price}}
                            td.number {{good.sum}}
                        tr
                            td(colspan="3") Итого
                            td.number.total
            span {{check.retailPlaceAddress}}

</template>

<script>
export default {
    name: "ChecksAll",
    data() {
        return {
            checks:[],
            json: '',
            checkToDisplay: null,
            showAll: false
        }
    },
    computed: {
        totalSum() {
            return this.checks.reduce((a, b) => a + b.sum, 0).toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
        },
        themeStyles() {
            return {
                total: this.$vuetify.theme.isDark ? 'red' : 'blue'
            }
        }
    },
    fetch() {
        this.loadData()
    },

    methods: {
        async loadData() {
            this.checks = await this.$axios.$get('/check/list')
        },

    }
}
</script>

<style scoped lang="sass">
.check
    h3
        display: flex
        justify-content: space-between
    border: 1px solid silver
    margin-bottom: 10px
    //box-shadow: 2px 2px 2px 1px silver
    padding: 10px

    span
        padding: 5px

    .table
        display: flex
        justify-content: flex-end

        table
            border-spacing: 0

            //width: 100%
            margin-bottom: 10px

            td.total
                color: v-bind('themeStyles.total')

            td
                padding: 5px 10px
                text-align: right
                border-bottom: 1px solid silver

            td.number
                width: 100px
                text-align: right

            tr:last-child
                td
                    border: 0

            tr:first-child
                th
                    color: #9b9b9b
                    border-bottom: 1px solid red
</style>