### 事象

- [GragQL + React で Todo 管理アプリを作成](https://qiita.com/Sicut_study/items/13c9f51c1f9683225e2e)していたところ、Todoを作成するクエリ (Mutation) にて、空のデータが飛んできたらサーバー側でエラーを投げるよう実装した

    <img src="../img/Issue-ApolloClient-Mutation-Error-Handling_1.svg" />

<br>

- ★クライアント側で空のデータを投げたときに、うまくエラーをハンドリングできなかった

    ↓ブラウザのコンソール

    <img src="../img/Issue-ApolloClient-Mutation-Error-Handling_2.png" />

---

### 原因

- 非同期関数 (async) 内にて、 ミューテーションの実行を await すると error が設定されるよりも前に `Unhandled Promise Rejection` で処理が落ちるから

    <img src="../img/Issue-ApolloClient-Mutation-Error-Handling_3.svg" />

---

### 解決策

- 以下の２つの方法がある

    1. 非同期関数をやめる (お勧めしない)

        <img src="../img/Issue-ApolloClient-Mutation-Error-Handling_4.svg" />

        <br>

        - alert が意図したタイミングとずれて発火する可能性大

            → useMutation の戻り値の第2要素である Result は非同期で反映されるから
        
            <img src="../img/Issue-ApolloClient-Mutation-Error-Handling_5.svg" />


    <br>

    2. `await <ミューテーション実行関数>()` の結果 (エラー) を catch する

        <img src="../img/Issue-ApolloClient-Mutation-Error-Handling_6.svg" />

