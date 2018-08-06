var index = {
	init: function () {
//		this.vars();
//		this.begin_anim();
	},
	
	vars: function () {
		this.poster_chars = $('.index-poster .index-title > span');
		this.candy_chars = this.poster_chars.slice(0, 5);
		this.dong_chars = this.poster_chars.slice(5, 9);
		this.dot = this.poster_chars[9];
	},
	
	begin_anim: function () {
		var tl = new TimelineMax();
		tl.add("start");
		tl.from(this.candy_chars, 0.5, {top: '10%', ease: Back.easeOut}, "start")
		  .from(this.dong_chars, 0.5, {top: '30%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.2")
		  .from(this.dot, 0.5, {top: '50%', autoAlpha: 0, ease: Back.easeOut}, "start+=0.4");
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
		
		var entry_width = target.children('span').width();
		var entry_height = target.children('span').height();
		
		var svg_width = Math.max(120, entry_width+40);
		$(svg).css("width", `${svg_width}px`);
		
		var svg_height = $(svg).height();
		
		var entry_offset_top = target.children('span').offset().top;
		var entry_offset_left = target.children('span').offset().left;
		var svg_offset_top = entry_offset_top+(entry_height-svg_height)/2;
		var svg_offset_left = entry_offset_left+(entry_width-svg_width)/2;
		
		$(svg).css("top", `${svg_offset_top}px`);
		$(svg).css("left", `${svg_offset_left}px`);
		
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

var nav_anim = {
	init: function () {
		this.vars();
		this.handle_transition_init();
	},
	
	vars: function () {
		this.nav_design = $('.navbar li#design');
		this.nav_work = $('.navbar li#work');
		this.nav_education = $('.navbar li#education');
		this.nav_resume = $('.navbar li#resume');
		this.nav_tech = $('.navbar li#tech');
	},
	
	handle_transition_init: function () {
		this.design_transition = Barba.BaseTransition.extend({
			start: function () {
				this.newContainerLoading.then(this.design_display.bind(this));
			},
			
			getNewPageFile: function () {
				return Barba.HistoryManager.currentStatus().url.split('/').pop();
			},
			
			design_display: function () {
				var _this = this;
				var tl = new TimelineMax({
					onComplete: function () {
						_this.newContainer.style.position = 'static';
						_this.done();
					}
				});
			}
			
		});
	}
	
	
};
