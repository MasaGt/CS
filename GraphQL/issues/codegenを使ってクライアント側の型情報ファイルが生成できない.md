### 事象

- codegen を利用して以下のクライアント側のコードとサーバー側のスキーマ定義からクライアント側で利用するう型情報ファイルを生成しようとしたらエラーが発生

    ```ts
    //クライアント側のコード(App.tsx)
    import './App.css';
    import { gql } from '@apollo/client';
    import { useQuery } from "@apollo/client/react";

    //サーバーに投げるクエリ
    const QUERY = gql`
        query GetTodo ($ID: String) {
            getTodo (ID: $ID) {
                id
                title
                completed
            }
        }`
    ;
    
    function App() {
        const { data } = useQuery(QUERY, {variables: {ID: "1"}});
        return (<></>)
    }
    ```

    <br>

    ```graphql
    #サーバー側のスキーマ定義ファイル
    type Todo {
        id: ID!
        title: String
        completed: Boolean
    }

    type Query {
        getAllTodo: [Todo!],
        getTodo(id: ID!): Todo
    }

    type Mutation {
        createTodo(title: String): Todo!
        deleteTodo(id: ID!): Todo!
    }
    ```

    <br>

    ```ts
    //クライアント側のcodegen.ts
    import { CodegenConfig } from "@graphql-codegen/cli"

    const config: CodegenConfig = {
        schema: 'http://localhost:4000',
        documents: ['src/**/*.{ts,tsx}'],
        generates: {
            './dist/query-types.ts': {
                plugins: [
                    'typescript',
                    'typescript-operations'
                ]
            }
        }
    }

    export default config;
    ```

    <br>

    ```bash
    #codegen実行時のエラー
    $ npm run codegen
    > client-12-23@0.0.0 codegen
    > graphql-codegen

      ✔ Parse Configuration
      ⚠ Generate outputs
      ❯ Generate to ./dist/query-types.ts
      ✔ Load GraphQL schemas
      ✔ Load GraphQL documents
      ✖ GraphQL Document Validation failed with 2 errors;
        Error 0: Unknown argument "ID" on field "Query.getTodo". Did you mean "id"?
        at /Users/<~省略~>/<プロジェクト>/src/App.tsx:3:14
        
        Error 1: Field "getTodo" argument "id" of type "ID!" is required, but it was not provided. at /Users/<~省略~>/<プロジェクト>/src/App.tsx:3:5
    ```
---

### 原因

- gql`` の文字列中のクエリの引数がおかしい

    <img src="../img/Isssue-Client-Codegen_1.svg" />

---

### 解決策

1. クライアント側のコードのクエリの引数のデータ型を修正 (String → ID)

    ```diff
    //サーバーに投げるクエリ
    const QUERY = gql`
    -    query GetTodo ($ID: String) {
    +    query GetTodo ($ID: ID!) {
            getTodo (ID: $ID) {
                id
                title
                completed
            }
        }`
    ;
    ```

<br>

2. クライアント側のコードのクエリの引数名を修正 (ID → id)

    ```diff
    //サーバーに投げるクエリ
    const QUERY = gql`
        query GetTodo ($ID: ID!) {
    -        getTodo (ID: $ID) {
    +        getTodo (id: $ID) {
                id
                title
                completed
            }
    ;
    ```
