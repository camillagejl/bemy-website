<template>
    <div class="package_item">

        <div class="package_item_flex">

            <div class="package_item_image relative_image rounded_box">
                <img src="../assets/placeholders/box-color-2.png">
            </div>

            <div class="package_item_info">
                <h4>Rosa Gaveæske m. bånd</h4>

                <div class="package_item_grid">
                    <strong>
                        Størrelse
                    </strong>
                    <p>
                        Large - L33 x B25 x H11 cm
                    </p>

                    <strong>
                        Farve
                    </strong>
                    <p>
                        Rosa
                    </p>

                    <strong>
                        Design
                    </strong>
                    <p>
                        I can't say I do without you
                    </p>

                    <strong>
                        Tekst til indersiden af låget:
                    </strong>
                    <p>
                        Til min sødeste kusine! Hav en god dag.
                        Til min sødeste kusine! Hav en god dag.
                    </p>
                </div>

            </div>

        </div>

        <div class="edit_icons">

            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash-alt"
                 class="edit_pen svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 448 512">
                <g class="fa-group">
                    <path class="fa-secondary"
                          d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96H32zm272-288a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0z"
                          opacity="0.4"></path>
                    <path class="fa-primary"
                          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM128 160a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16z"></path>
                </g>
            </svg>

            <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="pencil-alt"
                 class="edit_pen svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
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

    </div>
</template>

<script>
    export default {
        name: 'PackageItem'
    }
</script>

<style scoped lang="scss">
    .package_item_flex {
        display: flex;
    }

    .package_item_image {
        flex: 1;
        height: fit-content;
    }

    .package_item_info {
        flex: 3;
        margin-left: 12px;

        h4 {
            margin: 0 0 12px 0;
        }

        p {
            margin: 0 0 12px 0;
            color: var(--colour-grey-700);

            &:last-child {
                margin: 0;
            }

        }
    }

    .edit_icons {
        text-align: center;

        .edit_pen {
            height: 24px;
            padding: 24px;
        }
    }

    @media screen and (min-width: 1024px) {

        .package_item {
            display: flex;
        }

        .package_item_grid {
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(2, auto);
            grid-gap: 12px;
            width: 100%;
        }

        .package_item_info {
            margin-left: 12px;

            p {
                display: inline-block;
            }
        }
    }


</style>
