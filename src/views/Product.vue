<template>
    <div class="product">

        <div v-if="!product">
            Loading... or no product found.
        </div>

        <div v-else>
            <h1>
                {{ product.title}}
            </h1>

            <div class="product_container">

                <div class="gallery_container">
                    <ProductGallery
                        :images="product.images"
                    />


                    <div class="description display_1024">
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>
                </div>

                <section class="product_options">

                    <!-- Product option w. dropdown -->
                    <div
                        v-for="(option, key) in product.options"
                        v-if="product.optionsWithImages && !product.optionsWithImages.includes(key)"
                        class="product_option option_w_dropdown"
                    >
                        <label>
                            <strong>
                                {{ key }}:
                            </strong>
                            <select>
                                <option
                                    v-for="value in option"
                                    value="value"
                                >
                                    {{ value }}
                                </option>
                            </select>
                        </label>
                    </div>

                    <!-- Product option w. images -->
                    <div
                        v-for="(option, key) in product.options"
                        v-if="product.optionsWithImages && product.optionsWithImages.includes(key)"
                        class="product_option"
                    >
                        <strong>{{ key }}</strong>: {{ option[0] }}
                        <div class="option_images">
                            <div
                                v-for="variant in optionImages(product.variants, key)"
                                class="images_container"
                            >
                                <div class="option_image relative_image rounded_box">

                                    <img :src="variant.image">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Designs -->
                    <div
                        v-if="product.designs"
                        class="product_option"
                    >
                        <strong>Design</strong>: {{ Object.keys(product.designs)[0] }}
                        <div class="option_images">
                            <div
                                v-for="design in product.designs"
                                class="images_container"
                            >
                                <div class="option_image relative_image rounded_box">

                                    <img :src="design.image">
                                </div>
                            </div>
                        </div>
                    </div>


                    <div
                        v-for="(personalisation, key) in product.personalisations"
                        class="product_option"

                    >
                        <label
                        >
                        <span class="line_break">
                        <strong>
                            {{ personalisation.key }}
                        </strong>

                        <span
                            v-if="personalisation.characterMax"
                        >
                        (maks. {{personalisation.characterMax }} tegn)
                            </span>
                        </span>


                            <input
                                v-if="personalisation.type === 'line_text'"
                                type="text"
                                :maxlength="personalisation.characterMax"
                                :placeholder="personalisation.placeholder"
                            >
                            <textarea
                                v-if="personalisation.type === 'multiline_text'"
                                :maxlength="personalisation.characterMax"
                                :placeholder="personalisation.placeholder"
                            ></textarea>
                            <input
                                v-if="personalisation.type === 'number'"
                                type="number"
                            >
                        </label>
                    </div>
                </section>

            </div>

            <div class="description hide_1024">
                <h2>
                    Beskrivelse
                </h2>

                <div v-html="product.description"></div>

            </div>

        </div>

    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters} from "vuex";

    export default {
        name: 'Product',
        components: {ProductGallery},
        props: {
            productId: String
        },
        computed: {
            ...mapGetters([
                'productsById',
            ]),
            product() {
                return this.productsById[this.productId];
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

        .product_options {
            flex: 3;
            margin-left: 48px;
        }

        .description {
            margin-top: 24px;
        }
    }

</style>