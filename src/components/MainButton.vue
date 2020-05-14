<template>
    <button
        class="main_button"
        :class="{ emphasized: emph, de_emphasized: !emph }">

        <span
            class="button_icon rotate_90"
            v-if="icon === 'arrow_left'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28.504" height="28.485" viewBox="0 0 28.504 28.485">
  <g id="Group_36" data-name="Group 36" transform="translate(-173 -561.586)">
    <g id="angle-down-duotone" transform="translate(173 418.733)">
      <path id="Path_23" data-name="Path 23"
            d="M14.25,162.324l-5.033,5.029L.628,158.79A2.117,2.117,0,0,1,.612,155.8l.016-.016,2.012-2a2.132,2.132,0,0,1,3.015,0Z"
            transform="translate(0 -0.146)" fill="currentColor" opacity="0.4"/>
      <path id="Path_24" data-name="Path 24"
            d="M122.131,155.626l-2.03-2.01a2.132,2.132,0,0,0-3.015,0L103.47,167.207l3.521,3.508.005.005a2.137,2.137,0,0,0,3.022-.014l12.113-12.071.016-.015A2.118,2.118,0,0,0,122.131,155.626Z"
            transform="translate(-94.255)" fill="currentColor"/>
    </g>
    <g id="angle-down-duotone-2" data-name="angle-down-duotone" transform="translate(179 408.595)">
      <path id="Path_23-2" data-name="Path 23"
            d="M8.251,158.462l-2.914,2.912L.364,156.416a1.226,1.226,0,0,1-.009-1.733l.009-.009,1.165-1.161a1.234,1.234,0,0,1,1.746,0Z"
            transform="translate(0 -0.152)" fill="currentColor" opacity="0.4"/>
      <path id="Path_24-2" data-name="Path 24"
            d="M114.275,154.517l-1.175-1.164a1.234,1.234,0,0,0-1.746,0l-7.884,7.87,2.038,2.031,0,0a1.238,1.238,0,0,0,1.75-.008l7.014-6.989.009-.009A1.226,1.226,0,0,0,114.275,154.517Z"
            transform="translate(-98.134)" fill="currentColor"/>
    </g>
  </g>
</svg>

        </span>

        <span class="button_text"> {{ text }} </span>

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
  <g id="Group_36" data-name="Group 36" transform="translate(-173 -561.586)">
    <g id="angle-down-duotone" transform="translate(173 418.733)">
      <path id="Path_23" data-name="Path 23"
            d="M14.25,162.324l-5.033,5.029L.628,158.79A2.117,2.117,0,0,1,.612,155.8l.016-.016,2.012-2a2.132,2.132,0,0,1,3.015,0Z"
            transform="translate(0 -0.146)" fill="currentColor" opacity="0.4"/>
      <path id="Path_24" data-name="Path 24"
            d="M122.131,155.626l-2.03-2.01a2.132,2.132,0,0,0-3.015,0L103.47,167.207l3.521,3.508.005.005a2.137,2.137,0,0,0,3.022-.014l12.113-12.071.016-.015A2.118,2.118,0,0,0,122.131,155.626Z"
            transform="translate(-94.255)" fill="currentColor"/>
    </g>
    <g id="angle-down-duotone-2" data-name="angle-down-duotone" transform="translate(179 408.595)">
      <path id="Path_23-2" data-name="Path 23"
            d="M8.251,158.462l-2.914,2.912L.364,156.416a1.226,1.226,0,0,1-.009-1.733l.009-.009,1.165-1.161a1.234,1.234,0,0,1,1.746,0Z"
            transform="translate(0 -0.152)" fill="currentColor" opacity="0.4"/>
      <path id="Path_24-2" data-name="Path 24"
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
                                                                             opacity="0.4"></path><path class="fa-primary"
                                                                                                        fill="currentColor"
                                                                                                        d="M448 240v32a32 32 0 0 1-32 32H32a32 32 0 0 1-32-32v-32a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"></path></g></svg>
        </span>

        <span
            class="button_icon"
            v-if="icon === 'boxes'"
            >
            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="boxes" class="svg-inline--fa fa-boxes fa-w-18"
                 role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <g class="fa-group">
        <path class="fa-secondary" fill="currentColor"
              d="M480 288v96l-32-21.3-32 21.3v-96zM320 0v96l-32-21.3L256 96V0zM160 288v96l-32-21.3L96 384v-96z"></path>
        <path class="fa-primary" fill="currentColor"
              d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16V304a16 16 0 0 0-16-16zm-384-64h224a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16h-80v96l-32-21.3L256 96V0h-80a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16V304a16 16 0 0 0-16-16z" opacity="0.4"></path>
    </g>
</svg>
        </span>

        <span
            class="button_icon rotate_270"
            v-if="icon === 'arrow_right'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="28.504" height="28.485" viewBox="0 0 28.504 28.485">
  <g id="Group_36" data-name="Group 36" transform="translate(-173 -561.586)">
    <g id="angle-down-duotone" transform="translate(173 418.733)">
      <path id="Path_23" data-name="Path 23"
            d="M14.25,162.324l-5.033,5.029L.628,158.79A2.117,2.117,0,0,1,.612,155.8l.016-.016,2.012-2a2.132,2.132,0,0,1,3.015,0Z"
            transform="translate(0 -0.146)" fill="currentColor" opacity="0.4"/>
      <path id="Path_24" data-name="Path 24"
            d="M122.131,155.626l-2.03-2.01a2.132,2.132,0,0,0-3.015,0L103.47,167.207l3.521,3.508.005.005a2.137,2.137,0,0,0,3.022-.014l12.113-12.071.016-.015A2.118,2.118,0,0,0,122.131,155.626Z"
            transform="translate(-94.255)" fill="currentColor"/>
    </g>
    <g id="angle-down-duotone-2" data-name="angle-down-duotone" transform="translate(179 408.595)">
      <path id="Path_23-2" data-name="Path 23"
            d="M8.251,158.462l-2.914,2.912L.364,156.416a1.226,1.226,0,0,1-.009-1.733l.009-.009,1.165-1.161a1.234,1.234,0,0,1,1.746,0Z"
            transform="translate(0 -0.152)" fill="currentColor" opacity="0.4"/>
      <path id="Path_24-2" data-name="Path 24"
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
            icon: String
        }
    }
</script>

<style scoped lang="scss">

    .main_button {
        box-shadow: var(--box-shadow-400);
        border-radius: 5px;
        padding: 12px;
        color: white;
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
    }

    .de_emphasized {
        background-color: rgba(var(--colour-primary-300), 1);
    }

    .rotate_270 {
        transform: rotate(270deg);
    }

    .rotate_90 {
        transform: rotate(90deg);
    }
</style>
