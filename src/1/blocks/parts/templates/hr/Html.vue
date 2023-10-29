<template>
    <div class="view-popup__hr" :class="block['style'][main.device]['show']" :style="getStyleHr()"></div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['block', 'main'],
        name: 'templateHtmlHr',

        methods: {
            getStyleHr() {
                const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
                const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'

                return 'background-color: ' + this.block['style'][this.main.device]['background']  + ';' + 'width: ' + width + ';' + 'height: ' + height + ';' + 'margin-top: ' + this.block['style'][this.main.device]['margin_top']  + 'px;' + 'margin-bottom: ' + this.block['style'][this.main.device]['margin_bottom']  + 'px;'
            }
        }
    }
</script>

<style scoped>
    .view-popup__hr.hide {
        display: none !important;
    }
</style>
