# Create TypeScript App

This is clean framework/technology agnostic `TypeScript` setup.

First of all it's written to help quickly create `npm` packages in TypeScript. With `create-typescript-app` you can thing only about your project. All other things `create-typescript-app` will take on it.

It's also a good idea to use it like start point for any of your projects.

## 📦 What in the box

**🔨 Customizable TypeScript configuration.**

If you just want to make your project working in TypeScript and don't get a lot of difficulties which may be related with it, you are able to choose `base mode`. _Buy the way, it's the greatest chose if you just start learning TypeScript._ For advanced TypeScript users there is `advanced node` which includes all kinds of checks.

**💫 Easy and quick publication.**

No more fuss with entering the same `npm` and `git` commands, no more mistakes during the publication process. Make your package publication happen by running one command.

**📍 Other features are on their way.**

Please, read about upcoming features in [roadmap](#roadmap) section.

## 🚀 Launch your project
### Quick overview
```sh
npx create-typescript-app
# then answer for a few questions in cli
cd project-name
npm install
npm run build
npm start
```

You are set up!

You are also able to install `create-typescript-app` globally if you are using `npm` of version lower than `5.2.0`.

_In the documentation we always use `npm` in all examples to be short. Of course, you can use any of package managers `npm` or `yarn`._

### Starting in development mode
For development purposes it's reasonably to use `npm run build:dev` command. It does next few things.

* Runs build process in `watch` mode and generates `source maps` files
* Disables a few compiler options for more convenient developing process

## 📮 Publish your package
When first version of your package are ready to see the world, it's time to publish it.

### Check your git setup
For using publication features it's necessary your project is a `git` repository.
```sh
# create empty repository at GitHub
# run from your project root directory:
git init
git remote add origin git@github.com:user-name/project-name.git
git push -u origin master
```
_This example uses `ssh` connection to communicate with a repository. If haven't `ssh` setup yet you can [follow the instructions](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) to deal with it. You still can use `https` connection instead:_
```sh
git remote add origin https://github.com/barinbritva/test.git
```

### Check your npm setup
For publishing your package it's necessary to be signed in via your [`npm`](https://www.npmjs.com/) account in your console. Create an account if you don't have it. Then auth from your console by [`npm login`](https://docs.npmjs.com/cli-commands/adduser.html) command.

### Publish
From the root dir of your project run `npm run release`. That's it!

#### How publication works under the hood
The release script do next:

* Checks your working directory is clean in terms of Git. Commit or stash your changes before release.
* Builds your package
* Creates git tag with current version
* Publish the package to `npm` registry
* Increase version in `package.json`(and `package-lock.json` too) to next `patch` version
* Commit changes of `package*.json` files
* Push the new commit and tag to your repository

Ok! You are ready to work on next version!

## 🧯 Tips and tricks
* In rare cases it's possible to get errors from somewhere of `node_modules/**/*d.ts`. It means some third-party library typings are broken. If you run into this problem you can solve it by adding `"skipDefaultLibCheck": true` to `compilerOptions` of `tsconfig.json`. _More information about `tsconfig` will be available soon._

## 🗺 Roadmap
### In version `1.x`
* **Tests.** Test frameworks, code coverage.
* **Code standards.** Setting up `eslint`, auto code formatting.
* **Pull-request bots.** Checking code coverage, dependencies vulnerabilities, etc
* **Changelog.** Documenting changes, integration with release process.
* **Webpack option.** Ability to make builds with Webpack.
* **Gulp option.** Running additional tasks.

### In version `2.x`
* **Applications templates.** Create not only libraries, but frontend and backend applications too.

# 🖋 License
`create-typescript-app` is open source software [licensed as MIT](https://github.com/barinbritva/create-typescript-app/blob/master/LICENSE).


# TODO WRITE ABOUT
* Development mode disabled flags
* You can publish to custom registry
* If private account remove `--access public` from `release.sh`
* If you want change bump commit message in `release.sh`

## Troubleshooting
* If you write for browsers add - lib: ["dom"] and other libs
* How to enable declaration merging
* How to rollback to base typechecking

[Licenses](https://choosealicense.com/licenses/)
[Licensing a repository](https://docs.github.com/en/enterprise/2.15/user/articles/licensing-a-repository)
