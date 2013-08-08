this.namespace = this.namespace || {};


(function(){

	/**
	 * コンストラクタ
	 * 
	 * @param sel セレクター
	 */
	var SpriteAnimation = function(sel) {
		this.initialize(sel);
	};


	var p = SpriteAnimation.prototype;

	/** 対象セレクター */
	p.selector = "";

	/** 幅 */
	p.width;

	/** 高さ */
	p.height;


	/** 画像URL */
	p.imgUrl;

	/** FPS */
	p.fps;

	/** 行 */
	p.row;
	
	/** 列 */
	p.column;
	
	/** トータルフレーム数 */
	p.totalFrames;

 	/** アニメーション繰り返し回数 */
	p.repeatCount;


	/** アニメーション終了後のコールバック関数 */
	p.callback = null;


	/**
	 * 初期処理
	 * 
	 * @param sel セレクター
	 */
	p.initialize = function(sel){

		if(sel === null){
			console.log("セレクターを指定してください");
			return;
		}

		this.selector = sel;

		//初期設定値
		this.fps = 8;
		this.repeatCount = 999999; //疑似無限
	};

	/**
	 * 先頭フレームを表示する
	 * 
	 */
	p.showInitialFrame = function(){

		var that = this;

		if(this._validate() === false){
			return;
		}

		jQuery(that.selector).css("width", that.width);
		jQuery(that.selector).css("height", that.height);
		// jQuery(that.selector).css("overflow", "hidden");
		jQuery(that.selector).css("background", "url(" + that.imgUrl + ")");
		jQuery(that.selector).css("border", "0px");
		jQuery(that.selector).css("background-position 0px 0px");
	};

	/**
	 * waitをおいてアニメーションを開始する
	 * 
	 * @param ms 待ち時間
	 */
	p.startAfterWait = function(ms){

		if(this._validate() === false){
			return;
		}

		var that = this;

		setTimeout(function(){
			that.start();
		}, ms);
	};

	/**
	 * アニメーションを開始する
	 * 
	 */
	p.start = function(){

		var that = this;

		if(that.row === null || that.column === undefined){
			that.column = that.totalFrames;
			that.row = 1;
		}

		jQuery(that.selector).css("width", that.width);
		jQuery(that.selector).css("height", that.height);
		// jQuery(that.selector).css("overflow", "hidden");
		jQuery(that.selector).css("border", "none");
		jQuery(that.selector).css("background", "url(" + that.imgUrl + ")");

		var cnt = 0;
		var rep = 0;
		var interval = setInterval(function(){

			var left = parseInt(cnt % that.column) * that.width * (-1);
			var top = parseInt(cnt / that.column) * that.height * (-1);
			jQuery(that.selector).css("background-position", left+ "px " + top + "px");
			// jQuery(that.selector).css("background-position", left+ "px " + "-256px");

			cnt++;

			if(cnt === that.totalFrames) {
				
				rep++;
				
				if(rep !== that.repeatCount){
					cnt = 0;
				} else {
					clearInterval(interval);
					if(that.callback){
						that.callback();
					}
				}
			}


		}, 1000 / that.fps);
	};

	/**
	 * バリデーション
	 *
	 * @return boolean 
	 */
	p._validate = function(){
		if(this.width === null){
			console.log();
			return false;
		}
		if(this.height === null){
			console.log();
			return false;
		}
		if(this.imgUrl === null){
			console.log();
			return false;
		}
		if(this.totalFrames === null){
			console.log();
			return false;
		}
		return true;
	};


	namespace.SpriteAnimation = SpriteAnimation;
})();