---
title: Getting Started with GraphQL
date: '2018-12-11T13:37:00.284Z'
author: Tomek
---

## What is GraphQL?

GraphQL is an open-source data query and manipulation language for APIs.
In general, GraphQL is a syntax that describes how to ask & fetch the data from the server to the client. The response format is described in the query and defined by the client rather than the server. There are two basic types of queries in GraphQL:

- to fetch data from the server side (_get_)
- to manipulate you data (_create_,_update_,_delete_)

## The key concepts (principles)

GraphQL is not language specific, it's just a specification between the client and the server. Any client should be able to communicate with any server as long as they both speak GraphQL.

- **Hierarchical:** Most of today's product development work involves creating and manipulating view hierarchies. To achieve compatibility with the structure of the applications, the GraphQL query itself is a hierarchical set of fields. The query has a shape similar to the data it returns. It is a very natural way for product engineers to describe data requirements.

- **Product‐centric:** GraphQL is a product-oriented, driven by the demands of the views and front-end developer who write them. We begin with their way of mind and their requirements, and then build the language and runtime necessary for this purpose.

- **Strong‐typing:** GraphQL is strongly-typed. For a particular query, the tool can ensure that the query is both syntactically correct and correct in a GraphQL-type system before execution, i.e. at the time of query creation, and the server can have some guarantees as to the shape and nature of the response. This makes it easier to build high quality client applications.

- **Client‐specified queries:** In GraphQL, the query specification is encoded in the client and not on the server. These queries are defined at the detail level at field level. In the vast majority of applications written without GraphQL, the server specifies the data returned at various script endpoints. A GraphQL query returns exactly what the client asks for and nothing else.

- **Introspective:** GraphQL is introspective. Clients and other tools can query the type system using the GraphQL syntax as such. It is a powerful platform for building tools and client software, e.g. automatic processing of incoming data into strongly-typed interfaces.

## GraphQL vs REST

The common opinion is that GraphQL is a replacement for REST. Nothing more incorrect. Although GraphQL is a newer concept, it’s totally different from REST. GraphQL definitely isn't a nail in the REST coffin, nor is it better than it. GraphQL definitely can help you optimize your project.

Imagine having one GraphQL API acting as a gateway to your other REST APIs. How cool is that?

## GraphQL Example

In GraphQL structure of the data is not hardcoded as in traditional REST API, which this makes retrieving data from the server more efficient and a lot easier for the client. In general, GraphQL is about asking for specific fields on objects:

```
{
    product {
        name
        flav {
            name
        }
    }
}
```

and the respone would like like this:

```
{
    "data": {
        "product": {
        "name": "Cola",
        "flav": [
            {
            "name": "Cinamon"
            },
            {
            "name": "Cherry"
            },
            {
            "name": "Vanilla"
             }
          ]
        }
    }
}
```
