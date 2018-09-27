function Point() {
	this.x = 0;
	this.y = 0;
}
let CHARA_SHOT_MAX_COUNT = 30;

//基本情報
function chara_information() {
	this.hp = 100;
	this.atack = 3;
	this.alive = true;
}

function Enemy_infomation() {
	this.hp = 100;
	this.atack = 1;
	this.alive = false;
}
let charaInfo = new chara_information();
enemyInfo = new Enemy_infomation();