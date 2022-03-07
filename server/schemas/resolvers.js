const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },
 
  Mutation: {
    //loginUser(email: String, password: String): Auth
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    //addUser(username: String, email: String, password: String): Auth
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    //saveBook(author: [String], description: String, title: String, bookId: ID, image: String, link: String): User
    saveBook: async (parent, args, context) => {
      console.log(context.user);
      console.log(args);
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { saveBook: { ...args } } },
        { new: true }
      );
    },

    //removeBook(bookId: ID): User
    removeBook: async (parent, { bookId }) => {
      return User.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
