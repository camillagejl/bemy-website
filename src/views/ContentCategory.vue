<template>
    <div class="content_category">

        <MobileContentRecap class="hide_1024"/>

        <div v-if="!category">
            Loading...
        </div>
        <div v-else>
            <h1>
                {{ category.title }}
            </h1>

            <section class="product_previews">
                <div v-if="category.products.length === 0">
                    No products
                </div>
                <router-link
                    v-else
                    v-for="productId in category.products"
                    :to="{ name: 'Product', params: { productId: productId } }"
                    class="product_preview"
                >
                    <div v-if="!productsById[productId]">
                        Loading!
                    </div>
                    <div v-else>
                        <div class="product_image relative_image">
                            <img :src="productsById[productId].images[0]">
                        </div>
                        <div class="product_title">
                            {{ productsById[productId].title }}
                        </div>
                        <div class="product_price">
                            {{ productsById[productId].price }}
                        </div>
                    </div>
                </router-link>
            </section>
        </div>
    </div>
</template>

<script>

    import MobileContentRecap from "../components/MobileContentRecap";
    import {mapGetters} from "vuex";

    export default {
        name: 'ContentCategory',
        components: {MobileContentRecap},
        props: {
            categoryId: String
        },
        computed: {
            ...mapGetters([
                'productCategoriesById',
                'productsById',
            ]),
            category() {
                return this.productCategoriesById[this.categoryId];
            }
        },
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