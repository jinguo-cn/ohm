!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ohm=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var ohm = _dereq_('../src/main.js');
ohm._ohmGrammarFactory =
(function(ohm, optNamespace) {
  var b = ohm._builder();
  b.setName('Ohm');
  b.setRuleDescription(undefined); b.define('Grammars', b.many(b.app('Grammar'), 0));
  b.setRuleDescription(undefined); b.define('Grammar', b.seq(b.bind(b.app('ident'), 'n'), b.bind(b.opt(b.app('SuperGrammar')), 's'), b.prim('{'), b.bind(b.many(b.app('Rule'), 0), 'rs'), b.prim('}')));
  b.inline('SuperGrammar_qualified', b.seq(b.prim('<:'), b.bind(b.app('ident'), 'ns'), b.prim('.'), b.bind(b.app('ident'), 'n')));
  b.inline('SuperGrammar_unqualified', b.seq(b.prim('<:'), b.bind(b.app('ident'), 'n')));
  b.setRuleDescription(undefined); b.define('SuperGrammar', b.alt(b.app('SuperGrammar_qualified'), b.app('SuperGrammar_unqualified')));
  b.inline('Rule_define', b.seq(b.bind(b.app('ident'), 'n'), b.bind(b.opt(b.app('ruleDescr')), 'd'), b.prim('='), b.bind(b.app('Alt'), 'b')));
  b.inline('Rule_override', b.seq(b.bind(b.app('ident'), 'n'), b.prim(':='), b.bind(b.app('Alt'), 'b')));
  b.inline('Rule_extend', b.seq(b.bind(b.app('ident'), 'n'), b.prim('+='), b.bind(b.app('Alt'), 'b')));
  b.setRuleDescription(undefined); b.define('Rule', b.alt(b.app('Rule_define'), b.app('Rule_override'), b.app('Rule_extend')));
  b.inline('Alt_rec', b.seq(b.bind(b.app('Term'), 'x'), b.prim('|'), b.bind(b.app('Alt'), 'y')));
  b.setRuleDescription(undefined); b.define('Alt', b.alt(b.app('Alt_rec'), b.app('Term')));
  b.inline('Term_inline', b.seq(b.bind(b.app('Seq'), 'x'), b.bind(b.app('caseName'), 'n')));
  b.setRuleDescription(undefined); b.define('Term', b.alt(b.app('Term_inline'), b.app('Seq')));
  b.setRuleDescription(undefined); b.define('Seq', b.many(b.app('Factor'), 0));
  b.inline('Factor_bind', b.seq(b.bind(b.app('Iter'), 'x'), b.prim(':'), b.bind(b.app('ident'), 'n')));
  b.setRuleDescription(undefined); b.define('Factor', b.alt(b.app('Factor_bind'), b.app('Iter')));
  b.inline('Iter_star', b.seq(b.bind(b.app('Pred'), 'x'), b.prim('*')));
  b.inline('Iter_plus', b.seq(b.bind(b.app('Pred'), 'x'), b.prim('+')));
  b.inline('Iter_opt', b.seq(b.bind(b.app('Pred'), 'x'), b.prim('?')));
  b.setRuleDescription(undefined); b.define('Iter', b.alt(b.app('Iter_star'), b.app('Iter_plus'), b.app('Iter_opt'), b.app('Pred')));
  b.inline('Pred_not', b.seq(b.prim('~'), b.bind(b.app('Base'), 'x')));
  b.inline('Pred_lookahead', b.seq(b.prim('&'), b.bind(b.app('Base'), 'x')));
  b.setRuleDescription(undefined); b.define('Pred', b.alt(b.app('Pred_not'), b.app('Pred_lookahead'), b.app('Base')));
  b.inline('Base_application', b.seq(b.bind(b.app('ident'), 'ruleName'), b.not(b.alt(b.seq(b.opt(b.app('ruleDescr')), b.prim('=')), b.prim(':='), b.prim('+=')))));
  b.inline('Base_prim', b.alt(b.app('keyword'), b.app('string'), b.app('regExp'), b.app('number')));
  b.inline('Base_paren', b.seq(b.prim('('), b.bind(b.app('Alt'), 'x'), b.prim(')')));
  b.inline('Base_listy', b.seq(b.prim('['), b.bind(b.app('Alt'), 'x'), b.prim(']')));
  b.inline('Base_obj', b.seq(b.prim('{'), b.bind(b.opt(b.prim('...')), 'lenient'), b.prim('}')));
  b.inline('Base_objWithProps', b.seq(b.prim('{'), b.bind(b.app('Props'), 'ps'), b.bind(b.opt(b.seq(b.prim(','), b.prim('...'))), 'lenient'), b.prim('}')));
  b.setRuleDescription(undefined); b.define('Base', b.alt(b.app('Base_application'), b.app('Base_prim'), b.app('Base_paren'), b.app('Base_listy'), b.app('Base_obj'), b.app('Base_objWithProps')));
  b.inline('Props_rec', b.seq(b.bind(b.app('Prop'), 'p'), b.prim(','), b.bind(b.app('Props'), 'ps')));
  b.inline('Props_base', b.bind(b.app('Prop'), 'p'));
  b.setRuleDescription(undefined); b.define('Props', b.alt(b.app('Props_rec'), b.app('Props_base')));
  b.setRuleDescription(undefined); b.define('Prop', b.seq(b.bind(b.alt(b.app('name'), b.app('string')), 'n'), b.prim(':'), b.bind(b.app('Base'), 'p')));
  b.setRuleDescription(' rule description for use in error messages'); b.define('ruleDescr', b.seq(b.prim('--'), b.bind(b.app('ruleDescrText'), 't'), b.prim('\n')));
  b.setRuleDescription(undefined); b.define('ruleDescrText', b.many(b.seq(b.not(b.prim('\n')), b.app('_')), 0));
  b.setRuleDescription(undefined); b.define('caseName', b.seq(b.prim('--'), b.many(b.seq(b.not(b.prim('\n')), b.app('space')), 0), b.bind(b.app('name'), 'n'), b.many(b.seq(b.not(b.prim('\n')), b.app('space')), 0), b.alt(b.prim('\n'), b.la(b.prim('}')))));
  b.setRuleDescription(' name'); b.define('name', b.seq(b.app('nameFirst'), b.many(b.app('nameRest'), 0)));
  b.setRuleDescription(undefined); b.define('nameFirst', b.alt(b.prim('_'), b.app('letter')));
  b.setRuleDescription(undefined); b.define('nameRest', b.alt(b.prim('_'), b.app('alnum')));
  b.setRuleDescription(' identifier'); b.define('ident', b.seq(b.not(b.app('keyword')), b.bind(b.app('name'), 'n')));
  b.inline('keyword_undefined', b.seq(b.prim('undefined'), b.not(b.app('nameRest'))));
  b.inline('keyword_null', b.seq(b.prim('null'), b.not(b.app('nameRest'))));
  b.inline('keyword_true', b.seq(b.prim('true'), b.not(b.app('nameRest'))));
  b.inline('keyword_false', b.seq(b.prim('false'), b.not(b.app('nameRest'))));
  b.setRuleDescription(undefined); b.define('keyword', b.alt(b.app('keyword_undefined'), b.app('keyword_null'), b.app('keyword_true'), b.app('keyword_false')));
  b.setRuleDescription(' string literal'); b.define('string', b.seq(b.prim("'"), b.bind(b.many(b.app('sChar'), 0), 'cs'), b.prim("'")));
  b.setRuleDescription(undefined); b.define('sChar', b.alt(b.seq(b.prim('\\x'), b.app('hexDigit'), b.app('hexDigit')), b.seq(b.prim('\\u'), b.app('hexDigit'), b.app('hexDigit'), b.app('hexDigit'), b.app('hexDigit')), b.seq(b.prim('\\'), b.app('_')), b.seq(b.not(b.prim("'")), b.not(b.prim('\n')), b.app('_'))));
  b.setRuleDescription(' regular expression'); b.define('regExp', b.seq(b.prim('/'), b.bind(b.app('reCharClass'), 'e'), b.prim('/')));
  b.setRuleDescription(undefined); b.define('reCharClass', b.seq(b.prim('['), b.many(b.alt(b.prim('\\]'), b.seq(b.not(b.prim(']')), b.app('_'))), 0), b.prim(']')));
  b.setRuleDescription(' number'); b.define('number', b.seq(b.opt(b.prim('-')), b.many(b.app('digit'), 1)));
  b.inline('space_singleLine', b.seq(b.prim('//'), b.many(b.seq(b.not(b.prim('\n')), b.app('_')), 0), b.prim('\n')));
  b.inline('space_multiLine', b.seq(b.prim('/*'), b.many(b.seq(b.not(b.prim('*/')), b.app('_')), 0), b.prim('*/')));
  b.extend('space', b.alt(b.app('space_singleLine'), b.app('space_multiLine')));
  return b.build(optNamespace);
});

},{"../src/main.js":16}],2:[function(_dereq_,module,exports){
exports.objectUtils = _dereq_('./objectUtils.js')
exports.stringUtils = _dereq_('./stringUtils.js')
exports.equals = _dereq_('./equals.js')
exports.browser = _dereq_('./browser.js')

},{"./browser.js":3,"./equals.js":4,"./objectUtils.js":5,"./stringUtils.js":6}],3:[function(_dereq_,module,exports){
var thisModule = exports

// --------------------------------------------------------------------
// Logging
// --------------------------------------------------------------------

var subscribed = {}

exports.log = function(subject /* , ... */) {
  if (!subscribed[subject])
    return
  arguments[0] = '[' + subject + ']'
  console.log.apply(console, arguments)
}

exports.subscribe = function(subject) {
  subscribed[subject] = true
}

exports.unsubscribe = function(subject) {
  delete showing[subject]
}

// --------------------------------------------------------------------
// Asserts, errors, etc.
// --------------------------------------------------------------------

exports.error = function(/* arg1, arg2, ... */) {
  var args = Array.prototype.slice.call(arguments)
  console.error.apply(console, args)
  throw 'error: ' + args.join(' ')
}

exports.sanityCheck = function(name, condition) {
  if (!condition)
    thisModule.error('failed sanity check:', name)
}

// --------------------------------------------------------------------
// DOM utils
// --------------------------------------------------------------------

exports.prettyPrintNode = function(node, endNode, endOffset) {
  if (node instanceof Text) {
    if (node === endNode)
      return 'text{' + node.data.substr(0, endOffset) + '|' + node.data.substr(endOffset) + '}'
    else
      return 'text{' + node.data + '}'
  }

  var parts = [node.tagName, '{']
  for (var idx = 0; idx < node.childNodes.length; idx++) {
    if (node === endNode && endOffset == idx)
      parts.push('|')
    parts.push(thisModule.prettyPrintNode(node.childNodes.item(idx), endNode, endOffset))
  }
  if (node === endNode && endOffset == node.childNodes.length)
    parts.push('|')
  parts.push('}')
  return parts.join('')
}


},{}],4:[function(_dereq_,module,exports){
// Helpers

function doubleEquals(x, y) {
  return x == y
}

function tripleEquals(x, y) {
  return x === y
}

function isPrimitive(x) {
  var type = typeof x
  return type !== 'object'
}

function equals(x, y, deep, eqFn) {
  if (isPrimitive(x))
    return eqFn(x, y)
  for (var p in x)
    if (deep && !equals(x[p], y[p], deep, eqFn) ||
        !deep && !eqFn(x[p], y[p]))
      return false
  for (var p in y)
    if (y[p] !== undefined &&
        x[p] === undefined)
      return false
  return true
}

function haveSameContentsInAnyOrder(arr1, arr2, deep, eqFn) {
  if (!arr1 instanceof Array || !arr2 instanceof Array ||
      arr1.length !== arr2.length)
    return false
  for (var idx = 0; idx < arr1.length; idx++) {
    var x = arr1[idx]
    var foundX = arr2.some(function(y) {
      return equals(x, y, deep, eqFn)
    })
    if (!foundX)
      return false
  }
  return true
}

// Public methods

exports.equals = function(x, y) {
  return equals(x, y, false, doubleEquals)
}

exports.deepEquals = function(x, y) {
  return equals(x, y, true, doubleEquals)
}

exports.strictEquals = function(x, y) {
  return equals(x, y, false, tripleEquals)
}

exports.strictDeepEquals = function(x, y) {
  return equals(x, y, true, tripleEquals)
}

exports.haveSameContentsInAnyOrder = function(arr1, arr2) {
  return haveSameContentsInAnyOrder(arr1, arr2, true, doubleEquals)
}


},{}],5:[function(_dereq_,module,exports){
var thisModule = exports

exports.objectThatDelegatesTo = function(obj, optProperties) {
  function cons() {}
  cons.prototype = obj
  var ans = new cons()
  if (optProperties)
    thisModule.keysAndValuesDo(optProperties, function(k, v) {
      ans[k] = v
    })
  return ans
}

exports.formals = function(func) {
  return func.
    toString().
    match(/\((.*?)\)/)[0].
    replace(/ /g, '').
    slice(1, -1).
    split(',').
    filter(function(moduleName) { return moduleName != '' })
}

exports.keysDo = function(object, fn) {
  for (var p in object)
    if (object.hasOwnProperty(p))
      fn(p)
}

exports.valuesDo = function(object, fn) {
  thisModule.keysDo(object, function(p) { fn(object[p]) })
}

exports.keysAndValuesDo = function(object, fn) {
  thisModule.keysDo(object, function(p) { fn(p, object[p]) })
}

exports.keysIterator = function(object) {
  return function(fn) { self.keysDo(object, fn) }
}

exports.valuesIterator = function(object) {
  return function(fn) { self.valuesDo(object, fn) }
}

exports.keysAndValuesIterator = function(object) {
  return function(fn) { self.keysAndValuesDo(object, fn) }
}

exports.values = function(object) {
  var ans = []
  thisModule.keysDo(object, function(p) { ans.push(object[p]) })
  return ans
}

function StringBuffer() {
  this.strings = []
  this.lengthSoFar = 0
}

StringBuffer.prototype = {
  nextPutAll: function(s) {
    this.strings.push(s)
    this.lengthSoFar += s.length
  },

  contents: function()  {
    return this.strings.join('')
  }
}

exports.stringBuffer = function() {
  return new StringBuffer()
}

function ColumnStringBuffer() {
  this.lines = []
  this.newLine()
}

ColumnStringBuffer.prototype = {
  nextPutAll: function(s) {
    this.currentColumn().push(s)
  },

  contents: function() {
    // Convert columns from lists of strings to strings, and record column lengths
    var columnLengths = []
    this.lines.forEach(function(line) {
      for (var colIdx = 0; colIdx < line.length; colIdx++) {
        var column = line[colIdx]
        line[colIdx] = column.join('')
        if (columnLengths[colIdx] === undefined || columnLengths[colIdx] < line[colIdx].length)
          columnLengths[colIdx] = line[colIdx].length
      }
    })

    var sb = thisModule.stringBuffer()
    this.lines.forEach(function(line) {
      for (var colIdx = 0; colIdx < line.length; colIdx++) {
        var column = line[colIdx]
        sb.nextPutAll(column)
        var numSpaces = columnLengths[colIdx] - column.length
        while (numSpaces-- > 0)
          sb.nextPutAll(' ')
      }
      sb.nextPutAll('\n')
    })
    return sb.contents()
  },

  newLine: function() {
    this.lines.push([])
    this.newColumn()
  },

  newColumn: function() {
    this.currentLine().push([])
  },

  currentColumn: function() {
    var line = this.currentLine()
    return line[line.length - 1]
  },

  currentLine: function() {
    return this.lines[this.lines.length - 1]
  }
}

exports.columnStringBuffer = function() {
  return new ColumnStringBuffer()
}


},{}],6:[function(_dereq_,module,exports){
var objectUtils = _dereq_('./objectUtils.js')
var thisModule = exports

// Helpers

function pad(numberAsString, len) {
  var zeros = []
  for (var idx = 0; idx < numberAsString.length - len; idx++)
    zeros.push('0')
  return zeros.join('') + numberAsString
}

var escapeStringFor = {}
for (var c = 0; c < 128; c++)
  escapeStringFor[c] = String.fromCharCode(c)
escapeStringFor["'".charCodeAt(0)]  = "\\'"
escapeStringFor['"'.charCodeAt(0)]  = '\\"'
escapeStringFor['\\'.charCodeAt(0)] = '\\\\'
escapeStringFor['\b'.charCodeAt(0)] = '\\b'
escapeStringFor['\f'.charCodeAt(0)] = '\\f'
escapeStringFor['\n'.charCodeAt(0)] = '\\n'
escapeStringFor['\r'.charCodeAt(0)] = '\\r'
escapeStringFor['\t'.charCodeAt(0)] = '\\t'
escapeStringFor['\v'.charCodeAt(0)] = '\\v'

// Public methods

exports.escapeChar = function(c, optDelim) {
  var charCode = c.charCodeAt(0)
  if ((c == '"' || c == "'") && optDelim && c !== optDelim)
    return c
  else if (charCode < 128)
    return escapeStringFor[charCode]
  else if (128 <= charCode && charCode < 256)
    return '\\x' + pad(charCode.toString(16), 2)
  else
    return '\\u' + pad(charCode.toString(16), 4)
}

exports.unescapeChar = function(s) {
  if (s.charAt(0) == '\\')
    switch (s.charAt(1)) {
      case 'b':  return '\b'
      case 'f':  return '\f'
      case 'n':  return '\n'
      case 'r':  return '\r'
      case 't':  return '\t'
      case 'v':  return '\v'
      case 'x':  return String.fromCharCode(parseInt(s.substring(2, 4), 16))
      case 'u':  return String.fromCharCode(parseInt(s.substring(2, 6), 16))
      default:   return s.charAt(1)
    }
  else
    return s
}

function printOn(x, ws) {
  if (x instanceof Array) {
    ws.nextPutAll('[')
    for (var idx = 0; idx < x.length; idx++) {
      if (idx > 0)
        ws.nextPutAll(', ')
      printOn(x[idx], ws)
    }
    ws.nextPutAll(']')
  } else if (typeof x === 'string') {
    var hasSingleQuotes = x.indexOf("'") >= 0
    var hasDoubleQuotes = x.indexOf('"') >= 0
    var delim = hasSingleQuotes && !hasDoubleQuotes ? '"' : "'"
    ws.nextPutAll(delim)
    for (var idx = 0; idx < x.length; idx++)
      ws.nextPutAll(thisModule.escapeChar(x[idx], delim))
    ws.nextPutAll(delim)
  } else if (x === null) {
    ws.nextPutAll('null')
  } else if (typeof x === 'object' && !(x instanceof RegExp)) {
    ws.nextPutAll('{')
    var first = true
    objectUtils.keysAndValuesDo(x, function(k, v) {
      if (first)
        first = false
      else
        ws.nextPutAll(', ')
      printOn(k, ws)
      ws.nextPutAll(': ')
      printOn(v, ws)
    })
    ws.nextPutAll('}')
  } else
    ws.nextPutAll('' + x)
}

exports.printString = function(obj) {
  var ws = objectUtils.stringBuffer()
  printOn(obj, ws)
  return ws.contents()
}


},{"./objectUtils.js":5}],7:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Grammar = _dereq_('./Grammar.js');
var decls = _dereq_('./decls.js');
var pexprs = _dereq_('./pexprs.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Builder() {
  this.init();
}

Builder.prototype = {
  init: function() {
    this.name = undefined;
    this.superGrammar = Grammar.prototype;
    this.ruleDecls = [];
  },

  setName: function(name) {
    this.name = name;
  },

  setSuperGrammar: function(grammar) {
    this.superGrammar = grammar;
  },

  setRuleDescription: function(text) {
    this.ruleDescription = text;
  },

  define: function(ruleName, body) {
    this.ruleDecls.push(new decls.Define(ruleName, body, this.superGrammar, this.ruleDescription));
    this.ruleDescription = undefined;
  },

  override: function(ruleName, body) {
    this.ruleDecls.push(new decls.Override(ruleName, body, this.superGrammar));
  },

  inline: function(ruleName, body) {
    this.ruleDecls.push(new decls.Inline(ruleName, body, this.superGrammar));
    return this.app(ruleName);
  },

  extend: function(ruleName, body) {
    this.ruleDecls.push(new decls.Extend(ruleName, body, this.superGrammar));
  },

  build: function(optNamespace) {
    var superGrammar = this.superGrammar;
    var ruleDict = objectThatDelegatesTo(superGrammar.ruleDict);
    this.ruleDecls.forEach(function(ruleDecl) {
      ruleDecl.performChecks();
      ruleDecl.install(ruleDict);
    });

    var grammar = new Grammar(ruleDict);
    grammar.superGrammar = superGrammar;
    grammar.ruleDecls = this.ruleDecls;
    if (this.name) {
      grammar.name = this.name;
      if (optNamespace) {
        grammar.namespaceName = optNamespace.name;
        optNamespace.install(this.name, grammar);
      }
    }
    this.init();
    return grammar;
  },

  prim: function(x) { return pexprs.makePrim(x); },
  alt: function(/* term1, term1, ... */) {
    var terms = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (arg instanceof pexprs.Alt) {
        terms = terms.concat(arg.terms);
      } else {
        terms.push(arg);
      }
    }
    return terms.length === 1 ? terms[0] : new pexprs.Alt(terms);
  },
  seq: function(/* factor1, factor2, ... */) {
    var factors = [];
    for (var idx = 0; idx < arguments.length; idx++) {
      var arg = arguments[idx];
      if (arg instanceof pexprs.Seq) {
        factors = factors.concat(arg.factors);
      } else {
        factors.push(arg);
      }
    }
    return factors.length === 1 ? factors[0] : new pexprs.Seq(factors);
  },
  bind: function(expr, name) { return new pexprs.Bind(expr, name); },
  many: function(expr, minNumMatches) { return new pexprs.Many(expr, minNumMatches); },
  opt: function(expr) { return new pexprs.Opt(expr); },
  not: function(expr) { return new pexprs.Not(expr); },
  la: function(expr) { return new pexprs.Lookahead(expr); },
  listy: function(expr) { return new pexprs.Listy(expr); },
  obj: function(properties, isLenient) { return new pexprs.Obj(properties, !!isLenient); },
  app: function(ruleName) { return new pexprs.Apply(ruleName); }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Builder;


},{"./Grammar.js":8,"./decls.js":14,"./pexprs.js":26,"awlib":2}],8:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var InputStream = _dereq_('./InputStream.js');
var pexprs = _dereq_('./pexprs.js');
var skipSpaces = _dereq_('./skipSpaces.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser;
var keysDo = awlib.objectUtils.keysDo;
var valuesDo = awlib.objectUtils.valuesDo;
var formals = awlib.objectUtils.formals;
var makeStringBuffer = awlib.objectUtils.stringBuffer;
var printString = awlib.stringUtils.printString;
var equals = awlib.equals.equals;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Grammar(ruleDict) {
  this.ruleDict = ruleDict;
}

Grammar.prototype = {
  ruleDict: new (function() {
    this._ = pexprs.anything;
    this.end = new pexprs.Not(pexprs.anything);
    this.space = pexprs.makePrim(/[\s]/);
    this.space.description = 'space';
    this.alnum = pexprs.makePrim(/[0-9a-zA-Z]/);
    this.space.description = 'alpha-numeric character';
    this.letter = pexprs.makePrim(/[a-zA-Z]/);
    this.letter.description = 'letter';
    this.lower = pexprs.makePrim(/[a-z]/);
    this.lower.description = 'lower-case letter';
    this.upper = pexprs.makePrim(/[A-Z]/);
    this.upper.description = 'upper-case letter';
    this.digit = pexprs.makePrim(/[0-9]/);
    this.digit.description = 'digit';
    this.hexDigit = pexprs.makePrim(/[0-9a-fA-F]/);
    this.hexDigit.description = 'hexadecimal digit';
  })(),

  match: function(obj, startRule, optThrowOnFail) {
    return this.matchContents([obj], startRule, optThrowOnFail);
  },

  matchContents: function(obj, startRule, optThrowOnFail) {
    var inputStream = InputStream.newFor(obj);
    var thunk = new pexprs.Apply(startRule).eval(optThrowOnFail, undefined, this.ruleDict, inputStream, undefined);

    var succeeded;
    if (thunk === common.fail) {
      succeeded = false;
    } else {
      // This match only succeeded if the start rule consumed all of the input.
      if (common.isSyntactic(startRule)) {
        skipSpaces(this.ruleDict, inputStream);
      }
      succeeded = pexprs.end.eval(optThrowOnFail, false, this.ruleDict, inputStream, undefined) !== common.fail;
    }

    if (succeeded) {
      var assertSemanticActionNamesMatch = this.assertSemanticActionNamesMatch.bind(this);
      var ans = function(actionDict) {
        assertSemanticActionNamesMatch(actionDict);
        return thunk.force(actionDict, {});
      };
      ans.toString = function() { return '[ohm thunk]'; };
      return ans;
    } else if (optThrowOnFail) {
      throw new errors.MatchFailure(inputStream, this.ruleDict);
    } else {
      return false;
    }
  },

  assertSemanticActionNamesMatch: function(actionDict) {
    var self = this;
    var ruleDict = this.ruleDict;
    var ok = true;
    keysDo(ruleDict, function(ruleName) {
      if (actionDict[ruleName] === undefined) {
        return;
      }
      var actual = formals(actionDict[ruleName]).sort();
      var expected = self.semanticActionArgNames(ruleName);
      if (!equals(actual, expected)) {
        ok = false;
        console.log('semantic action for rule', ruleName, 'has the wrong argument names');
        console.log('  expected', expected, '(in any order)');
        console.log('    actual', actual);
      }
    });
    if (!ok) {
      browser.error('one or more semantic actions have the wrong argument names -- see console for details');
    }
  },

  semanticActionArgNames: function(ruleName) {
    if (this.superGrammar && this.superGrammar.ruleDict[ruleName]) {
      return this.superGrammar.semanticActionArgNames(ruleName);
    } else {
      var body = this.ruleDict[ruleName];
      var names = body.getBindingNames();
      if (names.length > 0) {
        return names;
      } else {
        return body.producesValue() ? ['expr'] : [];
      }
    }
  },

  toRecipe: function() {
    var ws = makeStringBuffer();
    ws.nextPutAll('(function(ohm, optNamespace) {\n');
    ws.nextPutAll('  var b = ohm._builder();\n');
    ws.nextPutAll('  b.setName('); ws.nextPutAll(printString(this.name)); ws.nextPutAll(');\n');
    if (this.superGrammar.name && this.superGrammar.namespaceName) {
      ws.nextPutAll('  b.setSuperGrammar(ohm.namespace(');
      ws.nextPutAll(printString(this.superGrammar.namespaceName));
      ws.nextPutAll(').getGrammar(');
      ws.nextPutAll(printString(this.superGrammar.name));
      ws.nextPutAll('));\n');
    }
    for (var idx = 0; idx < this.ruleDecls.length; idx++) {
      ws.nextPutAll('  ');
      this.ruleDecls[idx].outputRecipe(ws);
      ws.nextPutAll(';\n');
    }
    ws.nextPutAll('  return b.build(optNamespace);\n');
    ws.nextPutAll('});');
    return ws.contents();
  },

  toSemanticActionTemplate: function(/* entryPoint1, entryPoint2, ... */) {
    var entryPoints = arguments.length > 0 ? arguments : Object.keys(this.ruleDict);
    var rulesToBeIncluded = this.rulesThatNeedSemanticAction(entryPoints);
    
    // TODO: add the super-grammar's templates at the right place, e.g., a case for AddExpr_plus should appear next to
    // other cases of AddExpr.

    var self = this;
    var buffer = makeStringBuffer();
    buffer.nextPutAll('{');

    var first = true;
    for (var ruleName in rulesToBeIncluded) {
      var body = this.ruleDict[ruleName];
      if (first) {
        first = false;
      } else {
        buffer.nextPutAll(',');
      }
      buffer.nextPutAll('\n');
      buffer.nextPutAll('  ');
      self.addSemanticActionTemplate(ruleName, body, buffer);
    }

    buffer.nextPutAll('\n}');
    return buffer.contents();
  },

  addSemanticActionTemplate: function(ruleName, body, buffer) {
    buffer.nextPutAll(ruleName);
    buffer.nextPutAll(': function(');
    buffer.nextPutAll(this.semanticActionArgNames(ruleName).join(', '));
    buffer.nextPutAll(') {\n');
    buffer.nextPutAll('  }');
  },

  rulesThatNeedSemanticAction: function(entryPoints) {
    var self = this;
    function getBody(ruleName) {
      if (self.ruleDict[ruleName] === undefined) {
        throw new errors.UndeclaredRule(ruleName, self.name);
      } else {
        return self.ruleDict[ruleName];
      }
    }

    var rules = {};
    for (var idx = 0; idx < entryPoints.length; idx++) {
      var ruleName = entryPoints[idx];
      getBody(ruleName);  // to make sure the rule exists
      rules[ruleName] = true;
    }

    var done = false;
    while (!done) {
      done = true;
      for (var ruleName in rules) {
        var addedNewRule = getBody(ruleName).addRulesThatNeedSemanticAction(rules, true);
        done &= !addedNewRule;
      }
    }

    return rules;
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Grammar;


},{"./InputStream.js":9,"./common.js":13,"./errors.js":15,"./pexprs.js":26,"./skipSpaces.js":27,"awlib":2}],9:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var PosInfo = _dereq_('./PosInfo.js');
var Grammar = _dereq_('./Grammar.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function InputStream() {
  throw 'InputStream cannot be instantiated -- it\'s abstract';
}

InputStream.newFor = function(obj) {
  if (typeof obj === 'string') {
    return new StringInputStream(obj);
  } else if (obj instanceof Array) {
    return new ListInputStream(obj);
  } else {
    throw 'cannot make input stream for ' + obj;
  }
};

InputStream.prototype = {
  init: function(source) {
    this.source = source;
    this.pos = 0;
    this.posInfos = [];
    this.failures = null;
    this.failuresPos = -1;
  },

  recordFailure: function(pos, expr) {
    if (pos > this.failuresPos) {
      this.failures = {expr: expr, next: null};
      this.failuresPos = pos;
    } else if (pos === this.failuresPos) {
      this.failures = {expr: expr, next: this.failures};
    }
  },

  getCurrentPosInfo: function() {
    var currPos = this.pos;
    var posInfo = this.posInfos[currPos];
    return posInfo || (this.posInfos[currPos] = new PosInfo(currPos));
  },

  atEnd: function() {
    return this.pos === this.source.length;
  },

  next: function() {
    if (this.atEnd()) {
      return common.fail;
    } else {
      return this.source[this.pos++];
    }
  },

  matchExactly: function(x) {
    return this.next() === x ? true : common.fail;
  },

  interval: function(startIdx, endIdx) {
    return this.source.slice(startIdx, endIdx);
  },

  getFailuresPos: function() {
    return this.failuresPos;
  }
};

function StringInputStream(source) {
  this.init(source);
}

StringInputStream.prototype = objectThatDelegatesTo(InputStream.prototype, {
  matchString: function(s) {
    for (var idx = 0; idx < s.length; idx++) {
      if (this.matchExactly(s[idx]) === common.fail) {
        return common.fail;
      }
    }
    return true;
  },

  matchRegExp: function(e) {
    // IMPORTANT: e must be a non-global, one-character expression, e.g., /./ and /[0-9]/
    var c = this.next();
    return c !== common.fail && e.test(c) ? true : common.fail;
  }
});

function ListInputStream(source) {
  this.init(source);
}

ListInputStream.prototype = objectThatDelegatesTo(InputStream.prototype, {
  matchString: function(s) {
    return this.matchExactly(s);
  },

  matchRegExp: function(e) {
    return this.matchExactly(e);
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = InputStream;


},{"./Grammar.js":8,"./PosInfo.js":12,"./common.js":13,"awlib":2}],10:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var InputStream = _dereq_('./InputStream.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Interval(source, startIdx, endIdx) {
  this.source = source;
  this.startIdx = startIdx;
  this.endIdx = endIdx;
}

Object.defineProperties(Interval.prototype, {
  'contents': {
    get: function() {
      if (this._contents === undefined) {
        this._contents = InputStream.newFor(this.source).interval(this.startIdx, this.endIdx);
      }
      return this._contents;
    },
    enumerable: true
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Interval;


},{"./InputStream.js":9}],11:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var ohm = _dereq_('./main.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser;

// --------------------------------------------------------------------
// Namespaces
// --------------------------------------------------------------------

function Namespace(name) {
  this.name = name;
  this.grammars = {};
}

Namespace.prototype = {
  install: function(name, grammar) {
    if (this.grammars[name]) {
      throw new errors.DuplicateGrammarDeclaration(name, this.name);
    } else {
      this.grammars[name] = grammar;
    }
    return this;
  },

  getGrammar: function(name) {
    if (this.grammars[name]) {
      return this.grammars[name];
    } else {
      throw new errors.UndeclaredGrammar(name, this.name);
    }
  },

  loadGrammarsFromScriptElement: function(element) {
    browser.sanityCheck('script tag\'s type attribute must be "text/ohm-js"', element.type === 'text/ohm-js');
    ohm.makeGrammars(element.innerHTML, this);
    return this;
  },

  make: function(recipe) {
    return recipe(ohm, this);
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = Namespace;


},{"./errors.js":15,"./main.js":16,"awlib":2}],12:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function PosInfo() {
  this.ruleStack = [];
  this.activeRules = {};  // redundant (could be generated from ruleStack) but useful for performance reasons
  this.memo = {};
}

PosInfo.prototype = {
  isActive: function(ruleName) {
    return this.activeRules[ruleName];
  },

  enter: function(ruleName) {
    this.ruleStack.push(ruleName);
    this.activeRules[ruleName] = true;
  },

  exit: function(ruleName) {
    this.ruleStack.pop();
    this.activeRules[ruleName] = false;
  },

  shouldUseMemoizedResult: function(memoRec) {
    var involvedRules = memoRec.involvedRules;
    for (var ruleName in involvedRules) {
      if (involvedRules[ruleName] && this.activeRules[ruleName]) {
        return false;
      }
    }
    return true;
  },

  getCurrentLeftRecursion: function() {
    return this.leftRecursionStack ? this.leftRecursionStack[this.leftRecursionStack.length - 1] : undefined;
  },

  startLeftRecursion: function(ruleName) {
    if (!this.leftRecursionStack) {
      this.leftRecursionStack = [];
    }
    this.leftRecursionStack.push({name: ruleName, value: common.fail, pos: -1, involvedRules: {}});
    this.updateInvolvedRules();
  },

  endLeftRecursion: function(ruleName) {
    this.leftRecursionStack.pop();
  },

  updateInvolvedRules: function() {
    var currentLeftRecursion = this.getCurrentLeftRecursion();
    var involvedRules = currentLeftRecursion.involvedRules;
    var lrRuleName = currentLeftRecursion.name;
    var idx = this.ruleStack.length - 1;
    while (true) {
      var ruleName = this.ruleStack[idx--];
      if (ruleName === lrRuleName) {
        break;
      }
      involvedRules[ruleName] = true;
    }
  }
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = PosInfo;


},{"./common.js":13}],13:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.abstract = function() {
  throw 'this method is abstract!';
};

exports.getDuplicates = function(array) {
  var duplicates = [];
  for (var idx = 0; idx < array.length; idx++) {
    var x = array[idx];
    if (array.lastIndexOf(x) !== idx && duplicates.indexOf(x) < 0) {
      duplicates.push(x);
    }
  }
  return duplicates;
};

exports.fail = {};

exports.isSyntactic = function(ruleName) {
  var firstChar = ruleName[0];
  return 'A' <= firstChar && firstChar <= 'Z';
};


},{}],14:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;
var printString = awlib.stringUtils.printString;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function outputRecipe(decl, ws) {
  ws.nextPutAll('b.');
  ws.nextPutAll(decl.kind);
  ws.nextPutAll('(');
  ws.nextPutAll(printString(decl.name));
  ws.nextPutAll(', ');
  decl.body.outputRecipe(ws);
  ws.nextPutAll(')');
}

function RuleDecl() {
  throw 'RuleDecl cannot be instantiated -- it\'s abstract';
}

RuleDecl.prototype = {
  performChecks: common.abstract,

  performCommonChecks: function(name, body) {
    body.assertNoDuplicateBindings(name);
    body.assertNoUselessBindings(name);
    body.assertChoicesHaveUniformBindings(name);
  },

  install: common.abstract,

  outputRecipe: function(ws) { outputRecipe(this, ws); }
};

function Define(name, body, superGrammar, description) {
  this.name = name;
  this.body = body;
  this.superGrammar = superGrammar;
  this.description = description;
}

Define.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'define',

  performChecks: function() {
    if (this.superGrammar.ruleDict[this.name]) {
      throw new errors.DuplicateRuleDeclaration(this.name, this.superGrammar.name);
    }
    this.performCommonChecks(this.name, this.body);
  },

  outputRecipe: function(ws) {
    ws.nextPutAll('b.setRuleDescription(');
    ws.nextPutAll(printString(this.description));
    ws.nextPutAll('); ');
    outputRecipe(this, ws);
  },

  install: function(ruleDict) {
    this.body.description = this.description;
    ruleDict[this.name] = this.body;
  }
});

