### 概要

[【図解解説】これ1本でGraphQLをマスターできるチュートリアル【React/TypeScript/Prisma】](https://qiita.com/Sicut_study/items/13c9f51c1f9683225e2e) に倣ってTypeScript、[Apollo Server](#apollo-server-とは)、SQLite で GraohQL サーバーを構築してみた

---

### ApolloServer / ApolloClient

- #### [ApolloServer](./ApolloServer.md)

    - Node.js 上で動作する GraphQL サーバーを作るためのライブラリ

- #### [ApolloClient](./ApolloClient.md)

    - GraphQL サーバーに投げるリクエストを簡単にしてくれるライブラリ

---

### チュートリアルで上手くいかなかった部分

#### 紹介されていた server.ts のコードが古かった

1. schema の書き方が新しくなっていた
   
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

2. サーバー (スタンドアローンサーバー = apollo serverが提供しているサーバー機能) の建て方が新しくなっていた

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

<br>

#### Prisma Client の使い方が新しくなっていた

- チュートリアルでの prisma の使い方

    - インストール

        ```bash
        npm install prisma --save-dev
        npx prisma init --datasource-provider sqlite
        ```

    <br>

    - Prisma Client の使い方

        - `@prisma/client` から Prisma Client をインポートしている

            ```js
            import { PrismaClient } from "@prisma/client";

            //★prisma clientの作成
            const prisma = new PrismaClient();

            //途中省略

            //リゾルバー
            const resolver = {
                Query: {
                    getTodos: async(_: unknown, args: any, context: Context) => {
                        return await context.prisma.todo.findMany(); //★prisma client を通りてSQLiteからデータ取得
                    }
                }
            }

            const server = new ApolloServer({
                typeDefs,
                resolvers,
                context: () => ({ prisma }),
            });

            server.listen().then(({ url }) => {
                console.log(`Server ready at ${url}`);
            });
            ```

<br>

- 2025/12/14 時点での prisma の使い方

    - インストール 

        - `prisma` は prisma.schema を生成するための CLI ツールとなった (本番には必要ないので -D でインストール)

        - `@prisma/client` はアプリ側でデータベースとやり取りをするためのライブラリ (ORM) となった

        - 使用する SQLite 用のアダプターパッケージもインストールする必要がある


            ```bash
            npm install -D prisma
            npm install @prisma/client

            #↓SQLite用のアダプター
            npm install @prisma/adapter-better-sqlite3 

            #↓SQLite用のアダプターの型定義パッケージ
            npm install -D @types/better-sqlite3

            #↓接続先情報を環境変数に隠したいならインストール
            npm install dotenv
            npm install -D @types/node
            ```

    <br>

    - Prisma Client の使い方

        - ★スキーマファイルを元に `prisma generate` で Prisma Client を生成

            ```prisma
            // Prisma schema ファイル
            generator client {
                provider = "prisma-client"
                output   = "../src/generated/prisma" //★ここがPrisma Clientが出力される場所
            }

            datasource db {
                provider = "sqlite"
            }

            model Todo {
                id String @id @default(uuid())
                title String
                completed Boolean
            }
            ```
            
            ```bash
            npx prisma generate
            ```

        <br>

        - 生成した Prisma Client を利用

            - ★Prisma Client インスタンスを作成するほかに、アダプターインスタンスも作成する必要がある

            ```js
            //servrt.ts
            import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
            import { PrismaClient } from "./generated/prisma/client.ts";

            const connectionString = process.env.SQLITE_URL; //接続先情報(dotenvで環境変数にした)

            const adapter = new PrismaBetterSqlite3({ url: connectionString });
            const prisma = new PrismaClient({ adapter }); //★こいつかPrisma Client

            //途中省略

            //リゾルバー
            const resolver = {
                Query: {
                    getTodos: async() => {
                        return await prisma.todo.findMany(); //★prisma client を通りてSQLiteからデータ取得
                    }
                }
            }


            const server = new ApolloServer({
                typeDefs,
                resolvers,
            });

            const { url } = await startStandaloneServer(
                server,
                {
                    listen: { port: 4000 }
                }
            );
            ```

<br>

#### Vite + TailwindCSS の利用方法も新しくなっていた

- チュートリアルでは...

    - 必要なパッケージのインストール

        ```bash
        npm install -D tailwindcss@3.4.13 postcss autoprefixer
        ```

<br>

- 2025/12/14 時点での Vite * TailwindCSS の使い方は...

    - 必要なパッケージのインストール

        - ★Viteを使っている場合は、「@tailwindcss/vite」パッケージに postcss, autoprefixer が含まれるようになった

            ```bash
            npm install -D tailwindcss @tailwindcss/vite
            ```

        <br>

    - vite.config.ts にて `@tailwindcss/vite` プラグインを使うよう指定する

        ```ts
        //vite.config.ts
        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        import tailwindcss from '@tailwindcss/vite' //★これ

        export default defineConfig({
            plugins: [
                react(),
                tailwindcss(), //★これ
            ]
        })
        ```

<br>
<br>

参考サイト

[Quickstart with Prisma ORM and SQLite](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/sqlite)

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
                addMemo: (_: Object, { id, content }: {id: string, content: string}) => {
                    //memoの追加処理
                }
            }
        }
        ```

    <br>

    - ~~解決策: 変数にオペレーション名を格納し、その変数を schema, resolver で使い回す (動的プロパティ名の利用)~~

        - ★★訂正: 動的プロパティ名を使ってスキーマ定義を書くと [codegen による型情報ファイルの生成](../codegen.md#サーバー側での利用方法-resolver用の型情報ファイルの生成) がうまくいかなかった

            → [スキーマは .gql (.graphql) に切り分けて管理](../スキーマを外部に切り分ける.md)した方がいい

        ```typescript
        //ミューテーションオペレーション名の管理オブジェクト
        const mutationOperation = {
            addMemo: "addMemo"
        };

        const schema = `
            type Mutation {
                ${mutationOperation.addMemo}(id: ID!, content: String!): Memo
            }
        `;

        const resolver = {
            Mutation: {
                [mutationOperation.addMemo]: (_: Object, { id, content }: {id: string, content: string}) => {
                    //memoの追加処理
                }
            }
        }
        ```
    
<br>
<br>

参考サイト

[動的にプロパティ名を設定できるようになりました。（現代的JavaScriptおれおれアドベントカレンダー2017 – 07日目）](https://ginpen.com/2017/12/07/computed-property-name/)