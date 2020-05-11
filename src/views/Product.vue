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

                <section class="gallery_container">
                    <ProductGallery
                        :images="product.images"
                    />

                    <div class="description display_1024">
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>
                </section>

                <section class="product_information">

                    <div class="product_options">

                        <!-- Product option w. dropdown -->
                        <div
                            v-for="(option, key) in product.options"
                            v-if="option[0] !== 'Default Title' && !product.optionsWithImages || product.optionsWithImages && !product.optionsWithImages.includes(key)"
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
                        <ProductOptionWImages
                            v-for="(option, key) in product.options"
                            v-if="product.optionsWithImages && product.optionsWithImages.includes(key)"
                            :selectedOption="option[0]"
                            :optionKey="key"
                            :optionImages="optionImages(product.variants, key)"
                        />

                        <!-- Designs -->
                        <ProductOptionWImages
                            v-if="product.designs"
                            :selectedOption="'Valgt design'"
                            :optionKey="'Designs'"
                            :optionImages="product.designs"
                        />

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

                                <select
                                    v-if="personalisation.type === 'dropdown'"
                                    class="product_option option_w_dropdown"
                                >
                                    <option
                                        v-for="value in personalisation.selectOptions"
                                        value="value"
                                    >
                                        {{ value }}
                                    </option>
                                </select>

                            </label>
                        </div>
                    </div>

                    <div class="description hide_1024">
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>

                    <div class="product_bottom">
                        <div class="product_price">
                            <strong>
                                {{ product.displayPrice }} kr
                            </strong>
                        </div>

                        <div class="add_buttons">
                            <MainButton
                                :emph="true"
                                :text="'Tilføj til denne pakke'"
                                :icon="'plus'"
                            />

                            <MainButton
                                :emph="false"
                                :text="'Tilføj til flere pakker'"
                                :icon="'plus-plus'"
                            />
                        </div>

                    </div>

                </section>

            </div>

        </div>

    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters} from "vuex";
    import ProductOptionWImages from "../components/ProductOptionWImages";
    import MainButton from "../components/MainButton";

    export default {
        name: 'Product',
        components: {MainButton, ProductOptionWImages, ProductGallery},
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

    input[type = text] {
        box-sizing: border-box;
        width: 100%;
    }

    .add_buttons {
        margin-top: 24px;

        .main_button {
            width: 100%;
        }
    }

    @media screen and (min-width: 768px) {
        .add_buttons {
            display: flex;

            .main_button {
                flex: 1;

                + .main_button {
                    margin-left: 12px;
                }
            }

        }
    }

    @media screen and (min-width: 1024px) {
        .product_container {
            display: flex;
            flex-direction: row;
        }

        .gallery_container {
            flex: 3;
        }

        .product_information {
            flex: 4;
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