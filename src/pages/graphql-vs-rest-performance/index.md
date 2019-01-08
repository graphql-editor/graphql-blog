---
title: GraphQL vs REST Performance
date: '2019-01-07T13:37:00.284Z'
image: "gqlvsrest.png"
author: Tomek
---


This time let’s take a look at another important aspect of [GraphQL](https://graphqleditor.com/) vs REST discussion - the PERFORMANCE.


## GraphQL = performance vs REST = reliability 

The main GraphQL quality is being less loquacious than traditional [REST API](https://www.restapitutorial.com/lessons/whatisrest.html).  GraphQL treats performance as its top priority while REST is focused on keeping services reliability as their main objective. Even if a REST API returns only a basic partial, it is still transferring more data, while GraphQL is always aiming for the smallest possible request. In an example, if the client needs a field, they request it, and if the API adds a new field, clients don't get it, unless it's being added into the GraphQL query.


## No wasted bits over the wire

You all have seen APIs where you need to `GET /author` first and then fetch each book individually via `GET /author/:id/books/:id` endpoint. This result in n+1 queries, a  well-known performance issue face in REST APIs.  While REST API calls are chained on the client side before the final representation can be formed for display, in GraphQL its simplified by enabling the server to combined all the data for the client within a single query which results in less bits being transferred over the wire.

```graphql
{
  author (id: "1") {
    name
    book (id: "5") {
      title
    }
  }
}
```
```json
{
  "data": {
    "author: {
      "name": "George R.R. Martin",
      "book": [
        {
          "title": "A Dance with Dragons"
        }
      ]
    }
  }
}
```

## Conclusion

[GraphQL](https://graphql.org/) is faster than [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) because as you can pick the fields you want to query, so the request will always be the smallest possible. Additionally, with GraphQL, you can enquire multiple entities in one request,  and because less bits will be transferred over the wire so your projects will perform faster than while using [REST](https://en.wikipedia.org/wiki/Representational_state_transfer).



