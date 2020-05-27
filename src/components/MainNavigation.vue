<template>
    <div class="main_navigation">
        <nav>
            <div
                v-if="packages[activePackage]"
                class="package_name display_1024"
            >
                {{ packages[activePackage].title}}
                <svg
                    @click="editTitle"
                    aria-hidden="true" focusable="false" data-prefix="fad" data-icon="pencil-alt"
                     class="basic_icon svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <g class="fa-group">
                        <path class="fa-secondary"
                              d="M96 352H32l-16 64 80 80 64-16v-64H96zM498 74.26l-.11-.11L437.77 14a48.09 48.09 0 0 0-67.9 0l-46.1 46.1a12 12 0 0 0 0 17l111 111a12 12 0 0 0 17 0l46.1-46.1a47.93 47.93 0 0 0 .13-67.74z"
                              opacity="0.4"></path>
                        <path class="fa-primary"
                              d="M.37 483.85a24 24 0 0 0 19.47 27.8 24.27 24.27 0 0 0 8.33 0l67.32-16.16-79-79zM412.3 210.78l-111-111a12.13 12.13 0 0 0-17.1 0L32 352h64v64h64v64l252.27-252.25a12 12 0 0 0 .03-16.97zm-114.41-24.93l-154 154a14 14 0 1 1-19.8-19.8l154-154a14 14 0 1 1 19.8 19.8z"></path>
                    </g>
                </svg>
            </div>

            <div class="nav_section">
                <div class="nav_section_top">
                    <router-link
                        class="nav_icon_container flex_center_align_1024"
                        :to="{ name: 'Wrapping' }"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="gift"
                             class="nav_icon svg-inline--fa fa-gift fa-w-16" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 512 512">
                            <g class="fa-group">
                                <path class="fa-secondary"
                                      d="M224 320v160H64a32 32 0 0 1-32-32V320zm0-160H32a32 32 0 0 0-32 32v80a16 16 0 0 0 16 16h208zm256 0H288v128h208a16 16 0 0 0 16-16v-80a32 32 0 0 0-32-32zM288 480h160a32 32 0 0 0 32-32V320H288z"
                                      opacity="0.4"></path>
                                <path class="fa-primary"
                                      d="M224 480h64V320h-64zM359.54 32c-41.82 0-68.86 21.3-103.54 68.3-34.68-47-61.72-68.3-103.54-68.3C103.71 32 64 71.5 64 120a85.65 85.65 0 0 0 10.15 40h78.21a40 40 0 1 1 0-80c20 0 34.78 3.3 86.55 80H224v128h64V160h-15c51.67-76.5 66-80 86.55-80a40 40 0 1 1 0 80h78.31A86.86 86.86 0 0 0 448 120c0-48.5-39.71-88-88.46-88z"></path>
                            </g>
                        </svg>

                        <div class="nav_section_title_container display_1024">
                            <div class="nav_section_title">
                                Indpakning
                            </div>
                            <div
                                class="nav_section_edit"
                            >
                                Redigér indpakning
                            </div>
                        </div>
                    </router-link>
                </div>

                <WrappingRecapList
                    v-if="packages[activePackage]"
                    class="display_1024"
                />
            </div>

            <div class="nav_section">
                <div class="nav_section_top">
                    <router-link
                        class="nav_icon_container flex_center_align_1024 selected"
                        :to="{ name: 'ContentCategoriesOverview' }"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="tshirt"
                             class="nav_icon svg-inline--fa fa-tshirt fa-w-20" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 640 512">
                            <g class="fa-group">
                                <path class="fa-secondary"
                                      d="M8.86 96.5a16.11 16.11 0 0 0-7.2 21.5l57.23 114.5a16.11 16.11 0 0 0 21.5 7.2l17.32-8.48L26.09 88zm459-80.95a187.31 187.31 0 0 1-13.32 13.26C418.45 61.3 370.67 79.2 320 79.2s-98.41-17.9-134.51-50.39a187.31 187.31 0 0 1-13.32-13.26L54.76 73.75l71.69 143.4L137 212a16 16 0 0 1 23 14.4V480a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V226.3a16 16 0 0 1 23-14.4l10.57 5.18L585.19 73.7zm163.31 81l-17.32-8.59-71.6 143.19 17.24 8.45h.06a16 16 0 0 0 21.45-7.2L638.28 118a16 16 0 0 0-7.1-21.5z"
                                      opacity="0.4"></path>
                                <path class="fa-primary"
                                      d="M320 47.2c-51.89 0-96.39-19.4-116.49-47.2l-31.34 15.55a187.31 187.31 0 0 0 13.32 13.26C221.59 61.3 269.37 79.2 320 79.2s98.43-17.9 134.53-50.39a187.31 187.31 0 0 0 13.32-13.26L436.51 0c-20.1 27.8-64.6 47.2-116.51 47.2zM26.09 88l71.62 143.22 28.74-14.07-71.69-143.4zm559.1-14.3l-71.68 143.38 28.74 14.07 71.61-143.24z"></path>
                            </g>
                        </svg>

                    <div class="nav_section_title_container display_1024">
                        <div class="nav_section_title">
                            Indhold
                        </div>
                        <div
                            class="nav_section_edit"
                        >
                            Tilføj indhold
                        </div>
                    </div>
                    </router-link>
                </div>

                <ContentRecapList
                    class="display_1024"
                />
            </div>

            <div class="nav_section">
                <div class="nav_section_top">
                    <router-link
                        class="nav_icon_container flex_center_align_1024"
                        :to="{ name: 'MyPackages' }"
                    >
                        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="boxes"
                             class="nav_icon svg-inline--fa fa-boxes fa-w-18" role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512">
                            <g class="fa-group">
                                <path class="fa-secondary"
                                      d="M480 288v96l-32-21.3-32 21.3v-96zM320 0v96l-32-21.3L256 96V0zM160 288v96l-32-21.3L96 384v-96z"
                                      opacity="1"></path>
                                <path class="fa-primary"
                                      d="M560 288h-80v96l-32-21.3-32 21.3v-96h-80a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16V304a16 16 0 0 0-16-16zm-384-64h224a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16h-80v96l-32-21.3L256 96V0h-80a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16zm64 64h-80v96l-32-21.3L96 384v-96H16a16 16 0 0 0-16 16v192a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16V304a16 16 0 0 0-16-16z"
                                      opacity="0.4"></path>
                            </g>
                        </svg>

                    <div class="nav_section_title_container display_1024">
                        <div class="nav_section_title">
                            Mine pakker
                        </div>
                        <div
                            class="nav_section_edit"
                        >
                            Se mine pakker
                        </div>
                    </div>
                    </router-link>
                </div>
            </div>

        </nav>
    </div>
