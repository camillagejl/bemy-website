
export function createProductData(rawProducts) {

    console.log("rawProducts", rawProducts);

    const products = [];

    rawProducts.forEach(product => {
        const thisProduct = {
            title: product.node.title,
            description: product.node.descriptionHtml,
            price: product.node.priceRange.minVariantPrice.amount,
            id: product.node.id,
            options: {},
            variants: [],
            images: [],
            designs: product // To be changed later
        };

        // ----- Creating product options -----
            thisProduct.options = createProductOptions(product.node.options);

        // ----- Creating product variants -----
        product.node.variants.edges.forEach(variant => {
            thisProduct.variants.push(createProductVariants(variant));
        });

        // ----- Getting product images -----
        product.node.images.edges.forEach(image => {
            thisProduct.images.push(image.node.originalSrc);
        });

        // ----- Getting product metafields -----
        product.node.metafields.edges.forEach(metafield => {
            if (metafield.node.key === "variant_option_w_images") {
                thisProduct.optionsWithImages = metafield.node.value.split('|');
            }
        });

        products.push(thisProduct);

    });

    products.forEach(product => {
        product.designs = getProductDesigns(product.designs, products);

        if (product.designs.length === 0) {
            delete product.designs;
        }
    });
    return products;
}

export function getProductDesigns(product) {

    let productDesigns = [];

    product.node.metafields.edges.forEach(metafield => {

        if (metafield.node.key === "product_design_import") {
            productDesigns = getProductIds(metafield.node.value.split('|'));
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

export function createProductOptions(options) {
    console.log(options);
    const productOptions = {

    };

    options.forEach(option => {
        productOptions[option.name] = [];

        option.values.forEach(value => {
            productOptions[option.name].push(value);
        })
    });

    return productOptions;
}

export function createProductVariants(variant) {
    const thisVariant = {
        id: variant.node.id,
        product: variant.node.product.title,
        image: variant.node.image.originalSrc
    };

    variant.node.selectedOptions.forEach(option => {
        thisVariant[option.name] = option.value;
    });
    return thisVariant;
}