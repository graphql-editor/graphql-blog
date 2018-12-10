const yargs = require('yargs')
const fs = require('fs')
const inquirer = require('inquirer')
const opn = require('./opn')
const matter = require('gray-matter')

const HOSTNAME = 'https://blog.graphqleditor.com'
const pagesDirectory = __dirname + '/../src/pages'
const reddits = [
  'typescript',
  'javascript',
  'reactnative',
  'reactjs',
  'reactxp',
  'node',
  'webdev',
  'graphql',
  'programming',
  'technology',
  'startups',
  'learnprogramming',
  'marketing',
  'entrepreneur',
  'golang',
  'ruby',
  'dotnet',
  'java',
  'python'
].sort()
const voats = ['technology']
const mediums = [
  {
    name: 'voat',
    fn: ({ url, title }) =>
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'voat',
            message: 'What voat you would like to publish to?',
            choices: voats,
          },
        ])
        .then(answers =>
          submit({
            medium: 'voat',
            reddit: answers.voat,
            title,
            url,
          })
        ),
  },
  {
    name: 'reddit',
    fn: ({ url, title }) =>
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
          submit({
            medium: 'reddit',
            reddit: answers.reddit,
            title,
            url,
          })
        ),
  },
  {
    name: 'hackerNews',
    fn: ({ url, title }) =>
      submit({
        medium: 'hackerNews',
        title,
        url,
      }),
  },
  {
    name: 'linkedIn',
    fn: ({ url, title }) =>
      submit({
        medium: 'linkedIn',
        title,
        url,
      }),
  },
  {
    name: 'twitter',
    fn: ({ url, title }) =>
      submit({
        medium: 'twitter',
        title,
        url,
      }),
  },
]
const submit = ({ medium, title, url, reddit }) =>
  opn(
    {
      voat: `https://voat.co/submit?linkpost=true&title=${title}&url=${url}&subverse=${reddit}`,
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
    }[medium],
    {
      wait: false,
    }
  )

const argv = () =>
  yargs
    .command(
      'publish',
      'Publish your blog post for different mediums',
      {},
      async argv => {
        const pageNames = fs
          .readdirSync(pagesDirectory)
          .filter(page =>
            fs.lstatSync(`${pagesDirectory}/${page}`).isDirectory()
          )
        const pages = pageNames.map(page => ({
          url: `${HOSTNAME}/${page}`,
          title: matter(
            fs.readFileSync([pagesDirectory, page, 'index.md'].join('/'))
          ).data.title,
        }))
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'page',
              message: 'Which page would you like to publish',
              choices: pages.map(p => p.title),
            },
          ])
          .then(answers => pages.find(p => p.title === answers.page))
          .then(page =>
            inquirer
              .prompt([
                {
                  type: 'list',
                  name: 'medium',
                  message: 'What medium you would like to publish to?',
                  choices: mediums.map(m => m.name).concat('All mediums'),
                },
              ])
              .then(
                answers =>
                  answers.medium === 'All mediums'
                    ? Promise.all(
                        mediums
                          .filter(m => m.name !== 'reddit' && m.name !== 'voat')
                          .map(m => m.fn(page))
                      )
                    : mediums
                        .find(m => m.name === answers.medium)
                        .fn(page)
                        .then(proc =>
                          inquirer
                            .prompt([
                              {
                                type: 'list',
                                name: 'again',
                                message: 'What next?',
                                choices: ['Exit', 'Next Action'],
                              },
                            ])
                            .then(({ again }) => {
                              if (again === 'Exit') {
                                return
                              }
                              return argv()
                            })
                        )
              )
          )
      }
    )
    .help().argv
argv()
