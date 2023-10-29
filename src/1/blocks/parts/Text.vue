<i18n src="../locales/common.json"></i18n>

<template>
	<div class="popup-block__inner">
		<div class="html-template" ref="html-template" style="display: none;">
			<c-template-html :block="block" :main="main"></c-template-html>
		</div>

		<div class="popup-block__description">
			<p>{{ $t('Text editor') }}</p>
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

		<div class="field" style="margin: 30px 0;">
			<el-tiptap v-model="block['content']" :extensions="extensions" lang="ru"></el-tiptap>
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
import ElementUI from 'element-ui'
import { ElementTiptap } from 'element-tiptap';
import codemirror from 'codemirror'
import templateHtml from './templates/text/Html.vue'
import templateStyle from './templates/text/Style.vue'

import 'codemirror/lib/codemirror.css'; // import base style
import 'codemirror/mode/xml/xml.js'; // language

import {
	Doc,
	Text,
	Paragraph,
	Heading,
	Bold,
	Underline,
	Italic,
	Strike,
	ListItem,
	BulletList,
	OrderedList,
	Link,
	CodeBlock,
	TextColor,
	Blockquote,
	TodoItem,
	TodoList,
	TextAlign,
	Indent,
	LineHeight,
	HorizontalRule,
	HardBreak,
	TrailingNode,
	History,
	Table,
	TableHeader,
	TableCell,
	TableRow,
	FormatClear,
	TextHighlight,
	Preview,
	Print,
	Fullscreen,
	SelectAll,
	FontType,
	FontSize,
	CodeView,
} from "element-tiptap";

export default {
	props: [
		"block",
		"route",
		"card",
		"index_group",
		"index_block",
		"card_id",
		"block_id",
		"main",
	],
	name: "text",
	components: {
		"el-tiptap": ElementTiptap,
		'c-template-html': templateHtml,
		'c-template-style': templateStyle,
	},
	data() {
		// editor extensions
		// they will be added to menubar and bubble menu by the order you declare.
		return {
			html: this.block['frontend']['html'],
			extensions: [
				new Doc(),
				new Text(),
				new Paragraph(),
				new Heading({ level: 5 }),
				new Bold(),
				new FontSize(),
				new FontType(),
				new TextColor(),
				new TextAlign(),
				new Underline(), 
				new Italic(),
				new Strike(),
				new ListItem(),
				new BulletList(),
				new OrderedList(),
				new Link(),
				new CodeBlock(),
				new Blockquote(),
				new TodoItem(),
				new TodoList(),
				new Indent(),
				new LineHeight(),
				new HorizontalRule(),
				new HardBreak(),
				new TrailingNode(),
				new History(),
				new Table(),
				new TableHeader(),
				new TableCell(),
				new TableRow(),
				new FormatClear(),
				new TextHighlight(),
				new Preview(),
				new Fullscreen(),
				new SelectAll(),
				new CodeView({
					codemirror: codemirror,
					codemirrorOptions: {
						lineNumbers: true,
						lineWrapping: true,
						tabSize: 2,
						tabMode: 'indent',
						mode: 'text/html',
					}
				})
			],
			// editor's content
			content: `
				<h1>Heading</h1>
				<p>This Editor is awesome!</p>
			`,
		}
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
};
</script>
