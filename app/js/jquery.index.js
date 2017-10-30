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
                        //console.log(_window.scrollTop() ,_obj.position(), _obj.height());
                            console.log(_obj.position()['top'] < _window.scrollTop());
                        if(_obj.position()['top'] < _window.scrollTop()) {
                            _obj.css("background-position","50% " + (_window.scrollTop() / 2) + "px");
                        }


                        }}
                    );

                },
                _construct = function () {
                    _onEvents();
                };

            _construct();
        };

} )();