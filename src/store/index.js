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
                activeWrappingIndex: 0,
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
                    if (product.designIds && getters.designsById) {

                        const rawProductDesigns = product.designIds.map(value => getters.designsById[value]);
                        product.designs = [];
                        rawProductDesigns.forEach(design => {
                            if (design) {
                                product.designs.push(design);
                            }
                        });
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
        totalCartDisplayPrice(state, payload) {
            let price = 0;

            state.packages.forEach(pack => {

                if (pack.products) {
                    pack.products.forEach(product => {
                        price = price + product.price
                    });
                }

                if (pack.wrapping) {
                    price = price + pack.wrapping.price;
                }
            });

            if (price === 0) {
                return
            }

            return displayPrice(price.toFixed(2));
        }
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
                price: Number(product.price),
                displayPrice: product.displayPrice,
                id: product.id,
                activeTab: 'imagesTab',
                thumbsPosition: 0,
                selectedImageIndex: 0,
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


            if (product.designs && product.designs[0]) {
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
                Vue.set(state.activeProducts, payload.productId, activeProduct);
            }

            if (payload.type === 'wrapping') {
                Vue.set(state.packages[state.activePackage], 'wrapping', activeProduct);
                this.commit('updateTotalPriceOfPackage', {packageIndex: state.activePackage});
            }

            if (payload.type === 'editingProduct') {
                if (state.activeProducts[payload.productId] !== state.packages[state.activePackage].products[payload.productIndex]) {
                    Vue.set(state.activeProducts, payload.productId, _.cloneDeep(state.packages[state.activePackage].products[payload.productIndex]));
                }
            }
        },
        deleteSelectionKeys(state, payload) {
            const product = _.find(state.products, ['id', payload.productId]);
            const productOptionKeys = Object.keys(product.options);

            let activeProduct;

            if (payload.productType === 'product') {
            activeProduct = _.find(state.activeProducts, ['id', payload.productId]);
            }

            if (payload.productType === 'wrapping') {
                activeProduct = state.packages[state.activePackage].wrapping
            }

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
            let newSelections = Object.fromEntries(
                Object.entries(activeProduct.selections)
                    .filter(function ([key, value]) {
                            return productOptionKeys.includes(key);
                        }
                    )
            );

            if (payload.productType === 'product') {
                Vue.set(state.activeProducts[payload.productId], 'selections', newSelections);
            }

            if (payload.productType === 'wrapping') {
                Vue.set(state.packages[state.activePackage].wrapping, 'selections', newSelections);
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
        setDesignImages(state, payload) {
            if (state.packages[state.activePackage] && payload.productType === 'wrapping') {
                Vue.set(state.packages[state.activePackage].wrapping, 'designImages', payload.images)
            }

            if (state.activeProducts[payload.productId] && payload.productType === 'product') {
                Vue.set(state.activeProducts[payload.productId], 'designImages', payload.images)
            }
        },
        changeGalleryTab(state, payload) {
            if (payload.productType === 'product') {
                state.activeProducts[payload.productId].activeTab = payload.tab;
                state.activeProducts[payload.productId].thumbsPosition = 0
            }

            if (payload.productType === 'wrapping') {
                state.packages[state.activePackage].wrapping.activeTab = payload.tab;
                state.packages[state.activePackage].wrapping.thumbsPosition = 0
            }
        },
        moveThumbsPosition(state, payload) {
            let thisThumbsPosition;

            if (payload.productType === 'wrapping') {
                thisThumbsPosition = state.packages[state.activePackage].wrapping.thumbsPosition;
            }

            if (payload.productType === 'product') {
                thisThumbsPosition = state.activeProducts[payload.productId].thumbsPosition;
            }

            if (payload.direction === 'down') {
                if (thisThumbsPosition >= 0 && thisThumbsPosition < payload.images.length - 4) {
                    thisThumbsPosition++;
                }
            }
            if (payload.direction === 'up') {
                if (thisThumbsPosition > 0)
                    thisThumbsPosition--;
            }

            if (payload.productType === 'wrapping') {
                Vue.set(state.packages[state.activePackage].wrapping, 'thumbsPosition', thisThumbsPosition);
            }

            if (payload.productType === 'product') {
                Vue.set(state.activeProducts[payload.productId], 'thumbsPosition', thisThumbsPosition);
            }
        },
        changeSelectedImageIndex(state, payload) {
            console.log(payload.index);
            if (payload.productType === 'wrapping') {
                Vue.set(state.packages[state.activePackage].wrapping, 'selectedImageIndex', payload.index);
            }

            if (payload.productType === 'product') {
                Vue.set(state.activeProducts[payload.productId], 'selectedImageIndex', payload.index);
            }
        },
        addProductToPackage(state, payload) {

            // Adding new product to active package
            if (!payload.type && !payload.packageIndex) {
                state.packages[state.activePackage].products.push(_.cloneDeep(payload.product));
                this.commit('updateTotalPriceOfPackage', {packageIndex: state.activePackage});
            }

            // Editing product
            if (payload.type === 'editingProduct') {
                Vue.set(state.packages[state.activePackage].products, payload.productIndex, _.cloneDeep(payload.product));
                this.commit('updateTotalPriceOfPackage', {packageIndex: state.activePackage});
            }

            // Adding to several packages
            else if (payload.packageIndex !== undefined && !payload.productIndex) {
                state.packages[payload.packageIndex].products.push(_.cloneDeep(payload.product));
                this.commit('updateTotalPriceOfPackage', {packageIndex: payload.packageIndex});
            }
        },
        setIsWrappingAvailable(state, payload) {
            Vue.set(state.packages[state.activePackage].wrapping, 'isAvailable', payload.isAvailable)

        },
        deleteProductFromPackage(state, payload) {
            // Filters the package products to remove the one that is being deleted
            let newPackageState = state.packages[payload.packageIndex].products.filter(function (product) {
                return product !== state.packages[payload.packageIndex].products[payload.productIndex]
            });

            Vue.set(state.packages[payload.packageIndex], 'products', newPackageState)
        },
        deletePackage(state, payload) {
            // Filters the package products to remove the one that is being deleted
            let newPackageState = state.packages.filter(function (pack) {
                return pack !== state.packages[payload.packageIndex]
            });

            if (!newPackageState.length) {
                newPackageState.push(
                    {
                        title: 'Din pakke',
                        price: 0,
                        displayPrice: '0',
                        products: []
                    }
                )
            }

            if (state.activePackage === payload.packageIndex) {
                Vue.set(state, 'activePackage', 0)
            } else if (state.activePackage > payload.packageIndex) {

                Vue.set(state, 'activePackage', state.activePackage - 1)
            }

            Vue.set(state, 'packages', newPackageState)
        },
        addNewPackage(state, payload) {

            let newPackage;

            if (payload.pack === 'new') {

                newPackage =
                    {
                        title: 'Din pakke',
                        price: 0,
                        displayPrice: '0',
                        activeWrappingIndex: 0,
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
        },
        updateTotalPriceOfPackage(state, payload) {
            let price = 0;

            state.packages[payload.packageIndex].products.forEach(product => {
                price = price + product.price
            });

            if (state.packages[payload.packageIndex].wrapping) {
                price = price + state.packages[payload.packageIndex].wrapping.price
            }

            Vue.set(state.packages[payload.packageIndex], 'price', price.toFixed(2));
            Vue.set(state.packages[payload.packageIndex], 'displayPrice', displayPrice(price.toFixed(2)));
        },
        setActiveWrappingIndex(state, payload) {
            Vue.set(state.packages[state.activePackage], 'activeWrappingIndex', payload.index)
        }
    },
    actions:
        {
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
            }
            ,
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
            }
            ,
        }
    ,
    modules: {}
})
;
