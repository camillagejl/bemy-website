<template>
    <div class="product">

        <h1>
            {{ product.title}}
        </h1>

        <div class="product_container">

            <div class="gallery_container">
        <ProductGallery
        :images="product.images"/>


            <div class="description display_1024">
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

        <section class="product_options">

            <div class="product_option option_w_images">
                <div class="option_label">
                    <strong>
                        Type:
                    </strong>
                    <p>
                        Luksus Gaveæske m. bånd
                    </p>
                </div>
                <div class="option_images">
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-type-1.png">
                    </div>
                    <div class="option_image relative_image rounded_box selected">
                        <img src="../assets/placeholders/box-type-2.png">
                    </div>
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-type-3.jpg">
                    </div>
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-type-4.jpg">
                    </div>
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-type-5.jpg">
                    </div>
                </div>
            </div>

            <div class="option_w_dropdown">
                <label>
                    <strong>
                        Størrelse:
                    </strong>
                    <select>
                        <option>Large 23 x 23 x 23</option>
                        <option>Medium 23 x 23 x 23</option>
                    </select>
                </label>
            </div>

            <div class="product_option option_w_images">
                <div class="option_label">
                    <strong>
                        Farve
                    </strong>
                    <p>
                        Rosa
                    </p>
                </div>
                <div class="option_images">
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-color-1.png">
                    </div>
                    <div class="option_image relative_image rounded_box selected">
                        <img src="../assets/placeholders/box-color-2.png">
                    </div>
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-color-3.png">
                    </div>
                    <div class="option_image relative_image rounded_box">
                        <img src="../assets/placeholders/box-color-4.jpg">
                    </div>
                </div>
            </div>

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
        }
    }
</script>


<style scoped lang="scss">

    .product_option {
        margin: 36px 0;

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