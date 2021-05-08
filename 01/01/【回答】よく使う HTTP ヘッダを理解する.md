# 【回答】よく使う HTTP ヘッダを理解する

課題については、Airtable にアクセスして頂き、「よく使う HTTP ヘッダを理解する」をご確認願います。
https://airtable.com/tblg8ePOEQRDtIGiY/viwV3pAlEvPOOgmHF?blocks=hide

## 1-1.ヘッダーの意味と役割について

### Host（ヘッダー種別：リクエストヘッダー）

HTTP/1.1 で唯一の必須ヘッダです。ブラウザからサーバに対して、サーバ名を送信します。  
サーバが名前ベースの仮想ホストをサポートしている場合、この名前を手がかりにどのサーバとして振舞うか決定されます。例えば、http://aaa.sample.dom/ と http://bbb.sample.dom/ は実は同じサーバ（IP アドレス：61.206.47.206）ですが、Host ヘッダでホスト名を指定することにより、仮想的に 2 つのサーバとして振舞うことが可能になります。

### Content-type（ヘッダー種別：エンティティヘッダー）

コンテンツの種別を MIME タイプで示します。下記は、コンテンツの内容がテキスト（HTML）形式であることを示します。

```
Content-Type: text/html
```

加えて、文字コード（Shift_JIS、euc-jp、ISO-2022-JP、UTF-8 など）を示すこともできます。

```
Content-Type: text/html; charset=Shift_JIS
```

### User-agent（ヘッダー種別：リクエストヘッダー）

ブラウザ（＝ユーザエージェント）の情報をサーバに伝えます。フォーマットは特に規定はありません。ブラウザの種別やバージョン、プラットフォームなどの情報が含まれます。下記は、Mozilla/4.0（＝ Netscape Navigator 4.0）と互換性のある Microsoft の IE 6.0 で、OS は Windows NT 5.1（＝ Windows XP）であることを示しています。

```
User-Agent: Mozilla/4.0 (Compatible; MSIE 6.0; Windows NT 5.1;)
```

### Accept（ヘッダー種別：リクエストヘッダー）

ブラウザが受信可能なデータ形式（MIME タイプ）をサーバに伝えます。アスタリスク（\*）は「すべて」を意味します。下記は、ブラウザが GIF や JPEG、その他どんな形式のデータでも受信可能であることを示します。

```
Accept: image/gif, image/jpeg, */*
```

### Referer（ヘッダー種別：リクエストヘッダー）

このリクエストの元となったページの URL（通常はリンク元の URL）を通知します。

```
Referer: http://xxx.yyy.zzz/index.html
```

### Accept-Encoding（ヘッダー種別：リクエストヘッダー）

ブラウザが受信可能なエンコード方式をサーバに伝えます。例えば、ブラウザが gzip 形式をサポートしていることをサーバに伝え、サーバはメッセージボディを自動的に gzip 圧縮してブラウザに送り、ブラウザ側がこれを自動的に解凍して画面に表示します。こうした機構により、通信負荷を低減することが可能です。

```
Accept-Encoding: gzip, deflate
```

### Authorization（ヘッダー種別：リクエストヘッダー）

認証が必要なリソースに対して認証情報を伝えます。例えば、BASIC 認証の場合は、Basic の文字と、ユーザ名とパスワードをコロン（:）で連結したものを BASE64 形式にエンコードしたものを転送します。

```
Authorization: Basic dGFuYWthOmhpbWl0c3U=
```

### Location（ヘッダー種別：レスポンスヘッダー）

エンティティの場所が移動した場合など、ブラウザがリクエストした URL とは別の URL にジャンプさせたい場合に使用します。URL には http:// や https:// で始まる絶対 URL を指定します。

```
Location: http://www.yyy.zzz/aaa.html
```

## 1-2. referer について

### Q1

re=noreferrer について
なぜそのような設定が必要なのでしょうか？  
rel=noreferrer を設定しなかった場合に起きうる問題を調べて説明

### A1

(1) セキュリティ上の問題
遷移先から遷移元のページを不正に操作したり、オブジェクトにアクセスしたりできてしまいます。  
これによって、フッシング詐欺攻撃を行う余地を生んでしまいます。

(2) パフォーマンス上の問題
遷移先のページは、遷移元のページと同じプロセスで実行される場合があります。  
遷移先のページが多くの JavaScript を実行している場合、ページのパフォーマンスが低下する可能性があります。

### Q2

同じオリジンの時は referer の情報を全部送って、別オリジンの時は、オリジン情報だけを referer として送信するように、HTTP レスポンスヘッダを追加

### A2

referrerpolicy 属性に「origin-when-cross-origin」という値を設定します。

```
<a href="https://www.yahoo.co.jp/" referrerpolicy="origin-when-cross-origin" target="_blank">Yahoo! Japan</a>
```

## 2.HTTP ヘッダーに関するクイズの作成

以下のとおり、HTTP ヘッダーに関するクイズを 3 問作成しました。

### Q1. ウェブアプリケーションをクリックジャッキング攻撃から防御したいです。HTTP レスポンスヘッダに、X-Frame-Options ヘッダフィールドを出力し、以下の範囲で他ドメインのサイトからの frame 要素や iframe 要素による読み込みを制限する場合、X-Frame-Options にて指定する適切な値を以下から選択してください。

(a) DENY
(b) SAMEORIGIN
(c) ALLOW-FROM

### Q2.X-XSS-Protection ヘッダは、ブラウザの XSS フィルター機能を使って有害スクリプトを検出する方法を指示するためのヘッダである。XSS フィルター機能を有効にして有害なスクリプトを検知するために最も有効な設定値を以下から選択してください。

(a) X-XSS-Protection: 0;
(b) X-XSS-Protection: 1;
(c) X-XSS-Protection: 1; mode=block

### Q3.既存及び将来のすべてのサブドメインで、2 年間（63072000 秒）を期限として HTTPS を使用する場合、HTTP のみで提供できるページやサブドメインへのアクセスをブロックする設定として最も適切な設定値を以下から選択してください。

(a) Strict-Transport-Security: max-age=31536000;
(b) Strict-Transport-Security: max-age=63072000;
(c) Strict-Transport-Security: max-age=63072000; includeSubDomains
