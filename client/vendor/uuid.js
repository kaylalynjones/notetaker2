/*
Copyright (c) 2010 Aaron BLohowiak
Dual licensed under the MIT and GPL licenses. //modified by us
*/


(function(){
  'use strict';
  var BASE64URICHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('');

  var newId = function(len, radix) {
    var chars = BASE64URICHARS, newId = [], i=0;
    radix = radix || chars.length;
    len = len || 22;

    for (i = 0; i < len; i++){
      newId[i] = chars[0 | Math.random()*radix];
    }

    return newId.join('');
  };
  window.uuid = newId;

})();
