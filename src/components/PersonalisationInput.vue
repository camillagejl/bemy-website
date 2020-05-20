<template>
    <div class="input product_option">




        <label
        >
                        <span class="line_break">
                        <strong>
                            {{ personalisation.key }}
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
                :value="activeProduct.selections[personalisation.key]"
                @input="updateInputSelectionValueInStore"
            >

            <textarea
                v-if="personalisation.type === 'multiline_text'"
                :maxlength="personalisation.characterMax"
                :placeholder="personalisation.placeholder"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisation.key]"
                @input="updateInputSelectionValueInStore"
            ></textarea>

            <input
                v-if="personalisation.type === 'number'"
                type="number"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisation.key]"
                @input="updateInputSelectionValueInStore"
            >

            <select
                v-if="personalisation.type === 'dropdown'"
                class="product_option option_w_dropdown"
                :name="personalisationKey"
                :value="activeProduct.selections[personalisation.key]"
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
            productId: String
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
                    type: 'product'
                });
            }
        }
    }
</script>

<style scoped lang="scss">
</style>
