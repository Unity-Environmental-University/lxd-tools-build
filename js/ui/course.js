/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 4148:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var _require = __webpack_require__(9597),
  _require$codes = _require.codes,
  ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
  ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
  ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
  ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
  ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
var AssertionError = __webpack_require__(3918);
var _require2 = __webpack_require__(537),
  inspect = _require2.inspect;
var _require$types = (__webpack_require__(537).types),
  isPromise = _require$types.isPromise,
  isRegExp = _require$types.isRegExp;
var objectAssign = __webpack_require__(1514)();
var objectIs = __webpack_require__(9394)();
var RegExpPrototypeTest = __webpack_require__(8075)('RegExp.prototype.test');
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;
function lazyLoadComparison() {
  var comparison = __webpack_require__(2299);
  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
}

// Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex
var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = (/* unused pure expression or super */ null && (["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"]));
var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};
var warned = false;

// The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {};

// All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}
function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;
  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }
    if (argsLen === 2) operator = '!=';
  }
  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };
  if (message !== undefined) {
    errArgs.message = message;
  }
  var err = new AssertionError(errArgs);
  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }
  throw err;
}
assert.fail = fail;

// The AssertionError is defined in internal/error.
assert.AssertionError = AssertionError;
function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;
    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }
    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}

// Pure assertion tests whether a value is truthy, as determined
// by !!value.
function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  innerOk.apply(void 0, [ok, args.length].concat(args));
}
assert.ok = ok;

// The equality assertion tests shallow, coercive equality with ==.
/* eslint-disable no-restricted-properties */
assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
};

// The non-equality assertion tests for whether two objects are not
// equal with !=.
assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  // eslint-disable-next-line eqeqeq
  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
};

// The equivalence assertion tests a deep equality relation.
assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
};

// The non-equivalence assertion tests for any deep inequality.
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (isDeepEqual === undefined) lazyLoadComparison();
  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}
assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }
  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};
var Comparison = /*#__PURE__*/_createClass(function Comparison(obj, keys, actual) {
  var _this = this;
  _classCallCheck(this, Comparison);
  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && RegExpPrototypeTest(obj[key], actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
});
function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}
function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return RegExpPrototypeTest(expected, actual);
    // assert.doesNotThrow does not accept objects.
    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    }

    // Handle primitives properly.
    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }
    var keys = Object.keys(expected);
    // Special handle errors to make sure the name and the message are compared
    // as well.
    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }
    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && RegExpPrototypeTest(expected[key], actual[key])) {
        return;
      }
      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  }
  // Guard instanceof against arrow functions as they don't have a prototype.
  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }
  if (Error.isPrototypeOf(expected)) {
    return false;
  }
  return expected.call({}, actual) === true;
}
function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }
  try {
    fn();
  } catch (e) {
    return e;
  }
  return NO_EXCEPTION_SENTINEL;
}
function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.

  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.

  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;
    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn();
      // Fail in case no promise is returned.
      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }
    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}
function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }
    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }
    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }
  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';
    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }
    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }
  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}
function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;
  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }
  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }
  throw actual;
}
assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }
  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};
assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }
  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};
assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }
  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};
assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }
  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};
assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';
    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }
    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    });

    // Make sure we actually have a stack trace!
    var origStack = err.stack;
    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift();
      // Filter all frames existing in err.stack.
      var tmp1 = newErr.stack.split('\n');
      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);
        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }
      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }
    throw newErr;
  }
};

// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a871df3dfb8ea663ef5e1f8f62701ec51384ecb
function internalMatch(string, regexp, message, fn, fnName) {
  if (!isRegExp(regexp)) {
    throw new ERR_INVALID_ARG_TYPE('regexp', 'RegExp', regexp);
  }
  var match = fnName === 'match';
  if (typeof string !== 'string' || RegExpPrototypeTest(regexp, string) !== match) {
    if (message instanceof Error) {
      throw message;
    }
    var generatedMessage = !message;

    // 'The input was expected to not match the regular expression ' +
    message = message || (typeof string !== 'string' ? 'The "string" argument must be of type string. Received type ' + "".concat(_typeof(string), " (").concat(inspect(string), ")") : (match ? 'The input did not match the regular expression ' : 'The input was expected to not match the regular expression ') + "".concat(inspect(regexp), ". Input:\n\n").concat(inspect(string), "\n"));
    var err = new AssertionError({
      actual: string,
      expected: regexp,
      message: message,
      operator: fnName,
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
}
assert.match = function match(string, regexp, message) {
  internalMatch(string, regexp, message, match, 'match');
};
assert.doesNotMatch = function doesNotMatch(string, regexp, message) {
  internalMatch(string, regexp, message, doesNotMatch, 'doesNotMatch');
};

// Expose a strict only variant of assert
function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }
  innerOk.apply(void 0, [strict, args.length].concat(args));
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ 3918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(5606);
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _require = __webpack_require__(537),
  inspect = _require.inspect;
var _require2 = __webpack_require__(9597),
  ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));
  while (count) {
    str += str;
    count--;
  }
  str += str.substring(0, maxCount - str.length);
  return str;
}
var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
};

// Comparing short primitives should just show === / !== instead of using the
// diff.
var kMaxShortLength = 10;
function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}
function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}
function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = '';

  // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.
  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  }

  // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.
  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length;
    // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.
    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;
      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        }
        // Ignore the first characters.
        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  }

  // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).
  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];
  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }
    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }
  var maxLines = Math.max(actualLines.length, expectedLines.length);
  // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })
  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n');

    // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.
    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);
      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }
    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }
  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }
  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }
  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");
  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;
    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the expected line to the cache.
      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++;
      // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }
        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      }
      // Mark the current line as the last diverging one.
      lastPos = i;
      // Add the actual line to the result.
      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++;
      // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i];
      // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.
      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine);
      // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //
      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }
      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }
          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        }
        // Mark the current line as the last diverging one.
        lastPos = i;
        // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.
        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2;
        // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = '';
        // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.
        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    }
    // Inspected object to big (Show ~20 rows max)
    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }
  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}
var AssertionError = /*#__PURE__*/function (_Error, _inspect$custom) {
  _inherits(AssertionError, _Error);
  var _super = _createSuper(AssertionError);
  function AssertionError(options) {
    var _this;
    _classCallCheck(this, AssertionError);
    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }
    var message = options.message,
      operator = options.operator,
      stackStartFn = options.stackStartFn;
    var actual = options.actual,
      expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;
    if (message != null) {
      _this = _super.call(this, String(message));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      }
      // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.
      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }
      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _super.call(this, createErrDiff(actual, expected, operator));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n');

        // In case "actual" is an object, it should not be reference equal.
        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        }

        // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.
        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);
          while (res.length > 27) {
            res.pop();
          }
        }

        // Only print a single input.
        if (res.length === 1) {
          _this = _super.call(this, "".concat(base, " ").concat(res[0]));
        } else {
          _this = _super.call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n"));
        }
      } else {
        var _res = inspectValue(actual);
        var other = '';
        var knownOperators = kReadableOperator[operator];
        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);
          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));
          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }
          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }
          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }
        _this = _super.call(this, "".concat(_res).concat(other));
      }
    }
    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;
    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    }
    // Create error message including the error code in the name.
    _this.stack;
    // Reset the name.
    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }
  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: _inspect$custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread(_objectSpread({}, ctx), {}, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);
  return AssertionError;
}( /*#__PURE__*/_wrapNativeSuper(Error), inspect.custom);
module.exports = AssertionError;

/***/ }),

/***/ 9597:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */
/* eslint node-core/alphabetize-errors: "error" */
/* eslint node-core/prefer-util-format-errors: "error" */



// The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var codes = {};

// Lazy loaded
var assert;
var util;
function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }
  var NodeError = /*#__PURE__*/function (_Base) {
    _inherits(NodeError, _Base);
    var _super = _createSuper(NodeError);
    function NodeError(arg1, arg2, arg3) {
      var _this;
      _classCallCheck(this, NodeError);
      _this = _super.call(this, getMessage(arg1, arg2, arg3));
      _this.code = code;
      return _this;
    }
    return _createClass(NodeError);
  }(Base);
  codes[code] = NodeError;
}

// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });
    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }
  return str.substring(this_len - search.length, this_len) === search;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }
  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}
createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(4148);
  assert(typeof name === 'string', "'name' must be a string");

  // determiner: 'must be' or 'must not be'
  var determiner;
  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }
  var msg;
  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  // TODO(BridgeAR): Improve the output by showing `null` and similar.
  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(537);
  var inspected = util.inspect(value);
  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }
  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;
  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }
  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (assert === undefined) assert = __webpack_require__(4148);
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });
  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;
    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;
    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }
  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ 2299:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var regexFlagsSupported = /a/g.flags !== undefined;
var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};
var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};
var objectIs = Object.is ? Object.is : __webpack_require__(7653);
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(4133);
function uncurryThis(f) {
  return f.call.bind(f);
}
var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);
var _require$types = (__webpack_require__(537).types),
  isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
  isArrayBufferView = _require$types.isArrayBufferView,
  isDate = _require$types.isDate,
  isMap = _require$types.isMap,
  isRegExp = _require$types.isRegExp,
  isSet = _require$types.isSet,
  isNativeError = _require$types.isNativeError,
  isBoxedPrimitive = _require$types.isBoxedPrimitive,
  isNumberObject = _require$types.isNumberObject,
  isStringObject = _require$types.isStringObject,
  isBooleanObject = _require$types.isBooleanObject,
  isBigIntObject = _require$types.isBigIntObject,
  isSymbolObject = _require$types.isSymbolObject,
  isFloat32Array = _require$types.isFloat32Array,
  isFloat64Array = _require$types.isFloat64Array;
function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;
  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  }
  // The maximum size for an array is 2 ** 32 -1.
  return key.length === 10 && key >= Math.pow(2, 32);
}
function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
}

// Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }
  var x = a.length;
  var y = b.length;
  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }
  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3;

// Check if they have the same source and flags
function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}
function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }
  return true;
}
function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}
function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}
function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }
  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }
  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }
  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }
  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
}

// Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.

function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  }

  // Check more closely if val1 and val2 are equal.
  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }
    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }
    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }
      return false;
    }
    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }
  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);
  if (val1Tag !== val2Tag) {
    return false;
  }
  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }
    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (keys1.length !== keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  }
  // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.
  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }
  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    }
    // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.
    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);
    if (_keys.length !== _keys2.length) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }
    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }
  return keyCheck(val1, val2, strict, memos, kNoIterator);
}
function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}
function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2);

    // The pair must have the same number of owned properties.
    if (aKeys.length !== bKeys.length) {
      return false;
    }
  }

  // Cheap key test
  var i = 0;
  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }
  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);
    if (symbolKeysA.length !== 0) {
      var count = 0;
      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];
        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }
          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }
      var symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);
      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }
  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  }

  // Use memos to handle cycles.
  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);
    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);
      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }
    memos.position++;
  }
  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}
function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];
    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }
  return false;
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').
function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;
    case 'object':
      // Only pass in null as object!
      return undefined;
    case 'symbol':
      return false;
    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through
    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }
  }
  return true;
}
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}
function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = b.get(altValue);
  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }
  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}
function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);
  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i];
    // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.
    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      }
      // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.
      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false;

      // Fast path to detect missing string, symbol, undefined and null values.
      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }
      if (set === null) {
        set = new Set();
      }
      set.add(val);
    }
  }
  if (set !== null) {
    var bValues = arrayFromSet(b);
    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i];
      // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.
      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);
  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];
    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }
  return false;
}
function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);
  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
      key = _aEntries$i[0],
      item1 = _aEntries$i[1];
    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }
      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);
      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false;
        // Fast path to detect missing string, symbol, undefined and null
        // keys.
        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;
        if (set === null) {
          set = new Set();
        }
        set.add(key);
      }
    }
  }
  if (set !== null) {
    var bEntries = arrayFromMap(b);
    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
        _key = _bEntries$_i[0],
        item = _bEntries$_i[1];
      if (_typeof(_key) === 'object' && _key !== null) {
        if (!mapHasEqualEntry(set, a, _key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(_key) || !innerDeepEqual(a.get(_key), item, false, memo)) && !mapHasEqualEntry(set, a, _key, item, false, memo)) {
        return false;
      }
    }
    return set.size === 0;
  }
  return true;
}
function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;
  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);
        for (; i < keysA.length; i++) {
          var key = keysA[i];
          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }
        if (keysA.length !== Object.keys(b).length) {
          return false;
        }
        return true;
      }
    }
  }

  // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:
  for (i = 0; i < keys.length; i++) {
    var _key2 = keys[i];
    if (!innerDeepEqual(a[_key2], b[_key2], strict, memos)) {
      return false;
    }
  }
  return true;
}
function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}
function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}
module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ 8075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);

var callBind = __webpack_require__(487);

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ 487:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(6743);
var GetIntrinsic = __webpack_require__(453);
var setFunctionLength = __webpack_require__(6897);

var $TypeError = __webpack_require__(9675);
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = __webpack_require__(655);
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ 276:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.lxd-notice{font-size:12px}`, "",{"version":3,"sources":["webpack://./src/ui/course/bigImages.scss"],"names":[],"mappings":"AAAA,YACE,cAAA","sourcesContent":[".lxd-notice {\r\n  font-size: 12px;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6399:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.lxd-modal{position:fixed;z-index:500;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.5)}.lxd-modal .modal-content{background-color:#fefefe;margin:15% auto;padding:20px;max-width:1200px;min-width:400px}.lxd-modal .lxd-close{color:#aaa;float:right;font-size:28px;font-weight:bold}.lxd-modal .lxd-close:hover,.lxd-modal .lxd-close:focus{color:#000;text-decoration:none;cursor:pointer}`, "",{"version":3,"sources":["webpack://./src/ui/widgets/Modal/modal.scss"],"names":[],"mappings":"AAAA,WACE,cAAA,CACA,WAAA,CACA,MAAA,CACA,KAAA,CACA,UAAA,CACA,WAAA,CACA,aAAA,CACA,+BAAA,CAEA,0BACE,wBAAA,CACA,eAAA,CACA,YAAA,CACA,gBAAA,CACA,eAAA,CAGF,sBACE,UAAA,CACA,WAAA,CACA,cAAA,CACA,gBAAA,CAEF,wDACE,UAAA,CACA,oBAAA,CACA,cAAA","sourcesContent":[".lxd-modal {\r\n  position: fixed;\r\n  z-index: 500;\r\n  left: 0;\r\n  top: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  overflow: auto;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n\r\n  .modal-content {\r\n    background-color: #fefefe;\r\n    margin: 15% auto;\r\n    padding: 20px;\r\n    max-width: 1200px;\r\n    min-width: 400px;\r\n  }\r\n\r\n  .lxd-close {\r\n    color: #aaa;\r\n    float: right;\r\n    font-size: 28px;\r\n    font-weight: bold;\r\n  }\r\n  .lxd-close:hover, .lxd-close:focus {\r\n    color: black;\r\n    text-decoration: none;\r\n    cursor: pointer;\r\n  }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 6314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 1354:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 41:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(655);

var $SyntaxError = __webpack_require__(8068);
var $TypeError = __webpack_require__(9675);

var gopd = __webpack_require__(5795);

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};


/***/ }),

/***/ 8452:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(1189);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = __webpack_require__(41);

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = __webpack_require__(592)();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ 655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;


/***/ }),

/***/ 1237:
/***/ ((module) => {

"use strict";


/** @type {import('./eval')} */
module.exports = EvalError;


/***/ }),

/***/ 9383:
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = Error;


/***/ }),

/***/ 9290:
/***/ ((module) => {

"use strict";


/** @type {import('./range')} */
module.exports = RangeError;


/***/ }),

/***/ 9538:
/***/ ((module) => {

"use strict";


/** @type {import('./ref')} */
module.exports = ReferenceError;


/***/ }),

/***/ 8068:
/***/ ((module) => {

"use strict";


/** @type {import('./syntax')} */
module.exports = SyntaxError;


/***/ }),

/***/ 9675:
/***/ ((module) => {

"use strict";


/** @type {import('./type')} */
module.exports = TypeError;


/***/ }),

/***/ 5345:
/***/ ((module) => {

"use strict";


/** @type {import('./uri')} */
module.exports = URIError;


/***/ }),

/***/ 2682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(9600);

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ 9353:
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ 6743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(9353);

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ 453:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $Error = __webpack_require__(9383);
var $EvalError = __webpack_require__(1237);
var $RangeError = __webpack_require__(9290);
var $ReferenceError = __webpack_require__(9538);
var $SyntaxError = __webpack_require__(8068);
var $TypeError = __webpack_require__(9675);
var $URIError = __webpack_require__(5345);

var $Function = Function;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(4039)();
var hasProto = __webpack_require__(24)();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(6743);
var hasOwn = __webpack_require__(9957);
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ 5795:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ 592:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $defineProperty = __webpack_require__(655);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ 24:
/***/ ((module) => {

"use strict";


var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};


/***/ }),

/***/ 4039:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(1333);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ 1333:
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ 9092:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(1333);

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ 9957:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __webpack_require__(6743);

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);


/***/ }),

/***/ 6698:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 7244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(9092)();
var callBound = __webpack_require__(8075);

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ 9600:
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ 8184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(9092)();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ 3003:
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ 4133:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(487);
var define = __webpack_require__(8452);

var implementation = __webpack_require__(3003);
var getPolyfill = __webpack_require__(6642);
var shim = __webpack_require__(2464);

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ 6642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(3003);

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ 2464:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(8452);
var getPolyfill = __webpack_require__(6642);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ 5680:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var whichTypedArray = __webpack_require__(5767);

/** @type {import('.')} */
module.exports = function isTypedArray(value) {
	return !!whichTypedArray(value);
};


/***/ }),

/***/ 9211:
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ 7653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(8452);
var callBind = __webpack_require__(487);

var implementation = __webpack_require__(9211);
var getPolyfill = __webpack_require__(9394);
var shim = __webpack_require__(6576);

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ 9394:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(9211);

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ 6576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(9394);
var define = __webpack_require__(8452);

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ 8875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(1093); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ 1189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(1093);

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(8875);

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ 1093:
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ 8403:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var objectKeys = __webpack_require__(1189);
var hasSymbols = __webpack_require__(1333)();
var callBound = __webpack_require__(8075);
var toObject = Object;
var $push = callBound('Array.prototype.push');
var $propIsEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
module.exports = function assign(target, source1) {
	if (target == null) { throw new TypeError('target must be an object'); }
	var to = toObject(target); // step 1
	if (arguments.length === 1) {
		return to; // step 2
	}
	for (var s = 1; s < arguments.length; ++s) {
		var from = toObject(arguments[s]); // step 3.a.i

		// step 3.a.ii:
		var keys = objectKeys(from);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			var syms = getSymbols(from);
			for (var j = 0; j < syms.length; ++j) {
				var key = syms[j];
				if ($propIsEnumerable(from, key)) {
					$push(keys, key);
				}
			}
		}

		// step 3.a.iii:
		for (var i = 0; i < keys.length; ++i) {
			var nextKey = keys[i];
			if ($propIsEnumerable(from, nextKey)) { // step 3.a.iii.2
				var propValue = from[nextKey]; // step 3.a.iii.2.a
				to[nextKey] = propValue; // step 3.a.iii.2.b
			}
		}
	}

	return to; // step 4
};


/***/ }),

/***/ 1514:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(8403);

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ 6578:
/***/ ((module) => {

"use strict";


/** @type {import('.')} */
module.exports = [
	'Float32Array',
	'Float64Array',
	'Int8Array',
	'Int16Array',
	'Int32Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Uint16Array',
	'Uint32Array',
	'BigInt64Array',
	'BigUint64Array'
];


/***/ }),

/***/ 5606:
/***/ ((module) => {

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

/***/ 2551:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(6540),ca=__webpack_require__(9982);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;
function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d)}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Sg(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(!0),Vg=Og(!1),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}
function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=!0),a.firstContext=null)}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a}}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a)}
function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=!1;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function mh(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function qh(a,b,c,d){var e=a.updateQueue;jh=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q}}
function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p(174));return a}
function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(uh);G(uh,b)}function zh(){E(uh);E(vh);E(wh)}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c))}function Bh(a){vh.current===a&&(E(uh),E(vh))}var L=Uf(0);
function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Dh=[];
function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=!1,Jh=!1,Kh=0,Lh=0;function P(){throw Error(p(321));}function Mh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=!1;Kh=0;if(25<=f)throw Error(p(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e)}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=!1;if(b)throw Error(p(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else{if(null===a)throw Error(p(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a}return O}
function Vh(a,b){return"function"===typeof b?b(a):b}
function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Yh(){}
function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=!0);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p(349));0!==(Hh&30)||di(c,b,e)}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a)}function ai(a,b,c){return c(function(){ei(b)&&fi(a)})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1)}
function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return[b.memoizedState,a]}
function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d)}
function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d)}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=!1,dh=!0),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=!0);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Gh.transition;Gh.transition={};try{a(!1),b()}finally{C=c,Gh.transition=d}}function wi(){return Uh().memoizedState}
function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d)}}
function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d))}}
function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:!1},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return[d.memoizedState,a]},useRef:function(a){var b=
Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(!1),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===Q)throw Error(p(349));0!==(Hh&30)||di(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Ei={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d))}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
function Gi(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null)}
function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}
function Ki(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=!0,Pi=d);Li(a,b)};return c}
function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a))}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=!1;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d)}
function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=!0);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
function hj(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&Hi(b,g,d,l);jh=!1;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=!1;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return jj(a,b,c,d,f,e)}
function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);yh(a,b.containerInfo)}
function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return{baseLanes:a,cachePool:null,transitions:null}}
function oj(a,b,c){var d=b.pendingProps,e=L.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1))}tj();d=Ki(Error(p(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c)}
function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(L,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}wj(b,!0,c,null,f);break;case "together":wj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Aj=function(){};
Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4)};
function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Fj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
a.sibling}null!==f.tail&&B()>Gj&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304)}else{if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
null;case 24:return null;default:return null}}var Jj=!1,U=!1,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Mj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Nj=!1;
function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Nj;Nj=!1;return n}
function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f)}e=e.next}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}var X=null,Xj=!1;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling}
function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=!0;
Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c)}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return}if(null===X)throw Error(p(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling}
function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a)}catch(t){W(a,a.return,t)}try{Pj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
a),ek(a)}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function hk(a,b,c){V=a;ik(a,b,c)}
function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f,b,c),f=f.sibling;V=e;Jj=h;U=l}kk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a,b,c)}}
function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode}sh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Rj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Rj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Rj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=!1,Pi=null,Ri=null,vk=!1,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg())}
function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Fk(c,Gk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else{b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h)}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
else{e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a)}
function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Ek(a){if(0!==(K&6))throw Error(p(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d))}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg())}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg()}}function Hj(){fj=ej.current;E(ej)}
function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj()}c=c.return}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}fh=null}return a}
function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ih=!1}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return}while(null!==f)}Sk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z)}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e)}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y)}function Lk(){for(;null!==Y&&!cc();)Uk(Y)}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null}
function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else{c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d)}finally{ok.transition=e,C=d}return null}
function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=!0,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c,a,e);dc();K=h;C=g;ok.transition=f}else a.current=c;vk&&(vk=!1,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode,d);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=!1,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else{a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,ok.transition=b}}return!1}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b))}
function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return}}
function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b)}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c))}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c)}
function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Yk(a,c)}var Vk;
Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return dh=!1,yj(a,b,c);dh=0!==(a.flags&131072)?!0:!1}else dh=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ji(Error(p(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c)}b=b.child}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Xi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,!0,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p(156,b.tag));};function Fk(a,b){return ac(a,b)}
function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,!0,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b)}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a)};function ll(a){this._internalRoot=a}
ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));fl(a,b,null,null)};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null)});b[uf]=null}};function ml(a){this._internalRoot=a}
ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function nl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a)}}var g=el(b,d,a,0,null,!1,!1,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a)}}var k=bl(a,0,!1,null,null,!1,!1,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d)});return k}
function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a)}}fl(b,g,a,e)}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()))}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c)}}),il(a,1)}};
Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c)}il(a,134217728)}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d)}il(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Qk;Hb=Rk;
var sl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p(200));return cl(a,b,null,c)};exports.createRoot=function(a,b){if(!nl(a))throw Error(p(299));var c=!1,d="",e=kl;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Rk(a)};exports.hydrate=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!0,c)};
exports.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=kl;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new ml(b)};exports.render=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Qk;
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return rl(a,b,c,!1,d)};exports.version="18.3.1-next-f1338f8080-20240426";


/***/ }),

/***/ 5338:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(961);
if (true) {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else { var i; }


/***/ }),

/***/ 961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(2551);
} else {}


/***/ }),

/***/ 1020:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(6540),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l;exports.jsx=q;exports.jsxs=q;


/***/ }),

/***/ 5287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};function X(){throw Error("act(...) is not supported in production builds of React.");}
exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;exports.act=X;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=X;exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};
exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};
exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};exports.useTransition=function(){return U.current.useTransition()};exports.version="18.3.1";


/***/ }),

/***/ 6540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(5287);
} else {}


/***/ }),

/***/ 4848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(1020);
} else {}


/***/ }),

/***/ 7463:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ }),

/***/ 9982:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(7463);
} else {}


/***/ }),

/***/ 6897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(453);
var define = __webpack_require__(41);
var hasDescriptors = __webpack_require__(592)();
var gOPD = __webpack_require__(5795);

var $TypeError = __webpack_require__(9675);
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};


/***/ }),

/***/ 5072:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 7659:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 540:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 5056:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 7825:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 1113:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 1135:
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 9032:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(7244);
var isGeneratorFunction = __webpack_require__(8184);
var whichTypedArray = __webpack_require__(5767);
var isTypedArray = __webpack_require__(5680);

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(5606);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(9032);

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(1135);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(6698);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ 6815:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.10.0 - Fri Aug 12 2022 19:42:44 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (!globalThis.chrome?.runtime?.id) {
    throw new Error("This script should only be loaded in a browser extension.");
  }

  if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received."; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            },
            "elements": {
              "createSidebarPane": {
                "minArgs": 1,
                "maxArgs": 1
              }
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goBack": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "goForward": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.reject
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {boolean} metadata.singleCallbackArg
       *        Whether or not the promise is resolved with only the first
       *        argument of the callback, alternatively an array of all the
       *        callback arguments is resolved. By default, if the callback
       *        function is invoked with only a single argument, that will be
       *        resolved to the promise, while all arguments will be resolved as
       *        an array if multiple are given.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      });

      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps an onRequestFinished listener function so that it will return a
         * `getContent()` property which returns a `Promise` rather than using a
         * callback API.
         *
         * @param {object} req
         *        The HAR entry object representing the network request.
         */


        return function onRequestFinished(req) {
          const wrappedReq = wrapObject(req, {}
          /* wrappers */
          , {
            getContent: {
              minArgs: 0,
              maxArgs: 0
            }
          });
          listener(wrappedReq);
        };
      });
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(new Error(extensionAPIs.runtime.lastError.message));
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        devtools: {
          network: {
            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
          }
        },
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    }; // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = globalThis.browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ }),

/***/ 5767:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(2682);
var availableTypedArrays = __webpack_require__(9209);
var callBind = __webpack_require__(487);
var callBound = __webpack_require__(8075);
var gOPD = __webpack_require__(5795);

/** @type {(O: object) => string} */
var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(9092)();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */
var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};

/** @typedef {(receiver: import('.').TypedArray) => string | typeof Uint8Array.prototype.slice.call | typeof Uint8Array.prototype.set.call} Getter */
/** @type {{ [k in `\$${import('.').TypedArrayName}`]?: Getter } & { __proto__: null }} */
var cache = { __proto__: null };
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			// @ts-expect-error TS won't narrow inside a closure
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				// @ts-expect-error TS won't narrow inside a closure
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(descriptor.get);
		}
	});
} else {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		var fn = arr.slice || arr.set;
		if (fn) {
			// @ts-expect-error TODO: fix
			cache['$' + typedArray] = callBind(fn);
		}
	});
}

/** @type {(value: object) => false | import('.').TypedArrayName} */
var tryTypedArrays = function tryAllTypedArrays(value) {
	/** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
	forEach(
		// eslint-disable-next-line no-extra-parens
		/** @type {Record<`\$${TypedArrayName}`, Getter>} */ /** @type {any} */ (cache),
		/** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
		function (getter, typedArray) {
			if (!found) {
				try {
				// @ts-expect-error TODO: fix
					if ('$' + getter(value) === typedArray) {
						found = $slice(typedArray, 1);
					}
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {(value: object) => false | import('.').TypedArrayName} */
var trySlices = function tryAllSlices(value) {
	/** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
	forEach(
		// eslint-disable-next-line no-extra-parens
		/** @type {Record<`\$${TypedArrayName}`, Getter>} */ /** @type {any} */ (cache),
		/** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */ function (getter, name) {
			if (!found) {
				try {
					// @ts-expect-error TODO: fix
					getter(value);
					found = $slice(name, 1);
				} catch (e) { /**/ }
			}
		}
	);
	return found;
};

/** @type {import('.')} */
module.exports = function whichTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		/** @type {string} */
		var tag = $slice($toString(value), 8, -1);
		if ($indexOf(typedArrays, tag) > -1) {
			return tag;
		}
		if (tag !== 'Object') {
			return false;
		}
		// node < 0.6 hits here on real Typed Arrays
		return trySlices(value);
	}
	if (!gOPD) { return null; } // unknown engine
	return tryTypedArrays(value);
};


/***/ }),

/***/ 9209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = __webpack_require__(6578);

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

/** @type {import('.')} */
module.exports = function availableTypedArrays() {
	var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			// @ts-expect-error
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(4848);
// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(5338);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(6540);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(961);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(5072);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(7825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(7659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(5056);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(1113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/ui/widgets/Modal/modal.scss
var modal = __webpack_require__(6399);
;// CONCATENATED MODULE: ./src/ui/widgets/Modal/modal.scss

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());

      options.insert = insertBySelector_default().bind(null, "head");
    
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(modal/* default */.A, options);




       /* harmony default export */ const Modal_modal = (modal/* default */.A && modal/* default */.A.locals ? modal/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/ui/widgets/Modal/index.tsx




const Modal = ({ id, isOpen, requestClose = undefined, canClose = true, children }) => {
    (0,react.useEffect)(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);
    const handleClose = () => {
        if (canClose && requestClose)
            requestClose();
    };
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };
    return ((0,jsx_runtime.jsx)(jsx_runtime.Fragment, { children: isOpen && (0,react_dom.createPortal)((0,jsx_runtime.jsx)("div", { className: `lxd-modal`, onClick: handleBackdropClick, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title", children: (0,jsx_runtime.jsx)("div", { className: "modal-content", id: id, role: "document", children: (0,jsx_runtime.jsx)("div", { className: "modal-body", children: children }) }) }), document.body) }));
};
/* harmony default export */ const widgets_Modal = (Modal);

;// CONCATENATED MODULE: ./src/ui/course/HomeTileApp.tsx
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function HomeTileApp({ course, el }) {
    const [showModal, setShowModal] = (0,react.useState)(false);
    const [running, setRunning] = (0,react.useState)(false);
    function regenerate() {
        return __awaiter(this, void 0, void 0, function* () {
            setRunning(true);
            setShowModal(true);
            yield course.regenerateHomeTiles();
            const homeTiles = document.querySelectorAll(".cbt-module-card-img img");
            yield Promise.all(Array.from(homeTiles).map(((tile) => __awaiter(this, void 0, void 0, function* () {
                yield fetch(tile.src, { cache: 'reload', mode: 'no-cors' });
                tile.src = tile.src + '?' + Date.now();
            }))));
            setRunning(false);
        });
    }
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,react_dom.createPortal)((0,jsx_runtime.jsx)("button", { onClick: regenerate, children: "Generate Home Tiles" }), el), (0,jsx_runtime.jsxs)(widgets_Modal, { isOpen: showModal, canClose: !running, requestClose: () => setShowModal(false), children: [(0,jsx_runtime.jsx)("p", { children: running ? "Updating Home Tiles..." : "Finished Updating Home Tiles" }), !running && (0,jsx_runtime.jsx)("button", { onClick: () => setShowModal(false), children: "Close" })] })] }));
}

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/ui/course/bigImages.scss
var bigImages = __webpack_require__(276);
;// CONCATENATED MODULE: ./src/ui/course/bigImages.scss

      
      
      
      
      
      
      
      
      

var bigImages_options = {};

bigImages_options.styleTagTransform = (styleTagTransform_default());
bigImages_options.setAttributes = (setAttributesWithoutAttributes_default());

      bigImages_options.insert = insertBySelector_default().bind(null, "head");
    
bigImages_options.domAPI = (styleDomAPI_default());
bigImages_options.insertStyleElement = (insertStyleElement_default());

var bigImages_update = injectStylesIntoStyleTag_default()(bigImages/* default */.A, bigImages_options);




       /* harmony default export */ const course_bigImages = (bigImages/* default */.A && bigImages/* default */.A.locals ? bigImages/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/ui/course/HighlightBigImages.tsx
var HighlightBigImages_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





function HighlightBigImages({ el, bannerImage, currentContentItem, resizeTo = 1200 }) {
    const [showModal, setShowModal] = (0,react.useState)(false);
    const [running, setRunning] = (0,react.useState)(false);
    const [finished, setFinished] = (0,react.useState)(false);
    const [showButton, setShowButton] = (0,react.useState)(true);
    function resizeBanner() {
        return HighlightBigImages_awaiter(this, void 0, void 0, function* () {
            setRunning(true);
            setShowModal(true);
            yield (currentContentItem === null || currentContentItem === void 0 ? void 0 : currentContentItem.resizeBanner(resizeTo));
            yield fetch(bannerImage.src, { cache: 'reload', mode: 'no-cors' });
            bannerImage.src = bannerImage.src + '?' + Date.now();
            setRunning(false);
            setFinished(true);
        });
    }
    function notificationBoxStyle() {
        if (finished)
            return {};
        else
            return {
                backgroundColor: 'rgba(255,255,255,0.75)',
                border: "10px dashed red",
                fontSize: "64px",
                color: 'rgba(64,0,0,1)'
            };
    }
    return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,react_dom.createPortal)((0,jsx_runtime.jsxs)("div", { style: notificationBoxStyle(), children: [(0,jsx_runtime.jsx)("h2", { children: "IMAGE REAL BIG" }), (0,jsx_runtime.jsx)("h4", { children: (0,jsx_runtime.jsx)("strong", { children: "This warning will not appear on student-facing canvas." }) }), showButton && (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("button", { onClick: resizeBanner, children: "Try Resize" }), (0,jsx_runtime.jsx)("div", { className: "lxd-notice", children: "This button works about half the time. It may upload the file but not replace the old one sometimes?" }), (0,jsx_runtime.jsx)("div", { className: "lxd-notice", children: "Using it won't break anything" })] })] }), el), (0,jsx_runtime.jsxs)(widgets_Modal, { isOpen: showModal, children: [(0,jsx_runtime.jsx)("p", { children: running ? "Replacing banner" : "Finished replacing banner" }), !running && (0,jsx_runtime.jsx)("button", { onClick: () => setShowModal(false), children: "Close" })] })] }));
}

