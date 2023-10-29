<i18n src="./locales/common.json"></i18n>

<template>
    <div class="field">
        <div class="name">
            {{ $t('Pop-up group') }}
        </div>
        <div class="value">
            <label>
                <select v-model="getSettings['routes'][getSettings.selected_route]['selected_card_group']" class="">
                    <template v-for="(value, key) in getSettings['routes'][getSettings.selected_route]['popup_card_groups_name']">
                        <option v-if="key === 'all'" :value="key">{{ $t('All') }}</option>
                        <option v-else :value="value">{{ key }}</option>
                    </template>
                </select>
                <a href="#" v-on:click.prevent="openEdit" v-show="!is_show_edit_groups"><i class="icon16 edit"></i>{{ $t('Edit') }}</a>
                <a href="#" v-on:click.prevent="closeEdit" v-show="is_show_edit_groups">{{ $t('Cancel') }}</a>
            </label>
            <div class="edit-groups" v-if="is_show_edit_groups">
                <div class="edit-groups__content">
                    <div class="edit-groups__delete" v-for="(value, key) in getSettings['routes'][getSettings.selected_route]['popup_card_groups_name']" :key="key">
                        <input type="text" :value="value" :ref="'input-group-' + key">
                        <a href="#" v-on:click.prevent="delGroup(key)" :ref="'del-group-' + key"><i class="icon16 delete"></i>{{ $t('Delete') }}</a>
                        <a href="#" v-on:click.prevent="cancelDelGroup(key)" :ref="'cancel-del-group-' + key" style="display: none;"><i class="icon16 close"></i>{{ $t('Cancel') }}</a>
                    </div>
                    <div class="edit-groups__save" v-for="(group, index) in added_groups" :key="index">
                        <input type="text" v-model="group.name">
                        <a href="#" v-on:click.prevent="saveGroup(index)"><i class="icon16 notebook"></i>{{ $t('Save') }}</a>
                    </div>
                    <a href="#" v-on:click.prevent="addGroup"><i class="icon16 add"></i>{{ $t('Add') }}</a>
                </div>
                <div class="edit-groups__description">
                    <p class="edit-groups__description-text">{{ $t('Close editing groups to continue customizing pop-ups.') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'group-selection',
    data() {
        return {
            added_groups: [],
            remote_groups: [],
            is_show_edit_groups: false,
            is_deleted_group: false,
        }
    },
    methods: {
        addGroup() {
            this.added_groups.push({
                name: ''
            })
        },

        delGroup(key) {
            const input_group_ref_id = 'input-group-' + key
            const del_group_ref_id = 'del-group-' + key
            const cancel_del_group_ref_id = 'cancel-del-group-' + key
            this.remote_groups.push(key)
            this.updateSettings([this.getSettings['routes'][this.getSettings.selected_route], 'popup_card_groups_remote', this.remote_groups])
            this.$refs[del_group_ref_id][0].style.display = 'none'
            this.$refs[cancel_del_group_ref_id][0].style.display = ''
            this.$refs[input_group_ref_id][0].style.opacity = '0.4'
            this.$refs[input_group_ref_id][0].disabled = true        
        },

        cancelDelGroup(key) {
            const input_group_ref_id = 'input-group-' + key
            const del_group_ref_id = 'del-group-' + key
            const cancel_del_group_ref_id = 'cancel-del-group-' + key
            this.remote_groups.splice(key, 1);
            this.updateSettings([this.getSettings['routes'][this.getSettings.selected_route], 'popup_card_groups_remote', this.remote_groups])
            this.$refs[del_group_ref_id][0].style.display = ''
            this.$refs[cancel_del_group_ref_id][0].style.display = 'none'
            this.$refs[input_group_ref_id][0].style.opacity = ''
            this.$refs[input_group_ref_id][0].disabled = false  
        },

        saveGroup(index) {
            const route = this.getSettings.selected_route
            const group_value = this.added_groups[index].name

            if (!group_value) return

            let group_key = group_value.trim()
            group_key = group_key.replace(/(\s|\n)/g, '')
            group_key = group_key.toLowerCase()
            group_key = group_key.toString()
            this.updateSettings([this.getSettings['routes'][this.getSettings.selected_route]['popup_card_groups_name'], group_key, group_value])
            this.added_groups.splice(index, 1)
        },

        openEdit() {
            this.is_show_edit_groups = true
            this.changeShowAddPopupButton(false)
            this.changeShowGroupCards(false)
        },

        closeEdit() {
            this.is_show_edit_groups = false

            if (!this.getOpenCardPopup) {
                this.changeShowAddPopupButton(true)
            }
            
            this.changeShowGroupCards(true)
        },

        ...mapMutations(['updateSettings', 'changeShowAddPopupButton', 'changeShowGroupCards']),
    },

    computed: mapGetters(['getSettings', 'getShowAddPopupButton', 'getShowGroupCards', 'getOpenCardPopup']),

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    },
}
</script>

<style scoped>
    .edit-groups__delete, .edit-groups__save {
        margin-bottom: 5px;
    }

    .edit-groups__content {
        margin-top: 5px;
    }

    .edit-groups__description {
        margin-top: 10px;
    }

    .edit-groups__description-text {
        color: #888;
        font-size: 12px;
    }
</style>