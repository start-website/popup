<template>
    <div class="view-popup__close-icon" :class="block['style'][main.device]['show']" :style="styleCloseIcon()">&#10006;</div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['block', 'main'],
        name: 'templateHtmlCloseIcon',

        methods: {
            styleCloseIcon() {
                const indents_units = this.block['style'][this.main.device]['indents_units']
                const indent_top = (this.block['style'][this.main.device]['indent_top'] && indents_units) ? this.block['style'][this.main.device]['indent_top'] + indents_units : 'auto'
                const indent_right = (this.block['style'][this.main.device]['indent_right'] && indents_units) ? this.block['style'][this.main.device]['indent_right'] + indents_units : 'auto'
                const indent_bottom = (this.block['style'][this.main.device]['indent_bottom'] && indents_units) ? this.block['style'][this.main.device]['indent_bottom'] + indents_units : 'auto'
                const indent_left = (this.block['style'][this.main.device]['indent_left'] && indents_units) ? this.block['style'][this.main.device]['indent_left'] + indents_units : 'auto'
                const color = this.block['style'][this.main.device]['color'] ? this.block['style'][this.main.device]['color'] : 'transparent'

                return 'font-size:' + this.block['style'][this.main.device]['size'] + 'px; ' + 'color:' + color + ';' + 'top:' +  indent_top + ';' + 'right:' +  indent_right + ';' + 'bottom:' +  indent_bottom + ';' + 'left:' + indent_left + ';'
            }
        }
    }
</script>

<style scoped>
    .view-popup__close-icon.hide {
        display: none !important;
    }
</style>