// EXTERNAL MODULE: ./node_modules/assert/build/assert.js
var build_assert = __webpack_require__(4148);
var assert_default = /*#__PURE__*/__webpack_require__.n(build_assert);
;// CONCATENATED MODULE: ./src/canvas/fetch.ts
var fetch_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (undefined && undefined.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};


/**
 * @param url The entire path of the url
 * @param config a configuration object of type ICanvasCallConfig
 * @returns {Promise<Record<string, any>[]>}
 */
function getPagedData(url_1) {
    return fetch_awaiter(this, arguments, void 0, function* (url, config = null) {
        var _a, e_1, _b, _c;
        const generator = fetch_getPagedDataGenerator(url, config);
        const out = [];
        try {
            for (var _d = true, generator_1 = __asyncValues(generator), generator_1_1; generator_1_1 = yield generator_1.next(), _a = generator_1_1.done, !_a; _d = true) {
                _c = generator_1_1.value;
                _d = false;
                let value = _c;
                out.push(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = generator_1.return)) yield _b.call(generator_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return out;
    });
}
/**
 * returns a single pagedDataGenerator that returns generator results from each, looping through results for each
 * @param generators
 */
function fetch_mergePagedDataGenerators(generators) {
    return __asyncGenerator(this, arguments, function* mergePagedDataGenerators_1() {
        var _a, e_2, _b, _c;
        for (let generator of generators) {
            try {
                for (var _d = true, generator_2 = (e_2 = void 0, __asyncValues(generator)), generator_2_1; generator_2_1 = yield __await(generator_2.next()), _a = generator_2_1.done, !_a; _d = true) {
                    _c = generator_2_1.value;
                    _d = false;
                    let result = _c;
                    yield yield __await(result);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = generator_2.return)) yield __await(_b.call(generator_2));
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    });
}
function fetch_getPagedDataGenerator(url_1) {
    return __asyncGenerator(this, arguments, function* getPagedDataGenerator_1(url, config = null) {
        if (config === null || config === void 0 ? void 0 : config.queryParams) {
            url += '?' + searchParamsFromObject(config.queryParams);
        }
        if (url.includes('undefined')) {
            console.warn(url);
        }
        /* Returns a list of data from a GET request, going through multiple pages of data requests as necessary */
        let response = yield __await(fetch(url, config === null || config === void 0 ? void 0 : config.fetchInit));
        let data = yield __await(response.json());
        if (typeof data === 'object' && !Array.isArray(data)) {
            let values = Array.from(Object.values(data));
            if (values) {
                data = values.find((a) => Array.isArray(a));
            }
        }
        if (!Array.isArray(data)) {
            console.warn(`no data for ${url}`);
            return yield __await([]);
        }
        for (let value of data) {
            yield yield __await(value);
        }
        let next_page_link = "!";
        while (next_page_link.length !== 0 &&
            response &&
            response.headers.has("Link") && response.ok) {
            const link = response.headers.get("Link");
            assert_default()(link);
            const paginationLinks = link.split(",");
            const nextLink = paginationLinks.find((link) => link.includes('next'));
            if (nextLink) {
                next_page_link = nextLink.split(";")[0].split("<")[1].split(">")[0];
                response = yield __await(fetch(next_page_link, config === null || config === void 0 ? void 0 : config.fetchInit));
                let responseData = yield __await(response.json());
                if (typeof responseData === 'object' && !Array.isArray(responseData)) {
                    let values = Array.from(Object.values(responseData));
                    if (values) {
                        responseData = values === null || values === void 0 ? void 0 : values.find((a) => Array.isArray(a));
                    }
                    data = [data, ...responseData];
                }
                for (let value of responseData) {
                    yield yield __await(value);
                }
            }
            else {
                next_page_link = "";
            }
        }
    });
}
function fetch_fetchJson(url_1) {
    return fetch_awaiter(this, arguments, void 0, function* (url, config = null) {
        const match = url.search(/^(\/|\w+:\/\/)/);
        if (match < 0)
            throw new Error("url does not start with / or http");
        if (config === null || config === void 0 ? void 0 : config.queryParams) {
            url += '?' + new URLSearchParams(config.queryParams);
        }
        config !== null && config !== void 0 ? config : (config = {});
        const response = yield fetch(url, config.fetchInit);
        return yield response.json();
    });
}
function canvasDataFetchGenFunc(urlFunc) {
    return function (args, config) {
        const url = urlFunc(args, config);
        return fetch_getPagedDataGenerator(url, config);
    };
}
function fetch_renderAsyncGen(generator) {
    return fetch_awaiter(this, void 0, void 0, function* () {
        var _a, generator_3, generator_3_1;
        var _b, e_3, _c, _d;
        const out = [];
        try {
            for (_a = true, generator_3 = __asyncValues(generator); generator_3_1 = yield generator_3.next(), _b = generator_3_1.done, !_b; _a = true) {
                _d = generator_3_1.value;
                _a = false;
                let item = _d;
                out.push(item);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_a && !_b && (_c = generator_3.return)) yield _c.call(generator_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return out;
    });
}

;// CONCATENATED MODULE: ./src/canvas/canvasUtils.ts
var canvasUtils_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function isWithParamsFunc(func) {
    return typeof func === 'function' && func.length > 0;
}
function isWithoutParamsFunc(func) {
    return typeof func === 'function' && func.length === 0;
}
function callAll(funcs, params) {
    const output = [];
    for (let func of funcs) {
        if ((typeof func === 'object')) {
            output.push(func.func(func.params));
            continue;
        }
        if (isWithoutParamsFunc(func)) {
            output.push(func());
            continue;
        }
        if (isWithParamsFunc(func) && typeof params !== 'undefined') {
            output.push(func(params));
        }
    }
    return output;
}

/**
 * Traverses up the DOM and finds a parent with a matching Tag
 * @param el
 * @param tagName
 */
function parentElement(el, tagName) {
    if (!el)
        return null;
    while (el && el.parentElement) {
        el = el.parentElement;
        if (el.tagName && el.tagName.toLowerCase() == tagName) {
            return el;
        }
    }
    return null;
}
const type_lut = {
    Assignment: 'assignment',
    Discussion: 'discussion_topic',
    Quiz: 'quiz',
    ExternalTool: 'external_tool',
    File: 'attachment',
    Page: 'wiki_page',
    ExternalUrl: null, //Not passable to restrict
    Subheader: null, //Not passable to restrict
};
function canvasUtils_formDataify(data) {
    let formData = new FormData();
    for (let key in data) {
        addToFormData(formData, key, data[key]);
    }
    if (document) {
        const el = document.querySelector("input[name='authenticity_token']");
        const authenticityToken = el ? el.value : null;
        const cookies = getCookies();
        let csrfToken = cookies['_csrf_token'];
        if (authenticityToken)
            formData.append('authenticity_token', authenticityToken);
        else if (csrfToken) {
            csrfToken = csrfToken.replaceAll(/%([0-9A-F]{2})/g, (substring, hex) => {
                const hexCode = hex;
                return String.fromCharCode(parseInt(hexCode, 16));
            });
            console.log(csrfToken);
            formData.append('authenticity_token', csrfToken);
        }
    }
    return formData;
}
function deepObjectCopy(toCopy, complexObjectsTracker = []) {
    return canvasUtils_deepObjectMerge(toCopy, {}, true, complexObjectsTracker);
}
function canvasUtils_deepObjectMerge(a, b, overrideWithA = false, complexObjectsTracker = []) {
    for (let value of [a, b]) {
        if (typeof value == "object" &&
            complexObjectsTracker.includes(value))
            throw new Error(`Infinite Loop: Element ${value} contains itself`);
    }
    //if the types don't match
    if (a && b && (typeof a !== typeof b ||
        Array.isArray(a) != Array.isArray(b))) {
        if (a === b)
            return a;
        if (overrideWithA)
            return a;
        throw new Error(`Type clash on merge ${typeof a} ${a}, ${typeof b} ${b}`);
    }
    //If either or both are arrays, merge if able to
    if (Array.isArray(a)) {
        if (!b)
            return deepObjectCopy(a, complexObjectsTracker);
        assert_default()(Array.isArray(b), "We should not get here if b is not an array");
        let mergedArray = [...a, ...b];
        const outputArray = mergedArray.map(value => {
            if (!value)
                return value;
            if (typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
                //Make a deep of any object literal
                if (!value)
                    return value;
                value = deepObjectCopy(value, [...complexObjectsTracker, a, b]);
            }
            return value;
        });
        return outputArray;
    }
    if (Array.isArray(b))
        return deepObjectCopy(b, complexObjectsTracker); //we already know a is not an array at this point, return a deep copy of b
    if ((a && typeof a === 'object') || (b && typeof b === 'object')) {
        if (a instanceof File && b instanceof File) {
            if (!overrideWithA)
                assert_default()(a.size == b.size && a.name == b.name, `File value clash ${a.name} ${b.name}`);
            return a;
        }
        if (a && Object.getPrototypeOf(a) != Object.prototype
            || b && Object.getPrototypeOf(b) != Object.prototype) {
            if (!overrideWithA)
                assert_default()(!a || !b || a === b, `Non-mergeable object clash ${a} ${b}`);
            if (a)
                return a;
            if (b)
                return b;
        }
        if (a && !b)
            return deepObjectCopy(a, complexObjectsTracker);
        if (b && !a)
            return deepObjectCopy(b, complexObjectsTracker);
        assert_default()(a && typeof a === 'object' && Object.getPrototypeOf(a) === Object.prototype, "a should always be defined here.");
        assert_default()(b && typeof b === 'object' && Object.getPrototypeOf(b) === Object.prototype, "b should always be defined here.");
        const allKeys = [...Object.keys(a), ...Object.keys(b)].filter(filterUniqueFunc);
        const aRecord = a;
        const bRecord = b;
        const entries = allKeys.map((key) => [
            key,
            canvasUtils_deepObjectMerge(aRecord[key], bRecord[key], overrideWithA, [...complexObjectsTracker, a, b])
        ]);
        return Object.fromEntries(entries);
    }
    if (a && b) {
        if (overrideWithA || a === b)
            return a;
        throw new Error(`Values unmergeable, ${a}>:${typeof a}, ${b} ${typeof b}`);
    }
    if (a)
        return a;
    if (b)
        return b;
    if (a === null)
        return a;
    if (b === null)
        return b;
    assert_default()(typeof a === 'undefined');
    return a;
}
function deFormDataify(formData) {
    return [...formData.entries()].reduce((aggregator, [key, value]) => {
        const isArray = key.includes('[]');
        const keys = key.split('[').map(key => key.replaceAll(/[\[\]]/g, ''));
        if (isArray)
            keys.pop(); //remove the last, empty, key if it's an array
        let currentValue = isArray ? [value] : value;
        while (keys.length > 0) {
            let newValue;
            newValue = {
                [keys.pop()]: currentValue
            };
            currentValue = newValue;
        }
        return canvasUtils_deepObjectMerge(aggregator, currentValue) || Object.assign({}, aggregator);
    }, {});
}
function getCookies() {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const out = {};
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        out[key] = value;
    }
    return out;
}
/**
 * Adds arrays and objects in the form formData posts expects
 * @param formData
 * @param key
 * @param value
 */
function addToFormData(formData, key, value) {
    if (Array.isArray(value)) {
        for (let item of value) {
            addToFormData(formData, `${key}[]`, item);
        }
    }
    else if (typeof value === 'object') {
        for (let itemKey in value) {
            const itemValue = value[itemKey];
            addToFormData(formData, key.length > 0 ? `${key}[${itemKey}]` : itemKey, itemValue);
        }
    }
    else {
        formData.append(key, value);
    }
}
function queryStringify(data) {
    let searchParams = new URLSearchParams();
    for (let key in data) {
        addToQuery(searchParams, key, data[key]);
    }
    ;
    return searchParams;
}
function addToQuery(searchParams, key, value) {
    if (Array.isArray(value)) {
        for (let item of value) {
            addToQuery(searchParams, `${key}[]`, item);
        }
    }
    else if (typeof value === 'object') {
        for (let itemKey in value) {
            const itemValue = value[itemKey];
            addToQuery(searchParams, key.length > 0 ? `${key}[${itemKey}]` : itemKey, itemValue);
        }
    }
    else {
        searchParams.append(key, value);
    }
}
/**
 * Takes in a module item and returns an object specifying its type and content id
 * @param item
 */
function canvasUtils_getItemTypeAndId(item) {
    return canvasUtils_awaiter(this, void 0, void 0, function* () {
        let id;
        let type;
        assert(type_lut.hasOwnProperty(item.type), "Unexpected type " + item.type);
        type = type_lut[item.type];
        if (type === "wiki_page") {
            assert(item.url); //wiki_page items always have a url param
            const pageData = yield fetchJson(item.url);
            id = pageData.page_id;
        }
        else {
            id = item.content_id;
        }
        return { type, id };
    });
}
/**
 * @param queryParams
 * @returns {URLSearchParams} The correctly formatted parameters
 */
function searchParamsFromObject(queryParams) {
    return queryStringify(queryParams);
}
/**
 * sort courses (or course Data) alphabetically by name
 * @param a item to compare.
 * @param b item to compare.
 */
function courseNameSort(a, b) {
    if (a.name < b.name)
        return -1;
    if (b.name < a.name)
        return 1;
    return 0;
}
function* canvasUtils_range(start, end, step = 1) {
    if (typeof end === 'undefined') {
        let i = start;
        while (true) {
            yield i;
            i += step;
        }
    }
    for (let i = start; i <= end; i++) {
        yield i;
    }
}
function* numbers(start, step = 1) {
    let i = 0;
    while (true) {
        yield i;
        i += step;
    }
}
function getPlainTextFromHtml(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.innerText || el.textContent || "";
}
function getCourseIdFromUrl(url) {
    let match = /courses\/(\d+)/.exec(url);
    if (match) {
        return parseInt(match[1]);
    }
    return null;
}
function batchify(toBatch, batchSize) {
    const out = [];
    for (let i = 0; i < toBatch.length; i += batchSize) {
        out.push(toBatch.slice(i, i + batchSize));
    }
    return out;
}
function filterUniqueFunc(item, index, array) {
    return array.indexOf(item) === index;
}

;// CONCATENATED MODULE: ./src/publish/fixesAndUpdates/validations/index.ts
var validations_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

//number of characters to show around a match
const SHOW_WINDOW = 30;
const MAX_SEARCH_RETURN_SIZE = 100;
function stringsToMessageResult(value, links) {
    const messageResult = { bodyLines: Array.isArray(value) ? value : [value] };
    if (links)
        messageResult.links = Array.isArray(links) ? links : [links];
    return messageResult;
}
function ensureMessageResults(value) {
    if (!Array.isArray(value))
        return typeof value === 'string' ? [stringsToMessageResult(value)] : [value];
    if (value.length === 0)
        return value;
    if (typeof value[0] === 'string')
        return [stringsToMessageResult(value)];
    return value;
}
const testResultDefaults = {
    failureMessage: 'failure',
    notFailureMessage: 'success'
};
function testResult(success, options) {
    success = success === 'unknown' ? success : !!success;
    let { failureMessage, notFailureMessage, links, userData } = Object.assign(Object.assign({}, testResultDefaults), options);
    failureMessage = ensureMessageResults(failureMessage);
    notFailureMessage = ensureMessageResults(notFailureMessage);
    const response = {
        success,
        messages: success ? notFailureMessage : failureMessage,
        userData
    };
    if (links)
        response.links = links;
    return response;
}
function capitalize(str) {
    return str.replace(/\b[a-z]/g, (substring) => substring.toUpperCase());
}
function preserveCapsReplace(regex, replace) {
    return (substring, ..._args) => {
        const replacedSubstring = substring.replace(regex, replace);
        if (substring.toUpperCase() === substring)
            return replacedSubstring.toUpperCase();
        if (capitalize(substring) === substring)
            return capitalize(replacedSubstring);
        return replacedSubstring;
    };
}
function matchHighlights(content, search, maxHighlightLength = MAX_SEARCH_RETURN_SIZE, windowSize = SHOW_WINDOW) {
    search.lastIndex = 0;
    let matches = search.global ? Array.from(content.matchAll(search)) : [];
    search.lastIndex = 0;
    if (!search.global) {
        let match = search.exec(content);
        if (match)
            matches.push(match);
    }
    return matches.map(match => {
        const minIndex = Math.max(0, match.index - windowSize);
        const maxIndex = Math.min(content.length, match.index + match[0].length + windowSize);
        let substring = content.substring(minIndex, maxIndex);
        if (substring.length > maxHighlightLength) {
            const half = Math.floor(maxHighlightLength / 2);
            substring = substring.replace(new RegExp(`^(.{${half}}).*(.{${half}})$`), '$1...$2');
        }
        return substring;
    });
}
function badContentRunFunc(badTest) {
    return (course, config) => validations_awaiter(this, void 0, void 0, function* () {
        const defaultConfig = { queryParams: { include: ['body'], per_page: 50 } };
        let content = yield course.getContent(validations_overrideConfig(config, defaultConfig));
        const badContent = content.filter(item => item.body && badTest.test(item.body));
        const syllabus = yield course.getSyllabus(config);
        let syllabusTest = badTest.test(syllabus);
        const success = badContent.length === 0 && !syllabusTest;
        let links = [];
        let failureMessage = [];
        if (badContent.length > 0) {
            let messageSets = badContent.map(a => {
                var _a;
                if (!((_a = a.body) === null || _a === void 0 ? void 0 : _a.length))
                    return { bodyLines: [a.name], links: [a.htmlContentUrl] };
                const content = a.body;
                return {
                    bodyLines: matchHighlights(content, badTest),
                    links: [a.htmlContentUrl]
                };
            });
            failureMessage.push(...messageSets);
        }
        if (syllabusTest)
            failureMessage.push({
                bodyLines: matchHighlights(syllabus, badTest),
                links: [`/courses/${course.id}/assignments/syllabus`]
            });
        const result = testResult(success, { failureMessage, links });
        if (!success)
            result.links = badContent.map(content => content.htmlContentUrl);
        return result;
    });
}
function badSyllabusFixFunc(validateRegEx, replace) {
    const replaceText = replaceTextFunc(validateRegEx, replace);
    return (course) => validations_awaiter(this, void 0, void 0, function* () {
        try {
            yield fixSyllabus(course, validateRegEx, replaceText);
            return testResult(true);
        }
        catch (e) {
            return errorMessageResult(undefined);
        }
    });
}
function badContentFixFunc(badContentRegex, replace) {
    return (course) => validations_awaiter(this, void 0, void 0, function* () {
        let success = false;
        let messages = [];
        const includeBody = { queryParams: { include: ['body'] } };
        let content = yield course.getContent(includeBody);
        content = content.filter(item => item.body && badContentRegex.test(item.body));
        const replaceText = replaceTextFunc(badContentRegex, replace);
        yield fixSyllabus(course, badContentRegex, replaceText);
        if (content.length === 0) {
            return testResult('not run', {
                failureMessage: "No content fixed"
            });
        }
        success = true;
        for (let item of content) {
            if (!item.body)
                continue;
            if (!badContentRegex.test(item.body))
                continue;
            const newText = replaceText(item.body);
            if (badContentRegex.test(newText)) {
                success = false;
                messages.push({
                    bodyLines: [`fix broken for ${item.name}`],
                    links: [item.htmlContentUrl]
                });
                continue;
            }
            try {
                yield item.updateContent(newText);
                messages.push({
                    bodyLines: [`fix succeeded for ${item.name}`],
                    links: [item.htmlContentUrl]
                });
            }
            catch (e) {
                return errorMessageResult(e, [item.htmlContentUrl]);
            }
        }
        return {
            success,
            messages
        };
    });
}
function replaceTextFunc(validateRegEx, replace) {
    return (str) => {
        //This is silly, but it gets typescript to stop yelling at me about the overload
        if (typeof replace === 'string')
            return str.replaceAll(validateRegEx, replace);
        return str.replaceAll(validateRegEx, replace);
    };
}
function fixSyllabus(course, validateRegEx, replaceText) {
    return validations_awaiter(this, void 0, void 0, function* () {
        const syllabus = yield course.getSyllabus();
        if (validateRegEx.test(syllabus)) {
            const newText = replaceText(syllabus);
            if (validateRegEx.test(newText))
                throw new Error("Fix broken for syllabus " + validateRegEx.toString() + newText);
            yield course.changeSyllabus(newText);
        }
    });
}
function validations_overrideConfig(source, override) {
    var _a;
    return (_a = canvasUtils_deepObjectMerge(source, override)) !== null && _a !== void 0 ? _a : {};
}
function errorMessageResult(e, links) {
    const bodyLines = [
        (e === null || e === void 0 ? void 0 : e.toString()) || 'Error',
    ];
    if (e && e instanceof Error && e.stack)
        bodyLines.push(e.stack);
    return { success: false, messages: [{ bodyLines }], links };
}

;// CONCATENATED MODULE: ./src/canvas/baseCanvasObject.ts
var baseCanvasObject_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class BaseCanvasObject {
    get accountId() {
        return this._accountId;
    }
    constructor(data) {
        this._accountId = null;
        this.canvasData = data || {}; // A dict holding the decoded json representation of the object in Canvas
    }
    getClass() {
        return this.constructor;
    }
    getItem(item) {
        return this.canvasData[item];
    }
    get myClass() {
        return this.constructor;
    }
    get nameKey() {
        assert_default()(this.myClass.nameProperty);
        return this.myClass.nameProperty;
    }
    get rawData() {
        return Object.assign({}, this.canvasData);
    }
    get contentUrlPath() {
        const constructor = this.constructor;
        assert_default()(typeof this.accountId === 'number');
        assert_default()(typeof constructor.contentUrlTemplate === 'string');
        return '/api/v1/' + constructor.contentUrlTemplate
            .replace('{content_id}', this.id.toString())
            .replace('{account_id}', this.accountId.toString());
    }
    get htmlContentUrl() {
        return `${this.contentUrlPath}`;
    }
    get data() {
        return this.canvasData;
    }
    static getDataById(contentId_1) {
        return baseCanvasObject_awaiter(this, arguments, void 0, function* (contentId, courseId = null, config = null) {
            let url = this.getUrlPathFromIds(contentId, courseId);
            const response = yield fetch_fetchJson(url, config);
            assert_default()(!Array.isArray(response));
            return response;
        });
    }
    static getUrlPathFromIds(contentId, courseId) {
        assert_default()(typeof this.contentUrlTemplate === 'string');
        let url = this.contentUrlTemplate
            .replace('{content_id}', contentId.toString());
        if (courseId)
            url = url.replace('{course_id}', courseId.toString());
        return url;
    }
    /**
     * @param courseId - The course ID to get elements within, if applicable
     * @param accountId - The account ID to get elements within, if applicable
     */
    static getAllUrl(courseId = null, accountId = null) {
        assert_default()(typeof this.allContentUrlTemplate === 'string');
        let replaced = this.allContentUrlTemplate;
        if (courseId)
            replaced = replaced.replace('{course_id}', courseId.toString());
        if (accountId)
            replaced = replaced.replace('{account_id}', accountId.toString());
        return replaced;
    }
    static getAll() {
        return baseCanvasObject_awaiter(this, arguments, void 0, function* (config = null) {
            let url = this.getAllUrl();
            let data = yield getPagedData(url, config);
            return data.map(item => new this(item));
        });
    }
    get id() {
        const id = this.canvasData[this.constructor.idProperty];
        return parseInt(id);
    }
    get name() {
        let nameProperty = this.getClass().nameProperty;
        if (!nameProperty)
            return 'NAME PROPERTY NOT SET';
        return this.getItem(nameProperty);
    }
    saveData(data, config) {
        return baseCanvasObject_awaiter(this, void 0, void 0, function* () {
            assert_default()(this.contentUrlPath);
            config = validations_overrideConfig({
                fetchInit: {
                    method: 'PUT',
                    body: canvasUtils_formDataify(data)
                }
            }, config);
            let results = yield fetch_fetchJson(this.contentUrlPath, config);
            if (Array.isArray(results))
                results = results[0];
            this.canvasData = Object.assign(Object.assign({}, this.canvasData), results);
            return this.canvasData;
        });
    }
}
BaseCanvasObject.idProperty = 'id'; // The field name of the id of the canvas object type
BaseCanvasObject.nameProperty = 'name'; // The field name of the primary name of the canvas object type
BaseCanvasObject.contentUrlTemplate = null; // A templated url to get a single item
BaseCanvasObject.allContentUrlTemplate = null; // A templated url to get all items

;// CONCATENATED MODULE: ./src/canvas/course/index.ts
var course_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var course_asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var course_await = (undefined && undefined.__await) || function (v) { return this instanceof course_await ? (this.v = v, this) : new course_await(v); }
var course_asyncGenerator = (undefined && undefined.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof course_await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};




function getGradingStandards(contextId, contextType, config) {
    return course_awaiter(this, void 0, void 0, function* () {
        const url = `/api/v1/${contextType}s/${contextId}/grading_standards`;
        return yield getPagedData(url, config);
    });
}
function generatorMap(generator, nextMapFunc) {
    return course_asyncGenerator(this, arguments, function* generatorMap_1() {
        var _a, e_1, _b, _c;
        let i = 0;
        try {
            for (var _d = true, generator_1 = course_asyncValues(generator), generator_1_1; generator_1_1 = yield course_await(generator_1.next()), _a = generator_1_1.done, !_a; _d = true) {
                _c = generator_1_1.value;
                _d = false;
                let value = _c;
                yield yield course_await(nextMapFunc(value, i, generator));
                i++;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = generator_1.return)) yield course_await(_b.call(generator_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function getCourseData(id, config) {
    const url = `/api/v1/courses/${id}`;
    return fetch_fetchJson(url, config);
}
function course_getCourseGenerator(queryString, accountIds, term, config) {
    if (!Array.isArray(accountIds))
        accountIds = [accountIds];
    const defaultConfig = {
        queryParams: {
            search_term: queryString,
        }
    };
    if (term && defaultConfig.queryParams)
        defaultConfig.queryParams.enrollment_term_id = term.id;
    config = overrideConfig(defaultConfig, config);
    const generators = accountIds.map(accountId => {
        let url = `/api/v1/accounts/${accountId}/courses`;
        return getPagedDataGenerator(url, config);
    });
    return generatorMap(mergePagedDataGenerators(generators), courseData => new Course(courseData));
}
function createNewCourse(courseCode, accountId, name, config) {
    return course_awaiter(this, void 0, void 0, function* () {
        name !== null && name !== void 0 ? name : (name = courseCode);
        const createUrl = `/api/v1/accounts/${accountId}/courses/`;
        let createConfig = {
            fetchInit: {
                method: 'POST',
                body: formDataify({
                    course: {
                        name,
                        course_code: courseCode
                    }
                })
            }
        };
        return yield fetchJson(createUrl, deepObjectMerge(createConfig, config, true));
    });
}
function course_getCourseIdFromUrl(url) {
    let match = /courses\/(\d+)/.exec(url);
    if (match) {
        return parseInt(match[1]);
    }
    return null;
}
class CourseNotFoundException extends Error {
}

;// CONCATENATED MODULE: ./src/canvas/index.ts
// noinspection GrazieInspection
var canvas_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* Very Initial refactor to JS using ChatGPT4
NOTE: Almost all of this code has had to be rewritten since then.
And starting to convert to ts
 */
/* THis has since been almost entirely rewritten. It did not do a great job at first pass.
 It kept inventing code that should work but didn't */





/**
 *  A base class for objects that interact with the Canvas API
 */
class Account extends BaseCanvasObject {
    static getFromUrl() {
        return canvas_awaiter(this, arguments, void 0, function* (url = null) {
            if (url === null) {
                url = document.documentURI;
            }
            let match = /accounts\/(\d+)/.exec(url);
            if (match) {
                console.log(match);
                return yield this.getAccountById(parseInt(match[1]));
            }
            return null;
        });
    }
    static getAccountById(accountId_1) {
        return canvas_awaiter(this, arguments, void 0, function* (accountId, config = undefined) {
            const data = yield this.getDataById(accountId, null, config);
            console.assert();
            return new Account(data);
        });
    }
    static getRootAccount() {
        return canvas_awaiter(this, arguments, void 0, function* (resetCache = false) {
            let accounts = yield this.getAll();
            if (!resetCache && this.hasOwnProperty('account') && this.account) {
                return this.account;
            }
            let root = accounts.find((a) => a.rootAccountId === null);
            assert_default()(root);
            this.account = root;
            return root;
        });
    }
    get rootAccountId() {
        return this.canvasData['root_account_id'];
    }
}
Account.nameProperty = 'name'; // The field name of the primary name of the canvas object type
Account.contentUrlTemplate = '/api/v1/accounts/{content_id}'; // A templated url to get a single item
Account.allContentUrlTemplate = '/api/v1/accounts'; // A templated url to get all items
class Term extends BaseCanvasObject {
    static getTerm(code_1) {
        return canvas_awaiter(this, arguments, void 0, function* (code, workflowState = 'all', config = undefined) {
            const terms = yield this.searchTerms(code, workflowState, config);
            if (!Array.isArray(terms) || terms.length <= 0) {
                return null;
            }
            return terms[0];
        });
    }
    static getTermById(termId_1) {
        return canvas_awaiter(this, arguments, void 0, function* (termId, config = null) {
            let account = yield Account.getRootAccount();
            let url = `/api/v1/accounts/${account.id}/terms/${termId}`;
            let termData = yield fetch_fetchJson(url, config);
            if (termData)
                return new Term(termData);
            return null;
        });
    }
    static getAllActiveTerms() {
        return canvas_awaiter(this, arguments, void 0, function* (config = null) {
            return yield this.searchTerms(null, 'active', config);
        });
    }
    static searchTerms() {
        return canvas_awaiter(this, arguments, void 0, function* (code = null, workflowState = 'all', config = null) {
            config = config || {};
            config.queryParams = config.queryParams || {};
            let queryParams = config.queryParams;
            if (workflowState)
                queryParams['workflow_state'] = workflowState;
            if (code)
                queryParams['term_name'] = code;
            let rootAccount = yield Account.getRootAccount();
            assert_default()(rootAccount);
            let url = `/api/v1/accounts/${rootAccount.id}/terms`;
            const data = yield getPagedData(url, config);
            let terms = [];
            for (let datum of data) {
                if (datum.hasOwnProperty('enrollment_terms')) {
                    for (let termData of datum['enrollment_terms']) {
                        terms.push(termData);
                    }
                }
                else {
                    terms.push(datum);
                }
            }
            console.log(terms);
            if (!terms || terms.length === 0) {
                return null;
            }
            return terms.map(term => new Term(term));
        });
    }
}
Term.nameProperty = "name";
class NotImplementedException extends Error {
}
function canvas_apiWriteConfig(method, data, baseConfig) {
    const body = formDataify(data);
    return overrideConfig({
        fetchInit: {
            method,
            body,
        }
    }, baseConfig);
}

;// CONCATENATED MODULE: ./src/canvas/course/blueprint.ts
var blueprint_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var blueprint_asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};





function isBlueprint({ blueprint }) {
    return !!blueprint;
}
function getSections(course) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const id = course.id;
        if (!course.isBlueprint())
            return [];
        const url = `/api/v1/courses/${id}/blueprint_templates/default/associated_courses`;
        const courseDataGenerator = fetch_getPagedDataGenerator(url, { queryParams: { per_page: 50 } });
        const sections = [];
        try {
            for (var _d = true, courseDataGenerator_1 = blueprint_asyncValues(courseDataGenerator), courseDataGenerator_1_1; courseDataGenerator_1_1 = yield courseDataGenerator_1.next(), _a = courseDataGenerator_1_1.done, !_a; _d = true) {
                _c = courseDataGenerator_1_1.value;
                _d = false;
                let sectionData = _c;
                sections.push(yield Course_Course.getCourseById(sectionData.id));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = courseDataGenerator_1.return)) yield _b.call(courseDataGenerator_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return sections;
    });
}
function cachedGetAssociatedCoursesFunc(course) {
    let cache = null;
    return (...args_1) => blueprint_awaiter(this, [...args_1], void 0, function* (redownload = false) {
        if (!redownload && cache)
            return cache;
        cache = yield getSections(course);
        return cache;
    });
}
function getTermNameFromSections(sections) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        const [section] = sections;
        if (!section)
            throw new Error("Cannot determine term name by sections; there are no sections.");
        const sectionTerm = yield section.getTerm();
        if (!sectionTerm)
            throw new Error("Section does not have associated term: " + section.name);
        return sectionTerm.name;
    });
}
function retireBlueprint(course, termName, config) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        ///if (!course.isBlueprint()) throw new Error("Trying to retire a blueprint that's not a blueprint")
        var _a;
        const isCurrentBlueprint = (_a = course.parsedCourseCode) === null || _a === void 0 ? void 0 : _a.match('BP_');
        if (!isCurrentBlueprint)
            throw new Error("This blueprint is not named BP_; are you trying to retire a retired blueprint?");
        // const associatedCourses = await course.getAssociatedCourses();
        // if (associatedCourses.length < 1) throw new Error("Can't find associated courses")
        const newCode = `BP-${termName}_${course.baseCode}`;
        const saveData = {};
        if (!course.parsedCourseCode)
            throw new Error("Course does not have a code");
        saveData[Course.nameProperty] = course.name.replace(course.parsedCourseCode, newCode);
        saveData['course_code'] = newCode;
        yield course.saveData({
            course: saveData
        }, config);
    });
}
function makeNewBpFromDev(devCourse, termName) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
    });
}
function getBlueprintsFromCode(code, accountIds, config) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        const [_, baseCode] = code.match(/_(\w{4}\d{3})$/) || [];
        if (!baseCode)
            return null;
        const bps = getCourseGenerator(`BP_${baseCode}`, accountIds, undefined, config);
        return (yield renderAsyncGen(bps)).toSorted((a, b) => b.name.length - a.name.length);
    });
}
function lockBlueprint(courseId, modules) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        let items = [];
        items = items.concat(...modules.map(a => [].concat(...a.items)));
        const promises = items.map((item) => blueprint_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/courses/${courseId}/blueprint_templates/default/restrict_item`;
            let { type, id } = yield getItemTypeAndId(item);
            if (typeof id === 'undefined')
                return;
            let body = {
                "content_type": type,
                "content_id": id,
                "restricted": true,
                "_method": 'PUT'
            };
            yield fetchJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: formDataify(body)
                }
            });
        }));
        yield Promise.all(promises);
    });
}
function setAsBlueprint(courseId, config) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        const url = `/api/v1/courses/${courseId}`;
        const payload = {
            course: {
                blueprint: true,
                use_blueprint_restrictions_by_object_type: 0,
                blueprint_restrictions: {
                    content: 1,
                    points: 1,
                    due_dates: 1,
                    availability_dates: 1,
                }
            }
        };
        return yield fetchJson(url, apiWriteConfig('PUT', payload, config));
    });
}
function unSetAsBlueprint(courseId, config) {
    return blueprint_awaiter(this, void 0, void 0, function* () {
        const url = `/api/v1/courses/${courseId}`;
        const payload = {
            course: {
                blueprint: false
            }
        };
        return yield fetchJson(url, apiWriteConfig("PUT", payload, config));
    });
}

;// CONCATENATED MODULE: ./node_modules/temporal-polyfill/chunks/internal.js
function clampProp(e, n, t, o, r) {
  return clampEntity(n, getDefinedProp(e, n), t, o, r);
}

function clampEntity(e, n, t, o, r, i) {
  const a = clampNumber(n, t, o);
  if (r && n !== a) {
    throw new RangeError(numberOutOfRange(e, n, t, o, i));
  }
  return a;
}

function getDefinedProp(e, n) {
  const t = e[n];
  if (void 0 === t) {
    throw new TypeError(missingField(n));
  }
  return t;
}

function z(e) {
  return null !== e && /object|function/.test(typeof e);
}

function Jn(e, n = Map) {
  const t = new n;
  return (n, ...o) => {
    if (t.has(n)) {
      return t.get(n);
    }
    const r = e(n, ...o);
    return t.set(n, r), r;
  };
}

function D(e) {
  return p({
    name: e
  }, 1);
}

function p(e, n) {
  return T((e => ({
    value: e,
    configurable: 1,
    writable: !n
  })), e);
}

function O(e) {
  return T((e => ({
    get: e,
    configurable: 1
  })), e);
}

function h(e) {
  return {
    [Symbol.toStringTag]: {
      value: e,
      configurable: 1
    }
  };
}

function zipProps(e, n) {
  const t = {};
  let o = e.length;
  for (const r of n) {
    t[e[--o]] = r;
  }
  return t;
}

function T(e, n, t) {
  const o = {};
  for (const r in n) {
    o[r] = e(n[r], r, t);
  }
  return o;
}

function b(e, n, t) {
  const o = {};
  for (let r = 0; r < n.length; r++) {
    const i = n[r];
    o[i] = e(i, r, t);
  }
  return o;
}

function remapProps(e, n, t) {
  const o = {};
  for (let r = 0; r < e.length; r++) {
    o[n[r]] = t[e[r]];
  }
  return o;
}

function Vn(e, n) {
  const t = {};
  for (const o of e) {
    t[o] = n[o];
  }
  return t;
}

function V(e, n) {
  const t = {};
  for (const o in n) {
    e.has(o) || (t[o] = n[o]);
  }
  return t;
}

function nn(e) {
  e = {
    ...e
  };
  const n = Object.keys(e);
  for (const t of n) {
    void 0 === e[t] && delete e[t];
  }
  return e;
}

function C(e, n) {
  for (const t of n) {
    if (!(t in e)) {
      return 0;
    }
  }
  return 1;
}

function allPropsEqual(e, n, t) {
  for (const o of e) {
    if (n[o] !== t[o]) {
      return 0;
    }
  }
  return 1;
}

function zeroOutProps(e, n, t) {
  const o = {
    ...t
  };
  for (let t = 0; t < n; t++) {
    o[e[t]] = 0;
  }
  return o;
}

function E(e, ...n) {
  return (...t) => e(...n, ...t);
}

function internal_capitalize(e) {
  return e[0].toUpperCase() + e.substring(1);
}

function sortStrings(e) {
  return e.slice().sort();
}

function padNumber(e, n) {
  return String(n).padStart(e, "0");
}

function compareNumbers(e, n) {
  return Math.sign(e - n);
}

function clampNumber(e, n, t) {
  return Math.min(Math.max(e, n), t);
}

function divModFloor(e, n) {
  return [ Math.floor(e / n), modFloor(e, n) ];
}

function modFloor(e, n) {
  return (e % n + n) % n;
}

function divModTrunc(e, n) {
  return [ divTrunc(e, n), modTrunc(e, n) ];
}

function divTrunc(e, n) {
  return Math.trunc(e / n) || 0;
}

function modTrunc(e, n) {
  return e % n || 0;
}

function hasHalf(e) {
  return .5 === Math.abs(e % 1);
}

function givenFieldsToBigNano(e, n, t) {
  let o = 0, r = 0;
  for (let i = 0; i <= n; i++) {
    const n = e[t[i]], a = Xr[i], s = Qr / a, [c, u] = divModTrunc(n, s);
    o += u * a, r += c;
  }
  const [i, a] = divModTrunc(o, Qr);
  return [ r + i, a ];
}

function nanoToGivenFields(e, n, t) {
  const o = {};
  for (let r = n; r >= 0; r--) {
    const n = Xr[r];
    o[t[r]] = divTrunc(e, n), e = modTrunc(e, n);
  }
  return o;
}

function un(e) {
  return e === X ? si : [];
}

function cn(e) {
  return e === X ? li : [];
}

function ln(e) {
  return e === X ? [ "year", "day" ] : [];
}

function l(e) {
  if (void 0 !== e) {
    return m(e);
  }
}

function S(e) {
  if (void 0 !== e) {
    return d(e);
  }
}

function c(e) {
  if (void 0 !== e) {
    return u(e);
  }
}

function d(e) {
  return requireNumberIsPositive(u(e));
}

function u(e) {
  return requireNumberIsInteger(Mi(e));
}

function on(e) {
  if (null == e) {
    throw new TypeError("Cannot be null or undefined");
  }
  return e;
}

function requirePropDefined(e, n) {
  if (null == n) {
    throw new RangeError(missingField(e));
  }
  return n;
}

function de(e) {
  if (!z(e)) {
    throw new TypeError(hr);
  }
  return e;
}

function requireType(e, n, t = e) {
  if (typeof n !== e) {
    throw new TypeError(invalidEntity(t, n));
  }
  return n;
}

function requireNumberIsInteger(e, n = "number") {
  if (!Number.isInteger(e)) {
    throw new RangeError(expectedInteger(n, e));
  }
  return e || 0;
}

function requireNumberIsPositive(e, n = "number") {
  if (e <= 0) {
    throw new RangeError(expectedPositive(n, e));
  }
  return e;
}

function internal_toString(e) {
  if ("symbol" == typeof e) {
    throw new TypeError(pr);
  }
  return String(e);
}

function toStringViaPrimitive(e, n) {
  return z(e) ? String(e) : m(e, n);
}

function toBigInt(e) {
  if ("string" == typeof e) {
    return BigInt(e);
  }
  if ("bigint" != typeof e) {
    throw new TypeError(invalidBigInt(e));
  }
  return e;
}

function toNumber(e, n = "number") {
  if ("bigint" == typeof e) {
    throw new TypeError(forbiddenBigIntToNumber(n));
  }
  if (e = Number(e), !Number.isFinite(e)) {
    throw new RangeError(expectedFinite(n, e));
  }
  return e;
}

function toInteger(e, n) {
  return Math.trunc(toNumber(e, n)) || 0;
}

function toStrictInteger(e, n) {
  return requireNumberIsInteger(toNumber(e, n), n);
}

function toPositiveInteger(e, n) {
  return requireNumberIsPositive(toInteger(e, n), n);
}

function createBigNano(e, n) {
  let [t, o] = divModTrunc(n, Qr), r = e + t;
  const i = Math.sign(r);
  return i && i === -Math.sign(o) && (r -= i, o += i * Qr), [ r, o ];
}

function addBigNanos(e, n, t = 1) {
  return createBigNano(e[0] + n[0] * t, e[1] + n[1] * t);
}

function moveBigNano(e, n) {
  return createBigNano(e[0], e[1] + n);
}

function re(e, n) {
  return addBigNanos(n, e, -1);
}

function te(e, n) {
  return compareNumbers(e[0], n[0]) || compareNumbers(e[1], n[1]);
}

function bigNanoOutside(e, n, t) {
  return -1 === te(e, n) || 1 === te(e, t);
}

function bigIntToBigNano(e, n = 1) {
  const t = BigInt(Qr / n);
  return [ Number(e / t), Number(e % t) * n ];
}

function internal_he(e, n = 1) {
  const t = Qr / n, [o, r] = divModTrunc(e, t);
  return [ o, r * n ];
}

function bigNanoToBigInt(e, n = 1) {
  const [t, o] = e, r = Math.floor(o / n), i = Qr / n;
  return BigInt(t) * BigInt(i) + BigInt(r);
}

function oe(e, n = 1, t) {
  const [o, r] = e, [i, a] = divModTrunc(r, n);
  return o * (Qr / n) + (i + (t ? a / n : 0));
}

function divModBigNano(e, n, t = divModFloor) {
  const [o, r] = e, [i, a] = t(r, n);
  return [ o * (Qr / n) + i, a ];
}

function hashIntlFormatParts(e, n) {
  const t = e.formatToParts(n), o = {};
  for (const e of t) {
    o[e.type] = e.value;
  }
  return o;
}

function checkIsoYearMonthInBounds(e) {
  return clampProp(e, "isoYear", Li, Ai, 1), e.isoYear === Li ? clampProp(e, "isoMonth", 4, 12, 1) : e.isoYear === Ai && clampProp(e, "isoMonth", 1, 9, 1), 
  e;
}

function checkIsoDateInBounds(e) {
  return checkIsoDateTimeInBounds({
    ...e,
    ...Dt,
    isoHour: 12
  }), e;
}

function checkIsoDateTimeInBounds(e) {
  const n = clampProp(e, "isoYear", Li, Ai, 1), t = n === Li ? 1 : n === Ai ? -1 : 0;
  return t && checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + t,
    isoNanosecond: e.isoNanosecond - t
  })), e;
}

function checkEpochNanoInBounds(e) {
  if (!e || bigNanoOutside(e, Ui, qi)) {
    throw new RangeError(Cr);
  }
  return e;
}

function isoTimeFieldsToNano(e) {
  return givenFieldsToBigNano(e, 5, j)[1];
}

function nanoToIsoTimeAndDay(e) {
  const [n, t] = divModFloor(e, Qr);
  return [ nanoToGivenFields(t, 5, j), n ];
}

function epochNanoToSec(e) {
  return epochNanoToSecMod(e)[0];
}

function epochNanoToSecMod(e) {
  return divModBigNano(e, _r);
}

function isoToEpochMilli(e) {
  return isoArgsToEpochMilli(e.isoYear, e.isoMonth, e.isoDay, e.isoHour, e.isoMinute, e.isoSecond, e.isoMillisecond);
}

function isoToEpochNano(e) {
  const n = isoToEpochMilli(e);
  if (void 0 !== n) {
    const [t, o] = divModTrunc(n, Gr);
    return [ t, o * internal_be + (e.isoMicrosecond || 0) * Vr + (e.isoNanosecond || 0) ];
  }
}

function isoToEpochNanoWithOffset(e, n) {
  const [t, o] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e) - n);
  return checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + o,
    ...t
  }));
}

function isoArgsToEpochSec(...e) {
  return isoArgsToEpochMilli(...e) / Hr;
}

function isoArgsToEpochMilli(...e) {
  const [n, t] = isoToLegacyDate(...e), o = n.valueOf();
  if (!isNaN(o)) {
    return o - t * Gr;
  }
}

function isoToLegacyDate(e, n = 1, t = 1, o = 0, r = 0, i = 0, a = 0) {
  const s = e === Li ? 1 : e === Ai ? -1 : 0, c = new Date;
  return c.setUTCHours(o, r, i, a), c.setUTCFullYear(e, n - 1, t + s), [ c, s ];
}

function Ie(e, n) {
  let [t, o] = moveBigNano(e, n);
  o < 0 && (o += Qr, t -= 1);
  const [r, i] = divModFloor(o, internal_be), [a, s] = divModFloor(i, Vr);
  return epochMilliToIso(t * Gr + r, a, s);
}

function epochMilliToIso(e, n = 0, t = 0) {
  const o = Math.ceil(Math.max(0, Math.abs(e) - zi) / Gr) * Math.sign(e), r = new Date(e - o * Gr);
  return zipProps(wi, [ r.getUTCFullYear(), r.getUTCMonth() + 1, r.getUTCDate() + o, r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds(), n, t ]);
}

function computeIsoDateParts(e) {
  return [ e.isoYear, e.isoMonth, e.isoDay ];
}

function computeIsoMonthsInYear() {
  return xi;
}

function computeIsoDaysInMonth(e, n) {
  switch (n) {
   case 2:
    return computeIsoInLeapYear(e) ? 29 : 28;

   case 4:
   case 6:
   case 9:
   case 11:
    return 30;
  }
  return 31;
}

function computeIsoDaysInYear(e) {
  return computeIsoInLeapYear(e) ? 366 : 365;
}

function computeIsoInLeapYear(e) {
  return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
}

function computeIsoDayOfWeek(e) {
  const [n, t] = isoToLegacyDate(e.isoYear, e.isoMonth, e.isoDay);
  return modFloor(n.getUTCDay() - t, 7) || 7;
}

function computeGregoryEraParts({isoYear: e}) {
  return e < 1 ? [ "bce", 1 - e ] : [ "ce", e ];
}

function computeJapaneseEraParts(e) {
  const n = isoToEpochMilli(e);
  if (n < $i) {
    return computeGregoryEraParts(e);
  }
  const t = hashIntlFormatParts(La(Ti), n), {era: o, eraYear: r} = parseIntlYear(t, Ti);
  return [ o, r ];
}

function checkIsoDateTimeFields(e) {
  return checkIsoDateFields(e), constrainIsoTimeFields(e, 1), e;
}

function checkIsoDateFields(e) {
  return constrainIsoDateFields(e, 1), e;
}

function isIsoDateFieldsValid(e) {
  return allPropsEqual(Oi, e, constrainIsoDateFields(e));
}

function constrainIsoDateFields(e, n) {
  const {isoYear: t} = e, o = clampProp(e, "isoMonth", 1, computeIsoMonthsInYear(), n);
  return {
    isoYear: t,
    isoMonth: o,
    isoDay: clampProp(e, "isoDay", 1, computeIsoDaysInMonth(t, o), n)
  };
}

function constrainIsoTimeFields(e, n) {
  return zipProps(j, [ clampProp(e, "isoHour", 0, 23, n), clampProp(e, "isoMinute", 0, 59, n), clampProp(e, "isoSecond", 0, 59, n), clampProp(e, "isoMillisecond", 0, 999, n), clampProp(e, "isoMicrosecond", 0, 999, n), clampProp(e, "isoNanosecond", 0, 999, n) ]);
}

function H(e) {
  return void 0 === e ? 0 : ua(de(e));
}

function wn(e, n = 0) {
  e = normalizeOptions(e);
  const t = la(e), o = fa(e, n);
  return [ ua(e), o, t ];
}

function ve(e) {
  return la(normalizeOptions(e));
}

function _t(e) {
  return e = normalizeOptions(e), sa(e, 9, 6, 1);
}

function refineDiffOptions(e, n, t, o = 9, r = 0, i = 4) {
  n = normalizeOptions(n);
  let a = sa(n, o, r), s = parseRoundingIncInteger(n), c = ha(n, i);
  const u = aa(n, o, r, 1);
  return null == a ? a = Math.max(t, u) : checkLargestSmallestUnit(a, u), s = refineRoundingInc(s, u, 1), 
  e && (c = (e => e < 4 ? (e + 2) % 4 : e)(c)), [ a, u, s, c ];
}

function refineRoundingOptions(e, n = 6, t) {
  let o = parseRoundingIncInteger(e = normalizeOptionsOrString(e, Hi));
  const r = ha(e, 7);
  let i = aa(e, n);
  return i = requirePropDefined(Hi, i), o = refineRoundingInc(o, i, void 0, t), [ i, o, r ];
}

function refineDateDisplayOptions(e) {
  return da(normalizeOptions(e));
}

function refineTimeDisplayOptions(e, n) {
  return refineTimeDisplayTuple(normalizeOptions(e), n);
}

function refineTimeDisplayTuple(e, n = 4) {
  const t = refineSubsecDigits(e);
  return [ ha(e, 4), ...refineSmallestUnitAndSubsecDigits(aa(e, n), t) ];
}

function refineSmallestUnitAndSubsecDigits(e, n) {
  return null != e ? [ Xr[e], e < 4 ? 9 - 3 * e : -1 ] : [ void 0 === n ? 1 : 10 ** (9 - n), n ];
}

function parseRoundingIncInteger(e) {
  const n = e[_i];
  return void 0 === n ? 1 : toInteger(n, _i);
}

function refineRoundingInc(e, n, t, o) {
  const r = o ? Qr : Xr[n + 1];
  if (r) {
    const t = Xr[n];
    if (r % ((e = clampEntity(_i, e, 1, r / t - (o ? 0 : 1), 1)) * t)) {
      throw new RangeError(invalidEntity(_i, e));
    }
  } else {
    e = clampEntity(_i, e, 1, t ? 10 ** 9 : 1, 1);
  }
  return e;
}

function refineSubsecDigits(e) {
  let n = e[Ji];
  if (void 0 !== n) {
    if ("number" != typeof n) {
      if ("auto" === internal_toString(n)) {
        return;
      }
      throw new RangeError(invalidEntity(Ji, n));
    }
    n = clampEntity(Ji, Math.floor(n), 0, 9, 1);
  }
  return n;
}

function normalizeOptions(e) {
  return void 0 === e ? {} : de(e);
}

function normalizeOptionsOrString(e, n) {
  return "string" == typeof e ? {
    [n]: e
  } : de(e);
}

function U(e) {
  if (void 0 !== e) {
    if (z(e)) {
      return Object.assign(Object.create(null), e);
    }
    throw new TypeError(hr);
  }
}

function overrideOverflowOptions(e, n) {
  return e && Object.assign(Object.create(null), e, {
    overflow: Xi[n]
  });
}

function refineUnitOption(e, n, t = 9, o = 0, r) {
  let i = n[e];
  if (void 0 === i) {
    return r ? o : void 0;
  }
  if (i = internal_toString(i), "auto" === i) {
    return r ? o : null;
  }
  let a = $r[i];
  if (void 0 === a && (a = Ei[i]), void 0 === a) {
    throw new RangeError(invalidChoice(e, i, $r));
  }
  return clampEntity(e, a, o, t, 1, Et), a;
}

function refineChoiceOption(e, n, t, o = 0) {
  const r = t[e];
  if (void 0 === r) {
    return o;
  }
  const i = internal_toString(r), a = n[i];
  if (void 0 === a) {
    throw new RangeError(invalidChoice(e, i, n));
  }
  return a;
}

function checkLargestSmallestUnit(e, n) {
  if (n > e) {
    throw new RangeError(Ar);
  }
}

function internal_(e) {
  return {
    branding: Oe,
    epochNanoseconds: e
  };
}

function Yn(e, n, t) {
  return {
    branding: Te,
    calendar: t,
    timeZone: n,
    epochNanoseconds: e
  };
}

function ee(e, n = e.calendar) {
  return {
    branding: We,
    calendar: n,
    ...Vn(Yi, e)
  };
}

function v(e, n = e.calendar) {
  return {
    branding: J,
    calendar: n,
    ...Vn(Bi, e)
  };
}

function createPlainYearMonthSlots(e, n = e.calendar) {
  return {
    branding: L,
    calendar: n,
    ...Vn(Bi, e)
  };
}

function createPlainMonthDaySlots(e, n = e.calendar) {
  return {
    branding: q,
    calendar: n,
    ...Vn(Bi, e)
  };
}

function Ge(e) {
  return {
    branding: xe,
    ...Vn(ki, e)
  };
}

function Vt(e) {
  return {
    branding: qt,
    sign: computeDurationSign(e),
    ...Vn(Ni, e)
  };
}

function M(e) {
  return epochNanoToSec(e.epochNanoseconds);
}

function y(e) {
  return divModBigNano(e.epochNanoseconds, internal_be)[0];
}

function N(e) {
  return bigNanoToBigInt(e.epochNanoseconds, Vr);
}

function B(e) {
  return bigNanoToBigInt(e.epochNanoseconds);
}

function extractEpochNano(e) {
  return e.epochNanoseconds;
}

function I(e) {
  return "string" == typeof e ? e : m(e.id);
}

function isIdLikeEqual(e, n) {
  return e === n || I(e) === I(n);
}

function Ut(e, n, t, o, r) {
  const i = getMaxDurationUnit(o), [a, s] = ((e, n) => {
    const t = n((e = normalizeOptionsOrString(e, Vi))[Ki]);
    let o = ca(e);
    return o = requirePropDefined(Vi, o), [ o, t ];
  })(r, e);
  if (isUniformUnit(Math.max(a, i), s)) {
    return totalDayTimeDuration(o, a);
  }
  if (!s) {
    throw new RangeError(zr);
  }
  const [c, u, l] = createMarkerSystem(n, t, s), f = createMarkerToEpochNano(l), d = createMoveMarker(l), m = createDiffMarkers(l), p = d(u, c, o), h = m(u, c, p, a);
  return isUniformUnit(a, s) ? totalDayTimeDuration(h, a) : ((e, n, t, o, r, i, a) => {
    const s = computeDurationSign(e), [c, u] = clampRelativeDuration(o, bi(t, e), t, s, r, i, a), l = computeEpochNanoFrac(n, c, u);
    return e[F[t]] + l * s;
  })(h, f(p), a, u, c, f, d);
}

function totalDayTimeDuration(e, n) {
  return oe(durationFieldsToBigNano(e), Xr[n], 1);
}

function clampRelativeDuration(e, n, t, o, r, i, a) {
  const s = F[t], c = {
    ...n,
    [s]: n[s] + o
  }, u = a(e, r, n), l = a(e, r, c);
  return [ i(u), i(l) ];
}

function computeEpochNanoFrac(e, n, t) {
  const o = oe(re(n, t));
  if (!o) {
    throw new RangeError(vr);
  }
  return oe(re(n, e)) / o;
}

function ce(e, n) {
  const [t, o, r] = refineRoundingOptions(n, 5, 1);
  return internal_(roundBigNano(e.epochNanoseconds, t, o, r, 1));
}

function Pn(e, n, t) {
  let {epochNanoseconds: o, timeZone: r, calendar: i} = n;
  const [a, s, c] = refineRoundingOptions(t);
  if (0 === a && 1 === s) {
    return n;
  }
  const u = e(r);
  if (6 === a) {
    o = ((e, n, t, o) => {
      const r = fn(t, n), [i, a] = e(r), s = t.epochNanoseconds, c = we(n, i), u = we(n, a);
      if (bigNanoOutside(s, c, u)) {
        throw new RangeError(vr);
      }
      return roundWithMode(computeEpochNanoFrac(s, c, u), o) ? u : c;
    })(computeDayInterval, u, n, c);
  } else {
    const e = u.getOffsetNanosecondsFor(o);
    o = getMatchingInstantFor(u, roundDateTime(Ie(o, e), a, s, c), e, 2, 0, 1);
  }
  return Yn(o, r, i);
}

function dt(e, n) {
  return ee(roundDateTime(e, ...refineRoundingOptions(n)), e.calendar);
}

function Ee(e, n) {
  const [t, o, r] = refineRoundingOptions(n, 5);
  var i;
  return Ge((i = r, roundTimeToNano(e, computeNanoInc(t, o), i)[0]));
}

function dn(e, n) {
  const t = e(n.timeZone), o = fn(n, t), [r, i] = computeDayInterval(o), a = oe(re(we(t, r), we(t, i)), Kr, 1);
  if (a <= 0) {
    throw new RangeError(vr);
  }
  return a;
}

function Cn(e, n) {
  const {timeZone: t, calendar: o} = n, r = ((e, n, t) => we(n, e(fn(t, n))))(computeDayFloor, e(t), n);
  return Yn(r, t, o);
}

function roundDateTime(e, n, t, o) {
  return roundDateTimeToNano(e, computeNanoInc(n, t), o);
}

function roundDateTimeToNano(e, n, t) {
  const [o, r] = roundTimeToNano(e, n, t);
  return checkIsoDateTimeInBounds({
    ...moveByDays(e, r),
    ...o
  });
}

function roundTimeToNano(e, n, t) {
  return nanoToIsoTimeAndDay(roundByInc(isoTimeFieldsToNano(e), n, t));
}

function roundToMinute(e) {
  return roundByInc(e, Jr, 7);
}

function computeNanoInc(e, n) {
  return Xr[e] * n;
}

function computeDayInterval(e) {
  const n = computeDayFloor(e);
  return [ n, moveByDays(n, 1) ];
}

function computeDayFloor(e) {
  return Ci(6, e);
}

function roundDayTimeDurationByInc(e, n, t) {
  const o = Math.min(getMaxDurationUnit(e), 6);
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(e, o), n, t), o);
}

function roundRelativeDuration(e, n, t, o, r, i, a, s, c, u) {
  if (0 === o && 1 === r) {
    return e;
  }
  const l = isUniformUnit(o, s) ? isZonedEpochSlots(s) && o < 6 && t >= 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration : nudgeRelativeDuration;
  let [f, d, m] = l(e, n, t, o, r, i, a, s, c, u);
  return m && 7 !== o && (f = ((e, n, t, o, r, i, a, s) => {
    const c = computeDurationSign(e);
    for (let u = o + 1; u <= t; u++) {
      if (7 === u && 7 !== t) {
        continue;
      }
      const o = bi(u, e);
      o[F[u]] += c;
      const l = oe(re(a(s(r, i, o)), n));
      if (l && Math.sign(l) !== c) {
        break;
      }
      e = o;
    }
    return e;
  })(f, d, t, Math.max(6, o), a, s, c, u)), f;
}

function roundBigNano(e, n, t, o, r) {
  if (6 === n) {
    const n = (e => e[0] + e[1] / Qr)(e);
    return [ roundByInc(n, t, o), 0 ];
  }
  return roundBigNanoByInc(e, computeNanoInc(n, t), o, r);
}

function roundBigNanoByInc(e, n, t, o) {
  let [r, i] = e;
  o && i < 0 && (i += Qr, r -= 1);
  const [a, s] = divModFloor(roundByInc(i, n, t), Qr);
  return createBigNano(r + a, s);
}

function roundByInc(e, n, t) {
  return roundWithMode(e / n, t) * n;
}

function roundWithMode(e, n) {
  return ga[n](e);
}

function nudgeDayTimeDuration(e, n, t, o, r, i) {
  const a = computeDurationSign(e), s = durationFieldsToBigNano(e), c = roundBigNano(s, o, r, i), u = re(s, c), l = Math.sign(c[0] - s[0]) === a, f = nanoToDurationDayTimeFields(c, Math.min(t, 6));
  return [ {
    ...e,
    ...f
  }, addBigNanos(n, u), l ];
}

function nudgeZonedTimeDuration(e, n, t, o, r, i, a, s, c, u) {
  const l = computeDurationSign(e), f = oe(durationFieldsToBigNano(e, 5)), d = computeNanoInc(o, r);
  let m = roundByInc(f, d, i);
  const [p, h] = clampRelativeDuration(a, {
    ...e,
    ...Fi
  }, 6, l, s, c, u), g = m - oe(re(p, h));
  let T = 0;
  g && Math.sign(g) !== l ? n = moveBigNano(p, m) : (T += l, m = roundByInc(g, d, i), 
  n = moveBigNano(h, m));
  const D = nanoToDurationTimeFields(m);
  return [ {
    ...e,
    ...D,
    days: e.days + T
  }, n, Boolean(T) ];
}

function nudgeRelativeDuration(e, n, t, o, r, i, a, s, c, u) {
  const l = computeDurationSign(e), f = F[o], d = bi(o, e);
  7 === o && (e = {
    ...e,
    weeks: e.weeks + Math.trunc(e.days / 7)
  });
  const m = divTrunc(e[f], r) * r;
  d[f] = m;
  const [p, h] = clampRelativeDuration(a, d, o, r * l, s, c, u), g = m + computeEpochNanoFrac(n, p, h) * l * r, T = roundByInc(g, r, i), D = Math.sign(T - g) === l;
  return d[f] = T, [ d, D ? h : p, D ];
}

function me(e, n, t, o) {
  const [r, i, a, s] = (e => {
    const n = refineTimeDisplayTuple(e = normalizeOptions(e));
    return [ e.timeZone, ...n ];
  })(o), c = void 0 !== r;
  return ((e, n, t, o, r, i) => {
    t = roundBigNanoByInc(t, r, o, 1);
    const a = n.getOffsetNanosecondsFor(t);
    return formatIsoDateTimeFields(Ie(t, a), i) + (e ? Fe(roundToMinute(a)) : "Z");
  })(c, n(c ? e(r) : Ta), t.epochNanoseconds, i, a, s);
}

function In(e, n, t) {
  const [o, r, i, a, s, c] = (e => {
    e = normalizeOptions(e);
    const n = da(e), t = refineSubsecDigits(e), o = pa(e), r = ha(e, 4), i = aa(e, 4);
    return [ n, ma(e), o, r, ...refineSmallestUnitAndSubsecDigits(i, t) ];
  })(t);
  return ((e, n, t, o, r, i, a, s, c, u) => {
    o = roundBigNanoByInc(o, c, s, 1);
    const l = e(t).getOffsetNanosecondsFor(o);
    return formatIsoDateTimeFields(Ie(o, l), u) + Fe(roundToMinute(l), a) + ((e, n) => 1 !== n ? "[" + (2 === n ? "!" : "") + I(e) + "]" : "")(t, i) + formatCalendar(n, r);
  })(e, n.calendar, n.timeZone, n.epochNanoseconds, o, r, i, a, s, c);
}

function Tt(e, n) {
  const [t, o, r, i] = (e => (e = normalizeOptions(e), [ da(e), ...refineTimeDisplayTuple(e) ]))(n);
  return a = e.calendar, s = t, c = i, formatIsoDateTimeFields(roundDateTimeToNano(e, r, o), c) + formatCalendar(a, s);
  var a, s, c;
}

function yt(e, n) {
  return t = e.calendar, o = e, r = refineDateDisplayOptions(n), formatIsoDateFields(o) + formatCalendar(t, r);
  var t, o, r;
}

function et(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoYearMonthFields, e, refineDateDisplayOptions(n));
}

function W(e, n) {
  return formatDateLikeIso(e.calendar, formatIsoMonthDayFields, e, refineDateDisplayOptions(n));
}

function qe(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n);
  return i = r, formatIsoTimeFields(roundTimeToNano(e, o, t)[0], i);
  var i;
}

function zt(e, n) {
  const [t, o, r] = refineTimeDisplayOptions(n, 3);
  return o > 1 && (e = {
    ...e,
    ...roundDayTimeDurationByInc(e, o, t)
  }), ((e, n) => {
    const {sign: t} = e, o = -1 === t ? negateDurationFields(e) : e, {hours: r, minutes: i} = o, [a, s] = divModBigNano(durationFieldsToBigNano(o, 3), _r, divModTrunc);
    checkDurationTimeUnit(a);
    const c = formatSubsecNano(s, n), u = n >= 0 || !t || c;
    return (t < 0 ? "-" : "") + "P" + formatDurationFragments({
      Y: formatDurationNumber(o.years),
      M: formatDurationNumber(o.months),
      W: formatDurationNumber(o.weeks),
      D: formatDurationNumber(o.days)
    }) + (r || i || a || u ? "T" + formatDurationFragments({
      H: formatDurationNumber(r),
      M: formatDurationNumber(i),
      S: formatDurationNumber(a, u) + c
    }) : "");
  })(e, r);
}

function formatDateLikeIso(e, n, t, o) {
  const r = I(e), i = o > 1 || 0 === o && r !== X;
  return 1 === o ? r === X ? n(t) : formatIsoDateFields(t) : i ? formatIsoDateFields(t) + formatCalendarId(r, 2 === o) : n(t);
}

function formatDurationFragments(e) {
  const n = [];
  for (const t in e) {
    const o = e[t];
    o && n.push(o, t);
  }
  return n.join("");
}

function formatIsoDateTimeFields(e, n) {
  return formatIsoDateFields(e) + "T" + formatIsoTimeFields(e, n);
}

function formatIsoDateFields(e) {
  return formatIsoYearMonthFields(e) + "-" + xr(e.isoDay);
}

function formatIsoYearMonthFields(e) {
  const {isoYear: n} = e;
  return (n < 0 || n > 9999 ? getSignStr(n) + padNumber(6, Math.abs(n)) : padNumber(4, n)) + "-" + xr(e.isoMonth);
}

function formatIsoMonthDayFields(e) {
  return xr(e.isoMonth) + "-" + xr(e.isoDay);
}

function formatIsoTimeFields(e, n) {
  const t = [ xr(e.isoHour), xr(e.isoMinute) ];
  return -1 !== n && t.push(xr(e.isoSecond) + ((e, n, t, o) => formatSubsecNano(e * internal_be + n * Vr + t, o))(e.isoMillisecond, e.isoMicrosecond, e.isoNanosecond, n)), 
  t.join(":");
}

function Fe(e, n = 0) {
  if (1 === n) {
    return "";
  }
  const [t, o] = divModFloor(Math.abs(e), Kr), [r, i] = divModFloor(o, Jr), [a, s] = divModFloor(i, _r);
  return getSignStr(e) + xr(t) + ":" + xr(r) + (a || s ? ":" + xr(a) + formatSubsecNano(s) : "");
}

function formatCalendar(e, n) {
  if (1 !== n) {
    const t = I(e);
    if (n > 1 || 0 === n && t !== X) {
      return formatCalendarId(t, 2 === n);
    }
  }
  return "";
}

function formatCalendarId(e, n) {
  return "[" + (n ? "!" : "") + "u-ca=" + e + "]";
}

function formatSubsecNano(e, n) {
  let t = padNumber(9, e);
  return t = void 0 === n ? t.replace(Na, "") : t.slice(0, n), t ? "." + t : "";
}

function getSignStr(e) {
  return e < 0 ? "-" : "+";
}

function formatDurationNumber(e, n) {
  return e || n ? e.toLocaleString("fullwide", {
    useGrouping: 0
  }) : "";
}

function _zonedEpochSlotsToIso(e, n) {
  const {epochNanoseconds: t} = e, o = (n.getOffsetNanosecondsFor ? n : n(e.timeZone)).getOffsetNanosecondsFor(t), r = Ie(t, o);
  return {
    calendar: e.calendar,
    ...r,
    offsetNanoseconds: o
  };
}

function mn(e, n) {
  const t = fn(n, e);
  return {
    calendar: n.calendar,
    ...Vn(Yi, t),
    offset: Fe(t.offsetNanoseconds),
    timeZone: n.timeZone
  };
}

function getMatchingInstantFor(e, n, t, o = 0, r = 0, i, a) {
  if (void 0 !== t && 1 === o && (1 === o || a)) {
    return isoToEpochNanoWithOffset(n, t);
  }
  const s = e.getPossibleInstantsFor(n);
  if (void 0 !== t && 3 !== o) {
    const e = ((e, n, t, o) => {
      const r = isoToEpochNano(n);
      o && (t = roundToMinute(t));
      for (const n of e) {
        let e = oe(re(n, r));
        if (o && (e = roundToMinute(e)), e === t) {
          return n;
        }
      }
    })(s, n, t, i);
    if (void 0 !== e) {
      return e;
    }
    if (0 === o) {
      throw new RangeError(kr);
    }
  }
  return a ? isoToEpochNano(n) : we(e, n, r, s);
}

function we(e, n, t = 0, o = e.getPossibleInstantsFor(n)) {
  if (1 === o.length) {
    return o[0];
  }
  if (1 === t) {
    throw new RangeError(Yr);
  }
  if (o.length) {
    return o[3 === t ? 1 : 0];
  }
  const r = isoToEpochNano(n), i = ((e, n) => {
    const t = e.getOffsetNanosecondsFor(moveBigNano(n, -Qr));
    return ne(e.getOffsetNanosecondsFor(moveBigNano(n, Qr)) - t);
  })(e, r), a = i * (2 === t ? -1 : 1);
  return (o = e.getPossibleInstantsFor(Ie(r, a)))[2 === t ? 0 : o.length - 1];
}

function ae(e) {
  if (Math.abs(e) >= Qr) {
    throw new RangeError(wr);
  }
  return e;
}

function ne(e) {
  if (e > Qr) {
    throw new RangeError(Br);
  }
  return e;
}

function se(e, n, t) {
  return internal_(checkEpochNanoInBounds(addBigNanos(n.epochNanoseconds, (e => {
    if (durationHasDateParts(e)) {
      throw new RangeError(qr);
    }
    return durationFieldsToBigNano(e, 5);
  })(e ? negateDurationFields(t) : t))));
}

function hn(e, n, t, o, r, i = Object.create(null)) {
  const a = n(o.timeZone), s = e(o.calendar);
  return {
    ...o,
    ...moveZonedEpochs(a, s, o, t ? negateDurationFields(r) : r, i)
  };
}

function ct(e, n, t, o, r = Object.create(null)) {
  const {calendar: i} = t;
  return ee(moveDateTime(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function bt(e, n, t, o, r) {
  const {calendar: i} = t;
  return v(moveDate(e(i), t, n ? negateDurationFields(o) : o, r), i);
}

function Qe(e, n, t, o, r = Object.create(null)) {
  const i = t.calendar, a = e(i);
  let s = moveToDayOfMonthUnsafe(a, t);
  n && (o = xt(o)), o.sign < 0 && (s = a.dateAdd(s, {
    ...Si,
    months: 1
  }), s = moveByDays(s, -1));
  const c = a.dateAdd(s, o, r);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(a, c), i);
}

function Ye(e, n, t) {
  return Ge(moveTime(n, e ? negateDurationFields(t) : t)[0]);
}

function moveZonedEpochs(e, n, t, o, r) {
  const i = durationFieldsToBigNano(o, 5);
  let a = t.epochNanoseconds;
  if (durationHasDateParts(o)) {
    const s = fn(t, e);
    a = addBigNanos(we(e, {
      ...moveDate(n, s, {
        ...o,
        ...Fi
      }, r),
      ...Vn(j, s)
    }), i);
  } else {
    a = addBigNanos(a, i), H(r);
  }
  return {
    epochNanoseconds: checkEpochNanoInBounds(a)
  };
}

function moveDateTime(e, n, t, o) {
  const [r, i] = moveTime(n, t);
  return checkIsoDateTimeInBounds({
    ...moveDate(e, n, {
      ...t,
      ...Fi,
      days: t.days + i
    }, o),
    ...r
  });
}

function moveDate(e, n, t, o) {
  if (t.years || t.months || t.weeks) {
    return e.dateAdd(n, t, o);
  }
  H(o);
  const r = t.days + durationFieldsToBigNano(t, 5)[0];
  return r ? checkIsoDateInBounds(moveByDays(n, r)) : n;
}

function moveToDayOfMonthUnsafe(e, n, t = 1) {
  return moveByDays(n, t - e.day(n));
}

function moveTime(e, n) {
  const [t, o] = durationFieldsToBigNano(n, 5), [r, i] = nanoToIsoTimeAndDay(isoTimeFieldsToNano(e) + o);
  return [ r, t + i ];
}

function moveByDays(e, n) {
  return n ? {
    ...e,
    ...epochMilliToIso(isoToEpochMilli(e) + n * Gr)
  } : e;
}

function createMarkerSystem(e, n, t) {
  const o = e(t.calendar);
  return isZonedEpochSlots(t) ? [ t, o, n(t.timeZone) ] : [ {
    ...t,
    ...Dt
  }, o ];
}

function createMarkerToEpochNano(e) {
  return e ? extractEpochNano : isoToEpochNano;
}

function createMoveMarker(e) {
  return e ? E(moveZonedEpochs, e) : moveDateTime;
}

function createDiffMarkers(e) {
  return e ? E(diffZonedEpochsExact, e) : diffDateTimesExact;
}

function isZonedEpochSlots(e) {
  return e && e.epochNanoseconds;
}

function isUniformUnit(e, n) {
  return e <= 6 - (isZonedEpochSlots(n) ? 1 : 0);
}

function Wt(e, n, t, o, r, i, a) {
  const s = e(normalizeOptions(a).relativeTo), c = Math.max(getMaxDurationUnit(r), getMaxDurationUnit(i));
  if (isUniformUnit(c, s)) {
    return Vt(checkDurationUnits(((e, n, t, o) => {
      const r = addBigNanos(durationFieldsToBigNano(e), durationFieldsToBigNano(n), o ? -1 : 1);
      if (!Number.isFinite(r[0])) {
        throw new RangeError(Cr);
      }
      return {
        ...Si,
        ...nanoToDurationDayTimeFields(r, t)
      };
    })(r, i, c, o)));
  }
  if (!s) {
    throw new RangeError(zr);
  }
  o && (i = negateDurationFields(i));
  const [u, l, f] = createMarkerSystem(n, t, s), d = createMoveMarker(f), m = createDiffMarkers(f), p = d(l, u, r);
  return Vt(m(l, u, d(l, p, i), c));
}

function Gt(e, n, t, o, r) {
  const i = getMaxDurationUnit(o), [a, s, c, u, l] = ((e, n, t) => {
    e = normalizeOptionsOrString(e, Hi);
    let o = sa(e);
    const r = t(e[Ki]);
    let i = parseRoundingIncInteger(e);
    const a = ha(e, 7);
    let s = aa(e);
    if (void 0 === o && void 0 === s) {
      throw new RangeError(Ur);
    }
    return null == s && (s = 0), null == o && (o = Math.max(s, n)), checkLargestSmallestUnit(o, s), 
    i = refineRoundingInc(i, s, 1), [ o, s, i, a, r ];
  })(r, i, e), f = Math.max(i, a);
  if (!isZonedEpochSlots(l) && f <= 6) {
    return Vt(checkDurationUnits(((e, n, t, o, r) => {
      const i = roundBigNano(durationFieldsToBigNano(e), t, o, r);
      return {
        ...Si,
        ...nanoToDurationDayTimeFields(i, n)
      };
    })(o, a, s, c, u)));
  }
  if (!l) {
    throw new RangeError(zr);
  }
  const [d, m, p] = createMarkerSystem(n, t, l), h = createMarkerToEpochNano(p), g = createMoveMarker(p), T = createDiffMarkers(p), D = g(m, d, o);
  let I = T(m, d, D, a);
  const M = o.sign, N = computeDurationSign(I);
  if (M && N && M !== N) {
    throw new RangeError(vr);
  }
  return N && (I = roundRelativeDuration(I, h(D), a, s, c, u, m, d, h, g)), Vt(I);
}

function Rt(e) {
  return -1 === e.sign ? xt(e) : e;
}

function xt(e) {
  return Vt(negateDurationFields(e));
}

function negateDurationFields(e) {
  const n = {};
  for (const t of F) {
    n[t] = -1 * e[t] || 0;
  }
  return n;
}

function Jt(e) {
  return !e.sign;
}

function computeDurationSign(e, n = F) {
  let t = 0;
  for (const o of n) {
    const n = Math.sign(e[o]);
    if (n) {
      if (t && t !== n) {
        throw new RangeError(Rr);
      }
      t = n;
    }
  }
  return t;
}

function checkDurationUnits(e) {
  for (const n of vi) {
    clampEntity(n, e[n], -ya, ya, 1);
  }
  return checkDurationTimeUnit(oe(durationFieldsToBigNano(e), _r)), e;
}

function checkDurationTimeUnit(e) {
  if (!Number.isSafeInteger(e)) {
    throw new RangeError(Zr);
  }
}

function durationFieldsToBigNano(e, n = 6) {
  return givenFieldsToBigNano(e, n, F);
}

function nanoToDurationDayTimeFields(e, n = 6) {
  const [t, o] = e, r = nanoToGivenFields(o, n, F);
  if (r[F[n]] += t * (Qr / Xr[n]), !Number.isFinite(r[F[n]])) {
    throw new RangeError(Cr);
  }
  return r;
}

function nanoToDurationTimeFields(e, n = 5) {
  return nanoToGivenFields(e, n, F);
}

function durationHasDateParts(e) {
  return Boolean(computeDurationSign(e, Pi));
}

function getMaxDurationUnit(e) {
  let n = 9;
  for (;n > 0 && !e[F[n]]; n--) {}
  return n;
}

function createSplitTuple(e, n) {
  return [ e, n ];
}

function computePeriod(e) {
  const n = Math.floor(e / Da) * Da;
  return [ n, n + Da ];
}

function pe(e) {
  const n = parseDateTimeLike(e = toStringViaPrimitive(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  let t;
  if (n.m) {
    t = 0;
  } else {
    if (!n.offset) {
      throw new RangeError(failedParse(e));
    }
    t = parseOffsetNano(n.offset);
  }
  return n.timeZone && parseOffsetNanoMaybe(n.timeZone, 1), internal_(isoToEpochNanoWithOffset(checkIsoDateTimeFields(n), t));
}

function Xt(e) {
  const n = parseDateTimeLike(m(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  if (n.timeZone) {
    return finalizeZonedDateTime(n, n.offset ? parseOffsetNano(n.offset) : void 0);
  }
  if (n.m) {
    throw new RangeError(failedParse(e));
  }
  return finalizeDate(n);
}

function Mn(e, n) {
  const t = parseDateTimeLike(m(e));
  if (!t || !t.timeZone) {
    throw new RangeError(failedParse(e));
  }
  const {offset: o} = t, r = o ? parseOffsetNano(o) : void 0, [, i, a] = wn(n);
  return finalizeZonedDateTime(t, r, i, a);
}

function parseOffsetNano(e) {
  const n = parseOffsetNanoMaybe(e);
  if (void 0 === n) {
    throw new RangeError(failedParse(e));
  }
  return n;
}

function Ct(e) {
  const n = parseDateTimeLike(m(e));
  if (!n || n.m) {
    throw new RangeError(failedParse(e));
  }
  return ee(finalizeDateTime(n));
}

function At(e) {
  const n = parseDateTimeLike(m(e));
  if (!n || n.m) {
    throw new RangeError(failedParse(e));
  }
  return v(n.p ? finalizeDateTime(n) : finalizeDate(n));
}

function ot(e, n) {
  const t = parseYearMonthOnly(m(n));
  if (t) {
    return requireIsoCalendar(t), createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields(t)));
  }
  const o = At(n);
  return createPlainYearMonthSlots(moveToDayOfMonthUnsafe(e(o.calendar), o));
}

function requireIsoCalendar(e) {
  if (e.calendar !== X) {
    throw new RangeError(invalidSubstring(e.calendar));
  }
}

function Q(e, n) {
  const t = parseMonthDayOnly(m(n));
  if (t) {
    return requireIsoCalendar(t), createPlainMonthDaySlots(checkIsoDateFields(t));
  }
  const o = At(n), {calendar: r} = o, i = e(r), [a, s, c] = i.h(o), [u, l] = i.I(a, s), [f, d] = i.N(u, l, c);
  return createPlainMonthDaySlots(checkIsoDateInBounds(i.P(f, d, c)), r);
}

function ze(e) {
  let n, t = (e => {
    const n = Ca.exec(e);
    return n ? (organizeAnnotationParts(n[10]), organizeTimeParts(n)) : void 0;
  })(m(e));
  if (!t) {
    if (t = parseDateTimeLike(e), !t) {
      throw new RangeError(failedParse(e));
    }
    if (!t.p) {
      throw new RangeError(failedParse(e));
    }
    if (t.m) {
      throw new RangeError(invalidSubstring("Z"));
    }
    requireIsoCalendar(t);
  }
  if ((n = parseYearMonthOnly(e)) && isIsoDateFieldsValid(n)) {
    throw new RangeError(failedParse(e));
  }
  if ((n = parseMonthDayOnly(e)) && isIsoDateFieldsValid(n)) {
    throw new RangeError(failedParse(e));
  }
  return Ge(constrainIsoTimeFields(t, 1));
}

function Kt(e) {
  const n = (e => {
    const n = za.exec(e);
    return n ? (e => {
      function parseUnit(e, r, i) {
        let a = 0, s = 0;
        if (i && ([a, o] = divModFloor(o, Xr[i])), void 0 !== e) {
          if (t) {
            throw new RangeError(invalidSubstring(e));
          }
          s = (e => {
            const n = parseInt(e);
            if (!Number.isFinite(n)) {
              throw new RangeError(invalidSubstring(e));
            }
            return n;
          })(e), n = 1, r && (o = parseSubsecNano(r) * (Xr[i] / _r), t = 1);
        }
        return a + s;
      }
      let n = 0, t = 0, o = 0, r = {
        ...zipProps(F, [ parseUnit(e[2]), parseUnit(e[3]), parseUnit(e[4]), parseUnit(e[5]), parseUnit(e[6], e[7], 5), parseUnit(e[8], e[9], 4), parseUnit(e[10], e[11], 3) ]),
        ...nanoToGivenFields(o, 2, F)
      };
      if (!n) {
        throw new RangeError(noValidFields(F));
      }
      return parseSign(e[1]) < 0 && (r = negateDurationFields(r)), r;
    })(n) : void 0;
  })(m(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  return Vt(checkDurationUnits(n));
}

function sn(e) {
  const n = parseDateTimeLike(e) || parseYearMonthOnly(e) || parseMonthDayOnly(e);
  return n ? n.calendar : e;
}

function Ne(e) {
  const n = parseDateTimeLike(e);
  return n && (n.timeZone || n.m && Ta || n.offset) || e;
}

function finalizeZonedDateTime(e, n, t = 0, o = 0) {
  const r = ye(e.timeZone), i = ie(r);
  return Yn(getMatchingInstantFor(i, checkIsoDateTimeFields(e), n, t, o, !i.v, e.m), r, an(e.calendar));
}

function finalizeDateTime(e) {
  return resolveSlotsCalendar(checkIsoDateTimeInBounds(checkIsoDateTimeFields(e)));
}

function finalizeDate(e) {
  return resolveSlotsCalendar(checkIsoDateInBounds(checkIsoDateFields(e)));
}

function resolveSlotsCalendar(e) {
  return {
    ...e,
    calendar: an(e.calendar)
  };
}

function parseDateTimeLike(e) {
  const n = Ya.exec(e);
  return n ? (e => {
    const n = e[10], t = "Z" === (n || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(e),
      isoMonth: parseInt(e[4]),
      isoDay: parseInt(e[5]),
      ...organizeTimeParts(e.slice(5)),
      ...organizeAnnotationParts(e[16]),
      p: Boolean(e[6]),
      m: t,
      offset: t ? void 0 : n
    };
  })(n) : void 0;
}

function parseYearMonthOnly(e) {
  const n = Ba.exec(e);
  return n ? (e => ({
    isoYear: organizeIsoYearParts(e),
    isoMonth: parseInt(e[4]),
    isoDay: 1,
    ...organizeAnnotationParts(e[5])
  }))(n) : void 0;
}

function parseMonthDayOnly(e) {
  const n = ka.exec(e);
  return n ? (e => ({
    isoYear: ji,
    isoMonth: parseInt(e[1]),
    isoDay: parseInt(e[2]),
    ...organizeAnnotationParts(e[3])
  }))(n) : void 0;
}

function parseOffsetNanoMaybe(e, n) {
  const t = Za.exec(e);
  return t ? ((e, n) => {
    const t = e[4] || e[5];
    if (n && t) {
      throw new RangeError(invalidSubstring(t));
    }
    return ae((parseInt0(e[2]) * Kr + parseInt0(e[3]) * Jr + parseInt0(e[4]) * _r + parseSubsecNano(e[5] || "")) * parseSign(e[1]));
  })(t, n) : void 0;
}

function organizeIsoYearParts(e) {
  const n = parseSign(e[1]), t = parseInt(e[2] || e[3]);
  if (n < 0 && !t) {
    throw new RangeError(invalidSubstring(-0));
  }
  return n * t;
}

function organizeTimeParts(e) {
  const n = parseInt0(e[3]);
  return {
    ...nanoToIsoTimeAndDay(parseSubsecNano(e[4] || ""))[0],
    isoHour: parseInt0(e[1]),
    isoMinute: parseInt0(e[2]),
    isoSecond: 60 === n ? 59 : n
  };
}

function organizeAnnotationParts(e) {
  let n, t;
  const o = [];
  if (e.replace(Ra, ((e, r, i) => {
    const a = Boolean(r), [s, c] = i.split("=").reverse();
    if (c) {
      if ("u-ca" === c) {
        o.push(s), n || (n = a);
      } else if (a || /[A-Z]/.test(c)) {
        throw new RangeError(invalidSubstring(e));
      }
    } else {
      if (t) {
        throw new RangeError(invalidSubstring(e));
      }
      t = s;
    }
    return "";
  })), o.length > 1 && n) {
    throw new RangeError(invalidSubstring(e));
  }
  return {
    timeZone: t,
    calendar: o[0] || X
  };
}

function parseSubsecNano(e) {
  return parseInt(e.padEnd(9, "0"));
}

function createRegExp(e) {
  return new RegExp(`^${e}$`, "i");
}

function parseSign(e) {
  return e && "+" !== e ? -1 : 1;
}

function parseInt0(e) {
  return void 0 === e ? 0 : parseInt(e);
}

function Me(e) {
  return ye(m(e));
}

function ye(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? Fe(n) : n ? (e => {
    if (Ua.test(e)) {
      throw new RangeError(br);
    }
    return e.toLowerCase().split("/").map(((e, n) => (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e) ? e.toUpperCase() : e.replace(/baja|dumont|[a-z]+/g, ((e, t) => e.length <= 2 && !n || "in" === e || "chat" === e ? e.toUpperCase() : e.length > 2 || !t ? internal_capitalize(e).replace(/island|noronha|murdo|rivadavia|urville/, internal_capitalize) : e)))).join("/");
  })(e) : Ta;
}

function getTimeZoneAtomic(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? n : n ? n.resolvedOptions().timeZone : Ta;
}

function getTimeZoneEssence(e) {
  const n = parseOffsetNanoMaybe(e = e.toUpperCase(), 1);
  return void 0 !== n ? n : e !== Ta ? qa(e) : void 0;
}

function Ze(e, n) {
  return te(e.epochNanoseconds, n.epochNanoseconds);
}

function yn(e, n) {
  return te(e.epochNanoseconds, n.epochNanoseconds);
}

function $t(e, n, t, o, r, i) {
  const a = e(normalizeOptions(i).relativeTo), s = Math.max(getMaxDurationUnit(o), getMaxDurationUnit(r));
  if (allPropsEqual(F, o, r)) {
    return 0;
  }
  if (isUniformUnit(s, a)) {
    return te(durationFieldsToBigNano(o), durationFieldsToBigNano(r));
  }
  if (!a) {
    throw new RangeError(zr);
  }
  const [c, u, l] = createMarkerSystem(n, t, a), f = createMarkerToEpochNano(l), d = createMoveMarker(l);
  return te(f(d(u, c, o)), f(d(u, c, r)));
}

function gt(e, n) {
  return rt(e, n) || He(e, n);
}

function rt(e, n) {
  return compareNumbers(isoToEpochMilli(e), isoToEpochMilli(n));
}

function He(e, n) {
  return compareNumbers(isoTimeFieldsToNano(e), isoTimeFieldsToNano(n));
}

function ue(e, n) {
  return !Ze(e, n);
}

function gn(e, n) {
  return !yn(e, n) && !!je(e.timeZone, n.timeZone) && isIdLikeEqual(e.calendar, n.calendar);
}

function ft(e, n) {
  return !gt(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function It(e, n) {
  return !rt(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function $e(e, n) {
  return !rt(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function x(e, n) {
  return !rt(e, n) && isIdLikeEqual(e.calendar, n.calendar);
}

function Ve(e, n) {
  return !He(e, n);
}

function je(e, n) {
  if (e === n) {
    return 1;
  }
  const t = I(e), o = I(n);
  if (t === o) {
    return 1;
  }
  try {
    return getTimeZoneAtomic(t) === getTimeZoneAtomic(o);
  } catch (e) {}
}

function le(e, n, t, o) {
  const r = refineDiffOptions(e, U(o), 3, 5), i = diffEpochNanos(n.epochNanoseconds, t.epochNanoseconds, ...r);
  return Vt(e ? negateDurationFields(i) : i);
}

function Dn(e, n, t, o, r, i) {
  const a = getCommonCalendarSlot(o.calendar, r.calendar), s = U(i), [c, u, l, f] = refineDiffOptions(t, s, 5), d = o.epochNanoseconds, m = r.epochNanoseconds, p = te(m, d);
  let h;
  if (p) {
    if (c < 6) {
      h = diffEpochNanos(d, m, c, u, l, f);
    } else {
      const t = n(((e, n) => {
        if (!je(e, n)) {
          throw new RangeError(Fr);
        }
        return e;
      })(o.timeZone, r.timeZone)), i = e(a);
      h = diffZonedEpochsBig(i, t, o, r, p, c, s), h = roundRelativeDuration(h, m, c, u, l, f, i, o, extractEpochNano, E(moveZonedEpochs, t));
    }
  } else {
    h = Si;
  }
  return Vt(t ? negateDurationFields(h) : h);
}

function ut(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = U(r), [s, c, u, l] = refineDiffOptions(n, a, 6), f = isoToEpochNano(t), d = isoToEpochNano(o), m = te(d, f);
  let p;
  if (m) {
    if (s <= 6) {
      p = diffEpochNanos(f, d, s, c, u, l);
    } else {
      const n = e(i);
      p = diffDateTimesBig(n, t, o, m, s, a), p = roundRelativeDuration(p, d, s, c, u, l, n, t, isoToEpochNano, moveDateTime);
    }
  } else {
    p = Si;
  }
  return Vt(n ? negateDurationFields(p) : p);
}

function Ft(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = U(r);
  return diffDateLike(n, (() => e(i)), t, o, ...refineDiffOptions(n, a, 6, 9, 6), a);
}

function Xe(e, n, t, o, r) {
  const i = getCommonCalendarSlot(t.calendar, o.calendar), a = U(r), s = refineDiffOptions(n, a, 9, 9, 8), c = e(i);
  return diffDateLike(n, (() => c), moveToDayOfMonthUnsafe(c, t), moveToDayOfMonthUnsafe(c, o), ...s, a);
}

function diffDateLike(e, n, t, o, r, i, a, s, c) {
  const u = isoToEpochNano(t), l = isoToEpochNano(o);
  let f;
  if (te(l, u)) {
    if (6 === r) {
      f = diffEpochNanos(u, l, r, i, a, s);
    } else {
      const e = n();
      f = e.dateUntil(t, o, r, c), 6 === i && 1 === a || (f = roundRelativeDuration(f, l, r, i, a, s, e, t, isoToEpochNano, moveDate));
    }
  } else {
    f = Si;
  }
  return Vt(e ? negateDurationFields(f) : f);
}

function Ae(e, n, t, o) {
  const r = U(o), [i, a, s, c] = refineDiffOptions(e, r, 5, 5), u = roundByInc(diffTimes(n, t), computeNanoInc(a, s), c), l = {
    ...Si,
    ...nanoToDurationTimeFields(u, i)
  };
  return Vt(e ? negateDurationFields(l) : l);
}

function diffZonedEpochsExact(e, n, t, o, r, i) {
  const a = te(o.epochNanoseconds, t.epochNanoseconds);
  return a ? r < 6 ? diffEpochNanosExact(t.epochNanoseconds, o.epochNanoseconds, r) : diffZonedEpochsBig(n, e, t, o, a, r, i) : Si;
}

function diffDateTimesExact(e, n, t, o, r) {
  const i = isoToEpochNano(n), a = isoToEpochNano(t), s = te(a, i);
  return s ? o <= 6 ? diffEpochNanosExact(i, a, o) : diffDateTimesBig(e, n, t, s, o, r) : Si;
}

function diffZonedEpochsBig(e, n, t, o, r, i, a) {
  const [s, c, u] = ((e, n, t, o) => {
    function updateMid() {
      return l = {
        ...moveByDays(a, c++ * -o),
        ...i
      }, f = we(e, l), te(s, f) === -o;
    }
    const r = fn(n, e), i = Vn(j, r), a = fn(t, e), s = t.epochNanoseconds;
    let c = 0;
    const u = diffTimes(r, a);
    let l, f;
    if (Math.sign(u) === -o && c++, updateMid() && (-1 === o || updateMid())) {
      throw new RangeError(vr);
    }
    const d = oe(re(f, s));
    return [ r, l, d ];
  })(n, t, o, r);
  var l, f;
  return {
    ...6 === i ? (l = s, f = c, {
      ...Si,
      days: diffDays(l, f)
    }) : e.dateUntil(s, c, i, a),
    ...nanoToDurationTimeFields(u)
  };
}

function diffDateTimesBig(e, n, t, o, r, i) {
  const [a, s, c] = ((e, n, t) => {
    let o = n, r = diffTimes(e, n);
    return Math.sign(r) === -t && (o = moveByDays(n, -t), r += Qr * t), [ e, o, r ];
  })(n, t, o);
  return {
    ...e.dateUntil(a, s, r, i),
    ...nanoToDurationTimeFields(c)
  };
}

function diffEpochNanos(e, n, t, o, r, i) {
  return {
    ...Si,
    ...nanoToDurationDayTimeFields(roundBigNano(re(e, n), o, r, i), t)
  };
}

function diffEpochNanosExact(e, n, t) {
  return {
    ...Si,
    ...nanoToDurationDayTimeFields(re(e, n), t)
  };
}

function diffDays(e, n) {
  return diffEpochMilliByDay(isoToEpochMilli(e), isoToEpochMilli(n));
}

function diffEpochMilliByDay(e, n) {
  return Math.trunc((n - e) / Gr);
}

function diffTimes(e, n) {
  return isoTimeFieldsToNano(n) - isoTimeFieldsToNano(e);
}

function getCommonCalendarSlot(e, n) {
  if (!isIdLikeEqual(e, n)) {
    throw new RangeError(Er);
  }
  return e;
}

function createIntlCalendar(e) {
  function epochMilliToIntlFields(e) {
    return ((e, n) => ({
      ...parseIntlYear(e, n),
      F: e.month,
      day: parseInt(e.day)
    }))(hashIntlFormatParts(n, e), t);
  }
  const n = La(e), t = computeCalendarIdBase(e);
  return {
    id: e,
    O: createIntlFieldCache(epochMilliToIntlFields),
    B: createIntlYearDataCache(epochMilliToIntlFields)
  };
}

function createIntlFieldCache(e) {
  return Jn((n => {
    const t = isoToEpochMilli(n);
    return e(t);
  }), WeakMap);
}

function createIntlYearDataCache(e) {
  const n = e(0).year - Wi;
  return Jn((t => {
    let o, r = isoArgsToEpochMilli(t - n);
    const i = [], a = [];
    do {
      r += 400 * Gr;
    } while ((o = e(r)).year <= t);
    do {
      r += (1 - o.day) * Gr, o.year === t && (i.push(r), a.push(o.F)), r -= Gr;
    } while ((o = e(r)).year >= t);
    return {
      k: i.reverse(),
      C: Wr(a.reverse())
    };
  }));
}

function parseIntlYear(e, n) {
  let t, o, r = parseIntlPartsYear(e);
  if (e.era) {
    const i = Di[n];
    void 0 !== i && (t = "islamic" === n ? "ah" : e.era.normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    "bc" === t || "b" === t ? t = "bce" : "ad" !== t && "a" !== t || (t = "ce"), o = r, 
    r = eraYearToYear(o, i[t] || 0));
  }
  return {
    era: t,
    eraYear: o,
    year: r
  };
}

function parseIntlPartsYear(e) {
  return parseInt(e.relatedYear || e.year);
}

function computeIntlDateParts(e) {
  const {year: n, F: t, day: o} = this.O(e), {C: r} = this.B(n);
  return [ n, r[t] + 1, o ];
}

function computeIntlEpochMilli(e, n = 1, t = 1) {
  return this.B(e).k[n - 1] + (t - 1) * Gr;
}

function computeIntlLeapMonth(e) {
  const n = queryMonthStrings(this, e), t = queryMonthStrings(this, e - 1), o = n.length;
  if (o > t.length) {
    const e = getCalendarLeapMonthMeta(this);
    if (e < 0) {
      return -e;
    }
    for (let e = 0; e < o; e++) {
      if (n[e] !== t[e]) {
        return e + 1;
      }
    }
  }
}

function computeIntlDaysInYear(e) {
  return diffEpochMilliByDay(computeIntlEpochMilli.call(this, e), computeIntlEpochMilli.call(this, e + 1));
}

function computeIntlDaysInMonth(e, n) {
  const {k: t} = this.B(e);
  let o = n + 1, r = t;
  return o > t.length && (o = 1, r = this.B(e + 1).k), diffEpochMilliByDay(t[n - 1], r[o - 1]);
}

function computeIntlMonthsInYear(e) {
  return this.B(e).k.length;
}

function queryMonthStrings(e, n) {
  return Object.keys(e.B(n).C);
}

function rn(e) {
  return an(m(e));
}

function an(e) {
  if ((e = e.toLowerCase()) !== X && e !== gi && computeCalendarIdBase(e) !== computeCalendarIdBase(La(e).resolvedOptions().calendar)) {
    throw new RangeError(invalidCalendar(e));
  }
  return e;
}

function computeCalendarIdBase(e) {
  return "islamicc" === e && (e = "islamic"), e.split("-")[0];
}

function computeNativeWeekOfYear(e) {
  return this.R(e)[0];
}

function computeNativeYearOfWeek(e) {
  return this.R(e)[1];
}

function computeNativeDayOfYear(e) {
  const [n] = this.h(e);
  return diffEpochMilliByDay(this.q(n), isoToEpochMilli(e)) + 1;
}

function parseMonthCode(e) {
  const n = Wa.exec(e);
  if (!n) {
    throw new RangeError(invalidMonthCode(e));
  }
  return [ parseInt(n[1]), Boolean(n[2]) ];
}

function monthCodeNumberToMonth(e, n, t) {
  return e + (n || t && e >= t ? 1 : 0);
}

function monthToMonthCodeNumber(e, n) {
  return e - (n && e >= n ? 1 : 0);
}

function eraYearToYear(e, n) {
  return (n + e) * (Math.sign(n) || 1) || 0;
}

function getCalendarEraOrigins(e) {
  return Di[getCalendarIdBase(e)];
}

function getCalendarLeapMonthMeta(e) {
  return Ii[getCalendarIdBase(e)];
}

function getCalendarIdBase(e) {
  return computeCalendarIdBase(e.id || X);
}

function Qt(e, n, t, o) {
  const r = refineCalendarFields(t, o, en, [], ri);
  if (void 0 !== r.timeZone) {
    const o = t.dateFromFields(r), i = refineTimeBag(r), a = e(r.timeZone);
    return {
      epochNanoseconds: getMatchingInstantFor(n(a), {
        ...o,
        ...i
      }, void 0 !== r.offset ? parseOffsetNano(r.offset) : void 0),
      timeZone: a
    };
  }
  return {
    ...t.dateFromFields(r),
    ...Dt
  };
}

function jn(e, n, t, o, r, i) {
  const a = refineCalendarFields(t, r, en, ti, ri), s = e(a.timeZone), [c, u, l] = wn(i), f = t.dateFromFields(a, overrideOverflowOptions(i, c)), d = refineTimeBag(a, c);
  return Yn(getMatchingInstantFor(n(s), {
    ...f,
    ...d
  }, void 0 !== a.offset ? parseOffsetNano(a.offset) : void 0, u, l), s, o);
}

function Pt(e, n, t) {
  const o = refineCalendarFields(e, n, en, [], w), r = H(t);
  return ee(checkIsoDateTimeInBounds({
    ...e.dateFromFields(o, overrideOverflowOptions(t, r)),
    ...refineTimeBag(o, r)
  }));
}

function Yt(e, n, t, o = []) {
  const r = refineCalendarFields(e, n, en, o);
  return e.dateFromFields(r, t);
}

function nt(e, n, t, o) {
  const r = refineCalendarFields(e, n, fi, o);
  return e.yearMonthFromFields(r, t);
}

function K(e, n, t, o, r = []) {
  const i = refineCalendarFields(e, t, en, r);
  return n && void 0 !== i.month && void 0 === i.monthCode && void 0 === i.year && (i.year = ji), 
  e.monthDayFromFields(i, o);
}

function Ue(e, n) {
  const t = H(n);
  return Ge(refineTimeBag(refineFields(e, ei, [], 1), t));
}

function Ht(e) {
  const n = refineFields(e, Ni);
  return Vt(checkDurationUnits({
    ...Si,
    ...n
  }));
}

function refineCalendarFields(e, n, t, o = [], r = []) {
  return refineFields(n, [ ...e.fields(t), ...r ].sort(), o);
}

function refineFields(e, n, t, o = !t) {
  const r = {};
  let i, a = 0;
  for (const o of n) {
    if (o === i) {
      throw new RangeError(duplicateFields(o));
    }
    if ("constructor" === o || "__proto__" === o) {
      throw new RangeError(tn(o));
    }
    let n = e[o];
    if (void 0 !== n) {
      a = 1, Ga[o] && (n = Ga[o](n, o)), r[o] = n;
    } else if (t) {
      if (t.includes(o)) {
        throw new TypeError(missingField(o));
      }
      r[o] = hi[o];
    }
    i = o;
  }
  if (o && !a) {
    throw new TypeError(noValidFields(n));
  }
  return r;
}

function refineTimeBag(e, n) {
  return constrainIsoTimeFields(Ha({
    ...hi,
    ...e
  }), n);
}

function Sn(e, n, t, o, r, i) {
  const a = U(i), {calendar: s, timeZone: c} = t;
  return Yn(((e, n, t, o, r) => {
    const i = mergeCalendarFields(e, t, o, en, oi, ni), [a, s, c] = wn(r, 2);
    return getMatchingInstantFor(n, {
      ...e.dateFromFields(i, overrideOverflowOptions(r, a)),
      ...refineTimeBag(i, a)
    }, parseOffsetNano(i.offset), s, c);
  })(e(s), n(c), o, r, a), c, s);
}

function at(e, n, t, o, r) {
  const i = U(r);
  return ee(((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, en, w), i = H(o);
    return checkIsoDateTimeInBounds({
      ...e.dateFromFields(r, overrideOverflowOptions(o, i)),
      ...refineTimeBag(r, i)
    });
  })(e(n.calendar), t, o, i));
}

function Zt(e, n, t, o, r) {
  const i = U(r);
  return ((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, en);
    return e.dateFromFields(r, o);
  })(e(n.calendar), t, o, i);
}

function Ke(e, n, t, o, r) {
  const i = U(r);
  return createPlainYearMonthSlots(((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, fi);
    return e.yearMonthFromFields(r, o);
  })(e(n.calendar), t, o, i));
}

function k(e, n, t, o, r) {
  const i = U(r);
  return ((e, n, t, o) => {
    const r = mergeCalendarFields(e, n, t, en);
    return e.monthDayFromFields(r, o);
  })(e(n.calendar), t, o, i);
}

function Be(e, n, t) {
  return Ge(((e, n, t) => {
    const o = H(t);
    return refineTimeBag({
      ...Vn(ei, e),
      ...refineFields(n, ei)
    }, o);
  })(e, n, t));
}

function kt(e, n) {
  return Vt((t = e, o = n, checkDurationUnits({
    ...t,
    ...refineFields(o, Ni)
  })));
  var t, o;
}

function mergeCalendarFields(e, n, t, o, r = [], i = []) {
  const a = [ ...e.fields(o), ...r ].sort();
  let s = refineFields(n, a, i);
  const c = refineFields(t, a);
  return s = e.mergeFields(s, c), refineFields(s, a, []);
}

function convertToPlainMonthDay(e, n) {
  const t = refineCalendarFields(e, n, pi);
  return e.monthDayFromFields(t);
}

function convertToPlainYearMonth(e, n, t) {
  const o = refineCalendarFields(e, n, di);
  return e.yearMonthFromFields(o, t);
}

function convertToIso(e, n, t, o, r) {
  n = Vn(t = e.fields(t), n), o = refineFields(o, r = e.fields(r), []);
  let i = e.mergeFields(n, o);
  return i = refineFields(i, [ ...t, ...r ].sort(), []), e.dateFromFields(i);
}

function refineYear(e, n) {
  let {era: t, eraYear: o, year: r} = n;
  const i = getCalendarEraOrigins(e);
  if (void 0 !== t || void 0 !== o) {
    if (void 0 === t || void 0 === o) {
      throw new TypeError(Dr);
    }
    if (!i) {
      throw new RangeError(gr);
    }
    const e = i[t];
    if (void 0 === e) {
      throw new RangeError(invalidEra(t));
    }
    const n = eraYearToYear(o, e);
    if (void 0 !== r && r !== n) {
      throw new RangeError(Ir);
    }
    r = n;
  } else if (void 0 === r) {
    throw new TypeError(missingYear(i));
  }
  return r;
}

function refineMonth(e, n, t, o) {
  let {month: r, monthCode: i} = n;
  if (void 0 !== i) {
    const n = ((e, n, t, o) => {
      const r = e.U(t), [i, a] = parseMonthCode(n);
      let s = monthCodeNumberToMonth(i, a, r);
      if (a) {
        const n = getCalendarLeapMonthMeta(e);
        if (void 0 === n) {
          throw new RangeError(Pr);
        }
        if (n > 0) {
          if (s > n) {
            throw new RangeError(Pr);
          }
          if (void 0 === r) {
            if (1 === o) {
              throw new RangeError(Pr);
            }
            s--;
          }
        } else {
          if (s !== -n) {
            throw new RangeError(Pr);
          }
          if (void 0 === r && 1 === o) {
            throw new RangeError(Pr);
          }
        }
      }
      return s;
    })(e, i, t, o);
    if (void 0 !== r && r !== n) {
      throw new RangeError(Mr);
    }
    r = n, o = 1;
  } else if (void 0 === r) {
    throw new TypeError(Nr);
  }
  return clampEntity("month", r, 1, e.L(t), o);
}

function refineDay(e, n, t, o, r) {
  return clampProp(n, "day", 1, e.j(o, t), r);
}

function spliceFields(e, n, t, o) {
  let r = 0;
  const i = [];
  for (const e of t) {
    void 0 !== n[e] ? r = 1 : i.push(e);
  }
  if (Object.assign(e, n), r) {
    for (const n of o || i) {
      delete e[n];
    }
  }
}

function Se(e) {
  return internal_(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function vn(e, n, t, o, r = X) {
  return Yn(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(t))), n(o), e(r));
}

function pt(e, n, t, o, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0, l = X) {
  return ee(checkIsoDateTimeInBounds(checkIsoDateTimeFields(T(toInteger, zipProps(wi, [ n, t, o, r, i, a, s, c, u ])))), e(l));
}

function Nt(e, n, t, o, r = X) {
  return v(checkIsoDateInBounds(checkIsoDateFields(T(toInteger, {
    isoYear: n,
    isoMonth: t,
    isoDay: o
  }))), e(r));
}

function tt(e, n, t, o = X, r = 1) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainYearMonthSlots(checkIsoYearMonthInBounds(checkIsoDateFields({
    isoYear: i,
    isoMonth: a,
    isoDay: toInteger(r)
  })), s);
}

function G(e, n, t, o = X, r = ji) {
  const i = toInteger(n), a = toInteger(t), s = e(o);
  return createPlainMonthDaySlots(checkIsoDateInBounds(checkIsoDateFields({
    isoYear: toInteger(r),
    isoMonth: i,
    isoDay: a
  })), s);
}

function ke(e = 0, n = 0, t = 0, o = 0, r = 0, i = 0) {
  return Ge(constrainIsoTimeFields(T(toInteger, zipProps(j, [ e, n, t, o, r, i ])), 1));
}

function Lt(e = 0, n = 0, t = 0, o = 0, r = 0, i = 0, a = 0, s = 0, c = 0, u = 0) {
  return Vt(checkDurationUnits(T(toStrictInteger, zipProps(F, [ e, n, t, o, r, i, a, s, c, u ]))));
}

function fe(e, n, t = X) {
  return Yn(e.epochNanoseconds, n, t);
}

function Zn(e) {
  return internal_(e.epochNanoseconds);
}

function ht(e, n) {
  return ee(fn(n, e));
}

function Bt(e, n) {
  return v(fn(n, e));
}

function bn(e, n, t) {
  return convertToPlainYearMonth(e(n.calendar), t);
}

function Fn(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function Re(e, n) {
  return Ge(fn(n, e));
}

function mt(e, n, t, o) {
  const r = ((e, n, t, o) => {
    const r = ve(o);
    return we(e(n), t, r);
  })(e, t, n, o);
  return Yn(checkEpochNanoInBounds(r), t, n.calendar);
}

function St(e, n, t) {
  const o = e(n.calendar);
  return createPlainYearMonthSlots({
    ...n,
    ...convertToPlainYearMonth(o, t)
  });
}

function Ot(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function vt(e, n, t, o, r) {
  const i = e(r.timeZone), a = r.plainTime, s = void 0 !== a ? n(a) : Dt;
  return Yn(we(t(i), {
    ...o,
    ...s
  }), i, o.calendar);
}

function wt(e, n = Dt) {
  return ee(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function jt(e, n, t) {
  return convertToPlainYearMonth(e(n.calendar), t);
}

function Mt(e, n, t) {
  return convertToPlainMonthDay(e(n.calendar), t);
}

function _e(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, di, de(t), li))(e(n.calendar), t, o);
}

function R(e, n, t, o) {
  return ((e, n, t) => convertToIso(e, n, pi, de(t), si))(e(n.calendar), t, o);
}

function Je(e, n, t, o, r) {
  const i = de(r), a = n(i.plainDate), s = e(i.timeZone);
  return Yn(we(t(s), {
    ...a,
    ...o
  }), s, a.calendar);
}

function Le(e, n) {
  return ee(checkIsoDateTimeInBounds({
    ...e,
    ...n
  }));
}

function De(e) {
  return internal_(checkEpochNanoInBounds(internal_he(e, _r)));
}

function Pe(e) {
  return internal_(checkEpochNanoInBounds(internal_he(e, internal_be)));
}

function Ce(e) {
  return internal_(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e), Vr)));
}

function ge(e) {
  return internal_(checkEpochNanoInBounds(bigIntToBigNano(toBigInt(e))));
}

function pn(e, n, t = Dt) {
  const o = n.timeZone, r = e(o), i = {
    ...fn(n, r),
    ...t
  };
  return Yn(getMatchingInstantFor(r, i, i.offsetNanoseconds, 2), o, n.calendar);
}

function Tn(e, n, t) {
  const o = n.timeZone, r = e(o), i = {
    ...fn(n, r),
    ...t
  }, a = getPreferredCalendarSlot(n.calendar, t.calendar);
  return Yn(getMatchingInstantFor(r, i, i.offsetNanoseconds, 2), o, a);
}

function lt(e, n = Dt) {
  return ee({
    ...e,
    ...n
  });
}

function st(e, n) {
  return ee({
    ...e,
    ...n
  }, getPreferredCalendarSlot(e.calendar, n.calendar));
}

function it(e, n) {
  return {
    ...e,
    calendar: n
  };
}

function On(e, n) {
  return {
    ...e,
    timeZone: n
  };
}

function getPreferredCalendarSlot(e, n) {
  if (e === n) {
    return e;
  }
  const t = I(e), o = I(n);
  if (t === o || t === X) {
    return n;
  }
  if (o === X) {
    return e;
  }
  throw new RangeError(Er);
}

function createNativeOpsCreator(e, n) {
  return t => t === X ? e : t === gi || t === Ti ? Object.assign(Object.create(e), {
    id: t
  }) : Object.assign(Object.create(n), Aa(t));
}

function createOptionsTransformer(e, n, t) {
  const o = new Set(t);
  return r => (((e, n) => {
    for (const t of n) {
      if (t in e) {
        return 1;
      }
    }
    return 0;
  })(r = V(o, r), e) || Object.assign(r, n), t && (r.timeZone = Ta, [ "full", "long" ].includes(r.timeStyle) && (r.timeStyle = "medium")), 
  r);
}

function e(e, n = qn) {
  const [t, , , o] = e;
  return (r, i = Ns, ...a) => {
    const s = n(o && o(...a), r, i, t), c = s.resolvedOptions();
    return [ s, ...toEpochMillis(e, c, a) ];
  };
}

function qn(e, n, t, o) {
  if (t = o(t), e) {
    if (void 0 !== t.timeZone) {
      throw new TypeError(Lr);
    }
    t.timeZone = e;
  }
  return new En(n, t);
}

function toEpochMillis(e, n, t) {
  const [, o, r] = e;
  return t.map((e => (e.calendar && ((e, n, t) => {
    if ((t || e !== X) && e !== n) {
      throw new RangeError(Er);
    }
  })(I(e.calendar), n.calendar, r), o(e, n))));
}

function An(e) {
  const n = Bn();
  return Ie(n, e.getOffsetNanosecondsFor(n));
}

function Bn() {
  return internal_he(Date.now(), internal_be);
}

function Nn() {
  return ys || (ys = (new En).resolvedOptions().timeZone);
}

const expectedInteger = (e, n) => `Non-integer ${e}: ${n}`, expectedPositive = (e, n) => `Non-positive ${e}: ${n}`, expectedFinite = (e, n) => `Non-finite ${e}: ${n}`, forbiddenBigIntToNumber = e => `Cannot convert bigint to ${e}`, invalidBigInt = e => `Invalid bigint: ${e}`, pr = "Cannot convert Symbol to string", hr = "Invalid object", numberOutOfRange = (e, n, t, o, r) => r ? numberOutOfRange(e, r[n], r[t], r[o]) : invalidEntity(e, n) + `; must be between ${t}-${o}`, invalidEntity = (e, n) => `Invalid ${e}: ${n}`, missingField = e => `Missing ${e}`, tn = e => `Invalid field ${e}`, duplicateFields = e => `Duplicate field ${e}`, noValidFields = e => "No valid fields: " + e.join(), Z = "Invalid bag", invalidChoice = (e, n, t) => invalidEntity(e, n) + "; must be " + Object.keys(t).join(), A = "Cannot use valueOf", P = "Invalid calling context", gr = "Forbidden era/eraYear", Dr = "Mismatching era/eraYear", Ir = "Mismatching year/eraYear", invalidEra = e => `Invalid era: ${e}`, missingYear = e => "Missing year" + (e ? "/era/eraYear" : ""), invalidMonthCode = e => `Invalid monthCode: ${e}`, Mr = "Mismatching month/monthCode", Nr = "Missing month/monthCode", yr = "Cannot guess year", Pr = "Invalid leap month", g = "Invalid protocol", vr = "Invalid protocol results", Er = "Mismatching Calendars", invalidCalendar = e => `Invalid Calendar: ${e}`, Fr = "Mismatching TimeZones", br = "Forbidden ICU TimeZone", wr = "Out-of-bounds offset", Br = "Out-of-bounds TimeZone gap", kr = "Invalid TimeZone offset", Yr = "Ambiguous offset", Cr = "Out-of-bounds date", Zr = "Out-of-bounds duration", Rr = "Cannot mix duration signs", zr = "Missing relativeTo", qr = "Cannot use large units", Ur = "Required smallestUnit or largestUnit", Ar = "smallestUnit > largestUnit", failedParse = e => `Cannot parse: ${e}`, invalidSubstring = e => `Invalid substring: ${e}`, Ln = e => `Cannot format ${e}`, kn = "Mismatching types for formatting", Lr = "Cannot specify TimeZone", Wr = /*@__PURE__*/ E(b, ((e, n) => n)), jr = /*@__PURE__*/ E(b, ((e, n, t) => t)), xr = /*@__PURE__*/ E(padNumber, 2), $r = {
  nanosecond: 0,
  microsecond: 1,
  millisecond: 2,
  second: 3,
  minute: 4,
  hour: 5,
  day: 6,
  week: 7,
  month: 8,
  year: 9
}, Et = /*@__PURE__*/ Object.keys($r), Gr = 864e5, Hr = 1e3, Vr = 1e3, internal_be = 1e6, _r = 1e9, Jr = 6e10, Kr = 36e11, Qr = 864e11, Xr = [ 1, Vr, internal_be, _r, Jr, Kr, Qr ], w = /*@__PURE__*/ Et.slice(0, 6), ei = /*@__PURE__*/ sortStrings(w), ni = [ "offset" ], ti = [ "timeZone" ], oi = /*@__PURE__*/ w.concat(ni), ri = /*@__PURE__*/ oi.concat(ti), ii = [ "era", "eraYear" ], ai = /*@__PURE__*/ ii.concat([ "year" ]), si = [ "year" ], ci = [ "monthCode" ], ui = /*@__PURE__*/ [ "month" ].concat(ci), li = [ "day" ], fi = /*@__PURE__*/ ui.concat(si), di = /*@__PURE__*/ ci.concat(si), en = /*@__PURE__*/ li.concat(fi), mi = /*@__PURE__*/ li.concat(ui), pi = /*@__PURE__*/ li.concat(ci), hi = /*@__PURE__*/ jr(w, 0), X = "iso8601", gi = "gregory", Ti = "japanese", Di = {
  [gi]: {
    bce: -1,
    ce: 0
  },
  [Ti]: {
    bce: -1,
    ce: 0,
    meiji: 1867,
    taisho: 1911,
    showa: 1925,
    heisei: 1988,
    reiwa: 2018
  },
  ethioaa: {
    era0: 0
  },
  ethiopic: {
    era0: 0,
    era1: 5500
  },
  coptic: {
    era0: -1,
    era1: 0
  },
  roc: {
    beforeroc: -1,
    minguo: 0
  },
  buddhist: {
    be: 0
  },
  islamic: {
    ah: 0
  },
  indian: {
    saka: 0
  },
  persian: {
    ap: 0
  }
}, Ii = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, m = /*@__PURE__*/ E(requireType, "string"), f = /*@__PURE__*/ E(requireType, "boolean"), Mi = /*@__PURE__*/ E(requireType, "number"), $ = /*@__PURE__*/ E(requireType, "function"), F = /*@__PURE__*/ Et.map((e => e + "s")), Ni = /*@__PURE__*/ sortStrings(F), yi = /*@__PURE__*/ F.slice(0, 6), Pi = /*@__PURE__*/ F.slice(6), vi = /*@__PURE__*/ Pi.slice(1), Ei = /*@__PURE__*/ Wr(F), Si = /*@__PURE__*/ jr(F, 0), Fi = /*@__PURE__*/ jr(yi, 0), bi = /*@__PURE__*/ E(zeroOutProps, F), j = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], Oi = [ "isoDay", "isoMonth", "isoYear" ], wi = /*@__PURE__*/ j.concat(Oi), Bi = /*@__PURE__*/ sortStrings(Oi), ki = /*@__PURE__*/ sortStrings(j), Yi = /*@__PURE__*/ sortStrings(wi), Dt = /*@__PURE__*/ jr(ki, 0), Ci = /*@__PURE__*/ E(zeroOutProps, wi), En = Intl.DateTimeFormat, Zi = "en-GB", Ri = 1e8, zi = Ri * Gr, qi = [ Ri, 0 ], Ui = [ -Ri, 0 ], Ai = 275760, Li = -271821, Wi = 1970, ji = 1972, xi = 12, $i = /*@__PURE__*/ isoArgsToEpochMilli(1868, 9, 8), Gi = /*@__PURE__*/ Jn(computeJapaneseEraParts, WeakMap), Hi = "smallestUnit", Vi = "unit", _i = "roundingIncrement", Ji = "fractionalSecondDigits", Ki = "relativeTo", Qi = {
  constrain: 0,
  reject: 1
}, Xi = /*@__PURE__*/ Object.keys(Qi), ea = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}, na = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}, ta = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}, oa = {
  auto: 0,
  never: 1,
  critical: 2
}, ra = {
  auto: 0,
  never: 1
}, ia = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}, aa = /*@__PURE__*/ E(refineUnitOption, Hi), sa = /*@__PURE__*/ E(refineUnitOption, "largestUnit"), ca = /*@__PURE__*/ E(refineUnitOption, Vi), ua = /*@__PURE__*/ E(refineChoiceOption, "overflow", Qi), la = /*@__PURE__*/ E(refineChoiceOption, "disambiguation", ea), fa = /*@__PURE__*/ E(refineChoiceOption, "offset", na), da = /*@__PURE__*/ E(refineChoiceOption, "calendarName", ta), ma = /*@__PURE__*/ E(refineChoiceOption, "timeZoneName", oa), pa = /*@__PURE__*/ E(refineChoiceOption, "offset", ra), ha = /*@__PURE__*/ E(refineChoiceOption, "roundingMode", ia), L = "PlainYearMonth", q = "PlainMonthDay", J = "PlainDate", We = "PlainDateTime", xe = "PlainTime", Te = "ZonedDateTime", Oe = "Instant", qt = "Duration", ga = [ Math.floor, e => hasHalf(e) ? Math.floor(e) : Math.round(e), Math.ceil, e => hasHalf(e) ? Math.ceil(e) : Math.round(e), Math.trunc, e => hasHalf(e) ? Math.trunc(e) || 0 : Math.round(e), e => e < 0 ? Math.floor(e) : Math.ceil(e), e => Math.sign(e) * Math.round(Math.abs(e)) || 0, e => hasHalf(e) ? (e = Math.trunc(e) || 0) + e % 2 : Math.round(e) ], Ta = "UTC", Da = 5184e3, Ia = /*@__PURE__*/ isoArgsToEpochSec(1847), Ma = /*@__PURE__*/ isoArgsToEpochSec(/*@__PURE__*/ (/*@__PURE__*/ new Date).getUTCFullYear() + 10), Na = /0+$/, fn = /*@__PURE__*/ Jn(_zonedEpochSlotsToIso, WeakMap), ya = 2 ** 32 - 1, ie = /*@__PURE__*/ Jn((e => {
  const n = getTimeZoneEssence(e);
  return "object" == typeof n ? new IntlTimeZone(n) : new FixedTimeZone(n || 0);
}));

class FixedTimeZone {
  constructor(e) {
    this.v = e;
  }
  getOffsetNanosecondsFor() {
    return this.v;
  }
  getPossibleInstantsFor(e) {
    return [ isoToEpochNanoWithOffset(e, this.v) ];
  }
  l() {}
}

class IntlTimeZone {
  constructor(e) {
    this.$ = (e => {
      function getOffsetSec(e) {
        const i = clampNumber(e, o, r), [a, s] = computePeriod(i), c = n(a), u = n(s);
        return c === u ? c : pinch(t(a, s), c, u, e);
      }
      function pinch(n, t, o, r) {
        let i, a;
        for (;(void 0 === r || void 0 === (i = r < n[0] ? t : r >= n[1] ? o : void 0)) && (a = n[1] - n[0]); ) {
          const t = n[0] + Math.floor(a / 2);
          e(t) === o ? n[1] = t : n[0] = t + 1;
        }
        return i;
      }
      const n = Jn(e), t = Jn(createSplitTuple);
      let o = Ia, r = Ma;
      return {
        G(e) {
          const n = getOffsetSec(e - 86400), t = getOffsetSec(e + 86400), o = e - n, r = e - t;
          if (n === t) {
            return [ o ];
          }
          const i = getOffsetSec(o);
          return i === getOffsetSec(r) ? [ e - i ] : n > t ? [ o, r ] : [];
        },
        V: getOffsetSec,
        l(e, i) {
          const a = clampNumber(e, o, r);
          let [s, c] = computePeriod(a);
          const u = Da * i, l = i < 0 ? () => c > o || (o = a, 0) : () => s < r || (r = a, 
          0);
          for (;l(); ) {
            const o = n(s), r = n(c);
            if (o !== r) {
              const n = t(s, c);
              pinch(n, o, r);
              const a = n[0];
              if ((compareNumbers(a, e) || 1) === i) {
                return a;
              }
            }
            s += u, c += u;
          }
        }
      };
    })((e => n => {
      const t = hashIntlFormatParts(e, n * Hr);
      return isoArgsToEpochSec(parseIntlPartsYear(t), parseInt(t.month), parseInt(t.day), parseInt(t.hour), parseInt(t.minute), parseInt(t.second)) - n;
    })(e));
  }
  getOffsetNanosecondsFor(e) {
    return this.$.V(epochNanoToSec(e)) * _r;
  }
  getPossibleInstantsFor(e) {
    const [n, t] = [ isoArgsToEpochSec((o = e).isoYear, o.isoMonth, o.isoDay, o.isoHour, o.isoMinute, o.isoSecond), o.isoMillisecond * internal_be + o.isoMicrosecond * Vr + o.isoNanosecond ];
    var o;
    return this.$.G(n).map((e => checkEpochNanoInBounds(moveBigNano(internal_he(e, _r), t))));
  }
  l(e, n) {
    const [t, o] = epochNanoToSecMod(e), r = this.$.l(t + (n > 0 || o ? 1 : 0), n);
    if (void 0 !== r) {
      return internal_he(r, _r);
    }
  }
}

const Pa = "([+−-])", va = "(?:[.,](\\d{1,9}))?", Ea = `(?:(?:${Pa}(\\d{6}))|(\\d{4}))-?(\\d{2})`, Sa = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + va + ")?)?", Fa = Pa + Sa, ba = Ea + "-?(\\d{2})(?:[T ]" + Sa + "(Z|" + Fa + ")?)?", Oa = "\\[(!?)([^\\]]*)\\]", wa = `((?:${Oa}){0,9})`, Ba = /*@__PURE__*/ createRegExp(Ea + wa), ka = /*@__PURE__*/ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + wa), Ya = /*@__PURE__*/ createRegExp(ba + wa), Ca = /*@__PURE__*/ createRegExp("T?" + Sa + "(?:" + Fa + ")?" + wa), Za = /*@__PURE__*/ createRegExp(Fa), Ra = /*@__PURE__*/ new RegExp(Oa, "g"), za = /*@__PURE__*/ createRegExp(`${Pa}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${va}H)?(?:(\\d+)${va}M)?(?:(\\d+)${va}S)?)?`), qa = /*@__PURE__*/ Jn((e => new En(Zi, {
  timeZone: e,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), Ua = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, Aa = /*@__PURE__*/ Jn(createIntlCalendar), La = /*@__PURE__*/ Jn((e => new En(Zi, {
  calendar: e,
  timeZone: Ta,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), Wa = /^M(\d{2})(L?)$/, ja = {
  era: toStringViaPrimitive,
  eraYear: toInteger,
  year: toInteger,
  month: toPositiveInteger,
  monthCode: toStringViaPrimitive,
  day: toPositiveInteger
}, xa = /*@__PURE__*/ jr(w, toInteger), $a = /*@__PURE__*/ jr(F, toStrictInteger), Ga = /*@__PURE__*/ Object.assign({}, ja, xa, $a, {
  offset: toStringViaPrimitive
}), Ha = /*@__PURE__*/ E(remapProps, w, j), Va = {
  dateAdd(e, n, t) {
    const o = H(t);
    let r, {years: i, months: a, weeks: s, days: c} = n;
    if (c += durationFieldsToBigNano(n, 5)[0], i || a) {
      r = ((e, n, t, o, r) => {
        let [i, a, s] = e.h(n);
        if (t) {
          const [n, o] = e.I(i, a);
          i += t, a = monthCodeNumberToMonth(n, o, e.U(i)), a = clampEntity("month", a, 1, e.L(i), r);
        }
        return o && ([i, a] = e._(i, a, o)), s = clampEntity("day", s, 1, e.j(i, a), r), 
        e.q(i, a, s);
      })(this, e, i, a, o);
    } else {
      if (!s && !c) {
        return e;
      }
      r = isoToEpochMilli(e);
    }
    return r += (7 * s + c) * Gr, checkIsoDateInBounds(epochMilliToIso(r));
  },
  dateUntil(e, n, t) {
    if (t <= 7) {
      let o = 0, r = diffDays({
        ...e,
        ...Dt
      }, {
        ...n,
        ...Dt
      });
      return 7 === t && ([o, r] = divModTrunc(r, 7)), {
        ...Si,
        weeks: o,
        days: r
      };
    }
    const o = this.h(e), r = this.h(n);
    let [i, a, s] = ((e, n, t, o, r, i, a) => {
      let s = r - n, c = i - t, u = a - o;
      if (s || c) {
        const l = Math.sign(s || c);
        let f = e.j(r, i), d = 0;
        if (Math.sign(u) === -l) {
          const o = f;
          [r, i] = e._(r, i, -l), s = r - n, c = i - t, f = e.j(r, i), d = l < 0 ? -o : f;
        }
        if (u = a - Math.min(o, f) + d, s) {
          const [o, a] = e.I(n, t), [u, f] = e.I(r, i);
          if (c = u - o || Number(f) - Number(a), Math.sign(c) === -l) {
            const t = l < 0 && -e.L(r);
            s = (r -= l) - n, c = i - monthCodeNumberToMonth(o, a, e.U(r)) + (t || e.L(r));
          }
        }
      }
      return [ s, c, u ];
    })(this, ...o, ...r);
    return 8 === t && (a += this.J(i, o[0]), i = 0), {
      ...Si,
      years: i,
      months: a,
      days: s
    };
  },
  dateFromFields(e, n) {
    const t = H(n), o = refineYear(this, e), r = refineMonth(this, e, o, t), i = refineDay(this, e, r, o, t);
    return v(checkIsoDateInBounds(this.P(o, r, i)), this.id || X);
  },
  yearMonthFromFields(e, n) {
    const t = H(n), o = refineYear(this, e), r = refineMonth(this, e, o, t);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.P(o, r, 1)), this.id || X);
  },
  monthDayFromFields(e, n) {
    const t = H(n), o = !this.id, {monthCode: r, year: i, month: a} = e;
    let s, c, u, l, f;
    if (void 0 !== r) {
      [s, c] = parseMonthCode(r), f = getDefinedProp(e, "day");
      const n = this.N(s, c, f);
      if (!n) {
        throw new RangeError(yr);
      }
      if ([u, l] = n, void 0 !== a && a !== l) {
        throw new RangeError(Mr);
      }
      o && (l = clampEntity("month", l, 1, xi, 1), f = clampEntity("day", f, 1, computeIsoDaysInMonth(void 0 !== i ? i : u, l), t));
    } else {
      u = void 0 === i && o ? ji : refineYear(this, e), l = refineMonth(this, e, u, t), 
      f = refineDay(this, e, l, u, t);
      const n = this.U(u);
      c = l === n, s = monthToMonthCodeNumber(l, n);
      const r = this.N(s, c, f);
      if (!r) {
        throw new RangeError(yr);
      }
      [u, l] = r;
    }
    return createPlainMonthDaySlots(checkIsoDateInBounds(this.P(u, l, f)), this.id || X);
  },
  fields(e) {
    return getCalendarEraOrigins(this) && e.includes("year") ? [ ...e, ...ii ] : e;
  },
  mergeFields(e, n) {
    const t = Object.assign(Object.create(null), e);
    return spliceFields(t, n, ui), getCalendarEraOrigins(this) && (spliceFields(t, n, ai), 
    this.id === Ti && spliceFields(t, n, mi, ii)), t;
  },
  inLeapYear(e) {
    const [n] = this.h(e);
    return this.K(n);
  },
  monthsInYear(e) {
    const [n] = this.h(e);
    return this.L(n);
  },
  daysInMonth(e) {
    const [n, t] = this.h(e);
    return this.j(n, t);
  },
  daysInYear(e) {
    const [n] = this.h(e);
    return this.X(n);
  },
  dayOfYear: computeNativeDayOfYear,
  era(e) {
    return this.ee(e)[0];
  },
  eraYear(e) {
    return this.ee(e)[1];
  },
  monthCode(e) {
    const [n, t] = this.h(e), [o, r] = this.I(n, t);
    return ((e, n) => "M" + xr(e) + (n ? "L" : ""))(o, r);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek() {
    return 7;
  }
}, _a = {
  dayOfYear: computeNativeDayOfYear,
  h: computeIsoDateParts,
  q: isoArgsToEpochMilli
}, Ja = /*@__PURE__*/ Object.assign({}, _a, {
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  R(e) {
    function computeWeekShift(e) {
      return (7 - e < n ? 7 : 0) - e;
    }
    function computeWeeksInYear(e) {
      const n = computeIsoDaysInYear(l + e), t = e || 1, o = computeWeekShift(modFloor(a + n * t, 7));
      return c = (n + (o - s) * t) / 7;
    }
    const n = this.id ? 1 : 4, t = computeIsoDayOfWeek(e), o = this.dayOfYear(e), r = modFloor(t - 1, 7), i = o - 1, a = modFloor(r - i, 7), s = computeWeekShift(a);
    let c, u = Math.floor((i - s) / 7) + 1, l = e.isoYear;
    return u ? u > computeWeeksInYear(0) && (u = 1, l++) : (u = computeWeeksInYear(-1), 
    l--), [ u, l, c ];
  }
}), Ka = {
  dayOfYear: computeNativeDayOfYear,
  h: computeIntlDateParts,
  q: computeIntlEpochMilli,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  R() {
    return [];
  }
}, Y = /*@__PURE__*/ createNativeOpsCreator(/*@__PURE__*/ Object.assign({}, Va, Ja, {
  h: computeIsoDateParts,
  ee(e) {
    return this.id === gi ? computeGregoryEraParts(e) : this.id === Ti ? Gi(e) : [];
  },
  I: (e, n) => [ n, 0 ],
  N(e, n) {
    if (!n) {
      return [ ji, e ];
    }
  },
  K: computeIsoInLeapYear,
  U() {},
  L: computeIsoMonthsInYear,
  J: e => e * xi,
  j: computeIsoDaysInMonth,
  X: computeIsoDaysInYear,
  P: (e, n, t) => ({
    isoYear: e,
    isoMonth: n,
    isoDay: t
  }),
  q: isoArgsToEpochMilli,
  _: (e, n, t) => (e += divTrunc(t, xi), (n += modTrunc(t, xi)) < 1 ? (e--, n += xi) : n > xi && (e++, 
  n -= xi), [ e, n ]),
  year(e) {
    return e.isoYear;
  },
  month(e) {
    return e.isoMonth;
  },
  day: e => e.isoDay
}), /*@__PURE__*/ Object.assign({}, Va, Ka, {
  h: computeIntlDateParts,
  ee(e) {
    const n = this.O(e);
    return [ n.era, n.eraYear ];
  },
  I(e, n) {
    const t = computeIntlLeapMonth.call(this, e);
    return [ monthToMonthCodeNumber(n, t), t === n ];
  },
  N(e, n, t) {
    let [o, r, i] = computeIntlDateParts.call(this, {
      isoYear: ji,
      isoMonth: xi,
      isoDay: 31
    });
    const a = computeIntlLeapMonth.call(this, o), s = r === a;
    1 === (compareNumbers(e, monthToMonthCodeNumber(r, a)) || compareNumbers(Number(n), Number(s)) || compareNumbers(t, i)) && o--;
    for (let r = 0; r < 100; r++) {
      const i = o - r, a = computeIntlLeapMonth.call(this, i), s = monthCodeNumberToMonth(e, n, a);
      if (n === (s === a) && t <= computeIntlDaysInMonth.call(this, i, s)) {
        return [ i, s ];
      }
    }
  },
  K(e) {
    const n = computeIntlDaysInYear.call(this, e);
    return n > computeIntlDaysInYear.call(this, e - 1) && n > computeIntlDaysInYear.call(this, e + 1);
  },
  U: computeIntlLeapMonth,
  L: computeIntlMonthsInYear,
  J(e, n) {
    const t = n + e, o = Math.sign(e), r = o < 0 ? -1 : 0;
    let i = 0;
    for (let e = n; e !== t; e += o) {
      i += computeIntlMonthsInYear.call(this, e + r);
    }
    return i;
  },
  j: computeIntlDaysInMonth,
  X: computeIntlDaysInYear,
  P(e, n, t) {
    return epochMilliToIso(computeIntlEpochMilli.call(this, e, n, t));
  },
  q: computeIntlEpochMilli,
  _(e, n, t) {
    if (t) {
      if (n += t, !Number.isSafeInteger(n)) {
        throw new RangeError(Cr);
      }
      if (t < 0) {
        for (;n < 1; ) {
          n += computeIntlMonthsInYear.call(this, --e);
        }
      } else {
        let t;
        for (;n > (t = computeIntlMonthsInYear.call(this, e)); ) {
          n -= t, e++;
        }
      }
    }
    return [ e, n ];
  },
  year(e) {
    return this.O(e).year;
  },
  month(e) {
    const {year: n, F: t} = this.O(e), {C: o} = this.B(n);
    return o[t] + 1;
  },
  day(e) {
    return this.O(e).day;
  }
})), Qa = "numeric", Xa = [ "timeZoneName" ], es = {
  month: Qa,
  day: Qa
}, ns = {
  year: Qa,
  month: Qa
}, ts = /*@__PURE__*/ Object.assign({}, ns, {
  day: Qa
}), os = {
  hour: Qa,
  minute: Qa,
  second: Qa
}, rs = /*@__PURE__*/ Object.assign({}, ts, os), is = /*@__PURE__*/ Object.assign({}, rs, {
  timeZoneName: "short"
}), as = /*@__PURE__*/ Object.keys(ns), ss = /*@__PURE__*/ Object.keys(es), cs = /*@__PURE__*/ Object.keys(ts), us = /*@__PURE__*/ Object.keys(os), ls = [ "dateStyle" ], fs = /*@__PURE__*/ as.concat(ls), ds = /*@__PURE__*/ ss.concat(ls), ms = /*@__PURE__*/ cs.concat(ls, [ "weekday" ]), ps = /*@__PURE__*/ us.concat([ "dayPeriod", "timeStyle" ]), hs = /*@__PURE__*/ ms.concat(ps), gs = /*@__PURE__*/ hs.concat(Xa), Ts = /*@__PURE__*/ Xa.concat(ps), Ds = /*@__PURE__*/ Xa.concat(ms), Is = /*@__PURE__*/ Xa.concat([ "day", "weekday" ], ps), Ms = /*@__PURE__*/ Xa.concat([ "year", "weekday" ], ps), Ns = {}, t = [ /*@__PURE__*/ createOptionsTransformer(hs, rs), y ], s = [ /*@__PURE__*/ createOptionsTransformer(gs, is), y, 0, (e, n) => {
  const t = I(e.timeZone);
  if (n && I(n.timeZone) !== t) {
    throw new RangeError(Fr);
  }
  return t;
} ], n = [ /*@__PURE__*/ createOptionsTransformer(hs, rs, Xa), isoToEpochMilli ], o = [ /*@__PURE__*/ createOptionsTransformer(ms, ts, Ts), isoToEpochMilli ], r = [ /*@__PURE__*/ createOptionsTransformer(ps, os, Ds), e => isoTimeFieldsToNano(e) / internal_be ], a = [ /*@__PURE__*/ createOptionsTransformer(fs, ns, Is), isoToEpochMilli, 1 ], i = [ /*@__PURE__*/ createOptionsTransformer(ds, es, Ms), isoToEpochMilli, 1 ];

let ys;



;// CONCATENATED MODULE: ./node_modules/temporal-polyfill/chunks/classApi.js
function createSlotClass(e, t, n, o, r) {
  function Class(...e) {
    if (!(this instanceof Class)) {
      throw new TypeError(P);
    }
    oo(this, t(...e));
  }
  function bindMethod(e, t) {
    return Object.defineProperties((function(...t) {
      return e.call(this, getSpecificSlots(this), ...t);
    }), D(t));
  }
  function getSpecificSlots(t) {
    const n = no(t);
    if (!n || n.branding !== e) {
      throw new TypeError(P);
    }
    return n;
  }
  return Object.defineProperties(Class.prototype, {
    ...O(T(bindMethod, n)),
    ...p(T(bindMethod, o)),
    ...h("Temporal." + e)
  }), Object.defineProperties(Class, {
    ...p(r),
    ...D(e)
  }), [ Class, e => {
    const t = Object.create(Class.prototype);
    return oo(t, e), t;
  }, getSpecificSlots ];
}

function createProtocolValidator(e) {
  return e = e.concat("id").sort(), t => {
    if (!C(t, e)) {
      throw new TypeError(g);
    }
    return t;
  };
}

function rejectInvalidBag(e) {
  if (no(e) || void 0 !== e.calendar || void 0 !== e.timeZone) {
    throw new TypeError(Z);
  }
  return e;
}

function createCalendarFieldMethods(e, t) {
  const n = {};
  for (const o in e) {
    n[o] = ({o: e}, n) => {
      const r = no(n) || {}, {branding: a} = r, i = a === J || t.includes(a) ? r : toPlainDateSlots(n);
      return e[o](i);
    };
  }
  return n;
}

function createCalendarGetters(e) {
  const t = {};
  for (const n in e) {
    t[n] = e => {
      const {calendar: t} = e;
      return (o = t, "string" == typeof o ? Y(o) : (r = o, Object.assign(Object.create(co), {
        i: r
      })))[n](e);
      var o, r;
    };
  }
  return t;
}

function neverValueOf() {
  throw new TypeError(A);
}

function createCalendarFromSlots({calendar: e}) {
  return "string" == typeof e ? new lr(e) : e;
}

function toPlainMonthDaySlots(e, t) {
  if (t = U(t), z(e)) {
    const n = no(e);
    if (n && n.branding === q) {
      return H(t), n;
    }
    const o = extractCalendarSlotFromBag(e);
    return K(Qo(o || X), !o, e, t);
  }
  const n = Q(Y, e);
  return H(t), n;
}

function getOffsetNanosecondsForAdapter(e, t, n) {
  return o = t.call(e, Co(internal_(n))), ae(u(o));
  var o;
}

function createAdapterOps(e, t = ho) {
  const n = Object.keys(t).sort(), o = {};
  for (const r of n) {
    o[r] = E(t[r], e, $(e[r]));
  }
  return o;
}

function createTimeZoneOps(e, t) {
  return "string" == typeof e ? ie(e) : createAdapterOps(e, t);
}

function createTimeZoneOffsetOps(e) {
  return createTimeZoneOps(e, Do);
}

function toInstantSlots(e) {
  if (z(e)) {
    const t = no(e);
    if (t) {
      switch (t.branding) {
       case Oe:
        return t;

       case Te:
        return internal_(t.epochNanoseconds);
      }
    }
  }
  return pe(e);
}

function toTemporalInstant() {
  return Co(_(he(this.valueOf(), be)));
}

function getImplTransition(e, t, n) {
  const o = t.l(toInstantSlots(n).epochNanoseconds, e);
  return o ? Co(internal_(o)) : null;
}

function refineTimeZoneSlot(e) {
  return z(e) ? (no(e) || {}).timeZone || Fo(e) : (e => ye(Ne(m(e))))(e);
}

function toPlainTimeSlots(e, t) {
  if (z(e)) {
    const n = no(e) || {};
    switch (n.branding) {
     case xe:
      return H(t), n;

     case We:
      return H(t), Ge(n);

     case Te:
      return H(t), Re(createTimeZoneOffsetOps, n);
    }
    return Ue(e, t);
  }
  return H(t), ze(e);
}

function optionalToPlainTimeFields(e) {
  return void 0 === e ? void 0 : toPlainTimeSlots(e);
}

function toPlainYearMonthSlots(e, t) {
  if (t = U(t), z(e)) {
    const n = no(e);
    return n && n.branding === L ? (H(t), n) : nt(Ho(getCalendarSlotFromBag(e)), e, t);
  }
  const n = ot(Y, e);
  return H(t), n;
}

function toPlainDateTimeSlots(e, t) {
  if (t = U(t), z(e)) {
    const n = no(e) || {};
    switch (n.branding) {
     case We:
      return H(t), n;

     case J:
      return H(t), ee({
        ...n,
        ...Dt
      });

     case Te:
      return H(t), ht(createTimeZoneOffsetOps, n);
    }
    return Pt(Ko(getCalendarSlotFromBag(e)), e, t);
  }
  const n = Ct(e);
  return H(t), n;
}

function toPlainDateSlots(e, t) {
  if (t = U(t), z(e)) {
    const n = no(e) || {};
    switch (n.branding) {
     case J:
      return H(t), n;

     case We:
      return H(t), v(n);

     case Te:
      return H(t), Bt(createTimeZoneOffsetOps, n);
    }
    return Yt(Ko(getCalendarSlotFromBag(e)), e, t);
  }
  const n = At(e);
  return H(t), n;
}

function dayAdapter(e, t, n) {
  return d(t.call(e, Yo(v(n, e))));
}

function createCompoundOpsCreator(e) {
  return t => "string" == typeof t ? Y(t) : ((e, t) => {
    const n = Object.keys(t).sort(), o = {};
    for (const r of n) {
      o[r] = E(t[r], e, e[r]);
    }
    return o;
  })(t, e);
}

function toDurationSlots(e) {
  if (z(e)) {
    const t = no(e);
    return t && t.branding === qt ? t : Ht(e);
  }
  return Kt(e);
}

function refinePublicRelativeTo(e) {
  if (void 0 !== e) {
    if (z(e)) {
      const t = no(e) || {};
      switch (t.branding) {
       case Te:
       case J:
        return t;

       case We:
        return v(t);
      }
      const n = getCalendarSlotFromBag(e);
      return {
        ...Qt(refineTimeZoneSlot, createTimeZoneOps, Ko(n), e),
        calendar: n
      };
    }
    return Xt(e);
  }
}

function getCalendarSlotFromBag(e) {
  return extractCalendarSlotFromBag(e) || X;
}

function extractCalendarSlotFromBag(e) {
  const {calendar: t} = e;
  if (void 0 !== t) {
    return refineCalendarSlot(t);
  }
}

function refineCalendarSlot(e) {
  return z(e) ? (no(e) || {}).calendar || cr(e) : (e => an(sn(m(e))))(e);
}

function toZonedDateTimeSlots(e, t) {
  if (t = U(t), z(e)) {
    const n = no(e);
    if (n && n.branding === Te) {
      return wn(t), n;
    }
    const o = getCalendarSlotFromBag(e);
    return jn(refineTimeZoneSlot, createTimeZoneOps, Ko(o), o, e, t);
  }
  return Mn(e, t);
}

function adaptDateMethods(e) {
  return T((e => t => e(slotsToIso(t))), e);
}

function slotsToIso(e) {
  return fn(e, createTimeZoneOffsetOps);
}

function createDateTimeFormatClass() {
  const e = En.prototype, t = Object.getOwnPropertyDescriptors(e), n = Object.getOwnPropertyDescriptors(En), DateTimeFormat = function(e, t = {}) {
    if (!(this instanceof DateTimeFormat)) {
      return new DateTimeFormat(e, t);
    }
    Or.set(this, ((e, t = {}) => {
      const n = new En(e, t), o = n.resolvedOptions(), r = o.locale, a = Vn(Object.keys(t), o), i = Jn(createFormatPrepperForBranding), prepFormat = (...e) => {
        let t;
        const o = e.map(((e, n) => {
          const o = no(e), r = (o || {}).branding;
          if (n && t && t !== r) {
            throw new TypeError(kn);
          }
          return t = r, o;
        }));
        return t ? i(t)(r, a, ...o) : [ n, ...e ];
      };
      return prepFormat.u = n, prepFormat;
    })(e, t));
  };
  for (const e in t) {
    const n = t[e], o = e.startsWith("format") && createFormatMethod(e);
    "function" == typeof n.value ? n.value = "constructor" === e ? DateTimeFormat : o || createProxiedMethod(e) : o && (n.get = function() {
      return o.bind(this);
    });
  }
  return n.prototype.value = Object.create(e, t), Object.defineProperties(DateTimeFormat, n), 
  DateTimeFormat;
}

function createFormatMethod(e) {
  return function(...t) {
    const n = Or.get(this), [o, ...r] = n(...t);
    return o[e](...r);
  };
}

function createProxiedMethod(e) {
  return function(...t) {
    return Or.get(this).u[e](...t);
  };
}

function createFormatPrepperForBranding(t) {
  const n = xn[t];
  if (!n) {
    throw new TypeError(Ln(t));
  }
  return e(n, Jn(qn));
}



const xn = {
  Instant: t,
  PlainDateTime: n,
  PlainDate: o,
  PlainTime: r,
  PlainYearMonth: a,
  PlainMonthDay: i
}, Rn = /*@__PURE__*/ e(t), Wn = /*@__PURE__*/ e(s), Gn = /*@__PURE__*/ e(n), Un = /*@__PURE__*/ e(o), zn = /*@__PURE__*/ e(r), Hn = /*@__PURE__*/ e(a), Kn = /*@__PURE__*/ e(i), Qn = {
  era: l,
  eraYear: c,
  year: u,
  month: d,
  daysInMonth: d,
  daysInYear: d,
  inLeapYear: f,
  monthsInYear: d
}, Xn = {
  monthCode: m
}, $n = {
  day: d
}, _n = {
  dayOfWeek: d,
  dayOfYear: d,
  weekOfYear: S,
  yearOfWeek: c,
  daysInWeek: d
}, eo = /*@__PURE__*/ Object.assign({}, Qn, Xn, $n, _n), to = /*@__PURE__*/ new WeakMap, no = /*@__PURE__*/ to.get.bind(to), oo = /*@__PURE__*/ to.set.bind(to), ro = {
  ...createCalendarFieldMethods(Qn, [ L ]),
  ...createCalendarFieldMethods(_n, []),
  ...createCalendarFieldMethods(Xn, [ L, q ]),
  ...createCalendarFieldMethods($n, [ q ])
}, ao = /*@__PURE__*/ createCalendarGetters(eo), io = /*@__PURE__*/ createCalendarGetters({
  ...Qn,
  ...Xn
}), so = /*@__PURE__*/ createCalendarGetters({
  ...Xn,
  ...$n
}), lo = {
  calendarId: e => I(e.calendar)
}, co = /*@__PURE__*/ T(((e, t) => function(n) {
  const {i: o} = this;
  return e(o[t](Yo(v(n, o))));
}), eo), uo = /*@__PURE__*/ b((e => t => t[e]), F.concat("sign")), fo = /*@__PURE__*/ b(((e, t) => e => e[j[t]]), w), mo = {
  epochSeconds: M,
  epochMilliseconds: y,
  epochMicroseconds: N,
  epochNanoseconds: B
}, So = /*@__PURE__*/ E(V, new Set([ "branding" ])), [Oo, To, po] = createSlotClass(q, E(G, refineCalendarSlot), {
  ...lo,
  ...so
}, {
  getISOFields: So,
  getCalendar: createCalendarFromSlots,
  with(e, t, n) {
    return To(k(_o, e, this, rejectInvalidBag(t), n));
  },
  equals: (e, t) => x(e, toPlainMonthDaySlots(t)),
  toPlainDate(e, t) {
    return Yo(R($o, e, this, t));
  },
  toLocaleString(e, t, n) {
    const [o, r] = Kn(t, n, e);
    return o.format(r);
  },
  toString: W,
  toJSON: e => W(e),
  valueOf: neverValueOf
}, {
  from: (e, t) => To(toPlainMonthDaySlots(e, t))
}), ho = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter,
  getPossibleInstantsFor(e, t, n) {
    const o = [ ...t.call(e, No(ee(n, X))) ].map((e => go(e).epochNanoseconds)), r = o.length;
    return r > 1 && (o.sort(te), ne(oe(re(o[0], o[r - 1])))), o;
  }
}, Do = {
  getOffsetNanosecondsFor: getOffsetNanosecondsForAdapter
}, [Po, Co, go] = createSlotClass(Oe, Se, mo, {
  add: (e, t) => Co(se(0, e, toDurationSlots(t))),
  subtract: (e, t) => Co(se(1, e, toDurationSlots(t))),
  until: (e, t, n) => ar(le(0, e, toInstantSlots(t), n)),
  since: (e, t, n) => ar(le(1, e, toInstantSlots(t), n)),
  round: (e, t) => Co(ce(e, t)),
  equals: (e, t) => ue(e, toInstantSlots(t)),
  toZonedDateTime(e, t) {
    const n = de(t);
    return dr(fe(e, refineTimeZoneSlot(n.timeZone), refineCalendarSlot(n.calendar)));
  },
  toZonedDateTimeISO: (e, t) => dr(fe(e, refineTimeZoneSlot(t))),
  toLocaleString(e, t, n) {
    const [o, r] = Rn(t, n, e);
    return o.format(r);
  },
  toString: (e, t) => me(refineTimeZoneSlot, createTimeZoneOffsetOps, e, t),
  toJSON: e => me(refineTimeZoneSlot, createTimeZoneOffsetOps, e),
  valueOf: neverValueOf
}, {
  from: e => Co(toInstantSlots(e)),
  fromEpochSeconds: e => Co(De(e)),
  fromEpochMilliseconds: e => Co(Pe(e)),
  fromEpochMicroseconds: e => Co(Ce(e)),
  fromEpochNanoseconds: e => Co(ge(e)),
  compare: (e, t) => Ze(toInstantSlots(e), toInstantSlots(t))
}), [Zo, bo] = createSlotClass("TimeZone", (e => {
  const t = Me(e);
  return {
    branding: "TimeZone",
    id: t,
    o: ie(t)
  };
}), {
  id: e => e.id
}, {
  getPossibleInstantsFor: ({o: e}, t) => e.getPossibleInstantsFor(toPlainDateTimeSlots(t)).map((e => Co(internal_(e)))),
  getOffsetNanosecondsFor: ({o: e}, t) => e.getOffsetNanosecondsFor(toInstantSlots(t).epochNanoseconds),
  getOffsetStringFor(e, t) {
    const n = toInstantSlots(t).epochNanoseconds, o = createAdapterOps(this, Do).getOffsetNanosecondsFor(n);
    return Fe(o);
  },
  getPlainDateTimeFor(e, t, n = X) {
    const o = toInstantSlots(t).epochNanoseconds, r = createAdapterOps(this, Do).getOffsetNanosecondsFor(o);
    return No(ee(Ie(o, r), refineCalendarSlot(n)));
  },
  getInstantFor(e, t, n) {
    const o = toPlainDateTimeSlots(t), r = ve(n), a = createAdapterOps(this);
    return Co(internal_(we(a, o, r)));
  },
  getNextTransition: ({o: e}, t) => getImplTransition(1, e, t),
  getPreviousTransition: ({o: e}, t) => getImplTransition(-1, e, t),
  equals(e, t) {
    return !!je(this, refineTimeZoneSlot(t));
  },
  toString: e => e.id,
  toJSON: e => e.id
}, {
  from(e) {
    const t = refineTimeZoneSlot(e);
    return "string" == typeof t ? new Zo(t) : t;
  }
}), Fo = /*@__PURE__*/ createProtocolValidator(Object.keys(ho)), [Io, vo] = createSlotClass(xe, ke, fo, {
  getISOFields: So,
  with(e, t, n) {
    return vo(Be(this, rejectInvalidBag(t), n));
  },
  add: (e, t) => vo(Ye(0, e, toDurationSlots(t))),
  subtract: (e, t) => vo(Ye(1, e, toDurationSlots(t))),
  until: (e, t, n) => ar(Ae(0, e, toPlainTimeSlots(t), n)),
  since: (e, t, n) => ar(Ae(1, e, toPlainTimeSlots(t), n)),
  round: (e, t) => vo(Ee(e, t)),
  equals: (e, t) => Ve(e, toPlainTimeSlots(t)),
  toZonedDateTime: (e, t) => dr(Je(refineTimeZoneSlot, toPlainDateSlots, createTimeZoneOps, e, t)),
  toPlainDateTime: (e, t) => No(Le(e, toPlainDateSlots(t))),
  toLocaleString(e, t, n) {
    const [o, r] = zn(t, n, e);
    return o.format(r);
  },
  toString: qe,
  toJSON: e => qe(e),
  valueOf: neverValueOf
}, {
  from: (e, t) => vo(toPlainTimeSlots(e, t)),
  compare: (e, t) => He(toPlainTimeSlots(e), toPlainTimeSlots(t))
}), [wo, jo, Mo] = createSlotClass(L, E(tt, refineCalendarSlot), {
  ...lo,
  ...io
}, {
  getISOFields: So,
  getCalendar: createCalendarFromSlots,
  with(e, t, n) {
    return jo(Ke(Xo, e, this, rejectInvalidBag(t), n));
  },
  add: (e, t, n) => jo(Qe(nr, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => jo(Qe(nr, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ar(Xe(or, 0, e, toPlainYearMonthSlots(t), n)),
  since: (e, t, n) => ar(Xe(or, 1, e, toPlainYearMonthSlots(t), n)),
  equals: (e, t) => $e(e, toPlainYearMonthSlots(t)),
  toPlainDate(e, t) {
    return Yo(_e($o, e, this, t));
  },
  toLocaleString(e, t, n) {
    const [o, r] = Hn(t, n, e);
    return o.format(r);
  },
  toString: et,
  toJSON: e => et(e),
  valueOf: neverValueOf
}, {
  from: (e, t) => jo(toPlainYearMonthSlots(e, t)),
  compare: (e, t) => rt(toPlainYearMonthSlots(e), toPlainYearMonthSlots(t))
}), [yo, No] = createSlotClass(We, E(pt, refineCalendarSlot), {
  ...lo,
  ...ao,
  ...fo
}, {
  getISOFields: So,
  getCalendar: createCalendarFromSlots,
  with(e, t, n) {
    return No(at($o, e, this, rejectInvalidBag(t), n));
  },
  withCalendar: (e, t) => No(it(e, refineCalendarSlot(t))),
  withPlainDate: (e, t) => No(st(e, toPlainDateSlots(t))),
  withPlainTime: (e, t) => No(lt(e, optionalToPlainTimeFields(t))),
  add: (e, t, n) => No(ct(er, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => No(ct(er, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ar(ut(tr, 0, e, toPlainDateTimeSlots(t), n)),
  since: (e, t, n) => ar(ut(tr, 1, e, toPlainDateTimeSlots(t), n)),
  round: (e, t) => No(dt(e, t)),
  equals: (e, t) => ft(e, toPlainDateTimeSlots(t)),
  toZonedDateTime: (e, t, n) => dr(mt(createTimeZoneOps, e, refineTimeZoneSlot(t), n)),
  toPlainDate: e => Yo(v(e)),
  toPlainTime: e => vo(Ge(e)),
  toPlainYearMonth(e) {
    return jo(St(Ho, e, this));
  },
  toPlainMonthDay(e) {
    return To(Ot(Qo, e, this));
  },
  toLocaleString(e, t, n) {
    const [o, r] = Gn(t, n, e);
    return o.format(r);
  },
  toString: Tt,
  toJSON: e => Tt(e),
  valueOf: neverValueOf
}, {
  from: (e, t) => No(toPlainDateTimeSlots(e, t)),
  compare: (e, t) => gt(toPlainDateTimeSlots(e), toPlainDateTimeSlots(t))
}), [Bo, Yo, Ao] = createSlotClass(J, E(Nt, refineCalendarSlot), {
  ...lo,
  ...ao
}, {
  getISOFields: So,
  getCalendar: createCalendarFromSlots,
  with(e, t, n) {
    return Yo(Zt($o, e, this, rejectInvalidBag(t), n));
  },
  withCalendar: (e, t) => Yo(it(e, refineCalendarSlot(t))),
  add: (e, t, n) => Yo(bt(er, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => Yo(bt(er, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ar(Ft(tr, 0, e, toPlainDateSlots(t), n)),
  since: (e, t, n) => ar(Ft(tr, 1, e, toPlainDateSlots(t), n)),
  equals: (e, t) => It(e, toPlainDateSlots(t)),
  toZonedDateTime(e, t) {
    const n = !z(t) || t instanceof Zo ? {
      timeZone: t
    } : t;
    return dr(vt(refineTimeZoneSlot, toPlainTimeSlots, createTimeZoneOps, e, n));
  },
  toPlainDateTime: (e, t) => No(wt(e, optionalToPlainTimeFields(t))),
  toPlainYearMonth(e) {
    return jo(jt(Ho, e, this));
  },
  toPlainMonthDay(e) {
    return To(Mt(Qo, e, this));
  },
  toLocaleString(e, t, n) {
    const [o, r] = Un(t, n, e);
    return o.format(r);
  },
  toString: yt,
  toJSON: e => yt(e),
  valueOf: neverValueOf
}, {
  from: (e, t) => Yo(toPlainDateSlots(e, t)),
  compare: (e, t) => rt(toPlainDateSlots(e), toPlainDateSlots(t))
}), Eo = {
  fields(e, t, n) {
    return [ ...t.call(e, n) ];
  }
}, Vo = /*@__PURE__*/ Object.assign({
  dateFromFields(e, t, n, o) {
    return Ao(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Eo), Jo = /*@__PURE__*/ Object.assign({
  yearMonthFromFields(e, t, n, o) {
    return Mo(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Eo), Lo = /*@__PURE__*/ Object.assign({
  monthDayFromFields(e, t, n, o) {
    return po(t.call(e, Object.assign(Object.create(null), n), o));
  }
}, Eo), qo = {
  mergeFields(e, t, n, o) {
    return de(t.call(e, Object.assign(Object.create(null), n), Object.assign(Object.create(null), o)));
  }
}, ko = /*@__PURE__*/ Object.assign({}, Vo, qo), xo = /*@__PURE__*/ Object.assign({}, Jo, qo), Ro = /*@__PURE__*/ Object.assign({}, Lo, qo), Wo = {
  dateAdd(e, t, n, o, r) {
    return Ao(t.call(e, Yo(v(n, e)), ar(Vt(o)), r));
  }
}, Go = /*@__PURE__*/ Object.assign({}, Wo, {
  dateUntil(e, t, n, o, r, a) {
    return ir(t.call(e, Yo(v(n, e)), Yo(v(o, e)), Object.assign(Object.create(null), a, {
      largestUnit: Et[r]
    })));
  }
}), Uo = /*@__PURE__*/ Object.assign({}, Wo, {
  day: dayAdapter
}), zo = /*@__PURE__*/ Object.assign({}, Go, {
  day: dayAdapter
}), Ho = /*@__PURE__*/ createCompoundOpsCreator(Jo), Ko = /*@__PURE__*/ createCompoundOpsCreator(Vo), Qo = /*@__PURE__*/ createCompoundOpsCreator(Lo), Xo = /*@__PURE__*/ createCompoundOpsCreator(xo), $o = /*@__PURE__*/ createCompoundOpsCreator(ko), _o = /*@__PURE__*/ createCompoundOpsCreator(Ro), er = /*@__PURE__*/ createCompoundOpsCreator(Wo), tr = /*@__PURE__*/ createCompoundOpsCreator(Go), nr = /*@__PURE__*/ createCompoundOpsCreator(Uo), or = /*@__PURE__*/ createCompoundOpsCreator(zo), [rr, ar, ir] = createSlotClass(qt, Lt, {
  ...uo,
  blank: Jt
}, {
  with: (e, t) => ar(kt(e, t)),
  negated: e => ar(xt(e)),
  abs: e => ar(Rt(e)),
  add: (e, t, n) => ar(Wt(refinePublicRelativeTo, tr, createTimeZoneOps, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => ar(Wt(refinePublicRelativeTo, tr, createTimeZoneOps, 1, e, toDurationSlots(t), n)),
  round: (e, t) => ar(Gt(refinePublicRelativeTo, tr, createTimeZoneOps, e, t)),
  total: (e, t) => Ut(refinePublicRelativeTo, tr, createTimeZoneOps, e, t),
  toLocaleString(e, t, n) {
    return Intl.DurationFormat ? new Intl.DurationFormat(t, n).format(this) : zt(e);
  },
  toString: zt,
  toJSON: e => zt(e),
  valueOf: neverValueOf
}, {
  from: e => ar(toDurationSlots(e)),
  compare: (e, t, n) => $t(refinePublicRelativeTo, er, createTimeZoneOps, toDurationSlots(e), toDurationSlots(t), n)
}), sr = {
  toString: e => e.id,
  toJSON: e => e.id,
  ...ro,
  dateAdd: ({id: e, o: t}, n, o, r) => Yo(v(t.dateAdd(toPlainDateSlots(n), toDurationSlots(o), r), e)),
  dateUntil: ({o: e}, t, n, o) => ar(Vt(e.dateUntil(toPlainDateSlots(t), toPlainDateSlots(n), _t(o)))),
  dateFromFields: ({id: e, o: t}, n, o) => Yo(Yt(t, n, o, ln(e))),
  yearMonthFromFields: ({id: e, o: t}, n, o) => jo(nt(t, n, o, un(e))),
  monthDayFromFields: ({id: e, o: t}, n, o) => To(K(t, 0, n, o, cn(e))),
  fields({o: e}, t) {
    const n = new Set(en), o = [];
    for (const e of t) {
      if (m(e), !n.has(e)) {
        throw new RangeError(tn(e));
      }
      n.delete(e), o.push(e);
    }
    return e.fields(o);
  },
  mergeFields: ({o: e}, t, n) => e.mergeFields(nn(on(t)), nn(on(n)))
}, [lr] = createSlotClass("Calendar", (e => {
  const t = rn(e);
  return {
    branding: "Calendar",
    id: t,
    o: Y(t)
  };
}), {
  id: e => e.id
}, sr, {
  from(e) {
    const t = refineCalendarSlot(e);
    return "string" == typeof t ? new lr(t) : t;
  }
}), cr = /*@__PURE__*/ createProtocolValidator(Object.keys(sr).slice(4)), [ur, dr] = createSlotClass(Te, E(vn, refineCalendarSlot, refineTimeZoneSlot), {
  ...mo,
  ...lo,
  ...adaptDateMethods(ao),
  ...adaptDateMethods(fo),
  offset: e => Fe(slotsToIso(e).offsetNanoseconds),
  offsetNanoseconds: e => slotsToIso(e).offsetNanoseconds,
  timeZoneId: e => I(e.timeZone),
  hoursInDay: e => dn(createTimeZoneOps, e)
}, {
  getISOFields: e => mn(createTimeZoneOffsetOps, e),
  getCalendar: createCalendarFromSlots,
  getTimeZone: ({timeZone: e}) => "string" == typeof e ? new Zo(e) : e,
  with(e, t, n) {
    return dr(Sn($o, createTimeZoneOps, e, this, rejectInvalidBag(t), n));
  },
  withCalendar: (e, t) => dr(it(e, refineCalendarSlot(t))),
  withTimeZone: (e, t) => dr(On(e, refineTimeZoneSlot(t))),
  withPlainDate: (e, t) => dr(Tn(createTimeZoneOps, e, toPlainDateSlots(t))),
  withPlainTime: (e, t) => dr(pn(createTimeZoneOps, e, optionalToPlainTimeFields(t))),
  add: (e, t, n) => dr(hn(er, createTimeZoneOps, 0, e, toDurationSlots(t), n)),
  subtract: (e, t, n) => dr(hn(er, createTimeZoneOps, 1, e, toDurationSlots(t), n)),
  until: (e, t, n) => ar(Vt(Dn(tr, createTimeZoneOps, 0, e, toZonedDateTimeSlots(t), n))),
  since: (e, t, n) => ar(Vt(Dn(tr, createTimeZoneOps, 1, e, toZonedDateTimeSlots(t), n))),
  round: (e, t) => dr(Pn(createTimeZoneOps, e, t)),
  startOfDay: e => dr(Cn(createTimeZoneOps, e)),
  equals: (e, t) => gn(e, toZonedDateTimeSlots(t)),
  toInstant: e => Co(Zn(e)),
  toPlainDateTime: e => No(ht(createTimeZoneOffsetOps, e)),
  toPlainDate: e => Yo(Bt(createTimeZoneOffsetOps, e)),
  toPlainTime: e => vo(Re(createTimeZoneOffsetOps, e)),
  toPlainYearMonth(e) {
    return jo(bn(Ho, e, this));
  },
  toPlainMonthDay(e) {
    return To(Fn(Qo, e, this));
  },
  toLocaleString(e, t, n = {}) {
    const [o, r] = Wn(t, n, e);
    return o.format(r);
  },
  toString: (e, t) => In(createTimeZoneOffsetOps, e, t),
  toJSON: e => In(createTimeZoneOffsetOps, e),
  valueOf: neverValueOf
}, {
  from: (e, t) => dr(toZonedDateTimeSlots(e, t)),
  compare: (e, t) => yn(toZonedDateTimeSlots(e), toZonedDateTimeSlots(t))
}), fr = /*@__PURE__*/ Object.defineProperties({}, {
  ...h("Temporal.Now"),
  ...p({
    timeZoneId: () => Nn(),
    instant: () => Co(internal_(Bn())),
    zonedDateTime: (e, t = Nn()) => dr(Yn(Bn(), refineTimeZoneSlot(t), refineCalendarSlot(e))),
    zonedDateTimeISO: (e = Nn()) => dr(Yn(Bn(), refineTimeZoneSlot(e), X)),
    plainDateTime: (e, t = Nn()) => No(ee(An(createTimeZoneOffsetOps(refineTimeZoneSlot(t))), refineCalendarSlot(e))),
    plainDateTimeISO: (e = Nn()) => No(ee(An(createTimeZoneOffsetOps(refineTimeZoneSlot(e))), X)),
    plainDate: (e, t = Nn()) => Yo(v(An(createTimeZoneOffsetOps(refineTimeZoneSlot(t))), refineCalendarSlot(e))),
    plainDateISO: (e = Nn()) => Yo(v(An(createTimeZoneOffsetOps(refineTimeZoneSlot(e))), X)),
    plainTimeISO: (e = Nn()) => vo(Ge(An(createTimeZoneOffsetOps(refineTimeZoneSlot(e)))))
  })
}), mr = /*@__PURE__*/ Object.defineProperties({}, {
  ...h("Temporal"),
  ...p({
    PlainYearMonth: wo,
    PlainMonthDay: Oo,
    PlainDate: Bo,
    PlainTime: Io,
    PlainDateTime: yo,
    ZonedDateTime: ur,
    Instant: Po,
    Calendar: lr,
    TimeZone: Zo,
    Duration: rr,
    Now: fr
  })
}), Sr = /*@__PURE__*/ createDateTimeFormatClass(), Or = /*@__PURE__*/ new WeakMap, Tr = /*@__PURE__*/ Object.defineProperties(Object.create(Intl), p({
  DateTimeFormat: Sr
}));



// EXTERNAL MODULE: ./node_modules/webextension-polyfill/dist/browser-polyfill.js
var browser_polyfill = __webpack_require__(6815);
;// CONCATENATED MODULE: ./src/canvas/image.ts
var image_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function getResizedBlob(src_1, width_1) {
    return image_awaiter(this, arguments, void 0, function* (src, width, height = undefined) {
        let imageSrc = yield contentDownloadImage(src);
        let canvas = document.createElement('canvas');
        let image = new Image();
        image.src = imageSrc;
        let ctx = canvas.getContext('2d');
        return new Promise((resolve) => {
            image.onload = () => {
                height !== null && height !== void 0 ? height : (height = image.height / image.width * width);
                assert_default()(ctx);
                console.log(image.src);
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(image, 0, 0, width, height);
                canvas.toBlob(resolve);
            };
        });
    });
}
function contentDownloadImage(src) {
    return image_awaiter(this, void 0, void 0, function* () {
        const base64 = yield browser_polyfill.runtime.sendMessage({ downloadImage: src });
        return base64;
    });
}
function backgroundDownloadImage(src) {
    //if(!height) height = src.height / src.width * width;
    const imageUrl = src;
    return new Promise((resolve) => image_awaiter(this, void 0, void 0, function* () {
        const imageFileResponse = yield fetch(imageUrl);
        let reader = new FileReader();
        reader.onload = event => {
            console.log(reader.result);
            resolve(reader.result);
        };
        const blob = yield imageFileResponse.blob();
        reader.readAsDataURL(blob);
    }));
}

;// CONCATENATED MODULE: ./src/canvas/files.ts
var files_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function uploadFile(file, folder, url) {
    return files_awaiter(this, void 0, void 0, function* () {
        const initialParams = {
            name: file.name,
            no_redirect: true,
            on_duplicate: 'overwrite'
        };
        if (typeof folder === 'number')
            initialParams.parent_folder_id = folder;
        else
            initialParams.parent_folder_path = folder;
        let response = yield fetch(url, {
            body: canvasUtils_formDataify(initialParams),
            method: 'POST'
        });
        const data = yield response.json();
        const uploadParams = data.upload_params;
        const uploadFormData = canvasUtils_formDataify(uploadParams);
        uploadFormData.append('file', file);
        response = yield fetch(data.upload_url, {
            method: 'POST',
            body: uploadFormData,
        });
        assert_default()(response.ok);
    });
}

;// CONCATENATED MODULE: ./src/canvas/content/index.ts
var content_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const SAFE_MAX_BANNER_WIDTH = 1400;
class BaseContentItem extends BaseCanvasObject {
    constructor(canvasData, courseId) {
        super(canvasData);
        this._courseId = courseId;
    }
    get htmlContentUrl() {
        return `${this.contentUrlPath}`.replace('/api/v1/', '/');
    }
    static get contentUrlPart() {
        assert_default()(this.allContentUrlTemplate, "Not a content url template");
        const urlTermMatch = /\/([\w_]+)$/.exec(this.allContentUrlTemplate);
        if (!urlTermMatch)
            return null;
        return urlTermMatch[1];
    }
    static getAllInCourse(courseId_1) {
        return content_awaiter(this, arguments, void 0, function* (courseId, config = null) {
            let url = this.getAllUrl(courseId);
            let data = yield getPagedData(url, config);
            return data.map(item => new this(item, courseId));
        });
    }
    static clearAddedContentTags(text) {
        let out = text.replace(/<\/?link[^>]*>/g, '');
        out = out.replace(/<\/?script[^>]*>/g, '');
        return out;
    }
    static getFromUrl() {
        return content_awaiter(this, arguments, void 0, function* (url = null, courseId = null) {
            if (url === null) {
                url = document.documentURI;
            }
            url = url.replace(/\.com/, '.com/api/v1');
            let data = yield fetch_fetchJson(url);
            if (!courseId) {
                courseId = getCourseIdFromUrl(url);
                if (!courseId)
                    return null;
            }
            //If this is a collection of data, we can't process it as a Canvas Object
            if (Array.isArray(data))
                return null;
            assert_default()(!Array.isArray(data));
            if (data) {
                return new this(data, courseId);
            }
            return null;
        });
    }
    static getById(contentId, courseId) {
        return content_awaiter(this, void 0, void 0, function* () {
            return new this(yield this.getDataById(contentId, courseId), courseId);
        });
    }
    get bodyKey() {
        return this.myClass.bodyProperty;
    }
    get body() {
        if (!this.bodyKey)
            return null;
        return this.myClass.clearAddedContentTags(this.canvasData[this.bodyKey]);
    }
    get dueAt() {
        if (!this.canvasData.hasOwnProperty('due_at')) {
            return null;
        }
        if (!this.canvasData.due_at)
            return null;
        return new Date(this.canvasData.due_at);
    }
    setDueAt(date) {
        return content_awaiter(this, void 0, void 0, function* () {
            throw new NotImplementedException();
        });
    }
    dueAtTimeDelta(timeDelta) {
        return content_awaiter(this, void 0, void 0, function* () {
            if (!this.dueAt)
                return null;
            let result = new Date(this.dueAt);
            result.setDate(result.getDate() + timeDelta);
            return yield this.setDueAt(result);
        });
    }
    get contentUrlPath() {
        let url = this.constructor.contentUrlTemplate;
        assert_default()(url);
        url = url.replace('{course_id}', this.courseId.toString());
        url = url.replace('{content_id}', this.id.toString());
        return url;
    }
    get courseId() {
        return this._courseId;
    }
    updateContent(text, name, config) {
        return content_awaiter(this, void 0, void 0, function* () {
            const data = {};
            const constructor = this.constructor;
            assert_default()(constructor.bodyProperty);
            assert_default()(constructor.nameProperty);
            const nameProp = constructor.nameProperty;
            const bodyProp = constructor.bodyProperty;
            if (text && bodyProp) {
                this.canvasData[bodyProp] = text;
                data[bodyProp] = text;
            }
            if (name && nameProp) {
                this.canvasData[nameProp] = name;
                data[nameProp] = name;
            }
            return this.saveData(data, config);
        });
    }
    getMeInAnotherCourse(targetCourseId) {
        return content_awaiter(this, void 0, void 0, function* () {
            let ContentClass = this.constructor;
            let targets = yield ContentClass.getAllInCourse(targetCourseId, { queryParams: { search_term: this.name } });
            return targets.find((target) => target.name == this.name);
        });
    }
    getAllLinks() {
        const el = this.bodyAsElement;
        const anchors = el.querySelectorAll('a');
        const urls = [];
        for (let link of anchors)
            urls.push(link.href);
        return urls;
    }
    get bodyAsElement() {
        assert_default()(this.body, "This content item has no body property");
        let el = document.createElement('div');
        el.innerHTML = this.body;
        return el;
    }
    resizeBanner() {
        return content_awaiter(this, arguments, void 0, function* (maxWidth = SAFE_MAX_BANNER_WIDTH) {
            const bannerImg = getBannerImage(this);
            if (!bannerImg)
                throw new Error("No banner");
            let fileData = yield getFileDataFromUrl(bannerImg.src, this.courseId);
            if (!fileData)
                throw new Error("File not found");
            if (bannerImg.naturalWidth < maxWidth)
                return; //Dont resize image unless we're shrinking it
            let resizedImageBlob = yield getResizedBlob(bannerImg.src, maxWidth);
            let fileName = fileData.filename;
            let fileUploadUrl = `/api/v1/courses/${this.courseId}/files`;
            assert_default()(resizedImageBlob);
            let file = new File([resizedImageBlob], fileName);
            return yield uploadFile(file, fileData.folder_id, fileUploadUrl);
        });
    }
}
BaseContentItem.nameProperty = 'name';
function getFileDataFromUrl(url, courseId) {
    return content_awaiter(this, void 0, void 0, function* () {
        const match = /.*\/files\/(\d+)/.exec(url);
        if (!match)
            return null;
        if (match) {
            const fileId = parseInt(match[1]);
            return yield getFileData(fileId, courseId);
        }
    });
}
class Assignment extends BaseContentItem {
    constructor(assignmentData, courseId) {
        super(assignmentData, courseId);
    }
    setDueAt(dueAt, config) {
        return content_awaiter(this, void 0, void 0, function* () {
            const sourceDueAt = this.rawData.due_at ? mr.Instant.from(this.rawData.due_at) : null;
            const targetDueAt = mr.Instant.from(dueAt.toISOString());
            const payload = {
                assignment: {
                    due_at: dueAt.toISOString(),
                }
            };
            if (this.rawData.peer_reviews && 'automatic_peer_reviews' in this.rawData) {
                const peerReviewTime = this.rawData.peer_reviews_assign_at ? mr.Instant.from(this.rawData.peer_reviews_assign_at) : null;
                assert_default()(sourceDueAt, "Trying to set peer review date without a due date for the assignment.");
                if (peerReviewTime) {
                    const peerReviewOffset = sourceDueAt.until(peerReviewTime);
                    const newPeerReviewTime = targetDueAt.add(peerReviewOffset);
                    payload.assignment.peer_reviews_assign_at =
                        new Date(newPeerReviewTime.epochMilliseconds).toISOString();
                }
            }
            let data = yield this.saveData(payload, config);
            this.canvasData['due_at'] = dueAt.toISOString();
            return data;
        });
    }
    get rawData() {
        return this.canvasData;
    }
    updateContent(text, name, config) {
        return content_awaiter(this, void 0, void 0, function* () {
            const assignmentData = {};
            if (text) {
                assignmentData.description = text;
                this.rawData.description = text;
            }
            if (name) {
                assignmentData.name = name;
                this.rawData.name = name;
            }
            return yield this.saveData({
                assignment: assignmentData
            }, config);
        });
    }
}
Assignment.nameProperty = 'name';
Assignment.bodyProperty = 'description';
Assignment.contentUrlTemplate = "/api/v1/courses/{course_id}/assignments/{content_id}";
Assignment.allContentUrlTemplate = "/api/v1/courses/{course_id}/assignments";
class Quiz extends BaseContentItem {
    setDueAt(date) {
        return content_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/courses/${this.courseId}/quizzes/${this.id}`;
            return fetch_fetchJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: canvasUtils_formDataify({
                        quiz: {
                            due_at: date
                        }
                    })
                }
            });
        });
    }
}
Quiz.nameProperty = 'title';
Quiz.bodyProperty = 'description';
Quiz.contentUrlTemplate = "/api/v1/courses/{course_id}/quizzes/{content_id}";
Quiz.allContentUrlTemplate = "/api/v1/courses/{course_id}/quizzes";
class Page extends BaseContentItem {
    constructor(canvasData, courseId) {
        super(canvasData, courseId);
    }
    get body() {
        return this.canvasData[this.bodyKey];
    }
    updateContent(text, name, config) {
        return content_awaiter(this, void 0, void 0, function* () {
            let data = {};
            if (text) {
                this.canvasData[this.bodyKey] = text;
                data['wiki_page[body]'] = text;
            }
            if (name) {
                this.canvasData[this.nameKey] = name;
                data[this.nameKey] = name;
            }
            return this.saveData(data, config);
        });
    }
}
Page.idProperty = 'page_id';
Page.nameProperty = 'title';
Page.bodyProperty = 'body';
Page.contentUrlTemplate = "/api/v1/courses/{course_id}/pages/{content_id}";
Page.allContentUrlTemplate = "/api/v1/courses/{course_id}/pages";
class Discussion extends BaseContentItem {
    offsetPublishDelay(days, config) {
        return content_awaiter(this, void 0, void 0, function* () {
            const data = this.rawData;
            if (!this.rawData.delayed_post_at)
                return;
            let delayedPostAt = mr.Instant.from(this.rawData.delayed_post_at).toZonedDateTimeISO('UTC');
            delayedPostAt = delayedPostAt.add({ days });
            const payload = {
                delayed_post_at: new Date(delayedPostAt.epochMilliseconds).toISOString()
            };
            yield this.saveData(payload, config);
        });
    }
    get rawData() {
        return this.canvasData;
    }
}
Discussion.nameProperty = 'title';
Discussion.bodyProperty = 'message';
Discussion.contentUrlTemplate = "/api/v1/courses/{course_id}/discussion_topics/{content_id}";
Discussion.allContentUrlTemplate = "/api/v1/courses/{course_id}/discussion_topics";
function getBannerImage(overviewPage) {
    const pageBody = document.createElement('html');
    if (!overviewPage.body)
        throw new Error(`Content item ${overviewPage.name} has no html body`);
    pageBody.innerHTML = overviewPage.body;
    return pageBody.querySelector('.cbt-banner-image img');
}
const assignmentDataGen = canvasDataFetchGenFunc(({ courseId }) => `/api/v1/courses/${courseId}/assignments`);
const getAssignmentDataUrl = (courseId, assignmentId) => `/api/v1/courses/${courseId}/assignments/${assignmentId}`;
function getAssignmentData(courseId, assignmentId, config) {
    return content_awaiter(this, void 0, void 0, function* () {
        let url = getAssignmentDataUrl(courseId, assignmentId);
        return yield fetchJson(url, config);
    });
}
function getFileData(fileId, courseId) {
    return content_awaiter(this, void 0, void 0, function* () {
        const url = `/api/v1/courses/${courseId}/files/${fileId}`;
        return yield fetch_fetchJson(url);
    });
}

