---
title: Super Graph - turn GraphQL queries into a single SQL query
date: '2020-06-11T15:12:00.284Z'
image: supergraph_feat.png
author: Tomek
---


**[Super Graph](https://supergraph.dev/docs/home)** is a service that create a high-performance GraphQL API, all happens instantly and without any code. The core concept of Super Graph is to reduce develoipment time by  simplifying database opperations and it's achiveed by translating your [GraphQL queries](https://graphql.org/learn/queries/)  into a single & blazingly fast SQL query.

>*It aims to cut development time by reducing the boilerplate when developing GraphQL APIs that use an SQL database.* 

By giving GraphQL API for PostgreSQL database written in Go, Super Graphs aims to reducie development time when developing GraphQL APIs that use referes to a SQL database by automatically generateing SQL queries along with some most comonly used features such as authentication, Rails integration, remote joins, support for JWT tokens, DB migrations, seeding and more.


>*Super Graph will learn your database and generate the most efficient SQL query.*

Instead just describe the data you need in GraphQL and give that to Super Graph it'll automatically learn your database and generate the most efficient SQL query fetching your data in the JSON structure you expected.

![GraphQL query](graphql.png)
###### Source: [supergrapqh.dev](https://supergraph.dev/docs/home)

And as a result of data fetched by Super GraphQ you will be given a JSON with all teh data needed without writing any code or SQL.

![Data fecthed from GraphQL from previous picture](data.png)
###### Source: [supergrapqh.dev](https://supergraph.dev/docs/home)

## Why Super Graph?

The creater of Super Graph , [Vikram Rangnekar](https://twitter.com/dosco), found that on average developers spend too much time on building API backends (devleopment, updating, maintance) and it's always comes to figuring out what the UI needs then build an endpoint for it which always comes with a struggle with providing the data in teh form that the frontend expects to see. Being weary by the idea of writing the same code again and agian he decided to build a compiler that converts GraphQL to highly efficient SQL.

The above mentioned compiler is the heart of Super Graph providing everything you needed for you app. No more spending weeks or months writing backend API code. Just make the query you need and Super Graph will do the rest.
