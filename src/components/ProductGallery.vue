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

        <div class="gallery_full_image relative_image rounded_image">
            <img src="../assets/placeholders/box-color-2.png">
        </div>

        <div class="gallery_thumbs">
            <div class="gallery_thumbnail relative_image rounded_image">
                <img src="../assets/placeholders/box-color-1.png">
            </div>
            <div class="gallery_thumbnail relative_image rounded_image selected">
                <img src="../assets/placeholders/box-color-2.png">
            </div>
            <div class="gallery_thumbnail relative_image rounded_image">
                <img src="../assets/placeholders/box-color-3.png">
            </div>
            <div class="gallery_thumbnail relative_image rounded_image">
                <img src="../assets/placeholders/box-color-4.jpg">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ProductGallery'
    }
</script>

<style scoped lang="scss">

    .product_gallery {
        /*width: 50vw;*/
    }

    .gallery_tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 4px;
        margin-bottom: 4px;
    }

    .gallery_tab {
        background-color: var(--colour-primary-300);
        color: white;
        text-align: center;
        padding: 4px;
        border-radius: 5px 5px 0 0;
        font-weight: 300;

        &.selected {
            background-color: var(--colour-primary-400);
        }

    }

    .gallery_thumbs {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 8px;
        margin-top: 8px;
    }

    .gallery_thumbnail {
        opacity: .5;

        &.selected {
            opacity: 1;
        }
    }

</style>
