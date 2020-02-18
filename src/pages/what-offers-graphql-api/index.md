---
title: What can GraphQL do for your API?
date: '2020-02-18T16:00:00.284Z'
image: "gql.png"
author: Carl
---

Whether weaved into an already existing application, or included as an integral part of an application's architecture from day one, an API is a powerful tool in a developer's arsenal. When properly implemented, it can be quite an important factor when it comes to designing the user experience, communicating between software components and providing the building blocks themselves. 

However, an unsatisfactory API may become more of a curse rather than a blessing:
- it can drive up the costs,
- case security problems,
- raise project’s complexity & deteriorate the ease of use in general

Let’s take a look at ways in which GraphQL can help avoid some of the pitfalls of making an API.

### Schema as a source of truth

If not carefully planned out, an API architecture can start bleeding money by ever-increasing management and infrastructure costs. GraphQL tackles this problem by forcing its developer to prepare a clearly defined schema ([GraphQL Editor comes in handy](https://graphqleditor.com/)) and, at the same time, limiting the amount of data returned specifically to the requested scope. Designing a schema should incorporate various ideas from a multitude of people working on or with the API in order to create a broad scope of possible use-cases. Due to the fact that schemas naturally evolve by deprecating some fields and adding new ones, this makes GraphQL an elegant answer to swollen, cumbersome APIs. The previously mentioned narrowing of data returns solves the common issue of over-fetching.

![GraphQL schema is the source of truth](schema.png)

### GraphQL makes it simpler

Another cause for a headache that a potential developer might encounter is excessive complexity combined with convoluted documentation. It is of the utmost importance to know how something behaves in certain conditions and why it works in a particular way. This is made nearly impossible, or at least not cost-effective, if the developer cannot find the answers that are sought in the documentation surrounding an API. GraphQL, having been adopted by many communities around the programming world, has the benefit of a continuously growing and largely active developer base. This greatly enhances the experience a potential engineer might have as it makes finding the right tools for the job quite simple.

### Security

Security needs to be taken into consideration. It is quite likely that an API can be explored by certain individuals as a possible gateway to extracting sensitive data or harming the application in other ways. Allowing such malicious attacks to affect the intended user can really tarnish one’s reputation as a reliable programmer. Although GraphQL allows for limiting the scope of possible queries to a prearranged whitelist, there are other, more flexible ways of handling the problem. Setting a cap on how many requests can be made in any given period of time is a common preventative measure for DDoS attacks.

![GraphQL Security](security.png)
##### Source: [undraw.co](https://undraw.co/)

### Conclusion
The very nature of GraphQL appears to solve many of the issues plaguing a plethora of other APIs. Furthermore, should any other problems arise, they will have surely been already tackled by the rich and vibrant community which surrounds this query language. These factors combined make GraphQL a very appealing option when considering implementing an API.

##### Sources:
##### [MarvelApp.com](https://blog.marvelapp.com/why-marvel-uses-graphql/)
##### [Netlify.com](https://www.netlify.com/blog/2020/01/21/advice-from-a-graphql-expert/)
##### [Devops.com](https://devops.com/challenges-of-designing-api-driven-experiences/)
