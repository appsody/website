# Appsody.dev Development

The Appsody website is built with [Gatsby.js](https://www.gatsbyjs.org/). See the Gatsby [quick start guide](https://www.gatsbyjs.org/docs/quick-start) for the basics.

## Prerequisites

- **Node 10+**
  Download Node.js from https://nodejs.org/en/

- [**Gatsby.js**](https://www.gatsbyjs.org)
  When Node is installed, run the following command to install Gatsby.js:

  ```bash
    npm install -g gatsby-cli
  ```

- **Install Node dependencies** Clone the website Git repo and install the dependencies with the following commands:

  ```bash
    git clone https://github.com/appsody/website.git
    cd website

    npm install
  ```

## Developing locally

1. Run the development server:

```bash
gatsby develop
```

This command compiles your changes as you develop and hosts the website at http://localhost:8000. To explore GraphQL queries that Gatsby exposes, use http://localhost:8000/__graphql.

:pencil: **Note about clearing your Cache:**
Sometimes when developing locally, the website shows cached content from previous versions of the website. To clear the cache before developing, run the following command:

```bash
gatsby clean
```

2. View documentation at http://localhost:8000/docs

For more information on adding Markdown pages with Gatsby, see https://www.gatsbyjs.org/docs/adding-markdown-pages/

:pencil: **Note:** If you are developing remotely, use `http://<hostname>:PORT` instead of `http://localhost:PORT` as described in this doc.

## Contributing Documentation

We welcome contributions to the Appsody documentation.

### Understanding the documentation structure

Documentation for Appsody must be stored in the `content/docs directory`. Images must be stored in the `content/docs/images directory`.

The documentation should follow the rough structure of the sidebar so that the docs are easy to find. The quick start guide, for example, is located in `content/docs/getting-started/quick-start`.

At the top of each documentation page you should include frontmatter so that the website can render the page correctly. Include the following elements:

```
---
path: This is the route to the page that all links will be created from.
---
```

For example:

```
---
path: /docs/getting-started/quick-start
---
```

To add the doc to the side menu you must add it to the `sidebar.yaml` in `content/docs`. A section is defined using the following structure:

```
- title (optional): Getting Started
  items:
    - title: Installation
      path: /docs/getting-started/installation
    - title: Quick Start
      path: /docs/getting-started/quick-start
```

:pencil: **Note:** The `title` for the section is optional but the `title` for each menu item is required.

### Using images

Images can help explain concepts better than words, and make for more exciting and digestible content.

First, copy the image file to the `content/docs/images` directory.

To add an inline image to a doc, use the following syntax:

```
![Alt Text](../images/my-awesome-image.png)
```

A helpful image could show a window that a user is expected to see. Make sure you replace `[Alt Text]` with some text describing what the image shows, as this text is used for screen readers, or for when the image does not load.

**Note:** Relative paths must be used to reference image locations. If an image does not render properly, you might be pointing to the wrong directory. Use only images of file type `.png` or `.jpg`.

### Writing technical content

Writing good technical content that is easy to read and understand is important for the success of any product. For consistency across the documentation, these guidelines should be followed:

1. Use an active voice:

   :negative_squared_cross_mark: NO: When the file is opened, the entry xxx can be deleted.

   :white_check_mark: YES: Open the file and delete entry xxx.

2. Use present tense:

   :negative_squared_cross_mark: NO: The command will create a new directory...

   :white_check_mark: YES: The command creates a new directory...

3. Use the first person to engage the audience:

   :negative_squared_cross_mark: NO: The user has two options....

   :white_check_mark: YES: You have two options...

4. Be aware of words that convey position.

   :negative_squared_cross_mark: NO: Run the command shown below:

   :white_check_mark: YES: Run the following command:

   :pencil: **NOTE:** Words such as above, below, left, right, top, and bottom break accessibility guidelines when used in isolation.

5. Avoid ambiguity:

   :negative_squared_cross_mark: NO: This causes a problem with... (what is this referring to?)

   :white_check_mark: YES: This behavior causes a problem with...

And finally, to help users for whom their first language is not English:

- use simple language
- keep sentences short
- avoid needless words

### Redirecting content

When moving a document from one location to another you must add a redirect to prevent broken links, especially from external sources.

1. Open the `gatsby-node.js` file found at the root of the project
2. At the redirecting section, add the following:

```
createRedirect({
    fromPath: `/old/path`,
    toPath: `/new/path`,
    isPermanent: true
  });
```

Note that you only need to provide the path.

3. If it makes sense, add a comment above the redirect stating why this was added.

## Testing the website ready for release

Before submitting a pull request you must test that the website can build and run successfully.

1. Build the website

```
gatsby build
```

This build must be successful or you cannot serve the website.

2. Serve the website

```
gatsby serve
```

3. Access the website on http://localhost:9000 and complete any visual checks.

## Adding definitions to the Glossary page

If you feel a term would benefit from being defined, the Glossary is the perfect place to do so! The file is located inside the docs directory, as `glossary.md`.

In order to render correctly, definitions need to be written in the following way:

```
>### Term Name
This is where you would write a brief description explaining the term.
Feel free to include links, images, and inline code snippets. Code blocks are supported.
```

For a new line, end the sentence with two spaces before pressing the enter key.

For an empty line, insert an empty character (`&thinsp;`) with two spaces following it.

The large letters, marking the letter of the alphabet the definitions belong to, are simply written with the following syntax:

```
## Letter
```

> The glossary is not self-organising, so try to add definitions in their correct place alphabetically.

## Need help?

If you have a question that you can't find an answer to, we want to hear from you. Reach out to the community for assistance on [Slack](https://appsody-slack.eu-gb.mybluemix.net/).
