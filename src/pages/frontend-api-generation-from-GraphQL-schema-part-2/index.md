---
title: Frontend API generation from GraphQL schema part 2 - journey to very generic types - How to do it properly
date: '2018-11-30T15:23:04.284Z'
author: Artur
image: graphql.gif
---

GraphQL Editor now generates API lib from graphQL schema!

This article will be about advanced TypeScript types. We used them in our graphql-editor to introduce safe typed queries which is most wanted feature in graphql editor. Usage of advanced types enabled us to provide generated typescript lib for your graphql schema.

## How it works?

GraphQL Editor generates api lib from graphql schema/url. To make it work:

1. navigate to [GraphQL Editor Demo](https://demo.graphqleditor.com) and import your schema from file or URL or if you want to just complete tutorial use this one `https://countries.trevorblades.com/` found this one on internet.
2. click typescript tab
3. click Copy button located on the bottom of menu
4. create .ts file in your TS project and copy the contents into it
5. Your file should look like this one:

```typescript
export type Upload = any

export enum CacheControlScope {
  PUBLIC,
  PRIVATE,
}

export type Language = {
  code?: string
  name?: string
  native?: string
  rtl?: number
}

export type Country = {
  code?: string
  name?: string
  native?: string
  phone?: string
  continent?: Continent
  currency?: string
  languages?: Language[]
  emoji?: string
  emojiU?: string
}

export type Continent = {
  code?: string
  name?: string
}

export type Query = {
  continents: (props: {}) => Continent[]
  continent: (
    props: {
      code?: string
    }
  ) => Continent
  countries: (props: {}) => Country[]
  country: (
    props: {
      code?: string
    }
  ) => Country
  languages: (props: {}) => Language[]
  language: (
    props: {
      code?: string
    }
  ) => Language
}
type Func<P extends any[], R> = (...args: P) => R
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any>
  ? P
  : never

type GraphQLResponse = {
  data?: {
    [x: string]: any
  }
  errors?: {
    message: string
  }[]
}

class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super('')
    console.error(response)
  }
  toString() {
    return 'GraphQL Response Error'
  }
}
type Dict = {
  [x: string]: Dict | any | Dict[] | any[]
}

type ResolveReturned<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveReturned<R>[]
    : T[P] extends {
        [x: string]: infer R
      }
      ? ResolveReturned<T[P]>
      : T[P] extends Func<any, any> ? ResolveReturned<ReturnType<T[P]>> : T[P]
}

export type State<T> = ResolveReturned<T>

type GraphQLDictReturnType<T> = T extends Func<any, any>
  ? ResolveReturned<ReturnType<T>>
  : T

type ResolveArgs<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveArgs<R>
    : T[P] extends {
        [x: string]: infer R
      }
      ? ResolveArgs<T[P]>
      : T[P] extends Func<any, any>
        ? [ArgsType<T[P]>[0], ResolveArgs<ReturnType<T[P]>>]
        : true
}
type GraphQLReturner<T> = ResolveArgs<T>

type FunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<GraphQLDictReturnType<T>>
type fetchOptions = ArgsType<typeof fetch>

const joinArgs = (q: Dict) =>
  Array.isArray(q)
    ? `[${q.map(joinArgs).join(',')}]`
    : typeof q === 'object'
      ? `{${Object.keys(q)
          .map(k => `${k}:${joinArgs(q[k])}`)
          .join(',')}}`
      : typeof q === 'string'
        ? `"${q}"`
        : q
const resolveArgs = (q: Dict): string =>
  Object.keys(q).length > 0
    ? `(${Object.keys(q)
        .map(k => `${k}:${joinArgs(q[k])}`)
        .join(',')})`
    : ``

const isArrayFunction = a => {
  const [values, r] = a
  const keyValues = Object.keys(values)
  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            v =>
              `${v}:${
                typeof values[v] === 'string'
                  ? `"${values[v]}"`
                  : JSON.stringify(values[v])
              }`
          )
          .join(',')})${traverseToSeekArrays(r)}`
      : traverseToSeekArrays(r)
  return argumentString
}

const resolveKV = (
  k: string,
  v: boolean | string | { [x: string]: boolean | string }
) =>
  typeof v === 'boolean'
    ? k
    : typeof v === 'object'
      ? `${k}{${objectToTree(v)}}`
      : `${k}${v}`
const objectToTree = (o: { [x: string]: boolean | string }) =>
  `{${Object.keys(o).map(k => `${resolveKV(k, o[k])}`)}}`
const traverseToSeekArrays = a => {
  let b = {}
  Object.keys(a).map(k => {
    if (Array.isArray(a[k])) {
      b[k] = isArrayFunction(a[k])
    } else {
      if (typeof a[k] === 'object') {
        b[k] = traverseToSeekArrays(a[k])
      } else {
        b[k] = a[k]
      }
    }
  })
  return objectToTree(b)
}

