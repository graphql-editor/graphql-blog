---
title: GraphQL newbie tutorial - Schema definition
date: '2018-11-18T10:23:04.284Z'
author: Robert
---

With the theoretical introduction from the previous post on GraphQL, we can go on to describe an essential part of this standard, namely the type system, which allows you to define the API scheme - GraphQL Schema Definition Language (SDL). It is a special syntax that has been very well documented and created in such a way that you can work with it regardless of the language or framework.

## Type System

GraphQL is strongly typed, which means that each definition must have a particular type. The Type System comes with the help, which provides several possibilities for defining elements of our API. Let’s think about library application (books and authors) declare the first types of our API.
```graphql
type Book {
  id: ID!
  title: String!
  shortDescription: String!
  description: String
  pages: Int!
  isbn: String!
  releaseDate: String!
  isBookOftheYear: Boolean!
  author: Author!
}
  
type Author {
  id: ID!
  name: String!
  bio: String
  sex: String!
  books: [Book!]!
}
```

   
The most important and most often used element of the whole puzzle is `Object Type`, which in the simplest terms is a collection of fields. Above examples: two objects were declared using the `type Book {}` and `type Author {}` definitions, while inside these declarations you can see fields that are of certain types, e.g. `name: String!`, or  `isBookOftheYear: Boolean!`.

## Scalar types

In GraphQL there are several built-in scalar types for field declarations:

- `String` - set of characters in UTF-8 format,
- `Int` - 32-bit integer,
- `Float` - floating point number,
- `Boolean` - value `true` or `false`
- `ID` - a type representing the unique identifier for the object, most often used for re-downloading (used by the cache). It's serialised in the same way as the `String` type.
## Interface

GraphQL's type system features Interfaces. An interface exposes a specific set of fields that a type must include implementing the interface.  For example, we could represent a Publication interface served as a book or magazine. These types share common characteristics, including a title and release date.

```graphql
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
```
It is very likely that the author could publish both books and magazines, thanks to the interface you do not need to become dependent on a particular type of publication, in this case, we can use a more massive abstraction which is Publication.

## Union

An interesting mechanism is the Union type, which allows you to represent a group of objects that do not have the same fields. An excellent example is a query to a search engine that can search both the title of the book and the author's name.
With this declaration, you can query something like this:
```graphql
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
```
And as a result we will see the answer:
```js
    {
      "data": {
        "search": [
          {
            "name": "Jurassic Park",
          },
          {
            "name": "Jessica Park",
          }
        ]
      }
    }
```
## Declaration scheme

When defining the API scheme, there are two top-level elements available - `query` and `mutation`, which are ordinary objects created in the same way all others. Within them, we declare the possibilities of our API. The definition of the scheme itself is trivial:
```graphql
schema {
  query: Query
  mutation: Mutation
}
  
type Query {
}
  
type Mutation {
}
```
## Query

A query is a mandatory element in the schema and is responsible for reading the API. All defined fields inside this object can be compared to various API endpoints. The accepted principle is that elements issued via query are nouns that explicitly specify the entity to be downloaded - in the above example they are book and author. To better illustrate the whole, you can move the previous definitions of objects to query.
```graphql
schema {
  query: Query
}
  
type Query {
  book(id: ID!): Book
  author(id: ID!): Author
}

type Book {
  id: ID!
  title: String!
  shortDescription: String!
  description: String
  pages: Int!
  isbn: String!
  releaseDate: String!
  isBookOftheYear: Boolean!
  author: Author!
}
  
type Author {
  id: ID!
  name: String!
  bio: String
  sex: String!
  books: [Book!]!
}
```
## Arguments

In some lines you can see the declaration of fields slightly different than in previous cases (e.g. `book (id: String!)`), Where in addition to the field name you can see parentheses with another declaration - it's nothing more than entering an argument to the query - on its basis, you can pass some parameters according to which you want to download data. In the above example, the user's id is expected and the query performed would look something like this:
```graphql
query {
  book(id: "1234") {
    title
    isbn
  }
}
```
## Mutation

`Mutation` is an optional part that allows you to add, edit or delete items in our application via the API. Its definition is identical to the type `query`. The only difference is the principle of defining fields - in contrast to `query` in `mutation`, fields are most often called verbs that are clearly defining a performed action. Complementing the above example, it is worth adding the possibility of creating new books.

## Input Type

Before we go to the example declaration of `mutation`, it's worth to present one more type dropped when discussing all the basic types in the section that pertained to the Type System.
To modify or create new elements in the application via GraphQL, a particular type `input` was created, which behaves very much like a regular object, with the difference that during the declaration `input` is used instead of the keyword `type`.

```graphql
schema {
  query: Query
  mutation: Mutation
}
  
type Mutation {
  createAuthor(input: AuthorInput): Author
  updateAuthor(id: ID!, input: AuthorInput): Author
}
  
input AuthorInput {
  name: String!
  bio: String
  sex: String!
}
```
In the above example, you can observe that the createAuthor and updateAuthor actions expect the AuthorInput object as an argument and return the Author object. For the declared scheme, creating a new book requires a similar action:

```graphql
mutation {
  createAuthor(input: {
    name: String!
    bio: String
    sex: String!
  }) {
    id
    title
  }
}
```
