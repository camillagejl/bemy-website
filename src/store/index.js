import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import {createProductData} from "../transformation/products";
import {createCollectionData} from "../transformation/collections";
import {createDesignData} from "../transformation/designs";
import {displayPrice} from "../helperFunctions";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        collections: [],
        designs: [],
        activeProducts: {},
        activePackage: 0,
        packages: [
            {
                title: 'Miranda',
                price: 359.95,
                displayPrice: '359,95',
                wrapping: {
                    title: 'Luksus Gaveæske m. bånd',
                    image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/box-color-2.png?v=1589393085', //selectedProduct.images[0]
                    price: 179.95,
                    displayPrice: '129,95',
                    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ2MDAzOTg3NzQzNTY=',
                    selections: {
                        Farve: 'Rosa',
                        Design: 'Will you be my bridesmaid?',
                        Navn: 'Amanda',
                        'Lille tekst': 'Pedersen',
                        'Tekst til indersiden af låget': 'Vil du være min brudepige?',
                    }
                },
                products: [
                    {
                        title: 'Personlig Kimono',
                        image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/1541156180.jpg?v=1589011881', //images[0]
                        price: 259.95,
                        displayPrice: '259,95',
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1ODk0MTgxODQ3ODg',
                        selections: {
                            Farve: 'Hvid',
                            Design: 'New York',
                            Navn: 'Amanda',
                            'Tekst i midten': 'Bruden',
                            'Tekst i bunden': '06.06.2020'
                        }
                    },
                    {
                        title: 'Upersonlig Kimono', // samme mock data som foroven
                        image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/1541156180.jpg?v=1589011881', //images[0]
                        price: 259.95,
                        displayPrice: '259,95',
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1ODk0MTgxODQ3ODg',
                        selections: {
                            Farve: 'Hvid',
                            Design: 'New York',
                            Navn: 'Amanda',
                            'Lille tekst': '06.06.2020'
                        }
                    }
                ]
            },{
                title: 'Miranda',
                price: 359.95,
                displayPrice: '359,95',
                wrapping: {
                    title: 'Luksus Gaveæske m. bånd',
                    image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/box-color-2.png?v=1589393085', //selectedProduct.images[0]
                    price: 179.95,
                    displayPrice: '129,95',
                    id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ2MDAzOTg3NzQzNTY=',
                    selections: {
                        Farve: 'Rosa',
                        Design: 'Will you be my bridesmaid?',
                        Navn: 'Amanda',
                        'Lille tekst': 'Pedersen',
                        'Tekst til indersiden af låget': 'Vil du være min brudepige?',
                    }
                },
                products: [
                    {
                        title: 'Personlig Kimono',
                        image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/1541156180.jpg?v=1589011881', //images[0]
                        price: 259.95,
                        displayPrice: '259,95',
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1ODk0MTgxODQ3ODg',
                        selections: {
                            Farve: 'Hvid',
                            Design: 'New York',
                            Navn: 'Amanda',
                            'Tekst i midten': 'Bruden',
                            'Tekst i bunden': '06.06.2020'
                        }
                    },
                    {
                        title: 'Upersonlig Kimono', // samme mock data som foroven
                        image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/1541156180.jpg?v=1589011881', //images[0]
                        price: 259.95,
                        displayPrice: '259,95',
                        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzQ1ODk0MTgxODQ3ODg',
                        selections: {
                            Farve: 'Hvid',
                            Design: 'New York',
                            Navn: 'Amanda',
                            'Lille tekst': '06.06.2020'
                        }
                    }
                ]
            }
        ],
    },
    getters: {
        productsById: (state, getters) => {
            return _.keyBy(getters.computedProducts, 'id');
        },
        getActiveProductById: (state, getters) => (id) => {
            return state.activeProducts[id] || null;
        },
        designsById: (state, getters) => {
            return _.keyBy(state.designs, 'id');
        },
        productCategoriesById: (state, getters) => {
            return _.keyBy(getters.productCategories, 'id');
        },
        computedProducts: (state, getters) => {
            return state.products
                .map(product => {
                    if (product.designs) {
                        const rawProductDesigns = product.designs.map(value => getters.designsById[value]);

                        product.designs = [];

                        rawProductDesigns.forEach(design => {
                            product.designs.push(design);
                        })
                    }

                    product.displayPrice = displayPrice(product.price);

                    return product;
                });
        },
        productCategories: (state, getters) => {
            return state.collections
                .filter(collection => collection.type === 'Product-category')
                ;
        },
        wrappings: (state, getters) => {
            return state.collections
                .filter(collection => collection.type === 'Wrapping')[0]
                ;
        },
        templateCategories: (state, getters) => {
            return state.collections.filter(collection => collection.type === 'Template-category');
        },
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload.products;
        },
        setDesigns(state, payload) {
            state.designs = payload.products; // Martin, hjælp!
        },
        setCollections(state, payload) {
            state.collections = payload.collections;
        },
        addActiveProductFromProductId(state, payload) {
            const product = _.find(state.products, ['id', payload.productId]);
            let activeProduct = {
                title: product.title,
                image: product.images[0],
                price: product.price,
                displayPrice: product.displayPrice,
                id: product.id,
                selections: {
                }
            };

            Object.keys(product.options).forEach(option => {
                console.log(option);
                if (product.options[option][0] !== 'Default Title') {
                activeProduct.selections[option] = product.options[option][0]
                }
            });

            if (product.personalisations) {
                Object.keys(product.personalisations).forEach(personalisation => {

                    if (
                        product.personalisations[personalisation].type === 'line_text' ||
                        product.personalisations[personalisation].type === 'multiline_text' ||
                        product.personalisations[personalisation].type === 'date' ||
                        product.personalisations[personalisation].type === 'number'
                    ) {
                        activeProduct.selections[personalisation] = ''
                    }

                    if (product.personalisations[personalisation].type === 'dropdown') {
                        activeProduct.selections[personalisation] = product.personalisations[personalisation].selectOptions[0];
                    }

                });
            }


            if (product.designs) {
                activeProduct.selections.Design = product.designs[0].Design;

                Object.keys(product.designs[0].personalisations).forEach(personalisation => {
                    activeProduct.selections[personalisation] = '';


                    if (
                        product.designs[0].personalisations[personalisation].type === 'line_text' ||
                        product.designs[0].personalisations[personalisation].type === 'multiline_text' ||
                        product.designs[0].personalisations[personalisation].type === 'date' ||
                        product.designs[0].personalisations[personalisation].type === 'number'
                    ) {
                        activeProduct.selections[personalisation] = '';
                    }

                    if (product.designs[0].personalisations[personalisation].type === 'dropdown') {
                        activeProduct.selections[personalisation] = product.personalisations[personalisation].selectOptions[0];
                    }

                });

            }

            Vue.set(state.activeProducts, payload.productId, activeProduct);
        },
        updateInputSelectionValue(state, payload) {
            Vue.set(state.activeProducts[payload.productId].selections, payload.name, payload.value);
        },
        updateImageSelectionValue(state, payload) {
            console.log(payload.productId, payload.name, payload.value);
            Vue.set(state.activeProducts[payload.productId].selections, payload.name, payload.value);
        },
    },
    actions: {
        fetchProducts(context) {
            Vue.axios.post('/api/2020-01/graphql.json', `
{
  products(first: 250) {
    edges {
      node {
        title
        productType
        descriptionHtml
        id
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 250) {
          edges {
            node {
              originalSrc
            }
          }
        }
        options {
          name
          values
        }
        variants(first: 250) {
          edges {
            node {
              id
              metafields(first: 250) {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
              image {
                originalSrc
              }
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
                    context.commit('setProducts', {products: createProductData(response.data.data.products.edges)});
                    context.commit('setDesigns', {products: createDesignData(response.data.data.products.edges)});
                });
        },
        fetchCollections(context) {
            Vue.axios.post('/api/2020-01/graphql.json', `
                {
  collections(first: 250) {
    edges {
      node {
        title
        id
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
                    context.commit('setCollections', {collections: createCollectionData(response.data.data.collections.edges)});
                });
        },
    },
    modules: {}
});
