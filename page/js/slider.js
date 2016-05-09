/*
 * 网站常用效果插件
 * EDIT.ERIC.20150806
 * Version: 1.3.0
 * Author: SIMBA
 */

 (function($){
	//轮播   EDIT.SIMBA.2015.12.15
	$.fn.slider = function(opts){

		opts = $.extend({
			// imgW : 100,  //轮播图片的宽度
			imgH : 100,  //轮播图片的高度
			timeout : "3000",	//轮播间隔时间
			moveTime : 500, //动画时间
			autoSlider : true, //是否自动轮播
			moveStyle : "slide", //动画效果  slide ：滑动， fade ：渐隐渐现
			addTag : true,	//是否创建圆点标记
			tagSize : 12,
			tagDefaultBg : "#fff", //圆点标记的默认背景
			tagActiveBg : "#5638d8", // 圆点标记选中背景
			btnShow : false, //是否显示左右按钮
			btnW : 30,	//按钮的宽度
			btnH : 60,	//按钮的高度
			btnBg : "rgba(255,255,255,.6)" //左右按钮的背景
		}, opts || {});
		//
		opts.timeout = opts.timeout < 1500 ? 1500 : opts.timeout;
		//
		var ths = this,
		$imgs = ths.find("img"),
		$thsLink = ths.find("a"),
		imgSize = $imgs.size(),
		$btn,
		count = 0;
		var init = function(){
			stopSlider();
			initCss();
			ths.find(".s_btn").remove();
			ths.find(".s_tag").remove();

			if(opts.addTag){
				createTag(ths);
				opts.$tag.find("span").eq(0).css({"background-color" : opts.tagActiveBg});
				opts.$tag.find("span").on("click", function(){
					stopSlider();
					var tagActiveIndex = count;
					var thsIndex = opts.$tag.find("span").index($(this));
				    if (thsIndex - tagActiveIndex > 0) {
					    imgsMove();
				    } else if (thsIndex - tagActiveIndex < 0) {
					    imgsMove("left");
					}
				});

			}
			if(opts.btnShow){
				createBtn();
				$btn.on("click",function(){
					stopSlider();
					var thsIndex = $btn.index($(this));
					if(thsIndex == 1){
						imgsMove();
					}else if(thsIndex == 0){
						imgsMove("left");
					}
				});
			}
			$thsLink.eq(0).css({"left" : 0});
			$thsLink.eq(imgSize - 1).css({"left" : "-100%"});
			startSlider();
		},
		//初始化样式
		initCss = function(){
			ths.css({
				"position" : "relative",
				"height" : opts.imgH + "px",
				"overflow" : "hidden",
				"background-color" : "#fff",
				"z-index" : "9"
			});
			$thsLink.css({
				"display" : "block",
				"position" : "absolute",
				"top" : "0",
				"left" : "100%",
				"width" : "100%",
				"height" : "100%",
				"z-index" : "9"
			});
			$imgs.css({
				"width" : "100%",
				"height" : "100%"
			});
		},
		//创建左右按钮
		createBtn = function(){
			var btnTem = '<span class="s_btn"></span><span class="s_btn"></span>';
			ths.append(btnTem);
			$btn = ths.find(".s_btn");
			$btn.css({
				"position" : "absolute",
				"top" : "50%",
				"margin-top" : (-1)*opts.btnH/2 + "px",
				"width" : opts.btnW + "px",
				"height" : opts.btnH+ "px",
				"cursor" : "pointer",
				"background-color" : opts.btnBg,
				"z-index" : "10"
			});
			$btn.eq(0).css({"left" : "10px"});
			$btn.eq(1).css({"right" : "10px"});
		}
		//创建圆点标记
		createTag = function(warp){
			var tem = '<div class="s_tag"></div>';
			warp.append(tem);
			opts.$tag = warp.find(".s_tag");
			opts.$tag.css({
				"position" : "absolute",
				"left" : "0",
				"bottom" : "0",
				"width" : "100%",
				"height" : "40px",
				"line-height" : "40px",
				"font-size" : "0",
				"text-align" : "center",
				"z-index" : "10"
			});
			for(var i = 0; i < imgSize; i ++){
				opts.$tag.append("<span></span>");
			}
			opts.$tag.find("span").css({
				"display" : "inline-block",
				"margin-top" : (40 - opts.tagSize)/2 + "px", 
				"margin-left" : "5px",
				"margin-right" : "5px",
				"width" : opts.tagSize + "px",
				"height" : opts.tagSize + "px",
				"background-color" : opts.tagDefaultBg,
				"border-radius" : "9999px",
				"cursor" : "pointer"
			});
		},
		//轮播动画
		imgsMove = function(direction){
			if(opts.moveStyle == "slide"){
				if(direction == "left"){
					count --;
					count = count < 0 ? imgSize - 1 : count;
					$thsLink.eq(count).stop(true,false).animate({
						"left": 0},
						opts.moveTime, function() {
							var countR = count - 1;
							$thsLink.eq(countR).css({"left":"-100%"});
						});
					var countL = count + 1 == imgSize ? 0 : count + 1 ;
					$thsLink.eq(countL).stop(true,true).animate({"left": "100%"},opts.moveTime);
				}else{
					count ++;
					count = count == imgSize ? 0 : count;
					$thsLink.eq(count).stop(true,false).animate({
						"left": 0},
						opts.moveTime, function() {
							var countR = (count == imgSize - 1 ? -1 : count) + 1;
							$thsLink.eq(countR).css({"left":"100%"});
						});
					$thsLink.eq(count-1).stop(true,true).animate({"left": "-100%"},opts.moveTime);
				}
			}else if(opts.moveStyle == "fade"){
				if(direction == "left"){
					count --;
					count = count < 0 ? imgSize - 1 : count;
				}else{
					count ++;
					count = count == imgSize ? 0 : count;
				}
				$thsLink.css({"left": 0}).stop().hide().eq(count).fadeIn(opts.moveTime);	
			}
			tagsMove();
			startSlider();
		},
		//圆点标记移动
		tagsMove = function(){
			if(opts.addTag){
				var $tagsObj = opts.$tag.find("span");
				$tagsObj.css({
					"background-color" : opts.tagDefaultBg
				}).eq(count).css({
					"background-color" : opts.tagActiveBg
				});
			}
		},
		//开始轮播
		startSlider = function(){
			if(opts.autoSlider == true){
				ths.data('autoSli', window.setTimeout(imgsMove, opts.timeout));
			}
		},
		//暂停轮播
		stopSlider = function(){
			window.clearTimeout(ths.data('autoSli'));
		};

		//首张图片加载完毕后执行初始化
		var bannerImg = new Image;
		bannerImg.onload = function(){
			var loadImgW = ths.width(),
			loadImgH = bannerImg.height;
			opts.imgH = loadImgW*9/18;

			init();
		}
		bannerImg.src = $imgs.eq(0).attr("src");
		$(window).resize(function(){
          var loadImgW = ths.width();
			opts.imgH = loadImgW*9/18;
			ths.css({
				"height" : opts.imgH + "px"
			});
    	});
	}

	

	//----------Html
	// $.each($('*[e-fun = slider]'),function(i,tagsObj){
	// 	//debugger;
	// 	$(tagsObj).slider();
	// });
})(jQuery);	