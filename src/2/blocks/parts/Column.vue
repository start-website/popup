<i18n>
    {
        "en": {
            "margins": "Margins",
            "indents": "Indents"   
        },
        "ru": {
            "margins": "Внешние отступы",
            "indents": "Внутренние отступы"
        }
    }
</i18n>
<template>
    <div class="popup-block__inner">
        <div class="popup-block__description">
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, facere totam aut vel ea omnis voluptatum
				dicta officiis, maxime placeat quis molestias exercitationem nesciunt magni doloribus dolore. At, illum
				sunt!</p>
		</div>
        
        <div class="field">
            <div class="name">
                Horizontal alignment
            </div>
            <div class="value">
                <label>
                    <select v-model="block['style'][main.device]['horizontal_align']">
                        <option value="" disabled>Choose</option>
                        <option value="center">Pack items around the center</option>
                        <option value="start">Pack items from the start</option>
                        <option value="end">Pack items from the end</option>
                        <option value="flex-start">Pack flex items from the start</option>
                        <option value="flex-end">Pack flex items from the end</option>
                        <option value="left">Pack items from the left</option>
                        <option value="right">Pack items from the right</option>
                        <option value="normal">Normal alignment</option>
                        <option value="space-between">Distribute items evenly. The first item is flush with the start, the last is flush with the end</option>
                        <option value="space-around">Distribute items evenly. Start and end gaps are half the size of the space, between each item</option>
                        <option value="space-evenly">Distribute items evenly. Start, in-between, and end gaps have equal sizes</option>
                        <option value="stretch">Distribute items evenly. Stretch 'auto'-sized items to fit the containe</option>
                    </select>
                </label>
            </div>
        </div>

        <div class="field">
            <div class="name">
                Vertical alignment
            </div>
            <div class="value">
                <label>
                    <select v-model="block['style'][main.device]['vertical_align']">
                        <option value="" disabled>Choose</option>
                        <option value="center">Pack items around the center</option>
                        <option value="start">Pack items from the start</option>
                        <option value="end">Pack items from the end</option>
                        <option value="flex-start">Pack flex items from the start</option>
                        <option value="flex-end">Pack flex items from the end</option>
                        <option value="self-start">Pack flex items from the start</option>
                        <option value="self-end">Pack flex items from the end</option>
                        <option value="baseline">Baseline</option>
                        <option value="normal">Normal</option>
                    </select>
                </label>
            </div>
        </div>

        <div class="field">
            <div class="name">
                {{ $t('indents') }} (px)
            </div>
            <div class="value">
                <div class="value-item db-inline">
                    <label>
                        <input type="number" class="input-small" v-model="block['style'][main.device]['padding_top']">
                    </label>
                    <div class="hint">Top</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input type="number" class="input-small" v-model="block['style'][main.device]['padding_right']">
                    </label>
                    <div class="hint">right</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input type="number" class="input-small" v-model="block['style'][main.device]['padding_bottom']">
                    </label>
                    <div class="hint">bottom</div>
                </div>
                <div class="value-item db-inline">
                    <label>
                        <input type="number" class="input-small" v-model="block['style'][main.device]['padding_left']" placeholder="auto">
                    </label>
                    <div class="hint">left</div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'
    import colorPicker from './elems/ColorPicker.vue'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'column',

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
            this.$i18n.locale = this.getSettings['locale'];
        },
    }
</script>

