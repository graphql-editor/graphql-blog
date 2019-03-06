---
title: Code academy - backend development
date: '2019-02-05T11:13:04.284Z'
author: Robert
---

In this article, I'll cover a general introduction to backend development without a deep dive into the code. I'll provide you with languages and frameworks that you can learn and use a little bit of graphql as an example. If you're looking for more technical tutorials, please check other posts on our blog or other resources. 

If you're not a software developer terms like backend or front end development can give you a headache. Adding to that a long list of different tools, languages and frameworks it's confusing where to start.  However, there's good news - you don't need to learn coding to understand the basics. It's helpful to know the basics of typical tech stack whether any developer is working around you.

To help you understand more from backend development, we've divided this articles into few sections.

### What is backend?

Imagine a typical web application like Facebook or your online banking service - what comes to your mind? You have the visual part which is designed for human interaction and something behind. That's the easiest way we can describe front end (the visible part - colours, animations, layout, and all the stuff that you can experience) The backend is the internal engine of the application which includes things like the server, the database.

![https://dribbble.com/shots/5455567-Front-end-vs-Back-end](https://cdn.dribbble.com/users/1971934/screenshots/5455567/ezgif.com-resize.gif)

The backend is often described as a "server-side" opposite to "client-side" or "browser side" where the client sends a request to the backend by clicking on a specific button. The backend's the machinery that works silently behind the scenes.

![](https://i.imgur.com/UqIwgQL.jpg)

It's is essential to know that over last ten years that divide has changed a lot due to growing capabilities of Javascript and it's frameworks which can do more on the front end than before. This language can be both used on the front end and the backend by specific frameworks. We'll get back to that later.  

![](https://media3.giphy.com/media/4MwP0n2iPbkcM/giphy.gif)

A modern backend is a mix of the server, APIs, databases and operating systems that power an application's front end. Every app can use very different tools whether it’s the use of cloud-based servers and data warehouses, containerization with a service like Docker, APIs to replace more complex processing or Backend-as-a-Service providers. 

To start things, we’ll break the server side down into four main components: the server, the database, the operating system, and the software. In the next chapters, we'll explain more about each of these components of the backend.

### Servers

When you type any domain into a web browser that means you type server address. If you go deeper into specific sections of that website, you'll see that URL is extended with additional details. This include folder path, subdirectory locations and specific file names. Let's have a look at Google's logo. This particular address contains precise information on where exactly on the server file exists.

```
https://www.google.pl/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
```

As part of other components, the server is the heart of the system. It could be located locally on your computer or in a modern way in the cloud. You can imagine cloud as a group of connected computers. That network of computers can run various tasks including file storage, security and encryption, databases, email, and web services. The cheapest option of cloud servers is a shared virtual machine, a computer which are running many servers at the same time. More expensive one are dedicated machines which you can rent according to your needs. Shared servers are created in the process of virtualisation. 

![](https://media0.giphy.com/media/xTaWnRA9hNaYkYgGLS/giphy.gif?cid=3640f6095c59a35d3632546277261fcc)

The primary goal of virtualisation is to manage workloads by transforming traditional computing to make it more scalable. In operating system-level virtualisation, it is possible to run multiple operating systems on a single piece of hardware. Virtualisation technology involves separating the physical hardware and software by emulating device using the software.

One of a popular lightweight alternative to virtualisation is containerization. Imagine catching application into a virtual container with its environment. It provides benefits of loading an application onto a virtual machine, as the application can be run on any suitable physical computer without any worries. Containerization has gained recent fame with the open-source technology called Docker. Using containers, you can easily migrate apps between servers. 

![](https://media1.giphy.com/media/6AFldi5xJQYIo/giphy.gif)

As you’ve got the basics about on-site servers, expand your knowledge with a look at virtualisation, how servers get provisioned to house multiple apps, and containerization, another way servers provision their operating systems out to house compartmentalised applications.

### Databases

A database is storage of a collection of data. That may sound overly naive, but it pretty much sums up what any database is. A database could be as primary as a text file with a list of names. Alternatively, it could be as complex as a large, relational database management system, complete with in-built tools to help you maintain the data.

Any time you request something from a website or search a place to stay at Airbnb your front end sends a request to the database and creates a response. The data is transmitted back to the website, and you see the result of your actions. You can also update or edit data in your database from the visual interface. Imagine uploading pictures to Facebook or adding a description to your products in CMS.

A Database Management System (DBMS), is a tool that enables the management and creation of databases. Today most database systems are referred to as a Relational-DBMS, because of their capacity to store related data across multiple tables. When more than two tables contain related data, they have a relationship. You design your database in a way that defines which tables will have to be related. Most popular relational DBMS include Microsoft Access, SQL Server, MySQL.

Alternatively, to related databases we have NoSQL. It's a comprehensive term that doesn't describe any particular database type. It's a group of databases that don't fit into a relational model. Let's explore some examples: 
- Column store database,
- Graph databases that use a graphical model,
- Document store database that uses a document-oriented model,

### Backend developer

Back-end developers work with front-end developers by giving the outward facing web app elements of server-side logic. In other words, back-end dev's create the business logic to make the web app work correctly, and they achieve this through the use of back end scripting languages. Some of the regular responsibilities include: 

- Writing server-side code
- Interacting with database
- Writing code to communicate with the database 
- Deploying the system online so the app can be usable 
- Maintaining security of the code
- Maintaining code to be optimised to handle large traffic volume
- Integrating server-side logic with front end
- Design and implementation of data storage solutions
- Building reusable code and libraries for future use
- Writing documentation for ease of use for new developers


Back-end developers usually work in groups or teams. Within larger organisations, there can be both back-end and front-end engineers, which can include engineers with specific roles like REST API developers or quality assurance or architects.


### Backend  & languages

Back-end developers can learn a variety of languages and frameworks depending on the type of app they’re developing, its specific processing specifications, and what other components already exist on the back end.

Languages will differ in file size, speed, adaptability, how many lines of code required, and the style of coding. Some back-end scripting languages are object-oriented, a method of programming that bundles properties and functions within objects. Different languages may be compiled rather than interpreted, something that affects load speed, readability, and processing power needed to run the app.

Most of the sites are built on PHP, making it one of the most common back-end languages. However, there are plenty of others to choose from. You may want to use the processing power of Python for a data-driven site, or leverage the speed of lightweight languages like Ruby for quick prototyping. It’s up to you and your developers, and every language has its pros and typical applications.

Take a look at a few of the other big hitters in back-end programming, like:

- Java
- C# and C++
- .NET
- Perl
- Scala
- Node.js (and JavaScript)