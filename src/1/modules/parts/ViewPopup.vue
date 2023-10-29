<i18n src="../locales/common.json"></i18n>

<template>
    <div class="view-module">
        <h6 class= "view-module__title">{{ $t('View') }} ({{ main.device }})</h6>
        <p class= "view-module__desc">{{ $t('View identity by 90% For detailed settings, focus on the popup on the site.') }}</p>
        <!-- View popup -->
        <div class="view-popup" :class="main.device">
            <div v-if="main['type'] == 'popup'" class="view-popup__bg" :class="main.device" :style="getStyleBg()"></div>

            <div v-if="main['type'].match(/popup|toast/)" class="view-popup__modal" :class="main.device" :style="getStyleModal()" :data-position="modal['style'][main.device]['position']" :data-dialog-variant="modal['style'][main.device]['variant']">
                <div v-if="modal['style'][main.device]['variant'] == '1'" class="view-popup__line" :style="getStyleLine()"></div>
                <template v-for="block in blocks">
                    <c-view-block :block="block" :main="main"></c-view-block>
                </template>
            </div>

            <div v-if="main['type'] == 'banner'" class="view-popup__content" :class="main.device" :style="getStyleContent()" :data-position="modal['style'][main.device]['position']">
                <template v-for="block in blocks">
                    <c-view-block :block="block" :main="main"></c-view-block>
                </template>
            </div>
        </div>
        <!-- End view popup -->
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Viewblock from './ViewBlock.vue'

export default {
    props: ['index_group', 'blocks', 'modal', 'info', 'main'],
    name: 'view-popup',
    components: {
        'c-view-block': Viewblock
    },
    methods: {
        getStyleModal() {
            const max_width = this.modal['style'][this.main.device]['width'] ? this.modal['style'][this.main.device]['width'] + this.modal['style'][this.main.device]['width_units'] : 'none'
            const max_height = this.modal['style'][this.main.device]['height'] ? this.modal['style'][this.main.device]['height'] + this.modal['style'][this.main.device]['height_units'] : 'none'
            const background_color = this.modal['style'][this.main.device]['color'] ? this.modal['style'][this.main.device]['color'] : 'transparent'
            const indent_top = this.modal['style'][this.main.device]['indent_top'] ? this.modal['style'][this.main.device]['indent_top'] + 'px ' : ''
            const indent_right = this.modal['style'][this.main.device]['indent_right'] ? this.modal['style'][this.main.device]['indent_right'] + 'px ' : ''
            const indent_bottom = this.modal['style'][this.main.device]['indent_bottom'] ? this.modal['style'][this.main.device]['indent_bottom'] + 'px ' : ''
            const indent_left = this.modal['style'][this.main.device]['indent_left'] ? this.modal['style'][this.main.device]['indent_left'] + 'px ' : ''

            return 'max-width:' + max_width + ';' + 'max-height:' + max_height + ';' + 'background-color:' + background_color + ';' + 'border-radius:' + this.modal['style'][this.main.device]['border_radius'] + 'px;' + 'top:' + indent_top + ';' + 'right:' + indent_right + ';' + 'bottom:' + indent_bottom + ';' + 'left:' + indent_left + ';'
        },

        getStyleContent() {
            return 'max-width:' + this.modal['style'][this.main.device]['width'] + this.modal['style'][this.main.device]['width_units'] + ';' + 'max-height:' + this.modal['style'][this.main.device]['height'] + this.modal['style'][this.main.device]['height_units'] + ';' + 'background-color:' + this.modal['style'][this.main.device]['color'] + ';' + 'border-radius:' + this.modal['style'][this.main.device]['border_radius'] + 'px;'
        },

        getStyleBg() {
            const background_color = this.modal['style'][this.main.device]['background'] ? this.modal['style'][this.main.device]['background'] : 'transparent'

            return 'background-color:' + background_color + ';'
        },

        getStyleLine() {
            return 'background-color:' + this.modal['style'][this.main.device]['background_dialog_line'] + ';'
        },

        getPathImgWrapper() {
            return this.getSettings['vars']['path_app_public'] + '/img/phone.png'
        }
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

<style scoped>
    .view-module {
        display: inline-block;
        width: 49%;
        vertical-align: top;
    }

    .view-popup__content[data-position="helper"] {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
    }

    .view-popup__content[data-position="above-site"] {
        position: absolute;
        top: 0;
        bottom: auto;
        width: 100%;
    }

    .view-popup__content[data-position="under-site"] {
        position: absolute;
        top: auto;
        bottom: 0;
        width: 100%;
    }
    
    .view-module__title {
        text-align: center;
    }

    .view-popup {
        position: relative;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16), 0px 0px 0px 5px rgba(51, 51, 51,1);
        overflow: hidden;
        background-color: beige;
    }

    .view-popup.desktop {
        zoom: 0.8;
        height: 1050px;
        width: 100%;
    }

    .view-popup.mobile {
        width: 414px;
        height: 736px;
        margin: auto;
    }

    .view-popup__modal {
        background-color: #fff;
        width: 100%;
        height: 100%;
        max-height: 400px;
        max-width: 500px;
        overflow: auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    .view-popup__bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
    }

    .view-popup__modal[data-position="top-left"]:not([data-dialog-variant="1"]) {
        top: 0;
        left: 0;
        right: auto;
        bottom: auto;
    }

    .view-popup__modal[data-position="top-right"]:not([data-dialog-variant="1"]) {
        top: 0;
        right: 0;
        left: auto;
        bottom: auto;
    }

    .view-popup__modal[data-position="bottom-right"]:not([data-dialog-variant="1"]) {
        bottom: 0;
        right: 0;
        left: auto;
        top: auto;
    }

    .view-popup__modal[data-position="bottom-left"]:not([data-dialog-variant="1"]) {
        bottom: 0;
        left: 0;
        top: auto;
        right: auto;
    }

    .view-popup__modal[data-position="bottom"]:not([data-dialog-variant="1"]) {
        bottom: 0;
        right: 0;
        left: 0;
        top: auto;
        margin: auto;
    }

    .view-popup__modal[data-position="top"]:not([data-dialog-variant="1"]) {
        top: 0;
        right: 0;
        left: 0;
        bottom: auto;
        margin: auto;
    }

    .view-popup__modal[data-position="left"]:not([data-dialog-variant="1"]) {
        left: 0;
        top: 0;
        bottom: 0;
        right: auto;
        margin: auto;
    }

    .view-popup__modal[data-position="right"]:not([data-dialog-variant="1"]) {
        right: 0;
        top: 0;
        bottom: 0;
        left: auto;
        margin: auto;
    }

    .view-popup__modal[data-position="center"]:not([data-dialog-variant="1"]) {
        top: 50%;
        transform: translate(0, -50%);
        left: 0;
        right: 0;
        bottom: auto;
        margin: auto;
    }

    .view-popup__modal[data-dialog-variant="1"] {
        bottom: 0;
        top: auto;
        width: 99.6% !important;
        max-width: 100% !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border: 1px solid #ccc;
        border-bottom: none;
    }

    .view-popup__line {
        margin: 15px auto;
        width: 20%;
        height: 3px;
        background-color: #ccc;
    }

    .view-module__desc {
        font-size: 12px;
        color: #888;
        text-align: center;
    }
    
    @media (max-width: 1450px) {
        .view-module {
            width: 39%;
        }

        .view-popup.desktop {
            zoom: 0.7;
        }
    }

    @media (max-width: 1240px) {
        .view-module {
            width: 100%;
        }

        .view-popup.desktop {
            zoom: 0.9;
        }
    }
</style>