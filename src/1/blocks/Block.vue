<i18n src="./locales/common.json"></i18n>

<template>
    <draggable 
        :list="blocks"
        @start="drag = true"
        @end="drag = false"
        v-bind="dragOptions"
        :group="{ name: 'g1' }"
        tag="div"
        class="popup-block-wrap"
        :disabled="getDisabledDragBlock"
    >
        <div class="popup-block" :data-component="block.component" v-for="block, index_block in blocks" :key="block.id">
            <div class="popup-block__content" :data-content-block-id="block.id" :ref="'content-block-' + block.id">
                <div class="popup-block__preview active">
                    <a class="popup-block__sort" style="display:inline" href="javascript:void(0);"><i class="icon16 sort"></i></a>
                    <p v-if="block['component'] == 'c-container'" class="popup-block__name">{{ $t('Container') }}</p>
                    <p v-if="block['component'] == 'c-row'" class="popup-block__name">{{ $t('Row') }}</p>
                    <p v-if="block['component'] == 'c-text'" class="popup-block__name">{{ $t('Text') }}</p>
                    <p v-if="block['component'] == 'c-image'" class="popup-block__name">{{ $t('Image') }}</p>
                    <p v-if="block['component'] == 'c-video'" class="popup-block__name">{{ $t('Video') }}</p>
                    <p v-if="block['component'] == 'c-button'" class="popup-block__name">{{ $t('Button') }}</p>
                    <p v-if="block['component'] == 'c-timer'" class="popup-block__name">{{ $t('Timer') }}</p>
                    <p v-if="block['component'] == 'c-html'" class="popup-block__name">HTML</p>
                    <p v-if="block['component'] == 'c-hr'" class="popup-block__name">HR</p>
                    <p v-if="block['component'] == 'c-form'" class="popup-block__name">{{ $t('Form') }}</p>
                    <p v-if="block['component'] == 'c-close-icon'" class="popup-block__name">{{ $t('Close (Icon)') }}</p>
                    <div class="preview-buttons">
                        <a class="preview-buttons__button preview-buttons__button_open" href="javascript:void(0);" :data-button-open-block-id="block.id" v-on:click.prevent="openBlock(block, index_block)"><i class="icon16 edit"></i><b><i>{{ $t('Edit') }}</i></b></a>
                        <a class="preview-buttons__button preview-buttons__button_cancel" href="javascript:void(0);" :data-button-close-block-id="block.id" v-on:click.prevent="closeBlock(block, index_block)"><b><i>{{ $t('Cancel') }}</i></b></a>
                        <a class="preview-buttons__button" href="javascript:void(0);" v-on:click.prevent="delBlock([index_group, block.id])" style="margin-left: 8px;"><i class="icon16 delete"></i><b><i>{{ $t('Delete') }}</i></b></a>
                    </div>
                </div>
                <div class="popup-block__body">
                    <div class="popup-block__fields">
                        <component :block="block" v-bind:is="block.component" :main="main" :index_group="index_group" :index_block="index_block" :card="getSettings['routes'][getSettings.selected_route]['selected_card_group']" :route="getSettings['selected_route']" :card_id="card_id" :block_id="block.id"></component>
                    </div>
                </div>
            </div>
            <span class="popup-block__desc animated pulse infinite" style="animation-duration: 2s;" v-if="(block.component == 'c-container' || block.component == 'c-row' || block.component == 'c-column') && block.blocks.length == 0">&rarr; {{ $t('Drag blocks here') }} &larr;</span>
            <block v-if="block.blocks" :blocks="block.blocks" :index_group="index_group" :main="main" :card_id="card_id"></block>
        </div>
    </draggable>
</template>

