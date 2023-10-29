<i18n src="../locales/common.json"></i18n>

<template>
    <div class="popup-block__inner">
        <div class="html-template" ref="html-template" style="display: none;">
            <c-template-html :block="block" :main="main"></c-template-html>
        </div>

        <div class="popup-block__description">
			<p>{{ $t('Button') }}</p>
		</div>

        <h4>{{ $t('Content') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Text button') }}</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['content']">
                    </label>
                </div>
            </div>
        </div>

        <h4>{{ $t('Style for') }} {{ main.device }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">
                    {{ $t('Сolor') }}
                </div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['style'][main.device]['color']">
                    </label>
                    <color-picker :device="main.device" :block="block" :prop="'color'"></color-picker>
                    <div class="hint">{{ $t('Button text color.') }}</div>
                </div>
            </div>

            <div class="field">
                <div class="name">
                    {{ $t('Background color') }}
                </div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['style'][main.device]['background']">
                    </label>
                    <color-picker :device="main.device" :block="block" :prop="'background'"></color-picker>
                    <div class="hint">{{ $t('Button background color.') }}</div>
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
                <div class="name">{{ $t('Show') }}</div>
                <div class="value">
                    <label>
                        <select v-model="block['style'][main.device]['show']">
                            <option value="-" disabled>{{ $t('Choose one of the options') }}</option>
                            <option value="">{{ $t('Show') }}</option>
                            <option value="hide">{{ $t('Do not show') }}</option>
                        </select>
                    </label>
                    <div class="hint">{{ $t('Choose whether to show this block.') }}</div>
                </div>
            </div>

        </div>

        <h4>{{ $t('Actions') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Action') }}</div>
                <div class="value">
                    <label>
                        <select v-model="block['params']['action']" style="width: 100%;">
                            <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                            <option value="follow-link">{{ $t('Follow the link') }}</option>
                            <option value="close">{{ $t('Close') }}</option>
                            <option v-if="getSettings['is_premium']" value="open-popup">{{ $t('Open another popup') }}</option>
                            <option v-else value="open-popup" disabled>{{ $t('Open another popup') }}. ({{ $t('Available only to premium license holders.') }})</option>
                        </select>
                    </label>
                    <div class="hint">{{ $t('Select the action the button will perform when clicked.') }}</div>
                </div>
            </div>
            <div class="field" v-if="block['params']['action'] === 'open-popup'">
                <div class="name">{{ $t('ID popup to open') }}</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['open_popup']">
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['action'] === 'follow-link'">
                <div class="name">{{ $t('Link') }}</div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['link']">
                    </label>
                </div>
            </div>

        </div>

        <h4>{{ $t('Parameters') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Button attributes') }}</div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['link_attrs']">
                    </label>
                    <div class="hint">{{ $t('Html tag attributes.') }}</div>
                </div>
            </div>
        </div>
        
        <h4>{{ $t('Additional options') }}</h4>
        <div class="block-fields">
            <div class="edit-css">
                <div ref="css-template" class="edit-css__template" style="display: none">
                    <c-template-style :block="block"></c-template-style>
                </div>
                <div class="edit-css__field">
                    <textarea ref="edit_css" class="edit-css__textarea" v-model="block['css']" style="display: none"></textarea>
                </div>
                <a ref="open_edit_css" v-on:click.prevent="openEditCSS" href="javascript:void(0);">{{ $t('Edit CSS') }}</a>
                <a ref="close_edit_css" v-on:click.prevent="closeEditCSS" href="javascript:void(0);" style="display: none;">{{ $t('Close edit CSS') }}</a>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import colorPicker from './elems/ColorPicker.vue'
    import templateHtml from './templates/button/Html.vue'
    import templateStyle from './templates/button/Style.vue'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'button',

        components: {
            'color-picker': colorPicker,
            'c-template-html': templateHtml,
            'c-template-style': templateStyle,
        },

        methods: {
            setBlockHtml() {
                const html = this.$refs['html-template'].innerHTML
                this.$set(this.block['backend'], 'html', html.trim())
            },

            setBlockCss() {
                const css = this.$refs['css-template'].firstChild.innerHTML
                this.block['css'] = css
            },

            openEditCSS() {
                this.$refs['open_edit_css'].style.display = 'none'
                this.$refs['close_edit_css'].style.display = ''
                this.$refs['edit_css'].style.display = ''
            },

            closeEditCSS() {
                this.$refs['open_edit_css'].style.display = ''
                this.$refs['close_edit_css'].style.display = 'none'
                this.$refs['edit_css'].style.display = 'none'
            },
        },

        computed: {
            ...mapGetters(['getSettings'])
        },

        watch: { 
            block: {
                deep: true,
                handler(block) {
                    setTimeout(() => {
                        this.setBlockHtml()
                    }, 1)
                },
            },
        
        },

        mounted() {
            this.setBlockHtml()

            if (!this.block['css']) this.setBlockCss()

            const locale = document.querySelector('#app-locale').value.slice(0, 2)
            this.$i18n.locale = locale
        },
    }
</script>

