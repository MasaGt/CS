### 概要

[【図解解説】これ1本でGraphQLをマスターできるチュートリアル【React/TypeScript/Prisma】](https://qiita.com/Sicut_study/items/13c9f51c1f9683225e2e) に倣ってTypeScript、[Apollo Server](#apollo-server-とは)、SQLite で GraohQL サーバーを構築してみた

---

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

---

### チュートリアルで上手くいかなかった部分

#### 紹介されていた server.ts のコードが古かった

1.  schema の書き方が新しくなっていた
   
   - チュートリアルで紹介されていた schema の書き方

       ```typescript
       import { gql } from "apollo-server";
       const typeDefs = gql`
           type Todo {
               id: ID!
               title: String!
               completed: Boolean!
           }

           type Query {
               getTodos: [Todo!]!
           }
       `;
       ```

   - 新しくなった schema の書き方 (シンプルに文字列でOKになった)

       ```typescript
       const typeDefs = `
           type Todo {
               id: ID!
               title: String!
               completed: Boolean!
           }

           type Query {
               getTodos: [Todo!]!
           }
       `
       ```

<br>

2. サーバーの建て方が新しくなっていた

    - チュートリアルで紹介されていたサーバーの建て方
    
        ```typescript
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        server.listen().then(({ url }) => {
            console.log(`Server ready at ${url}`);
        });
        ```

    <br>

    - 新しくなった schema の書き方

        ```typescript
        import { ApolloServer } from "@apollo/server";
        import { startStandaloneServer } from "@apollo/server/standalone";

        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });

        const { url } = await startStandaloneServer(
            server,
            {
            listen: { port: 4000 },
            }
        );

        console.log(`🚀  Server ready at: ${url}`);
        ```

<br>

#### nodemon が上手く監視してくれなかった   

- 原因: nodemon.json 中の watch 対象の指定方法が間違っていた

    ```json
    {
        "watch": "[src]", //×文字列を渡してしまっていた
        "watch": ["src"], //◯文字列の配列を渡すのが正しい
    }
    ```

---

### 気づき

1. #### schema 側でのオペレーション名と、リゾルバー側でのオペレーション名を別途書くのがめんどくさい

    - 以下の例だと、schema と resolver の中で `addMemo` をそれぞれ書いている

        ```typescript
        const schema = `
            type Mutation {
                addMemo(id: ID!, content: String!): Memo
            }
        `;

        const resolver = {
            Mutation: {
                addMemo: (_: Object, { id, content }: {id: string, conten: string}) => {
                    //memoの追加処理
                }
            }
        }
        ```

    <br>

    - 解決策: 変数にオペレーション名を格納し、その変数を schema, resolver で使い回す (動的プロパティ名の利用)

        ```typescript
        //ミューテーションオペレーション名の管理オブジェクト
        const mutationOperation = {
            addMemo: "addMemo"
        };

        const schema = `
            type Mutation {
                ${mutationOperation.addMemo}$(id: ID!, content: String!): Memo
            }
        `;

        const resolver = {
            Mutation: {
                [mutationOperation.addMemo]: (_: Object, { id, content }: {id: string, conten: string}) => {
                    //memoの追加処理
                }
            }
        }
        ```

<br>
<br>

参考サイト

[動的にプロパティ名を設定できるようになりました。（現代的JavaScriptおれおれアドベントカレンダー2017 – 07日目）](https://ginpen.com/2017/12/07/computed-property-name/)