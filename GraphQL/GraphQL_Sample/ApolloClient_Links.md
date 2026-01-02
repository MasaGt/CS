### Apollo Client が提供する代表的な Link 

- #### [ApolloLink](#apollolink-1)

    - ★リクエストデータのカスタマイズなどができる Link クラス

<br>

- #### [ErrorLink](#errorlink-1)

    - GraphQL サーバーからのレスポンスにエラーがあったり、ネットワークエラー発生した場合に**エラーを検知するための Link クラス**

<br>

- #### [RetryLink](#retrylink-1)

    - 一時的な失敗が起きたときに、同じ GraphQL リクエストを自動で再送するための Link クラス

<br>

- ### [HttpLink](#httplink-1)

    - 任意の URI に HTTP/HTTPS リクエストを送信する **terminating link** な Link クラス

---

### ApolloLink

- `@apollo/client` から import する

- ApolloLink はコンストラクター引数にコールバック関数を受け取る

    <br>
    
    - コールバック関数は operation と forward という引数を受け取る

        <img src="./img/ApolloClient-Links-Arguments_1.svg" />

        <br>

        <img src="./img/ApolloClient-Links-Arguments_2.svg" />

    <br>

    - コールバック関数の中で forward を返さないとエラーが発生するので注意

        - forward は [express のミドルウェアでいう next](https://zenn.dev/ashe/articles/9acf613948475d#ミドルウェアのnext()について) みたいなイメージ

    <br>

    ```tsx
    //main.tsx
     import { ApolloClient, ApolloLink, InMemoeryCache } from "@apollo/client";

    //なんの処理も行わないLink
    const link = new ApolloLink((operation, forward) => {
        return forward(operation);
    });

    //ApolloClientインスタンスの作成
    const client = new ApolloClient({
        link: link,
        cache: new InMemoeryCache()
    })
    ```

<br>
<br>

参考サイト

[ApolloLink](https://www.apollographql.com/docs/react/api/link/apollo-link)

---

### ErrorLink

- ErrorLink は `@apollo/client/link/error` からインポートする

    <img src="./img/ApolloClient-ErrorLink_1.svg" />

<br>

- ErrorLink はコールバック関数をコンストラクタ引数に受け取る

    <img src="./img/ApolloClient-ErrorLink_2.svg" />

<br>

- コールバック関数は `ErrorLink.ErrorHandlerOptions` 型のオブジェクトを引数として受け取る

    <img src="./img/ApolloClient-ErrorLink_3.svg" />

<br>

- ★Error Link はコールバック関数の中で **forward を返さなくてもいい**

    <img src="./img/ApolloClient-ErrorLink_4.svg" />

    <br>

    <img src="./img/ApolloClient-ErrorLink_5.svg" />

<br>

- ★★エラーの検知には `CombinedGraphQLErrors` などの Error クラスを利用する

    <img src="./img/ApolloClient-ErrorLink_6.svg" />

<br>

- ★★★ErrorLink でエラーを検知したとしても、 **Error を thorw しないほうがいいらしい**

    <img src="./img/ApolloClient-ErrorLink_7.svg" />

<br>

#### 各 Error クラスについて

- CombinedGraphQLErrors

    <img src="./img/ApolloClient-CombinedGraphQLErrors_1.svg" />

    <img src="./img/ApolloClient-Diff-CombinedGraphQLErrors-CombinedProtocolErrors_1.png" />

<br>

- CombinedProtocolErros

    <img src="./img/ApolloClient-CombinedProtocolErrors_1.svg" />

<br>

- LinkError

    <img src="./img/ApolloClient-LinkError_1.svg" />

<br>

- LocalStateError

    <img src="./img/ApolloClient-LocalStateError_1.svg" />

<br>

- ServerError

    <img src="./img/ApolloClient-ServerError_1.svg" />

<br>

- ServerParseError

    <img src="./img/ApolloClient-ServerParseError_1.svg" />

<br>

- UnconventionalError

    <img src="./img/ApolloClient-UnconventionalError_1.svg" />

<br>

#### Error クラスのポイント

- クライアント側のクエリ文に問題があったり、GraphQLサーバーのresolverの実装に問題がある場合は、CombinedGraphQLErrors クラスが ErrorLink の `ErrorLink.ErrorHandlerOptions.error` に入る

    <img src="./img/ApolloClient-CombinedGraphQLErrors_2.svg" />

<br>

- ⇧以外のネットワーク系のエラーなどは CombinedGraphQLErrors **以外**のクラスとしてErrorLink の `ErrorLink.ErrorHandlerOptions.error` に入る

    <img src="./img/ApolloClient-NetworkErrors_1.svg" />

<br>
<br>

参考サイト

[ErrorLink](https://www.apollographql.com/docs/react/api/link/apollo-link-error)

[CombinedGraphQLErrors](https://www.apollographql.com/docs/react/api/errors/CombinedGraphQLErrors)

[Handling operation errors](https://www.apollographql.com/docs/react/data/error-handling)

---

### RetryLink

- RetryLink は `@apollo/client/link/retry` からインポートする

    <br>

    ```ts
    import { RetryLink } from "@apollo/client/link/retry";
    ```
<br>

- ★RetryLink はコンストラクター引数に [RetryLink.Options](https://www.apollographql.com/docs/react/api/link/apollo-link-retry#retrylink.options) 型のオブジェクトを受け取る

    <img src="./img/ApolloClient-RetryLink_1.svg" />

    <br>

    - attemps プロパティは `RetryLink.AttemptsOptions | RetryLink.AttemptsFunction` 型のオブジェクト

        <br>

        - `RetryLink.AttemptsFunction` はリクエスト再送処理を実装できる関数

            <img src="./img/ApolloClient-RetryLink_2.svg" />

        <br>

        - `RetryLink.AttemptsOptions` はリクエスト再送に関する条件 (プロパティ) を設定できるオブジェクト

            <img src="./img/ApolloClient-RetryLink_3.svg" />

    <br>

    - delay プロパティは `RetryLink.DelayOptions | RetryLink.DelayFunction` 型のオブジェクト

        <br>

        - `RetryLink.DelayFunction` はリクエスト再送間隔を設定する関数

            <img src="./img/ApolloClient-RetryLink_5.svg" />

        <br>

        - `RetryLink.DelayOptions` はリクエスト再送間隔を設定するオブジェクト

            <img src="./img/ApolloClient-RetryLink_4.svg" />

<br>

- ★RetryLink は **ネットワークエラーでのリクエスト失敗時のみ再送信しようとする** が **GraphQL 由来のエラー (レスポンスにerrorsフィールドが設定されている等) では再送信しない**

    <img src="./img/ApolloClient-RetryLink_6.svg" />

<br>
<br>

参考サイト

[RetryLink](https://www.apollographql.com/docs/react/api/link/apollo-link-retry)

---

### HttpLink

- HttpLink は `@apollo/client` からインポートする

    ```ts
    import { HttpLink } from "@apollo/client";
    ```

<br>

- HttpLink は `HttpLink.Options` 型のコンストラクター引数を受け取る

    <img src="./img/ApolloClient-HttpLink_1.svg" />

    <br>

    <img src="./img/ApolloClient-HttpLink_2.svg" />

<br>

- ★HttpLink は Terminating Link なので、[Link チェーン](./ApolloClient.md#apollo-client-における-link) の終端に指定する必要がある

<br>
<br>

参考サイト

[HttpLink](https://www.apollographql.com/docs/react/api/link/apollo-link-http)