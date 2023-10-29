<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__timer {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__timer-days,
        [data-block-id="{{ block['id'] }}"] .view-popup__timer-hours,
        [data-block-id="{{ block['id'] }}"] .view-popup__timer-minutes,
        [data-block-id="{{ block['id'] }}"] .view-popup__timer-seconds {
            position: relative;
            text-align: center;
            display: block;
            margin-right: 6%;
            width: 25%;
            font-family: inherit;
            color: inherit;
            height: auto;
            line-height: 1;
            padding: 5px;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__timer-seconds {
            margin-right: 0;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__timer-days::after,
        [data-block-id="{{ block['id'] }}"] .view-popup__timer-hours::after,
        [data-block-id="{{ block['id'] }}"] .view-popup__timer-minutes::after {
            content: ":";
            width: auto;
            position: absolute;
            top: 7%;
            right: -13px;
            font-size: inherit;
            color: inherit;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__timer-name {
            position: absolute;
            bottom: -15px;
            font-size: 8px;
            left: 0;
            right: 0;
            padding: 5px;
            background-color: inherit;
            color: inherit;
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleImg',
    }
</script>