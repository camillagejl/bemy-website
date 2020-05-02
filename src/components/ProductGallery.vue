<template>
    <div class="product_gallery">

        <div class="gallery_tabs">
            <div class="gallery_tab selected">
                Inspiration
            </div>
            <div class="gallery_tab">
                Mit design
            </div>
        </div>


        <div class="gallery_content_container">
            <div class="height_modifier"></div>
            <div class="gallery_content">
                <div class="gallery_thumbs">
                    <div
                        v-for="image in images"
                        class="gallery_thumbnail relative_image rounded_box selected"
                    >
                        <img :src="image">
                    </div>
                </div>

                <div class="gallery_full_image relative_image rounded_box">
                    <img :src="images[0]">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ProductGallery',
        props: {
            images: Array
        }
    }
</script>

<style scoped lang="scss">

    .gallery_tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 4px;
        margin-bottom: 4px;
        padding-right: 4px;
    }

    .gallery_tab {
        background-color: var(--colour-primary-300);
        color: white;
        text-align: center;
        padding: 4px;
        border-radius: 5px 5px 0 0;
        font-weight: 300;
        font-size: 14px;

        &.selected {
            background-color: var(--colour-primary-400);
        }
    }

    .gallery_content_container {
        width: 100%;
        display: inline-block;
        position: relative;
    }

    .height_modifier {
        padding-top: 82%;
    }

    .gallery_content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: inherit;
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }

    .gallery_full_image {
        width: 79%;
        margin: 0 5px 8px 0;
    }

    .gallery_thumbs {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: fit-content;
        margin-right: 8px;
    }

    .gallery_thumbnail {
        opacity: var(--opacity-deselected);

        &.selected {
            opacity: 1;
        }
    }

    .gallery_thumbnail + .gallery_thumbnail {
        margin-top: 11px;
    }

</style>
