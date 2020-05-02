<template>
    <div class="content_category">

        <MobileContentRecap class="hide_1024"/>

        <h1>
            {{ category.title }}
        </h1>

        <section class="product_previews">
            <router-link
                :to="{ name: 'Product', params: { product: product } }"
                v-for="product in category.products"
                class="product_preview">
                <div class="product_image relative_image">
                    <img :src="product.images[0]">
                </div>
                <div class="product_title">
                    {{ product.title }}
                </div>
                <div class="product_price">
                    {{ product.price }}
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>

    import MobileContentRecap from "../components/MobileContentRecap";

    export default {
        name: 'ContentCategory',
        components: {MobileContentRecap},
        props: {
            category: Object
        }
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

    a {
        text-decoration: none;

        .product_title {
            font-family: var(--font-family-header);
            font-weight: 700;
            margin: 8px 0 4px 0;
            color: var(--colour-grey-900);
        }

        .product_price {
            color: var(--colour-grey-700);
        }

    }

    @media screen and (min-width: 1200px) {
        .product_previews {
            grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
            grid-gap: 48px;
        }
    }

</style>