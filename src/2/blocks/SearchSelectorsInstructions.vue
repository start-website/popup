<i18n src="./locales/common.json"></i18n>

<template>
    <div class="search-selectors-instructions">
        <a class="search-selectors-instructions__link" href="javascript:void(0)" v-on:click="show = true">{{ $t('How to find html tags using CSS selectors') }}</a>
        <div class="search-selectors-instructions__popup" v-show="show">
            <div class="search-selectors-instructions__popup-bg" v-on:click="show = false"></div>
            <div class="search-selectors-instructions__popup-content">
                <div class="search-selectors-instructions__popup-close" v-on:click="show = false">
                    &#10006;
                </div>
                <div class="search-selectors-instructions__modal-content">
                    <h2 style="margin-bottom: 20px;">{{ $t('How to find html tags using CSS selectors') }}</h2>
                    <h3>{{ $t('Searching for CSS selectors on a website') }}</h3>
                    <p>{{ $t('Go to the website. We have prepared the necessary element of the site. Right-click and select the View Code menu item. On the “Elements” tab, a piece of HTML code describing this element will immediately be highlighted. See if the html tags have attributes such as: Identifier, classes, data, name. Using them we can access html tags. If they are not there, we will not be able to interact with the html tags we need.') }}
                    </p>
                    <h3>{{ $t('Accessing Tags Using Selectors') }}</h3>
                    <p style="margin-bottom: 5px;"><b>{{ $t('Access by id.') }}</b> {{ $t('Prefix the selector name with a "#" symbol, example: #myid.') }}</p>
                    <p style="margin-bottom: 5px;"><b>{{ $t('Access by class.') }}</b> {{ $t('Prefix the selector name with a ".", example: .myclass.') }}</p>
                    <p style="margin-bottom: 5px;"><b>{{ $t('Access by data, name.') }}</b> {{ $t('Place the selector name inside the "[]" brackets, example: [data-some="value"].') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'SearchSelectorsInstructions',

        data() {
            return {
                show: false,
            }
        },

        methods: {

        },

        computed: {

        },

        mounted() {
            const locale = document.querySelector('#app-locale').value.slice(0, 2)
            this.$i18n.locale = locale
        }
    }
</script>

<style scoped>
.search-selectors-instructions {
    font-family: 'Helvetica Neue', 'Liberation Sans', Arial, sans-serif;
    font-size: 14px;
    color: #000;
}

.search-selectors-instructions__popup {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0
}

.search-selectors-instructions__popup-bg {
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

.search-selectors-instructions__popup-content {
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

.search-selectors-instructions__popup-close {
    font-size: 30px;
    color: #000;
    width: 30px;
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 20px;
}

.search-selectors-instructions__modal-content {
    overflow-y: auto;
    max-height: 90%;
}
.search-selectors-instructions__modal-content pre {
    color: #000;
    background-color: aliceblue;
    padding: 10px;
    border-left: 3px aquamarine solid;
    overflow-x: auto;
    white-space: pre;
}

.search-selectors-instructions__modal-content .pre-yellow {
    background-color: beige;
    border-left: 3px bisque solid;
}

.search-selectors-instructions__list {
    margin: 0 0 20px 0;
}

.search-selectors-instructions__link {
    font-size: 0.8em;
}
</style>