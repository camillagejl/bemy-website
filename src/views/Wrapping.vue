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
                        :designTab="true"
                    />

                    <div class="description display_1024">
                        <h2>
                            Beskrivelse
                        </h2>
                        <div v-html="product.description"></div>
                    </div>
                </section>

                <section class="product_information">

                    <!-- Select product -->
                    <ProductOptionWImages
                        @updateSelectedProduct="updateSelectedProduct"
                        :selectedOption="product.title"
                        :optionKey="'Design'"
                        :optionImages="products"
                        :productType="'wrappingProduct'"
                    />

                    <!-- Product option w. dropdown -->
<!--                    <div-->
<!--                        v-for="(option, key) in product.options"-->
<!--                        v-if="option[0] !== 'Default Title' && !product.optionsWithImages && activeWrapping || product.optionsWithImages && !product.optionsWithImages.includes(key) && activeWrapping"-->
<!--                        class="product_option option_w_dropdown"-->
<!--                    >-->
<!--                        <label>-->
<!--                            <strong class="line_break">-->
<!--                                {{ key }}:-->
<!--                            </strong>-->
<!--                            <select-->
<!--                                :name="key"-->
<!--                                :value="activeWrapping.selections[key]"-->
<!--                                @input="updateInputSelectionValueInStore"-->
<!--                            >-->
<!--                                <option-->
<!--                                    v-for="value in option"-->
<!--                                    :value="value"-->
<!--                                >-->
<!--                                    {{ value }}-->
<!--                                </option>-->
<!--                            </select>-->
<!--                        </label>-->
<!--                    </div>-->

                    <PersonalisationInput
                        v-for="(option, key) in product.options"
                        v-if="option[0] !== 'Default Title' && !product.optionsWithImages && activeWrapping || product.optionsWithImages && !product.optionsWithImages.includes(key) && activeWrapping"
                        :personalisation="option"
                        :type="'dropdown'"
                        :personalisationKey="key"
                        :productId="product.id"
                        :activeProduct="activeWrapping"
                        :productType="'wrapping'"
                    />

                    <!-- Product option w. images -->
                    <ProductOptionWImages
                        v-for="(option, key) in product.options"
                        v-if="product.optionsWithImages && product.optionsWithImages.includes(key)"
                        :selectedOption="activeWrapping.selections[key]"
                        :optionKey="key"
                        :optionImages="optionImages(product.variants, key)"
                        :productId="product.id"
                        :productType="'wrapping'"
                    />

                    <!-- Designs -->
                    <ProductOptionWImages
                        v-if="product.designs"
                        :selectedOption="activeWrapping.selections.Design"
                        :optionKey="'Design'"
                        :optionImages="product.designs"
                        :productId="product.id"
                        :productType="'wrapping'"
                    />

                    <!-- Personalisations -->
                    <PersonalisationInput
                        v-for="(personalisation, key) in allPersonalisations()"
                        :personalisation="personalisation"
                        :productId="product.id"
                        :personalisationKey="personalisation.key"
                        :activeProduct="activeWrapping"
                        :productType="'wrapping'"
                    />

                    <div class="product_price">
                        <strong>
                            {{ activeWrapping.displayPrice }} kr
                        </strong>
                    </div>

                </section>
            </div>

            <div class="continue_button_container">

                <router-link
                    :to="{ name: 'ContentCategoriesOverview' }"
                >
                    <MainButton
                        class="continue_button"
                        :emph="true"
                        :text="'Tilføj indhold'"
                        :icon="'arrow_right'"
                    />
                </router-link>
            </div>

            <PriceFooter
                v-if="activeWrapping"
                :price="activeWrapping.displayPrice"
            />

        </div>


    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ProductOptionWImages from "../components/ProductOptionWImages";
    import PriceFooter from "../components/PriceFooter";
    import MainButton from "../components/MainButton";
    import PersonalisationInput from "../components/PersonalisationInput";

    export default {
        name: 'Wrapping',
        components: {PersonalisationInput, MainButton, PriceFooter, ProductOptionWImages, ProductGallery},
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
                let activeWrapping = this.packages[this.activePackage].wrapping;

                if (!activeWrapping) {
                    if (this.products[0]) {
                        this.addActiveProductFromProductId({productId: this.products[0].id, type: 'wrapping'});
                        activeWrapping = this.packages[this.activePackage].wrapping;
                    }
                }

                return activeWrapping;
            },
            product() {
                if (!this.activeWrapping) {
                    return;
                }

                return this.productsById[this.activeWrapping.id];
            },
            activeDesign() {
                let thisDesign = null;

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (design.Design === this.activeWrapping.selections.Design) {
                            thisDesign = design;
                        }
                    });
                }

                return thisDesign;
            }
        },
        methods: {
            ...mapMutations([
                'addActiveProductFromProductId',
                'updateSelectionValue',
            ]),
            updateInputSelectionValueInStore(e) {
                this.updateSelectionValue({
                    productId: this.productId,
                    value: e.target.value,
                    name: e.target.name,
                    type: 'wrapping'
                });
            },
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

                    const imageObjects = this.optionImages(this.product.variants, optionKey);

                    imageObjects.forEach(imageObject => {

                        console.log("Object", imageObject, imageObject[optionKey]);

                        if (this.activeWrapping.selections[optionKey] === imageObject[optionKey]) {
                            images.push(imageObject.image);
                        }
                    })
                });

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (!design) {
                            return;
                        }

                        if (design.title === this.activeWrapping.selections.Design) {
                            images.push(design.image);
                        }
                    })
                }

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

            a {
                text-decoration: none;
            }
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