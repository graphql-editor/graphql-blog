---
title: Generate GraphQL resolvers easily with GraphQL Centaur CLI
date: '2020-04-21T15:10:00.284Z'
image: "cent_logo_b.png"
author: Tomek
---

 **[GraphQL Centaur](https://github.com/graphql-editor/graphql-centaur)** is a CLI tool with a goal to provide seamless experience creating GraphQL as a service. 

GraphQL Centaur generates Mongo/[Stucco-js](https://github.com/graphql-editor/stucco-js) database resolvers in TypeScript from any give GraphQL Schema.

Generate fully-functional basic resolvers with Centaur CLI, customize them the way that suits your project and enjoy your GraphQL based backend.

## Installation

If you want to install GraphQL Centaur globally run:
```
npm i -g graphql-centaur
```
to install it inside your backend repo performer:
```
npm i graphql-centaur
```
then use with `npx` or as a `package.json` script.


|Database|Support|
|--------|----------|
|MongoDB|YES|
|JavaScript|YES| 
|TypeScript|YES|
|PostgreSQL|SOON|





## Resolver generation

First time when you generate a resolver centaur will also generate needed libraries for collections, DB, Utils and [graphql-zeus](https://github.com/graphql-editor/graphql-zeus) definitions, then given the following schema:

```tsx
type Person{
    firstName: String!
}
type Query{
    people: [Person]!
}
schema{
    query: Query
}
```

after choosing the following elements:

- `Query`
- `people`
- `CRUD`
- `listFilter`

GraphQL Centaur should generate TypeScript resolver placed in `$src/Query/people.ts` directory:

```tsx
import { FieldResolveInput, FieldResolveOutput } from "stucco-js";
import { PersonCollection } from "../db/collections";
import { DB } from "../db/mongo";
import { Utils } from "../Utils";
import { Person, ResolverType, ValueTypes } from "../graphql-zeus";

export const handler = async (): Promise<FieldResolveOutput> => {
    const db = await DB();
    const col = await db.collection(PersonCollection);
    return Utils.CursorToGraphQLArray<Person>(
        await col.find({}),
    );
};
```

and append correct entries to the [`stucco.json`](https://github.com/graphql-editor/stucco-js) file:

```tsx
{
    "resolvers":{
        "Query.people":{
            "resolve":{
                "name":"lib/Query/people"
            }
        }
    }
}
```

After running **[Stucco-js](https://github.com/graphql-editor/stucco-js)**, your resolver should work out of the box. Of course, some resolver types, however, might need a little bit of custom code to make them work the way you want, but basically **you have just generated your GraphQL Backend!**

## Available Resolvers

Resolvers are split into the following categories:

|Category|Resolver|Desc|
|--------|----------|----------|
|**CRUD**|*Create*|Create an object in your database and return it|
|**CRUD**|*Update*|Update an object in your database and return it|
|**CRUD**|*List*|List all objects of selected type|
|**CRUD**|*Get* by parameter|Get object by parameter from the database|
|**CRUD**|*Remove*|Remove an object from the database and return true|
|**COMMON**|*Pipe*|Pipe the arguments of the query as the source for the next resolver|
|**COMMON**|*Resolver*|Simple Resolver you need to write|
|**COMMON**|*Rest*|Rest proxy resolvers for pointing to existing REST APIs|
|**COMMON**|*Source*|A Resolver that receives source from the parent resolver|
|**COMMON**|*SourcedCRUD*|The same as CRUD, but also use source|

GraphQL Centaur is also compatible with [GraphQL Editor projects](https://graphqleditor.com/).
