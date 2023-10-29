<i18n src="./locales/common.json"></i18n>

<template>
    <div class="card" ref="card">
        <div class="card__preview">
            <span class="card__index">{{ index_group + 1 }}</span>
            <div class="card__preview-block">
                <div class="card__preview-item">
                    <h4 v-if="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index_group]['main']['name']" class="card__title card__title_name">{{ $t('Name') }}: <span class="card__title_font-normal">{{getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index_group]['main']['name']}}</span></h4>
                </div>
                <div class="card__preview-item">
                    <h4 class="card__title">{{ $t('Popup ID') }}: <span class="card__title_font-normal">{{ getSettings['routes'][getSettings.selected_route]['popup_card_groups'][selected_card][index_group]['id'] }}</span></h4>
                </div>
            </div>
            <div class="card__preview-block">
                <div class="card__preview-item">
                <a href="javascript:void(0);" class="card-button button-open-popup" v-on:click.prevent="openPopup"><i class="icon16 settings"></i><b><i>{{ $t('Settings') }}</i></b></a>
                </div>
                <hr>
                <div class="card__preview-item">
                    <a href="javascript:void(0);" class="card-button button-copy-popup" v-on:click.prevent="copyPopup(index_group)">
                        <b><i><i class="icon16 plus"></i>{{ $t('Copy') }}</i></b>
                    </a>
                </div>
                <div class="card__preview-item">
                    <a href="javascript:void(0);" class="card-button button-delele-popup" v-on:click.prevent="delPopup(index_group)">
                        <b><i><i class="icon16 no"></i>{{ $t('Delete') }}</i></b>
                    </a>
                </div>
            </div>
        </div>

        <div class="card__body">
            <span class="card__popup-id-body">ID: {{ getSettings['routes'][getSettings.selected_route]['popup_card_groups'][selected_card][index_group]['id'] }}</span>
            <div class="button-close">
                <a href="/webasyst/shop/marketing/" class="back nowrap button-close__popup" v-on:click.prevent="closePopup">←&nbsp;{{ $t('Back') }}</a>
            </div>
            <div class="card__description">
                <p>{{ $t('Three simple steps to launch a pop-up. Set up content, display conditions and activate.') }}</p>
            </div>
            <div class="card__settings">
                <div class="block">
                    <ul class="tabs card-tabs">
                        <li :class="main_tab_selected === 'content' ? 'selected' : ''"><a href="javascript:void(0);" v-on:click.prevent="switchMainTabs('content')">{{ $t('Content') }}</a></li>
                        <li :class="main_tab_selected === 'conditions' ? 'selected' : ''"><a href="javascript:void(0);" v-on:click.prevent="switchMainTabs('conditions')">{{ $t('Display conditions') }}</a></li>
                        <li :class="main_tab_selected === 'start' ? 'selected' : ''"><a href="javascript:void(0);" v-on:click.prevent="switchMainTabs('start')">{{ $t('Activation') }}</a></li>
                    </ul>
                    <div class="tab-content card__tab-content">
                        <div class="block card__tab-block" v-show="main_tab_selected === 'content'">
                            <c-content :main="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index_group]['main']" :modal="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index_group]['modal']" :device="device" :card_id="card_id" :index_group="index_group" :blocks="blocks"></c-content>
                        </div>
                        <div class="block card__tab-block" v-show="main_tab_selected === 'conditions'">
                            <c-conditions :conditions="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index_group]['conditions']"></c-conditions>
                        </div>
                        <div class="block card__tab-block" v-show="main_tab_selected === 'start'">
                            <c-start :conditions="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index_group]['conditions']"></c-start>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { colorPicker } from '../blocks'
import start from '../Modules/parts/Start.vue'
import content from '../Modules/parts/Content.vue'
import conditions from '../Modules/parts/Conditions.vue'

