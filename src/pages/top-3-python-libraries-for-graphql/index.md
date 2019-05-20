---
title: Top 3 python libraries for graphql 
date: '2019-04-23T10:23:04.284Z'
author: Robert
---

This post is a summary of the best python libraries for GraphQL. Python in recent years is starting to be on the list of top programming language. GraphQL is emerging but very promising query language and execution engine tied to any backend service. 

Python is one of the most popular languages used in data science, machine learning and AI systems. GraphQL was introduced by Facebook as an alternative to REST and it's popular of flexibility on handling complex systems.

#Ariadne
Ariadne is a Python library for implementing GraphQL servers using schema-first approach. 

Ariadne is a Python library for implementing GraphQL servers.

- Schema-first: Ariadne enables Python developers to use schema-first approach to the API implementation. This is the leading approach used by the GraphQL community and supported by dozens of frontend and backend developer tools, examples, and learning resources. Ariadne makes all of this immediately available to your and other members of your team.
- Simple: Ariadne offers small, consistent and easy to memorize API that lets developers focus on business problems, not the boilerplate.
- Open: Ariadne was designed to be modular and open for customization. If you are missing or unhappy with something, extend or easily swap with your own.
Documentation is available here.

Features:

- Simple, quick to learn and easy to memorize API.
- Compatibility with GraphQL.js version 14.0.2.
- Queries, mutations and input types.
- Asynchronous resolvers and query execution.
- Subscriptions.
- Custom scalars and enums.
- Unions and interfaces.
- Defining schema using SDL strings.
- Loading schema from .graphql files.
- WSGI middleware for implementing GraphQL in existing sites.
- Opt-in automatic resolvers mapping between camelCase and snake_case.
- Build-in simple synchronous dev server for quick GraphQL experimentation and GraphQL Playground.
- Support for Apollo GraphQL extension for Visual Studio Code.
- GraphQL syntax validation via gql() helper function. Also provides colorization if Apollo GraphQL extension is installed.

####Installation

```
pip install ariadne
```

####Quickstart

The following example creates an API defining Person type and single query field people returning a list of two persons. It also starts a local dev server with GraphQL Playground available on the http://127.0.0.1:8000 address. Start by installing uvicorn, an ASGI server we will use to serve the API:

Start by installing uvicorn, an ASGI server we will use to serve the API:

```
pip install uvicorn
```

Then create an example.py file for your example application:

```python
from ariadne import ObjectType, QueryType, gql, make_executable_schema
from ariadne.asgi import GraphQL

# Define types using Schema Definition Language (https://graphql.org/learn/schema/)
# Wrapping string in gql function provides validation and better error traceback
type_defs = gql("""
    type Query {
        people: [Person!]!
    }

    type Person {
        firstName: String
        lastName: String
        age: Int
        fullName: String
    }
""")

# Map resolver functions to Query fields using QueryType
query = QueryType()

# Resolvers are simple python functions
@query.field("people")
def resolve_people(*_):
    return [
        {"firstName": "John", "lastName": "Doe", "age": 21},
        {"firstName": "Bob", "lastName": "Boberson", "age": 24},
    ]


# Map resolver functions to custom type fields using ObjectType
person = ObjectType("Person")

@person.field("fullName")
def resolve_person_fullname(person, *_):
    return "%s %s" % (person["firstName"], person["lastName"])

# Create executable GraphQL schema
schema = make_executable_schema(type_defs, [query, person])

# Create an ASGI app using the schema, running in debug mode
app = GraphQL(schema, debug=True)
```



#Strawberry


Strawberry is a new GraphQL library for Python 3, inspired by dataclasses. An initial version of Strawberry has been released on GitHub. Strawberry was created by @patrick91 who is also an organizer of @pyconit. It was originally announced during Python Pizza Berlin.


![](https://thepracticaldev.s3.amazonaws.com/i/jrow1cc45mi8n650eiba.png)

https://strawberry.rocks/

####Installation

```
pip install strawberry-graphql
```

####Getting Started

Create a file called app.py with the following code:

```python
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

#Graphene

Graphene is a Python library for building GraphQL schemas/types fast and easily.

- Easy to use: Graphene helps you use GraphQL in Python without effort.
- Relay: Graphene has builtin support for Relay.
- Data agnostic: Graphene supports any kind of data source: SQL (Django, SQLAlchemy), NoSQL, custom Python objects, etc. We believe that by providing a complete API you could plug Graphene anywhere your data lives and make your data available through GraphQL.

####Integrations

Graphene has multiple integrations with different frameworks:

- Django - graphene-django
- SQLAlchemy - graphene-sqlalchemy
- Google App Engine - graphene-gae
- Peewee - In progress (Tracking Issue)

Also, Graphene is fully compatible with the GraphQL spec, working seamlessly with all GraphQL clients, such as Relay, Apollo and gql.


####Installation

For instaling graphene, just run this command in your shell

```
pip install "graphene>=2.0"
```

####Examples

```python
Here is one example for you to get started:

class Query(graphene.ObjectType):
    hello = graphene.String(description='A typical hello world')

    def resolve_hello(self, info):
        return 'World'

schema = graphene.Schema(query=Query)
```

Then Querying graphene.Schema is as simple as:

```python
query = '''
    query SayHello {
      hello
    }
'''
result = schema.execute(query)
```