;// CONCATENATED MODULE: ./src/date.ts



function getMonthNames(style = "long", locale = 'en-US') {
    return Array.from(range(1, 12)).map((monthInt) => {
        return Temporal.PlainDate.from({
            day: 1,
            month: monthInt,
            year: Temporal.Now.plainDateISO().year
        }).toLocaleString(locale, {
            month: style
        });
    });
}
/**
 * takes a string of formatted [monthname] [date] and give a plain date
 * @param value the string to evaluate
 * @param locale the locale to use to generate month names, e.g. en-US
 * @param year the year to give the date object. If not provided defaults to current year.
 */
function plainDateFromMonthDayString(value, locale, year) {
    year !== null && year !== void 0 ? year : (year = Temporal.Now.plainDateISO().year);
    const match = value.match(getDateRegexString(locale));
    if (!match)
        throw new MalformedDateError(value);
    const fullDate = match[1];
    return Temporal.PlainDate.from({
        month: getMonthNumberLut(locale)[match[2]],
        day: parseInt(match[3]),
        year
    });
}
const monthNumberLutCache = {};
/**
 * returns a string with 3 capturing groups -- 1 - month date, 2 month, 3 date. cuts off rd/th...
 * @param locale
 */
function getMonthNumberLut(locale) {
    if (monthNumberLutCache[locale])
        return monthNumberLutCache[locale];
    const monthNames = getMonthNames('long', locale);
    const shortMonthNames = getMonthNames('short', locale);
    const monthNumberLut = {};
    assert(monthNames.length === shortMonthNames.length);
    for (let i = 0; i < monthNames.length; i++) {
        monthNumberLut[monthNames[i]] = i + 1;
        monthNumberLut[shortMonthNames[i]] = i + 1;
    }
    monthNumberLutCache[locale] = monthNumberLut;
    return monthNumberLut;
}
const dateRegexStringCache = {};
//TODO: Make the capture groups in this optional
function getDateRegexString(locale = 'en-US') {
    if (dateRegexStringCache[locale])
        return dateRegexStringCache[locale];
    const monthNames = getMonthNames('long', locale);
    const shortMonthNames = getMonthNames('short', locale);
    const monthRegexDatePart = `(?:${[...monthNames, ...shortMonthNames].join('|')})`;
    const output = `((${monthRegexDatePart}) (\\d+))(?:\\w{2}|)`;
    dateRegexStringCache[locale] = output;
    return output;
}
/**
 * Looks for a date range in text and, if found, returns an object with start and end params as Temporal PlainDates
 * @param textToSearch
 * @param locale
 */
