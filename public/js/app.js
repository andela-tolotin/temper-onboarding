/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

if (false) {
  module.exports = require('./vue.common.prod.js')
} else {
  module.exports = __webpack_require__(14)
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(20)):"function"==typeof define&&define.amd?define(["highcharts"],e):"object"==typeof exports?exports.HighchartsVue=e(require("highcharts")):t.HighchartsVue=e(t.Highcharts)}("undefined"!=typeof self?self:this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(e,r){e.exports=t},function(t,e,r){"use strict";function n(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t.component(e.tagName||"highcharts",Object(o.a)(e.highcharts||i.a))}Object.defineProperty(e,"__esModule",{value:!0}),e.default=n,r.d(e,"Chart",function(){return a});var o=r(2),c=r(0),i=r.n(c),a=Object(o.a)(i.a)},function(t,e,r){"use strict";function n(t){return i(t)||c(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function c(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}var a=r(3),s=function(t){return{template:'<div ref="chart"></div>',render:function(t){return t("div",{ref:"chart"})},props:{constructorType:{type:String,default:"chart"},options:{type:Object,required:!0},callback:Function,updateArgs:{type:Array,default:function(){return[!0,!0]}},highcharts:{type:Object},deepCopyOnUpdate:{type:Boolean,default:!0}},watch:{options:{handler:function(t){var e;(e=this.chart).update.apply(e,[Object(a.a)(t,this.deepCopyOnUpdate)].concat(n(this.updateArgs)))},deep:!0}},mounted:function(){var e=this.highcharts||t;this.options&&e[this.constructorType]?this.chart=e[this.constructorType](this.$refs.chart,Object(a.a)(this.options,!0),this.callback?this.callback:null):this.options?console.warn("'".concat(this.constructorType,"' constructor-type is incorrect. Sometimes this error is caused by the fact, that the corresponding module wasn't imported.")):console.warn('The "options" parameter was not passed.')},beforeDestroy:function(){this.chart&&this.chart.destroy()}}};e.a=s},function(t,e,r){"use strict";function n(t,e,r){function o(o,i){!c.a.isObject(o,!r)||c.a.isClass(o)||c.a.isDOMElement(o)?t[i]=e[i]:t[i]=n(t[i]||c.a.isArray(o)?[]:{},o,r)}return c.a.isArray(e)?e.forEach(o):c.a.objectEach(e,o),t}r.d(e,"a",function(){return i});var o=r(0),c=r.n(o),i=function(t,e){return n({},t,e)}}])});

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
module.exports = __webpack_require__(30);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_App__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Welcome__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_Welcome___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_Welcome__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);




