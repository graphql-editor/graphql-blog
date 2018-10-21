# GraphQL Blog

This is the repository of graphql blog. Contribute here to see your blog post on [blog.graphqleditor.com](https://blog.graphqleditor.com)
You need gatsby cli to develop

```
$ npm install --global gatsby-cli
```

## Contributing

1. Fork this repo
2. Create your blog post branch:
   ```sh
   $ git checkout -b my-article-slug
   ```
3. Make changes as described below
4. Commit and push your changes
5. Submit a pull request to this repo

### Adding yourself as an author

1. Create a folder 
    ```
    src/components/authors/YOUR_NAME
    ```
2. Add your photo to this folder
3. Add `index.js` file with the following structure where NAME is your name
   ```js
   export const NAME = {
        photo: require('./path_to_photo'),
        desc:'About you',
        name: 'Your name',
        email: 'your@email.com'
   }
   ```

### Creating a blog post

Please create blog posts basing on markdown and other post structure. It is important to begin blog post with

```
---
title: Post title
date: '2018-10-10T11:23:04.284Z'
author: NAME
---
```

### Publishing post to different services.

Run

```sh
$ npm run blog
```

1. Choose blog post name
2. Choose where to publish ( reddit, twitter, linkedin etc.) or publish to all vendors.
3. CLI will open the prefilled submit forms in your browser
4. Enjoy!