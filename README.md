# Streamlabs-obs-control
[Beat Saber Overlay 改良版](https://github.com/rynan4818/beat-saber-overlay)でStreamlabs OBSのシーンコントロールをする追加スクリプトです。

また、録画忘れ防止機能として、録画ボタンを押さないで譜面のプレイ開始をすると警告音が鳴る機能もあります。

[サンプル動画](https://twitter.com/rynan4818/status/1384822435434831874)

※[OBS Studio版はこちら](https://github.com/rynan4818/obs-control)

※[XSplit Broadcaster用の同様ツールはこちら](https://github.com/rynan4818/BS-AutoSceneChanger)

## 使用方法

 1. Beat Saber Overlay 改良版をインストールして使えるようにします
 
    配布サイト:https://github.com/rynan4818/beat-saber-overlay

    インストールと設定方法は上記サイトに詳細があります。

    オーバーレイ機能を使用しない場合は、Streamlabs OBS上でオーバーレイを非表示にしてください

    (例えば、他のDataPullerとかのオーバーレイを使用している場合など)

    非表示にしても、裏でOBSコントロール機能は動くのでStreamlabs OBSのどこかのシーンのソースにオーバーレイを設定する必要があります

    **注意点として、オーバーレイの設定で`表示されていないときにソースをシャットダウン`のチェックを外して下さい。また、`シーンがアクティブになったときにブラウザの表示を更新`もチェックしないで下さい。**

    ![preview](https://rynan4818.github.io/streamlabs-obs-control3.png)

 2. 本ツールの[リリースページ](https://github.com/rynan4818/Streamlabs-obs-control/releases)から最新リリースをダウンロードします。

 3. 1.でインストールしたオーバーレイのフォルダに、本ツールのファイルをコピーしてください。

    - `js` フォルダに、`obs-control.js` と `index.js` と `sockjs.min.js` と `sockjs.min.js.map` の４つ
    - インストールフォルダの `index.html` を本ツールの物に差し替え(上書き)

    本ツールは、Beat Saber Overlay 改良版の[Release v2021/05/09](https://github.com/rynan4818/beat-saber-overlay/releases/tag/v2021%2F05%2F09)を元にしています。

    オーバーレイがそれ以外のバージョンになっている場合、`index.html` を上書きするとおかしくなる場合があります。
    
    その場合は、インストールしたオーバーレイの `index.html` をメモ帳で開いて、最後の方の

        <script src="./js/options.js"></script>

    の上の行に

        <script src="./js/sockjs.min.js"></script>
        <script src="./js/index.js"></script>
        <script src='./js/obs-control.js'></script>

    の３つを追加してください。

 4. Streamlabs OBSを起動して、`設定`の`リモートコントロール`から`詳細を表示`をクリックして`APIトークン`の文字列をコピーします。
     また、ポート番号が`59650`になっているか確認します。（59650と違う場合は、59650に修正するか後述する本ツールの設定でポート番号を指定します。)

    ![preview](https://rynan4818.github.io/streamlabs-obs-control1.png)

 5. オーバーレイの`js` フォルダにコピーした `obs-control.js` をメモ帳で開きます

    先頭行の`const obs_token = ''`の `''`の中に、4. でコピーしたAPIトークンを貼り付けます。

    他の行頭が`const obs_`で始まる内容は必要に応じて変更します。

    デフォルト設定のまま使う場合は、メニューシーンのStreamlabs OBSのシーン名を `BS-Game` ゲームシーンのシーン名を `BS-Menu` とします。

    シーン切り替え機能を使用せず、録画状態チェックのみ使用する場合は `obs_game_scene_name` と `obs_menu_scene_name` を普段BeatSaberで使用するシーン名にして、`obs_recording_check`を`true`にしてください。シーン切り替え忘れ防止、録画忘れ防止になります。

    ![preview](https://rynan4818.github.io/streamlabs-obs-control2.png)

         const obs_token = '';  //StreamlabsOBSの設定の「リモートコントロール」の「詳細を表示」から「APIトークン」をコピーして''内に貼り付ける
         const obs_uri   = 'localhost';                 //基本的に変更不要
         const obs_port  = '59650';                     //基本的に変更不要
         const obs_game_scene_name  = 'BS-Game';        //ゲームシーン名
         const obs_menu_scene_name  = 'BS-Menu';        //メニューシーン名
         const obs_game_event_delay = 0;                //ゲームシーン開始タイミングを遅らせる場合に遅らせるミリ秒を設定して下さい。タイミングを早めること（マイナス値）はできません。[0の場合は無効]
         const obs_menu_event_delay = 0;                //ゲームシーン終了(メニューに戻る)タイミングを遅らせる場合に遅らせるミリ秒を設定して下さい。タイミングを早めること（マイナス値）はできません。[0の場合は無効]
         const obs_menu_event_switch = false;           //[true/false]ゲームシーン終了タイミングをfinish/failした瞬間に変更する場合は true にします。約1秒程度早まりますのでobs_menu_event_delayと合わせて終了タイミングの微調整に使えます。
         const obs_start_scene_duration     = 0;              //ゲームシーンに切り替える前に開始シーンを表示する時間(秒単位[小数3位までOK]) [0の場合は無効]
         const obs_start_scene_name         = 'BS-Start';     //開始シーン名  ※使用時はobs_start_scene_durationの設定要
         const obs_finish_scene_duration    = 0;              //Finish(クリア)時にメニューシーンに切替わる前に終了シーンを表示する時間(秒単位[小数3位までOK]) [0の場合は無効]
         const obs_finish_scene_name        = 'BS-Finish';    //Finish(クリア)用終了シーン名  ※使用時はobs_finish_scene_durationの設定要
         const obs_fullcombo_scene_duration = 0;              //フルコンボクリア時にメニューシーンに切替わる前に終了シーンを表示する時間(秒単位[小数3位までOK]) [0の場合は無効]
         const obs_fullcombo_scene_name     = 'BS-FullCombo'; //フルコンボクリア用終了シーン名  ※使用時はobs_fullcombo_scene_durationの設定要
         const obs_fail_scene_duration      = 0;              //Fail(フェイル)時にメニューシーンに切替わる前に終了シーンを表示する時間(秒単位[小数3位までOK]) [0の場合は無効]
         const obs_fail_scene_name          = 'BS-Fail';      //Fail(フェイル)用終了シーン名  ※使用時はobs_fail_scene_durationの設定要
         const obs_pause_scene_duration     = 0;              //Pause(ポーズ)してメニューに戻る場合にメニューシーンに切替わる前に終了シーンを表示する時間(秒単位[小数3位までOK]) [0の場合は無効]
         const obs_pause_scene_name         = 'BS-Pause';     //Pause(ポーズ)用終了シーン名  ※使用時はobs_pause_scene_durationの設定
         const obs_recording_check          = false;          //[true/false]trueにするとゲームシーン開始時に録画状態をチェックする。
         const obs_not_rec_sound            = 'file:///C://Windows//Media//Windows%20Notify%20Calendar.wav' //ゲームシーン開始時に録画されていない場合に鳴らす音(適当な音声ファイルをブラウザに貼り付けて、アドレス欄のURLをコピーする)


 6. あとは通常通りStreamlabs OBSで記録・配信すればＯＫです。

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
