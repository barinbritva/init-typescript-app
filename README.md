# Init TypeScript App
[![License](https://img.shields.io/npm/l/micromatch?style=flat-square)](https://github.com/barinbritva/init-typescript-app/blob/master/LICENSE)

This is clean framework/technology agnostic `TypeScript` setup.

First of all, it's written to help quickly create `npm` packages in TypeScript. With `init-typescript-app` you can think only about your project. All other things `init-typescript-app` will take care of the rest.

It's also a good idea to use it like a starting point for any of your projects.

## 📦 What in the box

* **Customizable TypeScript configuration.** If you just want to make your project work in TypeScript and not get a lot of difficulties which may be related with it, you can choose `base mode`. _By the way, it's the greatest choice if you just start learning TypeScript._ For advanced TypeScript users there is `advanced node` which includes all kinds of checks.

* **Easy and quick publication.** No more fuss with entering the same `npm` and `git` commands, no more mistakes during the publication process. Make your package publication happen by running one command.

* **Other features are on their way.** Please, read about upcoming features in [roadmap](#-roadmap) section.

## 🚀 Launch your project
### Quick overview
```sh
npx init-typescript-app
# then answer for a few questions in cli
cd project-name
npm install
npm run build
npm start
```

You are all set up!

You are also able to install `init-typescript-app` globally if you are using `npm` of version lower than `5.2.0`.

_In the documentation we always use `npm` in all examples to be short. Of course, you can use any of package managers `npm` or `yarn`._

### Starting in development mode
For development purposes it's reasonable to use `npm run build:dev` command. It does the following:

* Runs build process in `watch` mode and generates `source maps` files
* Disables a few compiler options for more comfortable developing process. See the details below.

Production settings include `"noUnusedLocals": true` and `"allowUnreachableCode": false` flags. That may be not really convenient. Consider next piece of pseudo code which is totally OK in terms of compiler:
```typescript
function doMyStuff (): number {
  const numberOne: number = Math.random()
  const numberTwo: number = Math.random()
  const difference: number = numberOne - numberTwo
  const anotherVariable: number = Math.random()

  if (difference > 0) {
    console.log(anotherVariable)
    return numberOne
  } else {
    return numberTwo
  }
}
```
It's common practice to comment and add some lines of code during development process. Let's change the code like this:
```typescript
function doMyStuff (): number {
  const numberOne: number = Math.random()
  const numberTwo: number = Math.random()
  const difference: number = numberOne - numberTwo
  // this line emits error by noUnusedLocals rule
  const anotherVariable: number = Math.random()

  console.log(numberOne, numberTwo)
  return 1
  
  // this block emits by allowUnreachableCode rule
  if (difference > 0) {
    // console.log(anotherVariable)
    return numberOne
  } else {
    return numberTwo
  }
}
```
That's why these checks are switched off for development. You won't get these errors in your build, but an IDE will still show you errors so that you don't forget to fix them. This is a really convenient approach.

## 📮 Publish your package
When the first version of your package is ready to see the world, it's time to publish it.

_Just run `npm run release` from the root directory of your project. That's it!_

But before you start, please, check out next information in this section.

### Check your git setup
To use publication features it's necessary for your project to be a `git` repository.
```sh
# create empty repository at GitHub
# run from your project root directory:
git init
git remote add origin git@github.com:user-name/project-name.git
git push -u origin master
```
_This example uses `ssh` connection to communicate with a repository. If you haven't `ssh` setup yet you can [follow the instructions](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) to deal with it. You still can use `https` connection instead:_
```sh
git remote add origin https://github.com/user-name/project-name.git
```

### Check your npm setup
To publish your package it's necessary to be signed in via your [`npm`](https://www.npmjs.com/) account in your console. Create an account if you don't have it. Then auth from your console by [`npm login`](https://docs.npmjs.com/cli-commands/adduser.html) command.

_Of course, you can use any package registry you want, e.g. `npm.pkg.github.com`._

### Check your files
It's necessary to be sure you publish what you exactly mean to publish. Using `.npmignore` is antipattern (you can read more information about it [here](https://medium.com/@jdxcode/for-the-love-of-god-dont-use-npmignore-f93c08909d8d) and [here](https://blog.npmjs.org/post/165769683050/publishing-what-you-mean-to-publish)). By default, only next files will be included into your package:
```
# your built files, included via package.json
dist
# next files are included by npm by default:
package.json
README.md (and its variants)
CHANGELOG.md (and its variants)
LICENSE
```
If you add new files or directories, it's necessary to include them to [`files`](https://docs.npmjs.com/files/package.json#files) section of your `package.json`. Run `npm pack` and check out output tarball before release.
_More information about it and other helpful development techniques you can read in [npm developer guide](https://docs.npmjs.com/misc/developers)._

#### How publication works under the hood
The release script does next:

* Checks your working directory is clean in terms of Git. Commit or stash your changes before release.
* Builds your package
* Creates git tag with current version
* Publish the package to `npm` registry
* Increase version in `package.json`(and `package-lock.json` too) to next `patch` version
* Commit changes of `package*.json` files
* Push the new commit and tag to your repository

Ok! You are ready to work on the next version!

## 💡 Tips and tricks
### Customization
Have no concerns to change everything you need for your project. After once you run `init-typescript-app` you fully control your project. It's ok to edit `tsconfig.json` options or even change `build` or `release` scripts. Just a few examples what you may want to change:
* Pass change some params to build process or add extra steps to it
* Change your publication process to push the package for `private` access instead of `public`. To do that remove `--access public` from publish command in `release.sh`
* Change bumping commit text

_In other words, follow your goals!_

### Troubleshooting
* In rare cases it's possible to get errors from somewhere of `node_modules/**/*d.ts`. It means some third-party library typings are broken. If you run into this problem you can solve it by adding `"skipDefaultLibCheck": true` to `compilerOptions` of `tsconfig.json`. _More information about `tsconfig` will be available soon._
* If you chose `advanced` type checking, but run into the wall with it, you can rollback to `base` mode in two ways. The first way is to open `tsconfig.json` and invert a value of numerous options listed there. You can use hints from an IDE to detect exactly which options give you troubles. You are also able to toggle values one by one to find issuer. You can return toggled values when you will become more experienced. The second is to rollback to `base` mode permanently. To do that just remove `tsconfig.json`, and rename `tsconfig-base.json` to `tsconfig.json`.
* It's possible to face a situation when you will get an error when trying to use some default object like `window`, `document`, `Promise` or some operators. It means you have to include library's build-in typings to your `tsconfig`. [List of allowed libraries](https://www.typescriptlang.org/tsconfig#lib) you can find here. Current example looks like that:
```json
{
  "compilerOptions": {
    "lib": [
      "DOM",
      "ES2015"
    ]
  }
}
```
* Sometimes it's necessary to extend definitions of standard objects. For instance, you use some library which adds custom property to `window` object - `window.customProperty`. Global `window` object always refers to build-in interface `Window` placed in `lib.dom.d.ts`. So you can't redeclare or edit it somehow. There are a lot of similar situations. Declaration merging comes to the rescue. The approach allows you to extend standard definitions implicitly. You can read more about [`declaration merging`](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) in the official documentation. Just one example to be clear:
```
// go to your project root dir
// create directory for types, for example `definitions`
// inside of `definitions` folder create file `dom.d.ts`
// add path `./definitions/dom.d.ts` to `include` section of your `tsconfg.json`
```
```json
{
  "include": [
    "./src",
    "./definitions/dom.d.ts"
  ]
}
```
```
// for situation above add next code:
```
```typescript
interface Window {
  // describe what you need
  customProperty: Object;
}
```

## 🗺 Roadmap
### In version `1.x`
* **Windows support.** Current version works on Linux and MacOS.
* **Tests.** Test frameworks, code coverage.
* **Code standards.** Setting up `eslint`, auto code formatting.
* **Pull-request bots.** Checking code coverage, dependencies vulnerabilities, etc
* **Changelog.** Documenting changes, integration with release process.
* **Webpack option.** Ability to make builds with Webpack.
* **Gulp option.** Running additional tasks.

### In version `2.x`
* **Applications templates.** Create not only libraries, but frontend and backend applications too.

## 🔙 Feedback
Your feedback is really important for the project. Please, use contacts from [my profile](https://github.com/barinbritva) to send your questions, suggestions, help requests and others. Also, feel free to use [issues](https://github.com/barinbritva/init-typescript-app/issues) section to report bugs and problems.

## 📄 License
MIT, see [LICENSE](https://github.com/barinbritva/init-typescript-app/blob/master/LICENSE) for the details.
