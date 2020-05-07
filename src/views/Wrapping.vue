<template>
    <div class="wrapping">

        <div v-for="product in products()">
            {{ product.title }}
        </div>


    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";
    import {mapGetters} from "vuex";

    export default {
        name: 'Wrapping',
        components: {ProductGallery},
        computed: {
            ...mapGetters([
                'productsById',
                'wrappings'
            ])
        },
        methods: {
            optionImages(variants, key) {
                return variants.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === pos;
                });
            },
            products() {
                const products = this.wrappings.products.map(value => this.productsById[value]);


                console.log(products);
                return products
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