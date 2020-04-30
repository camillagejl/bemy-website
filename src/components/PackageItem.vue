<template>
    <div class="package_item">
        <div class="package_item_image">
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
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: 'PackageItem'
    }
</script>

<style scoped lang="scss">

    .package_item {
        display: flex;
    }

    .package_item_image {
        width: 192px;
    }

    .package_item_info {
        margin-left: 12px;

        p {
            margin: 0;
            display: inline-block;
        }

        p,
        strong {
            line-height: 16px;
        }

    }

    .package_item_grid {
        display: grid;
        grid-template-columns: repeat(2, auto);
        grid-gap: 12px;
    }

</style>
