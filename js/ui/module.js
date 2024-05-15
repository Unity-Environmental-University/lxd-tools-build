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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/assert/build/assert.js
var build_assert = __webpack_require__(4148);
var assert_default = /*#__PURE__*/__webpack_require__.n(build_assert);
;// CONCATENATED MODULE: ./src/canvas/canvasUtils.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
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

function callAll(funcs, params) {
    const output = [];
    function isWithParamsFunc(func) {
        return typeof func === 'function' && func.length > 0;
    }
    function isWithoutParamsFunc(func) {
        return typeof func === 'function' && func.length === 0;
    }
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
            continue;
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
function formDataify(data) {
    let formData = new FormData();
    for (let key in data) {
        addToFormData(formData, key, data[key]);
    }
    if (document) {
        const el = document.querySelector("input[name='authenticity_token']");
        const authenticityToken = el ? el.value : null;
        if (authenticityToken)
            formData.append('authenticity_token', authenticityToken);
    }
    return formData;
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
        formData.append(key, value.toString());
    }
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
/**
 * Takes in a module item and returns an object specifying its type and content id
 * @param item
 */
function getItemTypeAndId(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let id;
        let type;
        assert_default()(type_lut.hasOwnProperty(item.type), "Unexpected type " + item.type);
        type = type_lut[item.type];
        if (type === "wiki_page") {
            assert_default()(item.url); //wiki_page items always have a url param
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
    return new URLSearchParams(queryParams);
}
function getApiPagedData(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, config = null) {
        return yield getPagedData(`/api/v1/${url}`, config);
    });
}
/**
 * @param url The entire path of the url
 * @param config a configuration object of type ICanvasCallConfig
 * @returns {Promise<Record<string, any>[]>}
 */
