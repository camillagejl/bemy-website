<template>
    <div id="app">
            <Header/>

            <main>
                <router-view/>
            </main>

            <MenuMobile/>
<!--                  <router-link to="/">Home</router-link> |-->
<!--                  <router-link to="/about">About</router-link>-->
        </div>
</template>

<script>
    import Home from "./views/Home";
    import Header from "./components/Header";
    import MenuMobile from "./components/MenuMobile";

    export default {
        components: {MenuMobile, Header, Home}
    }
</script>

<style lang="scss">

    :root {
        /* Colour palette */
        --colour-primary-100: #FCF7F8;
        --colour-primary-200: #EEE3E7;
        --colour-primary-300: #E0C1CD;
        --colour-primary-400: #C59EAD;
        --colour-primary-500: #AC7A8E;
        --colour-primary-600: #906B79;
        --colour-primary-700: #745762;
        --colour-primary-800: #563844;
        --colour-primary-900: #41212E;

        --colour-secondary-100: #F9FCFF;

        --colour-grey-100: #FCFCFC;
        --colour-grey-200: #F5F5F5;
        --colour-grey-300: #DCDADE;
        --colour-grey-400: #CBC9CD;
        --colour-grey-500: #A7A5A9;
        --colour-grey-600: #89878A;
        --colour-grey-700: #636363;
        --colour-grey-800: #303030;
        --colour-grey-900: #242126;

        /* Header font */
        --font-family-header: 'Merriweather', serif;

        /* Handwriting font */
        --font-family-handwriting: 'Allura', cursive;

        /* Body font */
        --font-family-primary: 'Roboto', sans-serif;

        /* Shadows */
        --box-shadow-400: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --box-shadow-400-reverse: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);

    }

    body {
        margin: 0;
        font-family: var(--font-family-primary);
        color: var(--colour-grey-900);
        font-size: 16px;
        background-color: var(--colour-grey-100);
    }

    main {
        padding-bottom: 50px;
        margin: 12px;
    }

    /* Texts */

    h1,
    h2 {
        font-family: var(--font-family-header);
        color: var(--colour-grey-800);
        margin: 24px 0 0 0;
    }

    .h1_large {
        font-size: 24px;
        font-weight: 400;
    }

    h2 {
        font-size: 20px;
        font-weight: 300;
    }

    p {
        line-height: 24px;
    }

    button {
        border: none;
        background-color: transparent;
    }


    /* Components */
    .menu_mobile {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>