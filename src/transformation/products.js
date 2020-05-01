
export function createProductData(rawProducts) {

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
            thisProduct.productVariants.push(createProductVariants(variant));
        });

        products.push(thisProduct);
    });

    products.forEach(product => {
        product.productDesigns = getProductDesigns(product.productDesigns, products);

        if (product.productDesigns.length === 0) {
            delete product.productDesigns;
        }
    });


    return products;
}

export function getProductDesigns(product, products) {

    const productDesigns = [];

    product.node.metafields.edges.forEach(metafield => {

        if (metafield.node.key === "product_design_import") {
            const designIds = getProductIds(metafield.node.value.split('|'));
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
}

export function getProductIds(rawIds) {

    const designIds = [];

    rawIds.forEach(id => {
        const designId = btoa(`gid://shopify/ProductVariant/${id.substring(id.indexOf(':') + 1, id.length)}`);
        designIds.push(designId);
    });

    return designIds;
}

export function createProductVariants(variant) {
    const thisVariant = {
        id: variant.node.id,
        product: variant.node.product.title
    };

    variant.node.selectedOptions.forEach(option => {
        thisVariant[option.name] = option.value;
    });
    return thisVariant;
}