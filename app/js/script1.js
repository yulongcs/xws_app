//http://www.cnblogs.com/joey0210/p/3408349.html
//http://www.imooc.com/article/1402
//http://www.haorooms.com/post/jquery_dmgf_zjsj

(function ($) {
	
	//默认参数
    var DEFALUTS = {
        playBackgroudMusic: true,
		loadImageList: [
			'images/bg1.jpg',
            'images/bg2.jpg',
            'images/bg3.jpg',
            'images/bg4.jpg',
            'images/bg5.jpg',
            'images/about1.jpg',
            'images/about2.jpg',
            'images/about3.jpg',
            'images/about4.jpg',
            'images/worksimg1.jpg',
            'images/worksimg2.jpg',
            'images/worksimg3.jpg',
            'images/worksimg4.jpg',
            'images/team.png',
            'images/greenLine.png'
        ],
    };

	
	var _indexPage = {
		init: function(options){
			var opts = $.extend({}, DEFALUTS, options); //使用jQuery.extend 覆盖插件默认参数
			
			//设置公共变量
			this.playBackgroudMusic = opts.playBackgroudMusic;
			
			bindEvent(opts);
			showLoading(opts);
		}
	}
	function triggerbackgroundMusic() {
        var $music = $("#music"),
            $audio = $('#audio1');
        if (_indexPage.playBackgroudMusic) {
            $music.addClass("musicon")
                .removeClass("musicoff");
            $audio[0].play();
        } else {
            $music.addClass("musicoff")
                .removeClass("musicon");
            $audio[0].pause();
        }
        _indexPage.playBackgroudMusic = !_indexPage.playBackgroudMusic;
    }

    function bindEvent(options) {
        var $loading = $("#loading"),
            $music = $("#music");
        $music.on('click', triggerbackgroundMusic);
        $loading.on('transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd', 'span', function () {
            $(this).hide();
            $loading.find('div').height(0);
        });

        $loading.on('transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd', 'div', function () {
            $loading.remove();
            triggerbackgroundMusic();
        });
    }

    function showLoading(options) {
        var $loading = $("#loading");
        var arr = options.loadImageList;
        var iNow = 0;
        for (var i = 0; i < arr.length; i++) {
            var objImg = new Image();
            objImg.src = arr[i];
            objImg.onload = function () {
                iNow++;
                if ($loading && $loading.find("span")) {
                    $loading.find("span").width(iNow / arr.length * 100 + '%');
                }
            };
        }
    }
	
	indexPage = _indexPage;
})(window.jQuery);

