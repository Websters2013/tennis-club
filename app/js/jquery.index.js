( function(){

    $( function() {

        $.each($('.menu__btn'), function () {
            new Menu($(this));
        });

        $.each($('.paralax'), function () {
            new Paralax($(this));
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
                        }

                    }}
                );

                if(_window.width() <= 992) {

                    _window.swipe({
                        swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                           switch (direction) {
                               case 'left':
                                   _menu.removeClass('mobile');
                                   break;
                               case 'right':
                                   _menu.addClass('mobile');
                                   break;
                           }
                        }  
                    });

                }

            },
            _construct = function () {
                _onEvents();
            };

        _construct();
    },
        Paralax = function (obj) {
            var _self = this,
                _obj = obj,
                _window = $( window );

            var _onEvents = function () {

                    _window.on(
                        { 'scroll': function () {
                        console.log(_window.scrollTop() ,_obj.position(), _obj.height());
                            //console.log(_obj.position()['top'] - 20 < _window.scrollTop());
                        if(_obj.position()['top'] - 40 < _window.scrollTop()) {
                            _obj.css("background-position","50% calc(-53px + " + (_window.scrollTop() / _obj.data('speed')) + "px)");
                        } else {
                            _obj.css("background-position","50% -53px");
                        }
                        }},
                        { 'mousewheel': function (e) {
                            if ( _canUseSmoothScroll ) {
                                event.preventDefault();

                                _siteScroll( event );

                            }
                            return false;
                        }}
                    );

                },
                _construct = function () {
                    _onEvents();
                };

            _construct();
        };

} )();