<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__text {
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleText',
    }
</script>