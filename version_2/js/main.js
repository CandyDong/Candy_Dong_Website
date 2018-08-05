var index = {
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
			TweenMax.to(_this.chars, 0.3, {textShadow: '-2px 20px 15px rgba(57, 48, 68, 0.72)'});
			TweenMax.to(this, 0.3, {color: '#ffb6d3'});
		});
		
		this.scroll_down_btn.mouseleave(function () {
			TweenMax.to(this, 0.3, {color: '#c4879d'});
			TweenMax.to(_this.chars, 0.3, {textShadow: '-10px 5px 15px rgba(57, 48, 68, 0.72)'});
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

var design = {
	init: function () {
		this.vars();
		this.entry_init();
	},
	
	vars: function () {
		this.entry = $('.catalog .table .entry');
	},
	
	entry_init: function () {
		var _this = this;
		_this.entry.each(function () {
			$(this).mouseover(function () {
				_this.stroke_init($(this));
				_this.draw_stroke();
			});
			
			$(this).mouseout(function () {
				$('svg.select-stroke').remove();			
			});
		});
	},
	
	stroke_init: function (target) {
		var svg = $.parseHTML('<svg class="select-stroke" viewBox="0 0 100 30"><path d="M13.7,12.6C17.6,10,26.9,4.3,41.5,2c14-2.2,25.1,0,30.1,1.1c1.9,0.4,26.9,5.8,26.5,12.5c-0.3,5.1-15.6,8.4-25.4,10.5c-10.5,2.2-29.2,4.9-50.9,0.4c-9.6-2-18.3-3.8-19.7-8c-1.6-5,7.9-12,23.8-17.4"/></svg>');
		$('body').prepend(svg);
		this.path = document.querySelector('svg.select-stroke path');
		this.path_length = this.path.getTotalLength();
		
		var entry_offset_top = target.offset().top;
		var entry_offset_left = target.offset().left;
		var entry_length = (target.width() > 270) ? 220 : target.width();
		
		$(svg).css("top", `${entry_offset_top}px`);
		$(svg).css("left", `${entry_offset_left}px`);
		$(svg).css("width", `${entry_length}px`);
		$(svg).css("transform", "translateY(-50%)");
		
		this.path.style.strokeDasharray = `${this.path_length} ${this.path_length}`;
		this.path.style.strokeDashoffset = this.path_length;
		
		this.current_frame = 0;
		this.total_frames = 20;
		this.handle = 0;
	},
	
	draw_stroke: function () {
		var progress = this.current_frame/this.total_frames;
		if (progress > 1) {
			window.cancelAnimationFrame(this.animation_id);
		}
		else {
			this.current_frame++;
			this.path.style.strokeDashoffset = Math.floor(this.path_length * (1-progress));
			this.animation_id = window.requestAnimationFrame(this.draw_stroke.bind(this));
		}
	}
};