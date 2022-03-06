const { User, Book } = require('../models');

const resolvers = {
  Query: {
    me: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
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
    saveBook: async (parent, args) => {
      return Book.create(args);
    },

    //removeBook(bookId: ID): User
    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ bookId: bookId });
    },
  },
};

module.exports = resolvers;
