<template>
    <div class="content_categories_overview">

        <h1>
            Indhold
        </h1>


    </div>
</template>

<script>
    export default {
        name: 'ContentCategoriesOverview',
    }
</script>

<style scoped lang="scss">

    .home_top {
        min-height: calc(100vh - 100px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .h1_large {
        text-align: center;
    }

    .h2_body {
        text-align: center;
        font-family: var(--font-family-handwriting);
        font-weight: 400;
        font-size: 22px;
        color: var(--colour-grey-700);
        margin: 0;
    }

    .home_infographic {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-family: var(--font-family-handwriting);
        color: var(--colour-grey-800);
        font-size: 24px;
        padding: 12px 0;
    }

    .infographic_icon_container {
        text-align: center;
    }

    .infographic_icon {
        background-color: var(--colour-secondary-100);
        display: inline-block;
        flex: 1;
        box-sizing: border-box;
        border-radius: 100%;
        height: 64px;
        width: 64px;
        padding: 16px;
        box-shadow: var(--box-shadow-400);
        margin: 0 0 12px 0;


        svg {
            height: 100%;
            width: 100%;
            fill: var(--colour-primary-400);
        }
    }

    .infographic_line {
        background-color: var(--colour-primary-200);
        margin: 8px 0;
        width: 1px;
        height: 24px;
    }

    .arrow_down {
        text-align: center;
        margin-bottom: 24px;
    }

</style>