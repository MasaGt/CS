### Context

- ApolloLink や ErrorLink, RetryLink などは、　Context という機能を利用することで、Link 間で任意の情報を受け渡しすることができる

    <img src="./img/ApolloClient-Links-Context_1.svg" />

<br>

- Context の設定は `ApolloLink.Operation.setContext()` で行う

    <img src="./img/ApolloClient-Links-setContext_1.svg" />

<br>

- Context の取得は `ApolloLink.Operation.getContext()` で行う

    <img src="./img/ApolloClient-Links-getContext_1.svg" />

<br>

- ★基本的に Context に設定された情報は Link 間で共有されるのみで、**GraphQLサーバーには送信されない**

    - ★しかし、ternimating link の種類によっては、Context に設定された特定の情報を GraphQL に送信するものもある

        → HttpLink では `HttpLink.ContextOptions` のプロパティと同名のプロパティが  Context に存在すれば、それを GraphQL サーバーに送信する

        <img src="./img/ApolloClient-HttpLink-ContextOptions_1.svg">

---

### Request Headers のカスタマイズ　

- Terminating Link よりも前の Link でヘッダーの設定を行いたい場合

    <img src="./img/ApolloClient-Customize-Headers_1.svg" />

<br>

- Terminating Link でヘッダーの設定を行いたい場合

    <img src="./img/ApolloClient-Customize-Headers_2.svg" />

<br>
<br>

参考サイト

[Apollo Link overview - Stateless links](https://www.apollographql.com/docs/react/api/link/introduction#stateless-links)

---

### Request Body のカスタマイズ　

<img src="./img/ApolloClient-Customize-RequestBody_1.svg" />

---

### Response Body のカスタマイズ

- そもそも Response Bodyをいじることは推奨されない

<br>

- Terminating Link 以降の Link でレスポンスボディをカスタマイズしたい場合

    <img src="./img/ApolloClient-Customize-ResponseBody_1.svg" />

<br>

- Terminating Link でレスポンスボディをカスタマイズしたい場合

    <img src="./img/ApolloClient-Customize-ResponseBody_2.svg" />

<br>
<br>

参考サイト

[Handling a response](https://www.apollographql.com/docs/react/api/link/introduction#handling-a-response)

[Window: fetch() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch)