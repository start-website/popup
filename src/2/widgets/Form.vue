<i18n src="./locales/common.json"></i18n>

<template>
    <div class="form">
        <c-loader></c-loader>
        <form action="?module=settings" method="post" v-on:submit.prevent="settingsSubmit">
            <scrf></scrf>

            <div class="page-description">
                <h1>{{ $t('Designer pop-up') }}</h1>
                <div v-if="!getSettings['is_premium']" class="upgrade-premium">
                    <p>{{ $t('You are using a standard license with limited functionality.') }} <a :href="getSettings['url_app_installer']" target="_blank">{{ $t('Upgrade to premium to gain access to all app features.') }}</a></p>
                </div>
                <fast-start></fast-start>
            </div>

            <div class="form-content">
                <div class="general-settings">
                    <div class="fields">
                        <template v-if="getSettings['routes'] &&
                            getSettings['routes'][getSettings.selected_route]['popup_card_groups']">

                            <showcase-selection></showcase-selection>
                            <group-selection></group-selection>

                        </template>
                    </div>
                </div>

                <div style="margin-top: 20px;">
                    <button-add-popup></button-add-popup>
                </div>

                <div class="group-cards" v-show="getShowGroupCards">
                    <template
                        v-if="getSettings['routes'] &&
                            getSettings['routes'][getSettings.selected_route]['popup_card_groups'] &&
                            getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']] &&
                            getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']].length > 0">
                        <draggable
                            :list="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']]"
                            @start="drag = true" 
                            @end="drag = false" 
                            v-bind="dragOptions" :group="{ name: 'previews' }"
                            tag="div" 
                            draggable=".card" 
                            class="card__previews" 
                            :disabled="getDisabledDragCard"
                        >
                            <card
                                v-for="(item, index) in getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']]"
                                :key="item.id" :index_group="index"
                                :blocks="getSettings['routes'][getSettings.selected_route]['popup_card_groups'][getSettings['routes'][getSettings.selected_route]['selected_card_group']][index]['blocks']"
                                :card_id="item.id"></card>
                        </draggable>

                    </template>

                </div>
            </div>

            <div class="field">
                <div class="value submit" :class="form.classes.wpapper">
                    <label><input type="submit" class="button buttom-sumbit" :class="form.classes.button"
                            :value="$t('Save')"></label>
                    <span v-if="form.response" id="plugins-settings-form-status" style="">
                        <i style="vertical-align:middle" class="icon16" :class="form.classes.icon"></i>{{ form.response
                        }}</span>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import draggable from 'vuedraggable'
import {
    loading,
    showcaseSelection,
    scrf,
    groupSelection,
    card,
    buttonAddPopup,
    fastStart
} from '../modules'

const url_controller_set_settings = "?module=setSettings"

const form = {
    response: "",
    success: false,
    fail: false,
    completed: false,
    classes: {
        wpapper: "",
        icon: "",
        button: "green",
    },
}

export default {
    name: 'form',

    components: {
        scrf,
        'showcase-selection': showcaseSelection,
        'group-selection': groupSelection,
        card,
        'button-add-popup': buttonAddPopup,
        draggable,
        'c-loader': loading,
        'fast-start': fastStart
    },
    data() {
        return {
            form: form,
            drag: false,
        }
    },

    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "previews",
                ghostClass: "card-ghost"
            };
        },

        ...mapGetters(['getSettings', 'getDisabledDragCard', 'getIsShowAddPopupButton', 'getShowGroupCards'])
    },

    methods: {
        settingsSubmit() {
            const data = new FormData()
            const settings_to_bd = this.getSettings
            data.append('settings', JSON.stringify(settings_to_bd))

            const post_params = {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data; charset=utf-8",
                },
            }

            const self = this

            axios.post(url_controller_set_settings, data, post_params)
                .then(function (response) {
                    self.form.completed = true

                    if (response.data && response.data.data && response.data.data.saved) {
                        self.form.response = response.data.data.saved
                        self.form.classes.wpapper = "successmsg"
                        self.form.classes.icon = "yes"
                        setTimeout(function () {
                            window.location.reload()
                        }, 700)
                        return
                    } else {
                        self.form.response = response.data.errors[0][0]
                        self.form.classes.wpapper = "errormsg"
                        self.form.classes.icon = "no"
                        self.form.classes.button = "red"
                    }

                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    }

}
</script>

<style scoped>
.upgrade-premium {
    margin-bottom: 30px;
}
.group-cards {
    position: relative;
    margin: 30px 15px 0 15px;
    width: 100%;
    overflow: hidden;
}

.form-content {
    margin-bottom: 40px;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.card-ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}

.page-description {
    margin-bottom: 20px;
}

.card__previews {
    padding: 0 5px;
}
</style>

<style>
    .field {
        margin-bottom: 20px;
    }
</style>
