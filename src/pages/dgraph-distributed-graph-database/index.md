---
title: Code Academy - Dgraph a distributed graph database you need to know
date: '2019-01-29T13:37:00.284Z'
image: "gql.png"
author: Tomek
---

Welcome to our Code Academy series in which we will try to present you useful tool, libraries and methods. This week we will focus on a Dgraph, a very promisng graph database.
[Dgraph](https://dgraph.io/) is an open-source distributed graph database aimed at providing high production-level scale, efficient enough to be serving real-time user queries. Dgraph uses [GraphQL](https://graphql.org/) as its default query language and responds in JSON. There has been a lot of talk in the media about Dgraph about a year ago when the company announced that it has raised [$3 million in funding](https://techcrunch.com/2017/12/19/dgraph-raises-3m-for-its-open-source-distributed-graph-database-hits-1-0-release/).

![Dgraph.io](logo.png)

###  Dgraph
Dgraph is a distributed, highly available graph database. Unlike GraphQL,  there is no concept of complex types or groups of properties. Dgraph defines the schema for properties within the graph, so you can store any GraphQL schema in Dgraph.

Dgraph cluster consists of three different nodes, each serving a different purpose:

- Dgraph Zero -  responsible for the Dgraph cluster; it assigns servers to a group, balances data between them (required)

- Dgraph Alpha - responsible for predicates and indexes (required)

- Dgraph Ratel - serves the UI to run queries, mutations & schema alterations.

### Starting with DgraphQL

If you want to give it a try the easiest way to do it is to use Docker (you will need also [Docker Compose](https://docs.docker.com/compose/install/)).

```sh
docker pull dgraph/dgraph
```
Once you have Docker Compose installed to start up Dgraph put below code in your docker-compose yaml file.
```yml
version: "3.2"
services:
zero:
 image: dgraph/dgraph:latest
 volumes:
   - type: volume
     source: dgraph
     target: /dgraph
     volume:
       nocopy: true
 ports:
   - 5080:5080
   - 6080:6080
 restart: on-failure
 command: dgraph zero --my=zero:5080
server:
 image: dgraph/dgraph:latest
 volumes:
   - type: volume
     source: dgraph
     target: /dgraph
     volume:
       nocopy: true
 ports:
   - 8080:8080
   - 9080:9080
 restart: on-failure
 command: dgraph alpha --my=server:7080 --lru_mb=2048 --zero=zero:5080
ratel:
 image: dgraph/dgraph:latest
 volumes:
   - type: volume
     source: dgraph
     target: /dgraph
     volume:
       nocopy: true
 ports:
   - 8000:8000
 command: dgraph-ratel

volumes:
dgraph:

```

Let's take A Song of Ice and Fire (aka. Game of Thrones) books series as our data set:

```sh
curl localhost:8080/mutate -H "X-Dgraph-CommitNow: true" -XPOST -d $'
{
set {
 _:ned <name> "Eddard Stark" .
 _:robert <name> "Robbert Baratheon" .
 _:cersei <name> "Cersei Lannister" .
 _:joffrey <name> "Joffrey Baratheon".

 _:got1 <name> "A Song of Ice and Fire: A Game of Thrones" .
 _:got1 <release_date> "1996-08-01" .
 _:got1 <characters> _:ned .
 _:got1 <characters> _:robert .
 _:got1 <characters> _:cersei .
 _:got1 <characters> _:joffrey .

 _:got2 <name> "A Song of Ice and Fire:A Clash of Kings" .
 _:got2 <release_date> "1998-11-16" .
 _:got2 <characters> _:cersei .
 _:got2 <characters> _:joffrey .


 _:got3 <name> "A Song of Ice and Fire: A Storm of Swords" .
 _:got3 <release_date> "2000-08-08" .
 _:got3 <characters> _:cersei .
 _:got3 <characters> _:joffrey .
  }
}
' | python -m json.tool | less

```

You can alter your schema by adding indexes on some of data. This will allow queries to very convenient features as term matching, filtering and sorting:

```sh
curl localhost:8080/alter -XPOST -d $'
name: string @index(term) .
release_date: date @index(year) .
' | python -m json.tool | less
```
Having that done you can either query for all the books:
```sh
curl localhost:8080/query -XPOST -d $'
{
me(func: has(characters)) {
 name
}
}
' | python -m json.tool | less
```
or query for just those published after year 2000:
```sh
curl localhost:8080/query -XPOST -d $'
{
me(func:allofterms(name, " A Song of Ice and Fire")) @filter(ge(release_date, "2000")) {
  name
  release_date
  characters {
   name
  }
}
}
' | python -m json.tool | less
```
which will result in:

```json
{
"data":{
  "me":[
    {
      "name":"A Song of Ice and Fire: A Storm of Swords",
      "release_date":"2000-08-08",
      "characters":[
        {
          "name":"Cersei Lannister"
        },
        {
          "name":"Joffrey Baratheon"
        },
      ]
    },
  ]
}
}
```
And that's it! Thanks to Mr. Dgraph Ratel we have a filtered data we have queried for.

![Dgraph](dgraph.png)
Source: https://dgraph.io/








