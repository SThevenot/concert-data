/** @format */

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    concerts: [Concert]!
  }

  type Concert {
    _id: ID
    concertDescription: String
    concertArtist: String
    concertDate: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    concerts(username: String): [Concert]
    Concert(ConcertId: ID!): Concert
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addConcert(concertDescription: String!): Concert
    removeConcert(ConcertId: ID!): Concert
  }
`;

module.exports = typeDefs;