function Override(name, body, superGrammar) {
  this.name = name;
  this.body = body;
  this.superGrammar = superGrammar;
}

Override.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'override',

  performChecks: function() {
    var overridden = this.superGrammar.ruleDict[this.name];
    if (!overridden) {
      throw new errors.UndeclaredRule(this.name, this.superGrammar.name);
    }
    if (overridden.getBindingNames().length === 0 && overridden.producesValue() && !this.body.producesValue()) {
      throw new errors.RuleMustProduceValue(this.name, 'overriding');
    }
    this.performCommonChecks(this.name, this.body);
  },

  install: function(ruleDict) {
    this.body.description = this.superGrammar.ruleDict[this.name].description;
    ruleDict[this.name] = this.body;
  }
});

function Inline(name, body, superGrammar) {
  this.name = name;
  this.body = body;
  this.superGrammar = superGrammar;
}

Inline.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'inline',

  performChecks: function() {
    // TODO: consider relaxing this check, e.g., make it ok to override an inline rule if the nesting rule is
    // an override. But only if the inline rule that's being overridden is nested inside the nesting rule that
    // we're overriding? Hopefully there's a much less complicated way to do this :)
    if (this.superGrammar.ruleDict[this.name]) {
      throw new errors.DuplicateRuleDeclaration(this.name, this.superGrammar.name);
    }
    this.performCommonChecks(this.name, this.body);
  },

  install: function(ruleDict) {
    ruleDict[this.name] = this.body;
  }
});

function Extend(name, body, superGrammar) {
  this.name = name;
  this.base = superGrammar.ruleDict[name];
  if (!this.base) {
    throw new errors.UndeclaredRule(name, superGrammar.name);
  }
  this.body = body;
  this.extendedBody = new pexprs.ExtendAlt(this.body, this.base);
  this.superGrammar = superGrammar;
}

Extend.prototype = objectThatDelegatesTo(RuleDecl.prototype, {
  kind: 'extend',

  performChecks: function() {
    if (this.base.getBindingNames().length === 0 && this.base.producesValue() && !this.body.producesValue()) {
      throw new errors.RuleMustProduceValue(this.name, 'extending');
    }
    this.performCommonChecks(this.name, this.extendedBody);
  },

  install: function(ruleDict) {
    this.extendedBody.description = this.superGrammar.ruleDict[this.name].description;
    ruleDict[this.name] = this.extendedBody;
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.RuleDecl = RuleDecl;
exports.Define = Define;
exports.Override = Override;
exports.Inline = Inline;
exports.Extend = Extend;


},{"./common.js":13,"./errors.js":15,"./pexprs.js":26,"awlib":2}],15:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;
var makeStringBuffer = awlib.objectUtils.stringBuffer;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Error() {
  throw 'Error cannot be instantiated -- it\'s abstract';
}

Error.prototype.getMessage = common.abstract;

Error.prototype.printMessage = function() {
  console.log(this.getMessage());
};

Error.prototype.getShortMessage = function() {
  return this.getMessage();
};

Error.prototype.printShortMessage = function() {
  console.log(this.getMessage());
};

Error.prototype.toString = function() {
  return this.getShortMessage();
};

// ----------------- errors about grammars -----------------

// Undeclarated grammar

function UndeclaredGrammar(grammarName, optNamespaceName) {
  this.grammarName = grammarName;
  this.namespaceName = optNamespaceName;
};

UndeclaredGrammar.prototype = objectThatDelegatesTo(Error.prototype);

UndeclaredGrammar.prototype.getMessage = function() {
  return this.namespaceName ?
    ['grammar', this.grammarName, 'is not declared in namespace', this.namespaceName].join(' ') :
    ['undeclared grammar', this.grammarName].join(' ');
};

// Duplicate grammar declaration

function DuplicateGrammarDeclaration(grammarName, namespaceName) {
  this.grammarName = grammarName;
  this.namespaceName = namespaceName;
};

DuplicateGrammarDeclaration.prototype = objectThatDelegatesTo(Error.prototype);

DuplicateGrammarDeclaration.prototype.getMessage = function() {
  return ['grammar', this.grammarName, 'is already declared in namespace', this.namespaceName].join(' ');
};

// ----------------- rules -----------------

// Undeclared rule

function UndeclaredRule(ruleName, optGrammarName) {
  this.ruleName = ruleName;
  this.grammarName = optGrammarName;
};

UndeclaredRule.prototype = objectThatDelegatesTo(Error.prototype);

UndeclaredRule.prototype.getMessage = function() {
  return this.grammarName ?
    ['rule', this.ruleName, 'is not declared in grammar', this.grammarName].join(' ') :
    ['undeclared rule', this.ruleName].join(' ');
};

// Duplicate rule declaration

function DuplicateRuleDeclaration(ruleName, grammarName) {
  this.ruleName = ruleName;
  this.grammarName = grammarName;
};

DuplicateRuleDeclaration.prototype = objectThatDelegatesTo(Error.prototype);

DuplicateRuleDeclaration.prototype.getMessage = function() {
  return ['rule', this.ruleName, 'is already declared in grammar', this.grammarName].join(' ');
};

// Rule must produce value

function RuleMustProduceValue(ruleName, why) {
  this.ruleName = ruleName;
  this.why = why;
};

RuleMustProduceValue.prototype = objectThatDelegatesTo(Error.prototype);

RuleMustProduceValue.prototype.getMessage = function() {
  return [
    'rule', this.ruleName, 'must produce a value',
    'because the rule it is', this.why, 'also produces a value'
  ].join(' ');
};

// ----------------- bindings -----------------

// Inconsistent bindings

function InconsistentBindings(ruleName, expected, actual) {
  this.ruleName = ruleName;
  this.expected = expected;
  this.actual = actual;
};

InconsistentBindings.prototype = objectThatDelegatesTo(Error.prototype);

InconsistentBindings.prototype.getMessage = function() {
  return [
    'rule', this.ruleName, 'has inconsistent bindings.',
    'expected:', this.expected,
    'got:', this.actual
  ].join(' ');
};

// Duplicate bindings

function DuplicateBindings(ruleName, duplicates) {
  this.ruleName = ruleName;
  this.duplicates = duplicates;
};

DuplicateBindings.prototype = objectThatDelegatesTo(Error.prototype);

DuplicateBindings.prototype.getMessage = function() {
  return ['rule', this.ruleName, 'has duplicate bindings:', this.duplicates].join(' ');
};

// Useless bindings

function UselessBindings(ruleName, useless) {
  this.ruleName = ruleName;
  this.useless = useless;
};

UselessBindings.prototype = objectThatDelegatesTo(Error.prototype);

UselessBindings.prototype.getMessage = function() {
  return ['rule', this.ruleName, 'has useless bindings:', this.useless].join(' ');
};

// ----------------- properties -----------------

// Duplicate property names

function DuplicatePropertyNames(duplicates) {
  this.duplicates = duplicates;
};

DuplicatePropertyNames.prototype = objectThatDelegatesTo(Error.prototype);

DuplicatePropertyNames.prototype.getMessage = function() {
  return ['object pattern has duplicate property names:', this.duplicates].join(' ');
};

// ----------------- syntax -----------------

function toErrorInfo(pos, str) {
  var lineNum = 1;
  var colNum = 1;

  var currPos = 0;
  var lineStartPos = 0;

  while (currPos < pos) {
    var c = str.charAt(currPos++);
    if (c === '\n') {
      lineNum++;
      colNum = 1;
      lineStartPos = currPos;
    } else if (c !== '\r') {
      colNum++;
    }
  }

  var lineEndPos = str.indexOf('\n', lineStartPos);
  if (lineEndPos < 0) {
    lineEndPos = str.length;
  }

  return {
    lineNum: lineNum,
    colNum: colNum,
    line: str.substr(lineStartPos, lineEndPos - lineStartPos)
  };
}

function MatchFailure(inputStream, ruleDict) {
  this.inputStream = inputStream;
  this.ruleDict = ruleDict;
}

MatchFailure.prototype = objectThatDelegatesTo(Error.prototype);

MatchFailure.prototype.getPos = function() {
  return this.inputStream.failuresPos;
};

MatchFailure.prototype.getShortMessage = function() {
 if (typeof this.inputStream.source !== 'string') {
    return 'error at position ' + this.getPos();
  } else {
    var text = makeStringBuffer();
    var errorInfo = toErrorInfo(this.getPos(), this.inputStream.source);
    text.nextPutAll(this.getLineAndColText());
    text.nextPutAll(': expected ');
    text.nextPutAll(this.getExpectedText());
    return text.contents();
  }
};

MatchFailure.prototype.getMessage = function() {
 if (typeof this.inputStream.source !== 'string') {
    return 'error at position ' + this.getPos();
  } else {
    var text = makeStringBuffer();
    var errorInfo = toErrorInfo(this.getPos(), this.inputStream.source);
    var lineAndColText = this.getLineAndColText() + ': ';
    text.nextPutAll(lineAndColText);
    text.nextPutAll(errorInfo.line);
    text.nextPutAll('\n');
    for (var idx = 1; idx < lineAndColText.length + errorInfo.colNum; idx++) {
      text.nextPutAll(' ');
    }
    text.nextPutAll('^');
  }
  text.nextPutAll('\nExpected: ');
  text.nextPutAll(this.getExpectedText());
  return text.contents();
};

MatchFailure.prototype.getLineAndColText = function() {
  var errorInfo = toErrorInfo(this.getPos(), this.inputStream.source);
  return 'Line ' + errorInfo.lineNum + ', col ' + errorInfo.colNum;
};

MatchFailure.prototype.getExpectedText = function() {
  var text = makeStringBuffer();
  var expected = this.getExpected();
  for (var idx = 0; idx < expected.length; idx++) {
    if (idx > 0) {
      if (idx === expected.length - 1) {
        text.nextPutAll(expected.length > 2 ? ', or ' : ' or ');
      } else {
        text.nextPutAll(', ');
      }
    }
    text.nextPutAll(expected[idx]);
  }
  return text.contents();
};

MatchFailure.prototype.getExpected = function() {
  var expected = {};
  for (var failure = this.inputStream.failures; failure !== null; failure = failure.next) {
    expected[failure.expr.toExpected(this.ruleDict)] = true;
  }
  return Object.keys(expected).reverse();
};

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.UndeclaredGrammar = UndeclaredGrammar;
exports.DuplicateGrammarDeclaration = DuplicateGrammarDeclaration;
exports.UndeclaredRule = UndeclaredRule;
exports.DuplicateRuleDeclaration = DuplicateRuleDeclaration;
exports.RuleMustProduceValue = RuleMustProduceValue;
exports.InconsistentBindings = InconsistentBindings;
exports.DuplicateBindings = DuplicateBindings;
exports.UselessBindings = UselessBindings;
exports.DuplicatePropertyNames = DuplicatePropertyNames;
exports.MatchFailure = MatchFailure;


},{"./common.js":13,"awlib":2}],16:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

_dereq_('../dist/ohm-grammar.js');

var Builder = _dereq_('./Builder.js');
var Namespace = _dereq_('./Namespace.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var unescapeChar = awlib.stringUtils.unescapeChar;

var thisModule = exports;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function makeGrammarActionDict(optNamespace) {
  var builder;
  return {
    Grammars: function(expr) {
      return expr.value;
    },

    Grammar: function(n, s, rs) {
      builder = new Builder();
      builder.setName(n.value);
      s.value;  // force evaluation
      rs.value;  // force evaluation
      return builder.build(optNamespace);
    },

    SuperGrammar: function(expr) {
      builder.setSuperGrammar(expr.value);
    },
    SuperGrammar_qualified: function(ns, n) {
      return thisModule.namespace(ns.value).getGrammar(n.value);
    },
    SuperGrammar_unqualified: function(n) {
      if (optNamespace) {
        return optNamespace.getGrammar(n.value);
      } else {
        throw new errors.UndeclaredGrammar(n.value);
      }
    },

    Rule: function(expr) {
      return expr.value;
    },
    Rule_define: function(n, d, b) {
      builder.currentRuleName = n.value;
      d.value;  // force evaluation
      return builder.define(n.value, b.value);
    },
    Rule_override: function(n, b) {
      builder.currentRuleName = n.value;
      return builder.override(n.value, b.value);
    },
    Rule_extend: function(n, b) {
      builder.currentRuleName = n.value;
      return builder.extend(n.value, b.value);
    },

    Alt: function(expr) {
      return expr.value;
    },
    Alt_rec: function(x, y) {
      return builder.alt(x.value, y.value);
    },

    Term: function(expr) {
      return expr.value;
    },
    Term_inline: function(x, n) {
      return builder.inline(builder.currentRuleName + '_' + n.value, x.value);
    },

    Seq: function(expr) {
      return builder.seq.apply(builder, expr.value);
    },

    Factor: function(expr) {
      return expr.value;
    },
    Factor_bind: function(x, n) {
      return builder.bind(x.value, n.value);
    },

    Iter: function(expr) {
      return expr.value;
    },
    Iter_star: function(x) {
      return builder.many(x.value, 0);
    },
    Iter_plus: function(x) {
      return builder.many(x.value, 1);
    },
    Iter_opt: function(x) {
      return builder.opt(x.value);
    },

    Pred: function(expr) {
      return expr.value;
    },
    Pred_not: function(x) {
      return builder.not(x.value);
    },
    Pred_lookahead: function(x) {
      return builder.la(x.value);
    },

    Base: function(expr) {
      return expr.value;
    },
    Base_application: function(ruleName) {
      return builder.app(ruleName.value);
    },
    Base_prim: function(expr) {
      return builder.prim(expr.value);
    },
    Base_paren: function(x) {
      return x.value;
    },
    Base_listy: function(x) {
      return builder.listy(x.value);
    },
    Base_obj: function(lenient) {
      return builder.obj([], lenient.value);
    },
    Base_objWithProps: function(ps, lenient) {
      return builder.obj(ps.value, lenient.value);
    },

    Props: function(expr) {
      return expr.value;
    },
    Props_rec: function(p, ps) {
      return [p.value].concat(ps.value);
    },
    Props_base: function(p) {
      return [p.value];
    },
    Prop: function(n, p) {
      return {name: n.value, pattern: p.value};
    },

    ruleDescr: function(t) {
      builder.setRuleDescription(t.value);
      return t.value;
    },
    ruleDescrText: function() {
      return this.interval.contents;
    },

    caseName: function(n) {
      return n.value
    },

    name: function() {
      return this.interval.contents;
    },
    nameFirst: function(expr) {},
    nameRest: function(expr) {},

    ident: function(n) {
      return n.value;
    },

    keyword: function(expr) {
      return expr.value;
    },
    keyword_undefined: function() {
      return undefined;
    },
    keyword_null: function() {
      return null;
    },
    keyword_true: function() {
      return true;
    },
    keyword_false: function() {
      return false;
    },

    string: function(cs) {
      return cs.value.map(function(c) { return unescapeChar(c); }).join('');
    },

    sChar: function() {
      return this.interval.contents;
    },

    regExp: function(e) {
      return new RegExp(e.value);
    },

    reCharClass: function() {
      return this.interval.contents;
    },

    number: function() {
      return parseInt(this.interval.contents);
    },

    space: function(expr) {},
    space_multiLine: function() {},
    space_singleLine: function() {}
  };
}

function compileAndLoad(source, whatItIs, optNamespace) {
  try {
    var thunk = thisModule.ohmGrammar.matchContents(source, whatItIs, true);
    return thunk(makeGrammarActionDict(optNamespace));
  } catch (e) {
    if (e instanceof errors.MatchFailure) {
      console.log('\n' + e.getMessage());
    }
    throw e;
  }
}

function makeGrammar(source, optNamespace) {
  return compileAndLoad(source, 'Grammar', optNamespace);
}

function makeGrammars(source, optNamespace) {
  return compileAndLoad(source, 'Grammars', optNamespace);
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

// Stuff that users should know about

var namespaces = {};
exports.namespace = function(name) {
  if (namespaces[name] === undefined) {
    namespaces[name] = new Namespace(name);
  }
  return namespaces[name];
};

exports.make = function(recipe) {
  return recipe(thisModule);
};

exports.makeGrammar = makeGrammar;
exports.makeGrammars = makeGrammars;

// Stuff that's only here for bootstrapping, testing, etc.

exports._builder = function() {
  return new Builder();
};

exports._makeGrammarActionDict = makeGrammarActionDict;

var ohmGrammar;
Object.defineProperty(exports, 'ohmGrammar', {
  get: function() {
    if (!ohmGrammar) {
      ohmGrammar = this._ohmGrammarFactory(this);
    }
    return ohmGrammar;
  }
});


},{"../dist/ohm-grammar.js":1,"./Builder.js":7,"./Namespace.js":11,"./errors.js":15,"awlib":2}],17:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.addRulesThatNeedSemanticAction = common.abstract;

pexprs.anything.addRulesThatNeedSemanticAction = function() {
  // no-op
};

pexprs.end.addRulesThatNeedSemanticAction = function() {
  // no-op
};

pexprs.Prim.prototype.addRulesThatNeedSemanticAction = function() {
  // no-op
};

pexprs.Alt.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  var ans = false;
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    ans |= term.addRulesThatNeedSemanticAction(dict, valueRequired);
  }
  return ans;
};

pexprs.Seq.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  var ans = false;
  for (var idx = 0; idx < this.factors.length; idx++) {
    var factor = this.factors[idx];
    ans |= factor.addRulesThatNeedSemanticAction(dict, false);
  }
  return ans;
};

pexprs.Bind.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, true);
};

pexprs.Many.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Opt.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Not.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Lookahead.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, valueRequired);
};

pexprs.Listy.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Obj.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  return this.expr.addRulesThatNeedSemanticAction(dict, false);
};

pexprs.Apply.prototype.addRulesThatNeedSemanticAction = function(dict, valueRequired) {
  if (!valueRequired || dict[this.ruleName]) {
    return false;
  } else {
    return dict[this.ruleName] = true;
  }
};


},{"./common.js":13,"./pexprs.js":26}],18:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var equals = awlib.equals.equals;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertChoicesHaveUniformBindings = common.abstract;

pexprs.anything.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};

pexprs.end.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  if (this.terms.length === 0) {
    return;
  }
  var names = this.terms[0].getBindingNames();
  for (var idx = 0; idx < this.terms.length; idx++) {
    var term = this.terms[idx];
    term.assertChoicesHaveUniformBindings();
    var otherNames = term.getBindingNames();
    if (!equals(names, otherNames)) {
      throw new errors.InconsistentBindings(ruleName, names, otherNames);
    }
  }
};

pexprs.ExtendAlt.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  // Only has two terms, the second of which has the expected bindings.
  var names = this.terms[1].getBindingNames();
  var otherNames = this.terms[0].getBindingNames();
  if (!equals(names, otherNames)) {
    throw new errors.InconsistentBindings(ruleName, names, otherNames);
  }
};

pexprs.Seq.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertChoicesHaveUniformBindings(ruleName);
  }
};

pexprs.Bind.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Many.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Opt.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Not.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Lookahead.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Listy.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  this.expr.assertChoicesHaveUniformBindings(ruleName);
};

pexprs.Obj.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertChoicesHaveUniformBindings(ruleName);
  }
};

pexprs.Apply.prototype.assertChoicesHaveUniformBindings = function(ruleName) {
  // no-op
};


},{"./common.js":13,"./errors.js":15,"./pexprs.js":26,"awlib":2}],19:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.assertNoDuplicateBindings = common.abstract;

pexprs.anything.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};

pexprs.end.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertNoDuplicateBindings = function(ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertNoDuplicateBindings(ruleName);
  }
};

pexprs.Seq.prototype.assertNoDuplicateBindings = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertNoDuplicateBindings(ruleName);
  }

  var duplicates = common.getDuplicates(this.getBindingNames());
  if (duplicates.length > 0) {
    throw new errors.DuplicateBindings(ruleName, duplicates);
  }
};

pexprs.Bind.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Many.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Opt.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Not.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Lookahead.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Listy.prototype.assertNoDuplicateBindings = function(ruleName) {
  this.expr.assertNoDuplicateBindings(ruleName);
};

pexprs.Obj.prototype.assertNoDuplicateBindings = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertNoDuplicateBindings(ruleName);
  }

  var duplicates = common.getDuplicates(this.getBindingNames());
  if (duplicates.length > 0) {
    throw new errors.DuplicateBindings(ruleName, duplicates);
  }
};

pexprs.Apply.prototype.assertNoDuplicateBindings = function(ruleName) {
  // no-op
};


},{"./common.js":13,"./errors.js":15,"./pexprs.js":26}],20:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');
var errors = _dereq_('./errors.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

function assertNoBindings(ruleName, expr) {
  var bindings = expr.getBindingNames();
  if (bindings.length > 0) {
    throw new errors.UselessBindings(ruleName, bindings);
  }
}

pexprs.PExpr.prototype.assertNoUselessBindings = common.abstract;

pexprs.anything.assertNoUselessBindings = function(ruleName) {
  // no-op
};

pexprs.end.assertNoUselessBindings = function(ruleName) {
  // no-op
};

pexprs.Prim.prototype.assertNoUselessBindings = function(ruleName) {
  // no-op
};

pexprs.Alt.prototype.assertNoUselessBindings = function(ruleName) {
  for (var idx = 0; idx < this.terms.length; idx++) {
    this.terms[idx].assertNoUselessBindings(ruleName);
  }
};

pexprs.Seq.prototype.assertNoUselessBindings = function(ruleName) {
  for (var idx = 0; idx < this.factors.length; idx++) {
    this.factors[idx].assertNoUselessBindings(ruleName);
  }
};

pexprs.Bind.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.Many.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
  assertNoBindings(ruleName, this.expr);
};

pexprs.Opt.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
  assertNoBindings(ruleName, this.expr);
};

pexprs.Not.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
  assertNoBindings(ruleName, this.expr);
};

pexprs.Lookahead.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.Listy.prototype.assertNoUselessBindings = function(ruleName) {
  this.expr.assertNoUselessBindings(ruleName);
};

pexprs.Obj.prototype.assertNoUselessBindings = function(ruleName) {
  for (var idx = 0; idx < this.properties.length; idx++) {
    this.properties[idx].pattern.assertNoUselessBindings(ruleName);
  }
};

pexprs.Apply.prototype.assertNoUselessBindings = function(ruleName) {
  // no-op
};


},{"./common.js":13,"./errors.js":15,"./pexprs.js":26}],21:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');
var thunks = _dereq_('./thunks.js');
var pexprs = _dereq_('./pexprs.js');
var skipSpaces = _dereq_('./skipSpaces.js');
var InputStream = _dereq_('./InputStream.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.eval = common.abstract;

pexprs.anything.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  var value = inputStream.next();
  if (value === common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    return new thunks.ValueThunk(value, inputStream.source, origPos, inputStream.pos);
  }
};

pexprs.end.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  if (inputStream.atEnd()) {
    return new thunks.ValueThunk(undefined, inputStream.source, inputStream.pos, inputStream.pos);
  } else {
    if (recordFailures) {
      inputStream.recordFailure(inputStream.pos, this);
    }
    return common.fail;
  }
};

pexprs.Prim.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  if (this.match(inputStream) === common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    return new thunks.ValueThunk(this.obj, inputStream.source, origPos, inputStream.pos);
  }
};

pexprs.Prim.prototype.match = function(inputStream) {
  return inputStream.matchExactly(this.obj);
};

pexprs.StringPrim.prototype.match = function(inputStream) {
  return inputStream.matchString(this.obj);
};

pexprs.RegExpPrim.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  if (inputStream.matchRegExp(this.obj) === common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    return new thunks.ValueThunk(inputStream.source[origPos], inputStream.source, origPos, inputStream.pos);
  }
};

pexprs.Alt.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var origNumBindings = bindings.length;
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (syntactic) {
      skipSpaces(ruleDict, inputStream);
    }
    var value = this.terms[idx].eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
    if (value !== common.fail) {
      return value;
    } else {
      inputStream.pos = origPos;
      // Note: while the following assignment could be done unconditionally, only doing it when necessary is
      // better for performance. This is b/c assigning to an array's length property is more expensive than a
      // typical assignment.
      if (bindings.length > origNumBindings) {
        bindings.length = origNumBindings;
      }
    }
  }
  return common.fail;
};

pexprs.Seq.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var origPos = inputStream.pos;
  for (var idx = 0; idx < this.factors.length; idx++) {
    if (idx > 0 && syntactic) {
      skipSpaces(ruleDict, inputStream);
    }
    var factor = this.factors[idx];
    var value = factor.eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
    if (value === common.fail) {
      return common.fail;
    }
  }
  return new thunks.ValueThunk(undefined, inputStream.source, origPos, inputStream.pos);
};

pexprs.Bind.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
  if (value !== common.fail) {
    bindings.push(this.name, value);
  }
  return value;
};

pexprs.Many.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var numMatches = 0;
  var matches = this.expr.producesValue() ? [] : undefined;
  var origPos = inputStream.pos;
  while (true) {
    var backtrackPos = inputStream.pos;
    var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, []);
    if (value === common.fail) {
      inputStream.pos = backtrackPos;
      break;
    } else {
      numMatches++;
      if (matches) {
        matches.push(value);
      }
    }
  }
  if (numMatches < this.minNumMatches) {
    return common.fail;
  } else {
    return matches ?
      new thunks.ListThunk(matches, inputStream.source, origPos, inputStream.pos) :
      new thunks.ValueThunk(undefined, inputStream.source, origPos, inputStream.pos);
  }
};

pexprs.Opt.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, []);
  if (value === common.fail) {
    inputStream.pos = origPos;
    return new thunks.ValueThunk(undefined, inputStream.source, origPos, origPos);
  } else {
    return this.expr.producesValue() ? value : new thunks.ValueThunk(true, inputStream.source, origPos, inputStream.pos);
  }
};

pexprs.Not.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var value = this.expr.eval(false, syntactic, ruleDict, inputStream, []);
  if (value !== common.fail) {
    if (recordFailures) {
      inputStream.recordFailure(origPos, this);
    }
    return common.fail;
  } else {
    inputStream.pos = origPos;
    return new thunks.ValueThunk(undefined, inputStream.source, origPos, origPos);
  }
};

pexprs.Lookahead.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var origPos = inputStream.pos;
  var value = this.expr.eval(recordFailures, syntactic, ruleDict, inputStream, []);
  if (value !== common.fail) {
    inputStream.pos = origPos;
  }
  return value;
};

pexprs.Listy.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var obj = inputStream.next();
  if (obj instanceof Array || typeof obj === 'string') {
    var objInputStream = InputStream.newFor(obj);
    var value = this.expr.eval(recordFailures, syntactic, ruleDict, objInputStream, bindings);
    return value !== common.fail && objInputStream.atEnd() ?  new thunks.ValueThunk(obj, inputStream.source, inputStream.pos - 1, inputStream.pos) : common.fail;
  } else {
    return common.fail;
  }
};

pexprs.Obj.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  if (syntactic) {
    skipSpaces(ruleDict, inputStream);
  }
  var obj = inputStream.next();
  if (obj !== common.fail && obj && (typeof obj === 'object' || typeof obj === 'function')) {
    var numOwnPropertiesMatched = 0;
    for (var idx = 0; idx < this.properties.length; idx++) {
      var property = this.properties[idx];
      var value = obj[property.name];
      var valueInputStream = InputStream.newFor([value]);
      var matched =
          property.pattern.eval(recordFailures, syntactic, ruleDict, valueInputStream, bindings) !== common.fail &&
          valueInputStream.atEnd();
      if (!matched) {
        return common.fail;
      }
      if (obj.hasOwnProperty(property.name)) {
        numOwnPropertiesMatched++;
      }
    }
    return this.isLenient || numOwnPropertiesMatched === Object.keys(obj).length ?
        new thunks.ValueThunk(obj, inputStream.source, inputStream.pos - 1, inputStream.pos) :
        common.fail;
  } else {
    return common.fail;
  }
};

