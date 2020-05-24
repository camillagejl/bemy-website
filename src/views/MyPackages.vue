<template>
    <div class="my_packages">

        <h1>
            Mine pakker
        </h1>

        <section
            v-for="(pack, index) in packages"
            v-if="index === activePackage"
            class="package"
        >
            <hr>
            <h2>
                Denne pakke: {{ pack.title }}
                <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="pencil-alt"
                     class="basic_icon svg-inline--fa fa-pencil-alt fa-w-16" role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <g class="fa-group">
                        <path class="fa-secondary"
                              d="M96 352H32l-16 64 80 80 64-16v-64H96zM498 74.26l-.11-.11L437.77 14a48.09 48.09 0 0 0-67.9 0l-46.1 46.1a12 12 0 0 0 0 17l111 111a12 12 0 0 0 17 0l46.1-46.1a47.93 47.93 0 0 0 .13-67.74z"
                              opacity="0.4"></path>
                        <path class="fa-primary"
                              d="M.37 483.85a24 24 0 0 0 19.47 27.8 24.27 24.27 0 0 0 8.33 0l67.32-16.16-79-79zM412.3 210.78l-111-111a12.13 12.13 0 0 0-17.1 0L32 352h64v64h64v64l252.27-252.25a12 12 0 0 0 .03-16.97zm-114.41-24.93l-154 154a14 14 0 1 1-19.8-19.8l154-154a14 14 0 1 1 19.8 19.8z"></path>
                    </g>
                </svg>
            </h2>

            <div
                v-if="!pack.wrapping && !pack.products.length"
                class="package_empty"
            >
                Du er endnu ikke begyndt at designe denne pakke.

                <div
                    class="package_buttons"
                >

                    <div
                        v-if="packages.length > 1"
                        class="button_container"
                    >
                        <MainButton
                            class="margin_bottom_button"
                            :emph="false"
                            :text="'Slet pakke'"
                            :icon="'trash'"
                            @click.native="deletePackageInStore(index)"
                        />
                    </div>

                    <div class="button_container">
                        <router-link
                            :to="{ name: 'Inspiration' }"
                        >
                            <MainButton
                                :emph="true"
                                :text="'Bliv inspireret af vores pakker'"
                                :icon="'boxes'"
                            />
                        </router-link>
                    </div>

                    <div class="button_container">
                        <router-link
                            :to="{ name: 'Wrapping' }">
                            <MainButton
                                :emph="true"
                                :text="'Design din egen pakke'"
                                :icon="'arrow_right'"
                            />
                        </router-link>
                    </div>

                </div>
            </div>

            <div
                v-else
                class="package_content_container"
            >
                <div class="package_wrapping">

                    <h3>
                        Indpakning
                    </h3>

                    <div
                        class="nothing_found"
                        v-if="!pack.wrapping">
                        <p>
                            Du har endnu ikke designet din indpakning.
                            <router-link
                                :to="{ name: 'Wrapping' }">
                                Klik her for at designe din indpakning.
                            </router-link>
                        </p>

                    </div>

                    <PackageItem
                        v-if="pack.wrapping && pack.wrapping.isAvailable"
                        :product="pack.wrapping"
                        :productType="'wrapping'"
                        :editButton="true"
                        :deleteButton="false"
                        :productId="pack.id"
                        :editDestination="{ name: 'Wrapping' }"
                    />

                    <div
                        v-if="pack.wrapping && !pack.wrapping.isAvailable"
                    >
                        Din valgte indpakning er desværre ikke tilgængelig.

                        <div class="button_container">
                        <router-link
                            :to="{ name: 'Wrapping' }"
                        >
                            <MainButton
                                class="unavailable_wrapping"
                                :emph="true"
                                :text="'Klik her for at designe din indpakning'"
                                :icon="'wrapping'"
                            />

                        </router-link>
                        </div>

                    </div>
                </div>

                <div class="package_content">

                    <h3>
                        Indhold
                    </h3>

                    <div
                        class="nothing_found"
                        v-if="!pack.products.length">
                        <p>
                            Du har endnu ikke tilføjet noget indhold til din pakke.

                            <router-link
                                :to="{ name: 'ContentCategoriesOverview' }">
                                Tryk her for at tilføje indhold
                            </router-link>
                            .
                        </p>
                    </div>

                    <PackageItem
                        v-if="pack.products.length"
                        v-for="(product, productIndex) in pack.products"
                        :product="product"
                        :productType="'product'"
                        :editButton="true"
                        :deleteButton="true"
                        :packageIndex="index"
                        :productIndex="productIndex"
                        :editDestination="{
                    name: 'Product',
                    params: {
                    productId: product.id,
                    editingCurrentProduct: true,
                    editingPackageIndex: index,
                    editingProductIndex: productIndex
                    }
                    }
