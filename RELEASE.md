# Website and Documentation Release Process
This document outlines the release process for both the website and the documentation.

Documentation is stored within the website repository, the website will be redeployed when a change is made to either the website itself or the documentation.

## How to make this asset available
### Build Release
When a pull request is opened against `appsody/website`, TravisCI will try and build the website using `gatsby build` to check that the website is still in production state. `gatsby build` needs to pass before the website can be deployed and TravisCI will block the pull request being merged until it passes.

### Deploy Website with latest Documentation
Once all pull request checks have passed the website is ready to be deployed. When the pull request is merged into `master` TravisCI will deploy the changes to GitHub pages automatically.

The above is the preferred way to release the website, however if the website needs to be manually deployed a maintainer with write access can do the following:

1. Clone website repository
```
git clone https://github.com/appsody/website.git
cd website
```

2. Check remote in `package.json`
```
"deploy": "gatsby clean && gatsby build --prefix-paths && gh-pages -d public -o <remote>"
```
The remote needs to be set to the upstream project, but the default points to a `staging` remote.

3. Deploy website manually
```
npm run deploy
```

## Release schedule
The website and documentation gets released when a pull request is merged. The website is currently **not** versioned and therefore an offical release is not cut.

**Note:** this frequent release process requires each pull request to be thoroughly checked as the result will be pushed into production.

## Dependencies
Website release depends on **all** pull request checks passing only.

It does not rely on another appsody or external asset being released.


