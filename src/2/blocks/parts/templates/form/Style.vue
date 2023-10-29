<template>
    <div>
        [data-block-id="{{ block['id'] }}"] .view-popup__form-item {
            margin-bottom: 10px;
            width: 100%;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__form_name-field {
            color: #555;
            margin-left: 2px;
            margin-bottom: 2px;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input,
        [data-block-id="{{ block['id'] }}"] .view-popup__form-textarea,
        [data-block-id="{{ block['id'] }}"] .view-popup__form-select {
            width: 100%;
            font-size: 13px;
            background: rgba(255, 255, 255, 0.5);
            border: none;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
                rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
            display: block;
            padding: 8px;
            color: #555;
            max-width: 100%;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input:focus,
        [data-block-id="{{ block['id'] }}"] .view-popup__form-textarea:focus,
        [data-block-id="{{ block['id'] }}"] .view-popup__form-select:focus {
            outline: none !important;
            border:1px solid cornflowerblue;
            box-shadow: 0 0 5px cornflowerblue;
            color: #000;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="range"],
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="color"],
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="file"] {
            box-shadow: none;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="color"] {
            width: 30px;
            padding: 3px;
            cursor: pointer;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-label-color {
            display: inline-block;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__form-input:focus {
            outline: none;
        }

        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="checkbox"] {
            display: none;
            visibility: hidden;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check {
            display: inline-block;
            vertical-align: middle;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check {
            cursor: pointer;
            position: relative;
            margin: auto;
            width: 18px;
            height: 18px;
            -webkit-tap-highlight-color: transparent;
            transform: translate3d(0, 0, 0);
            margin-right: 4px;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check:before {
            content: "";
            position: absolute;
            top: -15px;
            left: -15px;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(34, 50, 84, 0.03);
            opacity: 0;
            transition: opacity 0.1s ease;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check svg {
            position: relative;
            z-index: 1;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke: #c8ccd4;
            stroke-width: 1.5;
            transform: translate3d(0, 0, 0);
            transition: all 0.1s ease;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check svg path {
            stroke-dasharray: 60;
            stroke-dashoffset: 0;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check svg polyline {
            stroke-dasharray: 22;
            stroke-dashoffset: 66;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check:hover:before {
            opacity: 1;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-check:hover svg {
            stroke: #4285f4;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="checkbox"]:checked + .view-popup__form-input-check svg {
            stroke: #4285f4;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="checkbox"]:checked + .view-popup__form-input-check svg path {
            stroke-dashoffset: 60;
            transition: all 0.3s linear;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="checkbox"]:checked + .view-popup__form-input-check svg polyline {
            stroke-dashoffset: 42;
            transition: all 0.2s linear;
            transition-delay: 0.15s;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-checkbox-name {
            display: inline-block;
            font-size: 13px;
            margin-left: 2px;
            vertical-align: middle;
            white-space: pre-wrap;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-checkbox-wrap {
            margin-bottom: 5px;
            white-space: nowrap;
        }
        [data-block-id="{{ block['id'] }}"] [data-layout="inline"] .view-popup__form-input-checkbox-wrap {
            display: inline-block;
            margin-right: 10px;
        }
        [data-block-id="{{ block['id'] }}"] [data-layout="inline"] .view-popup__form-input-radio-wrap {
            display: inline-block;
            margin-right: 10px;
        }
        [data-block-id="{{ block['id'] }}"] [data-layout="inline"] .view-popup__form-input-radio-wrap:last-child {
            margin-right: 0;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="radio"] {
            position: absolute;
            opacity: 0;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="radio"] + .view-popup__form-input-label::before {
            content: "";
            background: #f4f4f4;
            border-radius: 100%;
            border: 1px solid #b4b4b4;
            display: inline-block;
            width: 15px;
            height: 15px;
            position: relative;
            top: 0;
            margin-right: 5px;
            vertical-align: top;
            cursor: pointer;
            text-align: center;
            transition: all 250ms ease;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="radio"]:checked + .view-popup__form-input-label::before {
            background-color: #3197ee;
            box-shadow: inset 0 0 0 4px #f4f4f4;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="radio"]:focus + .view-popup__form-input-label::before {
            outline: none;
            border-color: #3197ee;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="radio"]:disabled + .view-popup__form-input-label::before {
            box-shadow: inset 0 0 0 4px #f4f4f4;
            opacity: 0.4;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input[type="radio"] + .view-popup__form-input-label:empty::before {
            margin-right: 0;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-radio-wrap {
            padding: 3px 0;
            position: relative;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-radio {
            padding: 4px;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-input-label {
            font-size: 13px;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-button {
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
        .mobile [data-block-id="{{ block['id'] }}"] .view-popup__form-button {
            width: 100%;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-button:not(:disabled):hover,
        [data-block-id="{{ block['id'] }}"] .view-popup__form-button:not(:disabled):focus {
            outline: 0;
            opacity: .75;
        }
        [data-block-id="{{ block['id'] }}"] .view-popup__form-button:disabled {
            cursor: not-allowed;
        }
    </div>
</template>

<script>
export default {
        props: ['block'],
        name: 'templateStyleForm',
    }
</script>