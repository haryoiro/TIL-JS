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
      yarn add passport passport-github2 express-session
      ```
    secret
    9a9fb4fc0fdc2717
  - WebSocket
    - socket.io
    - socket.io-client
    ```
    yarn add socket.io socket.io-client
    ```
      
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

##### プレイヤーオブジェクト アイテムオブジェクトの設計
|変数名|型|説明|
|:-|:-|:-|
|x|int|X座標|
|y|int|Y座標|
|playerID|string|プレイヤー識別子|
|displayName|string|表示名|
|thumbUrl|string|アイコン画像URL|
|isAlive|boolean|生存フラグ|
|direction|string|進行方向|
|missilesMany|int|魚雷所持数|
|airTime|int|残り酸素数|
|aliveTime|Object|生存字間|
|deadCount|int|死亡ご経過時間|
|score|int|得点|