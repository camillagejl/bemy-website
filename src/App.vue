<template>
    <div id="app">
        <Header/>

        <main>
            <router-view/>
        </main>

        <Footer/>

        <MenuMobile/>
    </div>
</template>

<script>
    import Home from "./views/Home";
    import Header from "./components/Header";
    import MenuMobile from "./components/MobileMenu";
    import Footer from "./components/Footer";

    export default {
        components: {Footer, MenuMobile, Header, Home}
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

        --colour-grey-100: 252, 252, 252;
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
        --font-size-primary: 16px;

        /* Shadows */
        --box-shadow-400: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --box-shadow-400-reverse: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);

        /* Margins */
        --page-margin: 24px;

        /* Borders */
        --main-border-radius: 5px;

    /* Opacities */
        --opacity-deselected: .5;

    }

    body {
        margin: 0;
        font-family: var(--font-family-primary);
        color: var(--colour-grey-900);
        font-size: var(--font-size-primary);
        background-color: rgba(var(--colour-grey-100), 1);
    }

    #app {
        margin-bottom: 75px;
    }

    main {
        margin: 0 var(--page-margin);
    }

    /* General styling */

    a {
        color: var(--colour-primary-600);
        text-decoration: underline;
    }

    h1,
    h2 {
        font-family: var(--font-family-header);
        color: var(--colour-grey-800);
        margin: 24px 0;
    }

    h1 {
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
    input[type="text"]
    {
        border-radius: var(--main-border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow-400);
    }

    select,
    input {
        border: 1px solid var(--colour-grey-500);
        padding: 8px;
    }

    hr {
        border: 1px solid var(--colour-primary-200)
    }

    /* Components */
    .menu_mobile {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

</style>