<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__video {
            display: block;
        }
    </div>
</template>

<script>
    export default {
        props: ['block'],
        name: 'templateStyleVideo',
    }
</script>