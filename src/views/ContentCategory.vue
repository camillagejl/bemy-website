<template>
    <div class="content_category">

        <MobileContentRecap class="hide_1024"/>

        <h1>
            Beklædning
        </h1>

        <section class="product_previews">
            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-1.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-5.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-3.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-4.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-5.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-5.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-3.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-4.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

            <div class="product_preview">
                <div class="product_image relative_image">
                    <img src="../assets/placeholders/category-1.jpg">
                </div>
                <div class="product_title">
                    Personlig Kimono
                </div>
                <div class="product_price">
                    229,95 kr
                </div>
            </div>

        </section>

    </div>
</template>

<script>

    import MobileContentRecap from "../components/MobileContentRecap";
    export default {
        name: 'ContentCategory',
        components: {MobileContentRecap},
    }

</script>

<style scoped lang="scss">

    .product_previews {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        grid-gap: 24px;
    }

    .product_image {
        border-radius: var(--main-border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow-400);
    }

    .product_title {
        font-family: var(--font-family-header);
        font-weight: 700;
        margin: 8px 0 4px 0;
    }

    .product_price {
        color: var(--colour-grey-700);
    }

    @media screen and (min-width: 1200px) {
        .product_previews {
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            grid-gap: 48px;
        }
    }

</style>