import {createPersonalisations} from "./products";

export function createDesignData(allRawProducts) {
    const rawProducts = allRawProducts.filter(product => product.node.productType === 'Design-collection');

    const rawDesigns = createRawDesigns(rawProducts);

    const designs = [];

    rawDesigns.forEach(design => {

        const thisDesign = {
            Design: design.node.selectedOptions[0].value,
            id: design.node.id,
            image: design.node.image.originalSrc,
            personalisations: createPersonalisations(design.node.metafields.edges) // imported from products.js
        };

        designs.push(thisDesign);
    });

    return designs;
}

export function createRawDesigns(rawProducts) {

    const rawDesigns = [];

    rawProducts.forEach(product => {
        product.node.variants.edges.forEach(variant => {
            rawDesigns.push(variant);
        });
    });

    console.log("rawDesigns", rawDesigns);
    return rawDesigns
}