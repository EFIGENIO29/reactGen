React base project
===================
**React** application that utilizes the **Flux** application architecture
through **Redux**

## Architecture

```sequence
Webpack->Babel->React: Transpilation
```

### CLI Scripts

#### Webpack Development Server
Runs the webserver on the port 3333 with Hot Reload
```bash
$ npm run start
```

#### Documentation
Generate documentation, it outputs in the "doc" directory
```bash
$ npm run doc
```

#### Build for production
Generate the production bundle, it outputs in the "dist" directory
```bash
$ npm run build
```

#### Copy the files to the production server
```bash
npm run build
scp -i  -r dist/* nodejs@104.197.13.234:/home/nodejs/sif-cliente-unico
ssh nodejs@104.197.13.234 "cd /home/nodejs/sif-cliente-unico && npm i && sudo npm start"
```

### Utilized libraries/technologies
For more details open the package.json file

| **Lib/Tech** | **Description** | **Version** | **Release date** |
|----------|-------|---|
|  [NodeJs](https://nodejs.org)  |   JavaScript runtime    | [7.9.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V7.md#7.9.0)  | 2017-04-11  |
|  [NPM](https://www.npmjs.com/)  |    Node Package Manager   | [4.5.0](https://github.com/npm/npm/releases/tag/v4.5.0)  |  2017-03-24  |
|  [Webpack](https://webpack.js.org/)  |    Module bundler   |  2.3.3 |
|  [Webpack DevServer](https://webpack.js.org/configuration/dev-server/)  |    Web Server with hot reload   |  2.4.2 |
|  [Babel](https://babeljs.io/)  |   ECMAScript Transpiler    | 6.24.1  |
|  [React](https://facebook.github.io/react/)  |   Web components    |  15.4.2 |
|  [Flux](https://facebook.github.io/flux/)  |   Application architecture    | N/A  |
|  [Redux](http://redux.js.org/)  |   State container    | 3.6.0  |
|  [Moment](https://momentjs.com/)  |   Dates more easier    | 2.18.1  |
|  [Underscore](http://underscorejs.org/)  |    More than 100 functions   | 1.8.3  |
|  [Axios](https://github.com/mzabriskie/axios)  |    Promise based HTTP client   | 0.16.1  |
|  [ESDoc](https://esdoc.org)  |    Document generator   | 0.16.1  |
|  [Jest](https://facebook.github.io/jest)  |    Unit test   | 19.0.2  |

#### Webpack plugins

- Extract Text Plugin
 - Extract text from bundle into a file.
 - https://github.com/webpack-contrib/extract-text-webpack-plugin

- HTML Webpack Plugin
 - Simplifies creation of HTML files to serve your webpack bundles
 - https://github.com/jantimon/html-webpack-plugin

- Copy Webpack Plugin
 - Copy files and directories in webpack
 - https://github.com/kevlened/copy-webpack-plugin

#### Babel plugins & presets
- babel-eslint allows you to lint ALL valid Babel code with the fantastic ESLint.
 - ESLint using Babel as the parser.
 - https://github.com/babel/babel-eslint
 - Custom module resolver plugin for Babel
 - https://github.com/tleunen/babel-plugin-module-resolver

#### ESLint plugins
- 
 - https://www.npmjs.com/package/eslint-import-resolver-webpack

#### React
- Runtime type checking for React props and similar objects.
- https://www.npmjs.com/package/prop-types
- A React Google Login Component
- https://github.com/anthonyjgrove/react-google-login

#### Redux / React Router
 - 
  - https://github.com/reactjs/react-router-redux
  - Logger for Redux
  - https://github.com/evgenyrodionov/redux-logger

####  
 - 
  - https://github.com/danawoodman/react-fontawesome
  - https://github.com/pughpugh/react-countdown-clock

#### Unit Testing
- Enzyme
 - http://airbnb.io/enzyme/
- Chai
 - http://chaijs.com/

Guides:
React Code Style with ESLint + Babel + Webpack
https://www.robinwieruch.de/react-eslint-webpack-babel/
USING ESLINT WITH WEBPACK
https://shellmonger.com/2016/01/26/using-eslint-with-webpack/
