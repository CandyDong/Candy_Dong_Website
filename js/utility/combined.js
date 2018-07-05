document.addEventListener("DOMContentLoaded", function () {
    Barba.Pjax.init();
    Barba.Prefetch.init();
    
    document.addEventListener('click', function (e) {
        var etarget = e.target;
        //get current window location
        var curPage = window.location.href.split('/').pop();
        if (!curPage.includes('preloader')) {
            return;
        }
        if (etarget.classList.contains('nav_toggle') || 
            etarget.classList.contains('nav_toggle_icon')) {
            toggleNavBar(etarget);
        }
        else {return; }
    });
    
//    navbar toggle handler
    var toggleNavBar = function (target) {
        var nav_toggle_button = document.querySelector('.nav_toggle');
        var title_container = document.querySelector('.title_container');
        var content_container = document.querySelector('.content_container');
        var nav_logo = document.querySelector('.nav_container .nav_header_top a');
        var nav_content = document.querySelector('.nav_header_mid');
        
        if (nav_toggle_button.classList.contains('is_nav_open')) {
            var togin = new TimelineMax();
            togin.add('start');
            togin.to(nav_toggle_button, 0.5, {className: "-=is_nav_open"}, 'start')
              .to(title_container, 0.4, {className: "-=container_right_shift"}, 'start+=0.3')
              .to(content_container, 0.4, {className: "-=container_right_shift"}, 'start+=0.3')
              .to(nav_logo, 0.5, {className: "+=nav_close"}, 'start')
              .to(nav_content, 0.5, {className: "+=nav_close"}, 'start');
        } 
        else {
            var togout = new TimelineMax();
            togout.add('start');
            togout.to(nav_toggle_button, 0.5, {className: "+=is_nav_open"}, 'start')
              .to(title_container, 0.4, {className: "+=container_right_shift"}, 'start+=0.3')
              .to(content_container, 0.4, {className: "+=container_right_shift"}, 'start+=0.3')
              .to(nav_logo, 0.5, {className: "-=nav_close"}, 'start')
              .to(nav_content, 0.5, {className: "-=nav_close"}, 'start');
        }
        
    }
    
    var isAnimatingDetail = false;
    var isAnimatingPreload = false;
    
    document.addEventListener('mouseover', function(e) {
        var etarget = e.target;
        if (isAnimatingPreload || isAnimatingDetail) {
            return;
        }
        
        if (!etarget.classList.contains('mask') && 
            !etarget.classList.contains('arrow_button')) {
            return;
        }
        
        if (etarget.classList.contains('mask')){ 
            tweenMaskTo(etarget, 350);
        }
        else if (etarget.classList.contains('arrow_button')) {
            var arrow_path = etarget.querySelector('path');
            tweenButtonTo(etarget, arrow_path, '#fff', 1.1);
        }
        return;
    });
    
    document.addEventListener('mouseout', function(e) {
        var etarget = e.target;
        if (isAnimatingPreload || isAnimatingDetail) {
            return;
        }
        
        if (!etarget.classList.contains('mask') && 
            !etarget.classList.contains('arrow_button')) {
            return;
        }
        
        if (etarget.classList.contains('mask')) {
            tweenMaskTo(etarget, 300);
        }
        
        if (etarget.classList.contains('arrow_button')) {
            var arrow_path = etarget.querySelector('path');
            tweenButtonTo(etarget, arrow_path, 'rgba(255, 255, 255, 0.9)', 1);
        }
        return;
    });
    
    var tweenMaskTo = function(target, radius) {
        var xCoord;
        var yCoord;
        
        if (target.id == 'mask_1') {
            xCoord = '55';
            yCoord = '50';
        }
        else if (target.id == 'mask_5') {
            xCoord = '60';
            yCoord = '55';
        }
        
        TweenLite.to(target, 0.3, {clipPath: 'circle(' + radius + 'px at ' + xCoord + '% ' + yCoord + 
                                   '%)'});
    };
    
    var tweenButtonTo = function (target, path, fillColor, scaleRatio) {
        var tl = new TimelineMax();
        var opacityValue = (scaleRatio > 1) ? 0.8 : 1;
        
        tl.add("start");
        tl.to(path, 0.5, {fill: fillColor}, "start")
          .to(target, 0.5, {scale: scaleRatio, opacity: opacityValue}, "start");
    }
    
    var CoverMaskTransition = Barba.BaseTransition.extend({
        start: function () {
            if (this.getNewPageFile() == "preloader.html"){
                isAnimatingDetail = true;
                Promise.all([this.newContainerLoading, this.scrollTop()])
                   .then(this.displayPreload.bind(this));
            }
            else if (this.getNewPageFile() == "design.html"){
                isAnimatingPreload = true;
                Promise.all([this.newContainerLoading, this.scrollToView(), this.closeNav()])
                   .then(this.displayDetail.bind(this));
            }
        },
        
        closeNav: function () {
            var deferred = Barba.Utils.deferred();
            var nav_toggle_button = document.querySelector('.nav_toggle');
            var title_container = document.querySelector('.title_container');
            var content_container = document.querySelector('.content_container');
            var nav_logo = document.querySelector('.nav_container .nav_header_top a');
            var nav_content = document.querySelector('.nav_header_mid');
            
            if (nav_toggle_button.classList.contains('is_nav_open')) {
                var close = new TimelineMax();
                close.add('start');
                close.to(nav_toggle_button, 0.2, {className: "-=is_nav_open"}, 'start')
                  .to(title_container, 0.1, {className: "-=container_right_shift"}, 'start+=0.1')
                  .to(content_container, 0.1, {className: "-=container_right_shift"}, 'start+=0.1')
                  .to(nav_logo, 0.2, {className: "+=nav_close"}, 'start')
                  .to(nav_content, 0.2, {className: "+=nav_close"}, 'start');
            } 
            
            deferred.resolve();
            return deferred.promise;
        },
        
        scrollTop: function() {
          var deferred = Barba.Utils.deferred();
          var obj = {y: window.pageYOffset};

          TweenLite.to(obj, 0.5, {
            y: 0,
            onUpdate: function() {
              if (obj.y === 0) {
                deferred.resolve();
              }

              window.scroll(0, obj.y);
            },
            onComplete: function() {
              deferred.resolve();
            }
          });
          return deferred.promise;
        },
        
        getNewPageFile: function() {
//            get destination url
            return Barba.HistoryManager.currentStatus().url.split('/').pop();
        },

        getLinkByHref: function(href) {
            return document.querySelector('a[href="' + href + '"]');
        },
        
        displayPreload: function () {
            var _this = this;
            var tl = new TimelineMax({
                onComplete: function () {
                    //_this.newContainer.style.position = 'static';
                    _this.done();
                    isAnimatingDetail = false;
                }
            });
            
            var arrow_button = this.oldContainer.querySelector('.nav_home_button a');
            var arrow = this.oldContainer.querySelector('.nav_home_button .arrow_button path');
            var header = this.oldContainer.querySelector('.detail_title');
            var title = this.newContainer.querySelector('.title_container .logo');
            var title_text = this.newContainer.querySelector('.title_container .logo_text');
            var sub_title = this.newContainer.querySelector('.title_container .logo_text h2');
            var scroll_bar = this.newContainer.querySelector('.scroll_bar_container');
            var scroll_text = this.newContainer.querySelector('.scroll_bar_container .scroll_text');
            
            TweenLite.set(this.newContainer, {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
                visibility: 'visible',
                opacity: 0,
                zIndex: 200
            });
            
            tl.add("start");
            tl.to(header, 1, {opacity: 0}, "start+=0.2")
              .to(arrow, 0.5, {fill: "#171616"}, "start")
              .to(arrow_button, 1, {left: 0, opacity: 0}, "start+=0.5")
//              .set(arrow_button, {transformOrigin: "50% 50% 0", scale:1}, "start")
//              .to(arrow_button, 1, {scale: 20, opacity: 0})
              .to(this.newContainer, 1, {opacity: 1});
            
            tl.add("next");
            tl.from(title, 1, {opacity: 1}, "next")
              .from(title_text, 1.5, {left: '100vw', opacity: 0, ease: Back.easeOut}, "next")
              .from(sub_title, 0.8, {opacity: 0},"next+=1");
            
            tl.add("final");
            tl.from(scroll_bar, 1, {opacity: 0, top: '100vh'}, "final")
              .from(scroll_text, 1, {opacity: 0}, "final+=0.8");
        },
        
        scrollToView: function () {
            var deferred = Barba.Utils.deferred();
            var linkElement = this.getLinkByHref(this.getNewPageFile());
            var mask = linkElement.querySelector('.mask');
            var obj = {offset: mask.getBoundingClientRect().top};
            
            TweenLite.to(obj, 1, {
                offset: 0, onUpdate: function () {
                    obj.offset = mask.getBoundingClientRect().top;
                    if (obj.offset === 0){
                        deferred.resolve();
                    }
                    window.scrollBy(0, obj.offset);
                },
                onComplete: function () {
                    deferred.resolve();
                }
            });
            
            return deferred.promise;
        },
    
        displayDetail: function () {
            var _this = this;
            var tl = new TimelineMax({
                onComplete: function () {
                    //_this.newContainer.style.position = 'static';
                    _this.done();
                    isAnimatingPreload = false;
                }
            });
            
            var winWidth = window.innerWidth;
            var oldTitle = this.oldContainer.querySelector('.content_container .content .title');
            var nav_container = this.oldContainer.querySelector('.nav_container');
            var linkElement = this.getLinkByHref(this.getNewPageFile());
            var newButton = this.newContainer.querySelector('.nav_home_button');
            var mask = linkElement.querySelector('.mask');
            
            var xCoord, yCoord;
            if (linkElement.id == 'button_1') {
                xCoord = '55';
                yCoord = '50';
            }
            else if (linkElement.id == 'button_5') {
                xCoord = '60';
                yCoord = '55';
            }
            
            TweenLite.set(nav_container, {opacity: 0});
            TweenLite.set(this.newContainer, {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
                visibility: 'visible',
                opacity: 0,
                zIndex: 200
            });
            
            tl.add('fade');
            tl.to(mask, 1.5, {clipPath: 'circle(' + winWidth + 'px at ' + xCoord + '% ' + yCoord + 
                                   '%)'}, 'fade')
              .to(oldTitle, 0.5, {opacity: 0}, 'fade')
              .to(this.newContainer, 1, {opacity: 1}, 'fade+=0.5');
        }
    });
    
    Barba.Pjax.getTransition = function() {
        return CoverMaskTransition;
    };
});
    