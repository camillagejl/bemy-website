<template>
    <div id="app">
        <Header/>

        <div class="desktop_flex_row">
            <MainNavigation/>
            <div class="main_section">
                <main>
                    <router-view/>
                </main>
                <Footer/>
            </div>

        </div>
    </div>
</template>

<script>
    import Home from "./views/Home";
    import Header from "./components/Header";
    import MainNavigation from "./components/MainNavigation";
    import Footer from "./components/Footer";

    export default {
        components: {MainNavigation, Footer, Header, Home},
        data() {
            return {
                collections: {},
                products: {},
            }
        },
        methods: {
            fetchProductData() {
                this.axios.post('/api/2020-01/graphql.json', `
                {
  products(first: 250) {
    edges {
      node {
        title
        id
        variants(first: 250) {
          edges {
            node {
              id
              selectedOptions {
                name
                value
              }
              product {
                title
              }
            }
          }
        }
        metafields(first: 250) {
          edges {
            node {
              key
              value
            }
          }
        }
      }
    }
  }
}


                `)
                    .then((response) => {
                        this.products = this.createProductData(response.data.data.products.edges);
                    })
            },

            fetchCollectionData() {
                this.axios.post('/api/2020-01/graphql.json', `
                {
  collections(first: 250) {
    edges {
      node {
        title
        description
        image {
          originalSrc
        }
        products(first: 250) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
}

                `)
                    .then((response) => {
                        this.collections = this.createCollectionData(response);
                    })
            },

            createCollectionData(response) {
                const rawCollections = response.data.data.collections.edges;
                const collections = [];
                rawCollections.forEach(collection => {
                        const thisCollection = this.createCollectionInfo(collection);
                        collections.push(thisCollection);
                    }
                );
                return collections;
            },

            createCollectionInfo(collection) {
                return {
                    collectionTitle: collection.node.description,
                    collectionImage: collection.node.image.originalSrc,
                    collectionType: collection.node.title.split(']').shift().replace('[', '')
                }
            },

            createProductData(rawProducts) {

                console.log("rawProducts", rawProducts);

                const products = [];

                rawProducts.forEach(product => {
                    const thisProduct = {
                        productTitle: product.node.title,
                        productId: product.node.id,
                        productVariants: [],
                        productDesigns: product // To be changed later
                    };

                    // ----- Creating product options -----
                    product.node.variants.edges.forEach(variant => {
                        thisProduct.productVariants.push(this.createProductVariants(variant));
                    });

                    products.push(thisProduct);
                });

                products.forEach(product => {
                    product.productDesigns = this.getProductDesigns(product.productDesigns, products);

                    if (product.productDesigns.length === 0) {
                        delete product.productDesigns;
                    }
                });


                return products;
            },

            getProductDesigns(product, products) {

                const productDesigns = [];

                product.node.metafields.edges.forEach(metafield => {

                    if (metafield.node.key === "product_design_import") {
                        const designIds = this.getProductIds(metafield.node.value.split('|'));
                        designIds.forEach(id => {
                            products.forEach(product => {
                                product.productVariants.forEach(variant => {

                                    if (id === variant.id) {
                                        productDesigns.push(variant);
                                    }
                                })
                            })
                        })
                    }
                });

                return productDesigns
            },

            getProductIds(rawIds) {

                const designIds = [];

                rawIds.forEach(id => {
                    const designId = btoa(`gid://shopify/ProductVariant/${id.substring(id.indexOf(':') + 1, id.length)}`);
                    designIds.push(designId);
                });

                return designIds;
            },

            createProductVariants(variant) {
                const thisVariant = {
                    id: variant.node.id,
                    product: variant.node.product.title
                };

                variant.node.selectedOptions.forEach(option => {
                    thisVariant[option.name] = option.value;
                });
                return thisVariant;
            }
        },
        mounted() {
            this.fetchProductData();
            this.fetchCollectionData();
        }

    }
</script>

