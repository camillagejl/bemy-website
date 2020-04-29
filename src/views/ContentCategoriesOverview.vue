<template>
    <div class="content_categories_overview">

        <MobileContentRecap class="hide_1024"/>

        <h1>
            Indhold
        </h1>

        <section class="content_categories">

            <router-link
                class="content_category"
            :to="{ name: 'ContentCategory' }"
            >
                <div class="category_image relative_image">
                    <img src="../assets/placeholders/category-1.jpg">
                </div>
                <div class="category_title">
                    Beklædning
                </div>
            </router-link>

            <div class="content_category">
                <div class="category_image relative_image">
                    <img src="../assets/placeholders/category-5.jpg">
                </div>
                <div class="category_title">
                    Pynt
                </div>
            </div>

            <div class="content_category">
                <div class="category_image relative_image">
                    <img src="../assets/placeholders/category-3.jpg">
                </div>
                <div class="category_title">
                    Accessories
                </div>
            </div>

            <div class="content_category">
                <div class="category_image relative_image">
                    <img src="../assets/placeholders/category-4.jpg">
                </div>
                <div class="category_title">
                    Drikkevarer
                </div>
            </div>

            <div class="content_category">
                <div class="category_image relative_image">
                    <img src="../assets/placeholders/category-5.jpg">
                </div>
                <div class="category_title">
                    Gourmet Slik
                </div>
            </div>

        </section>

    </div>
</template>

<script>
    import MobileContentRecap from "../components/MobileContentRecap";

    export default {
        name: 'ContentCategoriesOverview',
        components: {MobileContentRecap},
    }
</script>

<style scoped lang="scss">

    .content_categories {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        grid-gap: 24px;
    }

    .content_category {
        border-radius: var(--main-border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow-400);
        position: relative;
    }

    .category_image {

        &::after {
            padding-bottom: 150%;
        }
    }

    .category_title {
        position: absolute;
        top: 80%;
        left: 0;
        right: 0;
        background-color: rgba(var(--colour-grey-100), .8);
        color: var(--colour-grey-700);
        padding: 8px;
        text-align: center;
    }

    @media screen and (min-width: 1024px) {
        .content_categories {
            grid-template-columns: repeat(5, 1fr);
        }
    }

</style>