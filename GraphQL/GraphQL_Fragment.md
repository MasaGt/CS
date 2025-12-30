### Fragment とは

- クライアントが送信するクエリ内で再利用できるフィールドの集合を定義することができ機能

    - ★サーバーのスキーマで使い機能ではないことに注意

<br>

- ざっくりとした使い方は以下の通り

    <img src="./img/GraphQL-Fragment_1.svg" />

<br>

#### 注意点

- Fragment で定義した場合、クエリ/ミューテーション/サブスクリプションで任意のフィールドを選択することはできない

    <img src="./img/GraphQL-Fragment_2.svg" />

<br>

- 複数のオブジェクトのフィールドを1つのフラグメントにまとめることはできない

    <img src="./img/GraphQL-Fragment_3.svg" />

<br>
<br>

参考サイト

[GraphQLのFragmentについて](https://tech.yukashikado.co.jp/posts/graphql-fragment/)

[【GraphQL】 Fragment Colocation とは](https://qiita.com/terakura-aina/items/9a05f35e9af46a6f09ec)

[GraphQLのFragmentとは？基礎概念、役割、定義方法とメリットを最新の使用例と共に詳しく解説](https://www.issoh.co.jp/tech/details/9660/)

---

### Fragment Colocation とは

- ★Fragment Colocationは **機能ではなく設計手法／考え方（アーキテクチャ・パターン）** を指す

<br>

- ざっくりいうと **GraphQL Fragment を「どこに」「どう置くか」という設計ルール** のこと

    <br>

    - Fragment Colocation = **UI コンポーネントが必要とするデータは、そのコンポーネントの近くに置く**

    <br>

    <img src="./img/GraphQL-Fragment-Colocation_1.png" />
    
    <br>

    <img src="./img/GraphQL-Fragment-Colocation_2.svg" />

<br>
<br>

参考サイト

[【GraphQL】 Fragment Colocation とは](https://qiita.com/terakura-aina/items/9a05f35e9af46a6f09ec)

---

### ApolloClient での Fragment の利用

<img src="./img/GraphQL-Fragment-ApolloClient_1.svg" />

<br>

### Fragment を InCacheMemory に保存する方法

<img src="./img/GraphQL-Fragment-ApolloClient_2.svg" />

<br>

- ★Fragment をメモリにキャッシュすることで、クエリ文中に fragment 定義をすることなく `...<fragment名>` でフラグメントを利用可能にする


<br>
<br>

参考サイト

[Fragments](https://www.apollographql.com/docs/react/data/fragments)