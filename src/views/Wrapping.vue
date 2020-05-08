<template>
    <div class="wrapping">

        <div v-if="!products">
            Loading... or no product found.
        </div>

        <div v-else>
            <h1>
                Indpakning
            </h1>

            <div
                class="product_container"
            >
                <section class="gallery_container">
                    <ProductGallery
                        :images="products[0].images"
                    />

                    <div class="description display_1024">
                        <h2>
                            Beskrivelse
                        </h2>
                        <div v-html="products[0].description"></div>
                    </div>
                </section>

                <section class="product_information">

                    <ProductOptionWImages
                        :selectedOption="'Valgt design'"
                        :optionKey="'Designs'"
                        :optionImages="products"
                    />

                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters} from "vuex";
    import ProductOptionWImages from "../components/ProductOptionWImages";

    export default {
        name: 'Wrapping',
        components: {ProductOptionWImages, ProductGallery},
        computed: {
            ...mapGetters([
                'productsById',
                'wrappings'
            ]),
            products() {
                return this.wrappings.products.map(value => this.productsById[value]);
            }
        },
        methods: {
            optionImages(variants, key) {
                return variants.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
                });
            }
        }
    }
</script>

<style scoped lang="scss">

    .product_option {

        + .product_option {
            margin: 36px 0;
        }

        p {
            margin: 0;
        }
    }

    .option_label {
        p {
            display: inline-block;
        }
    }

    .option_images {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 8px;

    }

    .option_image {
        opacity: var(--opacity-deselected);
        transition-duration: .3s;

        &.selected,
        &:hover {
            opacity: 1;
        }
    }

    .line_break {
        display: block;
        margin-bottom: 12px;
    }

    .option_w_dropdown select {
        min-width: 100px;
    }

    .product_price {
        font-size: 24px;
        text-align: right;
    }

    @media screen and (min-width: 768px) {
        .option_images {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            grid-gap: 12px;
        }
    }

    @media screen and (min-width: 1024px) {
        .product_container {
            display: flex;
        }

        .gallery_container {
            flex: 2;
        }

        .product_information {
            flex: 3;
            margin-left: 48px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .description {
            margin-top: 24px;
        }
    }

</style>