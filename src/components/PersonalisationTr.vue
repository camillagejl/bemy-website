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
        &.value {
            color: rgba(var(--colour-grey-700), 1);
        }

        &.key {
            padding-right: 24px;
        }
    }

</style>
