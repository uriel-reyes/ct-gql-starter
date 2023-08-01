# ct-gql-starter

ct-gql-starter is a graphql starter for commercetools.
This lightweight app uses the Apollo client to take product data from ct and displays it onto a page.

- ct sandbox
- Uses @apollo/client
- Note that apollo duplicates the first result to evert node in array of edges, there are two ways to solve this in index.js
- Runs using Parcel Bundler
- uses npm
- code is written so that bearer token needs to be created manually on expiration

## Installation
initialize the project with npm init -y
Use npm install @apollo/client graphql
Use Parcel Bundler: npm install --save-dev parcel-bundler

Modify package.json to include:
"scripts": {
  "start": "parcel index.html"
}
## License

[MIT](https://choosealicense.com/licenses/mit/)