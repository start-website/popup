<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__close-icon {
            position: absolute;
            cursor: pointer;
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleCloseIcon',
    }
</script>