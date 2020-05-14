<template>
    <div class="mobile_content_recap">

<div class="header">
        <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="tshirt"
             class="svg-inline--fa fa-tshirt fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 640 512">
            <g class="fa-group">
                <path class="fa-secondary"
                      d="M8.86 96.5a16.11 16.11 0 0 0-7.2 21.5l57.23 114.5a16.11 16.11 0 0 0 21.5 7.2l17.32-8.48L26.09 88zm459-80.95a187.31 187.31 0 0 1-13.32 13.26C418.45 61.3 370.67 79.2 320 79.2s-98.41-17.9-134.51-50.39a187.31 187.31 0 0 1-13.32-13.26L54.76 73.75l71.69 143.4L137 212a16 16 0 0 1 23 14.4V480a32 32 0 0 0 32 32h256a32 32 0 0 0 32-32V226.3a16 16 0 0 1 23-14.4l10.57 5.18L585.19 73.7zm163.31 81l-17.32-8.59-71.6 143.19 17.24 8.45h.06a16 16 0 0 0 21.45-7.2L638.28 118a16 16 0 0 0-7.1-21.5z"
                      opacity="0.4"></path>
                <path class="fa-primary"
                      d="M320 47.2c-51.89 0-96.39-19.4-116.49-47.2l-31.34 15.55a187.31 187.31 0 0 0 13.32 13.26C221.59 61.3 269.37 79.2 320 79.2s98.43-17.9 134.53-50.39a187.31 187.31 0 0 0 13.32-13.26L436.51 0c-20.1 27.8-64.6 47.2-116.51 47.2zM26.09 88l71.62 143.22 28.74-14.07-71.69-143.4zm559.1-14.3l-71.68 143.38 28.74 14.07 71.61-143.24z"></path>
            </g>
        </svg>

        <h2>
            Indhold i din pakke
        </h2>
</div>

    <ContentRecapList/>

    </div>
</template>

<script>
    import ContentRecapList from "./ContentRecapList";
    export default {
        name: 'MobileContentRecap',
        components: {ContentRecapList}
    }
</script>

<style scoped lang="scss">

    .mobile_content_recap {
        background-color: rgba(var(--colour-grey-200), 1);
        margin: 36px calc(var(--page-margin)*-1) 48px calc(var(--page-margin)*-1);
        padding: var(--page-margin);
        box-shadow: var(--box-shadow-400);
    }

    .header {
        display: flex;
        align-items: center;
    }

    svg {
        height: 26px;
        fill: rgba(var(--colour-primary-700), 1);
        margin: 0 12px 0 0;
    }

    h2 {
        margin: 0;
        font-size: var(--font-size-primary);
        font-weight: 700;
    }

</style>
