export function createProductData(allRawProducts) {

    const rawProducts = allRawProducts.filter(product => product.node.productType !== 'Design-collection');

    console.log("rawProducts", rawProducts);

    const products = [];

    rawProducts.forEach(product => {
        const thisProduct = {
            title: product.node.title,
            description: product.node.descriptionHtml,
            price: product.node.priceRange.minVariantPrice.amount,
            id: product.node.id,
            images: [],
            options: createProductOptions(product.node.options),
            variants: [],
            personalisations: createPersonalisations(product.node.metafields.edges),
            designIds: getProductDesigns(product),
            designs: []
        };

        if (thisProduct.designIds.length === 0) {
            delete thisProduct.designIds;
            delete thisProduct.designs;
        }

        // ----- Creating product variants -----
        product.node.variants.edges.forEach(variant => {
            thisProduct.variants.push(createProductVariants(variant));
        });

        // ----- Getting product images -----
        product.node.images.edges.forEach(image => {
            thisProduct.images.push(image.node.originalSrc);
        });

        // ----- Getting simple product metafields -----
        product.node.metafields.edges.forEach(metafield => {
            if (metafield.node.key === "variant_option_w_images") {
                thisProduct.optionsWithImages = metafield.node.value.split('|');
            }
        });

        products.push(thisProduct);

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
    const productOptions = {};

    options.forEach(option => {
        if (option.name !== 'Title' && option.values[0] !== 'Default Title') {
            productOptions[option.name] = {
                selectOptions: []
            };

            option.values.forEach(value => {
                productOptions[option.name].selectOptions.push(value);
            })
        }
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

export function createPersonalisations(metafields) {
    const personalisationData = [];

    metafields.forEach(field => {
        if (field.node.key === "option_label") {
            personalisationData.labels = JSON.parse(field.node.value);
            // Using labels as keys
            personalisationData.key = personalisationData.labels;
        }

        if (field.node.key === "option_type") {
            personalisationData.type = JSON.parse(field.node.value);
        }

        if (field.node.key === "option_char_max") {
            personalisationData.characterMax = JSON.parse(field.node.value);
        }

        if (field.node.key === "option_placeholder") {
            personalisationData.placeholder = JSON.parse(field.node.value);
        }

        if (field.node.key === "option_select_options") {
            personalisationData.selectOptions = JSON.parse(field.node.value);
        }
    });

    const personalisations = {};

    if (personalisationData.labels) {

        personalisationData.labels.forEach((label, index) => {

            if (personalisationData.type[index] === "Én linje") {
                personalisationData.type[index] = "line_text"
            } else if (personalisationData.type[index] === "Flere linjer") {
                personalisationData.type[index] = "multiline_text"
            } else if (personalisationData.type[index] === "Tal") {
                personalisationData.type[index] = "number"
            } else if (personalisationData.type[index] === "Dato") {
                personalisationData.type[index] = "date"
            } else if (personalisationData.type[index] === "Dropdown") {
                personalisationData.type[index] = "dropdown"
            }

            const thisPersonalisation = {
                headline: label,
                ...(personalisationData.type && {type: personalisationData.type[index]}),
                ...(personalisationData.key && {key: personalisationData.key[index]}),
                ...(personalisationData.characterMax && {characterMax: personalisationData.characterMax[index]}),
                ...(personalisationData.selectOptions && {selectOptions: personalisationData.selectOptions[index].split("|")}),
                ...(personalisationData.placeholder && {placeholder: personalisationData.placeholder[index]})
            };

            if (thisPersonalisation.characterMax === 0) {
                thisPersonalisation.characterMax = null;
            }

            personalisations[thisPersonalisation.key] = thisPersonalisation;
        });
    }

    return personalisations;
}