function date_findDateRange(textToSearch, locale = 'en-US') {
    const dateRegExString = getDateRegexString(locale);
    const searchRegex = new RegExp(`(${dateRegExString}).*(${dateRegExString})`, 'i');
    const dateRegex = new RegExp(dateRegExString, 'i');
    const matchRange = textToSearch.match(searchRegex);
    if (!matchRange)
        return null; //No date range found in syllabus
    let start, end;
    for (let separator of ['-', 'to']) {
        [start, end] = matchRange[0].split(separator);
        if (start && end)
            break;
    }
    if (!start || !end)
        throw new MalformedDateError('Cannot find date range in syllabus');
    const startMatch = start.match(dateRegex);
    const endMatch = end.match(dateRegex);
    if (!startMatch)
        throw new MalformedDateError(`Missing Start Date ${start}`);
    if (!endMatch)
        throw new MalformedDateError(`Missing End Date ${end}`);
    return {
        start: plainDateFromMonthDayString(startMatch[0], locale),
        end: plainDateFromMonthDayString(endMatch[0], locale)
    };
}
function date_oldDateToPlainDate(date) {
    const data = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
    return mr.PlainDate.from(data);
}
class StringNotAMonthDateError extends Error {
    constructor() {
        super(...arguments);
        this.name = "StringNotAMonthDateError";
    }
}
class MalformedDateError extends Error {
    constructor() {
        super(...arguments);
        this.name = "MalformedDateError";
    }
}

