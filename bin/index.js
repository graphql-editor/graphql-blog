const yargs = require('yargs')
const fs = require('fs')
const inquirer = require('inquirer')
const opn = require('opn')
const HOSTNAME = 'https://blog.graphqleditor.com'
const pagesDirectory = __dirname + '/../src/pages'
const reddits = [
  'typescript',
  'javascript',
  'reactnative',
  'reactjs',
  'reactxp',
  'graphql',
]
const mediums = [
  {
    name: 'reddit',
    fn: url =>
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'reddit',
            message: 'What reddit you would like to publish to?',
            choices: reddits,
          },
        ])
        .then(answers =>
          getTitleUrl(url).then(title => {
            submit({
              medium: 'reddit',
              reddit: answers.reddit,
              title,
              url,
            })
          })
        ),
  },
  {
    name: 'hackerNews',
    fn: url =>
      getTitleUrl(url).then(title => {
        submit({
          medium: 'hackerNews',
          title,
          url,
        })
      }),
  },
  {
    name: 'linkedIn',
    fn: url =>
      getTitleUrl(url).then(title => {
        submit({
          medium: 'linkedIn',
          title,
          url,
        })
      }),
  },
  {
    name: 'twitter',
    fn: url =>
      getTitleUrl(url).then(title => {
        submit({
          medium: 'twitter',
          title,
          url,
        })
      }),
  },
]
const getTitleUrl = defaultValue =>
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        default: defaultValue,
      },
    ])
    .then(answers => answers.title)
const submit = ({ medium, title, url, reddit }) =>
  opn(
    {
      hackerNews: `http://news.ycombinator.com/submitlink?u=${url}&t=${encodeURIComponent(
        title
      )}`,
      reddit: `https://www.reddit.com/r/${reddit}/submit?title=${encodeURIComponent(
        title
      )}&url=${url}`,
      linkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&source=${encodeURIComponent(
        HOSTNAME
      )}`,
      twitter: `http://twitter.com/share?url=${url}&text=${encodeURIComponent(
        title
      )}`,
    }[medium]
  )

const argv = yargs
  .command(
    'publish',
    'Publish your blog post for different mediums',
    {},
    async argv => {
      const pageNames = fs
        .readdirSync(pagesDirectory)
        .filter(page => fs.lstatSync(`${pagesDirectory}/${page}`).isDirectory())
      const pages = pageNames.map(page => `${HOSTNAME}/${page}`)
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'page',
            message: 'Which page would you like to publish',
            choices: pages,
          },
        ])
        .then(answers => answers.page)
        .then(url => {
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'medium',
                message: 'What medium you would like to publish to?',
                choices: mediums.map(m => m.name),
              },
            ])
            .then(answers =>
              mediums.find(m => m.name === answers.medium).fn(url)
            )
        })
    }
  )
  .help().argv
argv
