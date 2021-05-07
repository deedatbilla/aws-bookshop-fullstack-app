/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUSER = /* GraphQL */ `
  query GetUSER($id: ID!) {
    getUSER(id: $id) {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const listUSERs = /* GraphQL */ `
  query ListUSERs(
    $filter: ModelUSERFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUSERs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        userType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      ownerId
      title
      description
      authur
      price
      fileurl
      count
      createdAt
      updatedAt
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        title
        description
        authur
        price
        fileurl
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      buyerId
      items {
        id
        ownerId
        title
        description
        authur
        price
        fileurl
        count
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        buyerId
        items {
          id
          ownerId
          title
          description
          authur
          price
          fileurl
          count
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
