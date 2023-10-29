<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__img {
            display: block;
        }
    </div>
</template>

<script>
export default {
    props: ['block'],
    name: 'templateStyleImg',
    }
</script>