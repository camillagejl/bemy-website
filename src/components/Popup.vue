<template>
    <div class="product_popup">
        <div class="popup_dim">
            <div class="popup_box rounded_box">
                <h2>
                    {{ headline }}
                </h2>

                <!-- Shows product image on smaller screens -->
                <div class="product_image rounded_box relative_image hide_768">
                    <img
                        :src="product.image"
                    >
                </div>

                <!-- Shows product item on bigger screens -->
                <PackageItem
                    class="display_768"
                    :product="product"
                    :editButtons="false"
                />

                <!-- Shows packages to add the product to -->

                <section
                    v-if="popupType === 'addToPackages'"
                    class="add_to_packages"
                >

                    <h3>Tilføj til pakker:</h3>

                    <label
                        class="package_title"
                        v-for="pack in packages"
                    >
                        <input type="checkbox"> {{ pack.title }}
                    </label>

                </section>

                    <!-- Shows packages the product has been added to -->

                    <section
                        v-if="popupType === 'addedToPackages'"
                        class="add_to_packages"
                    >

                        <div
                            class="package_title"
                            v-for="pack in packages"
                        >
                            &#10003; {{ pack.title }}
                        </div>

                </section>

                <!-- Buttons for popup when added to package(s)-->
                <div
                    v-if="popupType === 'addedToPackage' || popupType === 'addedToPackages'"
                    class="buttons"
                >
                    <router-link
                        :to="{ name: 'MyPackages' }"
                    >
                        <MainButton
                            :emph="false"
                            :text="'Se dine pakker'"
                            :icon="'boxes'"
                            @click.native="closePopup"
                        />
                    </router-link>

                        <MainButton
                            :emph="true"
                            :text="'Fortsæt shopping'"
                            :icon="'arrow_right'"
                            @click.native="closePopup"
                        />
                </div>

                <!-- Buttons for popup when adding to several packages-->
                <div
                    v-if="popupType === 'addToPackages'"
                    class="buttons"
                >
                        <MainButton
                            :emph="false"
                            :text="'Gå tilbage uden at tilføje'"
                            :icon="'arrow_left'"
                            @click.native="closePopup"
                        />

                    <router-link
                        :to="{ name: 'MyPackages' }"
                    >
                        <MainButton
                            :emph="true"
                            :text="'Tilføj til pakker'"
                            :icon="'arrow_right'"
                        />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PackageItem from "./PackageItem";
    import MainButton from "./MainButton";
    import {mapState} from "vuex";

    export default {
        name: 'ProductPopup',
        components: {MainButton, PackageItem},
        props: {
            product: Object,
            headline: String,
            popupType: String,
            closePopup: Function,
        },
        computed: {
            ...mapState([
                'packages'
            ]),
        }
    }
</script>

<style scoped lang="scss">

    .product_popup {
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    .popup_dim {
        background-color: rgba(var(--colour-primary-400), .5);
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 12px 62px 12px;
        box-sizing: border-box;
    }

    .popup_box {
        background-color: rgba(var(--colour-grey-100), 1);
        flex: 1;
        max-width: 1200px;
        box-sizing: border-box;
        padding: 12px;
        overflow-y: auto;
        max-height: 100%;

        a {
            text-decoration: none;
        }
    }

    h2 {
        text-align: center;
        font-weight: 600;
        margin-bottom: 24px;
    }

    .product_image {
        max-width: 80%;
        margin: 0 auto 24px auto;
    }

    .package_item {
        margin-bottom: 48px;
    }

    h3 {
        font-weight: 600;
    }

    .add_to_packages {
        color: rgba(var(--colour-grey-700), 1)
    }

    .package_title {
        display: block;
        margin-bottom: 12px;
    }

    .buttons {
        margin-top: 48px;

        a {
            .main_button {
                width: 100%;
            }

            + a {
                margin-left: 12px;
            }
        }
    }

    @media screen and (min-width: 768px) {
        .popup_box {
            padding: 48px 96px;
        }

        .buttons {
            display: flex;

            a {
                flex: 1;
            }
        }
    }

</style>
