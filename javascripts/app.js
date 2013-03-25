(function() {
  var Gallery, left_arrow, right_arrow, spacebar,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Gallery = (function(_super) {

    __extends(Gallery, _super);

    function Gallery() {
      return Gallery.__super__.constructor.apply(this, arguments);
    }

    Gallery.vivify();

    Gallery.prototype.initialize = function() {
      var _this = this;
      this.gallery = this.find('.gallery').cycle({
        fx: 'scrollLeft'
      });
      this.click(function() {
        return _this.gallery.cycle('toggle');
      });
      return $(document).on('keydown', function(e) {
        switch (e.keyCode) {
          case left_arrow:
            return _this.gallery.cycle('prev', 'scrollRight');
          case right_arrow:
            return _this.gallery.cycle('next');
          case spacebar:
            return _this.gallery.cycle('toggle');
        }
      });
    };

    return Gallery;

  })($.Vivified);

  $(function() {
    return new Gallery('.portfolio');
  });

  left_arrow = 37;

  right_arrow = 39;

  spacebar = 32;

}).call(this);
