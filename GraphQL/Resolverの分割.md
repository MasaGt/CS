### リゾルバーの分割

- スキーマが肥大化するに従いリゾルバーも肥大化する

    - [スキーマの分割](./スキーマを外部に切り分ける.md)と同様にリゾルバーも分割するのがスタンダード

<br>

- `@graphql-tools/merge` パッケージにはリゾルバーをマージしてくれる機能が提供されている

---

### 分割したリゾルバーのマージ


- 以下のようなプロジェクト構成とする

    <img src="./img/GraphQL-Multi-Resolvers_1.svg" />

    <br>

    <img src="./img/GraphQL-Multi-Resolvers_2.svg" />


<br>

- ★(必要であれば) codegen を利用してリゾルバー用の型定義ファイルを生成する (詳しくは[こちら](./codegen.md#サーバー側での利用方法-resolver用の型情報ファイルの生成)を参照)

    ```ts
    //codegen.ts
    import { CodegenConfig } from "@graphql-codegen/cli";

    const config: CodegenConfig = {
        schema: 'schema/**/*.gql',
        generates: {
            './generate/resolvers-types.ts': {
                plugins: [
                    'typescript',
                    'typescript-resolvers'
                ]
            }
        },
        ignoreNoDocuments: true
    };

    export default config;
    ```

<br>

- 各リゾルバーを実装する

    - resolvers/todo.ts

        <img src="./img/GraphQL-Multi-Resolvers_3.svg" />
    
    <br>

    - resolvers/user.ts

        <img src="./img/GraphQL-Multi-Resolvers_4.svg" />

<br>

- ★★`@graphql-tools/merge` パッケージを利用して分割したリゾルバーをマージする

    <img src="./img/GraphQL-Multi-Resolvers_5.svg" />