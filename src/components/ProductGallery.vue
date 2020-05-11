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
                        :style="{ transform: `translateY(${imagesTranslation(thumbsPosition)}%) translateY(calc(${thumbsPosition} * (-11px))`}"
                        class="gallery_thumbnail relative_image rounded_box selected"
                        @click="selectImage(image)"
                    >
                        <img :src="image">
                    </div>

                    <button
                        v-if="images.length > 4"
                        class="slideshow_button top"
                        @click="moveThumbs('up', images)"
                    >
                        <div class="arrow arrow_up"></div>
                    </button>

                    <button
                        v-if="images.length > 4"
                        class="slideshow_button bottom"
                        @click="moveThumbs('down', images)"
                    >
                        <div class="arrow arrow_down"></div>
                    </button>

                </div>

                <div class="gallery_full_image relative_image rounded_box">
                    <img :src="selectedImage">
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
        },
        data() {
            return {
                thumbsPosition: 0,
                selectedImage: this.images[0]
            }
        },
        methods: {
            imagesTranslation(position) {
                return position * -100;
            },
            moveThumbs(direction, images) {
                if (direction === 'down') {
                    if (this.thumbsPosition >= 0 && this.thumbsPosition < images.length - 4) {
                        this.thumbsPosition++;
                    }
                }
                if (direction === 'up') {
                    if (this.thumbsPosition > 0)
                        this.thumbsPosition--;
                }
            },
            selectImage(image) {
                this.selectedImage = image;
            }
        }
    }
</script>

<style scoped lang="scss">

    .product_gallery {
        max-width: 600px;
        margin: 0 auto;
    }

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

    .slideshow_button {
        position: absolute;
        left: 0;
        right: 0;
        background-color: rgba(var(--colour-grey-100), .7);
        line-height: 30px;
        width: calc(20% - 7px);
        padding: 10px;
        text-align: center;

        &.top {
            top: 0;
            border-radius: 5px 5px 0 0;
        }

        &.bottom {
            bottom: 7px;
            border-radius: 0 0 5px 5px;
        }
    }

    .arrow {

        /* Triangle from https://css-tricks.com/snippets/css/css-triangle/ */
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;

        margin: 0 auto;
    }

    .arrow_up {
        border-bottom: 8px solid black;
    }

    .arrow_down {
        border-top: 8px solid black;
    }

</style>
