<template>
    <div class="wrapping">

        <div v-if="!products">
            Loading... or no product found.
        </div>

        <div v-else>
            <h1>
                Indpakning
            </h1>

            <div v-if="!product">No product to show</div>

            <div
                v-else
                class="product_container"
            >
                <section class="gallery_container">
                    <ProductGallery
                        :images="product.images"
                        :myDesignImages="myDesignImages()"
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
                        :selectedOption="product.title"
                        :optionKey="'Design'"
                        :optionImages="products"
                    />

                    <!-- Product option w. dropdown -->
                    <div
                        v-for="(option, key) in product.options"
                        v-if="option[0] !== 'Default Title' && !product.optionsWithImages || product.optionsWithImages && !product.optionsWithImages.includes(key)"
                        class="product_option option_w_dropdown"
                    >
                        <label>
                            <strong class="line_break">
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
                        :selectedOption="activeWrapping.selections[key]"
                        :optionKey="key"
                        :optionImages="optionImages(product.variants, key)"
                    />

                    <!-- Designs -->
                    <ProductOptionWImages
                        v-if="product.designs"
                        :selectedOption="activeWrapping.selections.Design"
                        :optionKey="'Design'"
                        :optionImages="product.designs"
                    />

                    <!-- Personalisations -->
                    <div
                        v-if="allPersonalisations"
                        v-for="(personalisation, key) in allPersonalisations()"
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
                                :value="activeWrapping.selections[personalisation.key]"
                            >

                            <textarea
                                v-if="personalisation.type === 'multiline_text'"
                                :maxlength="personalisation.characterMax"
                                :placeholder="personalisation.placeholder"
                                :value="activeWrapping.selections[personalisation.key]"
                            ></textarea>

                            <input
                                v-if="personalisation.type === 'number'"
                                type="number"
                                :value="activeWrapping.selections[personalisation.key]"
                            >

                            <select
                                v-if="personalisation.type === 'dropdown'"
                                class="option_w_dropdown"
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

                    <div class="product_price">
                        <strong>
                            {{ activeWrapping.displayPrice }} kr
                        </strong>
                    </div>

                </section>
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
                :price="activeWrapping.displayPrice"
            />

        </div>


    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters, mapState} from "vuex";
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
            ...mapState([
                'activePackage',
                'packages'
            ]),
            ...mapGetters([
                'productsById',
                'wrappings'
            ]),
            products() {
                if (!this.wrappings) {
                    return []
                }
                if (!Array.isArray(this.wrappings.products)) {
                    return []
                }
                return this.wrappings.products.map(value => this.productsById[value]);
            },
            activeWrapping() {
                return this.packages[this.activePackage].wrapping;
            },
            product() {
                return this.productsById[this.activeWrapping.id];
            },
            activeDesign() {
                let thisDesign = null;

                this.product.designs.forEach(design => {
                    if (!design) {
                        return
                    }

                    if (design.title === this.activeWrapping.selections.Design) {
                        thisDesign = design;
                    }
                });
                return thisDesign;
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
            },
            allPersonalisations() {
                let personalisations = {};

                if (this.product) {
                    Object.keys(this.product.personalisations).forEach((personalisation) => {
                        personalisations[personalisation] = this.product.personalisations[personalisation]
                    });
                }

                if (this.activeDesign) {
                    Object.keys(this.activeDesign.personalisations).forEach(personalisation => {
                        personalisations[personalisation] = this.activeDesign.personalisations[personalisation];
                    });
                }

                return personalisations
            },

            myDesignImages() {
                const images = [];

                Object.keys(this.product.options).forEach(optionKey => {

                    const imageObjects = this.optionImages(this.product.variants);

                    imageObjects.forEach(imageObject => {

                        console.log("Object", imageObject, imageObject[optionKey]);

                        if (this.activeWrapping.selections[optionKey] === imageObject[optionKey]) {
                            images.push(imageObject.image);
                        }
                    })
                });

                this.product.designs.forEach(design => {
                    if (!design) {
                        return;
                    }

                    if (design.title === this.activeWrapping.selections.Design) {
                        images.push(design.image);
                    }
                });

                return images;
            }
        }
    }
</script>

<style scoped lang="scss">

    .product_option {
        margin-bottom: 64px;

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

    select {
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

    input[type = text],
    textarea {
        box-sizing: border-box;
        width: 100%;
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