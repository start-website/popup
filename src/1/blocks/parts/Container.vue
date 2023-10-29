<i18n src="../locales/common.json"></i18n>

<template>
    <div class="popup-block__inner">
        <div class="popup-block__description">
			<p>{{ $t('A structural element that limits the size of blocks and centers the blocks') }}</p>
		</div>
        
        <div class="field">
            <div class="name">
                {{ $t('Margins') }} (px)
            </div>
            <div class="value">
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['margin_top']">
                    </label>
                    <div class="hint">{{ $t('Top') }}</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['margin_right']">
                    </label>
                    <div class="hint">{{ $t('Right') }}</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['margin_bottom']">
                    </label>
                    <div class="hint">{{ $t('Bottom') }}</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['margin_left']">
                    </label>
                    <div class="hint">{{ $t('Left') }}</div>
                </div>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('Padding') }} (px)
            </div>
            <div class="value">
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="0" required v-model="block['style'][main.device]['padding_top']">
                    </label>
                    <div class="hint">{{ $t('Top') }}</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="0" required v-model="block['style'][main.device]['padding_right']">
                    </label>
                    <div class="hint">{{ $t('Right') }}</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="0" required v-model="block['style'][main.device]['padding_bottom']">
                    </label>
                    <div class="hint">{{ $t('Bottom') }}</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input min="0" type="number" class="input-small" placeholder="0" required v-model="block['style'][main.device]['padding_left']">
                    </label>
                    <div class="hint">{{ $t('Left') }}</div>
                </div>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('Background color') }}
            </div>
            <div class="value">
                <label>
                    <input type="text" placeholder="transparent" v-model="block['style'][main.device]['background']">
                </label>
                <color-picker :device="main.device" :block="block" :prop="'background'"></color-picker>
                <div class="hint">{{ $t('Container background color.') }}</div>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('Width') }}
            </div>
            <div class="value">
                <label>
                    <input type="number" min="0" placeholder="auto" v-model="block['style'][main.device]['width']">
                </label>
                <label>
                    <select v-model="block['style'][main.device]['width_units']">
                        <option value="px">px</option>
                        <option value="%">%</option>
                    </select>
                </label>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('Height') }}
            </div>
            <div class="value">
                <label>
                    <input type="number" min="0" placeholder="auto" v-model="block['style'][main.device]['height']">
                </label>
                <label>
                    <select v-model="block['style'][main.device]['height_units']">
                        <option value="px">px</option>
                        <option value="%">%</option>
                    </select>
                </label>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('Horizontal alignment') }}
            </div>
            <div class="value">
                <label>
                    <select v-model="block['style'][main.device]['horizontal_align']" style="width: 100%;">
                        <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                        <option value="center">{{ $t('Center') }}</option>
                        <option value="start">{{ $t('At first') }}</option>
                        <option value="end">{{ $t('From the end') }}</option>
                        <option value="flex-start">{{ $t('At first') }} (flex items)</option>
                        <option value="flex-end">{{ $t('From the end') }} (flex items)</option>
                        <option value="left">{{ $t('Left') }}</option>
                        <option value="right">{{ $t('Right') }}</option>
                        <option value="space-between">{{ $t('Distribute evenly') }} ({{ $t('The first item is flush with the start, the last is flush with the end') }})</option>
                        <option value="space-around">{{ $t('Distribute evenly') }}  ({{ $t('Start and end gaps are half the size of the space, between each item') }})</option>
                        <option value="space-evenly">{{ $t('Distribute evenly') }} ({{ $t('Start, in-between, and end gaps have equal sizes') }})</option>
                        <option value="stretch">{{ $t('Distribute evenly') }} ({{ $t('Stretch "auto"-sized') }})</option>
                        <option value="normal">{{ $t('Normal') }}</option>
                    </select>
                </label>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('Vertical alignment') }}
            </div>
            <div class="value">
                <label>
                    <select v-model="block['style'][main.device]['vertical_align']" style="width: 100%;">
                        <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                        <option value="center">{{ $t('Center') }}</option>
                        <option value="start">{{ $t('At first') }}</option>
                        <option value="end">{{ $t('From the end') }}</option>
                        <option value="flex-start">{{ $t('At first') }} (flex items)</option>
                        <option value="flex-end">{{ $t('From the end') }} (flex items)</option>
                        <option value="self-start">{{ $t('At first') }} (flex self items)</option>
                        <option value="self-end">{{ $t('From the end') }} (flex self items)</option>
                        <option value="baseline">{{ $t('Baseline') }}</option>
                        <option value="normal">{{ $t('Normal') }}</option>
                    </select>
                </label>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'
    import colorPicker from './elems/ColorPicker.vue'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'container',

        components: {
            'color-picker': colorPicker,
        },

        methods: {
            openBlock() {
                this.$refs['popup-block-preview'].classList.remove('active')
                this.$refs['popup-block-body'].classList.add('active')
                this.$refs['popup-block-content'].classList.add('edit')
            },

            closeBlock() {
                this.$refs['popup-block-preview'].classList.add('active')
                this.$refs['popup-block-body'].classList.remove('active')
                this.$refs['popup-block-content'].classList.remove('edit')
            },
            ...mapMutations(['delBlock']),
        },

        computed: mapGetters(['getSettings']),

        mounted() {
            const locale = document.querySelector('#app-locale').value.slice(0, 2)
            this.$i18n.locale = locale
        },
    }
</script>

