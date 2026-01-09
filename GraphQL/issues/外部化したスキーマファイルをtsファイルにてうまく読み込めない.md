### 事象

- fs を使って外部化したスキーマファイル (.gql) を読み込もうとしたら `no such file or directory` が発生した

    ```プロジェクト構成
    プロジェクトルート
    |-src
        |-server.ts //このファイルから.gqlファイルを読み込む
        |-schema.gql //読み込み対象ファイル
        |-egnerated //PrismaClient
            |-prisma
                |-~~.ts
    ```

    ```ts
    //server.ts
    import { ApolloServer } from "@apollo/server";
    import { startStandaloneServer } from "@apollo/server/standalone";
    import { prisma } from "../lib/prisma.ts";
    import fs from "fs";
    import path from "path";

    const typeDefs = fs.readFileSync(
        path.resolve(__dirname, "schema.gql"), //★スキーマファイルのパス指定はここ
        "utf-8"
    )
    //以下省略
    ```

    ```bash
    #エラー内容
    /Users/~~/~~/プロジェクトルート/src/generated/prisma
    Error: ENOENT: no such file or directory, open '/Users/~~/~~/プロジェクトルート/src/generated/prisma/schema.gql'
    ```

    <img src="../img/Issue-dirname_1.svg" />

---

### 原因

- スキーマファイルのパス指定に `__dirname` を使っているのが原因

    - ESM では __dirname は使えない

<br>
<br>

参考サイト

[Node.js の ES modules で __dirname や __filename を使う](https://osgsm.io/note/js-node-esm-dirname-filename/)

---

### 解決策

- __dirname の代わりに `import.meta.dirname` を使う

    ```diff
    + const dirname = import.meta.dirname;
    
    const typeDefs = fs.readFileSync(
    -    path.resolve(__dirname, "schema.gql"),
    +    path.resolve(dirname, "schema.gql"),
        "utf-8"
    )
    ```