const buildQuery = a =>
  traverseToSeekArrays(a).replace(
    /\"([^{^,^\n^\"]*)\":([^{^,^\n^\"]*)/g,
    '$1:$2'
  )

const construct = (
  t: 'query' | 'mutation' | 'subscription',
  name: string,
  args: Dict = {}
) => (returnedQuery?: string) => `
      ${t === 'query' ? '' : t}{
        ${name}${resolveArgs(args)}${returnedQuery}
      }
`

const apiFetch = (options: fetchOptions, query: string, name: string) =>
  fetch(`${options[0]}?query=${encodeURIComponent(query)}`, options[1] || {})
    .then(response => response.json() as Promise<GraphQLResponse>)
    .then(response => {
      if (response.errors) {
        throw new GraphQLError(response)
      }
      return response.data[name]
    })

const fullConstruct = (options: fetchOptions) => (
  t: 'query' | 'mutation' | 'subscription',
  name: string
) => props => o =>
  apiFetch(options, construct(t, name, props)(buildQuery(o)), name)

export const Api = (...options: fetchOptions) => ({
  Query: {
    continents: (props => o =>
      fullConstruct(options)('query', 'continents')(props)(o).then(
        response => response as GraphQLDictReturnType<Query['continents']>
      )) as FunctionToGraphQL<Query['continents']>,
    continent: (props => o =>
      fullConstruct(options)('query', 'continent')(props)(o).then(
        response => response as GraphQLDictReturnType<Query['continent']>
      )) as FunctionToGraphQL<Query['continent']>,
    countries: (props => o =>
      fullConstruct(options)('query', 'countries')(props)(o).then(
        response => response as GraphQLDictReturnType<Query['countries']>
      )) as FunctionToGraphQL<Query['countries']>,
    country: (props => o =>
      fullConstruct(options)('query', 'country')(props)(o).then(
        response => response as GraphQLDictReturnType<Query['country']>
      )) as FunctionToGraphQL<Query['country']>,
    languages: (props => o =>
      fullConstruct(options)('query', 'languages')(props)(o).then(
        response => response as GraphQLDictReturnType<Query['languages']>
      )) as FunctionToGraphQL<Query['languages']>,
    language: (props => o =>
      fullConstruct(options)('query', 'language')(props)(o).then(
        response => response as GraphQLDictReturnType<Query['language']>
      )) as FunctionToGraphQL<Query['language']>,
  },
  Mutation: {},
  Subscription: {},
})
```

6. Create api function in separate .ts file looking more or less like this:

```typescript
import {Api} from

const api = Api("https://countries.trevorblades.com/",{})

api.Query.continents()({
    name:true,
    code:true
}).then(response => response.map(c => console.log(`Continent: ${c.name}`)))
```

7. You should be able to autocomplete queries from GraphQL!

![GraphQL Autocomplete in Action](graphql.gif)


## How it happened?


### Function to graphql type

```typescript
type FunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<GraphQLDictReturnType<T>>;
```
### Arguments Type
```ts
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any>
  ? P
  : never;
```

I found this type in very useful [github repo](https://github.com/LeDDGroup/ts-types-utils) it infers args type. I assume there is one object argument so thats why I take 0

### GraphQL returner type

```typescript
type GraphQLReturner<T> = T extends (infer R)[]
  ? ResolveArgs<R>
  : ResolveArgs<T>;
```

We check if it is array or not and resolve only returners of the base type and the journey continues

### Resolve Args

```ts
type ResolveArgs<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveArgs<R>
    : T[P] extends {
        [x: string]: any;
      }
    ? ResolveArgs<T[P]>
    : T[P] extends Func<any, any>
    ? [ArgsType<T[P]>[0], ResolveArgs<ReturnType<T[P]>>]
    : true
}
```
This one is more complicated so we will go through it step by step

1. We assume receiving an object as we disqualificated arrays in GraphQL returner type
2. We tak key as `[P in keyof T]?` and value as `T[P]`
3. If it is array we remove it as we do not need arrays in graphql returners
4. If value is an object we need to pass it through alo
5. If it is a Function we split it to array with 2 elements args and returner
6. Else its a true type so you write true if you want to have that part returned

### GraphQLDictReturnType

```typescript
type ResolveReturned<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveReturned<R>[]
    : T[P] extends {
        [x: string]: infer R;
      }
    ? ResolveReturned<T[P]>
    : T[P] extends Func<any, any>
    ? ResolveReturned<ReturnType<T[P]>>
    : T[P]
};
```

Quite same with some exceptions as args. The only difference is we infer Array just to resolve inside types and then we write it as array again.


## Enough?

Look these generic types are so powerful.