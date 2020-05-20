<template>
    <div class="price_footer">
        <div class="footer_product_price">
        {{ price }} kr
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PriceFooter',
        props: {
            price: String
        }
    }
</script>

<style scoped lang="scss">

    .price_footer {
        position: fixed;
        z-index: 1;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(var(--colour-secondary-100), 1);
        height: 105px;
        box-shadow: var(--box-shadow-400-top);
    }

    .footer_product_price {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
        font-size: 24px;
        padding: var(--page-margin);
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 0;
    }

    @media screen and (min-width: 1024px) {
        .price_footer {
            height: 50px;
            padding-right: 20px;
        }
    }

</style>
