<template>
    <div class="footer">

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
                <a>
                    +45 12 34 56 78
                </a>
                <a>
                    +45 98 76 54 32
                </a>
                <a>
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
        </div>

        <div class="navigation">
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
            om BEMY
            </a>
            <a>
            Vores historie
            </a>
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

    </div>
</template>

<script>
    export default {
        name: 'Footer'
    }
</script>

<style scoped lang="scss">

    .footer {
        margin: 48px var(--page-margin) 0 var(--page-margin);
    }

    .footer_content {
        display: grid;
        grid-gap: 24px;
    }

    .footer_split {
        margin-bottom: 12px;
    }

    .footer_header {
        font-family: var(--font-family-header);
        line-height: 24px;
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

</style>
