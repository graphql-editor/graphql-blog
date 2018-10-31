---
title: GraphQL newbie tutorial - introduction
date: '2018-10-31T10:23:04.284Z'
author: Robert
---

I’m Robert - Head of Growth at grapqhleditor.com. I’m responsible for every non-tech part of the project -  talking with users, building feature roadmap, building traffic and promoting it in tech community. To grow my tech skills I’ve also decided to learn GraphQL. Since I’m a newbie, this tutorial is also for newbies.

## Where GraphQL came from?

GraphQL was introduced in 2015 by Facebook as an alternative to REST. Back then It wasn’t just an experiment - it was already in production inside facebook mobile apps since 2012.  Just after public release, It became extremely popular, and around that time many companies were working on similar solutions. This technology started to gain attention since it can be used with many other languages and there’re many ready to go libraries to most popular styles. Right now according to Stackshare there’re nearly 2k companies using it. Early adopters included Coursera, Github, ProductHunt, Yelp or Twitter.

## What is GraphQL?

To introduce GraphQL we I’ll use an example of data and compare functionality with REST. This example will show you why new technology is more efficient, simpler to use and what was motivation to create it. 

Let’s assume that we are creating a backend for application with two versions (web and mobile). The core of the system will contain information about football players, teams they played and some other details. Mobile version of the application should show less information.

| Web                       | Mobile     | 
| -------------| -------------| 
| Name| Name| 
| Bio| Team (Years)|   
| Team (Description, Years) | Team (Years)|   
| Team (Description, Years) ||   

If we would create API based on REST, therefore, we would need to write two requests:


    GET /player/{id}
    {
      "id": „101”
      "name": „David Beckham”
      "bio": „…”
      „age”: „43”
    }


    GET /player/{id}/teams
    {
      „Teams”: [{
        „id": „201”,
        „name”: „Real Madrid”,
        „description": „…”,
        „goals”: „…”,
        „matches”: „…”,
        „years”: „2003-2007”
      },
      ...
      ]
    }

By looking at the response, you can see that we get more data than we need in both cases. It is essential in mobile apps because of mobile data and the speed of loading.  Of course, we could overcome that by writing different endpoints which will get us only what we want. Another way is to implement API in a way that we could choose what we want I.e. GET /player/{id}/teams?only=name. But that’s hard the solution to maintain in agile software development where requirements are changing every week.


## Opposite to that, we can introduce GraphQL.

Backend with GraphQL is more flexible because it has only one endpoint. Customers write a query and specify what do you want exactly and gets data in JSON. In our football example, we can create queries for each platform (web and mobile).

**Web application:**

    query {
      player(id: "101") {
        name
        bio
        teams {
          title
          description
        }
      }
    }

**Resposne:**

    {
      "data": {
        "player": {
          "name": "David Beckham",
          "bio": "...",
          "teams": [{
            "title": "Real Madrid",
            "description": "..."
          }, ...]
        }
      }
    }

**Mobile app**

    query {
      player(id: "101") {
        name
        teams {
          title
        }
      }
    }

**Resposne:**

    {
      "data": {
        "player": {
          "name": "David Beckham",
          "teams": [{
            "title": "Real Madrid"
          }, ...]
        }
      }
    }

As you can see with each query, we are getting only what we want. That’s the power of GraphQL - flexibility. You don’t need to create endpoints for different screens. Various clients can use a once defined schema in a way that they need to.


## Fewer requests.

In traditional REST approach usually, there are many GET requests to show data on one screen. It’s not super efficient when it comes to mobile apps - it slows them down and needs more internet data transfer. GraphQL allows a user to create only one endpoint. Thanks to technology introduced by Facebook engineers communication between client and a server is better optimised.


## Query language

The most important feature of GraphQL is that it’s language agnostic. It’s not created to work with specific technology. It’s a query language with its own rules which for most popular programming languages. There’re many supportive libraries on the internet for: C#/.NET, PHP. Javascript, Java, Python, Ruby and many more.


## Summary

GraphQL is a query language and runtime that we can use to build and expose APIs as a strongly-typed schema instead of hundreds of REST endpoints. Your clients see the schema. They write a query for what they want. They send it over and get back exactly the data they asked for and nothing more. GrapqhQL advantages:

- fewer data and requests for mobile apps,
- simplicity and visible API structure
- can be used with many technologies
- is used by Twitter, Facebook, Github and many more