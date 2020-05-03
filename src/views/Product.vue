<template>
    <div class="product">

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


                <hr>


                <div class="product_option option_w_checkbox">
                    <label>
                        <strong>
                            Ekstra:
                        </strong>
                        <input type="checkbox"> Tekst til indersiden af låget
                    </label>
                </div>

                <div class="product_option option_w_text">
                    <label>
                        <strong>
                            Navn:
                        </strong>
                        <input
                            type="text"
                            placeholder="Navn"
                        >
                    </label>
                </div>

            </section>

        </div>

        <div class="description hide_1024">
            <h2>
                Beskrivelse
            </h2>
            <p>
                Design din helt egen æske til den du holder af.
            </p>
            <p>
                Disse æsker giver dig muligheden for at give en helt unik gave, og kan bruges til mange lejligheder og
                personer - til konfirmanden, til bruden, til brudepigerne, til gommen. Det er kun fantasien der sætter
                grænser - eller det gør den faktisk heller ikke her hos BEMY.
            </p>
            <p>
                Har du særlige ønsker, ideer til ikoner eller monogrammer, så skriv endelig til os, lige herunder.
            </p>
        </div>


    </div>
</template>

<script>
    import ProductGallery from "../components/ProductGallery";

    export default {
        name: 'Product',
        components: {ProductGallery},
        props: {
            product: Object
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

    .option_w_dropdown,
    .option_w_checkbox,
    .option_w_text {
        strong {
            display: block;
        }
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