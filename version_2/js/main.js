var index_main = {
	init: function () {
		this.scroll_down_init();
	},
	
	scroll_down_init: function () {
		this.scroll_down_btn = $('.index-title span.scroll-down i');
		this.scroll_down_btn.hover(function () {
			$(this).css('cursor', 'pointer');
			TweenMax.to(this, 0.3, {color: '#f7d0ff'});
		});
		this.scroll_down_btn.mouseleave(function () {
			TweenMax.to(this, 0.3, {color: '#e465ff'});
		});
	}
};