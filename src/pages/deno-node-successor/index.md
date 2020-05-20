---
title: Deno - Node.js successor (?)
date: '2020-05-20T13:37:00.284Z'
image: "deno_feat.png"
author: Tomek
---

A while ago the dev world heard the news that Ryan Dahl, who previously created Node.js, has released a new JavaScript & TypeScript scripting environment.

**[Deno](https://deno.land/)** is based on V8 and written in Rust & TypeScript and it aims to provide a productive and secure scripting environment that a modern programmer needs.

## What's wrong with Node?

> *At times Node is like nails on a chalkboard to me.* - Ryan Dahl 

In 2018 during a JSConf Ryan Dahl gave a keynote speech called *"Design Mistakes in Node"* where he highlighted some of the most disturbing him Node's flaws or, as he called them, *his regrets* like:
- the build system (sticking to GYP)
- removing promises
- node modules
- security flaws i.e. linter having full access to your device & network

and some more. During that talk, he has also shown the world **Deno's prototype**.


![Node modules flaws](node_modules_flaws.png)

## Why Deno?

Deno is an anagram for Node and it aims to do the same job as a Node in a better way. Deno comes with some pretty interesting built-in features & concepts:

- **Secure by default** - utilize the fact that JavaScript is a secure sandbox. Deno has no file, network, or environment access unless explicitly enabled.
- **TypeScript Support** - TypeScript is great & Deno supports TypeScript out of the box.
- **Simplified modules system** - with no attempt to achieve compatibility with Node modules, Deno offers totally different & simplified approach where standard modules are hosted at `[deno.land/std](deno.land/std)` and are distributed via URLs (you can still use third party modules from any location on the web)
- **Single executable** - Deno ships only a single executable with minimal linkage


## Will Deno replace Node.js?

Deno is a new kid on the block. It offers some major improvements to some of the Node weaknesses. Although it rapidly gained a lot of attention **(almost 60K stars on GitHub)**, it's just a 1.0 version and it's defiantly not production-ready yet. Despite its many flaws, Node.js is the widest use & mature JavaScript runtime. There are thousands of hudge, corporate projects running it and they will keep doing so. Deno is  worth keeping your eyes on & if you are interested in its concept and learning more about Deno you should definitely watch Rayan's keynote:

[![10 things I regret about Node.js by Ryan Dahl](jsconf.png)](https://www.youtube.com/watch?v=M3BM9TB-8yA)

