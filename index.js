// Get our requirements, installed by npm
var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    drafts = require('metalsmith-drafts'),
    collections = require('metalsmith-collections'),
    copy = require('metalsmith-copy'),
    blc = require('metalsmith-broken-link-checker');

// Run Metalsmith in the current directory.
// When the .build() method runs, this reads
// and strips the frontmatter from each of our
// source files and passes it on to the plugins.
Metalsmith(__dirname)

    .use(
      collections({
        stuff: {
          pattern: 'stuff/**/*.md',
          sortBy: 'date',
          reverse: true
        }
      })
    )
    .use(copy({
      pattern: '**.png',
      directory: "images"
    }))
    // Use metalsmith-markdown to convert
    // our source files' content from markdown
    // to HTML fragments.
    .use(markdown())

    // Put the HTML fragments from the step above
    // into our template, using the Frontmatter
    // properties as template variables.
    .use(layouts())
    .use(drafts())
    // .use(pagination({
    //   'collections.articles': {
    //     perPage: 15,
    //     layout: 'index.hbs',
    //     first: 'index.html',
    //     noPageOne: true,
    //     path: 'stuff/:num/index.html'
    //   }
    // }))

    // Final step link check
    .use(blc({warn: true}))

    // And tell Metalsmith to fire it all off.
    .build(function(err, files) {
        if (err) { throw err; }
    });