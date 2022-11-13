/** @format */

const { AuthenticationError } = require("apollo-server-express");
const { User, Concert } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("concerts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("concerts");
    },
    concerts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Concert.find(params).sort({ createdAt: -1 });
    },
    concert: async (parent, { concertId }) => {
      return Concert.findOne({ _id: concertId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("concerts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addConcert: async (parent, { concertDescription }, context) => {
      if (context.user) {
        const concert = await Concert.create({
          concertDescription,
          concertArtist: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { concerts: concert._id } }
        );

        return concert;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeConcert: async (parent, { concertId }, context) => {
      if (context.user) {
        const concert = await Concert.findOneAndDelete({
          _id: concertId,
          concertArtist: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { concerts: concert._id } }
        );

        return concert;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
