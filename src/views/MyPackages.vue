<template>
    <div class="my_packages">

        <h1>
            Mine pakker
        </h1>

        <section class="package">
            <hr>
            <h2>
                Denne pakke: {{ packages[activePackage].title }}
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
                v-if="!packages[activePackage].wrapping || packages[activePackage].products.length"
                class="package_empty"
            >
                Du er endnu ikke begyndt på at designe din egen pakke.
                <router-link :to="{ name: 'Wrapping' }">Start ved at designe din indpakning,</router-link>
                eller
                <router-link :to="{ name: 'Home' }">bliv inspireret af vores færdige pakker</router-link>
                .


                <div
                    class="package_buttons"
                >
                    <router-link
                        :to="{ name: 'ContentCategoriesOverview' }">
                        <MainButton
                            :emph="true"
                            :text="'Tryk her for at tilføje indhold'"
                            :icon="'product'"
                        />
                    </router-link>

                    <router-link
                        :to="{ name: 'ContentCategoriesOverview' }">
                        <MainButton
                            :emph="true"
                            :text="'Tryk her for at tilføje indhold'"
                            :icon="'product'"
                        />
                    </router-link>
                </div>
            </div>

            <div class="package_wrapping">

                <h3>
                    Indpakning
                </h3>

                <div
                    class="nothing_found"
                    v-if="!packages[activePackage].wrapping">
                    <p>
                        Du har endnu ikke designet din indpakning.
                    </p>

                    <router-link
                        :to="{ name: 'Wrapping' }">
                        <MainButton
                            :emph="true"
                            :text="'Tryk her for at designe din indpakning'"
                            :icon="'wrapping'"
                        />
                    </router-link>
                </div>

                <PackageItem
                    v-if="packages[activePackage].wrapping"
                    :product="packages[activePackage].wrapping"
                    :editButton="true"
                    :deleteButton="false"
                />
            </div>

            <div class="package_content">

                <h3>
                    Indhold
                </h3>

                <div
                    class="nothing_found"
                    v-if="!packages[activePackage].products.length">
                    <p>
                        Du har endnu ikke tilføjet noget indhold til din pakke.
                    </p>

                    <router-link
                        :to="{ name: 'ContentCategoriesOverview' }">
                        <MainButton
                            :emph="true"
                            :text="'Tryk her for at tilføje indhold'"
                            :icon="'product'"
                        />
                    </router-link>
                </div>

                <PackageItem
                    v-if="packages[activePackage].products.length"
                    v-for="product in packages[activePackage].products"
                    :product="product"
                    :editButton="true"
                    :deleteButton="true"
                />
            </div>

            <div
                v-if="packages[activePackage].wrapping || packages[activePackage].products.length"
                class="package_buttons"
            >
                <MainButton
                    :emph="false"
                    :text="'Slet pakke'"
                    :icon="'trash'"
                />

                <MainButton
                    :emph="true"
                    :text="'Duplikér pakke'"
                    :icon="'duplicate'"
                />

            </div>
        </section>

    </div>
</template>

<script>
    import PackageItem from "../components/PackageItem";
    import MainButton from "../components/MainButton";
    import {mapState} from "vuex";

    export default {
        name: 'MyPackages',
        components: {MainButton, PackageItem},
        computed: {
            ...mapState([
                'activePackage',
                'packages'
            ]),
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

    .package_buttons {
        margin-top: 12px;
    }

    a {
        width: 100%;

        + a {
            margin-top: 8px;
        }
    }

    .main_button {
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

        a {
            max-width: 50%;

            + a {
                margin: 0 0 0 8px;
            }
        }

        .main_button {
            width: 50%;

            + .main_button {
                margin: 0 0 0 8px;
            }
        }

    }

</style>