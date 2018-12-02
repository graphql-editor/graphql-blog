---
title: GraphQL newbie tutorial - cheatsheet
date: '2018-11-30T10:23:04.284Z'
author: Robert
---

This article is part of newbie series. In other articles I’ve covered basics of GraphQL, introduction and Schema Definition Language. It has been written by newbie for newbies. Feel free to comment, suggest changes. 

## The basics
    Scalar types
    Int > Integer
    Float > Float
    String > String
    Boolean > Boolean
    ID > ID
    
    Type definitions
    scalar > Scalar type
    type > Object type
    interface > Interface type
    union > Union type
    enum > Enumerable type
    input > Input object type
    
    Type modifiers
    String > Nullable string
    String! > Required string
    [String] > List of strings
    [String]! > Required list of strings
    [String!]! > Required list of required strings

**Example of a GraphQL schema**
```graphql
type Author {
  id: Int!
  firstName: String
  lastName: String
  """
  the list of Books by this author
  """
  books: [Book]
}

type Book {
  id: Int!
  title: String
  author: Author
  pages: Int
}

# the schema allows the following query:
type Query {
  book: [Book]
  author(id: Int!): Author
}
```
**Input Arguments**

```graphql
# Basic Input
type Root {
  users(limit: Int): [User]!
}

# Input with default value
type Root {
  users(limit: Int = 10): [User]!
}

# Input with multiple args
type Root {
  users(limit: Int, sort: String): [User]!
}
# Input with multiple args and default values
type Root {
  users(limit: Int = 10, sort: String): [User]!
}
# or
type Root {
  users(limit: Int, sort: String = "asc" ): [User]!
}
# or
type Root {
  users(limit: Int = 10, sort: String = "asc" ): [User]!
}

# Interfaces


interface Publication {
  title: String!
  releasedDate: String!
}
  
type Magazine implements Publication {
  title: String!
  releasedDate: String!
  version: Int!
}
  
type Book implements Publication {
  title: String!
  releasedDate: String!
  pages: Int!
}

# Unions

union SearchResult = Book | Author
  
type Query {
  search(text: String!): SearchResult
}

query {
  search(text: "Park") {
    ... on Book {
      title
    }
    ... on Author {
      name
    }
  }
}
    

# Enums

enum RGB {
  RED
  GREEN
  BLUE
}
type Root {
  color: RGB
}

# Input Object Types

input ListUsersInput {
  limit: Int 
  since_id: ID
}
type Root {
  users(params: ListUsersInput): [Users]!
}

```