<script>
    import container from '../blocks/parts/Container.vue'
    import column from '../blocks/parts/Column.vue'
    import row from '../blocks/parts/Row.vue'
    import html from '../blocks/parts/Html.vue'
    import text from '../blocks/parts/Text.vue'
    import form from '../blocks/parts/Form.vue'
    import image from '../blocks/parts/Image.vue'
    import video from '../blocks/parts/Video.vue'
    import button from '../blocks/parts/Button.vue'
    import timer from '../blocks/parts/Timer.vue'
    import hr from '../blocks/parts/Hr.vue'
    import closeIcon from '../blocks/parts/CloseIcon.vue'
    import draggable from 'vuedraggable'
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'block',
        props: ['blocks', 'index_group', 'main', 'card_id'],
        data () {
            return {
                drag: false,
            }
        },
        components: {
            'c-html': html,
            'c-text': text,
            'c-container': container,
            'c-form': form,
            'c-image': image,
            'c-video': video,
            'c-button': button,
            'c-timer': timer,
            'c-hr': hr,
            'c-close-icon': closeIcon,
            'c-column': column,
            'c-row': row,
            draggable,
        },

        methods: {
            openBlock(block, index_block) {
                this.changeDisabledDragBlock(true)
                let version = Number(block['version'])
                version += 1
                block['version'] = version
                //const block_id = block['id']
                const ref_key = 'content-block-' + block['id']
                //const selector_content_block = '[data-content-block-id="' + block_id + '"]'

                this.$refs[ref_key][0].classList.add('edit')
            },

            closeBlock(block, index_block) {
                this.changeDisabledDragBlock(false)
                //const block_id = block['id']
                const ref_key = 'content-block-' + block['id']
                //const selector_content_block = '[data-content-block-id="' + block_id + '"]'

                this.$refs[ref_key][0].classList.remove('edit')
            },

            ...mapMutations(['delBlock', 'updateSettings', 'changeDisabledDragBlock']),
        },

        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    ghostClass: "ghost"
                };
            },

            ...mapGetters(['getSettings', 'getDisabledDragBlock'])
        },

        mounted() {
            const locale = document.querySelector('#app-locale').value.slice(0, 2)
            this.$i18n.locale = locale
        }
    }
</script>

<style scoped>
    .popup-block .popup-block-wrap {
        width: 92%;
        margin: 0 auto;
    }

    .popup-block {
        margin-bottom: 10px;
    }

    .popup-block:last-child {
        margin-bottom: 0;
    }

    [data-component="c-container"] > div, 
    [data-component="c-column"] > div,
    [data-component="c-row"] > div {
        margin-bottom: 10px;
    }

    .popup-block__desc {
        display: block;
        margin-bottom: 10px;
        text-align: center;
        color: #888;
        font-size: 12px;
    }

    .popup-block__name {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        color: #888;
        font-size: 12px;;
    }

    .popup-block__content {
        position: relative;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .popup-block__preview {
        width: 100%;
        cursor: pointer;
    }

    .popup-block__body {
        padding: 25px;
        display: none;
    }

    .preview-buttons__button_cancel {
        display: none;
    }

    .popup-block__content.edit {
        height: auto;
    }

    .popup-block__content.edit .preview-buttons__button_open {
        display: none;
    }

    .popup-block__content.edit .preview-buttons__button_cancel {
        display: inline-block;
    }

    .popup-block__content.edit .popup-block__body {
        display: block;
    }

    .popup-block__sort {
        display: inline-block;
        vertical-align: middle;
    }
</style>

<style>
    .popup-block__description {
        font-size: 14px;
    }

    .preview-buttons {
        display: inline-block;
        float: right;
        position: relative;
        top: 1px;
        white-space: nowrap;
    }

    .preview-buttons__button {
        color: #03c;
        outline: 0 none;
    }

    .preview-buttons__button b {
        border-bottom: 1px dotted;
        font-weight: normal;
        position: relative;
        top: -0.13em;
        vertical-align: middle;
    }

    .preview-buttons__button i {
        font-style: normal;
        position: relative;
        top: 0.13em;
    }

    .block-fields {
        overflow: hidden;
    }
</style>