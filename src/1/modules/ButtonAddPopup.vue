<i18n src="./locales/common.json"></i18n>

<template>
    <a href="javascript:void(0);" v-on:click.prevent="addPopup()" v-show="getIsShowAddPopupButton">
        <b><i><i class="icon16 add"></i>{{ $t('Add popup') }}</i></b>
    </a>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'button-add-popup',
    methods: mapMutations(['addPopup']),
    computed: mapGetters(['getSettings', 'getIsShowAddPopupButton']),

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    },
}
</script>