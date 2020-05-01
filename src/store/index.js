import Vue from 'vue';
import Vuex from 'vuex';
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
      productCategories: (state, getters) => {
        return state.collections
            .filter(collection => collection.collectionType === 'Product-category');
      },
      templateCategories: (state, getters) => {
        return state.collections.filter(collection => collection.collectionType === 'Template-category');
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
              context.commit('setCollections', {collections: createCollectionData(response)});
            });
      },
    },
    modules: {}
});
