# ct-gql-starter

ct-gql-starter is a graphql starter for commercetools.
The project demonstrates how to fetch product data and display it as product cards.

# Functionality
The project uses Apollo Client, a powerful GraphQL client library, to fetch product data from the Commercetools GraphQL API. The index.js file contains the GraphQL query and the code to render product cards dynamically based on the fetched data.

Each product card displays the following information:

- Product Image: The main product image.
- Product Name: The name of the product.
- SKU: The product's Stock Keeping Unit.
- Price: The price of the product in USD.

Technologies Used
- Apollo Client: Used for handling GraphQL queries and data fetching.
- Tailwind CSS: Used for styling the product cards and layout.
- GraphQL Query

The GraphQL query is defined in the index.js file. It fetches product data, including the product name, SKU, price, and image, from the Commercetools GraphQL API.

# Notes

- ct sandbox
- Uses @apollo/client
- npm install @apollo/client graphql
- Note that apollo duplicates the first result to evert node in array of edges, there are two ways to solve this in index.js
- Runs using Parcel Bundler
- npm install --save-dev parcel-bundler
- code is written so that bearer token needs to be created manually on expiration
- Modify package.json to include:
"scripts": {
  "start": "parcel index.html"
}

## License

[MIT](https://choosealicense.com/licenses/mit/)
