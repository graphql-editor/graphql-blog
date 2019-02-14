---
title: GraphQL Tutorial - Schemas and Types Part 1
date: '2019-01-18T12:15:04.284Z'
author: Robert
---
Let's explore the next stage of our [GraphQL](https://graphqleditor.com/) tutorial -  type system and how it defines what data can be queried. Since GraphQL can be used with any backend programming language, we'll focus mostly on general the concepts.


## Type language 
GraphQL can be used with any language. Since we can't rely on any specific language syntax, to talk about GraphQL schemas, we'll define our simple language. We'll use the "GraphQL schema language" - it's similar to the query and allows us to talk about GraphQL schemas in an agnostic way

## Type system
GraphQL query language is basically about selecting fields on objects. Let's check that on our example:

```graphql
{
  Actor {
    name
    appearsIn
  }
}
```
```graphql
{
  "data": {
    "hero": {
      "name": "Arnold",
      "appearsIn": [
        "TERMINATOR",
        "CONAN",
        "PREDATOR"
      ]
    }
  }
}
```

1. We start with a unique "root" object and select actor field on that
2. For the object returned by actor, we select the name and appearsIn fields

GraphQL query closely matches the result; therefore you can predict what the query will respond without knowing much about the server. But it's helpful to have an accurate description of the data we can ask for - what fields can we choose? What fields are possible on those sub-objects? What kinds of things might they respond? 

Every GraphQL service describes a set of types which ultimately represent the set of potential data you can query on that service. Then, when queries come in, they are validated and executed against that schema.

## Object types and fields 
The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:

```
type Actor {
  name: String!
  appearsIn: [Movie!]!
}
```
The language is pretty simple, but let's go over it so that we can have a shared dictionary:

1. Actor is a GraphQL Object Type, meaning it's a type with some fields. Most of the types in your schema will be object types.
2. name and appearsIn are fields on the Actor type. That means that name and appearsIn are the only fields that can appear in any part of a GraphQL query that operates on the Actor type.
3. String is one of the built-in scalar types - these are types that resolve to a single scalar object, and can't have sub-selections in the query. We'll go over scalar types later.
4. String! means that the field is non-nullable, saying that the GraphQL service promises always to give you value when you ask. In the type of language, we'll serve those with an exclamation mark.
5. [Movie!]! represents an collection of Movie objects. Since it is also non-nullable, you can regularly expect an array (with zero or more items) when you ask the appearsIn field. And since Movie! is also non-nullable, you can always expect every item of the array to be an Movie object.
Now you know what a GraphQL object type looks like, and how to read the basics of the GraphQL.

## The Query and Mutation types
Most types in your schema will be standard object types, but two types are special within a schema:

```
schema {
  query: Query
  mutation: Mutation
}
```
Every GraphQL service has a query type and don't need to have a mutation type. These types are the same as a regular object type, but they are unique because they define the entry point of every GraphQL query.

```
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
```

```
{
  "data": {
    "hero": {
      "name": "R2-D2"
    },
    "droid": {
      "name": "C-3PO"
    }
  }
}
```
That means that the GraphQL service needs to have a Query type with hero and droid fields:

```
type Query {
  hero(episode: Episode): Character
  droid(id: ID!): Droid
}
```
Mutations work similarly - you define fields on the Mutation type, and those are possible as the root mutation fields you can call in your query.

It's essential to master that other than the special status of being the "entry point" into the schema, the Query and Mutation types are the same as any other GraphQL object type, and their fields act precisely the same way.

## Scalar types 
A GraphQL object type has a name and fields, but at some level those fields have to resolve to some particular data. That's where the scalar types come in: they represent the leaves of the query.

In the next query, the name and appearsIn fields will choose to scalar types. We know this because those fields don't have any sub-fields - they are the leaves of the query.

```graphql
{
  Actor {
    name
    appearsIn
  }
}
```
```graphql
{
  "data": {
    "hero": {
      "name": "Arnold",
      "appearsIn": [
        "TERMINATOR",
        "CONAN",
        "PREDATOR"
      ]
    }
  }
}
```

GraphQL comes with a set of default scalar types out of the box:

- Int: A signed 32‐bit integer.
- Float: A signed double-precision floating-point value.
- String: A UTF‐8 character sequence.
- Boolean: true or false.
- ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.

In most GraphQL service implementations, there is also a way to specify custom scalar types. For example, we could define a Date type:

```
scalar Date
```
Then it's up to our implementation to define how that type should be validated serialized or deserialized. For example, you could specify that the Date type should always be serialized into an integer timestamp, and your client should know to expect that format for any date fields.

## Enumeration types 
Also called Enums, enumeration types are a special kind of scalar that's limited to an appropriate set of allowed values. This allows you to:

Validate that any arguments of this type are one of the allowed values
Communicate through the type system that a field will always be one of a finite set of values

```
enum Movie {
  TERMINATOR
  CONAN
  PREDATOR
}
```
It means that anywhere we use the type Movie in our schema, we expect it to be precisely one of TERMINATOR, CONAN, or PREDATOR.

Note that GraphQL service implementations in different languages will have their own programming-specific way to deal with enums. In languages that support enums as a first-class citizen, the application might take advantage of that; in a language like JavaScript with no enum support, these values might be internally mapped to a set of integers.