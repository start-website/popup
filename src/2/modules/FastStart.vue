<i18n src="./locales/common.json"></i18n>

<template>
    <div class="fast-start">
        <p>{{ $t('To start using the application, select a showcase and') }} <a class="fast-start__link" href="javascript:void(0)" v-on:click="show_popup = true">{{ $t('install the application on the website') }}</a>.</p>
        <p>{{ $t('To create a pop-up, select a group and click "Add pop-up".') }}</p>

        <div class="message">
            <div class="message__text message-yellow">
                <ul>
                    <li><a href="https://youtu.be/TOfxz_YsI9M?si=oj5d0aPQ3LZPYbVg&t=45" target="_blank" rel="noopener noreferrer">{{ $t('See an example of creating a pop-up') }} ({{ $t('YouTube video') }}) <i class="icon16 new-window"></i></a></li>
                </ul>
            </div>
        </div>

        <div class="fast-start__popup" v-show="show_popup" v-if="getSettings && getSettings.selected_route">
            <div class="fast-start__popup-bg" v-on:click="show_popup = false"></div>
            <div class="fast-start__popup-content">
                <div class="fast-start__popup-close" v-on:click="show_popup = false">
                    &#10006;
                </div>
                <div class="fast-start__modal-content">
                    <h2>{{ $t('Installing the application') }}</h2>

                    <div class="fast-start__block">
                        <p>{{ $t('Installation of the necessary files for the application to work is carried out using a helper.') }}</p>
                        <p>{{ $t('For the Shop Script application, if the frontend_head hook is present, installation is carried out automatically, no additional actions are required.') }}</p>
                    </div>

                    <div class="fast-start__block">
                        <h3>{{ $t('Installation using helper') }}</h3>
                        <p>{{ $t('Placed in a site template, which is responsible for all pages of the site. For example, for the “Shop” application it will be: Store → Showcase → Templates → index.html.') }}</p>
                        <p>{{ $t('Inside the tag') }} &lt;head&gt;.</p>
                        <pre v-if="getSettings.selected_route !== 'fdd6b6832a6c9efb1b493e941a89f568'">
{if $wa->popup && $wa->app() === '{{ getSettings['routes'][getSettings.selected_route]['showcase_info']['app'] }}'}
    {$wa->popup->head()}
{/if}</pre>
                <pre class="block-helper__content" v-else>
{if $wa->popup}
    {$wa->popup->head()}
{/if}</pre>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'fastStart',
    data() {
        return {
            show_popup: false,
        }
    },

    computed: {
        ...mapGetters(['getSettings'])
    },

    mounted() {
        const locale = document.querySelector('#app-locale').value.slice(0, 2)
        this.$i18n.locale = locale
    }
}
</script>

<style scoped>
    .fast-start p {
        margin-bottom: 10px;
    }

    .fast-start h2 {
        margin-bottom: 20px;
    }

    .fast-start h3 {
        margin-bottom: 10px;
    }

    .fast-start__block {
        margin-bottom: 20px;
    }

    .fast-start {
    font-family: 'Helvetica Neue', 'Liberation Sans', Arial, sans-serif;
    font-size: 14px;
    color: #000;
}

.fast-start__popup {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0
}

.fast-start__popup-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.5;
}

.fast-start__popup-content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 70%;
    min-height: 400px;
    z-index: 100;
    background: #fff;
    margin: auto;
    left: 0;
    right: 0;
    padding: 20px;
}

.fast-start__popup-close {
    font-size: 30px;
    color: #000;
    width: 30px;
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 20px;
}

.fast-start__modal-content {
    overflow-y: auto;
    max-height: 90%;
}
.fast-start__modal-content pre {
    color: #000;
    background-color: aliceblue;
    padding: 10px;
    border-left: 3px aquamarine solid;
    overflow-x: auto;
    white-space: pre;
}

.fast-start__modal-content .pre-yellow {
    background-color: beige;
    border-left: 3px bisque solid;
}

.fast-start__list {
    margin: 0 0 20px 0;
}
</style>