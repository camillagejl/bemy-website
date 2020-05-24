<template>
    <tr class="personalisation_tr">

        <td class="key">
            <strong>
                {{ selectionKey }}
            </strong>
        </td>
        <td
            v-if="selection"
            class="selection"
        >
            {{ selection }}
        </td>

        <td
            v-else
            class="no_selection"
        >
            Ingen tekst
        </td>

    </tr>
</template>

<script>
    export default {
        name: 'PersonalisationTr',
        props: {
            selection: String,
            selectionKey: String
        },
    }
</script>

<style scoped lang="scss">

    tr {
        display: flex;
        flex-direction: column;
        padding-bottom: 12px;
    }

    td {
        &.selection,
        &.no_selection {
            color: rgba(var(--colour-grey-700), 1);
        }

        &.key {
            padding-right: 24px;
        }
    }

    .no_selection {
        font-style: italic;
    }

</style>
