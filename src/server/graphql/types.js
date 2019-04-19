const fs = require('fs')
const path = require('path')
const { gql } = require('apollo-server-hapi')

const baseSchema = fs.readFileSync(
  path.join(__dirname, 'schemas', 'base.graphql'),
  'utf8'
)
const typeDefs = gql`
  ${baseSchema}
`

module.exports = typeDefs