"
                    />
                </div>

                <div
                    v-if="pack.wrapping || pack.products.length"
                    class="package_buttons"
                >

                    <div class="button_container">
                    <MainButton
                        :emph="false"
                        :text="'Slet pakke'"
                        :icon="'trash'"
                        @click.native="deletePackageInStore(index)"
                    />
                    </div>

                    <div class="button_container">
                    <MainButton
                        :emph="true"
                        :text="'Duplikér pakke'"
                        :icon="'duplicate'"
                        @click.native="addPackageInStore(index)"
                    />
                    </div>
                </div>
            </div>
        </section>

        <section
            v-for="(pack, index) in packages"
            v-if="index !== activePackage"
            class="package"
        >
            <hr>
            <h2>
                Denne pakke: {{ pack.title }}
                <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="pencil-alt"
                     class="basic_icon svg-inline--fa fa-pencil-alt fa-w-16" role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <g class="fa-group">
                        <path class="fa-secondary"
                              d="M96 352H32l-16 64 80 80 64-16v-64H96zM498 74.26l-.11-.11L437.77 14a48.09 48.09 0 0 0-67.9 0l-46.1 46.1a12 12 0 0 0 0 17l111 111a12 12 0 0 0 17 0l46.1-46.1a47.93 47.93 0 0 0 .13-67.74z"
                              opacity="0.4"></path>
                        <path class="fa-primary"
                              d="M.37 483.85a24 24 0 0 0 19.47 27.8 24.27 24.27 0 0 0 8.33 0l67.32-16.16-79-79zM412.3 210.78l-111-111a12.13 12.13 0 0 0-17.1 0L32 352h64v64h64v64l252.27-252.25a12 12 0 0 0 .03-16.97zm-114.41-24.93l-154 154a14 14 0 1 1-19.8-19.8l154-154a14 14 0 1 1 19.8 19.8z"></path>
                    </g>
                </svg>
            </h2>

            <div
                v-if="!pack.wrapping && !pack.products.length"
                class="package_empty"
            >
                Du er endnu ikke begyndt at designe denne pakke.

                <div
                    class="package_buttons"
                >
                    <div
                        v-if="packages.length > 1"
                        class="button_container"
                    >
                        <MainButton
                            class="margin_bottom_button"
                            :emph="false"
                            :text="'Slet pakke'"
                            :icon="'trash'"
                            @click.native="deletePackageInStore(index)"
                        />
                    </div>

                    <div class="button_container">
                    <router-link
                        :to="{ name: 'Inspiration' }"
                    >
                        <MainButton
                            :emph="true"
                            :text="'Bliv inspireret af vores pakker'"
                            :icon="'boxes'"
                        />
                    </router-link>
                    </div>

                    <div class="button_container">
                    <router-link
                        :to="{ name: 'Wrapping' }">
                        <MainButton
                            :emph="false"
                            :text="'Design din egen pakke'"
                            :icon="'arrow_right'"
                        />
                    </router-link>
                    </div>

                </div>
            </div>

            <div
                v-else
                class="package_content_container"
            >
                <div class="package_wrapping">

                    <h3>
                        Indpakning
                    </h3>

                    <div
                        class="nothing_found"
                        v-if="!pack.wrapping">
                        <p>
                            Du har endnu ikke designet din indpakning.
                            <router-link
                                :to="{ name: 'Wrapping' }">
                                Klik her for at designe din indpakning.
                            </router-link>
                        </p>

                    </div>

                    <PackageItem
                        v-if="pack.wrapping && pack.wrapping.isAvailable"
                        :product="pack.wrapping"
                        :productType="'wrapping'"
                        :editButton="true"
                        :deleteButton="false"
                        :productId="pack.id"
                        :editDestination="{ name: 'Wrapping' }"
                    />

                    <div
                        v-if="pack.wrapping && !pack.wrapping.isAvailable"
                    >
                        Din valgte indpakning er desværre ikke tilgængelig.
                        <div class="button_container">
                        <router-link
                            :to="{ name: 'Wrapping' }"
                        >
                            <MainButton
                                class="unavailable_wrapping"
                                :emph="true"
                                :text="'Klik her for at designe din indpakning'"
                                :icon="'wrapping'"
                            />

                        </router-link>
                    </div>

                    </div>
                </div>

                <div class="package_content">

                    <h3>
                        Indhold
                    </h3>

                    <div
                        class="nothing_found"
                        v-if="!pack.products.length">
                        <p>
                            Du har endnu ikke tilføjet noget indhold til din pakke.
                            <router-link
                                :to="{ name: 'ContentCategoriesOverview' }">
                                Tryk her for at tilføje indhold
                            </router-link>
                            .
                        </p>
                    </div>

                    <PackageItem
                        v-if="pack.products.length"
                        v-for="(product, productIndex) in pack.products"
                        :product="product"
                        :productType="'product'"
                        :editButton="true"
                        :deleteButton="true"
                        :packageIndex="index"
                        :productIndex="productIndex"
                        :editDestination="{
                    name: 'Product',
                    params: {
                    productId: product.id,
                    editingCurrentProduct: true,
                    editingPackageIndex: index,
                    editingProductIndex: productIndex
                    }
                    }
