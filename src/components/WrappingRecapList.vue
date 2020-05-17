<template>
    <div
        v-if="packages[activePackage].wrapping"
        class="wrapping_recap_list"
    >
        <div
            class="recap_list_item"
        >
            {{ packages[activePackage].wrapping.title }}
        </div>
        <div
            v-if="packages[activePackage].wrapping.selections.Farve"
            class="recap_list_item"
        >
            {{ packages[activePackage].wrapping.selections.Farve }}
        </div>
        <div
            v-if="packages[activePackage].wrapping.selections.Design"
            class="recap_list_item"
        >
            {{ packages[activePackage].wrapping.selections.Design }}
        </div>

    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: 'WrappingRecapList',
        computed: {
            ...mapState([
                'activePackage',
                'packages'
            ]),
        }
    }
</script>

<style scoped lang="scss">

    .recap_list_item {
        display: flex;
        align-items: center;
        margin-top: 12px;
        color: rgba(var(--colour-primary-700), 1);

        &:before {
            content: '\2022';
            width: 1em;
        }
    }

    @media screen and (min-width: 1024px) {
        .recap_list_item {
            font-size: 14px;
            margin-top: 8px;
        }
    }

</style>
