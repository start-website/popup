<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__hr {
            margin: 0 auto;
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleImg',
    }
</script>