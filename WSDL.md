### WSDL の構造

<img src="./img/WSDL_2.png" />

引用: [Web Services Description Language](https://ja.wikipedia.org/wiki/Web_Services_Description_Language)

<br>
<br>

参考サイト

[パソコンで試してわかるWebサービス（6 WSDLでWebサービスを記述する](https://atmarkit.itmedia.co.jp/ait/articles/0301/23/news001_3.html)

[SOAPの仕掛け（4）Webサービスを記述するWSDL](https://atmarkit.itmedia.co.jp/ait/articles/0106/07/news001_2.html)

---

### types

- WSDL ファイル内で独自のデータ型を定義したい場合に使う要素

- types 要素以下は普通の [XML Schema](./XML_Schema.md) で書く

<br>

<img src="./img/WSDL-Types_1.png" />

---

### message

- SOAP API の入力や出力のデータフォーマットを定義する要素

- [types](#types) で独自のデータ型を定義した場合、message 要素内で参照する

<br>

<img src="./img/WSDL-Message_1.png" />

---

### portType

- 提供する API の抽象的な操作の集合をポートタイプと呼ぶ

    - 抽象的な操作: リクエストの時に受け取るデータ (= 入力メッセージ) と レスポンスの時に返却するデータ (= 出力メッセージ)

<br>

- operation 要素を子要素に持ち、各 operation 要素は input, output, fault 要素を持つ

    - input:　Webサービスがクライアントから受け取る入力メッセージを記述する

    - output:　Webサービスがクライアントへ送信する出力メッセージを記述する

    - fault: オプション。Webサービスでエラーが発生したときにエラー情報をクライアントへ送信するフォルトメッセージを記述する

<br>

<img src="./img/WSDL-PortType_1.png" />

<br>
<br>

参考サイト

[Webサービスのキホン（5）WSDL文書が持つ二層構造の前段部](https://atmarkit.itmedia.co.jp/ait/articles/0304/24/news002.html)

---

### binding

- types, message, portType で定義してきた抽象的なメッセージ形式や振る舞いを**具体的なプロトコルや WSDL スタイル (= 作成する SOAP メッセージのスタイル) と結びつけるセクション**

- ★binding 要素の type 属性にて [portType 要素](#porttype)で定義したポートタイプを参照する

- 以下は binding セクションの簡単な構造の例

```xsd
<!-- 利用するポートタイプの指定 -->
<wsdl:binding name="~~">

    <!-- 紐付けるプロトコル、メッセージの形式を指定 -->
    <soap:binding sytle="document"/>

    <!-- 提供する操作 (≒ エンドポイント?)の定義 -->
    <wsdl:operation name="操作A">

        <!-- SOAP アクションの指定 -->
        <soap:operation soapAction="http://www.操作A" />

        <!-- 操作Aが受け取る入力メッセージの形式の定義 -->
        <wsdl:input>
            <soap:body use="literal"/>
        </wsdl:input>

        <!-- 操作Aが返す出力メッセージの形式の定義 -->
        <wsdl:output>
            <soap:body use="literal"/>
        </wsdl:output>


        <!-- エラーが発生したときに操作Aが返すエラーメッセージの形式の定義 -->
        <wsdl:fault>
            <soap:body use="literal"/>
        </wsdl:fault>

    </wsdl:operation>

</wsdl:binding>
```

<br>

- `soap:binding`: 利用するメッセージ形式、通信プロトコルを指定する要素

    - transport 属性: http[]()://schemas.xmlsoap.org/soap/http" で HTTP プロトコルの利用を指定する

    - style 属性: 作成される [SOAP メッセージのスタイル](#soap-2つのメッセージ形式) (rpc か document) を指定する


<br>

- `soap:operation`: 提供する SOAP API (操作) 全体に関する情報を定義する要素

    - soapAction 属性: HTTP ヘッダーに　SOAP Action を含めたい場合に設定する属性 (省略可)

        - SOAP アクションとはクライアントで指定するサーバー側で実行したい SOAP メソッドを識別するための URI のこと

        - ★SOAP アクションで指定する URI 上にリソースの存在は不要

            - → ★指定する URI がサーバー上で実際にアクセス可能な URL である必要はなく、あくまでSOAPサービス内での操作の識別子として機能

<br>

- `soap:body`: SOAP メッセージ本体の内容どのように組み立てるか use 属性で指定する

    - use 属性

        - "literal": XMLの構造がそのままメッセージとして使用され SOAP メッセージ本体がk見立てられる

        - "encoded": SOAPメッセージのボディ部分がエンコードされる 

            - ≠ メッセージがバイナリデータなどのエンコーディングされるわけではなく、

    - encodingStyle 属性: SOAP メッセージの

        - "http[]()://schemas.xmlsoap.org/soap/encoding/": SOAP 1.1で使用されるデフォルトのエンコーディングスタイル
        
        TODO: array要素が encoded でどう変わるかチェック

<br>

<img src="./img/WSDL-Binding_1.png" />

<br>
<br>

参考サイト

binding セクションについて
- [Webサービス記述言語（WSDL）とは](https://lab.wallarm.com/what/webサービス記述言語（wsdl）とは/?lang=ja)

soap:bodu use 属性について
- [WSDL文書によるインターフェイス定義の仕上げ](https://atmarkit.itmedia.co.jp/ait/articles/0305/14/news001.html)

soap:body encodingStyle 属性について
- [SOAP Envelope 要素](https://memopad.bitter.jp/w3c/soap/soap_envelope.html)


---

### service

<img src="./img/WSDL-Service_1.png" />

<br>

- wsdl:service 要素

    - 具体的なエンドポイントの定義を行う要素

<br>

- wsdl:port 要素

    - Webサービスを利用するための出入り口のことをWSDLではポートと呼ぶ

    - name、 binding 属性はどちらとも必須

<br>

- soap:address 要素

    - location 属性: soap:address の location には WSDL の URL ではなく、実際に SOAP メッセージを送るサービスの URL を指定する

<br>
<br>

参考サイト

WSDL での"ポート"とは
- [Webサービスのキホン（5）WSDL文書が持つ二層構造の前段部](https://atmarkit.itmedia.co.jp/ait/articles/0304/24/news002.html)

wsdl:port 要素について
- [Webサービス記述言語（WSDL）とは](https://lab.wallarm.com/what/webサービス記述言語（wsdl）とは/?lang=ja)

---

### SOAP 2つのメッセージ形式

- SOAP の仕様では以下の2種類のメッセージ形式というものがある

- ★★ SOAP メッセージの body の形式(構造)に影響する

<br>

#### RPC (Remote Protocol Call)

- rpc とは別のサーバーマシンにある関数をクライアントが呼び出すこと、またそのような思想を指すらしい

    <br>

    <img src="./img/WSDL-RPC_1.png" />

    引用: [RPCの具現化であるgRPC](https://zenn.dev/hsaki/books/golang-grpc-starting/viewer/rpc)

<br>

- SOAP メッセージの RPC 形式とは

<br>

#### Document

- SOAP メッセージの Document 形式とは

<br>
<br>

参考サイト

[1.2. プログラミング・開発ガイド](https://docs.nec.co.jp/sites/default/files/webotx_manual_v85/WebOTX/85/html/dev_devstudio_javaee/1.2_wsdk_programming.html)