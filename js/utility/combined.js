document.addEventListener("DOMContentLoaded", function () {
    Barba.Pjax.init();
    Barba.Prefetch.init();
    
    //initialize customize button values
    var curPage = window.location.href.split('/').pop();
    if (curPage.includes('design')) {
        var arrow_button_left = document.querySelector('#arrow_button_left');
        arrow_button_left.value = "start";
    }
    
    document.addEventListener('click', function (e) {
        var etarget = e.target;
        //get current window location
        var curPage = window.location.href.split('/').pop();
        if (etarget.classList.contains('nav_toggle') || 
            etarget.classList.contains('nav_toggle_icon')) {
            toggleNavBar(etarget, curPage);
        }
        else if (curPage.includes('design')) {
            if (etarget.classList.contains('arrow_button') ||
                etarget.classList.contains('svg_icon_path') ||
                etarget.classList.contains('svg_icon')) {
                if (etarget.id.includes('left')) {
                    etarget = document.querySelector('#arrow_button_left');
                }
                else {
                    etarget = document.querySelector('#arrow_button_right');
                }
                animateDetail(curPage, etarget);
            }
        }
        
        else {return; }
    });
    
    var animateDetail = function (curPage, etarget) {
        if (curPage.includes('design')) {
            var arrow_button_left = document.querySelector('#arrow_button_left');
            var arrow_button_right = document.querySelector('#arrow_button_right');
            
            var page_title = document.querySelector('.detail_title_text');
            var title_text = page_title.querySelector('.detail_title_text h1');
            var title_pic = document.querySelector('.detail_title_pic');
            var color_circle = document.querySelectorAll('.detail_main_circle');
            var display_pic = document.querySelector('.display_pic');
            var display_des = document.querySelectorAll('.display_des');
            var detail_content = document.querySelector('.detail_content');
            var scroll_wrapper = document.querySelector('.display_scroll_wrapper');
            
            
            if (etarget.id.includes('left')) {
                /////////////////////left button click////////////////////////////////
                if (arrow_button_left.value == "start") {
                    var detailStart = new TimelineMax();
                    detailStart.add("start");
                    detailStart.to(arrow_button_left, 0.2, {left: 350, top: 450, width: 100, height: 100}, "start")
                               .to(page_title, 0.2, {left: 150, top: 380}, "start")
                               .to(title_text, 0.2, {fontSize: '5em'}, "start")
                               .to(title_pic, 0.2, {left: '-100vw'}, "start")
                               .to(display_pic, 0.2, {left: 0}, "start")
                               .to(color_circle[0], 0.3, {autoAlpha: 1, left: 350, ease: Back.easeOut}, "start+=0.2")
                               .to(arrow_button_right, 0.3, {autoAlpha: 1, right: 100, ease: Back.easeOut}, "start+=0.2")
                               .to(display_des[0], 0.3, {autoAlpha: 1}, "start+=0.3")
                    ;
                    arrow_button_left.value = "back";
                    arrow_button_right.value = "0";
                    return;
                }
                else if (arrow_button_left.value == "back") {
                    var detailEnd = new TimelineMax();
                    detailEnd.add("start");
                    detailEnd.to(display_des[0], 0.2, {autoAlpha: 0}, "start")
                             .to(arrow_button_right, 0.3, {autoAlpha: 0, right: -100}, "start")
                             .to(color_circle[0], 0.3, {autoAlpha: 0, left: 500}, "start")
                             .to(display_pic, 0.3, {left: 1000}, "start+=0.1")
                             .to(arrow_button_left, 0.2, {left: 550, top: 500, width: 150, height: 150}, "start+=0.1")
                             .to(page_title, 0.2, {left: 249, top: 411}, "start+=0.2")
                             .to(title_text, 0.2, {fontSize: '8em'}, "start+=0.2")
                             .to(title_pic, 0.2, {left: 0}, "start+=0.2");
                    arrow_button_left.value = "start";
                    arrow_button_right.value = "0";
                    return;
                }
                else {
                    //index points to the current pic
                    var index = parseInt(arrow_button_left.value, 10);
                    var scroll_dist = (index-1)*(1205);
                    
                    if (index <= 0) {
                        return;
                    }
                    
                    var shiftPic = new TimelineMax();
                    shiftPic.add("start");
                    //fadeNewPicIn -> fadeOldCircleOut -> fadeNewColorIn
                    shiftPic.set(color_circle[index-1], {left: -500})
                            .to(display_des[index], 0.2, {autoAlpha: 0})
                            .to(scroll_wrapper, 0.3, {scrollTo: {x: scroll_dist}}, "start")
                            .to(color_circle[index], 0.2, {autoAlpha: 0, left: 500}, "start+=0.1")
                            .to(color_circle[index-1], 0.3, {autoAlpha: 1, left: 350, ease: Back.easeOut}, "start+=0.1")
                            .to(display_des[index-1], 0.3, {autoAlpha: 1}, "start+=0.3");
                    index = index - 1;
                    arrow_button_right.value = index.toString();
                    arrow_button_left.value = index.toString();
                    
                    index = index - 1;
                    if (arrow_button_left.value == 0){
                        arrow_button_left.value = "back";
                    }
                }
            }
            else {
                /////////////////////right button click////////////////////////////////
                //index points to the current pic
                var index = parseInt(arrow_button_right.value, 10);
                var scroll_dist = (index+1)*(1205);
                
                if (index >= 4) {
                    return;
                }
                var shiftPic = new TimelineMax();
                shiftPic.add("start");
                //fadeColorCircleOut -> fadeColorCircleIn -> fadeNewPicIn
                shiftPic.to(color_circle[index], 0.2, {autoAlpha: 0, left: -500}, "start")
                        .to(display_des[index], 0.2, {autoAlpha: 0}, "start")
                        .set(color_circle[index], {left: 500})
                        .to(color_circle[index+1], 0.3, {autoAlpha: 1, left: 350, ease: Back.easeOut}, "start+=0.1")
                        .to(scroll_wrapper, 0.3, {scrollTo: {x: scroll_dist}}, "start+=0.1")
                        .to(display_des[index+1], 0.3, {autoAlpha: 1}, "start+=0.3");
                index = index + 1;
                arrow_button_right.value = index.toString();
                arrow_button_left.value = index.toString();
            }
        }
    }
    
//    navbar toggle handler
    var toggleNavBar = function (target, curPage) {
        var nav_toggle_button = document.querySelector('.nav_toggle');
        var nav_logo = document.querySelector('.nav_container .nav_header_top a');
        var nav_content = document.querySelector('.nav_header_mid');
        
        if (curPage.includes('preloader')) {
            var title_container = document.querySelector('.title_container');
            var content_container = document.querySelector('.content_container');
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
        else if (curPage.includes('design')) {
            var container = document.querySelector('.design');
            if (nav_toggle_button.classList.contains('is_nav_open')) {
                var togin = new TimelineMax();
                togin.add('start');
                togin.to(nav_toggle_button, 0.5, {className: "-=is_nav_open"}, 'start')
                  .to(container, 0.4, {className: "-=container_right_shift"}, 'start+=0.3')
                  .to(nav_logo, 0.5, {className: "+=nav_close"}, 'start')
                  .to(nav_content, 0.5, {className: "+=nav_close"}, 'start');
            } 
            else {
                var togout = new TimelineMax();
                togout.add('start');
                togout.to(nav_toggle_button, 0.5, {className: "+=is_nav_open"}, 'start')
                  .to(container, 0.4, {className: "+=container_right_shift"}, 'start+=0.3')
                  .to(nav_logo, 0.5, {className: "-=nav_close"}, 'start')
                  .to(nav_content, 0.5, {className: "-=nav_close"}, 'start');
            }
        }
    }
    
    var isAnimatingDetail = false;
    var isAnimatingPreload = false;
    
    document.addEventListener('mouseover', function(e) {
        var etarget = e.target;
        if (isAnimatingPreload || isAnimatingDetail) {
            return;
        }
        if (etarget.classList.contains('mask')){ 
            tweenMaskTo(etarget, 350);
        }
        else if (etarget.classList.contains('arrow_button') ||
                 etarget.classList.contains('svg_icon_path') ||
                 etarget.classList.contains('svg_icon')) {
            if (etarget.id.includes('left')) {
                etarget = document.querySelector('#arrow_button_left');
            }
            else {
                etarget = document.querySelector('#arrow_button_right');
            }
            arrow_path = document.querySelector('.svg_icon_path');
            tweenButtonTo(etarget, arrow_path, '#fff', 1.1);
        }
        return;
    });
    
    document.addEventListener('mouseout', function(e) {
        var etarget = e.target;
        if (isAnimatingPreload || isAnimatingDetail) {
            return;
        }
       
        if (etarget.classList.contains('mask')) {
            tweenMaskTo(etarget, 300);
        }
        
        if (etarget.classList.contains('arrow_button') ||
            etarget.classList.contains('svg_icon_path') ||
            etarget.classList.contains('svg_icon')) {
            if (etarget.id.includes('left')) {
                etarget = document.querySelector('#arrow_button_left');
            }
            else {
                etarget = document.querySelector('#arrow_button_right');
            }
            arrow_path = document.querySelector('.svg_icon_path');
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
        
        TweenLite.to(target, 0.3, {clipPath: 'circle(' + radius + 'px at ' + xCoord + '% ' + yCoord + '%)'});
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
                    _this.newContainer.style.position = 'static';
                    _this.done();
                    isAnimatingDetail = false;
                }
            });
            
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
            tl.to(this.oldContainer, 0.3, {opacity: 0}, "start+=0.3")
//              .set(arrow_button, {transformOrigin: "50% 50% 0", scale:1}, "start")
//              .to(arrow_button, 1, {scale: 20, opacity: 0})
              .to(this.newContainer, 0.3, {opacity: 1});
        
            tl.add("next");
            tl.from(title, 0.5, {opacity: 1}, "next")
              .from(title_text, 0.5, {top: '100vh', opacity: 0}, "next")
              .from(sub_title, 0.5, {opacity: 0},"next+=0.5");
            
            tl.add("final");
            tl.from(scroll_bar, 1, {opacity: 0, bottom: '-20vh'}, "final")
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
            
            //initialize customize button values
            if (this.getNewPageFile().includes('design')) {
                var arrow_button_left = this.newContainer.querySelector('#arrow_button_left');
                arrow_button_left.value = "start";
            }
            
            
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
    