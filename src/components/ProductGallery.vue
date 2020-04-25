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

        <div class="gallery_content">
            <div class="gallery_thumbs">
                <div class="gallery_thumbnail relative_image rounded_box selected">
                    <img src="../assets/placeholders/box-inspiration-1.jpg">
                </div>
                <div class="gallery_thumbnail relative_image rounded_box">
                    <img src="../assets/placeholders/box-inspiration-2.jpg">
                </div>
                <div class="gallery_thumbnail relative_image rounded_box">
                    <img src="../assets/placeholders/box-inspiration-3.jpg">
                </div>
                <div class="gallery_thumbnail relative_image rounded_box">
                    <img src="../assets/placeholders/box-inspiration-4.jpg">
                </div>
            </div>

            <div class="gallery_full_image relative_image rounded_box">
                <img src="../assets/placeholders/box-inspiration-1.jpg">
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
        /*height: 50vh;*/
        /*overflow: hidden;*/
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
        font-size: 14px;

        &.selected {
            background-color: var(--colour-primary-400);
        }
    }

    .gallery_content {
        display: flex;
        flex-direction: row;
    }

    .gallery_full_image {
        width: 80%;
    }

    .gallery_thumbs {
        display: flex;
        flex-direction: column;
        flex: 1;
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
