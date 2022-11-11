/** @format */

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Concert {
    notes: String!
  }
`;

module.exports = typeDefs;
