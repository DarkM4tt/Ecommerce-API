const express = require('express')
const path = require('path')
const { graphqlHTTP } = require('express-graphql')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'))

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
})

const root = {
  products: require('./products/products.model'),
  orders: require('./orders/orders.model'),
}

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(5000, () => {
  console.log('Running graphql server!')
})