function getPagedData(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, config = null) {
        var _a, e_1, _b, _c;
        const generator = getPagedDataGenerator(url, config);
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
function getPagedDataGenerator(url_1) {
    return __asyncGenerator(this, arguments, function* getPagedDataGenerator_1(url, config = null) {
        if (config === null || config === void 0 ? void 0 : config.queryParams) {
            url += '?' + searchParamsFromObject(config.queryParams);
        }
        if (url.includes('undefined')) {
            console.log(url);
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
        assert_default()(Array.isArray(data));
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
                if (typeof responseData === 'object' && !Array.isArray(data)) {
                    let values = Array.from(Object.values(data));
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
        return yield __await(data);
    });
}
function fetchJson(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, config = null) {
        var _a;
        if (config === null || config === void 0 ? void 0 : config.queryParams) {
            url += '?' + new URLSearchParams(config.queryParams);
        }
        config !== null && config !== void 0 ? config : (config = {});
        if (!document) {
            (_a = config.fetchInit) !== null && _a !== void 0 ? _a : (config.fetchInit = {});
            config.fetchInit.headers = [];
        }
        const response = yield fetch(url, config.fetchInit);
        return yield response.json();
    });
}
/**
 * Fetches a json object from /api/v1/${url}
 * @param url
 * @param config query and fetch params
 */
function fetchApiJson(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, config = null) {
        url = `/api/v1/${url}`;
        return yield fetchJson(url, config);
    });
}
function fetchOneKnownApiJson(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, config = null) {
        let result = yield fetchApiJson(url, config);
        assert_default()(result);
        if (Array.isArray(result))
            return result[0];
        return result;
    });
}
function fetchOneUnknownApiJson(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, config = null) {
        let result = yield fetchApiJson(url, config);
        if (!result)
            return null;
        if (Array.isArray(result) && result.length > 0)
            return result[0];
        return result;
    });
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
function* canvasUtils_range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
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
    constructor(data) {
        this.accountId = null;
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
        return constructor.contentUrlTemplate
            .replace('{content_id}', this.id.toString())
            .replace('{account_id}', this.accountId.toString());
    }
    get htmlContentUrl() {
        return `/${this.contentUrlPath}`;
    }
    get data() {
        return this.canvasData;
    }
    static getDataById(contentId_1) {
        return baseCanvasObject_awaiter(this, arguments, void 0, function* (contentId, courseId = null, config = null) {
            let url = this.getUrlPathFromIds(contentId, courseId);
            const response = yield fetchApiJson(url, config);
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
     *
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
            let data = yield getApiPagedData(url, config);
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
    saveData(data) {
        return baseCanvasObject_awaiter(this, void 0, void 0, function* () {
            assert_default()(this.contentUrlPath);
            return yield fetchApiJson(this.contentUrlPath, {
                fetchInit: {
                    method: 'PUT',
                    body: formDataify(data)
                }
            });
        });
    }
}
BaseCanvasObject.idProperty = 'id'; // The field name of the id of the canvas object type
BaseCanvasObject.nameProperty = 'name'; // The field name of the primary name of the canvas object type
BaseCanvasObject.contentUrlTemplate = null; // A templated url to get a single item
BaseCanvasObject.allContentUrlTemplate = null; // A templated url to get all items

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

function capitalize(e) {
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
  return requireNumberIsInteger(Ni(e));
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
  return clampProp(e, "isoYear", Wi, Li, 1), e.isoYear === Wi ? clampProp(e, "isoMonth", 4, 12, 1) : e.isoYear === Li && clampProp(e, "isoMonth", 1, 9, 1), 
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
  const n = clampProp(e, "isoYear", Wi, Li, 1), t = n === Wi ? 1 : n === Li ? -1 : 0;
  return t && checkEpochNanoInBounds(isoToEpochNano({
    ...e,
    isoDay: e.isoDay + t,
    isoNanosecond: e.isoNanosecond - t
  })), e;
}

function checkEpochNanoInBounds(e) {
  if (!e || bigNanoOutside(e, Ui, Ai)) {
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
  const s = e === Wi ? 1 : e === Li ? -1 : 0, c = new Date;
  return c.setUTCHours(o, r, i, a), c.setUTCFullYear(e, n - 1, t + s), [ c, s ];
}

function Ie(e, n) {
  let [t, o] = moveBigNano(e, n);
  o < 0 && (o += Qr, t -= 1);
  const [r, i] = divModFloor(o, internal_be), [a, s] = divModFloor(i, Vr);
  return epochMilliToIso(t * Gr + r, a, s);
}

function epochMilliToIso(e, n = 0, t = 0) {
  const o = Math.ceil(Math.max(0, Math.abs(e) - qi) / Gr) * Math.sign(e), r = new Date(e - o * Gr);
  return zipProps(Bi, [ r.getUTCFullYear(), r.getUTCMonth() + 1, r.getUTCDate() + o, r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds(), r.getUTCMilliseconds(), n, t ]);
}

function computeIsoDateParts(e) {
  return [ e.isoYear, e.isoMonth, e.isoDay ];
}

function computeIsoMonthsInYear() {
  return $i;
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
  if (n < Gi) {
    return computeGregoryEraParts(e);
  }
  const t = hashIntlFormatParts(Wa(Ti), n), {era: o, eraYear: r} = parseIntlYear(t, Ti);
  return [ o, r ];
}

function checkIsoDateTimeFields(e) {
  return checkIsoDateFields(e), constrainIsoTimeFields(e, 1), e;
}

function checkIsoDateFields(e) {
  return constrainIsoDateFields(e, 1), e;
}

function isIsoDateFieldsValid(e) {
  return allPropsEqual(wi, e, constrainIsoDateFields(e));
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
  return void 0 === e ? 0 : la(de(e));
}

function wn(e, n = 0) {
  e = normalizeOptions(e);
  const t = fa(e), o = da(e, n);
  return [ la(e), o, t ];
}

function ve(e) {
  return fa(normalizeOptions(e));
}

function _t(e) {
  return e = normalizeOptions(e), ca(e, 9, 6, 1);
}

function refineDiffOptions(e, n, t, o = 9, r = 0, i = 4) {
  n = normalizeOptions(n);
  let a = ca(n, o, r), s = parseRoundingIncInteger(n), c = ga(n, i);
  const u = sa(n, o, r, 1);
  return null == a ? a = Math.max(t, u) : checkLargestSmallestUnit(a, u), s = refineRoundingInc(s, u, 1), 
  e && (c = (e => e < 4 ? (e + 2) % 4 : e)(c)), [ a, u, s, c ];
}

function refineRoundingOptions(e, n = 6, t) {
  let o = parseRoundingIncInteger(e = normalizeOptionsOrString(e, Vi));
  const r = ga(e, 7);
  let i = sa(e, n);
  return i = requirePropDefined(Vi, i), o = refineRoundingInc(o, i, void 0, t), [ i, o, r ];
}

function refineDateDisplayOptions(e) {
  return ma(normalizeOptions(e));
}

function refineTimeDisplayOptions(e, n) {
  return refineTimeDisplayTuple(normalizeOptions(e), n);
}

function refineTimeDisplayTuple(e, n = 4) {
  const t = refineSubsecDigits(e);
  return [ ga(e, 4), ...refineSmallestUnitAndSubsecDigits(sa(e, n), t) ];
}

function refineSmallestUnitAndSubsecDigits(e, n) {
  return null != e ? [ Xr[e], e < 4 ? 9 - 3 * e : -1 ] : [ void 0 === n ? 1 : 10 ** (9 - n), n ];
}

function parseRoundingIncInteger(e) {
  const n = e[Ji];
  return void 0 === n ? 1 : toInteger(n, Ji);
}

function refineRoundingInc(e, n, t, o) {
  const r = o ? Qr : Xr[n + 1];
  if (r) {
    const t = Xr[n];
    if (r % ((e = clampEntity(Ji, e, 1, r / t - (o ? 0 : 1), 1)) * t)) {
      throw new RangeError(invalidEntity(Ji, e));
    }
  } else {
    e = clampEntity(Ji, e, 1, t ? 10 ** 9 : 1, 1);
  }
  return e;
}

function refineSubsecDigits(e) {
  let n = e[Ki];
  if (void 0 !== n) {
    if ("number" != typeof n) {
      if ("auto" === internal_toString(n)) {
        return;
      }
      throw new RangeError(invalidEntity(Ki, n));
    }
    n = clampEntity(Ki, Math.floor(n), 0, 9, 1);
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
    overflow: ea[n]
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
  if (void 0 === a && (a = Si[i]), void 0 === a) {
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
    throw new RangeError(Ur);
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
    ...Vn(Ci, e)
  };
}

function v(e, n = e.calendar) {
  return {
    branding: J,
    calendar: n,
    ...Vn(ki, e)
  };
}

function createPlainYearMonthSlots(e, n = e.calendar) {
  return {
    branding: L,
    calendar: n,
    ...Vn(ki, e)
  };
}

function createPlainMonthDaySlots(e, n = e.calendar) {
  return {
    branding: q,
    calendar: n,
    ...Vn(ki, e)
  };
}

function Ge(e) {
  return {
    branding: xe,
    ...Vn(Yi, e)
  };
}

function Vt(e) {
  return {
    branding: qt,
    sign: computeDurationSign(e),
    ...Vn(yi, e)
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
  const i = getLargestDurationUnit(o), [a, s] = ((e, n) => {
    const t = n((e = normalizeOptionsOrString(e, _i))[Qi]);
    let o = ua(e);
    return o = requirePropDefined(_i, o), [ o, t ];
  })(r, e);
  if (isUniformUnit(Math.max(a, i), s)) {
    return ((e, n) => oe(durationFieldsToBigNano(e), Xr[n], 1))(o, a);
  }
  if (!s) {
    throw new RangeError(zr);
  }
  const [c, u, l] = createMarkerSystem(n, t, s), f = createMarkerToEpochNano(l), d = createMoveMarker(u, l);
  return ((e, n, t, o, r, i) => {
    const a = computeDurationSign(e), [s, c] = clampRelativeDuration(Oi(t, e), t, a, o, r, i), u = computeEpochNanoFrac(n, s, c);
    return e[F[t]] + u * a;
  })(...spanDuration(o, a, c, f, d, createDiffMarkers(u, l)), a, c, f, d);
}

function clampRelativeDuration(e, n, t, o, r, i) {
  const a = {
    ...Fi,
    [F[n]]: t
  }, s = i(o, e), c = i(s, a);
  return [ r(s), r(c) ];
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
  return Zi(6, e);
}

function roundDayTimeDurationByInc(e, n, t) {
  const o = Math.min(getLargestDurationUnit(e), 6);
  return nanoToDurationDayTimeFields(roundBigNanoByInc(durationFieldsToBigNano(e, o), n, t), o);
}

function roundRelativeDuration(e, n, t, o, r, i, a, s, c) {
  if (0 === o && 1 === r) {
    return e;
  }
  const u = o > 6 ? nudgeRelativeDuration : isZonedEpochSlots(a) && o < 6 ? nudgeZonedTimeDuration : nudgeDayTimeDuration;
  let [l, f, d] = u(e, n, t, o, r, i, a, s, c);
  return d && (l = ((e, n, t, o, r, i, a) => {
    const s = computeDurationSign(e);
    for (let c = o + 1; c <= t; c++) {
      if (7 === c && 7 !== t) {
        continue;
      }
      const o = Oi(c, e);
      o[F[c]] += s;
      const u = oe(re(i(a(r, o)), n));
      if (u && Math.sign(u) !== s) {
        break;
      }
      e = o;
    }
    return e;
  })(l, f, t, Math.max(6, o), a, s, c)), l;
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
  return Ta[n](e);
}

function nudgeDayTimeDuration(e, n, t, o, r, i) {
  const a = computeDurationSign(e), s = durationFieldsToBigNano(e), c = roundBigNano(s, o, r, i), u = re(s, c), l = Math.sign(c[0] - s[0]) === a, f = nanoToDurationDayTimeFields(c, Math.min(t, 6));
  return [ {
    ...e,
    ...f
  }, addBigNanos(n, u), l ];
}

function nudgeZonedTimeDuration(e, n, t, o, r, i, a, s, c) {
  const u = computeDurationSign(e);
  let [l, f] = durationFieldsToBigNano(e, 5);
  const d = computeNanoInc(o, r);
  let m = roundByInc(f, d, i);
  const [p, h] = clampRelativeDuration({
    ...e,
    ...bi
  }, 6, u, a, s, c), g = m - oe(re(p, h));
  g && Math.sign(g) !== u ? n = moveBigNano(p, m) : (l += u, m = roundByInc(g, d, i), 
  n = moveBigNano(h, m));
  const T = nanoToDurationTimeFields(m);
  return [ {
    ...e,
    ...T,
    days: e.days + l
  }, n, Boolean(l) ];
}

function nudgeRelativeDuration(e, n, t, o, r, i, a, s, c) {
  const u = computeDurationSign(e), l = F[o], f = Oi(o, e), d = divTrunc(e[l], r) * r;
  f[l] = d;
  const [m, p] = clampRelativeDuration(f, o, r * u, a, s, c), h = d + computeEpochNanoFrac(n, m, p) * u * r, g = roundByInc(h, r, i), T = Math.sign(g - h) === u;
  return f[l] = g, [ f, T ? p : m, T ];
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
  })(c, n(c ? e(r) : Da), t.epochNanoseconds, i, a, s);
}

function In(e, n, t) {
  const [o, r, i, a, s, c] = (e => {
    e = normalizeOptions(e);
    const n = ma(e), t = refineSubsecDigits(e), o = ha(e), r = ga(e, 4), i = sa(e, 4);
    return [ n, pa(e), o, r, ...refineSmallestUnitAndSubsecDigits(i, t) ];
  })(t);
  return ((e, n, t, o, r, i, a, s, c, u) => {
    o = roundBigNanoByInc(o, c, s, 1);
    const l = e(t).getOffsetNanosecondsFor(o);
    return formatIsoDateTimeFields(Ie(o, l), u) + Fe(roundToMinute(l), a) + ((e, n) => 1 !== n ? "[" + (2 === n ? "!" : "") + I(e) + "]" : "")(t, i) + formatCalendar(n, r);
  })(e, n.calendar, n.timeZone, n.epochNanoseconds, o, r, i, a, s, c);
}

function Tt(e, n) {
  const [t, o, r, i] = (e => (e = normalizeOptions(e), [ ma(e), ...refineTimeDisplayTuple(e) ]))(n);
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
  return t = void 0 === n ? t.replace(ya, "") : t.slice(0, n), t ? "." + t : "";
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
    ...Vn(Ci, t),
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
    ...moveZonedEpochs(s, a, o, t ? negateDurationFields(r) : r, i)
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
    ...Fi,
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
    const s = fn(t, n);
    a = addBigNanos(we(n, {
      ...moveDate(e, s, {
        ...o,
        ...bi
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
      ...bi,
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

function createMoveMarker(e, n) {
  return n ? E(moveZonedEpochs, e, n) : E(moveDateTime, e);
}

function createDiffMarkers(e, n) {
  return n ? E(diffZonedEpochsExact, e, n) : E(diffDateTimesExact, e);
}

function isZonedEpochSlots(e) {
  return e && e.epochNanoseconds;
}

function isUniformUnit(e, n) {
  return e <= 6 - (isZonedEpochSlots(n) ? 1 : 0);
}

function spanDuration(e, n, t, o, r, i) {
  const a = r(t, e);
  return [ i(t, a, n), o(a) ];
}

function Wt(e, n, t, o, r, i, a) {
  const s = e(normalizeOptions(a).relativeTo), c = Math.max(getLargestDurationUnit(r), getLargestDurationUnit(i));
  if (isUniformUnit(c, s)) {
    return Vt(checkDurationUnits(((e, n, t, o) => {
      const r = addBigNanos(durationFieldsToBigNano(e), durationFieldsToBigNano(n), o ? -1 : 1);
      if (!Number.isFinite(r[0])) {
        throw new RangeError(Cr);
      }
      return {
        ...Fi,
        ...nanoToDurationDayTimeFields(r, t)
      };
    })(r, i, c, o)));
  }
  if (!s) {
    throw new RangeError(zr);
  }
  o && (i = negateDurationFields(i));
  const [u, l, f] = createMarkerSystem(n, t, s), d = createMoveMarker(l, f), m = createDiffMarkers(l, f), p = d(u, r);
  return Vt(m(u, d(p, i), c));
}

function Gt(e, n, t, o, r) {
  const i = getLargestDurationUnit(o), [a, s, c, u, l] = ((e, n, t) => {
    e = normalizeOptionsOrString(e, Vi);
    let o = ca(e);
    const r = t(e[Qi]);
    let i = parseRoundingIncInteger(e);
    const a = ga(e, 7);
    let s = sa(e);
    if (void 0 === o && void 0 === s) {
      throw new RangeError(Ar);
    }
    return null == s && (s = 0), null == o && (o = Math.max(s, n)), checkLargestSmallestUnit(o, s), 
    i = refineRoundingInc(i, s, 1), [ o, s, i, a, r ];
  })(r, i, e);
  if (isUniformUnit(Math.max(i, a), l)) {
    return Vt(checkDurationUnits(((e, n, t, o, r) => {
      const i = roundBigNano(durationFieldsToBigNano(e), t, o, r);
      return {
        ...Fi,
        ...nanoToDurationDayTimeFields(i, n)
      };
    })(o, a, s, c, u)));
  }
  if (!l) {
    throw new RangeError(zr);
  }
  const [f, d, m] = createMarkerSystem(n, t, l), p = createMarkerToEpochNano(m), h = createMoveMarker(d, m), g = createDiffMarkers(d, m);
  let T = 0;
  o.weeks && 7 === s && (T = o.weeks, o = {
    ...o,
    weeks: 0
  });
  let [D, I] = spanDuration(o, a, f, p, h, g);
  const M = o.sign, N = computeDurationSign(D);
  if (M && N && M !== N) {
    throw new RangeError(vr);
  }
  return N && (D = roundRelativeDuration(D, I, a, s, c, u, f, p, h)), D.weeks += T, 
  Vt(D);
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
  for (const n of Ei) {
    clampEntity(n, e[n], -Pa, Pa, 1);
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
  return Boolean(computeDurationSign(e, vi));
}

function getLargestDurationUnit(e) {
  let n = 9;
  for (;n > 0 && !e[F[n]]; n--) {}
  return n;
}

function createSplitTuple(e, n) {
  return [ e, n ];
}

function computePeriod(e) {
  const n = Math.floor(e / Ia) * Ia;
  return [ n, n + Ia ];
}

function pe(e) {
  const n = parseDateTimeLike(e = toStringViaPrimitive(e));
  if (!n) {
    throw new RangeError(failedParse(e));
  }
  let t;
  if (n.O) {
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
  if (n.O) {
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
  if (!n || n.O) {
    throw new RangeError(failedParse(e));
  }
  return ee(finalizeDateTime(n));
}

function At(e) {
  const n = parseDateTimeLike(m(e));
  if (!n || n.O) {
    throw new RangeError(failedParse(e));
  }
  return v(n.I ? finalizeDateTime(n) : finalizeDate(n));
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
  const o = At(n), {calendar: r} = o, i = e(r), [a, s, c] = i.v(o), [u, l] = i.$(a, s), [f, d] = i.k(u, l, c);
  return createPlainMonthDaySlots(checkIsoDateInBounds(i.L(f, d, c)), r);
}

function ze(e) {
  let n, t = (e => {
    const n = Za.exec(e);
    return n ? (organizeAnnotationParts(n[10]), organizeTimeParts(n)) : void 0;
  })(m(e));
  if (!t) {
    if (t = parseDateTimeLike(e), !t) {
      throw new RangeError(failedParse(e));
    }
    if (!t.I) {
      throw new RangeError(failedParse(e));
    }
    if (t.O) {
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
    const n = qa.exec(e);
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
  return n && (n.timeZone || n.O && Da || n.offset) || e;
}

function finalizeZonedDateTime(e, n, t = 0, o = 0) {
  const r = ye(e.timeZone), i = ie(r);
  return Yn(getMatchingInstantFor(i, checkIsoDateTimeFields(e), n, t, o, !i.R, e.O), r, an(e.calendar));
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
  const n = Ca.exec(e);
  return n ? (e => {
    const n = e[10], t = "Z" === (n || "").toUpperCase();
    return {
      isoYear: organizeIsoYearParts(e),
      isoMonth: parseInt(e[4]),
      isoDay: parseInt(e[5]),
      ...organizeTimeParts(e.slice(5)),
      ...organizeAnnotationParts(e[16]),
      I: Boolean(e[6]),
      O: t,
      offset: t ? void 0 : n
    };
  })(n) : void 0;
}

function parseYearMonthOnly(e) {
  const n = ka.exec(e);
  return n ? (e => ({
    isoYear: organizeIsoYearParts(e),
    isoMonth: parseInt(e[4]),
    isoDay: 1,
    ...organizeAnnotationParts(e[5])
  }))(n) : void 0;
}

function parseMonthDayOnly(e) {
  const n = Ya.exec(e);
  return n ? (e => ({
    isoYear: xi,
    isoMonth: parseInt(e[1]),
    isoDay: parseInt(e[2]),
    ...organizeAnnotationParts(e[3])
  }))(n) : void 0;
}

function parseOffsetNanoMaybe(e, n) {
  const t = Ra.exec(e);
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
  if (e.replace(za, ((e, r, i) => {
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
    return e.toLowerCase().split("/").map(((e, n) => (e.length <= 3 || /\d/.test(e)) && !/etc|yap/.test(e) ? e.toUpperCase() : e.replace(/baja|dumont|[a-z]+/g, ((e, t) => e.length <= 2 && !n || "in" === e || "chat" === e ? e.toUpperCase() : e.length > 2 || !t ? capitalize(e).replace(/island|noronha|murdo|rivadavia|urville/, capitalize) : e)))).join("/");
  })(e) : Da;
}

function getTimeZoneAtomic(e) {
  const n = getTimeZoneEssence(e);
  return "number" == typeof n ? n : n ? n.resolvedOptions().timeZone : Da;
}

function getTimeZoneEssence(e) {
  const n = parseOffsetNanoMaybe(e = e.toUpperCase(), 1);
  return void 0 !== n ? n : e !== Da ? Aa(e) : void 0;
}

function Ze(e, n) {
  return te(e.epochNanoseconds, n.epochNanoseconds);
}

function yn(e, n) {
  return te(e.epochNanoseconds, n.epochNanoseconds);
}

function $t(e, n, t, o, r, i) {
  const a = e(normalizeOptions(i).relativeTo), s = Math.max(getLargestDurationUnit(o), getLargestDurationUnit(r));
  if (allPropsEqual(F, o, r)) {
    return 0;
  }
  if (isUniformUnit(s, a)) {
    return te(durationFieldsToBigNano(o), durationFieldsToBigNano(r));
  }
  if (!a) {
    throw new RangeError(zr);
  }
  const [c, u, l] = createMarkerSystem(n, t, a), f = createMarkerToEpochNano(l), d = createMoveMarker(u, l);
  return te(f(d(c, o)), f(d(c, r)));
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
      h = diffZonedEpochsBig(i, t, o, r, p, c, s), h = roundRelativeDuration(h, m, c, u, l, f, o, extractEpochNano, E(moveZonedEpochs, i, t));
    }
  } else {
    h = Fi;
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
      p = diffDateTimesBig(n, t, o, m, s, a), p = roundRelativeDuration(p, d, s, c, u, l, t, isoToEpochNano, E(moveDateTime, n));
    }
  } else {
    p = Fi;
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
      f = e.dateUntil(t, o, r, c), 6 === i && 1 === a || (f = roundRelativeDuration(f, l, r, i, a, s, t, isoToEpochNano, E(moveDate, e)));
    }
  } else {
    f = Fi;
  }
  return Vt(e ? negateDurationFields(f) : f);
}

function Ae(e, n, t, o) {
  const r = U(o), [i, a, s, c] = refineDiffOptions(e, r, 5, 5), u = roundByInc(diffTimes(n, t), computeNanoInc(a, s), c), l = {
    ...Fi,
    ...nanoToDurationTimeFields(u, i)
  };
  return Vt(e ? negateDurationFields(l) : l);
}

function diffZonedEpochsExact(e, n, t, o, r, i) {
  const a = te(o.epochNanoseconds, t.epochNanoseconds);
  return a ? r < 6 ? diffEpochNanosExact(t.epochNanoseconds, o.epochNanoseconds, r) : diffZonedEpochsBig(e, n, t, o, a, r, i) : Fi;
}

function diffDateTimesExact(e, n, t, o, r) {
  const i = isoToEpochNano(n), a = isoToEpochNano(t), s = te(a, i);
  return s ? o <= 6 ? diffEpochNanosExact(i, a, o) : diffDateTimesBig(e, n, t, s, o, r) : Fi;
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
      ...Fi,
      days: diffDays(l, f)
    }) : e.dateUntil(s, c, i, a),
    ...nanoToDurationTimeFields(u)
  };
}

function diffDateTimesBig(e, n, t, o, r, i) {
  let a = n, s = diffTimes(n, t);
  return Math.sign(s) === -o && (a = moveByDays(n, o), s += Qr * o), {
    ...e.dateUntil(a, t, r, i),
    ...nanoToDurationTimeFields(s)
  };
}

function diffEpochNanos(e, n, t, o, r, i) {
  return {
    ...Fi,
    ...nanoToDurationDayTimeFields(roundBigNano(re(e, n), o, r, i), t)
  };
}

function diffEpochNanosExact(e, n, t) {
  return {
    ...Fi,
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
      o: e.month,
      day: parseInt(e.day)
    }))(hashIntlFormatParts(n, e), t);
  }
  const n = Wa(e), t = computeCalendarIdBase(e);
  return {
    id: e,
    h: createIntlFieldCache(epochMilliToIntlFields),
    l: createIntlYearDataCache(epochMilliToIntlFields)
  };
}

function createIntlFieldCache(e) {
  return Jn((n => {
    const t = isoToEpochMilli(n);
    return e(t);
  }), WeakMap);
}

function createIntlYearDataCache(e) {
  const n = e(0).year - ji;
  return Jn((t => {
    let o, r = isoArgsToEpochMilli(t - n);
    const i = [], a = [];
    do {
      r += 400 * Gr;
    } while ((o = e(r)).year <= t);
    do {
      r += (1 - o.day) * Gr, o.year === t && (i.push(r), a.push(o.o)), r -= Gr;
    } while ((o = e(r)).year >= t);
    return {
      i: i.reverse(),
      u: Wr(a.reverse())
    };
  }));
}

function parseIntlYear(e, n) {
  let t, o, r = parseIntlPartsYear(e);
  if (e.era) {
    const a = Di[n];
    void 0 !== a && (i = (i = e.era).normalize("NFD").toLowerCase().replace(/[^a-z0-9]/g, ""), 
    t = Ii[i] || i, o = r, r = eraYearToYear(o, a[t] || 0));
  }
  var i;
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
  const {year: n, o: t, day: o} = this.h(e), {u: r} = this.l(n);
  return [ n, r[t] + 1, o ];
}

function computeIntlEpochMilli(e, n = 1, t = 1) {
  return this.l(e).i[n - 1] + (t - 1) * Gr;
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
  const {i: t} = this.l(e);
  let o = n + 1, r = t;
  return o > t.length && (o = 1, r = this.l(e + 1).i), diffEpochMilliByDay(t[n - 1], r[o - 1]);
}

function computeIntlMonthsInYear(e) {
  return this.l(e).i.length;
}

function queryMonthStrings(e, n) {
  return Object.keys(e.l(n).u);
}

function rn(e) {
  return an(m(e));
}

function an(e) {
  if ((e = e.toLowerCase()) !== X && e !== gi && computeCalendarIdBase(e) !== computeCalendarIdBase(Wa(e).resolvedOptions().calendar)) {
    throw new RangeError(invalidCalendar(e));
  }
  return e;
}

function computeCalendarIdBase(e) {
  return "islamicc" === e && (e = "islamic"), e.split("-")[0];
}

function computeNativeWeekOfYear(e) {
  return this.m(e)[0];
}

function computeNativeYearOfWeek(e) {
  return this.m(e)[1];
}

function computeNativeDayOfYear(e) {
  const [n] = this.v(e);
  return diffEpochMilliByDay(this.p(n), isoToEpochMilli(e)) + 1;
}

function parseMonthCode(e) {
  const n = ja.exec(e);
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
  return Mi[getCalendarIdBase(e)];
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
  return n && void 0 !== i.month && void 0 === i.monthCode && void 0 === i.year && (i.year = xi), 
  e.monthDayFromFields(i, o);
}

function Ue(e, n) {
  const t = H(n);
  return Ge(refineTimeBag(refineFields(e, ei, [], 1), t));
}

function Ht(e) {
  const n = refineFields(e, yi);
  return Vt(checkDurationUnits({
    ...Fi,
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
      a = 1, Ha[o] && (n = Ha[o](n, o)), r[o] = n;
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
  return constrainIsoTimeFields(Va({
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
    ...refineFields(o, yi)
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
      const r = e.P(t), [i, a] = parseMonthCode(n);
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
  return clampEntity("month", r, 1, e.j(t), o);
}

function refineDay(e, n, t, o, r) {
  return clampProp(n, "day", 1, e.N(o, t), r);
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
  return ee(checkIsoDateTimeInBounds(checkIsoDateTimeFields(T(toInteger, zipProps(Bi, [ n, t, o, r, i, a, s, c, u ])))), e(l));
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

function G(e, n, t, o = X, r = xi) {
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
  }) : Object.assign(Object.create(n), La(t));
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
  })(r = V(o, r), e) || Object.assign(r, n), t && (r.timeZone = Da, [ "full", "long" ].includes(r.timeStyle) && (r.timeStyle = "medium")), 
  r);
}

function e(e, n = qn) {
  const [t, , , o] = e;
  return (r, i = ys, ...a) => {
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
  return Ps || (Ps = (new En).resolvedOptions().timeZone);
}

const expectedInteger = (e, n) => `Non-integer ${e}: ${n}`, expectedPositive = (e, n) => `Non-positive ${e}: ${n}`, expectedFinite = (e, n) => `Non-finite ${e}: ${n}`, forbiddenBigIntToNumber = e => `Cannot convert bigint to ${e}`, invalidBigInt = e => `Invalid bigint: ${e}`, pr = "Cannot convert Symbol to string", hr = "Invalid object", numberOutOfRange = (e, n, t, o, r) => r ? numberOutOfRange(e, r[n], r[t], r[o]) : invalidEntity(e, n) + `; must be between ${t}-${o}`, invalidEntity = (e, n) => `Invalid ${e}: ${n}`, missingField = e => `Missing ${e}`, tn = e => `Invalid field ${e}`, duplicateFields = e => `Duplicate field ${e}`, noValidFields = e => "No valid fields: " + e.join(), Z = "Invalid bag", invalidChoice = (e, n, t) => invalidEntity(e, n) + "; must be " + Object.keys(t).join(), A = "Cannot use valueOf", P = "Invalid calling context", gr = "Forbidden era/eraYear", Dr = "Mismatching era/eraYear", Ir = "Mismatching year/eraYear", invalidEra = e => `Invalid era: ${e}`, missingYear = e => "Missing year" + (e ? "/era/eraYear" : ""), invalidMonthCode = e => `Invalid monthCode: ${e}`, Mr = "Mismatching month/monthCode", Nr = "Missing month/monthCode", yr = "Cannot guess year", Pr = "Invalid leap month", g = "Invalid protocol", vr = "Invalid protocol results", Er = "Mismatching Calendars", invalidCalendar = e => `Invalid Calendar: ${e}`, Fr = "Mismatching TimeZones", br = "Forbidden ICU TimeZone", wr = "Out-of-bounds offset", Br = "Out-of-bounds TimeZone gap", kr = "Invalid TimeZone offset", Yr = "Ambiguous offset", Cr = "Out-of-bounds date", Zr = "Out-of-bounds duration", Rr = "Cannot mix duration signs", zr = "Missing relativeTo", qr = "Cannot use large units", Ar = "Required smallestUnit or largestUnit", Ur = "smallestUnit > largestUnit", failedParse = e => `Cannot parse: ${e}`, invalidSubstring = e => `Invalid substring: ${e}`, Ln = e => `Cannot format ${e}`, kn = "Mismatching types for formatting", Lr = "Cannot specify TimeZone", Wr = /*@__PURE__*/ E(b, ((e, n) => n)), jr = /*@__PURE__*/ E(b, ((e, n, t) => t)), xr = /*@__PURE__*/ E(padNumber, 2), $r = {
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
  bc: "bce",
  ad: "ce"
}, Mi = {
  chinese: 13,
  dangi: 13,
  hebrew: -6
}, m = /*@__PURE__*/ E(requireType, "string"), f = /*@__PURE__*/ E(requireType, "boolean"), Ni = /*@__PURE__*/ E(requireType, "number"), $ = /*@__PURE__*/ E(requireType, "function"), F = /*@__PURE__*/ Et.map((e => e + "s")), yi = /*@__PURE__*/ sortStrings(F), Pi = /*@__PURE__*/ F.slice(0, 6), vi = /*@__PURE__*/ F.slice(6), Ei = /*@__PURE__*/ vi.slice(1), Si = /*@__PURE__*/ Wr(F), Fi = /*@__PURE__*/ jr(F, 0), bi = /*@__PURE__*/ jr(Pi, 0), Oi = /*@__PURE__*/ E(zeroOutProps, F), j = [ "isoNanosecond", "isoMicrosecond", "isoMillisecond", "isoSecond", "isoMinute", "isoHour" ], wi = [ "isoDay", "isoMonth", "isoYear" ], Bi = /*@__PURE__*/ j.concat(wi), ki = /*@__PURE__*/ sortStrings(wi), Yi = /*@__PURE__*/ sortStrings(j), Ci = /*@__PURE__*/ sortStrings(Bi), Dt = /*@__PURE__*/ jr(Yi, 0), Zi = /*@__PURE__*/ E(zeroOutProps, Bi), En = Intl.DateTimeFormat, Ri = "en-GB", zi = 1e8, qi = zi * Gr, Ai = [ zi, 0 ], Ui = [ -zi, 0 ], Li = 275760, Wi = -271821, ji = 1970, xi = 1972, $i = 12, Gi = /*@__PURE__*/ isoArgsToEpochMilli(1868, 9, 8), Hi = /*@__PURE__*/ Jn(computeJapaneseEraParts, WeakMap), Vi = "smallestUnit", _i = "unit", Ji = "roundingIncrement", Ki = "fractionalSecondDigits", Qi = "relativeTo", Xi = {
  constrain: 0,
  reject: 1
}, ea = /*@__PURE__*/ Object.keys(Xi), na = {
  compatible: 0,
  reject: 1,
  earlier: 2,
  later: 3
}, ta = {
  reject: 0,
  use: 1,
  prefer: 2,
  ignore: 3
}, oa = {
  auto: 0,
  never: 1,
  critical: 2,
  always: 3
}, ra = {
  auto: 0,
  never: 1,
  critical: 2
}, ia = {
  auto: 0,
  never: 1
}, aa = {
  floor: 0,
  halfFloor: 1,
  ceil: 2,
  halfCeil: 3,
  trunc: 4,
  halfTrunc: 5,
  expand: 6,
  halfExpand: 7,
  halfEven: 8
}, sa = /*@__PURE__*/ E(refineUnitOption, Vi), ca = /*@__PURE__*/ E(refineUnitOption, "largestUnit"), ua = /*@__PURE__*/ E(refineUnitOption, _i), la = /*@__PURE__*/ E(refineChoiceOption, "overflow", Xi), fa = /*@__PURE__*/ E(refineChoiceOption, "disambiguation", na), da = /*@__PURE__*/ E(refineChoiceOption, "offset", ta), ma = /*@__PURE__*/ E(refineChoiceOption, "calendarName", oa), pa = /*@__PURE__*/ E(refineChoiceOption, "timeZoneName", ra), ha = /*@__PURE__*/ E(refineChoiceOption, "offset", ia), ga = /*@__PURE__*/ E(refineChoiceOption, "roundingMode", aa), L = "PlainYearMonth", q = "PlainMonthDay", J = "PlainDate", We = "PlainDateTime", xe = "PlainTime", Te = "ZonedDateTime", Oe = "Instant", qt = "Duration", Ta = [ Math.floor, e => hasHalf(e) ? Math.floor(e) : Math.round(e), Math.ceil, e => hasHalf(e) ? Math.ceil(e) : Math.round(e), Math.trunc, e => hasHalf(e) ? Math.trunc(e) || 0 : Math.round(e), e => e < 0 ? Math.floor(e) : Math.ceil(e), e => Math.sign(e) * Math.round(Math.abs(e)) || 0, e => hasHalf(e) ? (e = Math.trunc(e) || 0) + e % 2 : Math.round(e) ], Da = "UTC", Ia = 5184e3, Ma = /*@__PURE__*/ isoArgsToEpochSec(1847), Na = /*@__PURE__*/ isoArgsToEpochSec(/*@__PURE__*/ (/*@__PURE__*/ new Date).getUTCFullYear() + 10), ya = /0+$/, fn = /*@__PURE__*/ Jn(_zonedEpochSlotsToIso, WeakMap), Pa = 2 ** 32 - 1, ie = /*@__PURE__*/ Jn((e => {
  const n = getTimeZoneEssence(e);
  return "object" == typeof n ? new IntlTimeZone(n) : new FixedTimeZone(n || 0);
}));

class FixedTimeZone {
  constructor(e) {
    this.R = e;
  }
  getOffsetNanosecondsFor() {
    return this.R;
  }
  getPossibleInstantsFor(e) {
    return [ isoToEpochNanoWithOffset(e, this.R) ];
  }
  B() {}
}

class IntlTimeZone {
  constructor(e) {
    this.q = (e => {
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
      let o = Ma, r = Na;
      return {
        J(e) {
          const n = getOffsetSec(e - 86400), t = getOffsetSec(e + 86400), o = e - n, r = e - t;
          if (n === t) {
            return [ o ];
          }
          const i = getOffsetSec(o);
          return i === getOffsetSec(r) ? [ e - i ] : n > t ? [ o, r ] : [];
        },
        _: getOffsetSec,
        B(e, i) {
          const a = clampNumber(e, o, r);
          let [s, c] = computePeriod(a);
          const u = Ia * i, l = i < 0 ? () => c > o || (o = a, 0) : () => s < r || (r = a, 
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
    return this.q._(epochNanoToSec(e)) * _r;
  }
  getPossibleInstantsFor(e) {
    const [n, t] = [ isoArgsToEpochSec((o = e).isoYear, o.isoMonth, o.isoDay, o.isoHour, o.isoMinute, o.isoSecond), o.isoMillisecond * internal_be + o.isoMicrosecond * Vr + o.isoNanosecond ];
    var o;
    return this.q.J(n).map((e => checkEpochNanoInBounds(moveBigNano(internal_he(e, _r), t))));
  }
  B(e, n) {
    const [t, o] = epochNanoToSecMod(e), r = this.q.B(t + (n > 0 || o ? 1 : 0), n);
    if (void 0 !== r) {
      return internal_he(r, _r);
    }
  }
}

const va = "([+−-])", Ea = "(?:[.,](\\d{1,9}))?", Sa = `(?:(?:${va}(\\d{6}))|(\\d{4}))-?(\\d{2})`, Fa = "(\\d{2})(?::?(\\d{2})(?::?(\\d{2})" + Ea + ")?)?", ba = va + Fa, Oa = Sa + "-?(\\d{2})(?:[T ]" + Fa + "(Z|" + ba + ")?)?", wa = "\\[(!?)([^\\]]*)\\]", Ba = `((?:${wa}){0,9})`, ka = /*@__PURE__*/ createRegExp(Sa + Ba), Ya = /*@__PURE__*/ createRegExp("(?:--)?(\\d{2})-?(\\d{2})" + Ba), Ca = /*@__PURE__*/ createRegExp(Oa + Ba), Za = /*@__PURE__*/ createRegExp("T?" + Fa + "(?:" + ba + ")?" + Ba), Ra = /*@__PURE__*/ createRegExp(ba), za = /*@__PURE__*/ new RegExp(wa, "g"), qa = /*@__PURE__*/ createRegExp(`${va}?P(\\d+Y)?(\\d+M)?(\\d+W)?(\\d+D)?(?:T(?:(\\d+)${Ea}H)?(?:(\\d+)${Ea}M)?(?:(\\d+)${Ea}S)?)?`), Aa = /*@__PURE__*/ Jn((e => new En(Ri, {
  timeZone: e,
  era: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
}))), Ua = /^(AC|AE|AG|AR|AS|BE|BS|CA|CN|CS|CT|EA|EC|IE|IS|JS|MI|NE|NS|PL|PN|PR|PS|SS|VS)T$/, La = /*@__PURE__*/ Jn(createIntlCalendar), Wa = /*@__PURE__*/ Jn((e => new En(Ri, {
  calendar: e,
  timeZone: Da,
  era: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
}))), ja = /^M(\d{2})(L?)$/, xa = {
  era: toStringViaPrimitive,
  eraYear: toInteger,
  year: toInteger,
  month: toPositiveInteger,
  monthCode: toStringViaPrimitive,
  day: toPositiveInteger
}, $a = /*@__PURE__*/ jr(w, toInteger), Ga = /*@__PURE__*/ jr(F, toStrictInteger), Ha = /*@__PURE__*/ Object.assign({}, xa, $a, Ga, {
  offset: toStringViaPrimitive
}), Va = /*@__PURE__*/ E(remapProps, w, j), _a = {
  dateAdd(e, n, t) {
    const o = H(t);
    let r, {years: i, months: a, weeks: s, days: c} = n;
    if (c += durationFieldsToBigNano(n, 5)[0], i || a) {
      r = ((e, n, t, o, r) => {
        let [i, a, s] = e.v(n);
        if (t) {
          const [n, o] = e.$(i, a);
          i += t, a = monthCodeNumberToMonth(n, o, e.P(i)), a = clampEntity("month", a, 1, e.j(i), r);
        }
        return o && ([i, a] = e.G(i, a, o)), s = clampEntity("day", s, 1, e.N(i, a), r), 
        e.p(i, a, s);
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
        ...Fi,
        weeks: o,
        days: r
      };
    }
    const o = this.v(e), r = this.v(n);
    let [i, a, s] = ((e, n, t, o, r, i, a) => {
      let s = r - n, c = i - t, u = a - o;
      if (s || c) {
        const l = Math.sign(s || c);
        let f = e.N(r, i), d = 0;
        if (Math.sign(u) === -l) {
          const o = f;
          [r, i] = e.G(r, i, -l), s = r - n, c = i - t, f = e.N(r, i), d = l < 0 ? -o : f;
        }
        if (u = a - Math.min(o, f) + d, s) {
          const [o, a] = e.$(n, t), [u, f] = e.$(r, i);
          if (c = u - o || Number(f) - Number(a), Math.sign(c) === -l) {
            const t = l < 0 && -e.j(r);
            s = (r -= l) - n, c = i - monthCodeNumberToMonth(o, a, e.P(r)) + (t || e.j(r));
          }
        }
      }
      return [ s, c, u ];
    })(this, ...o, ...r);
    return 8 === t && (a += this.V(i, o[0]), i = 0), {
      ...Fi,
      years: i,
      months: a,
      days: s
    };
  },
  dateFromFields(e, n) {
    const t = H(n), o = refineYear(this, e), r = refineMonth(this, e, o, t), i = refineDay(this, e, r, o, t);
    return v(checkIsoDateInBounds(this.L(o, r, i)), this.id || X);
  },
  yearMonthFromFields(e, n) {
    const t = H(n), o = refineYear(this, e), r = refineMonth(this, e, o, t);
    return createPlainYearMonthSlots(checkIsoYearMonthInBounds(this.L(o, r, 1)), this.id || X);
  },
  monthDayFromFields(e, n) {
    const t = H(n), o = !this.id, {monthCode: r, year: i, month: a} = e;
    let s, c, u, l, f;
    if (void 0 !== r) {
      [s, c] = parseMonthCode(r), f = getDefinedProp(e, "day");
      const n = this.k(s, c, f);
      if (!n) {
        throw new RangeError(yr);
      }
      if ([u, l] = n, void 0 !== a && a !== l) {
        throw new RangeError(Mr);
      }
      o && (l = clampEntity("month", l, 1, $i, 1), f = clampEntity("day", f, 1, computeIsoDaysInMonth(void 0 !== i ? i : u, l), t));
    } else {
      u = void 0 === i && o ? xi : refineYear(this, e), l = refineMonth(this, e, u, t), 
      f = refineDay(this, e, l, u, t);
      const n = this.P(u);
      c = l === n, s = monthToMonthCodeNumber(l, n);
      const r = this.k(s, c, f);
      if (!r) {
        throw new RangeError(yr);
      }
      [u, l] = r;
    }
    return createPlainMonthDaySlots(checkIsoDateInBounds(this.L(u, l, f)), this.id || X);
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
    const [n] = this.v(e);
    return this.K(n);
  },
  monthsInYear(e) {
    const [n] = this.v(e);
    return this.j(n);
  },
  daysInMonth(e) {
    const [n, t] = this.v(e);
    return this.N(n, t);
  },
  daysInYear(e) {
    const [n] = this.v(e);
    return this.X(n);
  },
  dayOfYear: computeNativeDayOfYear,
  era(e) {
    return this.nn(e)[0];
  },
  eraYear(e) {
    return this.nn(e)[1];
  },
  monthCode(e) {
    const [n, t] = this.v(e), [o, r] = this.$(n, t);
    return ((e, n) => "M" + xr(e) + (n ? "L" : ""))(o, r);
  },
  dayOfWeek: computeIsoDayOfWeek,
  daysInWeek() {
    return 7;
  }
}, Ja = {
  dayOfYear: computeNativeDayOfYear,
  v: computeIsoDateParts,
  p: isoArgsToEpochMilli
}, Ka = /*@__PURE__*/ Object.assign({}, Ja, {
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  m(e) {
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
}), Qa = {
  dayOfYear: computeNativeDayOfYear,
  v: computeIntlDateParts,
  p: computeIntlEpochMilli,
  weekOfYear: computeNativeWeekOfYear,
  yearOfWeek: computeNativeYearOfWeek,
  m() {
    return [];
  }
}, Y = /*@__PURE__*/ createNativeOpsCreator(/*@__PURE__*/ Object.assign({}, _a, Ka, {
  v: computeIsoDateParts,
  nn(e) {
    return this.id === gi ? computeGregoryEraParts(e) : this.id === Ti ? Hi(e) : [];
  },
  $: (e, n) => [ n, 0 ],
  k(e, n) {
    if (!n) {
      return [ xi, e ];
    }
  },
  K: computeIsoInLeapYear,
  P() {},
  j: computeIsoMonthsInYear,
  V: e => e * $i,
  N: computeIsoDaysInMonth,
  X: computeIsoDaysInYear,
  L: (e, n, t) => ({
    isoYear: e,
    isoMonth: n,
    isoDay: t
  }),
  p: isoArgsToEpochMilli,
  G: (e, n, t) => (e += divTrunc(t, $i), (n += modTrunc(t, $i)) < 1 ? (e--, n += $i) : n > $i && (e++, 
  n -= $i), [ e, n ]),
  year(e) {
    return e.isoYear;
  },
  month(e) {
    return e.isoMonth;
  },
  day: e => e.isoDay
}), /*@__PURE__*/ Object.assign({}, _a, Qa, {
  v: computeIntlDateParts,
  nn(e) {
    const n = this.h(e);
    return [ n.era, n.eraYear ];
  },
  $(e, n) {
    const t = computeIntlLeapMonth.call(this, e);
    return [ monthToMonthCodeNumber(n, t), t === n ];
  },
  k(e, n, t) {
    let [o, r, i] = computeIntlDateParts.call(this, {
      isoYear: xi,
      isoMonth: $i,
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
  P: computeIntlLeapMonth,
  j: computeIntlMonthsInYear,
  V(e, n) {
    const t = n + e, o = Math.sign(e), r = o < 0 ? -1 : 0;
    let i = 0;
    for (let e = n; e !== t; e += o) {
      i += computeIntlMonthsInYear.call(this, e + r);
    }
    return i;
  },
  N: computeIntlDaysInMonth,
  X: computeIntlDaysInYear,
  L(e, n, t) {
    return epochMilliToIso(computeIntlEpochMilli.call(this, e, n, t));
  },
  p: computeIntlEpochMilli,
  G(e, n, t) {
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
    return this.h(e).year;
  },
  month(e) {
    const {year: n, o: t} = this.h(e), {u: o} = this.l(n);
    return o[t] + 1;
  },
  day(e) {
    return this.h(e).day;
  }
})), Xa = "numeric", es = [ "timeZoneName" ], ns = {
  month: Xa,
  day: Xa
}, ts = {
  year: Xa,
  month: Xa
}, os = /*@__PURE__*/ Object.assign({}, ts, {
  day: Xa
}), rs = {
  hour: Xa,
  minute: Xa,
  second: Xa
}, is = /*@__PURE__*/ Object.assign({}, os, rs), as = /*@__PURE__*/ Object.assign({}, is, {
  timeZoneName: "short"
}), ss = /*@__PURE__*/ Object.keys(ts), cs = /*@__PURE__*/ Object.keys(ns), us = /*@__PURE__*/ Object.keys(os), ls = /*@__PURE__*/ Object.keys(rs), fs = [ "dateStyle" ], ds = /*@__PURE__*/ ss.concat(fs), ms = /*@__PURE__*/ cs.concat(fs), ps = /*@__PURE__*/ us.concat(fs, [ "weekday" ]), hs = /*@__PURE__*/ ls.concat([ "dayPeriod", "timeStyle" ]), gs = /*@__PURE__*/ ps.concat(hs), Ts = /*@__PURE__*/ gs.concat(es), Ds = /*@__PURE__*/ es.concat(hs), Is = /*@__PURE__*/ es.concat(ps), Ms = /*@__PURE__*/ es.concat([ "day", "weekday" ], hs), Ns = /*@__PURE__*/ es.concat([ "year", "weekday" ], hs), ys = {}, t = [ /*@__PURE__*/ createOptionsTransformer(gs, is), y ], s = [ /*@__PURE__*/ createOptionsTransformer(Ts, as), y, 0, (e, n) => {
  const t = I(e.timeZone);
  if (n && I(n.timeZone) !== t) {
    throw new RangeError(Fr);
  }
  return t;
} ], n = [ /*@__PURE__*/ createOptionsTransformer(gs, is, es), isoToEpochMilli ], o = [ /*@__PURE__*/ createOptionsTransformer(ps, os, Ds), isoToEpochMilli ], r = [ /*@__PURE__*/ createOptionsTransformer(hs, rs, Is), e => isoTimeFieldsToNano(e) / internal_be ], a = [ /*@__PURE__*/ createOptionsTransformer(ds, ts, Ms), isoToEpochMilli, 1 ], i = [ /*@__PURE__*/ createOptionsTransformer(ms, ns, Ns), isoToEpochMilli, 1 ];

let Ps;



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
    n[o] = ({F: e}, n) => {
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
        C: r
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
  const o = t.B(toInstantSlots(n).epochNanoseconds, e);
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
      return prepFormat.U = n, prepFormat;
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
    return Or.get(this).U[e](...t);
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
  const {C: o} = this;
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
    F: ie(t)
  };
}), {
  id: e => e.id
}, {
  getPossibleInstantsFor: ({F: e}, t) => e.getPossibleInstantsFor(toPlainDateTimeSlots(t)).map((e => Co(internal_(e)))),
  getOffsetNanosecondsFor: ({F: e}, t) => e.getOffsetNanosecondsFor(toInstantSlots(t).epochNanoseconds),
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
  getNextTransition: ({F: e}, t) => getImplTransition(1, e, t),
  getPreviousTransition: ({F: e}, t) => getImplTransition(-1, e, t),
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
  dateAdd: ({id: e, F: t}, n, o, r) => Yo(v(t.dateAdd(toPlainDateSlots(n), toDurationSlots(o), r), e)),
  dateUntil: ({F: e}, t, n, o) => ar(Vt(e.dateUntil(toPlainDateSlots(t), toPlainDateSlots(n), _t(o)))),
  dateFromFields: ({id: e, F: t}, n, o) => Yo(Yt(t, n, o, ln(e))),
  yearMonthFromFields: ({id: e, F: t}, n, o) => jo(nt(t, n, o, un(e))),
  monthDayFromFields: ({id: e, F: t}, n, o) => To(K(t, 0, n, o, cn(e))),
  fields({F: e}, t) {
    const n = new Set(en), o = [];
    for (const e of t) {
      if (m(e), !n.has(e)) {
        throw new RangeError(tn(e));
      }
      n.delete(e), o.push(e);
    }
    return e.fields(o);
  },
  mergeFields: ({F: e}, t, n) => e.mergeFields(nn(on(t)), nn(on(n)))
}, [lr] = createSlotClass("Calendar", (e => {
  const t = rn(e);
  return {
    branding: "Calendar",
    id: t,
    F: Y(t)
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
Account.contentUrlTemplate = 'accounts/{content_id}'; // A templated url to get a single item
Account.allContentUrlTemplate = 'accounts'; // A templated url to get all items
class Rubric extends BaseCanvasObject {
    constructor(data, courseId) {
        super(data);
        this.courseId = courseId;
    }
    associations() {
        return canvas_awaiter(this, arguments, void 0, function* (reload = false) {
            if ('associations' in this.canvasData && !reload) {
                return this.canvasData['associations'];
            }
            let data = yield this.myClass.getDataById(this.id, this.courseId, { queryParams: { 'include': ['associations'] } });
            let associations = data['associations'].map((data) => new RubricAssociation(data, this.courseId));
            this.canvasData['associations'] = associations;
            return associations;
        });
    }
}
Rubric.nameProperty = 'title';
Rubric.contentUrlTemplate = "courses/{course_id}/rubrics/{content_id}";
Rubric.allContentUrlTemplate = "courses/{course_id}/rubrics";
class RubricAssociation extends BaseCanvasObject {
    constructor(data, courseId) {
        super(data);
        this.courseId = courseId;
    }
    get useForGrading() {
        return this.canvasData['use_for_grading'];
    }
    setUseForGrading(value) {
        return canvas_awaiter(this, void 0, void 0, function* () {
            this.canvasData['use_for_grading'] = value;
            return yield this.saveData({ 'rubric_association[use_for_grading]': value });
        });
    }
}
RubricAssociation.contentUrlTemplate = "courses/{course_id}/rubric_associations/{content_id}";
RubricAssociation.allContentUrlTemplate = "courses/{course_id}/rubric_associations";
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
            let url = `accounts/${account.id}/terms/${termId}`;
            let termData = yield fetchApiJson(url, config);
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
            let url = `accounts/${rootAccount.id}/terms`;
            const data = yield getApiPagedData(url, config);
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





class BaseContentItem extends BaseCanvasObject {
    constructor(canvasData, courseId) {
        super(canvasData);
        this._courseId = courseId;
    }
    static get contentUrlPart() {
        assert_default()(this.allContentUrlTemplate, "Not a content url template");
        const urlTermMatch = /\/([\w_]+)$/.exec(this.allContentUrlTemplate);
        if (!urlTermMatch)
            return null;
        const urlTerm = urlTermMatch[1];
        return urlTerm;
    }
    static getAllInCourse(courseId_1) {
        return content_awaiter(this, arguments, void 0, function* (courseId, config = null) {
            let url = this.getAllUrl(courseId);
            let data = yield getApiPagedData(url, config);
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
            let data = yield fetchJson(url);
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
    updateContent() {
        return content_awaiter(this, arguments, void 0, function* (text = null, name = null) {
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
            return this.saveData(data);
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
}
BaseContentItem.nameProperty = 'name';
class Discussion extends BaseContentItem {
    offsetPublishDelay(days) {
        return content_awaiter(this, void 0, void 0, function* () {
            const data = this.rawData;
            if (!this.rawData.delayed_post_at)
                return;
            let delayedPostAt = mr.Instant.from(this.rawData.delayed_post_at).toZonedDateTimeISO('UTC');
            delayedPostAt = delayedPostAt.add({ days });
            const payload = {
                delayed_post_at: new Date(delayedPostAt.epochMilliseconds).toISOString()
            };
            yield this.saveData(payload);
        });
    }
    get rawData() {
        return this.canvasData;
    }
}
Discussion.nameProperty = 'title';
Discussion.bodyProperty = 'message';
Discussion.contentUrlTemplate = "courses/{course_id}/discussion_topics/{content_id}";
Discussion.allContentUrlTemplate = "courses/{course_id}/discussion_topics";
class Assignment extends BaseContentItem {
    setDueAt(dueAt) {
        return content_awaiter(this, void 0, void 0, function* () {
            const currentDueAt = this.dueAt ? mr.Instant.from(this.rawData.due_at) : null;
            const targetDueAt = mr.Instant.from(dueAt.toISOString());
            const payload = {
                assignment: {
                    due_at: dueAt.toISOString(),
                }
            };
            if (this.rawData.peer_reviews && 'automatic_peer_reviews' in this.rawData) {
                const peerReviewTime = mr.Instant.from(this.rawData.peer_reviews_assign_at);
                assert_default()(currentDueAt, "Trying to set peer review date without a due date for the assignment.");
                const peerReviewOffset = currentDueAt.until(peerReviewTime);
                const newPeerReviewTime = targetDueAt.add(peerReviewOffset);
                payload.assignment.peer_review_due_at = new Date(newPeerReviewTime.epochMilliseconds).toISOString();
            }
            let data = yield this.saveData(payload);
            this.canvasData['due_at'] = dueAt.toISOString();
            return data;
        });
    }
    get rawData() {
        return this.canvasData;
    }
    updateContent() {
        return content_awaiter(this, arguments, void 0, function* (text = null, name = null) {
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
            });
        });
    }
}
Assignment.nameProperty = 'name';
Assignment.bodyProperty = 'description';
Assignment.contentUrlTemplate = "courses/{course_id}/assignments/{content_id}";
Assignment.allContentUrlTemplate = "courses/{course_id}/assignments";
class Quiz extends BaseContentItem {
    setDueAt(dueAt) {
        return content_awaiter(this, void 0, void 0, function* () {
            let result = yield this.saveData({ 'quiz[due_at]': dueAt.toISOString() });
            this.canvasData['due_at'] = dueAt.toISOString();
            return result;
        });
    }
}
Quiz.nameProperty = 'title';
Quiz.bodyProperty = 'description';
Quiz.contentUrlTemplate = "courses/{course_id}/quizzes/{content_id}";
Quiz.allContentUrlTemplate = "courses/{course_id}/quizzes";
class Page extends BaseContentItem {
    constructor(canvasData, courseId) {
        super(canvasData, courseId);
    }
    getRevisions() {
        return content_awaiter(this, void 0, void 0, function* () {
            return getPagedData(`${this.contentUrlPath}/revisions`);
        });
    }
    applyRevision(revision) {
        return content_awaiter(this, void 0, void 0, function* () {
            const revisionId = revision['revision_id'];
            let result = yield fetchOneKnownApiJson(`${this.contentUrlPath}/revisions/${revisionId}?revision_id=${revisionId}`);
            this.canvasData[this.bodyKey] = result['body'];
            this.canvasData[this.nameKey] = result['title'];
        });
    }
    get body() {
        return this.canvasData[this.bodyKey];
    }
    updateContent() {
        return content_awaiter(this, arguments, void 0, function* (text = null, name = null) {
            let data = {};
            if (text) {
                this.canvasData[this.bodyKey] = text;
                data['wiki_page[body]'] = text;
            }
            if (name) {
                this.canvasData[this.nameKey] = name;
                data[this.nameKey] = name;
            }
            return this.saveData(data);
        });
    }
}
Page.idProperty = 'page_id';
Page.nameProperty = 'title';
Page.bodyProperty = 'body';
Page.contentUrlTemplate = "courses/{course_id}/pages/{content_id}";
Page.allContentUrlTemplate = "courses/{course_id}/pages";

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
function getStartDateAssignments(assignments) {
    const sorted = assignments
        .filter((assignment) => assignment.dueAt)
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
    console.log(sorted);
    if (sorted.length == 0)
        throw new NoAssignmentsWithDueDatesError();
    const firstAssignmentDue = sorted[0].dueAt;
    assert(firstAssignmentDue, "It should be literally impossible for this to happen with current type checking.");
    //Set to monday of that week.
    const plainDateDue = oldDateToPlainDate(firstAssignmentDue);
    const dayOfWeekOffset = 1 - plainDateDue.dayOfWeek;
    return plainDateDue.add({ days: dayOfWeekOffset });
}
function getGradTermName(termStart, locale = DEFAULT_LOCALE) {
    const month = termStart.toLocaleString(locale, { month: '2-digit' });
    const day = termStart.toLocaleString(locale, { day: '2-digit' });
    const year = termStart.toLocaleString(locale, { year: '2-digit' });
    return `DE8W${month}.${day}.${year}`;
}
function getUgTermName(termStart, locale = DEFAULT_LOCALE) {
    const year = termStart.toLocaleString(DEFAULT_LOCALE, { year: '2-digit' });
    const month = termStart.toLocaleString(DEFAULT_LOCALE, { month: 'short' });
    return `DE-${year}-${month}`;
}
function getNewTermName(oldTermName, newTermStart, locale = DEFAULT_LOCALE) {
    const termNameGrad = oldTermName.match(/DE8W\d\d\.\d\d\.\d\d/);
    if (termNameGrad)
        return getGradTermName(newTermStart);
    const termNameUg = oldTermName.match(/(DE(?:.HL|)-\d\d)-(\w+)\w{2}?/i);
    if (termNameUg)
        return getUgTermName(newTermStart);
    throw new MalformedSyllabusError(`Can't Recognize Term Name ${oldTermName}`);
}
function updatedDateSyllabusHtml(html, newStartDate, locale = DEFAULT_LOCALE) {
    const syllabusBody = document.createElement('div');
    syllabusBody.innerHTML = html;
    const syllabusCalloutBox = syllabusBody.querySelector('div.cbt-callout-box');
    if (!syllabusCalloutBox)
        throw new MalformedSyllabusError("Can't find syllabus callout box");
    let paras = Array.from(syllabusCalloutBox.querySelectorAll('p'));
    paras = paras.filter((para) => para.querySelector('strong'));
    if (paras.length < 5)
        throw new MalformedSyllabusError(`Missing syllabus headers\n${paras}`);
    const [_courseNameEl, termNameEl, datesEl, _instructorNameEl, _instructorContactInfoEl, _creditsEl] = paras;
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
    termNameEl.innerHTML = `<p><strong>${syllabusHeaderName(termNameEl)}:</strong> ${newTermName}</p>`;
    datesEl.innerHTML = `<p><strong>${syllabusHeaderName(datesEl)}:</strong> ${dateRangeText}</p>`;
    changedText.push(`${oldTermName} -> ${termNameEl.innerText}`);
    changedText.push(`${oldDates} -> ${datesEl.innerText}`);
    const output = {
        html: syllabusBody.innerHTML,
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


function uploadFile(file, path, url) {
    return files_awaiter(this, void 0, void 0, function* () {
        const initialParams = {
            name: file.name,
            no_redirect: true,
            parent_folder_path: path,
            on_duplicate: 'overwrite'
        };
        let response = yield fetch(url, {
            body: formDataify(initialParams),
            method: 'POST'
        });
        const data = yield response.json();
        const uploadParams = data.upload_params;
        const uploadFormData = formDataify(uploadParams);
        uploadFormData.append('file', file);
        response = yield fetch(data.upload_url, {
            method: 'POST',
            body: uploadFormData,
        });
        assert_default()(response.ok);
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



let facultyCourseCached = null;
function getFacultyCourse() {
    return profile_awaiter(this, void 0, void 0, function* () {
        const facultyCourse = facultyCourseCached !== null && facultyCourseCached !== void 0 ? facultyCourseCached : yield Course.getByCode('Faculty Bios');
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
const SHOW_WINDOW = 5;
const MAX_SEARCH_RETURN_SIZE = 20;
function testResult(success, failureMessage, links, successMessage = ['success']) {
    const response = {
        success,
        message: success ? successMessage : failureMessage
    };
    if (links)
        response.links = links;
    return response;
}
function validations_capitalize(str) {
    return str.replace(/\b[a-z]/g, (substring) => substring.toUpperCase());
}
function preserveCapsReplace(regex, replace) {
    return (substring, ..._args) => {
        const replacedSubstring = substring.replace(regex, replace);
        if (substring.toUpperCase() === substring)
            return replacedSubstring.toUpperCase();
        if (validations_capitalize(substring) === substring)
            return validations_capitalize(replacedSubstring);
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
        const includeBody = { queryParams: { include: ['body'] } };
        let content = yield course.getContent(overrideConfig(config, includeBody));
        for (let item of content) {
            //console.log(item.name, item.constructor.name, item.body, item.body && badTest.exec(item.body));
        }
        const badContent = content.filter(item => item.body && item.body.search(badTest) > -1);
        const syllabus = yield course.getSyllabus(config);
        const syllabusTest = syllabus.search(badTest) > -1;
        const success = badContent.length === 0 && !syllabusTest;
        let links = [];
        let failureMessage = [];
        if (badContent.length > 0) {
            let messageSets = [...badContent.map(a => {
                    var _a;
                    if (!((_a = a.body) === null || _a === void 0 ? void 0 : _a.length))
                        return [a.name];
                    const content = a.body;
                    return matchHighlights(content, badTest);
                })];
            for (let messages of messageSets)
                failureMessage.push(...messages);
            links = [...links, ...badContent.map(a => a.htmlContentUrl)];
        }
        if (syllabusTest) {
            failureMessage.push(...matchHighlights(syllabus, badTest));
            links.push(`/courses/${course.id}/assignments/syllabus`);
        }
        const result = testResult(success, failureMessage, links);
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
            return {
                success: true,
                message: 'success'
            };
        }
        catch (e) {
            return {
                success: false,
                message: e instanceof Error ? e.toString() : "An Error has occurred"
            };
        }
    });
}
function badContentFixFunc(validateRegEx, replace) {
    return (course) => validations_awaiter(this, void 0, void 0, function* () {
        let success = false;
        let message = "";
        const errors = [];
        const includeBody = { queryParams: { include: ['body'] } };
        let content = yield course.getContent(includeBody);
        content = content.filter(item => item.body && item.body.search(validateRegEx) > -1);
        const replaceText = replaceTextFunc(validateRegEx, replace);
        yield fixSyllabus(course, validateRegEx, replaceText);
        for (let item of content) {
            if (!item.body)
                continue;
            if (item.body.search(validateRegEx) === -1)
                continue;
            const newText = replaceText(item.body);
            if (newText.search(validateRegEx) > -1)
                throw new Error(`Fix broken for ${item.name})`);
            yield item.updateContent(newText);
        }
        return {
            success,
            message
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
        if (syllabus.search(validateRegEx) > -1) {
            const newText = replaceText(syllabus);
            if (newText.search(validateRegEx) > -1)
                throw new Error("Fix broken for syllabus " + validateRegEx.toString() + newText);
            yield course.changeSyllabus(newText);
        }
    });
}
function overrideConfig(source, override) {
    var _a, _b;
    const out = {
        queryParams: Object.assign(Object.assign({}, source === null || source === void 0 ? void 0 : source.queryParams), override === null || override === void 0 ? void 0 : override.queryParams),
        fetchInit: Object.assign(Object.assign({}, source === null || source === void 0 ? void 0 : source.fetchInit), override === null || override === void 0 ? void 0 : override.fetchInit)
    };
    if (((_a = source === null || source === void 0 ? void 0 : source.queryParams) === null || _a === void 0 ? void 0 : _a.include) && ((_b = override === null || override === void 0 ? void 0 : override.queryParams) === null || _b === void 0 ? void 0 : _b.include)) {
        out.queryParams.include = [...source === null || source === void 0 ? void 0 : source.queryParams.include, ...override === null || override === void 0 ? void 0 : override.queryParams.include];
    }
    return out;
}

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










const HOMETILE_WIDTH = 500;
class Course extends BaseCanvasObject {
    constructor() {
        super(...arguments);
        this._modules = undefined;
        this.modulesByWeekNumber = undefined;
        this.cachedContent = [];
    }
    static getFromUrl() {
        return course_awaiter(this, arguments, void 0, function* (url = null) {
            if (url === null) {
                url = document.documentURI;
            }
            let match = /courses\/(\d+)/.exec(url);
            if (match) {
                const id = this.getIdFromUrl(url);
                if (!id)
                    return null;
                return yield this.getCourseById(id);
            }
            return null;
        });
    }
    static getIdFromUrl(url) {
        let match = /courses\/(\d+)/.exec(url);
        if (match) {
            return parseInt(match[1]);
        }
        return null;
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
        return course_awaiter(this, arguments, void 0, function* (courseId, config = undefined) {
            const data = yield fetchOneKnownApiJson(`courses/${courseId}`, config);
            return new Course(data);
        });
    }
    static getCoursesByString(code_1) {
        return course_awaiter(this, arguments, void 0, function* (code, term = null, config = {}) {
            let courseDataList = null;
            const accountIdsByName = yield Course.getAccountIdsByName();
            for (let accountKey in accountIdsByName) {
                if (!accountKey)
                    continue;
                let accountId = accountIdsByName[accountKey];
                let url = `accounts/${accountId}/courses`;
                config.queryParams = config.queryParams || {};
                config.queryParams['search_term'] = code;
                if (term !== null) {
                    config.queryParams['enrollment_term_id'] = term.id;
                }
                courseDataList = yield getApiPagedData(url, config);
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
            return courseDataList.map(courseData => new Course(courseData));
        });
    }
    static getAllByCode(code_1) {
        return course_awaiter(this, arguments, void 0, function* (code, term = null, config = undefined) {
            return this.getCoursesByString(code, term, config);
        });
    }
    static getByCode(code_1) {
        return course_awaiter(this, arguments, void 0, function* (code, term = null, config = undefined) {
            const courses = yield this.getCoursesByString(code, term, config);
            if (Array.isArray(courses))
                return courses[0];
            return null;
        });
    }
    static getAccountIdsByName() {
        return course_awaiter(this, void 0, void 0, function* () {
            let course = yield Course.getFromUrl();
            if (!course) {
                console.warn("You must be on a canvas page to get accounts");
                return {};
            }
            return {
                'root': course.canvasData['root_account_id'],
                'current': course.canvasData['accountId']
            };
        });
    }
    static courseEvent(courses, event, accountId) {
        return course_awaiter(this, void 0, void 0, function* () {
            const url = `accounts/${accountId}/courses`;
            const data = {
                'event': event,
                'course_ids[]': courses.map(course => course.id)
            };
            return yield fetchApiJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: JSON.stringify(data)
                }
            });
        });
    }
    get contentUrlPath() {
        return `courses/${this.id}`;
    }
    get courseUrl() {
        return this.htmlContentUrl;
    }
    get courseCode() {
        let match = this.codeMatch;
        if (!match)
            return null;
        let prefix = match[1] || "";
        let courseCode = match[2] || "";
        return `${prefix}_${courseCode}`;
    }
    get fullCourseCode() {
        return this.canvasData.course_code;
    }
    get codeMatch() {
        return Course.CODE_REGEX.exec(this.canvasData.course_code);
    }
    get baseCode() {
        let match = this.codeMatch;
        return match ? match[2] : '';
    }
    get termIds() {
        return this.canvasData.enrollment_term_id;
    }
    get termId() {
        const id = this.canvasData.enrollment_term_id;
        assert_default()(typeof id === "number");
        return id;
    }
    getTerm() {
        return course_awaiter(this, void 0, void 0, function* () {
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
    get isBlueprint() {
        return 'blueprint' in this.canvasData && this.canvasData['blueprint'];
    }
    get workflowState() {
        return this.canvasData.workflow_state;
    }
    get start() {
        return new Date(this.getItem('start_at'));
    }
    get end() {
        return new Date(this.getItem('end_at'));
    }
    get isDev() {
        if (this.name.match(/^DEV/))
            return true;
    }
    getModules() {
        return course_awaiter(this, void 0, void 0, function* () {
            if (this._modules) {
                return this._modules;
            }
            let modules = yield getApiPagedData(`${this.contentUrlPath}/modules?include[]=items&include[]=content_details`);
            this._modules = modules;
            return modules;
        });
    }
    getStartDateFromModules() {
        return course_awaiter(this, void 0, void 0, function* () {
            return getCurrentStartDate(yield this.getModules());
        });
    }
    getInstructors() {
        return course_awaiter(this, void 0, void 0, function* () {
            return yield fetchApiJson(`courses/${this.id}/users?enrollment_type=teacher`);
        });
    }
    getLatePolicy(config) {
        return course_awaiter(this, void 0, void 0, function* () {
            const latePolicyResult = yield fetchJson(`/api/v1/courses/${this.id}/late_policy`, config);
            assert_default()('late_policy' in latePolicyResult);
            return latePolicyResult.late_policy;
        });
    }
    getTerms() {
        return course_awaiter(this, void 0, void 0, function* () {
            if (this.termIds) {
                if (Array.isArray(this.termIds)) {
                    let terms = yield Promise.all(this.termIds.map((termId) => course_awaiter(this, void 0, void 0, function* () {
                        return Term.getTermById(termId);
                    })));
                    terms = terms.filter((term) => {
                        return term;
                    });
                    return terms;
                }
            }
            return null;
        });
    }
    getContentItemFromUrl() {
        return course_awaiter(this, arguments, void 0, function* (url = null) {
            let ContentClass = Course.getContentClassFromUrl(url);
            if (!ContentClass)
                return null;
            return ContentClass.getFromUrl(url);
        });
    }
    getModulesByWeekNumber() {
        return course_awaiter(this, void 0, void 0, function* () {
            if (this.modulesByWeekNumber)
                return this.modulesByWeekNumber;
            let modules = yield this.getModules();
            let modulesByWeekNumber = {};
            for (let module of modules) {
                let weekNumber = getModuleWeekNumber(module);
                if (weekNumber) {
                    modulesByWeekNumber[weekNumber] = module;
                }
            }
            this.modulesByWeekNumber = modulesByWeekNumber;
            return modulesByWeekNumber;
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
        return course_awaiter(this, void 0, void 0, function* () {
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
        return course_awaiter(this, arguments, void 0, function* (config = { queryParams: {} }) {
            if (!this.canvasData.syllabus_body) {
                config.queryParams = Object.assign(Object.assign({}, config.queryParams), { include: ['syllabus_body'] });
                const data = yield Course.getCourseById(this.id, config);
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
        return course_awaiter(this, void 0, void 0, function* () {
            config = overrideConfig(config, { queryParams: { include: ['due_at'] } });
            return yield Assignment.getAllInCourse(this.id, config);
        });
    }
    getContent(config_1) {
        return course_awaiter(this, arguments, void 0, function* (config, refresh = false) {
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
        return course_awaiter(this, void 0, void 0, function* () {
            return yield Discussion.getAllInCourse(this.id, config);
        });
    }
    getAssignmentGroups(config) {
        return course_awaiter(this, void 0, void 0, function* () {
            return yield getApiPagedData(`courses/${this.id}/assignment_groups`, config);
        });
    }
    /**
     *Gets all quizzes in a course
     * @param queryParams a json object representing the query param string. Defaults to including due dates     *
     * @returns {Promise<Quiz[]>}
     */
    getQuizzes(config) {
        return course_awaiter(this, void 0, void 0, function* () {
            return yield Quiz.getAllInCourse(this.id, config);
        });
    }
    getAssociatedCourses() {
        return course_awaiter(this, void 0, void 0, function* () {
            if (!this.isBlueprint)
                return null;
            const url = `courses/${this.id}/blueprint_templates/default/associated_courses`;
            const courses = yield getApiPagedData(url, { queryParams: { per_page: 50 } });
            return courses.map(courseData => new Course(courseData));
        });
    }
    getSubsections() {
        return course_awaiter(this, void 0, void 0, function* () {
            const url = `/api/v1/courses/${this.id}/sections`;
            return yield fetchApiJson(url);
        });
    }
    getTabs(config) {
        return course_awaiter(this, void 0, void 0, function* () {
            return yield fetchApiJson(`courses/${this.id}/tabs`, config);
        });
    }
    getFrontPage() {
        return course_awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fetchOneKnownApiJson(`${this.contentUrlPath}/front_page`);
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
        return course_awaiter(this, void 0, void 0, function* () {
            const id = this.id;
            const reloaded = yield Course.getCourseById(id);
            this.canvasData = reloaded.rawData;
        });
    }
    setNavigationTabHidden(label, value) {
        return course_awaiter(this, void 0, void 0, function* () {
            const tab = this.getTab(label);
            if (!tab)
                return null;
            return yield fetchApiJson(`courses/${this.id}/tabs/${tab.id}`, {
                queryParams: { 'hidden': value }
            });
        });
    }
    changeSyllabus(newHtml) {
        return course_awaiter(this, void 0, void 0, function* () {
            this.canvasData['syllabus_body'] = newHtml;
            return yield fetchApiJson(`courses/${this.id}`, {
                fetchInit: {
                    method: 'PUT',
                    body: formDataify({
                        course: {
                            syllabus_body: newHtml
                        }
                    })
                }
            });
        });
    }
    getPotentialSections(term) {
        return course_awaiter(this, void 0, void 0, function* () {
            return yield Course.getAllByCode(this.baseCode, term);
        });
    }
    lockBlueprint() {
        return course_awaiter(this, void 0, void 0, function* () {
            const modules = yield this.getModules();
            let items = [];
            items = items.concat(...modules.map((a) => [].concat(...a.items)));
            const promises = items.map((item) => course_awaiter(this, void 0, void 0, function* () {
                const url = `${this.contentUrlPath}/blueprint_templates/default/restrict_item`;
                let { type, id } = yield getItemTypeAndId(item);
                if (!id)
                    return;
                let body = {
                    "content_type": type,
                    "content_id": id,
                    "restricted": true,
                    "_method": 'PUT'
                };
                console.log(body);
                yield fetchApiJson(url, {
                    fetchInit: {
                        method: 'PUT',
                        body: formDataify(body)
                    }
                });
            }));
            yield Promise.all(promises);
        });
    }
    setAsBlueprint() {
        return course_awaiter(this, void 0, void 0, function* () {
            const url = `courses/${this.id}`;
            const payload = {
                'course[blueprint]': true,
                'course[use_blueprint_restrictions_by_object_type]': 0,
                'course[blueprint_restrictions][content]': 1,
                'course[blueprint_restrictions][points]': 1,
                'course[blueprint_restrictions][due_dates]': 1,
                'course[blueprint_restrictions][availability_dates]': 1,
            };
            this.canvasData = yield fetchOneKnownApiJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }
            });
            this.resetCache();
        });
    }
    unsetAsBlueprint() {
        return course_awaiter(this, void 0, void 0, function* () {
            const url = `courses/${this.id}`;
            const payload = {
                'course[blueprint]': false,
            };
            this.canvasData = yield fetchOneKnownApiJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }
            });
            this.resetCache();
        });
    }
    resetCache() {
        //delete this.subsections;
        //delete this.associatedCourses;
    }
    static publishAll(courses, accountId) {
        return course_awaiter(this, void 0, void 0, function* () {
            if (courses.length == 0)
                return false;
            const courseIds = courses.map((course) => {
                if (course instanceof Course) {
                    return course.id;
                }
                return course;
            });
            const url = `accounts/${accountId}/courses`;
            const data = {
                'event': 'offer',
                'course_ids': courseIds,
            };
            return yield fetchOneUnknownApiJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: formDataify(data),
                }
            });
        });
    }
    updateDueDates(offset) {
        return course_awaiter(this, void 0, void 0, function* () {
            const promises = [];
            let assignments = yield this.getAssignments();
            let quizzes = yield this.getQuizzes();
            if (offset === 0 || offset) {
                for (let assignment of assignments) {
                    console.log(assignment);
                    promises.push(assignment.dueAtTimeDelta(Number(offset)));
                }
                for (let quiz of quizzes) {
                    promises.push(quiz.dueAtTimeDelta(Number(offset)));
                }
            }
            yield Promise.all(promises);
            return [...assignments, ...quizzes];
        });
    }
    publish() {
        return course_awaiter(this, void 0, void 0, function* () {
            const url = `courses/${this.id}`;
            const courseData = yield fetchOneKnownApiJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: formDataify({ 'offer': true })
                }
            });
            console.log(courseData);
            this.canvasData = courseData;
            this.resetCache();
        });
    }
    unpublish() {
        return course_awaiter(this, void 0, void 0, function* () {
            const url = `courses/${this.id}`;
            yield fetchApiJson(url, {
                fetchInit: {
                    method: 'PUT',
                    body: JSON.stringify({ 'course[event]': 'claim' })
                }
            });
            this.canvasData = Object.assign({}, (yield Course.getCourseById(this.id)).canvasData);
        });
    }
    reset() {
        return course_awaiter(this, arguments, void 0, function* (prompt = true) {
            if (prompt && !confirm(`Are you sure you want to reset ${this.courseCode}?`)) {
                return false;
            }
            const url = `/courses/${this.id}/reset_content`;
            const data = yield fetchOneKnownApiJson(url, { fetchInit: { method: 'POST' } });
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
        return course_awaiter(this, arguments, void 0, function* (prompt = false, updateCallback) {
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
        return course_awaiter(this, void 0, void 0, function* () {
            throw new NotImplementedException();
        });
    }
    getParentCourse() {
        return course_awaiter(this, arguments, void 0, function* (return_dev_search = false) {
            let migrations = yield getApiPagedData(`courses/${this.id}/content_migrations`);
            if (migrations.length < 1) {
                console.log('no migrations found');
                if (return_dev_search) {
                    return Course.getByCode('DEV_' + this.baseCode);
                }
                else
                    return null;
            }
            migrations.sort((a, b) => b.id - a.id);
            try {
                for (let migration of migrations) {
                    let course = yield Course.getCourseById(migration['settings']['source_course_id']);
                    if (course && course.codePrefix.includes("DEV"))
                        return course;
                }
            }
            catch (e) {
                return yield Course.getByCode('DEV_' + this.baseCode);
            }
            return yield Course.getByCode('DEV_' + this.baseCode);
        });
    }
    /* Not working due to CORS; we need to set up the proxy server to be able to resize images.

     */
    regenerateHomeTiles() {
        return course_awaiter(this, void 0, void 0, function* () {
            const modules = yield this.getModules();
            let urls = yield Promise.all(modules.map((module) => course_awaiter(this, void 0, void 0, function* () {
                let dataUrl = yield this.generateHomeTile(module);
            })));
            console.log('done');
        });
    }
    generateHomeTile(module) {
        return course_awaiter(this, void 0, void 0, function* () {
            let overview = module.items.find(item => item.type === "Page" &&
                item.title.toLowerCase().includes('overview'));
            if (!(overview === null || overview === void 0 ? void 0 : overview.url))
                return; //skip this if it's not an overview
            const url = overview.url.replace(/.*\/api\/v1/, '/api/v1');
            const pageData = yield fetchJson(url);
            const overviewPage = new Page(pageData, this.id);
            const pageBody = document.createElement('html');
            pageBody.innerHTML = overviewPage.body;
            let bannerImg = pageBody.querySelector('.cbt-banner-image img');
            assert_default()(bannerImg, "Page has no banner");
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
        return course_awaiter(this, void 0, void 0, function* () {
            const frontPage = yield this.getFrontPage();
            assert_default()(frontPage && frontPage.body, "Course front page not found");
            const frontPageProfile = getCurioPageFrontPageProfile(frontPage === null || frontPage === void 0 ? void 0 : frontPage.body);
            frontPageProfile.sourcePage = frontPage;
            return frontPageProfile;
        });
    }
    getPotentialInstructorProfiles() {
        return course_awaiter(this, void 0, void 0, function* () {
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
        return course_awaiter(this, void 0, void 0, function* () {
            return yield fetchJson(`/api/v1/courses/${this.id}/settings`, config);
        });
    }
}
Course.CODE_REGEX = /^(.+[^_])?_?(\w{4}\d{3})/i; // Adapted to JavaScript's regex syntax.
Course.contentClasses = [Assignment, Discussion, Quiz, Page];
class CourseNotFoundException extends Error {
}

;// CONCATENATED MODULE: ./src/ui/module/index.ts
var module_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


(() => module_awaiter(void 0, void 0, void 0, function* () {
    const course = yield Course.getFromUrl(document.documentURI);
    let moduleHeader = document.querySelector('.header-bar-right__buttons');
    if (moduleHeader) {
        if (course === null || course === void 0 ? void 0 : course.isBlueprint) {
            let btn = document.createElement('btn');
            btn.innerHTML = "Lock All";
            moduleHeader.insertBefore(btn, moduleHeader.firstChild);
            btn.classList.add('btn');
            btn.addEventListener('click', () => module_awaiter(void 0, void 0, void 0, function* () {
                btn.innerHTML = "Locking...";
                yield course.lockBlueprint();
                btn.innerHTML = "Locked!";
                location.reload();
            }));
        }
        let btn = document.createElement('btn');
        btn.classList.add('btn');
        btn.innerHTML = "Adjust Due Dates";
        moduleHeader.insertBefore(btn, moduleHeader.firstChild);
        btn.addEventListener('click', () => module_awaiter(void 0, void 0, void 0, function* () {
            let offset = prompt("Days to offset by?");
            assert_default()(course);
            assert_default()(offset);
            yield course.updateDueDates(parseInt(offset));
            location.reload();
        }));
    }
}))();

})();

/******/ })()
;
//# sourceMappingURL=module.js.map