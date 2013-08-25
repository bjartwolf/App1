var $__getDescriptors = function(object) {
  var descriptors = {}, name, names = Object.getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    descriptors[name] = Object.getOwnPropertyDescriptor(object, name);
  }
  return descriptors;
}, $__createClassNoExtends = function(object, staticObject) {
  var ctor = object.constructor;
  Object.defineProperty(object, 'constructor', {enumerable: false});
  ctor.prototype = object;
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
};
var Greeter = function() {
  'use strict';
  var $Greeter = ($__createClassNoExtends)({
    constructor: function(message) {
      this.message = message;
    },
    greet: function() {
      var element = document.querySelector('#message');
      element.innerHTML = this.message;
    }
  }, {});
  return $Greeter;
}();
;
var greeter = new Greeter('Hello, world!');
WinJS.Utilities.ready(function() {
  greeter.greet();
});
