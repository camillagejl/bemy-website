<template>
    <div class="price_footer">
        <div class="product_price">
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
        background-color: var(--colour-secondary-100);
        height: 105px;
        box-shadow: var(--box-shadow-400-top);
    }

    .product_price {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 50px;
        font-size: 24px;
        margin: calc(var(--page-margin) + 20px);
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 0;
    }

    @media screen and (min-width: 1024px) {
        .price_footer {
            height: 50px;
        }
    }

</style>
