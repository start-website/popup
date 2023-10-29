<template>
    <a v-if="block['content']" class="view-popup__button" :class="block['style'][main.device]['show']" :href="block['params']['link']" :style="getStyleButton()">{{ block['content'] }}</a>
</template>

<script>
    export default {
        props: ['block', 'src', 'main'],
        name: 'templateHtmlButton',

        methods: {
            getStyleButton() {
                const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
                const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'

                return 'background-color: ' + this.block['style'][this.main.device]['background']  + ';' + 'color: ' + this.block['style'][this.main.device]['color'] + ';' + 'width: ' + width + ';' + 'height: ' + height + ';'
            }
        }
    }
</script>

<style scoped>
    .view-popup__button.hide {
        display: none !important;
    }
</style>
