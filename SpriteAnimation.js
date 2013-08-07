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

	/** FPS */ //TODO:おかしい
	p.fps;

	/** トータルフレーム数 */
	p.frames;

 	/** アニメーション繰り返し回数 */
	p.count;

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
		this.fps = 10;
		this.count = "infinite";
	};

	/**
	 * 先頭フレームを表示する
	 * 
	 */
	p.showInitialFrame = function(){

		if(this._validate() === false){
			return;
		}

		jQuery(this.selector).css("width", this.width);
		jQuery(this.selector).css("height", this.height);
		jQuery(this.selector).css("overflow", "hidden");
		// jQuery(this.selector).css("margin", "1em auto");
		jQuery(this.selector).css("background", "url(" + this.imgUrl + ")");
		var ms = 1 / this.fps * (this.count + 1);
		jQuery(this.selector).css("animation", "initAnim " + ms + "s steps(1,end) " + this.count);

		var styleSheet = document.styleSheets[0];
		if(styleSheet === null || styleSheet === undefined){
			var head = document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			head.appendChild(style);
			styleSheet = style.sheet;
		}
		var initPosX = (this.frames) * this.width * (-1);
		var keyframes = "@-webkit-keyframes initAnim { \n" + 
						"	100% {background-position:" + initPosX + "px;}\n" + 
						"}";
		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
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

		if(this._validate() === false){
			return;
		}

		var that = this;

		jQuery(this.selector).on('webkitAnimationEnd', function(event) {
			if(that.callback !== null){
				that.callback();
			}
		});

		jQuery(this.selector).css("width", this.width);
		jQuery(this.selector).css("height", this.height);
		jQuery(this.selector).css("overflow", "hidden");
		// jQuery(this.selector).css("margin", "1em auto");
		jQuery(this.selector).css("background", "url(" + this.imgUrl + ")");
		var ms = 1 / this.fps * (this.count + 1);
		jQuery(this.selector).css("animation", "mainAnim " + ms + "s steps(" + this.frames + ",end) " + this.count);

		var styleSheet = document.styleSheets[0];
		if(styleSheet === null || styleSheet === undefined){
			var head = document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			head.appendChild(style);
			styleSheet = style.sheet;
		}
		var initPosX = (this.frames) * this.width * (-1);
		var keyframes = "@-webkit-keyframes mainAnim { \n" + 
						"	100% {background-position:" + initPosX + "px;}\n" + 
						"}";
		styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
	};

	/**
	 * バリデーション
	 *
	 * @param boolean 
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
		if(this.frames === null){
			console.log();
			return false;
		}
		return true;
	};


	namespace.SpriteAnimation = SpriteAnimation;
})();