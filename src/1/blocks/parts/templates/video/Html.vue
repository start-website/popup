<template>
    <video class="view-popup__video" :class="block['style'][main.device]['show']" :src="src" autoplay :width="block['style'][main.device]['width']" :height="block['style'][main.device]['height']" :data-position="block['style'][main.device]['position']">
        Sorry, your browser doesn't support embedded videos,
        but don't worry, you can <a :href="src">download it</a>
        and watch it with your favorite video player!
    </video>
</template>

<script>
    export default {
        props: ['block', 'src', 'main'],
        name: 'templateHtmlVideo',
    }
</script>

<style scoped>
    .view-popup__video[data-position="center"] {
        margin: 0 auto;
    }

    .view-popup__video[data-position="left"] {
        margin: 0 auto 0 0;
    }

    .view-popup__video[data-position="right"] {
        margin: 0 0 0 auto;
    }

    .view-popup__video.hide {
        display: none !important;
    }
</style>
