---
title: GraphQL library for Python - Strawberry
date: '2019-06-19T14:11:00.284Z'
author: Robert
---

I recently came across an interesting library for GraphQL. Strawberry is a new GraphQL library for Python 3, inspired by dataclasses. An initial version of Strawberry has been released on GitHub. To follow the project, you can sign up to get updates on the Strawberry site or github. Links below:

![](strawberry.png)

https://strawberry.rocks/

Strawberry is created by [patrick91](https://twitter.com/patrick91) who is also an organizer of @pyconit. It was originally announced during Python Pizza Berlin.

![](strawberry2.png)

#PyPi release and demo

Alpha version on PyPI: https://pypi.org/project/strawberry-graphql
Demo on Heroku using Starlette: https://demo.strawberry.rocks/graphql

#Installation

```
pip install strawberry-graphql
```

Getting Started

Create a file called app.py with the following code:

```
import strawberry


@strawberry.type
class User:
    name: str
    age: int


@strawberry.type
class Query:
    @strawberry.field
    def user(self, info) -> User:
        return User(name="Patrick", age=100)


schema = strawberry.Schema(query=Query)
```

This will create a GraphQL schema defining a User type and a single query field user that will return a hard-coded user.

To run the debug server run the following command:

```
strawberry run server app
```

Open the debug server by clicking on the following link: http://0.0.0.0:8000/graphql

This will open a GraphQL playground where you can test the API.

{% github strawberry-graphql/strawberry %}
