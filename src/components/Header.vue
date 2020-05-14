<template>
    <div class="header">
        <div class="header_line"></div>

        <nav>
            <router-link
                class="header_link"
                :to="{ name: 'About' }"
            >
                Om os
            </router-link>

            <router-link
                class="header_link display_1024"
                :to="{ name: 'Delivery' }"
            >
                Levering
            </router-link>

            <router-link
                class="header_logo"
                :to="{ name: 'Home' }"
            >
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="48.05" height="13.72" viewBox="0 0 48.05 13.72">
                    <g>
                        <path d="M48.06,8.89a39.93,39.93,0,0,1-11.89,3.47,47.83,47.83,0,0,1-6.21.49c-2.08,0-4.13-.11-6.12-.19s-3.92-.27-5.87-.36-3.89-.12-5.86-.21c-3.93-.08-7.9,0-12-.2L0,11.6A84.23,84.23,0,0,1,11.94,9.74,82.7,82.7,0,0,1,24,9.67a94.63,94.63,0,0,0,12,.33A84.13,84.13,0,0,0,48,8.6Z" fill="#c59ead"/>
                        <text transform="translate(7.83 10.46)" font-size="12" font-family="Merriweather-Bold, Merriweather" font-weight="700">BEMY</text>
                    </g>
                </svg>


            </router-link>

            <router-link
                class="header_link"
                :to="{ name: 'Inspiration' }"
            >
                Inspiration
            </router-link>

            <router-link
                class="header_link display_1024"
                :to="{ name: 'B2B' }"
            >
                B2B
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
        background-color: rgba(var(--colour-primary-400), 1);
    }

    .header_logo {
        height: 50%;

        svg {
            height: 100%;
            width: 100%;
        }
    }

    .header_link {
        font-size: 14px;
    }
</style>
