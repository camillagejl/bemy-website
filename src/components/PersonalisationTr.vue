<template>
    <tr class="personalisation_tr">

        <td class="key">
            <strong>
                {{ selectionKey }}
            </strong>
        </td>
        <td class="value">
            {{ selection }}
        </td>

    </tr>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: 'PersonalisationTr',
        props: {
            selection: String,
            selectionKey: String
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


</style>
