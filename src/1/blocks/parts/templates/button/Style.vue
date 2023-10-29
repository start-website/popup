<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__button {
            display: block;
            padding: 5px 20px;
            border-radius: 5px;
            cursor: pointer;
            outline: none;
            overflow: hidden;
            text-align: center;
            text-transform: none;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
            font-weight: 700;
            line-height: 1.5;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__button:not(:disabled):hover,
        [data-block-id="{{ block['id'] }}"] .view-popup__button:not(:disabled):focus {
            outline: 0;
            opacity: .75;
        }
        
        [data-block-id="{{ block['id'] }}"] .view-popup__button:disabled {
            cursor: not-allowed;
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleImg',
    }
</script>