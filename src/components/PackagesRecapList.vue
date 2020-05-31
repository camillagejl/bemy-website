<template>
    <div class="packages_recap_list">

        <div
            v-if="packages[activePackage]"
            class="recap_list_item"
        >
            <div
                class="list_item_title"
            >
                {{ packages[activePackage].title }}
            </div>
        </div>

        <div
            v-for="(pack, packageIndex) in packages"
            v-if="packages[activePackage] && packageIndex !== activePackage"
            class="recap_list_item clickable"
            @click="changeActivePackageInStore(packageIndex)"
        >
            <div
                class="list_item_title"
            >
                {{ pack.title }}

                <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="pencil-alt"
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

        </div>

    </div>
</template>

<script>
    import {mapMutations, mapState} from "vuex";

    export default {
        name: 'PackagesRecapList',
        computed: {
            ...mapState([
                'activePackage',
                'packages'
            ]),
        }, methods: {
            ...mapMutations([
                'changeActivePackage',
                'deletePackage'
            ]),
            changeActivePackageInStore(index) {
                if (!this.packages[this.activePackage].wrapping && !this.packages[this.activePackage].products.length) {
                    this.deletePackage({packageIndex: this.activePackage})
                }

                this.changeActivePackage({index: index});
            },
        }
    }
</script>

<style scoped lang="scss">

    .recap_list_item {
        display: flex;
        align-items: center;
        margin-top: 12px;

        &:before {
            content: '\2022';
            width: 1em;
        }
    }

    .list_item_title {
        text-decoration: none;
        color: rgba(var(--colour-primary-700), 1);
    }

    @media screen and (min-width: 1024px) {
        .recap_list_item {
            font-size: 14px;
            margin-top: 8px;
        }
    }

</style>
