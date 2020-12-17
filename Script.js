enchant();
enchant.Sound.enabledInMobileSafari = true;

window.onload = function () {
	var WIDTH = 400;
	var HEIGHT = 500;
	var core = new Core(WIDTH, HEIGHT);
	core.fps = 30;
	var url = "http://nenzirou.html.xdomain.jp/UnchiShooting/index.html";
	url = encodeURI(url);
	var objects = [];
	//プリロード
	var ASSETS = {
		"se_pon": 'sound/pon.wav',
		"se_pan": 'sound/pan.wav',
		"se_damage": 'sound/damage.wav',
		"se_kyouka": 'sound/kyouka.wav',
		"se_bu": 'sound/bu.wav',
		"se_start": 'sound/start.wav',
		"se_kansei": 'sound/kansei.wav',
		"img_oji": 'img/oji.png',
		"img_unchi": 'img/unchi.png',
		"img_toilet": 'img/toilet.png',
		"img_table": 'img/table.jpg',
		"img_star": 'img/star.png',
		"img_block": 'img/block.png',
		"img_button": 'img/button.png',
		"img_enemy1": 'img/enemy1.png',
		"img_enemy2": 'img/enemy2.png',
		"img_enemy3": 'img/enemy3.png',
		"img_enemy4": 'img/enemy4.png',
		"img_enemy5": 'img/enemy5.png',
		"img_ed": 'img/ed.png',
		"bgm": 'sound/bgm.wav',
	};
	var KEY = 1;
	var TOI = 2;
	var OJI = 3;
	var BLO = 4;
	core.preload(ASSETS);
	var stage = [[
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0],
	]];
	////////////////////////////////////////////////クラス・関数////////////////////////////////////////////////////
	//オブジェクトが従うクラス
	var Obj = Class.create(Sprite, {
		initialize: function (width, height, x, y, dx, dy, dxa, dya, scene, img) {
			Sprite.call(this, width, height);
			this.id = 0;
			this.hp = 1;
			this.visible = true;
			this.removable = true;
			this.touch = false;
			this.dxa = dxa;
			this.dya = dya;
			this.width = width;
			this.height = height;
			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			if (img != null) this.image = core.assets[img];
			scene.addChild(this);
		},
		move: function () {
			if (this.removable) {
				this.x += this.dx;
				this.y += this.dy;
				this.dx += this.dxa;
				this.dy += this.dya;
			}
		},
	});

	//おじさんばね
	var Spring = Class.create(Obj, {
		initialize: function (x, y, scene) {
			Obj.call(this, 20, 40, x, y, 0, 0, 0, 0, scene, "img_oji");
			objects.push(this);
			this.id = OJI;
			this.addEventListener("enterframe", function () {
				this.move();
				if (this.x < 0) this.x = 0;
				else if (this.x > WIDTH - 20) this.x = WIDTH - 20;
				if (this.y < 0) this.y = 0;
				else if (this.y > HEIGHT - 140) this.y = HEIGHT - 140;
				this.frame = this.age % 4;
				for (var i = 0; i < objects.length; i++) {
					if (this.within(objects[i], 30) && objects[i].id == KEY) {
						var pointDiff = CenterDouble(this, objects[i]);
						objects[i].dx = -pointDiff[0];
						objects[i].dy = -10;
						core.assets['se_damage'].clone().play();
					}
				}
			});
			this.addEventListener("touchstart", function (e) {
				this.touch = true;
				console.log("touch");
			});
			this.addEventListener("touchend", function (e) {
				this.touch = false;
				console.log("touched");
			});
		}
	});

	// 鍵
	var Key = Class.create(Obj, {
		initialize: function (x, y, scene) {
			Obj.call(this, 50, 42, x, y, 0, 0, 0, 1, scene, "img_unchi");
			this.originX = 50 / 2;
			this.originY = 42 / 2;
			this.scale(0.5, 0.5);
			objects.push(this);
			this.id = KEY;
			this.addEventListener("enterframe", function () {
				this.move();
				this.rotate(10);
				for (var i = 0; i < objects.length; i++) {
					if (this.within(objects[i], 20) && objects[i].id == BLO) {
						objects[i].parentNode.removeChild(this);
						objects.splice(objects.indexOf(this), 1);
					}
				}
				if (this.x < -60 || this.x > WIDTH + 60 || this.y < -60 || this.y > HEIGHT + 60) {
					this.parentNode.removeChild(this);
					objects.splice(objects.indexOf(this), 1);
				}
			});
		}
	});

	// トイレ
	var Toilet = Class.create(Obj, {
		initialize: function (x, y, scene) {
			Obj.call(this, 32, 64, x, y, 0, 0, 0, 0, scene, "img_toilet");
			this.scale(1, 1);
			objects.push(this);
			this.id = TOI;
			this.addEventListener("enterframe", function () {
				for (var i = 0; i < objects.length; i++) {
					if (this.within(objects[i], 15) && objects[i].id == KEY) {
						objects[i].parentNode.removeChild(objects[i]);
						objects.splice(i, 1);
						core.assets['se_kansei'].clone().play();
					}
				}
			});
		}
	});

	// ブロック
	var Block = Class.create(Obj, {
		initialize: function (x, y, scene) {
			Obj.call(this, 20, 20, x, y, 0, 0, 0, 0, scene, "img_block");
			objects.push(this);
			this.id = BLO;
		}
	});

	//ボタン
	var Button = Class.create(Obj, {
		initialize: function (x, y, frame, scene) {
			Obj.call(this, 120, 60, x, y, 0, 0, 0, 0, scene, "img_button");
		}
	});

	//テキスト
	var Text = Class.create(Label, {
		initialize: function (x, y, font, color, scene) {
			Label.call(this);
			this.font = font + "px Meiryo";
			this.color = color;
			this.width = 400;
			this.moveTo(x, y);
			scene.addChild(this);
		}
	})

	//BGM
	var Bgm = enchant.Class.create({
		initialize: function () {
			this.data = null;
			this.isPlay = false;//プレイの状態フラグ
			this.isPuase = false;
		},
		//BGM用音楽ファイルのセット
		set: function (data) {
			this.data = data;
		},
		//再生(再生のみに使う)
		play: function () {
			this.data.play();
			this.isPlay = true;
			if (this.data.src != undefined) {//srcプロパティを持っている場合
				this.data.src.loop = true;
			}
		},
		//ループ再生(必ずループ内に記述すること) PCでのループ再生で使う
		loop: function () {
			if (this.isPlay == true && this.data.src == undefined) {//再生中でsrcプロパティを持っていない場合
				this.data.play();
				this.isPuase = false;//ポーズ画面から戻った場合は自動的に再生を再開させるため
			} else if (this.isPuase) {//srcあり場合でポーズ画面から戻ったとき用
				this.data.play();
				this.data.src.loop = true;//ポーズするとfalseになるっぽい(確認はしていない)
				this.isPuase = false;
			}
		},
		//再生停止(曲を入れ替える前は,必ずstop()させる)
		stop: function () {
			if (this.data != null) {
				if (this.isPuase) {
					this.isPlay = false;
					this.isPuase = false;
					this.data.currentTime = 0;
				} else if (this.isPlay) {
					this.data.stop();
					this.isPlay = false;
				}
			}
		},
		//一時停止（ポーズ画面などの一時的な画面の切り替え時に音を止めたいときのみ使う）
		pause: function () {
			if (this.data != null) {
				this.data.pause();
				this.isPuase = true;
			}
		}
	});

	// ランダムにｎまでの整数を返す関数
	function Rand(n) {
		return Math.floor(Math.random() * n);
	}
	// 入力したスプライトの真ん中の座標を返す
	function Center(obj) {
		var x = obj.x + obj.width / 2;
		var y = obj.y + obj.height / 2;
		return [x, y];
	}
	// 入力したスプライト同士の座標の差を返す
	function CenterDouble(obj1, obj2) {
		var obj1Point = Center(obj1);
		var obj2Point = Center(obj2);
		return [obj1Point[0] - obj2Point[0], obj1Point[1] - obj2Point[1]];
	}
	////////////////////////////////////////////////クラス・関数終わり////////////////////////////////////////////////////

	core.onload = function () {
		state = 99;
		var cStage = 0;
		var touch = [0, 0];
		// エンディング画面
		S_END = new Scene();
		var ending = new Sprite(400, 500);
		ending.image = core.assets["img_ed"];
		S_END.addChild(ending);
		// エンディングボタン
		var S_Return = new Button(270, 430, 1, S_END);
		S_Return.ontouchend = function () {
			core.popScene();
			core.pushScene(S_Start);
		};
		//スタート画面
		S_Start = new Scene();
		core.pushScene(S_Start);
		S_Start.backgroundColor = "#FFFACD";

		//startボタン
		var S_Go = new Button(50, 400, 0, S_Start);
		S_Go.ontouchend = function () {
			state = 0;
			core.popScene();
			core.pushScene(S_MAIN);
			//core.assets['se_start'].clone().play();
		};

		//シーン設定
		var S_MAIN = new Scene();
		S_MAIN.backgroundColor = "#000020";

		//タッチ操作設定
		S_MAIN.addEventListener("touchstart", function (e) {
			touch[0] = e.localX;
			touch[1] = e.localY;
		});
		S_MAIN.addEventListener("touchmove", function (e) {
			var id = -1;
			for (var i = 0; i < objects.length; i++) {
				if (objects[i].touch) id = i;
			}
			if (id != -1) {
				objects[id].x = e.localX - objects[id].width / 2;
				objects[id].y = e.localY - objects[id].height / 2;
			}
			touch[0] = e.localX;
			touch[1] = e.localY;
		});

		//テキスト
		var C_Text = new Text(0, 0, 15, "#cccccc", S_MAIN);
		var stageBGM = new Bgm();
		stageBGM.set(core.assets["bgm"]);
		new Obj(400, 100, 0, 400, 0, 0, 0, 0, S_MAIN, "img_table");// テーブル
		var B_Start = new Button(300, 445, 0, S_MAIN);
		B_Start.scale(0.6, 0.6);
		//new Toilet(300, 400, S_MAIN);


		//////////////////////////////////////////////メインループ/////////////////////////////////////////////////////////////
		core.onenterframe = function () {
			stageBGM.loop();
			if (state == 0) {//初期化処理
				for (var i = 0; i < stage[cStage].length; i++) {
					for (var j = 0; j < stage[cStage][i].length; j++) {
						if (stage[cStage][i][j] == 1) new Block(20 * j, 20 * i, S_MAIN);
						if (stage[cStage][i][j] == TOI) new Toilet(20 * j, 20 * i, S_MAIN);
						if (stage[cStage][i][j] == OJI) new Spring(20 * j, 20 * i, S_MAIN);
						B_Start.ontouchend = function () {
							new Key(20, 0, S_MAIN);
						};
					}
				}
				state = 1;
			}
		};
		//////////////////////////////////////////////メインループ終了////////////////////////////////////////////////////////////
	};
	core.start();
};