<template>
    <div class="personalisation_input product_option">

        <label
            v-if="activeProduct && personalisation"
        >
                        <span class="line_break">
                        <strong>
                            {{ personalisationKey }}
                        </strong>

                        <span
                            v-if="personalisation.characterMax"
                        >
                        (maks. {{personalisation.characterMax }} tegn)
                            </span>
                        </span>

            <input
                v-if="personalisation.type === 'line_text'"
                type="text"
                :maxlength="personalisation.characterMax"
                :placeholder="personalisation.placeholder"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisationKey]"
                @input="updateInputSelectionValueInStore"
            >

            <textarea
                v-if="personalisation.type === 'multiline_text'"
                :maxlength="personalisation.characterMax"
                :placeholder="personalisation.placeholder"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisationKey]"
                @input="updateInputSelectionValueInStore"
            ></textarea>

            <input
                v-if="personalisation.type === 'number'"
                type="number"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisationKey]"
                @input="updateInputSelectionValueInStore"
            >

            <select
                v-if="personalisation.type === 'dropdown' || type === 'dropdown'"
                class="product_option option_w_dropdown"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisationKey]"
                @input="updateInputSelectionValueInStore"
            >

                <option
                    v-for="value in personalisation.selectOptions"
                    :value="value"
                >
                    {{ value }}
                </option>
            </select>

        </label>
    </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: 'PersonalisationInput',
        props: {
            personalisation: Object,
            personalisationKey: String,
            activeProduct: Object,
            productId: String,
            productType: String,
            type: String
        },
        methods: {
            ...mapMutations([
                'updateSelectionValue',
            ]),
            updateInputSelectionValueInStore(e) {
                this.updateSelectionValue({
                    productId: this.productId,
                    value: e.target.value,
                    name: e.target.name,
                    type: this.productType
                });
            }
        }
    }
</script>

<style scoped lang="scss">


    .option_label {
        p {
            display: inline;
        }
    }

    .selection_in_text {
        strong,
        div {
            display: inline-block;
        }
    }

    .line_break {
        display: block;
        margin-bottom: 8px;
    }

    select {
        min-width: 100px;
    }

    input[type = text],
    textarea {
        box-sizing: border-box;
        width: 100%;
    }

</style>
