window.VIDEO = (function (module, $) {
  "use strict";

  if (!window.console) {
    window.console = {
      log: function () {
      },
      info: function () {
      },
      debug: function () {
      }
    }
  }

  if (typeof module.config === 'undefined') {
    module.config = {};
  }

  module.video = (function (module, $) {
    var submodule = {};

    submodule.loadVideo = function (videoContainer) {
      if (videoContainer.length == 0) { return false; }

      var video = videoContainer.find('video');
      var videoEl = video[0];
      var showingVideo = false;

      var adjustVideo = function (callback) {
        //check which one is bigger to make it the 100% element
        video.removeClass("heightRelated").removeClass("widthRelated");

        var vWidth = videoContainer.innerWidth();
        var vHeight = videoContainer.innerHeight();
        var ratio = vHeight / vWidth;
        if (vHeight <= vWidth && ratio < 0.5625) {
          video.removeClass("heightRelated").addClass('widthRelated');
          var newHeight = (vWidth * 9) / 16;
          video.css({
            'width': "100%",
            'height': newHeight,
            'margin-left': 0
          });
        }
        else {
          video.removeClass("widthRelated").addClass("heightRelated");
          var newWidth = (vHeight * 16) / 9;
          video.css({
            'width': newWidth,
            'height': "100%",
            'margin-left': -(Math.abs(newWidth - vWidth) / 2)
          });
        }

        if (callback) {
          callback();
        }
      };
      var showVideo = function () {
        $(videoEl).css({
          'visibility': 'visible',
          'opacity': 1
        });
        videoContainer.css({
          'background-image': 'none'
        });

        showingVideo = true;
      };
      var hideVideo = function () {
        $(videoEl).css({
          'visibility': 'hidden',
          'opacity': 0
        });
        videoContainer.css({
          'background-image': videoContainer.data('img')
        });
      };
      var setupVideo = function () {
        if (!ZINGA.helpers.getScreenView().match(/mobile|480/g) && !ZINGA.helpers.isTouchDevice()) {
          adjustVideo(showVideo);
        }
        else {
          hideVideo();
        }
      };

      videoEl.onloadeddata = function () {
        setupVideo();
        video.addClass('video-loaded');
      };

      if (!video.hasClass('video-loaded')) {
        videoEl.src = videoContainer.data("video");
      }
      else {
        setupVideo();
      }

      $(window).smartresize(function (evt) {
        setupVideo();
      });
    };


    submodule.init = function () {
        submodule.loadVideo($('.video-container'));
    };

    $(document).ready(function () {
      submodule.init();
    });

    return submodule;
  }(module, $));

  return module;

}(window.VIDEO || {}, window.jQuery));
