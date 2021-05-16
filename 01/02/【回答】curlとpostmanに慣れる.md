何か API に不具合が起きた時、動作確認をしたい時、毎回フロントエンドを操作して症状を再現するのは手間です
そこで開発中は curl コマンドが多用されます。基本的な curl コマンドの使い方を覚えて、手軽に API をデバッグできるようになりましょう！

# 課題

（curl）

この課題では httpbin を使います
httpbin は、HTTP リクエストの要素（header やクエリパラメータなど）を返してくれる便利なサービスです。curl の練習に最適！
ちなみに httpbin.org に直接リクエストを送ることも可能ですが、Docker でローカル環境に httpbin のサービスを立ち上げて、ローカル環境で検証することも可能です
興味のある方はぜひお試しください！（Docker については後の課題でカバーするので、現時点で Docker の使い方を理解している人だけで OK です）

以下のリクエストを curl コマンドで httpbin に送信してください
curl コマンドをペアと比較して、なぜそのような書き方をしたのか、話し合ってみましょう
問題１
カスタムヘッダーを加える（X-Test='hello'）
method は GET
URL はhttps://httpbin.org/headers
以下のようなレスポンスを得られるはずです
{
"headers": {
"Accept": "_/_",
"Host": "httpbin.org",
"User-Agent": "curl/7.54.0",
"X-Test": "hello" // ここが重要！
}
}

問題２
Content-Type は"application/json"
method は POST
body は {"name": "hoge"}
URL はhttps://httpbin.org/post
以下のようなレスポンスを得られるはずです
{
"data": "{\"name\": \"hoge\"}", // ここが重要！
"headers": {
"Accept": "_/_",
"Content-Length": "16",
"Content-Type": "application/json",
"Host": "httpbin.org",
"User-Agent": "curl/7.54.0"
},
"json": {
"name": "hoge" // ここが重要！
},
"origin": "xxxxxxxxxx", // 自分自身の IP アドレス
"url": "https://httpbin.org/post"
}

問題３
もう少し複雑な body を送信してみましょう。以下のようなオブジェクトを body に含めて、送信してください

{userA: {name: "hoge", age: 29}}

問題４
「ごめんごめん、このエンドポイント、まだ application/json に対応してないから、Content-Type は application/x-www-form-urlencoded で name=hoge を送ってもらえる？」と先輩に頼まれました
Content-Type を変更して、リクエストを送信してみましょう
以下のようなレスポンスを得られるはずです

{
"data": "", // 先ほどはここに name:hoge が含まれていた
"form": {
"name": "hoge" // 今はここに含まれている
},
"headers": {
"Accept": "_/_",
"Content-Length": "16",
"Content-Type": "application/x-www-form-urlencoded",
"Host": "httpbin.org",
"User-Agent": "curl/7.54.0"
},
"json": null, // 先ほどはここに name:hoge が含まれていた
"url": "https://httpbin.org/post"
}

（postman）

ここまで上記課題で何度も curl コマンドを作成しましたが、毎回コマンドを作成するのは大変です。課題を解いている間、こんなことを考えたのではないでしょうか：
以前作成したコマンドを保存しておきたい
複雑なリクエストを作成するのが辛い
もうちょっと簡単にリクエストを作成する方法があっても良さそうですよね
あるんです

postman 　とは？
過去のリクエストを保存したり、複雑なリクエストを GUI から作成したり、様々な機能を備えた強化版 curl みたいな物です
簡単なリクエストなら curl で事足りるのですが、複雑なリクエストになってくると postman の方が便利です
例えば（後に説明しますが）OAuth2.0 の認可により守られた API を開発している場合、認可を突破するまでに何度も通信が発生します
そのやりとりを手動で curl で実施するのはとても面倒で、現実的ではありません
こうした認証も postman は一部自動化してくれます
これを機に使い方に慣れておきましょう！

postman をインストールしてください
上記の課題（curl コマンド）と同じ結果を得られるよう、リクエストを全て postman で再現してください

クイズ
curl に関するクイズを作成してください
postman に関するクイズを作成してください
クイズに関する詳細は　コチラ　を参照してください

# 【回答】curl と postman に慣れる

## (curl)回答 1 カスタムヘッダーを加える（X-Test='hello'）

curl コマンド

```
curl -X GET "https://httpbin.org/headers" -H "X-Test : hello"
```

レスポンス結果

```
{
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.67.0",
    "X-Amzn-Trace-Id": "Root=1-60966c0e-17d00c26714563c15c97ae8f",
    "X-Test": "hello"
  }
}
```

## (curl)回答 2

Content-Type は"application/json"
method は POST
body は {"name": "hoge"}

curl コマンド

```
curl -X POST "https://httpbin.org/post" -H "accept: application/json" -H "Content-Type: application/json" --data '{"name":"hoge"}'
```

レスポンス結果

```
  "args": {},
  "data": "{\"name\":\"hoge\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "application/json",
    "Content-Length": "15",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.67.0",
    "X-Amzn-Trace-Id": "Root=1-60966ad0-0be96c54487afdac5e9b9097"
  },
  "json": {
    "name": "hoge"
  },
  "origin": "126.237.131.120",
  "url": "https://httpbin.org/post"
}
```

## (curl)回答 3

以下のオブジェクト body に含めて送信する。
{userA: {name: "hoge", age: 29}}

curl コマンド

```
curl -X POST "https://httpbin.org/post" -H "accept: application/json" -H "Content-Type: application/json" --data '{"userA":{"name":"hoge","age":29}}'
```

レスポンス結果

```
{
  "args": {},
  "data": "{\"userA\":{\"name\":\"hoge\",\"age\":29}}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "application/json",
    "Content-Length": "34",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.67.0",
    "X-Amzn-Trace-Id": "Root=1-609670f4-2719530b4aa88c6963a468ec"
  },
  "json": {
    "userA": {
      "age": 29,
      "name": "hoge"
    }
  },
  "origin": "126.237.131.120",
  "url": "https://httpbin.org/post"
}
```

## (curl)回答 4

Content-Type は application/x-www-form-urlencoded で name=hoge を送信する。

## (postman)回答 1 カスタムヘッダーを加える（X-Test='hello'）

## (postman)回答 2

Content-Type は"application/json"
method は POST
body は {"name": "hoge"}

## (postman)回答 3

以下のオブジェクト body に含めて送信する。
{userA: {name: "hoge", age: 29}}

## (postman)回答 4

Content-Type は application/x-www-form-urlencoded で name=hoge を送信する。
