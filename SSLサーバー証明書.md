### SSL (TSL) 証明書とは

サーバー証明書と呼ばれることもある

SSL / TLS 通信の際にサーバーがクライアントに提示する証明書

第三者機関から「実在する運営者(組織)によって運営されている本物のウェブサイト」であることを証明するデジタル文書 (第三者機関の署名付き)

<br>

なぜ SSL / TLS 証明書を取得する必要があるのか

- HTTPS 通信を行うために必要

- クライアント(ユーザー)に、我々は第三者から認証されたサーバーですよということを証明するため

---

### 普通のデジタル文書の署名と違う点

- デジタル文書の署名は文書作成者の秘密鍵を使って行う

<img src="./img/Digital-Signature_1.gif" />

引用: [電子署名の仕組み](https://www.jipdec.or.jp/project/research/why-e-signature/PKI-crypto-mechanism.html)

<br>

- SSL / TLS 証明書の署名は、上位機関の秘密鍵を使って行う

<img src="./img/SSL-TLS-Certificate_1.png" />

<br>

SSL / TLS 証明書の中身

- Web サーバーのドメイン名

- **サーバーの公開鍵**  

- SSL / TLS 証明書の発行対象者

- 認可した認証局

- SSL / TLS 証明書の発行日

- SSL / TLS 証明書の有効期限

<br>
<br>

参考サイト

SSL 証明書の中身について： [SSL証明書とは？](https://www.cloudflare.com/ja-jp/learning/ssl/what-is-an-ssl-certificate/)

---

### SSL / TLS 証明書の作られ方

1\. サーバー側で秘密鍵と公開鍵のキーペアを作成する

<img src="./img/TLS-Certificate-Create_1.png" />

<br>

2\. 秘密鍵から CSR (Certificate Signing Request) を作成する

- CSR にはサーバーのドメイン名や公開鍵の情報が含まれている

<img src="./img/TLS-Certificate-Create_2.png" />

<br>

3\. CSR を認証局に送付 (認証局に証明書を依頼)

<img src="./img/TLS-Certificate-Create_3.png" />

<br>

4\. 認証局の秘密鍵で CSR に署名する -> SSL 証明書の完成!

<img src="./img/TLS-Certificate-Create_4.png" />

<br>

5\. 依頼者に SSL 証明書が届くので、サーバーにインストール + (中間)認証局の証明書もダウンロード & インストール

<img src="./img/TLS-Certificate-Create_5.png" />

<br>

6\. SSL / TLS 化の準備完了

---

### SSL 証明書の構造

- サーバー証明書は中間認証局によって署名され、

    *サーバー証明書が中間認証局を挟まず、ルート認証局に署名されていることもある

<img src="./img/TLS-Certificate-Layer_1.png" />

<br>

- 中間認証局の証明書は、他の中間認証局またはルート認証局によって署名され、

<img src="./img/TLS-Certificate-Layer_2.png" />

<br>

- ルート認証局の証明書はルート認証局自身が署名している

<img src="./img/TLS-Certificate-Layer_3.png" />

<br>
<br>

以下の引用画像の方がイメージが湧きやすいかも

<img src="./img/TLS-Certificate-Layer_4.png.webp" />

引用: [SSL証明書のルート認証局・中間認証局 とは？](https://qiita.com/miyuki_samitani/items/35941e2389b8f62625ad)

<br>

ポイント
- ルート認証局の証明書(ルート証明書)は、サーバーに配置されるのではなく、クライアントのブラウザなどにインストールされている

<img src="./img/TLS-Certificate-Layer_5.png" />

引用: [SSL証明書を理解する](https://blog.jbs.co.jp/entry/2024/05/10/091504)

---

### サーバー証明書の正当性チェック

ポイント

- サーバー側は、クライアントに自身のサーバー証明書からルート証明書まで全てを送信する

- クライアント側は、ブラウザにインストールされているルートと証明書の公開鍵とルート証明書の公開鍵を比較し、ルート証明書の正当性チェックを行う

- 以降は、証明書の公開鍵を使って、署名の正当性をチェックし、正当であればその証明書についている公開鍵も正当なものであることが証明できる

- 以降は、リクエストしたサーバーの証明書の正当性が確認できるまで正当性を辿っていく
