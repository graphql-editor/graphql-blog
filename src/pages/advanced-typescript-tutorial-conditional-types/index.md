---
title: Advanced typescript tutorial - conditional types
date: '2018-12-11T09:23:04.284Z'
author: Artur
---

Hello This is second article of advanced typescript tutorial series. Today I'll cover basic usage of

```typescript
extends
```

keyword and conditional types. How does conditional type looks like?
```typescript
type StringOrArray<T> = T extends string[] ? 'array' : T extends string ? 'string' : never
const a:string = "hello"
const b:string[] = ["hello","world"]
const c:number = 1

const d:StringOrArray<typeof a> = "string"
const e:StringOrArray<typeof b> = "array"
let f:StringOrArray<typeof c> 
```

So lets analyze this code:

1. We check if our generic Type is string array
2. If it is array make type as string constant 'array'
3. If it is not check the type. If it is string make type as string constant 'string'
4. Else the type is never
   
To be truth this code is useless but can give you some scope how `extends` keyword works. Next example will be real world example where we determine the type of the form field to give user correct options.

```typescript
type FieldType = "string" | "float" | "date"

type BaseField = {
    name:string
}

type Field<T extends FieldType> = BaseField & {
    value: T extends "string" ? string : T extends "float" ? number : T extends "date" ? Date : never
}

const stringField:Field<"string"> = {
    name:"myfield",
    value:"aaa"
}
const floatField:Field<"float"> = {
    name:"myfield",
    value:1.0
}

const dateField:Field<"date"> = {
    name:"myfield",
    value: new Date()
}
```

This is a little bit more advanced. Whats going on with FieldType? It just checks the string converted to generic type to return correct type.

```typescript

type FieldType = "string" | "float" | "date";
type BaseFieldExtended = {
  name: string;
  type: FieldType;
};
const FieldExtended = <T extends BaseFieldExtended>(
  baseField: T & {
    value: T["type"] extends "string"
      ? string
      : T["type"] extends "date"
      ? Date
      : T["type"] extends "float"
      ? number
      : never;
  }
) => baseField;

FieldExtended({
  name: "a",
  type: "string",
  value: "bbb"
});

FieldExtended({
  name: "a",
  type: "float",
  value: 12
});

FieldExtended({
  name: "a",
  type: "date",
  value: new Date()
});

```

And this is what typescript is made for. To provide complicated autocompletion stuff :). Wait for next series of advanced typescirpt tutorial.