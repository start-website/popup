<i18n src="../locales/common.json"></i18n>

<template>
    <div class="card__content">
        <div class="card__tab-description">
            <p>{{ $t('Fill out the informational content of the pop-up.') }}</p>
        </div>

        <div class="card__fields">
            <div class="card__fields-group">
                <h4>{{ $t('Main') }}</h4>
                <div class="card__block">
                    <div class="field">
                        <div class="name">
                            {{ $t('Name') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="text" class="input-fluid" v-model="main['name']">
                            </label>
                            <div class="hint">{{ $t('Popup name.') }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('Type') }}
                        </div>
                        <div class="value">
                            <label>
                                <select v-model="main['type']">
                                    <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                    <option value="popup">Popup</option>
                                    <option value="toast">Toast</option>
                                    <option value="banner">Banner</option>
                                </select>
                            </label>
                            <div class="hint">{{ $t('Popup type.') }}</div>
                            <div class="hint">{{ $t('Popup - Modal window with background dimming and scroll lock.') }}</div>
                            <div class="hint">{{ $t('Toast - Modal window without background dimming and without scroll lock.') }}</div>
                            <div class="hint">{{ $t('Banner - Content block embedded on website pages.') }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('device') }}
                        </div>
                        <div class="value">
                            <label>
                                <select v-model="main['device']">
                                    <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                    <option value="desktop">{{ $t('Desktop') }}</option>
                                    <option value="mobile">{{ $t('Mobile') }}</option>
                                </select>
                            </label>
                            <div class="hint">{{ $t('The size of the device for which you are setting up the pop-up.') }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card__fields-group">
                <h4>{{ $t('Modal window styles for') }} {{ device }}</h4>
                <div class="card__block">
                    <div class="field" v-if="main['type'].match(/popup|toast/) && device === 'mobile'">
                        <div class="name">
                            {{ $t('Variant') }}
                        </div>
                        <div class="value">
                            <label>
                                <select v-model="modal['style'][device]['variant']">
                                    <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </label>
                            <div class="hint">{{ $t('Modal window design option.') }}</div>
                        </div>
                    </div>
                    <div class="field" v-if="main['type'].match(/popup|toast/)">
                        <div class="name">
                            {{ $t('Animation when popup opens') }}
                        </div>
                        <div class="value">
                            <label>
                                <select v-model="modal['style'][device]['effect_open']">
                                    <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                    <option value="none">none</option>
                                    <option value="bounceIn">bounceIn</option>
                                    <option value="fadeIn">fadeIn</option>
                                    <option value="backInDown">backInDown</option>
                                    <option value="backInLeft">backInLeft</option>
                                    <option value="backInRight">backInRight</option>
                                    <option value="bounceInDown">bounceInDown</option>
                                    <option value="bounceInLeft">bounceInLeft</option>
                                    <option value="bounceInRight">bounceInRight</option>
                                    <option value="bounceInUp">bounceInUp</option>
                                    <option value="backInDown">backInDown</option>
                                    <option value="fadeInDown">fadeInDown</option>
                                    <option value="fadeInLeft">fadeInLeft</option>
                                    <option value="fadeInRight">fadeInRight</option>
                                    <option value="fadeInTopLeft">fadeInTopLeft</option>
                                    <option value="fadeInTopRight">fadeInTopRight</option>
                                    <option value="fadeInBottomLeft">fadeInBottomLeft</option>
                                    <option value="fadeInBottomRight">fadeInBottomRight</option>
                                    <option value="slideInDown">slideInDown</option>
                                    <option value="slideInLeft">slideInLeft</option>
                                    <option value="slideInRight">slideInRight</option>
                                    <option value="slideInTopLeft">slideInTopLeft</option>
                                    <option value="slideInTopRight">slideInTopRight</option>
                                    <option value="slideInBottomLeft">slideInBottomLeft</option>
                                    <option value="slideInBottomRight">slideInBottomRight</option>
                                    <option value="slideInUp">slideInUp</option>
                                    <option value="zoomIn">zoomIn</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div class="field" v-if="main['type'].match(/popup|toast/)">
                        <div class="name">
                            {{ $t('Popup closing animation') }}
                        </div>
                        <div class="value">
                            <label>
                                <select v-model="modal['style'][device]['effect_close']">
                                    <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                    <option value="none">none</option>
                                    <option value="fadeOut">fadeOut</option>
                                    <option value="backOutDown">backOutDown</option>
                                    <option value="backOutLeft">backOutLeft</option>
                                    <option value="backOutRight">backOutRight</option>
                                    <option value="bounceOut">bounceOut</option>
                                    <option value="bounceOutDown">bounceOutDown</option>
                                    <option value="bounceOutLeft">bounceOutLeft</option>
                                    <option value="bounceOutRight">bounceOutRight</option>
                                    <option value="bounceOutUp">bounceOutUp</option>
                                    <option value="backOutUp">backOutUp</option>
                                    <option value="fadeOutDown">fadeOutDown</option>
                                    <option value="fadeOutLeft">fadeOutLeft</option>
                                    <option value="fadeOutRight">fadeOutRight</option>
                                    <option value="fadeOutTopLeft">fadeOutTopLeft</option>
                                    <option value="fadeOutTopRight">fadeOutTopRight</option>
                                    <option value="fadeOutBottomLeft">fadeOutBottomLeft</option>
                                    <option value="fadeOutBottomRight">fadeOutBottomRight</option>
                                    <option value="fadeOutDown">fadeOutDown</option>
                                    <option value="slideOutUp">slideOutUp</option>
                                    <option value="slideOutLeft">slideOutLeft</option>
                                    <option value="slideOutRight">slideOutRight</option>
                                    <option value="slideOutTopLeft">slideOutTopLeft</option>
                                    <option value="slideOutTopRight">slideOutTopRight</option>
                                    <option value="slideOutBottomLeft">slideOutBottomLeft</option>
                                    <option value="slideOutBottomRight">slideOutBottomRight</option>
                                    <option value="slideOutDown">slideOutDown</option>
                                    <option value="zoomOut">zoomOut</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('Width') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="number" min="0" v-model="modal['style'][device]['width']" placeholder="none">
                            </label>
                            <label>
                                <select v-model="modal['style'][device]['width_units']">
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                </select>
                            </label>
                            <div class="hint">{{ $t('Modal window width.') }}</div>
                            <div class="hint">{{ $t('To set the value to "none", delete the current value.') }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('Height') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="number" min="0" v-model="modal['style'][device]['height']" placeholder="none">
                            </label>
                            <label>
                                <select v-model="modal['style'][device]['height_units']">
                                    <option value="px">px</option>
                                    <option value="%">%</option>
                                </select>
                            </label>
                            <div class="hint">{{ $t('Modal window height.') }}</div>
                            <div class="hint">{{ $t('To set the value to "none", delete the current value.') }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('Rounding corners') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="number" min="0" v-model="modal['style'][device]['border_radius']"> (px)
                            </label>
                            <div class="hint">{{ $t('Rounding the corners of a modal window.') }}</div>
                        </div>
                    </div>
                    <div class="field" v-if="main['type'] == 'popup'">
                        <div class="name">
                            {{ $t('Background') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="text" v-model="modal['style'][device]['background']" placeholder="transparent">
                            </label>
                            <color-picker :device="device" :block="modal" :prop="'background'"></color-picker>
                            <div class="hint">{{ $t('Modal window background color.') }}</div>
                        </div>
                    </div>
                    <div class="field" v-if="main['type'].match(/popup|toast/) && modal['style'][device]['variant'] == 1 && device === 'mobile'">
                        <div class="name">
                            {{ $t('Decorative line color') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="text" v-model="modal['style'][device]['background_dialog_line']">
                            </label>
                            <color-picker :device="device" :block="modal" :prop="'background_dialog_line'"></color-picker>
                            <div class="hint">{{ $t('Modal window decorative line color on mobile devices.') }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('Color') }}
                        </div>
                        <div class="value">
                            <label>
                                <input type="text" v-model="modal['style'][device]['color']" placeholder="transparent">
                            </label>
                            <color-picker :device="device" :block="modal" :prop="'color'"></color-picker>
                            <div class="hint">{{ $t('Modal window color.') }}</div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            {{ $t('Position') }}
                        </div>
                        <div class="value">
                            <label>
                                <select v-model="modal['style'][device]['position']">
                                    <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                    <option v-if="main['type'] !== 'banner'" value="center">Center</option>
                                    <option v-if="main['type'] !== 'banner'" value="top">Top</option>
                                    <option v-if="main['type'] !== 'banner'" value="left">Left</option>
                                    <option v-if="main['type'] !== 'banner'" value="right">Right</option>
                                    <option v-if="main['type'] !== 'banner'" value="bottom">Bottom</option>
                                    <option v-if="main['type'] !== 'banner'" value="top-left">Top-left</option>
                                    <option v-if="main['type'] !== 'banner'" value="top-right">Top-right</option>
                                    <option v-if="main['type'] !== 'banner'" value="bottom-left">Bottom-left</option>
                                    <option v-if="main['type'] !== 'banner'" value="bottom-right">Bottom-right</option>
                                    <option v-if="main['type'] === 'banner'" value="above-site">Above site</option>
                                    <option v-if="main['type'] === 'banner'" value="under-site">Under the site</option>
                                    <option v-if="main['type'] === 'banner'" value="helper">In the helper</option>
                                </select>
                            </label>
                            <div class="hint">{{ $t('Pop-up position on the site.') }}</div>
                        </div>
                    </div>

                    <div class="field" v-if="main['type'].match(/popup|toast/)">
                        <div class="name">
                            {{ $t('Margins') }} (px)
                        </div>
                        <div class="value">
                            <div class="value-item db-inline">
                                <label>
                                    <input type="number" class="input-small" placeholder="auto" v-model="modal['style'][main.device]['indent_top']">
                                </label>
                                <div class="hint">{{ $t('Top') }}</div>
                            </div>
                            <div class="value-item db-inline">
                                <label>
                                    <input type="number" class="input-small" placeholder="auto" v-model="modal['style'][main.device]['indent_right']">
                                </label>
                                <div class="hint">{{ $t('Right') }}</div>
                            </div>
                            <div class="value-item db-inline">
                                <label>
                                    <input type="number" class="input-small" placeholder="auto" v-model="modal['style'][main.device]['indent_bottom']">
                                </label>
                                <div class="hint">{{ $t('Bottom') }}</div>
                            </div>
                            <div class="value-item db-inline">
                                <label>
                                    <input type="number" class="input-small" placeholder="auto" v-model="modal['style'][main.device]['indent_left']">
                                </label>
                                <div class="hint">{{ $t('Left') }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="field" v-if="main['type'] == 'banner' && modal['style'][device]['position'] == 'helper'">
                        <div class="name">
                            {{ $t('Output helper') }}
                        </div>
                        <div class="value">
                            <div class="app-message" v-if="getSettings.selected_route !== 'fdd6b6832a6c9efb1b493e941a89f568'">
                                {if $wa->popup && $wa->app() === '{{ getSettings['routes'][getSettings.selected_route]['showcase_info']['app'] }}'} <br>
                                &nbsp;&nbsp; {$wa->popup->output('{{ card_id }}')} <br>
                                {/if}
                            </div>
                            <div class="app-message" v-else>
                                {if $wa->popup} <br>
                                &nbsp;&nbsp; {$wa->popup->output('{{ card_id }}')} <br>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <div class="name">
                            CSS
                        </div>
                        <div class="value">
                            <label>
                                <textarea v-model="modal['style'][device]['css']"></textarea>
                            </label>
                            <div class="hint">{{ $t('Additional CSS styles for pop-ups.') }}</div>
                            <div class="hint"><css-instructions></css-instructions></div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="card__fields-group">
                <h4>{{ $t('Blocks') }}</h4>
                <div class="card__block">
                    <div class="card__blocks-list-names-wrapper">
                        <p class="card__blocks-list-names-heading">{{ $t('Structural') }}</p>
                        <ul class="card__blocks-list-names">
                            <li class="card__blocks-list-names-item" :title="$t('A structural element that limits the size of blocks and centers the blocks')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-container', index_group])">{{ $t('CONTAINER') }}</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Structural element for aligning blocks in one row')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-row', index_group])">{{ $t('ROW') }}</a></li>
                        </ul>
                    </div>
                    
                    <div class="card__blocks-list-names-wrapper">
                        <p class="card__blocks-list-names-heading">{{ $t('Content') }}</p>
                        <ul class="card__blocks-list-names">
                            <li class="card__blocks-list-names-item" :title="$t('Text editor')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-text', index_group])">{{ $t('TEXT') }}</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Form for data exchange between user and server')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-form', index_group])">{{ $t('FORM') }}</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Image')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-image', index_group])">{{ $t('IMAGE') }}</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Video')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-video', index_group])">{{ $t('VIDEO') }}</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Button')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-button', index_group])">{{ $t('BUTTON') }}</a></li>
                            <li v-if="getSettings['is_premium']" class="card__blocks-list-names-item" :title="$t('Countdown timer')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-timer', index_group])">{{ $t('TIMER') }}</a></li>
                            <li v-else class="card__blocks-list-names-item" :title="$t('Available only to premium license holders.')" style="opacity: 0.5;"><a href="javascript:void(0);">{{ $t('TIMER') }}</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Pure html code')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-html', index_group])">HTML</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Demarcation line')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-hr', index_group])">HR</a></li>
                            <li class="card__blocks-list-names-item" :title="$t('Popup close icon')"><a href="javascript:void(0);" v-on:click.prevent="addBlock(['c-close-icon', index_group])">{{ $t('CLOSE (Icon)') }}</a></li>
                        </ul>
                    </div>

                    <div class="blocks-list" v-if="blocks && blocks.length > 0">
                        <block :blocks="blocks" :index_group="index_group" :card_id="card_id" :main="main"></block>
                    </div>
                </div>
            </div>

        </div>
        <c-view :index_group="index_group" :blocks="blocks" :modal="modal" :main="main"></c-view>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { block, colorPicker, CssInstructions } from '../../blocks'
import ViewPopup from '../../Modules/parts/ViewPopup.vue'

export default {
    name: 'content',
    props: ['modal', 'main', 'device', 'card_id', 'index_group', 'blocks'],

    data() {
        return {
            popup_css_instructions_version: 0,
            is_show_popup_css_instructions: false,
        }
    },

    components: {
        'color-picker': colorPicker,
        block,
        'c-view': ViewPopup,
        'css-instructions': CssInstructions
    },

    methods: {
        ...mapMutations(['delPopup', 'toggleAddPopupButton', 'addBlock']),
    },


    computed: {
        ...mapGetters(['getSettings'])
    },

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    },
}
</script>