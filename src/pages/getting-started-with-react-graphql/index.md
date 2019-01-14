---
title: Getting started with React GraphQL
date: '2019-01-15T13:37:00.284Z'
image: 'gqlreact.png'
author: Tomek
---

In this GraphQL tutorial, we will show you how easy is implementing GraphQL in a React application. We’ll be using the [React Apollo](https://github.com/apollographql/react-apollo) library that allows you to fetch data from your GraphQL server and use it the [React](https://reactjs.org/) framework.

## Setup a project

Before you start make sure that you have Node.js installed. To get started we first need to set up a new React project. The easiest way to do so is to use [create-react-app](https://github.com/facebook/create-react-app), which allows you to create a new React project with zero build configuration.

```
$ npx create-react-app my-graphql-project
$ cd my-graphql-project
$ npm start
```

## Install dependencies

Once you have above done the next step will be to install dependencies. You can do it with a single NPM command which will install the following packages:

```
$ npm install apollo-boost react-apollo graphql graphql-tag
```

- `apollo-boost`: a package with all necessary Apollo Client components
- `react-apollo`: a view layer for React
- `graphql` & `graphql-tag`: both required to parse GraphQL queries

## Create a client

Now you need to create an instance of [Apollo Client](https://github.com/apollographql/apollo-client). You can do it `App.js` by adding the following code:

```jsx
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({
  uri: '[Put your GraphQL endpoint URI here]',
})
```

## Create GraphlQL Endpoint

To start with, all you really need is the endpoint for your GraphQL server. You can define it in `uri` or it will be `/graphql` endpoint on the same host as your app by default.

## Connect your React app with Apollo

To connect the Apollo Client to React use the `ApolloProvider` component exported from `react-apollo`. The `ApolloProvider` works simillar to React’s context provider:

- it wrapps your React app,
- places the client on the context,

giving you access to it anywhere in your component tree.

```jsx
import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({
  uri: '[Put your GraphQL endpoint URI here]',
})
const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h1>My app</h1>
    </div>
  </ApolloProvider>
)

render(<App />, document.getElementById('root'))
```

## You made it!

Now, once your first React + GraphQL app is up and running you can start fetching some data with GraphlQL Queries have fun!
