<i18n src="../locales/common.json"></i18n>

<template>
    <div class="popup-block__inner">
        <div class="html-template" ref="html-template" style="display: none;">
            <c-template-html :block="block" :src="src()" :main="main"></c-template-html>
        </div>

        <div class="popup-block__description">
			<p>{{ $t('Popup close icon') }}</p>
		</div>
        
        <h4>{{ $t('Style for') }} {{ main.device }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Size') }}</div>
                <div class="value">
                    <label>
                        <input type="number" min="0" required v-model="block['style'][main.device]['size']"> (px)
                    </label>
                    <div class="hint">{{ $t('Icon size.') }}</div>
                </div>
            </div>

            <div class="field">
                <div class="name">
                    {{ $t('Сolor') }}
                </div>
                <div class="value">
                    <label>
                        <input type="text" placeholder="transparent" v-model="block['style'][main.device]['color']">
                    </label>
                    <color-picker :device="main.device" :block="block" :prop="'color'"></color-picker>
                    <div class="hint">{{ $t('Icon color.') }}</div>
                </div>
            </div>

            <div class="field">
                <div class="name">
                    {{ $t('Indentations') }}
                </div>
                <div class="value">
                    <div class="value-item db-inline">
                        <label>
                            <input type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['indent_top']">
                        </label>
                        <div class="hint">{{ $t('Top') }}</div>
                    </div>
                    <div class="value-item db-inline">
                        <label>
                            <input type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['indent_right']">
                        </label>
                        <div class="hint">{{ $t('Right') }}</div>
                    </div>
                    <div class="value-item db-inline">
                        <label>
                            <input type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['indent_bottom']">
                        </label>
                        <div class="hint">{{ $t('Bottom') }}</div>
                    </div>
                    <div class="value-item db-inline">
                        <label>
                            <input type="number" class="input-small" placeholder="auto" v-model="block['style'][main.device]['indent_left']">
                        </label>
                        <div class="hint">{{ $t('Left') }}</div>
                    </div>
                    <div class="value-item db-inline" style="position: relative; top: 1px;">
                        <label>
                            <select v-model="block['style'][main.device]['indents_units']">
                                <option value="px">px</option>
                                <option value="%">%</option>
                            </select>
                        </label>
                    </div>
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
    import { mapMutations, mapGetters } from 'vuex'
    import templateHtml from './templates/close_icon/Html.vue'
    import templateStyle from './templates/close_icon/Style.vue'
    import colorPicker from './elems/ColorPicker.vue'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'closeIcon',

        components: {
            'c-template-html': templateHtml,
            'c-template-style': templateStyle,
            'color-picker': colorPicker,
        },

        methods: {
            ...mapMutations(['uploadFile', 'deleteFile', 'changeViewVersion']),

            setBlockHtml() {
                const html = this.$refs['html-template'].innerHTML
                this.$set(this.block['backend'], 'html', html.trim())
            },

            setBlockCss() {
                const css = this.$refs['css-template'].firstChild.innerHTML
                this.block['css'] = css
            },

            src() {
                return this.getPathPublicDataAppPublic + '/' + this.route + '/' + this.card + '/' + this.card_id + '/' + this.block_id + '/' + this.block['content'] + '?v' + this.getWaVersion + this.block['version']
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
            }
        },

        computed: {
            ...mapGetters(['getWaVersion', 'getPathPublicDataAppPublic']),
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

