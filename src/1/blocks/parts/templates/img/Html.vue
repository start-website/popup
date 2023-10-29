<template>
    <a v-if="block['params']['link']" :href="block['params']['link']" :class="block['style'][main.device]['show']">
        <img class="view-popup__img" :src="src" :width="block['style'][main.device]['width']" :height="block['style'][main.device]['height']">
    </a>
    <img v-else class="view-popup__img" :class="block['style'][main.device]['show']" :src="src" :width="block['style'][main.device]['width']" :height="block['style'][main.device]['height']">
</template>

<script>
    export default {
        props: ['block', 'src', 'main'],
        name: 'templateHtmlImg',
    }
</script>

<style scoped>
    .view-popup__img.hide, a.hide {
        display: none !important;
    }
</style>
