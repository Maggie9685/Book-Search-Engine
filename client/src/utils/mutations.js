import { gql } from '@apollo/client';

//loginUser(email: String, password: String): Auth
export const LOGIN_USER = gql`
  mutation loginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      token: String
      user: User
    }
  }
`;

//addUser(username: String, email: String, password: String): Auth
export const ADD_USER = gql`
  mutation addUser($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token: String
      user: User
    }
  }
`;

//saveBook(author: [author], description: String, title: String, bookId: ID, image: Image, link: String): User
export const SAVE_BOOK = gql`
  mutation saveBook($author: [String], $description: String, $title: String, $bookId: ID, $image: String, $link: String) {
    saveBook(author: $author, description: $description, title: $title, bookId: $bookId, image: $image, link: $link) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;  

//removeBook(bookId: ID): User
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;  
