<template>
    <div class="view-popup__text" :class="block['style'][main.device]['show']" :style="getStyleText()">
        <div v-html="block['content']"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['block', 'main'],
        name: 'templateHtmlText',

        methods: {
            getStyleText() {
                const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
                const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'
            
                return 'width: ' + width + ';' + 'height: ' + height + ';'
            }
        }
    }
</script>

<style scoped>
    .view-popup__text.hide {
        display: none !important;
    }
</style>
