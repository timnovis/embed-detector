(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("EmbedDetector", [], factory);
	else if(typeof exports === 'object')
		exports["EmbedDetector"] = factory();
	else
		root["EmbedDetector"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmbedDetector = function () {
  function EmbedDetector() {
    _classCallCheck(this, EmbedDetector);
  }

  _createClass(EmbedDetector, null, [{
    key: 'qualifySource',
    value: function qualifySource(string) {
      // Test the string against each pattern defined in sources, returns true
      if (string && string.length > 0) {
        var isMediaSource = false;
        EmbedDetector.sources.forEach(function (source) {
          if (source.pattern.test(string)) {
            isMediaSource = true;
          }
        });
        return isMediaSource;
      }
    }
  }, {
    key: 'getSourceType',
    value: function getSourceType(string) {
      // Returns the source type (e.g. 'soundcloud')
      if (string && string.length > 0) {
        var sourceType = null;
        EmbedDetector.sources.forEach(function (source) {
          if (source.pattern.test(string)) {
            sourceType = source.type;
          }
        });
        return sourceType;
      }
    }
  }, {
    key: 'detect',
    value: function detect(string) {
      // Return the iFrame URL for string
      if (string && string.length > 0) {
        var url = null;
        EmbedDetector.sources.forEach(function (source) {
          if (source.pattern.test(string) && string.indexOf(source.type) > -1) {
            url = source.url.replace('$1', string.match(source.pattern)[source.matchIndex]);
          }
        });
        return url;
      }
    }
  }, {
    key: 'sources',
    get: function get() {
      return [{
        type: 'youtube',
        url: 'http://www.youtube.com/embed/$1',
        pattern: /(?:https?:\/\/)?(?:i\.|www\.|img\.)?(?:youtu\.be\/|youtube\.com\/|ytimg\.com\/)(?:embed\/|v\/|vi\/|vi_webp\/|watch\?v=|watch\?.+&v=)((\w|-){11})(?:\S+)?/,
        matchIndex: 1
      }, {
        type: 'vimeo',
        url: 'https://player.vimeo.com/video/$1?color=f4d807&portrait=0&badge=0',
        pattern: /https?:\/\/(?:vimeo\.com\/|player\.vimeo\.com\/)(?:video\/|(?:channels\/staffpicks\/|channels\/)|)((\w|-){7,9})/,
        matchIndex: 1
      }, {
        type: 'soundcloud',
        url: 'https://w.soundcloud.com/player/?url=$1&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=true&amp;show_teaser=true&amp;visual=true',
        pattern: /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/,
        matchIndex: 0
      }];
    }
  }]);

  return EmbedDetector;
}();

exports.default = EmbedDetector;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=EmbedDetector.js.map