<template>
    <div class="header">
        <nav>
            <div class="header_link">
                Om os
            </div>

            <div class="header_logo">
                BEMY
            </div>

            <div class="header_link">
                Inspiration
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Header'
    }
</script>

<style scoped lang="scss">
    .header {
        background-color: var(--colour-secondary-100);
        height: 50px;
        box-shadow: var(--box-shadow-400);

        nav {
            height: 100%;
            display: flex;
            align-items: center;

            div {
                flex: 1;
                text-align: center;
            }
        }
    }

    .header_logo {
        font-family: var(--font-family-header);
        font-size: 20px;
        font-weight: 700;
    }

    .header_link {
        font-size: 14px;
    }
</style>
