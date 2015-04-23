window.ZINGA = (function (module, $) {
  "use strict";

    if (typeof module.config === 'undefined') {
      module.config = {};
    }

    module.helpers = (function (module, $) {
      var submodule = {};
    submodule.getScreenView = function() {

      var indicator;
      if (document.querySelectorAll('.size-indicator').length == 0) {
        var indicator = document.createElement('div');
        indicator.className = indicator.className + " size-indicator";
        document.body.appendChild(indicator);
      }
      else {
        indicator = document.querySelectorAll('.size-indicator')[0];
      }
      var screen,
          indicatorWidth = indicator.offsetWidth;

    switch (indicatorWidth) {
        case 3:
        screen = '480-up';
        break;
        case 4:
          screen = '690-up';
          break;
        case 5:
          screen = '768-up';
          break;
        case 6:
          screen = '1000-up';
          break;
        case 7:
          screen = '1224-up';
          break;
        case 8:
          screen = '1366-up';
          break;
        case 9:
          screen = '1440-up';
          break;
        case 10:
          screen = '1600-up';
          break;
        default:
          screen = 'mobile';
          break;
      };

      return screen;

    };

    submodule.isTouchDevice = function() {
      return !!('ontouchstart' in window) || !!window.navigator.msMaxTouchPoints;
    };

    submodule.init = function () {
    };

    $(document).ready(function () {
      submodule.init();
    });

    return submodule;
  }(module, $));

  return module;

}(window.ZINGA || {}, window.jQuery));
