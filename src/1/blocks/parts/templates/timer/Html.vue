<template>
    <div class="view-popup__timer" :style="getStyleTimer()">
        <span class="view-popup__timer-days" :style="getStyleTimerItem()">01<span class="view-popup__timer-name">Days</span></span>
        <span class="view-popup__timer-hours" :style="getStyleTimerItem()">243<span class="view-popup__timer-name">Hours</span></span>
        <span class="view-popup__timer-minutes" :style="getStyleTimerItem()">59<span class="view-popup__timer-name">Minutes</span></span>
        <span class="view-popup__timer-seconds" :style="getStyleTimerItem()">30<span class="view-popup__timer-name">Seconds</span></span>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['block', 'main'],
        name: 'templateHtmlTimer',

        methods: {
            getStyleTimer() {
                const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
                const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'

                return 'font-size: ' + this.block['style'][this.main.device]['font_size'] + 'px;' + 'height:' + this.block['style'][this.main.device]['font_size'] + 'px;' + 'color:' + this.block['style'][this.main.device]['color'] + ';' + 'width: ' + width + ';' + 'height: ' + height + ';';
            },

            getStyleTimerItem() {
                const background = this.block['style'][this.main.device]['background'] ? this.block['style'][this.main.device]['background'] : 'transparent'
                
                return 'background: ' + background + ';'
            }
        }
    }
</script>
