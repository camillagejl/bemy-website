<template>
    <button
        class="main_button"
        :class="{ emphasized: emph, de_emphasized: !emph, checkout_color: color === 'checkout' }">

        <span
            class="button_icon rotate_90"
            v-if="icon === 'arrow_left'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28.504" height="28.485" viewBox="0 0 28.504 28.485">
  <g data-name="Group 36" transform="translate(-173 -561.586)">
    <g transform="translate(173 418.733)">
      <path data-name="Path 23"
            d="M14.25,162.324l-5.033,5.029L.628,158.79A2.117,2.117,0,0,1,.612,155.8l.016-.016,2.012-2a2.132,2.132,0,0,1,3.015,0Z"
            transform="translate(0 -0.146)" fill="currentColor" opacity="0.4"/>
      <path data-name="Path 24"
            d="M122.131,155.626l-2.03-2.01a2.132,2.132,0,0,0-3.015,0L103.47,167.207l3.521,3.508.005.005a2.137,2.137,0,0,0,3.022-.014l12.113-12.071.016-.015A2.118,2.118,0,0,0,122.131,155.626Z"
            transform="translate(-94.255)" fill="currentColor"/>
    </g>
    <g data-name="angle-down-duotone" transform="translate(179 408.595)">
      <path data-name="Path 23"
            d="M8.251,158.462l-2.914,2.912L.364,156.416a1.226,1.226,0,0,1-.009-1.733l.009-.009,1.165-1.161a1.234,1.234,0,0,1,1.746,0Z"
            transform="translate(0 -0.152)" fill="currentColor" opacity="0.4"/>
      <path data-name="Path 24"
            d="M114.275,154.517l-1.175-1.164a1.234,1.234,0,0,0-1.746,0l-7.884,7.87,2.038,2.031,0,0a1.238,1.238,0,0,0,1.75-.008l7.014-6.989.009-.009A1.226,1.226,0,0,0,114.275,154.517Z"
            transform="translate(-98.134)" fill="currentColor"/>
    </g>
  </g>
</svg>

        </span>

        <span class="button_text"> {{ text }} </span>

        <span
            class="button_icon"
            v-if="icon === 'wrapping'"
        >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="gift"
                 class="svg-inline--fa fa-gift fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                                 d="M224 320v160H64a32 32 0 0 1-32-32V320zm0-160H32a32 32 0 0 0-32 32v80a16 16 0 0 0 16 16h208zm256 0H288v128h208a16 16 0 0 0 16-16v-80a32 32 0 0 0-32-32zM288 480h160a32 32 0 0 0 32-32V320H288z"
                                                                 opacity="0.4"></path><path class="fa-primary"
                                                                                            fill="currentColor"
                                                                                            d="M224 480h64V320h-64zM359.54 32c-41.82 0-68.86 21.3-103.54 68.3-34.68-47-61.72-68.3-103.54-68.3C103.71 32 64 71.5 64 120a85.65 85.65 0 0 0 10.15 40h78.21a40 40 0 1 1 0-80c20 0 34.78 3.3 86.55 80H224v128h64V160h-15c51.67-76.5 66-80 86.55-80a40 40 0 1 1 0 80h78.31A86.86 86.86 0 0 0 448 120c0-48.5-39.71-88-88.46-88z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'product'"
        >
<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="tshirt" class="svg-inline--fa fa-tshirt fa-w-20"
     role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><g class="fa-group"><path class="fa-secondary"
                                                                                                   fill="currentColor"
                                                                                                   d="M8.86 96.5a16.11 16.11 0 0 0-7.2 21.5l57.23 114.5a16.11 16.11 0 0 0 21.5 7.2l17.32-8.48L26.09 88zm459-80.95a187.31 187.31 0 0 1-13.32 13.26C418.45 61.3 370.67 79.2 320 79.2s-98.41-17.9-134.51-50.39a187.31 187.31 0 0 1-13.32-13.26L54.76 73.75l71.69 143.4L137 212a16 16 0 0 1 23 14.4V480a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V226.3a16 16 0 0 1 23-14.4l10.57 5.18L585.19 73.7zm163.31 81l-17.32-8.59-71.6 143.19 17.24 8.45h.06a16 16 0 0 0 21.45-7.2L638.28 118a16 16 0 0 0-7.1-21.5z"
                                                                                                   opacity="0.4"></path><path
    class="fa-primary" fill="currentColor"
    d="M320 47.2c-51.89 0-96.39-19.4-116.49-47.2l-31.34 15.55a187.31 187.31 0 0 0 13.32 13.26C221.59 61.3 269.37 79.2 320 79.2s98.43-17.9 134.53-50.39a187.31 187.31 0 0 0 13.32-13.26L436.51 0c-20.1 27.8-64.6 47.2-116.51 47.2zM26.09 88l71.62 143.22 28.74-14.07-71.69-143.4zm559.1-14.3l-71.68 143.38 28.74 14.07 71.61-143.24z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'cart'"
        >
