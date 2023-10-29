<i18n src="../locales/common.json"></i18n>

<template>
    <div class="popup-block__inner">
        <div class="html-template" ref="html-template" style="display: none;">
            <c-template-html :block="block" :main="main"></c-template-html>
        </div>

        <div class="popup-block__description">
			<p>{{ $t('Form for data exchange between user and server') }}</p>
		</div>

        <h4>{{ $t('Email settings') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Email address for notifications') }}</div>
                <div class="value">
                    <label>
                        <input type="text" placeholder="your@email" v-model="block['params']['email']['to']">
                    </label>
                    <div class="hint">{{ $t('The main administrator email address to which system notifications will be sent.') }}</div>
                </div>
            </div>

            <div class="field">
                <div class="name">{{ $t('Sender\'s email address') }}</div>
                <div class="value">
                    <label>
                        <input type="text" placeholder="noreply@email" v-model="block['params']['email']['from']">
                    </label>
                    <div class="hint">{{ $t('This email address will be indicated as the return address in system email notifications sent by Webasyst.') }}</div>
                    <div class="hint">{{ $t('By default, letters are sent via the "mail" function; to send a letter via "Sendmail" or "SMTP" this address must match the sender\'s address specified in the Webasyst settings.') }}</div>
                </div>
            </div>

            <div class="field">
                <div class="name">
                    <div class="name">{{ $t('Email Subject') }}</div>
                </div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['email']['subject']">
                    </label>
                </div>
            </div>

            <div class="field">
                <div class="name">
                    <div class="name">{{ $t('Email sender name') }}</div>
                </div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['email']['name']">
                    </label>
                </div>
            </div>

            <div class="field" v-if="false">
                <div class="name">Transport</div>
                <div class="value">
                    <label>
                        <select v-model="block['params']['email']['transport']">
                            <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                            <option value="mail" selected="">PHP-функция mail()</option>
                            <option value="smtp">SMTP</option>
                            <option value="sendmail">Sendmail</option>
                        </select>
                    </label>
                    <div class="hint">A special server designed to send e-mail. Messages can be sent through any SMTP server, to which you have its address, port number, username (login) and password to connect to. This can be the SMTP server of your hosting provider or a public mail service: Mail.ru, Gmail, etc.</div>
                </div>
            </div>

            <div class="field" v-if="block['params']['email']['transport'] == 'mail' && false">
                <div class="name">Options</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['params_function']" placeholder="-f%s">
                    </label>
                </div>
            </div>

            <div class="field" v-if="block['params']['email']['transport'] == 'smtp' && false">
                <div class="name">Server</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['server']">
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['transport'] == 'smtp' && false">
                <div class="name">Port</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['port']" placeholder="25">
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['transport'] == 'smtp' && false">
                <div class="name">Login</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['login']">
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['transport'] == 'smtp' && false">
                <div class="name">Password</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['password']">
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['transport'] == 'smtp' && false">
                <div class="name">Encryption</div>
                <div class="value">
                    <label>
                        <select v-model="block['params']['email']['encryption']">
                            <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                            <option value="no">No</option>
                            <option value="ssl">SSL/TLS</option>
                            <option value="tls">STARTTLS</option>
                        </select>
                    </label>
                </div>
            </div>

            <div class="field" v-if="block['params']['email']['transport'] == 'sendmail' && false">
                <div class="name">Command</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['command']" placeholder="/usr/sbin/sendmail -bs">
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

        <h4>{{ $t('Response form') }}</h4>
        <div class="block-fields">
            <div class="field">
                <div class="name">{{ $t('Action') }}</div>
                <div class="value">
                    <label>
                        <select v-model="block['params']['email']['action']" style="width: 100%;">
                            <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                            <option value="response">{{ $t('Response') }}</option>
                            <option value="close">{{ $t('Close') }}</option>
                            <option value="follow_link">{{ $t('Follow the link') }}</option>
                            <option v-if="getSettings['is_premium']" value="open-popup">{{ $t('Open another popup') }}</option>
                            <option v-else value="open-popup" disabled>{{ $t('Open another popup') }}. ({{ $t('Available only to premium license holders.') }})</option>
                        </select>
                    </label>
                    <div class="hint">{{ $t('Choose what to do after submitting the form.') }}</div>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['action'] === 'response'">
                <div class="name">{{ $t('Reply text') }}</div>
                <div class="value">
                    <label>
                        <textarea v-model="block['params']['email']['response']"></textarea>
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['action'] === 'open-popup'">
                <div class="name">{{ $t('ID popup to open') }}</div>
                <div class="value">
                    <label>
                        <input type="text" v-model="block['params']['email']['open_popup']">
                    </label>
                </div>
            </div>
            <div class="field" v-if="block['params']['email']['action'] === 'follow_link'">
                <div class="name">{{ $t('Link to go') }}</div>
                <div class="value">
                    <label>
                        <input type="text" class="input-fluid" v-model="block['params']['email']['link_to_go']">
                    </label>
                </div>
            </div>

        </div>
            
        <h4>{{ $t('Form fields') }}</h4>
        <div class="block-fields">
            <div class="component-form-header">
                <div class="component-form-header__item component-form-header__item_first">&nbsp;</div>
                <div class="component-form-header__item">
                    <div class="component-form-header__title">{{ $t('Type') }}</div>
                </div>
                <div class="component-form-header__item">
                    <div class="component-form-header__title">{{ $t('Name') }}</div>
                </div>
                <div class="component-form-header__item">
                    <div class="component-form-header__title">{{ $t('Value') }}</div>
                </div>
                <div class="component-form-header__item">
                    <div class="component-form-header__title">{{ $t('Required') }}</div>
                </div>

                <div class="component-form-header__item">&nbsp;</div>
            </div>

            <draggable 
                :list="block['content']"
                @start="drag = true"
                @end="drag = false"
                v-bind="dragOptions"
                :group="{ name: 'g1' }"
                tag="div"
                class="component-form"
                :disabled="getDisabledDragFormField"
            >
                <div class="component-form__field" v-for="(item, index) in block['content']" :ref="'form-field-' + item['id']" :key="item['id']">
                    <div class="component-form__field-preview">
                        <div class="component-form__field-preview-item component-form__field-preview-item_first">
                            <i class="icon16 sort"></i>
                        </div>
                        <div class="component-form__field-preview-item">
                            <span v-if="item && item['type']">{{ item['type'] }}</span>
                        </div>
                        <div class="component-form__field-preview-item">
                            <span v-if="item && item['name']">{{ item['name'] }}</span>
                        </div>
                        <div class="component-form__field-preview-item">
                            <span  v-if="item && item['default_value']">{{ item['default_value'] }}</span>
                        </div>
                        <div class="component-form__field-preview-item">
                            <span v-if="item && item['attributes']['required']">{{ item['attributes']['required'] }}</span>
                        </div>
                        <div class="component-form__field-preview-item">
                            <div class="preview-buttons">
                                <a class="preview-buttons__button preview-buttons__button_open" href="javascript:void(0);" v-on:click.prevent="openComponentFormField(item)"><i class="icon16 edit"></i><b><i>{{ $t('Edit') }}</i></b></a>
                                <a class="preview-buttons__button preview-buttons__button_close" href="javascript:void(0);" v-on:click.prevent="closeComponentFormField(item)"><b><i>{{ $t('Cancel') }}</i></b></a>
                                <a class="preview-buttons__button" href="javascript:void(0);" style="margin-left: 8px;" v-on:click.prevent="delFormField(index)"><i class="icon16 delete"></i><b><i>{{ $t('Delete') }}</i></b></a>
                            </div>
                        </div>
                    </div>
                    <div class="component-form__field-body">
                        <h6>{{ $t('Style for') }} {{ main.device }}</h6>
                        <div class="component-form__fields-input">
                            <div v-if="item" class="component-form__field-input-wrap">
                                <div class="component-form__field-heading">{{ $t('Field position') }}</div>
                                <label>
                                    <select v-model="item['style'][main.device]['field_position']">
                                        <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                                        <option value="row">{{ $t('Row') }}</option>
                                        <option value="column">{{ $t('Column') }}</option>
                                    </select>
                                </label>
                                <div class="hint">{{ $t('Choose how to arrange the form field in a row or column') }}</div>
                            </div>

                            <div v-if="item" class="component-form__field-input-wrap">
                                <div class="component-form__field-heading">{{ $t('Width') }}</div>
                                <label>
                                   <input type="text" v-model="item['style'][main.device]['width']"> 
                                </label>
                                <label>
                                    <select v-model="item['style'][main.device]['width_units']">
                                        <option value="px">px</option>
                                        <option value="%">%</option>
                                    </select>
                                </label>
                            </div>

                            <div v-if="item" class="component-form__field-input-wrap">
                                <div class="component-form__field-heading">{{ $t('Margins') }} (px)</div>
                                <div class="value">
                                    <div class="value-item db-inline">
                                        <label>
                                            <input min="0" type="number" class="input-small" placeholder="auto" v-model="item['style'][main.device]['margin_top']">
                                        </label>
                                        <div class="hint">{{ $t('Top') }}</div>
                                    </div>
                                    <div class="value-item db-inline">
                                        <label>
                                            <input min="0" type="number" class="input-small" placeholder="auto" v-model="item['style'][main.device]['margin_right']">
                                        </label>
                                        <div class="hint">{{ $t('Right') }}</div>
                                    </div>
                                    <div class="value-item db-inline">
                                        <label>
                                            <input min="0" type="number" class="input-small" placeholder="auto" v-model="item['style'][main.device]['margin_bottom']">
                                        </label>
                                        <div class="hint">{{ $t('Bottom') }}</div>
                                    </div>
                                    <div class="value-item db-inline">
                                        <label>
                                            <input min="0" type="number" class="input-small" placeholder="auto" v-model="item['style'][main.device]['margin_left']">
                                        </label>
                                        <div class="hint">{{ $t('Left') }}</div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="item && item['type'] && item['type'] === 'button'" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Background color') }}</label>
                                <input type="text" v-model="item['style'][main.device]['background_color']">
                                <color-picker :device="main.device" :block="item" :prop="'background_color'"></color-picker>
                            </div>

                            <div v-if="item && item['type'] && item['type'] === 'button'" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Text color') }}</label>
                                <input type="text" v-model="item['style'][main.device]['color']">
                                <color-picker :device="main.device" :block="item" :prop="'color'"></color-picker>
                            </div>

                        </div>

                        <h6>{{ $t('Content') }}</h6>
                        <div class="component-form__fields-input">
                            <div v-if="item && item['type'] && item['type'].match(/text|number|password|file|email|hidden|range|tel|time|date|color|select/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Label') }}</label>
                                <input type="text" v-model="item['label']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/text|number|password|file|email|hidden|range|tel|time|date|color|select|radio/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Name') }}</label>
                                <input type="text" v-model="item['name']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/text|number|password|file|email|hidden|range|tel|time|date|color/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Default value') }}</label>
                                <input type="text" v-model="item['default_value']">
                            </div>

                            <div v-if="item && item['type'] && item['type'] === 'button'" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Text button') }}</label>
                                <input type="text" v-model="item['text_button']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/text|number|password|email|tel|time|textarea/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Placeholder') }}</label>
                                <input type="text" v-model="item['placeholder']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/number|range/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Minimum') }}</label>
                                <input type="number" v-model="item['min']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/number|range/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Maximum') }}</label>
                                <input type="number" v-model="item['max']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/number|range/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Step') }}</label>
                                <input type="number" v-model="item['step']">
                            </div>

                            <div v-if="item && item['type'] && item['type'] === 'textarea'" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Minimum height') }} (px)</label>
                                <input type="number" v-model="item['min_height']">
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/radio|checkbox/)" class="component-form__field-input-wrap">
                                <label class="component-form__field-heading">{{ $t('Layout') }}</label>
                                <select v-model="item['layout']">
                                    <option value="block">{{ $t('Block') }}</option>
                                    <option value="inline">{{ $t('Inline') }}</option>
                                </select>
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/text|number|password|file|email|range|tel|time|date|color|select/)" class="component-form__field-input-wrap">
                                <div class="component-form__field-attributes">
                                    <div class="component-form__field-input-wrap component-form__field-input-wrap_small">
                                        <div class="component-form__field-heading_small">{{ $t('Required') }}</div>
                                        <label><input type="checkbox" v-model="item['attributes']['required']"></label>
                                        
                                    </div>
                                    <div v-if="item && item['type'] && item['type'].match(/text|number|password|radio|file|email|range|tel|time|date|color/)" class="component-form__field-input-wrap component-form__field-input-wrap_small">
                                        <div class="component-form__field-heading_small">{{ $t('Disabled') }}</div>
                                        <label><input type="checkbox" v-model="item['attributes']['disabled']"></label>
                                    </div>
                                </div>
                            </div>

                            <div v-if="item && item['type'] && item['type'].match(/select|checkbox|radio/)" class="component-form__field-input-wrap">
                                <h6 style="margin-top: 20px;">{{ $t('Options') }}</h6>
                                <div class="component-form__options">
                                    <div v-for="(option, index_option) in item['options']" class="component-form__option" :key="index_option">
                                        <div class="component-form__option-field">
                                            <div class="component-form__option-name">{{ $t('Label') }}</div>
                                            <label><textarea v-model="option['label']"></textarea></label>
                                        </div>
                                        <div class="component-form__option-field" v-if="item && item['type'] && item['type'].match(/checkbox/)">
                                            <div class="component-form__option-name">{{ $t('Name') }}</div>
                                            <label><input type="text" v-model="option['name']"></label>
                                        </div>
                                        <div class="component-form__option-field">
                                            <div class="component-form__option-name">{{ $t('Value') }}</div>
                                            <label><input type="text" v-model="option['option']"></label>
                                        </div>
                                        <div class="component-form__option-field">
                                            <div class="component-form__option-name component-form__option-name_inline">{{ $t('Selected') }}</div>
                                            <label><input type="checkbox" v-model="option['checked']"></label>
                                        </div>
                                        <div class="component-form__option-field">
                                            <div class="component-form__option-name component-form__option-name_inline">{{ $t('Required') }}</div>
                                            <label><input type="checkbox" v-model="option['required']"></label>
                                        </div>
                                        <div class="component-form__option-field">
                                            <div class="component-form__option-name component-form__option-name_inline">{{ $t('Disabled') }}</div>
                                            <label><input type="checkbox" v-model="option['disabled']"></label>
                                        </div>
                                        <a class="component-form__button-del-option" href="#" v-on:click.prevent="delFormFieldOption(item['options'], index_option)"><i class="icon16 close"></i>{{ $t('Delete option') }}</a>
                                    </div>
                                </div>
                                <a class="component-form__button-add-option" href="#" v-on:click.prevent="addFormFieldOption(item['options'])"><i class="icon16 add"></i>{{ $t('Add option') }}</a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </draggable>

            <div class="component-form__item-add-wrap">
                <div class="block-fields__desc">{{ $t('Add form fields, detailed description of all fields') }} <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input" target="_blank">{{ $t('here') }}</a></div>
                <div class="component-form__item-add">
                    <select v-model="form_field">
                        <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                        <option :value="type" v-for="(type, index) in field_types" :key="index">{{ type }}</option>
                    </select>
                    <a href="#" v-on:click.prevent="addFormField"><i class="icon16 add"></i>{{ $t('Add') }}</a>
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
    import templateHtml from './templates/form/Html.vue'
    import templateStyle from './templates/form/Style.vue'
    import draggable from 'vuedraggable'
    import colorPicker from './elems/ColorPicker.vue'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'form',

        components: {
            'c-template-html': templateHtml,
            'c-template-style': templateStyle,
            draggable,
            'color-picker': colorPicker,
        },

        data () {
            return {
                field_types: ['text', 'textarea', 'select', 'number', 'password', 'checkbox', 'radio', 'email', 'hidden', 'range', 'tel', 'time', 'date', 'color', 'button'],
                form_field: '',
            }
        },
        methods: {
            addFormField() {
                if (!this.form_field) {
                    return
                }

                if (!this.block['content']) {
                    this.block['content'] = []
                }

                const data = {
                    type: this.form_field,
                    id: this.getUniqFormFieldID(this.block['content']),
                    attributes: {},
                    layout: 'block',
                    style: {
                        mobile: {
                            position: '',
                            'field_position': 'column'
                        },
                        desktop: {
                            position: '',
                            'field_position': 'column'
                        }
                    },
                    options: [{option: ''}],
                }

                this.block['content'].push(data)
            },

            delFormField(index) {
                this.block['content'].splice(index, 1)
            },

            addFormFieldOption(options) {
                options.push({options: ''})
            },

            delFormFieldOption(options, index_option) {
                options.splice(index_option, 1)
            },

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

            openComponentFormField(item) {
                this.changeDisabledDragFormField(true)
                const ref_key = 'form-field-' + item['id']
                this.$refs[ref_key][0].classList.add('edit')

                // const selector_field = '[data-form-field-id="' + item['id'] + '"]'
                // document.querySelector(selector_field).classList.add('edit')
            },

            closeComponentFormField(item) {
                this.changeDisabledDragFormField(false)
                const ref_key = 'form-field-' + item['id']
                this.$refs[ref_key][0].classList.remove('edit')

                // const selector_field = '[data-form-field-id="' + item['id'] + '"]'
                // document.querySelector(selector_field).classList.remove('edit')
            },

            getUniqFormFieldID(arr) {
                let id = 'field' + Math.floor(Math.random() * 1000000000)
                let uniq = true

                function checkUniq(array) {
                    for (let i = 0; i < array.length; i++) {
                        const item = array[i]

                        if (item.id == id) {
                            uniq = false
                            return
                        }
                    }
                }
                
                checkUniq(arr)

                if (!uniq) {
                    return this.getUniqFormFieldID(arr)
                }

                return id
            },


            ...mapMutations(['changeDisabledDragFormField']),
        },

        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            },

            ...mapGetters(['getDisabledDragFormField', 'getSettings'])
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

