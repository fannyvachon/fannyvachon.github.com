(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  jQuery.Extension = (function(_super) {
    var rootjQuery;

    __extends(Extension, _super);

    rootjQuery = $(document);

    function Extension(selector, context, root) {
      var key, r, val;
      if (root == null) {
        root = rootjQuery;
      }
      r = this.init(selector, context, root);
      if (r !== this) {
        for (key in r) {
          val = r[key];
          this[key] = val;
        }
      }
    }

    Extension.prototype.__class__ = Extension;

    Extension.vivify = function() {
      var ctor;
      this.prototype.__class__ = this;
      ctor = function() {
        this.constructor = this.__class__;
        return this;
      };
      ctor.prototype = this.__super__;
      this.__super__ = new ctor();
      this.prototype.constructor = jQuery;
      return this;
    };

    Extension.ancestors = [];

    return Extension;

  })(jQuery);

  jQuery.Vivified = (function(_super) {

    __extends(Vivified, _super);

    function Vivified() {
      var args, klass, reg, selector, _i, _len, _ref,
        _this = this;
      selector = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      Vivified.__super__.constructor.call(this, selector);
      if (this.length !== 1) {
        console.warn("Expected selector " + selector + " to match exactly 1 element, matched " + this.length, this);
      }
      if (!(reg = this.data('vivified'))) {
        this.data('vivified', reg = {});
      }
      if (this.__class__ === jQuery.Vivified) {
        console.error("Class must call @vivify");
      }
      if (reg[this.__class__]) {
        console.error("Constructor called on already vivified DOM object", this);
      }
      _ref = this.__class__.ancestors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        klass = _ref[_i];
        reg[klass] = this;
      }
      this.on('refresh', function() {
        return _this.refresh();
      });
      if (typeof this.initialize === "function") {
        this.initialize.apply(this, args);
      }
      this.refresh();
    }

    Vivified.prototype.refresh = function() {
      var klass, selector, _ref;
      _ref = this.__class__.autoVivified || {};
      for (selector in _ref) {
        klass = _ref[selector];
        this.find(selector).vivify(klass);
      }
      return this;
    };

    Vivified.vivify = function(autoVivify) {
      if (autoVivify) {
        $.extend(this.autoVivified || (this.autoVivified = {}), autoVivify);
      }
      if (this.ancestors[0] !== this) {
        this.ancestors = [this].concat(__slice.call(this.ancestors));
      }
      return Vivified.__super__.constructor.vivify.call(this);
    };

    Vivified.vivify();

    return Vivified;

  })(jQuery.Extension);

  $.fn.vivify = function() {
    var first, initArgs, klass, obj, other, reg, rest, _i, _len, _ref;
    klass = arguments[0], initArgs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    _ref = (function() {
      var _i, _len, _ref, _results;
      _ref = this.get();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        _results.push(((reg = $(obj).data('vivified')) && reg[klass]) || (function(func, args, ctor) {
          ctor.prototype = func.prototype;
          var child = new ctor, result = func.apply(child, args), t = typeof result;
          return t == "object" || t == "function" ? result || child : child;
        })(klass, [obj].concat(__slice.call(initArgs)), function(){}));
      }
      return _results;
    }).call(this), first = _ref[0], rest = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
    first || (first = $());
    for (_i = 0, _len = rest.length; _i < _len; _i++) {
      other = rest[_i];
      first = first.add(other);
    }
    return first;
  };

  $.fn.vivified = function() {
    var first, key, obj, other, rest, u, value, values, _i, _len, _ref;
    _ref = (function() {
      var _i, _len, _ref, _results;
      _ref = this.get();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        values = (function() {
          var _ref1, _results1;
          _ref1 = $(obj).data('vivified');
          _results1 = [];
          for (key in _ref1) {
            value = _ref1[key];
            _results1.push(value);
          }
          return _results1;
        })();
        if (values.length === 0) {
          console.error("DOM object is not vivified:", obj);
          _results.push($(obj));
        } else {
          if ((u = $.unique(values)).length > 1) {
            console.error("DOM object is vivified with more than one class:", obj, u);
          }
          _results.push(values[0]);
        }
      }
      return _results;
    }).call(this), first = _ref[0], rest = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
    first || (first = $());
    for (_i = 0, _len = rest.length; _i < _len; _i++) {
      other = rest[_i];
      first = first.add(other);
    }
    return first;
  };

}).call(this);
