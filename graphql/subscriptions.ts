/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      image
      name
      email
      tweets {
        items {
          id
          content
          image
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      image
      name
      email
      tweets {
        items {
          id
          content
          image
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      image
      name
      email
      tweets {
        items {
          id
          content
          image
          userID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
      id
      content
      image
      userID
      user {
        id
        username
        image
        name
        email
        tweets {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet {
    onUpdateTweet {
      id
      content
      image
      userID
      user {
        id
        username
        image
        name
        email
        tweets {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
      content
      image
      userID
      user {
        id
        username
        image
        name
        email
        tweets {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