"
                    />
                </div>

                <div
                    v-if="pack.wrapping || pack.products.length"
                    class="package_buttons"
                >
                    <div class="button_container">
                    <MainButton
                        :emph="false"
                        :text="'Slet pakke'"
                        :icon="'trash'"
                        @click.native="deletePackageInStore(index)"
                    />
                    </div>

                    <div
                        v-if="activePackage !== index"
                        class="button_container"
                    >
                    <MainButton
                        :emph="true"
                        :text="'Redigér pakke'"
                        :icon="'edit'"
                        @click.native="changeActivePackageInStore(index)"
                    />
                    </div>

                    <div class="button_container">
                    <MainButton
                        :emph="true"
                        :text="'Duplikér pakke'"
                        :icon="'duplicate'"
                        @click.native="addPackageInStore(index)"
                    />
                    </div>
                </div>
            </div>
        </section>


        <section
            v-if="packages[activePackage].wrapping"
            class="packages_end"
        >
            <hr>
            <div
                class="package_buttons"
            >
                <div class="button_container">
                <MainButton
                    :emph="true"
                    :text="'Ny pakke'"
                    :icon="'plus'"
                    @click.native="addPackageInStore('new')"
                />
                </div>

                <div class="button_container">
                <MainButton
                    :color="'checkout'"
                    :text="'Gå til Checkout'"
                    :icon="'cart'"
                />
                </div>

            </div>
        </section>


    </div>
</template>

<script>
    import PackageItem from "../components/PackageItem";
    import MainButton from "../components/MainButton";
    import {mapMutations, mapState} from "vuex";

    export default {
        name: 'MyPackages',
        components: {MainButton, PackageItem},
        computed: {
            ...mapState([
                'activePackage',
                'packages'
            ]),
        },
        methods: {
            ...mapMutations([
                'addNewPackage',
                'changeActivePackage',
                'deletePackage'
            ]),
            addPackageInStore(pack) {
                this.addNewPackage({pack: pack});
                this.scrollToTop();
            },
            changeActivePackageInStore(index) {
                this.changeActivePackage({index: index});
                this.scrollToTop();
            },
            deletePackageInStore(packageIndex) {
                this.deletePackage({packageIndex: packageIndex})
            },
            scrollToTop() {
                document.querySelector(".my_packages").scrollIntoView();
                console.log("Scrolling");
            }
        }
    }
</script>

<style scoped lang="scss">

    h2 {
        color: rgba(var(--colour-primary-500), 1);
        margin-top: 24px;
    }

    .package + .package {
        margin-top: 48px;
    }

    .package_item {
        margin-bottom: 48px;
    }

    .button_container {
        margin-top: 12px;
    }

    .button_container,
    .main_button,
    a {
        width: 100%;
    }

    .package_content {
        margin-top: 48px;
    }

    a {
        text-decoration: none;
    }

    .package_empty {
        margin: 24px 0 48px 0;
    }

    .packages_end {
        margin-top: 96px;
    }

    .unavailable_wrapping {
        margin-top: 24px;
    }

    @media screen and (min-width: 1024px) {
        .package_item,
        .package_buttons,
        .nothing_found {
            max-width: 1000px;
        }

        .package_buttons {
            display: flex;
            margin-top: 48px;
        }

        .button_container {
        margin: 0;

        + .button_container {
            margin-left: 12px;
        }
        }
    }

</style>