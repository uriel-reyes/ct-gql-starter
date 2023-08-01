import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create ApolloClient instance
const client = new ApolloClient({
  uri: 'https://api.{region}.gcp.commercetools.com/{project-key}/graphql',
 /* 
 cache: new InMemoryCache({
    dataIdFromObject: o => {o.id ? `${o.__typename}-${o.id}` : `${o.__typename}-${o.cursor}`}
  })
  */
  cache: new InMemoryCache({
    dataIdFromObject: object => object.key || null
  }),
  headers: {
//bearer token needs to be manually generated in Postman
    Authorization: `Bearer {token}`
  }
});

// Define your query
const query = gql`
{
    products(limit: 12, offset: 0) {
      results {
        id
        key
        productType {
          id
          name
        }
        masterData {
          current {
            variants {
              id
              sku
              prices {
                value {
                  currencyCode
                  centAmount
                }
              }
              images{
                url
              }
            }
          }
        }
      }
    }
  }  
`;

client.query({ query })
  .then(data => {
    const contentDiv = document.getElementById('content');

    data.data.products.results.forEach(product => {
      const variant = product?.masterData?.current?.variants[0];

      if (!variant || !variant.images || !variant.images.length || !variant.prices || !variant.prices.length) {
        console.error(`Error: Invalid data for product ${product.key}`);
        return;
      }

      const productDiv = document.createElement('div');
      productDiv.classList.add('bg-white', 'p-4', 'shadow-md', 'rounded-lg');

      const img = document.createElement('img');
      img.src = variant.images[0].url;
      img.alt = product.key;
      img.classList.add('w-full', 'h-40', 'object-cover', 'rounded-t-lg');
      productDiv.appendChild(img);

      const name = document.createElement('h3');
      name.textContent = product.key;
      name.classList.add('text-xl', 'font-bold', 'mt-2');
      productDiv.appendChild(name);

      const sku = document.createElement('p');
      sku.textContent = 'SKU: ' + variant.sku;
      sku.classList.add('text-gray-500', 'text-sm');
      productDiv.appendChild(sku);

      const price = document.createElement('p');
      const defaultPrice = variant.prices.find(price => price.value.currencyCode === 'USD') || variant.prices[0];
      if (!defaultPrice || !defaultPrice.value) {
        console.error(`Error: No default price found for product ${product.key}`);
        return;
      }
      price.textContent = defaultPrice.value.currencyCode + ' ' + (defaultPrice.value.centAmount / 100).toFixed(2);
      price.classList.add('text-green-500', 'text-lg', 'font-bold');
      productDiv.appendChild(price);

      contentDiv.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  