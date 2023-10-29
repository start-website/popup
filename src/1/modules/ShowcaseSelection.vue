<i18n src="./locales/common.json"></i18n>

<template>
    <div class="field">
        <div class="name">
            {{ $t('Showcase') }}
        </div>
        <div class="value">
            <label>
                <select v-model="getSettings.selected_route" style="width: 100%;">
                    <template v-for="(value, key) in getSettings.routes_list">
                        <option v-if="key === 'fdd6b6832a6c9efb1b493e941a89f568'" :value="key">{{ $t('All showcases') }}</option>
                        <option v-else :value="key">{{ value }}</option>
                    </template>
                </select>
            </label>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'showcase-selection',
    computed: mapGetters(['getSettings']),

    mounted() {
        this.$i18n.locale = this.getSettings['locale']
    },
}
</script>