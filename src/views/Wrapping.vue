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
                        :images="products[selectedProductIndex].images"
                    />

                    <div class="description display_1024">
                        <h2>
                            Beskrivelse
                        </h2>
                        <div v-html="products[selectedProductIndex].description"></div>
                    </div>
                </section>

                <section class="product_information">

                    <!-- Select product -->
                    <ProductOptionWImages
                        @updateSelectedProduct="updateSelectedProduct"
                        :selectedOption="'Valgt design'"
                        :optionKey="'Designs'"
                        :optionImages="products"
                    />

                    <div class="product_price">
                        <strong>
                            {{ products[selectedProductIndex].displayPrice }} kr
                        </strong>
                    </div>

                </section>
            </div>

        </div>

        <div class="continue_button_container">
        <MainButton
            class="continue_button"
            :emph="true"
            :text="'Tilføj indhold'"
            :icon="'arrow_right'"
        />
        </div>

        <PriceFooter
        :price="products[selectedProductIndex].displayPrice"
        />

    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters} from "vuex";
    import ProductOptionWImages from "../components/ProductOptionWImages";
    import PriceFooter from "../components/PriceFooter";
    import MainButton from "../components/MainButton";

    export default {
        name: 'Wrapping',
        components: {MainButton, PriceFooter, ProductOptionWImages, ProductGallery},
        data() {
            return {
                selectedProductIndex: 0
            }
        },
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
            },
            updateSelectedProduct(index) {
                this.selectedProductIndex = index;
                console.log(this.selectedProductIndex);
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
        margin-top: 24px;
        text-align: right;
    }

    .continue_button {
        width: 100%;
        margin-top: 48px;
    }

    @media screen and (min-width: 768px) {
        .option_images {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            grid-gap: 12px;
        }

        .continue_button_container {
            display: flex;
            justify-content: flex-end;
        }

        .continue_button {
            width: 400px;
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