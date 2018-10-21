---
title: Levensthein algorithm for better faker experience
date: '2018-10-21T11:23:04.284Z'
author: Artur
---

Today I am writing about faking data again using [ts-api-faker](https://github.com/slothking-online/ts-api-faker) . Usually we pass this kind of data to faker

```json
[
  {
    "name": "name.firstName",
    "surname": "name.lastName",
    "mail": "internet.email",
    "profilePhoto": "internet.avatar",
    "animalPhoto": "image.cat"
  },
  {
    "name": "name.firstName",
    "surname": "name.lastName",
    "mail": "internet.email",
    "profilePhoto": "internet.avatar",
    "animalPhoto": "image.dog"
  }
]
```

and then we receive faked data

```json
[
  {
    "name": "Van",
    "surname": "Veum",
    "mail": "Corbin.Fritsch49@gmail.com",
    "profilePhoto": "https://s3.amazonaws.com/uifaces/faces/twitter/pixage/128.jpg",
    "animalPhoto": "https://source.unsplash.com/200x200/?cat"
  },
  {
    "name": "Serena",
    "surname": "Wilderman",
    "mail": "Mariam_Thiel@hotmail.com",
    "profilePhoto": "https://s3.amazonaws.com/uifaces/faces/twitter/imcoding/128.jpg",
    "animalPhoto": "https://source.unsplash.com/200x200/?dog"
  }
]
```

It works perfect but... Usually a schema looks like this.

```json
[
  {
    "name": "String",
    "surname": "String",
    "mail": "String",
    "profilePhoto": "String",
    "animalPhoto": "String"
  }
]
```

The answer from faker is inappropriate then

```json
[
  {
    "name": "atque",
    "surname": "eos",
    "mail": "voluptas",
    "profilePhoto": "similique",
    "animalPhoto": "earum"
  }
]
```

What if you use levensthein algorithm on keys of values and transform values to the closest to key name option?

Again we pass

```json
[
  {
    "name": "String",
    "surname": "String",
    "mail": "String",
    "profilePhoto": "String",
    "animalPhoto": "String"
  }
]
```


Voila, we get the correct faker structure.

```json
[
  {
    "name": "Edgar",
    "surname": "Alyce64",
    "mail": "Eusebio.Gottlieb@yahoo.com",
    "profilePhoto": "https://source.unsplash.com/200x200/?profile",
    "animalPhoto": "https://source.unsplash.com/200x200/?animal"
  }
]
```

![](https://media.giphy.com/media/a0h7sAqON67nO/giphy.gif)

I've just added this feature to my repo [ts-api-faker](https://github.com/slothking-online/ts-api-faker)

Feel free to contribute and extend this library functionality. If you support me and this idea please star this repo to help me get more contributors and extend ts-api-faker library.

In future we can add machine learning to this and get ultimate intelligent faker for our apis and databases :)