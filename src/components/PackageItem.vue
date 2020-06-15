<template>
    <div class="package_item">

        <div
            class="package_item_flex"
        >

            <div class="package_item_image relative_image rounded_box">
                <img
                    v-if="product.designImages.length"
                    :src="product.designImages[0]"
                >
                <img
                    v-else
                    :src="product.image"
                >
            </div>

            <div class="package_item_info">
                <h4>{{ product.title }}</h4>

                <table>
                    <PersonalisationTr
                        v-for="(selection, key) in product.selections"
                        v-if="!editable || !Object.keys(allPersonalisations).includes(key)"
                        :selection="selection"
                        :selectionKey="key"
                    />
                </table>

                <PersonalisationInput
                    v-for="(personalisation, key) in allPersonalisations"
                    v-if="editable && Object.keys(allPersonalisations).includes(key)"
                    :personalisation="personalisation"
                    :personalisationKey="key"
                    :productId="product.id"
                    :productType="productType"
                    :activeProduct="product"
                    :productIndex="productIndex"
                    :editingInMyPackages="true"
                />

                <div
                    class="editing_items_buttons"
                    v-if="editable">
                    <div class="button_container">
                        <MainButton
                            :emph="false"
                            :text="'Gem ændringer'"
                            :icon="'save'"
                            @click.native="editable = !editable"
                        />
                    </div>

                    <router-link
                        class="button_container"
                        :to="editDestination"
                    >
                        <MainButton
                            :emph="true"
                            :text="'Redigér design'"
                            :icon="'edit'"
                        />
                    </router-link>
                </div>

                <div class="product_price">
                    <strong>
                        {{ product.displayPrice }} kr
                    </strong>
                </div>
            </div>

        </div>

        <div
            class="edit_icons">

            <div
                @click="editable = !editable"
                class="edit_button"
                v-if="editButton && !editable"
            >
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
            </div>

            <div
                @click="editable = !editable"
                class="edit_button"
                v-if="editButton && editable"
            >
                <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="check"
                     class="basic_icon svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 512 512">
                    <g class="fa-group">
                        <path class="fa-secondary"
                              d="M504.5 144.42L264.75 385.5 192 312.59l240.11-241a25.49 25.49 0 0 1 36.06-.14l.14.14L504.5 108a25.86 25.86 0 0 1 0 36.42z"
                              opacity="0.4"></path>
                        <path class="fa-primary"
                              d="M264.67 385.59l-54.57 54.87a25.5 25.5 0 0 1-36.06.14l-.14-.14L7.5 273.1a25.84 25.84 0 0 1 0-36.41l36.2-36.41a25.49 25.49 0 0 1 36-.17l.16.17z"></path>
                    </g>
                </svg>
            </div>

            <div
                class="delete_button"
                v-if="deleteButton"
                @click="deleteProductInStore"
            >
                <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="trash-alt"
                     class="basic_icon svg-inline--fa fa-trash-alt fa-w-14" role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 448 512">
                    <g class="fa-group">
                        <path class="fa-secondary"
                              d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96H32zm272-288a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0z"
                              opacity="0.4"></path>
                        <path class="fa-primary"
                              d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM128 160a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16zm96 0a16 16 0 0 0-16 16v224a16 16 0 0 0 32 0V176a16 16 0 0 0-16-16z"></path>
                    </g>
                </svg>
            </div>

        </div>
    </div>

</template>

<script>
    import PersonalisationTr from "./PersonalisationTr";
    import PersonalisationInput from "./PersonalisationInput";
    import {mapGetters, mapMutations, mapState} from "vuex";
    import MainButton from "./MainButton";

    export default {
        name: 'PackageItem',
        components: {MainButton, PersonalisationInput, PersonalisationTr},
        data() {
            return {
                editable: false,
            }
        },
        props: {
            product: Object,
            editButton: Boolean,
            deleteButton: Boolean,
            productType: String,
            editDestination: Object,
            packageIndex: Number,
            productIndex: Number,
        },
        methods: {
            ...mapMutations([
                'deleteProductFromPackage'
            ]),
            deleteProductInStore() {
                this.deleteProductFromPackage({packageIndex: this.packageIndex, productIndex: this.productIndex})
            }
        },
        computed: {
            ...mapState([
                'designs'
            ]),
            ...mapGetters([
                'productsById'
            ]),
            originalProduct() {
                return this.productsById[this.product.id];
            },
            allPersonalisations() {
                let personalisations = {};

                if (this.originalProduct.personalisations) {
                    Object.keys(this.originalProduct.personalisations).forEach((personalisation) => {

                        personalisations[personalisation] = this.originalProduct.personalisations[personalisation]
                    });

                }

                if (this.product.selections.Design) {
                    const design = _.find(this.designs, ['Design', this.product.selections.Design]);

                    Object.keys(design.personalisations).forEach(personalisation => {
                        personalisations[personalisation] = design.personalisations[personalisation];
                    });

                }

                return personalisations
            }
        }
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
        position: relative;
        padding-bottom: 48px;
        flex: 3;
        margin-left: 12px;

        h4 {
            margin: 0 0 12px 0;
        }
    }

    .edit_icons {
        display: flex;
        justify-content: center;

        .basic_icon {
            height: 24px;
            padding: 24px;
        }
    }

    .delete_button svg {
        fill: rgba(var(--colour-primary-500), 1)
    }

    .product_price {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .personalisation_input {
        margin: 12px 0 0 3px;

        +
        .personalisation_input {
            margin-top: 24px;
        }
    }


    .editing_items_buttons {
        display: flex;
    }

    .button_container {
        flex: 1;
        margin-top: 24px;
        text-align: right;
        text-decoration: none;

        .main_button {
            width: 100%;
        }

        + .button_container {
            margin-left: 12px;
        }

    }

    @media screen and (min-width: 1024px) {
        .package_item {
            display: flex;
        }

        .package_item_flex {
            flex: 1;
        }

        .package_item_info {
            margin-left: 12px;

            p {
                display: inline-block;
            }
        }

        tr {
            display: table-row !important;
            line-height: 36px;
        }

        .edit_icons {
            flex-direction: column;
        }
    }


</style>
