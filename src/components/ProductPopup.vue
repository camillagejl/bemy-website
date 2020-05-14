<template>
    <div class="product_popup">
        <div class="popup_dim">
            <div class="popup_box rounded_box">
                <h2>
                    Produktet er tilføjet til din pakke
                </h2>

                <!-- Shows product image on smaller screens -->
                <div class="product_image rounded_box relative_image hide_768">
                    <img
                        :src="product.image"
                    >
                </div>

                <!-- Shows package item on bigger screens -->
                <PackageItem
                    class="display_768"
                    :product="product"
                    :editButtons="false"
                />

                <div class="buttons">
                    <router-link
                        :to="{ name: 'MyPackages' }"
                    >
                        <MainButton
                            :emph="false"
                            :text="'Se dine pakker'"
                            :icon="'boxes'"
                        />
                    </router-link>

                    <router-link
                        :to="{ name: 'MyPackages' }"
                    >
                        <MainButton
                            :emph="true"
                            :text="'Fortsæt shopping'"
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

    export default {
        name: 'ProductPopup',
        components: {MainButton, PackageItem},
        props: {
            product: Object
        }
    }
</script>

<style scoped lang="scss">

    .product_popup {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }

    .popup_dim {
        height: 100%;
        width: 100%;
        background-color: rgba(var(--colour-primary-400), .5);
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

    .buttons {
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
