<template>
    <div class="main-content">
        <loading></loading>
        <div id="content" class="content app-content">
            <div class="block">
                <w-form></w-form>
            </div>
        </div>
    </div>
</template>
 
<script>
import { form } from '../widgets'

export default {
    name: 'app',
    components: {
        'w-form': form,
    },

    created() {
        this.$store.dispatch('getSettings')
    },
}
</script>

<style>
.db-inline {
    display: inline-block;
    vertical-align: top;
}

.input-small {
    width: 59px;
}

.input-fluid {
    width: 100%;
}


.value-item {
    margin-bottom: 5px;
}

.transparent-sprite {
    max-width: 250px;
}

.edit-css__textarea {
    width: 100%;
    min-height: 300px;
}

.block-fields {
    padding-left: 20px;
    padding-top: 10px;
}

.block-fields__desc {
    margin-bottom: 10px;
    font-size: 12px;
    color: #aaa;
}

.app-content {
    padding: 20px;
}

.app-content * {
    box-sizing: border-box;
}

.app-message {
    background-color: lavender;
    padding: 10px;
    display: inline-block;
    border: 1px solid;
    border-color: mediumpurple;
}

.form {
    position: relative;
}

.loading-settings {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 999999;
    left: 0;
    top: 0;
}

.message {
    margin-bottom: 20px;
    max-width: 700px;
    overflow: hidden;
}

.message p:last-child {
    margin-bottom: 0;
}

.message__text {
    padding: 1em;
    font-size: 0.9em;
    margin: 0;
    overflow-x: auto;
}

.message__text.message-yellow {
    border-left: solid 3px #ffc69d;
    background: #ffc;
}

html[data-theme="dark"] .message__text.message-yellow {
    border-left: solid 3px #1285e3;
    background: #343a78;
}

.message__text.message-blue {
    background-color: aliceblue;
    border-left: solid 3px cornflowerblue;
}

html[data-theme="dark"] .message__text.message-blue {
    background-color: #331134;
    border-left: solid 3px #745178;
}

.message__text ul,
ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.message__text ul li,
.message__text ol li {
    margin-bottom: 9px;
}

.message__text ul li:last-child,
.message__text ol li:last-child {
    margin-bottom: 0;
}

.message__text ul li a,
.message__text ol li a {
    color: #ff6c00;
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 0;
    padding-bottom: 2px;
    padding-top: 2px;
    text-decoration: none;
}

.message__text.message-blue ul li a,
.message__text.message-blue ol li a {
    color: dodgerblue;
}

.message__text ul .icon16.new-window,
.message__text ol .icon16.new-window {
    position: relative;
    bottom: 3px;
}

.message__text ul li a:hover,
.message__text ol li a:hover {
    color: red;
}

.message-title {
    font-size: 12px;
    margin-bottom: 0;
    padding: 10px 0;
}

.text-green {
    color: #4f8a10;
    background-color: #dff2bf;
}

.message__desc {
    margin-bottom: 0;
    margin-top: 10px;
}

.message__text-warning {
    background: #ffcade;
}

.message-open {
    margin-bottom: 20px;
}

.message-open p {
    cursor: pointer;
    display: inline-block;
    margin-bottom: 0;
    font-size: 13px;
}

.message-open .icon10 {
    margin-top: 4px;
}

.message pre {
    margin: 0;
    white-space: pre;
    overflow-x: auto;
}

.message__parag {
    margin-bottom: 5px;
    font-size: 12px;
}


.icon-margin {
    margin-left: 3px;
}

</style>