const path = require('path');
const { defaultOptions, runQuery, writeFile } = require('./internals');

const publicPath = './public';

exports.onPostBuild = async ({ graphql }, pluginOptions) => {
  delete pluginOptions.plugins;
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const siteQuery = await runQuery(graphql, options.siteQuery);

  const {
    site: {
      siteMetadata: { title, description, siteUrl, author },
    },
  } = siteQuery;

  const feedQuery = await runQuery(graphql, options.feedQuery);

  const {
    allMarkdownRemark: { edges: data },
  } = feedQuery;
  const items = data.map((i) => {
    const {
      node: {
        frontmatter,
        fields: { slug },
      },
    } = i;
    return {
      id: `${siteUrl}${slug}`,
      url: `${siteUrl}${slug}`,
      title: frontmatter.title,
      date_published: new Date(frontmatter.date).toISOString(),
      date_modified: new Date(frontmatter.date).toISOString(),
    };
  });
  if (options.json) {
    const jsonFeed = {
      version: 'https://jsonfeed.org/version/1',
      title,
      description,
      home_page_url: siteUrl,
      feed_url: `${siteUrl}/feed-nocontent.json`,
      user_comment:
        'This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format. To add this feed to your reader, copy the following URL — https://blog.graphqleditor.com/feed-nocontent.json — and add it your reader.',
      favicon: `${siteUrl}/icon.png`,
      author: {
        name: author,
      },
      items,
    };
    await writeFile(path.join(publicPath, 'feed-nocontent.json'), JSON.stringify(jsonFeed), 'utf8').catch((r) => {
      console.log('Failed to write JSON Feed file: ', r);
    });
  }

  return Promise.resolve();
};