<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="shopping-cart"
     class="svg-inline--fa fa-shopping-cart fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 576 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                     d="M552 64H159.21l52.36 256h293.15a24 24 0 0 0 23.4-18.68l47.27-208a24 24 0 0 0-18.08-28.72A23.69 23.69 0 0 0 552 64z"
                                                     opacity="0.4"></path><path class="fa-primary" fill="currentColor"
                                                                                d="M218.12 352h268.42a24 24 0 0 1 23.4 29.32l-5.52 24.28a56 56 0 1 1-63.6 10.4H231.18a56 56 0 1 1-67.05-8.57L93.88 64H24A24 24 0 0 1 0 40V24A24 24 0 0 1 24 0h102.53A24 24 0 0 1 150 19.19z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'trash'"
        >
        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash-alt"
             class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512">
            <g class="fa-group">
                <path class="fa-secondary" fill="currentColor"
                      d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96H32zm272-288a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0z"
                      opacity="0.4"></path>
                <path class="fa-primary" fill="currentColor"
                      d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM128 160a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16z"></path>
            </g>
        </svg>
            </span>


        <span
            class="button_icon"
            v-if="icon === 'duplicate'"
        >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="clone"
                 class="svg-inline--fa fa-clone fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                                 d="M48 512a48 48 0 0 1-48-48V176a48 48 0 0 1 48-48h48v208a80.09 80.09 0 0 0 80 80h208v48a48 48 0 0 1-48 48H48z"
                                                                 opacity="0.4"></path><path class="fa-primary"
                                                                                            fill="currentColor"
                                                                                            d="M512 48v288a48 48 0 0 1-48 48H176a48 48 0 0 1-48-48V48a48 48 0 0 1 48-48h288a48 48 0 0 1 48 48z"></path></g></svg>

        </span>


        <span
            class="button_icon"
            v-if="icon === 'edit'"
        >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="pencil-alt"
                 class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                                 d="M96 352H32l-16 64 80 80 64-16v-64H96zM498 74.26l-.11-.11L437.77 14a48.09 48.09 0 0 0-67.9 0l-46.1 46.1a12 12 0 0 0 0 17l111 111a12 12 0 0 0 17 0l46.1-46.1a47.93 47.93 0 0 0 .13-67.74z"
                                                                 opacity="0.4"></path><path class="fa-primary"
                                                                                            fill="currentColor"
                                                                                            d="M.37 483.85a24 24 0 0 0 19.47 27.8 24.27 24.27 0 0 0 8.33 0l67.32-16.16-79-79zM412.3 210.78l-111-111a12.13 12.13 0 0 0-17.1 0L32 352h64v64h64v64l252.27-252.25a12 12 0 0 0 .03-16.97zm-114.41-24.93l-154 154a14 14 0 1 1-19.8-19.8l154-154a14 14 0 1 1 19.8 19.8z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'arrow_down'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28.504" height="28.485" viewBox="0 0 28.504 28.485">
  <g data-name="Group 36" transform="translate(-173 -561.586)">
    <g transform="translate(173 418.733)">
      <path data-name="Path 23"
            d="M14.25,162.324l-5.033,5.029L.628,158.79A2.117,2.117,0,0,1,.612,155.8l.016-.016,2.012-2a2.132,2.132,0,0,1,3.015,0Z"
            transform="translate(0 -0.146)" fill="currentColor" opacity="0.4"/>
      <path data-name="Path 24"
            d="M122.131,155.626l-2.03-2.01a2.132,2.132,0,0,0-3.015,0L103.47,167.207l3.521,3.508.005.005a2.137,2.137,0,0,0,3.022-.014l12.113-12.071.016-.015A2.118,2.118,0,0,0,122.131,155.626Z"
            transform="translate(-94.255)" fill="currentColor"/>
    </g>
    <g data-name="angle-down-duotone" transform="translate(179 408.595)">
      <path data-name="Path 23"
            d="M8.251,158.462l-2.914,2.912L.364,156.416a1.226,1.226,0,0,1-.009-1.733l.009-.009,1.165-1.161a1.234,1.234,0,0,1,1.746,0Z"
            transform="translate(0 -0.152)" fill="currentColor" opacity="0.4"/>
      <path data-name="Path 24"
            d="M114.275,154.517l-1.175-1.164a1.234,1.234,0,0,0-1.746,0l-7.884,7.87,2.038,2.031,0,0a1.238,1.238,0,0,0,1.75-.008l7.014-6.989.009-.009A1.226,1.226,0,0,0,114.275,154.517Z"
            transform="translate(-98.134)" fill="currentColor"/>
    </g>
  </g>
</svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'plus'"
        >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="plus"
                 class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                                 d="M176 448a32 32 0 0 0 32 32h32a32 32 0 0 0 32-32V304h-96zm64-416h-32a32 32 0 0 0-32 32v144h96V64a32 32 0 0 0-32-32z"
                                                                 opacity="0.4"></path><path class="fa-primary"
                                                                                            fill="currentColor"
                                                                                            d="M448 240v32a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32v-32a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'plus-plus'"
        >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="plus"
                 class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                                 d="M176 448a32 32 0 0 0 32 32h32a32 32 0 0 0 32-32V304h-96zm64-416h-32a32 32 0 0 0-32 32v144h96V64a32 32 0 0 0-32-32z"
                                                                 opacity="0.4"></path><path class="fa-primary"
                                                                                            fill="currentColor"
                                                                                            d="M448 240v32a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32v-32a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"></path></g></svg>
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="plus"
                             class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512"><g class="fa-group"><path class="fa-secondary" fill="currentColor"
                                                                             d="M176 448a32 32 0 0 0 32 32h32a32 32 0 0 0 32-32V304h-96zm64-416h-32a32 32 0 0 0-32 32v144h96V64a32 32 0 0 0-32-32z"
                                                                             opacity="0.4"></path><path
                            class="fa-primary"
                            fill="currentColor"
                            d="M448 240v32a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32v-32a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'boxes'"
        >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="boxes"
                 class="svg-inline--fa fa-boxes fa-w-18"
                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <g class="fa-group">
        <path class="fa-secondary" fill="currentColor"
              d="M480 288v96l-32-21.3-32 21.3v-96zM320 0v96l-32-21.3L256 96V0zM160 288v96l-32-21.3L96 384v-96z"></path>
        <path class="fa-primary" fill="currentColor"
              d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16V304a16 16 0 0 0-16-16zm-384-64h224a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16h-80v96l-32-21.3L256 96V0h-80a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16V304a16 16 0 0 0-16-16z"
              opacity="0.4"></path>
    </g>
</svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'save'"
        >
<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="save" class="svg-inline--fa fa-save fa-w-14"
     role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><g class="fa-group"><path class="fa-secondary"
                                                                                                   fill="currentColor"
                                                                                                   d="M288 352a64 64 0 1 1-64-64 64 64 0 0 1 64 64z"
                                                                                                   opacity="0.4"></path><path
    class="fa-primary" fill="currentColor"
    d="M433.94 129.94l-83.88-83.88A48 48 0 0 0 316.12 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V163.88a48 48 0 0 0-14.06-33.94zM224 416a64 64 0 1 1 64-64 64 64 0 0 1-64 64zm96-204a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12V108a12 12 0 0 1 12-12h228.52a12 12 0 0 1 8.48 3.52l3.48 3.48a12 12 0 0 1 3.52 8.48z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'envelope'"
        >
<svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="envelope"
     class="svg-inline--fa fa-envelope fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g
    class="fa-group"><path class="fa-secondary" fill="currentColor"
                           d="M256.47 352h-.94c-30.1 0-60.41-23.42-82.54-40.52C169.39 308.7 24.77 202.7 0 183.33V400a48 48 0 0 0 48 48h416a48 48 0 0 0 48-48V183.36c-24.46 19.17-169.4 125.34-173 128.12-22.12 17.1-52.43 40.52-82.53 40.52zM464 64H48a48 48 0 0 0-48 48v19a24.08 24.08 0 0 0 9.2 18.9c30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4 23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7A23.93 23.93 0 0 0 512 131v-19a48 48 0 0 0-48-48z"
                           opacity="0.4"></path><path class="fa-primary" fill="currentColor"
                                                      d="M512 131v52.36c-24.46 19.17-169.4 125.34-173 128.12-22.12 17.1-52.43 40.52-82.53 40.52h-.94c-30.1 0-60.41-23.42-82.54-40.52C169.39 308.7 24.77 202.7 0 183.33V131a24.08 24.08 0 0 0 9.2 18.9c30.6 23.9 40.7 32.4 173.4 128.7 16.69 12.12 49.75 41.4 72.93 41.4h.94c23.18 0 56.24-29.28 72.93-41.4 132.7-96.3 142.8-104.7 173.4-128.7A23.93 23.93 0 0 0 512 131z"></path></g></svg>
        </span>

        <span
            class="button_icon rotate_270"
            v-if="icon === 'arrow_right'"
        >
<svg xmlns="http://www.w3.org/2000/svg" width="28.504" height="28.485" viewBox="0 0 28.504 28.485">
  <g data-name="Group 36" transform="translate(-173 -561.586)">
    <g transform="translate(173 418.733)">
      <path data-name="Path 23"
            d="M14.25,162.324l-5.033,5.029L.628,158.79A2.117,2.117,0,0,1,.612,155.8l.016-.016,2.012-2a2.132,2.132,0,0,1,3.015,0Z"
            transform="translate(0 -0.146)" fill="currentColor" opacity="0.4"/>
      <path data-name="Path 24"
            d="M122.131,155.626l-2.03-2.01a2.132,2.132,0,0,0-3.015,0L103.47,167.207l3.521,3.508.005.005a2.137,2.137,0,0,0,3.022-.014l12.113-12.071.016-.015A2.118,2.118,0,0,0,122.131,155.626Z"
            transform="translate(-94.255)" fill="currentColor"/>
    </g>
    <g data-name="angle-down-duotone" transform="translate(179 408.595)">
      <path data-name="Path 23"
            d="M8.251,158.462l-2.914,2.912L.364,156.416a1.226,1.226,0,0,1-.009-1.733l.009-.009,1.165-1.161a1.234,1.234,0,0,1,1.746,0Z"
            transform="translate(0 -0.152)" fill="currentColor" opacity="0.4"/>
      <path data-name="Path 24"
            d="M114.275,154.517l-1.175-1.164a1.234,1.234,0,0,0-1.746,0l-7.884,7.87,2.038,2.031,0,0a1.238,1.238,0,0,0,1.75-.008l7.014-6.989.009-.009A1.226,1.226,0,0,0,114.275,154.517Z"
            transform="translate(-98.134)" fill="currentColor"/>
    </g>
  </g>
</svg>

        </span>

    </button>
</template>

<script>
    export default {
        name: 'MainButton',
        props: {
            emph: Boolean,
            text: String,
            icon: String,
            color: String
        }
    }
</script>

<style scoped lang="scss">

    .main_button {
        box-shadow: var(--box-shadow-400);
        border-radius: 5px;
        padding: 12px;
        color: rgba(var(--colour-grey-100), 1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font-family-header);
    }

    .button_text {
    }

    .button_icon {
        margin-left: 8px;

        svg {
            height: 14px;
        }
    }

    .emphasized {
        background-color: rgba(var(--colour-primary-400), 1);
        transition: .3s;

        &:hover {
            background-color: rgba(var(--colour-primary-410), 1);
            transition: .3s;
        }
    }

    .de_emphasized {
        background-color: rgba(var(--colour-primary-300), 1);
        transition: .3s;

        &:hover {
            background-color: rgba(var(--colour-primary-310), 1);
            transition: .3s;
        }
    }

    .checkout_color {
        background-color: green;

        &:hover {
            background-color: #007300;
        }
    }

    /* For arrow right */
    .rotate_270 {
        transform: rotate(270deg);
    }

    /* For arrow left */
    .rotate_90 {
        transform: rotate(90deg);
        margin-right: 8px;
    }
</style>
