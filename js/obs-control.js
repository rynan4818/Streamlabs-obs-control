const obs_token = '';  //StreamlabsOBSの設定の「リモートコントロール」の「詳細を表示」から「APIトークン」をコピーして''内に貼り付ける
const obs_uri   = 'localhost';           //基本的に変更不要
const obs_port  = '59650';               //基本的に変更不要
const obs_game_scene_name  = 'BS-Game';  //ゲームシーン名
const obs_menu_scene_name  = 'BS-Menu';  //メニューシーン名
const obs_start_scene_duration = 0;          //ゲームシーンに切り替える前に開始シーンを表示する時間(秒単位) [0の場合は開始シーンは無効になる]
const obs_start_scene_name     = 'BS-Start'; //開始シーン名  ※使用時はobs_start_scene_durationの設定要
const obs_end_scene_duration   = 0;          //メニューシーンに切替わる前に終了シーンを表示する時間(秒単位) [0の場合は終了シーンは無効になる]
const obs_end_scene_name       = 'BS-End';   //終了シーン名  ※使用時はobs_end_scene_durationの設定要

var bs_menu_flag = true;

const client = new StreamlabsOBSClient({
    port: obs_port,
    uri: obs_uri,
    token: obs_token
});

client.connect();

function obs_game_scene_change() {
	client.changeScene(obs_game_scene_name);
}

function obs_menu_scene_change() {
	client.changeScene(obs_menu_scene_name);
}

function obs_start_scene_change() {
	client.changeScene(obs_start_scene_name);
}

function obs_end_scene_change() {
	client.changeScene(obs_end_scene_name);
}

function op_songStart(data) {
	if (bs_menu_flag) {
		if (obs_start_scene_duration > 0) {
			obs_start_scene_change();
			setTimeout(obs_game_scene_change, obs_start_scene_duration * 1000);
		} else {
			obs_game_scene_change();
		}
	}
	bs_menu_flag = false;
}

function op_menu(data) {
	if (!bs_menu_flag) {
		if (obs_end_scene_duration > 0) {
			obs_end_scene_change();
			setTimeout(obs_menu_scene_change, obs_end_scene_duration * 1000);
		} else {
			obs_menu_scene_change();
		}
	}
	bs_menu_flag = true;
}