var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        component: __WEBPACK_IMPORTED_MODULE_3__views_Welcome___default.a
    }]
});

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
    el: '#app',
    components: { App: __WEBPACK_IMPORTED_MODULE_2__views_App___default.a },
    router: router
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecesarry `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving the component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(15).setImmediate))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(16);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(2)))

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*!
  * vue-router v3.1.3
  * (c) 2019 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isExtendedError (constructor, err) {
  return (
    err instanceof constructor ||
    // _name is to support IE9 too
    (err && (err.name === constructor.name || err._name === constructor._name))
  )
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }
        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    return extend({}, raw)
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, noop);
        } else {
          router.push(location, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.props.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = aData.on || {};
        // transform existing events in both objects into arrays so we can push later
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        // append new listeners for router-link
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            // on[event] is always a function
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }

        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  if (true) {
    // warn if routes do not include leading slashes
    var found = pathList
    // check for missing leading slash
      .filter(function (path) { return path && path.charAt(0) !== '*' && path.charAt(0) !== '/'; });

    if (found.length > 0) {
      var pathNames = found.map(function (path) { return ("- " + path); }).join('\n');
      warn(false, ("Non-nested routes must include a leading slash character. Fix the following routes: \n" + pathNames));
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ("development" !== 'production' && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

// use User Timing api (if present) for more accurate key precision
var Time =
  inBrowser && window.performance && window.performance.now
    ? window.performance
    : Date;

function genStateKey () {
  return Time.now().toFixed(3)
}

var _key = genStateKey();

function getStateKey () {
  return _key
}

function setStateKey (key) {
  return (_key = key)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({ key: getStateKey() }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState =
  inBrowser &&
  (function () {
    var ua = window.navigator.userAgent;

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && 'pushState' in window.history
  })();

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: getStateKey() }, '', url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

var NavigationDuplicated = /*@__PURE__*/(function (Error) {
  function NavigationDuplicated (normalizedLocation) {
    Error.call(this);
    this.name = this._name = 'NavigationDuplicated';
    // passing the message to super() doesn't seem to work in the transpiled version
    this.message = "Navigating to current location (\"" + (normalizedLocation.fullPath) + "\") is not allowed";
    // add a stack property so services like Sentry can correctly display it
    Object.defineProperty(this, 'stack', {
      value: new Error().stack,
      writable: true,
      configurable: true
    });
    // we could also have used
    // Error.captureStackTrace(this, this.constructor)
    // but it only exists on node and chrome
  }

  if ( Error ) NavigationDuplicated.__proto__ = Error;
  NavigationDuplicated.prototype = Object.create( Error && Error.prototype );
  NavigationDuplicated.prototype.constructor = NavigationDuplicated;

  return NavigationDuplicated;
}(Error));

// support IE9
NavigationDuplicated._name = 'NavigationDuplicated';

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function (cb) {
          cb(err);
        });
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // after merging https://github.com/vuejs/vue-router/pull/2771 we
    // When the user navigates through history through back/forward buttons
    // we do not want to throw the error. We only throw it if directly calling
    // push/replace. That's why it's not included in isError
    if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort(new NavigationDuplicated(route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History) {
  function HTML5History (router, base) {
    var this$1 = this;

    History.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History ) HTML5History.__proto__ = History;
  HTML5History.prototype = Object.create( History && History.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History) {
  function HashHistory (router, base, fallback) {
    History.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History ) HashHistory.__proto__ = History;
  HashHistory.prototype = Object.create( History && History.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      function () {
        var current = this$1.current;
        if (!ensureSlash()) {
          return
        }
        this$1.transitionTo(getHash(), function (route) {
          if (supportsScroll) {
            handleScroll(this$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      }
    );
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History) {
  function AbstractHistory (router, base) {
    History.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History ) AbstractHistory.__proto__ = History;
  AbstractHistory.prototype = Object.create( History && History.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isExtendedError(NavigationDuplicated, err)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.1.3';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(5)
/* script */
var __vue_script__ = __webpack_require__(19)
/* template */
var __vue_template__ = __webpack_require__(21)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/views/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50e73d1e", Component.options)
  } else {
    hotAPI.reload("data-v-50e73d1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_highcharts_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_highcharts_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_highcharts_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_highcharts_vue___default.a);


/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        highcharts: __WEBPACK_IMPORTED_MODULE_1_highcharts_vue__["Chart"]
    },
    mounted: function mounted() {
        var _this = this;

        axios.get('/api/onboarding/chart').then(function (response) {
            _this.chartOptions.series = response.data;
        }).catch(function (error) {
            console.log(error);
        });
    },
    data: function data() {
        return {
            chartOptions: {
                title: {
                    text: 'Tempr Weekly Retention Chart'
                },

                subtitle: {
                    text: ''
                },
                xAxis: {
                    categories: ['Create account', 'Activate account', 'Provide profile information', 'What jobs are you interested in?', 'Do you have relevant experience in these jobs?', 'Are you a freelancer?', 'Waiting for approval', 'Approval']
                },

                yAxis: {
                    title: {
                        text: 'Percentage Completed'
                    },
                    labels: {
                        formatter: function formatter() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 0
                    }
                },
                series: null,
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 0
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                },
                tooltip: {
                    formatter: function formatter() {
                        return 'Only ' + this.y + '%, users completed "' + this.x + '" for the week ' + this.series.name;
                    }
                }
            }
        };
    }
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 Highcharts JS v7.2.1 (2019-10-31)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(P,M){"object"===typeof module&&module.exports?(M["default"]=M,module.exports=P.document?M(P):M): true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return M(P)}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):(P.Highcharts&&P.Highcharts.error(16,!0),P.Highcharts=M(P))})("undefined"!==typeof window?window:this,function(P){function M(c,f,F,G){c.hasOwnProperty(f)||(c[f]=G.apply(null,F))}var I={};M(I,"parts/Globals.js",[],function(){var c="undefined"!==typeof P?P:"undefined"!==typeof window?window:{},f=c.document,
F=c.navigator&&c.navigator.userAgent||"",G=f&&f.createElementNS&&!!f.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,z=/(edge|msie|trident)/i.test(F)&&!c.opera,B=-1!==F.indexOf("Firefox"),t=-1!==F.indexOf("Chrome"),v=B&&4>parseInt(F.split("Firefox/")[1],10);return{product:"Highcharts",version:"7.2.1",deg2rad:2*Math.PI/360,doc:f,hasBidiBug:v,hasTouch:!!c.TouchEvent,isMS:z,isWebKit:-1!==F.indexOf("AppleWebKit"),isFirefox:B,isChrome:t,isSafari:!t&&-1!==F.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(F),
SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:G,win:c,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});M(I,"parts/Utilities.js",[I["parts/Globals.js"]],function(c){function f(a,d){return parseInt(a,d||10)}function F(a){return"string"===typeof a}function G(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a}function z(a,d){return!!a&&"object"===typeof a&&(!d||
!G(a))}function B(a){return z(a)&&"number"===typeof a.nodeType}function t(a){var d=a&&a.constructor;return!(!z(a,!0)||B(a)||!d||!d.name||"Object"===d.name)}function v(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a}function C(a){return"undefined"!==typeof a&&null!==a}function H(a,d,e){var b;F(d)?C(e)?a.setAttribute(d,e):a&&a.getAttribute&&((b=a.getAttribute(d))||"class"!==d||(b=a.getAttribute(d+"Name"))):n(d,function(d,e){a.setAttribute(e,d)});return b}function y(a,d){var e;a||(a=
{});for(e in d)a[e]=d[e];return a}function h(){for(var a=arguments,d=a.length,e=0;e<d;e++){var b=a[e];if("undefined"!==typeof b&&null!==b)return b}}function n(a,d,e){for(var b in a)Object.hasOwnProperty.call(a,b)&&d.call(e||a[b],a[b],b,a)}c.timers=[];var q=c.charts,g=c.doc,b=c.win;c.error=function(a,d,e,l){var g=v(a),h=g?"Highcharts error #"+a+": www.highcharts.com/errors/"+a+"/":a.toString(),p=function(){if(d)throw Error(h);b.console&&console.log(h)};if("undefined"!==typeof l){var u="";g&&(h+="?");
c.objectEach(l,function(a,d){u+="\n"+d+": "+a;g&&(h+=encodeURI(d)+"="+encodeURI(a))});h+=u}e?c.fireEvent(e,"displayError",{code:a,message:h,params:l},p):p()};c.Fx=function(a,d,e){this.options=d;this.elem=a;this.prop=e};c.Fx.prototype={dSetter:function(){var a=this.paths[0],d=this.paths[1],e=[],b=this.now,g=a.length;if(1===b)e=this.toD;else if(g===d.length&&1>b)for(;g--;){var c=parseFloat(a[g]);e[g]=isNaN(c)||"A"===d[g-4]||"A"===d[g-5]?d[g]:b*parseFloat(""+(d[g]-c))+c}else e=d;this.elem.attr("d",e,
null,!0)},update:function(){var a=this.elem,d=this.prop,e=this.now,b=this.options.step;if(this[d+"Setter"])this[d+"Setter"]();else a.attr?a.element&&a.attr(d,e,null,!0):a.style[d]=e+this.unit;b&&b.call(a,e,this)},run:function(a,d,e){var l=this,g=l.options,h=function(a){return h.stopped?!1:l.step(a)},p=b.requestAnimationFrame||function(a){setTimeout(a,13)},u=function(){for(var a=0;a<c.timers.length;a++)c.timers[a]()||c.timers.splice(a--,1);c.timers.length&&p(u)};a!==d||this.elem["forceAnimate:"+this.prop]?
(this.startTime=+new Date,this.start=a,this.end=d,this.unit=e,this.now=this.start,this.pos=0,h.elem=this.elem,h.prop=this.prop,h()&&1===c.timers.push(h)&&p(u)):(delete g.curAnim[this.prop],g.complete&&0===Object.keys(g.curAnim).length&&g.complete.call(this.elem))},step:function(a){var d=+new Date,e=this.options,b=this.elem,g=e.complete,c=e.duration,p=e.curAnim;if(b.attr&&!b.element)a=!1;else if(a||d>=c+this.startTime){this.now=this.end;this.pos=1;this.update();var u=p[this.prop]=!0;n(p,function(a){!0!==
a&&(u=!1)});u&&g&&g.call(b);a=!1}else this.pos=e.easing((d-this.startTime)/c),this.now=this.start+(this.end-this.start)*this.pos,this.update(),a=!0;return a},initPath:function(a,d,e){function b(a){for(A=a.length;A--;){var d="M"===a[A]||"L"===a[A];var e=/[a-zA-Z]/.test(a[A+3]);d&&e&&a.splice(A+1,0,a[A+1],a[A+2],a[A+1],a[A+2])}}function g(a,d){for(;a.length<h;){a[0]=d[h-a.length];var e=a.slice(0,r);[].splice.apply(a,[0,0].concat(e));w&&(e=a.slice(a.length-r),[].splice.apply(a,[a.length,0].concat(e)),
A--)}a[0]="M"}function c(a,d){for(var e=(h-a.length)/r;0<e&&e--;)x=a.slice().splice(a.length/m-r,r*m),x[0]=d[h-r-e*r],k&&(x[r-6]=x[r-2],x[r-5]=x[r-1]),[].splice.apply(a,[a.length/m,0].concat(x)),w&&e--}d=d||"";var p=a.startX,u=a.endX,k=-1<d.indexOf("C"),r=k?7:3,x,A;d=d.split(" ");e=e.slice();var w=a.isArea,m=w?2:1;k&&(b(d),b(e));if(p&&u){for(A=0;A<p.length;A++)if(p[A]===u[0]){var K=A;break}else if(p[0]===u[u.length-p.length+A]){K=A;var J=!0;break}else if(p[p.length-1]===u[u.length-p.length+A]){K=
p.length-A;break}"undefined"===typeof K&&(d=[])}if(d.length&&v(K)){var h=e.length+K*m*r;J?(g(d,e),c(e,d)):(g(e,d),c(d,e))}return[d,e]},fillSetter:function(){c.Fx.prototype.strokeSetter.apply(this,arguments)},strokeSetter:function(){this.elem.attr(this.prop,c.color(this.start).tweenTo(c.color(this.end),this.pos),null,!0)}};c.merge=function(){var a,d=arguments,e={},b=function(a,d){"object"!==typeof a&&(a={});n(d,function(e,k){!z(e,!0)||t(e)||B(e)?a[k]=d[k]:a[k]=b(a[k]||{},e)});return a};!0===d[0]&&
(e=d[1],d=Array.prototype.slice.call(d,2));var g=d.length;for(a=0;a<g;a++)e=b(e,d[a]);return e};c.clearTimeout=function(a){C(a)&&clearTimeout(a)};c.css=function(a,d){c.isMS&&!c.svg&&d&&"undefined"!==typeof d.opacity&&(d.filter="alpha(opacity="+100*d.opacity+")");y(a.style,d)};c.createElement=function(a,d,e,b,L){a=g.createElement(a);var l=c.css;d&&y(a,d);L&&l(a,{padding:"0",border:"none",margin:"0"});e&&l(a,e);b&&b.appendChild(a);return a};c.extendClass=function(a,d){var e=function(){};e.prototype=
new a;y(e.prototype,d);return e};c.pad=function(a,d,e){return Array((d||2)+1-String(a).replace("-","").length).join(e||"0")+a};c.relativeLength=function(a,d,e){return/%$/.test(a)?d*parseFloat(a)/100+(e||0):parseFloat(a)};c.wrap=function(a,d,e){var b=a[d];a[d]=function(){var a=Array.prototype.slice.call(arguments),d=arguments,l=this;l.proceed=function(){b.apply(l,arguments.length?arguments:d)};a.unshift(b);a=e.apply(this,a);l.proceed=null;return a}};c.datePropsToTimestamps=function(a){n(a,function(d,
e){z(d)&&"function"===typeof d.getTime?a[e]=d.getTime():(z(d)||G(d))&&c.datePropsToTimestamps(d)})};c.formatSingle=function(a,d,e){var b=/\.([0-9])/,g=c.defaultOptions.lang;/f$/.test(a)?(e=(e=a.match(b))?e[1]:-1,null!==d&&(d=c.numberFormat(d,e,g.decimalPoint,-1<a.indexOf(",")?g.thousandsSep:""))):d=(e||c.time).dateFormat(a,d);return d};c.format=function(a,d,e){for(var b="{",g=!1,h,p,u,k,r=[],x;a;){b=a.indexOf(b);if(-1===b)break;h=a.slice(0,b);if(g){h=h.split(":");p=h.shift().split(".");k=p.length;
x=d;for(u=0;u<k;u++)x&&(x=x[p[u]]);h.length&&(x=c.formatSingle(h.join(":"),x,e));r.push(x)}else r.push(h);a=a.slice(b+1);b=(g=!g)?"}":"{"}r.push(a);return r.join("")};c.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};c.normalizeTickInterval=function(a,d,e,b,g){var l=a;e=h(e,1);var p=a/e;d||(d=g?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===b&&(1===e?d=d.filter(function(a){return 0===a%1}):.1>=e&&(d=[1/e])));for(b=0;b<d.length&&!(l=d[b],g&&l*e>=a||!g&&p<=(d[b]+
(d[b+1]||d[b]))/2);b++);return l=c.correctFloat(l*e,-Math.round(Math.log(.001)/Math.LN10))};c.stableSort=function(a,d){var b=a.length,l,g;for(g=0;g<b;g++)a[g].safeI=g;a.sort(function(a,b){l=d(a,b);return 0===l?a.safeI-b.safeI:l});for(g=0;g<b;g++)delete a[g].safeI};c.correctFloat=function(a,d){return parseFloat(a.toPrecision(d||14))};c.animObject=function(a){return z(a)?c.merge(a):{duration:a?500:0}};c.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};
c.numberFormat=function(a,d,b,l){a=+a||0;d=+d;var e=c.defaultOptions.lang,g=(a.toString().split(".")[1]||"").split("e")[0].length,p=a.toString().split("e");if(-1===d)d=Math.min(g,20);else if(!v(d))d=2;else if(d&&p[1]&&0>p[1]){var u=d+ +p[1];0<=u?(p[0]=(+p[0]).toExponential(u).split("e")[0],d=u):(p[0]=p[0].split(".")[0]||0,a=20>d?(p[0]*Math.pow(10,p[1])).toFixed(d):0,p[1]=0)}var k=(Math.abs(p[1]?p[0]:a)+Math.pow(10,-Math.max(d,g)-1)).toFixed(d);g=String(f(k));u=3<g.length?g.length%3:0;b=h(b,e.decimalPoint);
l=h(l,e.thousandsSep);a=(0>a?"-":"")+(u?g.substr(0,u)+l:"");a+=g.substr(u).replace(/(\d{3})(?=\d)/g,"$1"+l);d&&(a+=b+k.slice(-d));p[1]&&0!==+a&&(a+="e"+p[1]);return a};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};c.getStyle=function(a,d,e){if("width"===d)return d=Math.min(a.offsetWidth,a.scrollWidth),e=a.getBoundingClientRect&&a.getBoundingClientRect().width,e<d&&e>=d-1&&(d=Math.floor(e)),Math.max(0,d-c.getStyle(a,"padding-left")-c.getStyle(a,"padding-right"));if("height"===d)return Math.max(0,
Math.min(a.offsetHeight,a.scrollHeight)-c.getStyle(a,"padding-top")-c.getStyle(a,"padding-bottom"));b.getComputedStyle||c.error(27,!0);if(a=b.getComputedStyle(a,void 0))a=a.getPropertyValue(d),h(e,"opacity"!==d)&&(a=f(a));return a};c.inArray=function(a,d,b){return d.indexOf(a,b)};c.find=Array.prototype.find?function(a,d){return a.find(d)}:function(a,d){var b,l=a.length;for(b=0;b<l;b++)if(d(a[b],b))return a[b]};c.keys=Object.keys;c.offset=function(a){var d=g.documentElement;a=a.parentElement||a.parentNode?
a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(b.pageYOffset||d.scrollTop)-(d.clientTop||0),left:a.left+(b.pageXOffset||d.scrollLeft)-(d.clientLeft||0)}};c.stop=function(a,b){for(var d=c.timers.length;d--;)c.timers[d].elem!==a||b&&b!==c.timers[d].prop||(c.timers[d].stopped=!0)};n({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(a,b){c[b]=function(b){return Array.prototype[a].apply(b,[].slice.call(arguments,1))}});c.addEvent=function(a,b,e,l){void 0===l&&(l=
{});var d=a.addEventListener||c.addEventListenerPolyfill;var g="function"===typeof a&&a.prototype?a.prototype.protoEvents=a.prototype.protoEvents||{}:a.hcEvents=a.hcEvents||{};c.Point&&a instanceof c.Point&&a.series&&a.series.chart&&(a.series.chart.runTrackerClick=!0);d&&d.call(a,b,e,!1);g[b]||(g[b]=[]);g[b].push({fn:e,order:"number"===typeof l.order?l.order:Infinity});g[b].sort(function(a,b){return a.order-b.order});return function(){c.removeEvent(a,b,e)}};c.removeEvent=function(a,b,e){function d(b,
d){var e=a.removeEventListener||c.removeEventListenerPolyfill;e&&e.call(a,b,d,!1)}function g(e){var l;if(a.nodeName){if(b){var k={};k[b]=!0}else k=e;n(k,function(a,b){if(e[b])for(l=e[b].length;l--;)d(b,e[b][l].fn)})}}var h;["protoEvents","hcEvents"].forEach(function(l,c){var k=(c=c?a:a.prototype)&&c[l];k&&(b?(h=k[b]||[],e?(k[b]=h.filter(function(a){return e!==a.fn}),d(b,e)):(g(k),k[b]=[])):(g(k),c[l]={}))})};c.fireEvent=function(a,b,e,l){var d;e=e||{};if(g.createEvent&&(a.dispatchEvent||a.fireEvent)){var c=
g.createEvent("Events");c.initEvent(b,!0,!0);y(c,e);a.dispatchEvent?a.dispatchEvent(c):a.fireEvent(b,c)}else e.target||y(e,{preventDefault:function(){e.defaultPrevented=!0},target:a,type:b}),function(b,l){void 0===b&&(b=[]);void 0===l&&(l=[]);var k=0,r=0,g=b.length+l.length;for(d=0;d<g;d++)!1===(b[k]?l[r]?b[k].order<=l[r].order?b[k++]:l[r++]:b[k++]:l[r++]).fn.call(a,e)&&e.preventDefault()}(a.protoEvents&&a.protoEvents[b],a.hcEvents&&a.hcEvents[b]);l&&!e.defaultPrevented&&l.call(a,e)};c.animate=function(a,
b,e){var d,g="",h,p;if(!z(e)){var u=arguments;e={duration:u[2],easing:u[3],complete:u[4]}}v(e.duration)||(e.duration=400);e.easing="function"===typeof e.easing?e.easing:Math[e.easing]||Math.easeInOutSine;e.curAnim=c.merge(b);n(b,function(k,l){c.stop(a,l);p=new c.Fx(a,e,l);h=null;"d"===l?(p.paths=p.initPath(a,a.d,b.d),p.toD=b.d,d=0,h=1):a.attr?d=a.attr(l):(d=parseFloat(c.getStyle(a,l))||0,"opacity"!==l&&(g="px"));h||(h=k);h&&h.match&&h.match("px")&&(h=h.replace(/px/g,""));p.run(d,h,g)})};c.seriesType=
function(a,b,e,l,g){var d=c.getOptions(),p=c.seriesTypes;d.plotOptions[a]=c.merge(d.plotOptions[b],e);p[a]=c.extendClass(p[b]||function(){},l);p[a].prototype.type=a;g&&(p[a].prototype.pointClass=c.extendClass(c.Point,g));return p[a]};c.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),b=0;return function(){return"highcharts-"+a+"-"+b++}}();c.isFunction=function(a){return"function"===typeof a};b.jQuery&&(b.jQuery.fn.highcharts=function(){var a=[].slice.call(arguments);if(this[0])return a[0]?
(new (c[F(a[0])?a.shift():"Chart"])(this[0],a[0],a[1]),this):q[H(this[0],"data-highcharts-chart")]});return{arrayMax:function(a){for(var b=a.length,e=a[0];b--;)a[b]>e&&(e=a[b]);return e},arrayMin:function(a){for(var b=a.length,e=a[0];b--;)a[b]<e&&(e=a[b]);return e},attr:H,defined:C,destroyObjectProperties:function(a,b){n(a,function(d,l){d&&d!==b&&d.destroy&&d.destroy();delete a[l]})},discardElement:function(a){var b=c.garbageBin;b||(b=c.createElement("div"));a&&b.appendChild(a);b.innerHTML=""},erase:function(a,
b){for(var d=a.length;d--;)if(a[d]===b){a.splice(d,1);break}},extend:y,isArray:G,isClass:t,isDOMElement:B,isNumber:v,isObject:z,isString:F,objectEach:n,pick:h,pInt:f,setAnimation:function(a,b){b.renderer.globalAnimation=h(a,b.options.chart.animation,!0)},splat:function(a){return G(a)?a:[a]},syncTimeout:function(a,b,e){if(0<b)return setTimeout(a,b,e);a.call(0,e);return-1}}});M(I,"parts/Color.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.isNumber,G=f.pInt,z=c.merge;c.Color=
function(f){if(!(this instanceof c.Color))return new c.Color(f);this.init(f)};c.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(c){return[G(c[1]),G(c[2]),G(c[3]),parseFloat(c[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(c){return[G(c[1]),G(c[2]),G(c[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(f){var t,v;if((this.input=f=this.names[f&&
f.toLowerCase?f.toLowerCase():""]||f)&&f.stops)this.stops=f.stops.map(function(f){return new c.Color(f[1])});else{if(f&&f.charAt&&"#"===f.charAt()){var C=f.length;f=parseInt(f.substr(1),16);7===C?t=[(f&16711680)>>16,(f&65280)>>8,f&255,1]:4===C&&(t=[(f&3840)>>4|(f&3840)>>8,(f&240)>>4|f&240,(f&15)<<4|f&15,1])}if(!t)for(v=this.parsers.length;v--&&!t;){var B=this.parsers[v];(C=B.regex.exec(f))&&(t=B.parse(C))}}this.rgba=t||[]},get:function(c){var f=this.input,v=this.rgba;if(this.stops){var C=z(f);C.stops=
[].concat(C.stops);this.stops.forEach(function(f,v){C.stops[v]=[C.stops[v][0],f.get(c)]})}else C=v&&F(v[0])?"rgb"===c||!c&&1===v[3]?"rgb("+v[0]+","+v[1]+","+v[2]+")":"a"===c?v[3]:"rgba("+v.join(",")+")":f;return C},brighten:function(c){var f,v=this.rgba;if(this.stops)this.stops.forEach(function(f){f.brighten(c)});else if(F(c)&&0!==c)for(f=0;3>f;f++)v[f]+=G(255*c),0>v[f]&&(v[f]=0),255<v[f]&&(v[f]=255);return this},setOpacity:function(c){this.rgba[3]=c;return this},tweenTo:function(c,f){var v=this.rgba,
t=c.rgba;t.length&&v&&v.length?(c=1!==t[3]||1!==v[3],f=(c?"rgba(":"rgb(")+Math.round(t[0]+(v[0]-t[0])*(1-f))+","+Math.round(t[1]+(v[1]-t[1])*(1-f))+","+Math.round(t[2]+(v[2]-t[2])*(1-f))+(c?","+(t[3]+(v[3]-t[3])*(1-f)):"")+")"):f=c.input||"none";return f}};c.color=function(f){return new c.Color(f)}});M(I,"parts/SvgRenderer.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.attr,G=f.defined,z=f.destroyObjectProperties,B=f.erase,t=f.extend,v=f.isArray,C=f.isNumber,H=f.isObject,
y=f.isString,h=f.objectEach,n=f.pick,q=f.pInt,g=f.splat,b=c.addEvent,a=c.animate,d=c.charts,e=c.color,l=c.css,L=c.createElement,E=c.deg2rad,p=c.doc,u=c.hasTouch,k=c.isFirefox,r=c.isMS,x=c.isWebKit,A=c.merge,w=c.noop,m=c.removeEvent,K=c.stop,J=c.svg,U=c.SVG_NS,S=c.symbolSizes,Q=c.win;var O=c.SVGElement=function(){return this};t(O.prototype,{opacity:1,SVG_NS:U,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
init:function(a,b){this.element="span"===b?L(b):p.createElementNS(this.SVG_NS,b);this.renderer=a;c.fireEvent(this,"afterInit")},animate:function(b,d,m){var D=c.animObject(n(d,this.renderer.globalAnimation,!0));n(p.hidden,p.msHidden,p.webkitHidden,!1)&&(D.duration=0);0!==D.duration?(m&&(D.complete=m),a(this,b,D)):(this.attr(b,void 0,m),h(b,function(a,b){D.step&&D.step.call(this,a,{prop:b,pos:1})},this));return this},complexColor:function(a,b,d){var D=this.renderer,m,e,w,N,k,l,g,r,x,p,K,J=[],T;c.fireEvent(this.renderer,
"complexColor",{args:arguments},function(){a.radialGradient?e="radialGradient":a.linearGradient&&(e="linearGradient");e&&(w=a[e],k=D.gradients,g=a.stops,p=d.radialReference,v(w)&&(a[e]=w={x1:w[0],y1:w[1],x2:w[2],y2:w[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===e&&p&&!G(w.gradientUnits)&&(N=w,w=A(w,D.getRadialAttr(p,N),{gradientUnits:"userSpaceOnUse"})),h(w,function(a,b){"id"!==b&&J.push(b,a)}),h(g,function(a){J.push(a)}),J=J.join(","),k[J]?K=k[J].attr("id"):(w.id=K=c.uniqueKey(),k[J]=l=
D.createElement(e).attr(w).add(D.defs),l.radAttr=N,l.stops=[],g.forEach(function(a){0===a[1].indexOf("rgba")?(m=c.color(a[1]),r=m.get("rgb"),x=m.get("a")):(r=a[1],x=1);a=D.createElement("stop").attr({offset:a[0],"stop-color":r,"stop-opacity":x}).add(l);l.stops.push(a)})),T="url("+D.url+"#"+K+")",d.setAttribute(b,T),d.gradient=J,a.toString=function(){return T})})},applyTextOutline:function(a){var b=this.element,D;-1!==a.indexOf("contrast")&&(a=a.replace(/contrast/g,this.renderer.getContrast(b.style.fill)));
a=a.split(" ");var d=a[a.length-1];if((D=a[0])&&"none"!==D&&c.svg){this.fakeTS=!0;a=[].slice.call(b.getElementsByTagName("tspan"));this.ySetter=this.xSetter;D=D.replace(/(^[\d\.]+)(.*?)$/g,function(a,b,D){return 2*b+D});this.removeTextOutline(a);var m=b.firstChild;a.forEach(function(a,e){0===e&&(a.setAttribute("x",b.getAttribute("x")),e=b.getAttribute("y"),a.setAttribute("y",e||0),null===e&&b.setAttribute("y",0));a=a.cloneNode(1);F(a,{"class":"highcharts-text-outline",fill:d,stroke:d,"stroke-width":D,
"stroke-linejoin":"round"});b.insertBefore(a,m)})}},removeTextOutline:function(a){for(var b=a.length,D;b--;)D=a[b],"highcharts-text-outline"===D.getAttribute("class")&&B(a,this.element.removeChild(D))},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(a,b,d,e){var D=this.element,m,w=this,N,k,l=this.symbolCustomAttribs;if("string"===typeof a&&void 0!==b){var g=a;a={};a[g]=b}"string"===typeof a?w=(this[a+"Getter"]||this._defaultGetter).call(this,
a,D):(h(a,function(b,d){N=!1;e||K(this,d);this.symbolName&&-1!==c.inArray(d,l)&&(m||(this.symbolAttr(a),m=!0),N=!0);!this.rotation||"x"!==d&&"y"!==d||(this.doTransform=!0);N||(k=this[d+"Setter"]||this._defaultSetter,k.call(this,b,d,D),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(d)&&this.updateShadows(d,b,k))},this),this.afterSetters());d&&d.call(this);return w},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,
b,d){for(var D=this.shadows,e=D.length;e--;)d.call(D[e],"height"===a?Math.max(b-(D[e].cutHeight||0),0):"d"===a?this.d:b,a,D[e])},addClass:function(a,b){var D=b?"":this.attr("class")||"";a=(a||"").split(/ /g).reduce(function(a,b){-1===D.indexOf(b)&&a.push(b);return a},D?[D]:[]).join(" ");a!==D&&this.attr("class",a);return this},hasClass:function(a){return-1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(y(a)?new RegExp(" ?"+
a+" ?"):a,""))},symbolAttr:function(a){var b=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(D){b[D]=n(a[D],b[D])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,b){b=b||a.strokeWidth||0;var D=Math.round(b)%2/2;a.x=Math.floor(a.x||this.x||0)+D;a.y=Math.floor(a.y||this.y||0)+D;a.width=Math.floor((a.width||this.width||
0)-2*D);a.height=Math.floor((a.height||this.height||0)-2*D);G(a.strokeWidth)&&(a.strokeWidth=b);return a},css:function(a){var b=this.styles,D={},d=this.element,e="",m=!b,w=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);b&&h(a,function(a,d){a!==b[d]&&(D[d]=a,m=!0)});if(m){b&&(a=t(b,D));if(a)if(null===a.width||"auto"===a.width)delete this.textWidth;else if("text"===d.nodeName.toLowerCase()&&a.width)var k=this.textWidth=q(a.width);this.styles=a;k&&!J&&this.renderer.forExport&&delete a.width;
if(d.namespaceURI===this.SVG_NS){var g=function(a,b){return"-"+b.toLowerCase()};h(a,function(a,b){-1===w.indexOf(b)&&(e+=b.replace(/([A-Z])/g,g)+":"+a+";")});e&&F(d,"style",e)}else l(d,a);this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline))}return this},getStyle:function(a){return Q.getComputedStyle(this.element||this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||
0;var a=this.getStyle("stroke-width");if(a.indexOf("px")===a.length-2)a=q(a);else{var b=p.createElementNS(U,"rect");F(b,{width:a,"stroke-width":0});this.element.parentNode.appendChild(b);a=b.getBBox().width;b.parentNode.removeChild(b)}return a},on:function(a,b){var d=this,D=d.element;u&&"click"===a?(D.ontouchstart=function(a){d.touchEventFired=Date.now();a.preventDefault();b.call(D,a)},D.onclick=function(a){(-1===Q.navigator.userAgent.indexOf("Android")||1100<Date.now()-(d.touchEventFired||0))&&b.call(D,
a)}):D["on"+a]=b;return this},setRadialReference:function(a){var b=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;b&&b.radAttr&&b.animate(this.renderer.getRadialAttr(a,b.radAttr));return this},translate:function(a,b){return this.attr({translateX:a,translateY:b})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,d=this.scaleX,e=this.scaleY,m=this.inverted,w=this.rotation,k=
this.matrix,l=this.element;m&&(a+=this.width,b+=this.height);a=["translate("+a+","+b+")"];G(k)&&a.push("matrix("+k.join(",")+")");m?a.push("rotate(90) scale(-1,1)"):w&&a.push("rotate("+w+" "+n(this.rotationOriginX,l.getAttribute("x"),0)+" "+n(this.rotationOriginY,l.getAttribute("y")||0)+")");(G(d)||G(e))&&a.push("scale("+n(d,1)+" "+n(e,1)+")");a.length&&l.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,d){var e,
m={};var D=this.renderer;var w=D.alignedObjects;var k,l;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!d||y(d))this.alignTo=e=d||"renderer",B(w,this),w.push(this),d=null}else a=this.alignOptions,b=this.alignByTranslate,e=this.alignTo;d=n(d,D[e],D);e=a.align;D=a.verticalAlign;w=(d.x||0)+(a.x||0);var N=(d.y||0)+(a.y||0);"right"===e?k=1:"center"===e&&(k=2);k&&(w+=(d.width-(a.width||0))/k);m[b?"translateX":"x"]=Math.round(w);"bottom"===D?l=1:"middle"===D&&(l=2);l&&(N+=(d.height-(a.height||0))/
l);m[b?"translateY":"y"]=Math.round(N);this[this.placed?"animate":"attr"](m);this.placed=!0;this.alignAttr=m;return this},getBBox:function(a,b){var d,e=this.renderer,m=this.element,D=this.styles,w=this.textStr,k,l=e.cache,N=e.cacheKeys,g=m.namespaceURI===this.SVG_NS;b=n(b,this.rotation,0);var r=e.styledMode?m&&O.prototype.getStyle.call(m,"font-size"):D&&D.fontSize;if(G(w)){var c=w.toString();-1===c.indexOf("<")&&(c=c.replace(/[0-9]/g,"0"));c+=["",b,r,this.textWidth,D&&D.textOverflow].join()}c&&!a&&
(d=l[c]);if(!d){if(g||e.forExport){try{(k=this.fakeTS&&function(a){[].forEach.call(m.querySelectorAll(".highcharts-text-outline"),function(b){b.style.display=a})})&&k("none"),d=m.getBBox?t({},m.getBBox()):{width:m.offsetWidth,height:m.offsetHeight},k&&k("")}catch(aa){""}if(!d||0>d.width)d={width:0,height:0}}else d=this.htmlGetBBox();e.isSVG&&(a=d.width,e=d.height,g&&(d.height=e={"11px,17":14,"13px,20":16}[D&&D.fontSize+","+Math.round(e)]||e),b&&(D=b*E,d.width=Math.abs(e*Math.sin(D))+Math.abs(a*Math.cos(D)),
d.height=Math.abs(e*Math.cos(D))+Math.abs(a*Math.sin(D))));if(c&&0<d.height){for(;250<N.length;)delete l[N.shift()];l[c]||N.push(c);l[c]=d}}return d},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(a){a?this.attr({y:-9999}):this.attr({visibility:"hidden"});return this},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||150,complete:function(){b.attr({y:-9999})}})},add:function(a){var b=this.renderer,d=this.element;a&&(this.parentGroup=a);this.parentInverted=
a&&a.inverted;void 0!==this.textStr&&b.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)var e=this.zIndexSetter();e||(a?a.element:b.box).appendChild(d);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var b=a.parentNode;b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},d=a.renderer,e=d.isSVG&&"SPAN"===b.nodeName&&a.parentGroup,m=b.ownerSVGElement,w=a.clipPath;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;K(a);w&&m&&([].forEach.call(m.querySelectorAll("[clip-path],[CLIP-PATH]"),
function(a){-1<a.getAttribute("clip-path").indexOf(w.element.id)&&a.removeAttribute("clip-path")}),a.clipPath=w.destroy());if(a.stops){for(m=0;m<a.stops.length;m++)a.stops[m]=a.stops[m].destroy();a.stops=null}a.safeRemoveChild(b);for(d.styledMode||a.destroyShadows();e&&e.div&&0===e.div.childNodes.length;)b=e.parentGroup,a.safeRemoveChild(e.div),delete e.div,e=b;a.alignTo&&B(d.alignedObjects,a);h(a,function(b,d){a[d]&&a[d].parentGroup===a&&a[d].destroy&&a[d].destroy();delete a[d]})},shadow:function(a,
b,d){var e=[],m,w=this.element;if(!a)this.destroyShadows();else if(!this.shadows){var D=n(a.width,3);var k=(a.opacity||.15)/D;var l=this.parentInverted?"(-1,-1)":"("+n(a.offsetX,1)+", "+n(a.offsetY,1)+")";for(m=1;m<=D;m++){var g=w.cloneNode(0);var r=2*D+1-2*m;F(g,{stroke:a.color||"#000000","stroke-opacity":k*m,"stroke-width":r,transform:"translate"+l,fill:"none"});g.setAttribute("class",(g.getAttribute("class")||"")+" highcharts-shadow");d&&(F(g,"height",Math.max(F(g,"height")-r,0)),g.cutHeight=r);
b?b.element.appendChild(g):w.parentNode&&w.parentNode.insertBefore(g,w);e.push(g)}this.shadows=e}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=n(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},
dSetter:function(a,b,d){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[b]!==a&&(d.setAttribute(b,a),this[b]=a)},dashstyleSetter:function(a){var b,d=this["stroke-width"];"inherit"===d&&(d=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(b=a.length;b--;)a[b]=q(a[b])*
d;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){var b={left:"start",center:"middle",right:"end"};b[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",b[a]))},opacitySetter:function(a,b,d){this[b]=a;d.setAttribute(b,a)},titleSetter:function(a){var b=this.element.getElementsByTagName("title")[0];b||(b=p.createElementNS(this.SVG_NS,"title"),this.element.appendChild(b));b.firstChild&&b.removeChild(b.firstChild);b.appendChild(p.createTextNode(String(n(a,
"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"<").replace(/&gt;/g,">")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,delete this.textPxLength,this.textStr=a,this.added&&this.renderer.buildText(this))},setTextPath:function(a,b){var d=this.element,e={textAnchor:"text-anchor"},m=!1,D=this.textPathWrapper,k=!D;b=A(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},b);var l=b.attributes;if(a&&b&&b.enabled){this.options&&this.options.padding&&(l.dx=-this.options.padding);
D||(this.textPathWrapper=D=this.renderer.createElement("textPath"),m=!0);var g=D.element;(b=a.element.getAttribute("id"))||a.element.setAttribute("id",b=c.uniqueKey());if(k)for(a=d.getElementsByTagName("tspan");a.length;)a[0].setAttribute("y",0),g.appendChild(a[0]);m&&D.add({element:this.text?this.text.element:d});g.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+b);G(l.dy)&&(g.parentNode.setAttribute("dy",l.dy),delete l.dy);G(l.dx)&&(g.parentNode.setAttribute("dx",l.dx),
delete l.dx);h(l,function(a,b){g.setAttribute(e[b]||b,a)});d.removeAttribute("transform");this.removeTextOutline.call(D,[].slice.call(d.getElementsByTagName("tspan")));this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=this.updateTransform=w}else D&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(d,a));return this},destroyTextPath:function(a,b){var d;b.element.setAttribute("id","");for(d=this.textPathWrapper.element.childNodes;d.length;)a.firstChild.appendChild(d[0]);
a.firstChild.removeChild(this.textPathWrapper.element);delete b.textPathWrapper},fillSetter:function(a,b,d){"string"===typeof a?d.setAttribute(b,a):a&&this.complexColor(a,b,d)},visibilitySetter:function(a,b,d){"inherit"===a?d.removeAttribute(b):this[b]!==a&&d.setAttribute(b,a);this[b]=a},zIndexSetter:function(a,b){var d=this.renderer,e=this.parentGroup,m=(e||d).element||d.box,w=this.element,k=!1;d=m===d.box;var D=this.added;var l;G(a)?(w.setAttribute("data-z-index",a),a=+a,this[b]===a&&(D=!1)):G(this[b])&&
w.removeAttribute("data-z-index");this[b]=a;if(D){(a=this.zIndex)&&e&&(e.handleZ=!0);b=m.childNodes;for(l=b.length-1;0<=l&&!k;l--){e=b[l];D=e.getAttribute("data-z-index");var g=!G(D);if(e!==w)if(0>a&&g&&!d&&!l)m.insertBefore(w,b[l]),k=!0;else if(q(D)<=a||g&&(!G(a)||0<=a))m.insertBefore(w,b[l+1]||null),k=!0}k||(m.insertBefore(w,b[d?3:0]||null),k=!0)}return k},_defaultSetter:function(a,b,d){d.setAttribute(b,a)}});O.prototype.yGetter=O.prototype.xGetter;O.prototype.translateXSetter=O.prototype.translateYSetter=
O.prototype.rotationSetter=O.prototype.verticalAlignSetter=O.prototype.rotationOriginXSetter=O.prototype.rotationOriginYSetter=O.prototype.scaleXSetter=O.prototype.scaleYSetter=O.prototype.matrixSetter=function(a,b){this[b]=a;this.doTransform=!0};O.prototype["stroke-widthSetter"]=O.prototype.strokeSetter=function(a,b,d){this[b]=a;this.stroke&&this["stroke-width"]?(O.prototype.fillSetter.call(this,this.stroke,"stroke",d),d.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===
b&&0===a&&this.hasStroke?(d.removeAttribute("stroke"),this.hasStroke=!1):this.renderer.styledMode&&this["stroke-width"]&&(d.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0)};f=c.SVGRenderer=function(){this.init.apply(this,arguments)};t(f.prototype,{Element:O,SVG_NS:U,init:function(a,d,e,m,w,g,r){var D=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});r||D.css(this.getStyle(m));m=D.element;a.appendChild(m);F(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&
F(m,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=m;this.boxWrapper=D;this.alignedObjects=[];this.url=(k||x)&&p.getElementsByTagName("base").length?Q.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(p.createTextNode("Created with Highcharts 7.2.1"));this.defs=this.createElement("defs").add();this.allowHTML=g;this.forExport=w;this.styledMode=r;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=
0;this.setSize(d,e,!1);var c;k&&a.getBoundingClientRect&&(d=function(){l(a,{left:0,top:0});c=a.getBoundingClientRect();l(a,{left:Math.ceil(c.left)-c.left+"px",top:Math.ceil(c.top)-c.top+"px"})},d(),this.unSubPixelFix=b(Q,"resize",d))},definition:function(a){function b(a,e){var m;g(a).forEach(function(a){var w=d.createElement(a.tagName),k={};h(a,function(a,b){"tagName"!==b&&"children"!==b&&"textContent"!==b&&(k[b]=a)});w.attr(k);w.add(e||d.defs);a.textContent&&w.element.appendChild(p.createTextNode(a.textContent));
b(a.children||[],w);m=w});return m}var d=this;return b(a)},getStyle:function(a){return this.style=t({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();z(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&
this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:w,getRadialAttr:function(a,b){return{cx:a[0]-a[2]/2+b.cx*a[2],cy:a[1]-a[2]/2+b.cy*a[2],r:b.r*a[2]}},truncate:function(a,b,d,e,m,w,k){var l=this,D=a.rotation,g,r=e?1:0,c=(d||e).length,x=c,J=[],K=function(a){b.firstChild&&b.removeChild(b.firstChild);a&&b.appendChild(p.createTextNode(a))},N=function(w,D){D=D||w;if(void 0===J[D])if(b.getSubStringLength)try{J[D]=m+b.getSubStringLength(0,
e?D+1:D)}catch(ba){""}else l.getSpanWidth&&(K(k(d||e,w)),J[D]=m+l.getSpanWidth(a,b));return J[D]},A;a.rotation=0;var h=N(b.textContent.length);if(A=m+h>w){for(;r<=c;)x=Math.ceil((r+c)/2),e&&(g=k(e,x)),h=N(x,g&&g.length-1),r===c?r=c+1:h>w?c=x-1:r=x;0===c?K(""):d&&c===d.length-1||K(g||k(d||e,x))}e&&e.splice(0,x);a.actualWidth=h;a.rotation=D;return A},escapes:{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},buildText:function(a){var b=a.element,d=this,e=d.forExport,m=n(a.textStr,"").toString(),
w=-1!==m.indexOf("<"),k=b.childNodes,D,g=F(b,"x"),r=a.styles,c=a.textWidth,x=r&&r.lineHeight,K=r&&r.textOutline,A=r&&"ellipsis"===r.textOverflow,u=r&&"nowrap"===r.whiteSpace,L=r&&r.fontSize,E,f=k.length;r=c&&!a.added&&this.box;var S=function(a){var m;d.styledMode||(m=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:L||d.style.fontSize||12);return x?q(x):d.fontMetrics(m,a.getAttribute("style")?a:b).h},v=function(a,b){h(d.escapes,function(d,m){b&&-1!==b.indexOf(d)||(a=a.toString().replace(new RegExp(d,
"g"),m))});return a},O=function(a,b){var d=a.indexOf("<");a=a.substring(d,a.indexOf(">")-d);d=a.indexOf(b+"=");if(-1!==d&&(d=d+b.length+1,b=a.charAt(d),'"'===b||"'"===b))return a=a.substring(d+1),a.substring(0,a.indexOf(b))},Q=/<br.*?>/g;var t=[m,A,u,x,K,L,c].join();if(t!==a.textCache){for(a.textCache=t;f--;)b.removeChild(k[f]);w||K||A||c||-1!==m.indexOf(" ")&&(!u||Q.test(m))?(r&&r.appendChild(b),w?(m=d.styledMode?m.replace(/<(b|strong)>/g,'<span class="highcharts-strong">').replace(/<(i|em)>/g,'<span class="highcharts-emphasized">'):
m.replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">'),m=m.replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(Q)):m=[m],m=m.filter(function(a){return""!==a}),m.forEach(function(m,w){var k=0,r=0;m=m.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");var x=m.split("|||");x.forEach(function(m){if(""!==m||1===x.length){var K={},N=p.createElementNS(d.SVG_NS,"tspan"),h,n;(h=O(m,"class"))&&
F(N,"class",h);if(h=O(m,"style"))h=h.replace(/(;| |^)color([ :])/,"$1fill$2"),F(N,"style",h);(n=O(m,"href"))&&!e&&(F(N,"onclick",'location.href="'+n+'"'),F(N,"class","highcharts-anchor"),d.styledMode||l(N,{cursor:"pointer"}));m=v(m.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==m){N.appendChild(p.createTextNode(m));k?K.dx=0:w&&null!==g&&(K.x=g);F(N,K);b.appendChild(N);!k&&E&&(!J&&e&&l(N,{display:"block"}),F(N,"dy",S(N)));if(c){var T=m.replace(/([^\^])-/g,"$1- ").split(" ");K=!u&&(1<x.length||
w||1<T.length);n=0;var f=S(N);if(A)D=d.truncate(a,N,m,void 0,0,Math.max(0,c-parseInt(L||12,10)),function(a,b){return a.substring(0,b)+"\u2026"});else if(K)for(;T.length;)T.length&&!u&&0<n&&(N=p.createElementNS(U,"tspan"),F(N,{dy:f,x:g}),h&&F(N,"style",h),N.appendChild(p.createTextNode(T.join(" ").replace(/- /g,"-"))),b.appendChild(N)),d.truncate(a,N,null,T,0===n?r:0,c,function(a,b){return T.slice(0,b).join(" ").replace(/- /g,"-")}),r=a.actualWidth,n++}k++}}});E=E||b.childNodes.length}),A&&D&&a.attr("title",
v(a.textStr,["&lt;","&gt;"])),r&&r.removeChild(b),K&&a.applyTextOutline&&a.applyTextOutline(K)):b.appendChild(p.createTextNode(v(m)))}},getContrast:function(a){a=e(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,d,m,e,w,k,l,g,c,x){var D=this.label(a,d,m,c,null,null,x,null,"button"),p=0,K=this.styledMode;D.attr(A({padding:8,r:2},w));if(!K){w=A({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},
w);var J=w.style;delete w.style;k=A(w,{fill:"#e6e6e6"},k);var N=k.style;delete k.style;l=A(w,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},l);var h=l.style;delete l.style;g=A(w,{style:{color:"#cccccc"}},g);var u=g.style;delete g.style}b(D.element,r?"mouseover":"mouseenter",function(){3!==p&&D.setState(1)});b(D.element,r?"mouseout":"mouseleave",function(){3!==p&&D.setState(p)});D.setState=function(a){1!==a&&(D.state=p=a);D.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);K||D.attr([w,k,l,g][a||0]).css([J,N,h,u][a||0])};K||D.attr(w).css(t({cursor:"default"},J));return D.on("click",function(a){3!==p&&e.call(D,a)})},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+b%2/2);return a},path:function(a){var b=this.styledMode?{}:{fill:"none"};v(a)?b.d=a:H(a)&&t(b,a);return this.createElement("path").attr(b)},circle:function(a,b,d){a=H(a)?a:void 0===a?{}:{x:a,y:b,r:d};
b=this.createElement("circle");b.xSetter=b.ySetter=function(a,b,d){d.setAttribute("c"+b,a)};return b.attr(a)},arc:function(a,b,d,m,e,w){H(a)?(m=a,b=m.y,d=m.r,a=m.x):m={innerR:m,start:e,end:w};a=this.symbol("arc",a,b,d,d,m);a.r=d;return a},rect:function(a,b,d,m,e,w){e=H(a)?a.r:e;var k=this.createElement("rect");a=H(a)?a:void 0===a?{}:{x:a,y:b,width:Math.max(d,0),height:Math.max(m,0)};this.styledMode||(void 0!==w&&(a.strokeWidth=w,a=k.crisp(a)),a.fill="none");e&&(a.r=e);k.rSetter=function(a,b,d){k.r=
a;F(d,{rx:a,ry:a})};k.rGetter=function(){return k.r};return k.attr(a)},setSize:function(a,b,d){var m=this.alignedObjects,e=m.length;this.width=a;this.height=b;for(this.boxWrapper.animate({width:a,height:b},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:n(d,!0)?void 0:0});e--;)m[e].align()},g:function(a){var b=this.createElement("g");return a?b.attr({"class":"highcharts-"+a}):b},image:function(a,d,m,e,w,k){var l={preserveAspectRatio:"none"},g=function(a,
b){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink","href",b):a.setAttribute("hc-svg-href",b)},r=function(b){g(c.element,a);k.call(c,b)};1<arguments.length&&t(l,{x:d,y:m,width:e,height:w});var c=this.createElement("image").attr(l);k?(g(c.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),l=new Q.Image,b(l,"load",r),l.src=a,l.complete&&r({})):g(c.element,a);return c},symbol:function(a,b,m,e,w,k){var g=this,r=/^url\((.*?)\)$/,c=r.test(a),D=!c&&(this.symbols[a]?
a:"circle"),x=D&&this.symbols[D],K=G(b)&&x&&x.call(this.symbols,Math.round(b),Math.round(m),e,w,k);if(x){var J=this.path(K);g.styledMode||J.attr("fill","none");t(J,{symbolName:D,x:b,y:m,width:e,height:w});k&&t(J,k)}else if(c){var A=a.match(r)[1];J=this.image(A);J.imgwidth=n(S[A]&&S[A].width,k&&k.width);J.imgheight=n(S[A]&&S[A].height,k&&k.height);var h=function(){J.attr({width:J.width,height:J.height})};["width","height"].forEach(function(a){J[a+"Setter"]=function(a,b){var d={},m=this["img"+b],e=
"width"===b?"translateX":"translateY";this[b]=a;G(m)&&(k&&"within"===k.backgroundSize&&this.width&&this.height&&(m=Math.round(m*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(b,m),this.alignByTranslate||(d[e]=((this[b]||0)-m)/2,this.attr(d)))}});G(b)&&J.attr({x:b,y:m});J.isImg=!0;G(J.imgwidth)&&G(J.imgheight)?h():(J.attr({width:0,height:0}),L("img",{onload:function(){var a=d[g.chartIndex];0===this.width&&(l(this,{position:"absolute",top:"-999em"}),
p.body.appendChild(this));S[A]={width:this.width,height:this.height};J.imgwidth=this.width;J.imgheight=this.height;J.element&&h();this.parentNode&&this.parentNode.removeChild(this);g.imgCount--;if(!g.imgCount&&a&&a.onload)a.onload()},src:A}),this.imgCount++)}return J},symbols:{circle:function(a,b,d,m){return this.arc(a+d/2,b+m/2,d/2,m/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,b,d,m){return["M",a,b,"L",a+d,b,a+d,b+m,a,b+m,"Z"]},triangle:function(a,b,d,m){return["M",a+d/2,b,"L",
a+d,b+m,a,b+m,"Z"]},"triangle-down":function(a,b,d,m){return["M",a,b,"L",a+d,b,a+d/2,b+m,"Z"]},diamond:function(a,b,d,m){return["M",a+d/2,b,"L",a+d,b+m/2,a+d/2,b+m,a,b+m/2,"Z"]},arc:function(a,b,d,m,e){var w=e.start,k=e.r||d,l=e.r||m||d,g=e.end-.001;d=e.innerR;m=n(e.open,.001>Math.abs(e.end-e.start-2*Math.PI));var r=Math.cos(w),c=Math.sin(w),x=Math.cos(g);g=Math.sin(g);w=.001>e.end-w-Math.PI?0:1;e=["M",a+k*r,b+l*c,"A",k,l,0,w,n(e.clockwise,1),a+k*x,b+l*g];G(d)&&e.push(m?"M":"L",a+d*x,b+d*g,"A",d,
d,0,w,0,a+d*r,b+d*c);e.push(m?"":"Z");return e},callout:function(a,b,d,m,e){var w=Math.min(e&&e.r||0,d,m),k=w+6,l=e&&e.anchorX;e=e&&e.anchorY;var g=["M",a+w,b,"L",a+d-w,b,"C",a+d,b,a+d,b,a+d,b+w,"L",a+d,b+m-w,"C",a+d,b+m,a+d,b+m,a+d-w,b+m,"L",a+w,b+m,"C",a,b+m,a,b+m,a,b+m-w,"L",a,b+w,"C",a,b,a,b,a+w,b];l&&l>d?e>b+k&&e<b+m-k?g.splice(13,3,"L",a+d,e-6,a+d+6,e,a+d,e+6,a+d,b+m-w):g.splice(13,3,"L",a+d,m/2,l,e,a+d,m/2,a+d,b+m-w):l&&0>l?e>b+k&&e<b+m-k?g.splice(33,3,"L",a,e+6,a-6,e,a,e-6,a,b+w):g.splice(33,
3,"L",a,m/2,l,e,a,m/2,a,b+w):e&&e>m&&l>a+k&&l<a+d-k?g.splice(23,3,"L",l+6,b+m,l,b+m+6,l-6,b+m,a+w,b+m):e&&0>e&&l>a+k&&l<a+d-k&&g.splice(3,3,"L",l-6,b,l,b-6,l+6,b,d-w,b);return g}},clipRect:function(a,b,d,m){var e=c.uniqueKey()+"-",w=this.createElement("clipPath").attr({id:e}).add(this.defs);a=this.rect(a,b,d,m,0).add(w);a.id=e;a.clipPath=w;a.count=0;return a},text:function(a,b,d,m){var e={};if(m&&(this.allowHTML||!this.forExport))return this.html(a,b,d);e.x=Math.round(b||0);d&&(e.y=Math.round(d));
G(a)&&(e.text=a);a=this.createElement("text").attr(e);m||(a.xSetter=function(a,b,d){var m=d.getElementsByTagName("tspan"),e=d.getAttribute(b),w;for(w=0;w<m.length;w++){var k=m[w];k.getAttribute(b)===e&&k.setAttribute(b,a)}d.setAttribute(b,a)});return a},fontMetrics:function(a,b){a=!this.styledMode&&/px/.test(a)||!Q.getComputedStyle?a||b&&b.style&&b.style.fontSize||this.style&&this.style.fontSize:b&&O.prototype.getStyle.call(b,"font-size");a=/px/.test(a)?q(a):12;b=24>a?a+3:Math.round(1.2*a);return{h:b,
b:Math.round(.8*b),f:a}},rotCorr:function(a,b,d){var m=a;b&&d&&(m=Math.max(m*Math.cos(b*E),4));return{x:-a/3*Math.sin(b*E),y:m}},label:function(a,b,d,e,w,k,l,g,r){var c=this,x=c.styledMode,J=c.g("button"!==r&&"label"),p=J.text=c.text("",0,0,l).attr({zIndex:1}),K,h,D=0,u=3,L=0,n,N,E,U,f,q={},T,S,v=/^url\((.*?)\)$/.test(e),Q=x||v,y=function(){return x?K.strokeWidth()%2/2:(T?parseInt(T,10):0)%2/2};r&&J.addClass("highcharts-"+r);var R=function(){var a=p.element.style,b={};h=(void 0===n||void 0===N||f)&&
G(p.textStr)&&p.getBBox();J.width=(n||h.width||0)+2*u+L;J.height=(N||h.height||0)+2*u;S=u+Math.min(c.fontMetrics(a&&a.fontSize,p).b,h?h.height:Infinity);Q&&(K||(J.box=K=c.symbols[e]||v?c.symbol(e):c.rect(),K.addClass(("button"===r?"":"highcharts-label-box")+(r?" highcharts-"+r+"-box":"")),K.add(J),a=y(),b.x=a,b.y=(g?-S:0)+a),b.width=Math.round(J.width),b.height=Math.round(J.height),K.attr(t(b,q)),q={})};var B=function(){var a=L+u;var b=g?0:S;G(n)&&h&&("center"===f||"right"===f)&&(a+={center:.5,right:1}[f]*
(n-h.width));if(a!==p.x||b!==p.y)p.attr("x",a),p.hasBoxWidthChanged&&(h=p.getBBox(!0),R()),void 0!==b&&p.attr("y",b);p.x=a;p.y=b};var V=function(a,b){K?K.attr(a,b):q[a]=b};J.onAdd=function(){p.add(J);J.attr({text:a||0===a?a:"",x:b,y:d});K&&G(w)&&J.attr({anchorX:w,anchorY:k})};J.widthSetter=function(a){n=C(a)?a:null};J.heightSetter=function(a){N=a};J["text-alignSetter"]=function(a){f=a};J.paddingSetter=function(a){G(a)&&a!==u&&(u=J.padding=a,B())};J.paddingLeftSetter=function(a){G(a)&&a!==L&&(L=a,
B())};J.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==D&&(D=a,h&&J.attr({x:E}))};J.textSetter=function(a){void 0!==a&&p.attr({text:a});R();B()};J["stroke-widthSetter"]=function(a,b){a&&(Q=!0);T=this["stroke-width"]=a;V(b,a)};x?J.rSetter=function(a,b){V(b,a)}:J.strokeSetter=J.fillSetter=J.rSetter=function(a,b){"r"!==b&&("fill"===b&&a&&(Q=!0),J[b]=a);V(b,a)};J.anchorXSetter=function(a,b){w=J.anchorX=a;V(b,Math.round(a)-y()-E)};J.anchorYSetter=function(a,b){k=J.anchorY=a;V(b,a-U)};J.xSetter=
function(a){J.x=a;D&&(a-=D*((n||h.width)+2*u),J["forceAnimate:x"]=!0);E=Math.round(a);J.attr("translateX",E)};J.ySetter=function(a){U=J.y=Math.round(a);J.attr("translateY",U)};var H=J.css;l={css:function(a){if(a){var b={};a=A(a);J.textProps.forEach(function(d){void 0!==a[d]&&(b[d]=a[d],delete a[d])});p.css(b);"width"in b&&R();"fontSize"in b&&(R(),B())}return H.call(J,a)},getBBox:function(){return{width:h.width+2*u,height:h.height+2*u,x:h.x-u,y:h.y-u}},destroy:function(){m(J.element,"mouseenter");
m(J.element,"mouseleave");p&&(p=p.destroy());K&&(K=K.destroy());O.prototype.destroy.call(J);J=c=R=B=V=null}};x||(l.shadow=function(a){a&&(R(),K&&K.shadow(a));return J});return t(J,l)}});c.Renderer=f});M(I,"parts/Html.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.attr,G=f.defined,z=f.extend,B=f.pick,t=f.pInt,v=c.createElement,C=c.css,H=c.isFirefox,y=c.isMS,h=c.isWebKit,n=c.SVGElement;f=c.SVGRenderer;var q=c.win;z(n.prototype,{htmlCss:function(g){var b="SPAN"===this.element.tagName&&
g&&"width"in g,a=B(b&&g.width,void 0);if(b){delete g.width;this.textWidth=a;var d=!0}g&&"ellipsis"===g.textOverflow&&(g.whiteSpace="nowrap",g.overflow="hidden");this.styles=z(this.styles,g);C(this.element,g);d&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var g=this.element;return{x:g.offsetLeft,y:g.offsetTop,width:g.offsetWidth,height:g.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var g=this.renderer,b=this.element,a=this.translateX||0,d=this.translateY||0,e=this.x||
0,l=this.y||0,c=this.textAlign||"left",h={left:0,center:.5,right:1}[c],p=this.styles,u=p&&p.whiteSpace;C(b,{marginLeft:a,marginTop:d});!g.styledMode&&this.shadows&&this.shadows.forEach(function(b){C(b,{marginLeft:a+1,marginTop:d+1})});this.inverted&&[].forEach.call(b.childNodes,function(a){g.invertChild(a,b)});if("SPAN"===b.tagName){p=this.rotation;var k=this.textWidth&&t(this.textWidth),r=[p,c,b.innerHTML,this.textWidth,this.textAlign].join(),x;(x=k!==this.oldTextWidth)&&!(x=k>this.oldTextWidth)&&
((x=this.textPxLength)||(C(b,{width:"",whiteSpace:u||"nowrap"}),x=b.offsetWidth),x=x>k);x&&(/[ \-]/.test(b.textContent||b.innerText)||"ellipsis"===b.style.textOverflow)?(C(b,{width:k+"px",display:"block",whiteSpace:u||"normal"}),this.oldTextWidth=k,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;r!==this.cTT&&(u=g.fontMetrics(b.style.fontSize,b).b,!G(p)||p===(this.oldRotation||0)&&c===this.oldAlign||this.setSpanRotation(p,h,u),this.getSpanCorrection(!G(p)&&this.textPxLength||b.offsetWidth,
u,h,p,c));C(b,{left:e+(this.xCorr||0)+"px",top:l+(this.yCorr||0)+"px"});this.cTT=r;this.oldRotation=p;this.oldAlign=c}}else this.alignOnAdd=!0},setSpanRotation:function(g,b,a){var d={},e=this.renderer.getTransformKey();d[e]=d.transform="rotate("+g+"deg)";d[e+(H?"Origin":"-origin")]=d.transformOrigin=100*b+"% "+a+"px";C(this.element,d)},getSpanCorrection:function(g,b,a){this.xCorr=-g*a;this.yCorr=-b}});z(f.prototype,{getTransformKey:function(){return y&&!/Edge/.test(q.navigator.userAgent)?"-ms-transform":
h?"-webkit-transform":H?"MozTransform":q.opera?"-o-transform":""},html:function(g,b,a){var d=this.createElement("span"),e=d.element,l=d.renderer,c=l.isSVG,h=function(a,b){["opacity","visibility"].forEach(function(d){a[d+"Setter"]=function(e,k,l){var w=a.div?a.div.style:b;n.prototype[d+"Setter"].call(this,e,k,l);w&&(w[k]=e)}});a.addedSetters=!0};d.textSetter=function(a){a!==e.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=a;e.innerHTML=B(a,"");d.doTransform=!0};c&&h(d,d.element.style);
d.xSetter=d.ySetter=d.alignSetter=d.rotationSetter=function(a,b){"align"===b&&(b="textAlign");d[b]=a;d.doTransform=!0};d.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};d.attr({text:g,x:Math.round(b),y:Math.round(a)}).css({position:"absolute"});l.styledMode||d.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});e.style.whiteSpace="nowrap";d.css=d.htmlCss;c&&(d.add=function(a){var b=l.box.parentNode,k=[];if(this.parentGroup=a){var g=a.div;
if(!g){for(;a;)k.push(a),a=a.parentGroup;k.reverse().forEach(function(a){function e(b,d){a[d]=b;"translateX"===d?m.left=b+"px":m.top=b+"px";a.doTransform=!0}var w=F(a.element,"class");g=a.div=a.div||v("div",w?{className:w}:void 0,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},g||b);var m=g.style;z(a,{classSetter:function(a){return function(b){this.element.setAttribute("class",b);a.className=
b}}(g),on:function(){k[0].div&&d.on.apply({element:k[0].div},arguments);return a},translateXSetter:e,translateYSetter:e});a.addedSetters||h(a)})}}else g=b;g.appendChild(e);d.added=!0;d.alignOnAdd&&d.htmlUpdateTransform();return d});return d}})});M(I,"parts/Time.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.extend,z=f.isObject,B=f.objectEach,t=f.pick,v=f.splat,C=c.merge,H=c.timeUnits,y=c.win;c.Time=function(c){this.update(c,!1)};c.Time.prototype={defaultOptions:{Date:void 0,
getTimezoneOffset:void 0,timezone:void 0,timezoneOffset:0,useUTC:!0},update:function(c){var h=t(c&&c.useUTC,!0),f=this;this.options=c=C(!0,this.options||{},c);this.Date=c.Date||y.Date||Date;this.timezoneOffset=(this.useUTC=h)&&c.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(h&&!c.getTimezoneOffset&&!c.timezone))||this.timezoneOffset?(this.get=function(g,b){var a=b.getTime(),d=a-f.getTimezoneOffset(b);b.setTime(d);g=b["getUTC"+g]();b.setTime(a);return g},
this.set=function(g,b,a){if("Milliseconds"===g||"Seconds"===g||"Minutes"===g&&0===b.getTimezoneOffset()%60)b["set"+g](a);else{var d=f.getTimezoneOffset(b);d=b.getTime()-d;b.setTime(d);b["setUTC"+g](a);g=f.getTimezoneOffset(b);d=b.getTime()+g;b.setTime(d)}}):h?(this.get=function(g,b){return b["getUTC"+g]()},this.set=function(g,b,a){return b["setUTC"+g](a)}):(this.get=function(g,b){return b["get"+g]()},this.set=function(g,b,a){return b["set"+g](a)})},makeTime:function(h,n,f,g,b,a){if(this.useUTC){var d=
this.Date.UTC.apply(0,arguments);var e=this.getTimezoneOffset(d);d+=e;var l=this.getTimezoneOffset(d);e!==l?d+=l-e:e-36E5!==this.getTimezoneOffset(d-36E5)||c.isSafari||(d-=36E5)}else d=(new this.Date(h,n,t(f,1),t(g,0),t(b,0),t(a,0))).getTime();return d},timezoneOffsetFunction:function(){var h=this,n=this.options,f=y.moment;if(!this.useUTC)return function(g){return 6E4*(new Date(g)).getTimezoneOffset()};if(n.timezone){if(f)return function(g){return 6E4*-f.tz(g,n.timezone).utcOffset()};c.error(25)}return this.useUTC&&
n.getTimezoneOffset?function(g){return 6E4*n.getTimezoneOffset(g)}:function(){return 6E4*(h.timezoneOffset||0)}},dateFormat:function(h,n,f){if(!F(n)||isNaN(n))return c.defaultOptions.lang.invalidDate||"";h=t(h,"%Y-%m-%d %H:%M:%S");var g=this,b=new this.Date(n),a=this.get("Hours",b),d=this.get("Day",b),e=this.get("Date",b),l=this.get("Month",b),L=this.get("FullYear",b),E=c.defaultOptions.lang,p=E.weekdays,u=E.shortWeekdays,k=c.pad;b=G({a:u?u[d]:p[d].substr(0,3),A:p[d],d:k(e),e:k(e,2," "),w:d,b:E.shortMonths[l],
B:E.months[l],m:k(l+1),o:l+1,y:L.toString().substr(2,2),Y:L,H:k(a),k:a,I:k(a%12||12),l:a%12||12,M:k(g.get("Minutes",b)),p:12>a?"AM":"PM",P:12>a?"am":"pm",S:k(b.getSeconds()),L:k(Math.floor(n%1E3),3)},c.dateFormats);B(b,function(a,b){for(;-1!==h.indexOf("%"+b);)h=h.replace("%"+b,"function"===typeof a?a.call(g,n):a)});return f?h.substr(0,1).toUpperCase()+h.substr(1):h},resolveDTLFormat:function(c){return z(c,!0)?c:(c=v(c),{main:c[0],from:c[1],to:c[2]})},getTimeTicks:function(c,n,f,g){var b=this,a=[],
d={};var e=new b.Date(n);var l=c.unitRange,h=c.count||1,E;g=t(g,1);if(F(n)){b.set("Milliseconds",e,l>=H.second?0:h*Math.floor(b.get("Milliseconds",e)/h));l>=H.second&&b.set("Seconds",e,l>=H.minute?0:h*Math.floor(b.get("Seconds",e)/h));l>=H.minute&&b.set("Minutes",e,l>=H.hour?0:h*Math.floor(b.get("Minutes",e)/h));l>=H.hour&&b.set("Hours",e,l>=H.day?0:h*Math.floor(b.get("Hours",e)/h));l>=H.day&&b.set("Date",e,l>=H.month?1:Math.max(1,h*Math.floor(b.get("Date",e)/h)));if(l>=H.month){b.set("Month",e,l>=
H.year?0:h*Math.floor(b.get("Month",e)/h));var p=b.get("FullYear",e)}l>=H.year&&b.set("FullYear",e,p-p%h);l===H.week&&(p=b.get("Day",e),b.set("Date",e,b.get("Date",e)-p+g+(p<g?-7:0)));p=b.get("FullYear",e);g=b.get("Month",e);var u=b.get("Date",e),k=b.get("Hours",e);n=e.getTime();b.variableTimezone&&(E=f-n>4*H.month||b.getTimezoneOffset(n)!==b.getTimezoneOffset(f));n=e.getTime();for(e=1;n<f;)a.push(n),n=l===H.year?b.makeTime(p+e*h,0):l===H.month?b.makeTime(p,g+e*h):!E||l!==H.day&&l!==H.week?E&&l===
H.hour&&1<h?b.makeTime(p,g,u,k+e*h):n+l*h:b.makeTime(p,g,u+e*h*(l===H.day?1:7)),e++;a.push(n);l<=H.hour&&1E4>a.length&&a.forEach(function(a){0===a%18E5&&"000000000"===b.dateFormat("%H%M%S%L",a)&&(d[a]="day")})}a.info=G(c,{higherRanks:d,totalRange:l*h});return a}}});M(I,"parts/Options.js",[I["parts/Globals.js"]],function(c){var f=c.color,F=c.merge;c.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square",
"triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:c.Time.prototype.defaultOptions,chart:{styledMode:!1,
borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},caption:{margin:15,text:"",align:"left",verticalAlign:"bottom"},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},
legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",
x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:c.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:c.isTouchDevice?
25:10,headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',backgroundColor:f("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",
fontSize:"9px"},text:"Highcharts.com"}};c.setOptions=function(f){c.defaultOptions=F(!0,c.defaultOptions,f);(f.time||f.global)&&c.time.update(F(c.defaultOptions.global,c.defaultOptions.time,f.global,f.time));return c.defaultOptions};c.getOptions=function(){return c.defaultOptions};c.defaultPlotOptions=c.defaultOptions.plotOptions;c.time=new c.Time(F(c.defaultOptions.global,c.defaultOptions.time));c.dateFormat=function(f,z,B){return c.time.dateFormat(f,z,B)};""});M(I,"parts/Tick.js",[I["parts/Globals.js"],
I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.destroyObjectProperties,z=f.extend,B=f.isNumber,t=f.pick,v=c.correctFloat,C=c.fireEvent,H=c.merge,y=c.deg2rad;c.Tick=function(c,n,f,g,b){this.axis=c;this.pos=n;this.type=f||"";this.isNewLabel=this.isNew=!0;this.parameters=b||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;f||g||this.addLabel()};c.Tick.prototype={addLabel:function(){var c=this,n=c.axis,f=n.options,g=n.chart,b=n.categories,a=n.names,
d=c.pos,e=t(c.options&&c.options.labels,f.labels),l=n.tickPositions,L=d===l[0],E=d===l[l.length-1];b=this.parameters.category||(b?t(b[d],a[d],d):d);var p=c.label;l=l.info;var u,k;if(n.isDatetimeAxis&&l){var r=g.time.resolveDTLFormat(f.dateTimeLabelFormats[!f.grid&&l.higherRanks[d]||l.unitName]);var x=r.main}c.isFirst=L;c.isLast=E;c.formatCtx={axis:n,chart:g,isFirst:L,isLast:E,dateTimeLabelFormat:x,tickPositionInfo:l,value:n.isLog?v(n.lin2log(b)):b,pos:d};f=n.labelFormatter.call(c.formatCtx,this.formatCtx);
if(k=r&&r.list)c.shortenLabel=function(){for(u=0;u<k.length;u++)if(p.attr({text:n.labelFormatter.call(z(c.formatCtx,{dateTimeLabelFormat:k[u]}))}),p.getBBox().width<n.getSlotWidth(c)-2*t(e.padding,5))return;p.attr({text:""})};if(F(p))p&&p.textStr!==f&&(!p.textWidth||e.style&&e.style.width||p.styles.width||p.css({width:null}),p.attr({text:f}),p.textPxLength=p.getBBox().width);else{if(c.label=p=F(f)&&e.enabled?g.renderer.text(f,0,0,e.useHTML).add(n.labelGroup):null)g.styledMode||p.css(H(e.style)),p.textPxLength=
p.getBBox().width;c.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(c){var h=this.axis,f=h.options.labels,g=c.x,b=h.chart.chartWidth,a=h.chart.spacing,d=t(h.labelLeft,Math.min(h.pos,a[3]));a=t(h.labelRight,Math.max(h.isRadial?0:h.pos+h.len,b-a[1]));var e=this.label,l=this.rotation,L={left:0,center:.5,right:1}[h.labelAlign||e.attr("align")],E=e.getBBox().width,p=h.getSlotWidth(this),u=p,k=1,r,x={};if(l||"justify"!==
t(f.overflow,"justify"))0>l&&g-L*E<d?r=Math.round(g/Math.cos(l*y)-d):0<l&&g+L*E>a&&(r=Math.round((b-g)/Math.cos(l*y)));else if(b=g+(1-L)*E,g-L*E<d?u=c.x+u*(1-L)-d:b>a&&(u=a-c.x+u*L,k=-1),u=Math.min(p,u),u<p&&"center"===h.labelAlign&&(c.x+=k*(p-u-L*(p-Math.min(E,u)))),E>u||h.autoRotation&&(e.styles||{}).width)r=u;r&&(this.shortenLabel?this.shortenLabel():(x.width=Math.floor(r),(f.style||{}).textOverflow||(x.textOverflow="ellipsis"),e.css(x)))},getPosition:function(h,n,f,g){var b=this.axis,a=b.chart,
d=g&&a.oldChartHeight||a.chartHeight;h={x:h?c.correctFloat(b.translate(n+f,null,null,g)+b.transB):b.left+b.offset+(b.opposite?(g&&a.oldChartWidth||a.chartWidth)-b.right-b.left:0),y:h?d-b.bottom+b.offset-(b.opposite?b.height:0):c.correctFloat(d-b.translate(n+f,null,null,g)-b.transB)};h.y=Math.max(Math.min(h.y,1E5),-1E5);C(this,"afterGetPosition",{pos:h});return h},getLabelPosition:function(c,n,f,g,b,a,d,e){var l=this.axis,h=l.transA,E=l.isLinked&&l.linkedParent?l.linkedParent.reversed:l.reversed,p=
l.staggerLines,u=l.tickRotCorr||{x:0,y:0},k=b.y,r=g||l.reserveSpaceDefault?0:-l.labelOffset*("center"===l.labelAlign?.5:1),x={};F(k)||(k=0===l.side?f.rotation?-8:-f.getBBox().height:2===l.side?u.y+8:Math.cos(f.rotation*y)*(u.y-f.getBBox(!1,0).height/2));c=c+b.x+r+u.x-(a&&g?a*h*(E?-1:1):0);n=n+k-(a&&!g?a*h*(E?1:-1):0);p&&(f=d/(e||1)%p,l.opposite&&(f=p-f-1),n+=l.labelOffset/p*f);x.x=c;x.y=Math.round(n);C(this,"afterGetLabelPosition",{pos:x,tickmarkOffset:a,index:d});return x},getMarkPath:function(c,
n,f,g,b,a){return a.crispLine(["M",c,n,"L",c+(b?0:-f),n+(b?f:0)],g)},renderGridLine:function(c,n,f){var g=this.axis,b=g.options,a=this.gridLine,d={},e=this.pos,l=this.type,h=t(this.tickmarkOffset,g.tickmarkOffset),E=g.chart.renderer,p=l?l+"Grid":"grid",u=b[p+"LineWidth"],k=b[p+"LineColor"];b=b[p+"LineDashStyle"];a||(g.chart.styledMode||(d.stroke=k,d["stroke-width"]=u,b&&(d.dashstyle=b)),l||(d.zIndex=1),c&&(n=0),this.gridLine=a=E.path().attr(d).addClass("highcharts-"+(l?l+"-":"")+"grid-line").add(g.gridGroup));
if(a&&(f=g.getPlotLinePath({value:e+h,lineWidth:a.strokeWidth()*f,force:"pass",old:c})))a[c||this.isNew?"attr":"animate"]({d:f,opacity:n})},renderMark:function(c,n,f){var g=this.axis,b=g.options,a=g.chart.renderer,d=this.type,e=d?d+"Tick":"tick",l=g.tickSize(e),h=this.mark,E=!h,p=c.x;c=c.y;var u=t(b[e+"Width"],!d&&g.isXAxis?1:0);b=b[e+"Color"];l&&(g.opposite&&(l[0]=-l[0]),E&&(this.mark=h=a.path().addClass("highcharts-"+(d?d+"-":"")+"tick").add(g.axisGroup),g.chart.styledMode||h.attr({stroke:b,"stroke-width":u})),
h[E?"attr":"animate"]({d:this.getMarkPath(p,c,l[0],h.strokeWidth()*f,g.horiz,a),opacity:n}))},renderLabel:function(c,n,f,g){var b=this.axis,a=b.horiz,d=b.options,e=this.label,l=d.labels,h=l.step;b=t(this.tickmarkOffset,b.tickmarkOffset);var E=!0,p=c.x;c=c.y;e&&B(p)&&(e.xy=c=this.getLabelPosition(p,c,e,a,l,b,g,h),this.isFirst&&!this.isLast&&!t(d.showFirstLabel,1)||this.isLast&&!this.isFirst&&!t(d.showLastLabel,1)?E=!1:!a||l.step||l.rotation||n||0===f||this.handleOverflow(c),h&&g%h&&(E=!1),E&&B(c.y)?
(c.opacity=f,e[this.isNewLabel?"attr":"animate"](c),this.isNewLabel=!1):(e.attr("y",-9999),this.isNewLabel=!0))},render:function(h,n,f){var g=this.axis,b=g.horiz,a=this.pos,d=t(this.tickmarkOffset,g.tickmarkOffset);a=this.getPosition(b,a,d,n);d=a.x;var e=a.y;g=b&&d===g.pos+g.len||!b&&e===g.pos?-1:1;f=t(f,1);this.isActive=!0;this.renderGridLine(n,f,g);this.renderMark(a,f,g);this.renderLabel(a,n,f,h);this.isNew=!1;c.fireEvent(this,"afterRender")},destroy:function(){G(this,this.axis)}}});M(I,"parts/Axis.js",
[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.arrayMax,G=f.arrayMin,z=f.defined,B=f.destroyObjectProperties,t=f.extend,v=f.isArray,C=f.isNumber,H=f.isString,y=f.objectEach,h=f.pick,n=f.splat,q=f.syncTimeout,g=c.addEvent,b=c.animObject,a=c.color,d=c.correctFloat,e=c.defaultOptions,l=c.deg2rad,L=c.fireEvent,E=c.format,p=c.getMagnitude,u=c.merge,k=c.normalizeTickInterval,r=c.removeEvent,x=c.seriesTypes,A=c.Tick;f=function(){this.init.apply(this,arguments)};t(f.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",
range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",
style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,crop:!0,overflow:"justify",formatter:function(){return c.numberFormat(this.total,-1)},style:{color:"#000000",
fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},init:function(a,b){var d=b.isX,m=this;m.chart=a;m.horiz=a.inverted&&!m.isZAxis?!d:d;m.isXAxis=d;m.coll=m.coll||(d?"xAxis":
"yAxis");L(this,"init",{userOptions:b});m.opposite=b.opposite;m.side=b.side||(m.horiz?m.opposite?0:2:m.opposite?1:3);m.setOptions(b);var e=this.options,w=e.type;m.labelFormatter=e.labels.formatter||m.defaultLabelFormatter;m.userOptions=b;m.minPixelPadding=0;m.reversed=e.reversed;m.visible=!1!==e.visible;m.zoomEnabled=!1!==e.zoomEnabled;m.hasNames="category"===w||!0===e.categories;m.categories=e.categories||m.hasNames;m.names||(m.names=[],m.names.keys={});m.plotLinesAndBandsGroups={};m.isLog="logarithmic"===
w;m.isDatetimeAxis="datetime"===w;m.positiveValuesOnly=m.isLog&&!m.allowNegativeLog;m.isLinked=z(e.linkedTo);m.ticks={};m.labelEdge=[];m.minorTicks={};m.plotLinesAndBands=[];m.alternateBands={};m.len=0;m.minRange=m.userMinRange=e.minRange||e.maxZoom;m.range=e.range;m.offset=e.offset||0;m.stacks={};m.oldStacks={};m.stacksTouched=0;m.max=null;m.min=null;m.crosshair=h(e.crosshair,n(a.options.tooltip.crosshairs)[d?0:1],!1);b=m.options.events;-1===a.axes.indexOf(m)&&(d?a.axes.splice(a.xAxis.length,0,m):
a.axes.push(m),a[m.coll].push(m));m.series=m.series||[];a.inverted&&!m.isZAxis&&d&&void 0===m.reversed&&(m.reversed=!0);y(b,function(a,b){c.isFunction(a)&&g(m,b,a)});m.lin2log=e.linearToLogConverter||m.lin2log;m.isLog&&(m.val2lin=m.log2lin,m.lin2val=m.lin2log);L(this,"afterInit")},setOptions:function(a){this.options=u(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],
u(e[this.coll],a));L(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var a=this.axis,b=this.value,d=a.chart.time,k=a.categories,l=this.dateTimeLabelFormat,g=e.lang,r=g.numericSymbols;g=g.numericSymbolMagnitude||1E3;var x=r&&r.length,p=a.options.labels.format;a=a.isLog?Math.abs(b):a.tickInterval;if(p)var h=E(p,this,d);else if(k)h=b;else if(l)h=d.dateFormat(l,b);else if(x&&1E3<=a)for(;x--&&void 0===h;)d=Math.pow(g,x+1),a>=d&&0===10*b%d&&null!==r[x]&&0!==b&&(h=c.numberFormat(b/
d,-1)+r[x]);void 0===h&&(h=1E4<=Math.abs(b)?c.numberFormat(b,-1):c.numberFormat(b,-1,void 0,""));return h},getSeriesExtremes:function(){var a=this,b=a.chart,d;L(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(m){if(m.visible||!b.options.chart.ignoreHiddenSeries){var e=m.options,w=e.threshold;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=w&&(w=null);if(a.isXAxis){if(e=
m.xData,e.length){d=m.getXExtremes(e);var k=d.min;var c=d.max;C(k)||k instanceof Date||(e=e.filter(C),d=m.getXExtremes(e),k=d.min,c=d.max);e.length&&(a.dataMin=Math.min(h(a.dataMin,k),k),a.dataMax=Math.max(h(a.dataMax,c),c))}}else if(m.getExtremes(),c=m.dataMax,k=m.dataMin,z(k)&&z(c)&&(a.dataMin=Math.min(h(a.dataMin,k),k),a.dataMax=Math.max(h(a.dataMax,c),c)),z(w)&&(a.threshold=w),!e.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});L(this,"afterGetSeriesExtremes")},translate:function(a,
b,d,e,k,c){var m=this.linkedParent||this,w=1,l=0,g=e?m.oldTransA:m.transA;e=e?m.oldMin:m.min;var r=m.minPixelPadding;k=(m.isOrdinal||m.isBroken||m.isLog&&k)&&m.lin2val;g||(g=m.transA);d&&(w*=-1,l=m.len);m.reversed&&(w*=-1,l-=w*(m.sector||m.len));b?(a=(a*w+l-r)/g+e,k&&(a=m.lin2val(a))):(k&&(a=m.val2lin(a)),a=C(e)?w*(a-e)*g+l+w*r+(C(c)?g*c:0):void 0);return a},toPixels:function(a,b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),
!0,!this.horiz,null,!0)},getPlotLinePath:function(a){var b=this,d=b.chart,e=b.left,w=b.top,k=a.old,c=a.value,l=a.translatedValue,g=a.lineWidth,r=a.force,x,p,A,u,n=k&&d.oldChartHeight||d.chartHeight,f=k&&d.oldChartWidth||d.chartWidth,E,q=b.transB,v=function(a,b,d){if("pass"!==r&&a<b||a>d)r?a=Math.min(Math.max(b,a),d):E=!0;return a};a={value:c,lineWidth:g,old:k,force:r,acrossPanes:a.acrossPanes,translatedValue:l};L(this,"getPlotLinePath",a,function(a){l=h(l,b.translate(c,null,null,k));l=Math.min(Math.max(-1E5,
l),1E5);x=A=Math.round(l+q);p=u=Math.round(n-l-q);C(l)?b.horiz?(p=w,u=n-b.bottom,x=A=v(x,e,e+b.width)):(x=e,A=f-b.right,p=u=v(p,w,w+b.height)):(E=!0,r=!1);a.path=E&&!r?null:d.renderer.crispLine(["M",x,p,"L",A,u],g||1)});return a.path},getLinearTickPositions:function(a,b,e){var m=d(Math.floor(b/a)*a);e=d(Math.ceil(e/a)*a);var w=[],k;d(m+a)===m&&(k=20);if(this.single)return[b];for(b=m;b<=e;){w.push(b);b=d(b+a,k);if(b===c)break;var c=b}return w},getMinorTickInterval:function(){var a=this.options;return!0===
a.minorTicks?h(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,d=a.tickPositions,e=a.minorTickInterval,k=[],c=a.pointRangePadding||0,l=a.min-c;c=a.max+c;var g=c-l;if(g&&g/e<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(b,d,m){d&&k.push.apply(k,a.getLogTickPositions(e,m[d-1],m[d],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())k=k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e),l,c,b.startOfWeek));
else for(b=l+(d[0]-l)%e;b<=c&&b!==k[0];b+=e)k.push(b);0!==k.length&&a.trimTicks(k);return k},adjustForMinRange:function(){var a=this.options,b=this.min,d=this.max,e,k,c,l,g;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(z(a.min)||z(a.max)?this.minRange=null:(this.series.forEach(function(a){l=a.xData;for(k=g=a.xIncrement?1:l.length-1;0<k;k--)if(c=l[k]-l[k-1],void 0===e||c<e)e=c}),this.minRange=Math.min(5*e,this.dataMax-this.dataMin)));if(d-b<this.minRange){var r=this.dataMax-this.dataMin>=this.minRange;
var x=this.minRange;var p=(x-d+b)/2;p=[b-p,h(a.min,b-p)];r&&(p[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin);b=F(p);d=[b+x,h(a.max,b+x)];r&&(d[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax);d=G(d);d-b<x&&(p[0]=d-x,p[1]=h(a.min,d-x),b=F(p))}this.min=b;this.max=d},getClosest:function(){var a;this.categories?a=1:this.series.forEach(function(b){var d=b.closestPointRange,m=b.visible||!b.chart.options.chart.ignoreHiddenSeries;!b.noSharedTooltip&&z(d)&&m&&(a=z(a)?Math.min(a,d):d)});return a},
nameToX:function(a){var b=v(this.categories),d=b?this.categories:this.names,e=a.options.x;a.series.requireSorting=!1;z(e)||(e=!1===this.options.uniqueNames?a.series.autoIncrement():b?d.indexOf(a.name):h(d.keys[a.name],-1));if(-1===e){if(!b)var k=d.length}else k=e;void 0!==k&&(this.names[k]=a.name,this.names.keys[a.name]=k);return k},updateNames:function(){var a=this,b=this.names;0<b.length&&(Object.keys(b.keys).forEach(function(a){delete b.keys[a]}),b.length=0,this.minRange=this.userMinRange,(this.series||
[]).forEach(function(b){b.xIncrement=null;if(!b.points||b.isDirtyData)a.max=Math.max(a.max,b.xData.length-1),b.processData(),b.generatePoints();b.data.forEach(function(d,e){if(d&&d.options&&void 0!==d.name){var m=a.nameToX(d);void 0!==m&&m!==d.x&&(d.x=m,b.xData[e]=m)}})}))},setAxisTranslation:function(a){var b=this,d=b.max-b.min,e=b.axisPointRange||0,k=0,w=0,c=b.linkedParent,l=!!b.categories,g=b.transA,r=b.isXAxis;if(r||l||e){var p=b.getClosest();c?(k=c.minPointOffset,w=c.pointRangePadding):b.series.forEach(function(a){var d=
l?1:r?h(a.options.pointRange,p,0):b.axisPointRange||0,m=a.options.pointPlacement;e=Math.max(e,d);if(!b.single||l)a=x.xrange&&a instanceof x.xrange?!r:r,k=Math.max(k,a&&H(m)?0:d/2),w=Math.max(w,a&&"on"===m?0:d)});c=b.ordinalSlope&&p?b.ordinalSlope/p:1;b.minPointOffset=k*=c;b.pointRangePadding=w*=c;b.pointRange=Math.min(e,b.single&&l?1:d);r&&(b.closestPointRange=p)}a&&(b.oldTransA=g);b.translationSlope=b.transA=g=b.staticScale||b.len/(d+w||1);b.transB=b.horiz?b.left:b.bottom;b.minPixelPadding=g*k;L(this,
"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(a){var b=this,e=b.chart,w=b.options,l=b.isLog,g=b.isDatetimeAxis,r=b.isXAxis,x=b.isLinked,A=w.maxPadding,u=w.minPadding,n=w.tickInterval,f=w.tickPixelInterval,E=b.categories,q=C(b.threshold)?b.threshold:null,v=b.softThreshold;g||E||x||this.getTickAmount();var t=h(b.userMin,w.min);var y=h(b.userMax,w.max);if(x){b.linkedParent=e[b.coll][w.linkedTo];var B=b.linkedParent.getExtremes();b.min=h(B.min,
B.dataMin);b.max=h(B.max,B.dataMax);w.type!==b.linkedParent.options.type&&c.error(11,1,e)}else{if(!v&&z(q))if(b.dataMin>=q)B=q,u=0;else if(b.dataMax<=q){var H=q;A=0}b.min=h(t,B,b.dataMin);b.max=h(y,H,b.dataMax)}l&&(b.positiveValuesOnly&&!a&&0>=Math.min(b.min,h(b.dataMin,b.min))&&c.error(10,1,e),b.min=d(b.log2lin(b.min),16),b.max=d(b.log2lin(b.max),16));b.range&&z(b.max)&&(b.userMin=b.min=t=Math.max(b.dataMin,b.minFromRange()),b.userMax=y=b.max,b.range=null);L(b,"foundExtremes");b.beforePadding&&b.beforePadding();
b.adjustForMinRange();!(E||b.axisPointRange||b.usePercentage||x)&&z(b.min)&&z(b.max)&&(e=b.max-b.min)&&(!z(t)&&u&&(b.min-=e*u),!z(y)&&A&&(b.max+=e*A));C(w.softMin)&&!C(b.userMin)&&w.softMin<b.min&&(b.min=t=w.softMin);C(w.softMax)&&!C(b.userMax)&&w.softMax>b.max&&(b.max=y=w.softMax);C(w.floor)&&(b.min=Math.min(Math.max(b.min,w.floor),Number.MAX_VALUE));C(w.ceiling)&&(b.max=Math.max(Math.min(b.max,w.ceiling),h(b.userMax,-Number.MAX_VALUE)));v&&z(b.dataMin)&&(q=q||0,!z(t)&&b.min<q&&b.dataMin>=q?b.min=
b.options.minRange?Math.min(q,b.max-b.minRange):q:!z(y)&&b.max>q&&b.dataMax<=q&&(b.max=b.options.minRange?Math.max(q,b.min+b.minRange):q));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:x&&!n&&f===b.linkedParent.options.tickPixelInterval?n=b.linkedParent.tickInterval:h(n,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,E?1:(b.max-b.min)*f/Math.max(b.len,f));r&&!a&&b.series.forEach(function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);
b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!n&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));a=h(w.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!n&&b.tickInterval<a&&(b.tickInterval=a);g||l||n||(b.tickInterval=k(b.tickInterval,null,p(b.tickInterval),h(w.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=
b.unsquish());this.setTickPositions()},setTickPositions:function(){var a=this.options,b=a.tickPositions;var d=this.getMinorTickInterval();var e=a.tickPositioner,k=a.startOnTick,l=a.endOnTick;this.tickmarkOffset=this.categories&&"between"===a.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===d&&this.tickInterval?this.tickInterval/5:d;this.single=this.min===this.max&&z(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==a.allowDecimals);this.tickPositions=
d=b&&b.slice();!d&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(d=[this.min,this.max],c.error(19,!1,this.chart)):d=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,a.units),this.min,this.max,a.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),d.length>this.len&&(d=[d[0],
d.pop()],d[0]===d[1]&&(d.length=1)),this.tickPositions=d,e&&(e=e.apply(this,[this.min,this.max])))&&(this.tickPositions=d=e);this.paddedTicks=d.slice(0);this.trimTicks(d,k,l);this.isLinked||(this.single&&2>d.length&&!this.categories&&(this.min-=.5,this.max+=.5),b||e||this.adjustTickAmount());L(this,"afterSetTickPositions")},trimTicks:function(a,b,d){var e=a[0],m=a[a.length-1],k=this.minPointOffset||0;L(this,"trimTicks");if(!this.isLinked){if(b&&-Infinity!==e)this.min=e;else for(;this.min-k>a[0];)a.shift();
if(d)this.max=m;else for(;this.max+k<a[a.length-1];)a.pop();0===a.length&&z(e)&&!this.options.tickPositions&&a.push((m+e)/2)}},alignToOthers:function(){var a={},b,d=this.options;!1===this.chart.options.chart.alignTicks||!1===d.alignTicks||!1===d.startOnTick||!1===d.endOnTick||this.isLog||this.chart[this.coll].forEach(function(d){var e=d.options;e=[d.horiz?e.left:e.top,e.width,e.height,e.pane].join();d.series.length&&(a[e]?b=!0:a[e]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,
d=a.tickPixelInterval;!z(a.tickInterval)&&this.len<d&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/d)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.options,b=this.tickInterval,e=this.tickPositions,k=this.tickAmount,c=this.finalTickAmt,l=e&&e.length,g=h(this.threshold,this.softThreshold?0:null),r;if(this.hasData()){if(l<k){for(r=this.min;e.length<k;)e.length%2||r===g?e.push(d(e[e.length-
1]+b)):e.unshift(d(e[0]-b));this.transA*=(l-1)/(k-1);this.min=a.startOnTick?e[0]:Math.min(this.min,e[0]);this.max=a.endOnTick?e[e.length-1]:Math.max(this.max,e[e.length-1])}else l>k&&(this.tickInterval*=2,this.setTickPositions());if(z(c)){for(b=a=e.length;b--;)(3===c&&1===b%2||2>=c&&0<b&&b<a-1)&&e.splice(b,1);this.finalTickAmt=void 0}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||a.isDirty||a.xAxis&&a.xAxis.isDirty}),b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=
this.len;this.setAxisSize();(b=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();L(this,"afterSetScale")},setExtremes:function(a,
b,d,e,k){var m=this,w=m.chart;d=h(d,!0);m.series.forEach(function(a){delete a.kdTree});k=t(k,{min:a,max:b});L(m,"setExtremes",k,function(){m.userMin=a;m.userMax=b;m.eventArgs=k;d&&w.redraw(e)})},zoom:function(a,b){var d=this.dataMin,e=this.dataMax,m=this.options,k=Math.min(d,h(m.min,d)),w=Math.max(e,h(m.max,e));a={newMin:a,newMax:b};L(this,"zoom",a,function(a){var b=a.newMin,m=a.newMax;if(b!==this.min||m!==this.max)this.allowZoomOutside||(z(d)&&(b<k&&(b=k),b>w&&(b=w)),z(e)&&(m<k&&(m=k),m>w&&(m=w))),
this.displayBtn=void 0!==b||void 0!==m,this.setExtremes(b,m,!1,void 0,{trigger:"zoom"});a.zoomed=!0});return a.zoomed},setAxisSize:function(){var a=this.chart,b=this.options,d=b.offsets||[0,0,0,0],e=this.horiz,k=this.width=Math.round(c.relativeLength(h(b.width,a.plotWidth-d[3]+d[1]),a.plotWidth)),l=this.height=Math.round(c.relativeLength(h(b.height,a.plotHeight-d[0]+d[2]),a.plotHeight)),g=this.top=Math.round(c.relativeLength(h(b.top,a.plotTop+d[0]),a.plotHeight,a.plotTop));b=this.left=Math.round(c.relativeLength(h(b.left,
a.plotLeft+d[3]),a.plotWidth,a.plotLeft));this.bottom=a.chartHeight-l-g;this.right=a.chartWidth-k-b;this.len=Math.max(e?k:l,0);this.pos=e?b:g},getExtremes:function(){var a=this.isLog;return{min:a?d(this.lin2log(this.min)):this.min,max:a?d(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,d=b?this.lin2log(this.min):this.min;b=b?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=d:Infinity===
a?a=b:d>a?a=d:b<a&&(a=b);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var b=(h(a,0)-90*this.side+720)%360;a={align:"center"};L(this,"autoLabelAlign",a,function(a){15<b&&165>b?a.align="right":195<b&&345>b&&(a.align="left")});return a.align},tickSize:function(a){var b=this.options,d=b[a+"Length"],e=h(b[a+"Width"],"tick"===a&&this.isXAxis&&!this.categories?1:0);if(e&&d){"inside"===b[a+"Position"]&&(d=-d);var k=[d,e]}a={tickSize:k};L(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=
this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,e=this.tickInterval,k=e,c=this.len/(((this.categories?1:0)+this.max-this.min)/e),g,r=a.rotation,x=this.labelMetrics(),p,A=Number.MAX_VALUE,u,n=this.max-this.min,f=function(a){var b=a/(c||1);b=1<b?Math.ceil(b):1;b*e>n&&Infinity!==a&&Infinity!==c&&n&&(b=Math.ceil(n/
e));return d(b*e)};b?(u=!a.staggerLines&&!a.step&&(z(r)?[r]:c<h(a.autoRotationLimit,80)&&a.autoRotation))&&u.forEach(function(a){if(a===r||a&&-90<=a&&90>=a){p=f(Math.abs(x.h/Math.sin(l*a)));var b=p+Math.abs(a/360);b<A&&(A=b,g=a,k=p)}}):a.step||(k=f(x.h));this.autoRotation=u;this.labelRotation=h(g,r);return k},getSlotWidth:function(a){var b=this.chart,d=this.horiz,e=this.options.labels,k=Math.max(this.tickPositions.length-(this.categories?0:1),1),c=b.margin[3];return a&&a.slotWidth||d&&2>(e.step||
0)&&!e.rotation&&(this.staggerLines||1)*this.len/k||!d&&(e.style&&parseInt(e.style.width,10)||c&&c-b.spacing[3]||.33*b.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,d=this.tickPositions,e=this.ticks,k=this.options.labels,c=k&&k.style||{},l=this.horiz,g=this.getSlotWidth(),r=Math.max(1,Math.round(g-2*(k.padding||5))),x={},p=this.labelMetrics(),h=k.style&&k.style.textOverflow,A=0;H(k.rotation)||(x.rotation=k.rotation||0);d.forEach(function(a){(a=e[a])&&a.label&&a.label.textPxLength>
A&&(A=a.label.textPxLength)});this.maxLabelLength=A;if(this.autoRotation)A>r&&A>p.h?x.rotation=this.labelRotation:this.labelRotation=0;else if(g){var u=r;if(!h){var n="clip";for(r=d.length;!l&&r--;){var f=d[r];if(f=e[f].label)f.styles&&"ellipsis"===f.styles.textOverflow?f.css({textOverflow:"clip"}):f.textPxLength>g&&f.css({width:g+"px"}),f.getBBox().height>this.len/d.length-(p.h-p.f)&&(f.specificTextOverflow="ellipsis")}}}x.rotation&&(u=A>.5*a.chartHeight?.33*a.chartHeight:A,h||(n="ellipsis"));if(this.labelAlign=
k.align||this.autoLabelAlign(this.labelRotation))x.align=this.labelAlign;d.forEach(function(a){var b=(a=e[a])&&a.label,d=c.width,k={};b&&(b.attr(x),a.shortenLabel?a.shortenLabel():u&&!d&&"nowrap"!==c.whiteSpace&&(u<b.textPxLength||"SPAN"===b.element.tagName)?(k.width=u,h||(k.textOverflow=b.specificTextOverflow||n),b.css(k)):b.styles&&b.styles.width&&!k.width&&!d&&b.css({width:null}),delete b.specificTextOverflow,a.rotation=x.rotation)},this);this.tickRotCorr=b.rotCorr(p.b,this.labelRotation||0,0!==
this.side)},hasData:function(){return this.series.some(function(a){return a.hasData()})||this.options.showEmpty&&z(this.min)&&z(this.max)},addTitle:function(a){var b=this.chart.renderer,d=this.horiz,e=this.opposite,k=this.options.title,c,l=this.chart.styledMode;this.axisTitle||((c=k.textAlign)||(c=(d?{low:"left",middle:"center",high:"right"}:{low:e?"right":"left",middle:"center",high:e?"left":"right"})[k.align]),this.axisTitle=b.text(k.text,0,0,k.useHTML).attr({zIndex:7,rotation:k.rotation||0,align:c}).addClass("highcharts-axis-title"),
l||this.axisTitle.css(u(k.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);l||k.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](a)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new A(this,a)},getOffset:function(){var a=this,b=a.chart,d=b.renderer,e=a.options,k=a.tickPositions,c=a.ticks,l=a.horiz,g=a.side,r=b.inverted&&!a.isZAxis?[1,0,3,2][g]:g,x,p=0,A=0,u=e.title,n=e.labels,f=0,E=b.axisOffset;b=b.clipOffset;
var q=[-1,1,1,-1][g],v=e.className,t=a.axisParent;var C=a.hasData();a.showAxis=x=C||h(e.showEmpty,!0);a.staggerLines=a.horiz&&n.staggerLines;a.axisGroup||(a.gridGroup=d.g("grid").attr({zIndex:e.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(v||"")).add(t),a.axisGroup=d.g("axis").attr({zIndex:e.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(v||"")).add(t),a.labelGroup=d.g("axis-labels").attr({zIndex:n.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+
"-labels "+(v||"")).add(t));C||a.isLinked?(k.forEach(function(b,d){a.generateTick(b,d)}),a.renderUnsquish(),a.reserveSpaceDefault=0===g||2===g||{1:"left",3:"right"}[g]===a.labelAlign,h(n.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&k.forEach(function(a){f=Math.max(c[a].getLabelSize(),f)}),a.staggerLines&&(f*=a.staggerLines),a.labelOffset=f*(a.opposite?-1:1)):y(c,function(a,b){a.destroy();delete c[b]});if(u&&u.text&&!1!==u.enabled&&(a.addTitle(x),x&&!1!==u.reserveSpace)){a.titleOffset=
p=a.axisTitle.getBBox()[l?"height":"width"];var B=u.offset;A=z(B)?0:h(u.margin,l?5:10)}a.renderLine();a.offset=q*h(e.offset,E[g]?E[g]+(e.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};d=0===g?-a.labelMetrics().h:2===g?a.tickRotCorr.y:0;A=Math.abs(f)+A;f&&(A=A-d+q*(l?h(n.y,a.tickRotCorr.y+8*q):n.x));a.axisTitleMargin=h(B,A);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(c,k));l=this.tickSize("tick");E[g]=Math.max(E[g],a.axisTitleMargin+p+q*a.offset,A,k&&k.length&&l?l[0]+
q*a.offset:0);e=e.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[r]=Math.max(b[r],e);L(this,"afterGetOffset")},getLinePath:function(a){var b=this.chart,d=this.opposite,e=this.offset,k=this.horiz,c=this.left+(d?this.width:0)+e;e=b.chartHeight-this.bottom-(d?this.height:0)+e;d&&(a*=-1);return b.renderer.crispLine(["M",k?this.left:c,k?e:this.top,"L",k?b.chartWidth-this.right:c,k?e:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,d=this.top,e=this.len,k=this.options.title,c=a?b:d,l=this.opposite,g=this.offset,r=k.x||0,x=k.y||0,p=this.axisTitle,A=this.chart.renderer.fontMetrics(k.style&&k.style.fontSize,p);p=Math.max(p.getBBox(null,0).height-A.h-1,0);e={low:c+(a?0:e),middle:c+e/2,high:c+(a?e:0)}[k.align];b=(a?d+this.height:b)+(a?1:-1)*(l?-1:1)*this.axisTitleMargin+
[-p,p,A.f,-p][this.side];a={x:a?e+r:b+(l?this.width:0)+g+r,y:a?b+x-(l?this.height:0)+g:e+x};L(this,"afterGetTitlePosition",{titlePosition:a});return a},renderMinorTick:function(a){var b=this.chart.hasRendered&&C(this.oldMin),d=this.minorTicks;d[a]||(d[a]=new A(this,a,"minor"));b&&d[a].isNew&&d[a].render(null,!0);d[a].render(null,!1,1)},renderTick:function(a,b){var d=this.isLinked,e=this.ticks,k=this.chart.hasRendered&&C(this.oldMin);if(!d||a>=this.min&&a<=this.max)e[a]||(e[a]=new A(this,a)),k&&e[a].isNew&&
e[a].render(b,!0,-1),e[a].render(b)},render:function(){var a=this,d=a.chart,e=a.options,k=a.isLog,l=a.isLinked,g=a.tickPositions,r=a.axisTitle,x=a.ticks,p=a.minorTicks,h=a.alternateBands,u=e.stackLabels,n=e.alternateGridColor,f=a.tickmarkOffset,E=a.axisLine,v=a.showAxis,t=b(d.renderer.globalAnimation),B,H;a.labelEdge.length=0;a.overlap=!1;[x,p,h].forEach(function(a){y(a,function(a){a.isActive=!1})});if(a.hasData()||l)a.minorTickInterval&&!a.categories&&a.getMinorTickPositions().forEach(function(b){a.renderMinorTick(b)}),
g.length&&(g.forEach(function(b,d){a.renderTick(b,d)}),f&&(0===a.min||a.single)&&(x[-1]||(x[-1]=new A(a,-1,null,!0)),x[-1].render(-1))),n&&g.forEach(function(b,e){H=void 0!==g[e+1]?g[e+1]+f:a.max-f;0===e%2&&b<a.max&&H<=a.max+(d.polar?-f:f)&&(h[b]||(h[b]=new c.PlotLineOrBand(a)),B=b+f,h[b].options={from:k?a.lin2log(B):B,to:k?a.lin2log(H):H,color:n},h[b].render(),h[b].isActive=!0)}),a._addedPlotLB||((e.plotLines||[]).concat(e.plotBands||[]).forEach(function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=
!0);[x,p,h].forEach(function(a){var b,e=[],k=t.duration;y(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,e.push(b))});q(function(){for(b=e.length;b--;)a[e[b]]&&!a[e[b]].isActive&&(a[e[b]].destroy(),delete a[e[b]])},a!==h&&d.hasRendered&&k?k:0)});E&&(E[E.isPlaced?"animate":"attr"]({d:this.getLinePath(E.strokeWidth())}),E.isPlaced=!0,E[v?"show":"hide"](v));r&&v&&(e=a.getTitlePosition(),C(e.y)?(r[r.isNew?"attr":"animate"](e),r.isNew=!1):(r.attr("y",-9999),r.isNew=!0));u&&u.enabled&&a.renderStackTotals();
a.isDirty=!1;L(this,"afterRender")},redraw:function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(a){a.render()}));this.series.forEach(function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,d=b.stacks,e=b.plotLinesAndBands,k;L(this,"destroy",{keepEvents:a});a||r(b);y(d,function(a,b){B(a);d[b]=null});[b.ticks,b.minorTicks,b.alternateBands].forEach(function(a){B(a)});if(e)for(a=e.length;a--;)e[a].destroy();
"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){b[a]&&(b[a]=b[a].destroy())});for(k in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[k]=b.plotLinesAndBandsGroups[k].destroy();y(b,function(a,d){-1===b.keepProps.indexOf(d)&&delete b[d]})},drawCrosshair:function(b,d){var e,k=this.crosshair,c=h(k.snap,!0),l,g=this.cross;L(this,"drawCrosshair",{e:b,point:d});b||(b=this.cross&&this.cross.e);if(this.crosshair&&!1!==(z(d)||!c)){c?z(d)&&
(l=h("colorAxis"!==this.coll?d.crosshairPos:null,this.isXAxis?d.plotX:this.len-d.plotY)):l=b&&(this.horiz?b.chartX-this.pos:this.len-b.chartY+this.pos);z(l)&&(e=this.getPlotLinePath({value:d&&(this.isXAxis?d.x:h(d.stackY,d.y)),translatedValue:l})||null);if(!z(e)){this.hideCrosshair();return}c=this.categories&&!this.isRadial;g||(this.cross=g=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(c?"category ":"thin ")+k.className).attr({zIndex:h(k.zIndex,2)}).add(),this.chart.styledMode||
(g.attr({stroke:k.color||(c?a("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":h(k.width,1)}).css({"pointer-events":"none"}),k.dashStyle&&g.attr({dashstyle:k.dashStyle})));g.show().attr({d:e});c&&!k.width&&g.attr({"stroke-width":this.transA});this.cross.e=b}else this.hideCrosshair();L(this,"afterDrawCrosshair",{e:b,point:d})},hideCrosshair:function(){this.cross&&this.cross.hide();L(this,"afterHideCrosshair")}});return c.Axis=f});M(I,"parts/DateTimeAxis.js",[I["parts/Globals.js"]],function(c){var f=
c.Axis,F=c.getMagnitude,G=c.normalizeTickInterval,z=c.timeUnits;f.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};f.prototype.normalizeTimeTickInterval=function(c,f){var v=f||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];f=v[v.length-1];var t=z[f[0]],B=f[1],y;for(y=0;y<v.length&&!(f=v[y],t=z[f[0]],
B=f[1],v[y+1]&&c<=(t*B[B.length-1]+z[v[y+1][0]])/2);y++);t===z.year&&c<5*t&&(B=[1,2,5]);c=G(c/t,B,"year"===f[0]?Math.max(F(c/t),1):1);return{unitRange:t,count:c,unitName:f[0]}}});M(I,"parts/LogarithmicAxis.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.pick;f=c.Axis;var G=c.getMagnitude,z=c.normalizeTickInterval;f.prototype.getLogTickPositions=function(c,f,v,C){var t=this.options,y=this.len,h=[];C||(this._minorAutoInterval=null);if(.5<=c)c=Math.round(c),h=this.getLinearTickPositions(c,
f,v);else if(.08<=c){y=Math.floor(f);var n,q;for(t=.3<c?[1,2,4]:.15<c?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];y<v+1&&!q;y++){var g=t.length;for(n=0;n<g&&!q;n++){var b=this.log2lin(this.lin2log(y)*t[n]);b>f&&(!C||a<=v)&&void 0!==a&&h.push(a);a>v&&(q=!0);var a=b}}}else f=this.lin2log(f),v=this.lin2log(v),c=C?this.getMinorTickInterval():t.tickInterval,c=F("auto"===c?null:c,this._minorAutoInterval,t.tickPixelInterval/(C?5:1)*(v-f)/((C?y/this.tickPositions.length:y)||1)),c=z(c,null,G(c)),h=this.getLinearTickPositions(c,
f,v).map(this.log2lin),C||(this._minorAutoInterval=c/5);C||(this.tickInterval=c);return h};f.prototype.log2lin=function(c){return Math.log(c)/Math.LN10};f.prototype.lin2log=function(c){return Math.pow(10,c)}});M(I,"parts/PlotLineOrBand.js",[I["parts/Globals.js"],I["parts/Axis.js"],I["parts/Utilities.js"]],function(c,f,F){var G=F.arrayMax,z=F.arrayMin,B=F.defined,t=F.destroyObjectProperties,v=F.erase,C=F.extend,H=F.objectEach,y=F.pick,h=c.merge;c.PlotLineOrBand=function(c,h){this.axis=c;h&&(this.options=
h,this.id=h.id)};c.PlotLineOrBand.prototype={render:function(){c.fireEvent(this,"render");var f=this,q=f.axis,g=q.horiz,b=f.options,a=b.label,d=f.label,e=b.to,l=b.from,L=b.value,E=B(l)&&B(e),p=B(L),u=f.svgElem,k=!u,r=[],x=b.color,A=y(b.zIndex,0),w=b.events;r={"class":"highcharts-plot-"+(E?"band ":"line ")+(b.className||"")};var m={},K=q.chart.renderer,J=E?"bands":"lines";q.isLog&&(l=q.log2lin(l),e=q.log2lin(e),L=q.log2lin(L));q.chart.styledMode||(p?(r.stroke=x||"#999999",r["stroke-width"]=y(b.width,
1),b.dashStyle&&(r.dashstyle=b.dashStyle)):E&&(r.fill=x||"#e6ebf5",b.borderWidth&&(r.stroke=b.borderColor,r["stroke-width"]=b.borderWidth)));m.zIndex=A;J+="-"+A;(x=q.plotLinesAndBandsGroups[J])||(q.plotLinesAndBandsGroups[J]=x=K.g("plot-"+J).attr(m).add());k&&(f.svgElem=u=K.path().attr(r).add(x));if(p)r=q.getPlotLinePath({value:L,lineWidth:u.strokeWidth(),acrossPanes:b.acrossPanes});else if(E)r=q.getPlotBandPath(l,e,b);else return;(k||!u.d)&&r&&r.length?(u.attr({d:r}),w&&H(w,function(a,b){u.on(b,
function(a){w[b].apply(f,[a])})})):u&&(r?(u.show(!0),u.animate({d:r})):u.d&&(u.hide(),d&&(f.label=d=d.destroy())));a&&(B(a.text)||B(a.formatter))&&r&&r.length&&0<q.width&&0<q.height&&!r.isFlat?(a=h({align:g&&E&&"center",x:g?!E&&4:10,verticalAlign:!g&&E&&"middle",y:g?E?16:10:E?6:-4,rotation:g&&!E&&90},a),this.renderLabel(a,r,E,A)):d&&d.hide();return f},renderLabel:function(c,h,g,b){var a=this.label,d=this.axis.chart.renderer;a||(a={align:c.textAlign||c.align,rotation:c.rotation,"class":"highcharts-plot-"+
(g?"band":"line")+"-label "+(c.className||"")},a.zIndex=b,b=this.getLabelText(c),this.label=a=d.text(b,0,0,c.useHTML).attr(a).add(),this.axis.chart.styledMode||a.css(c.style));d=h.xBounds||[h[1],h[4],g?h[6]:h[1]];h=h.yBounds||[h[2],h[5],g?h[7]:h[2]];g=z(d);b=z(h);a.align(c,!1,{x:g,y:b,width:G(d)-g,height:G(h)-b});a.show(!0)},getLabelText:function(c){return B(c.formatter)?c.formatter.call(this):c.text},destroy:function(){v(this.axis.plotLinesAndBands,this);delete this.axis;t(this)}};C(f.prototype,
{getPlotBandPath:function(c,h){var g=this.getPlotLinePath({value:h,force:!0,acrossPanes:this.options.acrossPanes}),b=this.getPlotLinePath({value:c,force:!0,acrossPanes:this.options.acrossPanes}),a=[],d=this.horiz,e=1;c=c<this.min&&h<this.min||c>this.max&&h>this.max;if(b&&g){if(c){var l=b.toString()===g.toString();e=0}for(c=0;c<b.length;c+=6)d&&g[c+1]===b[c+1]?(g[c+1]+=e,g[c+4]+=e):d||g[c+2]!==b[c+2]||(g[c+2]+=e,g[c+5]+=e),a.push("M",b[c+1],b[c+2],"L",b[c+4],b[c+5],g[c+4],g[c+5],g[c+1],g[c+2],"z"),
a.isFlat=l}return a},addPlotBand:function(c){return this.addPlotBandOrLine(c,"plotBands")},addPlotLine:function(c){return this.addPlotBandOrLine(c,"plotLines")},addPlotBandOrLine:function(h,f){var g=(new c.PlotLineOrBand(this,h)).render(),b=this.userOptions;if(g){if(f){var a=b[f]||[];a.push(h);b[f]=a}this.plotLinesAndBands.push(g)}return g},removePlotBandOrLine:function(c){for(var h=this.plotLinesAndBands,g=this.options,b=this.userOptions,a=h.length;a--;)h[a].id===c&&h[a].destroy();[g.plotLines||
[],b.plotLines||[],g.plotBands||[],b.plotBands||[]].forEach(function(b){for(a=b.length;a--;)b[a].id===c&&v(b,b[a])})},removePlotBand:function(c){this.removePlotBandOrLine(c)},removePlotLine:function(c){this.removePlotBandOrLine(c)}})});M(I,"parts/Tooltip.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.discardElement,z=f.extend,B=f.isNumber,t=f.isString,v=f.pick,C=f.splat,H=f.syncTimeout;"";var y=c.doc,h=c.format,n=c.merge,q=c.timeUnits;c.Tooltip=function(){this.init.apply(this,
arguments)};c.Tooltip.prototype={init:function(c,b){this.chart=c;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=b.split&&!c.inverted;this.shared=b.shared||this.split;this.outside=v(b.outside,!(!c.scrollablePixelsX&&!c.scrollablePixelsY))},cleanSplit:function(c){this.chart.series.forEach(function(b){var a=b&&b.tt;a&&(!a.isActive||c?b.tt=a.destroy():a.isActive=!1)})},applyFilter:function(){var c=this.chart;c.renderer.definition({tagName:"filter",id:"drop-shadow-"+c.index,
opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode","in":"SourceGraphic"}]}]});c.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+c.index+"{filter:url(#drop-shadow-"+c.index+")}"})},getLabel:function(){var g=this,b=this.chart.renderer,a=this.chart.styledMode,
d=this.options,e="tooltip"+(F(d.className)?" "+d.className:""),l;if(!this.label){this.outside&&(this.container=l=c.doc.createElement("div"),l.className="highcharts-tooltip-container",c.css(l,{position:"absolute",top:"1px",pointerEvents:d.style&&d.style.pointerEvents,zIndex:3}),c.doc.body.appendChild(l),this.renderer=b=new c.Renderer(l,0,0,{},void 0,void 0,b.styledMode));this.split?this.label=b.g(e):(this.label=b.label("",0,0,d.shape||"callout",null,null,d.useHTML,null,e).attr({padding:d.padding,r:d.borderRadius}),
a||this.label.attr({fill:d.backgroundColor,"stroke-width":d.borderWidth}).css(d.style).shadow(d.shadow));a&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index));if(g.outside&&!g.split){var h={x:this.label.xSetter,y:this.label.ySetter};this.label.xSetter=function(a,b){h[b].call(this.label,g.distance);l.style.left=a+"px"};this.label.ySetter=function(a,b){h[b].call(this.label,g.distance);l.style.top=a+"px"}}this.label.attr({zIndex:8}).add()}return this.label},update:function(c){this.destroy();
n(!0,this.chart.options.tooltip.userOptions,c);this.init(this.chart,n(!0,this.options,c))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),G(this.container));c.clearTimeout(this.hideTimer);c.clearTimeout(this.tooltipTimeout)},move:function(g,b,a,d){var e=this,l=e.now,h=!1!==e.options.animation&&!e.isHidden&&(1<Math.abs(g-l.x)||1<Math.abs(b-l.y)),f=
e.followPointer||1<e.len;z(l,{x:h?(2*l.x+g)/3:g,y:h?(l.y+b)/2:b,anchorX:f?void 0:h?(2*l.anchorX+a)/3:a,anchorY:f?void 0:h?(l.anchorY+d)/2:d});e.getLabel().attr(l);h&&(c.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(g,b,a,d)},32))},hide:function(g){var b=this;c.clearTimeout(this.hideTimer);g=v(g,this.options.hideDelay,500);this.isHidden||(this.hideTimer=H(function(){b.getLabel()[g?"fadeOut":"hide"]();b.isHidden=!0},g))},getAnchor:function(c,b){var a=this.chart,
d=a.pointer,e=a.inverted,l=a.plotTop,g=a.plotLeft,h=0,p=0,f,k;c=C(c);this.followPointer&&b?(void 0===b.chartX&&(b=d.normalize(b)),c=[b.chartX-a.plotLeft,b.chartY-l]):c[0].tooltipPos?c=c[0].tooltipPos:(c.forEach(function(a){f=a.series.yAxis;k=a.series.xAxis;h+=a.plotX+(!e&&k?k.left-g:0);p+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&f?f.top-l:0)}),h/=c.length,p/=c.length,c=[e?a.plotWidth-p:h,this.shared&&!e&&1<c.length&&b?b.chartY-l:e?a.plotHeight-h:p]);return c.map(Math.round)},getPosition:function(c,
b,a){var d=this.chart,e=this.distance,l={},g=d.inverted&&a.h||0,h,p=this.outside,f=p?y.documentElement.clientWidth-2*e:d.chartWidth,k=p?Math.max(y.body.scrollHeight,y.documentElement.scrollHeight,y.body.offsetHeight,y.documentElement.offsetHeight,y.documentElement.clientHeight):d.chartHeight,r=d.pointer.getChartPosition(),x=d.containerScaling,A=function(a){return x?a*x.scaleX:a},w=function(a){return x?a*x.scaleY:a},m=function(l){var m="x"===l;return[l,m?f:k,m?c:b].concat(p?[m?A(c):w(b),m?r.left-e+
A(a.plotX+d.plotLeft):r.top-e+w(a.plotY+d.plotTop),0,m?f:k]:[m?c:b,m?a.plotX+d.plotLeft:a.plotY+d.plotTop,m?d.plotLeft:d.plotTop,m?d.plotLeft+d.plotWidth:d.plotTop+d.plotHeight])},n=m("y"),J=m("x"),q=!this.followPointer&&v(a.ttBelow,!d.inverted===!!a.negative),t=function(a,b,d,c,k,m,r){var x="y"===a?w(e):A(e),p=(d-c)/2,h=c<k-e,f=k+e+c<b,u=k-x-d+p;k=k+x-p;if(q&&f)l[a]=k;else if(!q&&h)l[a]=u;else if(h)l[a]=Math.min(r-c,0>u-g?u:u-g);else if(f)l[a]=Math.max(m,k+g+d>b?k:k+g);else return!1},C=function(a,
b,d,k,c){var m;c<e||c>b-e?m=!1:l[a]=c<d/2?1:c>b-k/2?b-k-2:c-d/2;return m},O=function(a){var b=n;n=J;J=b;h=a},D=function(){!1!==t.apply(0,n)?!1!==C.apply(0,J)||h||(O(!0),D()):h?l.x=l.y=0:(O(!0),D())};(d.inverted||1<this.len)&&O();D();return l},defaultFormatter:function(c){var b=this.points||C(this);var a=[c.tooltipFooterHeaderFormatter(b[0])];a=a.concat(c.bodyFormatter(b));a.push(c.tooltipFooterHeaderFormatter(b[0],!0));return a},refresh:function(g,b){var a=this.chart,d=this.options,e=g,l={},h=[],
f=d.formatter||this.defaultFormatter;l=this.shared;var p=a.styledMode;if(d.enabled){c.clearTimeout(this.hideTimer);this.followPointer=C(e)[0].series.tooltipOptions.followPointer;var u=this.getAnchor(e,b);b=u[0];var k=u[1];!l||e.series&&e.series.noSharedTooltip?l=e.getLabelConfig():(a.pointer.applyInactiveState(e),e.forEach(function(a){a.setState("hover");h.push(a.getLabelConfig())}),l={x:e[0].category,y:e[0].y},l.points=h,e=e[0]);this.len=h.length;a=f.call(l,this);f=e.series;this.distance=v(f.tooltipOptions.distance,
16);!1===a?this.hide():(this.split?this.renderSplit(a,C(g)):(g=this.getLabel(),d.style.width&&!p||g.css({width:this.chart.spacingBox.width}),g.attr({text:a&&a.join?a.join(""):a}),g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+v(e.colorIndex,f.colorIndex)),p||g.attr({stroke:d.borderColor||e.color||f.color||"#666666"}),this.updatePosition({plotX:b,plotY:k,negative:e.negative,ttBelow:e.ttBelow,h:u[2]||0})),this.isHidden&&this.label&&this.label.attr({opacity:1}).show(),this.isHidden=
!1);c.fireEvent(this,"refresh")}},renderSplit:function(g,b){var a=this,d=[],e=this.chart,l=e.renderer,h=!0,f=this.options,p=0,u,k=this.getLabel(),r=e.plotTop;t(g)&&(g=[!1,g]);g.slice(0,b.length+1).forEach(function(c,m){if(!1!==c&&""!==c){m=b[m-1]||{isHeader:!0,plotX:b[0].plotX,plotY:e.plotHeight};var g=m.series||a,x=g.tt,w=m.series||{},A="highcharts-color-"+v(m.colorIndex,w.colorIndex,"none");x||(x={padding:f.padding,r:f.borderRadius},e.styledMode||(x.fill=f.backgroundColor,x["stroke-width"]=f.borderWidth),
g.tt=x=l.label(null,null,null,(m.isHeader?f.headerShape:f.shape)||"callout",null,null,f.useHTML).addClass(m.isHeader?"highcharts-tooltip-header ":"highcharts-tooltip-box "+A).attr(x).add(k));x.isActive=!0;x.attr({text:c});e.styledMode||x.css(f.style).shadow(f.shadow).attr({stroke:f.borderColor||m.color||w.color||"#333333"});c=x.getBBox();A=c.width+x.strokeWidth();m.isHeader?(p=c.height,e.xAxis[0].opposite&&(u=!0,r-=p),c=Math.max(0,Math.min(m.plotX+e.plotLeft-A/2,e.chartWidth+(e.scrollablePixelsX?
e.scrollablePixelsX-e.marginRight:0)-A))):c=m.plotX+e.plotLeft-v(f.distance,16)-A;0>c&&(h=!1);m.isHeader?w=u?-p:e.plotHeight+p:(w=w.yAxis,w=w.pos-r+Math.max(0,Math.min(m.plotY||0,w.len)));d.push({target:w,rank:m.isHeader?1:0,size:g.tt.getBBox().height+1,point:m,x:c,tt:x})}});this.cleanSplit();f.positioner&&d.forEach(function(b){var d=f.positioner.call(a,b.tt.getBBox().width,b.size,b.point);b.x=d.x;b.align=0;b.target=d.y;b.rank=v(d.rank,b.rank)});c.distribute(d,e.plotHeight+p);d.forEach(function(b){var d=
b.point,c=d.series,k=c&&c.yAxis;b.tt.attr({visibility:void 0===b.pos?"hidden":"inherit",x:h||d.isHeader||f.positioner?b.x:d.plotX+e.plotLeft+a.distance,y:b.pos+r,anchorX:d.isHeader?d.plotX+e.plotLeft:d.plotX+c.xAxis.pos,anchorY:d.isHeader?e.plotTop+e.plotHeight/2:k.pos+Math.max(0,Math.min(d.plotY,k.len))})});var x=a.container;g=a.renderer;if(a.outside&&x&&g){var A=e.pointer.getChartPosition();x.style.left=A.left+"px";x.style.top=A.top+"px";x=k.getBBox();g.setSize(x.width+x.x,x.height+x.y,!1)}},updatePosition:function(g){var b=
this.chart,a=b.pointer,d=this.getLabel(),e=g.plotX+b.plotLeft,l=g.plotY+b.plotTop;a=a.getChartPosition();g=(this.options.positioner||this.getPosition).call(this,d.width,d.height,g);if(this.outside){var h=(this.options.borderWidth||0)+2*this.distance;this.renderer.setSize(d.width+h,d.height+h,!1);if(b=b.containerScaling)c.css(this.container,{transform:"scale("+b.scaleX+", "+b.scaleY+")"}),e*=b.scaleX,l*=b.scaleY;e+=a.left-g.x;l+=a.top-g.y}this.move(Math.round(g.x),Math.round(g.y||0),e,l)},getDateFormat:function(c,
b,a,d){var e=this.chart.time,l=e.dateFormat("%m-%d %H:%M:%S.%L",b),g={millisecond:15,second:12,minute:9,hour:6,day:3},h="millisecond";for(p in q){if(c===q.week&&+e.dateFormat("%w",b)===a&&"00:00:00.000"===l.substr(6)){var p="week";break}if(q[p]>c){p=h;break}if(g[p]&&l.substr(g[p])!=="01-01 00:00:00.000".substr(g[p]))break;"week"!==p&&(h=p)}if(p)var f=e.resolveDTLFormat(d[p]).main;return f},getXDateFormat:function(c,b,a){b=b.dateTimeLabelFormats;var d=a&&a.closestPointRange;return(d?this.getDateFormat(d,
c.x,a.options.startOfWeek,b):b.day)||b.year},tooltipFooterHeaderFormatter:function(g,b){var a=b?"footer":"header",d=g.series,e=d.tooltipOptions,l=e.xDateFormat,f=d.xAxis,n=f&&"datetime"===f.options.type&&B(g.key),p=e[a+"Format"];b={isFooter:b,labelConfig:g};c.fireEvent(this,"headerFormatter",b,function(a){n&&!l&&(l=this.getXDateFormat(g,e,f));n&&l&&(g.point&&g.point.tooltipDateKeys||["key"]).forEach(function(a){p=p.replace("{point."+a+"}","{point."+a+":"+l+"}")});d.chart.styledMode&&(p=this.styledModeFormat(p));
a.text=h(p,{point:g,series:d},this.chart.time)});return b.text},bodyFormatter:function(c){return c.map(function(b){var a=b.series.tooltipOptions;return(a[(b.point.formatPrefix||"point")+"Formatter"]||b.point.tooltipFormatter).call(b.point,a[(b.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(c){return c.replace('style="font-size: 10px"','class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class="highcharts-color-{$1.colorIndex}"')}}});M(I,"parts/Pointer.js",
[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.attr,G=f.defined,z=f.extend,B=f.isNumber,t=f.isObject,v=f.objectEach,C=f.pick,H=f.splat,y=c.addEvent,h=c.charts,n=c.color,q=c.css,g=c.find,b=c.fireEvent,a=c.offset,d=c.Tooltip;c.Pointer=function(a,b){this.init(a,b)};c.Pointer.prototype={init:function(a,b){this.options=b;this.chart=a;this.runChartClick=b.chart.events&&!!b.chart.events.click;this.pinchDown=[];this.lastValidTouch={};d&&(a.tooltip=new d(a,b.tooltip),this.followTouchMove=
C(b.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,d=b.options.chart,e=d.zoomType||"";b=b.inverted;/touch/.test(a.type)&&(e=C(d.pinchType,e));this.zoomX=a=/x/.test(e);this.zoomY=e=/y/.test(e);this.zoomHor=a&&!b||e&&b;this.zoomVert=e&&!b||a&&b;this.hasZoom=a||e},getChartPosition:function(){return this.chartPosition||(this.chartPosition=a(this.chart.container))},normalize:function(a,b){var d=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:
a;b||(b=this.getChartPosition());var e=d.pageX-b.left;b=d.pageY-b.top;if(d=this.chart.containerScaling)e/=d.scaleX,b/=d.scaleY;return z(a,{chartX:Math.round(e),chartY:Math.round(b)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(d){b[d.isXAxis?"xAxis":"yAxis"].push({axis:d,value:d.toValue(a[d.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,d){var e;a.forEach(function(a){var c=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");
a=a.searchPoint(d,c);if((c=t(a,!0))&&!(c=!t(e,!0))){c=e.distX-a.distX;var k=e.dist-a.dist,l=(a.series.group&&a.series.group.zIndex)-(e.series.group&&e.series.group.zIndex);c=0<(0!==c&&b?c:0!==k?k:0!==l?l:e.series.index>a.series.index?-1:1)}c&&(e=a)});return e},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var d=a.series,e=d.xAxis;d=d.yAxis;var c=C(a.clientX,a.plotX),l=a.shapeArgs;if(e&&d)return b?{chartX:e.len+
e.pos-c,chartY:d.len+d.pos-a.plotY}:{chartX:c+e.pos,chartY:a.plotY+d.pos};if(l&&l.x&&l.y)return{chartX:l.x,chartY:l.y}},getHoverData:function(a,b,d,c,h,f){var e,l=[];c=!(!c||!a);var x=b&&!b.stickyTracking?[b]:d.filter(function(a){return a.visible&&!(!h&&a.directTouch)&&C(a.options.enableMouseTracking,!0)&&a.stickyTracking});b=(e=c||!f?a:this.findNearestKDPoint(x,h,f))&&e.series;e&&(h&&!b.noSharedTooltip?(x=d.filter(function(a){return a.visible&&!(!h&&a.directTouch)&&C(a.options.enableMouseTracking,
!0)&&!a.noSharedTooltip}),x.forEach(function(a){var b=g(a.points,function(a){return a.x===e.x&&!a.isNull});t(b)&&(a.chart.isBoosting&&(b=a.getPoint(b)),l.push(b))})):l.push(e));return{hoverPoint:e,hoverSeries:b,hoverPoints:l}},runPointActions:function(a,b){var d=this.chart,e=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,l=e?e.shared:!1,g=b||d.hoverPoint,k=g&&g.series||d.hoverSeries;k=this.getHoverData(g,k,d.series,(!a||"touchmove"!==a.type)&&(!!b||k&&k.directTouch&&this.isDirectTouch),l,a);
g=k.hoverPoint;var r=k.hoverPoints;b=(k=k.hoverSeries)&&k.tooltipOptions.followPointer;l=l&&k&&!k.noSharedTooltip;if(g&&(g!==d.hoverPoint||e&&e.isHidden)){(d.hoverPoints||[]).forEach(function(a){-1===r.indexOf(a)&&a.setState()});if(d.hoverSeries!==k)k.onMouseOver();this.applyInactiveState(r);(r||[]).forEach(function(a){a.setState("hover")});d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!g.series)return;g.firePointEvent("mouseOver");d.hoverPoints=r;d.hoverPoint=g;e&&e.refresh(l?r:g,a)}else b&&
e&&!e.isHidden&&(g=e.getAnchor([{}],a),e.updatePosition({plotX:g[0],plotY:g[1]}));this.unDocMouseMove||(this.unDocMouseMove=y(d.container.ownerDocument,"mousemove",function(a){var b=h[c.hoverChartIndex];if(b)b.pointer.onDocumentMouseMove(a)}));d.axes.forEach(function(b){var d=C(b.crosshair.snap,!0),e=d?c.find(r,function(a){return a.series[b.coll]===b}):void 0;e||!d?b.drawCrosshair(a,e):b.hideCrosshair()})},applyInactiveState:function(a){var b=[],d;(a||[]).forEach(function(a){d=a.series;b.push(d);
d.linkedParent&&b.push(d.linkedParent);d.linkedSeries&&(b=b.concat(d.linkedSeries));d.navigatorSeries&&b.push(d.navigatorSeries)});this.chart.series.forEach(function(a){-1===b.indexOf(a)?a.setState("inactive",!0):a.options.inactiveOtherPoints&&a.setAllPointsToState("inactive")})},reset:function(a,b){var d=this.chart,e=d.hoverSeries,c=d.hoverPoint,g=d.hoverPoints,k=d.tooltip,l=k&&k.shared?g:c;a&&l&&H(l).forEach(function(b){b.series.isCartesian&&void 0===b.plotX&&(a=!1)});if(a)k&&l&&H(l).length&&(k.refresh(l),
k.shared&&g?g.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):c&&(c.setState(c.state,!0),d.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,c)})));else{if(c)c.onMouseOut();g&&g.forEach(function(a){a.setState()});if(e)e.onMouseOut();k&&k.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());d.axes.forEach(function(a){a.hideCrosshair()});
this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,b){var d=this.chart,e;d.series.forEach(function(c){e=a||c.getPlotBox();c.xAxis&&c.xAxis.zoomEnabled&&c.group&&(c.group.attr(e),c.markerGroup&&(c.markerGroup.attr(e),c.markerGroup.clip(b?d.clipRect:null)),c.dataLabelsGroup&&c.dataLabelsGroup.attr(e))});d.clipRect.attr(b||d.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},
drag:function(a){var b=this.chart,d=b.options.chart,e=a.chartX,c=a.chartY,g=this.zoomHor,k=this.zoomVert,r=b.plotLeft,h=b.plotTop,A=b.plotWidth,w=b.plotHeight,m=this.selectionMarker,f=this.mouseDownX,J=this.mouseDownY,v=d.panKey&&a[d.panKey+"Key"];if(!m||!m.touch)if(e<r?e=r:e>r+A&&(e=r+A),c<h?c=h:c>h+w&&(c=h+w),this.hasDragged=Math.sqrt(Math.pow(f-e,2)+Math.pow(J-c,2)),10<this.hasDragged){var q=b.isInsidePlot(f-r,J-h);b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&q&&!v&&!m&&(this.selectionMarker=
m=b.renderer.rect(r,h,g?1:A,k?1:w,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),b.styledMode||m.attr({fill:d.selectionMarkerFill||n("#335cad").setOpacity(.25).get()}));m&&g&&(e-=f,m.attr({width:Math.abs(e),x:(0<e?0:e)+f}));m&&k&&(e=c-J,m.attr({height:Math.abs(e),y:(0<e?0:e)+J}));q&&!m&&d.panning&&b.pan(a,d.panning)}},drop:function(a){var d=this,e=this.chart,c=this.hasPinched;if(this.selectionMarker){var g={originalEvent:a,xAxis:[],yAxis:[]},h=this.selectionMarker,k=h.attr?h.attr("x"):
h.x,r=h.attr?h.attr("y"):h.y,x=h.attr?h.attr("width"):h.width,A=h.attr?h.attr("height"):h.height,w;if(this.hasDragged||c)e.axes.forEach(function(b){if(b.zoomEnabled&&G(b.min)&&(c||d[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var e=b.horiz,m="touchend"===a.type?b.minPixelPadding:0,l=b.toValue((e?k:r)+m);e=b.toValue((e?k+x:r+A)-m);g[b.coll].push({axis:b,min:Math.min(l,e),max:Math.max(l,e)});w=!0}}),w&&b(e,"selection",g,function(a){e.zoom(z(a,c?{animation:!1}:null))});B(e.index)&&(this.selectionMarker=
this.selectionMarker.destroy());c&&this.scaleGroups()}e&&B(e.index)&&(q(e.container,{cursor:e._cursor}),e.cancelClick=10<this.hasDragged,e.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(a){h[c.hoverChartIndex]&&h[c.hoverChartIndex].pointer.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,d=this.chartPosition;
a=this.normalize(a,d);!d||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(a){var b=h[c.hoverChartIndex];b&&(a.relatedTarget||a.toElement)&&(b.pointer.reset(),b.pointer.chartPosition=void 0)},onContainerMouseMove:function(a){var b=this.chart;G(c.hoverChartIndex)&&h[c.hoverChartIndex]&&h[c.hoverChartIndex].mouseIsDown||(c.hoverChartIndex=b.index);a=this.normalize(a);a.preventDefault||(a.returnValue=!1);
"mousedown"===b.mouseIsDown&&this.drag(a);!this.inClass(a.target,"highcharts-tracker")&&!b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||b.openMenu||this.runPointActions(a)},inClass:function(a,b){for(var d;a;){if(d=F(a,"class")){if(-1!==d.indexOf(b))return!0;if(-1!==d.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||
this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var d=this.chart,e=d.hoverPoint,c=d.plotLeft,g=d.plotTop;a=this.normalize(a);d.cancelClick||(e&&this.inClass(a.target,"highcharts-tracker")?(b(e.series,"click",z(a,{point:e})),d.hoverPoint&&e.firePointEvent("click",a)):(z(a,this.getCoordinates(a)),d.isInsidePlot(a.chartX-c,a.chartY-g)&&b(d,"click",a)))},setDOMEvents:function(){var a=this,b=a.chart.container,d=b.ownerDocument;
b.onmousedown=function(b){a.onContainerMouseDown(b)};b.onmousemove=function(b){a.onContainerMouseMove(b)};b.onclick=function(b){a.onContainerClick(b)};this.unbindContainerMouseLeave=y(b,"mouseleave",a.onContainerMouseLeave);c.unbindDocumentMouseUp||(c.unbindDocumentMouseUp=y(d,"mouseup",a.onDocumentMouseUp));c.hasTouch&&(y(b,"touchstart",function(b){a.onContainerTouchStart(b)}),y(b,"touchmove",function(b){a.onContainerTouchMove(b)}),c.unbindDocumentTouchEnd||(c.unbindDocumentTouchEnd=y(d,"touchend",
a.onDocumentTouchEnd)))},destroy:function(){var a=this;a.unDocMouseMove&&a.unDocMouseMove();this.unbindContainerMouseLeave();c.chartCount||(c.unbindDocumentMouseUp&&(c.unbindDocumentMouseUp=c.unbindDocumentMouseUp()),c.unbindDocumentTouchEnd&&(c.unbindDocumentTouchEnd=c.unbindDocumentTouchEnd()));clearInterval(a.tooltipTimeout);v(a,function(b,d){a[d]=null})}}});M(I,"parts/TouchPointer.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.extend,G=f.pick,z=c.charts,B=c.noop;F(c.Pointer.prototype,
{pinchTranslate:function(c,f,C,B,y,h){this.zoomHor&&this.pinchTranslateDirection(!0,c,f,C,B,y,h);this.zoomVert&&this.pinchTranslateDirection(!1,c,f,C,B,y,h)},pinchTranslateDirection:function(c,f,C,B,y,h,n,q){var g=this.chart,b=c?"x":"y",a=c?"X":"Y",d="chart"+a,e=c?"width":"height",l=g["plot"+(c?"Left":"Top")],v,t,p=q||1,u=g.inverted,k=g.bounds[c?"h":"v"],r=1===f.length,x=f[0][d],A=C[0][d],w=!r&&f[1][d],m=!r&&C[1][d];C=function(){!r&&20<Math.abs(x-w)&&(p=q||Math.abs(A-m)/Math.abs(x-w));t=(l-A)/p+x;
v=g["plot"+(c?"Width":"Height")]/p};C();f=t;if(f<k.min){f=k.min;var K=!0}else f+v>k.max&&(f=k.max-v,K=!0);K?(A-=.8*(A-n[b][0]),r||(m-=.8*(m-n[b][1])),C()):n[b]=[A,m];u||(h[b]=t-l,h[e]=v);h=u?1/p:p;y[e]=v;y[b]=f;B[u?c?"scaleY":"scaleX":"scale"+a]=p;B["translate"+a]=h*l+(A-h*x)},pinch:function(c){var f=this,t=f.chart,z=f.pinchDown,y=c.touches,h=y.length,n=f.lastValidTouch,q=f.hasZoom,g=f.selectionMarker,b={},a=1===h&&(f.inClass(c.target,"highcharts-tracker")&&t.runTrackerClick||f.runChartClick),d={};
1<h&&(f.initiated=!0);q&&f.initiated&&!a&&c.preventDefault();[].map.call(y,function(a){return f.normalize(a)});"touchstart"===c.type?([].forEach.call(y,function(a,b){z[b]={chartX:a.chartX,chartY:a.chartY}}),n.x=[z[0].chartX,z[1]&&z[1].chartX],n.y=[z[0].chartY,z[1]&&z[1].chartY],t.axes.forEach(function(a){if(a.zoomEnabled){var b=t.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(Math.min(G(a.options.min,a.dataMin),a.dataMin)),c=a.toPixels(Math.max(G(a.options.max,a.dataMax),a.dataMax)),g=Math.max(e,
c);b.min=Math.min(a.pos,Math.min(e,c)-d);b.max=Math.max(a.pos+a.len,g+d)}}),f.res=!0):f.followTouchMove&&1===h?this.runPointActions(f.normalize(c)):z.length&&(g||(f.selectionMarker=g=F({destroy:B,touch:!0},t.plotBox)),f.pinchTranslate(z,y,b,g,d,n),f.hasPinched=q,f.scaleGroups(b,d),f.res&&(f.res=!1,this.reset(!1,0)))},touch:function(f,v){var t=this.chart,z;if(t.index!==c.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});c.hoverChartIndex=t.index;if(1===f.touches.length)if(f=this.normalize(f),
(z=t.isInsidePlot(f.chartX-t.plotLeft,f.chartY-t.plotTop))&&!t.openMenu){v&&this.runPointActions(f);if("touchmove"===f.type){v=this.pinchDown;var y=v[0]?4<=Math.sqrt(Math.pow(v[0].chartX-f.chartX,2)+Math.pow(v[0].chartY-f.chartY,2)):!1}G(y,!0)&&this.pinch(f)}else v&&this.reset();else 2===f.touches.length&&this.pinch(f)},onContainerTouchStart:function(c){this.zoomOption(c);this.touch(c,!0)},onContainerTouchMove:function(c){this.touch(c)},onDocumentTouchEnd:function(f){z[c.hoverChartIndex]&&z[c.hoverChartIndex].pointer.drop(f)}})});
M(I,"parts/MSPointer.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.extend,G=f.objectEach,z=c.addEvent,B=c.charts,t=c.css,v=c.doc,C=c.noop;f=c.Pointer;var H=c.removeEvent,y=c.win,h=c.wrap;if(!c.hasTouch&&(y.PointerEvent||y.MSPointerEvent)){var n={},q=!!y.PointerEvent,g=function(){var a=[];a.item=function(a){return this[a]};G(n,function(b){a.push({pageX:b.pageX,pageY:b.pageY,target:b.target})});return a},b=function(a,b,e,l){"touch"!==a.pointerType&&a.pointerType!==a.MSPOINTER_TYPE_TOUCH||
!B[c.hoverChartIndex]||(l(a),l=B[c.hoverChartIndex].pointer,l[b]({type:e,target:a.currentTarget,preventDefault:C,touches:g()}))};F(f.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",function(a){n[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){n[a.pointerId]={pageX:a.pageX,pageY:a.pageY};n[a.pointerId].target||(n[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,
"onDocumentTouchEnd","touchend",function(a){delete n[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,q?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,q?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(v,q?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});h(f.prototype,"init",function(a,b,e){a.call(this,b,e);this.hasZoom&&t(b.container,{"-ms-touch-action":"none","touch-action":"none"})});h(f.prototype,"setDOMEvents",function(a){a.apply(this);
(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(z)});h(f.prototype,"destroy",function(a){this.batchMSEvents(H);a.call(this)})}});M(I,"parts/Legend.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.discardElement,z=f.isNumber,B=f.pick,t=f.setAnimation,v=c.addEvent,C=c.css,H=c.fireEvent;f=c.isFirefox;var y=c.marginNames,h=c.merge,n=c.stableSort,q=c.win,g=c.wrap;c.Legend=function(b,a){this.init(b,a)};c.Legend.prototype={init:function(b,a){this.chart=b;this.setOptions(a);
a.enabled&&(this.render(),v(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=v(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&this.unchartrender())},setOptions:function(b){var a=B(b.padding,8);this.options=b;this.chart.styledMode||(this.itemStyle=b.itemStyle,this.itemHiddenStyle=h(this.itemStyle,b.itemHiddenStyle));this.itemMarginTop=b.itemMarginTop||0;this.itemMarginBottom=b.itemMarginBottom||
0;this.padding=a;this.initialItemY=a-5;this.symbolWidth=B(b.symbolWidth,16);this.pages=[];this.proximate="proximate"===b.layout&&!this.chart.inverted},update:function(b,a){var d=this.chart;this.setOptions(h(!0,this.options,b));this.destroy();d.isDirtyLegend=d.isDirtyBox=!0;B(a,!0)&&d.redraw();H(this,"afterUpdate")},colorizeItem:function(b,a){b.legendGroup[a?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var d=this.options,e=b.legendItem,c=b.legendLine,g=b.legendSymbol,
h=this.itemHiddenStyle.color;d=a?d.itemStyle.color:h;var f=a?b.color||h:h,u=b.options&&b.options.marker,k={fill:f};e&&e.css({fill:d,color:d});c&&c.attr({stroke:f});g&&(u&&g.isMarker&&(k=b.pointAttribs(),a||(k.stroke=k.fill=h)),g.attr(k))}H(this,"afterColorizeItem",{item:b,visible:a})},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(b){var a=this.options,d=a.symbolPadding;a=!a.rtl;var e=b._legendItemPos,
c=e[0];e=e[1];var g=b.checkbox;if((b=b.legendGroup)&&b.element)b[F(b.translateY)?"animate":"attr"]({translateX:a?c:this.legendWidth-c-2*d-4,translateY:e});g&&(g.x=c,g.y=e)},destroyItem:function(b){var a=b.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(a){b[a]&&(b[a]=b[a].destroy())});a&&G(b.checkbox)},destroy:function(){function b(a){this[a]&&(this[a]=this[a].destroy())}this.getAllItems().forEach(function(a){["legendItem","legendGroup"].forEach(b,a)});"clipRect up down pager nav box title group".split(" ").forEach(b,
this);this.display=null},positionCheckboxes:function(){var b=this.group&&this.group.alignAttr,a=this.clipHeight||this.legendHeight,d=this.titleHeight;if(b){var e=b.translateY;this.allItems.forEach(function(c){var g=c.checkbox;if(g){var l=e+d+g.y+(this.scrollOffset||0)+3;C(g,{left:b.translateX+c.checkboxOffset+g.x-20+"px",top:l+"px",display:this.proximate||l>e-6&&l<e+a-6?"":"none"})}},this)}},renderTitle:function(){var b=this.options,a=this.padding,d=b.title,e=0;d.text&&(this.title||(this.title=this.chart.renderer.label(d.text,
a-3,a-4,null,null,null,b.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(d.style),this.title.add(this.group)),d.width||this.title.css({width:this.maxLegendWidth+"px"}),b=this.title.getBBox(),e=b.height,this.offsetWidth=b.width,this.contentGroup.attr({translateY:e}));this.titleHeight=e},setText:function(b){var a=this.options;b.legendItem.attr({text:a.labelFormat?c.format(a.labelFormat,b,this.chart.time):a.labelFormatter.call(b)})},renderItem:function(b){var a=this.chart,
d=a.renderer,e=this.options,c=this.symbolWidth,g=e.symbolPadding,f=this.itemStyle,p=this.itemHiddenStyle,u="horizontal"===e.layout?B(e.itemDistance,20):0,k=!e.rtl,r=b.legendItem,x=!b.series,A=!x&&b.series.drawLegendSymbol?b.series:b,w=A.options;w=this.createCheckboxForItem&&w&&w.showCheckbox;u=c+g+u+(w?20:0);var m=e.useHTML,n=b.options.className;r||(b.legendGroup=d.g("legend-item").addClass("highcharts-"+A.type+"-series highcharts-color-"+b.colorIndex+(n?" "+n:"")+(x?" highcharts-series-"+b.index:
"")).attr({zIndex:1}).add(this.scrollGroup),b.legendItem=r=d.text("",k?c+g:-g,this.baseline||0,m),a.styledMode||r.css(h(b.visible?f:p)),r.attr({align:k?"left":"right",zIndex:2}).add(b.legendGroup),this.baseline||(this.fontMetrics=d.fontMetrics(a.styledMode?12:f.fontSize,r),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,r.attr("y",this.baseline)),this.symbolHeight=e.symbolHeight||this.fontMetrics.f,A.drawLegendSymbol(this,b),this.setItemEvents&&this.setItemEvents(b,r,m));w&&!b.checkbox&&this.createCheckboxForItem(b);
this.colorizeItem(b,b.visible);!a.styledMode&&f.width||r.css({width:(e.itemWidth||this.widthOption||a.spacingBox.width)-u});this.setText(b);a=r.getBBox();b.itemWidth=b.checkboxOffset=e.itemWidth||b.legendItemWidth||a.width+u;this.maxItemWidth=Math.max(this.maxItemWidth,b.itemWidth);this.totalItemWidth+=b.itemWidth;this.itemHeight=b.itemHeight=Math.round(b.legendItemHeight||a.height||this.symbolHeight)},layoutItem:function(b){var a=this.options,d=this.padding,e="horizontal"===a.layout,c=b.itemHeight,
g=this.itemMarginBottom,h=this.itemMarginTop,f=e?B(a.itemDistance,20):0,u=this.maxLegendWidth;a=a.alignColumns&&this.totalItemWidth>u?this.maxItemWidth:b.itemWidth;e&&this.itemX-d+a>u&&(this.itemX=d,this.lastLineHeight&&(this.itemY+=h+this.lastLineHeight+g),this.lastLineHeight=0);this.lastItemY=h+this.itemY+g;this.lastLineHeight=Math.max(c,this.lastLineHeight);b._legendItemPos=[this.itemX,this.itemY];e?this.itemX+=a:(this.itemY+=h+c+g,this.lastLineHeight=c);this.offsetWidth=this.widthOption||Math.max((e?
this.itemX-d-(b.checkbox?0:f):a)+d,this.offsetWidth)},getAllItems:function(){var b=[];this.chart.series.forEach(function(a){var d=a&&a.options;a&&B(d.showInLegend,F(d.linkedTo)?!1:void 0,!0)&&(b=b.concat(a.legendItems||("point"===d.legendType?a.data:a)))});H(this,"afterGetAllItems",{allItems:b});return b},getAlignment:function(){var b=this.options;return this.proximate?b.align.charAt(0)+"tv":b.floating?"":b.align.charAt(0)+b.verticalAlign.charAt(0)+b.layout.charAt(0)},adjustMargins:function(b,a){var d=
this.chart,e=this.options,c=this.getAlignment();c&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(g,l){g.test(c)&&!F(b[l])&&(d[y[l]]=Math.max(d[y[l]],d.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*e[l%2?"x":"y"]+B(e.margin,12)+a[l]+(d.titleOffset[l]||0)))})},proximatePositions:function(){var b=this.chart,a=[],d="left"===this.options.align;this.allItems.forEach(function(e){var g=d;if(e.yAxis&&e.points){e.xAxis.options.reversed&&(g=!g);var h=c.find(g?e.points:
e.points.slice(0).reverse(),function(a){return z(a.plotY)});g=this.itemMarginTop+e.legendItem.getBBox().height+this.itemMarginBottom;var f=e.yAxis.top-b.plotTop;e.visible?(h=h?h.plotY:e.yAxis.height,h+=f-.3*g):h=f+e.yAxis.height;a.push({target:h,size:g,item:e})}},this);c.distribute(a,b.plotHeight);a.forEach(function(a){a.item._legendItemPos[1]=b.plotTop-b.spacing[0]+a.pos})},render:function(){var b=this.chart,a=b.renderer,d=this.group,e,g=this.box,f=this.options,q=this.padding;this.itemX=q;this.itemY=
this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=c.relativeLength(f.width,b.spacingBox.width-q);var p=b.spacingBox.width-2*q-f.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,2))&&(p/=2);this.maxLegendWidth=this.widthOption||p;d||(this.group=d=a.g("legend").attr({zIndex:7}).add(),this.contentGroup=a.g().attr({zIndex:1}).add(d),this.scrollGroup=a.g().add(this.contentGroup));this.renderTitle();p=this.getAllItems();n(p,function(a,b){return(a.options&&a.options.legendIndex||
0)-(b.options&&b.options.legendIndex||0)});f.reversed&&p.reverse();this.allItems=p;this.display=e=!!p.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;p.forEach(this.renderItem,this);p.forEach(this.layoutItem,this);p=(this.widthOption||this.offsetWidth)+q;var u=this.lastItemY+this.lastLineHeight+this.titleHeight;u=this.handleOverflow(u);u+=q;g||(this.box=g=a.rect().addClass("highcharts-legend-box").attr({r:f.borderRadius}).add(d),g.isNew=!0);b.styledMode||g.attr({stroke:f.borderColor,
"stroke-width":f.borderWidth||0,fill:f.backgroundColor||"none"}).shadow(f.shadow);0<p&&0<u&&(g[g.isNew?"attr":"animate"](g.crisp.call({},{x:0,y:0,width:p,height:u},g.strokeWidth())),g.isNew=!1);g[e?"show":"hide"]();b.styledMode&&"none"===d.getStyle("display")&&(p=u=0);this.legendWidth=p;this.legendHeight=u;e&&(a=b.spacingBox,g=a.y,/(lth|ct|rth)/.test(this.getAlignment())&&0<b.titleOffset[0]?g+=b.titleOffset[0]:/(lbh|cb|rbh)/.test(this.getAlignment())&&0<b.titleOffset[2]&&(g-=b.titleOffset[2]),g!==
a.y&&(a=h(a,{y:g})),d.align(h(f,{width:p,height:u,verticalAlign:this.proximate?"top":f.verticalAlign}),!0,a));this.proximate||this.positionItems();H(this,"afterRender")},handleOverflow:function(b){var a=this,d=this.chart,e=d.renderer,c=this.options,g=c.y,h=this.padding;g=d.spacingBox.height+("top"===c.verticalAlign?-g:g)-h;var f=c.maxHeight,u,k=this.clipRect,r=c.navigation,x=B(r.animation,!0),A=r.arrowSize||12,w=this.nav,m=this.pages,n,J=this.allItems,q=function(b){"number"===typeof b?k.attr({height:b}):
k&&(a.clipRect=k.destroy(),a.contentGroup.clip());a.contentGroup.div&&(a.contentGroup.div.style.clip=b?"rect("+h+"px,9999px,"+(h+b)+"px,0)":"auto")},v=function(b){a[b]=e.circle(0,0,1.3*A).translate(A/2,A/2).add(w);d.styledMode||a[b].attr("fill","rgba(0,0,0,0.0001)");return a[b]};"horizontal"!==c.layout||"middle"===c.verticalAlign||c.floating||(g/=2);f&&(g=Math.min(g,f));m.length=0;b>g&&!1!==r.enabled?(this.clipHeight=u=Math.max(g-20-this.titleHeight-h,0),this.currentPage=B(this.currentPage,1),this.fullHeight=
b,J.forEach(function(a,b){var d=a._legendItemPos[1],e=Math.round(a.legendItem.getBBox().height),c=m.length;if(!c||d-m[c-1]>u&&(n||d)!==m[c-1])m.push(n||d),c++;a.pageIx=c-1;n&&(J[b-1].pageIx=c-1);b===J.length-1&&d+e-m[c-1]>u&&d!==n&&(m.push(d),a.pageIx=c);d!==n&&(n=d)}),k||(k=a.clipRect=e.clipRect(0,h,9999,0),a.contentGroup.clip(k)),q(u),w||(this.nav=w=e.g().attr({zIndex:1}).add(this.group),this.up=e.symbol("triangle",0,0,A,A).add(w),v("upTracker").on("click",function(){a.scroll(-1,x)}),this.pager=
e.text("",15,10).addClass("highcharts-legend-navigation"),d.styledMode||this.pager.css(r.style),this.pager.add(w),this.down=e.symbol("triangle-down",0,0,A,A).add(w),v("downTracker").on("click",function(){a.scroll(1,x)})),a.scroll(0),b=g):w&&(q(),this.nav=w.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return b},scroll:function(b,a){var d=this.pages,e=d.length,c=this.currentPage+b;b=this.clipHeight;var g=this.options.navigation,h=this.pager,f=this.padding;c>e&&(c=e);0<c&&(void 0!==
a&&t(a,this.chart),this.nav.attr({translateX:f,translateY:b+this.padding+7+this.titleHeight,visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===c?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),h.attr({text:c+"/"+e}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":c===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),this.chart.styledMode||(this.up.attr({fill:1===c?g.inactiveColor:
g.activeColor}),this.upTracker.css({cursor:1===c?"default":"pointer"}),this.down.attr({fill:c===e?g.inactiveColor:g.activeColor}),this.downTracker.css({cursor:c===e?"default":"pointer"})),this.scrollOffset=-d[c-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=c,this.positionCheckboxes())}};c.LegendSymbolMixin={drawRectangle:function(b,a){var d=b.symbolHeight,e=b.options.squareSymbol;a.legendSymbol=this.chart.renderer.rect(e?(b.symbolWidth-d)/2:0,b.baseline-
d+1,e?d:b.symbolWidth,d,B(b.options.symbolRadius,d/2)).addClass("highcharts-point").attr({zIndex:3}).add(a.legendGroup)},drawLineMarker:function(b){var a=this.options,d=a.marker,e=b.symbolWidth,c=b.symbolHeight,g=c/2,f=this.chart.renderer,p=this.legendGroup;b=b.baseline-Math.round(.3*b.fontMetrics.b);var u={};this.chart.styledMode||(u={"stroke-width":a.lineWidth||0},a.dashStyle&&(u.dashstyle=a.dashStyle));this.legendLine=f.path(["M",0,b,"L",e,b]).addClass("highcharts-graph").attr(u).add(p);d&&!1!==
d.enabled&&e&&(a=Math.min(B(d.radius,g),g),0===this.symbol.indexOf("url")&&(d=h(d,{width:c,height:c}),a=0),this.legendSymbol=d=f.symbol(this.symbol,e/2-a,b-a,2*a,2*a,d).addClass("highcharts-point").add(p),d.isMarker=!0)}};(/Trident\/7\.0/.test(q.navigator&&q.navigator.userAgent)||f)&&g(c.Legend.prototype,"positionItem",function(b,a){var d=this,e=function(){a._legendItemPos&&b.call(d,a)};e();d.bubbleLegend||setTimeout(e)})});M(I,"parts/Chart.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,
f){var F=f.attr,G=f.defined,z=f.discardElement,B=f.erase,t=f.extend,v=f.isArray,C=f.isNumber,H=f.isObject,y=f.isString,h=f.objectEach,n=f.pick,q=f.pInt,g=f.setAnimation,b=f.splat,a=f.syncTimeout,d=c.addEvent,e=c.animate,l=c.animObject,L=c.doc,E=c.Axis,p=c.createElement,u=c.defaultOptions,k=c.charts,r=c.css,x=c.find,A=c.fireEvent,w=c.Legend,m=c.marginNames,K=c.merge,J=c.Pointer,U=c.removeEvent,S=c.seriesTypes,Q=c.win,O=c.Chart=function(){this.getArgs.apply(this,arguments)};c.chart=function(a,b,d){return new O(a,
b,d)};t(O.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(y(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(a,b){var e,g=a.series,m=a.plotOptions||{};A(this,"init",{args:arguments},function(){a.series=null;e=K(u,a);h(e.plotOptions,function(a,b){H(a)&&(a.tooltip=m[b]&&K(m[b].tooltip)||void 0)});e.tooltip.userOptions=a.chart&&a.chart.forExport&&a.tooltip.userOptions||a.tooltip;e.series=a.series=g;this.userOptions=a;var r=e.chart,l=r.events;
this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=b;this.isResizing=0;this.options=e;this.axes=[];this.series=[];this.time=a.time&&Object.keys(a.time).length?new c.Time(a.time):c.time;this.styledMode=r.styledMode;this.hasCartesianSeries=r.showAxes;var f=this;f.index=k.length;k.push(f);c.chartCount++;l&&h(l,function(a,b){c.isFunction(a)&&d(f,b,a)});f.xAxis=[];f.yAxis=[];f.pointCount=f.colorCounter=f.symbolCounter=0;A(f,"afterInit");f.firstRender()})},initSeries:function(a){var b=
this.options.chart;b=a.type||b.type||b.defaultSeriesType;var d=S[b];d||c.error(17,!0,this,{missingModuleFor:b});b=new d;b.init(this,a);return b},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},isInsidePlot:function(a,b,d){var e=d?b:a;a=d?a:b;return 0<=e&&e<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(a){A(this,"beforeRedraw");var b=this.axes,d=this.series,e=this.pointer,c=this.legend,k=this.userOptions.legend,m=this.isDirtyLegend,
r=this.hasCartesianSeries,h=this.isDirtyBox,l=this.renderer,f=l.isHidden(),x=[];this.setResponsive&&this.setResponsive(!1);g(a,this);f&&this.temporaryDisplay();this.layOutTitles();for(a=d.length;a--;){var w=d[a];if(w.options.stacking){var p=!0;if(w.isDirty){var u=!0;break}}}if(u)for(a=d.length;a--;)w=d[a],w.options.stacking&&(w.isDirty=!0);d.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),m=!0):k&&(k.labelFormatter||k.labelFormat)&&(m=!0));a.isDirtyData&&
A(a,"updatedData")});m&&c&&c.options.enabled&&(c.render(),this.isDirtyLegend=!1);p&&this.getStacks();r&&b.forEach(function(a){a.updateNames();a.setScale()});this.getMargins();r&&(b.forEach(function(a){a.isDirty&&(h=!0)}),b.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,x.push(function(){A(a,"afterSetExtremes",t(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(h||p)&&a.redraw()}));h&&this.drawChartBox();A(this,"predraw");d.forEach(function(a){(h||a.isDirty)&&a.visible&&a.redraw();
a.isDirtyData=!1});e&&e.reset(!0);l.draw();A(this,"redraw");A(this,"render");f&&this.temporaryDisplay(!0);x.forEach(function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var d=this.series,e;var c=x(this.axes,b)||x(this.series,b);for(e=0;!c&&e<d.length;e++)c=x(d[e].points||[],b);return c},getAxes:function(){var a=this,d=this.options,e=d.xAxis=b(d.xAxis||{});d=d.yAxis=b(d.yAxis||{});A(this,"getAxes");e.forEach(function(a,b){a.index=b;a.isX=!0});d.forEach(function(a,
b){a.index=b});e.concat(d).forEach(function(b){new E(a,b)});A(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];this.series.forEach(function(b){a=a.concat((b[b.hasGroupedData?"points":"data"]||[]).filter(function(a){return n(a.selectedStaging,a.selected)}))});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},setTitle:function(a,b,d){this.applyDescription("title",a);this.applyDescription("subtitle",b);this.applyDescription("caption",void 0);
this.layOutTitles(d)},applyDescription:function(a,b){var d=this,e="title"===a?{color:"#333333",fontSize:this.options.isStock?"16px":"18px"}:{color:"#666666"};e=this.options[a]=K(!this.styledMode&&{style:e},this.options[a],b);var c=this[a];c&&b&&(this[a]=c=c.destroy());e&&!c&&(c=this.renderer.text(e.text,0,0,e.useHTML).attr({align:e.align,"class":"highcharts-"+a,zIndex:e.zIndex||4}).add(),c.update=function(b){d[{title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"}[a]](b)},this.styledMode||
c.css(e.style),this[a]=c)},layOutTitles:function(a){var b=[0,0,0],d=this.renderer,e=this.spacingBox;["title","subtitle","caption"].forEach(function(a){var c=this[a],k=this.options[a],g=k.verticalAlign||"top";a="title"===a?-3:"top"===g?b[0]+2:0;if(c){if(!this.styledMode)var m=k.style.fontSize;m=d.fontMetrics(m,c).b;c.css({width:(k.width||e.width+(k.widthAdjust||0))+"px"});var r=Math.round(c.getBBox(k.useHTML).height);c.align(t({y:"bottom"===g?m:a+m,height:r},k),!1,"spacingBox");k.floating||("top"===
g?b[0]=Math.ceil(b[0]+r):"bottom"===g&&(b[2]=Math.ceil(b[2]+r)))}},this);b[0]&&"top"===(this.options.title.verticalAlign||"top")&&(b[0]+=this.options.title.margin);b[2]&&"bottom"===this.options.caption.verticalAlign&&(b[2]+=this.options.caption.margin);var c=!this.titleOffset||this.titleOffset.join(",")!==b.join(",");this.titleOffset=b;A(this,"afterLayOutTitles");!this.isDirtyBox&&c&&(this.isDirtyBox=this.isDirtyLegend=c,this.hasRendered&&n(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var a=
this.options.chart,b=a.width;a=a.height;var d=this.renderTo;G(b)||(this.containerWidth=c.getStyle(d,"width"));G(a)||(this.containerHeight=c.getStyle(d,"height"));this.chartWidth=Math.max(0,b||this.containerWidth||600);this.chartHeight=Math.max(0,c.relativeLength(a,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(a){var b=this.renderTo;if(a)for(;b&&b.style;)b.hcOrigStyle&&(c.css(b,b.hcOrigStyle),delete b.hcOrigStyle),b.hcOrigDetached&&(L.body.removeChild(b),
b.hcOrigDetached=!1),b=b.parentNode;else for(;b&&b.style;){L.body.contains(b)||b.parentNode||(b.hcOrigDetached=!0,L.body.appendChild(b));if("none"===c.getStyle(b,"display",!1)||b.hcOricDetached)b.hcOrigStyle={display:b.style.display,height:b.style.height,overflow:b.style.overflow},a={display:"block",overflow:"hidden"},b!==this.renderTo&&(a.height=0),c.css(b,a),b.offsetWidth||b.style.setProperty("display","block","important");b=b.parentNode;if(b===L.body)break}},setClassName:function(a){this.container.className=
"highcharts-container "+(a||"")},getContainer:function(){var a=this.options,b=a.chart;var d=this.renderTo;var e=c.uniqueKey(),g,m;d||(this.renderTo=d=b.renderTo);y(d)&&(this.renderTo=d=L.getElementById(d));d||c.error(13,!0,this);var h=q(F(d,"data-highcharts-chart"));C(h)&&k[h]&&k[h].hasRendered&&k[h].destroy();F(d,"data-highcharts-chart",this.index);d.innerHTML="";b.skipClone||d.offsetWidth||this.temporaryDisplay();this.getChartSize();h=this.chartWidth;var l=this.chartHeight;r(d,{overflow:"hidden"});
this.styledMode||(g=t({position:"relative",overflow:"hidden",width:h+"px",height:l+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style));this.container=d=p("div",{id:e},g,d);this._cursor=d.style.cursor;this.renderer=new (c[b.renderer]||c.Renderer)(d,h,l,null,b.forExport,a.exporting&&a.exporting.allowHTML,this.styledMode);this.setClassName(b.className);if(this.styledMode)for(m in a.defs)this.renderer.definition(a.defs[m]);else this.renderer.setStyle(b.style);
this.renderer.chartIndex=this.index;A(this,"afterGetContainer")},getMargins:function(a){var b=this.spacing,d=this.margin,e=this.titleOffset;this.resetMargins();e[0]&&!G(d[0])&&(this.plotTop=Math.max(this.plotTop,e[0]+b[0]));e[2]&&!G(d[2])&&(this.marginBottom=Math.max(this.marginBottom,e[2]+b[2]));this.legend&&this.legend.display&&this.legend.adjustMargins(d,b);A(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],d=a.colorAxis,e=a.margin,c=function(a){a.forEach(function(a){a.visible&&
a.getOffset()})};a.hasCartesianSeries?c(a.axes):d&&d.length&&c(d);m.forEach(function(d,c){G(e[c])||(a[d]+=b[c])});a.setChartSize()},reflow:function(b){var d=this,e=d.options.chart,k=d.renderTo,g=G(e.width)&&G(e.height),m=e.width||c.getStyle(k,"width");e=e.height||c.getStyle(k,"height");k=b?b.target:Q;if(!g&&!d.isPrinting&&m&&e&&(k===Q||k===L)){if(m!==d.containerWidth||e!==d.containerHeight)c.clearTimeout(d.reflowTimeout),d.reflowTimeout=a(function(){d.container&&d.setSize(void 0,void 0,!1)},b?100:
0);d.containerWidth=m;d.containerHeight=e}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=d(Q,"resize",function(a){b.options&&b.reflow(a)}),d(this,"destroy",this.unbindReflow))},setSize:function(b,d,c){var k=this,m=k.renderer;k.isResizing+=1;g(c,k);k.oldChartHeight=k.chartHeight;k.oldChartWidth=k.chartWidth;void 0!==b&&(k.options.chart.width=b);void 0!==d&&(k.options.chart.height=d);k.getChartSize();
if(!k.styledMode){var h=m.globalAnimation;(h?e:r)(k.container,{width:k.chartWidth+"px",height:k.chartHeight+"px"},h)}k.setChartSize(!0);m.setSize(k.chartWidth,k.chartHeight,c);k.axes.forEach(function(a){a.isDirty=!0;a.setScale()});k.isDirtyLegend=!0;k.isDirtyBox=!0;k.layOutTitles();k.getMargins();k.redraw(c);k.oldChartHeight=null;A(k,"resize");a(function(){k&&A(k,"endResize",null,function(){--k.isResizing})},l(h).duration||0)},setChartSize:function(a){var b=this.inverted,d=this.renderer,e=this.chartWidth,
c=this.chartHeight,k=this.options.chart,g=this.spacing,m=this.clipOffset,r,h,l,f;this.plotLeft=r=Math.round(this.plotLeft);this.plotTop=h=Math.round(this.plotTop);this.plotWidth=l=Math.max(0,Math.round(e-r-this.marginRight));this.plotHeight=f=Math.max(0,Math.round(c-h-this.marginBottom));this.plotSizeX=b?f:l;this.plotSizeY=b?l:f;this.plotBorderWidth=k.plotBorderWidth||0;this.spacingBox=d.spacingBox={x:g[3],y:g[0],width:e-g[3]-g[1],height:c-g[0]-g[2]};this.plotBox=d.plotBox={x:r,y:h,width:l,height:f};
e=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(e,m[3])/2);d=Math.ceil(Math.max(e,m[0])/2);this.clipBox={x:b,y:d,width:Math.floor(this.plotSizeX-Math.max(e,m[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(e,m[2])/2-d))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});A(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){A(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(d){var e=b[d],c=H(e)?e:[e,
e,e,e];["Top","Right","Bottom","Left"].forEach(function(e,k){a[d][k]=n(b[d+e],c[k])})});m.forEach(function(b,d){a[b]=n(a.margin[d],a.spacing[d])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,d=this.chartWidth,e=this.chartHeight,c=this.chartBackground,k=this.plotBackground,g=this.plotBorder,m=this.styledMode,r=this.plotBGImage,h=a.backgroundColor,l=a.plotBackgroundColor,f=a.plotBackgroundImage,x,w=this.plotLeft,p=this.plotTop,u=this.plotWidth,
n=this.plotHeight,J=this.plotBox,K=this.clipRect,q=this.clipBox,v="animate";c||(this.chartBackground=c=b.rect().addClass("highcharts-background").add(),v="attr");if(m)var y=x=c.strokeWidth();else{y=a.borderWidth||0;x=y+(a.shadow?8:0);h={fill:h||"none"};if(y||c["stroke-width"])h.stroke=a.borderColor,h["stroke-width"]=y;c.attr(h).shadow(a.shadow)}c[v]({x:x/2,y:x/2,width:d-x-y%2,height:e-x-y%2,r:a.borderRadius});v="animate";k||(v="attr",this.plotBackground=k=b.rect().addClass("highcharts-plot-background").add());
k[v](J);m||(k.attr({fill:l||"none"}).shadow(a.plotShadow),f&&(r?r.animate(J):this.plotBGImage=b.image(f,w,p,u,n).add()));K?K.animate({width:q.width,height:q.height}):this.clipRect=b.clipRect(q);v="animate";g||(v="attr",this.plotBorder=g=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());m||g.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});g[v](g.crisp({x:w,y:p,width:u,height:n},-g.strokeWidth()));this.isDirtyBox=!1;A(this,"afterDrawChartBox")},propFromSeries:function(){var a=
this,b=a.options.chart,d,e=a.options.series,c,k;["inverted","angular","polar"].forEach(function(g){d=S[b.type||b.defaultSeriesType];k=b[g]||d&&d.prototype[g];for(c=e&&e.length;!k&&c--;)(d=S[e[c].type])&&d.prototype[g]&&(k=!0);a[g]=k})},linkSeries:function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0});b.forEach(function(b){var d=b.options.linkedTo;y(d)&&(d=":previous"===d?a.series[b.index-1]:a.get(d))&&d.linkedParent!==b&&(d.linkedSeries.push(b),b.linkedParent=d,b.visible=
n(b.options.visible,d.options.visible,b.visible))});A(this,"afterLinkSeries")},renderSeries:function(){this.series.forEach(function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(d){var e=t(b.style,d.style),c=q(e.left)+a.plotLeft,k=q(e.top)+a.plotTop+12;delete e.left;delete e.top;a.renderer.text(d.html,c,k).attr({zIndex:2}).css(e).add()})},render:function(){var a=this.axes,b=this.colorAxis,d=this.renderer,e=this.options,c=0,k=
function(a){a.forEach(function(a){a.visible&&a.render()})};this.setTitle();this.legend=new w(this,e.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();e=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return c=21,!0});var g=this.plotHeight=Math.max(this.plotHeight-c,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();var m=1.1<e/this.plotWidth;var r=1.05<g/this.plotHeight;if(m||r)a.forEach(function(a){(a.horiz&&
m||!a.horiz&&r)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries?k(a):b&&b.length&&k(b);this.seriesGroup||(this.seriesGroup=d.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.updateContainerScaling();this.hasRendered=!0},addCredits:function(a){var b=this;a=K(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||
""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(Q.location.href=a.href)}).attr({align:a.position.align,zIndex:8}),b.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},updateContainerScaling:function(){var a=this.container;if(a.offsetWidth&&a.offsetHeight&&a.getBoundingClientRect){var b=a.getBoundingClientRect(),d=b.width/a.offsetWidth;a=b.height/a.offsetHeight;1!==d||1!==
a?this.containerScaling={scaleX:d,scaleY:a}:delete this.containerScaling}},destroy:function(){var a=this,b=a.axes,d=a.series,e=a.container,g,m=e&&e.parentNode;A(a,"destroy");a.renderer.forExport?B(k,a):k[a.index]=void 0;c.chartCount--;a.renderTo.removeAttribute("data-highcharts-chart");U(a);for(g=b.length;g--;)b[g]=b[g].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(g=d.length;g--;)d[g]=d[g].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(b){var d=
a[b];d&&d.destroy&&(a[b]=d.destroy())});e&&(e.innerHTML="",U(e),m&&z(e));h(a,function(b,d){delete a[d]})},firstRender:function(){var a=this,b=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();(v(b.series)?b.series:[]).forEach(function(b){a.initSeries(b)});a.linkSeries();A(a,"beforeRender");J&&(a.pointer=new J(a,b));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&
void 0!==this.index&&a.apply(this,[this])},this);A(this,"load");A(this,"render");G(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})});M(I,"parts/ScrollablePlotArea.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.pick,G=c.addEvent;f=c.Chart;"";G(f,"afterSetChartSize",function(f){var z=this.options.chart.scrollablePlotArea,t=z&&z.minWidth;z=z&&z.minHeight;if(!this.renderer.forExport){if(t){if(this.scrollablePixelsX=t=Math.max(0,t-this.chartWidth)){this.plotWidth+=
t;this.inverted?(this.clipBox.height+=t,this.plotBox.height+=t):(this.clipBox.width+=t,this.plotBox.width+=t);var v={1:{name:"right",value:t}}}}else z&&(this.scrollablePixelsY=t=Math.max(0,z-this.chartHeight))&&(this.plotHeight+=t,this.inverted?(this.clipBox.width+=t,this.plotBox.width+=t):(this.clipBox.height+=t,this.plotBox.height+=t),v={2:{name:"bottom",value:t}});v&&!f.skipAxes&&this.axes.forEach(function(f){v[f.side]?f.getPlotLinePath=function(){var t=v[f.side].name,y=this[t];this[t]=y-v[f.side].value;
var h=c.Axis.prototype.getPlotLinePath.apply(this,arguments);this[t]=y;return h}:(f.setAxisSize(),f.setAxisTranslation())})}});G(f,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});f.prototype.setUpScrolling=function(){var f={WebkitOverflowScrolling:"touch",overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(f.overflowX="auto");this.scrollablePixelsY&&(f.overflowY="auto");
this.scrollingContainer=c.createElement("div",{className:"highcharts-scrolling"},f,this.renderTo);this.innerContainer=c.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};f.prototype.moveFixedElements=function(){var c=this.container,f=this.fixedRenderer,t=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
v;this.scrollablePixelsX&&!this.inverted?v=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?v=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?v=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(v=".highcharts-yaxis");t.push(v,v+"-labels");t.forEach(function(v){[].forEach.call(c.querySelectorAll(v),function(c){(c.namespaceURI===f.SVG_NS?f.box:f.box.parentNode).appendChild(c);c.style.pointerEvents="auto"})})};f.prototype.applyFixed=function(){var f,B=!this.fixedDiv,t=this.options.chart.scrollablePlotArea;
B?(this.fixedDiv=c.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.renderTo.style.overflow="visible",this.fixedRenderer=f=new c.Renderer(this.fixedDiv,this.chartWidth,this.chartHeight),this.scrollableMask=f.path().attr({fill:c.color(this.options.chart.backgroundColor||"#fff").setOpacity(F(t.opacity,.85)).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),
this.moveFixedElements(),G(this,"afterShowResetZoom",this.moveFixedElements),G(this,"afterLayOutTitles",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);f=this.chartWidth+(this.scrollablePixelsX||0);var v=this.chartHeight+(this.scrollablePixelsY||0);c.stop(this.container);this.container.style.width=f+"px";this.container.style.height=v+"px";this.renderer.boxWrapper.attr({width:f,height:v,viewBox:[0,0,f,v].join(" ")});this.chartBackground.attr({width:f,height:v});
this.scrollablePixelsY&&(this.scrollingContainer.style.height=this.chartHeight+"px");B&&(t.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*t.scrollPositionX),t.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*t.scrollPositionY));v=this.axisOffset;B=this.plotTop-v[0]-1;t=this.plotLeft-v[3]-1;f=this.plotTop+this.plotHeight+v[2]+1;v=this.plotLeft+this.plotWidth+v[1]+1;var C=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),H=this.plotTop+this.plotHeight-
(this.scrollablePixelsY||0);B=this.scrollablePixelsX?["M",0,B,"L",this.plotLeft-1,B,"L",this.plotLeft-1,f,"L",0,f,"Z","M",C,B,"L",this.chartWidth,B,"L",this.chartWidth,f,"L",C,f,"Z"]:this.scrollablePixelsY?["M",t,0,"L",t,this.plotTop-1,"L",v,this.plotTop-1,"L",v,0,"Z","M",t,H,"L",t,this.chartHeight,"L",v,this.chartHeight,"L",v,H,"Z"]:["M",0,0];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:B})}});M(I,"parts/Point.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=
f.defined,G=f.erase,z=f.extend,B=f.isArray,t=f.isNumber,v=f.isObject,C=f.pick,H,y=c.fireEvent,h=c.format,n=c.uniqueKey,q=c.removeEvent;c.Point=H=function(){};c.Point.prototype={init:function(c,b,a){this.series=c;this.applyOptions(b,a);this.id=F(this.id)?this.id:n();this.resolveColor();c.chart.pointCount++;y(this,"afterInit");return this},resolveColor:function(){var c=this.series;var b=c.chart.options.chart.colorCount;var a=c.chart.styledMode;a||this.options.color||(this.color=c.color);c.options.colorByPoint?
(a||(b=c.options.colors||c.chart.options.colors,this.color=this.color||b[c.colorCounter],b=b.length),a=c.colorCounter,c.colorCounter++,c.colorCounter===b&&(c.colorCounter=0)):a=c.colorIndex;this.colorIndex=C(this.colorIndex,a)},applyOptions:function(c,b){var a=this.series,d=a.options.pointValKey||a.pointValKey;c=H.prototype.optionsToObject.call(this,c);z(this,c);this.options=this.options?z(this.options,c):c;c.group&&delete this.group;c.dataLabels&&delete this.dataLabels;d&&(this.y=this[d]);this.formatPrefix=
(this.isNull=C(this.isValid&&!this.isValid(),null===this.x||!t(this.y)))?"null":"point";this.selected&&(this.state="select");"name"in this&&void 0===b&&a.xAxis&&a.xAxis.hasNames&&(this.x=a.xAxis.nameToX(this));void 0===this.x&&a&&(this.x=void 0===b?a.autoIncrement(this):b);return this},setNestedProperty:function(c,b,a){a.split(".").reduce(function(a,e,c,g){a[e]=g.length-1===c?b:v(a[e],!0)?a[e]:{};return a[e]},c);return c},optionsToObject:function(g){var b={},a=this.series,d=a.options.keys,e=d||a.pointArrayMap||
["y"],h=e.length,f=0,n=0;if(t(g)||null===g)b[e[0]]=g;else if(B(g))for(!d&&g.length>h&&(a=typeof g[0],"string"===a?b.name=g[0]:"number"===a&&(b.x=g[0]),f++);n<h;)d&&void 0===g[f]||(0<e[n].indexOf(".")?c.Point.prototype.setNestedProperty(b,g[f],e[n]):b[e[n]]=g[f]),f++,n++;else"object"===typeof g&&(b=g,g.dataLabels&&(a._hasPointLabels=!0),g.marker&&(a._hasPointMarkers=!0));return b},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":
"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var c=this.series,b=c.zones;c=c.zoneAxis||"y";var a=0,d;for(d=b[a];this[c]>=d.value;)d=b[++a];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=d&&d.color&&!this.options.color?d.color:this.nonZonedColor;return d},
hasNewShapeType:function(){return this.graphic&&this.graphic.element.nodeName!==this.shapeType},destroy:function(){var c=this.series.chart,b=c.hoverPoints,a;c.pointCount--;b&&(this.setState(),G(b,this),b.length||(c.hoverPoints=null));if(this===c.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)q(this),this.destroyElements();this.legendItem&&c.legend.destroyItem(this);for(a in this)this[a]=null},destroyElements:function(c){var b=this,a=[],d;c=c||{graphic:1,dataLabel:1};
c.graphic&&a.push("graphic","shadowGroup");c.dataLabel&&a.push("dataLabel","dataLabelUpper","connector");for(d=a.length;d--;){var e=a[d];b[e]&&(b[e]=b[e].destroy())}["dataLabel","connector"].forEach(function(a){var d=a+"s";c[a]&&b[d]&&(b[d].forEach(function(a){a.element&&a.destroy()}),delete b[d])})},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||
this.stackTotal}},tooltipFormatter:function(c){var b=this.series,a=b.tooltipOptions,d=C(a.valueDecimals,""),e=a.valuePrefix||"",g=a.valueSuffix||"";b.chart.styledMode&&(c=b.chart.tooltip.styledModeFormat(c));(b.pointArrayMap||["y"]).forEach(function(a){a="{point."+a;if(e||g)c=c.replace(RegExp(a+"}","g"),e+a+"}"+g);c=c.replace(RegExp(a+"}","g"),a+":,."+d+"f}")});return h(c,{point:this,series:this.series},b.chart.time)},firePointEvent:function(c,b,a){var d=this,e=this.series.options;(e.point.events[c]||
d.options&&d.options.events&&d.options.events[c])&&this.importEvents();"click"===c&&e.allowPointSelect&&(a=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});y(this,c,b,a)},visible:!0}});M(I,"parts/Series.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.arrayMax,G=f.arrayMin,z=f.defined,B=f.erase,t=f.extend,v=f.isArray,C=f.isNumber,H=f.isString,y=f.objectEach,h=f.pick,n=f.splat,q=f.syncTimeout,g=c.addEvent,b=c.animObject,a=c.correctFloat,d=c.defaultOptions,
e=c.defaultPlotOptions,l=c.fireEvent,L=c.merge,E=c.removeEvent,p=c.SVGElement,u=c.win;c.Series=c.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===
this.y?"":c.numberFormat(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{axisTypes:["xAxis","yAxis"],
coll:"series",colorCounter:0,cropShoulder:1,directTouch:!1,isCartesian:!0,parallelArrays:["x","y"],pointClass:c.Point,requireSorting:!0,sorted:!0,init:function(a,b){l(this,"init",{options:b});var d=this,e=a.series,k;this.eventOptions=this.eventOptions||{};d.chart=a;d.options=b=d.setOptions(b);d.linkedSeries=[];d.bindAxes();t(d,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});var m=b.events;y(m,function(a,b){c.isFunction(a)&&d.eventOptions[b]!==a&&(c.isFunction(d.eventOptions[b])&&
E(d,b,d.eventOptions[b]),d.eventOptions[b]=a,g(d,b,a))});if(m&&m.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;d.getColor();d.getSymbol();d.parallelArrays.forEach(function(a){d[a+"Data"]||(d[a+"Data"]=[])});d.points||d.data||d.setData(b.data,!1);d.isCartesian&&(a.hasCartesianSeries=!0);e.length&&(k=e[e.length-1]);d._i=h(k&&k._i,-1)+1;a.orderSeries(this.insert(e));l(this,"afterInit")},insert:function(a){var b=this.options.index,d;if(C(b)){for(d=a.length;d--;)if(b>=
h(a[d].options.index,a[d]._i)){a.splice(d+1,0,this);break}-1===d&&a.unshift(this);d+=1}else a.push(this);return h(d,a.length-1)},bindAxes:function(){var a=this,b=a.options,d=a.chart,e;l(this,"bindAxes",null,function(){(a.axisTypes||[]).forEach(function(k){d[k].forEach(function(d){e=d.options;if(b[k]===e.index||void 0!==b[k]&&b[k]===e.id||void 0===b[k]&&0===e.index)a.insert(d.series),a[k]=d,d.isDirty=!0});a[k]||a.optionalAxis===k||c.error(18,!0,d)})})},updateParallelArrays:function(a,b){var d=a.series,
c=arguments,e=C(b)?function(c){var e="y"===c&&d.toYData?d.toYData(a):a[c];d[c+"Data"][b]=e}:function(a){Array.prototype[b].apply(d[a+"Data"],Array.prototype.slice.call(c,2))};d.parallelArrays.forEach(e)},hasData:function(){return this.visible&&void 0!==this.dataMax&&void 0!==this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,c=a.pointIntervalUnit,e=this.chart.time;b=h(b,a.pointStart,0);this.pointInterval=d=h(this.pointInterval,
a.pointInterval,1);c&&(a=new e.Date(b),"day"===c?e.set("Date",a,e.get("Date",a)+d):"month"===c?e.set("Month",a,e.get("Month",a)+d):"year"===c&&e.set("FullYear",a,e.get("FullYear",a)+d),d=a.getTime()-b);this.xIncrement=b+d;return b},setOptions:function(a){var b=this.chart,c=b.options,e=c.plotOptions,k=b.userOptions||{};a=L(a);b=b.styledMode;var g={plotOptions:e,userOptions:a};l(this,"setOptions",g);var f=g.plotOptions[this.type],p=k.plotOptions||{};this.userOptions=g.userOptions;k=L(f,e.series,k.plotOptions&&
k.plotOptions[this.type],a);this.tooltipOptions=L(d.tooltip,d.plotOptions.series&&d.plotOptions.series.tooltip,d.plotOptions[this.type].tooltip,c.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=h(a.stickyTracking,p[this.type]&&p[this.type].stickyTracking,p.series&&p.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:k.stickyTracking);null===f.marker&&delete k.marker;this.zoneAxis=k.zoneAxis;c=this.zones=(k.zones||[]).slice();
!k.negativeColor&&!k.negativeFillColor||k.zones||(e={value:k[this.zoneAxis+"Threshold"]||k.threshold||0,className:"highcharts-negative"},b||(e.color=k.negativeColor,e.fillColor=k.negativeFillColor),c.push(e));c.length&&z(c[c.length-1].value)&&c.push(b?{}:{color:this.color,fillColor:this.fillColor});l(this,"afterSetOptions",{options:k});return k},getName:function(){return h(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,b,d){var c=this.chart,e=this.userOptions,k=a+"Index",g=a+"Counter",
f=d?d.length:h(c.options.chart[a+"Count"],c[a+"Count"]);if(!b){var r=h(e[k],e["_"+k]);z(r)||(c.series.length||(c[g]=0),e["_"+k]=r=c[g]%f,c[g]+=1);d&&(b=d[r])}void 0!==r&&(this[k]=r);this[a]=b},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||e[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},findPointIndex:function(a,
b){var d=a.id;a=a.x;var c=this.points,e;if(d){var k=(d=this.chart.get(d))&&d.index;void 0!==k&&(e=!0)}void 0===k&&C(a)&&(k=this.xData.indexOf(a,b));-1!==k&&void 0!==k&&this.cropped&&(k=k>=this.cropStart?k-this.cropStart:k);!e&&c[k]&&c[k].touched&&(k=void 0);return k},drawLegendSymbol:c.LegendSymbolMixin.drawLineMarker,updateData:function(a){var b=this.options,d=this.points,c=[],e,k,g,h=this.requireSorting,f=a.length===d.length,l=!0;this.xIncrement=null;a.forEach(function(a,k){var m=z(a)&&this.pointClass.prototype.optionsToObject.call({series:this},
a)||{};var r=m.x;if(m.id||C(r))if(r=this.findPointIndex(m,g),-1===r||void 0===r?c.push(a):d[r]&&a!==b.data[r]?(d[r].update(a,!1,null,!1),d[r].touched=!0,h&&(g=r+1)):d[r]&&(d[r].touched=!0),!f||k!==r||this.hasDerivedData)e=!0},this);if(e)for(a=d.length;a--;)(k=d[a])&&!k.touched&&k.remove(!1);else f?a.forEach(function(a,b){d[b].update&&a!==d[b].y&&d[b].update(a,!1,null,!1)}):l=!1;d.forEach(function(a){a&&(a.touched=!1)});if(!l)return!1;c.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);return!0},
setData:function(a,b,d,e){var k=this,g=k.points,f=g&&g.length||0,r,l=k.options,p=k.chart,x=null,A=k.xAxis;x=l.turboThreshold;var u=this.xData,n=this.yData,q=(r=k.pointArrayMap)&&r.length,y=l.keys,t=0,E=1,L;a=a||[];r=a.length;b=h(b,!0);!1!==e&&r&&f&&!k.cropped&&!k.hasGroupedData&&k.visible&&!k.isSeriesBoosting&&(L=this.updateData(a));if(!L){k.xIncrement=null;k.colorCounter=0;this.parallelArrays.forEach(function(a){k[a+"Data"].length=0});if(x&&r>x)if(x=k.getFirstValidPoint(a),C(x))for(d=0;d<r;d++)u[d]=
this.autoIncrement(),n[d]=a[d];else if(v(x))if(q)for(d=0;d<r;d++)e=a[d],u[d]=e[0],n[d]=e.slice(1,q+1);else for(y&&(t=y.indexOf("x"),E=y.indexOf("y"),t=0<=t?t:0,E=0<=E?E:1),d=0;d<r;d++)e=a[d],u[d]=e[t],n[d]=e[E];else c.error(12,!1,p);else for(d=0;d<r;d++)void 0!==a[d]&&(e={series:k},k.pointClass.prototype.applyOptions.apply(e,[a[d]]),k.updateParallelArrays(e,d));n&&H(n[0])&&c.error(14,!0,p);k.data=[];k.options.data=k.userOptions.data=a;for(d=f;d--;)g[d]&&g[d].destroy&&g[d].destroy();A&&(A.minRange=
A.userMinRange);k.isDirty=p.isDirtyBox=!0;k.isDirtyData=!!g;d=!1}"point"===l.legendType&&(this.processData(),this.generatePoints());b&&p.redraw(d)},processData:function(a){var b=this.xData,d=this.yData,e=b.length;var k=0;var g=this.xAxis,h=this.options;var f=h.cropThreshold;var l=this.getExtremesFromAll||h.getExtremesFromAll,p=this.isCartesian;h=g&&g.val2lin;var u=g&&g.isLog,n=this.requireSorting;if(p&&!this.isDirty&&!g.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(g){a=g.getExtremes();var q=a.min;
var v=a.max}if(p&&this.sorted&&!l&&(!f||e>f||this.forceCrop))if(b[e-1]<q||b[0]>v)b=[],d=[];else if(this.yData&&(b[0]<q||b[e-1]>v)){k=this.cropData(this.xData,this.yData,q,v);b=k.xData;d=k.yData;k=k.start;var y=!0}for(f=b.length||1;--f;)if(e=u?h(b[f])-h(b[f-1]):b[f]-b[f-1],0<e&&(void 0===t||e<t))var t=e;else 0>e&&n&&(c.error(15,!1,this.chart),n=!1);this.cropped=y;this.cropStart=k;this.processedXData=b;this.processedYData=d;this.closestPointRange=this.basePointRange=t},cropData:function(a,b,d,e,c){var k=
a.length,g=0,f=k,r;c=h(c,this.cropShoulder);for(r=0;r<k;r++)if(a[r]>=d){g=Math.max(0,r-c);break}for(d=r;d<k;d++)if(a[d]>e){f=d+c;break}return{xData:a.slice(g,f),yData:b.slice(g,f),start:g,end:f}},generatePoints:function(){var a=this.options,b=a.data,d=this.data,e,c=this.processedXData,g=this.processedYData,f=this.pointClass,h=c.length,p=this.cropStart||0,u=this.hasGroupedData;a=a.keys;var q=[],v;d||u||(d=[],d.length=b.length,d=this.data=d);a&&u&&(this.options.keys=!1);for(v=0;v<h;v++){var y=p+v;if(u){var E=
(new f).init(this,[c[v]].concat(n(g[v])));E.dataGroup=this.groupMap[v];E.dataGroup.options&&(E.options=E.dataGroup.options,t(E,E.dataGroup.options),delete E.dataLabels)}else(E=d[y])||void 0===b[y]||(d[y]=E=(new f).init(this,b[y],c[v]));E&&(E.index=y,q[v]=E)}this.options.keys=a;if(d&&(h!==(e=d.length)||u))for(v=0;v<e;v++)v!==p||u||(v+=h),d[v]&&(d[v].destroyElements(),d[v].plotX=void 0);this.data=d;this.points=q;l(this,"afterGeneratePoints")},getXExtremes:function(a){return{min:G(a),max:F(a)}},getExtremes:function(a){var b=
this.xAxis,d=this.yAxis,e=this.processedXData||this.xData,c=[],k=0,g=0;var f=0;var h=this.requireSorting?this.cropShoulder:0,p=d?d.positiveValuesOnly:!1,u;a=a||this.stackedYData||this.processedYData||[];d=a.length;b&&(f=b.getExtremes(),g=f.min,f=f.max);for(u=0;u<d;u++){var n=e[u];var q=a[u];var y=(C(q)||v(q))&&(q.length||0<q||!p);n=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||!b||(e[u+h]||n)>=g&&(e[u-h]||n)<=f;if(y&&n)if(y=q.length)for(;y--;)C(q[y])&&(c[k++]=q[y]);else c[k++]=
q}this.dataMin=G(c);this.dataMax=F(c);l(this,"afterGetExtremes")},getFirstValidPoint:function(a){for(var b=null,d=a.length,e=0;null===b&&e<d;)b=a[e],e++;return b},translate:function(){this.processedXData||this.processData();this.generatePoints();var b=this.options,d=b.stacking,e=this.xAxis,c=e.categories,g=this.yAxis,m=this.points,f=m.length,p=!!this.modifyValue,u,n=this.pointPlacementToXValue(),q=C(n),y=b.threshold,t=b.startFromThreshold?y:0,E,L=this.zoneAxis||"y",B=Number.MAX_VALUE;for(u=0;u<f;u++){var H=
m[u],G=H.x;var F=H.y;var I=H.low,M=d&&g.stacks[(this.negStacks&&F<(t?0:y)?"-":"")+this.stackKey];g.positiveValuesOnly&&null!==F&&0>=F&&(H.isNull=!0);H.plotX=E=a(Math.min(Math.max(-1E5,e.translate(G,0,0,0,1,n,"flags"===this.type)),1E5));if(d&&this.visible&&M&&M[G]){var X=this.getStackIndicator(X,G,this.index);if(!H.isNull){var P=M[G];var Y=P.points[X.key]}}v(Y)&&(I=Y[0],F=Y[1],I===t&&X.key===M[G].base&&(I=h(C(y)&&y,g.min)),g.positiveValuesOnly&&0>=I&&(I=null),H.total=H.stackTotal=P.total,H.percentage=
P.total&&H.y/P.total*100,H.stackY=F,this.irregularWidths||P.setOffset(this.pointXOffset||0,this.barW||0));H.yBottom=z(I)?Math.min(Math.max(-1E5,g.translate(I,0,1,0,1)),1E5):null;p&&(F=this.modifyValue(F,H));H.plotY=F="number"===typeof F&&Infinity!==F?Math.min(Math.max(-1E5,g.translate(F,0,1,0,1)),1E5):void 0;H.isInside=void 0!==F&&0<=F&&F<=g.len&&0<=E&&E<=e.len;H.clientX=q?a(e.translate(G,0,0,0,1,n)):E;H.negative=H[L]<(b[L+"Threshold"]||y||0);H.category=c&&void 0!==c[H.x]?c[H.x]:H.x;if(!H.isNull){void 0!==
Z&&(B=Math.min(B,Math.abs(E-Z)));var Z=E}H.zone=this.zones.length&&H.getZone()}this.closestPointRangePx=B;l(this,"afterTranslate")},getValidPoints:function(a,b,d){var e=this.chart;return(a||this.points||[]).filter(function(a){return b&&!e.isInsidePlot(a.plotX,a.plotY,e.inverted)?!1:d||!a.isNull})},getClipBox:function(a,b){var d=this.options,e=this.chart,c=e.inverted,k=this.xAxis,g=k&&this.yAxis;a&&!1===d.clip&&g?a=c?{y:-e.chartWidth+g.len+g.pos,height:e.chartWidth,width:e.chartHeight,x:-e.chartHeight+
k.len+k.pos}:{y:-g.pos,height:e.chartHeight,width:e.chartWidth,x:-k.pos}:(a=this.clipBox||e.clipBox,b&&(a.width=e.plotSizeX,a.x=0));return b?{width:a.width,x:a.x}:a},setClip:function(a){var b=this.chart,d=this.options,e=b.renderer,c=b.inverted,k=this.clipBox,g=this.getClipBox(a),f=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,g.height,d.xAxis,d.yAxis].join(),h=b[f],l=b[f+"m"];h||(a&&(g.width=0,c&&(g.x=b.plotSizeX+(!1!==d.clip?0:b.plotTop)),b[f+"m"]=l=e.clipRect(c?b.plotSizeX+99:-99,
c?-b.plotLeft:-b.plotTop,99,c?b.chartWidth:b.chartHeight)),b[f]=h=e.clipRect(g),h.count={length:0});a&&!h.count[this.index]&&(h.count[this.index]=!0,h.count.length+=1);if(!1!==d.clip||a)this.group.clip(a||k?h:b.clipRect),this.markerGroup.clip(l),this.sharedClipKey=f;a||(h.count[this.index]&&(delete h.count[this.index],--h.count.length),0===h.count.length&&f&&b[f]&&(k||(b[f]=b[f].destroy()),b[f+"m"]&&(b[f+"m"]=b[f+"m"].destroy())))},animate:function(a){var d=this.chart,e=b(this.options.animation);
if(a)this.setClip(e);else{var c=this.sharedClipKey;a=d[c];var k=this.getClipBox(e,!0);a&&a.animate(k,e);d[c+"m"]&&d[c+"m"].animate({width:k.width+99,x:k.x-(d.inverted?0:99)},e);this.animate=null}},afterAnimate:function(){this.setClip();l(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,d,e=this.options.marker,c=this[this.specialGroup]||this.markerGroup;var g=this.xAxis;var f=h(e.enabled,!g||g.isRadial?!0:null,this.closestPointRangePx>=e.enabledThreshold*
e.radius);if(!1!==e.enabled||this._hasPointMarkers)for(g=0;g<a.length;g++){var l=a[g];var p=(d=l.graphic)?"animate":"attr";var u=l.marker||{};var n=!!l.marker;var q=f&&void 0===u.enabled||u.enabled;var v=!1!==l.isInside;if(q&&!l.isNull){var y=h(u.symbol,this.symbol);q=this.markerAttribs(l,l.selected&&"select");d?d[v?"show":"hide"](v).animate(q):v&&(0<q.width||l.hasImage)&&(l.graphic=d=b.renderer.symbol(y,q.x,q.y,q.width,q.height,n?u:e).add(c));if(d&&!b.styledMode)d[p](this.pointAttribs(l,l.selected&&
"select"));d&&d.addClass(l.getClassName(),!0)}else d&&(l.graphic=d.destroy())}},markerAttribs:function(a,b){var d=this.options.marker,e=a.marker||{},c=e.symbol||d.symbol,k=h(e.radius,d.radius);b&&(d=d.states[b],b=e.states&&e.states[b],k=h(b&&b.radius,d&&d.radius,k+(d&&d.radiusPlus||0)));a.hasImage=c&&0===c.indexOf("url");a.hasImage&&(k=0);a={x:Math.floor(a.plotX)-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,b){var d=this.options.marker,e=a&&a.options,c=e&&e.marker||{},
k=this.color,g=e&&e.color,f=a&&a.color;e=h(c.lineWidth,d.lineWidth);var l=a&&a.zone&&a.zone.color;a=1;k=g||l||f||k;g=c.fillColor||d.fillColor||k;k=c.lineColor||d.lineColor||k;b=b||"normal";d=d.states[b];b=c.states&&c.states[b]||{};e=h(b.lineWidth,d.lineWidth,e+h(b.lineWidthPlus,d.lineWidthPlus,0));g=b.fillColor||d.fillColor||g;k=b.lineColor||d.lineColor||k;a=h(b.opacity,d.opacity,a);return{stroke:k,"stroke-width":e,fill:g,opacity:a}},destroy:function(a){var b=this,d=b.chart,e=/AppleWebKit\/533/.test(u.navigator.userAgent),
k,g,f=b.data||[],h,n;l(b,"destroy");a||E(b);(b.axisTypes||[]).forEach(function(a){(n=b[a])&&n.series&&(B(n.series,b),n.isDirty=n.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(g=f.length;g--;)(h=f[g])&&h.destroy&&h.destroy();b.points=null;c.clearTimeout(b.animationTimeout);y(b,function(a,b){a instanceof p&&!a.survive&&(k=e&&"group"===b?"hide":"destroy",a[k]())});d.hoverSeries===b&&(d.hoverSeries=null);B(d.series,b);d.orderSeries();y(b,function(d,e){a&&"hcEvents"===e||delete b[e]})},
getGraphPath:function(a,b,d){var e=this,c=e.options,k=c.step,g,f=[],h=[],l;a=a||e.points;(g=a.reversed)&&a.reverse();(k={right:1,center:2}[k]||k&&3)&&g&&(k=4-k);!c.connectNulls||b||d||(a=this.getValidPoints(a));a.forEach(function(g,m){var r=g.plotX,p=g.plotY,u=a[m-1];(g.leftCliff||u&&u.rightCliff)&&!d&&(l=!0);g.isNull&&!z(b)&&0<m?l=!c.connectNulls:g.isNull&&!b?l=!0:(0===m||l?m=["M",g.plotX,g.plotY]:e.getPointSpline?m=e.getPointSpline(a,g,m):k?(m=1===k?["L",u.plotX,p]:2===k?["L",(u.plotX+r)/2,u.plotY,
"L",(u.plotX+r)/2,p]:["L",r,u.plotY],m.push("L",r,p)):m=["L",r,p],h.push(g.x),k&&(h.push(g.x),2===k&&h.push(g.x)),f.push.apply(f,m),l=!1)});f.xMap=h;return e.graphPath=f},drawGraph:function(){var a=this,b=this.options,d=(this.gappedPath||this.getGraphPath).call(this),e=this.chart.styledMode,c=[["graph","highcharts-graph"]];e||c[0].push(b.lineColor||this.color||"#cccccc",b.dashStyle);c=a.getZonesGraphs(c);c.forEach(function(c,k){var g=c[0],f=a[g],h=f?"animate":"attr";f?(f.endX=a.preventGraphAnimation?
null:d.xMap,f.animate({d:d})):d.length&&(a[g]=f=a.chart.renderer.path(d).addClass(c[1]).attr({zIndex:1}).add(a.group));f&&!e&&(g={stroke:c[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},c[3]?g.dashstyle=c[3]:"square"!==b.linecap&&(g["stroke-linecap"]=g["stroke-linejoin"]="round"),f[h](g).shadow(2>k&&b.shadow));f&&(f.startX=d.xMap,f.isArea=d.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(b,d){d=["zone-graph-"+d,"highcharts-graph highcharts-zone-graph-"+d+" "+(b.className||
"")];this.chart.styledMode||d.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(d)},this);return a},applyZones:function(){var a=this,b=this.chart,d=b.renderer,e=this.zones,c,g,f=this.clips||[],l,p=this.graph,u=this.area,n=Math.max(b.chartWidth,b.chartHeight),q=this[(this.zoneAxis||"y")+"Axis"],v=b.inverted,y,t,E,C=!1;if(e.length&&(p||u)&&q&&void 0!==q.min){var L=q.reversed;var z=q.horiz;p&&!this.showLine&&p.hide();u&&u.hide();var B=q.getExtremes();e.forEach(function(e,k){c=L?z?
b.plotWidth:0:z?0:q.toPixels(B.min)||0;c=Math.min(Math.max(h(g,c),0),n);g=Math.min(Math.max(Math.round(q.toPixels(h(e.value,B.max),!0)||0),0),n);C&&(c=g=q.toPixels(B.max));y=Math.abs(c-g);t=Math.min(c,g);E=Math.max(c,g);q.isXAxis?(l={x:v?E:t,y:0,width:y,height:n},z||(l.x=b.plotHeight-l.x)):(l={x:0,y:v?E:t,width:n,height:y},z&&(l.y=b.plotWidth-l.y));v&&d.isVML&&(l=q.isXAxis?{x:0,y:L?t:E,height:l.width,width:b.chartWidth}:{x:l.y-b.plotLeft-b.spacingBox.x,y:0,width:l.height,height:b.chartHeight});f[k]?
f[k].animate(l):f[k]=d.clipRect(l);p&&a["zone-graph-"+k].clip(f[k]);u&&a["zone-area-"+k].clip(f[k]);C=e.value>B.max;a.resetZones&&0===g&&(g=void 0)});this.clips=f}else a.visible&&(p&&p.show(!0),u&&u.show(!0))},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){d[b]&&(e.renderer.isVML&&d[b].attr({width:d.yAxis.len,height:d.xAxis.len}),d[b].width=d.yAxis.len,d[b].height=d.xAxis.len,d[b].invert(a))})}var d=this,e=d.chart;if(d.xAxis){var c=g(e,"resize",b);g(d,"destroy",
c);b(a);d.invertGroups=b}},plotGroup:function(a,b,d,e,c){var k=this[a],g=!k;g&&(this[a]=k=this.chart.renderer.g().attr({zIndex:e||.1}).add(c));k.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(z(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(k.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);k.attr({visibility:d})[g?"attr":"animate"](this.getPlotBox());return k},getPlotBox:function(){var a=this.chart,
b=this.xAxis,d=this.yAxis;a.inverted&&(b=d,d=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:d?d.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,d=a.chart,e=a.options,c=!!a.animate&&d.renderer.isSVG&&b(e.animation).duration,g=a.visible?"inherit":"hidden",f=e.zIndex,h=a.hasRendered,p=d.seriesGroup,u=d.inverted;l(this,"render");var n=a.plotGroup("group","series",g,f,p);a.markerGroup=a.plotGroup("markerGroup","markers",g,f,p);c&&a.animate(!0);n.inverted=a.isCartesian||a.invertable?
u:!1;a.drawGraph&&(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(u);!1===e.clip||a.sharedClipKey||h||n.clip(d.clipRect);c&&a.animate();h||(a.animationTimeout=q(function(){a.afterAnimate()},c||0));a.isDirty=!1;a.hasRendered=!0;l(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,e=this.xAxis,
c=this.yAxis;d&&(a.inverted&&d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:h(e&&e.left,a.plotLeft),translateY:h(c&&c.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var d=this.xAxis,e=this.yAxis,c=this.chart.inverted;return this.searchKDTree({clientX:c?d.len-a.chartY+d.pos:a.chartX-d.pos,plotY:c?e.len-a.chartX+e.pos:a.chartY-e.pos},b,a)},buildKDTree:function(a){function b(a,e,c){var g;if(g=a&&
a.length){var k=d.kdAxisArray[e%c];a.sort(function(a,b){return a[k]-b[k]});g=Math.floor(g/2);return{point:a[g],left:b(a.slice(0,g),e+1,c),right:b(a.slice(g+1),e+1,c)}}}this.buildingKdTree=!0;var d=this,e=-1<d.options.findNearestPointBy.indexOf("y")?2:1;delete d.kdTree;q(function(){d.kdTree=b(d.getValidPoints(null,!d.directTouch),e,e);d.buildingKdTree=!1},d.options.kdNow||a&&"touchstart"===a.type?0:1)},searchKDTree:function(a,b,d){function e(a,b,d,h){var l=b.point,m=c.kdAxisArray[d%h],p=l;var r=z(a[g])&&
z(l[g])?Math.pow(a[g]-l[g],2):null;var u=z(a[k])&&z(l[k])?Math.pow(a[k]-l[k],2):null;u=(r||0)+(u||0);l.dist=z(u)?Math.sqrt(u):Number.MAX_VALUE;l.distX=z(r)?Math.sqrt(r):Number.MAX_VALUE;m=a[m]-l[m];u=0>m?"left":"right";r=0>m?"right":"left";b[u]&&(u=e(a,b[u],d+1,h),p=u[f]<p[f]?u:l);b[r]&&Math.sqrt(m*m)<p[f]&&(a=e(a,b[r],d+1,h),p=a[f]<p[f]?a:p);return p}var c=this,g=this.kdAxisArray[0],k=this.kdAxisArray[1],f=b?"distX":"dist";b=-1<c.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||
this.buildKDTree(d);if(this.kdTree)return e(a,this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.xAxis,b=this.options.pointPlacement;"between"===b&&(b=a.reversed?-.5:.5);C(b)&&(b*=h(this.options.pointRange||a.pointRange));return b}});""});M(I,"parts/Stacking.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.destroyObjectProperties,z=f.objectEach,B=f.pick;f=c.Axis;var t=c.Chart,v=c.correctFloat,C=c.format,H=c.Series;c.StackItem=function(c,f,n,q,g){var b=
c.chart.inverted;this.axis=c;this.isNegative=n;this.options=f=f||{};this.x=q;this.total=null;this.points={};this.stack=g;this.rightCliff=this.leftCliff=0;this.alignOptions={align:f.align||(b?n?"left":"right":"center"),verticalAlign:f.verticalAlign||(b?"middle":n?"bottom":"top"),y:f.y,x:f.x};this.textAlign=f.textAlign||(b?n?"right":"left":"center")};c.StackItem.prototype={destroy:function(){G(this,this.axis)},render:function(c){var f=this.axis.chart,n=this.options,q=n.format;q=q?C(q,this,f.time):n.formatter.call(this);
this.label?this.label.attr({text:q,visibility:"hidden"}):(this.label=f.renderer.label(q,null,null,n.shape,null,null,n.useHTML,!1,"stack-labels"),q={text:q,align:this.textAlign,rotation:n.rotation,padding:B(n.padding,0),visibility:"hidden"},this.label.attr(q),f.styledMode||this.label.css(n.style),this.label.added||this.label.add(c));this.label.labelrank=f.plotHeight},setOffset:function(c,f,n,q,g){var b=this.axis,a=b.chart;q=b.translate(b.usePercentage?100:q?q:this.total,0,0,0,1);n=b.translate(n?n:
0);n=F(q)&&Math.abs(q-n);c=B(g,a.xAxis[0].translate(this.x))+c;b=F(q)&&this.getStackBox(a,this,c,q,f,n,b);f=this.label;c=this.isNegative;g="justify"===B(this.options.overflow,"justify");if(f&&b){n=f.getBBox();var d=a.inverted?c?n.width:0:n.width/2,e=a.inverted?n.height/2:c?-4:n.height+4;this.alignOptions.x=B(this.options.x,0);f.align(this.alignOptions,null,b);q=f.alignAttr;f.show();q.y-=e;g&&(q.x-=d,H.prototype.justifyDataLabel.call(this.axis,f,this.alignOptions,q,n,b),q.x+=d);q.x=f.alignAttr.x;f.attr({x:q.x,
y:q.y});B(!g&&this.options.crop,!0)&&((a=a.isInsidePlot(f.x+(a.inverted?0:-n.width/2),f.y)&&a.isInsidePlot(f.x+(a.inverted?c?-n.width:n.width:n.width/2),f.y+n.height))||f.hide())}},getStackBox:function(c,f,n,q,g,b,a){var d=f.axis.reversed,e=c.inverted;c=a.height+a.pos-(e?c.plotLeft:c.plotTop);f=f.isNegative&&!d||!f.isNegative&&d;return{x:e?f?q:q-b:n,y:e?c-n-g:f?c-q-b:c-q,width:e?b:g,height:e?g:b}}};t.prototype.getStacks=function(){var c=this,f=c.inverted;c.yAxis.forEach(function(c){c.stacks&&c.hasVisibleSeries&&
(c.oldStacks=c.stacks)});c.series.forEach(function(h){var n=h.xAxis&&h.xAxis.options||{};!h.options.stacking||!0!==h.visible&&!1!==c.options.chart.ignoreHiddenSeries||(h.stackKey=[h.type,B(h.options.stack,""),f?n.top:n.left,f?n.height:n.width].join())})};f.prototype.buildStacks=function(){var c=this.series,f=B(this.options.reversedStacks,!0),n=c.length,q;if(!this.isXAxis){this.usePercentage=!1;for(q=n;q--;)c[f?q:n-q-1].setStackedPoints();for(q=0;q<n;q++)c[q].modifyStacks()}};f.prototype.renderStackTotals=
function(){var c=this.chart,f=c.renderer,n=this.stacks,q=this.stackTotalGroup;q||(this.stackTotalGroup=q=f.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());q.translate(c.plotLeft,c.plotTop);z(n,function(c){z(c,function(b){b.render(q)})})};f.prototype.resetStacks=function(){var c=this,f=c.stacks;c.isXAxis||z(f,function(f){z(f,function(h,g){h.touched<c.stacksTouched?(h.destroy(),delete f[g]):(h.total=null,h.cumulative=null)})})};f.prototype.cleanStacks=function(){if(!this.isXAxis){if(this.oldStacks)var c=
this.stacks=this.oldStacks;z(c,function(c){z(c,function(c){c.cumulative=c.total})})}};H.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var f=this.processedXData,h=this.processedYData,n=[],q=h.length,g=this.options,b=g.threshold,a=B(g.startFromThreshold&&b,0),d=g.stack;g=g.stacking;var e=this.stackKey,l="-"+e,t=this.negStacks,E=this.yAxis,p=E.stacks,u=E.oldStacks,k,r;E.stacksTouched+=1;for(r=0;r<q;r++){var x=f[r];
var A=h[r];var w=this.getStackIndicator(w,x,this.index);var m=w.key;var K=(k=t&&A<(a?0:b))?l:e;p[K]||(p[K]={});p[K][x]||(u[K]&&u[K][x]?(p[K][x]=u[K][x],p[K][x].total=null):p[K][x]=new c.StackItem(E,E.options.stackLabels,k,x,d));K=p[K][x];null!==A?(K.points[m]=K.points[this.index]=[B(K.cumulative,a)],F(K.cumulative)||(K.base=m),K.touched=E.stacksTouched,0<w.index&&!1===this.singleStacks&&(K.points[m][0]=K.points[this.index+","+x+",0"][0])):K.points[m]=K.points[this.index]=null;"percent"===g?(k=k?e:
l,t&&p[k]&&p[k][x]?(k=p[k][x],K.total=k.total=Math.max(k.total,K.total)+Math.abs(A)||0):K.total=v(K.total+(Math.abs(A)||0))):K.total=v(K.total+(A||0));K.cumulative=B(K.cumulative,a)+(A||0);null!==A&&(K.points[m].push(K.cumulative),n[r]=K.cumulative)}"percent"===g&&(E.usePercentage=!0);this.stackedYData=n;E.oldStacks={}}};H.prototype.modifyStacks=function(){var c=this,f=c.stackKey,n=c.yAxis.stacks,q=c.processedXData,g,b=c.options.stacking;c[b+"Stacker"]&&[f,"-"+f].forEach(function(a){for(var d=q.length,
e,f;d--;)if(e=q[d],g=c.getStackIndicator(g,e,c.index,a),f=(e=n[a]&&n[a][e])&&e.points[g.key])c[b+"Stacker"](f,e,d)})};H.prototype.percentStacker=function(c,f,n){f=f.total?100/f.total:0;c[0]=v(c[0]*f);c[1]=v(c[1]*f);this.stackedYData[n]=c[1]};H.prototype.getStackIndicator=function(c,f,n,q){!F(c)||c.x!==f||q&&c.key!==q?c={x:f,index:0,key:q}:c.index++;c.key=[n,f,c.index].join();return c}});M(I,"parts/Dynamics.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.erase,
z=f.extend,B=f.isArray,t=f.isNumber,v=f.isObject,C=f.isString,H=f.objectEach,y=f.pick,h=f.setAnimation,n=f.splat,q=c.addEvent,g=c.animate,b=c.Axis;f=c.Chart;var a=c.createElement,d=c.css,e=c.fireEvent,l=c.merge,L=c.Point,E=c.Series,p=c.seriesTypes;c.cleanRecursively=function(a,b){var d={};H(a,function(e,g){if(v(a[g],!0)&&!a.nodeType&&b[g])e=c.cleanRecursively(a[g],b[g]),Object.keys(e).length&&(d[g]=e);else if(v(a[g])||a[g]!==b[g])d[g]=a[g]});return d};z(f.prototype,{addSeries:function(a,b,d){var c,
g=this;a&&(b=y(b,!0),e(g,"addSeries",{options:a},function(){c=g.initSeries(a);g.isDirtyLegend=!0;g.linkSeries();e(g,"afterAddSeries",{series:c});b&&g.redraw(d)}));return c},addAxis:function(a,b,d,c){return this.createAxis(b?"xAxis":"yAxis",{axis:a,redraw:d,animation:c})},addColorAxis:function(a,b,d){return this.createAxis("colorAxis",{axis:a,redraw:b,animation:d})},createAxis:function(a,d){var e=this.options,g="colorAxis"===a,k=d.redraw,f=d.animation;d=l(d.axis,{index:this[a].length,isX:"xAxis"===
a});var h=g?new c.ColorAxis(this,d):new b(this,d);e[a]=n(e[a]||{});e[a].push(d);g&&(this.isDirtyLegend=!0,this.axes.forEach(function(a){a.series=[]}),this.series.forEach(function(a){a.bindAxes();a.isDirtyData=!0}));y(k,!0)&&this.redraw(f);return h},showLoading:function(b){var c=this,e=c.options,f=c.loadingDiv,h=e.loading,l=function(){f&&d(f,{left:c.plotLeft+"px",top:c.plotTop+"px",width:c.plotWidth+"px",height:c.plotHeight+"px"})};f||(c.loadingDiv=f=a("div",{className:"highcharts-loading highcharts-loading-hidden"},
null,c.container),c.loadingSpan=a("span",{className:"highcharts-loading-inner"},null,f),q(c,"redraw",l));f.className="highcharts-loading";c.loadingSpan.innerHTML=y(b,e.lang.loading,"");c.styledMode||(d(f,z(h.style,{zIndex:10})),d(c.loadingSpan,h.labelStyle),c.loadingShown||(d(f,{opacity:0,display:""}),g(f,{opacity:h.style.opacity||.5},{duration:h.showDuration||0})));c.loadingShown=!0;l()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",
this.styledMode||g(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){d(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
collectionsWithUpdate:"xAxis yAxis zAxis colorAxis series pane".split(" "),update:function(a,b,d,g){var k=this,f={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle",caption:"setCaption"},h,p,r,u=a.isResponsiveOptions,q=[];e(k,"update",{options:a});u||k.setResponsive(!1,!0);a=c.cleanRecursively(a,k.options);l(!0,k.userOptions,a);if(h=a.chart){l(!0,k.options.chart,h);"className"in h&&k.setClassName(h.className);"reflow"in h&&k.setReflow(h.reflow);if("inverted"in h||"polar"in h||"type"in h){k.propFromSeries();
var x=!0}"alignTicks"in h&&(x=!0);H(h,function(a,b){-1!==k.propsRequireUpdateSeries.indexOf("chart."+b)&&(p=!0);-1!==k.propsRequireDirtyBox.indexOf(b)&&(k.isDirtyBox=!0);u||-1===k.propsRequireReflow.indexOf(b)||(r=!0)});!k.styledMode&&"style"in h&&k.renderer.setStyle(h.style)}!k.styledMode&&a.colors&&(this.options.colors=a.colors);a.plotOptions&&l(!0,this.options.plotOptions,a.plotOptions);a.time&&this.time===c.time&&(this.time=new c.Time(a.time));H(a,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,
!1);else if("function"===typeof k[f[b]])k[f[b]](a);"chart"!==b&&-1!==k.propsRequireUpdateSeries.indexOf(b)&&(p=!0)});this.collectionsWithUpdate.forEach(function(b){if(a[b]){if("series"===b){var c=[];k[b].forEach(function(a,b){a.options.isInternal||c.push(y(a.options.index,b))})}n(a[b]).forEach(function(a,e){(e=F(a.id)&&k.get(a.id)||k[b][c?c[e]:e])&&e.coll===b&&(e.update(a,!1),d&&(e.touched=!0));!e&&d&&k.collectionsWithInit[b]&&(k.collectionsWithInit[b][0].apply(k,[a].concat(k.collectionsWithInit[b][1]||
[]).concat([!1])).touched=!0)});d&&k[b].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:q.push(a)})}});q.forEach(function(a){a.remove&&a.remove(!1)});x&&k.axes.forEach(function(a){a.update({},!1)});p&&k.series.forEach(function(a){a.update({},!1)});a.loading&&l(!0,k.options.loading,a.loading);x=h&&h.width;h=h&&h.height;C(h)&&(h=c.relativeLength(h,x||k.chartWidth));r||t(x)&&x!==k.chartWidth||t(h)&&h!==k.chartHeight?k.setSize(x,h,g):y(b,!0)&&k.redraw(g);e(k,"afterUpdate",{options:a,
redraw:b,animation:g})},setSubtitle:function(a,b){this.applyDescription("subtitle",a);this.layOutTitles(b)},setCaption:function(a,b){this.applyDescription("caption",a);this.layOutTitles(b)}});f.prototype.collectionsWithInit={xAxis:[f.prototype.addAxis,[!0]],yAxis:[f.prototype.addAxis,[!1]],colorAxis:[f.prototype.addColorAxis,[!1]],series:[f.prototype.addSeries]};z(L.prototype,{update:function(a,b,d,c){function e(){g.applyOptions(a);null===g.y&&f&&(g.graphic=f.destroy());v(a,!0)&&(f&&f.element&&a&&
a.marker&&void 0!==a.marker.symbol&&(g.graphic=f.destroy()),a&&a.dataLabels&&g.dataLabel&&(g.dataLabel=g.dataLabel.destroy()),g.connector&&(g.connector=g.connector.destroy()));h=g.index;k.updateParallelArrays(g,h);p.data[h]=v(p.data[h],!0)||v(a,!0)?g.options:y(a,p.data[h]);k.isDirty=k.isDirtyData=!0;!k.fixedBox&&k.hasCartesianSeries&&(l.isDirtyBox=!0);"point"===p.legendType&&(l.isDirtyLegend=!0);b&&l.redraw(d)}var g=this,k=g.series,f=g.graphic,h,l=k.chart,p=k.options;b=y(b,!0);!1===c?e():g.firePointEvent("update",
{options:a},e)},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),a,b)}});z(E.prototype,{addPoint:function(a,b,d,c,g){var k=this.options,f=this.data,h=this.chart,l=this.xAxis;l=l&&l.hasNames&&l.names;var p=k.data,r=this.xData,n;b=y(b,!0);var u={series:this};this.pointClass.prototype.applyOptions.apply(u,[a]);var q=u.x;var x=r.length;if(this.requireSorting&&q<r[x-1])for(n=!0;x&&r[x-1]>q;)x--;this.updateParallelArrays(u,"splice",x,0,0);this.updateParallelArrays(u,x);l&&u.name&&
(l[q]=u.name);p.splice(x,0,a);n&&(this.data.splice(x,0,null),this.processData());"point"===k.legendType&&this.generatePoints();d&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(u,"shift"),p.shift()));!1!==g&&e(this,"addPoint",{point:u});this.isDirtyData=this.isDirty=!0;b&&h.redraw(c)},removePoint:function(a,b,d){var c=this,e=c.data,g=e[a],k=c.points,f=c.chart,l=function(){k&&k.length===e.length&&k.splice(a,1);e.splice(a,1);c.options.data.splice(a,1);c.updateParallelArrays(g||
{series:c},"splice",a,1);g&&g.destroy();c.isDirty=!0;c.isDirtyData=!0;b&&f.redraw()};h(d,f);b=y(b,!0);g?g.firePointEvent("remove",null,l):l()},remove:function(a,b,d,c){function g(){k.destroy(c);k.remove=null;f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();y(a,!0)&&f.redraw(b)}var k=this,f=k.chart;!1!==d?e(k,"remove",null,g):g()},update:function(a,b){a=c.cleanRecursively(a,this.userOptions);e(this,"update",{options:a});var d=this,g=d.chart,k=d.userOptions,f=d.initialType||d.type,h=a.type||k.type||g.options.chart.type,
n=!(this.hasDerivedData||a.dataGrouping||h&&h!==this.type||void 0!==a.pointStart||a.pointInterval||a.pointIntervalUnit||a.keys),u=p[f].prototype,q,v=["group","markerGroup","dataLabelsGroup","transformGroup"],t=["eventOptions","navigatorSeries","baseSeries"],E=d.finishedAnimating&&{animation:!1},C={};n&&(t.push("data","isDirtyData","points","processedXData","processedYData","xIncrement","_hasPointMarkers","_hasPointLabels","mapMap","mapData","minY","maxY","minX","maxX"),!1!==a.visible&&t.push("area",
"graph"),d.parallelArrays.forEach(function(a){t.push(a+"Data")}),a.data&&this.setData(a.data,!1));a=l(k,E,{index:void 0===k.index?d.index:k.index,pointStart:y(k.pointStart,d.xData[0])},!n&&{data:d.options.data},a);n&&a.data&&(a.data=d.options.data);t=v.concat(t);t.forEach(function(a){t[a]=d[a];delete d[a]});d.remove(!1,null,!1,!0);for(q in u)d[q]=void 0;p[h||f]?z(d,p[h||f].prototype):c.error(17,!0,g,{missingModuleFor:h||f});t.forEach(function(a){d[a]=t[a]});d.init(g,a);if(n&&this.points){var L=d.options;
!1===L.visible?(C.graphic=1,C.dataLabel=1):d._hasPointLabels||(h=L.marker,u=L.dataLabels,h&&(!1===h.enabled||"symbol"in h)&&(C.graphic=1),u&&!1===u.enabled&&(C.dataLabel=1));this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(C).length&&a.destroyElements(C),!1===L.showInLegend&&a.legendItem&&g.legend.destroyItem(a))},this)}a.zIndex!==k.zIndex&&v.forEach(function(b){d[b]&&d[b].attr({zIndex:a.zIndex})});d.initialType=f;g.linkSeries();e(this,"afterUpdate");y(b,!0)&&g.redraw(n?
void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});z(b.prototype,{update:function(a,b){var d=this.chart,c=a&&a.events||{};a=l(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);H(d.options[this.coll].events,function(a,b){"undefined"===typeof c[b]&&(c[b]=void 0)});this.destroy(!0);this.init(d,z(a,{events:c}));d.isDirtyBox=!0;y(b,!0)&&d.redraw()},remove:function(a){for(var b=
this.chart,d=this.coll,c=this.series,e=c.length;e--;)c[e]&&c[e].remove(!1);G(b.axes,this);G(b[d],this);B(b.options[d])?b.options[d].splice(this.options.index,1):delete b.options[d];b[d].forEach(function(a,b){a.options.index=a.userOptions.index=b});this.destroy();b.isDirtyBox=!0;y(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})});M(I,"parts/AreaSeries.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=
f.objectEach,G=f.pick,z=c.color,B=c.Series;f=c.seriesType;f("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(c){var f=[],t=[],z=this.xAxis,y=this.yAxis,h=y.stacks[this.stackKey],n={},q=this.index,g=y.series,b=g.length,a=G(y.options.reversedStacks,!0)?1:-1,d;c=c||this.points;if(this.options.stacking){for(d=0;d<c.length;d++)c[d].leftNull=c[d].rightNull=void 0,n[c[d].x]=c[d];F(h,function(a,b){null!==a.total&&t.push(b)});t.sort(function(a,b){return a-b});var e=g.map(function(a){return a.visible});
t.forEach(function(c,g){var l=0,p,u;if(n[c]&&!n[c].isNull)f.push(n[c]),[-1,1].forEach(function(k){var f=1===k?"rightNull":"leftNull",l=0,v=h[t[g+k]];if(v)for(d=q;0<=d&&d<b;)p=v.points[d],p||(d===q?n[c][f]=!0:e[d]&&(u=h[c].points[d])&&(l-=u[1]-u[0])),d+=a;n[c][1===k?"rightCliff":"leftCliff"]=l});else{for(d=q;0<=d&&d<b;){if(p=h[c].points[d]){l=p[1];break}d+=a}l=y.translate(l,0,1,0,1);f.push({isNull:!0,plotX:z.translate(c,0,0,0,1),x:c,plotY:l,yBottom:l})}})}return f},getGraphPath:function(c){var f=B.prototype.getGraphPath,
t=this.options,z=t.stacking,y=this.yAxis,h,n=[],q=[],g=this.index,b=y.stacks[this.stackKey],a=t.threshold,d=Math.round(y.getThreshold(t.threshold));t=G(t.connectNulls,"percent"===z);var e=function(e,f,k){var h=c[e];e=z&&b[h.x].points[g];var l=h[k+"Null"]||0;k=h[k+"Cliff"]||0;h=!0;if(k||l){var p=(l?e[0]:e[1])+k;var u=e[0]+k;h=!!l}else!z&&c[f]&&c[f].isNull&&(p=u=a);void 0!==p&&(q.push({plotX:L,plotY:null===p?d:y.getThreshold(p),isNull:h,isCliff:!0}),n.push({plotX:L,plotY:null===u?d:y.getThreshold(u),
doCurve:!1}))};c=c||this.points;z&&(c=this.getStackPoints(c));for(h=0;h<c.length;h++){z||(c[h].leftCliff=c[h].rightCliff=c[h].leftNull=c[h].rightNull=void 0);var l=c[h].isNull;var L=G(c[h].rectPlotX,c[h].plotX);var E=G(c[h].yBottom,d);if(!l||t)t||e(h,h-1,"left"),l&&!z&&t||(q.push(c[h]),n.push({x:h,plotX:L,plotY:E})),t||e(h,h+1,"right")}h=f.call(this,q,!0,!0);n.reversed=!0;l=f.call(this,n,!0,!0);l.length&&(l[0]="L");l=h.concat(l);f=f.call(this,q,!1,t);l.xMap=h.xMap;this.areaPath=l;return f},drawGraph:function(){this.areaPath=
[];B.prototype.drawGraph.apply(this);var c=this,f=this.areaPath,C=this.options,H=[["area","highcharts-area",this.color,C.fillColor]];this.zones.forEach(function(f,h){H.push(["zone-area-"+h,"highcharts-area highcharts-zone-area-"+h+" "+f.className,f.color||c.color,f.fillColor||C.fillColor])});H.forEach(function(v){var h=v[0],n=c[h],q=n?"animate":"attr",g={};n?(n.endX=c.preventGraphAnimation?null:f.xMap,n.animate({d:f})):(g.zIndex=0,n=c[h]=c.chart.renderer.path(f).addClass(v[1]).add(c.group),n.isArea=
!0);c.chart.styledMode||(g.fill=G(v[3],z(v[2]).setOpacity(G(C.fillOpacity,.75)).get()));n[q](g);n.startX=f.xMap;n.shiftUnit=C.step?2:1})},drawLegendSymbol:c.LegendSymbolMixin.drawRectangle});""});M(I,"parts/SplineSeries.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.pick;c=c.seriesType;c("spline","line",{},{getPointSpline:function(c,f,B){var t=f.plotX,v=f.plotY,C=c[B-1];B=c[B+1];if(C&&!C.isNull&&!1!==C.doCurve&&!f.isCliff&&B&&!B.isNull&&!1!==B.doCurve&&!f.isCliff){c=C.plotY;
var z=B.plotX;B=B.plotY;var y=0;var h=(1.5*t+C.plotX)/2.5;var n=(1.5*v+c)/2.5;z=(1.5*t+z)/2.5;var q=(1.5*v+B)/2.5;z!==h&&(y=(q-n)*(z-t)/(z-h)+v-q);n+=y;q+=y;n>c&&n>v?(n=Math.max(c,v),q=2*v-n):n<c&&n<v&&(n=Math.min(c,v),q=2*v-n);q>B&&q>v?(q=Math.max(B,v),n=2*v-q):q<B&&q<v&&(q=Math.min(B,v),n=2*v-q);f.rightContX=z;f.rightContY=q}f=["C",F(C.rightContX,C.plotX),F(C.rightContY,C.plotY),F(h,t),F(n,v),t,v];C.rightContX=C.rightContY=null;return f}});""});M(I,"parts/AreaSplineSeries.js",[I["parts/Globals.js"]],
function(c){var f=c.seriesTypes.area.prototype,F=c.seriesType;F("areaspline","spline",c.defaultPlotOptions.area,{getStackPoints:f.getStackPoints,getGraphPath:f.getGraphPath,drawGraph:f.drawGraph,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle});""});M(I,"parts/ColumnSeries.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.extend,z=f.isNumber,B=f.pick,t=c.animObject,v=c.color,C=c.merge,H=c.Series;f=c.seriesType;var y=c.svg;f("column","line",{borderRadius:0,crisp:!0,
groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){H.prototype.init.apply(this,arguments);var c=this,f=c.chart;
f.hasRendered&&f.series.forEach(function(f){f.type===c.type&&(f.isDirty=!0)})},getColumnMetrics:function(){var c=this,f=c.options,q=c.xAxis,g=c.yAxis,b=q.options.reversedStacks;b=q.reversed&&!b||!q.reversed&&b;var a,d={},e=0;!1===f.grouping?e=1:c.chart.series.forEach(function(b){var f=b.yAxis,k=b.options;if(b.type===c.type&&(b.visible||!c.chart.options.chart.ignoreHiddenSeries)&&g.len===f.len&&g.pos===f.pos){if(k.stacking){a=b.stackKey;void 0===d[a]&&(d[a]=e++);var h=d[a]}else!1!==k.grouping&&(h=
e++);b.columnIndex=h}});var l=Math.min(Math.abs(q.transA)*(q.ordinalSlope||f.pointRange||q.closestPointRange||q.tickInterval||1),q.len),v=l*f.groupPadding,t=(l-2*v)/(e||1);f=Math.min(f.maxPointWidth||q.len,B(f.pointWidth,t*(1-2*f.pointPadding)));c.columnMetrics={width:f,offset:(t-f)/2+(v+((c.columnIndex||0)+(b?1:0))*t-l/2)*(b?-1:1)};return c.columnMetrics},crispCol:function(c,f,q,g){var b=this.chart,a=this.borderWidth,d=-(a%2?.5:0);a=a%2?.5:1;b.inverted&&b.renderer.isVML&&(a+=1);this.options.crisp&&
(q=Math.round(c+q)+d,c=Math.round(c)+d,q-=c);g=Math.round(f+g)+a;d=.5>=Math.abs(f)&&.5<g;f=Math.round(f)+a;g-=f;d&&g&&(--f,g+=1);return{x:c,y:f,width:q,height:g}},translate:function(){var c=this,f=c.chart,q=c.options,g=c.dense=2>c.closestPointRange*c.xAxis.transA;g=c.borderWidth=B(q.borderWidth,g?0:1);var b=c.yAxis,a=q.threshold,d=c.translatedThreshold=b.getThreshold(a),e=B(q.minPointLength,5),l=c.getColumnMetrics(),v=l.width,t=c.barW=Math.max(v,1+2*g),p=c.pointXOffset=l.offset,u=c.dataMin,k=c.dataMax;
f.inverted&&(d-=.5);q.pointPadding&&(t=Math.ceil(t));H.prototype.translate.apply(c);c.points.forEach(function(g){var h=B(g.yBottom,d),l=999+Math.abs(h),r=v;l=Math.min(Math.max(-l,g.plotY),b.len+l);var m=g.plotX+p,n=t,q=Math.min(l,h),y=Math.max(l,h)-q;if(e&&Math.abs(y)<e){y=e;var E=!b.reversed&&!g.negative||b.reversed&&g.negative;g.y===a&&c.dataMax<=a&&b.min<a&&u!==k&&(E=!E);q=Math.abs(q-d)>e?h-e:d-(E?e:0)}F(g.options.pointWidth)&&(r=n=Math.ceil(g.options.pointWidth),m-=Math.round((r-v)/2));g.barX=
m;g.pointWidth=r;g.tooltipPos=f.inverted?[b.len+b.pos-f.plotLeft-l,c.xAxis.len-m-n/2,y]:[m+n/2,l+b.pos-f.plotTop,y];g.shapeType=c.pointClass.prototype.shapeType||"rect";g.shapeArgs=c.crispCol.apply(c,g.isNull?[m,d,n,0]:[m,q,n,y])})},getSymbol:c.noop,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(c,f){var h=this.options,g=this.pointAttrToOptions||{};var b=g.stroke||"borderColor";
var a=g["stroke-width"]||"borderWidth",d=c&&c.color||this.color,e=c&&c[b]||h[b]||this.color||d,l=c&&c[a]||h[a]||this[a]||0;g=c&&c.options.dashStyle||h.dashStyle;var n=B(h.opacity,1);if(c&&this.zones.length){var t=c.getZone();d=c.options.color||t&&(t.color||c.nonZonedColor)||this.color;t&&(e=t.borderColor||e,g=t.dashStyle||g,l=t.borderWidth||l)}f&&(c=C(h.states[f],c.options.states&&c.options.states[f]||{}),f=c.brightness,d=c.color||void 0!==f&&v(d).brighten(c.brightness).get()||d,e=c[b]||e,l=c[a]||
l,g=c.dashStyle||g,n=B(c.opacity,n));b={fill:d,stroke:e,"stroke-width":l,opacity:n};g&&(b.dashstyle=g);return b},drawPoints:function(){var c=this,f=this.chart,q=c.options,g=f.renderer,b=q.animationLimit||250,a;c.points.forEach(function(d){var e=d.graphic,l=e&&f.pointCount<b?"animate":"attr";if(z(d.plotY)&&null!==d.y){a=d.shapeArgs;e&&d.hasNewShapeType()&&(e=e.destroy());if(e)e[l](C(a));else d.graphic=e=g[d.shapeType](a).add(d.group||c.group);if(q.borderRadius)e[l]({r:q.borderRadius});f.styledMode||
e[l](c.pointAttribs(d,d.selected&&"select")).shadow(!1!==d.allowShadow&&q.shadow,null,q.stacking&&!q.borderRadius);e.addClass(d.getClassName(),!0)}else e&&(d.graphic=e.destroy())})},animate:function(c){var f=this,h=this.yAxis,g=f.options,b=this.chart.inverted,a={},d=b?"translateX":"translateY";if(y)if(c)a.scaleY=.001,c=Math.min(h.pos+h.len,Math.max(h.pos,h.toPixels(g.threshold))),b?a.translateX=c-h.len:a.translateY=c,f.clipBox&&f.setClip(),f.group.attr(a);else{var e=f.group.attr(d);f.group.animate({scaleY:1},
G(t(f.options.animation),{step:function(b,c){a[d]=e+c.pos*(h.pos-e);f.group.attr(a)}}));f.animate=null}},remove:function(){var c=this,f=c.chart;f.hasRendered&&f.series.forEach(function(f){f.type===c.type&&(f.isDirty=!0)});H.prototype.remove.apply(c,arguments)}});""});M(I,"parts/BarSeries.js",[I["parts/Globals.js"]],function(c){c=c.seriesType;c("bar","column",null,{inverted:!0});""});M(I,"parts/ScatterSeries.js",[I["parts/Globals.js"]],function(c){var f=c.Series,F=c.seriesType;F("scatter","line",{lineWidth:0,
findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"}},{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&f.prototype.drawGraph.call(this)},applyJitter:function(){var c=this,f=this.options.jitter,
B=this.points.length;f&&this.points.forEach(function(t,v){["x","y"].forEach(function(C,z){var y="plot"+C.toUpperCase();if(f[C]&&!t.isNull){var h=c[C+"Axis"];var n=f[C]*h.transA;if(h&&!h.isLog){var q=Math.max(0,t[y]-n);h=Math.min(h.len,t[y]+n);z=1E4*Math.sin(v+z*B);t[y]=q+(h-q)*(z-Math.floor(z));"x"===C&&(t.clientX=t.plotX)}}})})}});c.addEvent(f,"afterTranslate",function(){this.applyJitter&&this.applyJitter()});""});M(I,"mixins/centered-series.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,
f){var F=f.isNumber,G=f.pick,z=c.deg2rad,B=c.relativeLength;c.CenteredSeriesMixin={getCenter:function(){var c=this.options,f=this.chart,C=2*(c.slicedOffset||0),z=f.plotWidth-2*C;f=f.plotHeight-2*C;var y=c.center;y=[G(y[0],"50%"),G(y[1],"50%"),c.size||"100%",c.innerSize||0];var h=Math.min(z,f),n;for(n=0;4>n;++n){var q=y[n];c=2>n||2===n&&/%$/.test(q);y[n]=B(q,[z,f,h,y[2]][n])+(c?C:0)}y[3]>y[2]&&(y[3]=y[2]);return y},getStartAndEndRadians:function(c,f){c=F(c)?c:0;f=F(f)&&f>c&&360>f-c?f:c+360;return{start:z*
(c+-90),end:z*(f+-90)}}}});M(I,"parts/PieSeries.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.isNumber,z=f.pick,B=f.setAnimation,t=c.addEvent;f=c.CenteredSeriesMixin;var v=f.getStartAndEndRadians,C=c.merge,H=c.noop,y=c.Point,h=c.Series,n=c.seriesType,q=c.fireEvent;n("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},
softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},fillColor:void 0,ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,lineWidth:void 0,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:c.seriesTypes.column.prototype.pointAttribs,
animate:function(c){var b=this,a=b.points,d=b.startAngleRad;c||(a.forEach(function(a){var c=a.graphic,e=a.shapeArgs;c&&(c.attr({r:a.startR||b.center[3]/2,start:d,end:d}),c.animate({r:e.r,start:e.start,end:e.end},b.options.animation))}),b.animate=null)},hasData:function(){return!!this.processedXData.length},updateTotals:function(){var c,b=0,a=this.points,d=a.length,e=this.options.ignoreHiddenPoint;for(c=0;c<d;c++){var f=a[c];b+=e&&!f.visible?0:f.isNull?0:f.y}this.total=b;for(c=0;c<d;c++)f=a[c],f.percentage=
0<b&&(f.visible||!e)?f.y/b*100:0,f.total=b},generatePoints:function(){h.prototype.generatePoints.call(this);this.updateTotals()},getX:function(c,b,a){var d=this.center,e=this.radii?this.radii[a.index]:d[2]/2;return d[0]+(b?-1:1)*Math.cos(Math.asin(Math.max(Math.min((c-d[1])/(e+a.labelDistance),1),-1)))*(e+a.labelDistance)+(0<a.labelDistance?(b?-1:1)*this.options.dataLabels.padding:0)},translate:function(g){this.generatePoints();var b=0,a=this.options,d=a.slicedOffset,e=d+(a.borderWidth||0),f=v(a.startAngle,
a.endAngle),h=this.startAngleRad=f.start;f=(this.endAngleRad=f.end)-h;var n=this.points,p=a.dataLabels.distance;a=a.ignoreHiddenPoint;var u,k=n.length;g||(this.center=g=this.getCenter());for(u=0;u<k;u++){var r=n[u];var x=h+b*f;if(!a||r.visible)b+=r.percentage/100;var A=h+b*f;r.shapeType="arc";r.shapeArgs={x:g[0],y:g[1],r:g[2]/2,innerR:g[3]/2,start:Math.round(1E3*x)/1E3,end:Math.round(1E3*A)/1E3};r.labelDistance=z(r.options.dataLabels&&r.options.dataLabels.distance,p);r.labelDistance=c.relativeLength(r.labelDistance,
r.shapeArgs.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,r.labelDistance);A=(A+x)/2;A>1.5*Math.PI?A-=2*Math.PI:A<-Math.PI/2&&(A+=2*Math.PI);r.slicedTranslation={translateX:Math.round(Math.cos(A)*d),translateY:Math.round(Math.sin(A)*d)};var w=Math.cos(A)*g[2]/2;var m=Math.sin(A)*g[2]/2;r.tooltipPos=[g[0]+.7*w,g[1]+.7*m];r.half=A<-Math.PI/2||A>Math.PI/2?1:0;r.angle=A;x=Math.min(e,r.labelDistance/5);r.labelPosition={natural:{x:g[0]+w+Math.cos(A)*r.labelDistance,y:g[1]+m+Math.sin(A)*r.labelDistance},
"final":{},alignment:0>r.labelDistance?"center":r.half?"right":"left",connectorPosition:{breakAt:{x:g[0]+w+Math.cos(A)*x,y:g[1]+m+Math.sin(A)*x},touchingSliceAt:{x:g[0]+w,y:g[1]+m}}}}q(this,"afterTranslate")},drawEmpty:function(){var c=this.options;if(0===this.total){var b=this.center[0];var a=this.center[1];this.graph||(this.graph=this.chart.renderer.circle(b,a,0).addClass("highcharts-graph").add(this.group));this.graph.animate({"stroke-width":c.borderWidth,cx:b,cy:a,r:this.center[2]/2,fill:c.fillColor||
"none",stroke:c.color||"#cccccc"})}else this.graph&&(this.graph=this.graph.destroy())},redrawPoints:function(){var c=this,b=c.chart,a=b.renderer,d,e,f,h,n=c.options.shadow;this.drawEmpty();!n||c.shadowGroup||b.styledMode||(c.shadowGroup=a.g("shadow").attr({zIndex:-1}).add(c.group));c.points.forEach(function(g){var l={};e=g.graphic;if(!g.isNull&&e){h=g.shapeArgs;d=g.getTranslate();if(!b.styledMode){var k=g.shadowGroup;n&&!k&&(k=g.shadowGroup=a.g("shadow").add(c.shadowGroup));k&&k.attr(d);f=c.pointAttribs(g,
g.selected&&"select")}g.delayedRendering?(e.setRadialReference(c.center).attr(h).attr(d),b.styledMode||e.attr(f).attr({"stroke-linejoin":"round"}).shadow(n,k),g.delayedRendering=!1):(e.setRadialReference(c.center),b.styledMode||C(!0,l,f),C(!0,l,h,d),e.animate(l));e.attr({visibility:g.visible?"inherit":"hidden"});e.addClass(g.getClassName())}else e&&(g.graphic=e.destroy())})},drawPoints:function(){var c=this.chart.renderer;this.points.forEach(function(b){b.graphic||(b.graphic=c[b.shapeType](b.shapeArgs).add(b.series.group),
b.delayedRendering=!0)})},searchPoint:H,sortByAngle:function(c,b){c.sort(function(a,d){return void 0!==a.angle&&(d.angle-a.angle)*b})},drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,getCenter:f.getCenter,getSymbol:H,drawGraph:null},{init:function(){y.prototype.init.apply(this,arguments);var c=this;c.name=z(c.name,"Slice");var b=function(a){c.slice("select"===a.type)};t(c,"select",b);t(c,"unselect",b);return c},isValid:function(){return G(this.y)&&0<=this.y},setVisible:function(c,b){var a=this,
d=a.series,e=d.chart,f=d.options.ignoreHiddenPoint;b=z(b,f);c!==a.visible&&(a.visible=a.options.visible=c=void 0===c?!a.visible:c,d.options.data[d.data.indexOf(a)]=a.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(b){if(a[b])a[b][c?"show":"hide"](!0)}),a.legendItem&&e.legend.colorizeItem(a,c),c||"hover"!==a.state||a.setState(""),f&&(d.isDirty=!0),b&&e.redraw())},slice:function(c,b,a){var d=this.series;B(a,d.chart);z(b,!0);this.sliced=this.options.sliced=F(c)?c:!this.sliced;
d.options.data[d.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(c){var b=this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(b.x,b.y,b.r+c,b.r+c,{innerR:b.r-1,start:b.start,end:b.end})},connectorShapes:{fixedOffset:function(c,b,a){var d=b.breakAt;b=b.touchingSliceAt;
return["M",c.x,c.y].concat(a.softConnector?["C",c.x+("left"===c.alignment?-5:5),c.y,2*d.x-b.x,2*d.y-b.y,d.x,d.y]:["L",d.x,d.y]).concat(["L",b.x,b.y])},straight:function(c,b){b=b.touchingSliceAt;return["M",c.x,c.y,"L",b.x,b.y]},crookedLine:function(f,b,a){b=b.touchingSliceAt;var d=this.series,e=d.center[0],g=d.chart.plotWidth,h=d.chart.plotLeft;d=f.alignment;var n=this.shapeArgs.r;a=c.relativeLength(a.crookDistance,1);a="left"===d?e+n+(g+h-e-n)*(1-a):h+(e-n)*a;e=["L",a,f.y];if("left"===d?a>f.x||a<
b.x:a<f.x||a>b.x)e=[];return["M",f.x,f.y].concat(e).concat(["L",b.x,b.y])}},getConnectorPath:function(){var c=this.labelPosition,b=this.series.options.dataLabels,a=b.connectorShape,d=this.connectorShapes;d[a]&&(a=d[a]);return a.call(this,{x:c.final.x,y:c.final.y,alignment:c.alignment},c.connectorPosition,b)}});""});M(I,"parts/DataLabels.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.arrayMax,G=f.defined,z=f.extend,B=f.isArray,t=f.objectEach,v=f.pick,C=f.splat,H=c.format,
y=c.merge;f=c.noop;var h=c.relativeLength,n=c.Series,q=c.seriesTypes,g=c.stableSort;c.distribute=function(b,a,d){function e(a,b){return a.target-b.target}var f,h=!0,n=b,p=[];var u=0;var k=n.reducedLen||a;for(f=b.length;f--;)u+=b[f].size;if(u>k){g(b,function(a,b){return(b.rank||0)-(a.rank||0)});for(u=f=0;u<=k;)u+=b[f].size,f++;p=b.splice(f-1,b.length)}g(b,e);for(b=b.map(function(a){return{size:a.size,targets:[a.target],align:v(a.align,.5)}});h;){for(f=b.length;f--;)h=b[f],u=(Math.min.apply(0,h.targets)+
Math.max.apply(0,h.targets))/2,h.pos=Math.min(Math.max(0,u-h.size*h.align),a-h.size);f=b.length;for(h=!1;f--;)0<f&&b[f-1].pos+b[f-1].size>b[f].pos&&(b[f-1].size+=b[f].size,b[f-1].targets=b[f-1].targets.concat(b[f].targets),b[f-1].align=.5,b[f-1].pos+b[f-1].size>a&&(b[f-1].pos=a-b[f-1].size),b.splice(f,1),h=!0)}n.push.apply(n,p);f=0;b.some(function(b){var e=0;if(b.targets.some(function(){n[f].pos=b.pos+e;if(Math.abs(n[f].pos-n[f].target)>d)return n.slice(0,f+1).forEach(function(a){delete a.pos}),n.reducedLen=
(n.reducedLen||a)-.1*a,n.reducedLen>.1*a&&c.distribute(n,a,d),!0;e+=n[f].size;f++}))return!0});g(n,e)};n.prototype.drawDataLabels=function(){function b(a,b){var d=b.filter;return d?(b=d.operator,a=a[d.property],d=d.value,">"===b&&a>d||"<"===b&&a<d||">="===b&&a>=d||"<="===b&&a<=d||"=="===b&&a==d||"==="===b&&a===d?!0:!1):!0}function a(a,b){var d=[],c;if(B(a)&&!B(b))d=a.map(function(a){return y(a,b)});else if(B(b)&&!B(a))d=b.map(function(b){return y(a,b)});else if(B(a)||B(b))for(c=Math.max(a.length,
b.length);c--;)d[c]=y(a[c],b[c]);else d=y(a,b);return d}var d=this,e=d.chart,f=d.options,g=f.dataLabels,h=d.points,p,n=d.hasRendered||0,k=c.animObject(f.animation).duration,r=Math.min(k,200),q=!e.renderer.forExport&&v(g.defer,0<r),A=e.renderer;g=a(a(e.options.plotOptions&&e.options.plotOptions.series&&e.options.plotOptions.series.dataLabels,e.options.plotOptions&&e.options.plotOptions[d.type]&&e.options.plotOptions[d.type].dataLabels),g);c.fireEvent(this,"drawDataLabels");if(B(g)||g.enabled||d._hasPointLabels){var w=
d.plotGroup("dataLabelsGroup","data-labels",q&&!n?"hidden":"inherit",g.zIndex||6);q&&(w.attr({opacity:+n}),n||setTimeout(function(){var a=d.dataLabelsGroup;a&&(d.visible&&w.show(!0),a[f.animation?"animate":"attr"]({opacity:1},{duration:r}))},k-r));h.forEach(function(c){p=C(a(g,c.dlOptions||c.options&&c.options.dataLabels));p.forEach(function(a,g){var k=a.enabled&&(!c.isNull||c.dataLabelOnNull)&&b(c,a),h=c.dataLabels?c.dataLabels[g]:c.dataLabel,l=c.connectors?c.connectors[g]:c.connector,p=v(a.distance,
c.labelDistance),m=!h;if(k){var r=c.getLabelConfig();var n=v(a[c.formatPrefix+"Format"],a.format);r=G(n)?H(n,r,e.time):(a[c.formatPrefix+"Formatter"]||a.formatter).call(r,a);n=a.style;var u=a.rotation;e.styledMode||(n.color=v(a.color,n.color,d.color,"#000000"),"contrast"===n.color&&(c.contrastColor=A.getContrast(c.color||d.color),n.color=!G(p)&&a.inside||0>p||f.stacking?c.contrastColor:"#000000"),f.cursor&&(n.cursor=f.cursor));var q={r:a.borderRadius||0,rotation:u,padding:a.padding,zIndex:1};e.styledMode||
(q.fill=a.backgroundColor,q.stroke=a.borderColor,q["stroke-width"]=a.borderWidth);t(q,function(a,b){void 0===a&&delete q[b]})}!h||k&&G(r)?k&&G(r)&&(h?q.text=r:(c.dataLabels=c.dataLabels||[],h=c.dataLabels[g]=u?A.text(r,0,-9999).addClass("highcharts-data-label"):A.label(r,0,-9999,a.shape,null,null,a.useHTML,null,"data-label"),g||(c.dataLabel=h),h.addClass(" highcharts-data-label-color-"+c.colorIndex+" "+(a.className||"")+(a.useHTML?" highcharts-tracker":""))),h.options=a,h.attr(q),e.styledMode||h.css(n).shadow(a.shadow),
h.added||h.add(w),a.textPath&&!a.useHTML&&h.setTextPath(c.getDataLabelPath&&c.getDataLabelPath(h)||c.graphic,a.textPath),d.alignDataLabel(c,h,a,null,m)):(c.dataLabel=c.dataLabel&&c.dataLabel.destroy(),c.dataLabels&&(1===c.dataLabels.length?delete c.dataLabels:delete c.dataLabels[g]),g||delete c.dataLabel,l&&(c.connector=c.connector.destroy(),c.connectors&&(1===c.connectors.length?delete c.connectors:delete c.connectors[g])))})})}c.fireEvent(this,"afterDrawDataLabels")};n.prototype.alignDataLabel=
function(b,a,d,c,f){var e=this.chart,g=this.isCartesian&&e.inverted,h=v(b.dlBox&&b.dlBox.centerX,b.plotX,-9999),l=v(b.plotY,-9999),k=a.getBBox(),n=d.rotation,q=d.align,A=this.visible&&(b.series.forceDL||e.isInsidePlot(h,Math.round(l),g)||c&&e.isInsidePlot(h,g?c.x+1:c.y+c.height-1,g)),w="justify"===v(d.overflow,"justify");if(A){var m=e.renderer.fontMetrics(e.styledMode?void 0:d.style.fontSize,a).b;c=z({x:g?this.yAxis.len-l:h,y:Math.round(g?this.xAxis.len-h:l),width:0,height:0},c);z(d,{width:k.width,
height:k.height});n?(w=!1,h=e.renderer.rotCorr(m,n),h={x:c.x+d.x+c.width/2+h.x,y:c.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*c.height},a[f?"attr":"animate"](h).attr({align:q}),l=(n+720)%360,l=180<l&&360>l,"left"===q?h.y-=l?k.height:0:"center"===q?(h.x-=k.width/2,h.y-=k.height/2):"right"===q&&(h.x-=k.width,h.y-=l?0:k.height),a.placed=!0,a.alignAttr=h):(a.align(d,null,c),h=a.alignAttr);w&&0<=c.height?this.justifyDataLabel(a,d,h,k,c,f):v(d.crop,!0)&&(A=e.isInsidePlot(h.x,h.y)&&e.isInsidePlot(h.x+
k.width,h.y+k.height));if(d.shape&&!n)a[f?"attr":"animate"]({anchorX:g?e.plotWidth-b.plotY:b.plotX,anchorY:g?e.plotHeight-b.plotX:b.plotY})}A||(a.hide(!0),a.placed=!1)};n.prototype.justifyDataLabel=function(b,a,d,c,f,g){var e=this.chart,h=a.align,l=a.verticalAlign,k=b.box?0:b.padding||0;var n=d.x+k;if(0>n){"right"===h?(a.align="left",a.inside=!0):a.x=-n;var q=!0}n=d.x+c.width-k;n>e.plotWidth&&("left"===h?(a.align="right",a.inside=!0):a.x=e.plotWidth-n,q=!0);n=d.y+k;0>n&&("bottom"===l?(a.verticalAlign=
"top",a.inside=!0):a.y=-n,q=!0);n=d.y+c.height-k;n>e.plotHeight&&("top"===l?(a.verticalAlign="bottom",a.inside=!0):a.y=e.plotHeight-n,q=!0);q&&(b.placed=!g,b.align(a,null,f));return q};q.pie&&(q.pie.prototype.dataLabelPositioners={radialDistributionY:function(b){return b.top+b.distributeBox.pos},radialDistributionX:function(b,a,d,c){return b.getX(d<a.top+2||d>a.bottom-2?c:d,a.half,a)},justify:function(b,a,d){return d[0]+(b.half?-1:1)*(a+b.labelDistance)},alignToPlotEdges:function(b,a,d,c){b=b.getBBox().width;
return a?b+c:d-b-c},alignToConnectors:function(b,a,d,c){var e=0,f;b.forEach(function(a){f=a.dataLabel.getBBox().width;f>e&&(e=f)});return a?e+c:d-e-c}},q.pie.prototype.drawDataLabels=function(){var b=this,a=b.data,d,e=b.chart,f=b.options.dataLabels,g=f.connectorPadding,h,p=e.plotWidth,u=e.plotHeight,k=e.plotLeft,r=Math.round(e.chartWidth/3),q,A=b.center,w=A[2]/2,m=A[1],t,z,C,B,H=[[],[]],I,D,N,M,R=[0,0,0,0],P=b.dataLabelPositioners,W;b.visible&&(f.enabled||b._hasPointLabels)&&(a.forEach(function(a){a.dataLabel&&
a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),n.prototype.drawDataLabels.apply(b),a.forEach(function(a){a.dataLabel&&(a.visible?(H[a.half].push(a),a.dataLabel._pos=null,!G(f.style.width)&&!G(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>r&&(a.dataLabel.css({width:.7*r}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&
1===a.dataLabels.length&&delete a.dataLabels))}),H.forEach(function(a,h){var l=a.length,n=[],r;if(l){b.sortByAngle(a,h-.5);if(0<b.maxLabelDistance){var q=Math.max(0,m-w-b.maxLabelDistance);var x=Math.min(m+w+b.maxLabelDistance,e.plotHeight);a.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,m-w-a.labelDistance),a.bottom=Math.min(m+w+a.labelDistance,e.plotHeight),r=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+r/2,size:r,rank:a.y},n.push(a.distributeBox))});
q=x+r-q;c.distribute(n,q,q/5)}for(M=0;M<l;M++){d=a[M];C=d.labelPosition;t=d.dataLabel;N=!1===d.visible?"hidden":"inherit";D=q=C.natural.y;n&&G(d.distributeBox)&&(void 0===d.distributeBox.pos?N="hidden":(B=d.distributeBox.size,D=P.radialDistributionY(d)));delete d.positionIndex;if(f.justify)I=P.justify(d,w,A);else switch(f.alignTo){case "connectors":I=P.alignToConnectors(a,h,p,k);break;case "plotEdges":I=P.alignToPlotEdges(t,h,p,k);break;default:I=P.radialDistributionX(b,d,D,q)}t._attr={visibility:N,
align:C.alignment};t._pos={x:I+f.x+({left:g,right:-g}[C.alignment]||0),y:D+f.y-10};C.final.x=I;C.final.y=D;v(f.crop,!0)&&(z=t.getBBox().width,q=null,I-z<g&&1===h?(q=Math.round(z-I+g),R[3]=Math.max(q,R[3])):I+z>p-g&&0===h&&(q=Math.round(I+z-p+g),R[1]=Math.max(q,R[1])),0>D-B/2?R[0]=Math.max(Math.round(-D+B/2),R[0]):D+B/2>u&&(R[2]=Math.max(Math.round(D+B/2-u),R[2])),t.sideOverflow=q)}}}),0===F(R)||this.verifyDataLabelOverflow(R))&&(this.placeDataLabels(),this.points.forEach(function(a){W=y(f,a.options.dataLabels);
if(h=v(W.connectorWidth,1)){var d;q=a.connector;if((t=a.dataLabel)&&t._pos&&a.visible&&0<a.labelDistance){N=t._attr.visibility;if(d=!q)a.connector=q=e.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(b.dataLabelsGroup),e.styledMode||q.attr({"stroke-width":h,stroke:W.connectorColor||a.color||"#666666"});q[d?"attr":"animate"]({d:a.getConnectorPath()});q.attr("visibility",N)}else q&&(a.connector=q.destroy())}}))},q.pie.prototype.placeDataLabels=
function(){this.points.forEach(function(b){var a=b.dataLabel,d;a&&b.visible&&((d=a._pos)?(a.sideOverflow&&(a._attr.width=Math.max(a.getBBox().width-a.sideOverflow,0),a.css({width:a._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),a.shortened=!0),a.attr(a._attr),a[a.moved?"animate":"attr"](d),a.moved=!0):a&&a.attr({y:-9999}));delete b.distributeBox},this)},q.pie.prototype.alignDataLabel=f,q.pie.prototype.verifyDataLabelOverflow=function(b){var a=this.center,
d=this.options,c=d.center,f=d.minSize||80,g=null!==d.size;if(!g){if(null!==c[0])var n=Math.max(a[2]-Math.max(b[1],b[3]),f);else n=Math.max(a[2]-b[1]-b[3],f),a[0]+=(b[3]-b[1])/2;null!==c[1]?n=Math.max(Math.min(n,a[2]-Math.max(b[0],b[2])),f):(n=Math.max(Math.min(n,a[2]-b[0]-b[2]),f),a[1]+=(b[0]-b[2])/2);n<a[2]?(a[2]=n,a[3]=Math.min(h(d.innerSize||0,n),n),this.translate(a),this.drawDataLabels&&this.drawDataLabels()):g=!0}return g});q.column&&(q.column.prototype.alignDataLabel=function(b,a,d,c,f){var e=
this.chart.inverted,g=b.series,h=b.dlBox||b.shapeArgs,l=v(b.below,b.plotY>v(this.translatedThreshold,g.yAxis.len)),k=v(d.inside,!!this.options.stacking);h&&(c=y(h),0>c.y&&(c.height+=c.y,c.y=0),h=c.y+c.height-g.yAxis.len,0<h&&(c.height-=h),e&&(c={x:g.yAxis.len-c.y-c.height,y:g.xAxis.len-c.x-c.width,width:c.height,height:c.width}),k||(e?(c.x+=l?0:c.width,c.width=0):(c.y+=l?c.height:0,c.height=0)));d.align=v(d.align,!e||k?"center":l?"right":"left");d.verticalAlign=v(d.verticalAlign,e||k?"middle":l?"top":
"bottom");n.prototype.alignDataLabel.call(this,b,a,d,c,f);d.inside&&b.contrastColor&&a.css({color:b.contrastColor})})});M(I,"modules/overlapping-datalabels.src.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.isArray,G=f.objectEach,z=f.pick;f=c.Chart;var B=c.addEvent,t=c.fireEvent;B(f,"render",function(){var c=[];(this.labelCollectors||[]).forEach(function(f){c=c.concat(f())});(this.yAxis||[]).forEach(function(f){f.options.stackLabels&&!f.options.stackLabels.allowOverlap&&
G(f.stacks,function(f){G(f,function(f){c.push(f.label)})})});(this.series||[]).forEach(function(f){var v=f.options.dataLabels;f.visible&&(!1!==v.enabled||f._hasPointLabels)&&f.points.forEach(function(f){f.visible&&(F(f.dataLabels)?f.dataLabels:f.dataLabel?[f.dataLabel]:[]).forEach(function(h){var n=h.options;h.labelrank=z(n.labelrank,f.labelrank,f.shapeArgs&&f.shapeArgs.height);n.allowOverlap||c.push(h)})})});this.hideOverlappingLabels(c)});f.prototype.hideOverlappingLabels=function(c){var f=this,
v=c.length,y=f.renderer,h,n,q;var g=function(a){var b=a.box?0:a.padding||0;var d=0;if(a&&(!a.alignAttr||a.placed)){var c=a.attr("x");var f=a.attr("y");c="number"===typeof c&&"number"===typeof f?{x:c,y:f}:a.alignAttr;f=a.parentGroup;a.width||(d=a.getBBox(),a.width=d.width,a.height=d.height,d=y.fontMetrics(null,a.element).h);return{x:c.x+(f.translateX||0)+b,y:c.y+(f.translateY||0)+b-d,width:a.width-2*b,height:a.height-2*b}}};for(n=0;n<v;n++)if(h=c[n])h.oldOpacity=h.opacity,h.newOpacity=1,h.absoluteBox=
g(h);c.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(n=0;n<v;n++){var b=(g=c[n])&&g.absoluteBox;for(h=n+1;h<v;++h){var a=(q=c[h])&&q.absoluteBox;!b||!a||g===q||0===g.newOpacity||0===q.newOpacity||a.x>b.x+b.width||a.x+a.width<b.x||a.y>b.y+b.height||a.y+a.height<b.y||((g.labelrank<q.labelrank?g:q).newOpacity=0)}}c.forEach(function(a){var b;if(a){var d=a.newOpacity;a.oldOpacity!==d&&(a.alignAttr&&a.placed?(d?a.show(!0):b=function(){a.hide(!0);a.placed=!1},a.alignAttr.opacity=d,a[a.isOld?
"animate":"attr"](a.alignAttr,null,b),t(f,"afterHideOverlappingLabels")):a.attr({opacity:d}));a.isOld=!0}})}});M(I,"parts/Interaction.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.defined,G=f.extend,z=f.isArray,B=f.isObject,t=f.objectEach,v=f.pick,C=c.addEvent;f=c.Chart;var H=c.createElement,y=c.css,h=c.defaultOptions,n=c.defaultPlotOptions,q=c.fireEvent,g=c.hasTouch,b=c.Legend,a=c.merge,d=c.Point,e=c.Series,l=c.seriesTypes,I=c.svg;var E=c.TrackerMixin={drawTrackerPoint:function(){var a=
this,b=a.chart,d=b.pointer,c=function(a){var b=d.getPointFromEvent(a);void 0!==b&&(d.isDirectTouch=!0,b.onMouseOver(a))},e;a.points.forEach(function(a){e=z(a.dataLabels)?a.dataLabels:a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);e.forEach(function(b){b.div?b.div.point=a:b.element.point=a})});a._hasTracking||(a.trackerGroups.forEach(function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",c).on("mouseout",function(a){d.onTrackerMouseOut(a)});if(g)a[e].on("touchstart",
c);!b.styledMode&&a.options.cursor&&a[e].css(y).css({cursor:a.options.cursor})}}),a._hasTracking=!0);q(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,d=b.trackByArea,c=[].concat(d?a.areaPath:a.graphPath),e=c.length,f=a.chart,h=f.pointer,l=f.renderer,n=f.options.tooltip.snap,v=a.tracker,t,y=function(){if(f.hoverSeries!==a)a.onMouseOver()},z="rgba(192,192,192,"+(I?.0001:.002)+")";if(e&&!d)for(t=e+1;t--;)"M"===c[t]&&c.splice(t+1,0,c[t+1]-n,c[t+2],"L"),(t&&"M"===c[t]||t===
e)&&c.splice(t,0,"L",c[t-2]+n,c[t-1]);v?v.attr({d:c}):a.graph&&(a.tracker=l.path(c).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(d?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),f.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:z,fill:d?z:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*n)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",y).on("mouseout",function(a){h.onTrackerMouseOut(a)});b.cursor&&
!f.styledMode&&a.css({cursor:b.cursor});if(g)a.on("touchstart",y)}));q(this,"afterDrawTracker")}};l.column&&(l.column.prototype.drawTracker=E.drawTrackerPoint);l.pie&&(l.pie.prototype.drawTracker=E.drawTrackerPoint);l.scatter&&(l.scatter.prototype.drawTracker=E.drawTrackerPoint);G(b.prototype,{setItemEvents:function(b,c,e){var f=this,g=f.chart.renderer.boxWrapper,k=b instanceof d,h="highcharts-legend-"+(k?"point":"series")+"-active",l=f.chart.styledMode;(e?c:b.legendGroup).on("mouseover",function(){b.visible&&
f.allItems.forEach(function(a){b!==a&&a.setState("inactive",!k)});b.setState("hover");b.visible&&g.addClass(h);l||c.css(f.options.itemHoverStyle)}).on("mouseout",function(){f.chart.styledMode||c.css(a(b.visible?f.itemStyle:f.itemHiddenStyle));f.allItems.forEach(function(a){b!==a&&a.setState("",!k)});g.removeClass(h);b.setState()}).on("click",function(a){var c=function(){b.setVisible&&b.setVisible();f.allItems.forEach(function(a){b!==a&&a.setState(b.visible?"inactive":"",!k)})};g.removeClass(h);a=
{browserEvent:a};b.firePointEvent?b.firePointEvent("legendItemClick",a,c):q(b,"legendItemClick",a,c)})},createCheckboxForItem:function(a){a.checkbox=H("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);C(a.checkbox,"click",function(b){q(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});G(f.prototype,{showResetZoom:function(){function a(){b.zoomOut()}
var b=this,c=h.lang,d=b.options.chart.resetZoomButton,e=d.theme,f=e.states,g="chart"===d.relativeTo||"spaceBox"===d.relativeTo?null:"plotBox";q(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,e,f&&f.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,g)});q(this,"afterShowResetZoom")},zoomOut:function(){q(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var b=
this,c,d=b.pointer,e=!1,f=b.inverted?d.mouseDownX:d.mouseDownY;!a||a.resetSelection?(b.axes.forEach(function(a){c=a.zoom()}),d.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var g=a.axis,k=b.inverted?g.left:g.top,h=b.inverted?k+g.width:k+g.height,l=g.isXAxis,m=!1;if(!l&&f>=k&&f<=h||l||!F(f))m=!0;d[l?"zoomX":"zoomY"]&&m&&(c=g.zoom(a.min,a.max),g.displayBtn&&(e=!0))});var g=b.resetZoomButton;e&&!g?b.showResetZoom():!e&&B(g)&&(b.resetZoomButton=g.destroy());c&&b.redraw(v(b.options.chart.animation,
a&&a.animation,100>b.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,e;q(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState()});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,f=a[d?"chartX":"chartY"];d=d?"mouseDownX":"mouseDownY";var g=c[d],k=(b.pointRange||0)/2,h=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,l=b.getExtremes(),p=b.toValue(g-f,!0)+k*h;h=b.toValue(g+b.len-f,!0)-k*h;var n=h<p;g=n?h:p;p=n?p:h;h=Math.min(l.dataMin,
k?l.min:b.toValue(b.toPixels(l.min)-b.minPixelPadding));k=Math.max(l.dataMax,k?l.max:b.toValue(b.toPixels(l.max)+b.minPixelPadding));n=h-g;0<n&&(p+=n,g=h);n=p-k;0<n&&(p=k,g-=n);b.series.length&&g!==l.min&&p!==l.max&&(b.setExtremes(g,p,!1,!1,{trigger:"pan"}),e=!0);c[d]=f});e&&c.redraw(!1);y(c.container,{cursor:"move"})})}});G(d.prototype,{select:function(a,b){var c=this,d=c.series,e=d.chart;this.selectedStaging=a=v(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=
c.options.selected=a;d.options.data[d.data.indexOf(c)]=c.options;c.setState(a&&"select");b||e.getSelectedPoints().forEach(function(a){var b=a.series;a.selected&&a!==c&&(a.selected=a.options.selected=!1,b.options.data[b.data.indexOf(a)]=a.options,a.setState(e.hoverPoints&&b.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"))})});delete this.selectedStaging},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);
c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,d=a(b.series.options.point,b.options).events;b.events=d;t(d,function(a,d){c.isFunction(a)&&C(b,d,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=this.series,d=this.state,e=c.options.states[a||
"normal"]||{},f=n[c.type].marker&&c.options.marker,g=f&&!1===f.enabled,h=f&&f.states&&f.states[a||"normal"]||{},l=!1===h.enabled,p=c.stateMarkerGraphic,u=this.marker||{},t=c.chart,y=c.halo,z,B=f&&c.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===e.enabled||a&&(l||g&&!1===h.enabled)||a&&u.states&&u.states[a]&&!1===u.states[a].enabled)){this.state=a;B&&(z=c.markerAttribs(this,a));if(this.graphic){d&&this.graphic.removeClass("highcharts-point-"+d);a&&this.graphic.addClass("highcharts-point-"+
a);if(!t.styledMode){var C=c.pointAttribs(this,a);var H=v(t.options.chart.animation,e.animation);c.options.inactiveOtherPoints&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:C.opacity},H)}),this.connector&&this.connector.animate({opacity:C.opacity},H));this.graphic.animate(C,H)}z&&this.graphic.animate(z,v(t.options.chart.animation,h.animation,f.animation));p&&p.hide()}else{if(a&&h){d=u.symbol||c.symbol;p&&p.currentSymbol!==d&&(p=p.destroy());if(z)if(p)p[b?"animate":"attr"]({x:z.x,
y:z.y});else d&&(c.stateMarkerGraphic=p=t.renderer.symbol(d,z.x,z.y,z.width,z.height).add(c.markerGroup),p.currentSymbol=d);!t.styledMode&&p&&p.attr(c.pointAttribs(this,a))}p&&(p[a&&this.isInside?"show":"hide"](),p.element.point=this)}a=e.halo;e=(p=this.graphic||p)&&p.visibility||"inherit";a&&a.size&&p&&"hidden"!==e?(y||(c.halo=y=t.renderer.path().add(p.parentGroup)),y.show()[b?"animate":"attr"]({d:this.haloPath(a.size)}),y.attr({"class":"highcharts-halo highcharts-color-"+v(this.colorIndex,c.colorIndex)+
(this.className?" "+this.className:""),visibility:e,zIndex:-1}),y.point=this,t.styledMode||y.attr(G({fill:this.color||c.color,"fill-opacity":a.opacity},a.attributes))):y&&y.point&&y.point.haloPath&&y.animate({d:y.point.haloPath(0)},null,y.hide);q(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});G(e.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&
q(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&q(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0)})},setState:function(a,b){var c=this,d=c.options,e=c.graph,f=d.inactiveOtherPoints,g=d.states,h=d.lineWidth,l=d.opacity,n=v(g[a||"normal"]&&g[a||"normal"].animation,
c.chart.options.chart.animation);d=0;a=a||"";if(c.state!==a&&([c.group,c.markerGroup,c.dataLabelsGroup].forEach(function(b){b&&(c.state&&b.removeClass("highcharts-series-"+c.state),a&&b.addClass("highcharts-series-"+a))}),c.state=a,!c.chart.styledMode)){if(g[a]&&!1===g[a].enabled)return;a&&(h=g[a].lineWidth||h+(g[a].lineWidthPlus||0),l=v(g[a].opacity,l));if(e&&!e.dashstyle)for(g={"stroke-width":h},e.animate(g,n);c["zone-graph-"+d];)c["zone-graph-"+d].attr(g),d+=1;f||[c.group,c.markerGroup,c.dataLabelsGroup,
c.labelBySeries].forEach(function(a){a&&a.animate({opacity:l},n)})}b&&f&&c.points&&c.setAllPointsToState(a)},setAllPointsToState:function(a){this.points.forEach(function(b){b.setState&&b.setState(a)})},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f=d.options.chart.ignoreHiddenSeries,g=c.visible;var h=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!g:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][h]()});if(d.hoverSeries===
c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});f&&(d.isDirtyBox=!0);q(c,h);!1!==b&&d.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);
q(this,a?"select":"unselect")},drawTracker:E.drawTrackerGraph})});M(I,"parts/Responsive.js",[I["parts/Globals.js"],I["parts/Utilities.js"]],function(c,f){var F=f.isArray,G=f.isObject,z=f.objectEach,B=f.pick,t=f.splat;f=c.Chart;f.prototype.setResponsive=function(f,t){var v=this.options.responsive,y=[],h=this.currentResponsive;!t&&v&&v.rules&&v.rules.forEach(function(f){void 0===f._id&&(f._id=c.uniqueKey());this.matchResponsiveRule(f,y)},this);t=c.merge.apply(0,y.map(function(f){return c.find(v.rules,
function(c){return c._id===f}).chartOptions}));t.isResponsiveOptions=!0;y=y.toString()||void 0;y!==(h&&h.ruleIds)&&(h&&this.update(h.undoOptions,f,!0),y?(h=this.currentOptions(t),h.isResponsiveOptions=!0,this.currentResponsive={ruleIds:y,mergedOptions:t,undoOptions:h},this.update(t,f,!0)):this.currentResponsive=void 0)};f.prototype.matchResponsiveRule=function(c,f){var t=c.condition;(t.callback||function(){return this.chartWidth<=B(t.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=B(t.maxHeight,Number.MAX_VALUE)&&
this.chartWidth>=B(t.minWidth,0)&&this.chartHeight>=B(t.minHeight,0)}).call(this)&&f.push(c._id)};f.prototype.currentOptions=function(c){function f(c,n,q,g){var b;z(c,function(a,c){if(!g&&-1<v.collectionsWithUpdate.indexOf(c))for(a=t(a),q[c]=[],b=0;b<a.length;b++)n[c][b]&&(q[c][b]={},f(a[b],n[c][b],q[c][b],g+1));else G(a)?(q[c]=F(a)?[]:{},f(a,n[c]||{},q[c],g+1)):q[c]=void 0===n[c]?null:n[c]})}var v=this,y={};f(c,this.options,y,0);return y}});M(I,"masters/highcharts.src.js",[I["parts/Globals.js"],
I["parts/Utilities.js"]],function(c,f){var F=f.extend;F(c,{arrayMax:f.arrayMax,arrayMin:f.arrayMin,attr:f.attr,defined:f.defined,erase:f.erase,extend:f.extend,isArray:f.isArray,isClass:f.isClass,isDOMElement:f.isDOMElement,isNumber:f.isNumber,isObject:f.isObject,isString:f.isString,objectEach:f.objectEach,pick:f.pick,pInt:f.pInt,setAnimation:f.setAnimation,splat:f.splat,syncTimeout:f.syncTimeout});return c});I["masters/highcharts.src.js"]._modules=I;return I["masters/highcharts.src.js"]});
//# sourceMappingURL=highcharts.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "nav",
      { staticClass: "navbar navbar-expand-md navbar-light navbar-laravel" },
      [
        _c(
          "div",
          { staticClass: "container" },
          [
            _c(
              "router-link",
              { staticClass: "navbar-brand", attrs: { to: { name: "home" } } },
              [_vm._v("Tempr")]
            )
          ],
          1
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "main",
      { staticClass: "py-4" },
      [
        _c("router-view"),
        _vm._v(" "),
        _c("highcharts", { attrs: { options: _vm.chartOptions } })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-50e73d1e", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(23)
}
var normalizeComponent = __webpack_require__(5)
/* script */
var __vue_script__ = __webpack_require__(28)
/* template */
var __vue_template__ = __webpack_require__(29)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/views/Welcome.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40504942", Component.options)
  } else {
    hotAPI.reload("data-v-40504942", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(26)("01c43769", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-40504942\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Welcome.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-40504942\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Welcome.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(25)(false);
// imports


// module
exports.push([module.i, "\n.full-height {\n  height: 100vh;\n}\n.flex-center {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.position-ref {\n  position: relative;\n}\n.top-right {\n  position: absolute;\n  right: 10px;\n  top: 18px;\n}\n.content {\n  text-align: center;\n}\n.title {\n  font-size: 60px;\n}\n.links > a {\n  color: #636b6f;\n  padding: 0 25px;\n  font-size: 12px;\n  font-weight: 600;\n  letter-spacing: 0.1rem;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n.m-b-md {\n  margin-bottom: 30px;\n  color: #000000;\n}\n", ""]);

// exports


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(27)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-40504942", module.exports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);