(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);return i.prototype=n.prototype,t.prototype=new i,t.__super__=n.prototype,t},n=[].slice;jQuery.Extension=function(e){function r(e,t,r){var i,s,o;r==null&&(r=n),s=this.init(e,t,r);if(s!==this)for(i in s)o=s[i],this[i]=o}var n;return t(r,e),n=$(document),r.prototype.__class__=r,r.vivify=function(){var e;return this.prototype.__class__=this,e=function(){return this.constructor=this.__class__,this},e.prototype=this.__super__,this.__super__=new e,this.prototype.constructor=jQuery,this},r.ancestors=[],r}(jQuery),jQuery.Vivified=function(e){function r(){var e,t,i,s,o,u,a,f=this;s=arguments[0],e=2<=arguments.length?n.call(arguments,1):[],r.__super__.constructor.call(this,s),this.length!==1&&console.warn("Expected selector "+s+" to match exactly 1 element, matched "+this.length,this),(i=this.data("vivified"))||this.data("vivified",i={}),this.__class__===jQuery.Vivified&&console.error("Class must call @vivify"),i[this.__class__]&&console.error("Constructor called on already vivified DOM object",this),a=this.__class__.ancestors;for(o=0,u=a.length;o<u;o++)t=a[o],i[t]=this;this.on("refresh",function(){return f.refresh()}),typeof this.initialize=="function"&&this.initialize.apply(this,e),this.refresh()}return t(r,e),r.prototype.refresh=function(){var e,t,n;n=this.__class__.autoVivified||{};for(t in n)e=n[t],this.find(t).vivify(e);return this},r.vivify=function(e){return e&&$.extend(this.autoVivified||(this.autoVivified={}),e),this.ancestors[0]!==this&&(this.ancestors=[this].concat(n.call(this.ancestors))),r.__super__.constructor.vivify.call(this)},r.vivify(),r}(jQuery.Extension),$.fn.vivify=function(){var e,t,r,i,s,o,u,a,f,l;r=arguments[0],t=2<=arguments.length?n.call(arguments,1):[],l=function(){var e,s,u,a;u=this.get(),a=[];for(e=0,s=u.length;e<s;e++)i=u[e],a.push((o=$(i).data("vivified"))&&o[r]||function(e,t,n){n.prototype=e.prototype;var r=new n,i=e.apply(r,t),s=typeof i;return s=="object"||s=="function"?i||r:r}(r,[i].concat(n.call(t)),function(){}));return a}.call(this),e=l[0],u=2<=l.length?n.call(l,1):[],e||(e=$());for(a=0,f=u.length;a<f;a++)s=u[a],e=e.add(s);return e},$.fn.vivified=function(){var e,t,r,i,s,o,u,a,f,l,c;c=function(){var e,n,i,s;i=this.get(),s=[];for(e=0,n=i.length;e<n;e++)r=i[e],a=function(){var e,n;e=$(r).data("vivified"),n=[];for(t in e)u=e[t],n.push(u);return n}(),a.length===0?(console.error("DOM object is not vivified:",r),s.push($(r))):((o=$.unique(a)).length>1&&console.error("DOM object is vivified with more than one class:",r,o),s.push(a[0]));return s}.call(this),e=c[0],s=2<=c.length?n.call(c,1):[],e||(e=$());for(f=0,l=s.length;f<l;f++)i=s[f],e=e.add(i);return e}}).call(this);