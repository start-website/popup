<i18n src="../locales/common.json"></i18n>

<template>
    <div class="popup-block__inner">
        
        <div class="popup-block__description">
			<p>{{ $t('Structural element for aligning blocks in one row') }}</p>
		</div>
        
        <div class="field">
            <div class="name">
                {{ $t('Axis direction') }}
            </div>
            <div class="value">
                <label>
                    <select v-model="block['style'][main.device]['axis_direction']">
                        <option value="" disabled>{{ $t('Choose one of the options') }}</option>
                        <option value="row">{{ $t('Row') }}</option>
                        <option value="column">{{ $t('Column') }}</option>
                        <option value="row-reverse">{{ $t('Row') }} (reverse)</option>
                        <option value="column-reverse">{{ $t('Column') }} (reverse)</option>
                    </select>
                </label>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        props: ['block', 'route', 'card', 'index_group', 'index_block', 'card_id', 'block_id', 'main'],
        name: 'row',

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

