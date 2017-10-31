( function(){

    $( function() {

        $.each($('.menu__btn'), function () {
            new Menu($(this));
        });

        $.each($('.site'), function () {
            new Site($(this));
        });
    });
    
    var Menu = function (obj) {
        var _self = this,
            _obj = obj,
            _menu = _obj.parent().find('.menu'),
            _window = $( window );

        var _onEvents = function () {

                _obj.on(
                    { 'click': function () {

                        if(_menu.hasClass('mobile')) {
                            _menu.removeClass('mobile');
                        } else {
                            _menu.addClass('mobile');
                        }

                    }}
                );

                _window.on(
                    { 'resize' : function () {

                        if(_menu.width() < window.innerWidth) {
                            _menu.removeClass('mobile');
                        } else {
                            _menuSwipe();
                        }

                    }}
                );

            },

            _menuSwipe = function () {
                var _rate = _window.width()/100;
                _window.swipe( {
                    swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection)
                    {
                        var currentDistance = distance / _rate;
                        switch (direction) {
                            case 'left':
                                if(_menu.hasClass('mobile')) {

                                    if(phase === 'move' && currentDistance < 100) {
                                        _menu.css({
                                            'transform': 'translateX(' + -currentDistance + '%)',
                                            'opacity': 1 - currentDistance / 100
                                        });
                                    }
                                    if(currentDistance === 100 || ((phase === 'cancel' || phase === 'end') && distance/2 > 48) ) {
                                        _menu.removeClass('mobile');
                                        _menu.css({'transform':'','opacity':''});
                                    }
                                    if((phase === 'cancel' || phase === 'end') && currentDistance < 48) {
                                        _menu.css({'transform':'','opacity':''});
                                    }



                                }
                                break;
                            case 'right':
                                if(!_menu.hasClass('mobile')) {

                                    if(phase === 'move' && currentDistance < 100 ) {
                                        _menu.css({
                                            'transform': 'translateX(' + (-100 + currentDistance) + '%)',
                                            'opacity': currentDistance / 100
                                        });
                                    }
                                    if(currentDistance === 100 || ((phase === 'cancel' || phase === 'end') && currentDistance > 48) ) {
                                        _menu.addClass('mobile');
                                        _menu.css({'transform': '','opacity':''});
                                    }
                                    if((phase === 'cancel' || phase === 'end') && currentDistance < 48) {
                                        _menu.css({'transform': '','opacity':''});
                                    }

                                }
                                break;
                        }
                    }
                });
            },
            _construct = function () {
                _onEvents();
                _menuSwipe();
            };

        _construct();
    },
        Site = function (obj) {
            var _self = this,
                _obj = obj,
                _canUseSmoothScroll = true,
                _canMove = true,
                _window = $( window );

            var _onEvents = function () {

                    _window.on({
                        'scroll': function () {
                            var scrollTop = $(window).scrollTop();
                            _move(scrollTop);
                        },
                        'mousewheel': function (event) {
                            if (_canUseSmoothScroll) {
                                event.preventDefault();
                                _siteScroll(event);
                            }
                            return false;
                        },
                        'DOMMouseScroll': function (event) {
                            if (_canUseSmoothScroll) {
                                event.preventDefault();

                                _siteScroll(event);

                            }
                            return false;
                        }
                    });

                },
                _siteScroll = function( event ) {
                    var scrollTime = .5,
                        scrollDistance = 125,
                        delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3,
                        scrollTop = _window.scrollTop(),
                        finalScroll = scrollTop - parseInt( delta * scrollDistance );

                    var tweenMax = new TweenMax.to( _window, scrollTime, {
                        scrollTo : { y: finalScroll, autoKill:true },
                        ease: Power1.easeOut,
                        overwrite: 5
                    });

                },
                _move = function (scrollTop) {
                    var winHeight = $(window).height();

                    $('.parallax').each( function() {
                        var curElem = $(this),
                            curTop = curElem.offset().top,
                            curHeight = curElem.height(),
                            curKoef = 1 / curElem.data('speed');

                        if ( ( scrollTop <= ( curTop + curHeight ) && ( ( winHeight + scrollTop ) >= curTop ) ) ) {

                            if ( curTop < winHeight ) {
                                _paralax( curElem, 0, scrollTop, curKoef);
                            } else {
                                _paralax( curElem, 0, scrollTop - (curTop - winHeight), curKoef);
                            }
                        }
                    } );
                },
                _paralax = function( elem, x, y, koef ) {
                    var translate = 'translate3d(' + Math.round(x*koef) + 'px, ' + Math.round(y*koef) + 'px, 0px )';

                    if (!_canMove) {
                        translate = 'translate3d(0px, 0px)';
                    }

                    elem.css( {
                        'transform': translate
                    } );
                },

                _construct = function () {
                    _onEvents();
                };

            _construct();
        };

} )();