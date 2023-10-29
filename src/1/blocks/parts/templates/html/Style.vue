<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__html {
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleHtml',
    }
</script>