export default {
    props: ['index_group', 'blocks', 'card_id'],
    name: 'card',
    components: {
        'color-picker': colorPicker,
        'c-start': start,
        'c-content': content,
        'c-conditions': conditions
    },
    data() {
        return {
            main_tab_selected: 'content',
        }
    },
    methods: {
        openPopup() {
            this.changeDisabledDragCard(true)
            const cards = document.querySelectorAll('.card')
            const selected_card = this.$refs['card']

            for (let index = 0; index < cards.length; index++) {
                const card = cards[index];
                card.style.display = 'none'
            }

            selected_card.style.display = ''
            selected_card.classList.remove('close-card')
            selected_card.classList.add('open-card')
            this.changeShowAddPopupButton(false)
            this.changeOpenCardPopup(true)
        },

        closePopup() {
            this.changeDisabledDragCard(false)
            const cards = document.querySelectorAll('.card')
            const selected_card = this.$refs['card']

            for (let index = 0; index < cards.length; index++) {
                const card = cards[index];
                card.style.display = ''
            }

            selected_card.classList.add('close-card')
            selected_card.classList.remove('open-card')
            this.changeShowAddPopupButton(true)
            this.changeOpenCardPopup(false)
        },

        switchMainTabs(tab_name) {
            this.main_tab_selected = tab_name
        },

        ...mapMutations(['delPopup', 'copyPopup', 'toggleAddPopupButton', 'addBlock', 'changeDisabledDragCard', 'changeShowAddPopupButton', 'changeOpenCardPopup']),
    },
    computed: {
        selected_card() {
            return this.getSettings['routes'][this.getSettings.selected_route]['selected_card_group']
        },

        device() {
            return this.getSettings['routes'][this.getSettings.selected_route]['popup_card_groups'][this.getSettings['routes'][this.getSettings.selected_route]['selected_card_group']][this.index_group]['main']['device']
        },

        ...mapGetters(['getSettings', 'viewVersion', 'getDisabledDragCard']),
    },

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    },
}
</script>

<style scoped>
    .card {
        box-shadow: 0 3px 7px 0 rgba(0,0,0,0.2);
        display: inline-block;
        width: 250px;
        min-height: 150px;
        padding: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        transition: transform 0.2s ease-in-out;
        vertical-align: top;
    }

    .card__body {
        position: relative;
        display: none;
        width: 100%;
        height: 100%;
    }

    .card.open-card {
        width: 96%;
        height: 100%;
    }

    .card__preview {
        position: relative;
    }

    .card__preview:hover {
        cursor: grab;
    }

    .card__index {
        position: absolute;
        top: -16px;
        right: -15px;
        color: #888;
        font-size: 12px;
    }

    .card.open-card .card__preview {
        display: none;
    }

    .card.open-card .card__body {
        display: block;
    }

    .card__popup-id-body {
        position: absolute;
        right: 0;
        color: #888;
    }

    .card:last-child {
        margin-right: 0;
    }

    .card:hover {
        
    }

    .card-button {
        display: block;
        text-align: center;
    }

    .card__preview-block {
        margin-bottom: 25px;
    }

    .card__preview-block:last-child {
        margin-bottom: 0;
    }

    .card__preview-item {
        margin-bottom: 10px;
    }

    .button-copy-popup {
        margin-bottom: 0;
    }

    .button-close {
        margin-bottom: 20px;
    }
    .button-close-popup {
        display: inline-block;
        text-align: left;
    }

    .card__title {
        text-align: center;
        font-weight: bold;
        color: #000;
        font-size: 14px;
    }

    .card__title_name {
        margin: 0 0 10px;
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .card__title_font-normal {
        font-weight: normal;
    }
</style>

<style>
    .card__fields {
        padding: 10px;
        display: inline-block;
        width: 50%;
        vertical-align: top;
    }

    .card__fields-group {
        margin-bottom: 30px;
    }

    .card__description {
        color: #888;
    }

    .card__fields {
        padding: 10px;
        display: inline-block;
        width: 50%;
        box-sizing: border-box;
        vertical-align: top;
    }

    .card__fields-group {
        margin-bottom: 30px;
    }

    .card__blocks-list-names {
        padding: 0;
        margin: 10px 0 0;
    }

    .card__blocks-list-names li {
        list-style-type: none;
        display: inline-block;
        margin-right: 5px;
        margin-bottom: 10px;
    }

    .card__blocks-list-names li:last-child {
        margin-right: 0;
    }

    .card__blocks-list-names-item {
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
        border-radius: 5px;
    }

    .card__blocks-list-names-item a {
        display: block;
        padding: 10px 15px;
        color: #727272;
        font-weight: 700;
        text-decoration: none;
        font-size: 11px;
    }

    .card__blocks-list-names-wrapper {
        margin-bottom: 15px;
    }

    .card__blocks-list-names-heading {
        margin-bottom: 5px;
        line-height: 1;
        color: #888;
        font-size: 12px;
    }

    .card__tab-block {
        padding: 20px;
    }

    .card__block {
        padding-left: 20px;
        padding-top: 10px;
        margin-bottom: 20px;
    }

    .card__tab-description {
        color: #888;
        font-size: 14px;
    }

    .card__block {
        overflow: hidden;
    }

    @media (max-width: 1450px) {
        .card__fields {
            width: 60%;
        }
    }

    @media (max-width: 1240px) {
        .card__fields {
            width: 100%;
        }
    }
</style>