<style scoped>
    .component-form__field {
        margin: 0 auto;
        border-radius: 1px;
        width: 99.9%;
    }
    .component-form__field-input-wrap {
        margin-bottom: 10px;
    }
    .component-form__field-input-wrap_small {
        margin-bottom: 3px;
    }
    .component-form__field-heading {
        margin-bottom: 5px;
        display: block;
        color: #888;
        font-size: 14px;
    }

    .component-form-header {
        display: flex;
        width: 100%;
    }

    .component-form-header__item {
        text-align: left;
        padding: 2px 5px;
        border-bottom: 1px solid #BBBBBB;
        font-weight: normal;
        color: #777;
        background: linear-gradient(rgb(245,245,245),rgb(221,221,221));
        word-spacing: normal;
        width: 100%;
    }

    .component-form-header__item_first {
        width: 25%;
    }

    .component-form__field-preview {
        display: flex;
        padding: 10px;
    }

    .component-form__field-preview:hover {
        background-color: #ffffe5 !important;
    }

    .component-form__field-preview-item {
        width: 100%;
    }

    .component-form__field:nth-child(odd) .component-form__field-preview {
        background-color: #f2f7ff;
    }

    .component-form__field-preview-item_first {
        width: 25%;
        cursor: grab;
    }

    .component-form__field-body {
        padding: 10px;
        display: none;
        border-bottom: 1px solid #BBBBBB;
    }

    .preview-buttons__button_close {
        display: none;
    }

    .component-form__field.edit .component-form__field-body {
        display: block;
    }

    .component-form__field.edit .preview-buttons__button_open {
        display: none;
    }

    .component-form__field.edit .preview-buttons__button_close {
        display: inline-block;
    }

    .component-form__field-heading_small {
        color: #888;
        font-size: 0.95em;
        display: inline-block;
    }
    .component-form__buttons-nav {
        margin-top: 20px;
    }
    .component-form__button-add-option {
        margin-top: 6px;
        display: block;
    }
    .component-form__button-del-option {
        margin-top: 12px;
        display: block;
    }
    .component-form__options {
        border: 1px solid lavender;
        border-radius: 4px;
        padding: 10px;
    }
    .component-form__option {
        margin-bottom: 15px;
        border-bottom: 1px solid lavender;
        padding-bottom: 10px;
    }
    .component-form__option-field {
        margin-bottom: 5px;
    }
    .component-form__option-name {
        font-size: 13px;
        color: #888;
        margin-bottom: 3px;
    }
    .component-form__option-name_inline {
        display: inline-block;
    }
    .component-form__item-add-wrap {
        background: rgb(240, 240, 240);
        padding: 20px;
        margin: 20px 0;
    }

    .component-form__option textarea {
        width: 100%;
        min-height: 50px;
        max-width: 100%;
    }

    .component-form__fields-input {
        padding: 10px 20px;
    }

    h6 {
        font-size: 14px;
    }
</style>

