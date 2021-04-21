# Streamlabs-obs-control
[Beat Saber Overlay 改良版](https://github.com/rynan4818/beat-saber-overlay)でStreamlabs OBSのシーンコントロールをする追加スクリプトです。

[サンプル動画](https://twitter.com/rynan4818/status/1384822435434831874)

※[OBS Studio版はこちら](https://github.com/rynan4818/obs-control)

## 使用方法

 1. Beat Saber Overlay 改良版をインストールして使えるようにします
 
    配布サイト:https://github.com/rynan4818/beat-saber-overlay

    インストールと設定方法は上記サイトに詳細があります。

    **注意点として、オーバーレイの設定で`表示されていないときにソースをシャットダウン`のチェックを外して下さい。**

    これにより、オーバーレイ機能を非表示にしても本ツールが正しく稼働します。

    (例えば、他のDataPullerとかのオーバーレイを使用している場合、メニューシーンでオーバーレイを非表示にする場合など)

    ![preview](https://rynan4818.github.io/streamlabs-obs-control3.png)

 2. 本ツールの[リリースページ](https://github.com/rynan4818/Streamlabs-obs-control/releases)から最新リリースをダウンロードします。

 3. 1.でインストールしたオーバーレイのフォルダに、本ツールのファイルをコピーしてください。

    - 「js」フォルダに、`obs-control.js` と `index.js` と `sockjs.min.js` と `sockjs.min.js.map` の４つ
    - インストールフォルダの index.htmlを本ツールの物に差し替え(上書き)

    本ツールは、Beat Saber Overlay 改良版の[Release v2021/02/22](https://github.com/rynan4818/beat-saber-overlay/releases/tag/v2021%2F02%2F22)を元にしています。

    オーバーレイがそれ以外のバージョンになっている場合、index.htmlを上書きするとおかしくなる場合があります。
    
    その場合は、インストールしたオーバーレイのindex.htmlをメモ帳で開いて、最後の方の

        <script src="./js/options.js"></script>

    の上の行に

        <script src="./js/sockjs.min.js"></script>
        <script src="./js/index.js"></script>
        <script src='./js/obs-control.js'></script>

    の３つを追加してください。

 4. Streamlabs OBSを起動して、`設定`の`リモートコントロール`から`詳細を表示`をクリックして`APIトークン`の文字列をコピーします。
     また、ポート番号が59650になっているか確認します。（59650と違う場合は、59650に修正するか後述する本ツールの設定でポート番号を指定します。)

    ![preview](https://rynan4818.github.io/streamlabs-obs-control1.png)

 5. オーバーレイの「js」フォルダにコピーした obs-control.js をメモ帳で開きます

    先頭行の`const obs_token = ''`の ''の中に、4. でコピーしたAPIトークンを貼り付けます。

    他の行頭が`const OBS_`で始まる内容は必要に応じて変更します。

    デフォルト設定のまま使う場合は、メニューシーンのStreamlabs OBSのシーン名を `BS-Game` ゲームシーンのシーン名を `BS-Menu` とします。

    ![preview](https://rynan4818.github.io/streamlabs-obs-control2.png)

 6. あとは通常通りStreamlabs OBSで記録・配信すればＯＫです。

    BeatSaber起動直後のメニューシーン切り替えは発生しないので、手動でStreamlabs OBSのシーン名をメニューシーンにしておくか１度プレイすれば切り替わります。

## ライセンス

本ツールのライセンスは[MITライセンス](https://github.com/rynan4818/Streamlabs-obs-control/blob/main/LICENSE)を適用します

### 添付ライブラリ:index.js
本ツールに添付している `index.js` は以下のFirst releaseを一部変更して使用しています。

[Streamlabs-OBS Websocket Javascript Client](https://github.com/mrjosh/streamlabs-obs-socket-client)

#### 変更点
- ブラウザのjsで動作するように修正
- websocketの再接続機能追加

Streamlabs-OBS Websocket Javascript Clientのライセンスは以下になります。

[Streamlabs-OBS Websocket Javascript Client MIT License](https://github.com/mrjosh/streamlabs-obs-socket-client/blob/develop/LICENSE)

### 添付ライブラリ:sockjs.min.js, sockjs.min.js.map
本ツールに添付している `sockjs.min.js`及び`sockjs.min.js.map`は以下のReleases1.5.1を使用しています。

[SockJS-client](https://github.com/sockjs/sockjs-client)

SockJS-clientのライセンスは以下になります。

[SockJS-client MIT License](https://github.com/sockjs/sockjs-client/blob/master/LICENSE)
