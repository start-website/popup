<template>
    <div class="view-popup__html" :class="block['style'][main.device]['show']" :style="getStyleHtml()">
        <div v-html="block['content']"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['block', 'main'],
        name: 'templateHtmlHtml',

        methods: {
            getStyleHtml() {
                const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
                const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'

                return 'width: ' + width + ';' + 'height: ' + height + ';'
            }
        }
    }
</script>

<style scoped>
    .view-popup__html.hide {
        display: none !important;
    }
</style>
