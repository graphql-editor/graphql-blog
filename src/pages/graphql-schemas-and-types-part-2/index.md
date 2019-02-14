---
title: GraphQL Tutorial - Schemas and types part 2
date: '2019-02-14T10:23:04.284Z'
author: Robert
---

Let's explore second and last part of our tutorial of schemas and types

###Interfaces

Like many type systems, GraphQL supports interfaces. An interface exposes a specific set of fields that a type must include implementing the interface. For example, you could have an interface Actor that represents any humankind character in the Movies:

```graphql
interface Actor {
  id: ID!
  name: String!
  friends: [Actor]
  appearsIn: [Movie]!
}
```

This means that any type that implements Actor needs to have these exact fields, with these arguments and return types. Look at the example:

```graphql
type Arnold implements Actor {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Movie]!
}

type James implements Actor {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Movie]!
  wonOscar: Boolean!
}
```
You can see that both of these types have all of the fields from the Actor interface, but also bring in extra fields like wonOscar which is specific to this Actor.

### Union

An interesting mechanism is the Union type, which allows you to represent a group of objects that do not have the same fields. An excellent example is a query to a search engine that can search both the title of the Movie and the Actor's name. Union types are very similar to interfaces, but they don't get to specify any common fields between the types.

```graphql
union SearchResult = Movie | Actor
  
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
```graphql
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
Wherever we return a SearchResult type in our schema, we might get a Movie or an Actor. Note that members of a union type need to be concrete object types; you can't create a union type out of interfaces or other unions.

### Input type

To modify or create new elements in the application via GraphQL, a particular type input was created, which behaves very much like a regular object, with the difference that during the declaration input is used instead of the keyword type. This is particularly valuable in the case of mutations, where you might want to pass in a whole object to be created. In the GraphQL schema language, input types look exactly the same as regular object types, but with the keyword input instead of type:

```graphql
schema {
  query: Query
  mutation: Mutation
}
  
type Mutation {
  createActor(input: ActorInput): Actor
  updateActor(id: ID!, input: ActorInput): Actor
}
  
input ActorInput {
  name: String!
  appearsIn: [Movie]!
}
```

In the above example, you can observe that the createActor and updateActor actions expect the ActorInput object as an argument and return the Actor object. For the declared scheme, creating a new book requires a similar action:

### Lists and Non-Null 

In your query variable declarations, you can apply additional type modifiers that affect the validation of those values.  In the example below we're using a String type and marking it as Non-Null by adding an exclamation mark, ! after the type name. This means that our server regularly requires to return a non-null value for this field, and if it ends up getting a null value that will trigger a GraphQL execution error, letting the client know that something has gone wrong.

```graphql
type Actor {
  name: String!
  appearsIn: [Episode]!
}
```
The Non-Null type modifier can also be used when defining arguments for a field, which will cause the GraphQL server to return a validation error if a null value is passed as that argument, whether in the GraphQL string or in the variables.

Lsts work similarly: We can use a type modifier to mark a type as a List, which means that this field will return an array of that type. In the schema language, it's by wrapping the type in square brackets, [ and ]. It works the same for arguments, where the validation step will expect an array for that value. The Non-Null and List modifiers can be combined. 

```
myField: [String!]
```
```
myField: null // valid
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // error
```
```
myField: [String]!
```
```
myField: null // error
myField: [] // valid
myField: ['a', 'b'] // valid
myField: ['a', null, 'b'] // valid
```