;// CONCATENATED MODULE: ./src/canvas/course/changeStartDate.ts


const DEFAULT_LOCALE = 'en-US';
function getCurrentStartDate(modules) {
    if (modules.length == 0)
        throw new NoOverviewModuleFoundError();
    const overviewModule = modules[0];
    const lockDateString = overviewModule.unlock_at;
    const oldDate = new Date(lockDateString);
    return date_oldDateToPlainDate(oldDate);
}
function sortAssignmentsByDueDate(assignments) {
    return assignments
        .toSorted((a, b) => {
        if (a.dueAt && b.dueAt) {
            return oldDateToPlainDate(b.dueAt).until(oldDateToPlainDate(a.dueAt)).days;
        }
        if (a.dueAt)
            return -1;
        if (b.dueAt)
            return 1;
        return 0;
    });
}
function getStartDateAssignments(assignments) {
    const sorted = sortAssignmentsByDueDate(assignments).filter(a => a.dueAt);
    if (sorted.length == 0)
        throw new NoAssignmentsWithDueDatesError();
    const firstAssignmentDue = sorted[0].dueAt;
    assert(firstAssignmentDue, "It should be literally impossible for this to happen with current type checking.");
    //Set to monday of that week.
    const plainDateDue = oldDateToPlainDate(firstAssignmentDue);
    const dayOfWeekOffset = 1 - plainDateDue.dayOfWeek;
    return plainDateDue.add({ days: dayOfWeekOffset });
}
function getUpdatedStyleTermName(termStart, weekCount, locale = DEFAULT_LOCALE) {
    const month = termStart.toLocaleString(locale, { month: '2-digit' });
    const day = termStart.toLocaleString(locale, { day: '2-digit' });
    const year = termStart.toLocaleString(locale, { year: '2-digit' });
    return `DE${weekCount}W${month}.${day}.${year}`;
}
function getOldUgTermName(termStart, locale = DEFAULT_LOCALE) {
    const year = termStart.toLocaleString(DEFAULT_LOCALE, { year: '2-digit' });
    const month = termStart.toLocaleString(DEFAULT_LOCALE, { month: 'short' });
    return `DE-${year}-${month}`;
}
function getNewTermName(oldTermName, newTermStart, locale = DEFAULT_LOCALE) {
    const [termName, weekCount] = oldTermName.match(/DE(\d)W\d\d\.\d\d\.\d\d/) || [];
    if (termName)
        return getUpdatedStyleTermName(newTermStart, weekCount);
    const termNameUg = oldTermName.match(/(DE(?:.HL|)-\d\d)-(\w+)\w{2}?/i);
    if (termNameUg)
        return getUpdatedStyleTermName(newTermStart, 5);
    throw new MalformedSyllabusError(`Can't Recognize Term Name ${oldTermName}`);
}
function updatedDateSyllabusHtml(html, newStartDate, locale = DEFAULT_LOCALE) {
    const syllabusBody = document.createElement('div');
    syllabusBody.innerHTML = html;
    const syllabusCalloutBox = syllabusBody.querySelector('div.cbt-callout-box');
    if (!syllabusCalloutBox)
        throw new MalformedSyllabusError("Can't find syllabus callout box");
    const paras = Array.from(syllabusCalloutBox.querySelectorAll('p'));
    const strongParas = paras.filter((para) => para.querySelector('strong'));
    if (strongParas.length < 5)
        throw new MalformedSyllabusError(`Missing syllabus headers\n${strongParas}`);
    const [_courseNameEl, termNameEl, datesEl, _instructorNameEl, _instructorContactInfoEl, _creditsEl] = strongParas;
    const changedText = [];
    const oldTermName = termNameEl.textContent || '';
    const oldDates = datesEl.textContent || '';
    const dateRange = findDateRange(datesEl.innerHTML, locale);
    if (!dateRange)
        throw new MalformedSyllabusError("Date range not found in syllabus");
    const courseDuration = dateRange.start.until(dateRange.end);
    const newEndDate = newStartDate.add(courseDuration);
    const newTermName = getNewTermName(oldTermName, newStartDate);
    const dateRangeText = `${dateToSyllabusString(newStartDate)} - ${dateToSyllabusString(newEndDate)}`;
    termNameEl.innerHTML = `<strong>${syllabusHeaderName(termNameEl)}:</strong><span> ${newTermName}</span>`;
    datesEl.innerHTML = `<strong>${syllabusHeaderName(datesEl)}:</strong><span> ${dateRangeText}</span>`;
    changedText.push(`${oldTermName} -> ${termNameEl.textContent}`);
    changedText.push(`${oldDates} -> ${datesEl.textContent}`);
    const output = {
        html: syllabusBody.innerHTML.replaceAll(/<p>\s*(&nbsp;)?<\/p>/ig, ''),
        changedText,
    };
    syllabusBody.remove();
    return output;
}
function dateToSyllabusString(date) {
    return `${date.toLocaleString(DEFAULT_LOCALE, { month: 'long', day: 'numeric' })}`;
}
function syllabusHeaderName(el) {
    const header = el.querySelector('strong');
    if (!header)
        return null;
    const html = header.innerHTML;
    return html.replace(/:$/, '');
}
class SyllabusUpdateError extends Error {
    constructor() {
        super(...arguments);
        this.name = "SyllabusUpdateError";
    }
}
class NoOverviewModuleFoundError extends Error {
    constructor() {
        super(...arguments);
        this.name = "NoOverviewModuleFoundError";
    }
}
class MalformedSyllabusError extends Error {
    constructor() {
        super(...arguments);
        this.name = "MalformedSyllabusError";
    }
}
class NoAssignmentsWithDueDatesError extends Error {
    constructor() {
        super(...arguments);
        this.name = "NoAssignmentsWithDueDatesError";
    }
}

