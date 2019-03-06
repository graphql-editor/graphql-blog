---
title: GraphQL Performance issues and how to handle them
date: 2019-03-06T13:37:00.284Z
image: gql.png
author: Tomek
---


One of biggest [GraphQL](https://graphql.org/) flaws is missing of some basic implementation know from which are crucial for application performance. A simple [GraphQL server](https://graphql.org/graphql-js/running-an-express-graphql-server/) comes without a built-in caching or batching mechanism. This might cause some problems for you apps.


### Redundant calls ... lots of redundant calls

GraphQL is about querying for specific fields on objects. The `fields` are intended to be stand-alone functions which means that unsophisticated GraphQL server might produce redundant calls to issue new database requests each time a `field` is resolved.

Let’s take a simple [GraphQl Blog](https://blog.graphqleditor.com/) as an example. Our blog will use pagination to load faster, let’s say that we want to display 5 at once.

We want to get our posts along with their authors names. Our author’s details is a standard ‘user’ fields that has its own resolver so we need:
- 1 call for list of our blog posts
- 5 calls to get authors for each post (we need to get user for each resolver)

But what if these posts have comments? Let’s say that each blog post has 2 comments and of course each comment has its author, this gives as:

- 1 call for list of blog posts
- 5 calls for authors of each post
- 5 calls to get lists of comments of each post
- 10 calls to get the comments’ authors

This gives us 21 calls. What if we have 10 or 20 comments under each posts? The number of calls will skyrocket and this will cause serious issue with the application loading time.

![](2v9ltl.jpg)

### Batching & Caching
Fortunately there is a solution! [Dataloader](https://github.com/facebook/dataloader) is a utility developed by Facebook dev team that lets you batch and cache database calls.

**Batching** is DataLoader's primary feature. When Dataloader sees that you’re hitting same table multiple times, it’ll batch all calls together i.e. 5 blog posts’ authors & 10 comments’ authors would be batched in a one call.
 
To get started you need  to create loaders by providing a batch loading function.

```jsx
var DataLoader = require('dataloader')

var userLoader = new DataLoader(keys => myBatchGetUsers(keys));
```
The function accepts an Array of keys and returns a Promise which resolves to an Array of values.  You need to load individual values from the loader. DataLoader will merge individual loads which occur the same time and then call your batch function with all requested keys.
```jsx
userLoader.load(1)
  .then(user => userLoader.load(user.invitedByID))
  .then(invitedBy => console.log(`User 1 was invited by ${invitedBy}`));

// Elsewhere in your application
userLoader.load(2)
  .then(user => userLoader.load(user.lastInvitedID))
  .then(lastInvited => console.log(`User 2 last invited ${lastInvited}`));
```
 **Caching** is another DataLoader’s feature.  Each `DataLoader`  instance represents a unique cache and when Dataloader detects that two blog posts, comments or their combination have the same author instead of making a new database call it will reuse the object it already has in memory.
 

If you want to make sure that your application running as smooth as possible I highly suggest trying DataLoader. Read more about the implemenation of DataLoader check its [GitHub repo](https://github.com/facebook/dataloader) or watch *"DataLoader - Source code walkthrough"* by [Lee Byron](https://twitter.com/leeb), one of the GraphQL creators.

[![DataLoader - Source code walkthrough](https://camo.githubusercontent.com/64fd0e9834838f60049778fc800e7af18ff74f3c/68747470733a2f2f696d672e796f75747562652e636f6d2f76692f4f51546e584e43447977412f302e6a7067)](https://www.youtube.com/watch?v=OQTnXNCDywA&feature=youtu.be)


