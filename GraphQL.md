### GraphQL とは

- Facebook が開発した API のクエリ言語であり、API の仕組みでもある

- 通信プロトコルは HTTP/HTTPS に限らない

<br>

#### REST API との違い

<img src="./img/GraphQL-Comparison_2.svg" />

引用: [AppSyncを理解するために、GraphQLについてまとめてみた](https://benjamin.co.jp/blog/technologies/graphql_for_appsync/#graphql)

<br>

<img src="./img/GraphQL-Comparison_1.png" />

<br>

- ##### REST API

    - 取得できるデータは操作対象のリソース&メソッドによって決まる

<br>

- ##### GraphQL

    - エンドポイント (URL) は基本的に1つ

    - (HTTP/HTTPS の場合) 利用するメソッドは基本的に POST 

        - クエリをリクエストボディに含めるから

        - GET メソッドを使って、クエリをリクエストパラメータに含めてもいいけど、そこまでする意味はない

<br>

#### GraphQL のメリット/デメリット

- メリット
    - クエリに必要なデータのみを指定することで、過不足なくデータを取得可能
        
        <img src="./img/GraphQL_1.webp" />

        引用: [エンジニア初学者におすすめ GraphQLの基礎と簡単なクエリ例](https://envader.plus/article/419)

        <br>

        - 一方、REST API の場合はデータの過不足が発生することがある

            <img src="./img/REST-API-Cons_1.svg" />

<br>

- デメリット

    - REST API と比べると学習コストが高い

    <br>

    - クエリ内容によっては、サーバー側の負荷が大きくなる

    <br>

    - キャッシュ管理が難しい

        - エンドポイントが1つで、リクエストごとにクエリが異なることがほとんどなので、[キャッシュキー](#キャッシュキー)が決めれない

    <br>

    - エラー処理が複雑

        - GraphQL では、レスポンスの HTTP ステータスコードは基本に 200 (バックエンド側の処理の成功/失敗に関わらず)

        - エラー情報はレスポンスの errors フィールド に格納される
<br>
<br>

参考サイト

[【今話題！】GraphQLとは？RESTとの違いやできること、仕組みを詳しく解説！](https://jitera.com/ja/insights/39795)

[GraphQLのエラーハンドリングが分かりづらすぎるので整理する](https://zenn.dev/minamiso/articles/994e56830e42e1)

---

### GraphQL で大事な概念、用語

- **[スキーマ](#スキーマ)**

- #### クエリ

<br>

#### ミューテーション

<br>

#### サブスクリプション

<br>

#### リゾルバ

<br>
<br>

参考サイト

このセクション全般に関する記事
- [エンジニア初学者におすすめ GraphQLの基礎と簡単なクエリ例](https://envader.plus/article/419)
- [GraphQL入門：基本概念とクエリの書き方を一通り体験しよう](https://zenn.dev/dotdtech_blog/articles/994a7e82f98fb8#リゾルバ定義)

<br>

クエリ、ミューテーション、サブスクリプションについて
- []()

<br>

リゾルバーについて
- []()

---

### スキーマ

<img src="./img/GraphQL-Schema_1.svg" />

<br>

- API 全体の型定義の設計図

    - GraphQL API が提供するデータや操作の構造をまとめたもの

<br>

- スキーマで定義できるデータ型は以下の通り

    - #### スカラー型 (Scalar)

        <img src="./img/GraphQL-Schema-Scalar-Type_1.svg" />

        <br>

        - ★主にオブジェクトのフィールドの型として利用される

        <br>

        - 単独では定義できないし、する必要がない

            ```graphql
            type User { #User型オブジェクト
                user_id: ID! #スカラー型(ID) のuser_idフィールド
                name: String! #スカラー型(String) のnameフィールド
                age: Int #スカラー型(Int) のuser_idフィールド
            }

            #↓みたいな単独でのスカラー型の定義はできない
            UserName: String 
            ```

        <br>
        
        - 提供されているスカラー型は以下の通り

            - `String`: 文字列

            - `Int`: 整数

            - `Float`: 浮動小数点

            - `Boolean`: 論理

            - `ID`: unique identifier

                - ★★オブジェクトを一意に識別する文字列 → GraphQL 側では文字列として識別される

                - ★★GraphQL 自体は ID が本当に一意かどうかを保証しない

    <br>

    - #### オブジェクト型 (Object)

        <img src="./img/GraphQL-Schema-Object-Type_1.svg" />

        <br>

        - 1つ以上のフィールドを持つデータ構造を定義する型

            - 各フィールドは名前と型

            - ★フィールドには他のオブジェクト型を含むこともできる

        <br>

        - `type` キーワードで宣言する

        <br>

        - ★クエリの返り値になる

    <br>

    - #### 列挙型 （Enum）

        <img src="./img/GraphQL-Schema-Enum-Type_1.svg" />

        <br>

        - Enum は 固定の選択肢を持つ型

            - Enum 型で列挙する値は小文字でも別にいいが、慣例としては全て大文字&単語間のつなぎ文字は`_`

        <br>

        - `enum`キーワードで宣言する

        <br>
    
        - ★Enum 型を受けるクエリに対して列挙されていない値を受け取った場合、 GraphQL サーバー側でバリデーションエラーになる (DB などへデータを取得する前にエラーにする)

    <br>

    - #### インターフェース型 （Interface）

        <img src="./img/GraphQL-Schema-Interface-Type_1.svg" />

        <br>

        - 他のプログラミング言語の interface と同じで、オブジェクトが実装すべきオブジェクトが実装すべきフィールドを定義した型

        <br>

        - ★`interface` キーワードで宣言する

        <br>

        - ★他のオブジェクト型は `implements` キーワードでその interface を実装する

        <br>

        - クエリやミューテーション、サブスクリプションの戻り値のデータ型としても指定できる

            - ★★実際のクエリなどから返ってくるのは実装した具体的な型

            - ★★しかし、戻り値でアクセスできるフィールドは Interface が持つフィールドのみ (Java などをイメージするとわかりやすい)

                <img src="./img/GraphQL-Schema-Interface-Type_2.svg" />

        <br>

        - ★interfaceで Nullable で定義したフィールドは実装オブジェクトで Non-Null に変更することが可能 (**実装タイプのフィールドは Interface のフィールド型の“サブタイプ”であればOK**)

            <img src="./img/GraphQL-Schema-Interface-Type_3.svg" />

            <br>
            
            - ★★同様に interface で定義したフィールドの具体クラスを実装オブジェクト側で定義することも可能

    <br>

    - #### ユニオン型（Union）

        <img src="./img/GraphQL-Schema-Union-Type_1.svg" />

        <br>

        - 複数の型のうち1つを返す型

            - [TypeScript のユニオン型](https://typescriptbook.jp/reference/values-types-variables/union)と同じ

        <br>

        - ★`union` キーワードで宣言し、`=` で対象の型を指定する

        <br>

        - ★ユニオン型の対象に interface 型を含めることはできない → オブジェクト型のみ

            <img src="./img/GraphQL-Schema-Union-Type_2.svg" />

    <br>

    - #### 入力型 (Input Object)

        <img src="./img/GraphQL-Schema-Input-Type_1.svg" />

        <br>

        - クエリやミューテーションに引数として渡す複雑なオブジェクトの型を定義するもの
        
        <br>

        - ★`input` キーワードで宣言する

    <br>

    - #### クエリ型 (Query)

        - プログラムで言うメソッドに近い

    <br>

    - #### ミューテーション型 (Mutation)

        - プログラムで言うメソッドに近い

    <br>

    - #### サブスクリプション型 (Subscription)

        - プログラムで言うメソッドに近い

<br>

- スキーマは SDL（Schema Definition Language）という独自の構造（言語）で書かれる

<br>

- ★オブジェクト名やそのフィールド名、クエリ(ミューテーション、サブスクリプション)名などはスペースを含んではいけない

<br>
<br>

参考サイト

[GraphQLスキーマ完全ガイド | 理解して再利用できるスキーマ解説](https://blog.querier.io/posts/detail/4z6k00um7ivp/)

---

### クエリ

---

---

### キャッシュキー

- キャッシュされたデータを取り出すための鍵（ID）のこと

    - サーバー側で「このリクエストに対するレスポンスを保存しておこう」だったり、「前と同じリクエストだから、サーバーに問い合わせずにキャッシュを返そう」というような場合に、「同じリクエストかどうか」を判断する必要がある

        →その判断に使われるのがキャッシュキー

<br>

- REST では、だいたい URL がキャッシュキー

    ```
    1回目のリクエスト: GET /users/1
    2回目のリクエスト: GET /users/1
    
    同じURLなので、2回目のリクエストはサーバーに問い合わせずにキャッシュに保存したデータを返そうとなる
    ```

---

### スカラー型 ID とは