;// CONCATENATED MODULE: ./src/canvas/course/modules.ts
var modules_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function changeModuleLockDate(courseId, module, targetDate) {
    return modules_awaiter(this, void 0, void 0, function* () {
        const payload = {
            module: {
                unlock_at: targetDate.toString()
            }
        };
        const url = `/api/v1/courses/${courseId}/modules/${module.id}`;
        const result = fetchJson(url, {
            fetchInit: {
                method: 'PUT',
                body: formDataify(payload)
            }
        });
    });
}
function getModuleOverview(module, courseId) {
    return modules_awaiter(this, void 0, void 0, function* () {
        let overview = module.items.find(item => item.type === "Page" &&
            item.title.toLowerCase().includes('overview'));
        if (!(overview === null || overview === void 0 ? void 0 : overview.url))
            return; //skip this if it's not an overview
        const url = overview.url.replace(/.*\/api\/v1/, '/api/v1');
        const pageData = yield fetch_fetchJson(url);
        return new Page(pageData, courseId);
    });
}
function getModuleWeekNumber(module) {
    const regex = /(week|module) (\d+)/i;
    let match = module.name.match(regex);
    let weekNumber = !match ? null : Number(match[1]);
    if (!weekNumber) {
        for (let moduleItem of module.items) {
            if (!moduleItem.hasOwnProperty('title')) {
                continue;
            }
            let match = moduleItem.title.match(regex);
            if (match) {
                weekNumber = match[2];
            }
        }
    }
    return weekNumber;
}
function getModulesByWeekNumber(modules) {
    return modules_awaiter(this, void 0, void 0, function* () {
        let modulesByWeekNumber = {};
        for (let module of modules) {
            let weekNumber = getModuleWeekNumber(module);
            if (weekNumber) {
                modulesByWeekNumber[weekNumber] = module;
            }
        }
        return modulesByWeekNumber;
    });
}

