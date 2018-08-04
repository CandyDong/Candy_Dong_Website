var index_main = {
	init: function () {
		this.scroll_down_init();
		this.begin_anim();
	},
	
	scroll_down_init: function () {
		this.scroll_down_btn = $('.index-title span.scroll-down i');
		this.scroll_down_btn.hover(function () {
			$(this).css('cursor', 'pointer');
			TweenMax.to(this, 0.3, {color: '#bb48d2'});
		});
		this.scroll_down_btn.mouseleave(function () {
			TweenMax.to(this, 0.3, {color: '#9011e6'});
		});
	},
	
	begin_anim: function () {
		this.poster = $('.index-poster');
		this.poster_chars = $('.index-poster .index-title > span');
		this.candy_chars = this.poster_chars.slice(0, 5);
		this.dong_chars = this.poster_chars.slice(5, 9);
		this.dot = this.poster_chars[9];
		this.scroll_down_btn = this.poster_chars[10];
		
		var tl = new TimelineMax();
		tl.add("start");
		tl.from(this.candy_chars, 0.4, {top: '10%', ease: Back.easeOut}, "start")
		  .from(this.dong_chars, 0.5, {top: '30%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.2")
		  .from(this.dot, 0.3, {top: '50%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.4")
		  .from(this.scroll_down_btn, 0.3, {top: '70%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.6");
		
		
	}
};