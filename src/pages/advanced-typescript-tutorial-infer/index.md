---
title: Advanced typescript tutorial - infer
date: '2018-12-05T13:23:04.284Z'
author: Artur
---
Hello, this is starting the article for advanced typescript tutorial series. Today I'll cover basic usage of:

```typescript
infer
```

 For me, it was hard to understand at the beginning what I can really do with `infer`. Let's start with a really basic example.

```typescript
type FlattenIfArray<T> = T extends (infer R)[] ? R : T
```

So let's analyze this code:

1. We check if our generic Type is the array
2. If it is array extract the real type from it
3. If it does not leave it as is

Still, it is not clear what infer is doing, so let's proceed with another example

```typescript
type Unpromisify<T> = T extends Promise<infer R> ? R : T
```

This one looks more clear as it doesn't have parenthesis:

1. We check if type extends Promise
2. If it does we extract the type from the promise
3. If it does not leave it as is

See? If you use extends only just to check if the type is a promise you would use

```typescript
type Unpromisify<T> = T extends Promise<any> ? T : never
```

And in infer instead of any keyword, you infer the value from type. Let's try with more advanced types then:

```typescript
type FuncWithOneObjectArgument<P extends { [x: string]: any }, R> = (
  props: P
) => R;

type DestructuredArgsOfFunction<
  F extends FuncWithOneObjectArgument<any, any>
> = F extends FuncWithOneObjectArgument<infer P, any> ? P : never;

const myFunction = (props: { x: number; y: number }): string => {
  return "OK";
};

const props: DestructuredArgsOfFunction<typeof myFunction> = {
  x: 1,
  y: 2
};
```

Intellisense for props works like this:
![intellisense.png](intellisense.png)

You can make use of it inferring React Component props for example or another function that uses destructured params.