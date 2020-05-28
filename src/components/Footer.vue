<template>
    <footer>

        <hr>

        <div class="footer_content">

            <div class="contact">
                <strong class="footer_header">
                    Kontakt os
                </strong>
                <div class="footer_split">
                    <p>
                        Egemosevej 12B
                    </p>
                    <p>
                        4174 Jystrup
                    </p>
                </div>

                <div class="footer_split">
                    <a class="not_allowed">
                        +45 12 34 56 78
                    </a>
                    <a>
                        +45 98 76 54 32
                    </a>
                    <a class="not_allowed">
                        kontakt@bemy.dk
                    </a>
                </div>
            </div>

            <div class="subscribe">
                <label>
                    <strong class="footer_header">
                        Modtag vores nyhedsbrev
                    </strong>
                    <input
                        type="text"
                        placeholder="min@mail.dk"
                    >
                </label>
                <MainButton
                    :emph="false"
                    :text="'Skriv mig op'"
                    :icon="'envelope'"
                />
            </div>

            <div class="navigation_1">
                <strong class="footer_header">
                    Information
                </strong>
                <a>
                    FAQ
                </a>
                <a>
                    Kontakt
                </a>
                <a>
                    Om BEMY
                </a>
                <a>
                    Vores historie
                </a>
            </div>

            <div class="navigation_2">
                <a>
                    Leveringstider
                </a>
                <a>
                    B2B & Portfolio
                </a>
                <a>
                    Handelsbetingelser
                </a>
            </div>

        </div>

    </footer>
</template>

<script>
    import MainButton from "./MainButton";

    export default {
        name: 'Footer',
        components: {MainButton}
    }
</script>

<style scoped lang="scss">

    footer {
        margin: 48px 0 96px 0;
    }

    .footer_content {
        margin-top: 24px;

        div:first-child,
        div:nth-child(2) {
            margin-bottom: 24px;
        }
    }

    .footer_header {
        font-family: var(--font-family-header);
        display: block;
        line-height: 32px;
        font-weight: 800;
    }

    p {
        margin: 0;
        line-height: 24px;
    }

    a {
        display: block;
        line-height: 24px;
    }

    .subscribe {
        .main_button,
        input[type="text"] {
            width: 200px;
            box-sizing: border-box;
        }

        .main_button {
            margin-top: 12px;
            padding: 8px;
        }
    }

    @media screen and (min-width: 768px) {
        .footer_content {
            margin: 24px;
            display: grid;
            grid-template-columns: repeat(2, auto);
        }
    }

    @media screen and (min-width: 1024px) {
        footer {
            margin: 48px 0 24px 0;
        }
    }

    @media screen and (min-width: 1200px) {

        .footer_content {
            grid-template-columns: repeat(4, auto);
            grid-gap: 24px;
            margin-bottom: 0;
        }

        .navigation_2 {
            margin-top: 24px;
        }
    }

</style>
