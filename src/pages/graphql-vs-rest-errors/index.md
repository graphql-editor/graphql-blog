---
title: GraphQL vs REST - Handling errors
date: '2019-01-23T13:37:00.284Z'
image: "gql.png"
author: Tomek
---

An important part of any development project is handling errors as any application, no matter how simple it is, may contain a considerable amount of errors. In our previous blog posts, we have made a comparison of certain aspects ([data fetching](https://blog.graphqleditor.com/graphql-vs-rest/), [performance](https://blog.graphqleditor.com/graphql-vs-rest-performance/), [caching](https://blog.graphqleditor.com/grapqhl-vs-rest-caching/)) of [GraphQL](https://github.com/graphql) vs REST so you already know that it differs a lot. The same is true also in terms of handling errors.

## Handling errors in REST

Error handling in REST is pretty straightforward, we simply check the [HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) headers to see the status of a response:
- `200 OK`,
- `404 Not Found`,
- `500 Internal Server Error`

and so on.

 Depending on the HTTP status code we get, we can easily identify what’s went wrong and how to handle it. In [GraphQL](https://graphql.org/) it’s different.

![Method Not Allowed](405.jpg)

## Errors in GraphQL
There are plenty of errors that a client can face when querying a GraphQL Server. Regardless of whether it's a query, mutation or subscription, they can be divided into six types:

- Server problems (5xx HTTP codes, 1xxx WebSocket codes)
- Client problems like rate-limited, unauthorized, etc. (4xx HTTP codes)
- `Query` is missing or was malformed
- `Query` fails GraphQL internal validation of syntax, schema logic etc. 
- User-provided `variables` or `context` is bad and `resolve`/`subscribe` function shows an error
- Developer error occurred inside the `resolve`/`subscribe` function

The first four are critical errors that ignore all data. The first three happens before we call GraphQL server, the fourth one calls GraphQL receiving only 'errors' in response.

On the contrary, the GraphQL server will always return `200 OK` for position five and six (if operated over HTTP). If there is an error while processing GraphQL queries, the detailed error message is sent to the customer with the answer i.e.

```graphql
    {
      "errors": [
        {
          "message": "Field \"blabla\" must not have a selection since type \"String\" has no subfields.",
          "locations": [
            {
              "line": 2,
              "column": 20
            }
          ]
        }
      ]
    }
```
So how to handle this type of errors? GraphQL is a very immature language so some parts (such as handling errors) do not have worked out the best practices, but there are some approaches that we highly recommend to follow:

#### 1. DATA IS DATA
If GraphQL returns `results.data`, there is no error.

#### 2. ERRORS AS A PART OF SCHEMA 
If the viewer should see the error, make sure to return the error as a field in your response. If your server expect an error it shouldn't interup the resolution, instead return a regular payload with `error` field explainng what went wrong.

```graphql
    return {
        error:{
            id:'222'
            type:'errorType'
            title: 'Name of an error'
            message: 'Let user know what's wrong how to fix'    
        }
    }
```





