### CORS とは

- Cross-Origin Resource Sharing  (オリジン間リソース共有) の略

- ある[オリジン](#オリジンとは)で動いている Web アプリケーションに対して、異なるオリジンとのデータ交換を可能にするセキュリティ上の仕組み

    - 通常、異なるオリジンからのリソースを読み込もうとした場合、ブラウザはそのリソースの読み込みを禁止する

<br>

<img src="./img/CORS_1.png" />

引用: [DENET技術ブログ 初心者向け】プロキシ と CORS についてまとめてみました。（図解）](https://blog.denet.co.jp/proxy-reverseproxy-cors/)

<br>

#### クロスオリジンなアクセスを許可するために

<img src="./img/CORS_2.png" />

<br>

- ざっくりというと、クライアント + クロスオリジンなサーバー側で CORS に対応する必要がある

<br>

- クライアントサイド

    - クロスオリジンなサーバーへのリクエストヘッダに Orgin という項目をついかする

        - Origin には呼び出し元のオリジンを指定する

<br>

- クロスオリジンなサーバーサイド

    - そのサーバーのリソースにアクセス可能なオリジンを決め、　レスポンスヘッダーの Access-Control-Allow-Origin にそのアクセス可能なオリジンを指定する

<br>
<br>

参考サイト

[ITまとめノート 同一オリジンポリシー / CORS](https://shukapin.com/infographicIT/origin-policy)

[CORSの仕組みをGIFアニメで分かりやすく解説](https://coliss.com/articles/build-websites/operation/work/cs-visualized-cors.html)

---

### オリジンとは

<img src="./img/Origin_1.svg" />

引用: [ITまとめノート 同一オリジンポリシー / CORS](https://shukapin.com/infographicIT/origin-policy)

<br>

- プロトコル、ホスト(マシン)、ドメイン、ポート番号 の組み合わせ

    ```
    例1: 以下は同じオリジンではない
    - http://example.com/app1
    - https://example.com/app2

    理由: プロトコルが異なっているため

    
    例2: 以下は全て同じオリジン

    - http://example.com/app1
    - http://example.com/app1/user/page.html
    - http://example.com/app2

    理由: プロトコル ~ ポート番号までが同じため
    ```

<br>
<br>

参考サイト

[ITまとめノート 同一オリジンポリシー / CORS](https://shukapin.com/infographicIT/origin-policy)

[Origin (オリジン)](https://developer.mozilla.org/ja/docs/Glossary/Origin)