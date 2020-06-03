<template>
    <div class="product">

        <div v-if="!product || !activeProduct">
            Loading... or no product found.
        </div>

        <div v-else>

            <router-link
                v-if="fromDest"
                class="back_link"
                :to="fromDest"
            >
                &#8592; Tilbage til {{ fromDestTitle }}
            </router-link>

            <h1>
                {{ product.title}}
            </h1>

            <div class="product_container">

                <section class="gallery_container">
                    <ProductGallery
                        :images="product.images"
                        :designTab="hasOptionImages"
                        :productType="'product'"
                        :productId="productId"
                        :changeTab="changeTabInStore"
                        :changeSelectedImageIndex="changeSelectedImageIndexInStore"
                    />

                    <div
                        v-if="product.options.length || product.designs || Object.keys(allPersonalisations).length"
                        class="description display_1024"
                    >
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>
                </section>

                <section class="product_information">

                    <div
                        v-if="product.options.length || product.designs || Object.keys(allPersonalisations).length"
                        class="product_options"
                    >

                        <!-- Product option w. dropdown -->
                        <PersonalisationInput
                            v-for="(option, key) in product.options"
                            v-if="option[0] !== 'Default Title' && !product.optionsWithImages && activeProduct || product.optionsWithImages && !product.optionsWithImages.includes(key) && activeProduct"
                            :personalisation="option"
                            :type="'dropdown'"
                            :personalisationKey="key"
                            :productId="product.id"
                            :activeProduct="activeProduct"
                            :productType="'product'"
                        />

                        <!-- Product option w. images -->
                        <ProductOptionWImages
                            v-for="(option, key) in product.options"
                            v-if="product.optionsWithImages && product.optionsWithImages.includes(key)"
                            :selectedOption="activeProduct.selections[key]"
                            :optionKey="key"
                            :optionImages="optionImages(product.variants, key)"
                            :productId="product.id"
                            :productType="'product'"
                            :setDesignImagesInStore="setDesignImagesInStore"
                        @click.native="onOptionImageClick"
                        />

                        <!-- Designs -->
                        <ProductOptionWImages
                            v-if="product.designs"
                            :selectedOption="activeProduct.selections.Design"
                            :optionKey="'Design'"
                            :optionImages="product.designs"
                            :productId="product.id"
                            :productType="'product'"
                            :setDesignImagesInStore="setDesignImagesInStore"
                        @click.native="onOptionImageClick"
                        />

                        <div
                            class="developer_note"
                                v-if="designErrorMessage">
                            <strong>
                                Developer note:
                            </strong>
                            Designs kunne desværre ikke loades! Reload siden og prøv igen.
                        </div>

                        <!-- Personalisations -->

                        <PersonalisationInput
                            v-for="(personalisation, key) in allPersonalisations"
                            :personalisation="personalisation"
                            :personalisationKey="key"
                            :productId="product.id"
                            :activeProduct="activeProduct"
                            :productType="'product'"
                        />

                    </div>

                    <div
                        v-if="!product.options.length && !product.designs && !Object.keys(allPersonalisations).length"
                        class="description"
                    >
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>

                    <div
                        v-if="product.options.length || product.designs || Object.keys(allPersonalisations).length"
                        class="description hide_1024"
                    >
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>

                    <div class="product_bottom">
                        <div
                            v-if="isVariantAvailable"
                            class="product_price"
                        >
                            <strong>
                                {{ product.displayPrice }} kr
                            </strong>
                        </div>

                        <div
                            v-if="!editingCurrentProduct && isVariantAvailable"
                            class="add_buttons"
                        >
                            <MainButton
                                :emph="true"
                                :text="'Tilføj til denne pakke'"
                                :icon="'plus'"
                                @click.native="addToPackage"
                            />

                            <MainButton
                                v-if="packages.length > 1"
                                :emph="false"
                                :text="'Tilføj til flere pakker'"
                                :icon="'plus-plus'"
                                @click.native="displayAddToPackages = true"
                            />
                        </div>

                        <router-link
                            v-if="editingCurrentProduct && isVariantAvailable"
                            :to="{ name: 'MyPackages' }"
                            class="save_edit_button"
                        >
                            <MainButton
                                :emph="true"
                                :text="'Gem ændringer'"
                                :icon="'save'"
                                @click.native="addToPackage"
                            />
                        </router-link>

                        <div
                            v-if="!isVariantAvailable"
                            class="not_available rounded_box"
                        >
                            Denne variant findes desværre ikke
                        </div>

                    </div>

                </section>

            </div>


            <router-link
                v-if="fromDest"
                class="back_link back_link_bottom"
                :to="fromDest"
            >
                &#8592; Tilbage til {{ fromDestTitle }}
            </router-link>

        </div>


        <!-- ======================================== POPUPS ======================================== -->

        <!-- Popup when adding to one package -->
        <ProductPopup
            v-if="displayAddedToPackage"
            :product="activeProduct"
            :headline="'Produktet er tilføjet til din pakke'"
            :popupType="'addedToPackage'"
            :closePopup="closePopup"
        />

        <!-- Popup when adding to multiple packages -->
        <ProductPopup
            v-if="displayAddToPackages"
            :product="activeProduct"
            :headline="'Tilføj produkt til dine pakker'"
            :popupType="'addToPackages'"
            :closePopup="closePopup"
        />

        <!-- Popup when added to multiple packages -->
        <ProductPopup
            v-if="displayAddedToPackages"
            :product="activeProduct"
            :headline="'Produktet er tilføjet til dine pakker'"
            :popupType="'addedToPackages'"
            :closePopup="closePopup"
            :addedTo="addedTo"
        />

    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters, mapMutations, mapState} from "vuex";
    import ProductOptionWImages from "../components/ProductOptionWImages";
    import MainButton from "../components/MainButton";
    import ProductPopup from "../components/Popup";
    import PersonalisationInput from "../components/PersonalisationInput";

    export default {
        name: 'Product',
        components: {PersonalisationInput, ProductPopup, MainButton, ProductOptionWImages, ProductGallery},
        data() {
            return {
                displayAddedToPackage: false,
                displayAddToPackages: false,
                displayAddedToPackages: false,
                activeProductUpdated: false,
                addedTo: [],
                designErrorMessage: false,
            }
        },
        props: {
            productId: String,
            editingCurrentProduct: Boolean,
            editingProductIndex: Number,
            fromDest: Object,
            fromDestTitle: String
        },
        computed: {
            ...mapState([
                'packages',
                'activeProducts'
            ]),
            ...mapGetters([
                'productsById',
                'getActiveProductById'
            ]),
            product() {
                return this.productsById[this.productId];
            },
            activeProduct() {
                let activeProduct = this.getActiveProductById(this.productId);

                // Sets new activeProduct in Store, if it doesn't exist already
                if (!this.editingCurrentProduct) {
                    if (!activeProduct) {
                        this.addActiveProductFromProductId({productId: this.productId, type: 'product'});
                        this.setDesignImages({
                            images: this.myDesignImages(),
                            productType: 'product',
                            productId: this.productId
                        });
                        activeProduct = this.getActiveProductById(this.productId);
                    }
                }

                if (this.editingCurrentProduct && !this.activeProductUpdated) {

                    this.addActiveProductFromProductId({
                        productId: this.productId,
                        type: 'editingProduct',
                        productIndex: this.editingProductIndex
                    });

                    this.activeProductUpdated = true;
                    activeProduct = this.getActiveProductById(this.productId);
                }

                return activeProduct;
            },
            activeDesign() {
                let thisDesign = null;

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (!design) {
                            this.designErrorMessage = true;
                            return;
                        }

                        if (design.Design === this.activeProduct.selections.Design) {
                            thisDesign = design
                        }
                    });
                }
                return thisDesign;
            },
            hasOptionImages() {
                if (this.product.designs || this.product.optionsWithImages && this.product.optionsWithImages.length > 0) {
                    return true;
                }
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
            isVariantAvailable() {
                const variantsMatching = [];
                let isVariant;

                this.product.variants.forEach(variant => {
                    const variantMatches = [];

                    Object.keys(this.product.options).forEach(optionKey => {

                        if (this.activeProduct) {

                            if (variant[optionKey] === this.activeProduct.selections[optionKey]) {
                                variantMatches.push(true)
                            } else {
                                variantMatches.push(false);
                            }

                        }
                    });

                    if (variantMatches.includes(false)) {
                        variantsMatching.push(false);
                    } else {
                        variantsMatching.push(true);
                    }

                    isVariant = variantsMatching.includes(true);

                });

                if (this.product.variants.length > 1) {
                    return isVariant;
                }
                return true;
            }
        },
        methods: {
            ...mapMutations([
                'addActiveProductFromProductId',
                'updateSelectionValue',
                'addProductToPackage',
                'toggleAppOverflow',
                'setDesignImages',
                'changeGalleryTab',
                'changeSelectedImageIndex'
            ]),
            closePopup(nextFunction, prop) {
                this.displayAddedToPackage = false;
                this.displayAddToPackages = false;
                this.displayAddedToPackages = false;
                this.toggleAppOverflow({bool: true});

                if (nextFunction === 'addedToPackages') {
                    this.displayAddedToPackages = true;
                    this.addedTo = prop;
                    console.log(this.addedTo);
                }

            },
            updateInputSelectionValueInStore(e) {
                this.updateSelectionValue({
                    productId: this.productId,
                    value: e.target.value,
                    name: e.target.name,
                    type: 'product'
                });
            },
            optionImages(variants, key) {
                return variants.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
                });
            },

            myDesignImages() {
                const images = [];

                Object.keys(this.product.options).forEach(optionKey => {

                    console.log("optionKey", optionKey);

                    const imageObjects = this.optionImages(this.product.variants, optionKey);

                    imageObjects.forEach(imageObject => {

                        if (
                            this.activeProduct &&
                            this.activeProduct.selections[optionKey] === imageObject[optionKey] &&
                            this.product.optionsWithImages &&
                            this.product.optionsWithImages.includes(optionKey)
                        ) {
                            images.push(imageObject.image);
                        }

                    })
                });

                if (this.product.designs && this.activeProduct) {
                    this.product.designs.forEach(design => {
                        if (!design) {
                            return;
                        }

                        if (design.Design === this.activeProduct.selections.Design) {
                            images.push(design.image);
                        }
                    });
                }

                return images;
            },
            setDesignImagesInStore() {
                this.setDesignImages({
                    images: this.myDesignImages(),
                    productType: 'product',
                    productId: this.productId
                });
            },
            onOptionImageClick() {
                if (this.activeProduct.activeTab !== 'designTab') {
                    this.changeTabInStore('designTab');
                    this.changeSelectedImageIndexInStore(0);
                }
            },
            changeTabInStore(tab) {
                this.changeGalleryTab({tab: tab, productId: this.productId, productType: 'product'})
            },

            changeSelectedImageIndexInStore(index) {
                this.changeSelectedImageIndex({
                    index: index,
                    productType: 'product',
                    productId: this.productId
                })
            },
            addToPackage() {

                console.log("adding to package");

                if (!this.editingCurrentProduct) {
                    this.displayAddedToPackage = true;
                    this.addProductToPackage({product: this.activeProduct});
                    this.toggleAppOverflow({bool: false})
                }

                if (this.editingCurrentProduct) {
                    this.addProductToPackage({
                        product: this.activeProduct,
                        productIndex: this.editingProductIndex,
                        type: 'editingProduct'
                    });
                }
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

    .description {
        margin-top: 24px;
    }

    .product_price {
        font-size: 24px;
        margin-top: 24px;
        text-align: right;
    }

    .add_buttons {
        margin-top: 36px;
        margin-bottom: 8px;

        a {
            text-decoration: none;
        }

        .main_button {
            width: 100%;

            + .main_button {
                margin-top: 12px;
            }
        }
    }

    .product_bottom a {
        text-decoration: none;
    }

    .not_available {
        margin-top: 24px;
        background-color: rgba(var(--colour-grey-300), 1);
        text-align: center;
        padding: 12px;
    }

    .save_edit_button .main_button {
        width: 100%;
        margin-top: 24px;
    }

    @media screen and (min-width: 768px) {
        .add_buttons {
            display: flex;

            .main_button {
                flex: 1;

                + .main_button {
                    margin-left: 12px;
                    margin-top: 0;
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
    }


</style>