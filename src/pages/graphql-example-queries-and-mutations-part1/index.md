---
title: GraphQL Example - Queries and mutations Part 1
date: '2019-01-02T10:23:04.284Z'
author: Robert
---

## Fields 

At its purest, GraphQL is about asking for specific fields on objects. Let's start by looking at a very easy query:

```graphql
{
  user {
    name	
  }
}
```
```graphql
{
  "data": {
    "user": {
      "name": "James"
    }
  }
}
```

You can see quickly that the query has the same shape as an output. This is fundamental to GraphQL, because you always get back what you expect. 

The field name returns a String type. The query above is interactive. That means you can change it as you like and see the new result. Try adding an appears. In field to the user object in the query, and see the new result.

In the previous case, we just asked for the name of our user which returned a String, but fields can also commit to Objects. In that case, you can get a sub-selection of fields for that object. GraphQL queries can cross related objects and their fields, allowing customers to get lots of associated data in one request, instead of making many round trips as one would need in a classic REST architecture.

```graphql
{
  player {
    name
    # You can add comments!
    friends {
      name
    }
  }
}
```
```graphql
{
  "data": {
    "player": {
      "name": "James",
      "friends": [
        {
          "name": "Adam"
        },
        {
          "name": "Paul"
        },
        {
          "name": "Chris"
        }
      ]
    }
  }
}
```

Note that in this sample, the friends field returns an collection of items. GraphQL queries look the same for both individual items or lists of items, however we understand which one to expect based on what is indicated in the schema.

## Aliases

If you have a fine eye, you may have discovered that, since the result object fields match the name of the field in the query but don't include arguments, you can't directly query for the same field with various arguments. That's why you require aliases - they let you rename the result of a field to anything you want.

```graphql
{
  bluePlayer: player(team: BLUE) {
    name
  }
  blackPlayer: player(team: BLACK) {
    name
  }
}
```
```graphql
{
  "data": {
    "bluePlayer": {
      "name": "Superman"
    },
    "blackPlayer": {
      "name": "Batman"
    }
  }
}
```

In the previous instance, the **player** fields would have clashed, but since we can alias them to different names, we can get both results in one request.

## Arguments

If the only thing we could do was traverse objects and their fields, GraphQL would already be a beneficial language for data fetching. But when you add the ability to pass arguments to fields, things get much more impressive.

```graphql
{
 player(id: "1") {
    name
    weight
  }
}
```
```graphql
{
  "data": {
    "player": {
      "name": "James",
      "weight": 80
    }
  }
}
```

In practice like REST, you can only pass an individual set of arguments - the query parameters and URL segments in your request. However, in GraphQL, every field and a nested object can get its set of cases, causing GraphQL a total replacement for doing many API fetches. You can even pass arguments into scalar fields, to complete data transformations once on the server, alternately of on each client separately.

```graphql
{
 player(id: "1") {
    name
    height(unit: CM)
  }
}
```
```graphql
{
  "data": {
    "player": {
      "name": "James",
      "height": 180
    }
  }
}
```


Arguments can be of many various types. In the above sample, we have adopted an Enumeration type, which describes one of a finite set of options (in this case, units of length, either METER or FOOT). GraphQL comes with a default set of types, but a GraphQL server can also declare its own custom types, as long as they can be serialized into your transport format.

## Fragments

Let's say we had a moderately complex page in our app, which let us look at two players along with their friends. You can imagine that such a query could quickly get difficult because we would need to repeat the fields at least once - one for each side of the comparison.

That's why GraphQL covers reusable units called fragments. Fragments let you create collections of fields, and then add them in queries where you need to. Here's a sample of how you could solve the above situation using fragments:

```graphql
{
  leftComparison: player(team: BLUE) {
    ...comparisonFields
  }
  rightComparison: player(team: Black) {
    ...comparisonFields
  }
}
fragment comparisonFields on Character {
  name
  friends {
    name
  }
}
```
```graphql
{
  "data": {
    "leftComparison": {
      "name": "Superman",
      "friends": [
        {
          "name": "Lois Lane"
        },
        {
          "name": "Martha Kent"
        },
      ]
    },
    "rightComparison": {
      "name": "Batman",
      "friends": [
        {
          "name": "Joker"
        },
        {
          "name": “Catwoman”
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```


You can see how the above query would be much repeated. The concept of fragments is usually used to split complex application data requirements into tinier pieces, especially when you need to join lots of UI components with different fragments into one initial data fetch.


## Operation name 

Until now, we have been practising a shorthand syntax where we omit both the query keyword and the query name, but in live apps, it's useful to use these to make our code less ambiguous.

Here’s an example that includes the keyword query as operation type and operation name:

```graphql
query PlayerNameAndFriends {
  player {
    name
    friends {
      name
    }
  }
}
```
```graphql
{
  "data": {
    "player": {
      "name": "James",
      "friends": [
        {
          "name": "Adam"
        },
        {
          "name": "Paul"
        },
        {
          "name": "Chris"
        }
      ]
    }
  }
}
```


The operation type is either query, mutation, or subscription and defines what kind of operation you intend to do. The operation type is required unless you're using the query shorthand syntax, in which case you can't supply a name or mutable definitions for your operation.

The operation name is an important and explicit name for your operation. It is demanded in multi-operation documents, but its use is encouraged because it is beneficial for debugging and server-side logging. When something runs crazy either in your network logs or your GraphQL server, it is easier to identify a query in your codebase by name somewhat of trying to decipher the contents. Think of this just like a function name in your desired programming language. For example, in JavaScript we can easily work only with anonymous functions, but when we give a function a name, it's easier to track it down, debug our code, and log when it's called. In the same way, GraphQL query and mutation names, along with fragment names, can be a useful debugging tool on the server side to identify different GraphQL requests.

