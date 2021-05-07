/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUSER = /* GraphQL */ `
  mutation CreateUSER(
    $input: CreateUSERInput!
    $condition: ModelUSERConditionInput
  ) {
    createUSER(input: $input, condition: $condition) {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const updateUSER = /* GraphQL */ `
  mutation UpdateUSER(
    $input: UpdateUSERInput!
    $condition: ModelUSERConditionInput
  ) {
    updateUSER(input: $input, condition: $condition) {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const deleteUSER = /* GraphQL */ `
  mutation DeleteUSER(
    $input: DeleteUSERInput!
    $condition: ModelUSERConditionInput
  ) {
    deleteUSER(input: $input, condition: $condition) {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
