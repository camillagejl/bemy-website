<template>
    <div class="wrapping">

        <div v-if="!products">
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
                Indpakning
            </h1>

            <div v-if="!product">Vent venligst...</div>

            <div
                v-else
                class="product_container"
            >

                <section class="gallery_container">
                    <ProductGallery
                        :productType="'wrapping'"
                        :images="product.images"
                        :designTab="true"
                        :changeTab="changeTabInStore"
                        :changeSelectedImageIndex="changeSelectedImageIndexInStore"
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
                        :selectedOption="product.title"
                        :optionKey="'Indpakning'"
                        :optionImages="products"
                        :productType="'wrappingProduct'"
                        :setWrappingIndexInStore="setWrappingIndexInStore"
                    />

                    <!-- Product option w. dropdown -->

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
                        :setDesignImagesInStore="setDesignImagesInStore"
                        @click.native="onOptionImageClick"
                    />

                    <!-- Designs -->
                    <ProductOptionWImages
                        v-if="product.designs && activeWrapping.selections"
                        :selectedOption="activeWrapping.selections.Design"
                        :optionKey="'Design'"
                        :optionImages="product.designs"
                        :productId="product.id"
                        :productType="'wrapping'"
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
                        v-for="(personalisation, key) in allPersonalisations()"
                        :personalisation="personalisation"
                        :productId="product.id"
                        :personalisationKey="personalisation.key"
                        :activeProduct="activeWrapping"
                        :productType="'wrapping'"
                    />

                    <div class="description hide_1024">
                        <h2>
                            Beskrivelse
                        </h2>

                        <div v-html="product.description"></div>

                    </div>

                    <div
                        v-if="isVariantAvailable"
                        class="product_price"
                    >
                        <strong>
                            {{ activeWrapping.displayPrice }} kr
                        </strong>
                    </div>

                    <div class="continue_button_container">

                        <router-link
                            v-if="isVariantAvailable"
                            :to="{ name: 'ContentCategoriesOverview' }"
                        >
                            <MainButton
                                class="continue_button"
                                :emph="true"
                                :text="'Gå videre til indhold'"
                                :icon="'arrow_right'"
                            />
                        </router-link>

                        <div
                            v-if="!isVariantAvailable"
                            class="not_available rounded_box"
                        >
                            Denne indpakning findes desværre ikke
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

            <PriceFooter
                v-if="activeWrapping"
                :price="activeWrapping.displayPrice"
                :isAvailable="isVariantAvailable"
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
        data() {
            return {
                designErrorMessage: false
            }
        },
        props: {
            fromDest: String,
            fromDestTitle: String
        },
        computed: {
            ...
                mapState([
                    'activePackage',
                    'packages',
                ]),
            ...
                mapGetters([
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
            }
            ,
            activeWrapping() {
                let activeWrapping = this.packages[this.activePackage].wrapping;

                const activeWrappingIndex = this.packages[this.activePackage].activeWrappingIndex;

                if (!activeWrapping || this.products[activeWrappingIndex].id !== this.packages[this.activePackage].wrapping.id) {
                    if (this.products && this.products[activeWrappingIndex]) {
                        console.log("Adding");
                        this.addActiveProductFromProductId({
                            productId: this.products[activeWrappingIndex].id,
                            type: 'wrapping'
                        });
                        this.setDesignImages({images: this.myDesignImages(), productType: 'wrapping'});
                        activeWrapping = this.packages[this.activePackage].wrapping;
                    }
                }

                return activeWrapping;
            }
            ,
            product() {
                if (!this.activeWrapping) {
                    return;
                }

                return this.productsById[this.activeWrapping.id];
            }
            ,
            activeDesign() {
                let thisDesign = null;

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (!design) {
                            this.designErrorMessage = true;
                            return;
                        }

                        if (design.Design === this.activeWrapping.selections.Design) {
                            thisDesign = design;
                        }
                    });
                }

                return thisDesign;
            }
            ,
            isVariantAvailable() {
                const variantsMatching = [];
                let isVariant;

                this.product.variants.forEach(variant => {
                    const variantMatches = [];

                    Object.keys(this.product.options).forEach(optionKey => {

                        if (this.activeWrapping) {

                            if (variant[optionKey] === this.activeWrapping.selections[optionKey]) {
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

                this.setIsWrappingAvailable({isAvailable: isVariant});

                if (this.product.variants.length > 1) {
                    return isVariant;
                }
            }
        }
        ,
        methods: {
            ...
                mapMutations([
                    'addActiveProductFromProductId',
                    'updateSelectionValue',
                    'setDesignImages',
                    'setIsWrappingAvailable',
                    'changeGalleryTab',
                    'setActiveWrappingIndex',
                    'changeSelectedImageIndex'
                ]),
            setWrappingIndexInStore(index) {
                this.setActiveWrappingIndex({index: index})
            }
            ,
            updateInputSelectionValueInStore(e) {
                this.updateSelectionValue({
                    productId: this.productId,
                    value: e.target.value,
                    name: e.target.name,
                    type: 'wrapping'
                });
            }
            ,
            optionImages(variants, key) {
                return variants.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
                });
            }
            ,
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
            }
            ,

            myDesignImages() {
                let images = [];

                Object.keys(this.product.options).forEach(optionKey => {
                    const imageObjects = this.optionImages(this.product.variants, optionKey);

                    imageObjects.forEach(imageObject => {
                        if (
                            this.activeWrapping &&
                            this.activeWrapping.selections[optionKey] === imageObject[optionKey] &&
                            this.product.optionsWithImages &&
                            this.product.optionsWithImages.includes(optionKey)
                        ) {
                            images.push(imageObject.image);
                        }
                    })
                });

                if (this.product.designs) {
                    this.product.designs.forEach(design => {
                        if (!design) {
                            return;
                        }

                        if (design.Design === this.activeWrapping.selections.Design) {
                            images.push(design.image);
                        }
                    })
                }

                return images;
            }
            ,
            setDesignImagesInStore() {
                this.setDesignImages({images: this.myDesignImages(), productType: 'wrapping'});
            }
            ,
            onOptionImageClick() {
                if (this.activeWrapping.activeTab !== 'designTab') {
                    this.changeTabInStore('designTab');
                    this.changeSelectedImageIndexInStore(0);
                }
            }
            ,
            changeTabInStore(tab) {
                this.changeGalleryTab({tab: tab, productId: this.productId, productType: 'wrapping'})
            }
            ,

            changeSelectedImageIndexInStore(index) {
                console.log("changing");
                this.changeSelectedImageIndex({
                    index: index,
                    productType: 'wrapping',
                    productId: this.productId
                })
            }
            ,
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

    .description {
        margin-top: 24px;
    }

    .product_price {
        font-size: 24px;
        margin-top: 24px;
        text-align: right;
    }

    .continue_button_container {
        margin-top: 48px;

        a {
            text-decoration: none;
        }
    }

    .continue_button {
        width: 100%;
    }

    .not_available {
        background-color: rgba(var(--colour-grey-300), 1);
        text-align: center;
        padding: 12px;
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
    }

</style>