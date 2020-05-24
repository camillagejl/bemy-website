<template>
    <div class="product_option_w_images product_option">

        <div
        v-if="optionKey && optionImages"
        >
            <span class="line_break">
                <strong>{{ optionKey }}</strong>: {{ selectedOption }}
            </span>

            <div class="option_images">
                <div
                    v-if="productType === 'product' || productType === 'wrapping'"
                    v-for="(variant, index) in optionImages"
                    class="images_container"
                    @click="updateImageSelectionValueInStore(optionKey, variant[optionKey])"
                >
                    <div
                        class="option_image relative_image rounded_box"
                        v-bind:class="{ selected : variant[optionKey] === selectedOption || variant.title === selectedOption }"
                    >
                        <!--For Shopify variants, i.e. only one image-->
                        <img
                            v-if="variant.image"
                            :src="variant.image"
                        >

                        <!-- For Shopify produts, i.e. with several images -->
                        <img
                            v-if="variant.images"
                            :src="variant.images[0]"
                        >
                    </div>
                </div>
            </div>

            <div class="option_images">
                <div
                    v-if="productType === 'wrappingProduct'"
                    v-for="(variant, index) in optionImages"
                    class="images_container"
                    @click="setWrappingIndexInStore(index)"
                >

                    <div
                        class="option_image relative_image rounded_box"
                        v-bind:class="{ selected : variant[optionKey] === selectedOption || variant.title === selectedOption }"
                    >
                        <!--For Shopify variants, i.e. only one image-->
                        <img
                            v-if="variant.image"
                            :src="variant.image"
                        >

                        <!-- For Shopify produts, i.e. with several images -->
                        <img
                            v-if="variant.images"
                            :src="variant.images[0]"
                        >
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: 'ProductOptionWImages',
        props: {
            selectedOption: String,
            optionKey: String,
            optionImages: Array,
            productId: String,
            productType: String,
            setWrappingIndexInStore: Function,
            setDesignImagesInStore: Function
        },
        computed: {
            ...mapState([
                'activeProducts'
            ]),
        },
        methods: {
            ...mapMutations([
                'addActiveProductFromProductId',
                'updateSelectionValue'
            ]),
            updateImageSelectionValueInStore(key, option) {
                this.updateSelectionValue({
                    productId: this.productId,
                    value: option,
                    name: key,
                    type: this.productType
                });
                this.setDesignImagesInStore();
            },
        }
    }
</script>

<style scoped lang="scss">

    .line_break {
        display: block;
        margin-bottom: 8px;
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

    @media screen and (min-width: 768px) {
        .option_images {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            grid-gap: 12px;
        }
    }

</style>
