###  JSON Web Token (JWT) とは

#### 概要

- HTTP ヘッダーやクエリパラメータに JSON データを付与するための仕組みのこと

    - POST であれば body に JSON をそのままテキストとして書けば良いが、 GET などではその方法は使えない

        - → 全ての HTTP メソッドで、HTTP ヘッダーやクエリパラメータを利用することで JSON データを送信することを可能にするのが JWT
    
<br>

#### 疑問

- JSON データをそのまま文字列としてクエリパラメータやリクエスト/レスポンス　ヘッダーに付与しないのか?

    - セキュリティ面で問題あり

    - JSON データをそのまま文字列として付与しようとすると、ヘッダーや URL が長くなりすぎる

        - URLやHTTPヘッダーには文字数制限があるため長いヘッダーや URL ではリクエスト/レスポンスが送れなくなる

    → これらの問題を JWT および JWS で解決する

<br>
<br>

参考サイト

[基本から理解するJWTとJWT認証の仕組み](https://developer.mamezou-tech.com/blogs/2022/12/08/jwt-auth/)

---

### JWT の仕組み

- JWT は以下のような文字列

<img src="./img/JWT_1.jpeg.avif" />

引用: [JWT認証の流れを理解する](https://qiita.com/asagohan2301/items/cef8bcb969fef9064a5c)

<br>

#### 構成

- JWT は以下の3つから構成される

    1. Header 部 (要素)

        <img src="./img/JWT-Header_1.png" />
        
        引用: [ITまとめノート JWT (JSON Web Token)](https://shukapin.com/infographicIT/jwt)

        <br>

        - 署名生成 (Signature部) に使用したアルゴリズムやその他メタ情報が記載される

        - 上記情報が [BASE64URL エンコード](#base64url-エンコードとは)されたものが Header 部

    <br>

    2. Payload 部 (要素)

        <img src="./img/JWT-Payload_1.png" />

        引用: [ITまとめノート JWT (JSON Web Token)](https://shukapin.com/infographicIT/jwt)

        <br>

        - 主要な情報が記述される

        - Payload 部のデータ項目 (JSONのキーと値のペア) はクレームと呼ばれる

        - 上記情報が BASE64URL エンコードされたものが Payload 部

    <br>

    3. Signature 部 (要素)

        <img src="./img/JWT-Signature_1.png" />

        引用: [ITまとめノート JWT (JSON Web Token)](https://shukapin.com/infographicIT/jwt)

        <br>

        - (BASE64URL エンコードされた) Header 部と Payload 部をピリオドで繋げた文字列をJWTの発行者のみが知るシークレット鍵を使ってハッシュ化した文字列をさらに BASE64URL エンコードしたもの

        - Signature 部は Header と Payload のデータが改ざんされていないことを確認するために使用される

<br>
<br>

参考サイト

[ITまとめノート JWT (JSON Web Token)](https://shukapin.com/infographicIT/jwt

---

### JWTの利用の流れ



---

### Token とは

- 認証情報や権限などの情報を表す文字列のこと

<br>
<br>

参考サイト

[JWTとは](https://qiita.com/keitean/items/a2d8f365b6541d26ed05)

---

### BASE64URL エンコードとは

- BASE64 エンコードをかけた後に、URL で特別な意味を持つ記号「+」と「/」を他の記号に変換する方式 をBASE64 エンコードと呼ぶ

- URL セーフな BASE64 エンコードと呼ばれたりもする

<br>

#### エンコードとは

- とあるルールに沿ってデータを変換する

- 変換したデータを元のデータに戻すことをデコードと呼ぶ

<br>

#### URL セーフとは

- URL/URIのファイル名やクエリ文字列などの一部としては使用できない記号や文字を、使用できる文字の特殊な組み合わせによって表記すること

<br>
<br>

[JSON Web Token (JWT) の仕組み](https://www.ios-net.co.jp/blog/20231115-1720/#BASE64URLエンコード)

[Base64 エンコードと Base64 URL エンコードの違い](https://qiita.com/kunihiros/items/2722d690b1525813c45e)

[BASE64、URLエンコード、HTMLエスケープとは・・](https://www.omakase.net/blog/2022/06/base64urlhtml.html)

[Base64とは？エンコードの方法などをわかりやすく解説！](https://it-infomation.com/base64/)