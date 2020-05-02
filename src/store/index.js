import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import {createProductData} from "../transformation/products";
import {createCollectionData} from "../transformation/collections";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        collections: [],
        packages: [],
    },
    getters: {
      productsById: (state, getters) => {
        return _.keyBy(state.products, 'id');
      },
        productCategories: (state, getters) => {
            return state.collections
                .filter(collection => collection.type === 'Product-category')
                .map(collection => {
                    collection.products = collection.products.map(id => getters.productsById[id]);
                    return collection;
                });
        },
        productsWithDesigns: (state, getters) => {
            return state.products
                .map(product => {
                    product.designs = product.designs.map(value => getters.productsById[value]);
                    return products;
                });
        },
      templateCategories: (state, getters) => {
        return state.collections.filter(collection => collection.type === 'Template-category');
      },
    },
    mutations: {
      setProducts(state, payload) {
        state.products = payload.products;
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
            });
      },
      fetchCollections(context) {
        Vue.axios.post('/api/2020-01/graphql.json', `
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
              context.commit('setCollections', {collections: createCollectionData(response.data.data.collections.edges)});
            });
      },
    },
    modules: {}
});
