<template>
    <div class="header">
        <div class="header_line"></div>

        <nav>
            <router-link
                class="header_link display_1024"
                :to="{ name: 'Contact' }"
            >
                Kontakt
            </router-link>

            <router-link
                class="header_link"
                :to="{ name: 'About' }"
            >
                Om os
            </router-link>

            <router-link
                class="header_logo"
                :to="{ name: 'Home' }"
            >
                BEMY
            </router-link>

            <router-link
                class="header_link display_1024"
                :to="{ name: 'Delivery' }"
            >
                Levering
            </router-link>

            <router-link
                class="header_link"
                :to="{ name: 'Inspiration' }"
            >
                Inspiration
            </router-link>
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

            a {
                flex: 1;
                text-align: center;
                color: inherit;
                text-decoration: none;
                padding-bottom: 3px;
            }
        }
    }

    .header_line {
        height: 3px;
        background-color: var(--colour-primary-400);
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
