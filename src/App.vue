<template>
    <div id="app">
        <Header/>

        <div class="desktop_flex_row">
            <MainNavigation/>
            <div class="main_section">
                <main>
                    <router-view/>
                </main>
                <Footer/>
            </div>

        </div>
    </div>
</template>

<script>
    import Home from "./views/Home";
    import Header from "./components/Header";
    import MainNavigation from "./components/MainNavigation";
    import Footer from "./components/Footer";
    import {mapActions, mapGetters} from "vuex";

    export default {
        components: {MainNavigation, Footer, Header, Home},
        data() {
            return {
                collections: [],
                products: [],
            }
        },
        methods: {
            ...mapActions([
                'fetchProducts',
                'fetchCollections',
            ]),
        },
        mounted() {
            this.fetchProducts();
            this.fetchCollections();
        }

    }
</script>

<style lang="scss">

    :root {
        /* Colour palette */
        --colour-primary-100: 252, 247, 248;
        --colour-primary-200: 238, 227, 231;
        --colour-primary-300: 224, 193, 205;
        --colour-primary-400: 197, 158, 173;
        --colour-primary-500: 172, 122, 142;
        --colour-primary-600: 144, 107, 121;
        --colour-primary-700: 116, 87, 98;
        --colour-primary-800: 86, 56, 68;
        --colour-primary-900: 65, 33, 46;

        --colour-secondary-100: #F9FCFF;

        --colour-grey-100: 252, 252, 252;
        --colour-grey-200: 245, 245, 245;
        --colour-grey-300: 220, 218, 222;
        --colour-grey-400: 203, 201, 205;
        --colour-grey-500: 167, 165, 169;
        --colour-grey-600: 137, 135, 138;
        --colour-grey-700: 99, 99, 99;
        --colour-grey-800: 48, 48, 48;
        --colour-grey-900: 36, 33, 38;

        /* Header font */
        --font-family-header: 'Merriweather', serif;

        /* Handwriting font */
        --font-family-handwriting: 'Allura', cursive;

        /* Body font */
        --font-family-primary: 'Roboto', sans-serif;
        --font-size-primary: 16px;

        /* Shadows */
        --box-shadow-400: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --box-shadow-400-top: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
        --box-shadow-400-left: 0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06);

        /* Margins */
        --page-margin: 24px;

        /* Borders */
        --main-border-radius: 5px;

        /* Opacities */
        --opacity-deselected: .5;

    }

    html {
        scroll-behavior: smooth;
    }

    body {
        margin: 0;
        font-family: var(--font-family-primary);
        color: rgba(var(--colour-grey-900), 1);
        font-size: var(--font-size-primary);
        background-color: rgba(var(--colour-grey-100), 1);
    }

    #app {
        box-sizing: border-box;
        padding-bottom: 50px;
        height: 100vh;
    }

    .desktop_flex_row {
        min-height: 100%;
    }

    .main_section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 var(--page-margin);
    }

    /* General styling */

    a {
        color: rgba(var(--colour-primary-600), 1);
        text-decoration: underline;
    }

    h1,
    h2,
    h3,
    h4 {
        font-family: var(--font-family-header);
        color: rgba(var(--colour-grey-800), 1);
    }

    h1 {
        font-size: 24px;
        font-weight: 400;
        margin: 24px 0;
    }

    h2 {
        font-size: 20px;
        font-weight: 300;
        margin: 0;
    }

    h3 {
        font-weight: 400;
        font-size: 18px;
    }

    h4 {
        margin: 0;
        font-weight: 600;
        font-size: 16px;
    }

    strong {
        font-weight: 500;
    }

    p {
        line-height: 24px;
    }

    button {
        border: none;
        background-color: transparent;
        font-size: inherit;
        cursor: pointer;
    }

    img {
        width: 100%;
        display: block;
    }

    .relative_image {
        position: relative;

        &::after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .rounded_box,
    select,
    input[type="text"],
    textarea {
        border-radius: var(--main-border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow-400);
    }

    select,
    input,
    textarea {
        border: 1px solid rgba(var(--colour-grey-500), 1);
        padding: 8px;
    }

    textarea {
        resize: vertical;
    }

    .developer_note {
        color: red;
    }

    hr {
        border: 1px solid rgba(var(--colour-primary-200), 1);
    }

    .basic_icon {
        fill: rgba(var(--colour-primary-600), 1);
        height: 12px;
        margin-left: 4px;
        cursor: pointer;
    }

    /* Components */
    .main_navigation {
        z-index: 2;
        box-shadow: var(--box-shadow-400-top);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        nav {
            height: 50px;
        }
    }

    /* Helpers */

    .flex_center_align {
        display: flex;
        align-items: center;
    }

    .display_1024 {
        display: none;
    }

    .display_768 {
        display: none;
    }

    .hide_768 {
        display: block;
    }

    .inline {
        display: inline-block;
    }

    /* Media queries */

    @media screen and (min-width: 768px) {
        h1 {
            font-size: 36px;
        }

        .display_768 {
            display: block;
        }

        .hide_768 {
            display: none;
        }
    }

    @media screen and (min-width: 1024px) {
        #app {
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin: 0;
        }

        .header {
            z-index: 1;
        }

        .desktop_flex_row {
            display: flex;
            overflow: hidden;
            height: 100%;
        }

        .main_section {
            box-sizing: border-box;
            width: 100%;
            box-shadow: var(--box-shadow-400-left);
            height: 100%;
            overflow-y: scroll;
            padding: var(--page-margin);
        }

        .main_navigation {
            z-index: inherit;
            position: static;
            flex: 0 0 250px;
            box-shadow: none;
        }

    /* Helpers */

        .display_1024 {
            display: block;
        }

        .hide_1024 {
            display: none;
        }


        .flex_center_align_1024 {
            display: flex;
            align-items: center;
        }

    }

    @media screen and (min-width: 1700px) {
        :root {
            --page-margin: 48px 192px;
        }
    }

</style>