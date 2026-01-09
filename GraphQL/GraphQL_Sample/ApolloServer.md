### Apollo Server とは

- Node.js 上で動作する GraphQL サーバーを作るためのライブラリ

<br>

```bash
npm install @apollo/server graphql
```

- `graphql`

    - GraphQL サーバーのコア機能 (スキーマ、リゾルバーなど)

        - ★graphql パッケージは GraphQL のクエリを“実行するだけ”のライブラリ

    - ★`graphql` だけでは HTTP リクエストを扱えない

<br>

- `@apollo/server`

    - ブラウザやクライアントから来た GraphQL クエリ (HTTP リクエスト) を受け取れるようにする

    - 受け取ったクエリをもとに「どのリゾルバを動かすか」、「どう返すか」を管理する

<br>
<br>

参考サイト

[Get Started with Apollo Server](https://www.apollographql.com/docs/apollo-server/getting-started)