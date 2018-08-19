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
			
			$(this).mouseenter(function () {
				TweenMax.to(this, 0.8, {opacity: 1, ease: Power4.easeIn});
				TweenMax.to(img, 0.3, {webkitFilter: 'brightness(80%)', ease: Power4.easeOut});
			});
			
			$(this).mouseleave(function () {
				TweenMax.to(this, 0.8, {opacity: 0, ease: Power4.easeIn});
				TweenMax.to(img, 0.3, {webkitFilter: 'brightness(100%)', ease: Power4.easeOut});
			});
		});
	},
	
	svg_init: function () {
		this.svg_pic_mask.each(function () {
			var path = $(this).find('path');
			TweenMax.set(path, {scale: 0.8, transformOrigin:"50% 50%"});
			
			$(this).mouseover(function () {
				TweenMax.to(path, 0.8, {scale: 1, ease: Power4.easeOut});
			});
			$(this).mouseout(function () {
				TweenMax.to(path, 0.8, {scale: 0.8, ease: Power4.easeOut});
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
		
		this.transition = Barba.BaseTransition.extend({
			start: function () {
				this.newContainerLoading.then(this.display.bind(this));
			},
			
			display: function () {
				var _this = this;
				var tl = new TimelineMax({
					onComplete: function () {
						_this.newContainer.style.position = 'relative';
						_this.newContainer.style.minWidth = '787px';
						_this.done();
					}
				});
				
				var transit_to = window.nav.get_cur_page();
				if (transit_to == "index") {
					var old_nav_bar = this.oldContainer.querySelector('.nav-bar-container');
					var new_nav_bar = this.newContainer.querySelector('.nav-bar-container');
					var new_wrapper = this.newContainer.querySelector('.index-container');
					var old_wrapper = this.oldContainer.querySelector('.content-wrapper');
					var index_logo = this.newContainer.querySelector('.index-logo');
					var small_logo = this.oldContainer.querySelector('.small-logo');
					var small_logo_svg = $('svg', small_logo);
					
					TweenMax.set(this.newContainer, {
						position: 'fixed',
						top: 0,
						right: 0,
						left: 0,
						bottom: 0,
						autoAlpha: 1,
						zIndex: 1000
					});
					
					TweenMax.set(new_wrapper, {opacity: 0});
					TweenMax.set(index_logo, {opacity: 0});
					
					tl.add('transit');
					tl.to(old_wrapper, 0.5, {autoAlpha: 0}, 'transit');
					tl.to(old_nav_bar, 1, {top: '190px'}, 'transit+=0.5');
					tl.to(new_nav_bar, 1, {opacity: 1}, 'transit+=1.5');
					tl.to(small_logo, 1, {top: '50vh', left: '50%', transform: 'translate(-50%, -50%)', ease: Power4.easeOut}, 'transit+=1.5');
					tl.to(small_logo_svg, 1, {width: '550px', ease: Power4.easeOut}, 'transit+=1.5');
					tl.to(index_logo, 0.5, {opacity: 1}, 'transit+=2');
					tl.to(this.oldContainer, 1, {autoAlpha: 0}, 'transit+=2.5');
					tl.to(new_wrapper, 1, {opacity: 1}, 'transit+=3');
					tl.set(this.newContainer, {zIndex: 0});

				}
				else {
					var old_nav_bar = this.oldContainer.querySelector('.nav-bar-container');
					var new_nav_bar = this.newContainer.querySelector('.nav-bar-container');
					var old_wrapper = this.oldContainer.querySelector('.index-container');
					var new_wrapper = this.newContainer.querySelector('.content-wrapper');
					var index_logo = this.oldContainer.querySelector('.index-logo');
					var small_logo = this.newContainer.querySelector('.small-logo');
					var index_logo_svg = $('svg', index_logo);

					TweenMax.set(this.newContainer, {
						position: 'fixed',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						autoAlpha: 1,
						zIndex: 1000
					});
					TweenMax.set(new_nav_bar, {opacity: 0});
					TweenMax.set(new_wrapper, {opacity: 0});
					TweenMax.set(small_logo, {opacity: 0});

					tl.add('transit');
					tl.to(old_wrapper, 0.5, {autoAlpha: 0}, 'transit');
					tl.to(old_nav_bar, 1, {top: '40px'}, 'transit+=0.5');
					tl.to(new_nav_bar, 1, {opacity: 1}, 'transit+=1.5');
					tl.to(index_logo_svg, 1, {width: '350px', ease: Power4.easeOut}, 'transit+=1');
					tl.to(index_logo, 1, {top: '90px', left: '-200px', transform: 'none', ease: Power4.easeOut}, 'transit+=1');
					tl.to(small_logo, 0.5, {opacity: 1}, 'transit+=2');
					tl.to(this.oldContainer, 1, {autoAlpha: 0}, 'transit+=2.5');
					tl.to(new_wrapper, 1, {opacity: 1}, 'transit+=3');
					tl.set(this.newContainer, {zIndex: 0});

					window.design.init();
				}
				window.nav.init();	
			}
		});
		
		Barba.Pjax.getTransition = function () {
			return _this.transition;
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
		this.nav_resume = $('.nav-bar li#resume');
		this.nav_tech = $('.nav-bar li#tech');
		this.nav_home = $('.nav-bar li#home');
		
		this.nav_url_dic = {
			'index': this.nav_home,
			'design': this.nav_design,
			'resume': this.nav_resume,
			'tech': this.nav_tech
		}
	},
	
	get_cur_page: function () {
		return Barba.HistoryManager.currentStatus().url.split('/').pop().replace('.html', '');	
	},
	
	nav_highlight: function () {
		var cur_page = this.get_cur_page();
		TweenMax.to(this.nav_url_dic[cur_page], 1, {className: "+=on"});
	}
};


