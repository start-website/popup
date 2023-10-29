import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const url_controller_get_settings = "?module=getSettings"
const url_controller_file_load_image = '?module=file&action=loadImage'
const url_controller_file_load_video = '?module=file&action=loadVideo'
const url_controller_file_delete = '?module=file&action=delete'
const post_params = {
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data charset=utf-8',
    },
}

const store = new Vuex.Store({
    state: {
        loading: true,
        is_show_add_popup_button: true,
        is_show_group_cards: true,
        is_open_card_popup: false,
        settings: {},
        key_component_start: 0,
        disabled_drag_card: false,
        disabled_drag_block: false,
        disabled_drag_form_field: false,
    },
    actions: {
        getSettings(ctx) {
            axios.get(url_controller_get_settings)
                .then(function (response) {
                    // handle success
                    ctx.commit('setSettings', JSON.parse(response.data.data))
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                    ctx.commit('setLoading', false)
                })
        },
    },
    mutations: {
        setSettings(state, settings) {
            Vue.set(state, 'settings', settings)
        },

        updateSettings(state, params) {
            const [obj, key, value] = params
            Vue.set(obj, key, value)
        },

        setLoading(state, status) {
            state.loading = status
        },

        addPopup(state) {
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']

            if (!settings['routes'][selected_route]['popup_card_groups']) {
                Vue.set(state.settings['routes'][selected_route], 'popup_card_groups', {})
            }

            if (!settings['routes'][selected_route]['popup_card_groups'][selected_group]) {
                Vue.set(state.settings['routes'][selected_route]['popup_card_groups'], selected_group, [])
            }

            const popup_default_params = {
                'info': {prop: ''},
                'main': {
                    device: 'desktop',
                    type: 'popup'
                },
                'modal': {
                    'style': {
                        'mobile': {
                            prop: '',
                            'variant': '1',
                            'effect_open': 'none',
                            'effect_close': 'none',
                            'width': 550,
                            'width_units': 'px',
                            'height': 350,
                            'height_units': 'px',
                            'border_radius': 0,
                            'position': 'center',
                            'color': '#FFFFFF',
                            'background': 'rgba(0, 0, 0, 0.5)',
                        },
                        'desktop': {
                            prop: '',
                            'effect_open': 'none',
                            'effect_close': 'none',
                            'width': 550,
                            'width_units': 'px',
                            'height': 350,
                            'height_units': 'px',
                            'border_radius': 0,
                            'position': 'center',
                            'color': '#FFFFFF',
                            'background': 'rgba(0, 0, 0, 0.5)',
                        }
                    }
                },
                'conditions': {
                    'show_device': 'all'
                },
                'blocks': [],
                id: getUniqPopupID(settings['routes'][selected_route]['popup_card_groups'][selected_group])
            }

            settings['routes'][selected_route]['popup_card_groups'][selected_group].push(popup_default_params)
        },

        delPopup(state, index) {
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']

            if (!settings['routes'][selected_route]['popup_card_groups']) {
                return
            }

            if (!settings['routes'][selected_route]['popup_card_groups'][selected_group]) {
                return
            }

            const popup_card_groups = settings['routes'][selected_route]['popup_card_groups'][selected_group]
            popup_card_groups.splice(index, 1)
        },

        copyPopup(state, index) {
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']

            if (!settings['routes'][selected_route]['popup_card_groups']) {
                Vue.set(state.settings['routes'][selected_route], 'popup_card_groups', {})
            }

            if (!settings['routes'][selected_route]['popup_card_groups'][selected_group]) {
                Vue.set(state.settings['routes'][selected_route]['popup_card_groups'], selected_group, [])
            }

            const popup_params = settings['routes'][selected_route]['popup_card_groups'][selected_group][index]
            const popup_params_copy = {}

            popup_params_copy.id = getUniqPopupID(settings['routes'][selected_route]['popup_card_groups'][selected_group])
            popup_params_copy.main = JSON.parse(JSON.stringify(popup_params.main))
            popup_params_copy.info = JSON.parse(JSON.stringify(popup_params.info))
            popup_params_copy.modal = JSON.parse(JSON.stringify(popup_params.modal))
            popup_params_copy.conditions = JSON.parse(JSON.stringify(popup_params.conditions))
            popup_params_copy.blocks = JSON.parse(JSON.stringify(popup_params.blocks))

            settings['routes'][selected_route]['popup_card_groups'][selected_group].push(popup_params_copy)
        },

        addBlock(state, params) {
            const [component, index_group] = params
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']
            const block_id = getUniqBlockID(settings['routes'][selected_route]['popup_card_groups'][selected_group][index_group])

            if (!settings['routes'][selected_route]['popup_card_groups'][selected_group][index_group]['blocks']) {
                Vue.set(settings['routes'][selected_route]['popup_card_groups'][selected_group][index_group], 'blocks', [])
            }

            const data_block = getDataBlock(component, block_id)

            settings['routes'][selected_route]['popup_card_groups'][selected_group][index_group]['blocks'].push(data_block)
        },

        delBlock(state, params) {
            const [index_group, block_id] = params
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']

            delBlockById(settings['routes'][selected_route]['popup_card_groups'][selected_group][index_group], block_id)
        },

        uploadFile(state, params) {
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']
            const [e, file_short_name, file_path, obj, type] = params
            const file_name = e.target.files[0].name
            const file = e.target.files ? e.target.files[0] : null
            const loading_file = document.querySelector('#view-image__progress-' + obj.route + obj.card + obj.card_id + obj.block_id)
            const block = obj.block
            let version = Number(block['version'])
            version += version
            let url_controller

           // if (!this._checkImage(file, file_name, prop, formats)) return

           switch (type) {
            case 'image':
                url_controller = '?module=file&action=loadImage'
                break;
            case 'video':
                url_controller = '?module=file&action=loadVideo'
                break;
           }


            const data = new FormData()
            data.append('file', file)
            data.append('file_short_name', file_short_name)
            data.append('route', selected_route)
            data.append('dir_to', file_path)
            data.append('_csrf', getCookie('_csrf'))
            loading_file.style.display = ''

            axios
                .post(url_controller, data, post_params)
                .then((response) => {
                    if (
                        response.data &&
                        response.data.data &&
                        response.data.data.file_uploaded
                    ) {
                        console.log('[POPUP]: File uploaded', response)
                        Vue.set(block, 'content', response.data.data.saved_file)
                        Vue.set(block, 'version', version)
                    } else {
                        console.log("[POPUP] Failed to load File: ", response)
                    }
                })
                .catch(function (error) {
                    console.log("[POPUP] Error loading file: ", error)
                })
                .finally(function () {
                    loading_file.style.display = 'none'
                })
        },

        deleteFile(state, params) {
            const data = new FormData()
            const settings = state.settings
            const selected_route = settings.selected_route
            const selected_group = settings['routes'][selected_route]['selected_card_group']
            const [e, file_short_name, file_path, obj, delete_folder] = params
            const block = obj.block
            data.append('route', selected_route)
            data.append('file_short_name', file_short_name)
            data.append('settings', JSON.stringify(settings))
            data.append('dir_file', file_path)
            data.append('del_folder', delete_folder)
            data.append('_csrf', getCookie('_csrf'))

            axios
                .post(url_controller_file_delete, data, post_params)
                .then((response) => {
                    if (
                        response.data &&
                        response.data.data &&
                        response.data.data.file_deleted
                    ) {
                        console.log('[POPUP]: File deleted', response)
                        Vue.set(block, 'content', '')
                    } else {
                        console.log("[POPUP] Error while deleting file", response)
                    }
                })
                .catch(function (error) {
                    console.log("[POPUP] Error while deleting file: ", error)
                })
        },

        changeDisabledDragCard(state, value) {
            state.disabled_drag_card = value
        },

        changeDisabledDragBlock(state, value) {
            state.disabled_drag_block = value
        },

        changeDisabledDragFormField(state, value) {
            state.disabled_drag_form_field = value
        },

        changeShowAddPopupButton(state, value) {
            state.is_show_add_popup_button = value
        },

        changeShowGroupCards(state, value) {
            state.is_show_group_cards = value
        },

        changeOpenCardPopup(state, value) {
            state.is_open_card_popup = value
        }
    },
    getters: {
        getSettings(state) {
            return state.settings
        },

        getLoading(state) {
            return state.loading
        },

        getIsShowAddPopupButton(state) {
            return state.is_show_add_popup_button
        },

        getPathPublicDataAppPublic(state) {
            const settings = state.settings

            return settings['vars']['path_public_data_app_public']
        },

        getPathPublicDataAppSystem(state) {
            const settings = state.settings

            return settings['vars']['path_public_data_app_system']
        },

        getWaVersion(state) {
            const settings = state.settings

            return settings['vars']['wa_version']
        },

        getDisabledDragCard(state) {
            return state.disabled_drag_card
        },

        getDisabledDragBlock(state) {
            return state.disabled_drag_block
        },

        getDisabledDragFormField(state) {
            return state.disabled_drag_form_field
        },

        getShowAddPopupButton(state) {
            return state.is_show_add_popup_button
        },

        getShowGroupCards(state) {
            return state.is_show_group_cards
        },

        getOpenCardPopup(state) {
            return state.is_open_card_popup
        }
    },
})

