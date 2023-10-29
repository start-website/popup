<template>
    <div class="color_picker-wrap">
        <template v-if="device">
            <div class="color_picker">
                <span v-on:click="toggle($event)" class="color-replacer"><i class="icon16 color" :style="'background:' + block['style'][device][prop]"></i></span>
            </div>
            <div class="color_picker__palette" v-show="show">
                <color-panel v-model="block['style'][device][prop]"></color-panel>
            </div>
        </template>
        <template v-else>
            <div class="color_picker">
                <span v-on:click="toggle($event)" class="color-replacer"><i class="icon16 color" :style="'background:' + block[prop]"></i></span>
            </div>
            <div class="color_picker__palette" v-show="show">
                <color-panel v-model="block[prop]"></color-panel>
            </div>
        </template>
    </div>
</template>

<script>
    import { ColorPanel } from 'one-colorpicker'

    export default {
        name: 'color-picker',
        props: ['block', 'device', 'prop'],
        components: { 
            'color-panel': ColorPanel,
        },
        data () {
            return {
                show: false,
            }
        },

        methods: {
            toggle(e) {
                console.log(e.target)
                this.show = !this.show
            },
        },

    }
</script>

<style scoped>
    .color_picker-wrap {
        display: inline-block;
        vertical-align: text-top;
    }

    .color_picker {
        position: relative;
    }

    .color-replacer {
        cursor: pointer;
        width: 16px;
        height: 16px;
        cursor: pointer;
        display: inline-block;
    }

    .color-replacer .color {
        width: inherit;
        height: inherit;
        display: inline-block;
        border-radius: 8px;
        border: 1px solid #818181;
    }

    .color_picker__palette {
        margin: 15px 0 0 -205px;
    }
</style>