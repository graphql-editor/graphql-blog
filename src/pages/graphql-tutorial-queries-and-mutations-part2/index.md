---
title: GraphQL Tutorial - Queries and mutations Part 2
date: '2019-01-08T12:30:00.284Z'
image: "gql.png"
author: Tomek
---

In [Part 1](https://blog.graphqleditor.com/graphql-tutorial-queries-and-mutations-part1/) of our GraphQL Tutorial, we have ended covering Operation Name. Let’s move to a feature allowing us to save some time as well as bits over the wire - the Variables.

## Variables

Until now, our arguments were written inside a query string. As most of the time, arguments to fields will be dynamic, it’s a poor idea to pass the dynamic arguments in the query string. To handle this client-side code would need to manipulate the query string at runtime dynamically, serializing it into a format specific for GraphQL. [GraphQL](https://graphqleditor.com/) comes with a solution - variables.

To start using them, we need to follow three steps. First, we need to replace a static value in the query with $variableName. Next to declare $variableName as one of the variables accepted by the query and finally pass variableName: value in the separate, transport-specific variables dictionary (a JSON would be just fine).

Query:
```graphql
query UserNameAndFriends($gender: Gender) {
  user(gender: $gender) {
    name
    friends {
      name
    }
  }
}
```

Variable:
```graphql
{
  "gender": "MALE"
}
```

Result:

```json
{
  "data": {
    "user": {
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

## Variable definitions

The variable definitions are the part that looks like this in the above query ($gender: Gender). It operates the same way as the argument definitions for a function in a typed language. It lists all variables prefixed with $ followed by their type (in this case Gender).

All declared variables must be both:
- Scalars
- Enums
- Input Object Types

This means that if you want to pass a complex object into a field, you need to know which input type will match on the server. 

Variable definitions can be:
- optional 
- requisitely

In the above case, it is optional. But if the field in which you pass the variable requires a non-zero argument, the variable must also be required.

You will learn more about the syntax for these variable definitions in our next article about the schema language GraphQL.

## Default variables

In [GraphQL](https://graphql.org/) you can assign Default values to the variables. It’s done by by adding the default value after the type declaration in your query. If Default values are provided for all variables, you can call the query without passing any variables. Note that If you will pass any variables in your query they Default values will be overridden.

```graphql
query UserNameAndFriends($gender: Gender = MALE) {
  user(gender: $gender) {
    name
    friends {
      name
    }
  }
}
```
## Directives

Directives let you include or exclude a field if a variable is `true` or `false`. It's very useful when we need to dynamically change the structure of the query.

Query:
```graphql
query User($gender: Gender, $withFriends: Boolean!) {
  user(gender: $gender) {
    name                
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

Variables:
```graphql
{
  "gender": "MALE",
  "withFriends": true
}
```
Result:
```json
{
  "data": {
    "user": {
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

In this case `withFriends` variable we pass is `true` so we also get the friends field, if `false` we won't.

There are two types of directives available in GraphQL:
- `@include(if: Boolean)` that includes field in the result if true.
- `@skip(if: Boolean)` that skip field if the argument is true.

As already mentioned, Directives are great to handle situations where you normally would have to perform string manipulations to change some fields in your query. 

