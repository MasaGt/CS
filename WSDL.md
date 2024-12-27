### WSDL の構造

<img src="./img/WSDL_2.png" />

引用: [Web Services Description Language](https://ja.wikipedia.org/wiki/Web_Services_Description_Language)

<br>

#### types

- WSDL ファイル内で独自のデータ型を定義したい場合に使う要素

- types 要素以下は普通の [XML Schema](./XML_Schema.md) で書く

<br>

<img src="./img/WSDL-Types_1.png" />

<br>

#### message

- SOAP API の入力や出力のデータフォーマットを定義する要素

- [types](#types) で独自のデータ型を定義した場合、message 要素内で参照する

<br>

<img src="./img/WSDL-Message_1.png" />

<br>

#### portType

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

#### binding

<br>

#### service

<br>
<br>

参考サイト

[パソコンで試してわかるWebサービス（6 WSDLでWebサービスを記述する](https://atmarkit.itmedia.co.jp/ait/articles/0301/23/news001_3.html)

[SOAPの仕掛け（4）Webサービスを記述するWSDL](https://atmarkit.itmedia.co.jp/ait/articles/0106/07/news001_2.html)

ポートタイプについて：[Webサービスのキホン（5）WSDL文書が持つ二層構造の前段部](https://atmarkit.itmedia.co.jp/ait/articles/0304/24/news002.html)