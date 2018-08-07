var index = {
	init: function () {
		this.vars();
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
		this.thumbnail = $('.thumbnail');
		this.thumbnail_pic = $('.thumbnail .pic');
		this.thumbnail_title = $('.thumbnail .title span');
	},
	
	find_thumbnail: function (entry) {
		var entry_id = $(entry).text().slice(0, 2);
		var content_id = $(entry).closest('div.catalog').attr('id').split('-').pop();
		var work_id, item_id, item;
		
		this.thumbnail.each(function () {
			work_id = $(this).closest('div.work').attr('id').split('-').pop();
			if (work_id != content_id) {
				return;
			} 
			item_id = $('span', $(this).children('.title')).text();
			if (item_id == entry_id) {
				item = $(this);
				return false;
			}
		});
		return item;
	},
	
	entry_init: function () {
		var _this = this;
		var item = undefined; 
		
		_this.entry.each(function () {
			var timer;
			var item = _this.find_thumbnail(this);
			
			$(this).mouseover(function () {
				_this.stroke_init($(this));
				
				timer = setTimeout(_this.draw_stroke.bind(_this), 200);
				_this.thumbnail_up(item);
			});
			
			$(this).mouseout(function () {
				$('svg.select-stroke').remove();
				clearTimeout(timer);
				_this.thumbnail_down(item);
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
	},
	
	thumbnail_up: function (item) {
		TweenMax.to($('.pic', item), 0.3, {boxShadow: '-13px 15px 8px rgba(57, 48, 68, 0.46)', ease: Power4.easeOut});
		TweenMax.to($('span', item), 0.3, {textShadow: '-13px 15px 8px rgba(57, 48, 68, 0.46)', ease: Power4.easeOut});
	},
	
	thumbnail_down: function (item) {
		TweenMax.to($('.pic', item), 0.3, {boxShadow: '-5px 5px 4px rgba(57, 48, 68, 0.46)', ease: Power4.easeOut});
		TweenMax.to($('span', item), 0.3, {textShadow: '-5px 5px 4px rgba(57, 48, 68, 0.46)', ease: Power4.easeOut});
	}
};


var nav_anim = {
	init: function () {
		this.vars();
		this.barba_init();
		this.transition_init();
	},
	
	vars: function () {
		this.nav_design = $('.navbar li#design');
		this.nav_work = $('.navbar li#work');
		this.nav_education = $('.navbar li#education');
		this.nav_resume = $('.navbar li#resume');
		this.nav_tech = $('.navbar li#tech');
		this.nav_home = $('.navbar li#home');
	},
	
	barba_init: function () {
		Barba.Pjax.init();
  		Barba.Prefetch.init();
	},
	
	transition_init: function () {
		var _this = this;
		
		this.design_transition = Barba.BaseTransition.extend({
			start: function () {
				this.newContainerLoading.then(this.design_display.bind(this));
			},
			
			design_display: function () {
				var _this = this;
				var tl = new TimelineMax({
					onComplete: function () {
						_this.newContainer.style.position = 'static';
						_this.done();
					}
				});
				
				TweenMax.set(this.newContainer, {
					position: 'fixed',
					visibility: 'visible',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					opacity: 0,
					zIndex: 100
				});
				
				tl.add('transit');
				tl.to(this.newContainer, 0.5, {opacity: 1}, 'transit+=0.4');
				
			}
		});
		
		Barba.Pjax.getTransition = function () {
			return _this.design_transition;
		};
	}
};

