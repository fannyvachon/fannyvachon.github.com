(function() {
  var Gallery,
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
      return this.click(function() {
        return _this.gallery.cycle('toggle');
      });
    };

    return Gallery;

  })($.Vivified);

  $(function() {
    return new Gallery('.portfolio');
  });

}).call(this);
