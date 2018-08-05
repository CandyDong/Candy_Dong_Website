var index_main = {
	init: function () {
		this.vars();
		this.scroll_down_init();
		this.begin_anim();
	},
	
	vars: function () {
		this.scroll_down_btn = $('.index-title span.scroll-down i');
		this.poster = $('.index-poster');
		this.background = $('.index-background');
		this.poster_chars = $('.index-poster .index-title > span');
		this.candy_chars = this.poster_chars.slice(0, 5);
		this.dong_chars = this.poster_chars.slice(5, 9);
		this.chars = this.poster_chars.slice(0, 9);
		this.dot = this.poster_chars[9];
	},
	
	scroll_down_init: function () {
		var _this = this;
		this.scroll_down_btn.hover(function () {
			$(this).css('cursor', 'pointer');
			TweenMax.to(_this.chars, 0.3, {textShadow: '-2px 20px 15px #37164e'});
			TweenMax.to(this, 0.3, {color: '#bb48d2'});
		});
		
		this.scroll_down_btn.mouseleave(function () {
			TweenMax.to(this, 0.3, {color: '#e28df7'});
			TweenMax.to(_this.chars, 0.3, {textShadow: '-10px 5px 15px #37164e'});
		});
		
		this.scroll_down_btn.on("click", ()=>{
			var tl = new TimelineMax();
			tl.add("start");
			tl.to(this.scroll_down_btn, 0.3, {autoAlpha: 0, ease: Power4.easeIn}, "start");
			tl.to(this.background, 0.3, {autoAlpha: 0, ease: Power4.easeIn}, "start");
			tl.to(this.candy_chars, 0.3, {top: '68%', ease: Power4.easeIn}, "start+=0.3");
			tl.to(this.dong_chars, 0.3, {top: '76%', ease: Power4.easeIn}, "start+=0.5");
			
			tl.to(this.dot, 0.3, {top: '76%', left: '65%', ease: Power4.easeOut});
			tl.add("shift");
			tl.to(this.dong_chars, 0.3, {top: '68%', left: '30%', ease: Power4.easeOut}, "shift");
			tl.to(this.dot, 0.3, {top: '68%', left: '30%', ease: Power4.easeOut}, "shift");
			
			
		});
	},
	
	begin_anim: function () {
		var tl = new TimelineMax();
		tl.add("start");
		tl.from(this.candy_chars, 0.5, {top: '10%', ease: Back.easeOut}, "start")
		  .from(this.dong_chars, 0.5, {top: '30%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.2")
		  .from(this.dot, 0.5, {top: '50%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.4")
		  .from(this.scroll_down_btn, 0.5, {top: '70%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.6");
	}
};