# Rithm School Node.js Exercises.

APIリクエストを送信し、データをテキストファイルに保存できる単純なコマンドラインツールを作成する。

使用するモジュール
- fs        ファイルの読み取りと書き込み
- process   
- request   APIリクエストを作成するため コマンドラインから引数を収集するため
- prompt  

以下のAPIを使用
https://icanhazdadjoke.com/api

引数を渡す代わりにpromptモジュールを使用してコマンドラインからユーザーに入力を求める
leaderboardというコマンドライン引数を受け入れる必要があります。
コマンドが渡された場合、アプリケーションは表示回数に基づいて最も人気のあるジョークを返す必要があります


- pormptでユーザからleaderboardの入力を受け取る
- process.argv[2]~[5]までは検索
- 受け取った値でdad joke APIにAPIリクエストを行いJSONparseする
- JSONを検索用語で検索し、一致するものがあった場合、ランダムなジョークをコマンドラインに出力
- joke.txtに保存
- 見つからない場合はコンソールに用語と見つからなかったことをユーザに知らせる

