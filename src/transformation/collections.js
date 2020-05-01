export function createCollectionData(response) {
    const rawCollections = response.data.data.collections.edges;
    const collections = [];
    rawCollections.forEach(collection => {
            const thisCollection = createCollectionInfo(collection);
            collections.push(thisCollection);
        }
    );
    return collections;
}

export function createCollectionInfo(collection) {
    return {
        collectionTitle: collection.node.description,
        collectionImage: collection.node.image.originalSrc,
        collectionType: collection.node.title.split(']').shift().replace('[', '')
    }
}