<script>
import layout from '~/middleware/layouts'
export default {
    layout,
    name: "upload",
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
    }
}
</script>

<template lang="pug">
    div.upload
        v-btn(@click="btnClick()" color="primary") {{$t('Upload JSON')}}
        input(type="file" accept=".json" @change="upload" ref="uploadInput" hidden)

</template>

<style scoped lang="sass">
.upload
    //border: 1px solid silver
    padding: 10px
    display: flex
    flex-direction: column
    align-items: center


</style>