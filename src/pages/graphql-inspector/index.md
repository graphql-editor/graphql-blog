---
title: GraphQL Inspector
date: '2019-05-22T13:37:00.284Z'
image: inspector.png
author: Tomek
---

[GraphQL](https://graphql.org/) is really about collaboration, and the teams that get furthest are those who can work seamlessly together on their GraphQL API.

This idea is well-known for the members of [The Guild](https://github.com/the-guild-org) know from open-sourcing amazing graphql tools. Its members work constantly on new solutions aiming to automate & increase the type-safety of our GraphQL projects. After open-sourcing such tools as [GraphQL Code Generator](https://graphql-code-generator.com/) or [GraphQL Modules](https://graphql-modules.com/), their next work seen daylight - the [GraphQL inspector](https://graphql-inspector.com/)


[GraphQL Inspector](https://graphql-inspector.com/) is a tool published by [Kamil Kisiela](https://github.com/kamilkisiela/), that detects changes, similar or duplicated types, validates documents against a schema and looks for deprecated usage. 

![Example](https://thepracticaldev.s3.amazonaws.com/i/em7rri7pnzleik7b6era.jpg)

**Key features/commands:**
- [diff](https://graphql-inspector.com/docs/essentials/diff) - that detects breaking or dangerous changes,
- [validate](https://graphql-inspector.com/docs/essentials/validate) - validates documents against a schema & searches for deprecated usage,
- [similiar](https://graphql-inspector.com/docs/essentials/similar) - lists similar types in order to find duplicates,
- [coverage](https://graphql-inspector.com/docs/essentials/coverage) - finds unused parts of GraphQL Schema based on clients’ fragments & operations.



The tool is available as:
- [CLI tool](https://graphql-inspector.com/docs/installation)
![GraphQL Inspector CLI](https://thepracticaldev.s3.amazonaws.com/i/ew294o56vnh5kr93e3f4.gif)

- [Github Application](https://github.com/apps/graphql-inspector)
![GraphQL Inspector GitHub](https://thepracticaldev.s3.amazonaws.com/i/1wxx8ev382cfgplycl4s.jpeg)
##### Source: [GraphQL Inspector](https://graphql-inspector.netlify.com/)

There is also a [programmatic API](https://graphql-inspector.com/docs/api/schema) available in case you want to build something on the top of it on your own.
