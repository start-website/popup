<template>
    <div class="view-popup__form" :class="block['style'][main.device]['show']" :style="getStyleForm()">
        <div 
            class="view-popup__form-item" 
            :class="item['style'][main.device]['field_position']" 
            v-for="(item, index) in block['content']" 
            :key="index" 
            :data-layout="item['layout']"
            :style="getStyleFormItem(item)"
        >

            <template v-if="item['type'].match(/^(text$|number|password|hidden|range|tel|time|date|color)/)">
                <div class="view-popup__form-name-field" :class="'view-popup__form-name-field-' + item['type']">{{ item['label'] }}</div>
                <label :class="'view-popup__form-label_' + item['type']">
                    <input class="view-popup__form-input" :type="item['type']" v-model="item['default_value']" :placeholder="item['placeholder']" :disabled="item['attributes']['disabled']" :min="item['min']" :max="item['max']" :step="item['step']">
                </label>
            </template>

            <template v-if="item['type'] == 'email'">
                <div class="view-popup__form-name-field" :class="'view-popup__form-name-field-' + item['type']">{{ item['label'] }}</div>
                <label :class="'view-popup__form-label_' + item['type']">
                    <input class="view-popup__form-input" type="text" v-model="item['default_value']" :placeholder="item['placeholder']" :disabled="item['attributes']['disabled']" :min="item['min']" :max="item['max']" :step="item['step']">
                </label>
            </template>

            <template v-if="item['type'] == 'file'">
                <div class="view-popup__form-name-field" :class="'view-popup__form-name-field-' + item['type']">{{ item['label'] }}</div>
                <label :class="'view-popup__form-label_' + item['type']">
                    <input class="view-popup__form-input-hidden" type="hidden" v-model="item['default_value']">
                    <input class="view-popup__form-input" :type="item['type']" :placeholder="item['placeholder']" :disabled="item['attributes']['disabled']" :min="item['min']" :max="item['max']" :step="item['step']">
                </label>
            </template>

            <template v-if="item['type'] == 'textarea'">
                <div class="view-popup__form-name-field" :class="'view-popup__form-name-field-' + item['type']">{{ item['label'] }}</div>
                <label>
                    <textarea class="view-popup__form-textarea" v-model="item['default_value']" :placeholder="item['placeholder']" :disabled="item['attributes']['disabled']" :style="styleTextarea(item)"></textarea>
                </label>
            </template>

            <template v-if="item['type'] == 'radio'">
                <div class="view-popup__form-name-field" :class="'view-popup__form-name-field-' + item['type']">{{ item['label'] }}</div>

                <div class="view-popup__form-input-radio-wrap" v-for="(option, index_option) in item['options']">
                    <input class="view-popup__form-input view-popup__form-input-radio" :type="item['type']" v-model="option['option']" :checked="option['checked']" :disabled="option['disabled']">
                    <label class="view-popup__form-input-label" :for="'view-popup__form-' + block['id'] +  '-input-radio-' + index_option">{{ option['label'] }}</label>
                </div>
            </template>

            <template v-if="item['type'] == 'checkbox'">
                <div class="view-popup__form-input-checkbox-wrap"  v-for="(option, index_option) in item['options']">
                    <input class="view-popup__form-input" :type="item['type']" v-model="option['option']" :checked="option['checked']" :disabled="option['disabled']">
                    <label class="view-popup__form-input-check" :for="'view-popup__form-' + block['id'] + '-input-checkbox-' + index_option">
                        <svg width="18px" height="18px" viewBox="0 0 18 18">
                            <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                            <polyline points="1 9 7 14 15 4"></polyline>
                        </svg>
                    </label>
                    <div class="view-popup__form-checkbox-name">{{ option['label'] }}</div>
                </div>
            </template>

            <template  v-if="item['type'] == 'select'" >
                <div class="view-popup__form-name-field" :class="'view-popup__form-name-field-' + item['type']">{{ item['label'] }}</div>
                <select class="view-popup__form-select">
                    <option v-for="(option, index_option) in item['options']" :value="option['option']" :disabled="option['disabled']" :selected="option['checked']">{{ option['option'] }}</option>
                </select>
            </template>

            <template  v-if="item['type'] == 'button'" >
                <div class="view-popup__form-button-wrap">
                    <label>
                        <div class="view-popup__form-button" type="submit" :style="getStyleFormButton(item)">{{ item['text_button'] }}</div>
                    </label>
                </div>
            </template>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['block', 'main'],
        name: 'templateHtmlForm',

        methods: {
            getStyleForm() {
                const width = (this.block['style'][this.main.device]['width'] && this.block['style'][this.main.device]['width_units']) ? this.block['style'][this.main.device]['width'] + this.block['style'][this.main.device]['width_units'] : 'auto'
                const height = (this.block['style'][this.main.device]['height'] && this.block['style'][this.main.device]['height_units']) ? this.block['style'][this.main.device]['height'] + this.block['style'][this.main.device]['height_units'] : 'auto'
            
                return 'width: ' + width + ';' + 'height: ' + height + ';'
            },

            styleTextarea(item) {
                const min_height = item['min_height'] ? item['min_height']  + 'px' : 0
                return 'min-height: ' + min_height + ';'
            },

            getStyleFormItem(item) {
                const width = (item['style'][this.main.device]['width'] && item['style'][this.main.device]['width_units']) ? item['style'][this.main.device]['width'] + item['style'][this.main.device]['width_units'] : 'auto'
                const margin_top = item['style'][this.main.device]['margin_top'] ? item['style'][this.main.device]['margin_top'] + 'px ' : 'auto'
                const margin_right = item['style'][this.main.device]['margin_right'] ? item['style'][this.main.device]['margin_right'] + 'px ' : 'auto'
                const margin_bottom = item['style'][this.main.device]['margin_bottom'] ? item['style'][this.main.device]['margin_bottom'] + 'px ' : 'auto'
                const margin_left = item['style'][this.main.device]['margin_left'] ? item['style'][this.main.device]['margin_left'] + 'px ' : 'auto'

                return 'width:' + width + ';' + 'margin-top:' + margin_top  + ';' + 'margin-right:' + margin_right  + ';' + 'margin-bottom:' + margin_bottom  + ';' + 'margin-left:' + margin_left  + ';'
            },

            getStyleFormButton(item) {
                return 'background-color:' + item['style'][this.main.device]['background_color'] + ';' + 'color:' + item['style'][this.main.device]['color'] + ';'
            }
        }
    }
</script>

<style scoped>
    .view-popup__form[data-position="center"] {
        margin: 0 auto;
    }

    .view-popup__form[data-position="left"] {
        margin: 0 auto 0 0;
    }
    .view-popup__form[data-position="right"] {
        margin: 0 0 0 auto;
    }
    .view-popup__form.hide {
        display: none !important;
    }

   .view-popup__form-item.row {
    display: inline-block;
    }

   .view-popup__form-item.column {
        display: block;
    }
</style>