pexprs.Apply.prototype.eval = function(recordFailures, syntactic, ruleDict, inputStream, bindings) {
  var ruleName = this.ruleName;
  var origPosInfo = inputStream.getCurrentPosInfo();
  var memoRec = origPosInfo.memo[ruleName];
  if (memoRec && origPosInfo.shouldUseMemoizedResult(memoRec)) {
    inputStream.pos = memoRec.pos;
    return memoRec.value;
  } else if (origPosInfo.isActive(ruleName)) {
    var currentLR = origPosInfo.getCurrentLeftRecursion();
    if (currentLR && currentLR.name === ruleName) {
      origPosInfo.updateInvolvedRules();
      inputStream.pos = currentLR.pos;
      return currentLR.value;
    } else {
      origPosInfo.startLeftRecursion(ruleName);
      return common.fail;
    }
  } else {
    var body = ruleDict[ruleName];
    if (!body) {
      throw new errors.UndeclaredRule(ruleName);
    }
    var origPos = inputStream.pos;
    origPosInfo.enter(ruleName);
    var rf = recordFailures && !body.description;
    var ruleIsSyntactic = common.isSyntactic(ruleName);
    var value = this.evalOnce(body, rf, ruleIsSyntactic, ruleDict, inputStream);
    var currentLR = origPosInfo.getCurrentLeftRecursion();
    if (currentLR) {
      if (currentLR.name === ruleName) {
        value = this.handleLeftRecursion(body, rf, ruleIsSyntactic, ruleDict, inputStream, origPos, currentLR, value);
        origPosInfo.memo[ruleName] =
          {pos: inputStream.pos, value: value, involvedRules: currentLR.involvedRules};
        origPosInfo.endLeftRecursion(ruleName);
      } else if (!currentLR.involvedRules[ruleName]) {
        // Only memoize if this rule is not involved in the current left recursion
        origPosInfo.memo[ruleName] = {pos: inputStream.pos, value: value};
      }
    } else {
      origPosInfo.memo[ruleName] = {pos: inputStream.pos, value: value};
    }
    origPosInfo.exit(ruleName);
    if (value === common.fail && recordFailures && body.description) {
      var errorPos;
      if (body.description && ruleIsSyntactic) {
        inputStream.pos = origPos;
        skipSpaces(ruleDict, inputStream);
        errorPos = inputStream.pos;
      } else {
        errorPos = origPos;
      }
      inputStream.recordFailure(errorPos, this);
    }
    return value;
  }
};

pexprs.Apply.prototype.evalOnce = function(expr, recordFailures, syntactic, ruleDict, inputStream) {
  var origPos = inputStream.pos;
  var bindings = [];
  var value = expr.eval(recordFailures, syntactic, ruleDict, inputStream, bindings);
  if (value === common.fail) {
    return common.fail;
  } else {
    return new thunks.RuleThunk(this.ruleName, inputStream.source, origPos, inputStream.pos, value, bindings);
  }
};

pexprs.Apply.prototype.handleLeftRecursion = function(body, recordFailures, syntactic, ruleDict, inputStream, origPos, currentLR, seedValue) {
  var value = seedValue;
  if (seedValue !== common.fail) {
    currentLR.value = seedValue;
    currentLR.pos = inputStream.pos;
    while (true) {
      inputStream.pos = origPos;
      value = this.evalOnce(body, recordFailures, syntactic, ruleDict, inputStream);
      if (value !== common.fail && inputStream.pos > currentLR.pos) {
        currentLR.value = value;
        currentLR.pos = inputStream.pos;
      } else {
        value = currentLR.value;
        inputStream.pos = currentLR.pos;
        break;
      }
    }
  }
  return value;
};


},{"./InputStream.js":9,"./common.js":13,"./errors.js":15,"./pexprs.js":26,"./skipSpaces.js":27,"./thunks.js":28,"awlib":2}],22:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.getBindingNames = function() {
  return [];
};

pexprs.Alt.prototype.getBindingNames = function() {
  // This is ok b/c all terms must have the same bindings -- this property is checked by the Grammar constructor.
  return this.terms.length === 0 ? [] : this.terms[0].getBindingNames();
};

pexprs.Seq.prototype.getBindingNames = function() {
  var names = [];
  for (var idx = 0; idx < this.factors.length; idx++) {
    names = names.concat(this.factors[idx].getBindingNames());
  }
  return names.sort();
};

pexprs.Bind.prototype.getBindingNames = function() {
  return [this.name].concat(this.expr.getBindingNames()).sort();
};

pexprs.Lookahead.prototype.getBindingNames = function() {
  return this.expr.getBindingNames();
};

pexprs.Listy.prototype.getBindingNames = function() {
  return this.expr.getBindingNames();
};

pexprs.Obj.prototype.getBindingNames = function() {
  var names = [];
  for (var idx = 0; idx < this.properties.length; idx++) {
    names = names.concat(this.properties[idx].pattern.getBindingNames());
  }
  return names.sort();
};


},{"./pexprs.js":26}],23:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

var awlib = _dereq_('awlib');
var printString = awlib.stringUtils.printString;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.outputRecipe = common.abstract;

pexprs.anything.outputRecipe = function(ws) {
  // no-op
};

pexprs.end.outputRecipe = function(ws) {
  // no-op
};

pexprs.Prim.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.prim(');
  ws.nextPutAll(printString(this.obj));
  ws.nextPutAll(')');
};

pexprs.Alt.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.alt(');
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (idx > 0) {
      ws.nextPutAll(', ');
    }
    this.terms[idx].outputRecipe(ws);
  }
  ws.nextPutAll(')');
};

pexprs.Seq.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.seq(');
  for (var idx = 0; idx < this.factors.length; idx++) {
    if (idx > 0) {
      ws.nextPutAll(', ');
    }
    this.factors[idx].outputRecipe(ws);
  }
  ws.nextPutAll(')');
};

pexprs.Bind.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.bind(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(', ');
  ws.nextPutAll(printString(this.name));
  ws.nextPutAll(')');
};

pexprs.Many.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.many(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(', ');
  ws.nextPutAll(this.minNumMatches);
  ws.nextPutAll(')');
};

pexprs.Opt.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.opt(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Not.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.not(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Lookahead.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.la(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Listy.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.listy(');
  this.expr.outputRecipe(ws);
  ws.nextPutAll(')');
};

pexprs.Obj.prototype.outputRecipe = function(ws) {
  function outputPropertyRecipe(prop) {
    ws.nextPutAll('{name: ');
    ws.nextPutAll(printString(prop.name));
    ws.nextPutAll(', pattern: ');
    prop.pattern.outputRecipe(ws);
    ws.nextPutAll('}');
  }

  ws.nextPutAll('b.obj([');
  for (var idx = 0; idx < this.properties.length; idx++) {
    if (idx > 0) {
      ws.nextPutAll(', ');
    }
    outputPropertyRecipe(this.properties[idx]);
  }
  ws.nextPutAll('], ');
  ws.nextPutAll(printString(!!this.isLenient));
  ws.nextPutAll(')');
};

pexprs.Apply.prototype.outputRecipe = function(ws) {
  ws.nextPutAll('b.app(');
  ws.nextPutAll(printString(this.ruleName));
  ws.nextPutAll(')');
};


},{"./common.js":13,"./pexprs.js":26,"awlib":2}],24:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.producesValue = function() {
  return true;
};

pexprs.Alt.prototype.producesValue = function() {
  for (var idx = 0; idx < this.terms.length; idx++) {
    if (!this.terms[idx].producesValue()) {
      return false;
    }
  }
  return true;
}

pexprs.Seq.prototype.producesValue = function() {
  return false;
};

pexprs.Many.prototype.producesValue = function() {
  return this.expr.producesValue();
};

pexprs.Not.prototype.producesValue = function() {
  return false;
};


},{"./pexprs.js":26}],25:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

var awlib = _dereq_('awlib');
var printString = awlib.stringUtils.printString;
var makeStringBuffer = awlib.objectUtils.stringBuffer;

// --------------------------------------------------------------------
// Operations
// --------------------------------------------------------------------

pexprs.PExpr.prototype.toExpected = function(ruleDict) {
  return undefined;
};

pexprs.anything.toExpected = function(ruleDict) {
  return "any object";
};

pexprs.end.toExpected = function(ruleDict) {
  return "end of input";
};

pexprs.Prim.prototype.toExpected = function(ruleDict) {
  return printString(this.obj);
};

pexprs.Not.prototype.toExpected = function(ruleDict) {
  return "no " + this.expr.toExpected();
};

// TODO: think about Listy and Obj

pexprs.Apply.prototype.toExpected = function(ruleDict) {
  var description = ruleDict[this.ruleName].description;
  if (description) {
    return description;
  } else {
    var article = /^[aeiouAEIOU]/.test(this.ruleName) ? "an" : "a";
    return article + " " + this.ruleName;
  }
};


},{"./common.js":13,"./pexprs.js":26,"awlib":2}],26:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var errors = _dereq_('./errors.js');

var awlib = _dereq_('awlib');
var objectThatDelegatesTo = awlib.objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

// General stuff

function PExpr() {
  throw 'PExpr cannot be instantiated -- it\'s abstract';
}

// Anything

var anything = objectThatDelegatesTo(PExpr.prototype);

// End

var end = objectThatDelegatesTo(PExpr.prototype);

// Primitives

function Prim(obj) {
  this.obj = obj;
}

Prim.prototype = objectThatDelegatesTo(PExpr.prototype);

function StringPrim(obj) {
  this.obj = obj;
}

StringPrim.prototype = objectThatDelegatesTo(Prim.prototype);

function RegExpPrim(obj) {
  this.obj = obj;
}

RegExpPrim.prototype = objectThatDelegatesTo(Prim.prototype);

// Alternation

function Alt(terms) {
  this.terms = terms;
}

Alt.prototype = objectThatDelegatesTo(PExpr.prototype);

// ExtendAlt is an implementation detail of rule extension

function ExtendAlt(extensions, base) {
  this.terms = [extensions, base];
}

ExtendAlt.prototype = objectThatDelegatesTo(Alt.prototype);

// Sequences

function Seq(factors) {
  this.factors = factors;
}

Seq.prototype = objectThatDelegatesTo(PExpr.prototype);

// Bindings

function Bind(expr, name) {
  this.expr = expr;
  this.name = name;
}

Bind.prototype = objectThatDelegatesTo(PExpr.prototype);

// Iterators and optionals

function Many(expr, minNumMatches) {
  this.expr = expr;
  this.minNumMatches = minNumMatches;
}

Many.prototype = objectThatDelegatesTo(PExpr.prototype);

function Opt(expr) {
  this.expr = expr;
}

Opt.prototype = objectThatDelegatesTo(PExpr.prototype);

// Predicates

function Not(expr) {
  this.expr = expr;
}

Not.prototype = objectThatDelegatesTo(PExpr.prototype);

function Lookahead(expr) {
  this.expr = expr;
}

Lookahead.prototype = objectThatDelegatesTo(PExpr.prototype);

// Listy object decomposition

function Listy(expr) {
  this.expr = expr;
}

Listy.prototype = objectThatDelegatesTo(PExpr.prototype);

// Object decomposition

function Obj(properties, isLenient) {
  var names = properties.map(function(property) { return property.name; });
  var duplicates = common.getDuplicates(names);
  if (duplicates.length > 0) {
    throw new errors.DuplicatePropertyNames(duplicates);
  } else {
    this.properties = properties;
    this.isLenient = isLenient;
  }
}

Obj.prototype = objectThatDelegatesTo(PExpr.prototype);

// Rule application

function Apply(ruleName) {
  this.ruleName = ruleName;
}

Apply.prototype = objectThatDelegatesTo(PExpr.prototype);

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.makePrim = function(obj) {
  if (typeof obj === 'string' && obj.length !== 1) {
    return new StringPrim(obj);
  }
  else if (obj instanceof RegExp) {
    return new RegExpPrim(obj);
  } else {
    return new Prim(obj);
  }
};

exports.PExpr = PExpr;
exports.anything = anything;
exports.end = end;
exports.Prim = Prim;
exports.StringPrim = StringPrim;
exports.RegExpPrim = RegExpPrim;
exports.Alt = Alt;
exports.ExtendAlt = ExtendAlt;
exports.Seq = Seq;
exports.Bind = Bind;
exports.Many = Many;
exports.Opt = Opt;
exports.Not = Not;
exports.Lookahead = Lookahead;
exports.Listy = Listy;
exports.Obj = Obj;
exports.Apply = Apply;

// --------------------------------------------------------------------
// Extensions
// --------------------------------------------------------------------

_dereq_('./pexprs-addRulesThatNeedSemanticAction.js');
_dereq_('./pexprs-assertNoDuplicateBindings.js');
_dereq_('./pexprs-assertNoUselessBindings.js');
_dereq_('./pexprs-assertChoicesHaveUniformBindings.js');
_dereq_('./pexprs-getBindingNames.js');
_dereq_('./pexprs-eval.js');
_dereq_('./pexprs-outputRecipe.js');
_dereq_('./pexprs-producesValue.js');
_dereq_('./pexprs-toExpected.js');


},{"./common.js":13,"./errors.js":15,"./pexprs-addRulesThatNeedSemanticAction.js":17,"./pexprs-assertChoicesHaveUniformBindings.js":18,"./pexprs-assertNoDuplicateBindings.js":19,"./pexprs-assertNoUselessBindings.js":20,"./pexprs-eval.js":21,"./pexprs-getBindingNames.js":22,"./pexprs-outputRecipe.js":23,"./pexprs-producesValue.js":24,"./pexprs-toExpected.js":25,"awlib":2}],27:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var common = _dereq_('./common.js');
var pexprs = _dereq_('./pexprs.js');

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function skipSpaces(ruleDict, inputStream) {
  while (true) {
    var origPos = inputStream.pos;
    if (ruleDict.space.eval(false, false, ruleDict, inputStream, []) === common.fail) {
      inputStream.pos = origPos;
      break;
    }
  }
}

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

