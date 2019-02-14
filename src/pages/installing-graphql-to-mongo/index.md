---
title: Installing MongoDB for GraphQL
date: '2019-01-22T13:37:00.284Z'
image: "gql.png"
author: Artur
---

GraphQL is a query language for APIs that was originally built by Facebook.
Its biggest advantage is making a lot easier to get the data you actually need from a query. Today we will show you how to set up MongoDB with GraphQL.



## Install MongoDB with Homebrew

First you need to install a [Homebrew](brew.sh). To do it go to Visual Code Studio and run this line from [Brew.sh](brew.sh):
 ```
 /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
 ```

Now you should have your Homebrew installed. If you had it already installed, we suggest to do a brew update before proceeding, then you can install MongoDB:

```sh
$ brew update
$ brew install mongo
```
What you need to do now is to go to a root directory, create the directory for the database and set its permissions, then you can star Mongo:

```sh
$ sudo mkdir -p /data/db
$ sudo chmod 777 /data/db
$ mongod
```
Et voila! We have it installed and running.

## Mongoose
[Mongoose](https://mongoosejs.com/) provides a straight-forward, schema-based solution to model your application data.
It includes:
- built-in type casting, 
- validation, 
- query building, 
- business logic hooks


So let's install Mongoos. Make sure you are in the right directory and use `$npm install`:
```sh
$ npm install --save mongoose
```

## Connecting Mongo
Create a new folder and move your `resolvers.js` and `schema.js` files there. Remember to update your `index.js` file to make sure everything will be correctly imported here. Once we have it done we can create a new file in our fresh folder which we will use to connect Mongo to our databases, let's call it `connect.js`.

```jsx
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect =('mongodb://localhost/users', {
    useMongoClient: true
});
```
When we have it done we can start creating our schema for Mongo with the same elements as our original schema.

```jsx
const usersSchema = new mongoose.Schema({
    name: 
        type: String
    }
})
```
The next important step is to create a value to our variable with that model inside, passing the schema and export:

```jsx
const Users = mongoose.model('users', usersSchema)
export {Users};
```
Now let's create some GraphQL resolvers. So let's go to `resolvers.js` and start with importing Mongoose and Users into resolvers:

```jsx
import mongoose from 'mongoose';
import { Users } from './connect';

export const resolvers ={
    Query: {
        getUser: ({id}) => {
            return new User (id, userDatabase[id]);
        },
    },
    Mutation: {
        createUser: (root, { input}) => {
            const newUser = new Users({
                name: input.name,
            });

            newUser.id = newUser._id;

            return new Promise((resolve, object)) =>
                newUser.save((err) => {
                    if (err) reject (err)
                    else resolve(newUser)
                })
            })    
        },
    },
};
```

In next part we will create nodejs GraphQL server. Stay tuned!

![Done!](done.gif)




