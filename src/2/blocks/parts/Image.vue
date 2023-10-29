<i18n src="../locales/common.json"></i18n>

<template>
    <div class="popup-block__inner">
        <div class="html-template" ref="html-template" style="display: none;">
            <c-template-html :block="block" :src="src()" :main="main"></c-template-html>
        </div>

        <div class="popup-block__description">
			<p>{{ $t('Structural element for aligning blocks in one row') }}</p>
		</div>
        
        <h4>{{ $t('Content') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Image') }}</div>
                <div class="value">
                    <label>
                        <input type="hidden" v-model="block['content']">
                        <input type="file"
                            v-on:change="uploadFile([$event, 'popup_image', card + '/' + card_id + '/' + block_id, {route, card, card_id, block_id, index_group, index_block, block}, 'image'])">
                        <div class="view-image">
                            <div class="view-image__body" v-if="block['content']">
                                <img class="transparent-sprite"
                                    :src="src()">
                                <br>
                                <a class="small delete-image" v-on:click.prevent="deleteFile([$event, 'popup_image', card + '/' + card_id + '/' + block_id, {route, card, card_id, block_id, index_group, index_block, block}, false])" href="javascript:void(0);">{{ $t('Delete') }}</a>
                            </div>
                            <div :id="'view-image__progress-' + route + card + card_id + block_id" class="view-image__progress" style="display: none">{{ $t('Loading') }}...<i class="icon16 loading"></i></div>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <h4>{{ $t('Style for') }} {{ main.device }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">
                    {{ $t('Width') }}
                </div>
                <div class="value">
                    <label>
                        <input type="number" min="0" v-model="block['style'][main.device]['width']"> (px)
                    </label>
                </div>
            </div>

            <div class="field">
                <div class="name">
                    {{ $t('Height') }}
                </div>
                <div class="value">
                    <label>
                        <input type="number" min="0" v-model="block['style'][main.device]['height']"> (px)
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

        <h4>{{ $t('Parameters') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Image attributes') }}</div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['image_attrs']">
                    </label>
                    <div class="hint">{{ $t('Html tag attributes.') }}</div>
                </div>
            </div>

            <div class="field">
                <div class="name">{{ $t('Link') }}</div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['link']">
                    </label>
                </div>
            </div>

            <div class="field">
                <div class="name">{{ $t('Link attributes') }}</div>
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
    import { mapMutations, mapGetters } from 'vuex'
    import templateHtml from './templates/img/Html.vue'
    import templateStyle from './templates/img/Style.vue'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'image',

        components: {
            'c-template-html': templateHtml,
            'c-template-style': templateStyle,
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
                const src = this.getPathPublicDataAppPublic + '/' + this.route + '/' + this.card + '/' + this.card_id + '/' + this.block_id + '/' + this.block['content'] + '?v' + this.getWaVersion + this.block['version']
                this.block['params']['src'] = src
                return src
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

