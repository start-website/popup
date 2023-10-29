<i18n src="./locales/common.json"></i18n>

<template>
    <div class="css-instructions">
        <a class="css-instructions__link" href="javascript:void(0)" v-on:click="show = true">{{ $t('How to use CSS selectors') }}</a>
        <div class="css-instructions__popup" v-show="show">
            <div class="css-instructions__popup-bg" v-on:click="show = false"></div>
            <div class="css-instructions__popup-content">
                <div class="css-instructions__popup-close" v-on:click="show = false">
                    &#10006;
                </div>
                <div class="css-instructions__modal-content">
                    <h2 style="margin-bottom: 20px;">{{ $t('CSS selectors. Tags, classes, IDs.') }}</h2>
                    <h3>1. {{ $t('Tag selectors') }}</h3>
                    <p>{{ $t('CSS tag selectors are used to change the appearance of the content within a tag. For example, to change the font and color of all h1 tags on a web page, you need to create a style where the selector is h1:') }}</p>
                    <pre>
        h1 {
            font-family: Arial, sans-serif;
            color: red;
        }</pre>
                    <p>{{ $t('Similarly, you can create styles for different tags by specifying the name of the selector (p, h1, h2, ul, etc. d.).') }}</p>
                    <h3>2. {{ $t('Class selectors') }}</h3>
                    <p>{{ $t('If you need to change the style of one of the tags, use class selectors. To do this, create a style where the selector is the name of the class. For example, let\'s call the class redtxt:') }}</p>
                    <pre>
        .redtxt {
            color: red;
        }</pre>
                    <p style="margin-bottom: 5px;">{{ $t('Rules for writing classes:') }}</p>
                    <ul class="css-instructions__list">
                        <li>{{ $t('the class name must always begin with a letter and a period must be placed before the name of the class selector;') }}</li>
                        <li>{{ $t('in the name of the classes, you can only use letters of the Latin alphabet, hyphen, underscore, numbers;') }}</li>
                        <li>{{ $t('CSS class names are case sensitive.') }}</li>
                    </ul>
                    <h3>3. {{ $t('ID selectors') }}</h3>
                    <p>{{ $t('The identifier defines the unique name of the element. The name of the ID selector is preceded by a pound sign #:') }}</p>
                    <pre>
        #name {
            width: 50%;
        }</pre>
                    <p style="margin-bottom: 5px;">{{ $t('Identifier features:') }}</p>
                    <ul class="css-instructions__list">
                        <li>{{ $t('ID is the unique name of the element on the web page, which should occur only once on it, while the class can be assigned to several elements;') }}</li>
                        <li>{{ $t('An ID has higher execution precedence than a class, so if an element has both an ID and a class, the ID takes precedence.') }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapGetters } from 'vuex'

    export default {
        name: 'CssInstructions',

        data() {
            return {
                show: false,
            }
        },

        mounted() {
            const locale = document.querySelector('#app-locale').value.slice(0, 2)
            this.$i18n.locale = locale
        }
    }
</script>

<style scoped>
.css-instructions {
    font-family: 'Helvetica Neue', 'Liberation Sans', Arial, sans-serif;
    font-size: 14px;
    color: #000;
}

.css-instructions__popup {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0
}

.css-instructions__popup-bg {
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

.css-instructions__popup-content {
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
    max-height: 90%;
    overflow: auto;
}

.css-instructions__popup-close {
    font-size: 30px;
    color: #000;
    width: 30px;
    margin-left: auto;
    cursor: pointer;
    margin-bottom: 20px;
}

.css-instructions__modal-content {
    overflow-y: auto;
    max-height: 90%;
}
.css-instructions__modal-content pre {
    color: #000;
    background-color: aliceblue;
    padding: 10px;
    border-left: 3px aquamarine solid;
    overflow-x: auto;
    white-space: pre;
}

.css-instructions__modal-content .pre-yellow {
    background-color: beige;
    border-left: 3px bisque solid;
}

.css-instructions__list {
    margin: 0 0 20px 0;
}

.css-instructions__link {
    font-size: 0.8em;
}
</style>