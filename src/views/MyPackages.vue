<template>
    <div class="my_packages">

        <h1>
            Mine pakker
        </h1>

        <section class="package">
            <hr>
            <h2>
                Denne pakke: Amanda
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

            <div class="package_wrapping">

                <h3>
                    Indpakning
                </h3>

                <PackageItem/>
            </div>

            <div class="package_content">

                <h3>
                    Indhold
                </h3>

                <PackageItem/>
                <PackageItem/>
            </div>

            <div class="package_buttons">
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

        <section class="package">
            <hr>
            <h2>
                Karsten
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

            <div class="package_wrapping">

                <h3>
                    Indpakning
                </h3>

                <PackageItem/>
            </div>

            <div class="package_content">

                <h3>
                    Indhold
                </h3>

                <PackageItem/>
                <PackageItem/>
            </div>

            <div class="package_buttons">
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

                <MainButton
                    :emph="true"
                    :text="'Redigér pakke'"
                    :icon="'edit'"
                />
            </div>
        </section>

    </div>
</template>

<script>
    import PackageItem from "../components/PackageItem";
    import MainButton from "../components/MainButton";

    export default {
        name: 'MyPackages',
        components: {MainButton, PackageItem},
    }
</script>

<style scoped lang="scss">

    h2 {
        color: var(--colour-primary-500);
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

    .main_button {
        width: 100%;

        + .main_button {
            margin-top: 8px;
        }
    }

    @media screen and (min-width: 1024px) {
        .package_item,
        .package_buttons {
            max-width: 1000px;
        }

        .package_buttons {
            display: flex;
        }

        .main_button + .main_button {
            margin: 0 0 0 8px;
        }
    }

</style>