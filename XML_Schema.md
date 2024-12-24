### XML Schema とは

- ルールの決められた XML の書き方

    - 特段ルールのない XML ならば[要素名は何でもよく、日本語を使ってもいい](./XML.md#要素タグ属性)

    - XML Schema では使用出来る要素名はあらかじめ決まっている

- XML Schema で書かれた XML ファイルの拡張子は `.xsd` となる

- ★★XML Schema は XML 文書の**構造**を記述する

    - 通常の XML (要素の中にコンテンツが記述された XML) ではなく、「この XML Schema に従って書かれた XML は \~~ 要素を持ち、コンテンツのデータ型は \~~ で、、、」　みたいなものを定義するのが  XML Schema

    - クラス → XML Schema、　インスタンス → XML のイメージ

---

### 基本的な XML Schema の書き方

#### XML Schema の構造

- 通常の XML と同様に [XML 宣言部分と XML 文章部分](./XML.md#xml-の基本構造)から構成される

#### 要素

- XML Schema では、いくつかの決まった要素名がある

    - `schema`: XML 文章部分のルート要素

        - 通常の XML
            ```xml
            <!-- XML 文章部分 -->
            <root>
                <!-- 子要素 -->
            </root>
            ```

        <br>

        - XML Schema

            ```xsd
            <xs:schema xmls:xs="http://www.w3.org/2001/XMLSchema">
                <!-- 子要素 -->
            </xs:schema>
            ```

            - 名前空間の URI には `http://www.w3.org/2001/XMLSchema` が慣例的に使われる

            - 名前空間のプレフィックスは `xs` か `xds` が慣例的に使われる

            - ★XML Schema では XML 文章内の全ての要素がルートで定義される名前空間に属する必要がある
    
    <br>

    - `element`: 通常の要素に使用する要素

        - XML Schema

            ```xsd
            <xs:schema xmls:xs="http://www.w3.org/2001/XMLSchema">
                <xs:element name="book" type="xs:string">
                </xs:element>
            </xs:schema>
            ```

            - element 要素は **その要素名を表す** name　属性を持つ

            - element 要素は **その要素のコンテンツのデータ型を表す** type 属性を持つ

        <br>

        - 上記 XML Schema に従った XML

            ```xml
            <book>
              よくわかるXML
            </book>
            ```

    <br>

    - `complexType`: 子要素群を表現する要素 (子要素を持つ要素の直下に書く)

        - XML Schema

            ```xsd
            <xs:schema xmls:xs="http://www.w3.org/2001/XMLSchema">
                <xs:element name="book">
                    <xs:complexType> <!-- 子要素群を表現する -->
                        <xs:sequence>
                            <xs:element name="title" type="xs:string"> <!-- 子要素 -->
                            </xs:element>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
            </xs:schema>
            ```

            - たとえ子要素が1つだったとしても complexType 要素は必要
        
        <br>

        - 上記 XML Schema に従った XML

            ```xml
            <!-- book要素は子要素にtitle要素を持つ -->
            <book> 
                <title>
                    よくわかるXML
                </title>
            </book>
            ```

    <br>

    - `sequence`: 子要素群(element 要素) の登場順を固定したい場合に使用される要素

        - XML Schema

            ```xsd
            <xs:schema xmls:xs="http://www.w3.org/2001/XMLSchema">

                <xs:element name="book" >

                    <xs:complexType>
                        <!-- book要素の子要素は title, author, price の順で登場しなければならない -->
                        <xs:sequence>
                            <xs:element name="title" type="xs:string">
                            </xs:element>

                            <xs:element name="author" type="xs:string">
                            </xs:element>

                            <xs:element name="price" type="xs:int">
                            </xs:element>
                        </xs:sequence>

                    </xs:complexType>

                </xs:element>

            </xs:schema>
            ```

            - ★子要素の登場順を順不同にしたい場合や、どれか1つ**だけ**の登場を期待する場合は sequence ではなく`他の要素で子要素を囲む必要がある`
        
        <br>

        - 上記 XML Schema に従った XML

            ```xml
            <book>
                <title>
                    よくわかるXML
                </title>
                <author>
                    山田太郎
                </author>
                <price>
                    1000
                </price>
            </book>
            ```

    <br>

    - `attribute`: 特定の要素に**ユーザー独自の属性**を持たせたい時に利用する要素

        - XML Schema

            ```xsd
            <xs:schema xmls:xs="http://www.w3.org/2001/XMLSchema">
                <xs:element name="book" >
                    
                    <complexType>
                        <xs:attribute name="id" type="xs:integer"/> <!-- book 要素の属性であることに注意-->
                    </complexType>
                </xs:element>
            </xs:schema>
            ```

            - attribute 要素は complexType 要素で囲まれる必要がある

            - attribute 要素は以下の属性を指定することができる

                - `use 属性`: その attribue の属性を「必ず指定しなければならない」のか「省略できる」のか「指定してはいけない」のか

                    ```xsd
                    <xs:element name="book">
                        <xs:complexType>
                            <!-- title属性は指定しなければならない -->
                            <xs:attribut name="title" type="xs:string" use="required"/>

                            <!-- author属性は省略しても良い -->
                            <xs:attribut name="author" type="xs:string" use="optional"/>

                            <!-- price属性は指定してはいけない -->
                            <xs:attribut name="price" type="xs:integer" use="prohibited" />
                        </xs:complexType>
                    </xs:element>
                    ```
                

        <br>

        - 上記 XML Schema に従った XML

            ```xml
            <book id="1">
            </book>
            ```

<br>
<br>

参考サイト

schema 要素について
- [第8回　XML Schemaの定義(1)－XML Schemaの基礎，要素の宣言を学習する](https://xtech.nikkei.com/it/article/COLUMN/20070122/259197/)

element, complexType, sequence 要素について
- [XML Schemaの定義](http://xml.prognavi.com/?p=129)

---

### データ型

---

### その他の要素と属性