function delBlockById(obj, id) {
        function delBlockRecursively(array) {
            for (let i = 0; i < array.length; i++) {
                const block = array[i]
    
                if (block.id === id) {
                    array.splice(i, 1)
                    return
                }
    
                if (block.blocks) {
                    delBlockRecursively(block.blocks)
                }
            }
        }

        delBlockRecursively(obj.blocks)
}


function getUniqBlockID(obj) {
    let id = 'block' + Math.floor(Math.random() * 1000000000)
    let uniq = true

    function checkUniq(array) {
        for (let i = 0; i < array.length; i++) {
            const block = array[i]

            if (block.id == id) {
                uniq = false
                return
            }
            
            if (block.blocks) {
                checkUniq(block.blocks)
            }
        }
    }
    
    checkUniq(obj.blocks)

    if (!uniq) {
        return getUniqBlockID(obj)
    }

    return id
}


function getUniqPopupID(array) {
    let id = 'popup' + Math.floor(Math.random() * 1000000000)
    let uniq = true

    function checkUniq(array) {
        for (let i = 0; i < array.length; i++) {
            const elem = array[i]

            if (elem.id == id) {
                uniq = false
                return
            }
        }
    }
    
    checkUniq(array)

    if (!uniq) {
        return getUniqPopupID(array)
    }

    return id
}

function getDataBlock(component, block_id) {
    const obj = {
        id: block_id,
        component: component,
        content: '',
        version: 1,
        frontend: { 
            html: '',
        },
        backend: { 
            html: '',
        },
        style: {
            mobile: {
                prop: '',
                'padding_top': 0,
                'padding_right': 0,
                'padding_bottom': 0,
                'padding_left': 0,
                'horizontal_align': 'center',
                'vertical_align': 'center',
                'axis_direction': 'row',
                'show': '',
                'font_size': '25',
                'color': '#333',
                'size': '25',
            },
            desktop: {
                prop: '',
                'padding_top': 0,
                'padding_right': 0,
                'padding_bottom': 0,
                'padding_left': 0,
                'horizontal_align': 'center',
                'vertical_align': 'center',
                'axis_direction': 'row',
                'show': '',
                'font_size': '25',
                'color': '#333',
                'size': '25',
            }
        },
        css: '',
        params: {
            action: '',
            email: {
                transport: '',
                action: '',
            }
        }
    }

    if (component === 'c-container' || component === 'c-column' || component === 'c-row') obj.blocks = []

    return obj
}

function getCookie(name) {
    var matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default store
