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
        packages: [
            {
                title: 'Amanda',
                id: 'package_1',
                price: 359.95,
                displayPrice: '359,95',
                products: [
                    {
                        type: 'Wrapping',
                        title: 'Indpakning: Luksus Gaveæske m. bånd',
                        image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/1541156180.jpg?v=1589011881', //selectedProduct.images[0]
                        price: 179.95,
                        displayPrice: '179,95',
                        id: 'ergerwrtfg',
                        packageProductId: 'package_1_wrapping',
                        selections: {
                            Farve: 'Hvid',
                            Design: 'Will you be my bridesmaid?',
                            Navn: 'Amanda',
                            'Lille tekst': 'Pedersen',
                            'Tekst til indersiden af låget': 'Vil du være min brudepige?',
                        }
                    },
                    {
                        type: 'Product',
                        title: 'Personlig Kimono',
                        image: 'https://cdn.shopify.com/s/files/1/0295/3897/5828/products/1541156180.jpg?v=1589011881', //images[0]
                        price: 259.95,
                        displayPrice: '259,95',
                        packageProductId: 'package_1_kimono_1',
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

                        product.designs = {};

                        rawProductDesigns.forEach(design => {
                            product.designs[design.title] = {
                                image: design.image
                            }
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
