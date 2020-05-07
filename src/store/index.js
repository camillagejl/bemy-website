import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import {createProductData} from "../transformation/products";
import {createCollectionData} from "../transformation/collections";
import {createDesignData} from "../transformation/designs";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        collections: [],
        designs: [],
        packages: [],
    },
    getters: {
        productsById: (state, getters) => {
            return _.keyBy(getters.productsWithDesigns, 'id');
        },
        designsById: (state, getters) => {
            return _.keyBy(state.designs, 'id');
        },
        productCategoriesById: (state, getters) => {
            return _.keyBy(getters.productCategories, 'id');
        },
        productsWithDesigns: (state, getters) => {
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
                    return product;
                });
        },
        productCategories: (state, getters) => {
            return state.collections
                .filter(collection => collection.type === 'Product-category')
                // .map(collection => {
                //     collection.products = collection.products.map(id => getters.productsById[id]);
                //     return collection;
                // })
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
