---
title: InQL Scanner - find security flaws in your GraphQL code
date: '2020-04-10T13:37:00.284Z'
image: inql-feature.png
author: Jakub
---


If you’ve ever struggled to find vulnerabilities in your GraphQL code, this tool should be able to help. **InQL Scanner**, developed by [Doyensec](https://www.doyensec.com/) Research Island initially for their internal use, is now free to use and [available on GitHub](https://github.com/doyensec/inql). InQL Scanner is a stand-alone security tool, but its use can broaden by using it as a Burp Suite extension. It enables you to quickly extract and inspect metadata information. You can then more easily identify security issues which due to the descriptive nature of GraphQL would be otherwise hard to detect.

## What does it do?

Using InQL command from Python will result in issuing an Introspection query for **queries**, **mutations**, and **subscriptions**, as well as their respective fields and arguments. Optional arguments include targeting Remote GraphQL Endpoints, accessing API Authentication Key, replacing known GraphQL argument types with placeholder values, and generating documentation. The results can be generated in HTML or JSON schema formats.

![Secure your GraphQL code](secure-graphql.png)
##### Source: [undraw.co](https://undraw.co/)

## Burp Suite Extension

As Doyensec is considering integrating InQL with [Burp’s BApp Store](https://portswigger.net/bappstore), it is good to have a closer look at the functionality of the extension. According to the creators of the scanner, it enables you to:
- Search for known GraphQL URL paths; the tool will grep and match known values to detect GraphQL endpoints within the target website,
- Search for exposed GraphQL development consoles (GraphiQL, GraphQL Playground, and other common utilities),
- Use a custom GraphQL tab displayed on each HTTP request/response containing GraphQL,
- Leverage the template generation by sending those requests to Burp’s Repeater tool,
- Configure the tool by using a custom settings tab,

while maintaining the basic functionality of the tool described in the last paragraph. Instructions on how to use the tool, examples of documentation pages, and templates generation are available on [InQL GitHub page](https://github.com/doyensec/inql).

## Are there any downsides?

InQL is definitely worth trying out and running your code through it. InQL Scanner itself is a handy tool, however, its functionality seems to be limited in the stand-alone version. Using it as a Burp Suite extension significantly increases the scope of the tool’s functionality. And if you’re not satisfied with Burp’s essential manual tools, acquiring an extended license will cost you ~ €349 per user, per year. As GraphQL is rapidly growing in popularity, we should expect that there will be more and more people taking advantage of its limitations. Securing your code may be a good investment now before the frequency and severity of the attacks against it increases.
