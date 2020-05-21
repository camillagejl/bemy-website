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
        appOverflow: true,
        packages: [
            {
                title: 'Din pakke',
                price: 0,
                displayPrice: '0',
                products: []
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
            state.designs = payload.products;
        },
        setCollections(state, payload) {
            state.collections = payload.collections;
        },
        toggleAppOverflow(state, payload) {
            state.appOverflow = payload.bool
        },
        addActiveProductFromProductId(state, payload) {
            const product = _.find(state.products, ['id', payload.productId]);

            let activeProduct = {
                title: product.title,
                image: product.images[0],
                price: product.price,
                displayPrice: product.displayPrice,
                id: product.id,
                selections: {}
            };

            Object.keys(product.options).forEach(option => {
                if (product.options[option][0] !== 'Default Title') {
                    activeProduct.selections[option] = product.options[option][0]
                }

                if
                (product.options[option].selectOptions) {
                    activeProduct.selections[option] = product.options[option].selectOptions[0]
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

            if (payload.type === 'product') {
                console.log("Creating new product");
                Vue.set(state.activeProducts, payload.productId, activeProduct);
            }

            if (payload.type === 'wrapping') {
                console.log("Creating new wrapping");
                Vue.set(state.packages[state.activePackage], 'wrapping', activeProduct);
            }

            if (payload.type === 'editingProduct') {
                console.log("Changing product");
                Vue.set(state.activeProducts, payload.productId, _.cloneDeep(state.packages[payload.packageIndex].products[payload.productIndex]));
            }
        },
        updateSelectionValue(state, payload) {
            if (payload.type === 'product') {
                Vue.set(state.activeProducts[payload.productId].selections, payload.name, payload.value);
            }
            if (payload.type === 'wrapping') {
                Vue.set(state.packages[state.activePackage].wrapping.selections, payload.name, payload.value);
            }
        },
        addProductToPackage(state, payload) {
            state.packages[state.activePackage].products.push(_.cloneDeep(payload.product));
        },
        addNewPackage(state, payload) {

            let newPackage;

            if (payload.pack === 'new') {

                newPackage =
                    {
                        title: 'Din pakke',
                        price: 0,
                        displayPrice: '0',
                        products: []
                    };
            } else {
                newPackage = _.cloneDeep(state.packages[payload.pack]);
            }

            state.packages.push(newPackage);

            if (state.packages[state.packages.length - 1]) {
            state.activePackage = state.packages.length - 1;
            }

        },
        changeActivePackage(state, payload) {
            state.activePackage = payload.index;
        }
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