;// CONCATENATED MODULE: ./src/canvas/profile.ts
var profile_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



let facultyCourseCached;
function getFacultyCourse() {
    return profile_awaiter(this, void 0, void 0, function* () {
        const facultyCourse = facultyCourseCached !== null && facultyCourseCached !== void 0 ? facultyCourseCached : yield Course_Course.getByCode('Faculty Bios');
        facultyCourseCached = facultyCourse;
        assert_default()(facultyCourse);
        return facultyCourse;
    });
}
function getFacultyPages(searchTerm) {
    return profile_awaiter(this, void 0, void 0, function* () {
        const facultyCourse = yield getFacultyCourse();
        return yield facultyCourse.getPages({
            queryParams: {
                include: ['body'],
                search_term: searchTerm
            }
        });
    });
}
function getPotentialFacultyProfiles(user) {
    return profile_awaiter(this, void 0, void 0, function* () {
        var _a;
        let pages = [];
        const [lastName, firstName] = user.name.split(' ');
        for (let query of [
            user.name,
            lastName,
            firstName,
        ]) {
            console.log(query);
            pages = yield getFacultyPages(query);
            if (pages.length > 0)
                break;
        }
        let profiles = pages.map((page) => getProfileFromPage(page, user), true);
        if (profiles.length > 0) {
            for (let profile of profiles) {
                (_a = profile.displayName) !== null && _a !== void 0 ? _a : (profile.displayName = user.name);
            }
        }
        return profiles;
    });
}
function getProfileFromPage(page, user) {
    const profile = getProfileFromPageHtml(page.body, user);
    profile.sourcePage = page;
    return profile;
}
function getProfileFromPageHtml(html, user) {
    const el = document.createElement('div');
    el.innerHTML = html;
    const displayName = getDisplayName(el);
    const body = getProfileBody(el);
    const image = getImageLink(el);
    return {
        user,
        bio: body,
        displayName,
        image,
        imageLink: image === null || image === void 0 ? void 0 : image.src
    };
}
function getProfileBody(el) {
    const h4s = el.querySelectorAll('h4');
    const instructorHeaders = Array.from(h4s).filter((el) => {
        return el.innerHTML.search(/instructor/i);
    });
    let potentials = [];
    for (let header of instructorHeaders) {
        const potentialParent = header.parentElement;
        if (potentialParent) {
            header.remove();
            potentials.push(potentialParent.innerHTML);
        }
    }
    potentials = winnow(potentials, [
        (potential) => potential.length > 0,
    ]);
    /* just guess if we can't find anything */
    if (potentials.length > 0) {
        return potentials[0];
    }
    return null;
}
function getDisplayName(el) {
    let titles = Array.from(el.querySelectorAll('strong em'));
    if (titles.length === 0) {
        let enclosedImages = Array.from(el.querySelectorAll('p img'));
        titles = enclosedImages.map((el) => { var _a; return (_a = parentElement(el, 'p')) === null || _a === void 0 ? void 0 : _a.nextElementSibling; })
            .filter((el) => el instanceof Element);
    }
    if (titles.length === 0) {
        let headings = Array.from(el.querySelectorAll('p strong'));
        let instructorHeaders = headings.filter(el => el.innerHTML.search(/Instructor/));
        titles = instructorHeaders.map((el) => el.previousElementSibling)
            .filter((el) => el instanceof Element);
    }
    titles = titles.filter((title) => title.textContent && title.textContent.length > 0);
    if (titles.length > 0)
        return titles[0].textContent;
    return null;
}
/**
 * Finds all the image links in the content and returns the biggest.
 * @param el
 */
