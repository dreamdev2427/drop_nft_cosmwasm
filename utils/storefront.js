const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_API_URL + "api/2023-04/graphql.json";

export async function storefront(variables = {}) {
    const gql = String.raw;
    const query = gql`
        query Products {
            products(first:10) {
                edges {
                    node {
                        id
                        descriptionHtml
                        images(first:5) {
                            edges {
                                node {
                                    src
                                    altText,
                                    width,
                                    height
                                }
                            }
                        }
                        options {
                            id
                            name
                            values
                        }
                        priceRange {
                            minVariantPrice {
                                amount
                                currencyCode
                            }
                        }
                        variants(first:10) {
                            edges {
                                node {
                                    id
                                    sku
                                    title
                                }
                            }
                        }
                        tags
                        title
                    }
                }
            }
        }
    `;
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN
        },
        body: JSON.stringify({ query, variables })
    });
    const { data, errors, status } = await response.json()
    console.log(data, errors, status)
    return {
        status: response.status,
        body: data
    };
};