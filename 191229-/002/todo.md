# New Game
---

起動コマンド
  - `PORT=8000 yarn start`
##### フレームワーク
  - Express.js
  - socket.io

##### 雛形作成
  express-generator
  `express --view=pug onilneSubmarine`

##### .gitignore
```
config.js
node_modules
```
  

##### middleware
  - ###### 
    - helmet
    `yarn add helmet`
    ```js
    var helmet = require('helmet')
    ---
    app.use(helmet())
    ```
  - ###### GitHub AOuth 2.0
    - passport
    - passport-github2
    - express-session
    ```
      yarn add passport
      yarn add passport-github2
      yarn add  express-session
      ```
    secret
    9a9fb4fc0fdc2717
##### Webpack
- webpack.config.js
    - webpack
    - webpack-cli
    - babel-loader@7
    - babel-core
    - babel-preset-env
    ```
    yarn add --dev webpack webpack-cli babel-loader@7 babel-core babel-preset-env
    ```
    ``` js
    const path = require('path')
    module.exports = {
      mode: 'development',
      devtool: 'none',
      context: __dirname + '/app',
      entry: {
        './'
      },
      output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name]bundle.js'
      },
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        }]
      }
    }
    ```
      
##### ルーティング
  |Path|Method|Discripption|
  |:-|:-|:-|
  |/|GET|トップページ|
  |/login|GET|ログイン|
  |/logout|GET|ログアウト|
  |/game|GET|ゲーム|