function getImageLink(el) {
    let imgs = el.querySelectorAll('img');
    if (imgs.length === 0)
        return null;
    return Array.from(imgs)[1];
}
/**
 * Takes in a list of parameters and a set of filter functions. Runs filter functions until there are one or fewer elements,
 * or it runs out of filter functions. Returns post-filtered list.
 * @param originalList The list of items to run
 * @param winnowFuncs A list of filter functions, run in order
 * @param returnLastNonEmpty If true, will return the last non-empty array found if elements are winnowed to 0
 */
function winnow(originalList, winnowFuncs, returnLastNonEmpty = false) {
    let copyList = [...originalList];
    if (copyList.length === 1)
        return copyList; //already at 1 element
    let lastSet = [...copyList];
    for (let winnowFunc of winnowFuncs) {
        lastSet = [...copyList];
        copyList = copyList.filter(winnowFunc);
        if (copyList.length === 1)
            break;
    }
    if (copyList.length === 0 && returnLastNonEmpty)
        return lastSet;
    return copyList;
}
function getCurioPageFrontPageProfile(html, user) {
    const el = document.createElement('div');
    el.innerHTML = html;
    const header = getCurioHeader(el);
    const match = header.innerHTML.match(/Meet your instructor, ?(.*)!/i);
    const displayName = match ? match[1] : null;
    const bio = getCurioBio(el);
    const image = getCurioProfileImage(el);
    return {
        user,
        displayName,
        image,
        imageLink: image ? image.src : null,
        bio: bio === null || bio === void 0 ? void 0 : bio.innerHTML
    };
}
function renderProfileIntoCurioFrontPage(html, profile) {
    const el = document.createElement('div');
    el.innerHTML = html;
    if (profile.displayName) {
        const header = getCurioHeader(el);
        header.innerHTML = `Meet your instructor, ${profile.displayName}!`;
    }
    if (profile.bio) {
        const bio = getCurioBio(el);
        if (bio) {
            const classes = bio.classList;
            if (!classes.contains('cbt-instructor-bio'))
                classes.add('cbt-instructor-bio');
            bio.innerHTML = profile.bio;
        }
    }
    if (profile.image) {
        const image = getCurioProfileImage(el);
        if (image) {
            image.src = profile.image.src;
            image.alt = profile.image.alt;
        }
    }
    else if (profile.imageLink) {
        const image = getCurioProfileImage(el);
        if (image) {
            image.src = profile.imageLink;
        }
    }
    return el.innerHTML;
}
function getCurioHeader(el) {
    let h2s = Array.from(el.querySelectorAll('h2'));
    h2s = h2s.filter((h2) => h2.innerHTML.match(/Meet your instructor/i));
    assert_default()(h2s.length === 1, "Can't find bio section of front page.");
    return h2s[0];
}
function getCurioProfileDiv(el) {
    const header = getCurioHeader(el);
    const sectionEl = header.nextElementSibling;
    assert_default()(sectionEl, "Body element of bio not found on page.");
    return sectionEl;
}
function getCurioBio(el) {
    const profileDiv = getCurioProfileDiv(el);
    let bio = profileDiv.querySelector('.cbt-instructor-bio');
    if (bio && bio.innerHTML)
        return bio;
    let div = getCurioProfileDiv(el);
    const p = div.querySelector('p');
    return p === null || p === void 0 ? void 0 : p.parentElement;
}
function getCurioProfileImage(el) {
    return getCurioProfileDiv(el).querySelector('img');
}


;// CONCATENATED MODULE: ./src/canvas/course/Course.ts
var Course_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














const HOMETILE_WIDTH = 500;
class Course_Course extends BaseCanvasObject {
    constructor(data) {
        super(data);
        this._modules = undefined;
        this.modulesByWeekNumber = undefined;
        this.cachedContent = [];
        this.isBlueprint = (() => isBlueprint(data));
        this.getAssociatedCourses = cachedGetAssociatedCoursesFunc(this);
    }
    static getFromUrl() {
        return Course_awaiter(this, arguments, void 0, function* (url = null) {
            if (url === null) {
                url = document.documentURI;
            }
            let match = /courses\/(\d+)/.exec(url);
            if (match) {
                const id = course_getCourseIdFromUrl(url);
                if (!id)
                    return null;
                return yield this.getCourseById(id);
            }
            return null;
        });
    }
    /**
     * Checks if a string looks like a course code
     * @param code
     */
    static stringIsCourseCode(code) {
        return this.CODE_REGEX.exec(code);
    }
    /**
     * Returns this library's class corresponding to the current url, drawing from Course.contentClasses.
     * Classes can be included in Course.contentClasses using the decorator @contentClass
     *
     * @param url
     */
    static getContentClassFromUrl(url = null) {
        if (!url)
            url = document.documentURI;
        for (let class_ of this.contentClasses) {
            if (class_.contentUrlPart && url.includes(class_.contentUrlPart))
                return class_;
        }
        return null;
    }
    static getCourseById(courseId_1) {
        return Course_awaiter(this, arguments, void 0, function* (courseId, config = undefined) {
            const data = yield getCourseData(courseId, config);
            return new Course_Course(data);
        });
    }
    /**
     * TODO: Replace this whole pipeline with something that returns a getApiPagesData generator instead.
     * @param code
     * @param term
     * @param config
     * @private
     */
    static getCoursesByString(code_1) {
        return Course_awaiter(this, arguments, void 0, function* (code, term = null, config = {}) {
            console.warn("Replace this with getCourseGenerator");
            let courseDataList = null;
            const accountIdsByName = yield Course_Course.getAccountIdsByName();
            for (let accountKey in accountIdsByName) {
                if (!accountKey)
                    continue;
                let accountId = accountIdsByName[accountKey];
                let url = `/api/v1/accounts/${accountId}/courses`;
                config.queryParams = config.queryParams || {};
                config.queryParams['search_term'] = code;
                if (term !== null) {
                    config.queryParams['enrollment_term_id'] = term.id;
                }
                courseDataList = yield getPagedData(url, config);
                if (courseDataList && courseDataList.length > 0) {
                    break;
                }
            }
            if (!courseDataList || courseDataList.length === 0) {
                return null;
            }
            if (courseDataList.length > 1) {
                courseDataList.sort((a, b) => b.id - a.id); // Sort courses by ID in descending order
            }
            return courseDataList.map(courseData => new Course_Course(courseData));
        });
    }
    static getAllByCode(code_1) {
        return Course_awaiter(this, arguments, void 0, function* (code, term = null, config = undefined) {
            return this.getCoursesByString(code, term, config);
        });
    }
    static getByCode(code_1) {
        return Course_awaiter(this, arguments, void 0, function* (code, term = null, config = undefined) {
            const courses = yield this.getCoursesByString(code, term, config);
            if (Array.isArray(courses))
                return courses[0];
        });
    }
    static getAccountIdsByName() {
        return Course_awaiter(this, void 0, void 0, function* () {
            let course = yield Course_Course.getFromUrl();
            if (!course) {
                console.warn("You must be on a canvas page to get accounts");
                return {};
            }
            return {
                'root': course.canvasData.root_account_id,
                'current': course.canvasData.account_id
            };
        });
    }
    static courseEvent(courses, event, accountId) {
        return Course_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/accounts/${accountId}/courses`;
            const data = {
                'event': event,
                'course_ids[]': courses.map(course => course.id)
            };
            return yield fetch_fetchJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: JSON.stringify(data)
                }
            });
        });
    }
    get contentUrlPath() {
        return `/api/v1/courses/${this.id}`;
    }
    get courseUrl() {
        return this.htmlContentUrl;
    }
    get htmlContentUrl() {
        return `/courses/${this.id}`;
    }
    get parsedCourseCode() {
        let match = this.codeMatch;
        if (!match)
            return null;
        let prefix = match[1] || "";
        let courseCode = match[2] || "";
        if (prefix.length > 0) {
            return `${prefix}_${courseCode}`;
        }
        return courseCode;
    }
    get courseCode() {
        return this.canvasData.course_code;
    }
    get codeMatch() {
        return Course_Course.CODE_REGEX.exec(this.canvasData.course_code);
    }
    get baseCode() {
        let match = this.codeMatch;
        return match ? match[2] : '';
    }
    get termId() {
        const id = this.canvasData.enrollment_term_id;
        if (typeof id === 'number')
            return id;
        else
            return id[0];
    }
    //comment for no reason for publish
    getTerm() {
        return Course_awaiter(this, void 0, void 0, function* () {
            assert_default()(typeof this.termId === 'number');
            if (this.termId)
                return Term.getTermById(this.termId);
            else
                return null;
        });
    }
    get fileUploadUrl() {
        return `/api/v1/courses/${this.id}/files`;
    }
    get codePrefix() {
        let match = this.codeMatch;
        return match ? match[1] : '';
    }
    get workflowState() {
        return this.canvasData.workflow_state;
    }
    get start() {
        return new Date(this.getItem('start_at'));
    }
    get isDev() {
        return !!this.name.match(/^DEV/);
    }
    get rootAccountId() {
        return this.canvasData.root_account_id;
    }
    get accountId() {
        return this.canvasData.account_id;
    }
    getModules(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            if (this._modules) {
                return this._modules;
            }
            config = validations_overrideConfig(config, {
                queryParams: {
                    include: ['items', 'content_details']
                }
            });
            let modules = yield getPagedData(`${this.contentUrlPath}/modules`, config);
            this._modules = modules;
            return modules;
        });
    }
    getStartDateFromModules() {
        return Course_awaiter(this, void 0, void 0, function* () {
            return getCurrentStartDate(yield this.getModules());
        });
    }
    getInstructors() {
        return Course_awaiter(this, void 0, void 0, function* () {
            return yield fetch_fetchJson(`/api/v1/courses/${this.id}/users?enrollment_type=teacher`);
        });
    }
    getLatePolicy(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            const latePolicyResult = yield fetch_fetchJson(`/api/v1/courses/${this.id}/late_policy`, config);
            if ('late_policy' in latePolicyResult)
                return latePolicyResult.late_policy;
            return undefined;
        });
    }
    getAvailableGradingStandards(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            let out = [];
            console.log(this.name);
            const { id, account_id, root_account_id } = this.canvasData;
            try {
                if (id) {
                    const courseGradingStandards = yield getGradingStandards(id, "course", config);
                    out = [...out, ...courseGradingStandards];
                }
                if (account_id) {
                    const accountGradingStandards = yield getGradingStandards(account_id, 'account', config);
                    out = [...out, ...accountGradingStandards];
                }
                if (root_account_id) {
                    const rootAccountGradingStandards = yield getGradingStandards(root_account_id, 'account', config);
                    out = [...out, ...rootAccountGradingStandards];
                }
            }
            catch (e) {
                console.warn(e);
            }
            return out.filter(filterUniqueFunc);
        });
    }
    getCurrentGradingStandard(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            const { grading_standard_id, account_id, root_account_id } = this.canvasData;
            const urls = [];
            if (grading_standard_id) {
                urls.push(`/api/v1/courses/${this.id}/grading_standards/${grading_standard_id}`);
                if (root_account_id)
                    urls.push(`/api/v1/accounts/${root_account_id}/grading_standards/${grading_standard_id}`);
                if (account_id)
                    urls.push(`/api/v1/accounts/${account_id}/grading_standards/${grading_standard_id}`);
            }
            const standards = (yield this.getAvailableGradingStandards(config)).filter(standard => standard.id === grading_standard_id);
            if (standards.length == 0)
                return null;
            return standards[0];
        });
    }
    getContentItemFromUrl() {
        return Course_awaiter(this, arguments, void 0, function* (url = null) {
            let ContentClass = Course_Course.getContentClassFromUrl(url);
            if (!ContentClass)
                return null;
            return ContentClass.getFromUrl(url);
        });
    }
    getModulesByWeekNumber(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            if (this.modulesByWeekNumber)
                return this.modulesByWeekNumber;
            let modules = yield this.getModules(config);
            this.modulesByWeekNumber = yield getModulesByWeekNumber(modules);
            return (this.modulesByWeekNumber);
        });
    }
    /**
     * Returns a list of links to items in a given module
     *
     * @param moduleOrWeekNumber
     * @param target An object specifying an item or items to look for
     * type - specifies the type,
     * search - a string to search for in titles. optional.
     * index - return the indexth one of these in the week (minus the intro in week 1, which should be index 0)
     * if none is specified, return all matches
     */
    getModuleItemLinks(moduleOrWeekNumber, target) {
        return Course_awaiter(this, void 0, void 0, function* () {
            assert_default()(target.hasOwnProperty('type'));
            let targetType = target.type;
            let contentSearchString = target.hasOwnProperty('search') ? target.search : null;
            let targetIndex = isNaN(target.index) ? null : target.index;
            let targetModuleWeekNumber;
            let targetModule;
            if (typeof moduleOrWeekNumber === 'number') {
                let modules = yield this.getModulesByWeekNumber();
                assert_default()(modules.hasOwnProperty(moduleOrWeekNumber));
                targetModuleWeekNumber = moduleOrWeekNumber;
                targetModule = modules[targetModuleWeekNumber];
            }
            else {
                targetModule = moduleOrWeekNumber;
                targetModuleWeekNumber = getModuleWeekNumber(targetModule);
            }
            const urls = [];
            if (targetModule && typeof targetType !== 'undefined') {
                //If it's a page, just search for the parameter string
                if (targetType === 'Page' && contentSearchString) {
                    let pages = yield this.getPages({
                        queryParams: { search_term: contentSearchString }
                    });
                    pages.forEach((page) => urls.push(page.htmlContentUrl));
                    //If it's anything else, get only those items in the module and set url to the targetIndexth one.
                }
                else if (targetType) {
                    //bump index for week 1 to account for intro discussion / checking for rubric would require pulling too much data
                    //and too much performance overhead
                    if (targetIndex && targetType === 'Discussion' && targetModuleWeekNumber === 1)
                        targetIndex++;
                    const matchingTypeItems = targetModule.items.filter((item) => item.type === targetType);
                    if (targetIndex && matchingTypeItems.length >= targetIndex) {
                        //We refer to and number the assignments indexed at 1, but the array is indexed at 0
                        const targetItem = matchingTypeItems[targetIndex - 1];
                        urls.push(targetItem.html_url);
                    }
                    else if (!targetIndex) {
                        for (let item of matchingTypeItems)
                            urls.push(item.html_url);
                    }
                }
            }
            return urls;
        });
    }
    getSyllabus() {
        return Course_awaiter(this, arguments, void 0, function* (config = { queryParams: {} }) {
            if (!this.canvasData.syllabus_body) {
                config.queryParams = Object.assign(Object.assign({}, config.queryParams), { include: ['syllabus_body'] });
                const data = yield Course_Course.getCourseById(this.id, config);
                assert_default()(data.canvasData.syllabus_body);
                this.canvasData.syllabus_body = data.canvasData.syllabus_body;
            }
            return this.canvasData.syllabus_body;
        });
    }
    /**
     * gets all assignments in a course
     * @returns {Promise<Assignment[]>}
     * @param config
     */
    getAssignments(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            console.warn('deprecated, use assignmentDataGen instead');
            config = validations_overrideConfig(config, { queryParams: { include: ['due_at'] } });
            const assignmentDatas = yield fetch_renderAsyncGen(assignmentDataGen({ courseId: this.id }, config));
            return (assignmentDatas.map(data => new Assignment(data, this.id)));
        });
    }
    getContent(config_1) {
        return Course_awaiter(this, arguments, void 0, function* (config, refresh = false) {
            if (refresh || this.cachedContent.length == 0) {
                let discussions = yield this.getDiscussions(config);
                let assignments = yield this.getAssignments(config);
                let quizzes = yield this.getQuizzes(config);
                let pages = yield this.getPages(config);
                this.cachedContent = [
                    ...discussions,
                    ...assignments,
                    ...quizzes,
                    ...pages
                ];
            }
            return this.cachedContent;
        });
    }
    getDiscussions(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            return yield Discussion.getAllInCourse(this.id, config);
        });
    }
    getAssignmentGroups(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            return yield getPagedData(`/api/v1/courses/${this.id}/assignment_groups`, config);
        });
    }
    getQuizzes(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            return yield Quiz.getAllInCourse(this.id, config);
        });
    }
    getSubsections() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/courses/${this.id}/sections`;
            return yield fetch_fetchJson(url);
        });
    }
    getTabs(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            return yield fetch_fetchJson(`/api/v1/courses/${this.id}/tabs`, config);
        });
    }
    getFrontPage() {
        return Course_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetch_fetchJson(`${this.contentUrlPath}/front_page`);
                return new Page(data, this.id);
            }
            catch (error) {
                return null;
            }
        });
    }
    getTab(label) {
        return this.canvasData.tabs.find((tab) => tab.label === label) || null;
    }
    reload() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const id = this.id;
            const reloaded = yield Course_Course.getCourseById(id);
            this.canvasData = reloaded.rawData;
        });
    }
    setNavigationTabHidden(label, value) {
        return Course_awaiter(this, void 0, void 0, function* () {
            const tab = this.getTab(label);
            if (!tab)
                return null;
            return yield fetch_fetchJson(`/api/v1/courses/${this.id}/tabs/${tab.id}`, {
                queryParams: { 'hidden': value }
            });
        });
    }
    changeSyllabus(newHtml) {
        return Course_awaiter(this, void 0, void 0, function* () {
            this.canvasData['syllabus_body'] = newHtml;
            return yield fetch_fetchJson(`/api/v1/courses/${this.id}`, {
                fetchInit: {
                    method: 'PUT',
                    body: canvasUtils_formDataify({
                        course: {
                            syllabus_body: newHtml
                        }
                    })
                }
            });
        });
    }
    resetCache() {
        //delete this.subsections;
        //delete this.associatedCourses;
    }
    static publishAll(courses, accountId) {
        return Course_awaiter(this, void 0, void 0, function* () {
            if (courses.length == 0)
                return false;
            const courseIds = courses.map((course) => {
                if (course instanceof Course_Course) {
                    return course.id;
                }
                return course;
            });
            const url = `/api/v1/accounts/${accountId}/courses`;
            const data = {
                'event': 'offer',
                'course_ids': courseIds,
            };
            return yield fetch_fetchJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: canvasUtils_formDataify(data),
                }
            });
        });
    }
    updateDueDates(offset) {
        return Course_awaiter(this, void 0, void 0, function* () {
            const promises = [];
            let assignments = yield this.getAssignments();
            if (offset === 0 || offset) {
                for (let assignment of assignments) {
                    console.log(assignment);
                    promises.push(assignment.dueAtTimeDelta(Number(offset)));
                }
            }
            yield Promise.all(promises);
            return [...assignments];
        });
    }
    publish() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/courses/${this.id}`;
            const courseData = yield fetch_fetchJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: canvasUtils_formDataify({ 'offer': true })
                }
            });
            console.log(courseData);
            this.canvasData = courseData;
        });
    }
    unpublish() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/courses/${this.id}`;
            yield fetch_fetchJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: JSON.stringify({ 'course[event]': 'claim' })
                }
            });
            this.canvasData = Object.assign({}, (yield Course_Course.getCourseById(this.id)).canvasData);
        });
    }
    reset() {
        return Course_awaiter(this, arguments, void 0, function* (prompt = true) {
            if (prompt && !confirm(`Are you sure you want to reset ${this.parsedCourseCode}?`)) {
                return false;
            }
            const url = `/api/v1/courses/${this.id}/reset_content`;
            const data = yield fetch_fetchJson(url, { fetchInit: { method: 'POST' } });
            this.canvasData['id'] = data.id;
            return false;
        });
    }
    /**
     * NOT IMPLEMENTED
     * @param prompt Either a boolean or an async function that takes in a source and destination course and returns a boolean
     * @param updateCallback
     */
    importDevCourse() {
        return Course_awaiter(this, arguments, void 0, function* (prompt = false, updateCallback) {
            const devCourse = yield this.getParentCourse();
            if (!devCourse) {
                throw new CourseNotFoundException(`DEV not found for ${this.name}.`);
            }
            if (prompt) {
                const canContinue = yield prompt(devCourse, this);
                if (!canContinue)
                    return;
            }
            yield this.importCourse(devCourse, updateCallback);
        });
    }
    importCourse(course, updateCallback) {
        return Course_awaiter(this, void 0, void 0, function* () {
            throw new NotImplementedException();
        });
    }
    getParentCourse() {
        return Course_awaiter(this, arguments, void 0, function* (return_dev_search = false) {
            let migrations = yield getPagedData(`/api/v1/courses/${this.id}/content_migrations`);
            if (migrations.length < 1) {
                console.log('no migrations found');
                if (return_dev_search) {
                    return Course_Course.getByCode('DEV_' + this.baseCode);
                }
                else
                    return;
            }
            migrations.sort((a, b) => b.id - a.id);
            try {
                for (let migration of migrations) {
                    let course = yield Course_Course.getCourseById(migration['settings']['source_course_id']);
                    if (course && course.codePrefix.includes("DEV"))
                        return course;
                }
            }
            catch (e) {
                return yield Course_Course.getByCode('DEV_' + this.baseCode);
            }
            return yield Course_Course.getByCode('DEV_' + this.baseCode);
        });
    }
    regenerateHomeTiles() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const modules = yield this.getModules();
            let urls = yield Promise.all(modules.map((module) => Course_awaiter(this, void 0, void 0, function* () {
                try {
                    let dataUrl = yield this.generateHomeTile(module);
                }
                catch (e) {
                    console.log(e);
                }
            })));
            console.log('done');
        });
    }
    generateHomeTile(module) {
        return Course_awaiter(this, void 0, void 0, function* () {
            const overviewPage = yield getModuleOverview(module, this.id);
            if (!overviewPage)
                throw new Error("Module does not have an overview");
            const bannerImg = getBannerImage(overviewPage);
            if (!bannerImg)
                throw new Error("No banner image on page");
            let resizedImageBlob = yield getResizedBlob(bannerImg.src, HOMETILE_WIDTH);
            let fileName = `hometile${module.position}.png`;
            assert_default()(resizedImageBlob);
            let file = new File([resizedImageBlob], fileName);
            return yield uploadFile(file, 'Images/hometile', this.fileUploadUrl);
        });
    }
    getPages(config = null) {
        return Page.getAllInCourse(this.id, config);
    }
    getFrontPageProfile() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const frontPage = yield this.getFrontPage();
            assert_default()(frontPage && frontPage.body, "Course front page not found");
            const frontPageProfile = getCurioPageFrontPageProfile(frontPage === null || frontPage === void 0 ? void 0 : frontPage.body);
            frontPageProfile.sourcePage = frontPage;
            return frontPageProfile;
        });
    }
    getPotentialInstructorProfiles() {
        return Course_awaiter(this, void 0, void 0, function* () {
            const instructors = yield this.getInstructors();
            let profiles = [];
            if (!instructors)
                return profiles;
            for (let instructor of instructors) {
                profiles = profiles.concat(yield getPotentialFacultyProfiles(instructor));
            }
            return profiles;
        });
    }
    getSettings(config) {
        return Course_awaiter(this, void 0, void 0, function* () {
            return yield fetch_fetchJson(`/api/v1/courses/${this.id}/settings`, config);
        });
    }
}
Course_Course.CODE_REGEX = /^(.+[^_])?_?(\w{4}\d{3})/i; // Adapted to JavaScript's regex syntax.
Course_Course.nameProperty = 'name';
Course_Course.contentClasses = [Assignment, Discussion, Quiz, Page];
function saveCourseData(courseId, data, config) {
    return Course_awaiter(this, void 0, void 0, function* () {
        const url = `/api/v1/courses/${courseId}`;
        return yield fetchJson(url, overrideConfig(config, {
            fetchInit: {
                method: 'PUT',
                body: formDataify({ course: data })
            }
        }));
    });
}
function setGradingStandardForCourse(courseId, standardId, config) {
    return Course_awaiter(this, void 0, void 0, function* () {
        return yield saveCourseData(courseId, { grading_standard_id: standardId });
    });
}

;// CONCATENATED MODULE: ./src/ui/course/index.tsx
var ui_course_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





(() => ui_course_awaiter(void 0, void 0, void 0, function* () {
    const currentCourse = yield Course_Course.getFromUrl(document.documentURI);
    let CurrentContentClass = Course_Course.getContentClassFromUrl();
    let currentContentItem = yield (CurrentContentClass === null || CurrentContentClass === void 0 ? void 0 : CurrentContentClass.getFromUrl());
    if (!CurrentContentClass && /courses\/\d+/.test(document.URL)) {
        currentContentItem = yield (currentCourse === null || currentCourse === void 0 ? void 0 : currentCourse.getFrontPage());
    }
    if (!currentCourse)
        return;
    let header = document.querySelector('.right-of-crumbs');
    if (!header)
        return;
    let bp;
    if (currentCourse.isBlueprint()) {
        yield addDevButton(header, currentCourse);
        yield addSectionsButton(header, currentCourse);
    }
    else {
        bp = yield Course_Course.getByCode(`BP_${currentCourse.baseCode}`);
        if (bp) {
            yield addBpButton(header, bp, currentCourse);
            yield addSectionsButton(header, bp, currentCourse);
        }
    }
    if (currentContentItem) {
        yield addOpenAllLinksButton(header, currentContentItem);
        addHighlightBigImageResizer(currentContentItem);
    }
    const homeTileHost = document.querySelector('#Modules-anchor');
    if (homeTileHost) {
        console.log(homeTileHost);
        const buttonHolder = document.createElement('div');
        homeTileHost.append(buttonHolder);
        addHomeTileButton(buttonHolder, currentCourse);
    }
}))();
function addHomeTileButton(el, course) {
    const root = document.createElement("div");
    const rootDiv = client.createRoot(root);
    rootDiv.render((0,jsx_runtime.jsx)(HomeTileApp, { el: el, course: course }));
    document.body.append(root);
}
function openThisContentInTarget(currentCourse, target) {
    return ui_course_awaiter(this, void 0, void 0, function* () {
        if (!window)
            return;
        let currentContentItem = yield currentCourse.getContentItemFromUrl();
        let targetCourses = Array.isArray(target) ? target : [target];
        let targetInfos = targetCourses.map((targetCourse) => {
            return {
                course: targetCourse,
                contentItemPromise: currentContentItem === null || currentContentItem === void 0 ? void 0 : currentContentItem.getMeInAnotherCourse(targetCourse.id)
            };
        });
        for (let { course, contentItemPromise } of targetInfos) {
            let targetContentItem = yield contentItemPromise;
            if (targetContentItem) {
                window.open(targetContentItem.htmlContentUrl);
            }
            else {
                let url = document.URL.replace(currentCourse.id.toString(), course.id.toString());
                window.open(url);
            }
        }
    });
}
function addSectionsButton(header_1, bp_1) {
    return ui_course_awaiter(this, arguments, void 0, function* (header, bp, currentCourse = null) {
        const sourceCourse = currentCourse !== null && currentCourse !== void 0 ? currentCourse : bp;
        let sectionBtn = document.createElement('btn');
        sectionBtn.classList.add('btn');
        sectionBtn.innerHTML = "Sections";
        sectionBtn.title = "Open all sections associated with the current BP for this course.";
        const sections = yield bp.getAssociatedCourses();
        if (!sections)
            return;
        header.append(sectionBtn);
        sectionBtn.addEventListener('click', () => ui_course_awaiter(this, void 0, void 0, function* () { return yield openThisContentInTarget(sourceCourse, sections); }));
    });
}
function addDevButton(header, course) {
    return ui_course_awaiter(this, void 0, void 0, function* () {
        const parentCourse = yield course.getParentCourse();
        if (parentCourse) {
            let parentBtn = document.createElement('btn');
            parentBtn.classList.add('btn');
            parentBtn.innerHTML = "DEV";
            parentBtn.title = "Open the dev version of this course";
            header === null || header === void 0 ? void 0 : header.append(parentBtn);
            parentBtn.addEventListener('click', () => ui_course_awaiter(this, void 0, void 0, function* () { return yield openThisContentInTarget(course, parentCourse); }));
        }
    });
}
function addBpButton(header, bp, currentCourse) {
    return ui_course_awaiter(this, void 0, void 0, function* () {
        let bpBtn = document.createElement('btn');
        bpBtn.classList.add('btn');
        bpBtn.innerHTML = "BP";
        bpBtn.title = "Open the blueprint version of this course";
        header.append(bpBtn);
        bpBtn.addEventListener('click', () => ui_course_awaiter(this, void 0, void 0, function* () { return yield openThisContentInTarget(currentCourse, bp); }));
    });
}
function addOpenAllLinksButton(header, currentContentItem) {
    return ui_course_awaiter(this, void 0, void 0, function* () {
        let btn = document.createElement('btn');
        btn.classList.add('btn');
        btn.innerHTML = "Links";
        btn.title = "Open all links in the content of this page into their own tabs.";
        header.append(btn);
        if (!currentContentItem)
            return;
        btn.addEventListener('click', () => openAllLinksInContent(currentContentItem));
    });
}
function openAllLinksInContent(contentItem) {
    const urls = new Set(contentItem.getAllLinks());
    for (let url of urls)
        window.open(url, "_blank");
}
function addHighlightBigImageResizer(currentContentItem) {
    var _a;
    const bannerImageContainer = document.querySelector('div.cbt-banner-image');
    console.log(bannerImageContainer);
    if (!bannerImageContainer)
        return;
    const image = bannerImageContainer.querySelector('img');
    console.log(image === null || image === void 0 ? void 0 : image.naturalWidth);
    if (!image)
        return;
    if (image.naturalWidth > 2000) {
        const notification = document.createElement('div');
        (_a = bannerImageContainer.parentElement) === null || _a === void 0 ? void 0 : _a.append(notification);
        const root = document.createElement("div");
        const rootDiv = client.createRoot(root);
        rootDiv.render((0,jsx_runtime.jsx)(HighlightBigImages, { el: notification, bannerImage: image, currentContentItem: currentContentItem, resizeTo: 1200 }));
        document.body.append(root);
    }
}

})();

/******/ })()
;
//# sourceMappingURL=course.js.map