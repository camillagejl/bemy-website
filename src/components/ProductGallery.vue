<template>
    <div class="product_gallery">

        <div
            class="gallery_tabs"
            v-if="designTab">
            <div
                @click="changeTabs('imagesTab')"
                class="gallery_tab"
                v-bind:class="{ selected : activeTab === 'imagesTab' }"
            >
                Inspiration
            </div>
            <div
                @click="changeTabs('designTab')"
                class="gallery_tab"
                v-bind:class="{ selected : activeTab === 'designTab' }"
            >
                Mit design
            </div>
        </div>

        <div class="gallery_content_container">
            <div class="height_modifier"></div>
            <div class="gallery_content">
                <div class="gallery_thumbs">
                    <div
                        v-for="(image, index) in currentImages"
                        :style="{ transform: `translateY(${imagesTranslation(thumbsPosition)}%) translateY(calc(${thumbsPosition} * (-12px))`}"
                        class="gallery_thumbnail relative_image rounded_box selected"
                        @click="selectedImageIndex = index"
                    >
                        <img :src="image">
                    </div>

                    <button
                        v-if="currentImages.length > 4"
                        class="slideshow_button top"
                        @click="moveThumbs('up', currentImages)"
                    >
                        <div class="arrow arrow_up"></div>
                    </button>

                    <button
                        v-if="currentImages.length > 4"
                        class="slideshow_button bottom"
                        @click="moveThumbs('down', currentImages)"
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
    import {mapState} from "vuex";

    export default {
        name: 'ProductGallery',
        props: {
            images: Array,
            designTab: Boolean,
            productType: String,
            productId: String,
            changeTab: Function
        },
        data() {
            return {
                thumbsPosition: 0,
                selectedImageIndex: 0
            }
        },
        computed: {
            ...mapState([
                'activePackage',
                'packages',
                'activeProducts'
            ]),
            activeTab() {
                if (this.productType === 'product') {
                    return this.activeProducts[this.productId].activeTab
                }

                if (this.productType === 'wrapping' && this.packages[this.activePackage].wrapping) {
                    return this.packages[this.activePackage].wrapping.activeTab
                }
            },
            currentImages() {
                if (this.activeTab) {
                    if (this.activeTab === 'imagesTab') {
                        return this.images
                    }

                    if (this.activeTab === 'designTab' && this.productType === 'wrapping') {
                        return this.packages[this.activePackage].wrapping.designImages;
                    }

                    if (this.activeTab === 'designTab' && this.productType === 'product' && this.activeProducts[this.productId]) {
                        return this.activeProducts[this.productId].designImages;
                    }
                }
            },
            selectedImage() {
                return this.currentImages[this.selectedImageIndex]
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
            changeTabs(clickedTab) {
                this.changeTab(clickedTab);
                this.selectedImageIndex = 0;
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
        display: flex;
        margin-bottom: 4px;
        padding-right: 4px;
    }

    .gallery_tab {
        cursor: pointer;
        background-color: rgba(var(--colour-primary-300), 1);
        flex: 1;
        color: white;
        text-align: center;
        padding: 4px;
        border-radius: 5px 5px 0 0;
        font-weight: 300;
        font-size: 14px;
        transition: .3s;

        &:hover {
            background-color: rgba(var(--colour-primary-400), 1);
            transition: .3s;
        }


        + .gallery_tab {
            margin-left: 4px;
        }

        &.selected {
            background-color: rgba(var(--colour-primary-400), 1);
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
        cursor: pointer;
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
        margin-top: 12px;
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
        transition: .3s;

        &.top {
            top: 0;
            border-radius: 5px 5px 0 0;
        }

        &.bottom {
            bottom: 5px;
            border-radius: 0 0 5px 5px;
        }

        &:hover {
            transition: .3s;
            background-color: rgba(var(--colour-grey-100), .85);
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
