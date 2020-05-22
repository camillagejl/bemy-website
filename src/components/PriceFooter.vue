<template>
    <div class="price_footer">
        <div
            v-if="isAvailable"
            v-bind:class="{ price_available : isAvailable }"
            class="footer_product_price"
        >
            {{ price }} kr
        </div>

        <div
            v-else
            v-bind:class="{ price_unavailable : !isAvailable }"
            class="footer_product_price"
        >
            Denne indpakning findes desværre ikke!
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PriceFooter',
        props: {
            price: String,
            isAvailable: Boolean
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
        height: 105px;
        box-shadow: var(--box-shadow-400-top);
    }

    .footer_product_price {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 55px;
        padding: var(--page-margin);
        padding-top: 0;
        padding-bottom: 0;
    }

    .price_available {
        background-color: rgba(var(--colour-secondary-100), 1);
        font-size: 24px;
    }

    .price_unavailable {
        background-color: rgba(var(--colour-grey-400), 1);
        font-size: 20px;
    }



    @media screen and (min-width: 1024px) {
        .price_footer {
            height: 50px;
        }

        .footer_product_price {
            padding-right: 20px;
            padding-left: 0;
        }
    }

</style>
