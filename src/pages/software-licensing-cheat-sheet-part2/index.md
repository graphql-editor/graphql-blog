---
title: Software licensing Part II - a deeper dive into licenses types
date: '2020-05-18T11:12:00.284Z'
image: lic_feat2.png
author: Michal
---

Last time we took a swing at breaking down the various types of software licenses. While useful if you wanted to get a hang of some basics, if you wanted to actually pick a license for your software you’d probably need a bit more info on the various particular licenses that are publicly available. So without further ado that’s exactly what we’ll try to do here.

## Compatibility

First let’s talk about compatibility, a topic particularly important for copyleft licenses. Let’s say code under license A is compiled with code under license B to form a new work, is that permissible under license law? Well, that depends on the particular licenses. In general copyleft licenses are compatible with other open-source licenses as long as:

- the open-source license does not have any additional requirements or restrictions that are not in the copyleft license (for example the original BSD license contains an advertising clause that makes it incompatible with copyleft licenses like GPL)

- the open-source license has an explicit compatibility clause in it (for example the European Public License has a compatibility clause for GPL)

![Picking a license is an important choice](picking_license.png)
##### Credits: [undraw.co](https://undraw.co/)


## GNU family breakdown

The GNU license family serves as a prime example of copyleft licenses. Let’s break them down:

- **General Public License (GPL)** - the most popular GNU license by far. It’s current version is GPLv3 and has added compatibility clauses for many other free software licenses such as MIT and BSD (a full list is available at gnu.org) However GPL is incompatible with many digital distribution platforms such as Apple’s app store. This is because copyleft licenses have a ‘free to copy’ rule while digital distribution platforms often use DRM especially to prevent copying and sharing of paid software.

- **Lesser General Public License (LGPL)** - is somewhat of a compromise between a copyleft and permissive license. It allows developers to include components licensed under LGPL even into proprietary software and without the requirement of sharing the source code, unlike strong copyleft licenses (such as the above mentioned GPL)

- **GNU Affero General Public License (AGPL)** - is a modified GPL license with one added requirement: if you run a modified program on a server and let other users communicate with it there, your server must also allow them to download the source code corresponding to the modified version running there.


## Popular permissive licenses breakdown

Permissive licenses contain few restrictions on reuse and therefore are generally compatible and interoperable with most other licenses.

- **The MIT License** - currently the most popular software license in use. Known for its small size and few restrictions the MIT license is highly compatible with other licenses, even copyleft licenses like GPL. However it is worth noting that compatibility only goes one way: MIT licensed software can be re-licensed as GPL software, but not the other way around.


- **Apache 2.0** - is a permissive open source license. In terms of popularity, it comes second only to the MIT license. Software released under this license can be freely used, modified, distributed and sold. Additionally, a modified version of an Apache-licensed product can be released under any license of your choice. Similarly to the MIT License, it is one way compatible with GPLv3 ie. Apache 2 software can be included in GPLv3 projects, but GPLv3 software cannot be included in Apache projects. Unlike other permissive licenses Apache provides not only copyright but also an explicit patent license. 

![Software licences](licences.png)
##### Credits: [undraw.co](https://undraw.co/)


## BSD Licenses family breakdown
Berkeley Software Distribution or BSD is actually a family of licenses. 

- **Original BSD** - the original 4 clause permissive license (also called BSD-old or simply 4-clause BSD) caused some problems due to having an advertising clause, which required authors of all derivative works to acknowledge the original source in all advertising material, causing mounting numbers of acknowledgments down the line.

- **BSD 3** - the currently widely used 3 clause permissive license (also called BSD-new or modified BSD) allows redistribution for any purpose as long as the license’s copyright notices and warranty disclaimers are maintained. It also contains a specific clause restricting the use of the names of contributors for endorsement of a derived work without specific permission.

- **BSD 2** - a further simplified 2 clause permissive license (also called Simplified BSD or FreeBSD) that omits the above mentioned non-endorsement clause.

- **BSD 0** - an even further simplified license created by removing the requirements to include the copyright notice, license text or disclaimer in either source or binary forms. This makes it essentially a public domain equivalent license.