<style lang="scss">

    :root {
        /* Colour palette */
        --colour-primary-100: #FCF7F8;
        --colour-primary-200: #EEE3E7;
        --colour-primary-300: #E0C1CD;
        --colour-primary-400: #C59EAD;
        --colour-primary-500: #AC7A8E;
        --colour-primary-600: #906B79;
        --colour-primary-700: #745762;
        --colour-primary-800: #563844;
        --colour-primary-900: #41212E;

        --colour-secondary-100: #F9FCFF;

        --colour-grey-100: 252, 252, 252;
        --colour-grey-200: #F5F5F5;
        --colour-grey-300: #DCDADE;
        --colour-grey-400: #CBC9CD;
        --colour-grey-500: #A7A5A9;
        --colour-grey-600: #89878A;
        --colour-grey-700: #636363;
        --colour-grey-800: #303030;
        --colour-grey-900: #242126;

        /* Header font */
        --font-family-header: 'Merriweather', serif;

        /* Handwriting font */
        --font-family-handwriting: 'Allura', cursive;

        /* Body font */
        --font-family-primary: 'Roboto', sans-serif;
        --font-size-primary: 16px;

        /* Shadows */
        --box-shadow-400: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --box-shadow-400-top: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
        --box-shadow-400-left: 0 4px 6px 1px rgba(0, 0, 0, 0.1), 0 2px 4px 1px rgba(0, 0, 0, 0.06);

        /* Margins */
        --page-margin: 24px;

        /* Borders */
        --main-border-radius: 5px;

        /* Opacities */
        --opacity-deselected: .5;

    }

    body {
        margin: 0;
        font-family: var(--font-family-primary);
        color: var(--colour-grey-900);
        font-size: var(--font-size-primary);
        background-color: rgba(var(--colour-grey-100), 1);
    }

    #app {
        box-sizing: border-box;
        padding-bottom: 50px;
        height: 100vh;
    }

    .desktop_flex_row {
        min-height: 100%;
    }

    .main_section {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 var(--page-margin);
    }

    /* General styling */

    a {
        color: var(--colour-primary-600);
        text-decoration: underline;
    }

    h1,
    h2 {
        font-family: var(--font-family-header);
        color: var(--colour-grey-800);
    }

    h1 {
        font-size: 24px;
        font-weight: 400;
        margin: 24px 0;
    }

    h2 {
        font-size: 20px;
        font-weight: 300;
        margin: 0;
    }

    p {
        line-height: 24px;
    }

    button {
        border: none;
        background-color: transparent;
    }

    img {
        width: 100%;
        display: block;
    }

    .relative_image {
        position: relative;

        &::after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .rounded_box,
    select,
    input[type="text"] {
        border-radius: var(--main-border-radius);
        overflow: hidden;
        box-shadow: var(--box-shadow-400);
    }

    select,
    input {
        border: 1px solid var(--colour-grey-500);
        padding: 8px;
    }

    hr {
        border: 1px solid var(--colour-primary-200)
    }

    .edit_pen {
        fill: var(--colour-primary-600);
        height: 12px;
        margin-left: 4px;
    }

    /* Components */
    .main_navigation {
        z-index: 1;
        box-shadow: var(--box-shadow-400-top);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        nav {
            height: 50px;
        }
    }

    /* Helpers */

    .flex_center_align {
        display: flex;
        align-items: center;
    }

    .display_1024 {
        display: none;
    }

    /* Media queries */

    @media screen and (min-width: 768px) {
        h1 {
            font-size: 36px;
        }
    }

    @media screen and (min-width: 1024px) {
        #app {
            display: flex;
            flex-direction: column;
            height: 100vh;
            margin: 0;
        }

        .header {
            z-index: 1;
        }

        .desktop_flex_row {
            display: flex;
            overflow: hidden;
            height: 100%;
        }

        .main_section {
            box-sizing: border-box;
            width: 100%;
            box-shadow: var(--box-shadow-400-left);
            height: 100%;
            overflow-y: scroll;
            padding: var(--page-margin);
        }

        .main_navigation {
            position: static;
            width: 250px;
            box-shadow: none;
        }

    /* Helpers */

        .display_1024 {
            display: block;
        }

        .hide_1024 {
            display: none;
        }


        .flex_center_align_1024 {
            display: flex;
            align-items: center;
        }

    }

    @media screen and (min-width: 1200px) {
        :root {
            --page-margin: 96px;
        }
    }

</style>