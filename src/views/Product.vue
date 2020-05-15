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
                        :myDesignImages="myDesignImages()"
                    />

                    <!--  -->

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
                            :selectedOption="activeProduct.selections[key]"
                            :optionKey="key"
                            :optionImages="optionImages(product.variants, key)"
                        />

                        <!-- Designs -->
                        <ProductOptionWImages
                            v-if="product.designs"
                            :selectedOption="activeProduct.selections.Design"
                            :optionKey="'Design'"
                            :optionImages="product.designs"
                        />


                        <!-- Personalisations -->
                        <div
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
                                    :name="key"
                                    :value="activeProduct.selections[personalisation.key]"
                                    @input="updateSelectionValueInStore"
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
                                @click.native="displayAddedToPackage = true"
                            />

                            <MainButton
                                :emph="false"
                                :text="'Tilføj til flere pakker'"
                                :icon="'plus-plus'"
                                @click.native="displayAddToPackages = true"
                            />
                        </div>

                    </div>

                </section>

            </div>

        </div>

        <!-- Popup when adding to one package -->
        <ProductPopup
            v-if="displayAddedToPackage"
            :product="activeProduct"
            :headline="'Produktet er tilføjet til din pakke'"
            :popupType="'addedToPackage'"
        />

        <!-- Popup when adding to multiple packages -->
        <ProductPopup
            v-if="displayAddToPackages"
            :product="activeProduct"
            :headline="'Tilføj produkt til dine pakker'"
            :popupType="'addToPackages'"
        />

        <!-- Popup when added to multiple packages -->
        <ProductPopup
            v-if="displayAddedToPackages"
            :product="activeProduct"
            :headline="'Produktet er tilføjet til dine pakker'"
            :popupType="'addedToPackages'"
        />

    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ProductOptionWImages from "../components/ProductOptionWImages";
    import MainButton from "../components/MainButton";
    import ProductPopup from "../components/Popup";

    export default {
        name: 'Product',
        components: {ProductPopup, MainButton, ProductOptionWImages, ProductGallery},
        data() {
            return {
                displayAddedToPackage: false,
                displayAddToPackages: false,
                displayAddedToPackages: false
            }
        },
        props: {
            productId: String
        },
        computed: {
            ...mapState([
                'activeProducts'
            ]),
            ...mapGetters([
                'productsById'
            ]),
            product() {
                return this.productsById[this.productId];
            },
            activeProduct() {
                let activeProduct = this.activeProducts[this.productId];
                if (!activeProduct) {
                    console.log("logging", this.productId);
                    this.addActiveProductFromProductId( {productId: this.productId });
                    activeProduct = this.activeProducts[this.productId];
                }
                return activeProduct;
            },
            activeDesign() {
                let thisDesign;

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (design.title === this.activeProduct.selections.Design) {
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
                'updateSelectionValue'
            ]),
            updateSelectionValueInStore (e) {
                this.updateSelectionValue({productId: this.productId, value: e.target.value, name: e.target.name });

            },
            optionImages(variants, key) {
                return variants.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
                });
            },

            allPersonalisations() {
                let personalisations = {};

                Object.keys(this.product.personalisations).forEach((personalisation) => {
                    personalisations[personalisation] = this.product.personalisations[personalisation]
                });

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
                    console.log("imageObjects", imageObjects);

                    imageObjects.forEach(imageObject => {

                        if (this.activeProduct.selections[optionKey] === imageObject[optionKey]) {
                            images.push(imageObject.image);
                        }

                    })
                });

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (design.title === this.activeProduct.selections.Design) {
                            images.push(design.image);
                        }
                    });
                }

                return images;
            }
        }
    }
</script>

<style scoped lang="scss">

    .product_option {

        + .product_option {
            margin: 36px 0 0 0;
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
        margin-bottom: 8px;
    }

    select {
        min-width: 100px;
    }

    .product_price {
        font-size: 24px;
        margin-top: 24px;
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