module.exports = skipSpaces;


},{"./common.js":13,"./pexprs.js":26}],28:[function(_dereq_,module,exports){
// --------------------------------------------------------------------
// Imports
// --------------------------------------------------------------------

var Interval = _dereq_('./Interval.js');

var awlib = _dereq_('awlib');
var browser = awlib.browser
var objectUtils = awlib.objectUtils
var objectThatDelegatesTo = objectUtils.objectThatDelegatesTo;

// --------------------------------------------------------------------
// Private stuff
// --------------------------------------------------------------------

function Thunk() {
  throw 'Thunk cannot be instantiated -- it\'s abstract';
}

var nextThunkId = 0;
Thunk.prototype = {
  init: function(source, startIdx, endIdx) {
    this.id = nextThunkId++;
    this._source = source;
    this._startIdx = startIdx;
    this._endIdx = endIdx;
  }
};

Object.defineProperty(Thunk.prototype, 'interval', {
  get: function() {
    return this._interval || (this._interval = new Interval(this._source, this._startIdx, this._endIdx));
  }
});

function RuleThunk(ruleName, source, startIdx, endIdx, value, bindings) {
  this.init(source, startIdx, endIdx);
  this.ruleName = ruleName;
  this.value = value;
  this.bindings = bindings;
}

RuleThunk.prototype = objectThatDelegatesTo(Thunk.prototype, {
  force: function(actionDict, memo) {
    function makeBinding(thunk) {
      var binding = {interval: thunk.interval};
      Object.defineProperty(binding, 'value', {
        get: function() {
          return thunk.force(actionDict, memo);
        }
      });
      return binding;
    }

    if (memo.hasOwnProperty(this.id)) {
      return memo[this.id];
    }

    var action = this.lookupAction(actionDict);
    var addlInfo = this.createAddlInfo();
    if (this.bindings.length === 0) {
      // This rule may or may not produce a value. If it doesn't, this.value is a value thunk w/ a value of undefined, so it's ok to force it
      // unconditionally.
      return memo[this.id] = action.call(addlInfo, makeBinding(this.value));
    } else {
      // The shape of this.bindings is [name1, value1, name2, value2, ...]
      var argDict = {};
      for (var idx = 0; idx < this.bindings.length; idx += 2) {
        argDict[this.bindings[idx]] = this.bindings[idx + 1];
      }
      var formals = objectUtils.formals(action);
      var isDefaultAction = formals.length === 0;
      var args = isDefaultAction ?
        objectUtils.values(argDict).map(function(arg) { return makeBinding(arg); }) :
        formals.map(function(name) { return makeBinding(argDict[name]); });
      return memo[this.id] = action.apply(addlInfo, args);
    }
  },

  lookupAction: function(actionDict) {
    var ruleName = this.ruleName;
    var action = actionDict[ruleName];
    if (action === undefined && actionDict._default !== undefined) {
      action = function() {
        return actionDict._default.call(this, ruleName, Array.prototype.slice.call(arguments));
      };
    }
    return action || browser.error('missing semantic action for', ruleName);
  },

  createAddlInfo: function() {
    return {
      interval: this.interval
    };
  }
});

function ListThunk(thunks, source, startIdx, endIdx) {
  this.init(source, startIdx, endIdx);
  this.thunks = thunks;
}

ListThunk.prototype = objectThatDelegatesTo(Thunk.prototype, {
  force: function(actionDict, memo) {
    if (!memo.hasOwnProperty(this.id)) {
      memo[this.id] = this.thunks.map(function(thunk) { return thunk.force(actionDict, memo); });
    }
    return memo[this.id];
  }
});

function ValueThunk(value, source, startIdx, endIdx) {
  this.init(source, startIdx, endIdx);
  this.value = value;
}

ValueThunk.prototype = objectThatDelegatesTo(Thunk.prototype, {
  force: function(actionDict, memo) {
    return this.value;
  }
});

// --------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------

exports.RuleThunk = RuleThunk;
exports.ListThunk = ListThunk;
exports.ValueThunk = ValueThunk;


},{"./Interval.js":10,"awlib":2}]},{},[16])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL2Rpc3Qvb2htLWdyYW1tYXIuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy9hd2xpYi9zcmMvYXdsaWIuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy9hd2xpYi9zcmMvYnJvd3Nlci5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vbm9kZV9tb2R1bGVzL2F3bGliL3NyYy9lcXVhbHMuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy9hd2xpYi9zcmMvb2JqZWN0VXRpbHMuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL25vZGVfbW9kdWxlcy9hd2xpYi9zcmMvc3RyaW5nVXRpbHMuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9CdWlsZGVyLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvR3JhbW1hci5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL0lucHV0U3RyZWFtLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvSW50ZXJ2YWwuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9OYW1lc3BhY2UuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9Qb3NJbmZvLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvY29tbW9uLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvZGVjbHMuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9lcnJvcnMuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9tYWluLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLWFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbi5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncy5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLWFzc2VydE5vVXNlbGVzc0JpbmRpbmdzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLWV2YWwuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9wZXhwcnMtZ2V0QmluZGluZ05hbWVzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLW91dHB1dFJlY2lwZS5qcyIsIi9Vc2Vycy9hbGV4d2FydGgvcHJvZy9vaG0vc3JjL3BleHBycy1wcm9kdWNlc1ZhbHVlLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvcGV4cHJzLXRvRXhwZWN0ZWQuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9wZXhwcnMuanMiLCIvVXNlcnMvYWxleHdhcnRoL3Byb2cvb2htL3NyYy9za2lwU3BhY2VzLmpzIiwiL1VzZXJzL2FsZXh3YXJ0aC9wcm9nL29obS9zcmMvdGh1bmtzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG9obSA9IHJlcXVpcmUoJy4uL3NyYy9tYWluLmpzJyk7XG5vaG0uX29obUdyYW1tYXJGYWN0b3J5ID1cbihmdW5jdGlvbihvaG0sIG9wdE5hbWVzcGFjZSkge1xuICB2YXIgYiA9IG9obS5fYnVpbGRlcigpO1xuICBiLnNldE5hbWUoJ09obScpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnR3JhbW1hcnMnLCBiLm1hbnkoYi5hcHAoJ0dyYW1tYXInKSwgMCkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnR3JhbW1hcicsIGIuc2VxKGIuYmluZChiLmFwcCgnaWRlbnQnKSwgJ24nKSwgYi5iaW5kKGIub3B0KGIuYXBwKCdTdXBlckdyYW1tYXInKSksICdzJyksIGIucHJpbSgneycpLCBiLmJpbmQoYi5tYW55KGIuYXBwKCdSdWxlJyksIDApLCAncnMnKSwgYi5wcmltKCd9JykpKTtcbiAgYi5pbmxpbmUoJ1N1cGVyR3JhbW1hcl9xdWFsaWZpZWQnLCBiLnNlcShiLnByaW0oJzw6JyksIGIuYmluZChiLmFwcCgnaWRlbnQnKSwgJ25zJyksIGIucHJpbSgnLicpLCBiLmJpbmQoYi5hcHAoJ2lkZW50JyksICduJykpKTtcbiAgYi5pbmxpbmUoJ1N1cGVyR3JhbW1hcl91bnF1YWxpZmllZCcsIGIuc2VxKGIucHJpbSgnPDonKSwgYi5iaW5kKGIuYXBwKCdpZGVudCcpLCAnbicpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdTdXBlckdyYW1tYXInLCBiLmFsdChiLmFwcCgnU3VwZXJHcmFtbWFyX3F1YWxpZmllZCcpLCBiLmFwcCgnU3VwZXJHcmFtbWFyX3VucXVhbGlmaWVkJykpKTtcbiAgYi5pbmxpbmUoJ1J1bGVfZGVmaW5lJywgYi5zZXEoYi5iaW5kKGIuYXBwKCdpZGVudCcpLCAnbicpLCBiLmJpbmQoYi5vcHQoYi5hcHAoJ3J1bGVEZXNjcicpKSwgJ2QnKSwgYi5wcmltKCc9JyksIGIuYmluZChiLmFwcCgnQWx0JyksICdiJykpKTtcbiAgYi5pbmxpbmUoJ1J1bGVfb3ZlcnJpZGUnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ2lkZW50JyksICduJyksIGIucHJpbSgnOj0nKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ2InKSkpO1xuICBiLmlubGluZSgnUnVsZV9leHRlbmQnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ2lkZW50JyksICduJyksIGIucHJpbSgnKz0nKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ2InKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnUnVsZScsIGIuYWx0KGIuYXBwKCdSdWxlX2RlZmluZScpLCBiLmFwcCgnUnVsZV9vdmVycmlkZScpLCBiLmFwcCgnUnVsZV9leHRlbmQnKSkpO1xuICBiLmlubGluZSgnQWx0X3JlYycsIGIuc2VxKGIuYmluZChiLmFwcCgnVGVybScpLCAneCcpLCBiLnByaW0oJ3wnKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ3knKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnQWx0JywgYi5hbHQoYi5hcHAoJ0FsdF9yZWMnKSwgYi5hcHAoJ1Rlcm0nKSkpO1xuICBiLmlubGluZSgnVGVybV9pbmxpbmUnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ1NlcScpLCAneCcpLCBiLmJpbmQoYi5hcHAoJ2Nhc2VOYW1lJyksICduJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ1Rlcm0nLCBiLmFsdChiLmFwcCgnVGVybV9pbmxpbmUnKSwgYi5hcHAoJ1NlcScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdTZXEnLCBiLm1hbnkoYi5hcHAoJ0ZhY3RvcicpLCAwKSk7XG4gIGIuaW5saW5lKCdGYWN0b3JfYmluZCcsIGIuc2VxKGIuYmluZChiLmFwcCgnSXRlcicpLCAneCcpLCBiLnByaW0oJzonKSwgYi5iaW5kKGIuYXBwKCdpZGVudCcpLCAnbicpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdGYWN0b3InLCBiLmFsdChiLmFwcCgnRmFjdG9yX2JpbmQnKSwgYi5hcHAoJ0l0ZXInKSkpO1xuICBiLmlubGluZSgnSXRlcl9zdGFyJywgYi5zZXEoYi5iaW5kKGIuYXBwKCdQcmVkJyksICd4JyksIGIucHJpbSgnKicpKSk7XG4gIGIuaW5saW5lKCdJdGVyX3BsdXMnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ1ByZWQnKSwgJ3gnKSwgYi5wcmltKCcrJykpKTtcbiAgYi5pbmxpbmUoJ0l0ZXJfb3B0JywgYi5zZXEoYi5iaW5kKGIuYXBwKCdQcmVkJyksICd4JyksIGIucHJpbSgnPycpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdJdGVyJywgYi5hbHQoYi5hcHAoJ0l0ZXJfc3RhcicpLCBiLmFwcCgnSXRlcl9wbHVzJyksIGIuYXBwKCdJdGVyX29wdCcpLCBiLmFwcCgnUHJlZCcpKSk7XG4gIGIuaW5saW5lKCdQcmVkX25vdCcsIGIuc2VxKGIucHJpbSgnficpLCBiLmJpbmQoYi5hcHAoJ0Jhc2UnKSwgJ3gnKSkpO1xuICBiLmlubGluZSgnUHJlZF9sb29rYWhlYWQnLCBiLnNlcShiLnByaW0oJyYnKSwgYi5iaW5kKGIuYXBwKCdCYXNlJyksICd4JykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ1ByZWQnLCBiLmFsdChiLmFwcCgnUHJlZF9ub3QnKSwgYi5hcHAoJ1ByZWRfbG9va2FoZWFkJyksIGIuYXBwKCdCYXNlJykpKTtcbiAgYi5pbmxpbmUoJ0Jhc2VfYXBwbGljYXRpb24nLCBiLnNlcShiLmJpbmQoYi5hcHAoJ2lkZW50JyksICdydWxlTmFtZScpLCBiLm5vdChiLmFsdChiLnNlcShiLm9wdChiLmFwcCgncnVsZURlc2NyJykpLCBiLnByaW0oJz0nKSksIGIucHJpbSgnOj0nKSwgYi5wcmltKCcrPScpKSkpKTtcbiAgYi5pbmxpbmUoJ0Jhc2VfcHJpbScsIGIuYWx0KGIuYXBwKCdrZXl3b3JkJyksIGIuYXBwKCdzdHJpbmcnKSwgYi5hcHAoJ3JlZ0V4cCcpLCBiLmFwcCgnbnVtYmVyJykpKTtcbiAgYi5pbmxpbmUoJ0Jhc2VfcGFyZW4nLCBiLnNlcShiLnByaW0oJygnKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ3gnKSwgYi5wcmltKCcpJykpKTtcbiAgYi5pbmxpbmUoJ0Jhc2VfbGlzdHknLCBiLnNlcShiLnByaW0oJ1snKSwgYi5iaW5kKGIuYXBwKCdBbHQnKSwgJ3gnKSwgYi5wcmltKCddJykpKTtcbiAgYi5pbmxpbmUoJ0Jhc2Vfb2JqJywgYi5zZXEoYi5wcmltKCd7JyksIGIuYmluZChiLm9wdChiLnByaW0oJy4uLicpKSwgJ2xlbmllbnQnKSwgYi5wcmltKCd9JykpKTtcbiAgYi5pbmxpbmUoJ0Jhc2Vfb2JqV2l0aFByb3BzJywgYi5zZXEoYi5wcmltKCd7JyksIGIuYmluZChiLmFwcCgnUHJvcHMnKSwgJ3BzJyksIGIuYmluZChiLm9wdChiLnNlcShiLnByaW0oJywnKSwgYi5wcmltKCcuLi4nKSkpLCAnbGVuaWVudCcpLCBiLnByaW0oJ30nKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnQmFzZScsIGIuYWx0KGIuYXBwKCdCYXNlX2FwcGxpY2F0aW9uJyksIGIuYXBwKCdCYXNlX3ByaW0nKSwgYi5hcHAoJ0Jhc2VfcGFyZW4nKSwgYi5hcHAoJ0Jhc2VfbGlzdHknKSwgYi5hcHAoJ0Jhc2Vfb2JqJyksIGIuYXBwKCdCYXNlX29ialdpdGhQcm9wcycpKSk7XG4gIGIuaW5saW5lKCdQcm9wc19yZWMnLCBiLnNlcShiLmJpbmQoYi5hcHAoJ1Byb3AnKSwgJ3AnKSwgYi5wcmltKCcsJyksIGIuYmluZChiLmFwcCgnUHJvcHMnKSwgJ3BzJykpKTtcbiAgYi5pbmxpbmUoJ1Byb3BzX2Jhc2UnLCBiLmJpbmQoYi5hcHAoJ1Byb3AnKSwgJ3AnKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdQcm9wcycsIGIuYWx0KGIuYXBwKCdQcm9wc19yZWMnKSwgYi5hcHAoJ1Byb3BzX2Jhc2UnKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnUHJvcCcsIGIuc2VxKGIuYmluZChiLmFsdChiLmFwcCgnbmFtZScpLCBiLmFwcCgnc3RyaW5nJykpLCAnbicpLCBiLnByaW0oJzonKSwgYi5iaW5kKGIuYXBwKCdCYXNlJyksICdwJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24oJyBydWxlIGRlc2NyaXB0aW9uIGZvciB1c2UgaW4gZXJyb3IgbWVzc2FnZXMnKTsgYi5kZWZpbmUoJ3J1bGVEZXNjcicsIGIuc2VxKGIucHJpbSgnLS0nKSwgYi5iaW5kKGIuYXBwKCdydWxlRGVzY3JUZXh0JyksICd0JyksIGIucHJpbSgnXFxuJykpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24odW5kZWZpbmVkKTsgYi5kZWZpbmUoJ3J1bGVEZXNjclRleHQnLCBiLm1hbnkoYi5zZXEoYi5ub3QoYi5wcmltKCdcXG4nKSksIGIuYXBwKCdfJykpLCAwKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdjYXNlTmFtZScsIGIuc2VxKGIucHJpbSgnLS0nKSwgYi5tYW55KGIuc2VxKGIubm90KGIucHJpbSgnXFxuJykpLCBiLmFwcCgnc3BhY2UnKSksIDApLCBiLmJpbmQoYi5hcHAoJ25hbWUnKSwgJ24nKSwgYi5tYW55KGIuc2VxKGIubm90KGIucHJpbSgnXFxuJykpLCBiLmFwcCgnc3BhY2UnKSksIDApLCBiLmFsdChiLnByaW0oJ1xcbicpLCBiLmxhKGIucHJpbSgnfScpKSkpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24oJyBuYW1lJyk7IGIuZGVmaW5lKCduYW1lJywgYi5zZXEoYi5hcHAoJ25hbWVGaXJzdCcpLCBiLm1hbnkoYi5hcHAoJ25hbWVSZXN0JyksIDApKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCduYW1lRmlyc3QnLCBiLmFsdChiLnByaW0oJ18nKSwgYi5hcHAoJ2xldHRlcicpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCduYW1lUmVzdCcsIGIuYWx0KGIucHJpbSgnXycpLCBiLmFwcCgnYWxudW0nKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbignIGlkZW50aWZpZXInKTsgYi5kZWZpbmUoJ2lkZW50JywgYi5zZXEoYi5ub3QoYi5hcHAoJ2tleXdvcmQnKSksIGIuYmluZChiLmFwcCgnbmFtZScpLCAnbicpKSk7XG4gIGIuaW5saW5lKCdrZXl3b3JkX3VuZGVmaW5lZCcsIGIuc2VxKGIucHJpbSgndW5kZWZpbmVkJyksIGIubm90KGIuYXBwKCduYW1lUmVzdCcpKSkpO1xuICBiLmlubGluZSgna2V5d29yZF9udWxsJywgYi5zZXEoYi5wcmltKCdudWxsJyksIGIubm90KGIuYXBwKCduYW1lUmVzdCcpKSkpO1xuICBiLmlubGluZSgna2V5d29yZF90cnVlJywgYi5zZXEoYi5wcmltKCd0cnVlJyksIGIubm90KGIuYXBwKCduYW1lUmVzdCcpKSkpO1xuICBiLmlubGluZSgna2V5d29yZF9mYWxzZScsIGIuc2VxKGIucHJpbSgnZmFsc2UnKSwgYi5ub3QoYi5hcHAoJ25hbWVSZXN0JykpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdrZXl3b3JkJywgYi5hbHQoYi5hcHAoJ2tleXdvcmRfdW5kZWZpbmVkJyksIGIuYXBwKCdrZXl3b3JkX251bGwnKSwgYi5hcHAoJ2tleXdvcmRfdHJ1ZScpLCBiLmFwcCgna2V5d29yZF9mYWxzZScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKCcgc3RyaW5nIGxpdGVyYWwnKTsgYi5kZWZpbmUoJ3N0cmluZycsIGIuc2VxKGIucHJpbShcIidcIiksIGIuYmluZChiLm1hbnkoYi5hcHAoJ3NDaGFyJyksIDApLCAnY3MnKSwgYi5wcmltKFwiJ1wiKSkpO1xuICBiLnNldFJ1bGVEZXNjcmlwdGlvbih1bmRlZmluZWQpOyBiLmRlZmluZSgnc0NoYXInLCBiLmFsdChiLnNlcShiLnByaW0oJ1xcXFx4JyksIGIuYXBwKCdoZXhEaWdpdCcpLCBiLmFwcCgnaGV4RGlnaXQnKSksIGIuc2VxKGIucHJpbSgnXFxcXHUnKSwgYi5hcHAoJ2hleERpZ2l0JyksIGIuYXBwKCdoZXhEaWdpdCcpLCBiLmFwcCgnaGV4RGlnaXQnKSwgYi5hcHAoJ2hleERpZ2l0JykpLCBiLnNlcShiLnByaW0oJ1xcXFwnKSwgYi5hcHAoJ18nKSksIGIuc2VxKGIubm90KGIucHJpbShcIidcIikpLCBiLm5vdChiLnByaW0oJ1xcbicpKSwgYi5hcHAoJ18nKSkpKTtcbiAgYi5zZXRSdWxlRGVzY3JpcHRpb24oJyByZWd1bGFyIGV4cHJlc3Npb24nKTsgYi5kZWZpbmUoJ3JlZ0V4cCcsIGIuc2VxKGIucHJpbSgnLycpLCBiLmJpbmQoYi5hcHAoJ3JlQ2hhckNsYXNzJyksICdlJyksIGIucHJpbSgnLycpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKHVuZGVmaW5lZCk7IGIuZGVmaW5lKCdyZUNoYXJDbGFzcycsIGIuc2VxKGIucHJpbSgnWycpLCBiLm1hbnkoYi5hbHQoYi5wcmltKCdcXFxcXScpLCBiLnNlcShiLm5vdChiLnByaW0oJ10nKSksIGIuYXBwKCdfJykpKSwgMCksIGIucHJpbSgnXScpKSk7XG4gIGIuc2V0UnVsZURlc2NyaXB0aW9uKCcgbnVtYmVyJyk7IGIuZGVmaW5lKCdudW1iZXInLCBiLnNlcShiLm9wdChiLnByaW0oJy0nKSksIGIubWFueShiLmFwcCgnZGlnaXQnKSwgMSkpKTtcbiAgYi5pbmxpbmUoJ3NwYWNlX3NpbmdsZUxpbmUnLCBiLnNlcShiLnByaW0oJy8vJyksIGIubWFueShiLnNlcShiLm5vdChiLnByaW0oJ1xcbicpKSwgYi5hcHAoJ18nKSksIDApLCBiLnByaW0oJ1xcbicpKSk7XG4gIGIuaW5saW5lKCdzcGFjZV9tdWx0aUxpbmUnLCBiLnNlcShiLnByaW0oJy8qJyksIGIubWFueShiLnNlcShiLm5vdChiLnByaW0oJyovJykpLCBiLmFwcCgnXycpKSwgMCksIGIucHJpbSgnKi8nKSkpO1xuICBiLmV4dGVuZCgnc3BhY2UnLCBiLmFsdChiLmFwcCgnc3BhY2Vfc2luZ2xlTGluZScpLCBiLmFwcCgnc3BhY2VfbXVsdGlMaW5lJykpKTtcbiAgcmV0dXJuIGIuYnVpbGQob3B0TmFtZXNwYWNlKTtcbn0pO1xuIiwiZXhwb3J0cy5vYmplY3RVdGlscyA9IHJlcXVpcmUoJy4vb2JqZWN0VXRpbHMuanMnKVxuZXhwb3J0cy5zdHJpbmdVdGlscyA9IHJlcXVpcmUoJy4vc3RyaW5nVXRpbHMuanMnKVxuZXhwb3J0cy5lcXVhbHMgPSByZXF1aXJlKCcuL2VxdWFscy5qcycpXG5leHBvcnRzLmJyb3dzZXIgPSByZXF1aXJlKCcuL2Jyb3dzZXIuanMnKVxuIiwidmFyIHRoaXNNb2R1bGUgPSBleHBvcnRzXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMb2dnaW5nXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgc3Vic2NyaWJlZCA9IHt9XG5cbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oc3ViamVjdCAvKiAsIC4uLiAqLykge1xuICBpZiAoIXN1YnNjcmliZWRbc3ViamVjdF0pXG4gICAgcmV0dXJuXG4gIGFyZ3VtZW50c1swXSA9ICdbJyArIHN1YmplY3QgKyAnXSdcbiAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKVxufVxuXG5leHBvcnRzLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHN1YmplY3QpIHtcbiAgc3Vic2NyaWJlZFtzdWJqZWN0XSA9IHRydWVcbn1cblxuZXhwb3J0cy51bnN1YnNjcmliZSA9IGZ1bmN0aW9uKHN1YmplY3QpIHtcbiAgZGVsZXRlIHNob3dpbmdbc3ViamVjdF1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEFzc2VydHMsIGVycm9ycywgZXRjLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5lcnJvciA9IGZ1bmN0aW9uKC8qIGFyZzEsIGFyZzIsIC4uLiAqLykge1xuICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKVxuICB0aHJvdyAnZXJyb3I6ICcgKyBhcmdzLmpvaW4oJyAnKVxufVxuXG5leHBvcnRzLnNhbml0eUNoZWNrID0gZnVuY3Rpb24obmFtZSwgY29uZGl0aW9uKSB7XG4gIGlmICghY29uZGl0aW9uKVxuICAgIHRoaXNNb2R1bGUuZXJyb3IoJ2ZhaWxlZCBzYW5pdHkgY2hlY2s6JywgbmFtZSlcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIERPTSB1dGlsc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5wcmV0dHlQcmludE5vZGUgPSBmdW5jdGlvbihub2RlLCBlbmROb2RlLCBlbmRPZmZzZXQpIHtcbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBUZXh0KSB7XG4gICAgaWYgKG5vZGUgPT09IGVuZE5vZGUpXG4gICAgICByZXR1cm4gJ3RleHR7JyArIG5vZGUuZGF0YS5zdWJzdHIoMCwgZW5kT2Zmc2V0KSArICd8JyArIG5vZGUuZGF0YS5zdWJzdHIoZW5kT2Zmc2V0KSArICd9J1xuICAgIGVsc2VcbiAgICAgIHJldHVybiAndGV4dHsnICsgbm9kZS5kYXRhICsgJ30nXG4gIH1cblxuICB2YXIgcGFydHMgPSBbbm9kZS50YWdOYW1lLCAneyddXG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKG5vZGUgPT09IGVuZE5vZGUgJiYgZW5kT2Zmc2V0ID09IGlkeClcbiAgICAgIHBhcnRzLnB1c2goJ3wnKVxuICAgIHBhcnRzLnB1c2godGhpc01vZHVsZS5wcmV0dHlQcmludE5vZGUobm9kZS5jaGlsZE5vZGVzLml0ZW0oaWR4KSwgZW5kTm9kZSwgZW5kT2Zmc2V0KSlcbiAgfVxuICBpZiAobm9kZSA9PT0gZW5kTm9kZSAmJiBlbmRPZmZzZXQgPT0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICBwYXJ0cy5wdXNoKCd8JylcbiAgcGFydHMucHVzaCgnfScpXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG4iLCIvLyBIZWxwZXJzXG5cbmZ1bmN0aW9uIGRvdWJsZUVxdWFscyh4LCB5KSB7XG4gIHJldHVybiB4ID09IHlcbn1cblxuZnVuY3Rpb24gdHJpcGxlRXF1YWxzKHgsIHkpIHtcbiAgcmV0dXJuIHggPT09IHlcbn1cblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoeCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB4XG4gIHJldHVybiB0eXBlICE9PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBlcXVhbHMoeCwgeSwgZGVlcCwgZXFGbikge1xuICBpZiAoaXNQcmltaXRpdmUoeCkpXG4gICAgcmV0dXJuIGVxRm4oeCwgeSlcbiAgZm9yICh2YXIgcCBpbiB4KVxuICAgIGlmIChkZWVwICYmICFlcXVhbHMoeFtwXSwgeVtwXSwgZGVlcCwgZXFGbikgfHxcbiAgICAgICAgIWRlZXAgJiYgIWVxRm4oeFtwXSwgeVtwXSkpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgZm9yICh2YXIgcCBpbiB5KVxuICAgIGlmICh5W3BdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgeFtwXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGhhdmVTYW1lQ29udGVudHNJbkFueU9yZGVyKGFycjEsIGFycjIsIGRlZXAsIGVxRm4pIHtcbiAgaWYgKCFhcnIxIGluc3RhbmNlb2YgQXJyYXkgfHwgIWFycjIgaW5zdGFuY2VvZiBBcnJheSB8fFxuICAgICAgYXJyMS5sZW5ndGggIT09IGFycjIubGVuZ3RoKVxuICAgIHJldHVybiBmYWxzZVxuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcnIxLmxlbmd0aDsgaWR4KyspIHtcbiAgICB2YXIgeCA9IGFycjFbaWR4XVxuICAgIHZhciBmb3VuZFggPSBhcnIyLnNvbWUoZnVuY3Rpb24oeSkge1xuICAgICAgcmV0dXJuIGVxdWFscyh4LCB5LCBkZWVwLCBlcUZuKVxuICAgIH0pXG4gICAgaWYgKCFmb3VuZFgpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG4vLyBQdWJsaWMgbWV0aG9kc1xuXG5leHBvcnRzLmVxdWFscyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIGVxdWFscyh4LCB5LCBmYWxzZSwgZG91YmxlRXF1YWxzKVxufVxuXG5leHBvcnRzLmRlZXBFcXVhbHMgPSBmdW5jdGlvbih4LCB5KSB7XG4gIHJldHVybiBlcXVhbHMoeCwgeSwgdHJ1ZSwgZG91YmxlRXF1YWxzKVxufVxuXG5leHBvcnRzLnN0cmljdEVxdWFscyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIGVxdWFscyh4LCB5LCBmYWxzZSwgdHJpcGxlRXF1YWxzKVxufVxuXG5leHBvcnRzLnN0cmljdERlZXBFcXVhbHMgPSBmdW5jdGlvbih4LCB5KSB7XG4gIHJldHVybiBlcXVhbHMoeCwgeSwgdHJ1ZSwgdHJpcGxlRXF1YWxzKVxufVxuXG5leHBvcnRzLmhhdmVTYW1lQ29udGVudHNJbkFueU9yZGVyID0gZnVuY3Rpb24oYXJyMSwgYXJyMikge1xuICByZXR1cm4gaGF2ZVNhbWVDb250ZW50c0luQW55T3JkZXIoYXJyMSwgYXJyMiwgdHJ1ZSwgZG91YmxlRXF1YWxzKVxufVxuXG4iLCJ2YXIgdGhpc01vZHVsZSA9IGV4cG9ydHNcblxuZXhwb3J0cy5vYmplY3RUaGF0RGVsZWdhdGVzVG8gPSBmdW5jdGlvbihvYmosIG9wdFByb3BlcnRpZXMpIHtcbiAgZnVuY3Rpb24gY29ucygpIHt9XG4gIGNvbnMucHJvdG90eXBlID0gb2JqXG4gIHZhciBhbnMgPSBuZXcgY29ucygpXG4gIGlmIChvcHRQcm9wZXJ0aWVzKVxuICAgIHRoaXNNb2R1bGUua2V5c0FuZFZhbHVlc0RvKG9wdFByb3BlcnRpZXMsIGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgIGFuc1trXSA9IHZcbiAgICB9KVxuICByZXR1cm4gYW5zXG59XG5cbmV4cG9ydHMuZm9ybWFscyA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmMuXG4gICAgdG9TdHJpbmcoKS5cbiAgICBtYXRjaCgvXFwoKC4qPylcXCkvKVswXS5cbiAgICByZXBsYWNlKC8gL2csICcnKS5cbiAgICBzbGljZSgxLCAtMSkuXG4gICAgc3BsaXQoJywnKS5cbiAgICBmaWx0ZXIoZnVuY3Rpb24obW9kdWxlTmFtZSkgeyByZXR1cm4gbW9kdWxlTmFtZSAhPSAnJyB9KVxufVxuXG5leHBvcnRzLmtleXNEbyA9IGZ1bmN0aW9uKG9iamVjdCwgZm4pIHtcbiAgZm9yICh2YXIgcCBpbiBvYmplY3QpXG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwKSlcbiAgICAgIGZuKHApXG59XG5cbmV4cG9ydHMudmFsdWVzRG8gPSBmdW5jdGlvbihvYmplY3QsIGZuKSB7XG4gIHRoaXNNb2R1bGUua2V5c0RvKG9iamVjdCwgZnVuY3Rpb24ocCkgeyBmbihvYmplY3RbcF0pIH0pXG59XG5cbmV4cG9ydHMua2V5c0FuZFZhbHVlc0RvID0gZnVuY3Rpb24ob2JqZWN0LCBmbikge1xuICB0aGlzTW9kdWxlLmtleXNEbyhvYmplY3QsIGZ1bmN0aW9uKHApIHsgZm4ocCwgb2JqZWN0W3BdKSB9KVxufVxuXG5leHBvcnRzLmtleXNJdGVyYXRvciA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oZm4pIHsgc2VsZi5rZXlzRG8ob2JqZWN0LCBmbikgfVxufVxuXG5leHBvcnRzLnZhbHVlc0l0ZXJhdG9yID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihmbikgeyBzZWxmLnZhbHVlc0RvKG9iamVjdCwgZm4pIH1cbn1cblxuZXhwb3J0cy5rZXlzQW5kVmFsdWVzSXRlcmF0b3IgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGZuKSB7IHNlbGYua2V5c0FuZFZhbHVlc0RvKG9iamVjdCwgZm4pIH1cbn1cblxuZXhwb3J0cy52YWx1ZXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIGFucyA9IFtdXG4gIHRoaXNNb2R1bGUua2V5c0RvKG9iamVjdCwgZnVuY3Rpb24ocCkgeyBhbnMucHVzaChvYmplY3RbcF0pIH0pXG4gIHJldHVybiBhbnNcbn1cblxuZnVuY3Rpb24gU3RyaW5nQnVmZmVyKCkge1xuICB0aGlzLnN0cmluZ3MgPSBbXVxuICB0aGlzLmxlbmd0aFNvRmFyID0gMFxufVxuXG5TdHJpbmdCdWZmZXIucHJvdG90eXBlID0ge1xuICBuZXh0UHV0QWxsOiBmdW5jdGlvbihzKSB7XG4gICAgdGhpcy5zdHJpbmdzLnB1c2gocylcbiAgICB0aGlzLmxlbmd0aFNvRmFyICs9IHMubGVuZ3RoXG4gIH0sXG5cbiAgY29udGVudHM6IGZ1bmN0aW9uKCkgIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdzLmpvaW4oJycpXG4gIH1cbn1cblxuZXhwb3J0cy5zdHJpbmdCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTdHJpbmdCdWZmZXIoKVxufVxuXG5mdW5jdGlvbiBDb2x1bW5TdHJpbmdCdWZmZXIoKSB7XG4gIHRoaXMubGluZXMgPSBbXVxuICB0aGlzLm5ld0xpbmUoKVxufVxuXG5Db2x1bW5TdHJpbmdCdWZmZXIucHJvdG90eXBlID0ge1xuICBuZXh0UHV0QWxsOiBmdW5jdGlvbihzKSB7XG4gICAgdGhpcy5jdXJyZW50Q29sdW1uKCkucHVzaChzKVxuICB9LFxuXG4gIGNvbnRlbnRzOiBmdW5jdGlvbigpIHtcbiAgICAvLyBDb252ZXJ0IGNvbHVtbnMgZnJvbSBsaXN0cyBvZiBzdHJpbmdzIHRvIHN0cmluZ3MsIGFuZCByZWNvcmQgY29sdW1uIGxlbmd0aHNcbiAgICB2YXIgY29sdW1uTGVuZ3RocyA9IFtdXG4gICAgdGhpcy5saW5lcy5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIGZvciAodmFyIGNvbElkeCA9IDA7IGNvbElkeCA8IGxpbmUubGVuZ3RoOyBjb2xJZHgrKykge1xuICAgICAgICB2YXIgY29sdW1uID0gbGluZVtjb2xJZHhdXG4gICAgICAgIGxpbmVbY29sSWR4XSA9IGNvbHVtbi5qb2luKCcnKVxuICAgICAgICBpZiAoY29sdW1uTGVuZ3Roc1tjb2xJZHhdID09PSB1bmRlZmluZWQgfHwgY29sdW1uTGVuZ3Roc1tjb2xJZHhdIDwgbGluZVtjb2xJZHhdLmxlbmd0aClcbiAgICAgICAgICBjb2x1bW5MZW5ndGhzW2NvbElkeF0gPSBsaW5lW2NvbElkeF0ubGVuZ3RoXG4gICAgICB9XG4gICAgfSlcblxuICAgIHZhciBzYiA9IHRoaXNNb2R1bGUuc3RyaW5nQnVmZmVyKClcbiAgICB0aGlzLmxpbmVzLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgZm9yICh2YXIgY29sSWR4ID0gMDsgY29sSWR4IDwgbGluZS5sZW5ndGg7IGNvbElkeCsrKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBsaW5lW2NvbElkeF1cbiAgICAgICAgc2IubmV4dFB1dEFsbChjb2x1bW4pXG4gICAgICAgIHZhciBudW1TcGFjZXMgPSBjb2x1bW5MZW5ndGhzW2NvbElkeF0gLSBjb2x1bW4ubGVuZ3RoXG4gICAgICAgIHdoaWxlIChudW1TcGFjZXMtLSA+IDApXG4gICAgICAgICAgc2IubmV4dFB1dEFsbCgnICcpXG4gICAgICB9XG4gICAgICBzYi5uZXh0UHV0QWxsKCdcXG4nKVxuICAgIH0pXG4gICAgcmV0dXJuIHNiLmNvbnRlbnRzKClcbiAgfSxcblxuICBuZXdMaW5lOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVzLnB1c2goW10pXG4gICAgdGhpcy5uZXdDb2x1bW4oKVxuICB9LFxuXG4gIG5ld0NvbHVtbjogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jdXJyZW50TGluZSgpLnB1c2goW10pXG4gIH0sXG5cbiAgY3VycmVudENvbHVtbjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxpbmUgPSB0aGlzLmN1cnJlbnRMaW5lKClcbiAgICByZXR1cm4gbGluZVtsaW5lLmxlbmd0aCAtIDFdXG4gIH0sXG5cbiAgY3VycmVudExpbmU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxpbmVzW3RoaXMubGluZXMubGVuZ3RoIC0gMV1cbiAgfVxufVxuXG5leHBvcnRzLmNvbHVtblN0cmluZ0J1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IENvbHVtblN0cmluZ0J1ZmZlcigpXG59XG5cbiIsInZhciBvYmplY3RVdGlscyA9IHJlcXVpcmUoJy4vb2JqZWN0VXRpbHMuanMnKVxudmFyIHRoaXNNb2R1bGUgPSBleHBvcnRzXG5cbi8vIEhlbHBlcnNcblxuZnVuY3Rpb24gcGFkKG51bWJlckFzU3RyaW5nLCBsZW4pIHtcbiAgdmFyIHplcm9zID0gW11cbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbnVtYmVyQXNTdHJpbmcubGVuZ3RoIC0gbGVuOyBpZHgrKylcbiAgICB6ZXJvcy5wdXNoKCcwJylcbiAgcmV0dXJuIHplcm9zLmpvaW4oJycpICsgbnVtYmVyQXNTdHJpbmdcbn1cblxudmFyIGVzY2FwZVN0cmluZ0ZvciA9IHt9XG5mb3IgKHZhciBjID0gMDsgYyA8IDEyODsgYysrKVxuICBlc2NhcGVTdHJpbmdGb3JbY10gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpXG5lc2NhcGVTdHJpbmdGb3JbXCInXCIuY2hhckNvZGVBdCgwKV0gID0gXCJcXFxcJ1wiXG5lc2NhcGVTdHJpbmdGb3JbJ1wiJy5jaGFyQ29kZUF0KDApXSAgPSAnXFxcXFwiJ1xuZXNjYXBlU3RyaW5nRm9yWydcXFxcJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcXFxcXCdcbmVzY2FwZVN0cmluZ0ZvclsnXFxiJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcYidcbmVzY2FwZVN0cmluZ0ZvclsnXFxmJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcZidcbmVzY2FwZVN0cmluZ0ZvclsnXFxuJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcbidcbmVzY2FwZVN0cmluZ0ZvclsnXFxyJy5jaGFyQ29kZUF0KDApXSA9ICdcXFxccidcbmVzY2FwZVN0cmluZ0ZvclsnXFx0Jy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcdCdcbmVzY2FwZVN0cmluZ0ZvclsnXFx2Jy5jaGFyQ29kZUF0KDApXSA9ICdcXFxcdidcblxuLy8gUHVibGljIG1ldGhvZHNcblxuZXhwb3J0cy5lc2NhcGVDaGFyID0gZnVuY3Rpb24oYywgb3B0RGVsaW0pIHtcbiAgdmFyIGNoYXJDb2RlID0gYy5jaGFyQ29kZUF0KDApXG4gIGlmICgoYyA9PSAnXCInIHx8IGMgPT0gXCInXCIpICYmIG9wdERlbGltICYmIGMgIT09IG9wdERlbGltKVxuICAgIHJldHVybiBjXG4gIGVsc2UgaWYgKGNoYXJDb2RlIDwgMTI4KVxuICAgIHJldHVybiBlc2NhcGVTdHJpbmdGb3JbY2hhckNvZGVdXG4gIGVsc2UgaWYgKDEyOCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8IDI1NilcbiAgICByZXR1cm4gJ1xcXFx4JyArIHBhZChjaGFyQ29kZS50b1N0cmluZygxNiksIDIpXG4gIGVsc2VcbiAgICByZXR1cm4gJ1xcXFx1JyArIHBhZChjaGFyQ29kZS50b1N0cmluZygxNiksIDQpXG59XG5cbmV4cG9ydHMudW5lc2NhcGVDaGFyID0gZnVuY3Rpb24ocykge1xuICBpZiAocy5jaGFyQXQoMCkgPT0gJ1xcXFwnKVxuICAgIHN3aXRjaCAocy5jaGFyQXQoMSkpIHtcbiAgICAgIGNhc2UgJ2InOiAgcmV0dXJuICdcXGInXG4gICAgICBjYXNlICdmJzogIHJldHVybiAnXFxmJ1xuICAgICAgY2FzZSAnbic6ICByZXR1cm4gJ1xcbidcbiAgICAgIGNhc2UgJ3InOiAgcmV0dXJuICdcXHInXG4gICAgICBjYXNlICd0JzogIHJldHVybiAnXFx0J1xuICAgICAgY2FzZSAndic6ICByZXR1cm4gJ1xcdidcbiAgICAgIGNhc2UgJ3gnOiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocy5zdWJzdHJpbmcoMiwgNCksIDE2KSlcbiAgICAgIGNhc2UgJ3UnOiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocy5zdWJzdHJpbmcoMiwgNiksIDE2KSlcbiAgICAgIGRlZmF1bHQ6ICAgcmV0dXJuIHMuY2hhckF0KDEpXG4gICAgfVxuICBlbHNlXG4gICAgcmV0dXJuIHNcbn1cblxuZnVuY3Rpb24gcHJpbnRPbih4LCB3cykge1xuICBpZiAoeCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgd3MubmV4dFB1dEFsbCgnWycpXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgeC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBpZiAoaWR4ID4gMClcbiAgICAgICAgd3MubmV4dFB1dEFsbCgnLCAnKVxuICAgICAgcHJpbnRPbih4W2lkeF0sIHdzKVxuICAgIH1cbiAgICB3cy5uZXh0UHV0QWxsKCddJylcbiAgfSBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgaGFzU2luZ2xlUXVvdGVzID0geC5pbmRleE9mKFwiJ1wiKSA+PSAwXG4gICAgdmFyIGhhc0RvdWJsZVF1b3RlcyA9IHguaW5kZXhPZignXCInKSA+PSAwXG4gICAgdmFyIGRlbGltID0gaGFzU2luZ2xlUXVvdGVzICYmICFoYXNEb3VibGVRdW90ZXMgPyAnXCInIDogXCInXCJcbiAgICB3cy5uZXh0UHV0QWxsKGRlbGltKVxuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHgubGVuZ3RoOyBpZHgrKylcbiAgICAgIHdzLm5leHRQdXRBbGwodGhpc01vZHVsZS5lc2NhcGVDaGFyKHhbaWR4XSwgZGVsaW0pKVxuICAgIHdzLm5leHRQdXRBbGwoZGVsaW0pXG4gIH0gZWxzZSBpZiAoeCA9PT0gbnVsbCkge1xuICAgIHdzLm5leHRQdXRBbGwoJ251bGwnKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB4ID09PSAnb2JqZWN0JyAmJiAhKHggaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgd3MubmV4dFB1dEFsbCgneycpXG4gICAgdmFyIGZpcnN0ID0gdHJ1ZVxuICAgIG9iamVjdFV0aWxzLmtleXNBbmRWYWx1ZXNEbyh4LCBmdW5jdGlvbihrLCB2KSB7XG4gICAgICBpZiAoZmlyc3QpXG4gICAgICAgIGZpcnN0ID0gZmFsc2VcbiAgICAgIGVsc2VcbiAgICAgICAgd3MubmV4dFB1dEFsbCgnLCAnKVxuICAgICAgcHJpbnRPbihrLCB3cylcbiAgICAgIHdzLm5leHRQdXRBbGwoJzogJylcbiAgICAgIHByaW50T24odiwgd3MpXG4gICAgfSlcbiAgICB3cy5uZXh0UHV0QWxsKCd9JylcbiAgfSBlbHNlXG4gICAgd3MubmV4dFB1dEFsbCgnJyArIHgpXG59XG5cbmV4cG9ydHMucHJpbnRTdHJpbmcgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHdzID0gb2JqZWN0VXRpbHMuc3RyaW5nQnVmZmVyKClcbiAgcHJpbnRPbihvYmosIHdzKVxuICByZXR1cm4gd3MuY29udGVudHMoKVxufVxuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEdyYW1tYXIgPSByZXF1aXJlKCcuL0dyYW1tYXIuanMnKTtcbnZhciBkZWNscyA9IHJlcXVpcmUoJy4vZGVjbHMuanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIG9iamVjdFRoYXREZWxlZ2F0ZXNUbyA9IGF3bGliLm9iamVjdFV0aWxzLm9iamVjdFRoYXREZWxlZ2F0ZXNUbztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIEJ1aWxkZXIoKSB7XG4gIHRoaXMuaW5pdCgpO1xufVxuXG5CdWlsZGVyLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5uYW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3VwZXJHcmFtbWFyID0gR3JhbW1hci5wcm90b3R5cGU7XG4gICAgdGhpcy5ydWxlRGVjbHMgPSBbXTtcbiAgfSxcblxuICBzZXROYW1lOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfSxcblxuICBzZXRTdXBlckdyYW1tYXI6IGZ1bmN0aW9uKGdyYW1tYXIpIHtcbiAgICB0aGlzLnN1cGVyR3JhbW1hciA9IGdyYW1tYXI7XG4gIH0sXG5cbiAgc2V0UnVsZURlc2NyaXB0aW9uOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdGhpcy5ydWxlRGVzY3JpcHRpb24gPSB0ZXh0O1xuICB9LFxuXG4gIGRlZmluZTogZnVuY3Rpb24ocnVsZU5hbWUsIGJvZHkpIHtcbiAgICB0aGlzLnJ1bGVEZWNscy5wdXNoKG5ldyBkZWNscy5EZWZpbmUocnVsZU5hbWUsIGJvZHksIHRoaXMuc3VwZXJHcmFtbWFyLCB0aGlzLnJ1bGVEZXNjcmlwdGlvbikpO1xuICAgIHRoaXMucnVsZURlc2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICB9LFxuXG4gIG92ZXJyaWRlOiBmdW5jdGlvbihydWxlTmFtZSwgYm9keSkge1xuICAgIHRoaXMucnVsZURlY2xzLnB1c2gobmV3IGRlY2xzLk92ZXJyaWRlKHJ1bGVOYW1lLCBib2R5LCB0aGlzLnN1cGVyR3JhbW1hcikpO1xuICB9LFxuXG4gIGlubGluZTogZnVuY3Rpb24ocnVsZU5hbWUsIGJvZHkpIHtcbiAgICB0aGlzLnJ1bGVEZWNscy5wdXNoKG5ldyBkZWNscy5JbmxpbmUocnVsZU5hbWUsIGJvZHksIHRoaXMuc3VwZXJHcmFtbWFyKSk7XG4gICAgcmV0dXJuIHRoaXMuYXBwKHJ1bGVOYW1lKTtcbiAgfSxcblxuICBleHRlbmQ6IGZ1bmN0aW9uKHJ1bGVOYW1lLCBib2R5KSB7XG4gICAgdGhpcy5ydWxlRGVjbHMucHVzaChuZXcgZGVjbHMuRXh0ZW5kKHJ1bGVOYW1lLCBib2R5LCB0aGlzLnN1cGVyR3JhbW1hcikpO1xuICB9LFxuXG4gIGJ1aWxkOiBmdW5jdGlvbihvcHROYW1lc3BhY2UpIHtcbiAgICB2YXIgc3VwZXJHcmFtbWFyID0gdGhpcy5zdXBlckdyYW1tYXI7XG4gICAgdmFyIHJ1bGVEaWN0ID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKHN1cGVyR3JhbW1hci5ydWxlRGljdCk7XG4gICAgdGhpcy5ydWxlRGVjbHMuZm9yRWFjaChmdW5jdGlvbihydWxlRGVjbCkge1xuICAgICAgcnVsZURlY2wucGVyZm9ybUNoZWNrcygpO1xuICAgICAgcnVsZURlY2wuaW5zdGFsbChydWxlRGljdCk7XG4gICAgfSk7XG5cbiAgICB2YXIgZ3JhbW1hciA9IG5ldyBHcmFtbWFyKHJ1bGVEaWN0KTtcbiAgICBncmFtbWFyLnN1cGVyR3JhbW1hciA9IHN1cGVyR3JhbW1hcjtcbiAgICBncmFtbWFyLnJ1bGVEZWNscyA9IHRoaXMucnVsZURlY2xzO1xuICAgIGlmICh0aGlzLm5hbWUpIHtcbiAgICAgIGdyYW1tYXIubmFtZSA9IHRoaXMubmFtZTtcbiAgICAgIGlmIChvcHROYW1lc3BhY2UpIHtcbiAgICAgICAgZ3JhbW1hci5uYW1lc3BhY2VOYW1lID0gb3B0TmFtZXNwYWNlLm5hbWU7XG4gICAgICAgIG9wdE5hbWVzcGFjZS5pbnN0YWxsKHRoaXMubmFtZSwgZ3JhbW1hcik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuaW5pdCgpO1xuICAgIHJldHVybiBncmFtbWFyO1xuICB9LFxuXG4gIHByaW06IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHBleHBycy5tYWtlUHJpbSh4KTsgfSxcbiAgYWx0OiBmdW5jdGlvbigvKiB0ZXJtMSwgdGVybTEsIC4uLiAqLykge1xuICAgIHZhciB0ZXJtcyA9IFtdO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2lkeF07XG4gICAgICBpZiAoYXJnIGluc3RhbmNlb2YgcGV4cHJzLkFsdCkge1xuICAgICAgICB0ZXJtcyA9IHRlcm1zLmNvbmNhdChhcmcudGVybXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVybXMucHVzaChhcmcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGVybXMubGVuZ3RoID09PSAxID8gdGVybXNbMF0gOiBuZXcgcGV4cHJzLkFsdCh0ZXJtcyk7XG4gIH0sXG4gIHNlcTogZnVuY3Rpb24oLyogZmFjdG9yMSwgZmFjdG9yMiwgLi4uICovKSB7XG4gICAgdmFyIGZhY3RvcnMgPSBbXTtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpZHhdO1xuICAgICAgaWYgKGFyZyBpbnN0YW5jZW9mIHBleHBycy5TZXEpIHtcbiAgICAgICAgZmFjdG9ycyA9IGZhY3RvcnMuY29uY2F0KGFyZy5mYWN0b3JzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnMucHVzaChhcmcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFjdG9ycy5sZW5ndGggPT09IDEgPyBmYWN0b3JzWzBdIDogbmV3IHBleHBycy5TZXEoZmFjdG9ycyk7XG4gIH0sXG4gIGJpbmQ6IGZ1bmN0aW9uKGV4cHIsIG5hbWUpIHsgcmV0dXJuIG5ldyBwZXhwcnMuQmluZChleHByLCBuYW1lKTsgfSxcbiAgbWFueTogZnVuY3Rpb24oZXhwciwgbWluTnVtTWF0Y2hlcykgeyByZXR1cm4gbmV3IHBleHBycy5NYW55KGV4cHIsIG1pbk51bU1hdGNoZXMpOyB9LFxuICBvcHQ6IGZ1bmN0aW9uKGV4cHIpIHsgcmV0dXJuIG5ldyBwZXhwcnMuT3B0KGV4cHIpOyB9LFxuICBub3Q6IGZ1bmN0aW9uKGV4cHIpIHsgcmV0dXJuIG5ldyBwZXhwcnMuTm90KGV4cHIpOyB9LFxuICBsYTogZnVuY3Rpb24oZXhwcikgeyByZXR1cm4gbmV3IHBleHBycy5Mb29rYWhlYWQoZXhwcik7IH0sXG4gIGxpc3R5OiBmdW5jdGlvbihleHByKSB7IHJldHVybiBuZXcgcGV4cHJzLkxpc3R5KGV4cHIpOyB9LFxuICBvYmo6IGZ1bmN0aW9uKHByb3BlcnRpZXMsIGlzTGVuaWVudCkgeyByZXR1cm4gbmV3IHBleHBycy5PYmoocHJvcGVydGllcywgISFpc0xlbmllbnQpOyB9LFxuICBhcHA6IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7IHJldHVybiBuZXcgcGV4cHJzLkFwcGx5KHJ1bGVOYW1lKTsgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gQnVpbGRlcjtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcbnZhciBza2lwU3BhY2VzID0gcmVxdWlyZSgnLi9za2lwU3BhY2VzLmpzJyk7XG5cbnZhciBhd2xpYiA9IHJlcXVpcmUoJ2F3bGliJyk7XG52YXIgYnJvd3NlciA9IGF3bGliLmJyb3dzZXI7XG52YXIga2V5c0RvID0gYXdsaWIub2JqZWN0VXRpbHMua2V5c0RvO1xudmFyIHZhbHVlc0RvID0gYXdsaWIub2JqZWN0VXRpbHMudmFsdWVzRG87XG52YXIgZm9ybWFscyA9IGF3bGliLm9iamVjdFV0aWxzLmZvcm1hbHM7XG52YXIgbWFrZVN0cmluZ0J1ZmZlciA9IGF3bGliLm9iamVjdFV0aWxzLnN0cmluZ0J1ZmZlcjtcbnZhciBwcmludFN0cmluZyA9IGF3bGliLnN0cmluZ1V0aWxzLnByaW50U3RyaW5nO1xudmFyIGVxdWFscyA9IGF3bGliLmVxdWFscy5lcXVhbHM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBHcmFtbWFyKHJ1bGVEaWN0KSB7XG4gIHRoaXMucnVsZURpY3QgPSBydWxlRGljdDtcbn1cblxuR3JhbW1hci5wcm90b3R5cGUgPSB7XG4gIHJ1bGVEaWN0OiBuZXcgKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuXyA9IHBleHBycy5hbnl0aGluZztcbiAgICB0aGlzLmVuZCA9IG5ldyBwZXhwcnMuTm90KHBleHBycy5hbnl0aGluZyk7XG4gICAgdGhpcy5zcGFjZSA9IHBleHBycy5tYWtlUHJpbSgvW1xcc10vKTtcbiAgICB0aGlzLnNwYWNlLmRlc2NyaXB0aW9uID0gJ3NwYWNlJztcbiAgICB0aGlzLmFsbnVtID0gcGV4cHJzLm1ha2VQcmltKC9bMC05YS16QS1aXS8pO1xuICAgIHRoaXMuc3BhY2UuZGVzY3JpcHRpb24gPSAnYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXInO1xuICAgIHRoaXMubGV0dGVyID0gcGV4cHJzLm1ha2VQcmltKC9bYS16QS1aXS8pO1xuICAgIHRoaXMubGV0dGVyLmRlc2NyaXB0aW9uID0gJ2xldHRlcic7XG4gICAgdGhpcy5sb3dlciA9IHBleHBycy5tYWtlUHJpbSgvW2Etel0vKTtcbiAgICB0aGlzLmxvd2VyLmRlc2NyaXB0aW9uID0gJ2xvd2VyLWNhc2UgbGV0dGVyJztcbiAgICB0aGlzLnVwcGVyID0gcGV4cHJzLm1ha2VQcmltKC9bQS1aXS8pO1xuICAgIHRoaXMudXBwZXIuZGVzY3JpcHRpb24gPSAndXBwZXItY2FzZSBsZXR0ZXInO1xuICAgIHRoaXMuZGlnaXQgPSBwZXhwcnMubWFrZVByaW0oL1swLTldLyk7XG4gICAgdGhpcy5kaWdpdC5kZXNjcmlwdGlvbiA9ICdkaWdpdCc7XG4gICAgdGhpcy5oZXhEaWdpdCA9IHBleHBycy5tYWtlUHJpbSgvWzAtOWEtZkEtRl0vKTtcbiAgICB0aGlzLmhleERpZ2l0LmRlc2NyaXB0aW9uID0gJ2hleGFkZWNpbWFsIGRpZ2l0JztcbiAgfSkoKSxcblxuICBtYXRjaDogZnVuY3Rpb24ob2JqLCBzdGFydFJ1bGUsIG9wdFRocm93T25GYWlsKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hDb250ZW50cyhbb2JqXSwgc3RhcnRSdWxlLCBvcHRUaHJvd09uRmFpbCk7XG4gIH0sXG5cbiAgbWF0Y2hDb250ZW50czogZnVuY3Rpb24ob2JqLCBzdGFydFJ1bGUsIG9wdFRocm93T25GYWlsKSB7XG4gICAgdmFyIGlucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0ubmV3Rm9yKG9iaik7XG4gICAgdmFyIHRodW5rID0gbmV3IHBleHBycy5BcHBseShzdGFydFJ1bGUpLmV2YWwob3B0VGhyb3dPbkZhaWwsIHVuZGVmaW5lZCwgdGhpcy5ydWxlRGljdCwgaW5wdXRTdHJlYW0sIHVuZGVmaW5lZCk7XG5cbiAgICB2YXIgc3VjY2VlZGVkO1xuICAgIGlmICh0aHVuayA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICAgIHN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGlzIG1hdGNoIG9ubHkgc3VjY2VlZGVkIGlmIHRoZSBzdGFydCBydWxlIGNvbnN1bWVkIGFsbCBvZiB0aGUgaW5wdXQuXG4gICAgICBpZiAoY29tbW9uLmlzU3ludGFjdGljKHN0YXJ0UnVsZSkpIHtcbiAgICAgICAgc2tpcFNwYWNlcyh0aGlzLnJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgICB9XG4gICAgICBzdWNjZWVkZWQgPSBwZXhwcnMuZW5kLmV2YWwob3B0VGhyb3dPbkZhaWwsIGZhbHNlLCB0aGlzLnJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgdW5kZWZpbmVkKSAhPT0gY29tbW9uLmZhaWw7XG4gICAgfVxuXG4gICAgaWYgKHN1Y2NlZWRlZCkge1xuICAgICAgdmFyIGFzc2VydFNlbWFudGljQWN0aW9uTmFtZXNNYXRjaCA9IHRoaXMuYXNzZXJ0U2VtYW50aWNBY3Rpb25OYW1lc01hdGNoLmJpbmQodGhpcyk7XG4gICAgICB2YXIgYW5zID0gZnVuY3Rpb24oYWN0aW9uRGljdCkge1xuICAgICAgICBhc3NlcnRTZW1hbnRpY0FjdGlvbk5hbWVzTWF0Y2goYWN0aW9uRGljdCk7XG4gICAgICAgIHJldHVybiB0aHVuay5mb3JjZShhY3Rpb25EaWN0LCB7fSk7XG4gICAgICB9O1xuICAgICAgYW5zLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAnW29obSB0aHVua10nOyB9O1xuICAgICAgcmV0dXJuIGFucztcbiAgICB9IGVsc2UgaWYgKG9wdFRocm93T25GYWlsKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLk1hdGNoRmFpbHVyZShpbnB1dFN0cmVhbSwgdGhpcy5ydWxlRGljdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sXG5cbiAgYXNzZXJ0U2VtYW50aWNBY3Rpb25OYW1lc01hdGNoOiBmdW5jdGlvbihhY3Rpb25EaWN0KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBydWxlRGljdCA9IHRoaXMucnVsZURpY3Q7XG4gICAgdmFyIG9rID0gdHJ1ZTtcbiAgICBrZXlzRG8ocnVsZURpY3QsIGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgICBpZiAoYWN0aW9uRGljdFtydWxlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgYWN0dWFsID0gZm9ybWFscyhhY3Rpb25EaWN0W3J1bGVOYW1lXSkuc29ydCgpO1xuICAgICAgdmFyIGV4cGVjdGVkID0gc2VsZi5zZW1hbnRpY0FjdGlvbkFyZ05hbWVzKHJ1bGVOYW1lKTtcbiAgICAgIGlmICghZXF1YWxzKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgICAgIG9rID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZW1hbnRpYyBhY3Rpb24gZm9yIHJ1bGUnLCBydWxlTmFtZSwgJ2hhcyB0aGUgd3JvbmcgYXJndW1lbnQgbmFtZXMnKTtcbiAgICAgICAgY29uc29sZS5sb2coJyAgZXhwZWN0ZWQnLCBleHBlY3RlZCwgJyhpbiBhbnkgb3JkZXIpJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCcgICAgYWN0dWFsJywgYWN0dWFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIW9rKSB7XG4gICAgICBicm93c2VyLmVycm9yKCdvbmUgb3IgbW9yZSBzZW1hbnRpYyBhY3Rpb25zIGhhdmUgdGhlIHdyb25nIGFyZ3VtZW50IG5hbWVzIC0tIHNlZSBjb25zb2xlIGZvciBkZXRhaWxzJyk7XG4gICAgfVxuICB9LFxuXG4gIHNlbWFudGljQWN0aW9uQXJnTmFtZXM6IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyICYmIHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3J1bGVOYW1lXSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3VwZXJHcmFtbWFyLnNlbWFudGljQWN0aW9uQXJnTmFtZXMocnVsZU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYm9keSA9IHRoaXMucnVsZURpY3RbcnVsZU5hbWVdO1xuICAgICAgdmFyIG5hbWVzID0gYm9keS5nZXRCaW5kaW5nTmFtZXMoKTtcbiAgICAgIGlmIChuYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybiBuYW1lcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBib2R5LnByb2R1Y2VzVmFsdWUoKSA/IFsnZXhwciddIDogW107XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHRvUmVjaXBlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgd3MgPSBtYWtlU3RyaW5nQnVmZmVyKCk7XG4gICAgd3MubmV4dFB1dEFsbCgnKGZ1bmN0aW9uKG9obSwgb3B0TmFtZXNwYWNlKSB7XFxuJyk7XG4gICAgd3MubmV4dFB1dEFsbCgnICB2YXIgYiA9IG9obS5fYnVpbGRlcigpO1xcbicpO1xuICAgIHdzLm5leHRQdXRBbGwoJyAgYi5zZXROYW1lKCcpOyB3cy5uZXh0UHV0QWxsKHByaW50U3RyaW5nKHRoaXMubmFtZSkpOyB3cy5uZXh0UHV0QWxsKCcpO1xcbicpO1xuICAgIGlmICh0aGlzLnN1cGVyR3JhbW1hci5uYW1lICYmIHRoaXMuc3VwZXJHcmFtbWFyLm5hbWVzcGFjZU5hbWUpIHtcbiAgICAgIHdzLm5leHRQdXRBbGwoJyAgYi5zZXRTdXBlckdyYW1tYXIob2htLm5hbWVzcGFjZSgnKTtcbiAgICAgIHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcodGhpcy5zdXBlckdyYW1tYXIubmFtZXNwYWNlTmFtZSkpO1xuICAgICAgd3MubmV4dFB1dEFsbCgnKS5nZXRHcmFtbWFyKCcpO1xuICAgICAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyh0aGlzLnN1cGVyR3JhbW1hci5uYW1lKSk7XG4gICAgICB3cy5uZXh0UHV0QWxsKCcpKTtcXG4nKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5ydWxlRGVjbHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgd3MubmV4dFB1dEFsbCgnICAnKTtcbiAgICAgIHRoaXMucnVsZURlY2xzW2lkeF0ub3V0cHV0UmVjaXBlKHdzKTtcbiAgICAgIHdzLm5leHRQdXRBbGwoJztcXG4nKTtcbiAgICB9XG4gICAgd3MubmV4dFB1dEFsbCgnICByZXR1cm4gYi5idWlsZChvcHROYW1lc3BhY2UpO1xcbicpO1xuICAgIHdzLm5leHRQdXRBbGwoJ30pOycpO1xuICAgIHJldHVybiB3cy5jb250ZW50cygpO1xuICB9LFxuXG4gIHRvU2VtYW50aWNBY3Rpb25UZW1wbGF0ZTogZnVuY3Rpb24oLyogZW50cnlQb2ludDEsIGVudHJ5UG9pbnQyLCAuLi4gKi8pIHtcbiAgICB2YXIgZW50cnlQb2ludHMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50cyA6IE9iamVjdC5rZXlzKHRoaXMucnVsZURpY3QpO1xuICAgIHZhciBydWxlc1RvQmVJbmNsdWRlZCA9IHRoaXMucnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGVudHJ5UG9pbnRzKTtcbiAgICBcbiAgICAvLyBUT0RPOiBhZGQgdGhlIHN1cGVyLWdyYW1tYXIncyB0ZW1wbGF0ZXMgYXQgdGhlIHJpZ2h0IHBsYWNlLCBlLmcuLCBhIGNhc2UgZm9yIEFkZEV4cHJfcGx1cyBzaG91bGQgYXBwZWFyIG5leHQgdG9cbiAgICAvLyBvdGhlciBjYXNlcyBvZiBBZGRFeHByLlxuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSBtYWtlU3RyaW5nQnVmZmVyKCk7XG4gICAgYnVmZmVyLm5leHRQdXRBbGwoJ3snKTtcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgZm9yICh2YXIgcnVsZU5hbWUgaW4gcnVsZXNUb0JlSW5jbHVkZWQpIHtcbiAgICAgIHZhciBib2R5ID0gdGhpcy5ydWxlRGljdFtydWxlTmFtZV07XG4gICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZmZlci5uZXh0UHV0QWxsKCcsJyk7XG4gICAgICB9XG4gICAgICBidWZmZXIubmV4dFB1dEFsbCgnXFxuJyk7XG4gICAgICBidWZmZXIubmV4dFB1dEFsbCgnICAnKTtcbiAgICAgIHNlbGYuYWRkU2VtYW50aWNBY3Rpb25UZW1wbGF0ZShydWxlTmFtZSwgYm9keSwgYnVmZmVyKTtcbiAgICB9XG5cbiAgICBidWZmZXIubmV4dFB1dEFsbCgnXFxufScpO1xuICAgIHJldHVybiBidWZmZXIuY29udGVudHMoKTtcbiAgfSxcblxuICBhZGRTZW1hbnRpY0FjdGlvblRlbXBsYXRlOiBmdW5jdGlvbihydWxlTmFtZSwgYm9keSwgYnVmZmVyKSB7XG4gICAgYnVmZmVyLm5leHRQdXRBbGwocnVsZU5hbWUpO1xuICAgIGJ1ZmZlci5uZXh0UHV0QWxsKCc6IGZ1bmN0aW9uKCcpO1xuICAgIGJ1ZmZlci5uZXh0UHV0QWxsKHRoaXMuc2VtYW50aWNBY3Rpb25BcmdOYW1lcyhydWxlTmFtZSkuam9pbignLCAnKSk7XG4gICAgYnVmZmVyLm5leHRQdXRBbGwoJykge1xcbicpO1xuICAgIGJ1ZmZlci5uZXh0UHV0QWxsKCcgIH0nKTtcbiAgfSxcblxuICBydWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb246IGZ1bmN0aW9uKGVudHJ5UG9pbnRzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGdldEJvZHkocnVsZU5hbWUpIHtcbiAgICAgIGlmIChzZWxmLnJ1bGVEaWN0W3J1bGVOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5kZWNsYXJlZFJ1bGUocnVsZU5hbWUsIHNlbGYubmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2VsZi5ydWxlRGljdFtydWxlTmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJ1bGVzID0ge307XG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZW50cnlQb2ludHMubGVuZ3RoOyBpZHgrKykge1xuICAgICAgdmFyIHJ1bGVOYW1lID0gZW50cnlQb2ludHNbaWR4XTtcbiAgICAgIGdldEJvZHkocnVsZU5hbWUpOyAgLy8gdG8gbWFrZSBzdXJlIHRoZSBydWxlIGV4aXN0c1xuICAgICAgcnVsZXNbcnVsZU5hbWVdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICBmb3IgKHZhciBydWxlTmFtZSBpbiBydWxlcykge1xuICAgICAgICB2YXIgYWRkZWROZXdSdWxlID0gZ2V0Qm9keShydWxlTmFtZSkuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKHJ1bGVzLCB0cnVlKTtcbiAgICAgICAgZG9uZSAmPSAhYWRkZWROZXdSdWxlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBydWxlcztcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gR3JhbW1hcjtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbi5qcycpO1xudmFyIFBvc0luZm8gPSByZXF1aXJlKCcuL1Bvc0luZm8uanMnKTtcbnZhciBHcmFtbWFyID0gcmVxdWlyZSgnLi9HcmFtbWFyLmpzJyk7XG5cbnZhciBhd2xpYiA9IHJlcXVpcmUoJ2F3bGliJyk7XG52YXIgb2JqZWN0VGhhdERlbGVnYXRlc1RvID0gYXdsaWIub2JqZWN0VXRpbHMub2JqZWN0VGhhdERlbGVnYXRlc1RvO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gSW5wdXRTdHJlYW0oKSB7XG4gIHRocm93ICdJbnB1dFN0cmVhbSBjYW5ub3QgYmUgaW5zdGFudGlhdGVkIC0tIGl0XFwncyBhYnN0cmFjdCc7XG59XG5cbklucHV0U3RyZWFtLm5ld0ZvciA9IGZ1bmN0aW9uKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ0lucHV0U3RyZWFtKG9iaik7XG4gIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICByZXR1cm4gbmV3IExpc3RJbnB1dFN0cmVhbShvYmopO1xuICB9IGVsc2Uge1xuICAgIHRocm93ICdjYW5ub3QgbWFrZSBpbnB1dCBzdHJlYW0gZm9yICcgKyBvYmo7XG4gIH1cbn07XG5cbklucHV0U3RyZWFtLnByb3RvdHlwZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24oc291cmNlKSB7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy5wb3MgPSAwO1xuICAgIHRoaXMucG9zSW5mb3MgPSBbXTtcbiAgICB0aGlzLmZhaWx1cmVzID0gbnVsbDtcbiAgICB0aGlzLmZhaWx1cmVzUG9zID0gLTE7XG4gIH0sXG5cbiAgcmVjb3JkRmFpbHVyZTogZnVuY3Rpb24ocG9zLCBleHByKSB7XG4gICAgaWYgKHBvcyA+IHRoaXMuZmFpbHVyZXNQb3MpIHtcbiAgICAgIHRoaXMuZmFpbHVyZXMgPSB7ZXhwcjogZXhwciwgbmV4dDogbnVsbH07XG4gICAgICB0aGlzLmZhaWx1cmVzUG9zID0gcG9zO1xuICAgIH0gZWxzZSBpZiAocG9zID09PSB0aGlzLmZhaWx1cmVzUG9zKSB7XG4gICAgICB0aGlzLmZhaWx1cmVzID0ge2V4cHI6IGV4cHIsIG5leHQ6IHRoaXMuZmFpbHVyZXN9O1xuICAgIH1cbiAgfSxcblxuICBnZXRDdXJyZW50UG9zSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJQb3MgPSB0aGlzLnBvcztcbiAgICB2YXIgcG9zSW5mbyA9IHRoaXMucG9zSW5mb3NbY3VyclBvc107XG4gICAgcmV0dXJuIHBvc0luZm8gfHwgKHRoaXMucG9zSW5mb3NbY3VyclBvc10gPSBuZXcgUG9zSW5mbyhjdXJyUG9zKSk7XG4gIH0sXG5cbiAgYXRFbmQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvcyA9PT0gdGhpcy5zb3VyY2UubGVuZ3RoO1xuICB9LFxuXG4gIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmF0RW5kKCkpIHtcbiAgICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlW3RoaXMucG9zKytdO1xuICAgIH1cbiAgfSxcblxuICBtYXRjaEV4YWN0bHk6IGZ1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdGhpcy5uZXh0KCkgPT09IHggPyB0cnVlIDogY29tbW9uLmZhaWw7XG4gIH0sXG5cbiAgaW50ZXJ2YWw6IGZ1bmN0aW9uKHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2Uuc2xpY2Uoc3RhcnRJZHgsIGVuZElkeCk7XG4gIH0sXG5cbiAgZ2V0RmFpbHVyZXNQb3M6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmZhaWx1cmVzUG9zO1xuICB9XG59O1xuXG5mdW5jdGlvbiBTdHJpbmdJbnB1dFN0cmVhbShzb3VyY2UpIHtcbiAgdGhpcy5pbml0KHNvdXJjZSk7XG59XG5cblN0cmluZ0lucHV0U3RyZWFtLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhJbnB1dFN0cmVhbS5wcm90b3R5cGUsIHtcbiAgbWF0Y2hTdHJpbmc6IGZ1bmN0aW9uKHMpIHtcbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGlmICh0aGlzLm1hdGNoRXhhY3RseShzW2lkeF0pID09PSBjb21tb24uZmFpbCkge1xuICAgICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIG1hdGNoUmVnRXhwOiBmdW5jdGlvbihlKSB7XG4gICAgLy8gSU1QT1JUQU5UOiBlIG11c3QgYmUgYSBub24tZ2xvYmFsLCBvbmUtY2hhcmFjdGVyIGV4cHJlc3Npb24sIGUuZy4sIC8uLyBhbmQgL1swLTldL1xuICAgIHZhciBjID0gdGhpcy5uZXh0KCk7XG4gICAgcmV0dXJuIGMgIT09IGNvbW1vbi5mYWlsICYmIGUudGVzdChjKSA/IHRydWUgOiBjb21tb24uZmFpbDtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIExpc3RJbnB1dFN0cmVhbShzb3VyY2UpIHtcbiAgdGhpcy5pbml0KHNvdXJjZSk7XG59XG5cbkxpc3RJbnB1dFN0cmVhbS5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oSW5wdXRTdHJlYW0ucHJvdG90eXBlLCB7XG4gIG1hdGNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hFeGFjdGx5KHMpO1xuICB9LFxuXG4gIG1hdGNoUmVnRXhwOiBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hFeGFjdGx5KGUpO1xuICB9XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRTdHJlYW07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgSW5wdXRTdHJlYW0gPSByZXF1aXJlKCcuL0lucHV0U3RyZWFtLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBJbnRlcnZhbChzb3VyY2UsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gIHRoaXMuc3RhcnRJZHggPSBzdGFydElkeDtcbiAgdGhpcy5lbmRJZHggPSBlbmRJZHg7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEludGVydmFsLnByb3RvdHlwZSwge1xuICAnY29udGVudHMnOiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9jb250ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2NvbnRlbnRzID0gSW5wdXRTdHJlYW0ubmV3Rm9yKHRoaXMuc291cmNlKS5pbnRlcnZhbCh0aGlzLnN0YXJ0SWR4LCB0aGlzLmVuZElkeCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY29udGVudHM7XG4gICAgfSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlXG4gIH1cbn0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnZhbDtcblxuIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEltcG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBvaG0gPSByZXF1aXJlKCcuL21haW4uanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIGJyb3dzZXIgPSBhd2xpYi5icm93c2VyO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTmFtZXNwYWNlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gTmFtZXNwYWNlKG5hbWUpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5ncmFtbWFycyA9IHt9O1xufVxuXG5OYW1lc3BhY2UucHJvdG90eXBlID0ge1xuICBpbnN0YWxsOiBmdW5jdGlvbihuYW1lLCBncmFtbWFyKSB7XG4gICAgaWYgKHRoaXMuZ3JhbW1hcnNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlR3JhbW1hckRlY2xhcmF0aW9uKG5hbWUsIHRoaXMubmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JhbW1hcnNbbmFtZV0gPSBncmFtbWFyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBnZXRHcmFtbWFyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgaWYgKHRoaXMuZ3JhbW1hcnNbbmFtZV0pIHtcbiAgICAgIHJldHVybiB0aGlzLmdyYW1tYXJzW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlVuZGVjbGFyZWRHcmFtbWFyKG5hbWUsIHRoaXMubmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIGxvYWRHcmFtbWFyc0Zyb21TY3JpcHRFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgYnJvd3Nlci5zYW5pdHlDaGVjaygnc2NyaXB0IHRhZ1xcJ3MgdHlwZSBhdHRyaWJ1dGUgbXVzdCBiZSBcInRleHQvb2htLWpzXCInLCBlbGVtZW50LnR5cGUgPT09ICd0ZXh0L29obS1qcycpO1xuICAgIG9obS5tYWtlR3JhbW1hcnMoZWxlbWVudC5pbm5lckhUTUwsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG1ha2U6IGZ1bmN0aW9uKHJlY2lwZSkge1xuICAgIHJldHVybiByZWNpcGUob2htLCB0aGlzKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZXNwYWNlO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBQb3NJbmZvKCkge1xuICB0aGlzLnJ1bGVTdGFjayA9IFtdO1xuICB0aGlzLmFjdGl2ZVJ1bGVzID0ge307ICAvLyByZWR1bmRhbnQgKGNvdWxkIGJlIGdlbmVyYXRlZCBmcm9tIHJ1bGVTdGFjaykgYnV0IHVzZWZ1bCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICB0aGlzLm1lbW8gPSB7fTtcbn1cblxuUG9zSW5mby5wcm90b3R5cGUgPSB7XG4gIGlzQWN0aXZlOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVJ1bGVzW3J1bGVOYW1lXTtcbiAgfSxcblxuICBlbnRlcjogZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICB0aGlzLnJ1bGVTdGFjay5wdXNoKHJ1bGVOYW1lKTtcbiAgICB0aGlzLmFjdGl2ZVJ1bGVzW3J1bGVOYW1lXSA9IHRydWU7XG4gIH0sXG5cbiAgZXhpdDogZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICB0aGlzLnJ1bGVTdGFjay5wb3AoKTtcbiAgICB0aGlzLmFjdGl2ZVJ1bGVzW3J1bGVOYW1lXSA9IGZhbHNlO1xuICB9LFxuXG4gIHNob3VsZFVzZU1lbW9pemVkUmVzdWx0OiBmdW5jdGlvbihtZW1vUmVjKSB7XG4gICAgdmFyIGludm9sdmVkUnVsZXMgPSBtZW1vUmVjLmludm9sdmVkUnVsZXM7XG4gICAgZm9yICh2YXIgcnVsZU5hbWUgaW4gaW52b2x2ZWRSdWxlcykge1xuICAgICAgaWYgKGludm9sdmVkUnVsZXNbcnVsZU5hbWVdICYmIHRoaXMuYWN0aXZlUnVsZXNbcnVsZU5hbWVdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgZ2V0Q3VycmVudExlZnRSZWN1cnNpb246IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxlZnRSZWN1cnNpb25TdGFjayA/IHRoaXMubGVmdFJlY3Vyc2lvblN0YWNrW3RoaXMubGVmdFJlY3Vyc2lvblN0YWNrLmxlbmd0aCAtIDFdIDogdW5kZWZpbmVkO1xuICB9LFxuXG4gIHN0YXJ0TGVmdFJlY3Vyc2lvbjogZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgICBpZiAoIXRoaXMubGVmdFJlY3Vyc2lvblN0YWNrKSB7XG4gICAgICB0aGlzLmxlZnRSZWN1cnNpb25TdGFjayA9IFtdO1xuICAgIH1cbiAgICB0aGlzLmxlZnRSZWN1cnNpb25TdGFjay5wdXNoKHtuYW1lOiBydWxlTmFtZSwgdmFsdWU6IGNvbW1vbi5mYWlsLCBwb3M6IC0xLCBpbnZvbHZlZFJ1bGVzOiB7fX0pO1xuICAgIHRoaXMudXBkYXRlSW52b2x2ZWRSdWxlcygpO1xuICB9LFxuXG4gIGVuZExlZnRSZWN1cnNpb246IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gICAgdGhpcy5sZWZ0UmVjdXJzaW9uU3RhY2sucG9wKCk7XG4gIH0sXG5cbiAgdXBkYXRlSW52b2x2ZWRSdWxlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1cnJlbnRMZWZ0UmVjdXJzaW9uID0gdGhpcy5nZXRDdXJyZW50TGVmdFJlY3Vyc2lvbigpO1xuICAgIHZhciBpbnZvbHZlZFJ1bGVzID0gY3VycmVudExlZnRSZWN1cnNpb24uaW52b2x2ZWRSdWxlcztcbiAgICB2YXIgbHJSdWxlTmFtZSA9IGN1cnJlbnRMZWZ0UmVjdXJzaW9uLm5hbWU7XG4gICAgdmFyIGlkeCA9IHRoaXMucnVsZVN0YWNrLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBydWxlTmFtZSA9IHRoaXMucnVsZVN0YWNrW2lkeC0tXTtcbiAgICAgIGlmIChydWxlTmFtZSA9PT0gbHJSdWxlTmFtZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGludm9sdmVkUnVsZXNbcnVsZU5hbWVdID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBvc0luZm87XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLmFic3RyYWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRocm93ICd0aGlzIG1ldGhvZCBpcyBhYnN0cmFjdCEnO1xufTtcblxuZXhwb3J0cy5nZXREdXBsaWNhdGVzID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgdmFyIGR1cGxpY2F0ZXMgPSBbXTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYXJyYXkubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB4ID0gYXJyYXlbaWR4XTtcbiAgICBpZiAoYXJyYXkubGFzdEluZGV4T2YoeCkgIT09IGlkeCAmJiBkdXBsaWNhdGVzLmluZGV4T2YoeCkgPCAwKSB7XG4gICAgICBkdXBsaWNhdGVzLnB1c2goeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBkdXBsaWNhdGVzO1xufTtcblxuZXhwb3J0cy5mYWlsID0ge307XG5cbmV4cG9ydHMuaXNTeW50YWN0aWMgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB2YXIgZmlyc3RDaGFyID0gcnVsZU5hbWVbMF07XG4gIHJldHVybiAnQScgPD0gZmlyc3RDaGFyICYmIGZpcnN0Q2hhciA8PSAnWic7XG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIG9iamVjdFRoYXREZWxlZ2F0ZXNUbyA9IGF3bGliLm9iamVjdFV0aWxzLm9iamVjdFRoYXREZWxlZ2F0ZXNUbztcbnZhciBwcmludFN0cmluZyA9IGF3bGliLnN0cmluZ1V0aWxzLnByaW50U3RyaW5nO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gb3V0cHV0UmVjaXBlKGRlY2wsIHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2IuJyk7XG4gIHdzLm5leHRQdXRBbGwoZGVjbC5raW5kKTtcbiAgd3MubmV4dFB1dEFsbCgnKCcpO1xuICB3cy5uZXh0UHV0QWxsKHByaW50U3RyaW5nKGRlY2wubmFtZSkpO1xuICB3cy5uZXh0UHV0QWxsKCcsICcpO1xuICBkZWNsLmJvZHkub3V0cHV0UmVjaXBlKHdzKTtcbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufVxuXG5mdW5jdGlvbiBSdWxlRGVjbCgpIHtcbiAgdGhyb3cgJ1J1bGVEZWNsIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgLS0gaXRcXCdzIGFic3RyYWN0Jztcbn1cblxuUnVsZURlY2wucHJvdG90eXBlID0ge1xuICBwZXJmb3JtQ2hlY2tzOiBjb21tb24uYWJzdHJhY3QsXG5cbiAgcGVyZm9ybUNvbW1vbkNoZWNrczogZnVuY3Rpb24obmFtZSwgYm9keSkge1xuICAgIGJvZHkuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhuYW1lKTtcbiAgICBib2R5LmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKG5hbWUpO1xuICAgIGJvZHkuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MobmFtZSk7XG4gIH0sXG5cbiAgaW5zdGFsbDogY29tbW9uLmFic3RyYWN0LFxuXG4gIG91dHB1dFJlY2lwZTogZnVuY3Rpb24od3MpIHsgb3V0cHV0UmVjaXBlKHRoaXMsIHdzKTsgfVxufTtcblxuZnVuY3Rpb24gRGVmaW5lKG5hbWUsIGJvZHksIHN1cGVyR3JhbW1hciwgZGVzY3JpcHRpb24pIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5ib2R5ID0gYm9keTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG4gIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbn1cblxuRGVmaW5lLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhSdWxlRGVjbC5wcm90b3R5cGUsIHtcbiAga2luZDogJ2RlZmluZScsXG5cbiAgcGVyZm9ybUNoZWNrczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3RoaXMubmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uKHRoaXMubmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSk7XG4gICAgfVxuICAgIHRoaXMucGVyZm9ybUNvbW1vbkNoZWNrcyh0aGlzLm5hbWUsIHRoaXMuYm9keSk7XG4gIH0sXG5cbiAgb3V0cHV0UmVjaXBlOiBmdW5jdGlvbih3cykge1xuICAgIHdzLm5leHRQdXRBbGwoJ2Iuc2V0UnVsZURlc2NyaXB0aW9uKCcpO1xuICAgIHdzLm5leHRQdXRBbGwocHJpbnRTdHJpbmcodGhpcy5kZXNjcmlwdGlvbikpO1xuICAgIHdzLm5leHRQdXRBbGwoJyk7ICcpO1xuICAgIG91dHB1dFJlY2lwZSh0aGlzLCB3cyk7XG4gIH0sXG5cbiAgaW5zdGFsbDogZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgICB0aGlzLmJvZHkuZGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uO1xuICAgIHJ1bGVEaWN0W3RoaXMubmFtZV0gPSB0aGlzLmJvZHk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBPdmVycmlkZShuYW1lLCBib2R5LCBzdXBlckdyYW1tYXIpIHtcbiAgdGhpcy5uYW1lID0gbmFtZTtcbiAgdGhpcy5ib2R5ID0gYm9keTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG59XG5cbk92ZXJyaWRlLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhSdWxlRGVjbC5wcm90b3R5cGUsIHtcbiAga2luZDogJ292ZXJyaWRlJyxcblxuICBwZXJmb3JtQ2hlY2tzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3ZlcnJpZGRlbiA9IHRoaXMuc3VwZXJHcmFtbWFyLnJ1bGVEaWN0W3RoaXMubmFtZV07XG4gICAgaWYgKCFvdmVycmlkZGVuKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLlVuZGVjbGFyZWRSdWxlKHRoaXMubmFtZSwgdGhpcy5zdXBlckdyYW1tYXIubmFtZSk7XG4gICAgfVxuICAgIGlmIChvdmVycmlkZGVuLmdldEJpbmRpbmdOYW1lcygpLmxlbmd0aCA9PT0gMCAmJiBvdmVycmlkZGVuLnByb2R1Y2VzVmFsdWUoKSAmJiAhdGhpcy5ib2R5LnByb2R1Y2VzVmFsdWUoKSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5SdWxlTXVzdFByb2R1Y2VWYWx1ZSh0aGlzLm5hbWUsICdvdmVycmlkaW5nJyk7XG4gICAgfVxuICAgIHRoaXMucGVyZm9ybUNvbW1vbkNoZWNrcyh0aGlzLm5hbWUsIHRoaXMuYm9keSk7XG4gIH0sXG5cbiAgaW5zdGFsbDogZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgICB0aGlzLmJvZHkuZGVzY3JpcHRpb24gPSB0aGlzLnN1cGVyR3JhbW1hci5ydWxlRGljdFt0aGlzLm5hbWVdLmRlc2NyaXB0aW9uO1xuICAgIHJ1bGVEaWN0W3RoaXMubmFtZV0gPSB0aGlzLmJvZHk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBJbmxpbmUobmFtZSwgYm9keSwgc3VwZXJHcmFtbWFyKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYm9keSA9IGJvZHk7XG4gIHRoaXMuc3VwZXJHcmFtbWFyID0gc3VwZXJHcmFtbWFyO1xufVxuXG5JbmxpbmUucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFJ1bGVEZWNsLnByb3RvdHlwZSwge1xuICBraW5kOiAnaW5saW5lJyxcblxuICBwZXJmb3JtQ2hlY2tzOiBmdW5jdGlvbigpIHtcbiAgICAvLyBUT0RPOiBjb25zaWRlciByZWxheGluZyB0aGlzIGNoZWNrLCBlLmcuLCBtYWtlIGl0IG9rIHRvIG92ZXJyaWRlIGFuIGlubGluZSBydWxlIGlmIHRoZSBuZXN0aW5nIHJ1bGUgaXNcbiAgICAvLyBhbiBvdmVycmlkZS4gQnV0IG9ubHkgaWYgdGhlIGlubGluZSBydWxlIHRoYXQncyBiZWluZyBvdmVycmlkZGVuIGlzIG5lc3RlZCBpbnNpZGUgdGhlIG5lc3RpbmcgcnVsZSB0aGF0XG4gICAgLy8gd2UncmUgb3ZlcnJpZGluZz8gSG9wZWZ1bGx5IHRoZXJlJ3MgYSBtdWNoIGxlc3MgY29tcGxpY2F0ZWQgd2F5IHRvIGRvIHRoaXMgOilcbiAgICBpZiAodGhpcy5zdXBlckdyYW1tYXIucnVsZURpY3RbdGhpcy5uYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5EdXBsaWNhdGVSdWxlRGVjbGFyYXRpb24odGhpcy5uYW1lLCB0aGlzLnN1cGVyR3JhbW1hci5uYW1lKTtcbiAgICB9XG4gICAgdGhpcy5wZXJmb3JtQ29tbW9uQ2hlY2tzKHRoaXMubmFtZSwgdGhpcy5ib2R5KTtcbiAgfSxcblxuICBpbnN0YWxsOiBmdW5jdGlvbihydWxlRGljdCkge1xuICAgIHJ1bGVEaWN0W3RoaXMubmFtZV0gPSB0aGlzLmJvZHk7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBFeHRlbmQobmFtZSwgYm9keSwgc3VwZXJHcmFtbWFyKSB7XG4gIHRoaXMubmFtZSA9IG5hbWU7XG4gIHRoaXMuYmFzZSA9IHN1cGVyR3JhbW1hci5ydWxlRGljdFtuYW1lXTtcbiAgaWYgKCF0aGlzLmJhc2UpIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLlVuZGVjbGFyZWRSdWxlKG5hbWUsIHN1cGVyR3JhbW1hci5uYW1lKTtcbiAgfVxuICB0aGlzLmJvZHkgPSBib2R5O1xuICB0aGlzLmV4dGVuZGVkQm9keSA9IG5ldyBwZXhwcnMuRXh0ZW5kQWx0KHRoaXMuYm9keSwgdGhpcy5iYXNlKTtcbiAgdGhpcy5zdXBlckdyYW1tYXIgPSBzdXBlckdyYW1tYXI7XG59XG5cbkV4dGVuZC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUnVsZURlY2wucHJvdG90eXBlLCB7XG4gIGtpbmQ6ICdleHRlbmQnLFxuXG4gIHBlcmZvcm1DaGVja3M6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmJhc2UuZ2V0QmluZGluZ05hbWVzKCkubGVuZ3RoID09PSAwICYmIHRoaXMuYmFzZS5wcm9kdWNlc1ZhbHVlKCkgJiYgIXRoaXMuYm9keS5wcm9kdWNlc1ZhbHVlKCkpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuUnVsZU11c3RQcm9kdWNlVmFsdWUodGhpcy5uYW1lLCAnZXh0ZW5kaW5nJyk7XG4gICAgfVxuICAgIHRoaXMucGVyZm9ybUNvbW1vbkNoZWNrcyh0aGlzLm5hbWUsIHRoaXMuZXh0ZW5kZWRCb2R5KTtcbiAgfSxcblxuICBpbnN0YWxsOiBmdW5jdGlvbihydWxlRGljdCkge1xuICAgIHRoaXMuZXh0ZW5kZWRCb2R5LmRlc2NyaXB0aW9uID0gdGhpcy5zdXBlckdyYW1tYXIucnVsZURpY3RbdGhpcy5uYW1lXS5kZXNjcmlwdGlvbjtcbiAgICBydWxlRGljdFt0aGlzLm5hbWVdID0gdGhpcy5leHRlbmRlZEJvZHk7XG4gIH1cbn0pO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0cy5SdWxlRGVjbCA9IFJ1bGVEZWNsO1xuZXhwb3J0cy5EZWZpbmUgPSBEZWZpbmU7XG5leHBvcnRzLk92ZXJyaWRlID0gT3ZlcnJpZGU7XG5leHBvcnRzLklubGluZSA9IElubGluZTtcbmV4cG9ydHMuRXh0ZW5kID0gRXh0ZW5kO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG5cbnZhciBhd2xpYiA9IHJlcXVpcmUoJ2F3bGliJyk7XG52YXIgb2JqZWN0VGhhdERlbGVnYXRlc1RvID0gYXdsaWIub2JqZWN0VXRpbHMub2JqZWN0VGhhdERlbGVnYXRlc1RvO1xudmFyIG1ha2VTdHJpbmdCdWZmZXIgPSBhd2xpYi5vYmplY3RVdGlscy5zdHJpbmdCdWZmZXI7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5mdW5jdGlvbiBFcnJvcigpIHtcbiAgdGhyb3cgJ0Vycm9yIGNhbm5vdCBiZSBpbnN0YW50aWF0ZWQgLS0gaXRcXCdzIGFic3RyYWN0Jztcbn1cblxuRXJyb3IucHJvdG90eXBlLmdldE1lc3NhZ2UgPSBjb21tb24uYWJzdHJhY3Q7XG5cbkVycm9yLnByb3RvdHlwZS5wcmludE1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2codGhpcy5nZXRNZXNzYWdlKCkpO1xufTtcblxuRXJyb3IucHJvdG90eXBlLmdldFNob3J0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKCk7XG59O1xuXG5FcnJvci5wcm90b3R5cGUucHJpbnRTaG9ydE1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2codGhpcy5nZXRNZXNzYWdlKCkpO1xufTtcblxuRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdldFNob3J0TWVzc2FnZSgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gZXJyb3JzIGFib3V0IGdyYW1tYXJzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIFVuZGVjbGFyYXRlZCBncmFtbWFyXG5cbmZ1bmN0aW9uIFVuZGVjbGFyZWRHcmFtbWFyKGdyYW1tYXJOYW1lLCBvcHROYW1lc3BhY2VOYW1lKSB7XG4gIHRoaXMuZ3JhbW1hck5hbWUgPSBncmFtbWFyTmFtZTtcbiAgdGhpcy5uYW1lc3BhY2VOYW1lID0gb3B0TmFtZXNwYWNlTmFtZTtcbn07XG5cblVuZGVjbGFyZWRHcmFtbWFyLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhFcnJvci5wcm90b3R5cGUpO1xuXG5VbmRlY2xhcmVkR3JhbW1hci5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5uYW1lc3BhY2VOYW1lID9cbiAgICBbJ2dyYW1tYXInLCB0aGlzLmdyYW1tYXJOYW1lLCAnaXMgbm90IGRlY2xhcmVkIGluIG5hbWVzcGFjZScsIHRoaXMubmFtZXNwYWNlTmFtZV0uam9pbignICcpIDpcbiAgICBbJ3VuZGVjbGFyZWQgZ3JhbW1hcicsIHRoaXMuZ3JhbW1hck5hbWVdLmpvaW4oJyAnKTtcbn07XG5cbi8vIER1cGxpY2F0ZSBncmFtbWFyIGRlY2xhcmF0aW9uXG5cbmZ1bmN0aW9uIER1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbihncmFtbWFyTmFtZSwgbmFtZXNwYWNlTmFtZSkge1xuICB0aGlzLmdyYW1tYXJOYW1lID0gZ3JhbW1hck5hbWU7XG4gIHRoaXMubmFtZXNwYWNlTmFtZSA9IG5hbWVzcGFjZU5hbWU7XG59O1xuXG5EdXBsaWNhdGVHcmFtbWFyRGVjbGFyYXRpb24ucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKEVycm9yLnByb3RvdHlwZSk7XG5cbkR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbi5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gWydncmFtbWFyJywgdGhpcy5ncmFtbWFyTmFtZSwgJ2lzIGFscmVhZHkgZGVjbGFyZWQgaW4gbmFtZXNwYWNlJywgdGhpcy5uYW1lc3BhY2VOYW1lXS5qb2luKCcgJyk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBydWxlcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBVbmRlY2xhcmVkIHJ1bGVcblxuZnVuY3Rpb24gVW5kZWNsYXJlZFJ1bGUocnVsZU5hbWUsIG9wdEdyYW1tYXJOYW1lKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy5ncmFtbWFyTmFtZSA9IG9wdEdyYW1tYXJOYW1lO1xufTtcblxuVW5kZWNsYXJlZFJ1bGUucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKEVycm9yLnByb3RvdHlwZSk7XG5cblVuZGVjbGFyZWRSdWxlLnByb3RvdHlwZS5nZXRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmdyYW1tYXJOYW1lID9cbiAgICBbJ3J1bGUnLCB0aGlzLnJ1bGVOYW1lLCAnaXMgbm90IGRlY2xhcmVkIGluIGdyYW1tYXInLCB0aGlzLmdyYW1tYXJOYW1lXS5qb2luKCcgJykgOlxuICAgIFsndW5kZWNsYXJlZCBydWxlJywgdGhpcy5ydWxlTmFtZV0uam9pbignICcpO1xufTtcblxuLy8gRHVwbGljYXRlIHJ1bGUgZGVjbGFyYXRpb25cblxuZnVuY3Rpb24gRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uKHJ1bGVOYW1lLCBncmFtbWFyTmFtZSkge1xuICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gIHRoaXMuZ3JhbW1hck5hbWUgPSBncmFtbWFyTmFtZTtcbn07XG5cbkR1cGxpY2F0ZVJ1bGVEZWNsYXJhdGlvbi5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oRXJyb3IucHJvdG90eXBlKTtcblxuRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uLnByb3RvdHlwZS5nZXRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbJ3J1bGUnLCB0aGlzLnJ1bGVOYW1lLCAnaXMgYWxyZWFkeSBkZWNsYXJlZCBpbiBncmFtbWFyJywgdGhpcy5ncmFtbWFyTmFtZV0uam9pbignICcpO1xufTtcblxuLy8gUnVsZSBtdXN0IHByb2R1Y2UgdmFsdWVcblxuZnVuY3Rpb24gUnVsZU11c3RQcm9kdWNlVmFsdWUocnVsZU5hbWUsIHdoeSkge1xuICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gIHRoaXMud2h5ID0gd2h5O1xufTtcblxuUnVsZU11c3RQcm9kdWNlVmFsdWUucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKEVycm9yLnByb3RvdHlwZSk7XG5cblJ1bGVNdXN0UHJvZHVjZVZhbHVlLnByb3RvdHlwZS5nZXRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbXG4gICAgJ3J1bGUnLCB0aGlzLnJ1bGVOYW1lLCAnbXVzdCBwcm9kdWNlIGEgdmFsdWUnLFxuICAgICdiZWNhdXNlIHRoZSBydWxlIGl0IGlzJywgdGhpcy53aHksICdhbHNvIHByb2R1Y2VzIGEgdmFsdWUnXG4gIF0uam9pbignICcpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gYmluZGluZ3MgLS0tLS0tLS0tLS0tLS0tLS1cblxuLy8gSW5jb25zaXN0ZW50IGJpbmRpbmdzXG5cbmZ1bmN0aW9uIEluY29uc2lzdGVudEJpbmRpbmdzKHJ1bGVOYW1lLCBleHBlY3RlZCwgYWN0dWFsKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy5leHBlY3RlZCA9IGV4cGVjdGVkO1xuICB0aGlzLmFjdHVhbCA9IGFjdHVhbDtcbn07XG5cbkluY29uc2lzdGVudEJpbmRpbmdzLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhFcnJvci5wcm90b3R5cGUpO1xuXG5JbmNvbnNpc3RlbnRCaW5kaW5ncy5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gW1xuICAgICdydWxlJywgdGhpcy5ydWxlTmFtZSwgJ2hhcyBpbmNvbnNpc3RlbnQgYmluZGluZ3MuJyxcbiAgICAnZXhwZWN0ZWQ6JywgdGhpcy5leHBlY3RlZCxcbiAgICAnZ290OicsIHRoaXMuYWN0dWFsXG4gIF0uam9pbignICcpO1xufTtcblxuLy8gRHVwbGljYXRlIGJpbmRpbmdzXG5cbmZ1bmN0aW9uIER1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lLCBkdXBsaWNhdGVzKSB7XG4gIHRoaXMucnVsZU5hbWUgPSBydWxlTmFtZTtcbiAgdGhpcy5kdXBsaWNhdGVzID0gZHVwbGljYXRlcztcbn07XG5cbkR1cGxpY2F0ZUJpbmRpbmdzLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhFcnJvci5wcm90b3R5cGUpO1xuXG5EdXBsaWNhdGVCaW5kaW5ncy5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gWydydWxlJywgdGhpcy5ydWxlTmFtZSwgJ2hhcyBkdXBsaWNhdGUgYmluZGluZ3M6JywgdGhpcy5kdXBsaWNhdGVzXS5qb2luKCcgJyk7XG59O1xuXG4vLyBVc2VsZXNzIGJpbmRpbmdzXG5cbmZ1bmN0aW9uIFVzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSwgdXNlbGVzcykge1xuICB0aGlzLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG4gIHRoaXMudXNlbGVzcyA9IHVzZWxlc3M7XG59O1xuXG5Vc2VsZXNzQmluZGluZ3MucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKEVycm9yLnByb3RvdHlwZSk7XG5cblVzZWxlc3NCaW5kaW5ncy5wcm90b3R5cGUuZ2V0TWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gWydydWxlJywgdGhpcy5ydWxlTmFtZSwgJ2hhcyB1c2VsZXNzIGJpbmRpbmdzOicsIHRoaXMudXNlbGVzc10uam9pbignICcpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0gcHJvcGVydGllcyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBEdXBsaWNhdGUgcHJvcGVydHkgbmFtZXNcblxuZnVuY3Rpb24gRHVwbGljYXRlUHJvcGVydHlOYW1lcyhkdXBsaWNhdGVzKSB7XG4gIHRoaXMuZHVwbGljYXRlcyA9IGR1cGxpY2F0ZXM7XG59O1xuXG5EdXBsaWNhdGVQcm9wZXJ0eU5hbWVzLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhFcnJvci5wcm90b3R5cGUpO1xuXG5EdXBsaWNhdGVQcm9wZXJ0eU5hbWVzLnByb3RvdHlwZS5nZXRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbJ29iamVjdCBwYXR0ZXJuIGhhcyBkdXBsaWNhdGUgcHJvcGVydHkgbmFtZXM6JywgdGhpcy5kdXBsaWNhdGVzXS5qb2luKCcgJyk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLSBzeW50YXggLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gdG9FcnJvckluZm8ocG9zLCBzdHIpIHtcbiAgdmFyIGxpbmVOdW0gPSAxO1xuICB2YXIgY29sTnVtID0gMTtcblxuICB2YXIgY3VyclBvcyA9IDA7XG4gIHZhciBsaW5lU3RhcnRQb3MgPSAwO1xuXG4gIHdoaWxlIChjdXJyUG9zIDwgcG9zKSB7XG4gICAgdmFyIGMgPSBzdHIuY2hhckF0KGN1cnJQb3MrKyk7XG4gICAgaWYgKGMgPT09ICdcXG4nKSB7XG4gICAgICBsaW5lTnVtKys7XG4gICAgICBjb2xOdW0gPSAxO1xuICAgICAgbGluZVN0YXJ0UG9zID0gY3VyclBvcztcbiAgICB9IGVsc2UgaWYgKGMgIT09ICdcXHInKSB7XG4gICAgICBjb2xOdW0rKztcbiAgICB9XG4gIH1cblxuICB2YXIgbGluZUVuZFBvcyA9IHN0ci5pbmRleE9mKCdcXG4nLCBsaW5lU3RhcnRQb3MpO1xuICBpZiAobGluZUVuZFBvcyA8IDApIHtcbiAgICBsaW5lRW5kUG9zID0gc3RyLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbGluZU51bTogbGluZU51bSxcbiAgICBjb2xOdW06IGNvbE51bSxcbiAgICBsaW5lOiBzdHIuc3Vic3RyKGxpbmVTdGFydFBvcywgbGluZUVuZFBvcyAtIGxpbmVTdGFydFBvcylcbiAgfTtcbn1cblxuZnVuY3Rpb24gTWF0Y2hGYWlsdXJlKGlucHV0U3RyZWFtLCBydWxlRGljdCkge1xuICB0aGlzLmlucHV0U3RyZWFtID0gaW5wdXRTdHJlYW07XG4gIHRoaXMucnVsZURpY3QgPSBydWxlRGljdDtcbn1cblxuTWF0Y2hGYWlsdXJlLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhFcnJvci5wcm90b3R5cGUpO1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldFBvcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pbnB1dFN0cmVhbS5mYWlsdXJlc1Bvcztcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0U2hvcnRNZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gaWYgKHR5cGVvZiB0aGlzLmlucHV0U3RyZWFtLnNvdXJjZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gJ2Vycm9yIGF0IHBvc2l0aW9uICcgKyB0aGlzLmdldFBvcygpO1xuICB9IGVsc2Uge1xuICAgIHZhciB0ZXh0ID0gbWFrZVN0cmluZ0J1ZmZlcigpO1xuICAgIHZhciBlcnJvckluZm8gPSB0b0Vycm9ySW5mbyh0aGlzLmdldFBvcygpLCB0aGlzLmlucHV0U3RyZWFtLnNvdXJjZSk7XG4gICAgdGV4dC5uZXh0UHV0QWxsKHRoaXMuZ2V0TGluZUFuZENvbFRleHQoKSk7XG4gICAgdGV4dC5uZXh0UHV0QWxsKCc6IGV4cGVjdGVkICcpO1xuICAgIHRleHQubmV4dFB1dEFsbCh0aGlzLmdldEV4cGVjdGVkVGV4dCgpKTtcbiAgICByZXR1cm4gdGV4dC5jb250ZW50cygpO1xuICB9XG59O1xuXG5NYXRjaEZhaWx1cmUucHJvdG90eXBlLmdldE1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiBpZiAodHlwZW9mIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnZXJyb3IgYXQgcG9zaXRpb24gJyArIHRoaXMuZ2V0UG9zKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRleHQgPSBtYWtlU3RyaW5nQnVmZmVyKCk7XG4gICAgdmFyIGVycm9ySW5mbyA9IHRvRXJyb3JJbmZvKHRoaXMuZ2V0UG9zKCksIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlKTtcbiAgICB2YXIgbGluZUFuZENvbFRleHQgPSB0aGlzLmdldExpbmVBbmRDb2xUZXh0KCkgKyAnOiAnO1xuICAgIHRleHQubmV4dFB1dEFsbChsaW5lQW5kQ29sVGV4dCk7XG4gICAgdGV4dC5uZXh0UHV0QWxsKGVycm9ySW5mby5saW5lKTtcbiAgICB0ZXh0Lm5leHRQdXRBbGwoJ1xcbicpO1xuICAgIGZvciAodmFyIGlkeCA9IDE7IGlkeCA8IGxpbmVBbmRDb2xUZXh0Lmxlbmd0aCArIGVycm9ySW5mby5jb2xOdW07IGlkeCsrKSB7XG4gICAgICB0ZXh0Lm5leHRQdXRBbGwoJyAnKTtcbiAgICB9XG4gICAgdGV4dC5uZXh0UHV0QWxsKCdeJyk7XG4gIH1cbiAgdGV4dC5uZXh0UHV0QWxsKCdcXG5FeHBlY3RlZDogJyk7XG4gIHRleHQubmV4dFB1dEFsbCh0aGlzLmdldEV4cGVjdGVkVGV4dCgpKTtcbiAgcmV0dXJuIHRleHQuY29udGVudHMoKTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0TGluZUFuZENvbFRleHQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVycm9ySW5mbyA9IHRvRXJyb3JJbmZvKHRoaXMuZ2V0UG9zKCksIHRoaXMuaW5wdXRTdHJlYW0uc291cmNlKTtcbiAgcmV0dXJuICdMaW5lICcgKyBlcnJvckluZm8ubGluZU51bSArICcsIGNvbCAnICsgZXJyb3JJbmZvLmNvbE51bTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0RXhwZWN0ZWRUZXh0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0ZXh0ID0gbWFrZVN0cmluZ0J1ZmZlcigpO1xuICB2YXIgZXhwZWN0ZWQgPSB0aGlzLmdldEV4cGVjdGVkKCk7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGV4cGVjdGVkLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgaWYgKGlkeCA9PT0gZXhwZWN0ZWQubGVuZ3RoIC0gMSkge1xuICAgICAgICB0ZXh0Lm5leHRQdXRBbGwoZXhwZWN0ZWQubGVuZ3RoID4gMiA/ICcsIG9yICcgOiAnIG9yICcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGV4dC5uZXh0UHV0QWxsKCcsICcpO1xuICAgICAgfVxuICAgIH1cbiAgICB0ZXh0Lm5leHRQdXRBbGwoZXhwZWN0ZWRbaWR4XSk7XG4gIH1cbiAgcmV0dXJuIHRleHQuY29udGVudHMoKTtcbn07XG5cbk1hdGNoRmFpbHVyZS5wcm90b3R5cGUuZ2V0RXhwZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGV4cGVjdGVkID0ge307XG4gIGZvciAodmFyIGZhaWx1cmUgPSB0aGlzLmlucHV0U3RyZWFtLmZhaWx1cmVzOyBmYWlsdXJlICE9PSBudWxsOyBmYWlsdXJlID0gZmFpbHVyZS5uZXh0KSB7XG4gICAgZXhwZWN0ZWRbZmFpbHVyZS5leHByLnRvRXhwZWN0ZWQodGhpcy5ydWxlRGljdCldID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXMoZXhwZWN0ZWQpLnJldmVyc2UoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnRzLlVuZGVjbGFyZWRHcmFtbWFyID0gVW5kZWNsYXJlZEdyYW1tYXI7XG5leHBvcnRzLkR1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbiA9IER1cGxpY2F0ZUdyYW1tYXJEZWNsYXJhdGlvbjtcbmV4cG9ydHMuVW5kZWNsYXJlZFJ1bGUgPSBVbmRlY2xhcmVkUnVsZTtcbmV4cG9ydHMuRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uID0gRHVwbGljYXRlUnVsZURlY2xhcmF0aW9uO1xuZXhwb3J0cy5SdWxlTXVzdFByb2R1Y2VWYWx1ZSA9IFJ1bGVNdXN0UHJvZHVjZVZhbHVlO1xuZXhwb3J0cy5JbmNvbnNpc3RlbnRCaW5kaW5ncyA9IEluY29uc2lzdGVudEJpbmRpbmdzO1xuZXhwb3J0cy5EdXBsaWNhdGVCaW5kaW5ncyA9IER1cGxpY2F0ZUJpbmRpbmdzO1xuZXhwb3J0cy5Vc2VsZXNzQmluZGluZ3MgPSBVc2VsZXNzQmluZGluZ3M7XG5leHBvcnRzLkR1cGxpY2F0ZVByb3BlcnR5TmFtZXMgPSBEdXBsaWNhdGVQcm9wZXJ0eU5hbWVzO1xuZXhwb3J0cy5NYXRjaEZhaWx1cmUgPSBNYXRjaEZhaWx1cmU7XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5yZXF1aXJlKCcuLi9kaXN0L29obS1ncmFtbWFyLmpzJyk7XG5cbnZhciBCdWlsZGVyID0gcmVxdWlyZSgnLi9CdWlsZGVyLmpzJyk7XG52YXIgTmFtZXNwYWNlID0gcmVxdWlyZSgnLi9OYW1lc3BhY2UuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIHVuZXNjYXBlQ2hhciA9IGF3bGliLnN0cmluZ1V0aWxzLnVuZXNjYXBlQ2hhcjtcblxudmFyIHRoaXNNb2R1bGUgPSBleHBvcnRzO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gbWFrZUdyYW1tYXJBY3Rpb25EaWN0KG9wdE5hbWVzcGFjZSkge1xuICB2YXIgYnVpbGRlcjtcbiAgcmV0dXJuIHtcbiAgICBHcmFtbWFyczogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGV4cHIudmFsdWU7XG4gICAgfSxcblxuICAgIEdyYW1tYXI6IGZ1bmN0aW9uKG4sIHMsIHJzKSB7XG4gICAgICBidWlsZGVyID0gbmV3IEJ1aWxkZXIoKTtcbiAgICAgIGJ1aWxkZXIuc2V0TmFtZShuLnZhbHVlKTtcbiAgICAgIHMudmFsdWU7ICAvLyBmb3JjZSBldmFsdWF0aW9uXG4gICAgICBycy52YWx1ZTsgIC8vIGZvcmNlIGV2YWx1YXRpb25cbiAgICAgIHJldHVybiBidWlsZGVyLmJ1aWxkKG9wdE5hbWVzcGFjZSk7XG4gICAgfSxcblxuICAgIFN1cGVyR3JhbW1hcjogZnVuY3Rpb24oZXhwcikge1xuICAgICAgYnVpbGRlci5zZXRTdXBlckdyYW1tYXIoZXhwci52YWx1ZSk7XG4gICAgfSxcbiAgICBTdXBlckdyYW1tYXJfcXVhbGlmaWVkOiBmdW5jdGlvbihucywgbikge1xuICAgICAgcmV0dXJuIHRoaXNNb2R1bGUubmFtZXNwYWNlKG5zLnZhbHVlKS5nZXRHcmFtbWFyKG4udmFsdWUpO1xuICAgIH0sXG4gICAgU3VwZXJHcmFtbWFyX3VucXVhbGlmaWVkOiBmdW5jdGlvbihuKSB7XG4gICAgICBpZiAob3B0TmFtZXNwYWNlKSB7XG4gICAgICAgIHJldHVybiBvcHROYW1lc3BhY2UuZ2V0R3JhbW1hcihuLnZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBlcnJvcnMuVW5kZWNsYXJlZEdyYW1tYXIobi52YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIFJ1bGU6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBleHByLnZhbHVlO1xuICAgIH0sXG4gICAgUnVsZV9kZWZpbmU6IGZ1bmN0aW9uKG4sIGQsIGIpIHtcbiAgICAgIGJ1aWxkZXIuY3VycmVudFJ1bGVOYW1lID0gbi52YWx1ZTtcbiAgICAgIGQudmFsdWU7ICAvLyBmb3JjZSBldmFsdWF0aW9uXG4gICAgICByZXR1cm4gYnVpbGRlci5kZWZpbmUobi52YWx1ZSwgYi52YWx1ZSk7XG4gICAgfSxcbiAgICBSdWxlX292ZXJyaWRlOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICBidWlsZGVyLmN1cnJlbnRSdWxlTmFtZSA9IG4udmFsdWU7XG4gICAgICByZXR1cm4gYnVpbGRlci5vdmVycmlkZShuLnZhbHVlLCBiLnZhbHVlKTtcbiAgICB9LFxuICAgIFJ1bGVfZXh0ZW5kOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICBidWlsZGVyLmN1cnJlbnRSdWxlTmFtZSA9IG4udmFsdWU7XG4gICAgICByZXR1cm4gYnVpbGRlci5leHRlbmQobi52YWx1ZSwgYi52YWx1ZSk7XG4gICAgfSxcblxuICAgIEFsdDogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGV4cHIudmFsdWU7XG4gICAgfSxcbiAgICBBbHRfcmVjOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5hbHQoeC52YWx1ZSwgeS52YWx1ZSk7XG4gICAgfSxcblxuICAgIFRlcm06IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBleHByLnZhbHVlO1xuICAgIH0sXG4gICAgVGVybV9pbmxpbmU6IGZ1bmN0aW9uKHgsIG4pIHtcbiAgICAgIHJldHVybiBidWlsZGVyLmlubGluZShidWlsZGVyLmN1cnJlbnRSdWxlTmFtZSArICdfJyArIG4udmFsdWUsIHgudmFsdWUpO1xuICAgIH0sXG5cbiAgICBTZXE6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLnNlcS5hcHBseShidWlsZGVyLCBleHByLnZhbHVlKTtcbiAgICB9LFxuXG4gICAgRmFjdG9yOiBmdW5jdGlvbihleHByKSB7XG4gICAgICByZXR1cm4gZXhwci52YWx1ZTtcbiAgICB9LFxuICAgIEZhY3Rvcl9iaW5kOiBmdW5jdGlvbih4LCBuKSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5iaW5kKHgudmFsdWUsIG4udmFsdWUpO1xuICAgIH0sXG5cbiAgICBJdGVyOiBmdW5jdGlvbihleHByKSB7XG4gICAgICByZXR1cm4gZXhwci52YWx1ZTtcbiAgICB9LFxuICAgIEl0ZXJfc3RhcjogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubWFueSh4LnZhbHVlLCAwKTtcbiAgICB9LFxuICAgIEl0ZXJfcGx1czogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubWFueSh4LnZhbHVlLCAxKTtcbiAgICB9LFxuICAgIEl0ZXJfb3B0OiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5vcHQoeC52YWx1ZSk7XG4gICAgfSxcblxuICAgIFByZWQ6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBleHByLnZhbHVlO1xuICAgIH0sXG4gICAgUHJlZF9ub3Q6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiBidWlsZGVyLm5vdCh4LnZhbHVlKTtcbiAgICB9LFxuICAgIFByZWRfbG9va2FoZWFkOiBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gYnVpbGRlci5sYSh4LnZhbHVlKTtcbiAgICB9LFxuXG4gICAgQmFzZTogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGV4cHIudmFsdWU7XG4gICAgfSxcbiAgICBCYXNlX2FwcGxpY2F0aW9uOiBmdW5jdGlvbihydWxlTmFtZSkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIuYXBwKHJ1bGVOYW1lLnZhbHVlKTtcbiAgICB9LFxuICAgIEJhc2VfcHJpbTogZnVuY3Rpb24oZXhwcikge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIucHJpbShleHByLnZhbHVlKTtcbiAgICB9LFxuICAgIEJhc2VfcGFyZW46IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB4LnZhbHVlO1xuICAgIH0sXG4gICAgQmFzZV9saXN0eTogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIubGlzdHkoeC52YWx1ZSk7XG4gICAgfSxcbiAgICBCYXNlX29iajogZnVuY3Rpb24obGVuaWVudCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIub2JqKFtdLCBsZW5pZW50LnZhbHVlKTtcbiAgICB9LFxuICAgIEJhc2Vfb2JqV2l0aFByb3BzOiBmdW5jdGlvbihwcywgbGVuaWVudCkge1xuICAgICAgcmV0dXJuIGJ1aWxkZXIub2JqKHBzLnZhbHVlLCBsZW5pZW50LnZhbHVlKTtcbiAgICB9LFxuXG4gICAgUHJvcHM6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBleHByLnZhbHVlO1xuICAgIH0sXG4gICAgUHJvcHNfcmVjOiBmdW5jdGlvbihwLCBwcykge1xuICAgICAgcmV0dXJuIFtwLnZhbHVlXS5jb25jYXQocHMudmFsdWUpO1xuICAgIH0sXG4gICAgUHJvcHNfYmFzZTogZnVuY3Rpb24ocCkge1xuICAgICAgcmV0dXJuIFtwLnZhbHVlXTtcbiAgICB9LFxuICAgIFByb3A6IGZ1bmN0aW9uKG4sIHApIHtcbiAgICAgIHJldHVybiB7bmFtZTogbi52YWx1ZSwgcGF0dGVybjogcC52YWx1ZX07XG4gICAgfSxcblxuICAgIHJ1bGVEZXNjcjogZnVuY3Rpb24odCkge1xuICAgICAgYnVpbGRlci5zZXRSdWxlRGVzY3JpcHRpb24odC52YWx1ZSk7XG4gICAgICByZXR1cm4gdC52YWx1ZTtcbiAgICB9LFxuICAgIHJ1bGVEZXNjclRleHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJ2YWwuY29udGVudHM7XG4gICAgfSxcblxuICAgIGNhc2VOYW1lOiBmdW5jdGlvbihuKSB7XG4gICAgICByZXR1cm4gbi52YWx1ZVxuICAgIH0sXG5cbiAgICBuYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH0sXG4gICAgbmFtZUZpcnN0OiBmdW5jdGlvbihleHByKSB7fSxcbiAgICBuYW1lUmVzdDogZnVuY3Rpb24oZXhwcikge30sXG5cbiAgICBpZGVudDogZnVuY3Rpb24obikge1xuICAgICAgcmV0dXJuIG4udmFsdWU7XG4gICAgfSxcblxuICAgIGtleXdvcmQ6IGZ1bmN0aW9uKGV4cHIpIHtcbiAgICAgIHJldHVybiBleHByLnZhbHVlO1xuICAgIH0sXG4gICAga2V5d29yZF91bmRlZmluZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIGtleXdvcmRfbnVsbDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIGtleXdvcmRfdHJ1ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGtleXdvcmRfZmFsc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBzdHJpbmc6IGZ1bmN0aW9uKGNzKSB7XG4gICAgICByZXR1cm4gY3MudmFsdWUubWFwKGZ1bmN0aW9uKGMpIHsgcmV0dXJuIHVuZXNjYXBlQ2hhcihjKTsgfSkuam9pbignJyk7XG4gICAgfSxcblxuICAgIHNDaGFyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVydmFsLmNvbnRlbnRzO1xuICAgIH0sXG5cbiAgICByZWdFeHA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKGUudmFsdWUpO1xuICAgIH0sXG5cbiAgICByZUNoYXJDbGFzczogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcnZhbC5jb250ZW50cztcbiAgICB9LFxuXG4gICAgbnVtYmVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmludGVydmFsLmNvbnRlbnRzKTtcbiAgICB9LFxuXG4gICAgc3BhY2U6IGZ1bmN0aW9uKGV4cHIpIHt9LFxuICAgIHNwYWNlX211bHRpTGluZTogZnVuY3Rpb24oKSB7fSxcbiAgICBzcGFjZV9zaW5nbGVMaW5lOiBmdW5jdGlvbigpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVBbmRMb2FkKHNvdXJjZSwgd2hhdEl0SXMsIG9wdE5hbWVzcGFjZSkge1xuICB0cnkge1xuICAgIHZhciB0aHVuayA9IHRoaXNNb2R1bGUub2htR3JhbW1hci5tYXRjaENvbnRlbnRzKHNvdXJjZSwgd2hhdEl0SXMsIHRydWUpO1xuICAgIHJldHVybiB0aHVuayhtYWtlR3JhbW1hckFjdGlvbkRpY3Qob3B0TmFtZXNwYWNlKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZSBpbnN0YW5jZW9mIGVycm9ycy5NYXRjaEZhaWx1cmUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdcXG4nICsgZS5nZXRNZXNzYWdlKCkpO1xuICAgIH1cbiAgICB0aHJvdyBlO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1ha2VHcmFtbWFyKHNvdXJjZSwgb3B0TmFtZXNwYWNlKSB7XG4gIHJldHVybiBjb21waWxlQW5kTG9hZChzb3VyY2UsICdHcmFtbWFyJywgb3B0TmFtZXNwYWNlKTtcbn1cblxuZnVuY3Rpb24gbWFrZUdyYW1tYXJzKHNvdXJjZSwgb3B0TmFtZXNwYWNlKSB7XG4gIHJldHVybiBjb21waWxlQW5kTG9hZChzb3VyY2UsICdHcmFtbWFycycsIG9wdE5hbWVzcGFjZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFeHBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBTdHVmZiB0aGF0IHVzZXJzIHNob3VsZCBrbm93IGFib3V0XG5cbnZhciBuYW1lc3BhY2VzID0ge307XG5leHBvcnRzLm5hbWVzcGFjZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgaWYgKG5hbWVzcGFjZXNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVzcGFjZXNbbmFtZV0gPSBuZXcgTmFtZXNwYWNlKG5hbWUpO1xuICB9XG4gIHJldHVybiBuYW1lc3BhY2VzW25hbWVdO1xufTtcblxuZXhwb3J0cy5tYWtlID0gZnVuY3Rpb24ocmVjaXBlKSB7XG4gIHJldHVybiByZWNpcGUodGhpc01vZHVsZSk7XG59O1xuXG5leHBvcnRzLm1ha2VHcmFtbWFyID0gbWFrZUdyYW1tYXI7XG5leHBvcnRzLm1ha2VHcmFtbWFycyA9IG1ha2VHcmFtbWFycztcblxuLy8gU3R1ZmYgdGhhdCdzIG9ubHkgaGVyZSBmb3IgYm9vdHN0cmFwcGluZywgdGVzdGluZywgZXRjLlxuXG5leHBvcnRzLl9idWlsZGVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgQnVpbGRlcigpO1xufTtcblxuZXhwb3J0cy5fbWFrZUdyYW1tYXJBY3Rpb25EaWN0ID0gbWFrZUdyYW1tYXJBY3Rpb25EaWN0O1xuXG52YXIgb2htR3JhbW1hcjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnb2htR3JhbW1hcicsIHtcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIW9obUdyYW1tYXIpIHtcbiAgICAgIG9obUdyYW1tYXIgPSB0aGlzLl9vaG1HcmFtbWFyRmFjdG9yeSh0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIG9obUdyYW1tYXI7XG4gIH1cbn0pO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gY29tbW9uLmFic3RyYWN0O1xuXG5wZXhwcnMuYW55dGhpbmcuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuZW5kLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICB2YXIgYW5zID0gZmFsc2U7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMudGVybXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHZhciB0ZXJtID0gdGhpcy50ZXJtc1tpZHhdO1xuICAgIGFucyB8PSB0ZXJtLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKTtcbiAgfVxuICByZXR1cm4gYW5zO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICB2YXIgYW5zID0gZmFsc2U7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIGZhY3RvciA9IHRoaXMuZmFjdG9yc1tpZHhdO1xuICAgIGFucyB8PSBmYWN0b3IuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIGZhbHNlKTtcbiAgfVxuICByZXR1cm4gYW5zO1xufTtcblxucGV4cHJzLkJpbmQucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdHJ1ZSk7XG59O1xuXG5wZXhwcnMuTWFueS5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24gPSBmdW5jdGlvbihkaWN0LCB2YWx1ZVJlcXVpcmVkKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uKGRpY3QsIGZhbHNlKTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCk7XG59O1xuXG5wZXhwcnMuTGlzdHkucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgcmV0dXJuIHRoaXMuZXhwci5hZGRSdWxlc1RoYXROZWVkU2VtYW50aWNBY3Rpb24oZGljdCwgZmFsc2UpO1xufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uID0gZnVuY3Rpb24oZGljdCwgdmFsdWVSZXF1aXJlZCkge1xuICByZXR1cm4gdGhpcy5leHByLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbihkaWN0LCBmYWxzZSk7XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmFkZFJ1bGVzVGhhdE5lZWRTZW1hbnRpY0FjdGlvbiA9IGZ1bmN0aW9uKGRpY3QsIHZhbHVlUmVxdWlyZWQpIHtcbiAgaWYgKCF2YWx1ZVJlcXVpcmVkIHx8IGRpY3RbdGhpcy5ydWxlTmFtZV0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpY3RbdGhpcy5ydWxlTmFtZV0gPSB0cnVlO1xuICB9XG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIGVxdWFscyA9IGF3bGliLmVxdWFscy5lcXVhbHM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gY29tbW9uLmFic3RyYWN0O1xuXG5wZXhwcnMuYW55dGhpbmcuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLkFsdC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBpZiAodGhpcy50ZXJtcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWVzID0gdGhpcy50ZXJtc1swXS5nZXRCaW5kaW5nTmFtZXMoKTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdmFyIHRlcm0gPSB0aGlzLnRlcm1zW2lkeF07XG4gICAgdGVybS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncygpO1xuICAgIHZhciBvdGhlck5hbWVzID0gdGVybS5nZXRCaW5kaW5nTmFtZXMoKTtcbiAgICBpZiAoIWVxdWFscyhuYW1lcywgb3RoZXJOYW1lcykpIHtcbiAgICAgIHRocm93IG5ldyBlcnJvcnMuSW5jb25zaXN0ZW50QmluZGluZ3MocnVsZU5hbWUsIG5hbWVzLCBvdGhlck5hbWVzKTtcbiAgICB9XG4gIH1cbn07XG5cbnBleHBycy5FeHRlbmRBbHQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gT25seSBoYXMgdHdvIHRlcm1zLCB0aGUgc2Vjb25kIG9mIHdoaWNoIGhhcyB0aGUgZXhwZWN0ZWQgYmluZGluZ3MuXG4gIHZhciBuYW1lcyA9IHRoaXMudGVybXNbMV0uZ2V0QmluZGluZ05hbWVzKCk7XG4gIHZhciBvdGhlck5hbWVzID0gdGhpcy50ZXJtc1swXS5nZXRCaW5kaW5nTmFtZXMoKTtcbiAgaWYgKCFlcXVhbHMobmFtZXMsIG90aGVyTmFtZXMpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5JbmNvbnNpc3RlbnRCaW5kaW5ncyhydWxlTmFtZSwgbmFtZXMsIG90aGVyTmFtZXMpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnRDaG9pY2VzSGF2ZVVuaWZvcm1CaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy5mYWN0b3JzW2lkeF0uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuQmluZC5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk1hbnkucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5Mb29rYWhlYWQucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5MaXN0eS5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnByb3BlcnRpZXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMucHJvcGVydGllc1tpZHhdLnBhdHRlcm4uYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuQXBwbHkucHJvdG90eXBlLmFzc2VydENob2ljZXNIYXZlVW5pZm9ybUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xudmFyIGVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzLmpzJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBjb21tb24uYWJzdHJhY3Q7XG5cbnBleHBycy5hbnl0aGluZy5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5lbmQuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuUHJpbS5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy50ZXJtc1tpZHhdLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xuICB9XG59O1xuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5mYWN0b3JzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLmZhY3RvcnNbaWR4XS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgfVxuXG4gIHZhciBkdXBsaWNhdGVzID0gY29tbW9uLmdldER1cGxpY2F0ZXModGhpcy5nZXRCaW5kaW5nTmFtZXMoKSk7XG4gIGlmIChkdXBsaWNhdGVzLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkR1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lLCBkdXBsaWNhdGVzKTtcbiAgfVxufTtcblxucGV4cHJzLkJpbmQucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuTWFueS5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5PcHQucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICB0aGlzLmV4cHIuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MocnVsZU5hbWUpO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5MaXN0eS5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5PYmoucHJvdG90eXBlLmFzc2VydE5vRHVwbGljYXRlQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnByb3BlcnRpZXMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMucHJvcGVydGllc1tpZHhdLnBhdHRlcm4uYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSk7XG4gIH1cblxuICB2YXIgZHVwbGljYXRlcyA9IGNvbW1vbi5nZXREdXBsaWNhdGVzKHRoaXMuZ2V0QmluZGluZ05hbWVzKCkpO1xuICBpZiAoZHVwbGljYXRlcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5EdXBsaWNhdGVCaW5kaW5ncyhydWxlTmFtZSwgZHVwbGljYXRlcyk7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuYXNzZXJ0Tm9EdXBsaWNhdGVCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcbnZhciBlcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gYXNzZXJ0Tm9CaW5kaW5ncyhydWxlTmFtZSwgZXhwcikge1xuICB2YXIgYmluZGluZ3MgPSBleHByLmdldEJpbmRpbmdOYW1lcygpO1xuICBpZiAoYmluZGluZ3MubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lLCBiaW5kaW5ncyk7XG4gIH1cbn1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGNvbW1vbi5hYnN0cmFjdDtcblxucGV4cHJzLmFueXRoaW5nLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5lbmQuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgLy8gbm8tb3Bcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgdGhpcy50ZXJtc1tpZHhdLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgfVxufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuYXNzZXJ0Tm9Vc2VsZXNzQmluZGluZ3MgPSBmdW5jdGlvbihydWxlTmFtZSkge1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIHRoaXMuZmFjdG9yc1tpZHhdLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgfVxufTtcblxucGV4cHJzLkJpbmQucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5NYW55LnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSk7XG4gIGFzc2VydE5vQmluZGluZ3MocnVsZU5hbWUsIHRoaXMuZXhwcik7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSk7XG4gIGFzc2VydE5vQmluZGluZ3MocnVsZU5hbWUsIHRoaXMuZXhwcik7XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSk7XG4gIGFzc2VydE5vQmluZGluZ3MocnVsZU5hbWUsIHRoaXMuZXhwcik7XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIHRoaXMuZXhwci5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyhydWxlTmFtZSk7XG59O1xuXG5wZXhwcnMuTGlzdHkucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgdGhpcy5leHByLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbn07XG5cbnBleHBycy5PYmoucHJvdG90eXBlLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzID0gZnVuY3Rpb24ocnVsZU5hbWUpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICB0aGlzLnByb3BlcnRpZXNbaWR4XS5wYXR0ZXJuLmFzc2VydE5vVXNlbGVzc0JpbmRpbmdzKHJ1bGVOYW1lKTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5hc3NlcnROb1VzZWxlc3NCaW5kaW5ncyA9IGZ1bmN0aW9uKHJ1bGVOYW1lKSB7XG4gIC8vIG5vLW9wXG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcbnZhciB0aHVua3MgPSByZXF1aXJlKCcuL3RodW5rcy5qcycpO1xudmFyIHBleHBycyA9IHJlcXVpcmUoJy4vcGV4cHJzLmpzJyk7XG52YXIgc2tpcFNwYWNlcyA9IHJlcXVpcmUoJy4vc2tpcFNwYWNlcy5qcycpO1xudmFyIElucHV0U3RyZWFtID0gcmVxdWlyZSgnLi9JbnB1dFN0cmVhbS5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIGJyb3dzZXIgPSBhd2xpYi5icm93c2VyO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5ldmFsID0gY29tbW9uLmFic3RyYWN0O1xuXG5wZXhwcnMuYW55dGhpbmcuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgaWYgKHN5bnRhY3RpYykge1xuICAgIHNraXBTcGFjZXMocnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgfVxuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIHZhbHVlID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgaWYgKHJlY29yZEZhaWx1cmVzKSB7XG4gICAgICBpbnB1dFN0cmVhbS5yZWNvcmRGYWlsdXJlKG9yaWdQb3MsIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyB0aHVua3MuVmFsdWVUaHVuayh2YWx1ZSwgaW5wdXRTdHJlYW0uc291cmNlLCBvcmlnUG9zLCBpbnB1dFN0cmVhbS5wb3MpO1xuICB9XG59O1xuXG5wZXhwcnMuZW5kLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIGlmIChzeW50YWN0aWMpIHtcbiAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gIH1cbiAgaWYgKGlucHV0U3RyZWFtLmF0RW5kKCkpIHtcbiAgICByZXR1cm4gbmV3IHRodW5rcy5WYWx1ZVRodW5rKHVuZGVmaW5lZCwgaW5wdXRTdHJlYW0uc291cmNlLCBpbnB1dFN0cmVhbS5wb3MsIGlucHV0U3RyZWFtLnBvcyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHJlY29yZEZhaWx1cmVzKSB7XG4gICAgICBpbnB1dFN0cmVhbS5yZWNvcmRGYWlsdXJlKGlucHV0U3RyZWFtLnBvcywgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgfVxufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIGlmIChzeW50YWN0aWMpIHtcbiAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gIH1cbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGlmICh0aGlzLm1hdGNoKGlucHV0U3RyZWFtKSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICBpZiAocmVjb3JkRmFpbHVyZXMpIHtcbiAgICAgIGlucHV0U3RyZWFtLnJlY29yZEZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IHRodW5rcy5WYWx1ZVRodW5rKHRoaXMub2JqLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIGlucHV0U3RyZWFtLnBvcyk7XG4gIH1cbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uKGlucHV0U3RyZWFtKSB7XG4gIHJldHVybiBpbnB1dFN0cmVhbS5tYXRjaEV4YWN0bHkodGhpcy5vYmopO1xufTtcblxucGV4cHJzLlN0cmluZ1ByaW0ucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24oaW5wdXRTdHJlYW0pIHtcbiAgcmV0dXJuIGlucHV0U3RyZWFtLm1hdGNoU3RyaW5nKHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5SZWdFeHBQcmltLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICBpZiAoc3ludGFjdGljKSB7XG4gICAgc2tpcFNwYWNlcyhydWxlRGljdCwgaW5wdXRTdHJlYW0pO1xuICB9XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICBpZiAoaW5wdXRTdHJlYW0ubWF0Y2hSZWdFeHAodGhpcy5vYmopID09PSBjb21tb24uZmFpbCkge1xuICAgIGlmIChyZWNvcmRGYWlsdXJlcykge1xuICAgICAgaW5wdXRTdHJlYW0ucmVjb3JkRmFpbHVyZShvcmlnUG9zLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsoaW5wdXRTdHJlYW0uc291cmNlW29yaWdQb3NdLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIGlucHV0U3RyZWFtLnBvcyk7XG4gIH1cbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICB2YXIgb3JpZ051bUJpbmRpbmdzID0gYmluZGluZ3MubGVuZ3RoO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnRlcm1zLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoc3ludGFjdGljKSB7XG4gICAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IHRoaXMudGVybXNbaWR4XS5ldmFsKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpO1xuICAgIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICAgIC8vIE5vdGU6IHdoaWxlIHRoZSBmb2xsb3dpbmcgYXNzaWdubWVudCBjb3VsZCBiZSBkb25lIHVuY29uZGl0aW9uYWxseSwgb25seSBkb2luZyBpdCB3aGVuIG5lY2Vzc2FyeSBpc1xuICAgICAgLy8gYmV0dGVyIGZvciBwZXJmb3JtYW5jZS4gVGhpcyBpcyBiL2MgYXNzaWduaW5nIHRvIGFuIGFycmF5J3MgbGVuZ3RoIHByb3BlcnR5IGlzIG1vcmUgZXhwZW5zaXZlIHRoYW4gYVxuICAgICAgLy8gdHlwaWNhbCBhc3NpZ25tZW50LlxuICAgICAgaWYgKGJpbmRpbmdzLmxlbmd0aCA+IG9yaWdOdW1CaW5kaW5ncykge1xuICAgICAgICBiaW5kaW5ncy5sZW5ndGggPSBvcmlnTnVtQmluZGluZ3M7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb21tb24uZmFpbDtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLmV2YWwgPSBmdW5jdGlvbihyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKSB7XG4gIGlmIChzeW50YWN0aWMpIHtcbiAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gIH1cbiAgdmFyIG9yaWdQb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMuZmFjdG9ycy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDAgJiYgc3ludGFjdGljKSB7XG4gICAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgfVxuICAgIHZhciBmYWN0b3IgPSB0aGlzLmZhY3RvcnNbaWR4XTtcbiAgICB2YXIgdmFsdWUgPSBmYWN0b3IuZXZhbChyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKTtcbiAgICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsKSB7XG4gICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsodW5kZWZpbmVkLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIGlucHV0U3RyZWFtLnBvcyk7XG59O1xuXG5wZXhwcnMuQmluZC5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncyk7XG4gIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwpIHtcbiAgICBiaW5kaW5ncy5wdXNoKHRoaXMubmFtZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbnBleHBycy5NYW55LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgbnVtTWF0Y2hlcyA9IDA7XG4gIHZhciBtYXRjaGVzID0gdGhpcy5leHByLnByb2R1Y2VzVmFsdWUoKSA/IFtdIDogdW5kZWZpbmVkO1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgYmFja3RyYWNrUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZXhwci5ldmFsKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgW10pO1xuICAgIGlmICh2YWx1ZSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICAgIGlucHV0U3RyZWFtLnBvcyA9IGJhY2t0cmFja1BvcztcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICBudW1NYXRjaGVzKys7XG4gICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICBtYXRjaGVzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAobnVtTWF0Y2hlcyA8IHRoaXMubWluTnVtTWF0Y2hlcykge1xuICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWF0Y2hlcyA/XG4gICAgICBuZXcgdGh1bmtzLkxpc3RUaHVuayhtYXRjaGVzLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIGlucHV0U3RyZWFtLnBvcykgOlxuICAgICAgbmV3IHRodW5rcy5WYWx1ZVRodW5rKHVuZGVmaW5lZCwgaW5wdXRTdHJlYW0uc291cmNlLCBvcmlnUG9zLCBpbnB1dFN0cmVhbS5wb3MpO1xuICB9XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBbXSk7XG4gIGlmICh2YWx1ZSA9PT0gY29tbW9uLmZhaWwpIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgIHJldHVybiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsodW5kZWZpbmVkLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIG9yaWdQb3MpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLmV4cHIucHJvZHVjZXNWYWx1ZSgpID8gdmFsdWUgOiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsodHJ1ZSwgaW5wdXRTdHJlYW0uc291cmNlLCBvcmlnUG9zLCBpbnB1dFN0cmVhbS5wb3MpO1xuICB9XG59O1xuXG5wZXhwcnMuTm90LnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwoZmFsc2UsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBbXSk7XG4gIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwpIHtcbiAgICBpZiAocmVjb3JkRmFpbHVyZXMpIHtcbiAgICAgIGlucHV0U3RyZWFtLnJlY29yZEZhaWx1cmUob3JpZ1BvcywgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgfSBlbHNlIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgIHJldHVybiBuZXcgdGh1bmtzLlZhbHVlVGh1bmsodW5kZWZpbmVkLCBpbnB1dFN0cmVhbS5zb3VyY2UsIG9yaWdQb3MsIG9yaWdQb3MpO1xuICB9XG59O1xuXG5wZXhwcnMuTG9va2FoZWFkLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIHZhbHVlID0gdGhpcy5leHByLmV2YWwocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBbXSk7XG4gIGlmICh2YWx1ZSAhPT0gY29tbW9uLmZhaWwpIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbnBleHBycy5MaXN0eS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgaWYgKHN5bnRhY3RpYykge1xuICAgIHNraXBTcGFjZXMocnVsZURpY3QsIGlucHV0U3RyZWFtKTtcbiAgfVxuICB2YXIgb2JqID0gaW5wdXRTdHJlYW0ubmV4dCgpO1xuICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkgfHwgdHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICB2YXIgb2JqSW5wdXRTdHJlYW0gPSBJbnB1dFN0cmVhbS5uZXdGb3Iob2JqKTtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmV4cHIuZXZhbChyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgb2JqSW5wdXRTdHJlYW0sIGJpbmRpbmdzKTtcbiAgICByZXR1cm4gdmFsdWUgIT09IGNvbW1vbi5mYWlsICYmIG9iaklucHV0U3RyZWFtLmF0RW5kKCkgPyAgbmV3IHRodW5rcy5WYWx1ZVRodW5rKG9iaiwgaW5wdXRTdHJlYW0uc291cmNlLCBpbnB1dFN0cmVhbS5wb3MgLSAxLCBpbnB1dFN0cmVhbS5wb3MpIDogY29tbW9uLmZhaWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1vbi5mYWlsO1xuICB9XG59O1xuXG5wZXhwcnMuT2JqLnByb3RvdHlwZS5ldmFsID0gZnVuY3Rpb24ocmVjb3JkRmFpbHVyZXMsIHN5bnRhY3RpYywgcnVsZURpY3QsIGlucHV0U3RyZWFtLCBiaW5kaW5ncykge1xuICBpZiAoc3ludGFjdGljKSB7XG4gICAgc2tpcFNwYWNlcyhydWxlRGljdCwgaW5wdXRTdHJlYW0pO1xuICB9XG4gIHZhciBvYmogPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gIGlmIChvYmogIT09IGNvbW1vbi5mYWlsICYmIG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB2YXIgbnVtT3duUHJvcGVydGllc01hdGNoZWQgPSAwO1xuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLnByb3BlcnRpZXNbaWR4XTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtwcm9wZXJ0eS5uYW1lXTtcbiAgICAgIHZhciB2YWx1ZUlucHV0U3RyZWFtID0gSW5wdXRTdHJlYW0ubmV3Rm9yKFt2YWx1ZV0pO1xuICAgICAgdmFyIG1hdGNoZWQgPVxuICAgICAgICAgIHByb3BlcnR5LnBhdHRlcm4uZXZhbChyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgdmFsdWVJbnB1dFN0cmVhbSwgYmluZGluZ3MpICE9PSBjb21tb24uZmFpbCAmJlxuICAgICAgICAgIHZhbHVlSW5wdXRTdHJlYW0uYXRFbmQoKTtcbiAgICAgIGlmICghbWF0Y2hlZCkge1xuICAgICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgICB9XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5Lm5hbWUpKSB7XG4gICAgICAgIG51bU93blByb3BlcnRpZXNNYXRjaGVkKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmlzTGVuaWVudCB8fCBudW1Pd25Qcm9wZXJ0aWVzTWF0Y2hlZCA9PT0gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggP1xuICAgICAgICBuZXcgdGh1bmtzLlZhbHVlVGh1bmsob2JqLCBpbnB1dFN0cmVhbS5zb3VyY2UsIGlucHV0U3RyZWFtLnBvcyAtIDEsIGlucHV0U3RyZWFtLnBvcykgOlxuICAgICAgICBjb21tb24uZmFpbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuZXZhbCA9IGZ1bmN0aW9uKHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgYmluZGluZ3MpIHtcbiAgdmFyIHJ1bGVOYW1lID0gdGhpcy5ydWxlTmFtZTtcbiAgdmFyIG9yaWdQb3NJbmZvID0gaW5wdXRTdHJlYW0uZ2V0Q3VycmVudFBvc0luZm8oKTtcbiAgdmFyIG1lbW9SZWMgPSBvcmlnUG9zSW5mby5tZW1vW3J1bGVOYW1lXTtcbiAgaWYgKG1lbW9SZWMgJiYgb3JpZ1Bvc0luZm8uc2hvdWxkVXNlTWVtb2l6ZWRSZXN1bHQobWVtb1JlYykpIHtcbiAgICBpbnB1dFN0cmVhbS5wb3MgPSBtZW1vUmVjLnBvcztcbiAgICByZXR1cm4gbWVtb1JlYy52YWx1ZTtcbiAgfSBlbHNlIGlmIChvcmlnUG9zSW5mby5pc0FjdGl2ZShydWxlTmFtZSkpIHtcbiAgICB2YXIgY3VycmVudExSID0gb3JpZ1Bvc0luZm8uZ2V0Q3VycmVudExlZnRSZWN1cnNpb24oKTtcbiAgICBpZiAoY3VycmVudExSICYmIGN1cnJlbnRMUi5uYW1lID09PSBydWxlTmFtZSkge1xuICAgICAgb3JpZ1Bvc0luZm8udXBkYXRlSW52b2x2ZWRSdWxlcygpO1xuICAgICAgaW5wdXRTdHJlYW0ucG9zID0gY3VycmVudExSLnBvcztcbiAgICAgIHJldHVybiBjdXJyZW50TFIudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdQb3NJbmZvLnN0YXJ0TGVmdFJlY3Vyc2lvbihydWxlTmFtZSk7XG4gICAgICByZXR1cm4gY29tbW9uLmZhaWw7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBib2R5ID0gcnVsZURpY3RbcnVsZU5hbWVdO1xuICAgIGlmICghYm9keSkge1xuICAgICAgdGhyb3cgbmV3IGVycm9ycy5VbmRlY2xhcmVkUnVsZShydWxlTmFtZSk7XG4gICAgfVxuICAgIHZhciBvcmlnUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICAgIG9yaWdQb3NJbmZvLmVudGVyKHJ1bGVOYW1lKTtcbiAgICB2YXIgcmYgPSByZWNvcmRGYWlsdXJlcyAmJiAhYm9keS5kZXNjcmlwdGlvbjtcbiAgICB2YXIgcnVsZUlzU3ludGFjdGljID0gY29tbW9uLmlzU3ludGFjdGljKHJ1bGVOYW1lKTtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmV2YWxPbmNlKGJvZHksIHJmLCBydWxlSXNTeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgdmFyIGN1cnJlbnRMUiA9IG9yaWdQb3NJbmZvLmdldEN1cnJlbnRMZWZ0UmVjdXJzaW9uKCk7XG4gICAgaWYgKGN1cnJlbnRMUikge1xuICAgICAgaWYgKGN1cnJlbnRMUi5uYW1lID09PSBydWxlTmFtZSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMuaGFuZGxlTGVmdFJlY3Vyc2lvbihib2R5LCByZiwgcnVsZUlzU3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIG9yaWdQb3MsIGN1cnJlbnRMUiwgdmFsdWUpO1xuICAgICAgICBvcmlnUG9zSW5mby5tZW1vW3J1bGVOYW1lXSA9XG4gICAgICAgICAge3BvczogaW5wdXRTdHJlYW0ucG9zLCB2YWx1ZTogdmFsdWUsIGludm9sdmVkUnVsZXM6IGN1cnJlbnRMUi5pbnZvbHZlZFJ1bGVzfTtcbiAgICAgICAgb3JpZ1Bvc0luZm8uZW5kTGVmdFJlY3Vyc2lvbihydWxlTmFtZSk7XG4gICAgICB9IGVsc2UgaWYgKCFjdXJyZW50TFIuaW52b2x2ZWRSdWxlc1tydWxlTmFtZV0pIHtcbiAgICAgICAgLy8gT25seSBtZW1vaXplIGlmIHRoaXMgcnVsZSBpcyBub3QgaW52b2x2ZWQgaW4gdGhlIGN1cnJlbnQgbGVmdCByZWN1cnNpb25cbiAgICAgICAgb3JpZ1Bvc0luZm8ubWVtb1tydWxlTmFtZV0gPSB7cG9zOiBpbnB1dFN0cmVhbS5wb3MsIHZhbHVlOiB2YWx1ZX07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9yaWdQb3NJbmZvLm1lbW9bcnVsZU5hbWVdID0ge3BvczogaW5wdXRTdHJlYW0ucG9zLCB2YWx1ZTogdmFsdWV9O1xuICAgIH1cbiAgICBvcmlnUG9zSW5mby5leGl0KHJ1bGVOYW1lKTtcbiAgICBpZiAodmFsdWUgPT09IGNvbW1vbi5mYWlsICYmIHJlY29yZEZhaWx1cmVzICYmIGJvZHkuZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBlcnJvclBvcztcbiAgICAgIGlmIChib2R5LmRlc2NyaXB0aW9uICYmIHJ1bGVJc1N5bnRhY3RpYykge1xuICAgICAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgICAgICBza2lwU3BhY2VzKHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgICAgIGVycm9yUG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3JQb3MgPSBvcmlnUG9zO1xuICAgICAgfVxuICAgICAgaW5wdXRTdHJlYW0ucmVjb3JkRmFpbHVyZShlcnJvclBvcywgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5ldmFsT25jZSA9IGZ1bmN0aW9uKGV4cHIsIHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSkge1xuICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgdmFyIGJpbmRpbmdzID0gW107XG4gIHZhciB2YWx1ZSA9IGV4cHIuZXZhbChyZWNvcmRGYWlsdXJlcywgc3ludGFjdGljLCBydWxlRGljdCwgaW5wdXRTdHJlYW0sIGJpbmRpbmdzKTtcbiAgaWYgKHZhbHVlID09PSBjb21tb24uZmFpbCkge1xuICAgIHJldHVybiBjb21tb24uZmFpbDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IHRodW5rcy5SdWxlVGh1bmsodGhpcy5ydWxlTmFtZSwgaW5wdXRTdHJlYW0uc291cmNlLCBvcmlnUG9zLCBpbnB1dFN0cmVhbS5wb3MsIHZhbHVlLCBiaW5kaW5ncyk7XG4gIH1cbn07XG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUuaGFuZGxlTGVmdFJlY3Vyc2lvbiA9IGZ1bmN0aW9uKGJvZHksIHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgb3JpZ1BvcywgY3VycmVudExSLCBzZWVkVmFsdWUpIHtcbiAgdmFyIHZhbHVlID0gc2VlZFZhbHVlO1xuICBpZiAoc2VlZFZhbHVlICE9PSBjb21tb24uZmFpbCkge1xuICAgIGN1cnJlbnRMUi52YWx1ZSA9IHNlZWRWYWx1ZTtcbiAgICBjdXJyZW50TFIucG9zID0gaW5wdXRTdHJlYW0ucG9zO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpbnB1dFN0cmVhbS5wb3MgPSBvcmlnUG9zO1xuICAgICAgdmFsdWUgPSB0aGlzLmV2YWxPbmNlKGJvZHksIHJlY29yZEZhaWx1cmVzLCBzeW50YWN0aWMsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSk7XG4gICAgICBpZiAodmFsdWUgIT09IGNvbW1vbi5mYWlsICYmIGlucHV0U3RyZWFtLnBvcyA+IGN1cnJlbnRMUi5wb3MpIHtcbiAgICAgICAgY3VycmVudExSLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIGN1cnJlbnRMUi5wb3MgPSBpbnB1dFN0cmVhbS5wb3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IGN1cnJlbnRMUi52YWx1ZTtcbiAgICAgICAgaW5wdXRTdHJlYW0ucG9zID0gY3VycmVudExSLnBvcztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLmdldEJpbmRpbmdOYW1lcyA9IGZ1bmN0aW9uKCkge1xuICAvLyBUaGlzIGlzIG9rIGIvYyBhbGwgdGVybXMgbXVzdCBoYXZlIHRoZSBzYW1lIGJpbmRpbmdzIC0tIHRoaXMgcHJvcGVydHkgaXMgY2hlY2tlZCBieSB0aGUgR3JhbW1hciBjb25zdHJ1Y3Rvci5cbiAgcmV0dXJuIHRoaXMudGVybXMubGVuZ3RoID09PSAwID8gW10gOiB0aGlzLnRlcm1zWzBdLmdldEJpbmRpbmdOYW1lcygpO1xufTtcblxucGV4cHJzLlNlcS5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lcyA9IFtdO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIG5hbWVzID0gbmFtZXMuY29uY2F0KHRoaXMuZmFjdG9yc1tpZHhdLmdldEJpbmRpbmdOYW1lcygpKTtcbiAgfVxuICByZXR1cm4gbmFtZXMuc29ydCgpO1xufTtcblxucGV4cHJzLkJpbmQucHJvdG90eXBlLmdldEJpbmRpbmdOYW1lcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gW3RoaXMubmFtZV0uY29uY2F0KHRoaXMuZXhwci5nZXRCaW5kaW5nTmFtZXMoKSkuc29ydCgpO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIuZ2V0QmluZGluZ05hbWVzKCk7XG59O1xuXG5wZXhwcnMuTGlzdHkucHJvdG90eXBlLmdldEJpbmRpbmdOYW1lcyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5leHByLmdldEJpbmRpbmdOYW1lcygpO1xufTtcblxucGV4cHJzLk9iai5wcm90b3R5cGUuZ2V0QmluZGluZ05hbWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lcyA9IFtdO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLnByb3BlcnRpZXMubGVuZ3RoOyBpZHgrKykge1xuICAgIG5hbWVzID0gbmFtZXMuY29uY2F0KHRoaXMucHJvcGVydGllc1tpZHhdLnBhdHRlcm4uZ2V0QmluZGluZ05hbWVzKCkpO1xuICB9XG4gIHJldHVybiBuYW1lcy5zb3J0KCk7XG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBwcmludFN0cmluZyA9IGF3bGliLnN0cmluZ1V0aWxzLnByaW50U3RyaW5nO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gT3BlcmF0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucGV4cHJzLlBFeHByLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBjb21tb24uYWJzdHJhY3Q7XG5cbnBleHBycy5hbnl0aGluZy5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLmVuZC5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICAvLyBuby1vcFxufTtcblxucGV4cHJzLlByaW0ucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2IucHJpbSgnKTtcbiAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyh0aGlzLm9iaikpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG5wZXhwcnMuQWx0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLmFsdCgnKTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHdzLm5leHRQdXRBbGwoJywgJyk7XG4gICAgfVxuICAgIHRoaXMudGVybXNbaWR4XS5vdXRwdXRSZWNpcGUod3MpO1xuICB9XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5TZXEucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2Iuc2VxKCcpO1xuICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCB0aGlzLmZhY3RvcnMubGVuZ3RoOyBpZHgrKykge1xuICAgIGlmIChpZHggPiAwKSB7XG4gICAgICB3cy5uZXh0UHV0QWxsKCcsICcpO1xuICAgIH1cbiAgICB0aGlzLmZhY3RvcnNbaWR4XS5vdXRwdXRSZWNpcGUod3MpO1xuICB9XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5CaW5kLnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLmJpbmQoJyk7XG4gIHRoaXMuZXhwci5vdXRwdXRSZWNpcGUod3MpO1xuICB3cy5uZXh0UHV0QWxsKCcsICcpO1xuICB3cy5uZXh0UHV0QWxsKHByaW50U3RyaW5nKHRoaXMubmFtZSkpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG5wZXhwcnMuTWFueS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5tYW55KCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHdzKTtcbiAgd3MubmV4dFB1dEFsbCgnLCAnKTtcbiAgd3MubmV4dFB1dEFsbCh0aGlzLm1pbk51bU1hdGNoZXMpO1xuICB3cy5uZXh0UHV0QWxsKCcpJyk7XG59O1xuXG5wZXhwcnMuT3B0LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLm9wdCgnKTtcbiAgdGhpcy5leHByLm91dHB1dFJlY2lwZSh3cyk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIHdzLm5leHRQdXRBbGwoJ2Iubm90KCcpO1xuICB0aGlzLmV4cHIub3V0cHV0UmVjaXBlKHdzKTtcbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufTtcblxucGV4cHJzLkxvb2thaGVhZC5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5sYSgnKTtcbiAgdGhpcy5leHByLm91dHB1dFJlY2lwZSh3cyk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5MaXN0eS5wcm90b3R5cGUub3V0cHV0UmVjaXBlID0gZnVuY3Rpb24od3MpIHtcbiAgd3MubmV4dFB1dEFsbCgnYi5saXN0eSgnKTtcbiAgdGhpcy5leHByLm91dHB1dFJlY2lwZSh3cyk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbnBleHBycy5PYmoucHJvdG90eXBlLm91dHB1dFJlY2lwZSA9IGZ1bmN0aW9uKHdzKSB7XG4gIGZ1bmN0aW9uIG91dHB1dFByb3BlcnR5UmVjaXBlKHByb3ApIHtcbiAgICB3cy5uZXh0UHV0QWxsKCd7bmFtZTogJyk7XG4gICAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyhwcm9wLm5hbWUpKTtcbiAgICB3cy5uZXh0UHV0QWxsKCcsIHBhdHRlcm46ICcpO1xuICAgIHByb3AucGF0dGVybi5vdXRwdXRSZWNpcGUod3MpO1xuICAgIHdzLm5leHRQdXRBbGwoJ30nKTtcbiAgfVxuXG4gIHdzLm5leHRQdXRBbGwoJ2Iub2JqKFsnKTtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgd3MubmV4dFB1dEFsbCgnLCAnKTtcbiAgICB9XG4gICAgb3V0cHV0UHJvcGVydHlSZWNpcGUodGhpcy5wcm9wZXJ0aWVzW2lkeF0pO1xuICB9XG4gIHdzLm5leHRQdXRBbGwoJ10sICcpO1xuICB3cy5uZXh0UHV0QWxsKHByaW50U3RyaW5nKCEhdGhpcy5pc0xlbmllbnQpKTtcbiAgd3MubmV4dFB1dEFsbCgnKScpO1xufTtcblxucGV4cHJzLkFwcGx5LnByb3RvdHlwZS5vdXRwdXRSZWNpcGUgPSBmdW5jdGlvbih3cykge1xuICB3cy5uZXh0UHV0QWxsKCdiLmFwcCgnKTtcbiAgd3MubmV4dFB1dEFsbChwcmludFN0cmluZyh0aGlzLnJ1bGVOYW1lKSk7XG4gIHdzLm5leHRQdXRBbGwoJyknKTtcbn07XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE9wZXJhdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnBleHBycy5QRXhwci5wcm90b3R5cGUucHJvZHVjZXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbnBleHBycy5BbHQucHJvdG90eXBlLnByb2R1Y2VzVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy50ZXJtcy5sZW5ndGg7IGlkeCsrKSB7XG4gICAgaWYgKCF0aGlzLnRlcm1zW2lkeF0ucHJvZHVjZXNWYWx1ZSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5wZXhwcnMuU2VxLnByb3RvdHlwZS5wcm9kdWNlc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnBleHBycy5NYW55LnByb3RvdHlwZS5wcm9kdWNlc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmV4cHIucHJvZHVjZXNWYWx1ZSgpO1xufTtcblxucGV4cHJzLk5vdC5wcm90b3R5cGUucHJvZHVjZXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgcGV4cHJzID0gcmVxdWlyZSgnLi9wZXhwcnMuanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBwcmludFN0cmluZyA9IGF3bGliLnN0cmluZ1V0aWxzLnByaW50U3RyaW5nO1xudmFyIG1ha2VTdHJpbmdCdWZmZXIgPSBhd2xpYi5vYmplY3RVdGlscy5zdHJpbmdCdWZmZXI7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGVyYXRpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5wZXhwcnMuUEV4cHIucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxucGV4cHJzLmFueXRoaW5nLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gXCJhbnkgb2JqZWN0XCI7XG59O1xuXG5wZXhwcnMuZW5kLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gXCJlbmQgb2YgaW5wdXRcIjtcbn07XG5cbnBleHBycy5QcmltLnByb3RvdHlwZS50b0V4cGVjdGVkID0gZnVuY3Rpb24ocnVsZURpY3QpIHtcbiAgcmV0dXJuIHByaW50U3RyaW5nKHRoaXMub2JqKTtcbn07XG5cbnBleHBycy5Ob3QucHJvdG90eXBlLnRvRXhwZWN0ZWQgPSBmdW5jdGlvbihydWxlRGljdCkge1xuICByZXR1cm4gXCJubyBcIiArIHRoaXMuZXhwci50b0V4cGVjdGVkKCk7XG59O1xuXG4vLyBUT0RPOiB0aGluayBhYm91dCBMaXN0eSBhbmQgT2JqXG5cbnBleHBycy5BcHBseS5wcm90b3R5cGUudG9FeHBlY3RlZCA9IGZ1bmN0aW9uKHJ1bGVEaWN0KSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHJ1bGVEaWN0W3RoaXMucnVsZU5hbWVdLmRlc2NyaXB0aW9uO1xuICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gIH0gZWxzZSB7XG4gICAgdmFyIGFydGljbGUgPSAvXlthZWlvdUFFSU9VXS8udGVzdCh0aGlzLnJ1bGVOYW1lKSA/IFwiYW5cIiA6IFwiYVwiO1xuICAgIHJldHVybiBhcnRpY2xlICsgXCIgXCIgKyB0aGlzLnJ1bGVOYW1lO1xuICB9XG59O1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uLmpzJyk7XG52YXIgZXJyb3JzID0gcmVxdWlyZSgnLi9lcnJvcnMuanMnKTtcblxudmFyIGF3bGliID0gcmVxdWlyZSgnYXdsaWInKTtcbnZhciBvYmplY3RUaGF0RGVsZWdhdGVzVG8gPSBhd2xpYi5vYmplY3RVdGlscy5vYmplY3RUaGF0RGVsZWdhdGVzVG87XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcml2YXRlIHN0dWZmXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4vLyBHZW5lcmFsIHN0dWZmXG5cbmZ1bmN0aW9uIFBFeHByKCkge1xuICB0aHJvdyAnUEV4cHIgY2Fubm90IGJlIGluc3RhbnRpYXRlZCAtLSBpdFxcJ3MgYWJzdHJhY3QnO1xufVxuXG4vLyBBbnl0aGluZ1xuXG52YXIgYW55dGhpbmcgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gRW5kXG5cbnZhciBlbmQgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gUHJpbWl0aXZlc1xuXG5mdW5jdGlvbiBQcmltKG9iaikge1xuICB0aGlzLm9iaiA9IG9iajtcbn1cblxuUHJpbS5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gU3RyaW5nUHJpbShvYmopIHtcbiAgdGhpcy5vYmogPSBvYmo7XG59XG5cblN0cmluZ1ByaW0ucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFByaW0ucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gUmVnRXhwUHJpbShvYmopIHtcbiAgdGhpcy5vYmogPSBvYmo7XG59XG5cblJlZ0V4cFByaW0ucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFByaW0ucHJvdG90eXBlKTtcblxuLy8gQWx0ZXJuYXRpb25cblxuZnVuY3Rpb24gQWx0KHRlcm1zKSB7XG4gIHRoaXMudGVybXMgPSB0ZXJtcztcbn1cblxuQWx0LnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBFeHRlbmRBbHQgaXMgYW4gaW1wbGVtZW50YXRpb24gZGV0YWlsIG9mIHJ1bGUgZXh0ZW5zaW9uXG5cbmZ1bmN0aW9uIEV4dGVuZEFsdChleHRlbnNpb25zLCBiYXNlKSB7XG4gIHRoaXMudGVybXMgPSBbZXh0ZW5zaW9ucywgYmFzZV07XG59XG5cbkV4dGVuZEFsdC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oQWx0LnByb3RvdHlwZSk7XG5cbi8vIFNlcXVlbmNlc1xuXG5mdW5jdGlvbiBTZXEoZmFjdG9ycykge1xuICB0aGlzLmZhY3RvcnMgPSBmYWN0b3JzO1xufVxuXG5TZXEucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIEJpbmRpbmdzXG5cbmZ1bmN0aW9uIEJpbmQoZXhwciwgbmFtZSkge1xuICB0aGlzLmV4cHIgPSBleHByO1xuICB0aGlzLm5hbWUgPSBuYW1lO1xufVxuXG5CaW5kLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBJdGVyYXRvcnMgYW5kIG9wdGlvbmFsc1xuXG5mdW5jdGlvbiBNYW55KGV4cHIsIG1pbk51bU1hdGNoZXMpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbiAgdGhpcy5taW5OdW1NYXRjaGVzID0gbWluTnVtTWF0Y2hlcztcbn1cblxuTWFueS5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gT3B0KGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cblxuT3B0LnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBQcmVkaWNhdGVzXG5cbmZ1bmN0aW9uIE5vdChleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5cbk5vdC5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuZnVuY3Rpb24gTG9va2FoZWFkKGV4cHIpIHtcbiAgdGhpcy5leHByID0gZXhwcjtcbn1cblxuTG9va2FoZWFkLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBMaXN0eSBvYmplY3QgZGVjb21wb3NpdGlvblxuXG5mdW5jdGlvbiBMaXN0eShleHByKSB7XG4gIHRoaXMuZXhwciA9IGV4cHI7XG59XG5cbkxpc3R5LnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhQRXhwci5wcm90b3R5cGUpO1xuXG4vLyBPYmplY3QgZGVjb21wb3NpdGlvblxuXG5mdW5jdGlvbiBPYmoocHJvcGVydGllcywgaXNMZW5pZW50KSB7XG4gIHZhciBuYW1lcyA9IHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uKHByb3BlcnR5KSB7IHJldHVybiBwcm9wZXJ0eS5uYW1lOyB9KTtcbiAgdmFyIGR1cGxpY2F0ZXMgPSBjb21tb24uZ2V0RHVwbGljYXRlcyhuYW1lcyk7XG4gIGlmIChkdXBsaWNhdGVzLmxlbmd0aCA+IDApIHtcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkR1cGxpY2F0ZVByb3BlcnR5TmFtZXMoZHVwbGljYXRlcyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICB0aGlzLmlzTGVuaWVudCA9IGlzTGVuaWVudDtcbiAgfVxufVxuXG5PYmoucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFBFeHByLnByb3RvdHlwZSk7XG5cbi8vIFJ1bGUgYXBwbGljYXRpb25cblxuZnVuY3Rpb24gQXBwbHkocnVsZU5hbWUpIHtcbiAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xufVxuXG5BcHBseS5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oUEV4cHIucHJvdG90eXBlKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMubWFrZVByaW0gPSBmdW5jdGlvbihvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnICYmIG9iai5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gbmV3IFN0cmluZ1ByaW0ob2JqKTtcbiAgfVxuICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cFByaW0ob2JqKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFByaW0ob2JqKTtcbiAgfVxufTtcblxuZXhwb3J0cy5QRXhwciA9IFBFeHByO1xuZXhwb3J0cy5hbnl0aGluZyA9IGFueXRoaW5nO1xuZXhwb3J0cy5lbmQgPSBlbmQ7XG5leHBvcnRzLlByaW0gPSBQcmltO1xuZXhwb3J0cy5TdHJpbmdQcmltID0gU3RyaW5nUHJpbTtcbmV4cG9ydHMuUmVnRXhwUHJpbSA9IFJlZ0V4cFByaW07XG5leHBvcnRzLkFsdCA9IEFsdDtcbmV4cG9ydHMuRXh0ZW5kQWx0ID0gRXh0ZW5kQWx0O1xuZXhwb3J0cy5TZXEgPSBTZXE7XG5leHBvcnRzLkJpbmQgPSBCaW5kO1xuZXhwb3J0cy5NYW55ID0gTWFueTtcbmV4cG9ydHMuT3B0ID0gT3B0O1xuZXhwb3J0cy5Ob3QgPSBOb3Q7XG5leHBvcnRzLkxvb2thaGVhZCA9IExvb2thaGVhZDtcbmV4cG9ydHMuTGlzdHkgPSBMaXN0eTtcbmV4cG9ydHMuT2JqID0gT2JqO1xuZXhwb3J0cy5BcHBseSA9IEFwcGx5O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXh0ZW5zaW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxucmVxdWlyZSgnLi9wZXhwcnMtYWRkUnVsZXNUaGF0TmVlZFNlbWFudGljQWN0aW9uLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnROb0R1cGxpY2F0ZUJpbmRpbmdzLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy1hc3NlcnROb1VzZWxlc3NCaW5kaW5ncy5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtYXNzZXJ0Q2hvaWNlc0hhdmVVbmlmb3JtQmluZGluZ3MuanMnKTtcbnJlcXVpcmUoJy4vcGV4cHJzLWdldEJpbmRpbmdOYW1lcy5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtZXZhbC5qcycpO1xucmVxdWlyZSgnLi9wZXhwcnMtb3V0cHV0UmVjaXBlLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy1wcm9kdWNlc1ZhbHVlLmpzJyk7XG5yZXF1aXJlKCcuL3BleHBycy10b0V4cGVjdGVkLmpzJyk7XG5cbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBJbXBvcnRzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG52YXIgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24uanMnKTtcbnZhciBwZXhwcnMgPSByZXF1aXJlKCcuL3BleHBycy5qcycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUHJpdmF0ZSBzdHVmZlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gc2tpcFNwYWNlcyhydWxlRGljdCwgaW5wdXRTdHJlYW0pIHtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB2YXIgb3JpZ1BvcyA9IGlucHV0U3RyZWFtLnBvcztcbiAgICBpZiAocnVsZURpY3Quc3BhY2UuZXZhbChmYWxzZSwgZmFsc2UsIHJ1bGVEaWN0LCBpbnB1dFN0cmVhbSwgW10pID09PSBjb21tb24uZmFpbCkge1xuICAgICAgaW5wdXRTdHJlYW0ucG9zID0gb3JpZ1BvcztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRXhwb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSBza2lwU3BhY2VzO1xuXG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gSW1wb3J0c1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxudmFyIEludGVydmFsID0gcmVxdWlyZSgnLi9JbnRlcnZhbC5qcycpO1xuXG52YXIgYXdsaWIgPSByZXF1aXJlKCdhd2xpYicpO1xudmFyIGJyb3dzZXIgPSBhd2xpYi5icm93c2VyXG52YXIgb2JqZWN0VXRpbHMgPSBhd2xpYi5vYmplY3RVdGlsc1xudmFyIG9iamVjdFRoYXREZWxlZ2F0ZXNUbyA9IG9iamVjdFV0aWxzLm9iamVjdFRoYXREZWxlZ2F0ZXNUbztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFByaXZhdGUgc3R1ZmZcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIFRodW5rKCkge1xuICB0aHJvdyAnVGh1bmsgY2Fubm90IGJlIGluc3RhbnRpYXRlZCAtLSBpdFxcJ3MgYWJzdHJhY3QnO1xufVxuXG52YXIgbmV4dFRodW5rSWQgPSAwO1xuVGh1bmsucHJvdG90eXBlID0ge1xuICBpbml0OiBmdW5jdGlvbihzb3VyY2UsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICB0aGlzLmlkID0gbmV4dFRodW5rSWQrKztcbiAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy5fc3RhcnRJZHggPSBzdGFydElkeDtcbiAgICB0aGlzLl9lbmRJZHggPSBlbmRJZHg7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaHVuay5wcm90b3R5cGUsICdpbnRlcnZhbCcsIHtcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJ2YWwgfHwgKHRoaXMuX2ludGVydmFsID0gbmV3IEludGVydmFsKHRoaXMuX3NvdXJjZSwgdGhpcy5fc3RhcnRJZHgsIHRoaXMuX2VuZElkeCkpO1xuICB9XG59KTtcblxuZnVuY3Rpb24gUnVsZVRodW5rKHJ1bGVOYW1lLCBzb3VyY2UsIHN0YXJ0SWR4LCBlbmRJZHgsIHZhbHVlLCBiaW5kaW5ncykge1xuICB0aGlzLmluaXQoc291cmNlLCBzdGFydElkeCwgZW5kSWR4KTtcbiAgdGhpcy5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIHRoaXMuYmluZGluZ3MgPSBiaW5kaW5ncztcbn1cblxuUnVsZVRodW5rLnByb3RvdHlwZSA9IG9iamVjdFRoYXREZWxlZ2F0ZXNUbyhUaHVuay5wcm90b3R5cGUsIHtcbiAgZm9yY2U6IGZ1bmN0aW9uKGFjdGlvbkRpY3QsIG1lbW8pIHtcbiAgICBmdW5jdGlvbiBtYWtlQmluZGluZyh0aHVuaykge1xuICAgICAgdmFyIGJpbmRpbmcgPSB7aW50ZXJ2YWw6IHRodW5rLmludGVydmFsfTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShiaW5kaW5nLCAndmFsdWUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRodW5rLmZvcmNlKGFjdGlvbkRpY3QsIG1lbW8pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBiaW5kaW5nO1xuICAgIH1cblxuICAgIGlmIChtZW1vLmhhc093blByb3BlcnR5KHRoaXMuaWQpKSB7XG4gICAgICByZXR1cm4gbWVtb1t0aGlzLmlkXTtcbiAgICB9XG5cbiAgICB2YXIgYWN0aW9uID0gdGhpcy5sb29rdXBBY3Rpb24oYWN0aW9uRGljdCk7XG4gICAgdmFyIGFkZGxJbmZvID0gdGhpcy5jcmVhdGVBZGRsSW5mbygpO1xuICAgIGlmICh0aGlzLmJpbmRpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gVGhpcyBydWxlIG1heSBvciBtYXkgbm90IHByb2R1Y2UgYSB2YWx1ZS4gSWYgaXQgZG9lc24ndCwgdGhpcy52YWx1ZSBpcyBhIHZhbHVlIHRodW5rIHcvIGEgdmFsdWUgb2YgdW5kZWZpbmVkLCBzbyBpdCdzIG9rIHRvIGZvcmNlIGl0XG4gICAgICAvLyB1bmNvbmRpdGlvbmFsbHkuXG4gICAgICByZXR1cm4gbWVtb1t0aGlzLmlkXSA9IGFjdGlvbi5jYWxsKGFkZGxJbmZvLCBtYWtlQmluZGluZyh0aGlzLnZhbHVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSBzaGFwZSBvZiB0aGlzLmJpbmRpbmdzIGlzIFtuYW1lMSwgdmFsdWUxLCBuYW1lMiwgdmFsdWUyLCAuLi5dXG4gICAgICB2YXIgYXJnRGljdCA9IHt9O1xuICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgdGhpcy5iaW5kaW5ncy5sZW5ndGg7IGlkeCArPSAyKSB7XG4gICAgICAgIGFyZ0RpY3RbdGhpcy5iaW5kaW5nc1tpZHhdXSA9IHRoaXMuYmluZGluZ3NbaWR4ICsgMV07XG4gICAgICB9XG4gICAgICB2YXIgZm9ybWFscyA9IG9iamVjdFV0aWxzLmZvcm1hbHMoYWN0aW9uKTtcbiAgICAgIHZhciBpc0RlZmF1bHRBY3Rpb24gPSBmb3JtYWxzLmxlbmd0aCA9PT0gMDtcbiAgICAgIHZhciBhcmdzID0gaXNEZWZhdWx0QWN0aW9uID9cbiAgICAgICAgb2JqZWN0VXRpbHMudmFsdWVzKGFyZ0RpY3QpLm1hcChmdW5jdGlvbihhcmcpIHsgcmV0dXJuIG1ha2VCaW5kaW5nKGFyZyk7IH0pIDpcbiAgICAgICAgZm9ybWFscy5tYXAoZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gbWFrZUJpbmRpbmcoYXJnRGljdFtuYW1lXSk7IH0pO1xuICAgICAgcmV0dXJuIG1lbW9bdGhpcy5pZF0gPSBhY3Rpb24uYXBwbHkoYWRkbEluZm8sIGFyZ3MpO1xuICAgIH1cbiAgfSxcblxuICBsb29rdXBBY3Rpb246IGZ1bmN0aW9uKGFjdGlvbkRpY3QpIHtcbiAgICB2YXIgcnVsZU5hbWUgPSB0aGlzLnJ1bGVOYW1lO1xuICAgIHZhciBhY3Rpb24gPSBhY3Rpb25EaWN0W3J1bGVOYW1lXTtcbiAgICBpZiAoYWN0aW9uID09PSB1bmRlZmluZWQgJiYgYWN0aW9uRGljdC5fZGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbkRpY3QuX2RlZmF1bHQuY2FsbCh0aGlzLCBydWxlTmFtZSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gYWN0aW9uIHx8IGJyb3dzZXIuZXJyb3IoJ21pc3Npbmcgc2VtYW50aWMgYWN0aW9uIGZvcicsIHJ1bGVOYW1lKTtcbiAgfSxcblxuICBjcmVhdGVBZGRsSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGludGVydmFsOiB0aGlzLmludGVydmFsXG4gICAgfTtcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIExpc3RUaHVuayh0aHVua3MsIHNvdXJjZSwgc3RhcnRJZHgsIGVuZElkeCkge1xuICB0aGlzLmluaXQoc291cmNlLCBzdGFydElkeCwgZW5kSWR4KTtcbiAgdGhpcy50aHVua3MgPSB0aHVua3M7XG59XG5cbkxpc3RUaHVuay5wcm90b3R5cGUgPSBvYmplY3RUaGF0RGVsZWdhdGVzVG8oVGh1bmsucHJvdG90eXBlLCB7XG4gIGZvcmNlOiBmdW5jdGlvbihhY3Rpb25EaWN0LCBtZW1vKSB7XG4gICAgaWYgKCFtZW1vLmhhc093blByb3BlcnR5KHRoaXMuaWQpKSB7XG4gICAgICBtZW1vW3RoaXMuaWRdID0gdGhpcy50aHVua3MubWFwKGZ1bmN0aW9uKHRodW5rKSB7IHJldHVybiB0aHVuay5mb3JjZShhY3Rpb25EaWN0LCBtZW1vKTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBtZW1vW3RoaXMuaWRdO1xuICB9XG59KTtcblxuZnVuY3Rpb24gVmFsdWVUaHVuayh2YWx1ZSwgc291cmNlLCBzdGFydElkeCwgZW5kSWR4KSB7XG4gIHRoaXMuaW5pdChzb3VyY2UsIHN0YXJ0SWR4LCBlbmRJZHgpO1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG59XG5cblZhbHVlVGh1bmsucHJvdG90eXBlID0gb2JqZWN0VGhhdERlbGVnYXRlc1RvKFRodW5rLnByb3RvdHlwZSwge1xuICBmb3JjZTogZnVuY3Rpb24oYWN0aW9uRGljdCwgbWVtbykge1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG59KTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEV4cG9ydHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydHMuUnVsZVRodW5rID0gUnVsZVRodW5rO1xuZXhwb3J0cy5MaXN0VGh1bmsgPSBMaXN0VGh1bms7XG5leHBvcnRzLlZhbHVlVGh1bmsgPSBWYWx1ZVRodW5rO1xuXG4iXX0=
(16)
});
