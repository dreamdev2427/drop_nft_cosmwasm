const productHelper = {
  getBySKU: (sku, products) => {
    return products.filter(p => {
      return p.sku === sku
        || (!!p.variants && !!p.variants.find(v => v.sku === sku))
        || p.tags.map(t => {
          t = t.toLowerCase();
          t.replace("#", "");
          return t;
        }).includes(sku.toLowerCase().replace("#", ""));
    });
  },

  map: node => {
    const mappedProducts = {
      id: node.id,
      description: node.descriptionHtml,
      image: {
        src: node.images.edges[0].node.src,
        alt: node.images.edges[0].node.altText,
        width: node.images.edges[0].node.width,
        height: node.images.edges[0].node.height
      },
      options: node.options,
      price: {
        amount: (+node.priceRange.minVariantPrice.amount).toFixed(0),
        currencyCode: "NOTE"
      },
      sku: node.variants.edges[0].node.sku,
      tags: node.tags,
      title: node.title,
      variants: node.variants.edges.map(v => {
        return {
          id: v.node.id,
          sku: v.node.sku,
          title: v.node.title,
        }
      })
    };
    return mappedProducts;
  }
}
export default productHelper;