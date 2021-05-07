/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUSER = /* GraphQL */ `
  subscription OnCreateUSER {
    onCreateUSER {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUSER = /* GraphQL */ `
  subscription OnUpdateUSER {
    onUpdateUSER {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUSER = /* GraphQL */ `
  subscription OnDeleteUSER {
    onDeleteUSER {
      id
      username
      email
      userType
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
    onCreateBook {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook {
    onUpdateBook {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook {
    onDeleteBook {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder {
    onCreateOrder {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder {
    onDeleteOrder {
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
