<template>
    <div v-if="block['component'] === 'c-container'" class="view-popup__container" :data-block-id="block['id']" :data-type="block['component']" :style="getStyleContainer()">
        <template v-if="block['blocks']">
            <template v-for="block in block['blocks']">
                <view-block :block="block" :main="main"></view-block>
            </template>
        </template>
    </div>
    <div v-else-if="block['component'] === 'c-row'" class="view-popup__row" :data-block-id="block['id']" :data-type="block['component']" :style="getStyleRow()">
        <template v-if="block['blocks']">
            <template v-for="block in block['blocks']">
                <view-block :block="block" :main="main"></view-block>
            </template>
        </template>
    </div>
    <div v-else class="view-popup__block" :data-block-id="block['id']" :data-type="block['component']">
        <component :is="'style'">{{ block['css'] }}</component>
        <div v-html="block['backend']['html']"></div>
    </div>
</template>

<script>
export default {
    name: 'view-block',
    props: ['main', 'block'],

    methods: {
        getStyleContainer() {
            const margin_top = this.block['style'][this.main.device]['margin_top'] ? this.block['style'][this.main.device]['margin_top'] + 'px ' : 'auto'
            const margin_right = this.block['style'][this.main.device]['margin_right'] ? this.block['style'][this.main.device]['margin_right'] + 'px ' : 'auto'
            const margin_bottom = this.block['style'][this.main.device]['margin_bottom'] ? this.block['style'][this.main.device]['margin_bottom'] + 'px ' : 'auto'
            const margin_left = this.block['style'][this.main.device]['margin_left'] ? this.block['style'][this.main.device]['margin_left'] + 'px ' : 'auto'
            const padding_top = this.block['style'][this.main.device]['padding_top'] ? this.block['style'][this.main.device]['padding_top'] + 'px ' : 0
            const padding_right = this.block['style'][this.main.device]['padding_right'] ? this.block['style'][this.main.device]['padding_right'] + 'px ' : 0
            const padding_bottom = this.block['style'][this.main.device]['padding_bottom'] ? this.block['style'][this.main.device]['padding_bottom'] + 'px ' : 0
            const padding_left = this.block['style'][this.main.device]['padding_left'] ? this.block['style'][this.main.device]['padding_left'] + 'px ' : 0
            const background_color = this.block['style'][this.main.device]['background'] ? this.block['style'][this.main.device]['background'] : 'transparent'
            const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
            const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'

            return 'background-color: ' + background_color + ';' + 'margin-top:' + margin_top  + ';' + 'margin-right:' + margin_right  + ';' + 'margin-bottom:' + margin_bottom  + ';' + 'margin-left:' + margin_left  + ';' + 'padding:' + padding_top + padding_right + padding_bottom + padding_left + ';' + 'width: ' + width + ';' + 'height: ' + height + ';' + 'justify-content: ' + this.block['style'][this.main.device]['horizontal_align'] + ';' + 'align-items: ' + this.block['style'][this.main.device]['vertical_align'] + ';'
        },

        getStyleRow() {
            return 'flex-direction: ' + this.block['style'][this.main.device]['axis_direction'] + ';'
        },

        // style_column() {
        //     return 'justify-content: ' + this.block['style'][this.main.device]['horizontal_align'] + ';' + 'align-items: ' + this.block['style'][this.main.device]['vertical_align'] + ';' + 'padding:' + this.block['style'][this.main.device]['padding_top'] + 'px ' + this.block['style'][this.main.device]['padding_right'] + 'px ' + this.block['style'][this.main.device]['padding_bottom'] + 'px ' + this.block['style'][this.main.device]['padding_left'] + 'px;'
        // },
    },
}
</script>

<style scoped>
    .view-popup__row {
        display: flex;
        width: 100%;
    }

    .view-popup__container {
        display: flex;
        flex-direction: column;
    }

    .view-popup__block {
        width: inherit;
    }
</style>