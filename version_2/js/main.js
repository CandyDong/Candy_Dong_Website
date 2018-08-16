var design = {
	init: function () {
		this.vars();
		this.anchor_init();
		this.svg_init();
	},
	
	vars: function () {
		this.anchor_arrow = $('.project-anchor .anchor-arrow');
		this.svg_pic_mask = $('.project-pic svg.design-mask'); 
	},
	
	anchor_init: function () {
		this.anchor_arrow.each(function () {
			var img = $(this).siblings('img');
			var height = img.height();
			var width = img.width();
			
			$(this).css('height', height);
			$(this).css('width', width);
			TweenMax.set(img, {webkitFilter: 'brightness(100%)'});
			TweenMax.set(this, {opacity: 0});
			$(this).removeClass('hide');
			
			$(this).mouseover(function () {
				TweenMax.to(this, 0.8, {opacity: 1, ease: Power4.easeIn});
				TweenMax.to(img, 0.3, {webkitFilter: 'brightness(60%)', ease: Power4.easeOut});
			});
			
			$(this).mouseout(function () {
				TweenMax.to(this, 0.8, {opacity: 0, ease: Power4.easeIn});
				TweenMax.to(img, 0.3, {webkitFilter: 'brightness(100%)', ease: Power4.easeOut});
			});
		});
	},
	
	svg_init: function () {
		this.svg_pic_mask.each(function () {
			var path = $(this).find('path');
			TweenMax.set(path, {scale: 0.6, transformOrigin:"50% 50%"});
			
			$(this).mouseover(function () {
				TweenMax.to(path, 1, {scale: 1, ease: Power4.easeOut});
			});
			$(this).mouseout(function () {
				TweenMax.to(path, 1, {scale: 0.6, ease: Power4.easeOut});
			});
		});
	}

};

var barba = {
	init: function () {
		this.barba_init();
		this.transition_init();
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
						_this.newContainer.style.position = 'relative';
						_this.newContainer.style.minWidth = '787px';
						_this.done();
					}
				});
				
				var old_nav_bar = this.oldContainer.querySelector('.nav-bar-container');
				var new_nav_bar = this.newContainer.querySelector('.nav-bar-container');
				var old_wrapper = this.oldContainer.querySelector('.index-container');
				var new_wrapper = this.newContainer.querySelector('.design-content-wrapper');
				
		
				TweenMax.set(this.newContainer, {
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
					autoAlpha: 1,
					opacity: 0,
					zIndex: 100
				});
				TweenMax.set(new_nav_bar, {opacity: 0});
				TweenMax.set(new_wrapper, {opacity: 0});
				
				tl.add('transit');
				tl.to(old_wrapper, 0.5, {opacity: 0}, 'transit');
				tl.to(old_nav_bar, 1, {top: '40px'}, 'transit');
				tl.to(this.oldContainer, 0.5, {autoAlpha: 0}, 'transit+=1');
				tl.to(new_nav_bar, 0.5, {opacity: 1}, 'transit+=1');
				tl.to(new_wrapper, 1, {opacity: 1}, 'transit+=1.5');
				tl.set(this.newContainer, {opacity: 1});
				
				window.nav.init();
				window.design.init();
			}
		});
		
		Barba.Pjax.getTransition = function () {
			return _this.design_transition;
		};
	}
};

var nav = {
	init: function () {
		this.vars();
		this.nav_highlight();
	},
	
	vars: function () {
		this.nav_design = $('.nav-bar li#design');
		this.nav_work = $('.nav-bar li#work');
		this.nav_resume = $('.nav-bar li#resume');
		this.nav_tech = $('.nav-bar li#tech');
		this.nav_home = $('.nav-bar li#home');
		
		this.nav_url_dic = {
			'index': this.nav_home,
			'design': this.nav_design,
			'work': this.nav_work,
			'resume': this.nav_resume,
			'tech': this.nav_tech
		}
	},
	
	get_cur_page: function () {
		return Barba.HistoryManager.currentStatus().url.split('/').pop().replace('.html', '');	
	},
	
	nav_highlight: function () {
		var cur_page = this.get_cur_page();
		this.nav_url_dic[cur_page].addClass('on');
	}
};


