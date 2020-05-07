<template>
    <div class="content_categories_overview">

        <MobileContentRecap class="hide_1024"/>

        <h1>
            Indhold
        </h1>
        <section class="content_categories">
            <router-link
                v-for="category in productCategories"
                :to="{ name: 'Category', params: { categoryId: category.id } }"
                class="content_category"
            >
                <div class="category_image relative_image">
                    <img :src="category.image">
                </div>
                <div class="category_title">
                    {{ category.title }}
                </div>
            </router-link>

        </section>

    </div>
</template>

<script>
    import MobileContentRecap from "../components/MobileContentRecap";
    import {mapGetters} from "vuex";

    export default {
        name: 'ContentCategoriesOverview',
        components: {MobileContentRecap},
        computed: {
            ...mapGetters([
                'productCategories'
            ])
        },
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