</template>

<script>
    import ContentRecapList from "./ContentRecapList";
    import {mapMutations, mapState} from "vuex";
    import WrappingRecapList from "./WrappingRecapList";

    export default {
        name: 'MainNavigation',
        components: {WrappingRecapList, ContentRecapList},
        computed: {
            ...mapState([
                'activePackage',
                'packages'
            ]),
        },
        methods: {
            ...mapMutations([
                'updatePackageTitle'
            ]),
            editTitle() {
                let title = window.prompt("Ny titel på pakken:");

                if (title.length > 20) {
                    title = title.slice(0,20)
                }

                this.updatePackageTitle({ title: title })
            }
        }
    }
</script>

<style scoped lang="scss">

    .main_navigation {
        background-color: rgba(var(--colour-grey-200), 1);
    }

    .main_navigation nav {
        display: flex;
        align-items: center;
    }

    .nav_section {
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
    }

    .nav_section_top {
        height: 100%;
    }

    .nav_icon_container {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;

        &.selected {
            background-color: rgba(var(--colourgrey-00), 1);;
            box-shadow: var(--box-shadow-400);
        }
    }

    .nav_icon {
        height: 26px;
        fill: rgba(var(--colour-primary-700), 1);
    }

    .nav_section_top {
        display: flex;
        justify-content: center;
    }

    /* Desktop only stylings */

    .package_name {
        width: 100%;
        text-align: center;
        margin-bottom: 12px;
        color: rgba(var(--colour-primary-700), 1);
        font-family: var(--font-family-header);
    }

    .nav_section_top a {
        text-decoration: none;
    }

    .nav_section_title {
        font-family: var(--font-family-header);
        color: rgba(var(--colour-grey-800), 1);
    }

    .nav_section_edit {
        font-size: 12px;
        text-decoration: underline;
        margin-top: 4px;
    }

    @media screen and (min-width: 1024px) {
        .main_navigation {
            padding: 48px 0;
        }

        .main_navigation nav {
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 0 24px;
        }

        .nav_icon_container {
            display: flex;
            align-items: center;
            justify-content: left;

            &.selected {
                background-color: inherit;
                box-shadow: none;
            }
        }

        .nav_icon {
            height: 36px;
            margin-right: 12px;
        }

        .nav_section {
            border-top: 2px solid rgba(var(--colour-primary-200), 1);
            height: fit-content;
            width: 100%;
        }

        .nav_section_top {
            height: fit-content;
            justify-content: flex-start;
        }
    }

</style>
