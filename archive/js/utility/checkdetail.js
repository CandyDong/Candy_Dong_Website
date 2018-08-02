document.addEventListener("DOMContentLoaded", function () {
    var isAnimatingPreload;
    
    document.addEventListener('mouseover', function(e) {
        tweenMaskTo(e.target, 350);
    });
    
    document.addEventListener('mouseout', function(e) {
        tweenMaskTo(e.target, 300);
    });
    
    var tweenMaskTo = function(target, radius) {
        if (isAnimatingPreload || !target.classList.contains('mask')) {return;}
        
        var xCoord;
        var yCoord;
        
        if (target.id == 'mask_3') {
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
    
    var CoverMaskTransition = Barba.BaseTransition.extend({
        scrollToView: function () {
            var deferred = Barba.Utils.deferred();
            var oldTitle = this.oldContainer.querySelector('.content_container .content .title');
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
                    isAnimating = false;
                }
            });
            
            var winWidth = window.innerWidth;
            var oldTitle = this.oldContainer.querySelector('.content_container .content .title h1');
            var linkElement = this.getLinkByHref(this.getNewPageFile());
            var newButton = this.newContainer.querySelector('.nav_home_button');
            var mask = linkElement.querySelector('.mask');
            
            var xCoord, yCoord;
            if (linkElement.id == 'button_3') {
                xCoord = '55';
                yCoord = '50';
            }
            else if (linkElement.id == 'button_5') {
                xCoord = '60';
                yCoord = '55';
            }
            
            TweenLite.set(this.newContainer, {
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
                visibility: 'visible',
                opacity: 0,
                zIndex: 200
            });
            
            TweenLite.set(newButton, {opacity: 0});
            
            tl.add('fade');
            tl.to(oldTitle, 0.1, {autoAlpha: 0 }, 'fade');
            tl.to(mask, 1.5, {clipPath: 'circle(' + winWidth + 'px at ' + xCoord + '% ' + yCoord + 
                                   '%)'}, 'fade+=0.5');
            tl.to(this.newContainer, 1, {opacity: 1});
            
            tl.add('next');
            tl.to(newButton, 0.8, { opacity: 1 }, 'next');
            
        }
    });
   
});
    