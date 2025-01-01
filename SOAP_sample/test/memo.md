### ハマったエラー

#### エラー1

```
Error creating SOAP client: Error: Text data outside of root node.
```

- エラーメッセージをググってみると XML (WSDL) がうまく定義できていない為に起きるエラーっぽい

<br>

#### エラー1の原因

- soap:bindging 要素の transport 属性を省略していた

    - soap:binding 要素の style, transport属性はどちらとも省略してはだめ

- このエラーが起きた時は、WSDL が正しく記述されていないことを疑うべき

---

#### エラー２

```
Error creating SOAP client: TypeError: Cannot read properties of null (reading '$name')
```

<br>

#### エラー2の原因

- リクエストメッセージ (wsdl:message) 要素 の name 属性の名前が間違っていた

    ```xml
    <wsdl:message namee="input">
    </wsdl:message>
    ```

---

#### エラー3

```
AssertionError [ERR_ASSERTION]: invalid message definition for rpc style binding
```

<br>

#### エラー3の原因

- rpc スタイルを利用するときの入力メッセージのデータ型が間違っていたっぽい

    - とあるメソッドAを呼び出すときに発生したエラーで、そのメソッドAはリクエストパラメータを必要としないメソッドだった

        - そのため、soap クライアントでは以下のように**空のオブジェクト**をリクエストパラメータとして送っていた

            ```js
            // SOAP クライアントの作成
            soap.createClient(url, {}, function (err, client) {

                // Make a SOAP request
                const args = {}; // ★★★ここがエラーの原因★★★

                client.methodA( // SOAP API のメソッドAの呼び出し
                    args,
                    function (err, result, rawResponse, soapHeader, rawRequest) {
                    if (err) {
                        console.error("Error making SOAP request:", err);
                        return;
                    }

                    // Handle the SOAP response
                    console.log("result:", result);
                    }
                );
            });
            ```

        - 入力メッセージのデータ args を空のオブジェクトから **null** に修正したところ正しく動作した

            ```js
            // SOAP クライアントの作成
            soap.createClient(url, {}, function (err, client) {

                // Make a SOAP request
                const args = null; // ★★★nullに修正★★★

                // ~ 以下省略 ~
            });
            ```

<br>

#### 注意点

- rpc スタイルの場合で入力メッセージを必要としない場合は null を渡すことで正しく動作したが、 **document スタイルに変更したところエラーで落ちた**

- ★document スタイルの場合で入力メッセージを必要としないメソッドを呼び出す場合は、**空のオブジェクト**を入力メッセージとして渡す必要がある

    ```js
    // SOAP クライアントの作成
    soap.createClient(url, {}, function (err, client) {

        // Make a SOAP request
        const args = {}; // WSDLにてdocumentスタイルで定義されている場合

        // ~ 以下省略 ~
    });
    ```