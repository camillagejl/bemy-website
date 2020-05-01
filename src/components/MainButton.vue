<template>
    <button
        class="main_button"
        :class="{ emphasized: emph, de_emphasized: !emph }">
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
        background-color: var(--colour-primary-400);
    }

    .de_emphasized {
        background-color: var(--colour-primary-300);
    }
</style>
