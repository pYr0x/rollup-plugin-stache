var canNamespace = {};

var warnTimeout = 5000;
var logLevel = 0;

/**
 * @module {{}} can-log log
 * @parent can-js-utilities
 * @collection can-infrastructure
 * @hide
 *
 * Utilities for logging to the console.
 */

/**
 * @function can-log.warn warn
 * @parent can-log
 * @description
 *
 * Adds a warning message to the console.
 *
 * ```
 * var canLog = require("can-log");
 *
 * canLog.warn("something evil");
 * ```
 *
 * @signature `canLog.warn(msg)`
 * @param {String} msg the message to be logged.
 */
var warn = function() {
	var ll = this.logLevel;
	if (ll < 2) {
		if (typeof console !== "undefined" && console.warn) {
			this._logger("warn", Array.prototype.slice.call(arguments));
		} else if (typeof console !== "undefined" && console.log) {
			this._logger("log", Array.prototype.slice.call(arguments));
		}
	}
};

/**
 * @function can-log.log log
 * @parent can-log
 * @description
 * Adds a message to the console.
 * @hide
 *
 * ```
 * var canLog = require("can-log");
 *
 * canLog.log("hi");
 * ```
 *
 * @signature `canLog.log(msg)`
 * @param {String} msg the message
 */
var log$1 = function() {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.log) {
			this._logger("log", Array.prototype.slice.call(arguments));
		}
	}
};

/**
 * @function can-log.error error
 * @parent can-log
 * @description
 * Adds an error message to the console.
 * @hide
 *
 * ```
 * var canLog = require("can-log");
 *
 * canLog.error(new Error("Oh no!"));
 * ```
 *
 * @signature `canLog.error(err)`
 * @param {String|Error} err The error to be logged.
 */
var error = function() {
	var ll = this.logLevel;
	if (ll < 1) {
		if (typeof console !== "undefined" && console.error) {
			this._logger("error", Array.prototype.slice.call(arguments));
		}
	}
};

var _logger = function (type, arr) {
	try {
		console[type].apply(console, arr);
	} catch(e) {
		console[type](arr);
	}
};

var canLog = {
	warnTimeout: warnTimeout,
	logLevel: logLevel,
	warn: warn,
	log: log$1,
	error: error,
	_logger: _logger
};

/**
 * @module {{}} can-log/dev dev
 * @parent can-log
 * @hide
 * 
 * Utilities for logging development-mode messages. Use this module for
 * anything that should be shown to the user during development but isn't
 * needed in production. In production these functions become noops.
 */
var dev = {
	warnTimeout: 5000,
	logLevel: 0,
	/**
	 * @function can-log/dev.stringify stringify
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * JSON stringifies a value, but unlike JSON, will output properties with
	 * a value of `undefined` (e.g. `{ "prop": undefined }`, not `{}`).
	 *
	 * ```
	 * var dev = require('can-log/dev');
	 * var query = { where: undefined };
	 * 
	 * dev.warn('No records found: ' + dev.stringify(query));
	 * ```
	 *
	 * @signature `dev.stringify(value)`
	 * @param {Any} value A value to stringify.
	 * @return {String} A stringified representation of the passed in value.
	 */
	stringify: function(value) {
		var flagUndefined = function flagUndefined(key, value) {
			return value === undefined ?
				 "/* void(undefined) */" : value;
		};
		
		return JSON.stringify(value, flagUndefined, "  ").replace(
			/"\/\* void\(undefined\) \*\/"/g, "undefined");
	},
	/**
	 * @function can-log/dev.warn warn
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * Adds a warning message to the console.
	 *
	 * ```
	 * var dev = require('can-log/dev');
	 * 
	 * dev.warn("something evil");
	 * ```
	 *
	 * @signature `dev.warn(msg)`
	 * @param {String} msg The warning message.
	 */
	warn: function() {
		//!steal-remove-end
	},
	/**
	 * @function can-log/dev.log log
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * Adds a message to the console.
	 *
	 * ```
	 * var dev = require('can-log/dev');
	 * 
	 * dev.log("hi");
	 * ```
	 *
	 * @signature `dev.log(msg)`
	 * @param {String} msg The message.
	 */
	log: function() {
		//!steal-remove-end
	},
	/**
	 * @function can-log/dev.error error
	 * @parent can-log
	 * @description
	 * @hide
	 *
	 * Adds an error message to the console.
	 *
	 * ```
	 * var dev = require("can-log/dev");
	 * 
	 * dev.error(new Error("Oh no!"));
	 * ```
	 *
	 * @signature `dev.error(err)`
	 * @param {String|Error} err The error to be logged.
	 */
	error: function() {
		//!steal-remove-end
	},
	_logger: canLog._logger
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var canAttributeEncoder = createCommonjsModule(function (module) {



/**
 * @module {{}} can-attribute-encoder can-attribute-encoder
 * @parent can-dom-utilities
 * @collection can-infrastructure
 * @package ./package.json
 *
 * Encode and decode attribute names.
 *
 * @option {Object} An object with the methods:
 * [can-attribute-encoder.encode] and [can-attribute-encoder.decode].
 *
 */


function each(items, callback){
	for ( var i = 0; i < items.length; i++ ) {
		callback(items[i], i);
	}
}

function makeMap(str){
	var obj = {}, items = str.split(",");
	each(items, function(name){
		obj[name] = true;
	});
	return obj;
}

// Attributes for which the case matters - shouldn’t be lowercased.
var caseMattersAttributes = makeMap("allowReorder,attributeName,attributeType,autoReverse,baseFrequency,baseProfile,calcMode,clipPathUnits,contentScriptType,contentStyleType,diffuseConstant,edgeMode,externalResourcesRequired,filterRes,filterUnits,glyphRef,gradientTransform,gradientUnits,kernelMatrix,kernelUnitLength,keyPoints,keySplines,keyTimes,lengthAdjust,limitingConeAngle,markerHeight,markerUnits,markerWidth,maskContentUnits,maskUnits,patternContentUnits,patternTransform,patternUnits,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,repeatCount,repeatDur,requiredExtensions,requiredFeatures,specularConstant,specularExponent,spreadMethod,startOffset,stdDeviation,stitchTiles,surfaceScale,systemLanguage,tableValues,textLength,viewBox,viewTarget,xChannelSelector,yChannelSelector,controlsList");

function camelCaseToSpinalCase(match, lowerCaseChar, upperCaseChar) {
	return lowerCaseChar + "-" + upperCaseChar.toLowerCase();
}

function startsWith(allOfIt, startsWith) {
	return allOfIt.indexOf(startsWith) === 0;
}

function endsWith(allOfIt, endsWith) {
	return (allOfIt.length - allOfIt.lastIndexOf(endsWith)) === endsWith.length;
}

var regexes = {
	leftParens: /\(/g,
	rightParens: /\)/g,
	leftBrace: /\{/g,
	rightBrace: /\}/g,
	camelCase: /([a-z]|[0-9]|^)([A-Z])/g,
	forwardSlash: /\//g,
	space: /\s/g,
	uppercase: /[A-Z]/g,
	uppercaseDelimiterThenChar: /:u:([a-z])/g,
	caret: /\^/g,
	dollar: /\$/g,
	at: /@/g
};

var delimiters = {
	prependUppercase: ':u:',
	replaceSpace: ':s:',
	replaceForwardSlash: ':f:',
	replaceLeftParens: ':lp:',
	replaceRightParens: ':rp:',
	replaceLeftBrace: ':lb:',
	replaceRightBrace: ':rb:',
	replaceCaret: ':c:',
	replaceDollar: ':d:',
	replaceAt: ':at:'
};

var encoder = {};

/**
 * @function can-attribute-encoder.encode encode
 * @parent can-attribute-encoder
 * @description Encode an attribute name
 *
 * @signature `encoder.encode(attributeName)`
 *
 * Note: specific encoding may change, but encoded attributes
 * can always be decoded using [can-attribute-encoder.decode].
 *
 * @body
 *
 * ```js
 * var encodedAttributeName = encoder.encode("{(^$foo/bar baz)}");
 * div.setAttribute(encodedAttributeName, "attribute value");
 * ```
 *
 * @param {String} attributeName The attribute name.
 * @return {String} The encoded attribute name.
 *
 */
encoder.encode = function(name) {
	var encoded = name;

	// encode or convert camelCase attributes unless in list of attributes
	// where case matters
	if (!caseMattersAttributes[encoded] && encoded.match(regexes.camelCase)) {
		// encode uppercase characters in new bindings
		// - on:fooBar, fooBar:to, fooBar:from, fooBar:bind
		if (
			startsWith(encoded, 'on:') ||
			endsWith(encoded, ':to') ||
			endsWith(encoded, ':from') ||
			endsWith(encoded, ':bind') ||
			endsWith(encoded, ':raw')
		) {
			encoded = encoded
				.replace(regexes.uppercase, function(char) {
					return delimiters.prependUppercase + char.toLowerCase();
				});
		} else if(startsWith(encoded, '(') || startsWith(encoded, '{')) {
			// convert uppercase characters in older bindings to kebab-case
			// - {fooBar}, (fooBar), {(fooBar)}
			encoded = encoded.replace(regexes.camelCase, camelCaseToSpinalCase);
			//!steal-remove-end
		}
	}

	//encode spaces
	encoded = encoded.replace(regexes.space, delimiters.replaceSpace)
		//encode forward slashes
		.replace(regexes.forwardSlash, delimiters.replaceForwardSlash)
		// encode left parentheses
		.replace(regexes.leftParens, delimiters.replaceLeftParens)
		// encode right parentheses
		.replace(regexes.rightParens, delimiters.replaceRightParens)
		// encode left braces
		.replace(regexes.leftBrace, delimiters.replaceLeftBrace)
		// encode left braces
		.replace(regexes.rightBrace, delimiters.replaceRightBrace)
		// encode ^
		.replace(regexes.caret, delimiters.replaceCaret)
		// encode $
		.replace(regexes.dollar, delimiters.replaceDollar)
		// encode @
		.replace(regexes.at, delimiters.replaceAt);

	return encoded;
};

/**
 * @function can-attribute-encoder.decode decode
 * @parent can-attribute-encoder
 * @description Decode an attribute name encoded by [can-attribute-encoder.encode]
 * @signature `encoder.decode(attributeName)`
 *
 * @body
 *
 * ```js
 * encoder.decode(attributeName); // -> "{(^$foo/bar baz)}"
 *
 * ```
 *
 * @param {String} attributeName The encoded attribute name.
 * @return {String} The decoded attribute name.
 *
 */
encoder.decode = function(name) {
	var decoded = name;

	// decode uppercase characters in new bindings
	if (!caseMattersAttributes[decoded] && regexes.uppercaseDelimiterThenChar.test(decoded)) {
		if (
			startsWith(decoded, 'on:') ||
			endsWith(decoded, ':to') ||
			endsWith(decoded, ':from') ||
			endsWith(decoded, ':bind') ||
			endsWith(decoded, ':raw')
		) {
			decoded = decoded
				.replace(regexes.uppercaseDelimiterThenChar, function(match, char) {
					return char.toUpperCase();
				});
		}
	}

	// decode left parentheses
	decoded = decoded.replace(delimiters.replaceLeftParens, '(')
		// decode right parentheses
		.replace(delimiters.replaceRightParens, ')')
		// decode left braces
		.replace(delimiters.replaceLeftBrace, '{')
		// decode left braces
		.replace(delimiters.replaceRightBrace, '}')
		// decode forward slashes
		.replace(delimiters.replaceForwardSlash, '/')
		// decode spaces
		.replace(delimiters.replaceSpace, ' ')
		// decode ^
		.replace(delimiters.replaceCaret, '^')
		//decode $
		.replace(delimiters.replaceDollar, '$')
		//decode @
		.replace(delimiters.replaceAt, '@');

	return decoded;
};

if (canNamespace.encoder) {
	throw new Error("You can't have two versions of can-attribute-encoder, check your dependencies");
} else {
	module.exports = canNamespace.encoder = encoder;
}
});

/* jshint maxdepth:7,node:true, latedef:false */


function each(items, callback){
	for ( var i = 0; i < items.length; i++ ) {
		callback(items[i], i);
	}
}

function makeMap$1(str){
	var obj = {}, items = str.split(",");
	each(items, function(name){
		obj[name] = true;
	});
	return obj;
}

function handleIntermediate(intermediate, handler){
	for(var i = 0, len = intermediate.length; i < len; i++) {
		var item = intermediate[i];
		handler[item.tokenType].apply(handler, item.args);
	}
	return intermediate;
}
//!steal-remove-end

var alphaNumeric = "A-Za-z0-9",
	alphaNumericHU = "-:_"+alphaNumeric,
	magicStart = "{{",
	endTag = new RegExp("^<\\/(["+alphaNumericHU+"]+)[^>]*>"),
	magicMatch = new RegExp("\\{\\{(![\\s\\S]*?!|[\\s\\S]*?)\\}\\}\\}?","g"),
	space = /\s/,
	alphaRegex = new RegExp('['+ alphaNumeric + ']'),
	attributeRegexp = new RegExp("["+alphaNumericHU+"]+\s*=\s*(\"[^\"]*\"|'[^']*')");

// Empty Elements - HTML 5
var empty = makeMap$1("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed");

// Elements for which tag case matters - shouldn't be lowercased.
var caseMattersElements = makeMap$1("altGlyph,altGlyphDef,altGlyphItem,animateColor,animateMotion,animateTransform,clipPath,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,foreignObject,glyphRef,linearGradient,radialGradient,textPath");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap$1("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Special Elements (can contain anything)
var special$1 = makeMap$1("script");

// Callback names on `handler`.
var tokenTypes = "start,end,close,attrStart,attrEnd,attrValue,chars,comment,special,done".split(",");

//maps end characters to start characters
var startOppositesMap = {"{": "}", "(":")"};

var fn = function(){};

var HTMLParser = function (html, handler, returnIntermediate) {
	if(typeof html === "object") {
		return handleIntermediate(html, handler);
	}

	var intermediate = [];
	handler = handler || {};
	if(returnIntermediate) {
		// overwrite handlers so they add to intermediate
		each(tokenTypes, function(name){
			var callback = handler[name] || fn;
			handler[name] = function(){
				if( callback.apply(this, arguments) !== false ) {
					var end = arguments.length;

					// the intermediate is stringified in the compiled stache templates
					// so we want to trim the last item if it is the line number
					if (arguments[end - 1] === undefined) {
						end = arguments.length - 1;
					}
					//!steal-remove-end

					intermediate.push({
						tokenType: name,
						args: [].slice.call(arguments, 0, end),
					});
				}
			};
		});
	}

	function parseStartTag(tag, tagName, rest, unary) {
		tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();

		if (closeSelf[tagName] && stack.last() === tagName) {
			parseEndTag("", tagName);
		}

		unary = empty[tagName] || !!unary;
		handler.start(tagName, unary, lineNo);
		if (!unary) {
			stack.push(tagName);
		}

		// find attribute or special
		HTMLParser.parseAttrs(rest, handler, lineNo);
		//!steal-remove-end


		handler.end(tagName, unary, lineNo);

		if(tagName === "html") {
			skipChars = true;
		}
	}

	function parseEndTag(tag, tagName) {
		// If no tag name is provided, clean shop
		var pos;
		if (!tagName) {
			pos = 0;
		}
		// Find the closest opened tag of the same type
		else {
			tagName = caseMattersElements[tagName] ? tagName : tagName.toLowerCase();
			for (pos = stack.length - 1; pos >= 0; pos--) {
				if (stack[pos] === tagName) {
					break;
				}
			}
		}
		//!steal-remove-end

		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (var i = stack.length - 1; i >= pos; i--) {
				if (handler.close) {
					handler.close(stack[i], lineNo);
				}
			}

			// Remove the open elements from the stack
			stack.length = pos;

			// Don't add TextNodes after the <body> tag
			if(tagName === "body") {
				skipChars = true;
			}
		}
	}

	function parseMustache(mustache, inside){
		if(handler.special){
			handler.special(inside, lineNo);
		}
	}

	var callChars = function(){
		if(charsText && !skipChars) {
			if(handler.chars) {
				handler.chars(charsText, lineNo);
			}
			//!steal-remove-end
		}

		skipChars = false;
		charsText = "";
	};

	var index,
		chars,
		skipChars,
		match,
		lineNo,
		stack = [],
		last = html,
		// an accumulating text for the next .chars callback
		charsText = "";
	//!steal-remove-end

	stack.last = function () {
		return this[this.length - 1];
	};

	while (html) {

		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special$1[stack.last()]) {

			// Comment
			if (html.indexOf("<!--") === 0) {
				index = html.indexOf("-->");

				if (index >= 0) {
					callChars();
					if (handler.comment) {
						handler.comment(html.substring(4, index), lineNo);
					}
					//!steal-remove-end

					html = html.substring(index + 3);
					chars = false;
				}

				// end tag
			} else if (html.indexOf("</") === 0) {
				match = html.match(endTag);

				if (match) {
					callChars();
					match[0].replace(endTag, parseEndTag);
					//!steal-remove-end

					html = html.substring(match[0].length);
					chars = false;
				}

				// start tag
			} else if (html.indexOf("<") === 0) {
				var res = HTMLParser.searchStartTag(html);

				if(res) {
					callChars();
					parseStartTag.apply(null, res.match);

					html = res.html;
					chars = false;
				}

				// magic tag
			} else if (html.indexOf(magicStart) === 0 ) {
				match = html.match(magicMatch);

				if (match) {
					callChars();
					match[0].replace(magicMatch, parseMustache);
					//!steal-remove-end

					html = html.substring(match[0].length);
				}
			}

			if (chars) {
				index = findBreak(html, magicStart);
				if(index === 0 && html === last) {
					charsText += html.charAt(0);
					html = html.substr(1);
					index = findBreak(html, magicStart);
				}

				var text = index < 0 ? html : html.substring(0, index);
				html = index < 0 ? "" : html.substring(index);

				if (text) {
					charsText += text;
				}
			}

		} else {
			html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
				text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
				if (handler.chars) {
					handler.chars(text, lineNo);
				}
				//!steal-remove-end

				return "";
			});

			parseEndTag("", stack.last());
		}

		if (html === last) {
			throw new Error("Parse Error: " + html);
		}

		last = html;
	}
	callChars();
	// Clean up any remaining tags
	parseEndTag();


	handler.done(lineNo);
	return intermediate;
};

var callAttrStart = function(state, curIndex, handler, rest, lineNo){
	var attrName = rest.substring(typeof state.nameStart === "number" ? state.nameStart : curIndex, curIndex),
		newAttrName = canAttributeEncoder.encode(attrName);

	state.attrStart = newAttrName;
	handler.attrStart(state.attrStart, lineNo);
	state.inName = false;
};

var callAttrEnd = function(state, curIndex, handler, rest, lineNo){
	if(state.valueStart !== undefined && state.valueStart < curIndex) {
		var val = rest.substring(state.valueStart, curIndex);
		//!steal-remove-end
		handler.attrValue(val, lineNo);
	}
	// if this never got to be inValue, like `DISABLED` then send a attrValue
	// else if(!state.inValue){
	// 	handler.attrValue(state.attrStart, lineNo);
	// }

	handler.attrEnd(state.attrStart, lineNo);
	state.attrStart = undefined;
	state.valueStart = undefined;
	state.inValue = false;
	state.inName = false;
	state.lookingForEq = false;
	state.inQuote = false;
	state.lookingForName = true;
};

var findBreak = function(str, magicStart) {
	var magicLength = magicStart.length;
	for(var i = 0, len = str.length; i < len; i++) {
		if(str[i] === "<" || str.substr(i, magicLength) === magicStart) {
			return i;
		}
	}
	return -1;
};

HTMLParser.parseAttrs = function(rest, handler, lineNo){
	if(!rest) {
		return;
	}

	var i = 0;
	var curIndex;
	var state = {
		inName: false,
		nameStart: undefined,
		inValue: false,
		valueStart: undefined,
		inQuote: false,
		attrStart: undefined,
		lookingForName: true,
		lookingForValue: false,
		lookingForEq : false
	};

	while(i < rest.length) {
		curIndex = i;
		var cur = rest.charAt(i);
		i++;

		if(magicStart === rest.substr(curIndex, magicStart.length) ) {
			if(state.inValue && curIndex > state.valueStart) {
				handler.attrValue(rest.substring(state.valueStart, curIndex), lineNo);
			}
			// `{{#foo}}DISABLED{{/foo}}`
			else if(state.inName && state.nameStart < curIndex) {
				callAttrStart(state, curIndex, handler, rest, lineNo);
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}
			// foo={{bar}}
			else if(state.lookingForValue){
				state.inValue = true;
			}
			// a {{bar}}
			else if(state.lookingForEq && state.attrStart) {
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}

			magicMatch.lastIndex = curIndex;
			var match = magicMatch.exec(rest);
			if(match) {
				handler.special(match[1], lineNo);
				// i is already incremented
				i = curIndex + (match[0].length);
				if(state.inValue) {
					state.valueStart = curIndex+match[0].length;
				}
			}
		}
		else if(state.inValue) {
			if(state.inQuote) {
				if(cur === state.inQuote) {
					callAttrEnd(state, curIndex, handler, rest, lineNo);
				}
			}
			else if(space.test(cur)) {
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}
		}
		// if we hit an = outside a value
		else if(cur === "=" && (state.lookingForEq || state.lookingForName || state.inName)) {
			// if we haven't yet started this attribute `{{}}=foo` case:
			if(!state.attrStart) {
				callAttrStart(state, curIndex, handler, rest, lineNo);
			}
			state.lookingForValue = true;
			state.lookingForEq = false;
			state.lookingForName = false;
		}
		// if we are currently in a name:
		//  when the name starts with `{` or `(`
		//  it isn't finished until the matching end character is found
		//  otherwise, a space finishes the name
		else if(state.inName) {
			var started = rest[ state.nameStart ],
					otherStart, otherOpposite;
			if(startOppositesMap[started] === cur) {
				//handle mismatched brackets: `{(})` or `({)}`
				otherStart = started === "{" ? "(" : "{";
				otherOpposite = startOppositesMap[otherStart];

				if(rest[curIndex+1] === otherOpposite){
					callAttrStart(state, curIndex+2, handler, rest, lineNo);
					i++;
				}else {
					callAttrStart(state, curIndex+1, handler, rest, lineNo);
				}

				state.lookingForEq = true;
			}
			else if(space.test(cur) && started !== "{" && started !== "(") {
					callAttrStart(state, curIndex, handler, rest, lineNo);
					state.lookingForEq = true;
			}
		}
		else if(state.lookingForName) {
			if(!space.test(cur)) {
				// might have just started a name, we need to close it
				if(state.attrStart) {
					callAttrEnd(state, curIndex, handler, rest, lineNo);
				}
				state.nameStart = curIndex;
				state.inName = true;
			}
		}
		else if(state.lookingForValue) {
			if(!space.test(cur)) {
				state.lookingForValue = false;
				state.inValue = true;
				if(cur === "'" || cur === '"') {
					state.inQuote = cur;
					state.valueStart = curIndex+1;
				} else {
					state.valueStart = curIndex;
				}
				// if we are looking for a value
				// at the end of the loop we need callAttrEnd
			} else if (i === rest.length){
				callAttrEnd(state, curIndex, handler, rest, lineNo);
			}
		}
	}

	if(state.inName) {
		callAttrStart(state, curIndex+1, handler, rest, lineNo);
		callAttrEnd(state, curIndex+1, handler, rest, lineNo);
	} else if(state.lookingForEq || state.lookingForValue || state.inValue) {
		callAttrEnd(state, curIndex+1, handler, rest, lineNo);
	}
	magicMatch.lastIndex = 0;
};

HTMLParser.searchStartTag = function (html) {
	var closingIndex = html.indexOf('>');

	// The first closing bracket we find might be in an attribute value.
	// Move through the attributes by regexp.
	var attributeRange = attributeRegexp.exec(html.substring(1));
	var afterAttributeOffset = 1;
	// if the closing index is after the next attribute...
	while(attributeRange && closingIndex >= afterAttributeOffset + attributeRange.index) {

		// prepare to move to the attribute after this one by increasing the offset
		afterAttributeOffset += attributeRange.index + attributeRange[0].length;
		// if the closing index is before the new offset, then this closing index is inside
		//  an attribute value and should be ignored.  Find the *next* closing character.
		while(closingIndex < afterAttributeOffset) {
			closingIndex += html.substring(closingIndex + 1).indexOf('>') + 1;
		}

		// find the next attribute by starting from the new offset.
		attributeRange = attributeRegexp.exec(html.substring(afterAttributeOffset));
	}

	// if there is no closing bracket
	// <input class=
	// or if the tagName does not start with alphaNumer character
	// <_iaois>
	// it is not a startTag
	if(closingIndex === -1 || !(alphaRegex.test(html[1]))){
		return null;
	}

	var tagName, tagContent, match, rest = '', unary = '';
	var startTag = html.substring(0, closingIndex + 1);
	var isUnary = startTag[startTag.length-2] === '/';
	var spaceIndex = startTag.search(space);

	if(isUnary){
		unary = '/';
		tagContent = startTag.substring(1, startTag.length-2).trim();
	} else {
		tagContent = startTag.substring(1, startTag.length-1).trim();
	}

	if(spaceIndex === -1){
		tagName = tagContent;
	} else {
		//spaceIndex needs to shift one to the left
		spaceIndex--;
		tagName = tagContent.substring(0, spaceIndex);
		rest = tagContent.substring(spaceIndex);
	}

	match = [startTag, tagName, rest, unary];

	return {
		match: match,
		html: html.substring(startTag.length),
	};


};

var canViewParser = canNamespace.HTMLParser = HTMLParser;

var supportsNativeSymbols$1 = (function() {
	var symbolExists = typeof Symbol !== "undefined" && typeof Symbol.for === "function";

	if (!symbolExists) {
		return false;
	}

	var symbol = Symbol("a symbol for testing symbols");
	return typeof symbol === "symbol";
}());

var CanSymbol;
if(supportsNativeSymbols$1) {
	CanSymbol = Symbol;
} else {

	var symbolNum = 0;
	CanSymbol = function CanSymbolPolyfill(description){
		var symbolValue = "@@symbol"+(symbolNum++)+(description);

		var symbol = {}; // make it object type

		Object.defineProperties(symbol, {
			toString: {
				value: function(){
					return symbolValue;
				}
			}
		});

		return symbol;
	};

	var descriptionToSymbol = {};
	var symbolToDescription = {};

	/**
	 * @function can-symbol.for for
	 * @parent  can-symbol/methods
	 * @description  Get a symbol based on a known string identifier, or create it if it doesn't exist.
	 *
	 * @signature `canSymbol.for(String)`
	 *
	 * @param { String } description  The string value of the symbol
	 * @return { CanSymbol } The globally unique and consistent symbol with the given string value.
	 */
	CanSymbol.for = function(description){
		var symbol = descriptionToSymbol[description];
		if(!symbol) {
			symbol = descriptionToSymbol[description] = CanSymbol(description);
			symbolToDescription[symbol] = description;
		}
		return symbol;
	};
	/**
	 * @function can-symbol.keyFor keyFor
	 * @parent  can-symbol
	 * @description  Get the description for a symbol.
	 *
	 * @signature `canSymbol.keyFor(CanSymbol)`
	 *
	 * @param { String } description  The string value of the symbol
	 * @return { CanSymbol } The globally unique and consistent symbol with the given string value.
	 */
	CanSymbol.keyFor = function(symbol) {
		return symbolToDescription[symbol];
	};
	["hasInstance","isConcatSpreadable",
		"iterator","match","prototype","replace","search","species","split",
	"toPrimitive","toStringTag","unscopables"].forEach(function(name){
		CanSymbol[name] = CanSymbol("Symbol."+name);
	});
}

// Generate can. symbols.
[
	// ======= Type detection ==========
	"isMapLike",
	"isListLike",
	"isValueLike",
	"isFunctionLike",
	// ======= Shape detection =========
	"getOwnKeys",
	"getOwnKeyDescriptor",
	"proto",
	// optional
	"getOwnEnumerableKeys",
	"hasOwnKey",
	"hasKey",
	"size",
	"getName",
	"getIdentity",

	// shape manipulation
	"assignDeep",
	"updateDeep",

	// ======= GET / SET
	"getValue",
	"setValue",
	"getKeyValue",
	"setKeyValue",
	"updateValues",
	"addValue",
	"removeValues",
	// ======= Call =========
	"apply",
	"new",
	// ======= Observe =========
	"onValue",
	"offValue",
	"onKeyValue",
	"offKeyValue",
	"getKeyDependencies",
	"getValueDependencies",
	"keyHasDependencies",
	"valueHasDependencies",
	"onKeys",
	"onKeysAdded",
	"onKeysRemoved",
	"onPatches"
	].forEach(function(name){
	CanSymbol.for("can."+name);
});

var canSymbol = canNamespace.Symbol = CanSymbol;

var canObservationRecorder = createCommonjsModule(function (module) {



// Contains stack of observation records created by pushing with `.start`
// and popping with `.stop()`.
// The top of the stack is the "target" observation record - the record that calls
// to `ObservationRecorder.add` get added to.
var stack = [];

var addParentSymbol = canSymbol.for("can.addParent"),
	getValueSymbol = canSymbol.for("can.getValue");

var ObservationRecorder = {
	stack: stack,
	start: function(name) {
		var deps = {
			keyDependencies: new Map(),
			valueDependencies: new Set(),
			childDependencies: new Set(),

			// `traps` and `ignore` are here only for performance
			// reasons. They work with `ObservationRecorder.ignore` and `ObservationRecorder.trap`.
			traps: null,
			ignore: 0,
			name: name
		};

		stack.push(deps);

		return deps;
	},
	stop: function() {
		return stack.pop();
	},

	add: function(obj, event) {
		var top = stack[stack.length - 1];
		if (top && top.ignore === 0) {

			if (top.traps) {
				top.traps.push([obj, event]);
			} else {
				// Use `=== undefined` instead of `arguments.length` for performance.
				if (event === undefined) {
					top.valueDependencies.add(obj);
				} else {
					var eventSet = top.keyDependencies.get(obj);
					if (!eventSet) {
						eventSet = new Set();
						top.keyDependencies.set(obj, eventSet);
					}
					eventSet.add(event);
				}
			}
		}
	},

	addMany: function(observes) {
		var top = stack[stack.length - 1];
		if (top) {
			if (top.traps) {
				top.traps.push.apply(top.traps, observes);
			} else {
				for (var i = 0, len = observes.length; i < len; i++) {
					this.add(observes[i][0], observes[i][1]);
				}
			}
		}
	},
	created: function(obs) {
		var top = stack[stack.length - 1];
		if (top) {
			top.childDependencies.add(obs);
			if (obs[addParentSymbol]) {
				obs[addParentSymbol](top);
			}
		}
	},
	ignore: function(fn) {
		return function() {
			if (stack.length) {
				var top = stack[stack.length - 1];
				top.ignore++;
				var res = fn.apply(this, arguments);
				top.ignore--;
				return res;
			} else {
				return fn.apply(this, arguments);
			}
		};
	},
	peekValue: function(value) {
		if(!value || !value[getValueSymbol]) {
			return value;
		}
		if (stack.length) {
			var top = stack[stack.length - 1];
			top.ignore++;
			var res = value[getValueSymbol]();
			top.ignore--;
			return res;
		} else {
			return value[getValueSymbol]();
		}
	},
	isRecording: function() {
		var len = stack.length;
		var last = len && stack[len - 1];
		return last && (last.ignore === 0) && last;
	},
	// `can-observation` uses this to do diffs more easily.
	makeDependenciesRecord: function(name) {
		return {
			traps: null,
			keyDependencies: new Map(),
			valueDependencies: new Set(),
			//childDependencies: new Set(),
			ignore: 0,
			name: name
		};
	},
	// The following are legacy methods we should do away with.
	makeDependenciesRecorder: function() {
		return ObservationRecorder.makeDependenciesRecord();
	},
	// Traps should be replace by calling `.start()` and `.stop()`.
	// To do this, we'd need a method that accepts a dependency record.
	trap: function() {
		if (stack.length) {
			var top = stack[stack.length - 1];
			var oldTraps = top.traps;
			var traps = top.traps = [];
			return function() {
				top.traps = oldTraps;
				return traps;
			};
		} else {
			return function() {
				return [];
			};
		}
	},
	trapsCount: function() {
		if (stack.length) {
			var top = stack[stack.length - 1];
			return top.traps.length;
		} else {
			return 0;
		}
	}
};

if (canNamespace.ObservationRecorder) {
	throw new Error("You can't have two versions of can-observation-recorder, check your dependencies");
} else {
	module.exports = canNamespace.ObservationRecorder = ObservationRecorder;
}
});

var helpers$1 = {
	makeGetFirstSymbolValue: function(symbolNames){
		var symbols = symbolNames.map(function(name){
			return canSymbol.for(name);
		});
		var length = symbols.length;

		return function getFirstSymbol(obj){
			var index = -1;

			while (++index < length) {
				if(obj[symbols[index]] !== undefined) {
					return obj[symbols[index]];
				}
			}
		};
	},
	// The `in` check is from jQuery’s fix for an iOS 8 64-bit JIT object length bug:
	// https://github.com/jquery/jquery/pull/2185
	hasLength: function(list){
		var type = typeof list;
		if(type === "string" || Array.isArray(list)) {
			return true;
		}
		var length = list && (type !== 'boolean' && type !== 'number' && "length" in list) && list.length;

		// var length = "length" in obj && obj.length;
		return typeof list !== "function" &&
			( length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in list );
	}
};

var plainFunctionPrototypePropertyNames = Object.getOwnPropertyNames((function(){}).prototype);
var plainFunctionPrototypeProto = Object.getPrototypeOf( (function(){}).prototype );
/**
 * @function can-reflect.isConstructorLike isConstructorLike
 * @parent can-reflect/type
 *
 * @description Test if a value looks like a constructor function.
 *
 * @signature `isConstructorLike(func)`
 *
 * Return `true` if `func` is a function and has a non-empty prototype, or implements
 *  [can-symbol/symbols/new `@@@@can.new`]; `false` otherwise.
 *
 * ```js
 * canReflect.isConstructorLike(function() {}); // -> false
 *
 * function Construct() {}
 * Construct.prototype = { foo: "bar" };
 * canReflect.isConstructorLike(Construct); // -> true
 *
 * canReflect.isConstructorLike({}); // -> false
 * !!canReflect.isConstructorLike({ [canSymbol.for("can.new")]: function() {} }); // -> true
 * ```
 *
 * @param  {*}  func maybe a function
 * @return {Boolean} `true` if a constructor; `false` if otherwise.
 */
function isConstructorLike(func){
	/* jshint unused: false */
	// if you can new it ... it's a constructor
	var value = func[canSymbol.for("can.new")];
	if(value !== undefined) {
		return value;
	}

	if(typeof func !== "function") {
		return false;
	}
	// If there are any properties on the prototype that don't match
	// what is normally there, assume it's a constructor
	var prototype = func.prototype;
	if(!prototype) {
		return false;
	}
	// Check if the prototype's proto doesn't point to what it normally would.
	// If it does, it means someone is messing with proto chains
	if( plainFunctionPrototypeProto !== Object.getPrototypeOf( prototype ) ) {
		return true;
	}

	var propertyNames = Object.getOwnPropertyNames(prototype);
	if(propertyNames.length === plainFunctionPrototypePropertyNames.length) {
		for(var i = 0, len = propertyNames.length; i < len; i++) {
			if(propertyNames[i] !== plainFunctionPrototypePropertyNames[i]) {
				return true;
			}
		}
		return false;
	} else {
		return true;
	}
}

/**
 * @function can-reflect.isFunctionLike isFunctionLike
 * @parent can-reflect/type
 * @description Test if a value looks like a function.
 * @signature `isFunctionLike(obj)`
 *
 *  Return `true` if `func` is a function, or implements
 *  [can-symbol/symbols/new `@@@@can.new`] or [can-symbol/symbols/apply `@@@@can.apply`]; `false` otherwise.
 *
 * ```js
 * canReflect.isFunctionLike(function() {}); // -> true
 * canReflect.isFunctionLike({}); // -> false
 * canReflect.isFunctionLike({ [canSymbol.for("can.apply")]: function() {} }); // -> true
 * ```
 *
 * @param  {*}  obj maybe a function
 * @return {Boolean}
 */
var getNewOrApply = helpers$1.makeGetFirstSymbolValue(["can.new","can.apply"]);
function isFunctionLike(obj){
	var result,
		symbolValue = !!obj && obj[canSymbol.for("can.isFunctionLike")];

	if (symbolValue !== undefined) {
		return symbolValue;
	}

	result = getNewOrApply(obj);
	if(result !== undefined) {
		return !!result;
	}

	return typeof obj === "function";
}

/**
 * @function can-reflect.isPrimitive isPrimitive
 * @parent can-reflect/type
 * @description Test if a value is a JavaScript primitive.
 * @signature `isPrimitive(obj)`
 *
 * Return `true` if `obj` is not a function nor an object via `typeof`, or is null; `false` otherwise.
 *
 * ```js
 * canReflect.isPrimitive(null); // -> true
 * canReflect.isPrimitive({}); // -> false
 * canReflect.isPrimitive(undefined); // -> true
 * canReflect.isPrimitive(1); // -> true
 * canReflect.isPrimitive([]); // -> false
 * canReflect.isPrimitive(function() {}); // -> false
 * canReflect.isPrimitive("foo"); // -> true
 *
 * ```
 *
 * @param  {*}  obj maybe a primitive value
 * @return {Boolean}
 */
function isPrimitive(obj){
	var type = typeof obj;
	if(obj == null || (type !== "function" && type !== "object") ) {
		return true;
	}
	else {
		return false;
	}
}

var coreHasOwn = Object.prototype.hasOwnProperty;
var funcToString = Function.prototype.toString;
var objectCtorString = funcToString.call(Object);

function isPlainObject(obj) {
	// Must be an Object.
	// Because of IE, we also have to check the presence of the constructor property.
	// Make sure that DOM nodes and window objects don't pass through, as well
	if (!obj || typeof obj !== 'object' ) {
		return false;
	}
	var proto = Object.getPrototypeOf(obj);
	if(proto === Object.prototype || proto === null) {
		return true;
	}
	// partially inspired by lodash: https://github.com/lodash/lodash
	var Constructor = coreHasOwn.call(proto, 'constructor') && proto.constructor;
	return typeof Constructor === 'function' && Constructor instanceof Constructor &&
    	funcToString.call(Constructor) === objectCtorString;
}

/**
 * @function can-reflect.isBuiltIn isBuiltIn
 * @parent can-reflect/type
 * @description Test if a value is a JavaScript built-in type.
 * @signature `isBuiltIn(obj)`
 *
 * Return `true` if `obj` is some type of JavaScript native built-in; `false` otherwise.
 *
 * ```js
 * canReflect.isBuiltIn(null); // -> true
 * canReflect.isBuiltIn({}); // -> true
 * canReflect.isBuiltIn(1); // -> true
 * canReflect.isBuiltIn([]); // -> true
 * canReflect.isBuiltIn(function() {}); // -> true
 * canReflect.isBuiltIn("foo"); // -> true
 * canReflect.isBuiltIn(new Date()); // -> true
 * canReflect.isBuiltIn(/[foo].[bar]/); // -> true
 * canReflect.isBuiltIn(new DefineMap); // -> false
 *
 * ```
 *
 * Not supported in browsers that have implementations of Map/Set where
 * `toString` is not properly implemented to return `[object Map]`/`[object Set]`.
 *
 * @param  {*}  obj maybe a built-in value
 * @return {Boolean}
 */
function isBuiltIn(obj) {

	// If primitive, array, or POJO return true. Also check if
	// it is not a POJO but is some type like [object Date] or
	// [object Regex] and return true.
	if (isPrimitive(obj) ||
		Array.isArray(obj) ||
		isPlainObject(obj) ||
		(Object.prototype.toString.call(obj) !== '[object Object]' &&
			Object.prototype.toString.call(obj).indexOf('[object ') !== -1)) {
		return true;
	}
	else {
		return false;
	}
}

/**
 * @function can-reflect.isValueLike isValueLike
 * @parent can-reflect/type
 * @description Test if a value represents a single value (as opposed to several values).
 *
 * @signature `isValueLike(obj)`
 *
 * Return `true` if `obj` is a primitive or implements [can-symbol/symbols/getValue `@@can.getValue`],
 * `false` otherwise.
 *
 * ```js
 * canReflect.isValueLike(null); // -> true
 * canReflect.isValueLike({}); // -> false
 * canReflect.isValueLike(function() {}); // -> false
 * canReflect.isValueLike({ [canSymbol.for("can.isValueLike")]: true}); // -> true
 * canReflect.isValueLike({ [canSymbol.for("can.getValue")]: function() {} }); // -> true
 * canReflect.isValueLike(canCompute()); // -> true
 * canReflect.isValueLike(new DefineMap()); // -> false
 *
 * ```
 *
 * @param  {*}  obj maybe a primitive or an object that yields a value
 * @return {Boolean}
 */
function isValueLike(obj) {
	var symbolValue;
	if(isPrimitive(obj)) {
		return true;
	}
	symbolValue = obj[canSymbol.for("can.isValueLike")];
	if( typeof symbolValue !== "undefined") {
		return symbolValue;
	}
	var value = obj[canSymbol.for("can.getValue")];
	if(value !== undefined) {
		return !!value;
	}
}

/**
 * @function can-reflect.isMapLike isMapLike
 * @parent can-reflect/type
 *
 * @description Test if a value represents multiple values.
 *
 * @signature `isMapLike(obj)`
 *
 * Return `true` if `obj` is _not_ a primitive, does _not_ have a falsy value for
 * [can-symbol/symbols/isMapLike `@@@@can.isMapLike`], or alternately implements
 * [can-symbol/symbols/getKeyValue `@@@@can.getKeyValue`]; `false` otherwise.
 *
 * ```js
 * canReflect.isMapLike(null); // -> false
 * canReflect.isMapLike(1); // -> false
 * canReflect.isMapLike("foo"); // -> false
 * canReflect.isMapLike({}); // -> true
 * canReflect.isMapLike(function() {}); // -> true
 * canReflect.isMapLike([]); // -> false
 * canReflect.isMapLike({ [canSymbol.for("can.isMapLike")]: false }); // -> false
 * canReflect.isMapLike({ [canSymbol.for("can.getKeyValue")]: null }); // -> false
 * canReflect.isMapLike(canCompute()); // -> false
 * canReflect.isMapLike(new DefineMap()); // -> true
 *
 * ```
 *
 * @param  {*}  obj maybe a Map-like
 * @return {Boolean}
 */
function isMapLike(obj) {
	if(isPrimitive(obj)) {
		return false;
	}
	var isMapLike = obj[canSymbol.for("can.isMapLike")];
	if(typeof isMapLike !== "undefined") {
		return !!isMapLike;
	}
	var value = obj[canSymbol.for("can.getKeyValue")];
	if(value !== undefined) {
		return !!value;
	}
	// everything else in JS is MapLike
	return true;
}

/**
 * @function can-reflect.isObservableLike isObservableLike
 * @parent can-reflect/type
 * @description Test if a value (or its keys) can be observed for changes.
 *
 * @signature `isObservableLike(obj)`
 *
 * Return  `true` if `obj` is _not_ a primitive and implements any of
 * [can-symbol/symbols/onValue `@@@@can.onValue`], [can-symbol/symbols/onKeyValue `@@@@can.onKeyValue`], or
 * [can-symbol/symbols/onPatches `@@@@can.onKeys`]; `false` otherwise.
 *
 * ```js
 * canReflect.isObservableLike(null); // -> false
 * canReflect.isObservableLike({}); // -> false
 * canReflect.isObservableLike([]); // -> false
 * canReflect.isObservableLike(function() {}); // -> false
 * canReflect.isObservableLike({ [canSymbol.for("can.onValue")]: function() {} }); // -> true
 * canReflect.isObservableLike({ [canSymbol.for("can.onKeyValue")]: function() {} }); // -> true
 * canReflect.isObservableLike(canCompute())); // -> true
 * canReflect.isObservableLike(new DefineMap())); // -> true
 * ```
 *
 * @param  {*}  obj maybe an observable
 * @return {Boolean}
 */

// Specially optimized
var onValueSymbol$4 = canSymbol.for("can.onValue"),
	onKeyValueSymbol$2 = canSymbol.for("can.onKeyValue"),
	onPatchesSymbol$2 = canSymbol.for("can.onPatches");
function isObservableLike( obj ) {
	if(isPrimitive(obj)) {
		return false;
	}
	return Boolean(obj[onValueSymbol$4] || obj[onKeyValueSymbol$2] || obj[onPatchesSymbol$2]);
}

/**
 * @function can-reflect.isListLike isListLike
 * @parent can-reflect/type
 *
 * @description Test if a value looks like a constructor function.
 *
 * @signature `isListLike(list)`
 *
 * Return `true` if `list` is a `String`, <br>OR `list` is _not_ a primitive and implements `@@@@iterator`,
 * <br>OR `list` is _not_ a primitive and returns `true` for `Array.isArray()`, <br>OR `list` is _not_ a primitive and has a
 * numerical length and is either empty (`length === 0`) or has a last element at index `length - 1`; <br>`false` otherwise
 *
 * ```js
 * canReflect.isListLike(null); // -> false
 * canReflect.isListLike({}); // -> false
 * canReflect.isListLike([]); // -> true
 * canReflect.isListLike("foo"); // -> true
 * canReflect.isListLike(1); // -> false
 * canReflect.isListLike({ [canSymbol.for("can.isListLike")]: true }); // -> true
 * canReflect.isListLike({ [canSymbol.iterator]: function() {} }); // -> true
 * canReflect.isListLike({ length: 0 }); // -> true
 * canReflect.isListLike({ length: 3 }); // -> false
 * canReflect.isListLike({ length: 3, "2": true }); // -> true
 * canReflect.isListLike(new DefineMap()); // -> false
 * canReflect.isListLike(new DefineList()); // -> true
 * ```
 *
 * @param  {*}  list maybe a List-like
 * @return {Boolean}
 */
function isListLike( list ) {
	var symbolValue,
		type = typeof list;
	if(type === "string") {
		return true;
	}
	if( isPrimitive(list) ) {
		return false;
	}
	symbolValue = list[canSymbol.for("can.isListLike")];
	if( typeof symbolValue !== "undefined") {
		return symbolValue;
	}
	var value = list[canSymbol.iterator];
	if(value !== undefined) {
		return !!value;
	}
	if(Array.isArray(list)) {
		return true;
	}
	return helpers$1.hasLength(list);
}

/**
 * @function can-reflect.isSymbolLike isSymbolLike
 * @parent can-reflect/type
 *
 * @description Test if a value is a symbol or a [can-symbol].
 *
 * @signature `isSymbolLike(symbol)`
 *
 * Return `true` if `symbol` is a native Symbol, or evaluates to a String with a prefix
 * equal to that of CanJS's symbol polyfill; `false` otherwise.
 *
 * ```js
 * /* ES6 *\/ canReflect.isSymbolLike(Symbol.iterator); // -> true
 * canReflect.isSymbolLike(canSymbol.for("foo")); // -> true
 * canReflect.isSymbolLike("@@symbol.can.isSymbol"); // -> true (due to polyfill for non-ES6)
 * canReflect.isSymbolLike("foo"); // -> false
 * canReflect.isSymbolLike(null); // -> false
 * canReflect.isSymbolLike(1); // -> false
 * canReflect.isSymbolLike({}); // -> false
 * canReflect.isSymbolLike({ toString: function() { return "@@symbol.can.isSymbol"; } }); // -> true
 * ```
 *
 * @param  {*}  symbol maybe a symbol
 * @return {Boolean}
 */

var supportsNativeSymbols = (function() {
	var symbolExists = typeof Symbol !== "undefined" && typeof Symbol.for === "function";

	if (!symbolExists) {
		return false;
	}

	var symbol = Symbol("a symbol for testing symbols");
	return typeof symbol === "symbol";
}());

var isSymbolLike;
if(supportsNativeSymbols) {
	isSymbolLike = function(symbol) {
		return typeof symbol === "symbol";
	};
} else {
	var symbolStart = "@@symbol";
	isSymbolLike = function(symbol) {
		if(typeof symbol === "object" && !Array.isArray(symbol)){
			return symbol.toString().substr(0, symbolStart.length) === symbolStart;
		} else {
			return false;
		}
	};
}

var type = {
	isConstructorLike: isConstructorLike,
	isFunctionLike: isFunctionLike,
	isListLike: isListLike,
	isMapLike: isMapLike,
	isObservableLike: isObservableLike,
	isPrimitive: isPrimitive,
	isBuiltIn: isBuiltIn,
	isValueLike: isValueLike,
	isSymbolLike: isSymbolLike,
	/**
	 * @function can-reflect.isMoreListLikeThanMapLike isMoreListLikeThanMapLike
	 * @parent can-reflect/type
	 *
	 * @description Test if a value should be treated as a list instead of a map.
	 *
	 * @signature `isMoreListLikeThanMapLike(obj)`
	 *
	 * Return  `true` if `obj` is an Array, declares itself to be more ListLike with
	 * `@@@@can.isMoreListLikeThanMapLike`, or self-reports as ListLike but not as MapLike; `false` otherwise.
	 *
	 * ```js
	 * canReflect.isMoreListLikeThanMapLike([]); // -> true
	 * canReflect.isMoreListLikeThanMapLike(null); // -> false
	 * canReflect.isMoreListLikeThanMapLike({}); // -> false
	 * canReflect.isMoreListLikeThanMapLike(new DefineList()); // -> true
	 * canReflect.isMoreListLikeThanMapLike(new DefineMap()); // -> false
	 * canReflect.isMoreListLikeThanMapLike(function() {}); // -> false
	 * ```
	 *
	 * @param  {Object}  obj the object to test for ListLike against MapLike traits.
	 * @return {Boolean}
	 */
	isMoreListLikeThanMapLike: function(obj){
		if(Array.isArray(obj)) {
			return true;
		}
		if(obj instanceof Array) {
			return true;
		}
		if( obj == null ) {
			return false;
		}
		var value = obj[canSymbol.for("can.isMoreListLikeThanMapLike")];
		if(value !== undefined) {
			return value;
		}
		var isListLike = this.isListLike(obj),
			isMapLike = this.isMapLike(obj);
		if(isListLike && !isMapLike) {
			return true;
		} else if(!isListLike && isMapLike) {
			return false;
		}
	},
	/**
	 * @function can-reflect.isIteratorLike isIteratorLike
	 * @parent can-reflect/type
	 * @description Test if a value looks like an iterator.
	 * @signature `isIteratorLike(obj)`
	 *
	 * Return `true` if `obj` has a key `"next"` pointing to a zero-argument function; `false` otherwise
	 *
	 * ```js
	 * canReflect.isIteratorLike([][Symbol.iterator]()); // -> true
	 * canReflect.isIteratorLike(new DefineList()[canSymbol.iterator]()); // -> true
	 * canReflect.isIteratorLike(new DefineMap()[canSymbol.iterator]()); // -> true
	 * canReflect.isIteratorLike(null); // -> false
	 * canReflect.isIteratorLike({ next: function() {} }); // -> true
	 * canReflect.isIteratorLike({ next: function(foo) {} }); // -> false (iterator nexts do not take arguments)
	 * ```
	 *
	 * @param  {Object}  obj the object to test for Iterator traits
	 * @return {Boolean}
	 */
	isIteratorLike: function(obj){
		return obj &&
			typeof obj === "object" &&
			typeof obj.next === "function" &&
			obj.next.length === 0;
	},
	/**
	 * @function can-reflect.isPromise isPromise
	 * @parent can-reflect/type
	 * @description Test if a value is a promise.
	 *
	 * @signature `isPromise(obj)`
	 *
	 * Return `true` if `obj` is an instance of promise or `.toString` returns `"[object Promise]"`.
	 *
	 * ```js
	 * canReflect.isPromise(Promise.resolve()); // -> true
	 * ```
	 *
	 * @param  {*}  obj the object to test for Promise traits.
	 * @return {Boolean}
	 */
	isPromise: function(obj){
		return (obj instanceof Promise || (Object.prototype.toString.call(obj) === '[object Promise]'));
	},
	/**
	 * @function can-reflect.isPlainObject isPlainObject
	 * @parent can-reflect/type
	 * @description Test if a value is an object created with `{}` or `new Object()`.
	 *
	 * @signature `isPlainObject(obj)`
	 *
	 * Attempts to determine if an object is a plain object like those you would create using the curly braces syntax: `{}`. The following are not plain objects:
	 *
	 * 1. Objects with prototypes (created using the `new` keyword).
	 * 2. Booleans.
	 * 3. Numbers.
	 * 4. NaN.
	 *
	 * ```js
	 * var isPlainObject = require("can-reflect").isPlainObject;
	 *
	 * // Created with {}
	 * console.log(isPlainObject({})); // -> true
	 *
	 * // new Object
	 * console.log(isPlainObject(new Object())); // -> true
	 *
	 * // Custom object
	 * var Ctr = function(){};
	 * var obj = new Ctr();
	 *
	 * console.log(isPlainObject(obj)); // -> false
	 * ```
	 *
	 * @param  {Object}  obj the object to test.
	 * @return {Boolean}
	 */
	isPlainObject: isPlainObject
};

var call$1 = {
	/**
	 * @function {function(...), Object, ...} can-reflect/call.call call
	 * @parent can-reflect/call
	 * @description  Call a callable, with a context object and parameters
	 *
	 * @signature `call(func, context, ...rest)`
	 *
	 * Call the callable `func` as if it were a function, bound to `context` and with any additional parameters
	 * occurring after `context` set to the positional parameters.
	 *
	 * Note that `func` *must* either be natively callable, implement [can-symbol/symbols/apply @@@@can.apply],
	 * or have a callable `apply` property to work with `canReflect.call`
	 *
	 * ```js
	 * var compute = canCompute("foo");
	 *
	 * canReflect.call(compute, null, "bar");
	 * canReflect.call(compute, null); // -> "bar"
	 * ```
	 *
	 * @param  {function(...)} func the function to call with the supplied arguments
	 * @param  {Object} context the context object to set as `this` on the function call
	 * @param  {*} rest any arguments after `context` will be passed to the function call
	 * @return {*}  return types and values are determined by the call to `func`
	 */
	call: function(func, context){
		var args = [].slice.call(arguments, 2);
		var apply = func[canSymbol.for("can.apply")];
		if(apply) {
			return apply.call(func, context, args);
		} else {
			return func.apply(context, args);
		}
	},
	/**
	 * @function {function(...), Object, ...} can-reflect/call.apply apply
	 * @parent can-reflect/call
	 * @description  Call a callable, with a context object and a list of parameters
	 *
	 * @signature `apply(func, context, args)`
	 *
	 * Call the callable `func` as if it were a function, bound to `context` and with any additional parameters
	 * contained in the Array-like `args`
	 *
	 * Note that `func` *must* either be natively callable, implement [can-symbol/symbols/apply @@@@can.apply],
	 * or have a callable `apply` property to work with `canReflect.apply`
	 *
	 * ```js
	 * var compute = canCompute("foo");
	 *
	 * canReflect.apply(compute, null, ["bar"]);
	 * canReflect.apply(compute, null, []); // -> "bar"
	 * ```
	 *
	 * @param  {function(...)} func the function to call
	 * @param  {Object} context the context object to set as `this` on the function call
	 * @param  {*} args arguments to be passed to the function call
	 * @return {*}  return types and values are determined by the call to `func`
	 */
	apply: function(func, context, args){
		var apply = func[canSymbol.for("can.apply")];
		if(apply) {
			return apply.call(func, context, args);
		} else {
			return func.apply(context, args);
		}
	},
	/**
	 * @function {function(...), ...} can-reflect/call.new new
	 * @parent can-reflect/call
	 * @description  Construct a new instance of a callable constructor
	 *
	 * @signature `new(func, ...rest)`
	 *
	 * Call the callable `func` as if it were a function, bound to a new instance of `func`, and with any additional
	 * parameters occurring after `func` set to the positional parameters.
	 *
	 * Note that `func` *must* either implement [can-symbol/symbols/new @@@@can.new],
	 * or have a callable `apply` property *and* a prototype to work with `canReflect.new`
	 *
	 * ```js
	 * canReflect.new(DefineList, ["foo"]); // -> ["foo"]<DefineList>
	 * ```
	 *
	 * @param  {function(...)} func a constructor
	 * @param  {*} rest arguments to be passed to the constructor
	 * @return {Object}  if `func` returns an Object, that returned Object; otherwise a new instance of `func`
	 */
	"new": function(func){
		var args = [].slice.call(arguments, 1);
		var makeNew = func[canSymbol.for("can.new")];
		if(makeNew) {
			return makeNew.apply(func, args);
		} else {
			var context = Object.create(func.prototype);
			var ret = func.apply(context, args);
			if(type.isPrimitive(ret)) {
				return context;
			} else {
				return ret;
			}
		}
	}
};

var setKeyValueSymbol$1 = canSymbol.for("can.setKeyValue"),
	getKeyValueSymbol$2 = canSymbol.for("can.getKeyValue"),
	getValueSymbol$2 = canSymbol.for("can.getValue"),
	setValueSymbol$2 = canSymbol.for("can.setValue");

var reflections = {
	/**
	 * @function {Object, String, *} can-reflect.setKeyValue setKeyValue
	 * @parent can-reflect/get-set
	 * @description Set the value of a named property on a MapLike object.
	 *
	 * @signature `setKeyValue(obj, key, value)`
	 *
	 * Set the property on Map-like `obj`, identified by the String, Symbol or Object value `key`, to the value `value`.
	 * The default behavior can be overridden on `obj` by implementing [can-symbol/symbols/setKeyValue @@@@can.setKeyValue],
	 * otherwise native named property access is used for string keys, and `Object.defineProperty` is used to set symbols.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * canReflect.setKeyValue(foo, "bar", "quux");
	 * foo[bar]; // -> "quux"
	 * ```
	 * @param  {Object} obj   the object to set on
	 * @param  {String} key   the key for the property to set
	 * @param  {*} value      the value to set on the object
	 */
	setKeyValue: function(obj, key, value){
		if( type.isSymbolLike(key) ) {
			if(typeof key === "symbol") {
				obj[key] = value;
			} else {
				Object.defineProperty(obj, key, {
					enumerable: false,
					configurable: true,
					value: value,
					writable: true
				});
			}
			return;
		}
		var setKeyValue = obj[setKeyValueSymbol$1];
		if(setKeyValue !== undefined) {
			return setKeyValue.call(obj, key, value);
		} else {
			obj[key] = value;
		}
	},
	/**
	 * @function {Object, String} can-reflect.getKeyValue getKeyValue
	 * @parent can-reflect/get-set
	 * @description Get the value of a named property on a MapLike object.
	 *
	 * @signature `getKeyValue(obj, key)`
	 *
	 * Retrieve the property on Map-like `obj` identified by the String or Symbol value `key`.  The default behavior
	 * can be overridden on `obj` by implementing [can-symbol/symbols/getKeyValue @@@@can.getKeyValue],
	 * otherwise native named property access is used.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * canReflect.getKeyValue(foo, "bar"); // -> "baz"
	 * ```
	 *
	 * @param  {Object} obj   the object to get from
	 * @param  {String} key   the key of the property to get
	 */
	getKeyValue: function(obj, key) {
		var getKeyValue = obj[getKeyValueSymbol$2];
		if(getKeyValue) {
			return getKeyValue.call(obj, key);
		}
		return obj[key];
	},
	/**
	 * @function {Object, String} can-reflect.deleteKeyValue deleteKeyValue
	 * @parent can-reflect/get-set
	 * @description Delete a named property from a MapLike object.
	 *
	 * @signature `deleteKeyValue(obj, key)`
	 *
	 * Remove the property identified by the String or Symbol `key` from the Map-like object `obj`, if possible.
	 * Property definitions may interfere with deleting key values; the behavior on `obj` if `obj[key]` cannot
	 * be deleted is undefined.  The default use of the native `delete` keyword can be overridden by `obj` if it
	 * implements [can-symbol/symbols/deleteKeyValue @@@@can.deleteKeyValue].
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz" });
	 * var quux = new CanMap({ thud: "jeek" });
	 *
	 * canReflect.deleteKeyValue(foo, "bar");
	 * canReflect.deleteKeyValue(quux, "thud");
	 *
	 * "bar" in foo; // ->  true  -- DefineMaps use property defs which cannot be un-defined
	 * foo.bar // -> undefined    --  but set values to undefined when deleting
	 *
	 * "thud" in quux; // -> false
	 * quux.thud; // -> undefined
	 * ```
	 *
	 * @param  {Object} obj   the object to delete on
	 * @param  {String} key   the key for the property to delete
	 */
	deleteKeyValue: function(obj, key) {
		var deleteKeyValue = obj[canSymbol.for("can.deleteKeyValue")];
		if(deleteKeyValue) {
			return deleteKeyValue.call(obj, key);
		}
		delete obj[key];
	},
	/**
	 * @function {Object} can-reflect.getValue getValue
	 * @parent can-reflect/get-set
	 * @description Get the value of an object with a gettable value
	 *
	 * @signature `getValue(obj)`
	 *
	 * Return the value of the Value-like object `obj`.  Unless `obj` implements
	 * [can-symbol/symbols/getValue @@@@can.getValue], the result of `getValue` on
	 * `obj` will always be `obj`.  Observable Map-like objects may want to implement
	 * `@@@@can.getValue` to return non-observable or plain representations of themselves.
	 *
	 * ```js
	 * var compute = canCompute("foo");
	 * var primitive = "bar";
	 *
	 * canReflect.getValue(compute); // -> "foo"
	 * canReflect.getValue(primitive); // -> "bar"
	 * ```
	 *
	 * @param  {Object} obj   the object to get from
	 * @return {*} the value of the object via `@@can.getValue`, or the value itself.
	 */
	getValue: function(value){
		if(type.isPrimitive(value)) {
			return value;
		}
		var getValue = value[getValueSymbol$2];
		if(getValue) {
			return getValue.call(value);
		}
		return value;
	},
	/**
	 * @function {Object, *} can-reflect.setValue setValue
	 * @parent can-reflect/get-set
	 * @description Set the value of a mutable object.
	 *
	 * @signature `setValue(obj, value)`
	 *
	 * Set the value of a Value-like object `obj` to the value `value`.  `obj` *must* implement
	 * [can-symbol/symbols/setValue @@@@can.setValue] to be used with `canReflect.setValue`.
	 * Map-like objects may want to implement `@@@@can.setValue` to merge objects of properties
	 * into themselves.
	 *
	 * ```js
	 * var compute = canCompute("foo");
	 * var plain = {};
	 *
	 * canReflect.setValue(compute, "bar");
	 * compute(); // -> bar
	 *
	 * canReflect.setValue(plain, { quux: "thud" }); // throws "can-reflect.setValue - Can not set value."
	 * ```
	 *
	 * @param  {Object} obj   the object to set on
	 * @param  {*} value      the value to set for the object
	 */
	setValue: function(item, value){
		var setValue = item && item[setValueSymbol$2];
		if(setValue) {
			return setValue.call(item, value);
		} else {
			throw new Error("can-reflect.setValue - Can not set value.");
		}
	},

	splice: function(obj, index, removing, adding){
		var howMany;
		if(typeof removing !== "number") {
			var updateValues = obj[canSymbol.for("can.updateValues")];
			if(updateValues) {
				return updateValues.call(obj, index, removing, adding);
			}
			howMany = removing.length;
		} else {
			howMany = removing;
		}

		if(arguments.length <= 3){
			adding = [];
		}

		var splice = obj[canSymbol.for("can.splice")];
		if(splice) {
			return splice.call(obj, index, howMany, adding);
		}
		return [].splice.apply(obj, [index, howMany].concat(adding) );
	},
	addValues: function(obj, adding, index) {
		var add = obj[canSymbol.for("can.addValues")];
		if(add) {
			return add.call(obj, adding, index);
		}
		if(Array.isArray(obj) && index === undefined) {
			return obj.push.apply(obj, adding);
		}
		return reflections.splice(obj, index, [], adding);
	},
	removeValues: function(obj, removing, index) {
		var removeValues = obj[canSymbol.for("can.removeValues")];
		if(removeValues) {
			return removeValues.call(obj, removing, index);
		}
		if(Array.isArray(obj) && index === undefined) {
			removing.forEach(function(item){
				var index = obj.indexOf(item);
				if(index >=0) {
					obj.splice(index, 1);
				}
			});
			return;
		}
		return reflections.splice(obj, index, removing, []);
	}
};
/**
 * @function {Object, String} can-reflect.get get
 * @hide
 * @description an alias for [can-reflect.getKeyValue getKeyValue]
 */
reflections.get = reflections.getKeyValue;
/**
 * @function {Object, String} can-reflect.set set
 * @hide
 * @description an alias for [can-reflect.setKeyValue setKeyValue]
 */
reflections.set = reflections.setKeyValue;
/**
 * @function {Object, String} can-reflect.delete delete
 * @hide
 * @description an alias for [can-reflect.deleteKeyValue deleteKeyValue]
 */
reflections["delete"] = reflections.deleteKeyValue;

var getSet = reflections;

var slice$2 = [].slice;

function makeFallback(symbolName, fallbackName) {
	return function(obj, event, handler, queueName){
		var method = obj[canSymbol.for(symbolName)];
		if(method !== undefined) {
			return method.call(obj, event, handler, queueName);
		}
		return this[fallbackName].apply(this, arguments);
	};
}

function makeErrorIfMissing(symbolName, errorMessage){
	return function(obj){
		var method = obj[canSymbol.for(symbolName)];
		if(method !== undefined) {
			var args = slice$2.call(arguments, 1);
			return method.apply(obj, args);
		}
		throw new Error(errorMessage);
	};
}

var observe = {
	// KEY
	/**
	 * @function {Object, String, function(*, *), String} can-reflect/observe.onKeyValue onKeyValue
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, based on a key change
	 *
	 * @signature `onKeyValue(obj, key, handler, [queueName])`
	 *
	 * Register a handler on the Map-like object `obj` to trigger when the property key `key` changes.
	 * `obj` *must* implement [can-symbol/symbols/onKeyValue @@@@can.onKeyValue] to be compatible with
	 * can-reflect.onKeyValue.  The function passed as `handler` will receive the new value of the property
	 * as the first argument, and the previous value of the property as the second argument.
	 *
	 * ```js
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onKeyValue(obj, "foo", function(newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * });
	 *
	 * obj.foo = "baz";  // -> logs "foo is now baz , was bar"
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {String} key  the key to listen to
	 * @param {function(*, *)} handler a callback function that recieves the new value
	 * @param {String} [queueName]  the queue to dispatch events to
	 */
	onKeyValue: makeFallback("can.onKeyValue", "onEvent"),
	/**
	 * @function {Object, String, function(*), String} can-reflect/observe.offKeyValue offKeyValue
	 * @parent can-reflect/observe
	 * @description  Unregister an event handler on a MapLike object, based on a key change
	 *
	 * @signature `offKeyValue(obj, key, handler, [queueName])`
	 *
	 * Unregister a handler from the Map-like object `obj` that had previously been registered with
	 * [can-reflect/observe.onKeyValue onKeyValue]. The function passed as `handler` will no longer be called
	 * when the value of `key` on `obj` changes.
	 *
	 * ```js
	 * var obj = new DefineMap({ foo: "bar" });
	 * var handler = function(newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * };
	 *
	 * canReflect.onKeyValue(obj, "foo", handler);
	 * canReflect.offKeyValue(obj, "foo", handler);
	 *
	 * obj.foo = "baz";  // -> nothing is logged
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {String} key  the key to stop listening to
	 * @param {function(*)} handler the callback function that should be removed from the event handlers for `key`
	 * @param {String} [queueName]  the queue that the handler was set to receive events from
	 */
	offKeyValue: makeFallback("can.offKeyValue","offEvent"),

	/**
	 * @function {Object, function(Array)} can-reflect/observe.onKeys onKeys
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, triggered on the key set changing
	 *
	 * @signature `onKeys(obj, handler)`
	 *
	 * Register an event handler on the Map-like object `obj` to trigger when `obj`'s keyset changes.
	 * `obj` *must* implement [can-symbol/symbols/onKeys @@@@can.onKeys] to be compatible with
	 * can-reflect.onKeys.  The function passed as `handler` will receive an Array of object diffs (see
	 * [can-util/js/diff-object/diff-object diffObject] for the format) as its one argument.
	 *
	 * ```js
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onKeys(obj, function(diffs) {
	 * 	console.log(diffs);
	 * });
	 *
	 * obj.set("baz", "quux");  // -> logs '[{"property": "baz", "type": "add", "value": "quux"}]'
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {function(Array)} handler the callback function to receive the diffs in the key set
	 */
	// any key change (diff would normally happen)
	onKeys: makeErrorIfMissing("can.onKeys","can-reflect: can not observe an onKeys event"),
	/**
	 * @function {Object, function(Array)} can-reflect/observe.onKeysAdded onKeysAdded
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, triggered on new keys being added.
	 *
	 * @signature `onKeysAdded(obj, handler)`
	 *
	 * Register an event handler on the Map-like object `obj` to trigger when a new key or keys are set on
	 * `obj`. `obj` *must* implement [can-symbol/symbols/onKeysAdded @@@@can.onKeysAdded] to be compatible with
	 * can-reflect.onKeysAdded.  The function passed as `handler` will receive an Array of Strings as its one
	 * argument.
	 *
	 * ```js
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onKeysAded(obj, function(newKeys) {
	 * 	console.log(newKeys);
	 * });
	 *
	 * foo.set("baz", "quux");  // -> logs '["baz"]'
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {function(Array)} handler the callback function to receive the array of added keys
	 */
	// keys added at a certain point {key: 1}, index
	onKeysAdded: makeErrorIfMissing("can.onKeysAdded","can-reflect: can not observe an onKeysAdded event"),
	/**
	 * @function {Object, function(Array)} can-reflect/observe.onKeysRemoved onKeysRemoved
	 * @parent can-reflect/observe
	 * @description  Register an event handler on a MapLike object, triggered on keys being deleted.
	 *
	 * @signature `onKeysRemoved(obj, handler)`
	 *
	 * Register an event handler on the Map-like object `obj` to trigger when a key or keys are removed from
	 * `obj`'s keyset. `obj` *must* implement [can-symbol/symbols/onKeysRemoved @@@@can.onKeysRemoved] to be
	 * compatible with can-reflect.onKeysAdded.  The function passed as `handler` will receive an Array of
	 * Strings as its one argument.
	 *
	 * ```js
	 * var obj = new CanMap({ foo: "bar" });
	 * canReflect.onKeys(obj, function(diffs) {
	 * 	console.log(JSON.stringify(diffs));
	 * });
	 *
	 * foo.removeAttr("foo");  // -> logs '["foo"]'
	 * ```
	 *
	 * @param {Object} obj an observable MapLike that can listen to changes in named properties.
	 * @param {function(Array)} handler the callback function to receive the array of removed keys
	 */
	onKeysRemoved: makeErrorIfMissing("can.onKeysRemoved","can-reflect: can not unobserve an onKeysRemoved event"),

	/**
	 * @function {Object, String} can-reflect/observe.getKeyDependencies getKeyDependencies
	 * @parent can-reflect/observe
	 * @description  Return the observable objects that compute to the value of a named property on an object
	 *
	 * @signature `getKeyDependencies(obj, key)`
	 *
	 * Return the observable objects that provide input values to generate the computed value of the
	 * property `key` on Map-like object `obj`.  If `key` does not have dependencies on `obj`, returns `undefined`.
	 * Otherwise returns an object with up to two keys: `keyDependencies` is a [can-util/js/cid-map/cid-map CIDMap] that
	 * maps each Map-like object providing keyed values to an Array of the relevant keys; `valueDependencies` is a
	 * [can-util/js/cid-set/cid-set CIDSet] that contains all Value-like dependencies providing their own values.
	 *
	 * `obj` *must* implement [can-symbol/symbols/getKeyDependencies @@@@can.getKeyDependencies] to work with
	 * `canReflect.getKeyDependencies`.
	 *
	 *
	 * ```js
	 * var foo = new DefineMap({ "bar": "baz" })
	 * var obj = new (DefineMap.extend({
	 * 	 baz: {
	 * 	   get: function() {
	 * 	     return foo.bar;
	 * 	   }
	 * 	 }
	 * }))();
	 *
	 * canReflect.getKeyDependencies(obj, "baz");  // -> { valueDependencies: CIDSet }
	 * ```
	 *
	 * @param {Object} obj the object to check for key dependencies
	 * @param {String} key the key on the object to check
	 * @return {Object} the observable values that this keyed value depends on
	 */
	getKeyDependencies: makeErrorIfMissing("can.getKeyDependencies", "can-reflect: can not determine dependencies"),

	/**
	 * @function {Object, String} can-reflect/observe.getWhatIChange getWhatIChange
	 * @hide
	 * @parent can-reflect/observe
	 * @description Return the observable objects that derive their value from the
	 * obj, passed in.
	 *
	 * @signature `getWhatIChange(obj, key)`
	 *
	 * `obj` *must* implement `@@@@can.getWhatIChange` to work with
	 * `canReflect.getWhatIChange`.
	 *
	 * @param {Object} obj the object to check for what it changes
	 * @param {String} [key] the key on the object to check
	 * @return {Object} the observable values that derive their value from `obj`
	 */
	getWhatIChange: makeErrorIfMissing(
		"can.getWhatIChange",
		"can-reflect: can not determine dependencies"
	),

	/**
	 * @function {Function} can-reflect/observe.getChangesDependencyRecord getChangesDependencyRecord
	 * @hide
	 * @parent can-reflect/observe
	 * @description Return the observable objects that are mutated by the handler
	 * passed in as argument.
	 *
	 * @signature `getChangesDependencyRecord(handler)`
	 *
	 * `handler` *must* implement `@@@@can.getChangesDependencyRecord` to work with
	 * `canReflect.getChangesDependencyRecord`.
	 *
	 * ```js
	 * var one = new SimpleObservable("one");
	 * var two = new SimpleObservable("two");
	 *
	 * var handler = function() {
	 *	two.set("2");
	 * };
	 *
	 * canReflect.onValue(one, handler);
	 * canReflect.getChangesDependencyRecord(handler); // -> { valueDependencies: new Set([two]) }
	 * ```
	 *
	 * @param {Function} handler the event handler to check for what it changes
	 * @return {Object} the observable values that are mutated by the handler
	 */
	getChangesDependencyRecord: function getChangesDependencyRecord(handler) {
		var fn = handler[canSymbol.for("can.getChangesDependencyRecord")];

		if (typeof fn === "function") {
			return fn();
		}
	},

	/**
	 * @function {Object, String} can-reflect/observe.keyHasDependencies keyHasDependencies
	 * @parent can-reflect/observe
	 * @description  Determine whether the value for a named property on an object is bound to other events
	 *
	 * @signature `keyHasDependencies(obj, key)`
	 *
	 * Returns `true` if the computed value of the property `key` on Map-like object `obj` derives from other values.
	 * Returns `false` if `key` is computed on `obj` but does not have dependencies on other objects. If `key` is not
	 * a computed value on `obj`, returns `undefined`.
	 *
	 * `obj` *must* implement [can-symbol/symbols/keyHasDependencies @@@@can.keyHasDependencies] to work with
	 * `canReflect.keyHasDependencies`.
	 *
	 * ```js
	 * var foo = new DefineMap({ "bar": "baz" })
	 * var obj = new (DefineMap.extend({
	 * 	 baz: {
	 * 	   get: function() {
	 * 	     return foo.bar;
	 * 	   }
	 * 	 },
	 * 	 quux: {
	 * 	 	 get: function() {
	 * 	 	   return "thud";
	 * 	 	 }
	 * 	 }
	 * }))();
	 *
	 * canReflect.keyHasDependencies(obj, "baz");  // -> true
	 * canReflect.keyHasDependencies(obj, "quux");  // -> false
	 * canReflect.keyHasDependencies(foo, "bar");  // -> undefined
	 * ```
	 *
	 * @param {Object} obj the object to check for key dependencies
	 * @param {String} key the key on the object to check
	 * @return {Boolean} `true` if there are other objects that may update the keyed value; `false` otherwise
	 *
	 */
	// TODO: use getKeyDeps once we know what that needs to look like
	keyHasDependencies: makeErrorIfMissing("can.keyHasDependencies","can-reflect: can not determine if this has key dependencies"),

	// VALUE
	/**
	 * @function {Object, function(*)} can-reflect/observe.onValue onValue
	 * @parent can-reflect/observe
	 * @description  Register an event handler on an observable ValueLike object, based on a change in its value
	 *
	 * @signature `onValue(handler, [queueName])`
	 *
	 * Register an event handler on the Value-like object `obj` to trigger when its value changes.
	 * `obj` *must* implement [can-symbol/symbols/onValue @@@@can.onValue] to be compatible with
	 * can-reflect.onKeyValue.  The function passed as `handler` will receive the new value of `obj`
	 * as the first argument, and the previous value of `obj` as the second argument.
	 *
	 * ```js
	 * var obj = canCompute("foo");
	 * canReflect.onValue(obj, function(newVal, oldVal) {
	 * 	console.log("compute is now", newVal, ", was", oldVal);
	 * });
	 *
	 * obj("bar");  // -> logs "compute is now bar , was foo"
	 * ```
	 *
	 * @param {*} obj  any object implementing @@can.onValue
	 * @param {function(*, *)} handler  a callback function that receives the new and old values
	 */
	onValue: makeErrorIfMissing("can.onValue","can-reflect: can not observe value change"),
	/**
	 * @function {Object, function(*)} can-reflect/observe.offValue offValue
	 * @parent can-reflect/observe
	 * @description  Unregister an value change handler from an observable ValueLike object
	 *
	 * @signature `offValue(handler, [queueName])`
	 *
	 * Unregister an event handler from the Value-like object `obj` that had previously been registered with
	 * [can-reflect/observe.onValue onValue]. The function passed as `handler` will no longer be called
	 * when the value of `obj` changes.
	 *
	 * ```js
	 * var obj = canCompute( "foo" );
	 * var handler = function(newVal, oldVal) {
	 * 	console.log("compute is now", newVal, ", was", oldVal);
	 * };
	 *
	 * canReflect.onKeyValue(obj, handler);
	 * canReflect.offKeyValue(obj, handler);
	 *
	 * obj("baz");  // -> nothing is logged
	 * ```
	 *
	 * @param {*} obj
	 * @param {function(*)} handler
	 */
	offValue: makeErrorIfMissing("can.offValue","can-reflect: can not unobserve value change"),

	/**
	 * @function {Object} can-reflect/observe.getValueDependencies getValueDependencies
	 * @parent can-reflect/observe
	 * @description  Return all the events that bind to the value of an observable, Value-like object
	 *
	 * @signature `getValueDependencies(obj)`
	 *
	 * Return the observable objects that provide input values to generate the computed value of the
	 * Value-like object `obj`.  If `obj` does not have dependencies, returns `undefined`.
	 * Otherwise returns an object with up to two keys: `keyDependencies` is a [can-util/js/cid-map/cid-map CIDMap] that
	 * maps each Map-like object providing keyed values to an Array of the relevant keys; `valueDependencies` is a
	 * [can-util/js/cid-set/cid-set CIDSet] that contains all Value-like dependencies providing their own values.
	 *
	 * `obj` *must* implement [can-symbol/symbols/getValueDependencies @@@@can.getValueDependencies] to work with
	 * `canReflect.getValueDependencies`.
	 *
	 *
	 * ```js
	 * var foo = new DefineMap({ "bar": "baz" })
	 * var obj = canCompute(function() {
	 * 	 return foo.bar;
	 * });
	 *
	 * canReflect.getValueDependencies(obj);  // -> { valueDependencies: CIDSet } because `obj` is internally backed by
	 * a [can-observation]
	 * ```
	 *
	 * @param {Object} obj the object to check for value dependencies
	 * @return {Object} the observable objects that `obj`'s value depends on
	 *
	 */
	getValueDependencies: makeErrorIfMissing("can.getValueDependencies","can-reflect: can not determine dependencies"),

	/**
	 * @function {Object} can-reflect/observe.valueHasDependencies valueHasDependencies
	 * @parent can-reflect/observe
	 * @description  Determine whether the value of an observable object is bound to other events
	 *
	 * @signature `valueHasDependencies(obj)`
	 *
	 * Returns `true` if the computed value of the Value-like object `obj` derives from other values.
	 * Returns `false` if `obj` is computed but does not have dependencies on other objects. If `obj` is not
	 * a computed value, returns `undefined`.
	 *
	 * `obj` *must* implement [can-symbol/symbols/valueHasDependencies @@@@can.valueHasDependencies] to work with
	 * `canReflect.valueHasDependencies`.
	 *
	 * ```js
	 * var foo = canCompute( "bar" );
	 * var baz = canCompute(function() {
	 * 	 return foo();
	 * });
	 * var quux = "thud";
	 * var jeek = canCompute(function(plonk) {
	 * 	 if(argument.length) {
	 * 	 	  quux = plonk;
	 * 	 }
	 * 	 return quux;
	 * });
	 *
	 * canReflect.valueHasDependencies(baz);  // -> true
	 * canReflect.valueHasDependencies(jeek);  // -> false
	 * canReflect.valueHasDependencies(foo);  // -> undefined
	 * ```
	 *
	 * @param {Object} obj the object to check for dependencies
	 * @return {Boolean} `true` if there are other dependencies that may update the object's value; `false` otherwise
	 *
	 */
	valueHasDependencies: makeErrorIfMissing("can.valueHasDependencies","can-reflect: can not determine if value has dependencies"),

	// PATCHES
	/**
	 * @function {Object, function(*), String} can-reflect/observe.onPatches onPatches
	 * @parent can-reflect/observe
	 * @description  Register an handler on an observable that listens to any key changes
	 *
	 * @signature `onPatches(obj, handler, [queueName])`
	 *
	 * Register an event handler on the object `obj` that fires when anything changes on an object: a key value is added,
	 * an existing key has is value changed, or a key is deleted from the object.
	 *
	 * If object is an array-like and the changed property includes numeric indexes, patch sets will include array-specific
	 * patches in addition to object-style patches
	 *
	 * For more on the patch formats, see [can-util/js/diff-object/diff-object] and [can-util/js/diff-array/diff-array].
	 *
	 * ```js
	 * var obj = new DefineMap({});
	 * var handler = function(patches) {
	 * 	console.log(patches);
	 * };
	 *
	 * canReflect.onPatches(obj, handler);
	 * obj.set("foo", "bar");  // logs [{ type: "add", property: "foo", value: "bar" }]
	 * obj.set("foo", "baz");  // logs [{ type: "set", property: "foo", value: "baz" }]
	 *
	 * var arr = new DefineList([]);
	 * canReflect.onPatches(arr, handler);
	 * arr.push("foo");  // logs [{type: "add", property:"0", value: "foo"},
	 *                            {index: 0, deleteCount: 0, insert: ["foo"]}]
   * arr.pop();  // logs [{type: "remove", property:"0"},
	 *                            {index: 0, deleteCount: 1, insert: []}]
	 * ```
	 *
	 * @param {*} obj
	 * @param {function(*)} handler
	 * @param {String} [queueName] the name of a queue in [can-queues]; dispatches to `handler` will happen on this queue
	 */
	onPatches: makeErrorIfMissing("can.onPatches", "can-reflect: can not observe patches on object"),
	/**
	 * @function {Object, function(*), String} can-reflect/observe.offPatches offPatches
	 * @parent can-reflect/observe
	 * @description  Unregister an object patches handler from an observable object
	 *
	 * @signature `offPatches(obj, handler, [queueName])`
	 *
	 * Unregister an event handler from the object `obj` that had previously been registered with
	 * [can-reflect/observe.onPatches onPatches]. The function passed as `handler` will no longer be called
	 * when `obj` has key or index changes.
	 *
	 * ```js
	 * var obj = new DefineMap({});
	 * var handler = function(patches) {
	 * 	console.log(patches);
	 * };
	 *
	 * canReflect.onPatches(obj, handler);
	 * canReflect.offPatches(obj, handler);
	 *
	 * obj.set("foo", "bar");  // nothing is logged
	 * ```
	 *
	 * @param {*} obj
	 * @param {function(*)} handler
	 * @param {String} [queueName] the name of the queue in [can-queues] the handler was registered under
	 */
	offPatches: makeErrorIfMissing("can.offPatches", "can-reflect: can not unobserve patches on object"),

	/**
	 * @function {Object, function(*)} can-reflect/observe.onInstancePatches onInstancePatches
	 * @parent can-reflect/observe
	 *
	 * @description Registers a handler that listens to patch events on any instance
	 *
	 * @signature `onInstancePatches(Type, handler(instance, patches))`
	 *
	 * Listens to patch changes on any instance of `Type`. This is used by [can-connect]
	 * to know when a potentially `unbound` instance's `id` changes. If the `id` changes,
	 * the instance can be moved into the store while it is being saved. E.g:
	 *
	 * ```js
	 * canReflect.onInstancePatches(Map, function onInstancePatches(instance, patches) {
	 *	patches.forEach(function(patch) {
	 *		if (
	 *			(patch.type === "add" || patch.type === "set") &&
	 *			patch.key === connection.idProp &&
	 *			canReflect.isBound(instance)
	 *		) {
	 *			connection.addInstanceReference(instance);
	 *		}
	 *	});
	 *});
	 * ```
	 *
	 * @param {*} Type
	 * @param {function(*)} handler
	 */
	onInstancePatches: makeErrorIfMissing(
		"can.onInstancePatches",
		"can-reflect: can not observe onInstancePatches on Type"
	),

	/**
	 * @function {Object, function(*)} can-reflect/observe.offInstancePatches offInstancePatches
	 * @parent can-reflect/observe
	 *
	 * @description Unregisters a handler registered through [can-reflect/observe.onInstancePatches]
	 *
	 * @signature `offInstancePatches(Type, handler(instance, patches))`
	 *
	 * ```js
	 * canReflect.offInstancePatches(Map, onInstancePatches);
	 * ```
	 *
	 * @param {*} Type
	 * @param {function(*)} handler
	 */
	offInstancePatches: makeErrorIfMissing(
		"can.offInstancePatches",
		"can-reflect: can not unobserve onInstancePatches on Type"
	),

	// HAS BINDINGS VS DOES NOT HAVE BINDINGS
	/**
	 * @function {Object, function(*), String} can-reflect/observe.onInstanceBoundChange onInstanceBoundChange
	 * @parent can-reflect/observe
	 * @description Listen to when observables of a type are bound and unbound.
	 *
	 * @signature `onInstanceBoundChange(Type, handler, [queueName])`
	 *
	 * Register an event handler on the object `Type` that fires when instances of the type become bound (the first handler is added)
	 * or unbound (the last remaining handler is removed). The function passed as `handler` will be called
	 * with the `instance` as the first argument and `true` as the second argument when `instance` gains its first binding,
	 * and called with `false` when `instance` loses its
	 * last binding.
	 *
	 * ```js
	 * Person = DefineMap.extend({ ... });
	 *
	 * var person = Person({});
	 * var handler = function(instance, newVal) {
	 * 	console.log(instance, "bound state is now", newVal);
	 * };
	 * var keyHandler = function() {};
	 *
	 * canReflect.onInstanceBoundChange(Person, handler);
	 * canReflect.onKeyValue(obj, "name", keyHandler);  // logs person Bound state is now true
	 * canReflect.offKeyValue(obj, "name", keyHandler);  // logs person Bound state is now false
	 * ```
	 *
	 * @param {function} Type A constructor function
	 * @param {function(*,Boolean)} handler(instance,isBound) A function called with the `instance` whose bound status changed and the state of the bound status.
	 * @param {String} [queueName] the name of a queue in [can-queues]; dispatches to `handler` will happen on this queue
	 */
	onInstanceBoundChange: makeErrorIfMissing("can.onInstanceBoundChange", "can-reflect: can not observe bound state change in instances."),
	/**
	 * @function {Object, function(*), String} can-reflect/observe.offInstanceBoundChange offInstanceBoundChange
	 * @parent can-reflect/observe
	 * @description Stop listening to when observables of a type are bound and unbound.
	 *
	 * @signature `offInstanceBoundChange(Type, handler, [queueName])`
	 *
	 * Unregister an event handler from the type `Type` that had previously been registered with
	 * [can-reflect/observe.onInstanceBoundChange onInstanceBoundChange]. The function passed as `handler` will no longer be called
	 * when instances of `Type` gains its first or loses its last binding.
	 *
	 * ```js
	 * Person = DefineMap.extend({ ... });
	 *
	 * var person = Person({});
	 * var handler = function(instance, newVal) {
	 * 	console.log(instance, "bound state is now", newVal);
	 * };
	 * var keyHandler = function() {};
	 *
	 * canReflect.onInstanceBoundChange(Person, handler);
	 * canReflect.offInstanceBoundChange(Person, handler);
	 * canReflect.onKeyValue(obj, "name", keyHandler);  // nothing is logged
	 * canReflect.offKeyValue(obj, "name", keyHandler); // nothing is logged
	 * ```
	 *
	 * @param {function} Type A constructor function
	 * @param {function(*,Boolean)} handler(instance,isBound) The `handler` passed to `canReflect.onInstanceBoundChange`.
	 * @param {String} [queueName] the name of the queue in [can-queues] the handler was registered under
	 */
	offInstanceBoundChange: makeErrorIfMissing("can.offInstanceBoundChange", "can-reflect: can not unobserve bound state change"),
	/**
	 * @function {Object} can-reflect/observe.isBound isBound
	 * @parent can-reflect/observe
	 * @description  Determine whether any listeners are bound to the observable object
	 *
	 * @signature `isBound(obj)`
	 *
	 * `isBound` queries an observable object to find out whether any listeners have been set on it using
	 * [can-reflect/observe.onKeyValue onKeyValue] or [can-reflect/observe.onValue onValue]
	 *
	 * ```js
	 * var obj = new DefineMap({});
	 * var handler = function() {};
	 * canReflect.isBound(obj); // -> false
	 * canReflect.onKeyValue(obj, "foo", handler);
	 * canReflect.isBound(obj); // -> true
	 * canReflect.offKeyValue(obj, "foo", handler);
	 * canReflect.isBound(obj); // -> false
	 * ```
	 *
	 * @param {*} obj
	 * @return {Boolean} `true` if obj has at least one key-value or value listener, `false` otherwise
	 */
	isBound: makeErrorIfMissing("can.isBound", "can-reflect: cannot determine if object is bound"),

	// EVENT
	/**
	 * @function {Object, String, function(*)} can-reflect/observe.onEvent onEvent
	 * @parent can-reflect/observe
	 * @description  Register a named event handler on an observable object
	 *
	 * @signature `onEvent(obj, eventName, callback)`
	 *
	 *
	 * Register an event handler on the object `obj` to trigger when the event `eventName` is dispatched.
	 * `obj` *must* implement [can-symbol/symbols/onKeyValue @@@@can.onEvent] or `.addEventListener()` to be compatible
	 * with can-reflect.onKeyValue.  The function passed as `callback` will receive the event descriptor as the first
	 * argument, and any data passed to the event dispatch as subsequent arguments.
	 *
	 * ```js
	 * var obj = new DefineMap({ foo: "bar" });
	 * canReflect.onEvent(obj, "foo", function(ev, newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * });
	 *
	 * canEvent.dispatch.call(obj, "foo", ["baz", "quux"]);  // -> logs "foo is now baz , was quux"
	 * ```
	 *
	 * @param {Object} obj the object to bind a new event handler to
	 * @param {String} eventName the name of the event to bind the handler to
	 * @param {function(*)} callback  the handler function to bind to the event
	 */
	onEvent: function(obj, eventName, callback, queue){
		if(obj) {
			var onEvent = obj[canSymbol.for("can.onEvent")];
			if(onEvent !== undefined) {
				return onEvent.call(obj, eventName, callback, queue);
			} else if(obj.addEventListener) {
				obj.addEventListener(eventName, callback, queue);
			}
		}
	},
	/**
	 * @function {Object, String, function(*)} can-reflect/observe.offValue offEvent
	 * @parent can-reflect/observe
	 * @description  Unregister an event handler on a MapLike object, based on a key change
	 *
	 * @signature `offEvent(obj, eventName, callback)`
	 *
	 * Unregister an event handler from the object `obj` that had previously been registered with
	 * [can-reflect/observe.onEvent onEvent]. The function passed as `callback` will no longer be called
	 * when the event named `eventName` is dispatched on `obj`.
	 *
	 * ```js
	 * var obj = new DefineMap({ foo: "bar" });
	 * var handler = function(ev, newVal, oldVal) {
	 * 	console.log("foo is now", newVal, ", was", oldVal);
	 * };
	 *
	 * canReflect.onEvent(obj, "foo", handler);
	 * canReflect.offEvent(obj, "foo", handler);
	 *
	 * canEvent.dispatch.call(obj, "foo", ["baz", "quux"]);  // -> nothing is logged
	 * ```
	 *
	 * @param {Object} obj the object to unbind an event handler from
	 * @param {String} eventName the name of the event to unbind the handler from
	 * @param {function(*)} callback the handler function to unbind from the event
	 */
	offEvent: function(obj, eventName, callback, queue){
		if(obj) {
			var offEvent = obj[canSymbol.for("can.offEvent")];
			if(offEvent !== undefined) {
				return offEvent.call(obj, eventName, callback, queue);
			}  else if(obj.removeEventListener) {
				obj.removeEventListener(eventName, callback, queue);
			}
		}

	},
	/**
	 * @function {function} can-reflect/setPriority setPriority
	 * @parent can-reflect/observe
	 * @description  Provide a priority for when an observable that derives its
	 * value should be re-evaluated.
	 *
	 * @signature `setPriority(obj, priority)`
	 *
	 * Calls an underlying `@@can.setPriority` symbol on `obj` if it exists with `priorty`.
	 * Returns `true` if a priority was set, `false` if otherwise.
	 *
	 * Lower priorities (`0` being the lowest), will be an indication to run earlier than
	 * higher priorities.
	 *
	 * ```js
	 * var obj = canReflect.assignSymbols({},{
	 *   "can.setPriority": function(priority){
	 *     return this.priority = priority;
	 *   }
	 * });
	 *
	 * canReflect.setPriority(obj, 0) //-> true
	 * obj.priority //-> 0
	 *
	 * canReflect.setPriority({},20) //-> false
	 * ```
	 *
	 * @param {Object} obj An observable that will update its priority.
	 * @param {Number} priority The priority number.  Lower priorities (`0` being the lowest),
	 * indicate to run earlier than higher priorities.
	 * @return {Boolean} `true` if a priority was able to be set, `false` if otherwise.
	 *
	 * @body
	 *
	 * ## Use
	 *
	 * There's often a need to specify the order of re-evaluation for
	 * __observables__ that derive (or compute) their value from other observables.
	 *
	 * This is needed by templates to avoid unnecessary re-evaluation.  Say we had the following template:
	 *
	 * ```js
	 * {{#if value}}
	 *   {{value}}
	 * {{/if}}
	 * ```
	 *
	 * If `value` became falsey, we'd want the `{{#if}}` to be aware of it before
	 * the `{{value}}` magic tags updated. We can do that by setting priorities:
	 *
	 * ```js
	 * canReflect.setPriority(magicIfObservable, 0);
	 * canReflect.setPriority(magicValueObservable,1);
	 * ```
	 *
	 * Internally, those observables will use that `priority` to register their
	 * re-evaluation with the `derive` queue in [can-queues].
	 *
	 */
	setPriority: function(obj, priority) {
		if(obj) {
			var setPriority =  obj[canSymbol.for("can.setPriority")];
			if(setPriority !== undefined) {
				setPriority.call(obj, priority);
			 	return true;
			}
		}
		return false;
	},
	/**
	 * @function {function} can-reflect/getPriority getPriority
	 * @parent can-reflect/observe
	 * @description  Read the priority for an observable that derives its
	 * value.
	 *
	 * @signature `getPriority(obj)`
	 *
	 * Calls an underlying `@@can.getPriority` symbol on `obj` if it exists
	 * and returns its value. Read [can-reflect/setPriority] for more information.
	 *
	 *
	 *
	 * @param {Object} obj An observable.
	 * @return {Undefined|Number} Returns the priority number if
	 * available, undefined if this object does not support the `can.getPriority`
	 * symbol.
	 *
	 * @body
	 *
	 */
	getPriority: function(obj) {
		if(obj) {
			var getPriority =  obj[canSymbol.for("can.getPriority")];
			if(getPriority !== undefined) {
				return getPriority.call(obj);
			}
		}
		return undefined;
	}
};

// IE-remove-start
var getPrototypeOfWorksWithPrimitives = true;
try {
	Object.getPrototypeOf(1);
} catch(e) {
	getPrototypeOfWorksWithPrimitives = false;
}
// IE-remove-end

var ArrayMap;
if(typeof Map === "function") {
	ArrayMap = Map;
} else {
	// IE-remove-start
	var isEven = function isEven(num) {
		return num % 2 === 0;
	};

	// A simple map that stores items in an array.
	// like [key, value]
	// You can find the value by searching for the key and then +1.
	ArrayMap = function(){
		this.contents = [];
	};

	ArrayMap.prototype = {
		/**
		 * Get an index of a key. Because we store boths keys and values in
		 * a flat array, we ensure we are getting a key by checking that it is an
		 * even number index (all keys are even number indexed).
		 **/
		_getIndex: function(key) {
			var idx;
			do {
				idx = this.contents.indexOf(key, idx);
			} while(idx !== -1 && !isEven(idx));
			return idx;
		},
		has: function(key){
			return this._getIndex(key) !== -1;
		},
		get: function(key){
			var idx = this._getIndex(key);
			if(idx !== -1) {
				return this.contents[idx + 1];
			}
		},
		set: function(key, value){
			var idx = this._getIndex(key);
			if(idx !== -1) {
				// Key already exists, replace the value.
				this.contents[idx + 1] = value;
			} else {
				this.contents.push(key);
				this.contents.push(value);
			}
		},
		"delete": function(key){
			var idx = this._getIndex(key);
			if(idx !== -1) {
				// Key already exists, replace the value.
				this.contents.splice(idx, 2);
			}
		}
	};
	// IE-remove-end
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var shapeReflections;

var shiftFirstArgumentToThis = function(func){
	return function(){
		var args = [this];
		args.push.apply(args, arguments);
		return func.apply(null,args);
	};
};

var getKeyValueSymbol$1 = canSymbol.for("can.getKeyValue");
var shiftedGetKeyValue = shiftFirstArgumentToThis(getSet.getKeyValue);
var setKeyValueSymbol = canSymbol.for("can.setKeyValue");
var shiftedSetKeyValue = shiftFirstArgumentToThis(getSet.setKeyValue);

var sizeSymbol = canSymbol.for("can.size");

var hasUpdateSymbol = helpers$1.makeGetFirstSymbolValue(["can.updateDeep","can.assignDeep","can.setKeyValue"]);
var shouldUpdateOrAssign = function(obj){
	return type.isPlainObject(obj) || Array.isArray(obj) || !!hasUpdateSymbol(obj);
};

// is the value itself its serialized value
function isSerializedHelper(obj){
	if (type.isPrimitive(obj)) {
		return true;
	}
	if(hasUpdateSymbol(obj)) {
		return false;
	}
	return type.isBuiltIn(obj) && !type.isPlainObject(obj) && !Array.isArray(obj) && !type.isObservableLike(obj);
}

// IE11 doesn't support primitives
var Object_Keys;
try{
	Object.keys(1);
	Object_Keys = Object.keys;
} catch(e) {
	Object_Keys = function(obj){
		if(type.isPrimitive(obj)) {
			return [];
		} else {
			return Object.keys(obj);
		}
	};
}

function createSerializeMap(Type) {
	var MapType = Type || ArrayMap;
	return {
		unwrap: new MapType(),
		serialize: new MapType() ,
		isSerializing: {
			unwrap: new MapType(),
			serialize: new MapType()
		},
		circularReferenceIsSerializing: {
			unwrap: new MapType(),
			serialize: new MapType()
		}
	};
}

function makeSerializer(methodName, symbolsToCheck){
	// A local variable that is shared with all operations that occur withing a single
	// outer call to serialize()
	var serializeMap = null;

	// Holds the value of running serialize(), preserving the same map for all
	// internal instances.
	function SerializeOperation(MapType) {
		this.first = !serializeMap;

		if(this.first) {
			serializeMap = createSerializeMap(MapType);
		}

		this.map = serializeMap;
		this.result = null;
	}

	SerializeOperation.prototype.end = function(){
		// If this is the first, outer call, clean up the serializeMap.
		if(this.first) {
			serializeMap = null;
		}
		return this.result;
	};

	return function serializer(value, MapType){
		if (isSerializedHelper(value)) {
			return value;
		}

		var operation = new SerializeOperation(MapType);

		if(type.isValueLike(value)) {
			operation.result = this[methodName](getSet.getValue(value));

		} else {
			// Date, RegEx and other Built-ins are handled above
			// only want to do something if it's intended to be serialized
			// or do nothing for a POJO

			var isListLike = type.isIteratorLike(value) || type.isMoreListLikeThanMapLike(value);
			operation.result = isListLike ? [] : {};

			// handle maping to what is serialized
			if( operation.map[methodName].has(value) ) {
				// if we are in the process of serializing the first time, setup circular reference detection.
				if(operation.map.isSerializing[methodName].has(value)) {
					operation.map.circularReferenceIsSerializing[methodName].set(value, true);
				}
				return operation.map[methodName].get(value);
			} else {
				operation.map[methodName].set(value, operation.result);
			}

			for(var i = 0, len = symbolsToCheck.length ; i< len;i++) {
				var serializer = value[symbolsToCheck[i]];
				if(serializer) {
					// mark that we are serializing
					operation.map.isSerializing[methodName].set(value, true);
					var oldResult = operation.result;
					operation.result = serializer.call(value, oldResult);
					operation.map.isSerializing[methodName].delete(value);

					// if the result differs, but this was circular, blow up.
					if(operation.result !== oldResult) {
						// jshint -W073
						if(operation.map.circularReferenceIsSerializing[methodName].has(value)) {
							// Circular references should use a custom serializer
							// that sets the serialized value on the object
							// passed to it as the first argument e.g.
							// function(proto){
							//   return proto.a = canReflect.serialize(this.a);
							// }
							operation.end();
							throw new Error("Cannot serialize cirular reference!");
						}
						operation.map[methodName].set(value, operation.result);
					}
					return operation.end();
				}
			}

			if (typeof obj ==='function') {
				operation.map[methodName].set(value, value);

				operation.result = value;
			} else if( isListLike ) {
				this.eachIndex(value,function(childValue, index){
					operation.result[index] = this[methodName](childValue);
				},this);
			} else {
				this.eachKey(value,function(childValue, prop){
					operation.result[prop] = this[methodName](childValue);
				},this);
			}
		}

		return operation.end();
	};
}

// returns a Map type of the keys mapped to true
var makeMap;
if(typeof Map !== "undefined") {
	makeMap = function(keys) {
		var map = new Map();
		shapeReflections.eachIndex(keys, function(key){
			map.set(key, true);
		});
		return map;
	};
} else {
	makeMap = function(keys) {
		var map = {};
		keys.forEach(function(key){
			map[key] = true;
		});

		return {
			get: function(key){
				return map[key];
			},
			set: function(key, value) {
				map[key] = value;
			},
			keys: function(){
				return keys;
			}
		};
	};
}

// creates an optimized hasOwnKey lookup.
// If the object has hasOwnKey, then we just use that.
// Otherwise, try to put all keys in a map.
var fastHasOwnKey = function(obj){
	var hasOwnKey = obj[canSymbol.for("can.hasOwnKey")];
	if(hasOwnKey) {
		return hasOwnKey.bind(obj);
	} else {
		var map = makeMap( shapeReflections.getOwnEnumerableKeys(obj) );
		return function(key) {
			return map.get(key);
		};
	}
};


// combines patches if it makes sense
function addPatch(patches, patch) {
	var lastPatch = patches[patches.length -1];
	if(lastPatch) {
		// same number of deletes and counts as the index is back
		if(lastPatch.deleteCount === lastPatch.insert.length && (patch.index - lastPatch.index === lastPatch.deleteCount) ) {
			lastPatch.insert.push.apply(lastPatch.insert, patch.insert);
			lastPatch.deleteCount += patch.deleteCount;
			return;
		}
	}
	patches.push(patch);
}

function updateDeepList(target, source, isAssign) {
	var sourceArray = this.toArray(source); // jshint ignore:line

	var patches = [],
		lastIndex = -1;
	this.eachIndex(target, function(curVal, index){ // jshint ignore:line
		lastIndex = index;
		// If target has more items than the source.
		if(index >= sourceArray.length) {
			if(!isAssign) {
				// add a patch that removes the last items
				addPatch(patches, {index: index, deleteCount: target.length - index + 1, insert: []});
			}
			return false;
		}
		var newVal = sourceArray[index];
		if( type.isPrimitive(curVal) || type.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false ) {
			addPatch(patches, {index: index, deleteCount: 1, insert: [newVal]});
		} else {
			if(isAssign === true) {
				this.assignDeep(curVal, newVal);
			} else {
				this.updateDeep(curVal, newVal);
			}

		}
	}, this); // jshint ignore:line
	// add items at the end
	if(sourceArray.length > lastIndex) {
		addPatch(patches, {index: lastIndex+1, deleteCount: 0, insert: sourceArray.slice(lastIndex+1)});
	}
	for(var i = 0, patchLen = patches.length; i < patchLen; i++) {
		var patch = patches[i];
		getSet.splice(target, patch.index, patch.deleteCount, patch.insert);
	}
	return target;
}

shapeReflections = {
	/**
	 * @function {Object, function(*), [Object]} can-reflect.each each
	 * @parent can-reflect/shape
	 * @description  Iterate a List-like or Map-like, calling `callback` on each keyed or indexed property
	 *
	 * @signature `each(obj, callback, context)`
	 *
	 * If `obj` is a List-like or an Iterator-like, `each` functions as [can-reflect.eachIndex eachIndex],
	 * iterating over numeric indexes from 0 to `obj.length - 1` and calling `callback` with each property and
	 * index, optionally with `context` as `this` (defaulting to `obj`).  If not, `each` functions as
	 * [can-reflect.eachKey eachKey],
	 * iterating over every key on `obj` and calling `callback` on each one.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz" });
	 * var quux = new DefineList([ "thud", "jeek" ]);
	 *
	 * canReflect.each(foo, console.log, console); // -> logs 'baz bar {foo}'
	 * canReflect.each(quux, console.log, console); // -> logs 'thud 0 {quux}'; logs 'jeek 1 {quux}'
	 * ```
	 *
	 * @param  {Object}   obj     The object to iterate over
	 * @param  {Function(*, ValueLike)} callback a function that receives each item in the ListLike or MapLike
	 * @param  {[Object]}   context  an optional `this` context for calling the callback
	 * @return {Array} the result of calling [can-reflect.eachIndex `eachIndex`] if `obj` is a ListLike,
	 * or [can-reflect.eachKey `eachKey`] if a MapLike.
	 */
	each: function(obj, callback, context){

		// if something is more "list like" .. use eachIndex
		if(type.isIteratorLike(obj) || type.isMoreListLikeThanMapLike(obj) ) {
			return shapeReflections.eachIndex(obj,callback,context);
		} else {
			return shapeReflections.eachKey(obj,callback,context);
		}
	},

	/**
	 * @function {ListLike, function(*), [Object]} can-reflect.eachIndex eachIndex
	 * @parent can-reflect/shape
	 * @description  Iterate a ListLike calling `callback` on each numerically indexed element
	 *
	 * @signature `eachIndex(list, callback, context)`
	 *
	 * For each numeric index from 0 to `list.length - 1`, call `callback`, passing the current
	 * property value, the current index, and `list`, and optionally setting `this` as `context`
	 * if specified (otherwise use the current property value).
	 *
	 * ```js
	 * var foo = new DefineList([ "bar", "baz" ]);
	 *
	 * canReflect.eachIndex(foo, console.log, console); // -> logs 'bar 0 {foo}'; logs 'baz 1 {foo}'
	 * ```
	 *
	 * @param  {ListLike}   list     The list to iterate over
	 * @param  {Function(*, Number)} callback a function that receives each item
	 * @param  {[Object]}   context  an optional `this` context for calling the callback
	 * @return {ListLike}   the original list
	 */
	eachIndex: function(list, callback, context){
		// each index in something list-like. Uses iterator if it has it.
		if(Array.isArray(list)) {
			return shapeReflections.eachListLike(list, callback, context);
		} else {
			var iter, iterator = list[canSymbol.iterator];
			if(type.isIteratorLike(list)) {
				// we are looping through an iterator
				iter = list;
			} else if(iterator) {
				iter = iterator.call(list);
			}
			// fast-path arrays
			if(iter) {
				var res, index = 0;

				while(!(res = iter.next()).done) {
					if( callback.call(context || list, res.value, index++, list) === false ){
						break;
					}
				}
			} else {
				shapeReflections.eachListLike(list, callback, context);
			}
		}
		return list;
	},
	eachListLike: function(list, callback, context){
		var index = -1;
		var length = list.length;
		if( length === undefined ) {
			var size = list[sizeSymbol];
			if(size) {
				length = size.call(list);
			} else {
				throw new Error("can-reflect: unable to iterate.");
			}
		}

		while (++index < length) {
			var item = list[index];
			if (callback.call(context || item, item, index, list) === false) {
				break;
			}
		}

		return list;
	},
	/**
	 * @function can-reflect.toArray toArray
	 * @parent can-reflect/shape
	 * @description  convert the values of any MapLike or ListLike into an array
	 *
	 * @signature `toArray(obj)`
	 *
	 * Convert the values of any Map-like or List-like into a JavaScript Array.  If a Map-like,
	 * key data is discarded and only value data is preserved.
	 *
	 * ```js
	 * var foo = new DefineList(["bar", "baz"]);
	 * var quux = new DefineMap({ thud: "jeek" });
	 * ```
	 *
	 * canReflect.toArray(foo); // -> ["bar", "baz"]
	 * canReflect.toArray(quux): // -> ["jeek"]
	 *
	 * @param  {Object} obj Any object, whether MapLike or ListLike
	 * @return {Array}  an array of the values of `obj`
	 */
	toArray: function(obj){
		var arr = [];
		shapeReflections.each(obj, function(value){
			arr.push(value);
		});
		return arr;
	},
	/**
	 * @function can-reflect.eachKey eachKey
	 * @parent can-reflect/shape
	 * @description Iterate over a MapLike, calling `callback` on each enumerable property
	 *
	 * @signature `eachKey(obj, callback, context)`
	 *
	 * Iterate all own enumerable properties on Map-like `obj`
	 * (using [can-reflect/shape/getOwnEnumerableKeys canReflect.getOwnEnumerableKeys]), and call
	 * `callback` with the property value, the property key, and `obj`, and optionally setting
	 * `this` on the callback as `context` if provided, `obj` otherwise.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * canReflect.eachKey(foo, console.log, console); // logs 'baz bar {foo}'
	 * ```
	 *
	 * @param  {Object}   obj   The object to iterate over
	 * @param  {Function(*, String)} callback The callback to call on each enumerable property value
	 * @param  {[Object]}   context  an optional `this` context for calling `callback`
	 * @return {Array}    the enumerable keys of `obj` as an Array
	 */
	eachKey: function(obj, callback, context){
		// each key in something map like
		// eachOwnEnumerableKey
		if(obj) {
			var enumerableKeys = shapeReflections.getOwnEnumerableKeys(obj);

			// cache getKeyValue method if we can
			var getKeyValue = obj[getKeyValueSymbol$1] || shiftedGetKeyValue;

			return shapeReflections.eachIndex(enumerableKeys, function(key){
				var value = getKeyValue.call(obj, key);
				return callback.call(context || obj, value, key, obj);
			});
		}
		return obj;
	},
	/**
	 * @function can-reflect.hasOwnKey hasOwnKey
	 * @parent can-reflect/shape
	 * @description  Determine whether an object contains a key on itself, not only on its prototype chain
	 *
	 * @signature `hasOwnKey(obj, key)`
	 *
	 * Return `true` if an object's own properties include the property key `key`, `false` otherwise.
	 * An object may implement [can-symbol/symbols/hasOwnKey @@@@can.hasOwnKey] to override default behavior.
	 * By default, `canReflect.hasOwnKey` will first look for
	 * [can-symbol/symbols/getOwnKey @@@@can.getOwnKey] on `obj`. If present, it will call `@@@@can.getOwnKey` and
	 * test `key` against the returned Array of keys.  If absent, `Object.prototype.hasOwnKey()` is used.
	 *
	 * ```js
	 * var foo = new DefineMap({ "bar": "baz" });
	 *
	 * canReflect.hasOwnKey(foo, "bar"); // -> true
	 * canReflect.hasOwnKey(foo, "each"); // -> false
	 * foo.each // -> function each() {...}
	 * ```
	 *
	 * @param  {Object} obj Any MapLike object
	 * @param  {String} key The key to look up on `obj`
	 * @return {Boolean} `true` if `obj`'s key set contains `key`, `false` otherwise
	 */
	"hasOwnKey": function(obj, key){
		// if a key or index
		// like has own property
		var hasOwnKey = obj[canSymbol.for("can.hasOwnKey")];
		if(hasOwnKey) {
			return hasOwnKey.call(obj, key);
		}
		var getOwnKeys = obj[canSymbol.for("can.getOwnKeys")];
		if( getOwnKeys ) {
			var found = false;
			shapeReflections.eachIndex(getOwnKeys.call(obj), function(objKey){
				if(objKey === key) {
					found = true;
					return false;
				}
			});
			return found;
		}
		return hasOwnProperty.call(obj, key);
	},
	/**
	 * @function can-reflect.getOwnEnumerableKeys getOwnEnumerableKeys
	 * @parent can-reflect/shape
	 * @description Return the list of keys which can be iterated over on an object
	 *
	 * @signature `getOwnEnumerableKeys(obj)`
	 *
	 * Return all keys on `obj` which have been defined as enumerable, either from explicitly setting
	 * `enumerable` on the property descriptor, or by using `=` to set the value of the property without
	 * a key descriptor, but excluding properties that only exist on `obj`'s prototype chain.  The
	 * default behavior can be overridden by implementing
	 * [can-symbol/symbols/getOwnEnumerableKeys @@@@can.getOwnEnumerableKeys] on `obj`.  By default,
	 * `canReflect.getOwnEnumerableKeys` will use [can-symbol/symbols/getOwnKeys @@@@can.getOwnKeys] to
	 * retrieve the set of keys and [can-symbol/symbols/getOwnKeyDescriptor @@@@can.getOwnKeyDescriptor]
	 * to filter for those which are enumerable.  If either symbol is absent from `obj`, `Object.keys`
	 * is used.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz", [canSymbol.for("quux")]: "thud" });
	 * Object.defineProperty(foo, "jeek", {
	 *   enumerable: true,
	 *   value: "plonk"
	 * });
	 *
	 * canReflect.getOwnEnumerableKeys(foo); // -> ["bar", "jeek"]
	 * ```
	 *
	 * @param  {Object} obj Any Map-like object
	 * @return {Array} the Array of all enumerable keys from the object, either using
	 * [can-symbol/symbols/getOwnEnumerableKeys `@@@@can.getOwnEnumerableKeys`] from `obj`, or filtering
	 * `obj`'s own keys for those which are enumerable.
	 */
	getOwnEnumerableKeys: function(obj){
		// own enumerable keys (aliased as keys)
		var getOwnEnumerableKeys = obj[canSymbol.for("can.getOwnEnumerableKeys")];
		if(getOwnEnumerableKeys) {
			return getOwnEnumerableKeys.call(obj);
		}
		if( obj[canSymbol.for("can.getOwnKeys")] && obj[canSymbol.for("can.getOwnKeyDescriptor")] ) {
			var keys = [];
			shapeReflections.eachIndex(shapeReflections.getOwnKeys(obj), function(key){
				var descriptor =  shapeReflections.getOwnKeyDescriptor(obj, key);
				if(descriptor.enumerable) {
					keys.push(key);
				}
			}, this);

			return keys;
		} /*else if(obj[canSymbol.iterator]){
			var iter = obj[canSymbol.iterator](obj);
			var index = 0;
			var keys;
			return {
				next: function(){
					var res = iter.next();
					if(index++)
				}
			}
			while(!().done) {

				if( callback.call(context || list, res.value, index++, list) === false ){
					break;
				}
			}
		}*/ else {
			return Object_Keys(obj);
		}
	},
	/**
	 * @function can-reflect.getOwnKeys getOwnKeys
	 * @parent can-reflect/shape
	 * @description Return the list of keys on an object, whether or not they can be iterated over
	 *
	 * @signature `getOwnKeys(obj)`
	 *
	 * Return the Array of all String (not Symbol) keys from `obj`, whether they are enumerable or not.  If
	 * [can-symbol/symbols/getOwnKeys @@@@can.getOwnKeys] exists on `obj`, it is called to return
	 * the keys; otherwise, `Object.getOwnPropertyNames()` is used.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz", [canSymbol.for("quux")]: "thud" });
	 * Object.defineProperty(foo, "jeek", {
	 *   enumerable: false,
	 *   value: "plonk"
	 * });
	 *
	 * canReflect.getOwnKeys(foo); // -> ["bar", "jeek"]
	 * ```
	 *
	 * @param  {Object} obj Any MapLike object
	 * @return {Array} the Array of all String keys from the object.
	 */
	getOwnKeys: function(obj){
		// own enumerable&non-enumerable keys (Object.getOwnPropertyNames)
		var getOwnKeys = obj[canSymbol.for("can.getOwnKeys")];
		if(getOwnKeys) {
			return getOwnKeys.call(obj);
		} else {
			return Object.getOwnPropertyNames(obj);
		}
	},
	/**
	 * @function can-reflect.getOwnKeyDescriptor getOwnKeyDescriptor
	 * @parent can-reflect/shape
	 * @description Return a property descriptor for a named property on an object.
	 *
	 * @signature `getOwnKeyDescriptor(obj, key)`
	 *
	 *	Return the key descriptor for the property key `key` on the Map-like object `obj`. A key descriptor
	 *	is specified in ECMAScript 5 and contains keys for the property's `configurable` and `enumerable` states,
	 *	as well as either `value` and `writable` for value properties, or `get` and `set` for getter/setter properties.
	 *
	 * The default behavior can be overridden by implementing [can-symbol/symbols/getOwnKeyDescriptor @@@@can.getOwnKeyDescriptor]
	 * on `obj`; otherwise the default is to call `Object.getOwnKeyDescriptor()`.
	 *
	 * ```js
	 * var foo = new DefineMap({ bar: "baz" });
	 *
	 * getOwnKeyDescriptor(foo, "bar"); // -> {configurable: true, writable: true, enumerable: true, value: "baz"}
	 * ```
	 *
	 * @param  {Object} obj Any object with named properties
	 * @param  {String} key The property name to look up on `obj`
	 * @return {Object}   A key descriptor object
	 */
	getOwnKeyDescriptor: function(obj, key){
		var getOwnKeyDescriptor = obj[canSymbol.for("can.getOwnKeyDescriptor")];
		if(getOwnKeyDescriptor) {
			return getOwnKeyDescriptor.call(obj, key);
		} else {
			return Object.getOwnPropertyDescriptor(obj, key);
		}
	},
	/**
	 * @function can-reflect.unwrap unwrap
	 * @parent can-reflect/shape
	 * @description Unwraps a map-like or array-like value into an object or array.
	 *
	 *
	 * @signature `unwrap(obj)`
	 *
	 * Recursively unwraps a map-like or list-like object.
	 *
	 * ```js
	 * import canReflect from "can-reflect";
	 *
	 * var map = new DefineMap({foo: "bar"});
	 * canReflect.unwrap(map) //-> {foo: "bar"}
	 * ```
	 *
	 * `unwrap` is similar to [can-reflect.serialize] except it does not try to provide `JSON.stringify()`-safe
	 * objects.  For example, an object with a `Date` instance property value will not be expected to
	 * serialize the date instance:
	 *
	 * ```js
	 * var date = new Date();
	 * var map = new DefineMap({date: date});
	 * canReflect.unwrap(map) //-> {date: date}
	 * ```
	 *
	 * @param {Object} obj A map-like or array-like object.
	 * @return {Object} Returns objects and arrays.
	 */
	unwrap: makeSerializer("unwrap",[canSymbol.for("can.unwrap")]),
	/**
	 * @function can-reflect.serialize serialize
	 * @parent can-reflect/shape
	 * @description Serializes an object to a value that can be passed to JSON.stringify.
	 *
	 *
	 * @signature `serialize(obj)`
	 *
	 * Recursively serializes a map-like or list-like object.
	 *
	 * ```js
	 * import canReflect from "can-reflect";
	 * canReflect.serialize({foo: "bar"}) //-> {foo: "bar"}
	 * ```
	 *
	 * It does this by recursively:
	 *
	 *  - Checking if `obj` is a primitive, if it is, returns the value.
	 *  - If `obj` is an object:
	 *    - calling the `@can.serialize` property on the value if it exists.
	 *    - If the `@can.serialize` value doesn't exist, walks through every key-value
	 *      on `obj` and copy to a new object.
	 *
	 * @param {Object} obj A map-like or array-like object.
	 * @return {Object} Returns a plain object or array.
	 */
	serialize: makeSerializer("serialize",[canSymbol.for("can.serialize"), canSymbol.for("can.unwrap")]),

	assignMap: function(target, source) {
		// read each key and set it on target
		var hasOwnKey = fastHasOwnKey(target);
		var getKeyValue = target[getKeyValueSymbol$1] || shiftedGetKeyValue;
		var setKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;
		shapeReflections.eachKey(source,function(value, key){
			// if the target doesn't have this key or the keys are not the same
			if(!hasOwnKey(key) || getKeyValue.call(target, key) !==  value) {
				setKeyValue.call(target, key, value);
			}
		});
		return target;
	},
	assignList: function(target, source) {
		var inserting = shapeReflections.toArray(source);
		getSet.splice(target, 0, inserting, inserting );
		return target;
	},
	/**
	 * @function can-reflect.assign assign
	 * @parent can-reflect/shape
	 * @description Assign one objects values to another
	 *
	 * @signature `.assign(target, source)`
	 *
	 * Copies the values (and properties if map-like) from `source` onto `target`.
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {};
	 * var source = {key : "value"};
	 * var restult = canReflect.assign(target, source);
	 * result === target //-> true
	 * target //-> {key : "value"}
	 * ```
	 *
	 * For Arrays, enumerated values are copied over, but the length of the array will not be
	 * trunkated.  Use [can-reflect.update] for trunkating.
	 *
	 * ```js
	 * var target = ["a","b","c"];
	 * var source = ["A","B"];
	 * canReflect.assign(target, source);
	 * target //-> ["A","B","c"]
	 * ```
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	assign: function(target, source) {
		if(type.isIteratorLike(source) || type.isMoreListLikeThanMapLike(source) ) {
			// copy to array and add these keys in place
			shapeReflections.assignList(target, source);
		} else {
			shapeReflections.assignMap(target, source);
		}
		return target;
	},
	assignDeepMap: function(target, source) {

		var hasOwnKey = fastHasOwnKey(target);
		var getKeyValue = target[getKeyValueSymbol$1] || shiftedGetKeyValue;
		var setKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;

		shapeReflections.eachKey(source, function(newVal, key){
			if(!hasOwnKey(key)) {
				// set no matter what
				getSet.setKeyValue(target, key, newVal);
			} else {
				var curVal = getKeyValue.call(target, key);

				// if either was primitive, no recursive update possible
				if(newVal === curVal) ; else if(type.isPrimitive(curVal) || type.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false ) {
					setKeyValue.call(target, key, newVal);
				} else {
					shapeReflections.assignDeep(curVal, newVal);
				}
			}
		}, this);
		return target;
	},
	assignDeepList: function(target, source) {
		return updateDeepList.call(this, target, source, true);
	},
	/**
	 * @function can-reflect.assignDeep assignDeep
	 * @parent can-reflect/shape
	 * @description Assign one objects values to another, and performs the same action for all child values.
	 *
	 * @signature `.assignDeep(target, source)`
	 *
	 * Copies the values (and properties if map-like) from `source` onto `target` and repeates for all child
	 * values.
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {name: {first: "Justin"}};
	 * var source = {name: {last: "Meyer"}};
	 * var restult = canReflect.assignDeep(target, source);
	 * target //->  {name: {first: "Justin", last: "Meyer"}}
	 * ```
	 *
	 * An object can control the behavior of `assignDeep` using the [can-symbol/symbols/assignDeep] symbol.
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	assignDeep: function(target, source){
		var assignDeep = target[canSymbol.for("can.assignDeep")];
		if(assignDeep) {
			assignDeep.call(target, source);
		} else if( type.isMoreListLikeThanMapLike(source) ) {
			// list-like
			shapeReflections.assignDeepList(target, source);
		} else {
			// map-like
			shapeReflections.assignDeepMap(target, source);
		}
		return target;
	},
	updateMap: function(target, source) {
		var sourceKeyMap = makeMap( shapeReflections.getOwnEnumerableKeys(source) );

		var sourceGetKeyValue = source[getKeyValueSymbol$1] || shiftedGetKeyValue;
		var targetSetKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;

		shapeReflections.eachKey(target, function(curVal, key){
			if(!sourceKeyMap.get(key)) {
				getSet.deleteKeyValue(target, key);
				return;
			}
			sourceKeyMap.set(key, false);
			var newVal = sourceGetKeyValue.call(source, key);

			// if either was primitive, no recursive update possible
			if(newVal !== curVal) {
				targetSetKeyValue.call(target, key, newVal);
			}
		}, this);

		shapeReflections.eachIndex(sourceKeyMap.keys(), function(key){
			if(sourceKeyMap.get(key)) {
				targetSetKeyValue.call(target, key, sourceGetKeyValue.call(source, key) );
			}
		});

		return target;
	},
	updateList: function(target, source) {
		var inserting = shapeReflections.toArray(source);

		getSet.splice(target, 0, target, inserting );
		return target;
	},
	/**
	 * @function can-reflect.update update
	 * @parent can-reflect/shape
	 * @description Updates the values of an object match the values of an other object.
	 *
	 * @signature `.update(target, source)`
	 *
	 * Updates the values (and properties if map-like) of `target` to match the values of `source`.
	 * Properties of `target` that are not on `source` will be removed. This does
	 * not recursively update.  For that, use [can-reflect.updateDeep].
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {name: {first: "Justin"}, age: 34};
	 * var source = {name: {last: "Meyer"}};
	 * var result = canReflect.update(target, source);
	 * target //->  {name: {last: "Meyer"}}
	 * ```
	 *
	 * With Arrays all items of the source will be replaced with the new items.
	 *
	 * ```js
	 * var target = ["a","b","c"];
	 * var source = ["A","B"];
	 * canReflect.update(target, source);
	 * target //-> ["A","B"]
	 * ```
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	update: function(target, source) {
		if(type.isIteratorLike(source) || type.isMoreListLikeThanMapLike(source) ) {
			// copy to array and add these keys in place
			shapeReflections.updateList(target, source);
		} else {
			shapeReflections.updateMap(target, source);
		}
		return target;
	},
	updateDeepMap: function(target, source) {
		var sourceKeyMap = makeMap( shapeReflections.getOwnEnumerableKeys(source) );

		var sourceGetKeyValue = source[getKeyValueSymbol$1] || shiftedGetKeyValue;
		var targetSetKeyValue = target[setKeyValueSymbol] || shiftedSetKeyValue;

		shapeReflections.eachKey(target, function(curVal, key){

			if(!sourceKeyMap.get(key)) {
				getSet.deleteKeyValue(target, key);
				return;
			}
			sourceKeyMap.set(key, false);
			var newVal = sourceGetKeyValue.call(source, key);

			// if either was primitive, no recursive update possible
			if(type.isPrimitive(curVal) || type.isPrimitive(newVal) || shouldUpdateOrAssign(curVal) === false ) {
				targetSetKeyValue.call(target, key, newVal);
			} else {
				shapeReflections.updateDeep(curVal, newVal);
			}

		}, this);

		shapeReflections.eachIndex(sourceKeyMap.keys(), function(key){
			if(sourceKeyMap.get(key)) {
				targetSetKeyValue.call(target, key, sourceGetKeyValue.call(source, key) );
			}
		});
		return target;
	},
	updateDeepList: function(target, source) {
		return updateDeepList.call(this,target, source);
	},
	/**
	 * @function can-reflect.updateDeep updateDeep
	 * @parent can-reflect/shape
	 * @description Makes the values of an object match the values of an other object including all children values.
	 *
	 * @signature `.updateDeep(target, source)`
	 *
	 * Updates the values (and properties if map-like) of `target` to match the values of `source`.
	 * Removes properties from `target` that are not on `source`.
	 *
	 * For map-like objects, every enumerable property on `target` is copied:
	 *
	 * ```js
	 * var target = {name: {first: "Justin"}, age: 34};
	 * var source = {name: {last: "Meyer"}};
	 * var result = canReflect.updateDeep(target, source);
	 * target //->  {name: {last: "Meyer"}}
	 * ```
	 *
	 * An object can control the behavior of `updateDeep` using the [can-symbol/symbols/updateDeep] symbol.
	 *
	 * For list-like objects, a diff and patch strategy is used.  This attempts to limit the number of changes.
	 *
	 * @param  {Object} target The value that will be updated with `source`'s values.
	 * @param  {Object} source A source of values to copy to `target`.
	 * @return {Object} The target.
	 */
	updateDeep: function(target, source){
		var updateDeep = target[canSymbol.for("can.updateDeep")];
		if(updateDeep) {
			updateDeep.call(target, source);
		} else if( type.isMoreListLikeThanMapLike(source) ) {
			// list-like
			shapeReflections.updateDeepList(target, source);
		} else {
			// map-like
			shapeReflections.updateDeepMap(target, source);
		}
		return target;
	},
	// walks up the whole prototype chain
	/**
	 * @function can-reflect.hasKey hasKey
	 * @parent can-reflect/shape
	 * @description Determine whether an object contains a key on itself or its prototype chain
	 *
	 * @signature `hasKey(obj, key)`
	 *
	 * Return `true` if an object's properties include the property key `key` or an object on its prototype
	 * chain's properties include the key `key`, `false` otherwise.
	 * An object may implement [can-symbol/symbols/hasKey @@@@can.hasKey] to override default behavior.
	 * By default, `canReflect.hasKey` will use [can-reflect.hasOwnKey] and return true if the key is present.
	 * If `hasOwnKey` returns false, the [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in in Operator] will be used.
	 *
	 * ```js
	 * var foo = new DefineMap({ "bar": "baz" });
	 *
	 * canReflect.in(foo, "bar"); // -> true
	 * canReflect.in(foo, "each"); // -> true
	 * foo.each // -> function each() {...}
	 * ```
	 *
	 * @param  {Object} obj Any MapLike object
	 * @param  {String} key The key to look up on `obj`
	 * @return {Boolean} `true` if `obj`'s key set contains `key` or an object on its prototype chain's key set contains `key`, `false` otherwise
	 */
	hasKey: function(obj, key) {
		if( obj == null ) {
			return false;
		}
		if (type.isPrimitive(obj)) {
			if (hasOwnProperty.call(obj, key)) {
				return true;
			} else {
				var proto;
				if(getPrototypeOfWorksWithPrimitives) {
					proto = Object.getPrototypeOf(obj);
				} else {
					// IE-remove-start
					proto = obj.__proto__; // jshint ignore:line
					// IE-remove-end
				}
				if(proto !== undefined) {
					return key in proto;
				} else {
					// IE-remove-start
					return obj[key] !== undefined;
					// IE-remove-end
				}
			}
		}
		var hasKey = obj[canSymbol.for("can.hasKey")];
		if(hasKey) {
			return hasKey.call(obj, key);
		}

		var found = shapeReflections.hasOwnKey(obj, key);

		return found || key in obj;
	},
	getAllEnumerableKeys: function(){},
	getAllKeys: function(){},
	/**
	 * @function can-reflect.assignSymbols assignSymbols
	 * @parent can-reflect/shape
	 * @description Assign well known symbols and values to an object.
	 *
	 * @signature `.assignSymbols(target, source)`
	 *
	 * Converts each property name on the `source` object to a [can-symbol.for well known symbol]
	 * and uses that symbol to set the corresponding value on target.
	 *
	 * This is used to easily set symbols correctly even when symbol isn't natively supported.
	 *
	 * ```js
	 * canReflect.assignSymbols(Map.prototype, {
	 *   "can.getKeyValue": Map.prototype.get
	 * })
	 * ```
	 *
	 * If a `source` property name matches a symbol on `Symbol` (like `iterator` on `Symbol.iterator`),
	 * that symbol will be used:
	 *
	 * ```js
	 * canReflect.assignSymbols(ArrayLike.prototype, {
	 *   "iterator": function() { ... }
	 * })
	 * ArrayLike.prototype[Symbol.iterator] = function(){ ... }
	 * ```
	 *
	 * @param  {Object} target The value that will be updated with `source`'s symbols and values.
	 * @param  {Object<name,value>} source A source of symbol names and values to copy to `target`.
	 * @return {Object} The target.
	 */
	assignSymbols: function(target, source){
		shapeReflections.eachKey(source, function(value, key){
			var symbol = type.isSymbolLike(canSymbol[key]) ? canSymbol[key] : canSymbol.for(key);
			getSet.setKeyValue(target, symbol, value);
		});
		return target;
	},
	isSerialized: isSerializedHelper,
	/**
	 * @function can-reflect.size size
	 * @parent can-reflect/shape
	 * @description Return the number of items in the collection.
	 *
	 * @signature `.size(target)`
	 *
	 * Returns the number of items contained in `target`. Target can
	 * provide the size using the [can-symbol/symbols/size] symbol.
	 *
	 * If the `target` has a numeric `length` property that is greater than or equal to 0, that
	 * `length` will be returned.
	 *
	 * ```js
	 * canReflect.size([1,2,3]) //-> 3
	 * ```
	 *
	 * If the `target` is [can-reflect.isListLike], the values of the list will be counted.
	 *
	 * If the `target` is a plain JS object, the number of enumerable properties will be returned.
	 *
	 * ```js
	 * canReflect.size({foo:"bar"}) //-> 1
	 * ```
	 *
	 * If the `target` is anything else, `undefined` is returned.
	 *
	 * @param  {Object} target The container object.
	 * @return {Number} The number of values in the target.
	 */
	size: function(obj){
		if(obj == null) {
			return 0;
		}
		var size = obj[sizeSymbol];
		var count = 0;
		if(size) {
			return size.call(obj);
		}
		else if(helpers$1.hasLength(obj)){
			return obj.length;
		}
		else if(type.isListLike(obj)){

			shapeReflections.eachIndex(obj, function(){
				count++;
			});
			return count;
		}
		else if( obj ) {
			return shapeReflections.getOwnEnumerableKeys(obj).length;
		}
		else {
			return undefined;
		}
	},
	/**
	 * @function {Function, String|Symbol, Object} can-reflect.defineInstanceKey defineInstanceKey
	 * @parent can-reflect/shape
	 * @description Create a key for all instances of a constructor.
	 *
	 * @signature `defineInstanceKey(cls, key, properties)`
	 *
	 * Define the property `key` on the prototype of the constructor `cls` using the symbolic
	 * property [can-symbol/symbols/defineInstanceKey @@can.defineInstanceKey] if it exists; otherwise
	 * use `Object.defineProperty()` to define the property.  The property definition
	 *
	 * @param  {Function} cls  a Constructor function
	 * @param  {String} key     the String or Symbol key to set.
	 * @param  {Object} properties a JavaScript property descriptor
	 */
	defineInstanceKey: function(cls, key, properties) {
		var defineInstanceKey = cls[canSymbol.for("can.defineInstanceKey")];
		if(defineInstanceKey) {
			return defineInstanceKey.call(cls, key, properties);
		}
		var proto = cls.prototype;
		defineInstanceKey = proto[canSymbol.for("can.defineInstanceKey")];
		if(defineInstanceKey) {
			defineInstanceKey.call(proto, key, properties);
		} else {
			Object.defineProperty(
				proto,
				key,
				shapeReflections.assign({
					configurable: true,
					enumerable: !type.isSymbolLike(key),
					writable: true
				}, properties)
			);
		}
	}
};

shapeReflections.isSerializable = shapeReflections.isSerialized;
shapeReflections.keys = shapeReflections.getOwnEnumerableKeys;
var shape = shapeReflections;

var getSchemaSymbol = canSymbol.for("can.getSchema"),
    isMemberSymbol = canSymbol.for("can.isMember"),
    newSymbol = canSymbol.for("can.new");

function comparator(a, b) {
    return a.localeCompare(b);
}

function sort(obj) {
    if(type.isPrimitive(obj) || obj instanceof Date) {
        return obj;
    }
    var out;
    if (type.isListLike(obj)) {
        out = [];
        shape.eachKey(obj, function(item){
            out.push(sort(item));
        });
        return out;
    }
    if( type.isMapLike(obj) ) {

        out = {};

        shape.getOwnKeys(obj).sort(comparator).forEach(function (key) {
            out[key] = sort( getSet.getKeyValue(obj, key) );
        });

        return out;
    }


    return obj;
}

function isPrimitiveConverter(Type){
    return Type === Number || Type === String || Type === Boolean;
}

var schemaReflections =  {
    /**
	 * @function can-reflect.getSchema getSchema
	 * @parent can-reflect/shape
	 * @description Returns the schema for a type or value.
	 *
	 * @signature `getSchema(valueOrType)`
	 *
     * Calls the `@can.getSchema` property on the `valueOrType` argument. If it's not available and
     * `valueOrType` has a `constructor` property, calls the `constructor[@can.getSchema]`
     * and returns the result.
     *
     * ```js
     * import canReflect from "can-reflect";
     *
     * var Type = DefineMap.extend({
     *   name: "string",
     *   id: "number"
     * });
     *
     * canReflect.getSchema( Type ) //-> {
     * //   type: "map",
     * //   keys: {
     * //     name: MaybeString
     * //     id: MaybeNumber
     * //   }
     * // }
     * ```
	 *
	 *
	 * @param  {Object|Function} valueOrType A value, constructor function, or class to get the schema from.
	 * @return {Object} A schema. A schema for a [can-reflect.isMapLike] looks like:
     *
     *
     * ```js
     * {
     *   type: "map",
     *   identity: ["id"],
     *   keys: {
     *     id: Number,
     *     name: String,
     *     complete: Boolean,
     *     owner: User
     *   }
     * }
     * ```
     *
     * A schema for a list looks like:
     *
     * ```js
     * {
     *   type: "list",
     *   values: String
     *   keys: {
     *     count: Number
     *   }
     * }
     * ```
     *
	 */
    getSchema: function(type){
        if (type === undefined) {
            return undefined;
        }
        var getSchema = type[getSchemaSymbol];
        if(getSchema === undefined ) {
            type = type.constructor;
            getSchema = type && type[getSchemaSymbol];
        }
        return getSchema !== undefined ? getSchema.call(type) : undefined;
    },
    /**
	 * @function can-reflect.getIdentity getIdentity
	 * @parent can-reflect/shape
	 * @description Get a unique primitive representing an object.
	 *
	 * @signature `getIdentity( object [,schema] )`
	 *
	 * This uses the object's schema, or the provided schema to return a unique string or number that
     * represents the object.
     *
     * ```js
     * import canReflect from "can-reflect";
     *
     * canReflect.getIdentity({id: 5}, {identity: ["id"]}) //-> 5
     * ```
     *
     * If the schema has multiple identity keys, the identity keys and values
     * are return stringified (and sorted):
     *
     * ```js
     * canReflect.getIdentity(
     *   {z: "Z", a: "A", foo: "bar"},
     *   {identity: ["a","b"]}) //-> '{"a":"A","b":"B"}'
     * ```
	 *
	 * @param  {Object|Function} object A map-like object.
     * @param {Object} [schema] A schema object with an `identity` array of the unique
     * keys of the object like:
     *   ```js
     *   {identity: ["id"]}
     *   ```
	 * @return {Number|String} A value that uniquely represents the object.
	 */
    getIdentity: function(value, schema){
        schema = schema || schemaReflections.getSchema(value);
        if(schema === undefined) {
            throw new Error("can-reflect.getIdentity - Unable to find a schema for the given value.");
        }

        var identity = schema.identity;
        if(!identity || identity.length === 0) {
            throw new Error("can-reflect.getIdentity - Provided schema lacks an identity property.");
        } else if(identity.length === 1) {
            return getSet.getKeyValue(value, identity[0]);
        } else {
            var id = {};
            identity.forEach(function(key){
                id[key] = getSet.getKeyValue(value, key);
            });
            return JSON.stringify(schemaReflections.cloneKeySort(id));
        }
    },
    /**
	 * @function can-reflect.cloneKeySort cloneKeySort
	 * @parent can-reflect/shape
	 * @description Copy a value while sorting its keys.
	 *
	 * @signature `cloneKeySort(value)`
	 *
     * `cloneKeySort` returns a copy of `value` with its [can-reflect.isMapLike]
     * key values sorted. If you just want a copy of a value,
     * use [can-reflect.serialize].
     *
     * ```js
     * import canRefect from "can-reflect";
     *
     * canReflect.cloneKeySort({z: "Z", a: "A"}) //-> {a:"A",z:"Z"}
     * ```
     *
     * Nested objects are also sorted.
	 *
     * This is useful if you need to store a representation of an object that can be used as a
     * key.
	 *
	 * @param  {Object} value An object or array.
	 * @return {Object} A copy of the object with its keys sorted.
	 */
    cloneKeySort: function(obj) {
        return sort(obj);
    },
    /**
	 * @function can-reflect.convert convert
	 * @parent can-reflect/shape
	 * @description Convert one value to another type.
	 *
	 * @signature `convert(value, Type)`
	 *
     * `convert` attempts to convert `value` to the type specified by `Type`.
     *
     * ```js
     * import canRefect from "can-reflect";
     *
     * canReflect.convert("1", Number) //-> 1
     * ```
     *
     * `convert` works by performing the following logic:
     *
     * 1. If the `Type` is a primitive like `Number`, `String`, `Boolean`, the
     *    `value` will be passed to the `Type` function and the result returned.
     *    ```js
     *    return Type(value);
     *    ```
     * 2. The value will be checked if it is already an instance of the type
     *    by performing the following:
     *    1. If the `Type` has a `can.isMember` symbol value, that value will be used
     *       to determine if the `value` is already an instance.
     *    2. If the `Type` is a [can-reflect.isConstructorLike] function, `instanceof Type`
     *       will be used to check if `value` is already an instance.
     * 3. If `value` is already an instance, `value` will be returned.
     * 4. If `Type` has a `can.new` symbol, `value` will be passed to it and the result
     *    returned.
     * 5. If `Type` is a [can-reflect.isConstructorLike] function, `new Type(value)` will be
     *    called the the result returned.
     * 6. If `Type` is a regular function, `Type(value)` will be called and the result returned.
     * 7. If a value hasn't been returned, an error is thrown.
	 *
	 * @param  {Object|Primitive} value A value to be converted.
     * @param  {Object|Function} Type A constructor function or an object that implements the
     * necessary symbols.
	 * @return {Object} The `value` converted to a member of `Type`.
	 */
    convert: function(value, Type){
        if(isPrimitiveConverter(Type)) {
            return Type(value);
        }
        // check if value is already a member
        var isMemberTest = Type[isMemberSymbol],
            isMember = false,
            type$1 = typeof Type,
            createNew = Type[newSymbol];
        if(isMemberTest !== undefined) {
            isMember = isMemberTest.call(Type, value);
        } else if(type$1 === "function") {
            if(type.isConstructorLike(Type)) {
                isMember = (value instanceof Type);
            }
        }
        if(isMember) {
            return value;
        }
        if(createNew !== undefined) {
            return createNew.call(Type, value);
        } else if(type$1 === "function") {
            if(type.isConstructorLike(Type)) {
                return new Type(value);
            } else {
                // call it like a normal function
                return Type(value);
            }
        } else {
            throw new Error("can-reflect: Can not convert values into type. Type must provide `can.new` symbol.");
        }
    }
};
var schema = schemaReflections;

var getNameSymbol = canSymbol.for("can.getName");

/**
 * @function {Object, String} can-reflect.setName setName
 * @parent can-reflect/shape
 * @description Set a human-readable name of an object.
 *
 * @signature `setName(obj, value)`
 *
 * ```js
 * var f = function() {};
 *
 * canReflect.setName(f, "myFunction")
 * f.name //-> "myFunction"
 * ```
 *
 * @param {Object} obj   the object to set on
 * @param {String} value the value to set for the object
 */
function setName(obj, nameGetter) {
	if (typeof nameGetter !== "function") {
		var value = nameGetter;
		nameGetter = function() {
			return value;
		};
	}

	Object.defineProperty(obj, getNameSymbol, {
		value: nameGetter
	});
}

/**
 * @function {Object} can-reflect.getName getName
 * @parent can-reflect/shape
 * @description Get the name of an object.
 *
 * @signature `getValue(obj)`
 *
 * @body
 *
 * The [@@@can.getName](can-symbol/symbols/getName.html) symbol is used to
 * provide objects human readable names; the main goal of these names is to help
 * users get a glance of what the object does and what it is used for.
 *
 * There are no hard rules to define names but CanJS uses the following convention
 * for consistent names across its observable types:
 *
 * - The name starts with the observable constructor name
 * - The constructor name is decorated with the following characters based on its type:
 *		- `<>`: for [value-like](can-reflect.isValueLike.html) observables, e.g: `SimpleObservable<>`
 *		- `[]`: for [list-like](can-reflect.isListLike.html) observables, e.g: `DefineList[]`
 *		- `{}`: for [map-like](can-reflect.isMapLike.html) observables, e.g: `DefineMap{}`
 * - Any property that makes the instance unique (like ids) are printed inside
 *    the chars mentioned before.
 *
 * The example below shows how to implement [@@@can.getName](can-symbol/symbols/getName.html),
 * in a value-like observable (similar to [can-simple-observable]).
 *
 * ```js
 * var canReflect = require("can-reflect");
 *
 * function MySimpleObservable(value) {
 *		this.value = value;
 * }
 *
 * canReflect.assignSymbols(MySimpleObservable.prototype, {
 *		"can.getName": function() {
 *			//!steal-remove-start
 *			if ("production" !== 'production') {
 *				var value = JSON.stringify(this.value);
 *				return canReflect.getName(this.constructor) + "<" + value + ">";
 *			}
 *			//!steal-remove-end
 *		}
 * });
 * ```
 *
 * With that in place, `MySimpleObservable` can be used like this:
 *
 * ```js
 * var one = new MySimpleObservable(1);
 * canReflect.getName(one); // MySimpleObservable<1>
 * ```
 *
 * @param  {Object} obj The object to get from
 * @return {String} The human-readable name of the object
 */
var anonymousID = 0;
function getName(obj) {
	var type$1 = typeof obj;
	if(obj === null || (type$1 !== "object" && type$1 !== "function")) {
		return ""+obj;
	}
	var nameGetter = obj[getNameSymbol];
	if (nameGetter) {
		return nameGetter.call(obj);
	}

	if (type$1 === "function") {
		if (!("name" in obj)) {
			// IE doesn't support function.name natively
			obj.name = "functionIE" + anonymousID++;
		}
		return obj.name;
	}

	if (obj.constructor && obj !== obj.constructor) {
		var parent = getName(obj.constructor);
		if (parent) {
			if (type.isValueLike(obj)) {
				return parent + "<>";
			}

			if (type.isMoreListLikeThanMapLike(obj)) {
				return parent + "[]";
			}

			if (type.isMapLike(obj)) {
				return parent + "{}";
			}
		}
	}

	return undefined;
}

var getName_1 = {
	setName: setName,
	getName: getName
};

function keysPolyfill() {
  var keys = [];
  var currentIndex = 0;

  this.forEach(function(val, key) { // jshint ignore:line
    keys.push(key);
  });

  return {
    next: function() {
      return {
        value: keys[currentIndex],
        done: (currentIndex++ === keys.length)
      };
    }
  };
}

if (typeof Map !== "undefined") {
  shape.assignSymbols(Map.prototype, {
    "can.getOwnEnumerableKeys": Map.prototype.keys,
    "can.setKeyValue": Map.prototype.set,
    "can.getKeyValue": Map.prototype.get,
    "can.deleteKeyValue": Map.prototype["delete"],
    "can.hasOwnKey": Map.prototype.has
  });

  if (typeof Map.prototype.keys !== "function") {
    Map.prototype.keys = Map.prototype[canSymbol.for("can.getOwnEnumerableKeys")] = keysPolyfill;
  }
}

if (typeof WeakMap !== "undefined") {
  shape.assignSymbols(WeakMap.prototype, {
    "can.getOwnEnumerableKeys": function() {
      throw new Error("can-reflect: WeakMaps do not have enumerable keys.");
    },
    "can.setKeyValue": WeakMap.prototype.set,
    "can.getKeyValue": WeakMap.prototype.get,
    "can.deleteKeyValue": WeakMap.prototype["delete"],
    "can.hasOwnKey": WeakMap.prototype.has
  });
}

if (typeof Set !== "undefined") {
  shape.assignSymbols(Set.prototype, {
    "can.isMoreListLikeThanMapLike": true,
    "can.updateValues": function(index, removing, adding) {
      if (removing !== adding) {
        shape.each(
          removing,
          function(value) {
            this.delete(value);
          },
          this
        );
      }
      shape.each(
        adding,
        function(value) {
          this.add(value);
        },
        this
      );
    },
    "can.size": function() {
      return this.size;
    }
  });

  // IE11 doesn't support Set.prototype[@@iterator]
  if (typeof Set.prototype[canSymbol.iterator] !== "function") {
	  Set.prototype[canSymbol.iterator] = function() {
		  var arr = [];
		  var currentIndex = 0;

		  this.forEach(function(val) {
			  arr.push(val);
		  });

		  return {
			  next: function() {
				  return {
					  value: arr[currentIndex],
					  done: (currentIndex++ === arr.length)
				  };
			  }
		  };
	  };
  }
}
if (typeof WeakSet !== "undefined") {
  shape.assignSymbols(WeakSet.prototype, {
    "can.isListLike": true,
    "can.isMoreListLikeThanMapLike": true,
    "can.updateValues": function(index, removing, adding) {
      if (removing !== adding) {
        shape.each(
          removing,
          function(value) {
            this.delete(value);
          },
          this
        );
      }
      shape.each(
        adding,
        function(value) {
          this.add(value);
        },
        this
      );
    },
    "can.size": function() {
      throw new Error("can-reflect: WeakSets do not have enumerable keys.");
    }
  });
}

var reflect = {};
[
	call$1,
	getSet,
	observe,
	shape,
	type,
	getName_1,
	schema
].forEach(function(reflections){
	for(var prop in reflections) {
		reflect[prop] = reflections[prop];
		//!steal-remove-end
	}
});




var canReflect = canNamespace.Reflect = reflect;

function dispatch$1(key) {
	// jshint -W040
	var handlers = this.eventHandlers[key];
	if (handlers) {
		var handlersCopy = handlers.slice();
		var value = this.getKeyValue(key);
		for (var i = 0; i < handlersCopy.length; i++) {
			handlersCopy[i](value);
		}
	}
}

function Globals() {
	this.eventHandlers = {};
	this.properties = {};
}

/**
 * @function define 
 * @parent can-globals/methods
 * 
 * Create a new global environment variable.
 * 
 * @signature `globals.define(key, value[, cache])`
 * 
 * Defines a new global called `key`, who's value defaults to `value`.
 * 
 * The following example defines the `global` key's default value to the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object:
 * ```javascript
 * globals.define('global', window);
 * globals.getKeyValue('window') //-> window
 * ```
 * 
 * If a function is provided and `cache` is falsy, that function is run every time the key value is read:
 * ```javascript
 * globals.define('isBrowserWindow', function() {
 *   console.log('EVALUATING')
 *   return typeof window !== 'undefined' &&
 *     typeof document !== 'undefined' && typeof SimpleDOM === 'undefined'
 * }, false);
 * globals.get('isBrowserWindow') // logs 'EVALUATING'
 *                                // -> true
 * globals.get('isBrowserWindow') // logs 'EVALUATING' again
 *                                // -> true
 * ```
 * 
 * If a function is provided and `cache` is truthy, that function is run only the first time the value is read:
 * ```javascript
 * globals.define('isWebkit', function() {
 *   console.log('EVALUATING')
 *   var div = document.createElement('div')
 *   return 'WebkitTransition' in div.style
 * })
 * globals.getKeyValue('isWebkit') // logs 'EVALUATING'
 * 								   // -> true
 * globals.getKeyValue('isWebkit') // Does NOT log again!
 * 								   // -> true
 * ```
 * 
 * @param {String} key
 * The key value to create.
 * 
 * @param {*} value
 * The default value. If this is a function, its return value will be used.
 * 
 * @param {Boolean} [cache=true]
 * Enable cache. If false the `value` function is run every time the key value is read.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.define = function (key, value, enableCache) {
	if (enableCache === undefined) {
		enableCache = true;
	}
	if (!this.properties[key]) {
		this.properties[key] = {
			default: value,
			value: value,
			enableCache: enableCache
		};
	}
	return this;
};

/**
 * @function getKeyValue 
 * @parent can-globals/methods
 * 
 * Get a global environment variable by name.
 * 
 * @signature `globals.getKeyValue(key)`
 * 
 * Returns the current value at `key`. If no value has been set, it will return the default value (if it is not a function). If the default value is a function, it will return the output of the function. This execution is cached if the cache flag was set on initialization.
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.getKeyValue('foo'); //-> 'bar'
 * ```
 * 
 * @param {String} key
 * The key value to access.
 * 
 * @return {*}
 * Returns the value of a given key.
 */
Globals.prototype.getKeyValue = function (key) {
	var property = this.properties[key];
	if (property) {
		if (typeof property.value === 'function') {
			if (property.cachedValue) {
				return property.cachedValue;
			}
			if (property.enableCache) {
				property.cachedValue = property.value();
				return property.cachedValue;
			} else {
				return property.value();
			}
		}
		return property.value;
	}
};

Globals.prototype.makeExport = function (key) {
	return function (value) {
		if (arguments.length === 0) {
			return this.getKeyValue(key);
		}

		if (typeof value === 'undefined' || value === null) {
			this.deleteKeyValue(key);
		} else {
			if (typeof value === 'function') {
				this.setKeyValue(key, function () {
					return value;
				});
			} else {
				this.setKeyValue(key, value);
			}
			return value;
		}
	}.bind(this);
};

/**
 * @function offKeyValue 
 * @parent can-globals/methods
 * 
 * Remove handler from event queue.
 * 
 * @signature `globals.offKeyValue(key, handler)`
 * 
 * Removes `handler` from future change events for `key`.
 * 
 * 
 * ```javascript
 * var handler = (value) => {
 *   value === 'baz' //-> true
 * };
 * globals.define('foo', 'bar');
 * globals.onKeyValue('foo', handler);
 * globals.setKeyValue('foo', 'baz');
 * globals.offKeyValue('foo', handler);
 * ```
 * 
 * @param {String} key
 * The key value to observe.
 * 
 * @param {Function} handler([value])
 * The observer callback.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.offKeyValue = function (key, handler) {
	if (this.properties[key]) {
		var handlers = this.eventHandlers[key];
		if (handlers) {
			var i = handlers.indexOf(handler);
			handlers.splice(i, 1);
		}
	}
	return this;
};

/**
 * @function onKeyValue 
 * @parent can-globals/methods
 * 
 * Add handler to event queue.
 * 
 * @signature `globals.onKeyValue(key, handler)`
 * 
 * Calls `handler` each time the value of `key` is set or reset.
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.onKeyValue('foo', (value) => {
 *   value === 'baz' //-> true
 * });
 * globals.setKeyValue('foo', 'baz');
 * ```
 * 
 * @param {String} key
 * The key value to observe.
 * 
 * @param {function(*)} handler([value])
 * The observer callback.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.onKeyValue = function (key, handler) {
	if (this.properties[key]) {
		if (!this.eventHandlers[key]) {
			this.eventHandlers[key] = [];
		}
		this.eventHandlers[key].push(handler);
	}
	return this;
};

/**
 * @function deleteKeyValue 
 * @parent can-globals/methods
 * 
 * Reset global environment variable.
 * 
 * @signature `globals.deleteKeyValue(key)`
 * 
 * Deletes the current value at `key`. Future `get`s will use the default value.
 * 
 * ```javascript
 * globals.define('global', window);
 * globals.setKeyValue('global', {});
 * globals.deleteKeyValue('global');
 * globals.getKeyValue('global') === window; //-> true
 * ```
 * 
 * @param {String} key
 * The key value to access.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.deleteKeyValue = function (key) {
	var property = this.properties[key];
	if (property !== undefined) {
		property.value = property.default;
		property.cachedValue = undefined;
		dispatch$1.call(this, key);
	}
	return this;
};

/**
 * @function setKeyValue 
 * @parent can-globals/methods
 * 
 * Overwrite an existing global environment variable.
 * 
 * @signature `globals.setKeyValue(key, value)`
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.setKeyValue('foo', 'baz');
 * globals.getKeyValue('foo'); //-> 'baz'
 * ```
 * 
 * Sets the new value at `key`. Will override previously set values, but preserves the default (see `deleteKeyValue`).
 * 
 * Setting a key which was not previously defined will call `define` with the key and value.
 * 
 * @param {String} key
 * The key value to access.
 * 
 * @param {*} value
 * The new value.
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.setKeyValue = function (key, value) {
	if (!this.properties[key]) {
		return this.define(key, value);
	}
	var property = this.properties[key];
	property.value = value;
	property.cachedValue = undefined;
	dispatch$1.call(this, key);
	return this;
};

/**
 * @function reset 
 * @parent can-globals/methods
 * 
 * Reset all keys to their default value and clear their caches.
 * 
 * @signature `globals.setKeyValue(key, value)`
 * 
 * ```javascript
 * globals.define('foo', 'bar');
 * globals.setKeyValue('foo', 'baz');
 * globals.getKeyValue('foo'); //-> 'baz'
 * globals.reset();
 * globals.getKeyValue('foo'); //-> 'bar'
 * ```
 * 
 * @return {can-globals}
 * Returns the instance of `can-globals` for chaining.
 */
Globals.prototype.reset = function () {
	for (var key in this.properties) {
		if (this.properties.hasOwnProperty(key)) {
			this.properties[key].value = this.properties[key].default;
			this.properties[key].cachedValue = undefined;
			dispatch$1.call(this, key);
		}
	}
	return this;
};

canReflect.assignSymbols(Globals.prototype, {
	'can.getKeyValue': Globals.prototype.getKeyValue,
	'can.setKeyValue': Globals.prototype.setKeyValue,
	'can.deleteKeyValue': Globals.prototype.deleteKeyValue,
	'can.onKeyValue': Globals.prototype.onKeyValue,
	'can.offKeyValue': Globals.prototype.offKeyValue
});

var canGlobalsProto = Globals;

var canGlobalsInstance = createCommonjsModule(function (module) {


var globals = new canGlobalsProto();

if (canNamespace.globals) {
	throw new Error("You can't have two versions of can-globals, check your dependencies");
} else {
	module.exports = canNamespace.globals = globals;
}
});

/* global self */
/* global WorkerGlobalScope */



/**
 * @module {function} can-globals/global/global global
 * @parent can-globals/modules
 * 
 * Get the global object for the current context.
 * 
 * @signature `GLOBAL([newGlobal])`
 *
 * Optionally sets, and returns the global that this environment provides. It will be one of:
 * 
 * ```js
 * var GLOBAL = require('can-globals/global/global');
 * var g = GLOBAL();
 * // In a browser
 * console.log(g === window); // -> true
 * ```
 *
 * - **Browser**: [`window`](https://developer.mozilla.org/en-US/docs/Web/API/window)
 * - **Web Worker**: [`self`](https://developer.mozilla.org/en-US/docs/Web/API/Window/self)
 * - **Node.js**: [`global`](https://nodejs.org/api/globals.html#globals_global)
 * 
 * @param {Object} [newGlobal] An optional global-like object to set as the context's global 
 *
 * @return {Object} The global object for this JavaScript environment.
 */
canGlobalsInstance.define('global', function(){
	// Web Worker
	return (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) ? self :

		// Node.js
		typeof process === 'object' &&
		{}.toString.call(process) === '[object process]' ? commonjsGlobal :

		// Browser window
		window;
});

var global_1 = canGlobalsInstance.makeExport('global');

/**
 * @module {function} can-globals/document/document document
 * @parent can-globals/modules
 * 
 * Get the global [`document`](https://developer.mozilla.org/en-US/docs/Web/API/document) object for the current context.
 * 
 * @signature `DOCUMENT([newDocument])`
 * 
 * Optionally sets, and returns, the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/document) object for the context.
 * 
 * ```js
 * var documentShim = { getElementById() {...} };
 * var DOCUMENT = require('can-globals/document/document');
 * DOCUMENT(documentShim); //-> document
 * DOCUMENT().getElementById('foo');
 * ```
 *
 * @param {Object} [newDocument] An optional document-like object to set as the context's document 
 * 
 * @return {Object} The window object for this JavaScript environment.
 */
canGlobalsInstance.define('document', function(){
	return canGlobalsInstance.getKeyValue('global').document;
});

var document$1 = canGlobalsInstance.makeExport('document');

/**
 * @module {function} can-globals/location/location location
 * @parent can-globals/modules
 * 
 * Get the global [`location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) object for the current context.
 * 
 * @signature `LOCATION([newLocation])`
 * 
 * Optionally sets, and returns, the [`location`](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) object for the context.
 * 
 * ```js
 * var locationShim = { path: '/' };
 * var LOCATION = require('can-globals/location/location');
 * LOCATION(locationShim);
 * LOCATION().path; // -> '/'
 * ```
 *
 * @param {Object} location An optional location-like object to set as the context's location
 *
 * @return {Object} The location object for this JavaScript environment.
 */
canGlobalsInstance.define('location', function(){
	return canGlobalsInstance.getKeyValue('global').location;
});

canGlobalsInstance.makeExport('location');

/**
 * @module {function} can-globals/mutation-observer/mutation-observer mutation-observer
 * @parent can-globals/modules
 * 
 * Get the global [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) object for the current context.
 * 
 * @signature `MUTATIONOBSERVER([newMutationObserver])`
 * 
 * Optionally sets, and returns, the [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) object for the context.
 * 
 * ```js
 * var mutationObserverShim = require('can-globals/mutation-observer/mutation-observer');
 * MUTATIONOBSERVER(mutationObserverShim);
 * MUTATIONOBSERVER() //-> MutationObserver
 * ```
 *
 * @param {Object} MutationObserver An optional MutationObserver-like object to set as the context's MutationObserver
 *
 * @return {Object} The MutationObserver object for this JavaScript environment.
 */

canGlobalsInstance.define('MutationObserver', function(){
	var GLOBAL = canGlobalsInstance.getKeyValue('global');
	return GLOBAL.MutationObserver || GLOBAL.WebKitMutationObserver || GLOBAL.MozMutationObserver;
});

var mutationObserver = canGlobalsInstance.makeExport('MutationObserver');

/**
 * @module {function} can-globals/is-node/is-node is-node
 * @parent can-globals/modules
 * @description Determines if your code is running in [Node.js](https://nodejs.org).
 * @signature `isNode()`
 *
 * ```js
 * var isNode = require("can-globals/is-node/is-node");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isNode()) {
 *   console.log(GLOBAL() === global); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if running in Node.js
 */

canGlobalsInstance.define('isNode', function(){
	return typeof process === "object" &&
		{}.toString.call(process) === "[object process]";
});

canGlobalsInstance.makeExport('isNode');

// This module depends on isNode being defined


/**
 * @module {function} can-globals/is-browser-window/is-browser-window is-browser-window
 * @parent can-globals/modules
 * @signature `isBrowserWindow()`
 *
 * Returns `true` if the code is running within a Browser window. Use this function if you need special code paths for when running in a Browser window, a Web Worker, or another environment (such as Node.js).
 *
 * ```js
 * var isBrowserWindow = require("can-globals/is-browser-window/is-browser-window");
 * var GLOBAL = require("can-globals/global/global");
 *
 * if(isBrowserWindow()) {
 *   console.log(GLOBAL() === window); // -> true
 * }
 * ```
 *
 * @return {Boolean} True if the environment is a Browser window.
 */

canGlobalsInstance.define('isBrowserWindow', function(){
	var isNode = canGlobalsInstance.getKeyValue('isNode');
	return typeof window !== "undefined" &&
		typeof document !== "undefined" &&
		isNode === false;
});

var isBrowserWindow = canGlobalsInstance.makeExport('isBrowserWindow');

/**
 * @module {function} can-globals/custom-elements/custom-elements custom-elements
 * @parent can-globals/modules
 *
 * Get the global [`customElements`](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) object for the current context.
 *
 * @signature `CUSTOMELEMENTS([newCustomElements])`
 *
 * Optionally sets, and returns, the [`customElements`](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) object for the context.
 *
 * ```js
 * var customElementsShim = require('some-custom-elements-shim');
 * CUSTOMELEMENTS(customElementsShim);
 * CUSTOMELEMENTS() //-> customElementsShim
 * ```
 *
 * @param {Object} customElements An optional CustomElementRegistry-like object to set as the context's customElements
 *
 * @return {Object} The customElements object for this JavaScript environment.
 */

canGlobalsInstance.define('customElements', function(){
	var GLOBAL = canGlobalsInstance.getKeyValue('global');
	return GLOBAL.customElements;
});

canGlobalsInstance.makeExport('customElements');

var canGlobals = canGlobalsInstance;

function eliminate$1(array, item) {
	var index = array.indexOf(item);
	if (index >= 0) {
		array.splice(index, 1);
	}
}
function wasNotInSet(item, set) {
	var inSet = set.has(item);
	if(inSet === false) {
		set.add(item);
	}
	return !inSet;
}


function contains$1(parent, child){
	if(child && child.nodeType === Node.TEXT_NODE) {
		return contains$1(parent, child.parentNode);
	}
	if(parent.contains) {
		return parent.contains(child);
	}
	if(parent.nodeType === Node.DOCUMENT_NODE && parent.documentElement) {
		return contains$1(parent.documentElement, child);
	} else {
		child = child.parentNode;
		if(child === parent) {
			return true;
		}
		return false;
	}
}

function isDocumentElement$1 (node) {
	return document$1().documentElement === node;
}

function isFragment (node) {
	return !!(node && node.nodeType === 11);
}

function isElementNode (node) {
	return !!(node && node.nodeType === 1);
}

function getChildren (parentNode) {
	var nodes = [];
	var node = parentNode.firstChild;
	while (node) {
		nodes.push(node);
		node = node.nextSibling;
	}
	return nodes;
}

function getParents$1 (node) {
	var nodes;
	if (isFragment(node)) {
		nodes = getChildren(node);
	} else {
		nodes = [node];
	}
	return nodes;
}


function getNodesLegacyB(node) {
	var skip, tmp;

	var depth = 0;

	var items = isFragment(node) ? [] : [node];
	if(node.firstChild == null) {
		return items;
	}

	// Always start with the initial element.
	do {
		if ( !skip && (tmp = node.firstChild) ) {
			depth++;
			items.push(tmp);
		} else if ( tmp = node.nextSibling ) {
			skip = false;
			items.push(tmp);
		} else {
			// Skipped or no first child and no next sibling, so traverse upwards,
			tmp = node.parentNode;
			// and decrement the depth.
			depth--;
			// Enable skipping, so that in the next loop iteration, the children of
			// the now-current node (parent node) aren't processed again.
			skip = true;
		}

		// Instead of setting node explicitly in each conditional block, use the
		// tmp var and set it here.
		node = tmp;

		// Stop if depth comes back to 0 (or goes below zero, in conditions where
		// the passed node has neither children nore next siblings).
	} while ( depth > 0 );

	return items;
}

// IE11 requires a filter parameter for createTreeWalker
// it also must be an object with an `acceptNode` property
function treeWalkerFilterFunction() {
	return NodeFilter.FILTER_ACCEPT;
}
var treeWalkerFilter = treeWalkerFilterFunction;
treeWalkerFilter.acceptNode = treeWalkerFilterFunction;

function getNodesWithTreeWalker(rootNode) {
	var result = isFragment(rootNode) ? [] : [rootNode];

	// IE11 throws if createTreeWalker is called on a non-ElementNode
	var walker = isElementNode(rootNode) && document$1().createTreeWalker(
		rootNode,
		NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
		treeWalkerFilter,
		false
	);

	var node;
	while(node = walker && walker.nextNode()) {
		result.push(node);
	}
	return result;
}

function getAllNodes$1 (node) {
	if( document$1().createTreeWalker !== undefined ) {
		return getNodesWithTreeWalker(node);
	} else {
		return getNodesLegacyB(node);
	}
}

function subscription$1 (fn) {
	return function _subscription () {
		var disposal = fn.apply(this, arguments);
		var isDisposed = false;
		return function _disposal () {
			if (isDisposed) {
				var fnName = fn.name || fn.displayName || 'an anonymous function';
				var message = 'Disposal function returned by ' + fnName + ' called more than once.';
				throw new Error(message);
			}
			disposal.apply(this, arguments);
			isDisposed = true;
		};
	};
}

var Util = {
	eliminate: eliminate$1,
	getDocument: document$1,
	isDocumentElement: isDocumentElement$1,
	isFragment: isFragment,
	getParents: getParents$1,
	getAllNodes: getAllNodes$1,
	getChildren: getChildren,
	subscription: subscription$1,
	wasNotInSet: wasNotInSet,
	contains: contains$1
};

var contains = Util.contains;
var mutate$1 = {};
var isConnected;
function getIsConnectedFromNode(node) {
	return node.isConnected;
}
function getIsConnectedFromDocument(node) {
	var doc = node.ownerDocument;
	// if node *is* the document, ownerDocument is null
	// However, CanSimpleDom implements this incorrectly, and a document's ownerDocument is itself,
	//   so make both checks
	return doc === null || doc === node || contains(doc, node);
}

function setIsConnected(doc) {
	if(doc) {
		var node = doc.createTextNode("");
		isConnected = 'isConnected' in node.constructor.prototype ?
			getIsConnectedFromNode :
			getIsConnectedFromDocument;
		if(mutate$1) {
			mutate$1.isConnected = isConnected;
		}
	} else {
		mutate$1.isConnected = getIsConnectedFromNode;
	}
}
setIsConnected(canGlobals.getKeyValue("document"));
canGlobals.onKeyValue("document", setIsConnected);

var IsConnected = mutate$1;

var eliminate = Util.eliminate;
var subscription = Util.subscription;
var isDocumentElement = Util.isDocumentElement;
var getAllNodes = Util.getAllNodes;

var domMutate,
	dispatchNodeInserted,
	dispatchNodeConnected,
	dispatchGlobalConnected,
	dispatchNodeRemoved,
	dispatchNodeDisconnected,
	dispatchGlobalDisconnected,
	dispatchAttributeChange;

var dataStore = new WeakMap();


var queue$1;

function getRelatedData(node, key) {
	var data = dataStore.get(node);
	if (data) {
		return data[key];
	}
}

function setRelatedData(node, key, targetListenersMap) {
	var data = dataStore.get(node);
	if (!data) {
		data = {};
		dataStore.set(node, data);
	}
	data[key] = targetListenersMap;
}

function deleteRelatedData(node, key) {
	var data = dataStore.get(node);
	return delete data[key];
}

function toMutationEvent(node, mutation) {
	return {target: node, sourceMutation: mutation};
}

function getDocumentListeners (target, key) {
	// TODO: it's odd these functions read DOCUMENT() instead of
	// target.ownerDocument.  To change to ownerDocument, we might need a "is document"
	// check.
	var doc = document$1();
	var data = getRelatedData(doc, key);
	if (data) {
		return data.listeners;
	}
}

function getTargetListeners (target, key) {
	var doc = document$1();
	var targetListenersMap = getRelatedData(doc, key);
	if (!targetListenersMap) {
		return;
	}

	return targetListenersMap.get(target);
}

function addTargetListener (target, key, listener) {
	var doc = document$1();
	var targetListenersMap = getRelatedData(doc, key);
	if (!targetListenersMap) {
		targetListenersMap = new WeakMap();
		setRelatedData(doc, key, targetListenersMap);
	}
	var targetListeners = targetListenersMap.get(target);
	if (!targetListeners) {
		targetListeners = [];
		targetListenersMap.set(target, targetListeners);
	}
	targetListeners.push(listener);
}

function removeTargetListener (target, key, listener) {
	var doc = document$1();
	var targetListenersMap = getRelatedData(doc, key);
	if (!targetListenersMap) {
		return;
	}
	var targetListeners = targetListenersMap.get(target);
	if (!targetListeners) {
		return;
	}
	eliminate(targetListeners, listener);
	if (targetListeners.length === 0) {
		targetListenersMap['delete'](target);
		if (targetListenersMap.size === 0) {
			deleteRelatedData(doc, key);
		}
	}
}

var promise = Promise.resolve();
function nextTick(handler) {
	promise.then(handler);
}

//var recordsAndCallbacks = null;

function flushCallbacks(callbacks, arg){
	var callbacksCount = callbacks.length;
	var safeCallbacks = callbacks.slice(0);
	for(var c = 0; c < callbacksCount; c++){
		safeCallbacks[c](arg);
	}
}

function dispatch(getListeners, targetKey) {

	return function dispatchEvents(event) {
		var targetListeners = getListeners(event.target, targetKey);

		if (targetListeners) {
			flushCallbacks(targetListeners, event);
		}
	};
}

var count = 0;

function observeMutations(target, observerKey, config, handler) {

	var observerData = getRelatedData(target, observerKey);
	if (!observerData) {
		observerData = {
			observingCount: 0
		};
		setRelatedData(target, observerKey, observerData);
	}

	var setupObserver = function () {
		// disconnect the old one
		if (observerData.observer) {
			observerData.observer.disconnect();
			observerData.observer = null;
		}

		var MutationObserver = mutationObserver();
		if (MutationObserver) {
			var Node = global_1().Node;
			var isRealNode = !!(Node && target instanceof Node);
			if (isRealNode) {
				var targetObserver = new MutationObserver(handler);
				targetObserver.id = count++;
				targetObserver.observe(target, config);
				observerData.observer = targetObserver;
			}
		}
	};

	if (observerData.observingCount === 0) {
		canGlobals.onKeyValue('MutationObserver', setupObserver);
		setupObserver();
	}

	observerData.observingCount++;
	return function stopObservingMutations() {
		var observerData = getRelatedData(target, observerKey);
		if (observerData) {
			observerData.observingCount--;
			if (observerData.observingCount <= 0) {
				if (observerData.observer) {
					observerData.observer.disconnect();
				}
				deleteRelatedData(target, observerKey);
				canGlobals.offKeyValue('MutationObserver', setupObserver);
			}
		}
	};
}

var treeMutationConfig = {
	subtree: true,
	childList: true
};

var attributeMutationConfig = {
	attributes: true,
	attributeOldValue: true
};

function addNodeListener(listenerKey, observerKey, isAttributes) {
	return subscription(function _addNodeListener(target, listener) {
		// DocumentFragment
		if(target.nodeType === 11) {
			// This returns a noop without actually doing anything.
			// We should probably warn about passing a DocumentFragment here,
			// but since can-stache does so currently we are ignoring until that is
			// fixed.
			return Function.prototype;
		}

		var stopObserving;
		if (isAttributes) {
			stopObserving = observeMutations(target, observerKey, attributeMutationConfig, queue$1.enqueueAndFlushMutations);
		} else {
			stopObserving = observeMutations(document$1(), observerKey, treeMutationConfig, queue$1.enqueueAndFlushMutations);
		}

		addTargetListener(target, listenerKey, listener);
		return function removeNodeListener() {
			if(stopObserving) {
				stopObserving();
			}

			removeTargetListener(target, listenerKey, listener);
		};
	});
}

function addGlobalListener(globalDataKey, addNodeListener) {
	return subscription(function addGlobalGroupListener(documentElement, listener) {
		if (!isDocumentElement(documentElement)) {
			throw new Error('Global mutation listeners must pass a documentElement');
		}

		var doc = document$1();
		var documentData = getRelatedData(doc, globalDataKey);
		if (!documentData) {
			documentData = {listeners: []};
			setRelatedData(doc, globalDataKey, documentData);
		}

		var listeners = documentData.listeners;
		if (listeners.length === 0) {
			// We need at least on listener for mutation events to propagate
			documentData.removeListener = addNodeListener(doc, function () {});
		}

		listeners.push(listener);

		return function removeGlobalGroupListener() {
			var documentData = getRelatedData(doc, globalDataKey);
			if (!documentData) {
				return;
			}

			var listeners = documentData.listeners;
			eliminate(listeners, listener);
			if (listeners.length === 0) {
				documentData.removeListener();
				deleteRelatedData(doc, globalDataKey);
			}
		};
	});
}



var domMutationPrefix = 'domMutation';

// target listener keys
var connectedDataKey = domMutationPrefix + 'ConnectedData';
var disconnectedDataKey = domMutationPrefix + 'DisconnectedData';
var insertedDataKey = domMutationPrefix + 'InsertedData';
var removedDataKey = domMutationPrefix + 'RemovedData';
var attributeChangeDataKey = domMutationPrefix + 'AttributeChangeData';

// document listener keys
var documentConnectedDataKey = domMutationPrefix + 'DocumentConnectedData';
var documentDisconnectedDataKey = domMutationPrefix + 'DocumentDisconnectedData';
var documentAttributeChangeDataKey = domMutationPrefix + 'DocumentAttributeChangeData';

// observer keys
var treeDataKey = domMutationPrefix + 'TreeData';
var attributeDataKey = domMutationPrefix + 'AttributeData';

dispatchNodeInserted = dispatch(getTargetListeners, insertedDataKey);
dispatchNodeConnected = dispatch(getTargetListeners, connectedDataKey);
dispatchGlobalConnected = dispatch(getDocumentListeners, documentConnectedDataKey);

dispatchNodeRemoved = dispatch(getTargetListeners, removedDataKey);
dispatchNodeDisconnected = dispatch(getTargetListeners, disconnectedDataKey);
dispatchGlobalDisconnected = dispatch(getDocumentListeners, documentDisconnectedDataKey);

dispatchAttributeChange = dispatch(getTargetListeners, attributeChangeDataKey);

// node listeners
var addNodeConnectedListener = addNodeListener(connectedDataKey, treeDataKey);
var addNodeDisconnectedListener = addNodeListener(disconnectedDataKey, treeDataKey);
var addNodeInsertedListener = addNodeListener(insertedDataKey, treeDataKey);
var addNodeRemovedListener = addNodeListener(removedDataKey, treeDataKey);
var addNodeAttributeChangeListener = addNodeListener(attributeChangeDataKey, attributeDataKey, true);

// global listeners
var addConnectedListener = addGlobalListener(
	documentConnectedDataKey,
	addNodeConnectedListener
);
var addDisconnectedListener = addGlobalListener(
	documentDisconnectedDataKey,
	addNodeDisconnectedListener
);
var addAttributeChangeListener = addGlobalListener(
	documentAttributeChangeDataKey,
	addNodeAttributeChangeListener
);

// ==========================================
function dispatchTreeMutation(mutation, processedState) {
	// was the mutation connected
	var wasConnected = mutation.isConnected === true || mutation.isConnected === undefined;

	// there are
	// - the global connected
	// - individual connected
	// - individual inserted
	var removedCount = mutation.removedNodes.length;
	for (var r = 0; r < removedCount; r++) {
		// get what already isn't in `removed`

		// see if "removed"
		// if wasConnected .. dispatch disconnected
		var removedNodes = getAllNodes(mutation.removedNodes[r]);
		removedNodes.forEach(function(node){
			var event = toMutationEvent(node, mutation);

			if( Util.wasNotInSet(node, processedState.removed) ) {
				dispatchNodeRemoved( event );
			}
			if(wasConnected && Util.wasNotInSet(node, processedState.disconnected) ) {
				dispatchNodeDisconnected( event );
				dispatchGlobalDisconnected( event );
			}
		});
	}

	var addedCount = mutation.addedNodes.length;
	for (var a = 0; a < addedCount; a++) {
		var insertedNodes = getAllNodes(mutation.addedNodes[a]);
		insertedNodes.forEach(function(node){
			var event = toMutationEvent(node, mutation);

			if(Util.wasNotInSet(node, processedState.inserted)) {
				dispatchNodeInserted( event );
			}
			if(wasConnected && Util.wasNotInSet(node, processedState.connected) ) {
				dispatchNodeConnected( event );
				dispatchGlobalConnected( event );
			}
		});
	}
	// run mutation
}


var FLUSHING_MUTATIONS = [];
var IS_FLUSHING = false;

var IS_FLUSH_PENDING = false;
var ENQUEUED_MUTATIONS = [];

queue$1 = {
	// This is used to dispatch mutations immediately.
	// This is usually called by the result of a mutation observer.
	enqueueAndFlushMutations: function(mutations) {
		if(IS_FLUSH_PENDING) {
			FLUSHING_MUTATIONS.push.apply(FLUSHING_MUTATIONS, ENQUEUED_MUTATIONS);
			IS_FLUSH_PENDING = false;
			ENQUEUED_MUTATIONS = [];
		}

		FLUSHING_MUTATIONS.push.apply(FLUSHING_MUTATIONS, mutations);
		if(IS_FLUSHING) {
			return;
		}

		IS_FLUSHING = true;

		var index = 0;

		var processedState = {
			connected: new Set(),
			disconnected: new Set(),
			inserted: new Set(),
			removed: new Set()
		};

		while(index < FLUSHING_MUTATIONS.length) {
			var mutation = FLUSHING_MUTATIONS[index];
			// process mutation
			if(mutation.type === "childList") {
				dispatchTreeMutation(mutation, processedState);
			} else if(mutation.type === "attributes") {
				dispatchAttributeChange(mutation);
			}
			index++;

		}
		FLUSHING_MUTATIONS = [];
		IS_FLUSHING = false;
	},
	// called to dipatch later unless we are already dispatching.
	enqueueMutationsAndFlushAsync: function(mutations){
		ENQUEUED_MUTATIONS.push.apply(ENQUEUED_MUTATIONS, mutations);

		// if there are currently dispatching mutations, this should happen sometime after
		if(!IS_FLUSH_PENDING) {
			IS_FLUSH_PENDING = true;
			nextTick(function(){
				if(IS_FLUSH_PENDING) {
					IS_FLUSH_PENDING = false;
					var pending = ENQUEUED_MUTATIONS;
					ENQUEUED_MUTATIONS = [];
					queue$1.enqueueAndFlushMutations(pending);
				}
			});
		}
	}
};


// ==========================================


domMutate = {
	/**
	* @function can-dom-mutate.dispatchNodeInsertion dispatchNodeInsertion
	* @hide
	*
	* Dispatch an insertion mutation on the given node.
	*
	* @signature `dispatchNodeInsertion( node [, callback ] )`
	* @parent can-dom-mutate.static
	* @param {Node} node The node on which to dispatch an insertion mutation.
	*/
	dispatchNodeInsertion: function (node, target) {
		queue$1.enqueueMutationsAndFlushAsync(
			[{
				type: "childList",
				target: target,
				addedNodes: [node],
				isConnected: IsConnected.isConnected(target),
				removedNodes: []
			}]
		);
		/*
		var nodes = new Set();
		util.addToSet( getAllNodes(node), nodes);
		var events = toMutationEvents( canReflect.toArray(nodes) );
		// this is basically an array of every single child of node including node
		dispatchInsertion(events, callback, dispatchConnected, flushAsync);*/
	},

	/**
	* @function can-dom-mutate.dispatchNodeRemoval dispatchNodeRemoval
	* @hide
	*
	* Dispatch a removal mutation on the given node.
	*
	* @signature `dispatchNodeRemoval( node [, callback ] )`
	* @parent can-dom-mutate.static
	* @param {Node} node The node on which to dispatch a removal mutation.
	* @param {function} callback The optional callback called after the mutation is dispatched.
	*/
	dispatchNodeRemoval: function (node, target) {
		queue$1.enqueueMutationsAndFlushAsync(
			[{
				type: "childList",
				target: target,
				addedNodes: [],
				removedNodes: [node],
				isConnected: IsConnected.isConnected(target)
			}]
		);
		/*
		var nodes = new Set();
		util.addToSet( getAllNodes(node), nodes);
		var events = toMutationEvents( canReflect.toArray(nodes) );
		dispatchRemoval(events, callback, dispatchConnected, flushAsync);*/
	},

	/**
	* @function can-dom-mutate.dispatchNodeAttributeChange dispatchNodeAttributeChange
	* @parent can-dom-mutate.static
	* @hide
	*
	* Dispatch an attribute change mutation on the given node.
	*
	* @signature `dispatchNodeAttributeChange( node, attributeName, oldValue [, callback ] )`
	*
	* ```
	* input.setAttribute("value", "newValue")
	* domMutate.dispatchNodeAttributeChange(input, "value","oldValue")
	* ```
	*
	*
	* @param {Node} target The node on which to dispatch an attribute change mutation.
	* @param {String} attributeName The attribute name whose value has changed.
	* @param {String} oldValue The attribute value before the change.
	*/
	dispatchNodeAttributeChange: function (target, attributeName, oldValue) {
		queue$1.enqueueMutationsAndFlushAsync(
			[{
				type: "attributes",
				target: target,
				attributeName: attributeName,
				oldValue: oldValue
			}]
		);
	},

	/**
	* @function can-dom-mutate.onNodeConnected onNodeConnected
	*
	* Listen for insertion mutations on the given node.
	*
	* @signature `onNodeConnected( node, callback )`
	* @parent can-dom-mutate.static
	* @param {Node} node The node on which to listen for insertion mutations.
	* @param {function} callback The callback called when an insertion mutation is dispatched.
	* @return {function} The callback to remove the mutation listener.
	*/
	onNodeConnected: addNodeConnectedListener,
	onNodeInsertion: function(){
		// TODO: remove in prod
		console.warn("can-dom-mutate: Use onNodeConnected instead of onNodeInsertion");
		return addNodeConnectedListener.apply(this, arguments);
	},
	/**
	* @function can-dom-mutate.onNodeDisconnected onNodeDisconnected
	*
	* Listen for removal mutations on the given node.
	*
	* @signature `onNodeDisconnected( node, callback )`
	* @parent can-dom-mutate.static
	* @param {Node} node The node on which to listen for removal mutations.
	* @param {function} callback The callback called when a removal mutation is dispatched.
	* @return {function} The callback to remove the mutation listener.
	*/
	onNodeDisconnected: addNodeDisconnectedListener,
	onNodeRemoval: function(){
		// TODO: remove in prod
		console.warn("can-dom-mutate: Use onNodeDisconnected instead of onNodeRemoval");
		return addNodeDisconnectedListener.apply(this, arguments);
	},
	/**
	* @function can-dom-mutate.onNodeAttributeChange onNodeAttributeChange
	*
	* Listen for attribute change mutations on the given node.
	*
	* @signature `onNodeAttributeChange( node, callback )`
	* @parent can-dom-mutate.static
	* @param {Node} node The node on which to listen for attribute change mutations.
	* @param {function} callback The callback called when an attribute change mutation is dispatched.
	* @return {function} The callback to remove the mutation listener.
	*/
	onNodeAttributeChange: addNodeAttributeChangeListener,

	/**
	* @function can-dom-mutate.onDisconnected onDisconnected
	*
	* Listen for removal mutations on any node within the documentElement.
	*
	* @signature `onDisconnected( documentElement, callback )`
	* @parent can-dom-mutate.static
	* @param {Node} documentElement The documentElement on which to listen for removal mutations.
	* @param {function} callback The callback called when a removal mutation is dispatched.
	* @return {function} The callback to remove the mutation listener.
	*/
	onDisconnected: addDisconnectedListener,
	onRemoval: function(){
		// TODO: remove in prod
		console.warn("can-dom-mutate: Use onDisconnected instead of onRemoval");
		return addDisconnectedListener.apply(this, arguments);
	},
	/**
	* @function can-dom-mutate.onConnected onConnected
	*
	* Listen for insertion mutations on any node within the documentElement.
	*
	* @signature `onConnected( documentElement, callback )`
	* @parent can-dom-mutate.static
	* @param {Node} documentElement The documentElement on which to listen for removal mutations.
	* @param {function} callback The callback called when a insertion mutation is dispatched.
	* @return {function} The callback to remove the mutation listener.
	*/
	onConnected: addConnectedListener,
	onInsertion: function(){
		// TODO: remove in prod
		console.warn("can-dom-mutate: Use onConnected instead of onInsertion");
		return addConnectedListener.apply(this, arguments);
	},
	/**
	* @function can-dom-mutate.onAttributeChange onAttributeChange
	*
	* Listen for attribute change mutations on any node within the documentElement.
	*
	* @signature `onAttributeChange( documentElement, callback )`
	* @parent can-dom-mutate.static
	* @param {Node} documentElement The documentElement on which to listen for removal mutations.
	* @param {function} callback The callback called when an attribute change mutation is dispatched.
	* @return {function} The callback to remove the mutation listener.
	*/
	onAttributeChange: addAttributeChangeListener,

	flushRecords: function(doc){
		doc = doc || document$1();
		var data = dataStore.get(doc),
			records = [];
		if(data) {
			if(data.domMutationTreeData && data.domMutationTreeData.observer) {
				records = data.domMutationTreeData.observer.takeRecords();
			}
		}
		queue$1.enqueueAndFlushMutations(records);
	},
	onNodeInserted: addNodeInsertedListener,
	onNodeRemoved: addNodeRemovedListener
};
//!steal-remove-end

var canDomMutate = canNamespace.domMutate = domMutate;

var getParents = Util.getParents;



var compat = {
	replaceChild: function (newChild, oldChild) {
		var newChildren = getParents(newChild);
		var result = this.replaceChild(newChild, oldChild);
		canDomMutate.dispatchNodeRemoval(oldChild, this);
		for (var i = 0; i < newChildren.length; i++) {
			canDomMutate.dispatchNodeInsertion(newChildren[i], this);
		}
		return result;
	},
	setAttribute: function (name, value) {
		var oldAttributeValue = this.getAttribute(name);
		var result = this.setAttribute(name, value);
		var newAttributeValue = this.getAttribute(name);
		if (oldAttributeValue !== newAttributeValue) {
			canDomMutate.dispatchNodeAttributeChange(this, name, oldAttributeValue);
		}
		return result;
	},
	setAttributeNS: function (namespace, name, value) {
		var oldAttributeValue = this.getAttribute(name);
		var result = this.setAttributeNS(namespace, name, value);
		var newAttributeValue = this.getAttribute(name);
		if (oldAttributeValue !== newAttributeValue) {
			canDomMutate.dispatchNodeAttributeChange(this, name, oldAttributeValue);
		}
		return result;
	},
	removeAttribute: function (name) {
		var oldAttributeValue = this.getAttribute(name);
		var result = this.removeAttribute(name);
		if (oldAttributeValue) {
			canDomMutate.dispatchNodeAttributeChange(this, name, oldAttributeValue);
		}
		return result;
	}
};

var compatData = [
	['appendChild', 'Insertion'],
	['insertBefore', 'Insertion'],
	['removeChild', 'Removal']
];
compatData.forEach(function (pair) {
	var nodeMethod = pair[0];
	var dispatchMethod = 'dispatchNode' + pair[1];
	compat[nodeMethod] = function (node) {
		var nodes = getParents(node);
		var result = this[nodeMethod].apply(this, arguments);
		for (var i = 0; i < nodes.length; i++) {
			canDomMutate[dispatchMethod](nodes[i], this);
		}
		return result;
	};
});

var normal = {};
var nodeMethods = ['appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'setAttribute', 'setAttributeNS', 'removeAttribute'];
nodeMethods.forEach(function (methodName) {
	normal[methodName] = function () {
		if(IsConnected.isConnected(this)) {
			return this[methodName].apply(this, arguments);
		} else {
			return compat[methodName].apply(this, arguments);
		}
	};
});

/**
* @module {{}} can-dom-mutate/node node
* @parent can-dom-mutate/modules
*
* Append, insert, and remove DOM nodes. Also, change node attributes.
* This allows mutations to be dispatched in environments where MutationObserver is not supported.
* @signature `mutateNode`
*
* Exports an `Object` with methods that shouhld be used to mutate HTML.
*
* ```js
* var mutateNode = require('can-dom-mutate/node');
* var el = document.createElement('div');
*
* mutateNode.appendChild.call(document.body, el);
*
* ```
*/
var mutate = {};

/**
* @function can-dom-mutate/node.appendChild appendChild
* @parent can-dom-mutate/node
*
* Append a node to an element, effectively `Node.prototype.appendChild`.
*
* @signature `mutate.appendChild.call(parent, child)`
*
* @param {Node} parent The parent into which the child is inserted.
* @param {Node} child The child which will be inserted into the parent.
* @return {Node} The appended child.
*/

/**
* @function can-dom-mutate/node.insertBefore insertBefore
* @parent can-dom-mutate/node
*
* Insert a node before a given reference node in an element, effectively `Node.prototype.insertBefore`.
*
* @signature `mutate.insertBefore.call(parent, child, reference)`
* @param {Node} parent The parent into which the child is inserted.
* @param {Node} child The child which will be inserted into the parent.
* @param {Node} reference The reference which the child will be placed before.
* @return {Node} The inserted child.
*/

/**
* @function can-dom-mutate/node.removeChild removeChild
* @parent can-dom-mutate/node
*
* Remove a node from an element, effectively `Node.prototype.removeChild`.
*
* @signature `mutate.removeChild.call(parent, child)`
*
* @param {Node} parent The parent from which the child is removed.
* @param {Node} child The child which will be removed from the parent.
* @return {Node} The removed child.
*/

/**
* @function can-dom-mutate/node.replaceChild replaceChild
* @parent can-dom-mutate/node
*
* Insert a node before a given reference node in an element, effectively `Node.prototype.replaceChild`.
*
* @signature `mutate.replaceChild.call(parent, newChild, oldChild)`
*
* @param {Node} parent The parent into which the newChild is inserted.
* @param {Node} newChild The child which is inserted into the parent.
* @param {Node} oldChild The child which is removed from the parent.
* @return {Node} The replaced child.
*/

/**
* @function can-dom-mutate/node.setAttribute setAttribute
* @parent can-dom-mutate/node
*
* Set an attribute value on an element, effectively `Element.prototype.setAttribute`.
*
* @signature `mutate.setAttribute.call(element, name, value)`
*
* @param {Element} element The element on which to set the attribute.
* @param {String} name The name of the attribute to set.
* @param {String} value The value to set on the attribute.
*/

/**
* @function can-dom-mutate/node.removeAttribute removeAttribute
* @parent can-dom-mutate/node
*
* Removes an attribute from an element, effectively `Element.prototype.removeAttribute`.
*
* @signature `mutate.removeAttribute.call(element, name, value)`
*
* @param {Element} element The element from which to remove the attribute.
* @param {String} name The name of the attribute to remove.
*/

function setMutateStrategy(observer) {
	var strategy = observer ? normal : compat;

	for (var key in strategy) {
		mutate[key] = strategy[key];
	}
}

var mutationObserverKey = 'MutationObserver';
setMutateStrategy(canGlobals.getKeyValue(mutationObserverKey));
canGlobals.onKeyValue(mutationObserverKey, setMutateStrategy);

var node = canNamespace.domMutateNode = canDomMutate.node = mutate;

// backwards compatibility
var node_1 = canNamespace.node = node;

/**
 * @module {function} can-child-nodes
 * @parent can-dom-utilities
 * @collection can-infrastructure
 * @package ./package.json
 * 
 * @signature `childNodes(node)`
 *
 * Get all of the childNodes of a given node.
 *
 * ```js
 * var stache = require("can-stache");
 * var childNodes = require("can-util/child-nodes/child-nodes");
 *
 * var html = "<div><h1><span></span></h1></div>";
 * var frag = stache(html)();
 *
 * console.log(childNodes(frag)[0].nodeName); // -> DIV
 * ```
 *
 * @param {Object} node The Node that you want child nodes for.
 */

function childNodes(node) {
	var childNodes = node.childNodes;
	if ("length" in childNodes) {
		return childNodes;
	} else {
		var cur = node.firstChild;
		var nodes = [];
		while (cur) {
			nodes.push(cur);
			cur = cur.nextSibling;
		}
		return nodes;
	}
}

var canChildNodes = canNamespace.childNodes = childNodes;

/**
@module {function} can-fragment
@parent can-dom-utilities
@collection can-infrastructure
@package ./package.json

Convert a String, HTMLElement, documentFragment, contentArray, or object with a `can.toDOM` symbol into a documentFragment.

@signature `fragment(item, doc)`

@param {String|HTMLElement|documentFragment|contentArray} item
@param {Document} doc   an optional DOM document in which to build the fragment

@return {documentFragment}

@body

## Use

ContentArrays can be used to combine multiple HTMLElements into a single document fragment.  For example:

    var fragment = require("can-fragment");

    var p = document.createElement("p");
    p.innerHTML = "Welcome to <b>CanJS</b>";
    var contentArray = ["<h1>Hi There</h1>", p];
    var fragment = fragment( contentArray )

`fragment` will be a documentFragment with the following elements:

    <h1>Hi There</h1>
    <p>Welcome to <b>CanJS</b></p>

 */


// fragment.js
// ---------
// _DOM Fragment support._
var fragmentRE = /^\s*<(\w+)[^>]*>/,
	toString$1 = {}.toString,
	toDOMSymbol$1 = canSymbol.for("can.toDOM");

function makeFragment(html, name, doc) {
	if (name === undefined) {
		name = fragmentRE.test(html) && RegExp.$1;
	}
	if (html && toString$1.call(html.replace) === "[object Function]") {
		// Fix "XHTML"-style tags in all browsers
		html = html.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, '<$1></$2>');
	}
	var container = doc.createElement('div'),
		temp = doc.createElement('div');
	// IE's parser will strip any `<tr><td>` tags when `innerHTML`
	// is called on a `tbody`. To get around this, we construct a
	// valid table with a `tbody` that has the `innerHTML` we want.
	// Then the container is the `firstChild` of the `tbody`.
	// [source](http://www.ericvasilik.com/2006/07/code-karma.html).
	if (name === 'tbody' || name === 'tfoot' || name === 'thead' || name === 'colgroup') {
		temp.innerHTML = '<table>' + html + '</table>';
		container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
	} else if (name === 'col') {
		temp.innerHTML = '<table><colgroup>' + html + '</colgroup></table>';
		container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
	} else if (name === 'tr') {
		temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
		container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild;
	} else if (name === 'td' || name === 'th') {
		temp.innerHTML = '<table><tbody><tr>' + html + '</tr></tbody></table>';
		container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild.firstChild.firstChild;
	} else if (name === 'option') {
		temp.innerHTML = '<select>' + html + '</select>';
		container = temp.firstChild.nodeType === 3 ? temp.lastChild : temp.firstChild;
	} else {
		container.innerHTML = '' + html;
	}

	return [].slice.call(canChildNodes(container));
}

function fragment(html, doc) {
	if (html && html.nodeType === 11) {
		return html;
	}
	if (!doc) {
		doc = document$1();
	} else if (doc.length) {
		doc = doc[0];
	}

	var parts = makeFragment(html, undefined, doc),
		frag = (doc || document).createDocumentFragment();
	for (var i = 0, length = parts.length; i < length; i++) {
		frag.appendChild(parts[i]);
	}
	return frag;
}

var makeFrag = function(item, doc) {
	var document = doc || document$1();
	var frag;
	if (!item || typeof item === "string") {
		frag = fragment(item == null ? "" : "" + item, document);
		// If we have an empty frag...
	} else if(typeof item[toDOMSymbol$1] === "function") {
		return makeFrag(item[toDOMSymbol$1]());
	}
	else if (item.nodeType === 11) {
		return item;
	} else if (typeof item.nodeType === "number") {
		frag = document.createDocumentFragment();
		frag.appendChild(item);
		return frag;
	} else if (canReflect.isListLike(item)) {
		frag = document.createDocumentFragment();
		canReflect.eachIndex(item, function(item) {
			frag.appendChild(makeFrag(item));
		});
	} else {
		frag = fragment("" + item, document);
	}
    if (!canChildNodes(frag).length) {
        frag.appendChild(document.createTextNode(''));
    }
    return frag;
};

var canFragment = canNamespace.fragment = canNamespace.frag = makeFrag;

var canViewCallbacks = createCommonjsModule(function (module) {













var callbackMapSymbol = canSymbol.for('can.callbackMap');
var initializeSymbol = canSymbol.for('can.initialize');
//!steal-remove-end

var tags = {};

// WeakSet containing elements that have been rendered already
// and therefore do not need to be rendered again

var automountEnabled = function(){
	var document = canGlobals.getKeyValue("document");
	if(document == null || document.documentElement == null) {
		return false;
	}
	return document.documentElement.getAttribute("data-can-automount") !== "false";
};

var renderedElements = new WeakMap();

var mountElement = function (node) {
	var tagName = node.tagName && node.tagName.toLowerCase();
	var tagHandler = tags[tagName];

	// skip elements that already have a viewmodel or elements whose tags don't match a registered tag
	// or elements that have already been rendered
	if (tagHandler) {
		callbacks.tagHandler(node, tagName, {});
	}
};

var mutationObserverEnabled = false;
var disableMutationObserver;
var enableMutationObserver = function() {
	var docEl = document$1().documentElement;

	if (mutationObserverEnabled) {
		if (mutationObserverEnabled === docEl) {
			return;
		}
		// if the document has changed, re-enable mutationObserver
		disableMutationObserver();
	}

	var undoOnInsertionHandler = canDomMutate.onConnected(docEl, function(mutation) {
		mountElement(mutation.target);
	});
	mutationObserverEnabled = true;

	disableMutationObserver = function() {
		undoOnInsertionHandler();
		mutationObserverEnabled = false;
	};
};

var renderTagsInDocument = function(tagName) {
	var nodes = document$1().getElementsByTagName(tagName);

	for (var i=0, node; (node = nodes[i]) !== undefined; i++) {
		mountElement(node);
	}
};

var attr = function (attributeName, attrHandler) {
	if(attrHandler) {
		if (typeof attributeName === "string") {
			attributes[attributeName] = attrHandler;
			//!steal-remove-end
		} else {
			regExpAttributes.push({
				match: attributeName,
				handler: attrHandler
			});
			//!steal-remove-end
		}
	} else {
		var cb = attributes[attributeName];
		if( !cb ) {

			for( var i = 0, len = regExpAttributes.length; i < len; i++) {
				var attrMatcher = regExpAttributes[i];
				if(attrMatcher.match.test(attributeName)) {
					return attrMatcher.handler;
				}
			}
		}
		//!steal-remove-end

		return cb;
	}
};

var attrs = function(attrMap) {
	var map = canReflect.getKeyValue(attrMap, callbackMapSymbol) || attrMap;

	// Only add bindings once.
	if(attrMaps.has(map)) {
		return;
	} else {
		// Would prefer to use WeakSet but IE11 doesn't support it.
		attrMaps.set(map, true);
	}

	canReflect.eachKey(map, function(callback, exp){
		attr(exp, callback);
	});
};

var attributes = {},
	regExpAttributes = [],
	attrMaps = new WeakMap(),
	automaticCustomElementCharacters = /[-\:]/;
var defaultCallback = function () {};

var tag = function (tagName, tagHandler) {
	if(tagHandler) {
		var validCustomElementName = automaticCustomElementCharacters.test(tagName);
			typeof tags[tagName.toLowerCase()] !== 'undefined';
			var customElementExists;
		//!steal-remove-end

		tags[tagName.toLowerCase()] = tagHandler;

		if(automountEnabled()) {
			var customElements = canGlobals.getKeyValue("customElements");

			// automatically render elements that have tagHandlers
			// If browser supports customElements, register the tag as a custom element
			if (customElements) {
				customElementExists = customElements.get(tagName.toLowerCase());

				if (validCustomElementName && !customElementExists) {
					var CustomElement = function() {
						return Reflect.construct(HTMLElement, [], CustomElement);
					};

					CustomElement.prototype = Object.create(HTMLElement.prototype);
					CustomElement.prototype.constructor = CustomElement;

					CustomElement.prototype.connectedCallback = function() {
						callbacks.tagHandler(this, tagName.toLowerCase(), {});
					};

					customElements.define(tagName, CustomElement);
				}
			}
			// If browser doesn't support customElements, set up MutationObserver for
			// rendering elements when they are inserted in the page
			// and rendering elements that are already in the page
			else {
				enableMutationObserver();
				renderTagsInDocument(tagName);
			}
		} else if(mutationObserverEnabled) {
			disableMutationObserver();
		}
	} else {
		var cb;

		// if null is passed as tagHandler, remove tag
		if (tagHandler === null) {
			delete tags[tagName.toLowerCase()];
		} else {
			cb = tags[tagName.toLowerCase()];
		}

		if(!cb && automaticCustomElementCharacters.test(tagName)) {
			// empty callback for things that look like special tags
			cb = defaultCallback;
		}
		return cb;
	}

};

var callbacks = {
	_tags: tags,
	_attributes: attributes,
	_regExpAttributes: regExpAttributes,
	defaultCallback: defaultCallback,
	tag: tag,
	attr: attr,
	attrs: attrs,
	// handles calling back a tag callback
	tagHandler: function(el, tagName, tagData){
		// skip elements that have already been rendered
		if (renderedElements.has(el)) {
			return;
		}

		var scope = tagData.scope,
			helperTagCallback = scope && scope.templateContext.tags.get(tagName),
			tagCallback = helperTagCallback || tags[tagName] || el[initializeSymbol],
			res;

		// If this was an element like <foo-bar> that doesn't have a component, just render its content
		if(tagCallback) {
			res = canObservationRecorder.ignore(tagCallback)(el, tagData);

			// add the element to the Set of elements that have had their handlers called
			// this will prevent the handler from being called again when the element is inserted
			renderedElements.set(el, true);
		} else {
			res = scope;
		}
		//!steal-remove-end

		// If the tagCallback gave us something to render with, and there is content within that element
		// render it!
		if (res && tagData.subtemplate) {
			if (scope !== res) {
				scope = scope.add(res);
			}

			//var nodeList = nodeLists.register([], undefined, tagData.parentNodeList || true, false);
			//nodeList.expression = "<" + el.tagName + ">";

			var result = tagData.subtemplate(scope, tagData.options);
			var frag = typeof result === "string" ? canFragment(result) : result;
			node_1.appendChild.call(el, frag);
		}
	}
};

canNamespace.view = canNamespace.view || {};

if (canNamespace.view.callbacks) {
	throw new Error("You can't have two versions of can-view-callbacks, check your dependencies");
} else {
	module.exports = canNamespace.view.callbacks = callbacks;
}
});

/* jshint maxdepth:7 */
/* jshint latedef:false */





// if an object or a function
// convert into what it should look like
// then the modification can happen in place
// but it has to have more than the current node
// blah!
var processNodes = function(nodes, paths, location, document){
	var frag = document.createDocumentFragment();

	for(var i = 0, len = nodes.length; i < len; i++) {
		var node = nodes[i];
		frag.appendChild( processNode(node,paths,location.concat(i), document) );
	}
	return frag;
},
	keepsTextNodes =  typeof document !== "undefined" && (function(){
		var testFrag = document.createDocumentFragment();
		var div = document.createElement("div");

		div.appendChild(document.createTextNode(""));
		div.appendChild(document.createTextNode(""));
		testFrag.appendChild(div);

		var cloned  = testFrag.cloneNode(true);

		return cloned.firstChild.childNodes.length === 2;
	})(),
	clonesWork = typeof document !== "undefined" && (function(){
		// Since html5shiv is required to support custom elements, assume cloning
		// works in any browser that doesn't have html5shiv

		// Clone an element containing a custom tag to see if the innerHTML is what we
		// expect it to be, or if not it probably was created outside of the document's
		// namespace.
		var el = document.createElement('a');
		el.innerHTML = "<xyz></xyz>";
		var clone = el.cloneNode(true);
		var works = clone.innerHTML === "<xyz></xyz>";
		var MO, observer;

		if(works) {
			// Cloning text nodes with dashes seems to create multiple nodes in IE11 when
			// MutationObservers of subtree modifications are used on the documentElement.
			// Since this is not what we expect we have to include detecting it here as well.
			el = document.createDocumentFragment();
			el.appendChild(document.createTextNode('foo-bar'));

			MO = mutationObserver();

			if (MO) {
				observer = new MO(function() {});
				observer.observe(document.documentElement, { childList: true, subtree: true });

				clone = el.cloneNode(true);

				observer.disconnect();
			} else {
				clone = el.cloneNode(true);
			}

			return clone.childNodes.length === 1;
		}

		return works;
	})(),
	namespacesWork = typeof document !== "undefined" && !!document.createElementNS;

/**
 * @function cloneNode
 * @hide
 *
 * A custom cloneNode function to be used in browsers that properly support cloning
 * of custom tags (IE8 for example). Fixes it by doing some manual cloning that
 * uses innerHTML instead, which has been shimmed.
 *
 * @param {DocumentFragment} frag A document fragment to clone
 * @return {DocumentFragment} a new fragment that is a clone of the provided argument
 */
var cloneNode = clonesWork ?
	function(el){
		return el.cloneNode(true);
	} :
	function(node){
		var document = node.ownerDocument;
		var copy;

		if(node.nodeType === 1) {
			if(node.namespaceURI !== 'http://www.w3.org/1999/xhtml' && namespacesWork && document.createElementNS) {
				copy = document.createElementNS(node.namespaceURI, node.nodeName);
			}
			else {
				copy = document.createElement(node.nodeName);
			}
		} else if(node.nodeType === 3){
			copy = document.createTextNode(node.nodeValue);
		} else if(node.nodeType === 8) {
			copy = document.createComment(node.nodeValue);
		} else if(node.nodeType === 11) {
			copy = document.createDocumentFragment();
		}

		if(node.attributes) {
			var attributes = node.attributes;
			for (var i = 0; i < attributes.length; i++) {
				var attribute = attributes[i];
				if (attribute && attribute.specified) {
					// If the attribute has a namespace set the namespace 
					// otherwise it will be set to null
					if (attribute.namespaceURI) {
						copy.setAttributeNS(attribute.namespaceURI, attribute.nodeName || attribute.name, attribute.nodeValue || attribute.value);
					} else {
						copy.setAttribute(attribute.nodeName || attribute.name, attribute.nodeValue || attribute.value);
					}
				}
			}
		}

		if(node && node.firstChild) {
			var child = node.firstChild;

			while(child) {
				copy.appendChild( cloneNode(child) );
				child = child.nextSibling;
			}
		}

		return copy;
	};

function processNode(node, paths, location, document){
	var callback,
		loc = location,
		nodeType = typeof node,
		el,
		p,
		i , len;
	var getCallback = function(){
		if(!callback) {
			callback  = {
				path: location,
				callbacks: []
			};
			paths.push(callback);
			loc = [];
		}
		return callback;
	};

	if(nodeType === "object") {
		if( node.tag ) {
			if(namespacesWork && node.namespace) {
				el = document.createElementNS(node.namespace, node.tag);
			} else {
				el = document.createElement(node.tag);
			}

			if(node.attrs) {
				for(var attrName in node.attrs) {
					var value = node.attrs[attrName];
					if(typeof value === "function"){
						getCallback().callbacks.push({
							callback:  value
						});
					} else if (value !== null && typeof value === "object" && value.namespaceURI) {
						el.setAttributeNS(value.namespaceURI,attrName,value.value);
					} else {
						node_1.setAttribute.call(el, attrName, value);
					}
				}
			}
			if(node.attributes) {
				for(i = 0, len = node.attributes.length; i < len; i++ ) {
					getCallback().callbacks.push({callback: node.attributes[i]});
				}
			}
			if(node.children && node.children.length) {
				// add paths
				if(callback) {
					p = callback.paths = [];
				} else {
					p = paths;
				}

				el.appendChild( processNodes(node.children, p, loc, document) );
			}
		} else if(node.comment) {
			el = document.createComment(node.comment);

			if(node.callbacks) {
				for(i = 0, len = node.callbacks.length; i < len; i++ ) {
					getCallback().callbacks.push({callback: node.callbacks[i]});
				}
			}
		}


	} else if(nodeType === "string"){

		el = document.createTextNode(node);

	} else if(nodeType === "function") {

		if(keepsTextNodes) {
			el = document.createTextNode("");
			getCallback().callbacks.push({
				callback: node
			});
		} else {
			el = document.createComment("~");
			getCallback().callbacks.push({
				callback: function(){
					var el = document.createTextNode("");
					node_1.replaceChild.call(this.parentNode, el, this);
					return node.apply(el,arguments );
				}
			});
		}

	}
	return el;
}

function getCallbacks(el, pathData, elementCallbacks){
	var path = pathData.path,
		callbacks = pathData.callbacks,
		paths = pathData.paths,
		child = el,
		pathLength = path ? path.length : 0,
		pathsLength = paths ? paths.length : 0;

	for(var i = 0; i < pathLength; i++) {
		child = child.childNodes.item(path[i]);
	}

	for( i= 0 ; i < pathsLength; i++) {
		getCallbacks(child, paths[i], elementCallbacks);
	}

	elementCallbacks.push({element: child, callbacks: callbacks});
}

function hydrateCallbacks(callbacks, args) {
	var len = callbacks.length,
		callbacksLength,
		callbackElement,
		callbackData;

	for(var i = 0; i < len; i++) {
		callbackData = callbacks[i];
		callbacksLength = callbackData.callbacks.length;
		callbackElement = callbackData.element;
		for(var c = 0; c < callbacksLength; c++) {
			callbackData.callbacks[c].callback.apply(callbackElement, args);
		}
	}
}

function makeTarget(nodes, doc){
	var paths = [];
	var frag = processNodes(nodes, paths, [], doc || document$1());
	return {
		paths: paths,
		clone: frag,
		hydrate: function(){
			var cloned = cloneNode(this.clone);
			var args = [];
			for (var a = 0, ref = args.length = arguments.length; a < ref; a++) {
				args[a] = arguments[a];
			} // see https://jsperf.com/nodelist-to-array

			var callbacks = [];
			for(var i = 0; i < paths.length; i++) {
				getCallbacks(cloned, paths[i], callbacks);
			}
			hydrateCallbacks(callbacks, args);

			return cloned;
		}
	};
}
makeTarget.keepsTextNodes = keepsTextNodes;
makeTarget.cloneNode = cloneNode;

canNamespace.view = canNamespace.view || {};
var canViewTarget = canNamespace.view.target = makeTarget;

var queueState = {
	lastTask: null
};

/**
 * @module {function} can-assign can-assign
 * @parent can-js-utilities
 * @collection can-infrastructure
 * @signature `assign(target, source)`
 * @package ./package.json
 *
 * A simplified version of [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), which only accepts a single source argument.
 *
 * ```js
 * var assign = require("can-assign");
 *
 * var obj = {};
 *
 * assign(obj, {
 *   foo: "bar"
 * });
 *
 * console.log(obj.foo); // -> "bar"
 * ```
 *
 * @param {Object} target The destination object. This object's properties will be mutated based on the object provided as `source`.
 * @param {Object} source The source object whose own properties will be applied to `target`.
 *
 * @return {Object} Returns the `target` argument.
 */

var canAssign = canNamespace.assign = function (d, s) {
	for (var prop in s) {
		var desc = Object.getOwnPropertyDescriptor(d,prop);
		if(!desc || desc.writable !== false){
			d[prop] = s[prop];
		}
	}
	return d;
};

function noOperation () {}

var Queue = function ( name, callbacks ) {
	this.callbacks = canAssign( {
		onFirstTask: noOperation,
		// The default behavior is to clear the lastTask state.
		// This is overwritten by `can-queues.js`.
		onComplete: function () {
			queueState.lastTask = null;
		}
	}, callbacks || {});
	this.name = name;
	this.index = 0;
	this.tasks = [];
	this._log = false;
};

Queue.prototype.constructor = Queue;

Queue.noop = noOperation;

Queue.prototype.enqueue = function ( fn, context, args, meta ) {
	var len = this.tasks.push({
		fn: fn,
		context: context,
		args: args,
		meta: meta || {}
	});
	//!steal-remove-end

	if ( len === 1 ) {
		this.callbacks.onFirstTask( this );
	}
};

Queue.prototype.flush = function () {
	while ( this.index < this.tasks.length ) {
		var task = this.tasks[this.index++];

		//!steal-remove-end
		task.fn.apply( task.context, task.args );
	}
	this.index = 0;
	this.tasks = [];
	this.callbacks.onComplete( this );
};

Queue.prototype.log = function () {
	this._log = arguments.length ? arguments[0] : true;
};
//!steal-remove-end

var queue = Queue;

var PriorityQueue = function () {
	queue.apply( this, arguments );
	// A map of a task's function to the task for that function.
	// This is so we can prevent duplicate functions from being enqueued
	// and so `flushQueuedTask` can find the task and run it.
	this.taskMap = new Map();
	// An "array-of-arrays"-ish data structure that stores
	// each task organized by its priority.  Each object in this list
	// looks like `{tasks: [...], index: 0}` where:
	// - `tasks` - the tasks for a particular priority.
	// - `index` - the index of the task waiting to be prioritized.
	this.taskContainersByPriority = [];

	// The index within `taskContainersByPriority` of the first `taskContainer`
	// which has tasks that have not been run.
	this.curPriorityIndex = Infinity;
	// The index within `taskContainersByPriority` of the last `taskContainer`
	// which has tasks that have not been run.
	this.curPriorityMax = 0;

	this.isFlushing = false;

	// Manage the number of tasks remaining to keep
	// this lookup fast.
	this.tasksRemaining = 0;
};
PriorityQueue.prototype = Object.create( queue.prototype );
PriorityQueue.prototype.constructor = PriorityQueue;

PriorityQueue.prototype.enqueue = function ( fn, context, args, meta ) {
	// Only allow the enqueing of a given function once.
	if ( !this.taskMap.has( fn ) ) {

		this.tasksRemaining++;

		var isFirst = this.taskContainersByPriority.length === 0;

		var task = {
			fn: fn,
			context: context,
			args: args,
			meta: meta || {}
		};

		var taskContainer = this.getTaskContainerAndUpdateRange( task );
		taskContainer.tasks.push( task );
		this.taskMap.set( fn, task );
		//!steal-remove-end

		if ( isFirst ) {
			this.callbacks.onFirstTask( this );
		}
	}
};

// Given a task, updates the queue's cursors so that `flush`
// will be able to run the task.
PriorityQueue.prototype.getTaskContainerAndUpdateRange = function ( task ) {
	var priority = task.meta.priority || 0;

	if ( priority < this.curPriorityIndex ) {
		this.curPriorityIndex = priority;
	}

	if ( priority > this.curPriorityMax ) {
		this.curPriorityMax = priority;
	}

	var tcByPriority = this.taskContainersByPriority;
	var taskContainer = tcByPriority[priority];
	if ( !taskContainer ) {
		taskContainer = tcByPriority[priority] = {tasks: [], index: 0};
	}
	return taskContainer;
};

PriorityQueue.prototype.flush = function () {
	// Only allow one task to run at a time.
	if ( this.isFlushing ) {
		return;
	}
	this.isFlushing = true;
	while ( true ) {
		// If the first prioritized taskContainer with tasks remaining
		// is before the last prioritized taskContainer ...
		if ( this.curPriorityIndex <= this.curPriorityMax ) {
			var taskContainer = this.taskContainersByPriority[this.curPriorityIndex];

			// If that task container actually has tasks remaining ...
			if ( taskContainer && ( taskContainer.tasks.length > taskContainer.index ) ) {

				// Run the task.
				var task = taskContainer.tasks[taskContainer.index++];
				//!steal-remove-end
				this.tasksRemaining--;
				this.taskMap["delete"]( task.fn );
				task.fn.apply( task.context, task.args );

			} else {
				// Otherwise, move to the next taskContainer.
				this.curPriorityIndex++;
			}
		} else {
			// Otherwise, reset the state for the next `.flush()`.
			this.taskMap = new Map();
			this.curPriorityIndex = Infinity;
			this.curPriorityMax = 0;
			this.taskContainersByPriority = [];
			this.isFlushing = false;
			this.callbacks.onComplete( this );
			return;
		}
	}
};

PriorityQueue.prototype.isEnqueued = function ( fn ) {
	return this.taskMap.has( fn );
};

PriorityQueue.prototype.flushQueuedTask = function ( fn ) {
	var task = this.dequeue(fn);
	if(task) {
		//!steal-remove-end
		task.fn.apply( task.context, task.args );
	}
};
PriorityQueue.prototype.dequeue = function(fn){
	var task = this.taskMap.get( fn );
	if ( task ) {
		var priority = task.meta.priority || 0;
		var taskContainer = this.taskContainersByPriority[priority];
		var index = taskContainer.tasks.indexOf( task, taskContainer.index );

		if ( index >= 0 ) {
			taskContainer.tasks.splice( index, 1 );
			this.tasksRemaining--;
			this.taskMap["delete"]( task.fn );
			return task;
		} else {
			console.warn("Task", fn, "has already run");
		}
	}
};

PriorityQueue.prototype.tasksRemainingCount = function () {
	return this.tasksRemaining;
};

var priorityQueue = PriorityQueue;

// This queue does not allow another task to run until this one is complete
var CompletionQueue = function () {
	queue.apply( this, arguments );
	this.flushCount = 0;
};
CompletionQueue.prototype = Object.create( queue.prototype );
CompletionQueue.prototype.constructor = CompletionQueue;

CompletionQueue.prototype.flush = function () {
	if ( this.flushCount === 0 ) {
		this.flushCount ++;
		while ( this.index < this.tasks.length ) {
			var task = this.tasks[this.index++];
			//!steal-remove-end
			task.fn.apply( task.context, task.args );
		}
		this.index = 0;
		this.tasks = [];
		this.flushCount--;
		this.callbacks.onComplete( this );
	}
};

var completionQueue = CompletionQueue;

var sortedIndexBy = function(compare, array, value) {
	if (!array || !array.length) {
		return undefined;
	}
	// check the start and the end
	if (compare(value, array[0]) === -1) {
		return 0;
	} else if (compare(value, array[array.length - 1]) === 1) {
		return array.length;
	}
	var low = 0,
		high = array.length;

	// From lodash lodash 4.6.1 <https://lodash.com/>
	// Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	while (low < high) {
		var mid = (low + high) >>> 1,
			item = array[mid],
			computed = compare(value, item);
		if (computed === -1) {
			high = mid;
		} else {
			low = mid + 1;
		}
	}
	return high;
	// bisect by calling sortFunc
};

// Taken from jQuery
var hasDuplicate,
	sortInput,
	sortStable = true,
	indexOf = Array.prototype.indexOf;

function sortOrder( a, b ) {

	// Flag for duplicate removal
	if ( a === b ) {
		hasDuplicate = true;
		return 0;
	}

	// Sort on method existence if only one input has compareDocumentPosition
	var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
	if ( compare ) {
		return compare;
	}

	// Calculate position if both inputs belong to the same document
	compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
		a.compareDocumentPosition( b ) :

		// Otherwise we know they are disconnected
		1;

	// Disconnected nodes
	if ( compare & 1 ) {

		// Choose the first element that is related to our preferred document
		if ( a === document || a.ownerDocument === document &&
			document.documentElement.contains(a) ) {
			return -1;
		}
		if ( b === document || b.ownerDocument === document &&
			document.documentElement.contains(b) ) {
			return 1;
		}

		// Maintain original order
		return sortInput ?
			( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
			0;
	}

	return compare & 4 ? -1 : 1;
}

function uniqueSort( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	hasDuplicate = false;
	sortInput = !sortStable ;
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
}

var elementSort = {
	uniqueSort: uniqueSort,
	sortOrder: sortOrder
};

var canElementSymbol$1 = canSymbol.for("can.element");

// TODO: call sortable queue and take how it should be sorted ...
function sortTasks(taskA, taskB){
	// taskA - in the document?
	// taskA - given a number?
	//
	return elementSort.sortOrder(taskA.meta.element, taskB.meta.element);
}

var DomOrderQueue = function () {
	queue.apply( this, arguments );
	// A map of a task's function to the task for that function.
	// This is so we can prevent duplicate functions from being enqueued
	// and so `flushQueuedTask` can find the task and run it.
	this.taskMap = new Map();

	this.unsortable = [];
	this.isFlushing = false;
};
DomOrderQueue.prototype = Object.create( queue.prototype );
DomOrderQueue.prototype.constructor = DomOrderQueue;

DomOrderQueue.prototype.enqueue = function ( fn, context, args, meta ) {
	var task;
	// Only allow the enqueing of a given function once.
	if ( !this.taskMap.has( fn ) ) {

		if(!meta) {
			meta = {};
		}
		if(!meta.element) {
			meta.element = fn[canElementSymbol$1];
		}

		task = {
			fn: fn,
			context: context,
			args: args,
			meta: meta
		};
		//!steal-remove-end

		this.taskMap.set( fn, task );

		var index = sortedIndexBy(sortTasks, this.tasks, task);

		this.tasks.splice(index, 0, task);
		//!steal-remove-end

		if ( this.tasks.length === 1 ) {
			this.callbacks.onFirstTask( this );
		}
	} else {
		// update the task with the new data
		// TODO: ideally this would key off the mutation instead of the function.
		// We could make it key off the element and function,  not just function.
		task = this.taskMap.get( fn );
		task.context = context;
		task.args = args;

		if(!meta) {
			meta = {};
		}

		if(!meta.element) {
			meta.element = fn[canElementSymbol$1];
		}

		task.meta = meta;
		//!steal-remove-end
	}
};


DomOrderQueue.prototype.flush = function () {
	// Only allow one task to run at a time.
	if ( this.isFlushing ) {
		return;
	}
	this.isFlushing = true;

	while ( this.tasks.length ) {
		var task = this.tasks.shift();
		//!steal-remove-end
		this.taskMap["delete"]( task.fn );
		task.fn.apply( task.context, task.args );
	}
	this.isFlushing = false;
	this.callbacks.onComplete( this );
};

DomOrderQueue.prototype.isEnqueued = function ( fn ) {
	return this.taskMap.has( fn );
};

DomOrderQueue.prototype.flushQueuedTask = function ( fn ) {
	var task = this.dequeue(fn);
	if(task) {
		//!steal-remove-end
		task.fn.apply( task.context, task.args );
	}
};
DomOrderQueue.prototype.dequeue = function(fn){
	var task = this.taskMap.get( fn );
	if ( task ) {

		var index = this.tasks.indexOf(task);

		if ( index >= 0 ) {
			this.tasks.splice( index, 1 );
			this.taskMap["delete"]( task.fn );
			return task;
		} else {
			console.warn("Task", fn, "has already run");
		}
	}
};

DomOrderQueue.prototype.tasksRemainingCount = function () {
	return this.tasks.length;
};

var domOrderQueue = DomOrderQueue;

var canQueues = createCommonjsModule(function (module) {








// How many `batch.start` - `batch.stop` calls have been made.
var batchStartCounter = 0;
// If a task was added since the last flush caused by `batch.stop`.
var addedTask = false;

// Legacy values for the old batchNum.
var batchNum = 0;
var batchData;

// Used by `.enqueueByQueue` to know the property names that might be passed.
var queueNames = ["notify", "derive", "domUI", "dom","mutate"];
// Create all the queues so that when one is complete,
// the next queue is flushed.
var NOTIFY_QUEUE,
	DERIVE_QUEUE,
	DOM_UI_QUEUE,
	DOM_QUEUE,
	MUTATE_QUEUE;

// This is for immediate notification. This is where we teardown (remove childNodes)
// immediately.
NOTIFY_QUEUE = new queue( "NOTIFY", {
	onComplete: function () {
		DERIVE_QUEUE.flush();
	},
	onFirstTask: function () {
		// Flush right away if we aren't in a batch.
		if ( !batchStartCounter ) {
			NOTIFY_QUEUE.flush();
		} else {
			addedTask = true;
		}
	}
});

// For observations not connected to the DOM
DERIVE_QUEUE = new priorityQueue( "DERIVE", {
	onComplete: function () {
		DOM_QUEUE.flush();
	},
	onFirstTask: function () {
		addedTask = true;
	}
});

// DOM_DERIVE comes next so that any prior derives have a chance
// to settle before the derives that actually affect the DOM
// are re-caculated.
// See the `Child bindings are called before the parent` can-stache test.
// All stache-related observables should update in DOM order.

// Observations that are given an element update their value here.
DOM_QUEUE = new domOrderQueue( "DOM   " ,{
	onComplete: function () {
		DOM_UI_QUEUE.flush();
	},
	onFirstTask: function () {
		addedTask = true;
	}
});

// The old DOM_UI queue ... we should seek to remove this.
DOM_UI_QUEUE = new completionQueue( "DOM_UI", {
	onComplete: function () {
		MUTATE_QUEUE.flush();
	},
	onFirstTask: function () {
		addedTask = true;
	}
});

// Update
MUTATE_QUEUE = new queue( "MUTATE", {
	onComplete: function () {
		queueState.lastTask = null;
	},
	onFirstTask: function () {
		addedTask = true;
	}
});

var queues = {
	Queue: queue,
	PriorityQueue: priorityQueue,
	CompletionQueue: completionQueue,
	DomOrderQueue: domOrderQueue,
	notifyQueue: NOTIFY_QUEUE,
	deriveQueue: DERIVE_QUEUE,
	domQueue: DOM_QUEUE,
	domUIQueue: DOM_UI_QUEUE,
	mutateQueue: MUTATE_QUEUE,
	batch: {
		start: function () {
			batchStartCounter++;
			if ( batchStartCounter === 1 ) {
				batchNum++;
				batchData = {number: batchNum};
			}
		},
		stop: function () {
			batchStartCounter--;
			if ( batchStartCounter === 0 ) {
				if ( addedTask ) {
					addedTask = false;
					NOTIFY_QUEUE.flush();
				}
			}
		},
		// Legacy method to return if we are between start and stop calls.
		isCollecting: function () {
			return batchStartCounter > 0;
		},
		// Legacy method provide a number for each batch.
		number: function () {
			return batchNum;
		},
		// Legacy method to provide batch information.
		data: function () {
			return batchData;
		}
	},
	runAsTask: function(fn, reasonLog){
		//!steal-remove-end
		return fn;
	},
	enqueueByQueue: function enqueueByQueue ( fnByQueue, context, args, makeMeta, reasonLog ) {
		if ( fnByQueue ) {
			queues.batch.start();
			// For each queue, check if there are tasks for it.
			queueNames.forEach( function ( queueName ) {
				var name = queueName + "Queue";
				var QUEUE = queues[name];
				var tasks = fnByQueue[queueName];
				if ( tasks !== undefined ) {
					// For each task function, setup the meta and enqueue it.
					tasks.forEach( function ( fn ) {
						var meta = makeMeta != null ? makeMeta( fn, context, args ) : {};
						meta.reasonLog = reasonLog;
						QUEUE.enqueue( fn, context, args, meta );
					});
				}
			});
			queues.batch.stop();
		}
	},
	lastTask: function(){
		return queueState.lastTask;
	},
	// Currently an internal method that provides the task stack.
	// Returns an array with the first task as the first item.
	stack: function (task) {
		var current = task || queueState.lastTask;
		var stack = [];
		while ( current ) {
			stack.unshift( current );
			// Queue.prototype._logEnqueue ensures
			// that the `parentTask` is always set.
			current = current.meta.parentTask;
		}
		return stack;
	},
	logStack: function (task) {
		var stack = this.stack(task);
		stack.forEach( function ( task, i ) {
			var meta = task.meta;
			if( i === 0 && meta && meta.reasonLog) {
				dev.log.apply( dev, meta.reasonLog);
			}
			var log = meta && meta.log ? meta.log : [task.fn.name, task];
			dev.log.apply( dev, [task.meta.stack.name + " ran task:"].concat( log ));
		});
	},
	// A method that is not used.  It should return the number of tasks
	// remaining, but doesn't seem to actually work.
	taskCount: function () {
		return NOTIFY_QUEUE.tasks.length + DERIVE_QUEUE.tasks.length + DOM_UI_QUEUE.tasks.length + MUTATE_QUEUE.tasks.length;
	},
	// A shortcut for flushign the notify queue.  `batch.start` and `batch.stop` should be
	// used instead.
	flush: function () {
		NOTIFY_QUEUE.flush();
	},
	log: function () {
		NOTIFY_QUEUE.log.apply( NOTIFY_QUEUE, arguments );
		DERIVE_QUEUE.log.apply( DERIVE_QUEUE, arguments );
		DOM_UI_QUEUE.log.apply( DOM_UI_QUEUE, arguments );
		DOM_QUEUE.log.apply( DOM_QUEUE, arguments );
		MUTATE_QUEUE.log.apply( MUTATE_QUEUE, arguments );
	}
};

if ( canNamespace.queues ) {
	throw new Error( "You can't have two versions of can-queues, check your dependencies" );
} else {
	module.exports = canNamespace.queues = queues;
}
});

// ## Helpers
// The following implement helper functions useful to `can-key-tree`'s main methods.

// ### isBuiltInPrototype
// Returns if `obj` is the prototype of a built-in JS type like `Map`.
// Built in types' `toString` returns `[object TYPENAME]`.
function isBuiltInPrototype ( obj ) {
	if ( obj === Object.prototype ) {
		return true;
	}
	var protoString = Object.prototype.toString.call( obj );
	var isNotObjObj = protoString !== '[object Object]';
	var isObjSomething = protoString.indexOf( '[object ' ) !== -1;
	return isNotObjObj && isObjSomething;
}

// ### getDeepSize
// Recursively returns the number of leaf values below `root` node.
function getDeepSize ( root, level ) {
	if ( level === 0 ) {
		return canReflect.size( root );
	} else if ( canReflect.size( root ) === 0 ) {
		return 0;
	} else {
		var count = 0;
		canReflect.each( root, function ( value ) {
			count += getDeepSize( value, level - 1 );
		});
		return count;
	}
}

// ### getDeep
// Adds all leaf values under `node` to `items`.
// `depth` is how deep `node` is in the tree.
// `maxDepth` is the total depth of the tree structure.
function getDeep ( node, items, depth, maxDepth ) {
	if ( !node ) {
		return;
	}
	if ( maxDepth === depth ) {
		if ( canReflect.isMoreListLikeThanMapLike( node ) ) {
			canReflect.addValues( items, canReflect.toArray( node ) );
		} else {
			throw new Error( "can-key-tree: Map-type leaf containers are not supported yet." );
		}
	} else {
		canReflect.each( node, function ( value ) {
			getDeep( value, items, depth + 1, maxDepth );
		});
	}
}

// ### clearDeep
// Recursively removes value from all child nodes of `node`.
function clearDeep ( node, keys, maxDepth, deleteHandler ) {
	if ( maxDepth === keys.length ) {
		if ( canReflect.isMoreListLikeThanMapLike( node ) ) {
			var valuesToRemove = canReflect.toArray( node );
			if(deleteHandler) {
				valuesToRemove.forEach(function(value){
					deleteHandler.apply(null, keys.concat(value));
				});
			}
			canReflect.removeValues( node, valuesToRemove );
		} else {
			throw new Error( "can-key-tree: Map-type leaf containers are not supported yet." );
		}
	} else {
		canReflect.each( node, function ( value, key ) {
			clearDeep( value, keys.concat(key), maxDepth, deleteHandler );
			canReflect.deleteKeyValue( node, key );
		});
	}
}

// ## KeyTree
// Creates an instance of the KeyTree.
var KeyTree = function ( treeStructure, callbacks ) {
	var FirstConstructor = treeStructure[0];
	if ( canReflect.isConstructorLike( FirstConstructor ) ) {
		this.root = new FirstConstructor();
	} else {
		this.root = FirstConstructor;
	}
	this.callbacks = callbacks || {};
	this.treeStructure = treeStructure;
	// An extra bit of state held for performance
	this.empty = true;
};

// ## Methods
canReflect.assign(KeyTree.prototype,{
    // ### Add
    add: function ( keys ) {
    	if ( keys.length > this.treeStructure.length ) {
    		throw new Error( "can-key-tree: Can not add path deeper than tree." );
    	}
        // The place we will add the final leaf value.
    	var place = this.root;

        // Record if the root was empty so we know to call `onFirst`.
    	var rootWasEmpty = this.empty === true;

        // For each key, try to get the corresponding childNode.
        for ( var i = 0; i < keys.length - 1; i++ ) {
    		var key = keys[i];
    		var childNode = canReflect.getKeyValue( place, key );
    		if ( !childNode ) {
                // If there is no childNode, create it and add it to the parent node.
    			var Constructor = this.treeStructure[i + 1];
    			if ( isBuiltInPrototype( Constructor.prototype ) ) {
    				childNode = new Constructor();
    			} else {
    				childNode = new Constructor( key );
    			}
    			canReflect.setKeyValue( place, key, childNode );
    		}
    		place = childNode;
    	}

        // Add the final leaf value in the tree.
    	if ( canReflect.isMoreListLikeThanMapLike( place ) ) {
    		canReflect.addValues( place, [keys[keys.length - 1]] );
    	} else {
    		throw new Error( "can-key-tree: Map types are not supported yet." );
    	}

        // Callback `onFirst` if appropriate.
    	if ( rootWasEmpty ) {
			this.empty = false;
			if(this.callbacks.onFirst) {
				this.callbacks.onFirst.call( this );
			}

    	}

    	return this;
    },
    // ### getNode
    getNode: function ( keys ) {
        var node = this.root;
        // For each key, try to read the child node.
        // If a child is not found, return `undefined`.
        for ( var i = 0; i < keys.length; i++ ) {
            var key = keys[i];
            node = canReflect.getKeyValue( node, key );
            if ( !node ) {
                return;
            }
        }
        return node;
    },
    // ### get
    get: function ( keys ) {
        // Get the node specified by keys.
    	var node = this.getNode( keys );

        // If it's a leaf, return it.
    	if ( this.treeStructure.length === keys.length ) {
    		return node;
    	} else {
    		// Otherwise, create a container for leaf values and
            // recursively walk the node's children.
    		var Type = this.treeStructure[this.treeStructure.length - 1];
    		var items = new Type();
    		getDeep( node, items, keys.length, this.treeStructure.length - 1 );
    		return items;
    	}
    },
    // ### delete
    delete: function ( keys, deleteHandler ) {

        // `parentNode` will eventually be the parent nodde of the
        // node specified by keys.
        var parentNode = this.root,
            // The nodes traversed to the node specified by `keys`.
            path = [this.root],
            lastKey = keys[keys.length - 1];

        // Set parentNode to the node specified by keys
        // and record the nodes in `path`.
        for ( var i = 0; i < keys.length - 1; i++ ) {
    		var key = keys[i];
    		var childNode = canReflect.getKeyValue( parentNode, key );
    		if ( childNode === undefined ) {
    			return false;
    		} else {
    			path.push( childNode );
    		}
    		parentNode = childNode;
    	}


        // Depending on which keys were specified and the content of the
        // key, do various cleanups ...
        if ( !keys.length ) {
            // If there are no keys, recursively clear the entire tree.
    		clearDeep( parentNode, [], this.treeStructure.length - 1, deleteHandler );
    	}
        else if ( keys.length === this.treeStructure.length ) {
            // If removing a leaf, remove that value.
    		if ( canReflect.isMoreListLikeThanMapLike( parentNode ) ) {
				if(deleteHandler) {
					deleteHandler.apply(null, keys.concat(lastKey));
				}
    			canReflect.removeValues( parentNode, [lastKey] );
    		} else {
    			throw new Error( "can-key-tree: Map types are not supported yet." );
    		}
    	}
        else {
            // If removing a node 'within' the tree, recursively clear
            // that node and then delete the key from parent to node.
            var nodeToRemove = canReflect.getKeyValue( parentNode, lastKey );
    		if ( nodeToRemove !== undefined ) {
    			clearDeep( nodeToRemove, keys, this.treeStructure.length - 1, deleteHandler );
    			canReflect.deleteKeyValue( parentNode, lastKey );
    		} else {
    			return false;
    		}
    	}

        // After deleting the node, check if its parent is empty and
        // recursively prune parent nodes that are now empty.
    	for ( i = path.length - 2; i >= 0; i-- ) {
    		if ( canReflect.size( parentNode ) === 0 ) {
    			parentNode = path[i];
    			canReflect.deleteKeyValue( parentNode, keys[i] );
    		} else {
    			break;
    		}
    	}
        // Call `onEmpty` if the tree is now empty.
    	if (  canReflect.size( this.root ) === 0 ) {
			this.empty = true;
			if(this.callbacks.onEmpty) {
				this.callbacks.onEmpty.call( this );
			}
    	}
    	return true;
    },
    // ### size
    // Recursively count the number of leaf values.
    size: function () {
    	return getDeepSize( this.root, this.treeStructure.length - 1 );
    },
	isEmpty: function(){
		return this.empty;
	}
});

var canKeyTree = KeyTree;

var getKeyValueSymbol = canSymbol.for("can.getKeyValue"),
	observeDataSymbol = canSymbol.for("can.meta");

var promiseDataPrototype = {
	isPending: true,
	state: "pending",
	isResolved: false,
	isRejected: false,
	value: undefined,
	reason: undefined
};

function setVirtualProp(promise, property, value) {
	var observeData = promise[observeDataSymbol];
	var old = observeData[property];
	observeData[property] = value;
	canQueues.enqueueByQueue(observeData.handlers.getNode([property]), promise, [value,old], function() {
		return {};
	},["Promise", promise, "resolved with value", value, "and changed virtual property: "+property]);
}

function initPromise(promise) {
	var observeData = promise[observeDataSymbol];
	if(!observeData) {
		Object.defineProperty(promise, observeDataSymbol, {
			enumerable: false,
			configurable: false,
			writable: false,
			value: Object.create(promiseDataPrototype)
		});
		observeData = promise[observeDataSymbol];
		observeData.handlers = new canKeyTree([Object, Object, Array]);
	}
	promise.then(function(value){
		canQueues.batch.start();
		setVirtualProp(promise, "isPending", false);
		setVirtualProp(promise, "isResolved", true);
		setVirtualProp(promise, "value", value);
		setVirtualProp(promise, "state", "resolved");
		canQueues.batch.stop();
	}, function(reason){
		canQueues.batch.start();
		setVirtualProp(promise, "isPending", false);
		setVirtualProp(promise, "isRejected", true);
		setVirtualProp(promise, "reason", reason);
		setVirtualProp(promise, "state", "rejected");
		canQueues.batch.stop();
		//!steal-remove-end
	});
}

function setupPromise(value) {
	var oldPromiseFn;
	var proto = "getPrototypeOf" in Object ? Object.getPrototypeOf(value) : value.__proto__; //jshint ignore:line

	if(value[getKeyValueSymbol] && value[observeDataSymbol]) {
		// promise has already been set up.  Don't overwrite.
		return;
	}

	if(proto === null || proto === Object.prototype) {
		// promise type is a plain object or dictionary.  Set up object instead of proto.
		proto = value;

		if(typeof proto.promise === "function") {
			// Duck-type identification as a jQuery.Deferred;
			// In that case, the promise() function returns a new object
			//  that needs to be decorated.
			oldPromiseFn = proto.promise;
			proto.promise = function() {
				var result = oldPromiseFn.call(proto);
				setupPromise(result);
				return result;
			};
		}
	}

	canReflect.assignSymbols(proto, {
		"can.getKeyValue": function(key) {
			if(!this[observeDataSymbol]) {
				initPromise(this);
			}

			canObservationRecorder.add(this, key);
			switch(key) {
				case "state":
				case "isPending":
				case "isResolved":
				case "isRejected":
				case "value":
				case "reason":
				return this[observeDataSymbol][key];
				default:
				return this[key];
			}
		},
		"can.getValue": function() {
			return this[getKeyValueSymbol]("value");
		},
		"can.isValueLike": false,
		"can.onKeyValue": function(key, handler, queue) {
			if(!this[observeDataSymbol]) {
				initPromise(this);
			}
			this[observeDataSymbol].handlers.add([key, queue || "mutate", handler]);
		},
		"can.offKeyValue": function(key, handler, queue) {
			if(!this[observeDataSymbol]) {
				initPromise(this);
			}
			this[observeDataSymbol].handlers.delete([key, queue || "mutate", handler]);
		},
		"can.hasOwnKey": function(key) {
			if (!this[observeDataSymbol]) {
				initPromise(this);
			}
			return (key in this[observeDataSymbol]);
		}
	});
}

var canReflectPromise = setupPromise;

var getValueSymbol$1 = canSymbol.for("can.getValue");
var setValueSymbol$1 = canSymbol.for("can.setValue");

var isValueLikeSymbol = canSymbol.for("can.isValueLike");
var peek$1 = canObservationRecorder.ignore(canReflect.getKeyValue.bind(canReflect));
var observeReader;
var isPromiseLike = canObservationRecorder.ignore(function isPromiseLike(value){
	return typeof value === "object" && value && typeof value.then === "function";
});

var bindName = Function.prototype.bind;
//!steal-remove-end

var isAt = function(index, reads) {
	var prevRead = reads[index-1];
	return prevRead && prevRead.at;
};

var readValue = function(value, index, reads, options, state, prev){
	// if the previous read is AT false ... we shouldn't be doing this;
	var usedValueReader;
	do {

		usedValueReader = false;
		for(var i =0, len = observeReader.valueReaders.length; i < len; i++){
			if( observeReader.valueReaders[i].test(value, index, reads, options) ) {
				value = observeReader.valueReaders[i].read(value, index, reads, options, state, prev);
				//usedValueReader = true;
			}
		}
	} while(usedValueReader);

	return value;
};

var checkForObservableAndNotify = function(options, state, getObserves, value, index){
	if(options.foundObservable && !state.foundObservable) {
		if(canObservationRecorder.trapsCount()) {
			canObservationRecorder.addMany( getObserves() );
			options.foundObservable(value, index);
			state.foundObservable = true;
		}
	}
};

var objHasKeyAtIndex = function(obj, reads, index) {
	return !!(
		reads && reads.length &&
		canReflect.hasKey(obj, reads[index].key)
	);
};

observeReader = {
	// there are things that you need to evaluate when you get them back as a property read
	// for example a compute or a function you might need to call to get the next value to
	// actually check
	// - readCompute - can be set to `false` to prevent reading an ending compute.  This is used by component to get a
	//   compute as a delegate.  In 3.0, this should be removed and force people to write "{@prop} change"
	// - callMethodsOnObservables - this is an overwrite ... so normal methods won't be called, but observable ones will.
	// - executeAnonymousFunctions - call a function if it's found, defaults to true
	// - proxyMethods - if the last read is a method, return a function so `this` will be correct.
	// - args - arguments to call functions with.
	//
	// Callbacks
	// - earlyExit - called if a value could not be found
	// - foundObservable - called when an observable value is found
	read: function (parent, reads, options) {
		options = options || {};
		var state = {
			foundObservable: false
		};
		var getObserves;
		if(options.foundObservable) {
			getObserves = canObservationRecorder.trap();
		}

		// `cur` is the current value.
		var cur = readValue(parent, 0, reads, options, state),
			// `prev` is the object we are reading from.
			prev,
			// `foundObs` did we find an observable.
			readLength = reads.length,
			i = 0,
			parentHasKey;

		checkForObservableAndNotify(options, state, getObserves, parent, 0);

		while( i < readLength ) {
			prev = cur;
			// try to read the property
			for(var r=0, readersLength = observeReader.propertyReaders.length; r < readersLength; r++) {
				var reader = observeReader.propertyReaders[r];
				if(reader.test(cur)) {
					cur = reader.read(cur, reads[i], i, options, state);
					break; // there can be only one reading of a property
				}
			}
			checkForObservableAndNotify(options, state, getObserves, prev, i);
			i = i+1;
			// read the value if it is a compute or function
			cur = readValue(cur, i, reads, options, state, prev);

			checkForObservableAndNotify(options, state, getObserves, prev, i-1);
			// early exit if need be
			if (i < reads.length && (cur === null || cur === undefined )) {
				parentHasKey = objHasKeyAtIndex(prev, reads, i - 1);
				if (options.earlyExit && !parentHasKey) {
					options.earlyExit(prev, i - 1, cur);
				}
				// return undefined so we know this isn't the right value
				return {
					value: undefined,
					parent: prev,
					parentHasKey: parentHasKey,
					foundLastParent: false
				};
			}

		}

		parentHasKey = objHasKeyAtIndex(prev, reads, reads.length - 1);
		// if we don't have a value, exit early.
		if (cur === undefined && !parentHasKey) {
			if (options.earlyExit) {
				options.earlyExit(prev, i - 1);
			}
		}
		return {
			value: cur,
			parent: prev,
			parentHasKey: parentHasKey,
			foundLastParent: true
		};
	},
	get: function(parent, reads, options){
		return observeReader.read(parent, observeReader.reads(reads), options || {}).value;
	},
	valueReadersMap: {},
	// an array of types that might have a value inside them like functions
	// value readers check the current value
	// and get a new value from it
	// ideally they would keep calling until
	// none of these passed
	valueReaders: [
		{
			name: "function",
			// if this is a function before the last read and its not a constructor function
			test: function(value){
				return value && canReflect.isFunctionLike(value) && !canReflect.isConstructorLike(value);
			},
			read: function(value, i, reads, options, state, prev){
				if(options.callMethodsOnObservables && canReflect.isObservableLike(prev) && canReflect.isMapLike(prev)) {
					dev.warn("can-stache-key: read() called with `callMethodsOnObservables: true`.");

					return value.apply(prev, options.args || []);
				}

				return options.proxyMethods !== false ? bindName.call(value, prev) : value;
			}
		},
		{
			name: "isValueLike",
			// compute value reader
			test: function(value, i, reads, options) {
				return value && value[getValueSymbol$1] && value[isValueLikeSymbol] !== false && (options.foundAt || !isAt(i, reads) );
			},
			read: function(value, i, reads, options){
				if(options.readCompute === false && i === reads.length ) {
					return value;
				}
				return canReflect.getValue(value);
			},
			write: function(base, newVal){
				if(base[setValueSymbol$1]) {
					base[setValueSymbol$1](newVal);
				} else if(base.set) {
					base.set(newVal);
				} else {
					base(newVal);
				}
			}
		}],
	propertyReadersMap: {},
	// an array of things that might have a property
	propertyReaders: [
		{
			name: "map",
			test: function(value){
				// the first time we try reading from a promise, set it up for
				//  special reflections.
				if(canReflect.isPromise(value) ||
					isPromiseLike(value)) {
					canReflectPromise(value);
				}

				return canReflect.isObservableLike(value) && canReflect.isMapLike(value);
			},
			read: function(value, prop){
				var res = canReflect.getKeyValue(value, prop.key);
				if(res !== undefined) {
					return res;
				} else {
					return value[prop.key];
				}
			},
			write: canReflect.setKeyValue
		},

		// read a normal object
		{
			name: "object",
			// this is the default
			test: function(){return true;},
			read: function(value, prop, i, options){
				if(value == null) {
					return undefined;
				} else {
					if(typeof value === "object") {
						if(prop.key in value) {
							return value[prop.key];
						}
						//!steal-remove-end
					} else {
						return value[prop.key];
					}
				}
			},
			write: function(base, prop, newVal){
				var propValue = base[prop];
				// if newVal is observable object, lets try to update
				if(newVal != null && typeof newVal === "object" && canReflect.isMapLike(propValue) ) {
					dev.warn("can-stache-key: Merging data into \"" + prop + "\" because its parent is non-observable");
					canReflect.update(propValue, newVal);
				} else if(propValue != null && propValue[setValueSymbol$1] !== undefined){
					canReflect.setValue(propValue, newVal);
				} else {
					base[prop] = newVal;
				}
			}
		}
	],
	reads: function(keyArg) {
		var key = ""+keyArg;
		var keys = [];
		var last = 0;
		var at = false;
		if( key.charAt(0) === "@" ) {
			last = 1;
			at = true;
		}
		var keyToAdd = "";
		for(var i = last; i < key.length; i++) {
			var character = key.charAt(i);
			if(character === "." || character === "@") {
				if( key.charAt(i -1) !== "\\" ) {
					keys.push({
						key: keyToAdd,
						at: at
					});
					at = character === "@";
					keyToAdd = "";
				} else {
					keyToAdd = keyToAdd.substr(0,keyToAdd.length - 1) + ".";
				}
			} else {
				keyToAdd += character;
			}
		}
		keys.push({
			key: keyToAdd,
			at: at
		});

		return keys;
	},
	// This should be able to set a property similar to how read works.
	write: function(parent, key, value, options) {
		var keys = typeof key === "string" ? observeReader.reads(key) : key;
		var last;

		options = options || {};
		if(keys.length > 1) {
			last = keys.pop();
			parent = observeReader.read(parent, keys, options).value;
			keys.push(last);
		} else {
			last = keys[0];
		}
		if(!parent) {
			return;
		}
		var keyValue = peek$1(parent, last.key);
		// here's where we need to figure out the best way to write

		// if property being set points at a compute, set the compute
		if( observeReader.valueReadersMap.isValueLike.test(keyValue, keys.length - 1, keys, options) ) {
			observeReader.valueReadersMap.isValueLike.write(keyValue, value, options);
		} else {
			if(observeReader.valueReadersMap.isValueLike.test(parent, keys.length - 1, keys, options) ) {
				parent = parent[getValueSymbol$1]();
			}
			if(observeReader.propertyReadersMap.map.test(parent)) {
				observeReader.propertyReadersMap.map.write(parent, last.key, value, options);
			}
			else if(observeReader.propertyReadersMap.object.test(parent)) {
				observeReader.propertyReadersMap.object.write(parent, last.key, value, options);
				if(options.observation) {
					options.observation.update();
				}
			}
		}
	}
};
observeReader.propertyReaders.forEach(function(reader){
	observeReader.propertyReadersMap[reader.name] = reader;
});
observeReader.valueReaders.forEach(function(reader){
	observeReader.valueReadersMap[reader.name] = reader;
});
observeReader.set = observeReader.write;

var canStacheKey = observeReader;

var inSetupSymbol$1 = canSymbol.for("can.initializing");

//!steal-remove-start
var constructorNameRegex; 
//!steal-remove-end

// ## construct.js
// `Construct`
// _This is a modified version of
// [John Resig's class](http://ejohn.org/blog/simple-javascript-inheritance/).
// It provides class level inheritance and callbacks._
// A private flag used to initialize a new class instance without
// initializing it's bindings.
var initializing = 0;

//!steal-remove-start
var namedCtor; 
//!steal-remove-end

/**
 * @add can-construct
 */
var Construct = function () {
	if (arguments.length) {
		return Construct.extend.apply(Construct, arguments);
	}
};

var canGetDescriptor;
try {
	Object.getOwnPropertyDescriptor({});
	canGetDescriptor = true;
} catch(e) {
	canGetDescriptor = false;
}

var getDescriptor = function(newProps, name) {
		var descriptor = Object.getOwnPropertyDescriptor(newProps, name);
		if(descriptor && (descriptor.get || descriptor.set)) {
			return descriptor;
		}
		return null;
	},
	inheritGetterSetter = function(newProps, oldProps, addTo) {
		addTo = addTo || newProps;
		var descriptor;

		for (var name in newProps) {
			if( (descriptor = getDescriptor(newProps, name)) ) {
				this._defineProperty(addTo, oldProps, name, descriptor);
			} else {
				Construct._overwrite(addTo, oldProps, name, newProps[name]);
			}
		}
	},
	simpleInherit = function (newProps, oldProps, addTo) {
		addTo = addTo || newProps;

		for (var name in newProps) {
			Construct._overwrite(addTo, oldProps, name, newProps[name]);
		}
	},
	defineNonEnumerable$1 = function(obj, prop, value) {
		Object.defineProperty(obj, prop, {
			configurable: true,
			writable: true,
			enumerable: false,
			value: value
		});
	};
/**
 * @static
 */
canReflect.assignMap(Construct, {
	/**
	 * @property {Boolean} can-construct.constructorExtends constructorExtends
	 * @parent can-construct.static
	 *
	 * @description
	 * Toggles the behavior of a constructor function called
	 * without the `new` keyword to extend the constructor function or
	 * create a new instance.
	 *
	 * ```js
	 * var animal = Animal();
	 * // vs
	 * var animal = new Animal();
	 * ```
	 *
	 * @body
	 *
	 * If `constructorExtends` is:
	 *
	 *  - `true` - the constructor extends
	 *  - `false` - a new instance of the constructor is created
	 *
	 * This property defaults to false.
	 *
	 * Example of constructExtends as `true`:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   constructorExtends: true // the constructor extends
	 * },{
	 *   sayHi: function() {
	 *     console.log("hai!");
	 *   }
	 * });
	 *
	 * var Pony = Animal({
	 *   gallop: function () {
	 *      console.log("Galloping!!");
	 *   }
	 * }); // Pony is now a constructor function extended from Animal
	 *
	 * var frank = new Animal(); // frank is a new instance of Animal
	 *
	 * var gertrude = new Pony(); // gertrude is a new instance of Pony
	 * gertrude.sayHi(); // "hai!" - sayHi is "inherited" from Animal
	 * gertrude.gallop(); // "Galloping!!" - gallop is unique to instances of Pony
	 *```
	 *
	 * The default behavior is shown in the example below:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   constructorExtends: false // the constructor does NOT extend
	 * },{
	 *   sayHi: function() {
	 *     console.log("hai!");
	 *   }
	 * });
	 *
	 * var pony = Animal(); // pony is a new instance of Animal
	 * var frank = new Animal(); // frank is a new instance of Animal
	 *
	 * pony.sayHi() // "hai!"
	 * frank.sayHi() // "hai!"
	 *```
	 * By default to extend a constructor, you must use [can-construct.extend extend].
	 */
	constructorExtends: true,
	/**
	 * @function can-construct.newInstance newInstance
	 * @parent can-construct.static
	 *
	 * @description Returns an instance of `Construct`. This method
	 * can be overridden to return a cached instance.
	 *
	 * @signature `Construct.newInstance([...args])`
	 *
	 * @param {*} [args] arguments that get passed to [can-construct::setup] and [can-construct::init]. Note
	 * that if [can-construct::setup] returns an array, those arguments will be passed to [can-construct::init]
	 * instead.
	 * @return {class} instance of the class
	 *
	 * @body
	 * Creates a new instance of the constructor function. This method is useful for creating new instances
	 * with arbitrary parameters. Typically, however, you will simply want to call the constructor with the
	 * __new__ operator.
	 *
	 * ## Example
	 *
	 * The following creates a `Person` Construct and overrides `newInstance` to cache all
	 * instances of Person to prevent duplication. If the properties of a new Person match an existing one it
	 * will return a reference to the previously created object, otherwise it returns a new object entirely.
	 *
	 * ```js
	 * // define and create the Person constructor
	 * var Person = Construct.extend({
	 *   init : function(first, middle, last) {
	 *     this.first = first;
	 *     this.middle = middle;
	 *     this.last = last;
	 *   }
	 * });
	 *
	 * // store a reference to the original newInstance function
	 * var _newInstance = Person.newInstance;
	 *
	 * // override Person's newInstance function
	 * Person.newInstance = function() {
	 *   // if cache does not exist make it an new object
	 *   this.__cache = this.__cache || {};
	 *   // id is a stingified version of the passed arguments
	 *   var id = JSON.stringify(arguments);
	 *
	 *   // look in the cache to see if the object already exists
	 *   var cachedInst = this.__cache[id];
	 *   if(cachedInst) {
	 *     return cachedInst;
	 *   }
	 *
	 *   //otherwise call the original newInstance function and return a new instance of Person.
	 *   var newInst = _newInstance.apply(this, arguments);
	 *   this.__cache[id] = newInst;
	 *   return newInst;
	 * };
	 *
	 * // create two instances with the same arguments
	 * var justin = new Person('Justin', 'Barry', 'Meyer'),
	 *		brian = new Person('Justin', 'Barry', 'Meyer');
	 *
	 * console.log(justin === brian); // true - both are references to the same instance
	 * ```
	 *
	 */
	newInstance: function () {
		// Get a raw instance object (`init` is not called).
		var inst = this.instance(),
			args;
		// Call `setup` if there is a `setup`
		if (inst.setup) {
			Object.defineProperty(inst,"__inSetup",{
				configurable: true,
				enumerable: false,
				value: true,
				writable: true
			});
			Object.defineProperty(inst, inSetupSymbol$1, {
				configurable: true,
				enumerable: false,
				value: true,
				writable: true
			});
			args = inst.setup.apply(inst, arguments);
			if (args instanceof Construct.ReturnValue){
				return args.value;
			}
			inst.__inSetup = false;
			inst[inSetupSymbol$1] = false;
		}
		// Call `init` if there is an `init`
		// If `setup` returned `args`, use those as the arguments
		if (inst.init) {
			inst.init.apply(inst, args || arguments);
		}
		return inst;
	},
	// Overwrites an object with methods. Used in the `super` plugin.
	// `newProps` - New properties to add.
	// `oldProps` - Where the old properties might be (used with `super`).
	// `addTo` - What we are adding to.
	_inherit: canGetDescriptor ? inheritGetterSetter : simpleInherit,

	// Adds a `defineProperty` with the given name and descriptor
	// Will only ever be called if ES5 is supported
	_defineProperty: function(what, oldProps, propName, descriptor) {
		Object.defineProperty(what, propName, descriptor);
	},

	// used for overwriting a single property.
	// this should be used for patching other objects
	// the super plugin overwrites this
	_overwrite: function (what, oldProps, propName, val) {
		Object.defineProperty(what, propName, {value: val, configurable: true, enumerable: true, writable: true});
	},
	// Set `defaults` as the merger of the parent `defaults` and this
	// object's `defaults`. If you overwrite this method, make sure to
	// include option merging logic.
	/**
	 * @function can-construct.setup setup
	 * @parent can-construct.static
	 *
	 * @description Perform initialization logic for a constructor function.
	 *
	 * @signature `Construct.setup(base, fullName, staticProps, protoProps)`
	 *
	 * A static `setup` method provides inheritable setup functionality
	 * for a Constructor function. The following example
	 * creates a Group constructor function.  Any constructor
	 * functions that inherit from Group will be added to
	 * `Group.childGroups`.
	 *
	 * ```js
	 * Group = Construct.extend({
	 *   setup: function(Construct, fullName, staticProps, protoProps){
	 *     this.childGroups = [];
	 *     if(Construct !== Construct){
	 *       this.childGroups.push(Construct)
	 *     }
	 *     Construct.setup.apply(this, arguments)
	 *   }
	 * },{})
	 * var Flock = Group.extend(...)
	 * Group.childGroups[0] //-> Flock
	 * ```
	 * @param {constructor} base The base constructor that is being inherited from.
	 * @param {String} fullName The name of the new constructor.
	 * @param {Object} staticProps The static properties of the new constructor.
	 * @param {Object} protoProps The prototype properties of the new constructor.
	 *
	 * @body
	 * The static `setup` method is called immediately after a constructor
	 * function is created and
	 * set to inherit from its base constructor. It is useful for setting up
	 * additional inheritance work.
	 * Do not confuse this with the prototype `[can-construct::setup]` method.
	 *
	 * ## Example
	 *
	 * This `Parent` class adds a reference to its base class to itself, and
	 * so do all the classes that inherit from it.
	 *
	 * ```js
	 * Parent = Construct.extend({
	 *   setup : function(base, fullName, staticProps, protoProps){
	 *     this.base = base;
	 *
	 *     // call base functionality
	 *     Construct.setup.apply(this, arguments)
	 *   }
	 * },{});
	 *
	 * Parent.base; // Construct
	 *
	 * Child = Parent({});
	 *
	 * Child.base; // Parent
	 * ```
	 */
	setup: function (base) {
		var defaults = base.defaults ? canReflect.serialize(base.defaults) : {};
		this.defaults = canReflect.assignDeepMap(defaults,this.defaults);
	},
	// Create's a new `class` instance without initializing by setting the
	// `initializing` flag.
	instance: function () {
		// Prevents running `init`.
		initializing = 1;
		var inst = new this();
		// Allow running `init`.
		initializing = 0;
		return inst;
	},
	// Extends classes.
	/**
	 * @function can-construct.extend extend
	 * @parent can-construct.static
	 *
	 * @signature `Construct.extend([name,] [staticProperties,] instanceProperties)`
	 *
	 * Extends `Construct`, or constructor functions derived from `Construct`,
	 * to create a new constructor function. Example:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   sayHi: function(){
	 *     console.log("hi")
	 *   }
	 * });
	 *
	 * var animal = new Animal()
	 * animal.sayHi();
	 * ```
	 *
	 * @param {String} [name] Adds a name to the constructor function so
	 * it is nicely labeled in the developer tools. The following:
	 *
	 *     Construct.extend("ConstructorName",{})
	 *
	 * returns a constructur function that will show up as `ConstructorName`
	 * in the developer tools.
	 * It also sets "ConstructorName" as [can-construct.shortName shortName].
	 *
	 * @param {Object} [staticProperties] Properties that are added the constructor
	 * function directly. For example:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *   findAll: function(){
	 *     return can.ajax({url: "/animals"})
	 *   }
	 * },{}); // need to pass an empty instanceProperties object
	 *
	 * Animal.findAll().then(function(json){ ... })
	 * ```
	 *
	 * The [can-construct.setup static setup] method can be used to
	 * specify inheritable behavior when a Constructor function is created.
	 *
	 * @param {Object} instanceProperties Properties that belong to
	 * instances made with the constructor. These properties are added to the
	 * constructor's `prototype` object. Example:
	 *
	 *     var Animal = Construct.extend({
	 *		  findAll: function() {
	 *			return can.ajax({url: "/animals"});
	 *		  }
	 *     },{
	 *       init: function(name) {
	 *         this.name = name;
	 *       },
	 *       sayHi: function() {
	 *         console.log(this.name," says hai!");
	 *       }
	 *     })
	 *     var pony = new Animal("Gertrude");
	 *     pony.sayHi(); // "Gertrude says hai!"
	 *
	 * The [can-construct::init init] and [can-construct::setup setup] properties
	 * are used for initialization.
	 *
	 * @return {function} The constructor function.
	 *
	 * ```js
	 *	var Animal = Construct.extend(...);
	 *	var pony = new Animal(); // Animal is a constructor function
	 * ```
	 * @body
	 * ## Inheritance
	 * Creating "subclasses" with `Construct` is simple. All you need to do is call the base constructor
	 * with the new function's static and instance properties. For example, we want our `Snake` to
	 * be an `Animal`, but there are some differences:
	 *
	 *
	 *     var Snake = Animal.extend({
	 *         legs: 0
	 *     }, {
	 *         init: function() {
	 *             Animal.prototype.init.call(this, 'ssssss');
	 *         },
	 *         slither: function() {
	 *             console.log('slithering...');
	 *         }
	 *     });
	 *
	 *     var baslisk = new Snake();
	 *     baslisk.speak();   // "ssssss"
	 *     baslisk.slither(); // "slithering..."
	 *     baslisk instanceof Snake;  // true
	 *     baslisk instanceof Animal; // true
	 *
	 *
	 * ## Static properties and inheritance
	 *
	 * If you pass all three arguments to Construct, the second one will be attached directy to the
	 * constructor, allowing you to imitate static properties and functions. You can access these
	 * properties through the `[can-construct::constructor this.constructor]` property.
	 *
	 * Static properties can get overridden through inheritance just like instance properties. In the example below,
	 * we override both the legs static property as well as the the init function for each instance:
	 *
	 * ```js
	 * var Animal = Construct.extend({
	 *     legs: 4
	 * }, {
	 *     init: function(sound) {
	 *         this.sound = sound;
	 *     },
	 *     speak: function() {
	 *         console.log(this.sound);
	 *     }
	 * });
	 *
	 * var Snake = Animal.extend({
	 *     legs: 0
	 * }, {
	 *     init: function() {
	 *         this.sound = 'ssssss';
	 *     },
	 *     slither: function() {
	 *         console.log('slithering...');
	 *     }
	 * });
	 *
	 * Animal.legs; // 4
	 * Snake.legs; // 0
	 * var dog = new Animal('woof');
	 * var blackMamba = new Snake();
	 * dog.speak(); // 'woof'
	 * blackMamba.speak(); // 'ssssss'
	 * ```
	 *
	 * ## Alternative value for a new instance
	 *
	 * Sometimes you may want to return some custom value instead of a new object when creating an instance of your class.
	 * For example, you want your class to act as a singleton, or check whether an item with the given id was already
	 * created and return an existing one from your cache store (e.g. using [can-connect/constructor/store/store]).
	 *
	 * To achieve this you can return [can-construct.ReturnValue] from `setup` method of your class.
	 *
	 * Lets say you have `myStore` to cache all newly created instances. And if an item already exists you want to merge
	 * the new data into the existing instance and return the updated instance.
	 *
	 * ```
	 * var myStore = {};
	 *
	 * var Item = Construct.extend({
	 *     setup: function(params){
	 *         if (myStore[params.id]){
	 *             var item = myStore[params.id];
	 *
	 *             // Merge new data to the existing instance:
	 *             Object.assign(item, params);
	 *
	 *             // Return the updated item:
	 *             return new Construct.ReturnValue( item );
	 *         } else {
	 *             // Save to cache store:
	 *             myStore[this.id] = this;
	 *
	 *             return [params];
	 *         }
	 *     },
	 *     init: function(params){
	 *         Object.assign(this, params);
	 *     }
	 * });
	 *
	 * var item_1  = new Item( {id: 1, name: "One"} );
	 * var item_1a = new Item( {id: 1, name: "OnePlus"} )
	 * ```
	 */
	extend: function (name, staticProperties, instanceProperties) {
		var shortName = name,
			klass = staticProperties,
			proto = instanceProperties;

		// Figure out what was passed and normalize it.
		if (typeof shortName !== 'string') {
			proto = klass;
			klass = shortName;
			shortName = null;
		}
		if (!proto) {
			proto = klass;
			klass = null;
		}
		proto = proto || {};
		var _super_class = this,
			_super = this.prototype,
			Constructor, prototype;
		// Instantiate a base class (but only create the instance,
		// don't run the init constructor).
		prototype = this.instance();
		// Copy the properties over onto the new prototype.
		Construct._inherit(proto, _super, prototype);

		if(shortName) ; else if(klass && klass.shortName) {
			shortName = klass.shortName;
		} else if(this.shortName) {
			shortName = this.shortName;
		}
		// We want constructor.name to be the same as shortName, within
		// the bounds of what the JS VM will allow (meaning no non-word characters).
		// new Function() is significantly faster than eval() here.

		// Strip semicolons
		//!steal-remove-start
		// wrapping this var will cause "used out of scope." when linting
		var constructorName = shortName ? shortName.replace(constructorNameRegex, '_') : 'Constructor';
		//!steal-remove-end

		// The dummy class constructor.
		function init() {
			/* jshint validthis: true */
			// All construction is actually done in the init method.
			if (!initializing) {
				//!steal-remove-end

				return (!this || this.constructor !== Constructor) &&
				// We are being called without `new` or we are extending.
				arguments.length && Constructor.constructorExtends ? Constructor.extend.apply(Constructor, arguments) :
				// We are being called with `new`.
				Constructor.newInstance.apply(Constructor, arguments);
			}
		}
		Constructor = typeof namedCtor === "function" ?
			namedCtor( constructorName, init ) :
			function() { return init.apply(this, arguments); };

		// Copy old stuff onto class (can probably be merged w/ inherit)
		for (var propName in _super_class) {
			if (_super_class.hasOwnProperty(propName)) {
				Constructor[propName] = _super_class[propName];
			}
		}
		// Copy new static properties on class.
		Construct._inherit(klass, _super_class, Constructor);

		// Set things that shouldn't be overwritten.
		canReflect.assignMap(Constructor, {
			constructor: Constructor,
			prototype: prototype
			/**
			 * @property {String} can-construct.shortName shortName
			 * @parent can-construct.static
			 *
			 * If you pass a name when creating a Construct, the `shortName` property will be set to the
			 * name.
			 *
			 * ```js
			 * var MyConstructor = Construct.extend("MyConstructor",{},{});
			 * MyConstructor.shortName // "MyConstructor"
			 * ```
			 */
		});

		if (shortName !== undefined) {
			if (Object.getOwnPropertyDescriptor) {
				var desc = Object.getOwnPropertyDescriptor(Constructor, 'name');
				if (!desc || desc.configurable) {
					Object.defineProperty(
						Constructor,
						'name',
						{ writable: true, value: shortName, configurable: true }
					);
				}
			}
			Constructor.shortName = shortName;
		}
		// Make sure our prototype looks nice.
		defineNonEnumerable$1(Constructor.prototype, "constructor", Constructor);
		// Call the class `setup` and `init`
		var t = [_super_class].concat(Array.prototype.slice.call(arguments)),
			args = Constructor.setup.apply(Constructor, t);
		if (Constructor.init) {
			Constructor.init.apply(Constructor, args || t);
		}
		/**
		 * @prototype
		 */
		return Constructor; //
		/**
		 * @property {Object} can-construct.prototype.constructor constructor
		 * @parent can-construct.prototype
		 *
		 * A reference to the constructor function that created the instance. This allows you to access
		 * the constructor's static properties from an instance.
		 *
		 * @body
		 * ## Example
		 *
		 * This Construct has a static counter that counts how many instances have been created:
		 *
		 * ```js
		 * var Counter = Construct.extend({
		 *     count: 0
		 * }, {
		 *     init: function() {
		 *         this.constructor.count++;
		 *     }
		 * });
		 *
		 * var childCounter = new Counter();
		 * console.log(childCounter.constructor.count); // 1
		 * console.log(Counter.count); // 1
		 * ```
		 */
	},
	/**
	 * @function can-construct.ReturnValue ReturnValue
	 * @parent can-construct.static
	 *
	 * Use to overwrite the return value of new Construct(...).
	 *
	 * @signature `new Construct.ReturnValue( value )`
	 *
	 *   This constructor function can be used for creating a return value of the `setup` method.
	 *   [can-construct] will check if the return value is an instance of `Construct.ReturnValue`.
	 *   If it is then its `value` will be used as the new instance.
	 *
	 *   @param {Object} value A value to be used for a new instance instead of a new object.
	 *
	 *   ```js
	 *   var Student = function( name, school ){
	 *       this.name = name;
	 *       this.school = school;
	 *   }
	 *
	 *   var Person = Construct.extend({
	 *       setup: function( options ){
	 *           if (options.school){
	 *               return new Constructor.ReturnValue( new Student( options.name, options.school ) );
	 *           } else {
	 *               return [options];
	 *           }
	 *       }
	 *   });
	 *
	 *   var myPerson = new Person( {name: "Ilya", school: "PetrSU"} );
	 *
	 *   myPerson instanceof Student // => true
	 *   ```
   */
	ReturnValue: function(value){
		this.value = value;
	}
});
/**
 * @function can-construct.prototype.setup setup
 * @parent can-construct.prototype
 *
 * @signature `construct.setup(...args)`
 *
 * A setup function for the instantiation of a constructor function.
 *
 * @param {*} args The arguments passed to the constructor.
 *
 * @return {Array|undefined|can-construct.ReturnValue} If an array is returned, the array's items are passed as
 * arguments to [can-construct::init init]. If a [can-construct.ReturnValue] instance is returned, the ReturnValue
 * instance's value will be returned as the result of calling new Construct(). The following example always makes
 * sure that init is called with a jQuery wrapped element:
 *
 * ```js
 * 	WidgetFactory = Construct.extend({
 * 			setup: function(element){
 * 					return [$(element)]
 * 			}
 * 	});
 *
 * 	MyWidget = WidgetFactory.extend({
 * 			init: function($el){
 * 					$el.html("My Widget!!")
 * 			}
 * 	});
 *  ```
 *
 * Otherwise, the arguments to the
 * constructor are passed to [can-construct::init] and the return value of `setup` is discarded.
 *
 * @body
 *
 * ## Deciding between `setup` and `init`
 *
 *
 * Usually, you should use [can-construct::init init] to do your constructor function's initialization.
 * You should, instead, use `setup` when:
 *
 *   - there is initialization code that you want to run before the inheriting constructor's
 *     `init` method is called.
 *   - there is initialization code that should run whether or not inheriting constructors
 *     call their base's `init` methods.
 *   - you want to modify the arguments that will get passed to `init`.
 *
 */
defineNonEnumerable$1(Construct.prototype, "setup", function () {});
/**
 * @function can-construct.prototype.init init
 * @parent can-construct.prototype
 *
 * @description Called when a new instance of a Construct is created.
 *
 * @signature `construct.init(...args)`
 * @param {*} args the arguments passed to the constructor (or the items of the array returned from [can-construct::setup])
 *
 * @body
 * If a prototype `init` method is provided, `init` is called when a new Construct is created---
 * after [can-construct::setup]. The `init` method is where the bulk of your initialization code
 * should go. A common thing to do in `init` is save the arguments passed into the constructor.
 *
 * ## Examples
 *
 * First, we'll make a Person constructor that has a first and last name:
 *
 * ```js
 * var Person = Construct.extend({
 *     init: function(first, last) {
 *         this.first = first;
 *         this.last  = last;
 *     }
 * });
 *
 * var justin = new Person("Justin", "Meyer");
 * justin.first; // "Justin"
 * justin.last; // "Meyer"
 * ```
 *
 * Then, we'll extend Person into Programmer, and add a favorite language:
 *
 * ```js
 * var Programmer = Person.extend({
 *     init: function(first, last, language) {
 *         // call base's init
 *         Person.prototype.init.apply(this, arguments);
 *
 *         // other initialization code
 *         this.language = language;
 *     },
 *     bio: function() {
 *         return "Hi! I'm " + this.first + " " + this.last +
 *             " and I write " + this.language + ".";
 *     }
 * });
 *
 * var brian = new Programmer("Brian", "Moschel", 'ECMAScript');
 * brian.bio(); // "Hi! I'm Brian Moschel and I write ECMAScript.";
 * ```
 *
 * ## Modified Arguments
 *
 * [can-construct::setup] is able to modify the arguments passed to `init`.
 * If you aren't receiving the arguments you passed to `new Construct(args)`,
 * check that they aren't being changed by `setup` along
 * the inheritance chain.
 */
defineNonEnumerable$1(Construct.prototype, "init", function () {});

var canConstruct = canNamespace.Construct = Construct;

function getTargetDocument (target) {
	return target.ownerDocument || document$1();
}

function createEvent (target, eventData, bubbles, cancelable) {
	var doc = getTargetDocument(target);
	var event = doc.createEvent('HTMLEvents');
	var eventType;
	if (typeof eventData === 'string') {
		eventType = eventData;
	} else {
		eventType = eventData.type;
		for (var prop in eventData) {
			if (event[prop] === undefined) {
				event[prop] = eventData[prop];
			}
		}
	}
	if (bubbles === undefined) {
		bubbles = true;
	}
	event.initEvent(eventType, bubbles, cancelable);
	return event;
}

// We do not account for all EventTarget classes,
// only EventTarget DOM nodes, fragments, and the window.
function isDomEventTarget$2 (obj) {
	if (!(obj && obj.nodeName)) {
		return obj === window;
	}
	var nodeType = obj.nodeType;
	return (
		nodeType === 1 || // Node.ELEMENT_NODE
		nodeType === 9 || // Node.DOCUMENT_NODE
		nodeType === 11 // Node.DOCUMENT_FRAGMENT_NODE
	);
}

function addDomContext (context, args) {
	if (isDomEventTarget$2(context)) {
		args = Array.prototype.slice.call(args, 0);
		args.unshift(context);
	}
	return args;
}

function removeDomContext (context, args) {
	if (!isDomEventTarget$2(context)) {
		args = Array.prototype.slice.call(args, 0);
		context = args.shift();
	}
	return {
		context: context,
		args: args
	};
}

var fixSyntheticEventsOnDisabled = false;
// In FireFox, dispatching a synthetic event on a disabled element throws an error.
// Other browsers, like IE 10 do not dispatch synthetic events on disabled elements at all.
// This determines if we have to work around that when dispatching events.
// https://bugzilla.mozilla.org/show_bug.cgi?id=329509
(function() {
	if(!isBrowserWindow()) {
		return;
	}

	var testEventName = 'fix_synthetic_events_on_disabled_test';
	var input = document.createElement("input");
	input.disabled = true;
	var timer = setTimeout(function() {
		fixSyntheticEventsOnDisabled = true;
	}, 50);
	var onTest = function onTest (){
		clearTimeout(timer);
		input.removeEventListener(testEventName, onTest);
	};
	input.addEventListener(testEventName, onTest);
	try {
		var event = document.create('HTMLEvents');
		event.initEvent(testEventName, false);
		input.dispatchEvent(event);
	} catch(e) {
		onTest();
		fixSyntheticEventsOnDisabled = true;
	}
})();

function isDispatchingOnDisabled(element, event) {
	var eventType = event.type;
	var isInsertedOrRemoved = eventType === 'inserted' || eventType === 'removed';
	var isDisabled = !!element.disabled;
	return isInsertedOrRemoved && isDisabled;
}

function forceEnabledForDispatch (element, event) {
	return fixSyntheticEventsOnDisabled && isDispatchingOnDisabled(element, event);
}

var util = {
	createEvent: createEvent,
	addDomContext: addDomContext,
	removeDomContext: removeDomContext,
	isDomEventTarget: isDomEventTarget$2,
	getTargetDocument: getTargetDocument,
	forceEnabledForDispatch: forceEnabledForDispatch
};

function EventRegistry () {
	this._registry = {};
}

/**
 * @module can-dom-events/helpers/make-event-registry
 * @parent can-dom-events.helpers
 * @description Create an event registry.
 * @signature `makeEventRegistry()`
 *   @return {can-dom-events/EventRegistry}
 * @hide
 * 
 * @body
 *
 * ```js
 * var makeEventRegistry = require('can-dom-events/helpers/make-event-registry');
 * var registry = makeEventRegistry();
 *
 * var radioChange = require('can-events-dom-radiochange');
 * var removeRadioChange = registry.add(radioChange);
 *
 * registry.has('radiochange'); // => true
 * registry.get('radiochange'); // => radioChange
 *
 * removeRadioChange();
 * ```
 */
var makeEventRegistry = function makeEventRegistry () {
	return new EventRegistry();
};

/**
 * @function make-event-registry.has eventRegistry.has
 *
 * Check whether an event type has already been registered.
 *
 * @signature `eventRegistry.has( eventType )`
 * @parent can-dom-events/EventRegistry
 * @param {String} eventType The event type for which to check.
 * @return {Boolean} Whether the event type is registered.
*/
EventRegistry.prototype.has = function (eventType) {
	return !!this._registry[eventType];
};

/**
 * @function make-event-registry.get eventRegistry.get
 *
 * Retrieve an event type which has already been registered.
 *
 * @signature `eventRegistry.get( eventType )`
 * @parent can-dom-events/EventRegistry
 * @param {String} eventType The event type for which to retrieve.
 * @return {EventDefinition} The registered event definition, or undefined if unregistered.
*/
EventRegistry.prototype.get = function (eventType) {
	return this._registry[eventType];
};

/**
 * @function make-event-registry.add eventRegistry.add
 *
 * Add an event to the registry.
 *
 * @signature `eventRegistry.add( event [, eventType ] )`
 * @parent can-dom-events/EventRegistry
 * @param {EventDefinition} event The event definition to register.
 * @param {String} eventType The event type with which to register the event.
 * @return {function} The callback to remove the event from the registry.
*/
EventRegistry.prototype.add = function (event, eventType) {
	if (!event) {
		throw new Error('An EventDefinition must be provided');
	}
	if (typeof event.addEventListener !== 'function') {
		throw new TypeError('EventDefinition addEventListener must be a function');
	}
	if (typeof event.removeEventListener !== 'function') {
		throw new TypeError('EventDefinition removeEventListener must be a function');
	}

	eventType = eventType || event.defaultEventType;
	if (typeof eventType !== 'string') {
		throw new TypeError('Event type must be a string, not ' + eventType);
	}

	if (this.has(eventType)) {
		throw new Error('Event "' + eventType + '" is already registered');
	}

	this._registry[eventType] = event;
	var self = this;
	return function remove () {
		self._registry[eventType] = undefined;
	};
};

// Some events do not bubble, so delegating them requires registering the handler in the
// capturing phase.
// http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
var useCapture = function(eventType) {
	return eventType === 'focus' || eventType === 'blur';
};

function makeDelegator (domEvents) {
	var Delegator = function Delegator (parentKey){
		this.element = parentKey; // HTMLElement
		this.events = {}; // {[eventType: string]: Array<(event) -> void>}
		this.delegated = {}; // {[eventType: string]: (event) -> void}
	};

	canReflect.assignSymbols( Delegator.prototype, {
		"can.setKeyValue": function(eventType, handlersBySelector){
			var handler = this.delegated[eventType] = function(ev){
				var cur = ev.target;
				var propagate = true;
				var origStopPropagation = ev.stopPropagation;
				ev.stopPropagation = function() {
					origStopPropagation.apply(this, arguments);
					propagate = false;
				};
				var origStopImmediatePropagation = ev.stopImmediatePropagation;
				ev.stopImmediatePropagation = function() {
					origStopImmediatePropagation.apply(this, arguments);
					propagate = false;
				};
				do {
					// document does not implement `.matches` but documentElement does
					var el = cur === document ? document.documentElement : cur;
					var matches = el.matches || el.msMatchesSelector;

					canReflect.each(handlersBySelector, function(handlers, selector){
						// Text and comment nodes may be included in mutation event targets
						//  but will never match selectors (and do not implement matches)
						if (matches && matches.call(el, selector)) {
							handlers.forEach(function(handler){
								handler.call(el, ev);
							});
						}
					});
					// since `el` points to `documentElement` when `cur` === document,
					// we need to continue using `cur` as the loop pointer, otherwhise
					// it will never end as documentElement.parentNode === document
					cur = cur.parentNode;
				} while ((cur && cur !== ev.currentTarget) && propagate);
			};
			this.events[eventType] = handlersBySelector;
			domEvents.addEventListener(this.element, eventType, handler, useCapture(eventType));
		},
		"can.getKeyValue": function(eventType) {
			return this.events[eventType];
		},
		"can.deleteKeyValue": function(eventType) {
			domEvents.removeEventListener(this.element, eventType, this.delegated[eventType], useCapture(eventType));
			delete this.delegated[eventType];
			delete this.events[eventType];
		},
		"can.getOwnEnumerableKeys": function() {
			return Object.keys(this.events);
		}
	});

	return Delegator;
}

var MakeDelegateEventTree = function makeDelegateEventTree (domEvents) {
	var Delegator = makeDelegator(domEvents);
	return new canKeyTree([Map, Delegator, Object, Array]);
};

var domEvents = {
	_eventRegistry: makeEventRegistry(),

	/**
	* @function can-dom-events.addEvent addEvent
	* @parent can-dom-events.static
	*
	* Add a custom event to the global event registry.
	*
	* @signature `addEvent( event [, eventType ] )`
	*
	* ```js
	* var removeReturnEvent = domEvents.addEvent(enterEvent, "return");
	* ```
	*
	* @param {can-dom-events/EventDefinition} event The custom event definition.
	* @param {String} eventType The event type to associated with the custom event.
	* @return {function} The callback to remove the custom event from the registry.
	*/
	addEvent: function(event, eventType) {
		return this._eventRegistry.add(event, eventType);
	},

	/**
	* @function can-dom-events.addEventListener addEventListener
	*
	* Add an event listener for eventType to the target.
	*
	* @signature `addEventListener( target, eventType, ...eventArgs )`
	* @parent can-dom-events.static
	* @param {DomEventTarget} target The object to which to add the listener.
	* @param {String} eventType The event type with which to register.
	* @param {*} eventArgs The arguments which configure the associated event's behavior. This is usually a
	* function event handler.
	*/
	addEventListener: function(target, eventType) {
		var hasCustomEvent = domEvents._eventRegistry.has(eventType);
		if (hasCustomEvent) {
			var event = domEvents._eventRegistry.get(eventType);
			return event.addEventListener.apply(domEvents, arguments);
		}

		var eventArgs = Array.prototype.slice.call(arguments, 1);
		return target.addEventListener.apply(target, eventArgs);
	},

	/**
	* @function can-dom-events.removeEventListener removeEventListener
	*
	* Remove an event listener for eventType from the target.
	*
	* @signature `removeEventListener( target, eventType, ...eventArgs )`
	* @parent can-dom-events.static
	* @param {DomEventTarget} target The object from which to remove the listener.
	* @param {String} eventType The event type with which to unregister.
	* @param {*} eventArgs The arguments which configure the associated event's behavior. This is usually a
	* function event handler.
	*/
	removeEventListener: function(target, eventType) {
		var hasCustomEvent = domEvents._eventRegistry.has(eventType);
		if (hasCustomEvent) {
			var event = domEvents._eventRegistry.get(eventType);
			return event.removeEventListener.apply(domEvents, arguments);
		}

		var eventArgs = Array.prototype.slice.call(arguments, 1);
		return target.removeEventListener.apply(target, eventArgs);
	},

	/**
	* @function can-dom-events.addDelegateListener addDelegateListener
	*
	* Attach a handler for an event for all elements that match the selector,
	* now or in the future, based on a root element.
	*
	* @signature `addDelegateListener( target, eventType, selector, handler )`
	*
	* ```js
	* // Prevents all anchor elements from changing the page
	* domEvents.addDelegateListener(document.body,"click", "a", function(event){
	*   event.preventDefault();
	* })
	* ```
	* @parent can-dom-events.static
	* @param {DomEventTarget} root The html element to listen to events that match selector within.
	* @param {String} eventType The event name to listen to.
	* @param {String} selector A selector to filter the elements that trigger the event.
	* @param {function} handler A function to execute at the time the event is triggered.
	*/
	addDelegateListener: function(root, eventType, selector, handler) {
		domEvents._eventTree.add([root, eventType, selector, handler]);
	},
	/**
	* @function can-dom-events.removeDelegateListener removeDelegateListener
	*
	* Remove a handler for an event for all elements that match the selector.
	*
	* @signature `removeDelegateListener( target, eventType, selector, handler )`
	*
	* ```js
	* // Prevents all anchor elements from changing the page
	* function handler(event) {
	*   event.preventDefault();
	* }
	* domEvents.addDelegateListener(document.body,"click", "a", handler);
	*
	* domEvents.removeDelegateListener(document.body,"click", "a", handler);
	* ```
	* @parent can-dom-events.static
	* @param {DomEventTarget} root The html element to listen to events that match selector within.
	* @param {String} eventType The event name to listen to.
	* @param {String} selector A selector to filter the elements that trigger the event.
	* @param {function} handler A function that was previously passed to `addDelegateListener`.
	*/
	removeDelegateListener: function(target, eventType, selector, handler) {
		domEvents._eventTree.delete([target, eventType, selector, handler]);
	},

	/**
	* @function can-dom-events.dispatch dispatch
	*
	* Create and dispatch a configured event on the target.
	*
	* @signature `dispatch( target, eventData [, bubbles ][, cancelable ] )`
	* @parent can-dom-events.static
	* @param {DomEventTarget} target The object on which to dispatch the event.
	* @param {Object | String} eventData The data to be assigned to the event. If it is a string, that will be the event type.
	* @param {Boolean} bubbles Whether the event should bubble; defaults to true.
	* @param {Boolean} cancelable Whether the event can be cancelled; defaults to false.
	* @return {Boolean} notCancelled Whether the event dispatched without being cancelled.
	*/
	dispatch: function(target, eventData, bubbles, cancelable) {
		var event = util.createEvent(target, eventData, bubbles, cancelable);
		var enableForDispatch = util.forceEnabledForDispatch(target, event);
		if(enableForDispatch) {
			target.disabled = false;
		}

		var ret = target.dispatchEvent(event);
		if(enableForDispatch) {
			target.disabled = true;
		}

		return ret;
	}
};

domEvents._eventTree = MakeDelegateEventTree(domEvents);





var canDomEvents = canNamespace.domEvents = domEvents;

/**
 * @module {function} can-event-queue/map/map
 * @parent can-event-queue
 * @templateRender true
 *
 * @description Mixin methods and symbols to make this object or prototype object
 * behave like a key-value observable.
 *
 * @signature `mixinMapBindings( obj )`
 *
 * Adds symbols and methods that make `obj` or instances having `obj` on their prototype
 * behave like key-value observables.
 *
 * When `mixinMapBindings` is called on an `obj` like:
 *
 * ```js
 * var mixinMapBindings = require("can-event-queue/map/map");
 *
 * var observable = mixinValueBindings({});
 *
 * observable.on("prop",function(ev, newVal, oldVal){
 *   console.log(newVal);
 * });
 *
 * observable[canSymbol.for("can.dispatch")]("prop",[2,1]);
 * // Logs: 2
 * ```
 *
 * `mixinMapBindings` adds the following properties and symbols to the object:
 *
 * {{#each (getChildren [can-event-queue/map/map])}}
 * - [{{name}}] - {{description}}{{/each}}
 *
 * Furthermore, `mixinMapBindings` looks for the following symbols on the object's `.constructor`
 * property:
 *
 * - `@can.dispatchInstanceBoundChange` - Called when the bind status of an instance changes.
 * - `@can.dispatchInstanceOnPatches` - Called if [can-event-queue/map/map.dispatch] is called with `event.patches` as an array of
 *   patches.
 */







var isDomEventTarget$1 = util.isDomEventTarget;



var metaSymbol = canSymbol.for("can.meta"),
	dispatchBoundChangeSymbol = canSymbol.for("can.dispatchInstanceBoundChange"),
	dispatchInstanceOnPatchesSymbol = canSymbol.for("can.dispatchInstanceOnPatches"),
	onKeyValueSymbol$1 = canSymbol.for("can.onKeyValue"),
	offKeyValueSymbol = canSymbol.for("can.offKeyValue"),
	onEventSymbol = canSymbol.for("can.onEvent"),
	offEventSymbol = canSymbol.for("can.offEvent"),
	onValueSymbol$3 = canSymbol.for("can.onValue"),
	offValueSymbol$2 = canSymbol.for("can.offValue"),
	inSetupSymbol = canSymbol.for("can.initializing");

var legacyMapBindings;

function addHandlers(obj, meta) {
	if (!meta.handlers) {
		// Handlers are organized by:
		// event name - the type of event bound to
		// binding type - "event" for things that expect an event object (legacy), "onKeyValue" for reflective bindings.
		// queue name - mutate, queue, etc
		// handlers - the handlers.
		meta.handlers = new canKeyTree([Object, Object, Object, Array], {
			onFirst: function() {
				if (obj._eventSetup !== undefined) {
					obj._eventSetup();
				}
				var constructor = obj.constructor;
				if(constructor[dispatchBoundChangeSymbol] !== undefined && obj instanceof constructor) {
					constructor[dispatchBoundChangeSymbol](obj, true);
				}
				//queues.enqueueByQueue(getLifecycleHandlers(obj).getNode([]), obj, [true]);
			},
			onEmpty: function() {
				if (obj._eventTeardown !== undefined) {
					obj._eventTeardown();
				}
				var constructor = obj.constructor;
				if(constructor[dispatchBoundChangeSymbol] !== undefined && obj instanceof constructor) {
					constructor[dispatchBoundChangeSymbol](obj, false);
				}
				//queues.enqueueByQueue(getLifecycleHandlers(obj).getNode([]), obj, [false]);
			}
		});
	}

	if (!meta.listenHandlers) {
		// context, eventName (might be undefined), queue, handlers
		meta.listenHandlers = new canKeyTree([Map, Map, Object, Array]);
	}
}


// getHandlers returns a KeyTree used for event handling.
// `handlers` will be on the `can.meta` symbol on the object.
// Ensure the "obj" passed as an argument has an object on @@can.meta
var ensureMeta = function ensureMeta(obj) {
	var meta = obj[metaSymbol];

	if (!meta) {
		meta = {};
		canReflect.setKeyValue(obj, metaSymbol, meta);
	}
	addHandlers(obj, meta);

	return meta;
};

function stopListeningArgumentsToKeys(bindTarget, event, handler, queueName) {
	if(arguments.length && canReflect.isPrimitive(bindTarget)) {
		queueName = handler;
		handler = event;
		event = bindTarget;
		bindTarget = this.context;
	}
	if(typeof event === "function") {
		queueName = handler;
		handler = event;
		event = undefined;
	}
	if(typeof handler === "string") {
		queueName = handler;
		handler = undefined;
	}
	var keys = [];
	if(bindTarget) {
		keys.push(bindTarget);
		if(event || handler || queueName) {
			keys.push(event);
			if(queueName || handler) {
				keys.push(queueName || this.defaultQueue);
				if(handler) {
					keys.push(handler);
				}
			}
		}
	}
	return keys;
}


// These are the properties we are going to add to objects
var props = {
	/**
	 * @function can-event-queue/map/map.dispatch dispatch
	 * @parent can-event-queue/map/map
	 *
	 * @description Dispatch event and key binding handlers.
	 *
	 * @signature `obj.dispatch(event, [args])`
	 *
	 * Dispatches registered [can-event-queue/map/map.addEventListener] and
	 * [can-event-queue/map/map.can.onKeyValue] value binding handlers.
	 *
	 * The following shows dispatching the `property` event and
	 * `keyValue` handlers:
	 *
	 *
	 * ```js
	 * var mixinMapBindings = require("can-event-queue/map/map");
	 *
	 * var obj = mixinMapBindings({});
	 *
	 * obj.addEventListener("property", function(event, newVal){
	 *   event.type //-> "property"
	 *   newVal     //-> 5
	 * });
	 *
	 * canReflect.onKeyValue("property", function(newVal){
	 *   newVal     //-> 5
	 * })
	 *
	 * obj.dispatch("property", [5]);
	 * ```
	 *
	 * > NOTE: Event handlers have an additional `event` argument.
	 *
	 * @param {String|Object} event The event to dispatch. If a string is passed,
	 *   it will be used as the `type` of the event that will be dispatched and dispatch matching
	 *   [can-event-queue/map/map.can.onKeyValue] bindings:
	 *
	 *   ```js
	 *   obs.dispatch("key")
	 *   ```
	 *
	 *   If `event` is an object, it __MUST__ have a `type` property. The If a string is passed,
	 *   it will be used as the `type` of the event that will be dispatched and dispatch matching
	 *   [can-event-queue/map/map.can.onKeyValue] bindings:
	 *
	 *   ```js
	 *   obs.dispatch({type: "key"})
	 *   ```
	 *
	 *   The `event` object can also have the following properties and values:
	 *   - __reasonLog__ `{Array}` - The reason this event happened. This will be passed to
	 *     [can-queues.enqueueByQueue] for debugging purposes.
	 *   - __makeMeta__ `{function}` - Details about the handler being called. This will be passed to
	 *     [can-queues.enqueueByQueue] for debugging purposes.
	 *   - __patches__ `{Array<Patch>}` - The patch objects this event represents.  The `.patches` value will be
	 *     passed to the object's `.constructor`'s `@can.dispatchInstanceOnPatches` method.
	 *
	 * @param {Array} [args] Additional arguments to pass to event handlers.
	 * @return {Object} event The resulting event object.
	 */
	dispatch: function(event, args) {
		//!steal-remove-end

		// Don't send events if initalizing.
		if (this.__inSetup !== true && this[inSetupSymbol] !== true) {
			if (typeof event === 'string') {
				event = {
					type: event
				};
			}

			var meta = ensureMeta(this);

			if (typeof meta._log === "function") {
				meta._log.call(this, event, args);
			}
			//!steal-remove-end
			var handlers = meta.handlers;
			var handlersByType = event.type !== undefined && handlers.getNode([event.type]);
			var dispatchConstructorPatches = event.patches && this.constructor[dispatchInstanceOnPatchesSymbol];
			var patchesNode = event.patches !== undefined && handlers.getNode(["can.patches","onKeyValue"]);
			var keysNode = event.keyChanged !== undefined && handlers.getNode(["can.keys","onKeyValue"]);
			var batch = dispatchConstructorPatches || handlersByType || patchesNode || keysNode;
			if ( batch ) {
				canQueues.batch.start();
			}
			if(handlersByType) {
				if (handlersByType.onKeyValue) {
					canQueues.enqueueByQueue(handlersByType.onKeyValue, this, args, event.makeMeta, event.reasonLog);
				}
				if (handlersByType.event) {
					event.batchNum = canQueues.batch.number();
					var eventAndArgs = [event].concat(args);
					canQueues.enqueueByQueue(handlersByType.event, this, eventAndArgs, event.makeMeta, event.reasonLog);
				}
			}
			if(keysNode) {
				canQueues.enqueueByQueue(keysNode, this, [event.keyChanged], event.makeMeta, event.reasonLog);
			}
			if(patchesNode) {
				canQueues.enqueueByQueue(patchesNode, this, [event.patches], event.makeMeta, event.reasonLog);
			}
			if(dispatchConstructorPatches) {
				this.constructor[dispatchInstanceOnPatchesSymbol](this, event.patches);
			}
			if ( batch ) {
				canQueues.batch.stop();
			}
		}
		return event;
	},
	/**
	 * @function can-event-queue/map/map.addEventListener addEventListener
	 * @parent can-event-queue/map/map
	 *
	 * @description Register an event handler to be called when an event is dispatched.
	 *
	 * @signature `obj.addEventListener(eventName, handler(event, ...) [,queueName] )`
	 *
	 * Add a event listener to an object.  Handlers attached by `.addEventListener` get
	 * called back with the [can-event-queue/map/map.dispatch]
	 * `event` object and any arguments used to dispatch. [can-event-queue/map/map.can.onKeyValue] bindings do
	 * not get the event object.
	 *
	 * ```js
	 * var mixinMapBindings = require("can-event-queue/map/map");
	 *
	 * var obj = mixinMapBindings({});
	 *
	 * obj.addEventListener("foo", function(event){ ... });
	 * ```
	 *
	 * @param {String} eventName The name of the event to listen for.
	 * @param {Function} handler(event,arg...) The handler that will be executed to handle the event.  The handler will be called
	 *   with the dispatched `event` and `args`.
	 * @param {String} [queueName='mutate'] The name of the [can-queues] queue the handler will called
	 *   back within. Defaults to `"mutate"`.
	 * @return {Object} Returns the object `.addEventListener` was called on.
	 *
	 */
	addEventListener: function(key, handler, queueName) {
		ensureMeta(this).handlers.add([key, "event", queueName || "mutate", handler]);
		return this;
	},
	/**
	 * @function can-event-queue/map/map.removeEventListener removeEventListener
	 * @parent can-event-queue/map/map
	 *
	 * @description Unregister an event handler to be called when an event is dispatched.
	 *
	 * @signature `obj.removeEventListener(eventName, [handler [,queueName]] )`
	 *
	 * Removes one or more handlers from being called when `eventName`
	 * is [can-event-queue/map/map.dispatch]ed.
	 *
	 * ```js
	 * // Removes `handler` if it is in the notify queue.
	 * obj.removeEventListener("closed", handler, "notify")
	 *
	 * // Removes `handler` if it is in the mutate queue.
	 * obj.removeEventListener("closed", handler)
	 *
	 * // Removes all "closed" handlers.
	 * obj.removeEventListener("closed")
	 * ```
	 *
	 * @param {String} eventName The name of the event to remove. If not specified, all events are removed.
	 * @param {Function} [handler] The handler that will be removed from the event. If not specified, all handlers for the event are removed.
	 * @param {String} [queueName='mutate'] The name of the [can-queues] queue the handler was registered on. Defaults to `"mutate"`.
	 * @return {Object} Returns the object `.removeEventListener` was called on.
	 */
	removeEventListener: function(key, handler, queueName) {
		if(key === undefined) {
			// This isn't super fast, but this pattern isn't used much.
			// We could re-arrange the tree so it would be faster.
			var handlers = ensureMeta(this).handlers;
			var keyHandlers = handlers.getNode([]);
			Object.keys(keyHandlers).forEach(function(key){
				handlers.delete([key,"event"]);
			});
		} else if (!handler && !queueName) {
			ensureMeta(this).handlers.delete([key, "event"]);
		} else if (!handler) {
			ensureMeta(this).handlers.delete([key, "event", queueName || "mutate"]);
		} else {
			ensureMeta(this).handlers.delete([key, "event", queueName || "mutate", handler]);
		}
		return this;
	},
	/**
	 * @function can-event-queue/map/map.one one
	 * @parent can-event-queue/map/map
	 *
	 * @description Register an event handler that gets called only once.
	 *
	 * @signature `obj.one(event, handler(event, args...) )`
	 *
	 * Adds a basic event listener that listens to an event once and only once.
	 *
	 * ```js
	 * obj.one("prop", function(){
	 *   console.log("prop dispatched");
	 * })
	 *
	 * obj[canSymbol.for("prop")]("prop") //-> logs "prop dispatched"
	 * obj[canSymbol.for("prop")]("prop")
	 * ```
	 *
	 * @param {String} eventName The name of the event to listen to.
	 * @param {Function} handler(event, args...) The handler that will be run when the
	 *   event is dispached.
	 * @return {Object} this
	 */
	one: function(event, handler) {
		// Unbind the listener after it has been executed
		var one = function() {
			legacyMapBindings.off.call(this, event, one);
			return handler.apply(this, arguments);
		};

		// Bind the altered listener
		legacyMapBindings.on.call(this, event, one);
		return this;
	},
	/**
	 * @function can-event-queue/map/map.listenTo listenTo
	 * @parent can-event-queue/map/map
	 *
	 * @description Listen to an event and register the binding for simplified unbinding.
	 *
	 * @signature `obj.listenTo([bindTarget,] event, handler)`
	 *
	 * `.listenTo` is useful for creating bindings that can can be torn down with
	 * [can-event-queue/map/map.stopListening].  This is useful when creating
	 * rich behaviors that can't be accomplished using computed values, or if you are trying to
	 * avoid streams.
	 *
	 * For example, the following creates an observable that counts how many times its
	 * `name` property has changed:
	 *
	 * ```js
	 * class Person {
	 *   constructor(){
	 *     this.nameChanged = 0;
	 *     this.listenTo("name", function(){
	 *       this.nameChanged++;
	 *     })
	 *   },
	 *   setName(newVal) {
	 *     this.name = newVal;
	 *     this.dispatch("name",[newVal])
	 *   }
	 * }
	 * mixinMapBindings(Person.prototype);
	 *
	 * var person = new Person();
	 * person.setName("Justin");
	 * person.setName("Ramiya");
	 * person.nameChanged //-> 2
	 * ```
	 *
	 * `.listenTo` event bindings are stored on an observable and MUST be unbound using
	 * [can-event-queue/map/map.stopListening]. `.stopListening` make it easy to unbind
	 * all of the `.listenTo` event bindings when the observable is no longer needed:
	 *
	 * ```js
	 * person.stopListening();
	 * ```
	 *
	 * If no `bindTarget` is passed, `.listenTo` binds to the current
	 * observable.
	 *
	 * [can-component]'s `connectedCallback` lifecyle hook is often used to call
	 * `.listenTo` to setup bindings that update viewmodel properties.
	 *
	 *
	 * @param {Object} [bindTarget] The object to listen for events on.  If `bindTarget` is not provided,
	 * the observable `.listenTo` was called on will be the `bindTarget`.
	 * @param {String} event The name of the event to listen for.
	 * @param {Function} handler The handler that will be executed to handle the event.
	 * @return {Object} this
	 */
	listenTo: function (bindTarget, event, handler, queueName) {

		if(canReflect.isPrimitive(bindTarget)) {
			queueName = handler;
			handler = event;
			event = bindTarget;
			bindTarget = this;
		}

		if(typeof event === "function") {
			queueName = handler;
			handler = event;
			event = undefined;
		}

		// Initialize event cache
		ensureMeta(this).listenHandlers.add([bindTarget, event, queueName || "mutate", handler]);

		legacyMapBindings.on.call(bindTarget, event, handler, queueName || "mutate");
		return this;
	},
	/**
	 * @function can-event-queue/map/map.stopListening stopListening
	 * @parent can-event-queue/map/map
	 * @description Stops listening for registered event handlers.
	 *
	 * @signature `obj.stopListening( [bindTarget], [event,] handler]] )`
	 *
	 * `.stopListening` unbinds on event handlers registered through
	 * [can-event-queue/map/map.listenTo]. All event handlers
	 * that match the arguments will be unbound. For example:
	 *
	 * ```js
	 * // Unbinds all .listenTo registered handlers
	 * obj.stopListening()
	 *
	 * // Unbinds all .listenTo registered with `bindTarget`
	 * obj.stopListening(bindTarget)
	 *
	 * // Unbinds all .listenTo registered with `bindTarget`, `event`
	 * obj.stopListening(bindTarget, event)
	 *
	 * // Unbinds the handler registered with `bindTarget`, `event`, `handler`
	 * obj.stopListening(bindTarget, event, handler)
	 * ```
	 *
	 * `.listenTo` is often returned by [can-component]'s `connectedCallback` lifecyle hook.
	 *
	 * @param {Object} [bindTarget] The object we will stop listening to event on. If `bindTarget` is
	 * not provided, the observable `.stopListening` was called on will be the `bindTarget`.
	 * @param {String} [event] The name of the event to listen for.
	 * @param {Function} [handler] The handler that will be executed to handle the event.
	 * @return {Object} this
	 *
	 */
	stopListening: function () {
		var keys = stopListeningArgumentsToKeys.apply({context: this, defaultQueue: "mutate"}, arguments);

		var listenHandlers = ensureMeta(this).listenHandlers;

		function deleteHandler(bindTarget, event, queue, handler){
			legacyMapBindings.off.call(bindTarget, event, handler, queue);
		}
		listenHandlers.delete(keys, deleteHandler);

		return this;
	},
	/**
	 * @function can-event-queue/map/map.on on
	 * @parent can-event-queue/map/map
	 *
	 * @description A shorthand method for listening to event.
	 *
	 * @signature `obj.on( event, handler [, queue] )`
	 *
	 * Listen to when `obj` dispatches an event, a [can-reflect/observe.onKeyValue]
	 * change, or a [can-reflect/observe.onValue] change in that order.
	 *
	 * As this is the __legacy__ `.on`, it will look for an `.addEventListener`
	 * method on the `obj` first, before looking for the [can-symbol/symbols/onKeyValue]
	 * and then [can-symbol/symbols/onValue] symbol.
	 *
	 * @param {String} eventName
	 * @param {Function} handler
	 * @param {String} [queue]
	 * @return {Any} The object `on` was called on.
	 */
	on: function(eventName, handler, queue) {
		var listenWithDOM = isDomEventTarget$1(this);
		if (listenWithDOM) {
			if (typeof handler === 'string') {
				canDomEvents.addDelegateListener(this, eventName, handler, queue);
			} else {
				canDomEvents.addEventListener(this, eventName, handler, queue);
			}
		} else {
			if (this[onEventSymbol]) {
				this[onEventSymbol](eventName, handler, queue);
			} else if ("addEventListener" in this) {
				this.addEventListener(eventName, handler, queue);
			} else if (this[onKeyValueSymbol$1]) {
				canReflect.onKeyValue(this, eventName, handler, queue);
			} else {
				if (!eventName && this[onValueSymbol$3]) {
					canReflect.onValue(this, handler, queue);
				} else {
					throw new Error("can-event-queue: Unable to bind " + eventName);
				}
			}
		}
		return this;
	},
	/**
	 * @function can-event-queue/map/map.off off
	 * @parent can-event-queue/map/map
	 *
	 * @description A shorthand method for unbinding an event.
	 *
	 * @signature `obj.on( event, handler [, queue] )`
	 *
	 * Listen to when `obj` dispatches an event, a [can-reflect/observe.onKeyValue]
	 * change, or a [can-reflect/observe.onValue] change in that order.
	 *
	 * As this is the __legacy__ `.on`, it will look for an `.addEventListener`
	 * method on the `obj` first, before looking for the [can-symbol/symbols/onKeyValue]
	 * and then [can-symbol/symbols/onValue] symbol.
	 *
	 * @param {String} eventName
	 * @param {Function} handler
	 * @param {String} [queue]
	 * @return {Any} The object `on` was called on.
	 */
	off: function(eventName, handler, queue) {
		var listenWithDOM = isDomEventTarget$1(this);
		if (listenWithDOM) {
			if (typeof handler === 'string') {
				canDomEvents.removeDelegateListener(this, eventName, handler, queue);
			} else {
				canDomEvents.removeEventListener(this, eventName, handler, queue);
			}
		} else {
			if (this[offEventSymbol]) {
				this[offEventSymbol](eventName, handler, queue);
			} else if ("removeEventListener" in this) {
				this.removeEventListener(eventName, handler, queue);
			} else if (this[offKeyValueSymbol]) {
				canReflect.offKeyValue(this, eventName, handler, queue);
			} else {
				if (!eventName && this[offValueSymbol$2]) {
					canReflect.offValue(this, handler, queue);
				} else {
					throw new Error("can-event-queue: Unable to unbind " + eventName);
				}

			}
		}
		return this;
	}
};

// The symbols we'll add to objects
var symbols$1 = {
	/**
	 * @function can-event-queue/map/map.can.onKeyValue @can.onKeyValue
	 * @parent can-event-queue/map/map
	 *
	 * @description Register an event handler to be called when a key value changes.
	 *
	 * @signature `canReflect.onKeyValue( obj, key, handler(newVal) [,queueName] )`
	 *
	 * Add a key change handler to an object.  Handlers attached by `.onKeyValue` get
	 * called back with the new value of the `key`. Handlers attached with [can-event-queue/map/map.can.addEventListener]
	 * get the event object.
	 *
	 * ```js
	 * var mixinMapBindings = require("can-event-queue/map/map");
	 *
	 * var obj = mixinMapBindings({});
	 *
	 * canReflect.onKeyValue( obj, "prop", function(newPropValue){ ... });
	 * ```
	 *
	 * @param {String} key The name of property to listen to changes in values.
	 * @param {Function} handler(newVal, oldValue) The handler that will be called
	 *   back with the new and old value of the key.
	 * @param {String} [queueName='mutate'] The name of the [can-queues] queue the handler will called
	 *   back within. Defaults to `"mutate"`.
	 */
	"can.onKeyValue": function(key, handler, queueName) {
		ensureMeta(this).handlers.add([key, "onKeyValue", queueName || "mutate", handler]);
	},
	/**
	 * @function can-event-queue/map/map.can.offKeyValue @can.offKeyValue
	 * @parent can-event-queue/map/map
	 *
	 * @description Unregister an event handler to be called when an event is dispatched.
	 *
	 * @signature `canReflect.offKeyValue( obj, key, handler, queueName )`
	 *
	 * Removes a handlers from being called when `key` changes are
	 * [can-event-queue/map/map.dispatch]ed.
	 *
	 * ```js
	 * // Removes `handler` if it is in the notify queue.
	 * canReflect.offKeyValue( obj, "prop", handler, "notify" )
	 * ```
	 *
	 * @param {String} eventName The name of the event to remove. If not specified, all events are removed.
	 * @param {Function} [handler] The handler that will be removed from the event. If not specified, all handlers for the event are removed.
	 * @param {String} [queueName='mutate'] The name of the [can-queues] queue the handler was registered on. Defaults to `"mutate"`.
	 */
	"can.offKeyValue": function(key, handler, queueName) {
		ensureMeta(this).handlers.delete([key, "onKeyValue", queueName || "mutate", handler]);
	},
	/**
	 * @function can-event-queue/map/map.can.isBound @can.isBound
	 * @parent can-event-queue/map/map
	 *
	 * @description Return if the observable is bound to.
	 *
	 * @signature `canReflect.isBound(obj)`
	 *
	 * The `@can.isBound` symbol is added to make [can-reflect/observe.isBound]
	 * return if `obj` is bound or not.
	 *
	 * @return {Boolean} True if the observable has been bound to with `.onKeyValue` or `.addEventListener`.
	 */
	"can.isBound": function() {
		return !ensureMeta(this).handlers.isEmpty();
	},
	/**
	 * @function can-event-queue/map/map.can.getWhatIChange @can.getWhatIChange
	 * @parent can-event-queue/map/map
	 *
	 * @description Return observables whose values are affected by attached event handlers
	 * @signature `@can.getWhatIChange(key)`
	 *
	 * The `@@can.getWhatIChange` symbol is added to make sure [can-debug] can report
	 * all the observables whose values are set by a given observable's key.
	 *
	 * This function iterates over the event handlers attached to a given `key` and
	 * collects the result of calling `@@can.getChangesDependencyRecord` on each handler;
	 * this symbol allows the caller to tell what observables are being mutated by
	 * the event handler when it is executed.
	 *
	 * In the following example a [can-simple-map] instance named `me` is created
	 * and when its `age` property changes, the value of a [can-simple-observable]
	 * instance is set. The event handler that causes the mutation is then decatorated
	 * with `@@can.getChangesDependencyRecord` to register the mutation dependency.
	 *
	 * ```js
	 * var obs = new SimpleObservable("a");
	 * var me = new SimpleMap({ age: 30 });
	 * var canReflect = require("can-reflect");
	 *
	 * var onAgeChange = function onAgeChange() {
	 *	canReflect.setValue(obs, "b");
	 * };
	 *
	 * onAgeChange[canSymbol.for("can.getChangesDependencyRecord")] = function() {
	 *	return {
	 *		valueDependencies: new Set([ obs ]);
	 *	}
	 * };
	 *
	 * canReflect.onKeyValue(me, "age", onAgeChange);
	 * me[canSymbol.for("can.getWhatIChange")]("age");
	 * ```
	 *
	 * The dependency records collected from the event handlers are divided into
	 * two categories:
	 *
	 * - mutate: Handlers in the mutate/domUI queues
	 * - derive: Handlers in the notify queue
	 *
	 * Since event handlers are added by default to the "mutate" queue, calling
	 * `@@can.getWhatIChange` on the `me` instance returns an object with a mutate
	 * property and the `valueDependencies` Set registered on the `onAgeChange`
	 * handler.
	 *
	 * Please check out the [can-reflect-dependencies] docs to learn more about
	 * how this symbol is used to keep track of custom observable dependencies.
	 */
	"can.getWhatIChange": function getWhatIChange(key) {
		//!steal-remove-end
	},
	"can.onPatches": function(handler, queue) {
		var handlers = ensureMeta(this).handlers;
		handlers.add(["can.patches", "onKeyValue", queue || "notify", handler]);
	},
	"can.offPatches": function(handler, queue) {
		var handlers = ensureMeta(this).handlers;
		handlers.delete(["can.patches", "onKeyValue", queue || "notify", handler]);
	}
};

// This can be removed in a future version.
function defineNonEnumerable(obj, prop, value) {
	Object.defineProperty(obj, prop, {
		enumerable: false,
		value: value
	});
}

// The actual legacyMapBindings mixin function
legacyMapBindings = function(obj) {
	// add properties
	canReflect.assignMap(obj, props);
	// add symbols
	return canReflect.assignSymbols(obj, symbols$1);
};

defineNonEnumerable(legacyMapBindings, "addHandlers", addHandlers);
defineNonEnumerable(legacyMapBindings, "stopListeningArgumentsToKeys", stopListeningArgumentsToKeys);



// ## LEGACY
// The following is for compatability with the old can-event
props.bind = props.addEventListener;
props.unbind = props.removeEventListener;



// Adds methods directly to method so it can be used like `can-event` used to be used.
canReflect.assignMap(legacyMapBindings, props);
canReflect.assignSymbols(legacyMapBindings, symbols$1);

defineNonEnumerable(legacyMapBindings, "start", function() {
	console.warn("use can-queues.batch.start()");
	canQueues.batch.start();
});
defineNonEnumerable(legacyMapBindings, "stop", function() {
	console.warn("use can-queues.batch.stop()");
	canQueues.batch.stop();
});
defineNonEnumerable(legacyMapBindings, "flush", function() {
	console.warn("use can-queues.flush()");
	canQueues.flush();
});

defineNonEnumerable(legacyMapBindings, "afterPreviousEvents", function(handler) {
	console.warn("don't use afterPreviousEvents");
	canQueues.mutateQueue.enqueue(function afterPreviousEvents() {
		canQueues.mutateQueue.enqueue(handler);
	});
	canQueues.flush();
});

defineNonEnumerable(legacyMapBindings, "after", function(handler) {
	console.warn("don't use after");
	canQueues.mutateQueue.enqueue(handler);
	canQueues.flush();
});

var map = legacyMapBindings;

// this is a very simple can-map like object
var SimpleMap = canConstruct.extend("SimpleMap",
	{
		// ### setup
		// A setup function for the instantiation of a simple-map.
		setup: function(initialData){
			this._data = {};
			if(initialData && typeof initialData === "object") {
				this.attr(initialData);
			}
		},
		// ### attr
		// The main get/set interface simple-map.
		// Either sets or gets one or more properties depending on how it is called.
		attr: function(prop, value) {
			var self = this;

			if(arguments.length === 0 ) {
				canObservationRecorder.add(this,"can.keys");
				var data = {};
				canReflect.eachKey(this._data, function(value, prop){
					canObservationRecorder.add(this, prop);
					data[prop] = value;
				}, this);
				return data;
			}
			else if(arguments.length > 1) {
				var had = this._data.hasOwnProperty(prop);
				var old = this._data[prop];
				this._data[prop] = value;
				if(old !== value) {
					//!steal-remove-end

					var dispatched = {
						keyChanged: !had ? prop : undefined,
						type: prop
					};
					//!steal-remove-end

					this.dispatch(dispatched, [value, old]);
				}

			}
			// 1 argument
			else if(typeof prop === 'object') {
				canQueues.batch.start();
				canReflect.eachKey(prop, function(value, key) {
					self.attr(key, value);
				});
				canQueues.batch.stop();
			}
			else {
				if(prop !== "constructor") {
					canObservationRecorder.add(this, prop);
					return this._data[prop];
				}

				return this.constructor;
			}
		},
		serialize: function(){
			return canReflect.serialize(this, Map);
		},
		get: function(){
			return this.attr.apply(this, arguments);
		},
		set: function(){
			return this.attr.apply(this, arguments);
		},
		// call `.log()` to log all property changes
		// pass a single property to only get logs for said property, e.g: `.log("foo")`
		log: function(key) {
			//!steal-remove-end
		}
	}
);

map(SimpleMap.prototype);

var simpleMapProto = {
	// -type-
	"can.isMapLike": true,
	"can.isListLike": false,
	"can.isValueLike": false,

	// -get/set-
	"can.getKeyValue": SimpleMap.prototype.get,
	"can.setKeyValue": SimpleMap.prototype.set,
	"can.deleteKeyValue": function(prop) {
		var dispatched;
		if( this._data.hasOwnProperty(prop) ) {
			var old = this._data[prop];
			delete this._data[prop];
			//!steal-remove-end
			dispatched = {
				keyChanged: prop,
				type: prop
			};
			//!steal-remove-end
			this.dispatch(dispatched, [undefined, old]);
		}
	},


	// -shape
	"can.getOwnEnumerableKeys": function(){
		canObservationRecorder.add(this, 'can.keys');
		return Object.keys(this._data);
	},

	// -shape get/set-
	"can.assignDeep": function(source){
		canQueues.batch.start();
		// TODO: we should probably just throw an error instead of cleaning
		canReflect.assignMap(this, source);
		canQueues.batch.stop();
	},
	"can.updateDeep": function(source){
		canQueues.batch.start();
		// TODO: we should probably just throw an error instead of cleaning
		canReflect.updateMap(this, source);
		canQueues.batch.stop();
	},
	"can.keyHasDependencies": function(key) {
		return false;
	},
	"can.getKeyDependencies": function(key) {
		return undefined;
	},
	"can.hasOwnKey": function(key){
		return this._data.hasOwnProperty(key);
	}
};
//!steal-remove-end
canReflect.assignSymbols(SimpleMap.prototype,simpleMapProto);

// Setup other symbols


var canSimpleMap = SimpleMap;

var TemplateContext = function(options) {
	options = options || {};
	this.vars = new canSimpleMap(options.vars || {});
	this.helpers = new canSimpleMap(options.helpers || {});
	this.partials = new canSimpleMap(options.partials || {});
	this.tags = new canSimpleMap(options.tags || {});
};

var templateContext = TemplateContext;

/**
 * @module {function} can-define-lazy-value
 * @parent can-js-utilities
 * @collection can-infrastructure
 * @package ./package.json
 * @signature `defineLazyValue(obj, prop, fn, writable)`
 *
 * Use Object.defineProperty to define properties whose values will be created lazily when they are first read.
 *
 * ```js
 * var _id = 1;
 * function getId() {
 *     return _id++;
 * }
 *
 * function MyObj(name) {
 *     this.name = name;
 * }
 *
 * defineLazyValue(MyObj.prototype, 'id', getId);
 *
 * var obj1 = new MyObj('obj1');
 * var obj2 = new MyObj('obj2');
 *
 * console.log( obj2 ); // -> { name: "obj2" }
 * console.log( obj1 ); // -> { name: "obj1" }
 *
 * // the first `id` read will get id `1`
 * console( obj2.id ); // -> 1
 * console( obj1.id ); // -> 2
 *
 * console.log( obj2 ); // -> { name: "obj2", id: 1 }
 * console.log( obj1 ); // -> { name: "obj1", id: 2 }
 *
 * ```
 *
 * @param {Object} object The object to add the property to.
 * @param {String} prop   The name of the property.
 * @param {Function} fn   A function to get the value the property should be set to.
 * @param {boolean} writable   Whether the field should be writable (false by default).
 */
var defineLazyValue = function defineLazyValue(obj, prop, initializer, writable) {
	Object.defineProperty(obj, prop, {
		configurable: true,
		get: function() {
			// make the property writable
			Object.defineProperty(this, prop, {
				value: undefined,
				writable: true
			});

			// get the value from the initializer function
			var value = initializer.call(this, obj, prop);

			// redefine the property to the value property
			// and reset the writable flag
			Object.defineProperty(this, prop, {
				value: value,
				writable: !!writable
			});

			// return the value
			return value;
		},
		set: function(value){
			Object.defineProperty(this, prop, {
				value: value,
				writable: !!writable
			});

			return value;
		}
	});
};

var properties = {
	/**
	 * @function can-event-queue/value/value.on on
	 * @parent can-event-queue/value/value
	 *
	 * @description Listen to changes in the observable's value.
	 *
	 * @signature `.on( handler[, queue='mutate'] )`
	 *
	 * This adds an event handler in the observable's [can-event-queue/value/value.handlers]
	 * tree. If this is the first handler, the observable's [can-event-queue/value/value.onBound] method is called.
	 *
	 * ```js
	 * observable.on(function(newVal){ ... });
	 * observable.on(function(newVal){ ... }, "notify");
	 * ```
	 *
	 * @param {function(*)} handler(newValue,oldValue) A handler that will be called with the new value of the
	 * observable and optionally the old value of the observable.
	 * @param {String} [queue] The [can-queues] queue this event handler should be bound to.  By default the handler will
	 * be called within the `mutate` queue.
	 */
	on: function(handler, queue) {
		this.handlers.add([queue || "mutate", handler]);
	},
	/**
	 * @function can-event-queue/value/value.off off
	 * @parent can-event-queue/value/value
	 *
	 * @description Stop listening to changes in the observable's value.
	 *
	 * @signature `.off( [handler [, queue='mutate']] )`
	 *
	 * Removes one or more event handler in the observable's [can-event-queue/value/value.handlers]
	 * tree. If the las handler is removed, the observable's [can-event-queue/value/value.onUnbound] method is called.
	 *
	 * ```js
	 * observable.off(function(newVal){ ... });
	 * observable.off(function(newVal){ ... }, "notify");
	 * observable.off();
	 * observable.off(undefined, "mutate");
	 * ```
	 *
	 * @param {function(*)} handler(newValue,oldValue) The handler to be removed.  If no handler is provided and no
	 * `queue` is provided, all handlers will be removed.
	 * @param {String} [queue] The [can-queues] queue this event handler should be removed from.
	 *
	 *  If a `handler` is
	 *  provided and no `queue` is provided, the `queue` will default to `"mutate"`.
	 *
	 *   If a `handler` is not provided, but a `queue` is provided, all handlers for the provided queue will be
	 *   removed.
	 */
	off: function(handler, queueName) {
		if (handler === undefined) {
			if (queueName === undefined) {
				this.handlers.delete([]);
			} else {
				this.handlers.delete([queueName]);
			}
		} else {
			this.handlers.delete([queueName || "mutate", handler]);
		}
	}
};

var symbols = {
	/**
	 * @function can-event-queue/value/value.can.onValue @can.onValue
	 * @parent can-event-queue/value/value
	 *
	 * @description Listen to changes in this observable value.
	 *
	 * This is an alias for [can-event-queue/value/value.on].  It satisfies [can-reflect].[can-reflect/observe.onValue].
	 */
	"can.onValue": properties.on,
	/**
	 * @function can-event-queue/value/value.can.offValue @can.offValue
	 * @parent can-event-queue/value/value
	 *
	 * @description Stop listening to changes in this observable value.
	 *
	 * This is an alias for [can-event-queue/value/value.off].  It satisfies [can-reflect].[can-reflect/observe.offValue].
	 */
	"can.offValue": properties.off,
	/**
	 * @function can-event-queue/value/value.can.dispatch @can.dispatch
	 * @parent can-event-queue/value/value
	 *
	 * @description Dispatch all event handlers within their appropriate queues.
	 *
	 * @signature `@can.dispatch(newValue, oldValue)`
	 *
	 * This is a helper method that will dispatch all [can-event-queue/value/value.handlers] within
	 * their appropriate [can-queues] queue.
	 *
	 * Furthermore, it will make sure the handlers include useful meta data for debugging.
	 *
	 * ```js
	 * var observable = mixinValueBindings({});
	 * observable[canSymbol.for("can.dispatch")]( 2, 1 );
	 * ```
	 *
	 * @param {Any} newValue The new value of the observable.
	 * @param {Any} oldValue The old value of the observable.
	 */
	"can.dispatch": function(value, old) {
		var queuesArgs = [];
		queuesArgs = [
			this.handlers.getNode([]),
			this,
			[value, old]
		];
		//!steal-remove-end
		canQueues.enqueueByQueue.apply(canQueues, queuesArgs);
		//!steal-remove-end
	},
	/**
	 * @function can-event-queue/value/value.can.getWhatIChange @can.getWhatIChange
	 * @parent can-event-queue/value/value
	 *
	 * @description Return observables whose values are affected by attached event handlers
	 * @signature `@can.getWhatIChange()`
	 *
	 * The `@@can.getWhatIChange` symbol is added to make sure [can-debug] can report
	 * all the observables whose values are set by value-like observables.
	 *
	 * This function iterates over the event handlers attached to  the observable's value
	 * event and collects the result of calling `@@can.getChangesDependencyRecord` on each
	 * handler; this symbol allows the caller to tell what observables are being mutated
	 * by the event handler when it is executed.
	 *
	 * In the following example a [can-simple-observable] instance named `month` is
	 * created and when its value changes the `age` property of the `map` [can-simple-map]
	 * instance is set. The event handler that causes the mutation is then decatorated with
	 * `@@can.getChangesDependencyRecord` to register the mutation dependency.
	 *
	 * ```js
	 * var month = new SimpleObservable(11);
	 * var map = new SimpleMap({ age: 30 });
	 * var canReflect = require("can-reflect");
	 *
	 * var onValueChange = function onValueChange() {
	 *	map.set("age", 31);
	 * };
	 *
	 * onValueChange[canSymbol.for("can.getChangesDependencyRecord")] = function() {
	 *	return {
	 *		keyDependencies: new Map([ [map, new Set(["age"])] ])
	 *	}
	 * };
	 *
	 * canReflect.onValue(month, onValueChange);
	 * month[canSymbol.for("can.getWhatIChange")]();
	 * ```
	 *
	 * The dependency records collected from the event handlers are divided into
	 * two categories:
	 *
	 * - mutate: Handlers in the mutate/domUI queues
	 * - derive: Handlers in the notify queue
	 *
	 * Since event handlers are added by default to the "mutate" queue, calling
	 * `@@can.getWhatIChange` on the `month` instance returns an object with a mutate
	 * property and the `keyDependencies` Map registered on the `onValueChange` handler.
	 *
	 * If multiple event handlers were attached to `month`, the dependency records
	 * of each handler are merged by `@@can.getWhatIChange`. Please check out the
	 * [can-reflect-dependencies] docs to learn more about how this symbol is used
	 * to keep track of custom observable dependencies.
	 */
	"can.getWhatIChange": function getWhatIChange() {
		//!steal-remove-end
	},

	/**
	 * @function can-event-queue/value/value.can.isBound @can.isBound
	 * @parent can-event-queue/value/value
	 */
	"can.isBound": function isBound() {
		return !this.handlers.isEmpty();
	}
};

/**
 * @property {can-key-tree} can-event-queue/value/value.handlers handlers
 * @parent can-event-queue/value/value
 *
 * @description Access the handlers tree directly.
 *
 * @type {can-key-tree}
 *
 *  The handlers property is a [can-define-lazy-value lazily] defined property containing
 *  all handlers bound with [can-event-queue/value/value.on] and
 *  [can-event-queue/value/value.can.onValue].  It is a [can-key-tree] defined like:
 *
 *  ```js
 *  this.handlers = new KeyTree([Object, Array])
 *  ```
 *
 *  It is configured to call [can-event-queue/value/value.onBound] and
 *  [can-event-queue/value/value.onUnbound] on the instances when the first item is
 *  added to the tree and when the tree is emptied.
 */
function defineLazyHandlers(){
	return new canKeyTree([Object, Array], {
		onFirst: this.onBound !== undefined && this.onBound.bind(this),
		onEmpty: this.onUnbound !== undefined && this.onUnbound.bind(this)
	});
}

/**
 * @function can-event-queue/value/value.onBound onBound
 * @parent can-event-queue/value/value
 *
 * @description Perform operations when an observable is gains its first event handler.
 *
 * @signature `.onBound()`
 *
 * This method is not implemented by `can-event-queue/value/value`. Instead, the object
 * should implement it if it wants to perform some actions when it becomes bound.
 *
 * ```js
 * var mixinValueBindings = require("can-event-queue/value/value");
 *
 * var observable = mixinValueBindings({
 *   onBound: function(){
 *     console.log("I AM BOUND!");
 *   }
 * });
 *
 * observable.on(function(){});
 * // Logs: "I AM BOUND!"
 * ```
 *
 */

/**
 * @function can-event-queue/value/value.onUnbound onUnbound
 * @parent can-event-queue/value/value
 *
 * @description Perform operations when an observable loses all of its event handlers.
 *
 * @signature `.onBound()`
 *
 * This method is not implemented by `can-event-queue/value/value`. Instead, the object
 * should implement it if it wants to perform some actions when it becomes unbound.
 *
 * ```js
 * var mixinValueBindings = require("can-event-queue/value/value");
 *
 * var observable = mixinValueBindings({
 *   onUnbound: function(){
 *     console.log("I AM UNBOUND!");
 *   }
 * });
 * var handler = function(){}
 * observable.on(function(){});
 * observable.off(function(){});
 * // Logs: "I AM UNBOUND!"
 * ```
 */

/**
 * @module {function} can-event-queue/value/value
 * @parent can-event-queue
 *
 * @description Mixin methods and symbols to make this object or prototype object
 * behave like a single-value observable.
 *
 * @signature `mixinValueBindings( obj )`
 *
 * Adds symbols and methods that make `obj` or instances having `obj` on their prototype
 * behave like single-value observables.
 *
 * When `mixinValueBindings` is called on an `obj` like:
 *
 * ```js
 * var mixinValueBindings = require("can-event-queue/value/value");
 *
 * var observable = mixinValueBindings({});
 *
 * observable.on(function(newVal, oldVal){
 *   console.log(newVal);
 * });
 *
 * observable[canSymbol.for("can.dispatch")](2,1);
 * // Logs: 2
 * ```
 *
 * `mixinValueBindings` adds the following properties and symbols to the object:
 *
 * - [can-event-queue/value/value.on]
 * - [can-event-queue/value/value.off]
 * - [can-event-queue/value/value.can.dispatch]
 * - [can-event-queue/value/value.can.getWhatIChange]
 * - [can-event-queue/value/value.handlers]
 *
 * When the object is bound to for the first time with `.on` or `@can.onValue`, it will look for an [can-event-queue/value/value.onBound]
 * function on the object and call it.
 *
 * When the object is has no more handlers, it will look for an [can-event-queue/value/value.onUnbound]
 * function on the object and call it.
 */
var mixinValueEventBindings = function(obj) {
	canReflect.assign(obj, properties);
	canReflect.assignSymbols(obj, symbols);
	defineLazyValue(obj,"handlers",defineLazyHandlers, true);
	return obj;
};

// callbacks is optional
mixinValueEventBindings.addHandlers = function(obj, callbacks) {
	console.warn("can-event-queue/value: Avoid using addHandlers. Add onBound and onUnbound methods instead.");
	obj.handlers = new canKeyTree([Object, Array], callbacks);
	return obj;
};

var value = mixinValueEventBindings;

// # Recorder Dependency Helpers
// This exposes two helpers:
// - `updateObservations` - binds and unbinds a diff of two observation records
//   (see can-observation-recorder for details on this data type).
// - `stopObserving` - unbinds an observation record.




// ## Helpers
// The following helpers all use `this` to pass additional arguments. This
// is for performance reasons as it avoids creating new functions.

function addNewKeyDependenciesIfNotInOld(event) {
    // Expects `this` to have:
    // - `.observable` - the observable we might be binding to.
    // - `.oldEventSet` - the bound keys on the old dependency record for `observable`.
    // - `.onDependencyChange` - the handler we will call back when the key is changed.
    // If there wasn't any keys, or when we tried to delete we couldn't because the key
    // wasn't in the set, start binding.
    if(this.oldEventSet === undefined || this.oldEventSet["delete"](event) === false) {
        canReflect.onKeyValue(this.observable, event, this.onDependencyChange,"notify");
    }
}

// ### addObservablesNewKeyDependenciesIfNotInOld
// For each event in the `eventSet` of new observables,
// setup a binding (or delete the key).
function addObservablesNewKeyDependenciesIfNotInOld(eventSet, observable){
    eventSet.forEach(addNewKeyDependenciesIfNotInOld, {
        onDependencyChange: this.onDependencyChange,
        observable: observable,
        oldEventSet: this.oldDependencies.keyDependencies.get(observable)
    });
}

function removeKeyDependencies(event) {
    canReflect.offKeyValue(this.observable, event, this.onDependencyChange,"notify");
}

function removeObservablesKeyDependencies(oldEventSet, observable){
    oldEventSet.forEach(removeKeyDependencies, {onDependencyChange: this.onDependencyChange, observable: observable});
}

function addValueDependencies(observable) {
    // If we were unable to delete the key in the old set, setup a binding.
    if(this.oldDependencies.valueDependencies.delete(observable) === false) {
        canReflect.onValue(observable, this.onDependencyChange,"notify");
    }
}
function removeValueDependencies(observable) {
    canReflect.offValue(observable, this.onDependencyChange,"notify");
}


var recorderDependencyHelpers = {
    // ## updateObservations
    //
    // Binds `observationData.onDependencyChange` to dependencies in `observationData.newDependencies` that are not currently in
    // `observationData.oldDependencies`.  Anything in `observationData.oldDependencies`
    // left over is unbound.
    //
    // The algorthim works by:
    // 1. Loop through the `new` dependencies, checking if an equivalent is in the `old` bindings.
    //    - If there is an equivalent binding, delete that dependency from `old`.
    //    - If there is __not__ an equivalent binding, setup a binding from that dependency to `.onDependencyChange`.
    // 2. Loop through the remaining `old` dependencies, teardown bindings.
    //
    // For performance, this method mutates the values in `.oldDependencies`.
    updateObservations: function(observationData){
        observationData.newDependencies.keyDependencies.forEach(addObservablesNewKeyDependenciesIfNotInOld, observationData);
        observationData.oldDependencies.keyDependencies.forEach(removeObservablesKeyDependencies, observationData);
        observationData.newDependencies.valueDependencies.forEach(addValueDependencies, observationData);
        observationData.oldDependencies.valueDependencies.forEach(removeValueDependencies, observationData);
    },
    stopObserving: function(observationReciever, onDependencyChange){
        observationReciever.keyDependencies.forEach(removeObservablesKeyDependencies, {onDependencyChange: onDependencyChange});
        observationReciever.valueDependencies.forEach(removeValueDependencies, {onDependencyChange: onDependencyChange});
    }
};

var temporarilyBoundNoOperation = function(){};
// A list of temporarily bound computes
var observables;
// Unbinds all temporarily bound computes.
var unbindTemporarilyBoundValue = function () {
	for (var i = 0, len = observables.length; i < len; i++) {
		canReflect.offValue(observables[i], temporarilyBoundNoOperation);
	}
	observables = null;
};

// ### temporarilyBind
// Binds computes for a moment to cache their value and prevent re-calculating it.
function temporarilyBind(compute) {
	var computeInstance = compute.computeInstance || compute;
	canReflect.onValue(computeInstance, temporarilyBoundNoOperation);
	if (!observables) {
		observables = [];
		setTimeout(unbindTemporarilyBoundValue, 10);
	}
	observables.push(computeInstance);
}

var temporarilyBind_1 = temporarilyBind;

/* global require */
// # can-observation












var dispatchSymbol$2 = canSymbol.for("can.dispatch");
canSymbol.for("can.getChangesDependencyRecord");
var getValueDependenciesSymbol$1 = canSymbol.for("can.getValueDependencies");

// ## Observation constructor
function Observation(func, context, options){
	this.deriveQueue = canQueues.deriveQueue;

	this.func = func;
	this.context = context;
	this.options = options || {priority: 0, isObservable: true};
	// A flag if we are bound or not
	this.bound = false;

	// Set _value to undefined so can-view-scope & can-compute can check for it
	this._value = undefined;

	// These properties will manage what our new and old dependencies are.
	this.newDependencies = canObservationRecorder.makeDependenciesRecord();
	this.oldDependencies = null;

	// Make functions we need to pass around and maintain `this`.
	var self = this;
	this.onDependencyChange = function(newVal){
		self.dependencyChange(this, newVal);
	};
	this.update = this.update.bind(this);
	//!steal-remove-end
}

// ## Observation prototype methods

// Mixin value event bindings. This is where the following are added:
// - `.handlers` which call `onBound` and `onUnbound`
// - `.on` / `.off`
// - `can.onValue` `can.offValue`
// - `can.getWhatIChange`
value(Observation.prototype);

canReflect.assign(Observation.prototype, {
	// Starts observing changes and adds event listeners.
	onBound: function(){
		this.bound = true;

		// Store the old dependencies
		this.oldDependencies = this.newDependencies;
		// Start recording dependencies.
		canObservationRecorder.start(this._name);
		// Call the observation's function and update the new value.
		this._value = this.func.call(this.context);
		// Get the new dependencies.
		this.newDependencies = canObservationRecorder.stop();

		// Diff and update the bindings. On change, everything will call
		// `this.onDependencyChange`, which calls `this.dependencyChange`.
		recorderDependencyHelpers.updateObservations(this);
	},
	// This is called when any of the dependencies change.
	// It queues up an update in the `deriveQueue` to be run after all source
	// observables have had time to notify all observables that "derive" their value.
	dependencyChange: function(context, args){
		if(this.bound === true) {
			var queuesArgs = [];
			queuesArgs = [
				this.update,
				this,
				[],
				{
					priority: this.options.priority,
					element: this.options.element
				}
			];
			//!steal-remove-end
			// Update this observation after all `notify` tasks have been run.
			this.deriveQueue.enqueue.apply(this.deriveQueue, queuesArgs);
		}
	},
	// Called to update its value as part of the `derive` queue.
	update: function() {
		if (this.bound === true) {
			// Keep the old value.
			var oldValue = this._value;
			this.oldValue = null;
			// Re-run `this.func` and update dependency bindings.
			this.onBound();
			// If our value changed, call the `dispatch` method provided by `can-event-queue/value/value`.
			if (oldValue !== this._value) {
				this[dispatchSymbol$2](this._value, oldValue);
			}
		}
	},
	// Called when nothing is bound to this observation.
	// Removes all event listeners on all dependency observables.
	onUnbound: function(){
		this.bound = false;
		recorderDependencyHelpers.stopObserving(this.newDependencies, this.onDependencyChange);
		// Setup newDependencies in case someone binds again to this observable.
		this.newDependencies = canObservationRecorder.makeDependenciesRecord();
	},
	// Reads the value of the observation.
	get: function(){

		// If an external observation is tracking observables and
		// this compute can be listened to by "function" based computes ....
		if( this.options.isObservable && canObservationRecorder.isRecording() ) {

			// ... tell the tracking compute to listen to change on this observation.
			canObservationRecorder.add(this);
			// ... if we are not bound, we should bind so that
			// we don't have to re-read to get the value of this observation.
			if (this.bound === false) {
				Observation.temporarilyBind(this);
			}

		}


		if(this.bound === true ) {
			// It's possible that a child dependency of this observable might be queued
			// to change. Check all child dependencies and make sure they are up-to-date by
			// possibly running what they have registered in the derive queue.
			if(this.deriveQueue.tasksRemainingCount() > 0) {
				Observation.updateChildrenAndSelf(this);
			}

			return this._value;
		} else {
			// If we are not bound, just call the function.
			return this.func.call(this.context);
		}
	},

	hasDependencies: function(){
		var newDependencies = this.newDependencies;
		return this.bound ?
			(newDependencies.valueDependencies.size + newDependencies.keyDependencies.size) > 0  :
			undefined;
	},
	log: function() {
		//!steal-remove-end
	}
});

Object.defineProperty(Observation.prototype, "value", {
	get: function() {
		return this.get();
	}
});

var observationProto = {
	"can.getValue": Observation.prototype.get,
	"can.isValueLike": true,
	"can.isMapLike": false,
	"can.isListLike": false,
	"can.valueHasDependencies": Observation.prototype.hasDependencies,
	"can.getValueDependencies": function(){
		if (this.bound === true) {
			// Only provide `keyDependencies` and `valueDependencies` properties
			// if there's actually something there.
			var deps = this.newDependencies,
				result = {};

			if (deps.keyDependencies.size) {
				result.keyDependencies = deps.keyDependencies;
			}

			if (deps.valueDependencies.size) {
				result.valueDependencies = deps.valueDependencies;
			}

			return result;
		}
		return undefined;
	},
	"can.getPriority": function(){
		return this.options.priority;
	},
	"can.setPriority": function(priority){
		this.options.priority = priority;
	},
	"can.setElement": function(element) {
		this.options.element = element;
		this.deriveQueue = canQueues.domQueue || canQueues.deriveQueue;
	}
};
//!steal-remove-end
canReflect.assignSymbols(Observation.prototype, observationProto);

// ## Observation.updateChildrenAndSelf
// This recursively checks if an observation's dependencies might be in the `derive` queue.
// If it is, we need to update that value so the reading of this value will be correct.
// This can happen if an observation suddenly switches to depending on something that has higher
// priority than itself.  We need to make sure that value is completely updated.
Observation.updateChildrenAndSelf = function(observation){
	// If the observable has an `update` method and it's enqueued, flush that task immediately so
	// the value is right.
	// > NOTE: This only works for `Observation` right now.  We need a way of knowing how
	// > to find what an observable might have in the `deriveQueue`.
	if(observation.update !== undefined && observation.deriveQueue.isEnqueued( observation.update ) === true) {
		// TODO: In the future, we should be able to send log information
		// to explain why this needed to be updated.
		observation.deriveQueue.flushQueuedTask(observation.update);
		return true;
	}

	// If we can get dependency values from this observable ...
	if(observation[getValueDependenciesSymbol$1]) {
		// ... Loop through each dependency and see if any of them (or their children) needed an update.
		var childHasChanged = false;
		var valueDependencies = observation[getValueDependenciesSymbol$1]().valueDependencies || [];
		valueDependencies.forEach(function(observable){
			if( Observation.updateChildrenAndSelf( observable ) === true) {
				childHasChanged = true;
			}
		});
		return childHasChanged;
	} else {
		return false;
	}
};

// ## Legacy Stuff
// Warn when `ObservationRecorder` methods are called on `Observation`.
var alias = {addAll: "addMany"};
["add","addAll","ignore","trap","trapsCount","isRecording"].forEach(function(methodName){
	Observation[methodName] = function(){
		var name = alias[methodName] ? alias[methodName] : methodName;
		console.warn("can-observation: Call "+name+"() on can-observation-recorder.");
		return canObservationRecorder[name].apply(this, arguments);
	};
});
Observation.prototype.start = function(){
	console.warn("can-observation: Use .on and .off to bind.");
	return this.onBound();
};
Observation.prototype.stop = function(){
	console.warn("can-observation: Use .on and .off to bind.");
	return this.onUnbound();
};

// ### temporarilyBind
// Will bind an observable value temporarily.  This should be part of queues probably.
Observation.temporarilyBind = temporarilyBind_1;


var canObservation = canNamespace.Observation = Observation;

var canCid = createCommonjsModule(function (module) {

/**
 * @module {function} can-cid
 * @parent can-typed-data
 * @collection can-infrastructure
 * @package ./package.json
 * @description Utility for getting a unique identifier for an object.
 * @signature `cid(object, optionalObjectType)`
 *
 * Get a unique identifier for the object, optionally prefixed by a type name.
 *
 * Once set, the unique identifier does not change, even if the type name
 * changes on subsequent calls.
 *
 * ```js
 * var cid = require("can-cid");
 * var x = {};
 * var y = {};
 *
 * console.log(cid(x, "demo")); // -> "demo1"
 * console.log(cid(x, "prod")); // -> "demo1"
 * console.log(cid(y));         // -> "2"
 * ```
 *
 * @param {Object} object The object to uniquely identify.
 * @param {String} name   An optional type name with which to prefix the identifier
 *
 * @return {String} Returns the unique identifier
 */
var _cid = 0;
// DOM nodes shouldn't all use the same property
var domExpando = "can" + new Date();
var cid = function (object, name) {
	var propertyName = object.nodeName ? domExpando : "_cid";

	if (!object[propertyName]) {
		_cid++;
		object[propertyName] = (name || '') + _cid;
	}
	return object[propertyName];
};
cid.domExpando = domExpando;
cid.get = function(object){
	var type = typeof object;
	var isObject = type !== null && (type === "object" || type === "function");
	return isObject ? cid(object) : (type + ":" + object);
};

if (canNamespace.cid) {
	throw new Error("You can't have two versions of can-cid, check your dependencies");
} else {
	module.exports = canNamespace.cid = cid;
}
});

var singleReference;

function getKeyName(key, extraKey) {
	var keyName = extraKey ? canCid(key) + ":" + extraKey : canCid(key);
	return keyName || key;
}

// weak maps are slow
/* if(typeof WeakMap !== "undefined") {
	var globalMap = new WeakMap();
	singleReference = {
		set: function(obj, key, value){
			var localMap = globalMap.get(obj);
			if( !localMap ) {
				globalMap.set(obj, localMap = new WeakMap());
			}
			localMap.set(key, value);
		},
		getAndDelete: function(obj, key){
			return globalMap.get(obj).get(key);
		},
		references: globalMap
	};
} else {*/
singleReference = {
	// obj is a function ... we need to place `value` on it so we can retreive it
	// we can't use a global map
	set: function(obj, key, value, extraKey){
		// check if it has a single reference map
		obj[getKeyName(key, extraKey)] = value;
	},

	getAndDelete: function(obj, key, extraKey){
		var keyName = getKeyName(key, extraKey);
		var value = obj[keyName];
		delete obj[keyName];
		return value;
	}
};
/*}*/

var canSingleReference = singleReference;

var Compute = function(newVal){
	if(arguments.length) {
		return canReflect.setValue(this, newVal);
	} else {
		return canReflect.getValue(this);
	}
};

var makeComputeLike = function(observable) {
    var compute = Compute.bind(observable);
	//!steal-remove-end

    compute.on = compute.bind = compute.addEventListener = function(event, handler) {
        var translationHandler = function(newVal, oldVal) {
            handler.call(compute, {type:'change'}, newVal, oldVal);
        };
        canSingleReference.set(handler, this, translationHandler);
        observable.on(translationHandler);
    };
    compute.off = compute.unbind = compute.removeEventListener = function(event, handler) {
        observable.off( canSingleReference.getAndDelete(handler, this) );
    };

    canReflect.assignSymbols(compute, {
        "can.getValue": function(){
            return canReflect.getValue(observable);
        },
        "can.setValue": function(newVal){
            return canReflect.setValue(observable, newVal);
        },
        "can.onValue": function(handler, queue){
            return canReflect.onValue(observable, handler, queue);
        },
        "can.offValue": function(handler, queue){
            return canReflect.offValue(observable, handler, queue);
        },
        "can.valueHasDependencies": function(){
            return canReflect.valueHasDependencies(observable);
        },
        "can.getPriority": function(){
    		return canReflect.getPriority( observable );
    	},
    	"can.setPriority": function(newPriority){
    		canReflect.setPriority( observable, newPriority );
    	},
		"can.isValueLike": true,
		"can.isFunctionLike": false
    });
    compute.isComputed = true;
    return compute;
};

// DependencyRecord :: { keyDependencies: Map, valueDependencies: Set }
var makeDependencyRecord = function makeDependencyRecord() {
	return {
		keyDependencies: new Map(),
		valueDependencies: new Set()
	};
};

var makeRootRecord = function makeRootRecord() {
	return {
		// holds mutated key dependencies of a key-value like object, e.g:
		// if person.first is mutated by other observable, this map will have a
		// key `first` (the mutated property) mapped to a DependencyRecord
		mutateDependenciesForKey: new Map(),

		// holds mutated value dependencies of value-like objects
		mutateDependenciesForValue: makeDependencyRecord()
	};
};

var addMutatedBy = function(mutatedByMap) {
	return function addMutatedBy(mutated, key, mutator) {
		var gotKey = arguments.length === 3;

		// normalize arguments
		if (arguments.length === 2) {
			mutator = key;
			key = undefined;
		}

		// normalize mutator when shorthand is used
		if (!mutator.keyDependencies && !mutator.valueDependencies) {
			var s = new Set();
			s.add(mutator);
			mutator = { valueDependencies:s };
		}

		// retrieve root record from the state map or create a new one
		var root = mutatedByMap.get(mutated);
		if (!root) {
			root = makeRootRecord();
			mutatedByMap.set(mutated, root);
		}

		// create a [key] DependencyRecord if [key] was provided
		// and Record does not already exist
		if (gotKey && !root.mutateDependenciesForKey.get(key)) {
			root.mutateDependenciesForKey.set(key, makeDependencyRecord());
		}

		// retrieve DependencyRecord
		var dependencyRecord = gotKey ?
			root.mutateDependenciesForKey.get(key) :
			root.mutateDependenciesForValue;

		if (mutator.valueDependencies) {
			canReflect.addValues(
				dependencyRecord.valueDependencies,
				mutator.valueDependencies
			);
		}

		if (mutator.keyDependencies) {
			canReflect.each(mutator.keyDependencies, function(keysSet, obj) {
				var entry = dependencyRecord.keyDependencies.get(obj);

				if (!entry) {
					entry = new Set();
					dependencyRecord.keyDependencies.set(obj, entry);
				}

				canReflect.addValues(entry, keysSet);
			});
		}
	};
};

var deleteMutatedBy = function(mutatedByMap) {
	return function deleteMutatedBy(mutated, key, mutator) {
		var gotKey = arguments.length === 3;
		var root = mutatedByMap.get(mutated);

		// normalize arguments
		if (arguments.length === 2) {
			mutator = key;
			key = undefined;
		}

		// normalize mutator when shorthand is used
		if (!mutator.keyDependencies && !mutator.valueDependencies) {
			var s = new Set();
			s.add(mutator);
			mutator = { valueDependencies: s };
		}

		var dependencyRecord = gotKey ?
			root.mutateDependenciesForKey.get(key) :
			root.mutateDependenciesForValue;

		if (mutator.valueDependencies) {
			canReflect.removeValues(
				dependencyRecord.valueDependencies,
				mutator.valueDependencies
			);
		}

		if (mutator.keyDependencies) {
			canReflect.each(mutator.keyDependencies, function(keysSet, obj) {
				var entry = dependencyRecord.keyDependencies.get(obj);

				if (entry) {
					canReflect.removeValues(entry, keysSet);
					if (!entry.size) {
						dependencyRecord.keyDependencies.delete(obj);
					}
				}
			});
		}
	};
};

var isFunction$1 = function isFunction(value) {
	return typeof value === "function";
};

var getWhatIChangeSymbol = canSymbol.for("can.getWhatIChange");
var getKeyDependenciesSymbol = canSymbol.for("can.getKeyDependencies");
var getValueDependenciesSymbol = canSymbol.for("can.getValueDependencies");

var getKeyDependencies = function getKeyDependencies(obj, key) {
	if (isFunction$1(obj[getKeyDependenciesSymbol])) {
		return canReflect.getKeyDependencies(obj, key);
	}
};

var getValueDependencies = function getValueDependencies(obj) {
	if (isFunction$1(obj[getValueDependenciesSymbol])) {
		return canReflect.getValueDependencies(obj);
	}
};

var getMutatedKeyDependencies =
	function getMutatedKeyDependencies(mutatedByMap, obj, key) {
		var root = mutatedByMap.get(obj);
		var dependencyRecord;

		if (root && root.mutateDependenciesForKey.has(key)) {
			dependencyRecord = root.mutateDependenciesForKey.get(key);
		}

		return dependencyRecord;
	};

var getMutatedValueDependencies =
	function getMutatedValueDependencies( mutatedByMap, obj) {
		var result;
		var root = mutatedByMap.get(obj);

		if (root) {
			var	dependencyRecord = root.mutateDependenciesForValue;

			if (dependencyRecord.keyDependencies.size) {
				result = result || {};
				result.keyDependencies = dependencyRecord.keyDependencies;
			}

			if (dependencyRecord.valueDependencies.size) {
				result = result || {};
				result.valueDependencies = dependencyRecord.valueDependencies;
			}
		}

		return result;
	};

var getWhatIChange = function getWhatIChange(obj, key) {
	if (isFunction$1(obj[getWhatIChangeSymbol])) {
		var gotKey = arguments.length === 2;

		return gotKey ?
			canReflect.getWhatIChange(obj, key) :
			canReflect.getWhatIChange(obj);
	}
};

var isEmptyRecord = function isEmptyRecord(record) {
	return (
		record == null ||
		!Object.keys(record).length ||
		(record.keyDependencies && !record.keyDependencies.size) &&
		(record.valueDependencies && !record.valueDependencies.size)
	);
};

var getWhatChangesMe = function getWhatChangesMe(mutatedByMap, obj, key) {
	var gotKey = arguments.length === 3;

	var mutate = gotKey ?
		getMutatedKeyDependencies(mutatedByMap, obj, key) :
		getMutatedValueDependencies(mutatedByMap, obj);

	var derive = gotKey ?
		getKeyDependencies(obj, key) :
		getValueDependencies(obj);

	if (!isEmptyRecord(mutate) || !isEmptyRecord(derive)) {
		return canAssign(
			canAssign(
				{},
				mutate ? { mutate: mutate } : null
			),
			derive ? { derive: derive } : null
		);
	}
};

var getDependencyDataOf = function(mutatedByMap) {
	return function getDependencyDataOf(obj, key) {
		var gotKey = arguments.length === 2;

		var whatChangesMe = gotKey ?
			getWhatChangesMe(mutatedByMap, obj, key) :
			getWhatChangesMe(mutatedByMap, obj);

		var whatIChange = gotKey ? getWhatIChange(obj, key) : getWhatIChange(obj);

		if (whatChangesMe || whatIChange) {
			return canAssign(
				canAssign(
					{},
					whatIChange ? { whatIChange: whatIChange } : null
				),
				whatChangesMe ? { whatChangesMe: whatChangesMe } : null
			);
		}
	};
};

// mutatedByMap :: WeakMap<obj, {
//	mutateDependenciesForKey:   Map<key, DependencyRecord>,
//	mutateDependenciesForValue: DependencyRecord
// }>
var mutatedByMap = new WeakMap();

var canReflectDependencies = {
	// Track mutations between observable as dependencies
	// addMutatedBy(obs, obs2);
	// addMutatedBy(obs, key, obs2);
	// addMutatedBy(obs, { valueDependencies: Set, keyDependencies: Map })
	// addMutatedBy(obs, key, { valueDependencies: Set, keyDependencies: Map })
	addMutatedBy: addMutatedBy(mutatedByMap),

	// Call this method with the same arguments as `addMutatedBy`
	// to unregister the mutation dependency
	deleteMutatedBy: deleteMutatedBy(mutatedByMap),

	// Returns an object with the dependecies of the given argument
	//	{
	//		whatIChange: { mutate: DependencyRecord, derive: DependencyRecord },
	//		whatChangesMe: { mutate: DependencyRecord, derive: DependencyRecord }
	//	}
	getDependencyDataOf: getDependencyDataOf(mutatedByMap)
};

var canStacheHelpers = createCommonjsModule(function (module) {


if (canNamespace.stacheHelpers) {
	throw new Error("You can't have two versions of can-stache-helpers, check your dependencies");
} else {
	module.exports = canNamespace.stacheHelpers = {};
}
});

// To add the `.log` function to a observable
// a.- Add the log function to the propotype:
//	   `Observable.propotype.log = log`
// b.- Make sure `._log` is called by the observable when mutation happens
//     `_.log` should be passed the current value and the value before the mutation
var log = function log() {
	//!steal-remove-end
};

var dispatchSymbol$1 = canSymbol.for("can.dispatch");

/**
 * @module {function} can-simple-observable
 * @parent can-observables
 * @collection can-infrastructure
 * @package ./package.json
 * @description Create an observable value.
 *
 * @signature `new SimpleObservable(initialValue)`
 *
 * Creates an observable value that can be read, written, and observed using [can-reflect].
 *
 * @param {*} initialValue The initial value of the observable.
 *
 * @return {can-simple-observable} An observable instance
 *
 * @body
 *
 * ## Use
 *
 * ```js
 *  var obs = new SimpleObservable('one');
 *
 *  canReflect.getValue(obs); // -> "one"
 *
 *  canReflect.setValue(obs, 'two');
 *  canReflect.getValue(obs); // -> "two"
 *
 *  function handler(newValue) {
 *    // -> "three"
 *  };
 *  canReflect.onValue(obs, handler);
 *  canReflect.setValue(obs, 'three');
 *
 *  canReflect.offValue(obs, handler);
 * ```
 */
function SimpleObservable(initialValue) {
	this._value = initialValue;
}

// mix in the value-like object event bindings
value(SimpleObservable.prototype);

canReflect.assignMap(SimpleObservable.prototype, {
	log: log,
	get: function(){
		canObservationRecorder.add(this);
		return this._value;
	},
	set: function(value){
		var old = this._value;
		this._value = value;

		this[dispatchSymbol$1](value, old);
	}
});
Object.defineProperty(SimpleObservable.prototype,"value",{
	set: function(value){
		return this.set(value);
	},
	get: function(){
		return this.get();
	}
});

var simpleObservableProto = {
	"can.getValue": SimpleObservable.prototype.get,
	"can.setValue": SimpleObservable.prototype.set,
	"can.isMapLike": false,
	"can.valueHasDependencies": function(){
		return true;
	}
};
//!steal-remove-end

canReflect.assignSymbols(SimpleObservable.prototype, simpleObservableProto);

var canSimpleObservable = canNamespace.SimpleObservable = SimpleObservable;

var dispatchSymbol = canSymbol.for("can.dispatch");
var setElementSymbol$2 = canSymbol.for("can.setElement");

// The goal of this is to create a high-performance compute that represents a key value from can.view.Scope.
// If the key value is something like {{name}} and the context is a can.Map, a faster
// binding path will be used where new rebindings don't need to be looked for with every change of
// the observable property.
// However, if the property changes to a compute, then the slower `can.compute.read` method of
// observing values will be used.

// ideally, we would know the order things were read.  If the last thing read
// was something we can observe, and the value of it matched the value of the observation,
// and the key matched the key of the observation
// it's a fair bet that we can just listen to that last object.
// If the `this` is not that object ... freak out.  Though `this` is not necessarily part of it.  can-observation could make
// this work.


var getFastPathRoot = canObservationRecorder.ignore(function(computeData){
	if( computeData.reads &&
				// a single property read
				computeData.reads.length === 1 ) {
		var root = computeData.root;
		if( root && root[canSymbol.for("can.getValue")] ) {
			root = canReflect.getValue(root);
		}
		// on a map
		return root && canReflect.isObservableLike(root) && canReflect.isMapLike(root) &&
			// that isn't calling a function
			typeof root[computeData.reads[0].key] !== "function" && root;
	}
	return;
});

var isEventObject = function(obj){
	return obj && typeof obj.batchNum === "number" && typeof obj.type === "string";
};
//!steal-remove-end

// could we make this an observation first ... and have a getter for the compute?

// This is a fast-path enabled Observation wrapper use many places in can-stache.
// The goal of this is to:
//
// 1.  Make something that can be passed to can-view-live directly, hopefully
//     avoiding creating expensive computes.  Instead we will only be creating
//     `ScopeKeyData` which are thin wrappers.
var ScopeKeyData = function(scope, key, options){

	this.startingScope = scope;
	this.key = key;
	this.read = this.read.bind(this);
	this.dispatch = this.dispatch.bind(this);

	// special case debugger helper so that it is called with helperOtions
	// when you do {{debugger}} as it already is with {{debugger()}}
	if (key === "debugger") {
		// prevent "Unable to find key" warning
		this.startingScope = { _context: canStacheHelpers };

		this.read = function() {
			var helperOptions = { scope: scope };
			var debuggerHelper = canStacheHelpers["debugger"];
			return debuggerHelper(helperOptions);
		};
	}
	//!steal-remove-end

	var observation = this.observation = new canObservation(this.read, this);
	this.options = canAssign({ observation: this.observation }, options);

	// things added later
	this.fastPath = undefined;
	this.root = undefined;
	this.reads = undefined;
	this.setRoot = undefined;
	// This is read by call expressions so it needs to be observable
	this._thisArg = new canSimpleObservable();
	this.parentHasKey = undefined;
	var valueDependencies = new Set();
	valueDependencies.add(observation);
	this.dependencies = {valueDependencies: valueDependencies};

	// This is basically what .get() should give, but it
	// isn't used to figure out the last value.
	this._latestValue = undefined;
};

value(ScopeKeyData.prototype);

function fastOnBoundSet_Value() {
	this._value = this.newVal;
}

function fastOnBoundSetValue() {
	this.value = this.newVal;
}

canAssign(ScopeKeyData.prototype, {
	constructor: ScopeKeyData,
	dispatch: function dispatch(newVal){
		var old = this.value;
		this._latestValue = this.value = newVal;
		// call the base implementation in can-event-queue
		this[dispatchSymbol].call(this, this.value, old);
	},
	onBound: function onBound(){
		this.bound = true;
		canReflect.onValue(this.observation, this.dispatch, "notify");
		// TODO: we should check this sometime in the background.
		var fastPathRoot = getFastPathRoot(this);
		if( fastPathRoot ) {
			// rewrite the observation to call its event handlers
			this.toFastPath(fastPathRoot);
		}
		this._latestValue = this.value = canObservationRecorder.peekValue(this.observation);
	},
	onUnbound: function onUnbound() {
		this.bound = false;
		canReflect.offValue(this.observation, this.dispatch, "notify");
		this.toSlowPath();
	},
	set: function(newVal){
		var root = this.root || this.setRoot;
		if(root) {
			if(this.reads.length) {
				canStacheKey.write(root, this.reads, newVal, this.options);
			} else {
				canReflect.setValue(root,newVal);
			}
		} else {
			this.startingScope.set(this.key, newVal, this.options);
		}
	},
	get: function() {
		if (canObservationRecorder.isRecording()) {
			canObservationRecorder.add(this);
			if (!this.bound) {
				canObservation.temporarilyBind(this);
			}
		}

		if (this.bound === true && this.fastPath === true) {
			return this._latestValue;
		} else {
			return canObservationRecorder.peekValue(this.observation);
		}
	},
	toFastPath: function(fastPathRoot){
		var self = this,
			observation = this.observation;

		this.fastPath = true;

		// there won't be an event in the future ...
		observation.dependencyChange = function(target, newVal){
			if(isEventObject(newVal)) {
				throw "no event objects!";
			}
			// but I think we will be able to get at it b/c there should only be one
			// dependency we are binding to ...
			if(target === fastPathRoot && typeof newVal !== "function") {
				self._latestValue = newVal;
				this.newVal = newVal;
			} else {
				// restore
				self.toSlowPath();
			}

			return canObservation.prototype.dependencyChange.apply(this, arguments);
		};

		if (observation.hasOwnProperty("_value")) {// can-observation 4.1+
			observation.onBound = fastOnBoundSet_Value;
		} else {// can-observation < 4.1
			observation.onBound = fastOnBoundSetValue;
		}
	},
	toSlowPath: function(){
		this.observation.dependencyChange = canObservation.prototype.dependencyChange;
		this.observation.onBound = canObservation.prototype.onBound;
		this.fastPath = false;
	},
	read: function(){
		var data;

		if (this.root) {
			// if we've figured out a root observable, start reading from there
			data = canStacheKey.read(this.root, this.reads, this.options);
			//!steal-remove-end

			// update thisArg and add new dependency
			this.thisArg = data.parent;
			//!steal-remove-end

			return data.value;
		}
		// If the key has not already been located in a observable then we need to search the scope for the
		// key.  Once we find the key then we need to return it's value and if it is found in an observable
		// then we need to store the observable so the next time this compute is called it can grab the value
		// directly from the observable.
		data = this.startingScope.read(this.key, this.options);


		this.scope = data.scope;
		this.reads = data.reads;
		this.root = data.rootObserve;
		this.setRoot = data.setRoot;
		this.thisArg = data.thisArg;
		this.parentHasKey = data.parentHasKey;
		//!steal-remove-end

		return data.value;
	},
	hasDependencies: function(){
		// ScopeKeyData is unique in that when these things are read, it will temporarily bind
		// to make sure the right value is returned. This is for can-stache.
		// Helpers warns about a missing helper.
		if (!this.bound) {
			canObservation.temporarilyBind(this);
		}
		return canReflect.valueHasDependencies( this.observation );
	}
});

Object.defineProperty(ScopeKeyData.prototype, "thisArg", {
	get: function(){
		return this._thisArg.get();
	},
	set: function(newVal) {
		this._thisArg.set(newVal);
	}
});

var scopeKeyDataPrototype = {
	"can.getValue": ScopeKeyData.prototype.get,
	"can.setValue": ScopeKeyData.prototype.set,
	"can.valueHasDependencies": ScopeKeyData.prototype.hasDependencies,
	"can.getValueDependencies": function() {
		return this.dependencies;
	},
	"can.getPriority": function(){
		return canReflect.getPriority( this.observation );
	},
	"can.setPriority": function(newPriority){
		canReflect.setPriority( this.observation, newPriority );
	},
	"can.setElement": function(element) {
		this.observation[setElementSymbol$2](element);
	}
};
//!steal-remove-end
canReflect.assignSymbols(ScopeKeyData.prototype, scopeKeyDataPrototype);

// Creates a compute-like for legacy reasons ...
Object.defineProperty(ScopeKeyData.prototype, "compute", {
	get: function(){
		var compute = makeComputeLike(this);

		Object.defineProperty(this, "compute", {
			value: compute,
			writable: false,
			configurable: false
		});
		return compute;
	},
	configurable: true
});

Object.defineProperty(ScopeKeyData.prototype, "initialValue", {
	get: function(){
		if (!this.bound) {
			canObservation.temporarilyBind(this);
		}
		return canObservationRecorder.peekValue(this);
	},
	set: function(){
		throw new Error("initialValue should not be set");
	},
	configurable: true
});

var scopeKeyData = ScopeKeyData;

var compute_data = function(scope, key, options){
	return new scopeKeyData(scope, key, options || {
		args: []
	});
};

// ### LetContext
// Instances of this are used to create a `let` variable context.

// Like Object.create, but only keeps Symbols and properties in `propertiesToKeep`
function objectCreateWithSymbolsAndSpecificProperties(obj, propertiesToKeep) {
	var newObj = {};

	// copy over all Symbols from obj
	if ("getOwnPropertySymbols" in Object) {
		Object.getOwnPropertySymbols(obj).forEach(function(key) {
			newObj[key] = obj[key];
		});
	}

	// copy over specific properties from obj (also fake Symbols properties for IE support);
	Object.getOwnPropertyNames(obj).forEach(function(key) {
		if (propertiesToKeep.indexOf(key) >= 0 || key.indexOf("@@symbol") === 0) {
			newObj[key] = obj[key];
		}
	});

	return Object.create(newObj);
}

var LetContext = canSimpleMap.extend("LetContext", {});
LetContext.prototype = objectCreateWithSymbolsAndSpecificProperties(canSimpleMap.prototype, [
	// SimpleMap properties
	"setup",
	"attr",
	"serialize",
	"get",
	"set",
	"log",
	// required by SimpleMap properties
	"dispatch",
	// Construct properties (not added by can-event-queue)
	"constructorExtends",
	"newInstance",
	"_inherit",
	"_defineProperty",
	"_overwrite",
	"instance",
	"extend",
	"ReturnValue",
	"setup",
	"init"
]);
LetContext.prototype.constructor = LetContext;

var letContext = LetContext;

// # can-view-scope.js
//
// This provides the ability to lookup values across a higherarchy of objects.  This is similar to
// how closures work in JavaScript.
//
// This is done with the `Scope` type. It works by having a `_context` reference to
// an object whose properties can be searched for values.  It also has a `_parent` reference
// to the next Scope in which to check.  In this way, `Scope` is used to form a tree-like
// structure.  Leaves and Nodes in the tree only point to their parent.













// ## Helpers

function canHaveProperties(obj){
	return obj != null;
}
function returnFalse(){
	return false;
}

// ## Scope
// Represents a node in the scope tree.
function Scope(context, parent, meta) {
	// The object that will be looked on for values.
	// If the type of context is TemplateContext, there will be special rules for it.
	this._context = context;
	// The next Scope object whose context should be looked on for values.
	this._parent = parent;
	// If this is a special context, it can be labeled here.
	// Options are:
	// - `viewModel` - This is a viewModel. This is mostly used by can-component to make `scope.vm` work.
	// - `notContext` - This can't be looked within using `./` and `../`. It will be skipped.
	//   This is for virtual contexts like those used by `%index`. This is very much like
	//   `variable`.  Most things should switch to `variable` in the future.
	// - `special` - This can't be looked within using `./` and `../`. It will be skipped.
	//   This is for reading properties on the scope {{scope.index}}. It's different from variable
	//   because it's never lookup up like {{key}}.
	// - `variable` - This is used to define a variable (as opposed to "normal" context). These
	//   will also be skipped when using `./` and `../`.
	this._meta = meta || {};

	// A cache that can be used to store computes used to look up within this scope.
	// For example if someone creates a compute to lookup `name`, another compute does not
	// need to be created.
	this.__cache = {};
}

var parentContextSearch = /(\.\.\/)|(\.\/)|(this[\.@])/g;

// ## Static Methods
// The following methods are exposed mostly for testing purposes.
canAssign(Scope, {
	// ### Scope.read
	// Scope.read was moved to can-stache-key.read
	// can-stache-key.read reads properties from a parent. A much more complex version of getObject.
	read: canStacheKey.read,
	TemplateContext: templateContext,
	// ### keyInfo(key)
	// Returns an object that details what the `key` means with the following:
	// ```js
	// {
	//   remainingKey, // what would be read on a context (or this)
	//   isScope, // if the scope itself is being read
	//   inScope, // if a key on the scope is being read
	//   parentContextWalkCount, // how many ../
	//   isContextBased // if a "normal" context is explicitly being read
	// }
	// ```
	keyInfo: function(attr){

		if (attr === "./") {
			attr = "this";
		}

		var info = {remainingKey: attr};

		// handle scope stuff first
		info.isScope = attr === "scope";
		if(info.isScope) {
			return info;
		}
		var firstSix = attr.substr(0, 6);
		info.isInScope =
			firstSix === "scope." ||
			firstSix === "scope@";
		if(info.isInScope) {
			info.remainingKey = attr.substr(6);
			return info;
		} else if(firstSix === "scope/") {
			info.walkScope = true;
			info.remainingKey = attr.substr(6);
			return info;
		} else if(attr.substr(0, 7) === "@scope/") {
			info.walkScope = true;
			info.remainingKey = attr.substr(7);
			return info;
		}

		info.parentContextWalkCount = 0;
		// Searches for `../` and other context specifiers
		info.remainingKey = attr.replace(parentContextSearch, function(token, parentContext, dotSlash, thisContext, index){
			info.isContextBased = true;
			if(parentContext !== undefined) {
				info.parentContextWalkCount++;
			}
			return "";
		});
		// ../..
		if(info.remainingKey === "..") {
			info.parentContextWalkCount++;
			info.remainingKey = "this";
		}
		else if(info.remainingKey === "." || info.remainingKey === "") {
			info.remainingKey = "this";
		}

		if(info.remainingKey === "this") {
			info.isContextBased = true;
		}
		return info;
	},
	// ### isTemplateContextOrCanNotHaveProperties
	// Returns `true` if a template context or a `null` or `undefined`
	// context.
	isTemplateContextOrCanNotHaveProperties: function(currentScope){
		var currentContext = currentScope._context;
		if(currentContext instanceof templateContext) {
			return true;
		} else if( !canHaveProperties(currentContext) ) {
			return true;
		}
		return false;
	},
	// ### shouldSkipIfSpecial
	// Return `true` if special.
	shouldSkipIfSpecial: function(currentScope){
		var isSpecialContext = currentScope._meta.special === true;
		if (isSpecialContext === true) {
			return true;
		}
		if( Scope.isTemplateContextOrCanNotHaveProperties(currentScope) ) {
			return true;
		}
		return false;
	},
	// ### shouldSkipEverythingButSpecial
	// Return `true` if not special.
	shouldSkipEverythingButSpecial: function(currentScope){
		var isSpecialContext = currentScope._meta.special === true;
		if (isSpecialContext === false) {
			return true;
		}
		if( Scope.isTemplateContextOrCanNotHaveProperties(currentScope) ) {
			return true;
		}
		return false;
	},
	// ### makeShouldExitOnSecondNormalContext
	// This will keep checking until we hit a second "normal" context.
	makeShouldExitOnSecondNormalContext: function(){
		var foundNormalContext = false;
		return function shouldExitOnSecondNormalContext(currentScope){
			var isNormalContext = !currentScope.isSpecial();
			var shouldExit = isNormalContext && foundNormalContext;
			// leaks some state
			if(isNormalContext) {
				foundNormalContext = true;
			}
			return shouldExit;
		};
	},
	// ### makeShouldExitAfterFirstNormalContext
	// This will not check anything after the first normal context.
	makeShouldExitAfterFirstNormalContext: function(){
		var foundNormalContext = false;
		return function shouldExitAfterFirstNormalContext(currentScope){
			if(foundNormalContext) {
				return true;
			}
			var isNormalContext = !currentScope.isSpecial();
			// leaks some state
			if(isNormalContext) {
				foundNormalContext = true;
			}
			return false;
		};
	},
	// ### makeShouldSkipSpecialContexts
	// Skips `parentContextWalkCount` contexts. This is used to
	// walk past scopes when `../` is used.
	makeShouldSkipSpecialContexts: function(parentContextWalkCount){
		var walkCount = parentContextWalkCount || 0;
		return function shouldSkipSpecialContexts(currentScope){
			// after walking past the correct number of contexts,
			// should not skip notContext scopes
			// so that ../foo can be used to read from a notContext scope
			if (walkCount < 0 && currentScope._meta.notContext) {
				return false;
			}

			if(currentScope.isSpecial()) {
				return true;
			}
			walkCount--;

			if(walkCount < 0) {
				return false;
			}
			return true;
		};
	}
});

// ## Prototype methods
canAssign(Scope.prototype, {

	// ### scope.add
	// Creates a new scope and sets the current scope to be the parent.
	// ```
	// var scope = new can.view.Scope([
	//   {name:"Chris"},
	//   {name: "Justin"}
	// ]).add({name: "Brian"});
	// scope.attr("name") //-> "Brian"
	// ```
	add: function(context, meta) {
		if (context !== this._context) {
			return new this.constructor(context, this, meta);
		} else {
			return this;
		}
	},

	// ### scope.find
	// This is the equivalent of Can 3's scope walking.
	find: function(attr, options) {

		var keyReads = canStacheKey.reads(attr);
		var howToRead = {
			shouldExit: returnFalse,
			shouldSkip: Scope.shouldSkipIfSpecial,
			shouldLookForHelper: true,
			read: canStacheKey.read
		};
		var result = this._walk(keyReads, options, howToRead);

		return result.value;

	},
	// ### scope.readFromSpecialContext
	readFromSpecialContext: function(key) {
		return this._walk(
			[{key: key, at: false }],
			{ special: true },
			{
				shouldExit: returnFalse,
				shouldSkip: Scope.shouldSkipEverythingButSpecial,
				shouldLookForHelper: false,
				read: canStacheKey.read
			}
		);
	},

	// ### scope.readFromTemplateContext
	readFromTemplateContext: function(key, readOptions) {
		var keyReads = canStacheKey.reads(key);
		return canStacheKey.read(this.templateContext, keyReads, readOptions);
	},

	// ### Scope.prototype.read
	// Reads from the scope chain and returns the first non-`undefined` value.
	// `read` deals mostly with setting up "context based" keys to start reading
	// from the right scope. Once the right scope is located, `_walk` is called.
	/**
	 * @hide
	 * @param {can.stache.key} attr A dot-separated path. Use `"\."` if you have a property name that includes a dot.
	 * @param {can.view.Scope.readOptions} options that configure how this gets read.
	 * @return {{}}
	 *   @option {Object} parent the value's immediate parent
	 *   @option {can.Map|can.compute} rootObserve the first observable to read from.
	 *   @option {Array<String>} reads An array of properties that can be used to read from the rootObserve to get the value.
	 *   @option {*} value the found value
	 */
	read: function(attr, options) {
		options = options || {};
		return this.readKeyInfo(Scope.keyInfo(attr), options || {});
	},
	readKeyInfo: function(keyInfo, options){

		// Identify context based keys. Context based keys try to
		// specify a particular context a key should be within.
		var readValue,
			keyReads,
			howToRead = {
				read: options.read || canStacheKey.read
			};

		// 1.A. Handle reading the scope itself
		if (keyInfo.isScope) {
			return { value: this };
		}
		// 1.B. Handle reading something on the scope
		else if (keyInfo.isInScope) {
			keyReads = canStacheKey.reads(keyInfo.remainingKey);
			// check for a value on Scope.prototype
			readValue = canStacheKey.read(this, keyReads, options);

			// otherwise, check the templateContext
			if (typeof readValue.value === 'undefined' && !readValue.parentHasKey) {
				readValue = this.readFromTemplateContext(keyInfo.remainingKey, options);
			}

			return canAssign(readValue, {
				thisArg: keyReads.length > 0 ? readValue.parent : undefined
			});
		}
		// 1.C. Handle context-based reads. They should skip over special stuff.
		// this.key, ../.., .././foo
		else if (keyInfo.isContextBased) {
			// TODO: REMOVE
			// options && options.special === true && console.warn("SPECIAL!!!!");

			if(keyInfo.remainingKey !== "this") {
				keyReads = canStacheKey.reads(keyInfo.remainingKey);
			} else {
				keyReads = [];
			}
			howToRead.shouldExit = Scope.makeShouldExitOnSecondNormalContext();
			howToRead.shouldSkip = Scope.makeShouldSkipSpecialContexts(keyInfo.parentContextWalkCount);
			howToRead.shouldLookForHelper = true;

			return this._walk(keyReads, options, howToRead);
		}
		// 1.D. Handle scope walking with scope/key
		else if(keyInfo.walkScope) {
			howToRead.shouldExit = returnFalse;
			howToRead.shouldSkip = Scope.shouldSkipIfSpecial;
			howToRead.shouldLookForHelper = true;
			keyReads = canStacheKey.reads(keyInfo.remainingKey);

			return this._walk(keyReads, options, howToRead);
		}
		// 1.E. Handle reading without context clues
		// {{foo}}
		else {
			keyReads = canStacheKey.reads(keyInfo.remainingKey);

			var isSpecialRead = options && options.special === true;
			// TODO: remove
			// options && options.special === true && console.warn("SPECIAL!!!!");

			howToRead.shouldExit = Scope.makeShouldExitOnSecondNormalContext();
			howToRead.shouldSkip = isSpecialRead ? Scope.shouldSkipEverythingButSpecial : Scope.shouldSkipIfSpecial;
			howToRead.shouldLookForHelper = isSpecialRead ? false : true;

			return this._walk(keyReads, options, howToRead);
		}
	},


	// ### scope._walk
	// This is used to walk up the scope chain.
	_walk: function(keyReads, options, howToRead) {
		// The current scope and context we are trying to find "keyReads" within.
		var currentScope = this,
			currentContext,

			// If no value can be found, this is a list of of every observed
			// object and property name to observe.
			undefinedObserves = [],

			// Tracks the first found observe.
			currentObserve,
			// Tracks the reads to get the value from `currentObserve`.
			currentReads,

			// Tracks the most likely observable to use as a setter.
			setObserveDepth = -1,
			currentSetReads,
			currentSetObserve,

			readOptions = canAssign({
				/* Store found observable, incase we want to set it as the rootObserve. */
				foundObservable: function(observe, nameIndex) {
					currentObserve = observe;
					currentReads = keyReads.slice(nameIndex);
				},
				earlyExit: function(parentValue, nameIndex) {
					var isVariableScope = currentScope._meta.variable === true,
						updateSetObservable = false;
					if(isVariableScope === true && nameIndex === 0) {
						// we MUST have pre-defined the key in a variable scope
						updateSetObservable = canReflect.hasKey( parentValue, keyReads[nameIndex].key);
					} else {
						updateSetObservable =
							// Has more matches
							nameIndex > setObserveDepth ||
							// The same number of matches but it has the key
							nameIndex === setObserveDepth && (typeof parentValue === "object" && canReflect.hasOwnKey( parentValue, keyReads[nameIndex].key));
					}
					if ( updateSetObservable ) {
						currentSetObserve = currentObserve;
						currentSetReads = currentReads;
						setObserveDepth = nameIndex;
					}
				}
			}, options);



		var isRecording = canObservationRecorder.isRecording(),
			readAContext = false;

		// Goes through each scope context provided until it finds the key (attr). Once the key is found
		// then it's value is returned along with an observe, the current scope and reads.
		// While going through each scope context searching for the key, each observable found is returned and
		// saved so that either the observable the key is found in can be returned, or in the case the key is not
		// found in an observable the closest observable can be returned.
		while (currentScope) {

			if(howToRead.shouldSkip(currentScope) === true) {
				currentScope = currentScope._parent;
				continue;
			}
			if(howToRead.shouldExit(currentScope) === true) {
				break;
			}
			readAContext = true;

			currentContext = currentScope._context;


			// Prevent computes from temporarily observing the reading of observables.
			var getObserves = canObservationRecorder.trap();

			var data = howToRead.read(currentContext, keyReads, readOptions);

			// Retrieve the observes that were read.
			var observes = getObserves();
			// If a **value was was found**, return value and location data.
			if (data.value !== undefined || data.parentHasKey) {

				if(!observes.length && isRecording) {
					// if we didn't actually observe anything
					// the reads and currentObserve don't mean anything
					// we just point to the current object so setting is fast
					currentObserve = data.parent;
					currentReads = keyReads.slice(keyReads.length - 1);
				} else {
					canObservationRecorder.addMany(observes);
				}

				return {
					scope: currentScope,
					rootObserve: currentObserve,
					value: data.value,
					reads: currentReads,
					thisArg: data.parent,
					parentHasKey: data.parentHasKey
				};
			}
			// Otherwise, save all observables that were read. If no value
			// is found, we will observe on all of them.
			else {
				undefinedObserves.push.apply(undefinedObserves, observes);
			}

			currentScope = currentScope._parent;
		}

		// The **value was not found** in the scope
		// if not looking for a "special" key, check in can-stache-helpers
		if (howToRead.shouldLookForHelper) {
			var helper = this.getHelperOrPartial(keyReads);

			if (helper && helper.value) {
				// Don't return parent so `.bind` is not used.
				return {value: helper.value};
			}
		}

		// The **value was not found**, return `undefined` for the value.
		// Make sure we listen to everything we checked for when the value becomes defined.
		// Once it becomes defined, we won't have to listen to so many things.
		canObservationRecorder.addMany(undefinedObserves);
		return {
			setRoot: currentSetObserve,
			reads: currentSetReads,
			value: undefined,
			noContextAvailable: !readAContext
		};
	},
	// ### scope.getDataForScopeSet
	// Returns an object with data needed by `.set` to figure out what to set,
	// and how.
	// {
	//   parent: what is being set
	//   key: try setting a key value
	//   how: "setValue" | "set" | "updateDeep" | "write" | "setKeyValue"
	// }
	// This works by changing how `readKeyInfo` will read individual scopes.
	// Specifically, with something like `{{foo.bar}}` it will read `{{foo}}` and
	// only check if a `bar` property exists.
	getDataForScopeSet: function getDataForScopeSet(key, options) {
		var keyInfo = Scope.keyInfo(key);
		var firstSearchedContext;

		// Overwrite the options to use this read.
		var opts = canAssign({
			// This read is used by `._walk` to read from the scope.
			// This will use `hasKey` on the last property instead of reading it.
			read: function(context, keys){

				// If nothing can be found with the keys we are looking for, save the
				// first possible match.  This is where we will write to.
				if(firstSearchedContext === undefined && !(context instanceof letContext)) {
					firstSearchedContext = context;
				}
				// If we have multiple keys ...
				if(keys.length > 1) {
					// see if we can find the parent ...
					var parentKeys = keys.slice(0, keys.length-1);
					var parent = canStacheKey.read(context, parentKeys, options).value;

					// If there is a parent, see if it has the last key
					if( parent != null && canReflect.hasKey(parent, keys[keys.length-1].key ) ) {
						return {
							parent: parent,
							parentHasKey: true,
							value: undefined
						};
					} else {
						return {};
					}
				}
				// If we have only one key, try to find a context with this key
				else if(keys.length === 1) {
					if( canReflect.hasKey(context, keys[0].key ) ) {
						return {
							parent: context,
							parentHasKey: true,
							value: undefined
						};
					} else {
						return {};
					}
				}
				// If we have no keys, we are reading `this`.
				else {
					return {
						value: context
					};
				}
			}
		},options);


		// Use the read above to figure out what we are probably writing to.
		var readData = this.readKeyInfo(keyInfo, opts);

		if(keyInfo.remainingKey === "this") {
			// If we are setting a context, then return that context
			return { parent: readData.value, how: "setValue" };
		}
		// Now we are trying to set a property on something.  Parent will
		// be the something we are setting a property on.
		var parent;

		var props = keyInfo.remainingKey.split(".");
		var propName = props.pop();

		// If we got a `thisArg`, that's the parent.
		if(readData.thisArg) {
			parent = readData.thisArg;
		}
		// Otherwise, we didn't find anything, use the first searched context.
		// TODO: there is likely a bug here when trying to set foo.bar where nothing in the scope
		// has a foo.
		else if(firstSearchedContext) {
			parent = firstSearchedContext;
		}

		if (parent === undefined) {
			return {
				error: "Attempting to set a value at " +
					key + " where the context is undefined."
			};
		}
		// Now we need to figure out how we would update this value.  The following does that.
		if(!canReflect.isObservableLike(parent) && canReflect.isObservableLike(parent[propName])) {
			if(canReflect.isMapLike(parent[propName])) {
				return {
					parent: parent,
					key: propName,
					how: "updateDeep",
					warn: "can-view-scope: Merging data into \"" +
						propName + "\" because its parent is non-observable"
				};
			}
			else if(canReflect.isValueLike(parent[propName])){
				return { parent: parent, key: propName, how: "setValue" };
			} else {
				return { parent: parent, how: "write", key: propName, passOptions: true };
			}
		} else {
			return { parent: parent, how: "write", key: propName, passOptions: true };
		}
	},

	// ### scope.getHelper
	// read a helper from the templateContext or global helpers list
	getHelper: function(keyReads) {
		console.warn(".getHelper is deprecated, use .getHelperOrPartial");
		return this.getHelperOrPartial(keyReads);
	},
	getHelperOrPartial: function(keyReads) {
		// try every template context
		var scope = this, context, helper;
		while (scope) {
			context = scope._context;
			if (context instanceof templateContext) {
				helper = canStacheKey.read(context.helpers, keyReads, { proxyMethods: false });
				if(helper.value !== undefined) {
					return helper;
				}
				helper = canStacheKey.read(context.partials, keyReads, { proxyMethods: false });
				if(helper.value !== undefined) {
					return helper;
				}
			}
			scope = scope._parent;
		}

		return canStacheKey.read(canStacheHelpers, keyReads, { proxyMethods: false });
	},

	// ### scope.get
	// Gets a value from the scope without being observable.
	get: function(key, options) {

		options = canAssign({
			isArgument: true
		}, options);

		var res = this.read(key, options);
		return res.value;
	},
	peek: canObservationRecorder.ignore(function(key, options) {
		return this.get(key, options);
	}),
	// TODO: Remove in 6.0
	peak: canObservationRecorder.ignore(function(key, options) {
		//!steal-remove-end
		return this.peek(key, options);
	}),
	// ### scope.getScope
	// Returns the first scope that passes the `tester` function.
	getScope: function(tester) {
		var scope = this;
		while (scope) {
			if (tester(scope)) {
				return scope;
			}
			scope = scope._parent;
		}
	},
	// ### scope.getContext
	// Returns the first context whose scope passes the `tester` function.
	getContext: function(tester) {
		var res = this.getScope(tester);
		return res && res._context;
	},
	// ### scope.getTemplateContext
	// Returns the template context scope
	// This function isn't named right.
	getTemplateContext: function() {
		var lastScope;

		// find the first reference scope
		var templateContext$1 = this.getScope(function(scope) {
			lastScope = scope;
			return scope._context instanceof templateContext;
		});

		// if there is no reference scope, add one as the root
		if(!templateContext$1) {
			templateContext$1 = new Scope(new templateContext());

			// add templateContext to root of the scope chain so it
			// can be found using `getScope` next time it is looked up
			lastScope._parent = templateContext$1;
		}
		return templateContext$1;
	},
	addTemplateContext: function(){
		return this.add(new templateContext());
	},
	addLetContext: function(values){
		return this.add(new letContext(values || {}), {variable: true});
	},
	// ### scope.getRoot
	// Returns the top most context that is not a references scope.
	// Used by `.read` to provide `%root`.
	getRoot: function() {
		var cur = this,
			child = this;

		while (cur._parent) {
			child = cur;
			cur = cur._parent;
		}

		if (cur._context instanceof templateContext) {
			cur = child;
		}
		return cur._context;
	},

	// first viewModel scope
	getViewModel: function() {
		var vmScope = this.getScope(function(scope) {
			return scope._meta.viewModel;
		});

		return vmScope && vmScope._context;
	},

	// _top_ viewModel scope
	getTop: function() {
		var top;

		this.getScope(function(scope) {
			if (scope._meta.viewModel) {
				top = scope;
			}

			// walk entire scope tree
			return false;
		});

		return top && top._context;
	},

	// ### scope.getPathsForKey
	// Finds all paths that will return a value for a specific key
	// NOTE: this is for development purposes only and is removed in production
	getPathsForKey: function getPathsForKey(key) {
		//!steal-remove-end
	},

	// ### scope.hasKey
	// returns whether or not this scope has the key
	hasKey: function hasKey(key) {
		var reads = canStacheKey.reads(key);
		var readValue;

		if (reads[0].key === "scope") {
			// read properties like `scope.vm.foo` directly from the scope
			readValue = canStacheKey.read(this, reads.slice(1), key);
		} else {
			// read normal properties from the scope's context
			readValue = canStacheKey.read(this._context, reads, key);
		}

		return readValue.foundLastParent && readValue.parentHasKey;
	},

	set: function(key, value, options) {
		options = options || {};

		var data = this.getDataForScopeSet(key, options);
		var parent = data.parent;
		//!steal-remove-end

		if (data.warn) {
			dev.warn(data.warn);
		}

		switch (data.how) {
			case "set":
				parent.set(data.key, value, data.passOptions ? options : undefined);
				break;

			case "write":
				canStacheKey.write(parent, data.key, value, options);
				break;

			case "setValue":
				canReflect.setValue("key" in data ? parent[data.key] : parent, value);
				break;

			case "setKeyValue":
				canReflect.setKeyValue(parent, data.key, value);
				break;

			case "updateDeep":
				canReflect.updateDeep(parent[data.key], value);
				break;
		}
	},

	// ### scope.attr
	// Gets or sets a value in the scope without being observable.
	attr: canObservationRecorder.ignore(function(key, value, options) {
		dev.warn("can-view-scope::attr is deprecated, please use peek, get or set");

		options = canAssign({
			isArgument: true
		}, options);

		// Allow setting a value on the context
		if (arguments.length === 2) {
			return this.set(key, value, options);

		} else {
			return this.get(key, options);
		}
	}),

	// ### scope.computeData
	// Finds the first location of the key in the scope and then provides a get-set compute that represents the key's value
	// and other information about where the value was found.
	computeData: function(key, options) {
		return compute_data(this, key, options);
	},

	// ### scope.compute
	// Provides a get-set compute that represents a key's value.
	compute: function(key, options) {
		return this.computeData(key, options)
			.compute;
	},
	// ### scope.cloneFromRef
	//
	// This takes a scope and essentially copies its chain from
	// right before the last TemplateContext. And it does not include the ref.
	// this is a helper function to provide lexical semantics for refs.
	// This will not be needed for leakScope: false.
	cloneFromRef: function() {
		var scopes = [];
		var scope = this,
			context,
			parent;
		while (scope) {
			context = scope._context;
			if (context instanceof templateContext) {
				parent = scope._parent;
				break;
			}
			scopes.unshift(scope);
			scope = scope._parent;
		}
		if (parent) {
			scopes.forEach(function(scope) {
				// For performance, re-use _meta, don't copy it.
				parent = parent.add(scope._context, scope._meta);
			});
			return parent;
		} else {
			return this;
		}
	},
	isSpecial: function(){
		return this._meta.notContext || this._meta.special || (this._context instanceof templateContext) || this._meta.variable;
	}
});
// Legacy name for _walk.
Scope.prototype._read = Scope.prototype._walk;

canReflect.assignSymbols(Scope.prototype, {
	"can.hasKey": Scope.prototype.hasKey
});

var templateContextPrimitives = [
	"filename", "lineNumber"
];

// create getters/setters for primitives on the templateContext
// scope.filename -> scope.readFromTemplateContext("filename")
templateContextPrimitives.forEach(function(key) {
	Object.defineProperty(Scope.prototype, key, {
		get: function() {
			return this.readFromTemplateContext(key).value;
		},
		set: function(val) {
			this.templateContext[key] = val;
		}
	});
});

defineLazyValue(Scope.prototype, 'templateContext', function() {
	return this.getTemplateContext()._context;
});

defineLazyValue(Scope.prototype, 'root', function() {
	dev.warn('`scope.root` is deprecated. Use either `scope.top`: https://canjs.com/doc/can-stache/keys/scope.html#scope_top or `scope.vm`: https://canjs.com/doc/can-stache/keys/scope.html#scope_vm instead.');
	return this.getRoot();
});

defineLazyValue(Scope.prototype, 'vm', function() {
	return this.getViewModel();
});

defineLazyValue(Scope.prototype, 'top', function() {
	return this.getTop();
});

defineLazyValue(Scope.prototype, 'helpers', function() {
	return canStacheHelpers;
});

var specialKeywords = [
	'index', 'key', 'element',
	'event', 'viewModel','arguments',
	'helperOptions', 'args'
];

// create getters for "special" keys
// scope.index -> scope.readFromSpecialContext("index")
specialKeywords.forEach(function(key) {
	Object.defineProperty(Scope.prototype, key, {
		get: function() {
			return this.readFromSpecialContext(key).value;
		}
	});
});
//!steal-remove-end


canNamespace.view = canNamespace.view || {};
var canViewScope = canNamespace.view.Scope = Scope;

var peek = canObservationRecorder.ignore(canReflect.getValue.bind(canReflect));

// This supports an "internal" settable value that the `fn` can derive its value from.
// It's useful to `can-define`.
// ```
// new SettableObservable(function(lastSet){
//   return lastSet * 5;
// }, null, 5)
// ```
function SettableObservable(fn, context, initialValue) {

	this.lastSetValue = new canSimpleObservable(initialValue);
	function observe() {
		return fn.call(context, this.lastSetValue.get());
	}
	this.handler = this.handler.bind(this);
	//!steal-remove-end

	this.observation = new canObservation(observe, this);
}

value(SettableObservable.prototype);

canReflect.assignMap(SettableObservable.prototype, {
	// call `obs.log()` to log observable changes to the browser console
	// The observable has to be bound for `.log` to be called
	log: log,
	constructor: SettableObservable,
	handler: function(newVal) {
		var old = this._value, reasonLog;
		this._value = newVal;
		//!steal-remove-end

		// adds callback handlers to be called w/i their respective queue.
		canQueues.enqueueByQueue(
			this.handlers.getNode([]),
			this,
			[newVal, old],
			null,
			reasonLog
		);
	},
	onBound: function() {
		// onBound can be called by `.get` and then later called through
		// a keyTree binding.
		if(!this.bound) {
			this.bound = true;
			this.activate();
		}
	},
	activate: function(){
		canReflect.onValue(this.observation, this.handler, "notify");
		this._value = peek(this.observation);
	},
	onUnbound: function() {
		this.bound = false;
		canReflect.offValue(this.observation, this.handler, "notify");
	},
	set: function(newVal) {
		var oldVal =  this.lastSetValue.get();

		if (
			canReflect.isObservableLike(oldVal) &&
			canReflect.isValueLike(oldVal) &&
			!canReflect.isObservableLike(newVal)
		) {
			canReflect.setValue(oldVal, newVal);
		} else {
			if (newVal !== oldVal) {
				this.lastSetValue.set(newVal);
			}
		}
	},
	get: function() {
		if (canObservationRecorder.isRecording()) {
			canObservationRecorder.add(this);
			if (!this.bound) {
				// proactively setup bindings
				this.onBound();
			}
		}

		if (this.bound === true) {
			return this._value;
		} else {
			return this.observation.get();
		}
	},
	hasDependencies: function() {
		return canReflect.valueHasDependencies(this.observation);
	},
	getValueDependencies: function() {
		return canReflect.getValueDependencies(this.observation);
	}
});

Object.defineProperty(SettableObservable.prototype,"value",{
	set: function(value){
		return this.set(value);
	},
	get: function(){
		return this.get();
	}
});

canReflect.assignSymbols(SettableObservable.prototype, {
	"can.getValue": SettableObservable.prototype.get,
	"can.setValue": SettableObservable.prototype.set,
	"can.isMapLike": false,
	"can.getPriority": function() {
		return canReflect.getPriority(this.observation);
	},
	"can.setPriority": function(newPriority) {
		canReflect.setPriority(this.observation, newPriority);
	},
	"can.valueHasDependencies": SettableObservable.prototype.hasDependencies,
	"can.getValueDependencies": SettableObservable.prototype.getValueDependencies
});

var settable = SettableObservable;

function KeyObservable(root, key){
    key = ""+key;
    this.key = key;
    this.root = root;
    settable.call(this, function(){
        return canStacheKey.get(this,key);
    }, root);
}

KeyObservable.prototype = Object.create(settable.prototype);

KeyObservable.prototype.set = function(newVal) {
    canStacheKey.set(this.root,this.key, newVal);
};


var keyObservable = KeyObservable;

var isViewSymbol$2 = canSymbol.for("can.isView");

// this creates a noop that marks that a renderer was called
// this is for situations where a helper function calls a renderer
// that was not provided such as
// {{#if false}} ... {{/if}}
// with no {{else}}
var createNoOpRenderer = function (metadata) {
	return function noop() {
		if (metadata) {
			metadata.rendered = true;
		}
	};
};

var utils = {
	last: function(arr){
		return arr !=null && arr[arr.length-1];
	},
	// A generic empty function
	emptyHandler: function(){},
	// Converts a string like "1" into 1. "null" into null, etc.
	// This doesn't have to do full JSON, so removing eval would be good.
	jsonParse: function(str){
		// if it starts with a quote, assume a string.
		if(str[0] === "'") {
			return str.substr(1, str.length -2);
		} else if(str === "undefined") {
			return undefined;
		} else {
			return JSON.parse(str);
		}
	},
	mixins: {
		last: function(){
			return this.stack[this.stack.length - 1];
		},
		add: function(chars){
			this.last().add(chars);
		},
		subSectionDepth: function(){
			return this.stack.length - 1;
		}
	},
	// Sets .fn and .inverse on a helperOptions object and makes sure
	// they can reference the current scope and options.
	createRenderers: function(helperOptions, scope, truthyRenderer, falseyRenderer, isStringOnly){
		helperOptions.fn = truthyRenderer ? this.makeRendererConvertScopes(truthyRenderer, scope, isStringOnly, helperOptions.metadata) : createNoOpRenderer(helperOptions.metadata);
		helperOptions.inverse = falseyRenderer ? this.makeRendererConvertScopes(falseyRenderer, scope, isStringOnly, helperOptions.metadata) : createNoOpRenderer(helperOptions.metadata);
		helperOptions.isSection = !!(truthyRenderer || falseyRenderer);
	},
	// Returns a new renderer function that makes sure any data or helpers passed
	// to it are converted to a can.view.Scope and a can.view.Options.
	makeRendererConvertScopes: function (renderer, parentScope, observeObservables, metadata) {
		var convertedRenderer = function (newScope, newOptions) {
			// prevent binding on fn.
			// If a non-scope value is passed, add that to the parent scope.
			if (newScope !== undefined && !(newScope instanceof canViewScope)) {
				if (parentScope) {
					newScope = parentScope.add(newScope);
				}
				else {
					newScope = new canViewScope(newScope || {});
				}
			}
			if (metadata) {
				metadata.rendered = true;
			}

			var result = renderer(newScope || parentScope );
			return result;
		};
		return observeObservables ? convertedRenderer :
			canObservationRecorder.ignore(convertedRenderer);
	},
	makeView: function(renderer){
		var view = canObservationRecorder.ignore(function(scope){
			if(!(scope instanceof canViewScope)) {
				scope = new canViewScope(scope);
			}
			return renderer(scope);
		});
		view[isViewSymbol$2] = true;
		return view;
	},
	// Calls the truthy subsection for each item in a list and returning them in a string.
	getItemsStringContent: function(items, isObserveList, helperOptions){
		var txt = "",
			len = canStacheKey.get(items, 'length'),
			isObservable = canReflect.isObservableLike(items);

		for (var i = 0; i < len; i++) {
			var item = isObservable ? new keyObservable(items, i) :items[i];
			txt += helperOptions.fn(item);
		}
		return txt;
	},
	// Calls the truthy subsection for each item in a list and returns them in a document Fragment.
	getItemsFragContent: function(items, helperOptions, scope) {
		var result = [],
			len = canStacheKey.get(items, 'length'),
			isObservable = canReflect.isObservableLike(items),
			hashExprs = helperOptions.exprData && helperOptions.exprData.hashExprs,
			hashOptions;

		// Check if using hash
		if (canReflect.size(hashExprs) > 0) {
			hashOptions = {};
			canReflect.eachKey(hashExprs, function (exprs, key) {
				hashOptions[exprs.key] = key;
			});
		}

		for (var i = 0; i < len; i++) {
			var aliases = {};

			var item = isObservable ? new keyObservable(items, i) :items[i];

			if (canReflect.size(hashOptions) > 0) {
				if (hashOptions.value) {
					aliases[hashOptions.value] = item;
				}
				if (hashOptions.index) {
					aliases[hashOptions.index] = i;
				}
			}

			result.push(helperOptions.fn(
				scope
				.add(aliases, { notContext: true })
				.add({ index: i }, { special: true })
				.add(item))
			);
		}
		return result;
	}
};

var last$2 = utils.last;

var decodeHTML = typeof document !== "undefined" && (function(){
	var el = document$1().createElement('div');
	return function(html){
		if(html.indexOf("&") === -1) {
			return html.replace(/\r\n/g,"\n");
		}
		el.innerHTML = html;
		return el.childNodes.length === 0 ? "" : el.childNodes.item(0).nodeValue;
	};
})();
// ## HTMLSectionBuilder
//
// Contains a stack of HTMLSections.
// An HTMLSection is created everytime a subsection is found. For example:
//
//     {{#if(items)}} {{#items}} X
//
// At the point X was being processed, there would be 2 HTMLSections in the
// stack.  One for the content of `{{#if(items)}}` and the other for the
// content of `{{#items}}`
var HTMLSectionBuilder = function(filename){
	if (filename) {
		this.filename = filename;
	}
	this.stack = [new HTMLSection()];
};


canAssign(HTMLSectionBuilder.prototype,utils.mixins);

canAssign(HTMLSectionBuilder.prototype,{
	startSubSection: function(process){
		var newSection = new HTMLSection(process);
		this.stack.push(newSection);
		return newSection;
	},
	// Ends the current section and returns a renderer.
	// But only returns a renderer if there is a template.
	endSubSectionAndReturnRenderer: function(){
		if(this.last().isEmpty()) {
			this.stack.pop();
			return null;
		} else {
			var htmlSection = this.endSection();
			return utils.makeView(htmlSection.compiled.hydrate.bind(htmlSection.compiled));
		}
	},
	startSection: function( process, commentName ) {
		var newSection = new HTMLSection(process);
		this.last().add({
			comment: commentName || "#section",
			callbacks: [newSection.targetCallback]
		});
		this.last().add({
			comment: "can-end-placeholder"
		});
		// adding a section within a section ...
		// the stack has section ...
		this.stack.push(newSection);
	},
	endSection: function(){
		this.last().compile();
		return this.stack.pop();
	},
	inverse: function(){
		this.last().inverse();
	},
	compile: function(){
		var compiled = this.stack.pop().compile();
		// ignore observations here.  the render fn
		//  itself doesn't need to be observable.
		return utils.makeView( compiled.hydrate.bind(compiled) );
	},
	push: function(chars){
		this.last().push(chars);
	},
	pop: function(){
		return this.last().pop();
	},
	removeCurrentNode: function() {
		this.last().removeCurrentNode();
	}
});

var HTMLSection = function(process){
	this.data = "targetData";
	this.targetData = [];
	// A record of what targetData element we are within.
	this.targetStack = [];
	var self = this;
	this.targetCallback = function(scope){
		process.call(this,
			scope,
			self.compiled.hydrate.bind(self.compiled),
			self.inverseCompiled && self.inverseCompiled.hydrate.bind(self.inverseCompiled)  ) ;
	};
};
canAssign(HTMLSection.prototype,{
	inverse: function(){
		this.inverseData = [];
		this.data = "inverseData";
	},
	// Adds a DOM node.
	push: function(data){
		this.add(data);
		this.targetStack.push(data);
	},
	pop: function(){
		return this.targetStack.pop();
	},
	add: function(data){
		if(typeof data === "string"){
			data = decodeHTML(data);
		}
		if(this.targetStack.length) {
			last$2(this.targetStack).children.push(data);
		} else {
			this[this.data].push(data);
		}
	},
	compile: function(){
		this.compiled = canViewTarget(this.targetData, document$1());
		if(this.inverseData) {
			this.inverseCompiled = canViewTarget(this.inverseData, document$1());
			delete this.inverseData;
		}
		this.targetStack = this.targetData = null;
		return this.compiled;
	},
	removeCurrentNode: function() {
		var children = this.children();
		return children.pop();
	},
	children: function(){
		if(this.targetStack.length) {
			return last$2(this.targetStack).children;
		} else {
			return this[this.data];
		}
	},
	// Returns if a section is empty
	isEmpty: function(){
		return !this.targetData.length;
	}
});
HTMLSectionBuilder.HTMLSection = HTMLSection;

var html_section = HTMLSectionBuilder;

var canDomData = createCommonjsModule(function (module) {


var isEmptyObject = function(obj){
	/* jshint -W098 */
	for(var prop in obj) {
		return false;
	}
	return true;
};

var data = new WeakMap();

// delete this node's `data`
// returns true if the node was deleted.
var deleteNode = function(node) {
	var nodeDeleted = false;
	if (data.has(node)) {
		nodeDeleted = true;
		data.delete(node);
	}
	return nodeDeleted;
};

var setData = function(node, name, value) {
	var store = data.get(node);
	if (store === undefined) {
		store = {};
		data.set(node, store);
	}
	if (name !== undefined) {
		store[name] = value;
	}
	return store;
};

/*
 * Core of domData that does not depend on mutationDocument
 * This is separated in order to prevent circular dependencies
 */
var domData = {
	_data: data,

	get: function(node, key) {
		var store = data.get(node);
		return key === undefined ? store : store && store[key];
	},

	set: setData,

	clean: function(node, prop) {
		var itemData = data.get(node);
		if (itemData && itemData[prop]) {
			delete itemData[prop];
		}
		if (isEmptyObject(itemData)) {
			deleteNode(node);
		}
	},

	delete: deleteNode
};

if (canNamespace.domData) {
	throw new Error("You can't have two versions of can-dom-data, check your dependencies");
} else {
	module.exports = canNamespace.domData = domData;
}
});

var slice$1 = [].slice;
// a b c
// a b c d
// [[2,0, d]]


function defaultIdentity(a, b){
    return a === b;
}

function makeIdentityFromMapSchema(typeSchema) {
    if(typeSchema.identity && typeSchema.identity.length) {
        return function identityCheck(a, b) {
            var aId = canReflect.getIdentity(a, typeSchema),
                bId = canReflect.getIdentity(b, typeSchema);
            return aId === bId;
        };
    } else {
        return defaultIdentity;
    }
}

function makeIdentityFromListSchema(listSchema) {
    return listSchema.values != null ?
        makeIdentityFromMapSchema( canReflect.getSchema(listSchema.values) ) :
        defaultIdentity;
}

function makeIdentity(oldList, oldListLength) {
    var listSchema = canReflect.getSchema(oldList),
        typeSchema;
    if(listSchema != null) {
        if(listSchema.values != null) {
            typeSchema = canReflect.getSchema(listSchema.values);
        } else {
            return defaultIdentity;
        }
    }
    if(typeSchema == null && oldListLength > 0) {
        typeSchema = canReflect.getSchema( canReflect.getKeyValue(oldList, 0) );
    }
    if(typeSchema) {
        return makeIdentityFromMapSchema(typeSchema);
    } else {
        return defaultIdentity;
    }
}



function reverseDiff(oldDiffStopIndex, newDiffStopIndex, oldList, newList, identity) {
	var oldIndex = oldList.length - 1,
		newIndex =  newList.length - 1;

	while( oldIndex > oldDiffStopIndex && newIndex > newDiffStopIndex) {
		var oldItem = oldList[oldIndex],
			newItem = newList[newIndex];

		if( identity( oldItem, newItem, oldIndex ) ) {
			oldIndex--;
			newIndex--;
			continue;
		} else {
			// use newIndex because it reflects any deletions
			return [{
                type: "splice",
				index: newDiffStopIndex,
			 	deleteCount: (oldIndex-oldDiffStopIndex+1),
			 	insert: slice$1.call(newList, newDiffStopIndex,newIndex+1)
			}];
		}
	}
	// if we've reached of either the new or old list
	// we simply return
	return [{
        type: "splice",
		index: newDiffStopIndex,
		deleteCount: (oldIndex-oldDiffStopIndex+1),
		insert: slice$1.call(newList, newDiffStopIndex,newIndex+1)
	}];

}

/**
 * @module {function} can-diff/list/list
 * @parent can-diff
 *
 * @description Return a difference of two lists.
 *
 * @signature `diffList( oldList, newList, [identity] )`
 *
 * Compares two lists and produces a sequence of patches that can be applied to make `oldList` take
 * the shape of `newList`.
 *
 * ```js
 * var diffList = require("can-diff/list/list");
 *
 * console.log(diff([1], [1, 2])); // -> [{type: "splice", index: 1, deleteCount: 0, insert: [2]}]
 * console.log(diff([1, 2], [1])); // -> [{type: "splice", index: 1, deleteCount: 1, insert: []}]
 *
 * // with an optional identity function:
 * diffList(
 *     [{id:1},{id:2}],
 *     [{id:1},{id:3}],
 *     (a,b) => a.id === b.id
 * ); // -> [{type: "splice", index: 1, deleteCount: 1, insert: [{id:3}]}]
 * ```
 *
 * The patch algorithm is linear with respect to the length of the lists and therefore does not produce a
 * [perfect edit distance](https://en.wikipedia.org/wiki/Edit_distance) (which would be at least quadratic).
 *
 * It is designed to work with most common list change scenarios, when items are inserted or removed
 * to a list (as opposed to moved with in the last).
 *
 * For example, it is able to produce the following patches:
 *
 * ```js
 * diffList(
 *     ["a","b","c","d"],
 *     ["a","b","X","Y","c","d"]
 * ); // -> [{type: "splice", index: 2, deleteCount: 0, insert: ["X","Y"]}]
 * ```
 *
 * @param  {ArrayLike} oldList The source array or list to diff from.
 * @param  {ArrayLike} newList The array or list to diff to.
 * @param  {function|can-reflect.getSchema} schemaOrIdentity An optional identity function or a schema with
 * an identity property for comparing elements.  If a `schemaOrIdentity` is not provided, the schema of
 * the `oldList` will be used.  If a schema can not be found, items a default identity function will be created
 * that checks if the two values are strictly equal `===`.
 * @return {Array} An array of [can-symbol/types/Patch] objects representing the differences
 *
 * Returns the difference between two ArrayLike objects (that have nonnegative
 * integer keys and the `length` property) as an array of patch objects.
 *
 * A patch object returned by this function has the following properties:
 * - **type**: the type of patch (`"splice"`).
 * - **index**:  the index of newList where the patch begins
 * - **deleteCount**: the number of items deleted from that index in newList
 * - **insert**: an Array of items newly inserted at that index in newList
 *
 * Patches should be applied in the order they are returned.
 */

var list$1 = function(oldList, newList, schemaOrIdentity){
    var oldIndex = 0,
		newIndex =  0,
		oldLength = canReflect.size( oldList ),
		newLength = canReflect.size( newList ),
		patches = [];

    var schemaType = typeof schemaOrIdentity,
        identity;
    if(schemaType === "function") {
        identity = schemaOrIdentity;
    } else if(schemaOrIdentity != null) {
        if(schemaOrIdentity.type === "map") {
            identity = makeIdentityFromMapSchema(schemaOrIdentity);
        } else {
            identity = makeIdentityFromListSchema(schemaOrIdentity);
        }
    } else {
        identity = makeIdentity(oldList, oldLength);
    }



	while(oldIndex < oldLength && newIndex < newLength) {
		var oldItem = oldList[oldIndex],
			newItem = newList[newIndex];

		if( identity( oldItem, newItem, oldIndex ) ) {
			oldIndex++;
			newIndex++;
			continue;
		}
		// look for single insert, does the next newList item equal the current oldList.
		// 1 2 3
		// 1 2 4 3
		if(  newIndex+1 < newLength && identity( oldItem, newList[newIndex+1], oldIndex ) ) {
			patches.push({index: newIndex, deleteCount: 0, insert: [ newList[newIndex] ], type: "splice"});
			oldIndex++;
			newIndex += 2;
			continue;
		}
		// look for single removal, does the next item in the oldList equal the current newList item.
		// 1 2 3
		// 1 3
		else if( oldIndex+1 < oldLength  && identity( oldList[oldIndex+1], newItem, oldIndex+1 ) ) {
			patches.push({index: newIndex, deleteCount: 1, insert: [], type: "splice"});
			oldIndex += 2;
			newIndex++;
			continue;
		}
		// just clean up the rest and exit
		// 1 2 3
		// 1 2 5 6 7
		else {
			// iterate backwards to `newIndex`
			// "a", "b", "c", "d", "e"
			// "a", "x", "y", "z", "e"
			// -> {}
			patches.push.apply(patches, reverseDiff(oldIndex, newIndex , oldList, newList, identity) );


			return patches;
		}
	}
	if( (newIndex === newLength) && (oldIndex === oldLength) ) {
		return patches;
	}
	// a b
	// a b c d e
	patches.push(
				{type: "splice", index: newIndex,
				 deleteCount: oldLength-oldIndex,
				 insert: slice$1.call(newList, newIndex) } );

	return patches;
};

var global$1 = global_1();









var xmlnsAttrNamespaceURI$1 = "http://www.w3.org/2000/xmlns/";
var xlinkHrefAttrNamespaceURI$1 =  "http://www.w3.org/1999/xlink";
var attrsNamespacesURI$1 = {
	'xmlns': xmlnsAttrNamespaceURI$1,
	'xlink:href': xlinkHrefAttrNamespaceURI$1
};


var formElements = {"INPUT": true, "TEXTAREA": true, "SELECT": true, "BUTTON": true},
	// Used to convert values to strings.
	toString = function(value){
		if(value == null) {
			return "";
		} else {
			return ""+value;
		}
	},
	isSVG = function(el){
		return el.namespaceURI === "http://www.w3.org/2000/svg";
	},
	truthy = function() { return true; },
	getSpecialTest = function(special){
		return (special && special.test) || truthy;
	},
	propProp = function(prop, obj){
		obj = obj || {};
		obj.get = function(){
			return this[prop];
		};
		obj.set = function(value){
			if(this[prop] !== value) {
				this[prop] = value;
			}
		};
		return obj;
	},
	booleanProp = function(prop){
		return {
			isBoolean: true,
			set: function(value){
				if(prop in this) {
					this[prop] = value;
				} else {
					node_1.setAttribute.call(this, prop, "");
				}
			},
			remove: function(){
				this[prop] = false;
			}
		};
	},
	setupMO = function(el, callback){
		var attrMO = canDomData.get(el, "attrMO");
		if(!attrMO) {
			var onMutation = function(){
				callback.call(el);
			};
			var MO = mutationObserver();
			if(MO) {
				var observer = new MO(onMutation);
				observer.observe(el, {
					childList: true,
					subtree: true
				});
				canDomData.set(el, "attrMO", observer);
			} else {
				canDomData.set(el, "attrMO", true);
				canDomData.set(el, "canBindingCallback", {onMutation: onMutation});
			}
		}
	},
	_findOptionToSelect = function (parent, value) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === "OPTION" && value === child.value) {
				return child;
			}
			if (child.nodeName === "OPTGROUP") {
				var groupChild = _findOptionToSelect(child, value);
				if (groupChild) {
					return groupChild;
				}
			}
			child = child.nextSibling;
		}
	},
	setChildOptions = function(el, value){
		var option;
		if (value != null) {
			option = _findOptionToSelect(el, value);
		}
		if (option) {
			option.selected = true;
		} else {
			el.selectedIndex = -1;
		}
	},
	forEachOption = function (parent, fn) {
		var child = parent.firstChild;
		while (child) {
			if (child.nodeName === "OPTION") {
				fn(child);
			}
			if (child.nodeName === "OPTGROUP") {
				forEachOption(child, fn);
			}
			child = child.nextSibling;
		}
	},
	collectSelectedOptions = function (parent) {
		var selectedValues = [];
		forEachOption(parent, function (option) {
			if (option.selected) {
				selectedValues.push(option.value);
			}
		});
		return selectedValues;
	},
	markSelectedOptions = function (parent, values) {
		forEachOption(parent, function (option) {
			option.selected = values.indexOf(option.value) !== -1;
		});
	},
	// Create a handler, only once, that will set the child options any time
	// the select's value changes.
	setChildOptionsOnChange = function(select, aEL){
		var handler = canDomData.get(select, "attrSetChildOptions");
		if(handler) {
			return Function.prototype;
		}
		handler = function(){
			setChildOptions(select, select.value);
		};
		canDomData.set(select, "attrSetChildOptions", handler);
		aEL.call(select, "change", handler);
		return function(rEL){
			canDomData.clean(select, "attrSetChildOptions");
			rEL.call(select, "change", handler);
		};
	},
	// cache of rules already calculated by `attr.getRule`
	behaviorRules = new Map(),
	// # isPropWritable
	// check if a property is writable on an element by finding its property descriptor
	// on the element or its prototype chain
	isPropWritable = function(el, prop) {
		   var desc = Object.getOwnPropertyDescriptor(el, prop);

		   if (desc) {
				   return desc.writable || desc.set;
		   } else {
				   var proto = Object.getPrototypeOf(el);
				   if (proto) {
						   return isPropWritable(proto, prop);
				   }
		   }

		   return false;
	},
	// # cacheRule
	// add a rule to the rules Map so it does not need to be calculated more than once
	cacheRule = function(el, attrOrPropName, rule) {
		   var rulesForElementType;

		   rulesForElementType = behaviorRules.get(el.prototype);

		   if (!rulesForElementType) {
				   rulesForElementType = {};
				   behaviorRules.set(el.constructor, rulesForElementType);
		   }

		   rulesForElementType[attrOrPropName] = rule;

		   return rule;
	};

var specialAttributes = {
	checked: {
		get: function(){
			return this.checked;
		},
		set: function(val){
			// - `set( truthy )` => TRUE
			// - `set( "" )`     => TRUE
			// - `set()`         => TRUE
			// - `set(undefined)` => false.
			var notFalse = !!val || val === "" || arguments.length === 0;
			this.checked = notFalse;
			if(notFalse && this.type === "radio") {
				this.defaultChecked = true;
			}
		},
		remove: function(){
			this.checked = false;
		},
		test: function(){
			return this.nodeName === "INPUT";
		}
	},
	"class": {
		get: function(){
			if(isSVG(this)) {
				return this.getAttribute("class");
			}
			return this.className;
		},
		set: function(val){
			val = val || "";

			if(isSVG(this)) {
				node_1.setAttribute.call(this, "class", "" + val);
			} else {
				this.className = val;
			}
		}
	},
	disabled: booleanProp("disabled"),
	focused: {
		get: function(){
			return this === document.activeElement;
		},
		set: function(val){
			var cur = attr.get(this, "focused");
			var docEl = this.ownerDocument.documentElement;
			var element = this;
			function focusTask() {
				if (val) {
					element.focus();
				} else {
					element.blur();
				}
			}
			if (cur !== val) {
				if (!docEl.contains(element)) {
					var connectionDisposal = canDomMutate.onNodeConnected(element, function () {
						connectionDisposal();
						focusTask();
					});
				} else {
					// THIS MIGHT NEED TO BE PUT IN THE MUTATE QUEUE
					canQueues.enqueueByQueue({
						mutate: [focusTask]
					}, null, []);
				}
			}
			return true;
		},
		addEventListener: function(eventName, handler, aEL){
			aEL.call(this, "focus", handler);
			aEL.call(this, "blur", handler);
			return function(rEL){
				rEL.call(this, "focus", handler);
				rEL.call(this, "blur", handler);
			};
		},
		test: function(){
			return this.nodeName === "INPUT";
		}
	},
	"for": propProp("htmlFor"),
	innertext: propProp("innerText"),
	innerhtml: propProp("innerHTML"),
	innerHTML: propProp("innerHTML", {
		addEventListener: function(eventName, handler, aEL){
			var handlers = [];
			var el = this;
			["change", "blur"].forEach(function(eventName){
				var localHandler = function(){
					handler.apply(this, arguments);
				};
				canDomEvents.addEventListener(el, eventName, localHandler);
				handlers.push([eventName, localHandler]);
			});

			return function(rEL){
				handlers.forEach( function(info){
					rEL.call(el, info[0], info[1]);
				});
			};
		}
	}),
	required: booleanProp("required"),
	readonly: booleanProp("readOnly"),
	selected: {
		get: function(){
			return this.selected;
		},
		set: function(val){
			val = !!val;
			canDomData.set(this, "lastSetValue", val);
			this.selected = val;
		},
		addEventListener: function(eventName, handler, aEL){
			var option = this;
			var select = this.parentNode;
			var lastVal = option.selected;
			var localHandler = function(changeEvent){
				var curVal = option.selected;
				lastVal = canDomData.get(option, "lastSetValue") || lastVal;
				if(curVal !== lastVal) {
					lastVal = curVal;

					canDomEvents.dispatch(option, eventName);
				}
			};

			var removeChangeHandler = setChildOptionsOnChange(select, aEL);
			canDomEvents.addEventListener(select, "change", localHandler);
			aEL.call(option, eventName, handler);

			return function(rEL){
				removeChangeHandler(rEL);
				canDomEvents.removeEventListener(select, "change", localHandler);
				rEL.call(option, eventName, handler);
			};
		},
		test: function(){
			return this.nodeName === "OPTION" && this.parentNode &&
				this.parentNode.nodeName === "SELECT";
		}
	},
	style: {
		set: (function () {
			var el = global$1.document && document$1().createElement("div");
			if ( el && el.style && ("cssText" in el.style) ) {
				return function (val) {
					this.style.cssText = (val || "");
				};
			} else {
				return function (val) {
					node_1.setAttribute.call(this, "style", val);
				};
			}
		})()
	},
	textcontent: propProp("textContent"),
	value: {
		get: function(){
			var value = this.value;
			if(this.nodeName === "SELECT") {
				if(("selectedIndex" in this) && this.selectedIndex === -1) {
					value = undefined;
				}
			}
			return value;
		},
		set: function(value){
			var nodeName = this.nodeName.toLowerCase();
			if(nodeName === "input" || nodeName === "textarea") {
				// Do some input types support non string values?
				value = toString(value);
			}
			if(this.value !== value || nodeName === "option") {
				this.value = value;
			}
			if (nodeName === "input" || nodeName === "textarea") {
				this.defaultValue = value;
			}
			if(nodeName === "select") {
				canDomData.set(this, "attrValueLastVal", value);
				//If it's null then special case
				setChildOptions(this, value === null ? value : this.value);

				// If not in the document reset the value when inserted.
				var docEl = this.ownerDocument.documentElement;
				if(!docEl.contains(this)) {
					var select = this;
					var connectionDisposal = canDomMutate.onNodeConnected(select, function () {
						connectionDisposal();
						setChildOptions(select, value === null ? value : select.value);
					});
				}

				// MO handler is only set up **ONCE**
				setupMO(this, function(){
					var value = canDomData.get(this, "attrValueLastVal");
					attr.set(this, "value", value);
					canDomEvents.dispatch(this, "change");
				});
			}
			//!steal-remove-end
		},
		test: function(){
			return formElements[this.nodeName];
		}
	},
	values: {
		get: function(){
			return collectSelectedOptions(this);
		},
		set: function(values){
			values = values || [];

			// set new DOM state
			markSelectedOptions(this, values);

			// store new DOM state
			canDomData.set(this, "stickyValues", attr.get(this,"values") );

			// MO handler is only set up **ONCE**
			// TODO: should this be moved into addEventListener?
			setupMO(this, function(){

				// Get the previous sticky state
				var previousValues = canDomData.get(this,
					"stickyValues");

				// Set DOM to previous sticky state
				attr.set(this, "values", previousValues);

				// Get the new result after trying to maintain the sticky state
				var currentValues = canDomData.get(this,
					"stickyValues");

				// If there are changes, trigger a `values` event.
				var changes = list$1(previousValues.slice().sort(),
					currentValues.slice().sort());

				if (changes.length) {
					canDomEvents.dispatch(this, "values");
				}
			});
		},
		addEventListener: function(eventName, handler, aEL){
			var localHandler = function(){
				canDomEvents.dispatch(this, "values");
			};

			canDomEvents.addEventListener(this, "change", localHandler);
			aEL.call(this, eventName, handler);

			return function(rEL){
				canDomEvents.removeEventListener(this, "change", localHandler);
				rEL.call(this, eventName, handler);
			};
		}
	}
};

var attr = {
	// cached rules (stored on `attr` for testing purposes)
	rules: behaviorRules,

	// special attribute behaviors (stored on `attr` for testing purposes)
	specialAttributes: specialAttributes,

	// # attr.getRule
	//
	// get the behavior rule for an attribute or property on an element
	//
	// Rule precendence:
	//   1. "special" behaviors - use the special behavior getter/setter
	//   2. writable properties - read and write as a property
	//   3. all others - read and write as an attribute
	//
	// Once rule is determined it will be cached for all elements of the same type
	// so that it does not need to be calculated again
	getRule: function(el, attrOrPropName) {
		var special = specialAttributes[attrOrPropName];
		// always use "special" if available
		// these are not cached since they would have to be cached separately
		// for each element type and it is faster to just look up in the
		// specialAttributes object
		if (special) {
			return special;
		}

		// next use rules cached in a previous call to getRule
		var rulesForElementType = behaviorRules.get(el.constructor);
		var cached = rulesForElementType && rulesForElementType[attrOrPropName];

		if (cached) {
			return cached;
		}

		// if the element doesn't have a property of this name, it must be an attribute
		if (!(attrOrPropName in el)) {
			return this.attribute(attrOrPropName);
		}

		// if there is a property, check if it is writable
		var newRule = isPropWritable(el, attrOrPropName) ?
			this.property(attrOrPropName) :
			this.attribute(attrOrPropName);

		// cache the new rule and return it
		return cacheRule(el, attrOrPropName, newRule);
	},

	attribute: function(attrName) {
		return {
			get: function() {
				return this.getAttribute(attrName);
			},
			set: function(val) {
				if (attrsNamespacesURI$1[attrName]) {
					node_1.setAttributeNS.call(this, attrsNamespacesURI$1[attrName], attrName, val);
				} else {
					node_1.setAttribute.call(this, attrName, val);
				}
			}
		};
	},

	property: function(propName) {
		return {
			get: function() {
				return this[propName];
			},
			set: function(val) {
				this[propName] = val;
			}
		};
	},

	findSpecialListener: function(attributeName) {
		return specialAttributes[attributeName] && specialAttributes[attributeName].addEventListener;
	},

	setAttrOrProp: function(el, attrName, val){
		return this.set(el, attrName, val);
	},
	// ## attr.set
	// Set the value an attribute on an element.
	set: function (el, attrName, val) {
		var rule = this.getRule(el, attrName);
		var setter = rule && rule.set;

		if (setter) {
			return setter.call(el, val);
		}
	},
	// ## attr.get
	// Gets the value of an attribute or property.
	// First checks if the property is an `specialAttributes` and if so calls the special getter.
	// Then checks if the attribute or property is a property on the element.
	// Otherwise uses `getAttribute` to retrieve the value.
	get: function (el, attrName) {
		var rule = this.getRule(el, attrName);
		var getter = rule && rule.get;

		if (getter) {
			return rule.test ?
				rule.test.call(el) && getter.call(el) :
				getter.call(el);
		}
	},
	// ## attr.remove
	// Removes an attribute from an element. First checks specialAttributes to see if the attribute is special and has a setter. If so calls the setter with `undefined`. Otherwise `removeAttribute` is used.
	// If the attribute previously had a value and the browser doesn't support MutationObservers we then trigger an "attributes" event.
	remove: function (el, attrName) {
		attrName = attrName.toLowerCase();
		var special = specialAttributes[attrName];
		var setter = special && special.set;
		var remover = special && special.remove;
		var test = getSpecialTest(special);

		if(typeof remover === "function" && test.call(el)) {
			remover.call(el);
		} else if(typeof setter === "function" && test.call(el)) {
			setter.call(el, undefined);
		} else {
			node_1.removeAttribute.call(el, attrName);
		}
	}
};

var behaviors$1 = attr;

var setElementSymbol$1 = canSymbol.for("can.setElement");
var elementSymbol = canSymbol.for("can.element");

function ListenUntilRemovedAndInitialize(
	observable,
	handler,
	placeholder,
	queueName,
	handlerName
) {
	this.observable = observable;
	this.handler = handler;
	this.placeholder = placeholder;
	this.queueName = queueName;
	this.handler[elementSymbol] = placeholder;

	if( observable[setElementSymbol$1] ) {
		observable[setElementSymbol$1](placeholder);
	} else {
		console.warn("no can.setElement symbol on observable", observable);
	}
	//!steal-remove-end

	this.setup();
}
ListenUntilRemovedAndInitialize.prototype.setup = function() {
	// reinsertion case, not applicable during initial setup
	if(this.setupNodeReinserted) {
		// do not set up again if disconnected
		if(!IsConnected.isConnected(this.placeholder)) {
			return;
		}
		this.setupNodeReinserted();
	}
	this.teardownNodeRemoved = canDomMutate.onNodeRemoved(this.placeholder,
		this.teardown.bind(this));
	//!steal-remove-end

	canReflect.onValue(this.observable, this.handler, this.queueName);
	this.handler(  canReflect.getValue(this.observable) );

};
ListenUntilRemovedAndInitialize.prototype.teardown = function(){
	// do not teardown if still connected.
	if(IsConnected.isConnected(this.placeholder)) {
		return;
	}
	this.teardownNodeRemoved();
	this.setupNodeReinserted = canDomMutate.onNodeInserted(this.placeholder,
		this.setup.bind(this));
	//!steal-remove-end
	canReflect.offValue(this.observable, this.handler, this.queueName);
};


var helpers = {
	range: {
		create: function(el, rangeName){
			var start, end, next;

			if(el.nodeType === Node.COMMENT_NODE) {
				start = el;
				next = el.nextSibling;
				if(next && next.nodeType === Node.COMMENT_NODE && next.nodeValue === "can-end-placeholder") {
					end = next;
					end.nodeValue = "/" + (start.nodeValue = rangeName);
				} else {
					dev.warn("can-view-live: creating an end comment for ", rangeName, el);
				}
			} else {
				dev.warn("can-view-live: forcing a comment range for ", rangeName, el);
				start = el.ownerDocument.createComment( rangeName );
				el.parentNode.replaceChild( start, el );
			}

			if(!end) {
				end = el.ownerDocument.createComment( "/" + rangeName );
				start.parentNode.insertBefore(end, start.nextSibling);
			}

			return {start: start, end: end};
		},
		remove: function ( range ) {
			// TODO: Ideally this would be able to remove from the end, but
			// dispatch in the right order.
			// For now, we might want to remove nodes in the right order.
			var parentNode = range.start.parentNode,
				cur = range.end.previousSibling,
				remove;
			while(cur && cur !== range.start) {
				remove = cur;
				cur = cur.previousSibling;
				node_1.removeChild.call(parentNode, remove );
			}

			canDomMutate.flushRecords();
		},

		update: function ( range, frag ) {
			var parentNode = range.start.parentNode;
			if(parentNode) {
				node_1.insertBefore.call(parentNode, frag, range.end);
				// this makes it so `connected` events will be called immediately
				canDomMutate.flushRecords();
			}
		}
	},
	ListenUntilRemovedAndInitialize: ListenUntilRemovedAndInitialize,
	getAttributeParts: function(newVal) {
		var attrs = {},
			attr;
		canViewParser.parseAttrs(newVal, {
			attrStart: function(name) {
				attrs[name] = "";
				attr = name;
			},
			attrValue: function(value) {
				attrs[attr] += value;
			},
			attrEnd: function() {}
		});
		return attrs;
	},
	// #### addTextNodeIfNoChildren
	// Append an empty text node to a parent with no children;
	//  do nothing if the parent already has children.
	addTextNodeIfNoChildren: function(frag) {
		if (!frag.firstChild) {
			frag.appendChild(frag.ownerDocument.createTextNode(""));
		}
	},
	// #### makeString
	// any -> string converter (including nullish)
	makeString: function(txt) {
		return txt == null ? "" : "" + txt;
	}
};

/**
 * @function can-view-live.attr attr
 * @parent can-view-live
 *
 * @signature `live.attr(el, attributeName, observable)`
 *
 * Keep an attribute live to a [can-reflect]-ed observable.
 *
 * ```js
 * var div = document.createElement('div');
 * var value = new SimpleObservable("foo bar");
 * live.attr(div,"class", value);
 * ```
 *
 * @param {HTMLElement} el The element whos attribute will be kept live.
 * @param {String} attributeName The attribute name.
 * @param {Object} observable An observable value.
 *
 * @body
 *
 * ## How it works
 *
 * This listens for the changes in the observable and uses those changes to
 * set the specified attribute.
 */
var attr_1 = function(el, attributeName, compute) {
	var handlerName = "";
	//!steal-remove-end

	new helpers.ListenUntilRemovedAndInitialize(compute,
			function liveUpdateAttr(newVal) {
				behaviors$1.set(el,attributeName, newVal);
			},
			el,
			"dom",
			handlerName
		);
};

// This provides live binding for stache attributes.






var attrs = function(el, compute, scope, options) {
	var handlerName = "";
	if (!canReflect.isObservableLike(compute)) {
		// Non-live case (`compute` was not a compute):
		//  set all attributes on the element and don't
		//  worry about setting up live binding since there
		//  is not compute to bind on.
		var attrs = helpers.getAttributeParts(compute);
		for (var name in attrs) {
			node_1.setAttribute.call(el, name, attrs[name]);
		}
		return;
	}
	//!steal-remove-end


	// last set of attributes
	var oldAttrs = {};


	new helpers.ListenUntilRemovedAndInitialize(compute,
		function canViewLive_updateAttributes(newVal) {
			var newAttrs = helpers.getAttributeParts(newVal),
				name;
			for (name in newAttrs) {
				var newValue = newAttrs[name],
					// `oldAttrs` was set on the last run of setAttrs in this context
					//  (for this element and compute)
					oldValue = oldAttrs[name];
				// Only fire a callback
				//  if the value of the attribute has changed
				if (newValue !== oldValue) {
					// set on DOM attributes (dispatches an "attributes" event as well)
					node_1.setAttribute.call(el, name, newValue);
					// get registered callback for attribute name and fire
					var callback = canViewCallbacks.attr(name);
					if (callback) {
						callback(el, {
							attributeName: name,
							scope: scope,
							options: options
						});
					}
				}
				// remove key found in new attrs from old attrs
				delete oldAttrs[name];
			}
			// any attrs left at this point are not set on the element now,
			// so remove them.
			for (name in oldAttrs) {
				node_1.removeAttribute.call(el, name);
			}
			oldAttrs = newAttrs;
		},
		el,
		"dom",
		handlerName);

};

var viewInsertSymbol$1 = canSymbol.for("can.viewInsert");

function makeCommentFragment(comment) {
		var doc = document$1();
		return canFragment([
			doc.createComment(comment),
			doc.createComment("can-end-placeholder")
		]);
}

/**
 * @function can-view-live.html html
 * @parent can-view-live
 * @release 2.0.4
 *
 * Live binds a compute's value to a collection of elements.
 *
 * @signature `live.html(el, compute, [parentNode])`
 *
 * `live.html` is used to setup incremental live-binding on a block of html.
 *
 * ```js
 * // a compute that changes its list
 * var greeting = compute(function(){
 *   return "Welcome <i>"+me.attr("name")+"</i>"
 * });
 *
 * var placeholder = document.createTextNode(" ");
 * $("#greeting").append(placeholder);
 *
 * live.html(placeholder, greeting);
 * ```
 *
 * @param {HTMLElement} el An html element to replace with the live-section.
 *
 * @param {can.compute} compute A [can.compute] whose value is HTML.
 *
 * @param {HTMLElement} [parentNode] An overwritable parentNode if `el`'s parent is
 * a documentFragment.
 *
 *
 */
var html = function(el, compute, viewInsertSymbolOptions) {

	var observableName = "";
	var updateRange = helpers.range.update;
	//!steal-remove-end

	if (el.nodeType !== Node.COMMENT_NODE) {
		var commentFrag = makeCommentFragment(observableName);
		var startCommentNode = commentFrag.firstChild;
		el.parentNode.replaceChild(commentFrag, el);
		el = startCommentNode;
	}

	// replace element with a comment node
	var range = helpers.range.create(el, observableName);

	var useQueue = false;
	new helpers.ListenUntilRemovedAndInitialize(compute,
		function canViewLive_updateHTML(val) {

			// If val has the can.viewInsert symbol, call it and get something usable for val back
			if (val && typeof val[viewInsertSymbol$1] === "function") {
				val = val[viewInsertSymbol$1](viewInsertSymbolOptions);
			}

			var isFunction = typeof val === "function";

			// translate val into a document fragment if it's DOM-like
			var frag = isFunction ?
				makeCommentFragment(observableName) :
				canFragment(val);

			if(isFunction) {
				val(frag.firstChild);
			}

			if(useQueue === true) {
				helpers.range.remove(range);
				updateRange(range, frag);
			} else {
				helpers.range.update(range, frag);
				useQueue = true;
			}
		},
		range.start,
		"dom",
		"live.html replace::" + observableName);

};

var onValueSymbol$2 = canSymbol.for("can.onValue"),
	offValueSymbol$1 = canSymbol.for("can.offValue");
var onPatchesSymbol$1 = canSymbol.for("can.onPatches");
var offPatchesSymbol$1 = canSymbol.for("can.offPatches");

// Patcher takes a observable that might wrap a list type.
// When the observable changes, it will diff, and emit patches,
// and if the list emits patches, it will emit those too.
// It is expected that only `domUI` handlers are registered.
/*
var observable = new SimpleObservable( new DefineList([ "a", "b", "c" ]) )
var patcher = new Patcher(observable)
canReflect.onPatches( patcher,function(patches){
  console.log(patches) // a patch removing c, then a
})
var newList = new DefineList(["a","b"]);
observable.set(newList);
newList.unshift("X");
[
    {type: "splice", index: 2, deleteCount: 1}
]
var patches2 = [
    {type: "splice", index: 0, deleteCount: 0, inserted: ["X"]}
]
 */
var Patcher = function(observableOrList, priority) {
	// stores listeners for this patcher
	this.handlers = new canKeyTree([Object, Array], {
		// call setup when the first handler is bound
		onFirst: this.setup.bind(this),
		// call teardown when the last handler is removed
		onEmpty: this.teardown.bind(this)
	});

	// save this value observable or patch emitter (list)
	this.observableOrList = observableOrList;
	// if we were passed an observable value that we need to read its array for changes
	this.isObservableValue = canReflect.isValueLike(this.observableOrList) || canReflect.isObservableLike(this.observableOrList);
	if(this.isObservableValue) {
	    this.priority = canReflect.getPriority(observableOrList);
	} else {
	    this.priority = priority || 0;
	}
	this.onList = this.onList.bind(this);
	this.onPatchesNotify = this.onPatchesNotify.bind(this);
	// needs to be unique so the derive queue doesn't only add one.
	this.onPatchesDerive = this.onPatchesDerive.bind(this);

	// stores patches that have happened between notification and
	// when we queue the  `onPatches` handlers in the `domUI` queue
	this.patches = [];
	//!steal-remove-end
};


Patcher.prototype = {
	constructor: Patcher,
	setup: function() {
		if (this.observableOrList[onValueSymbol$2]) {
			// if we have an observable value, listen to when it changes to get a
			// new list.
			canReflect.onValue(this.observableOrList, this.onList, "notify");
			// listen on the current value (which shoudl be a list) if there is one
			this.setupList(canReflect.getValue(this.observableOrList));
		} else {
			this.setupList(this.observableOrList);
		}
	},
	teardown: function() {
		if (this.observableOrList[offValueSymbol$1]) {
			canReflect.offValue(this.observableOrList, this.onList, "notify");
		}
		if (this.currentList && this.currentList[offPatchesSymbol$1]) {
			this.currentList[offPatchesSymbol$1](this.onPatchesNotify, "notify");
		}
	},
	// listen to the list for patches
	setupList: function(list) {
		this.currentList = list;
		if (list && list[onPatchesSymbol$1]) {
			// If observable, set up bindings on list changes
			list[onPatchesSymbol$1](this.onPatchesNotify, "notify");
		}
	},
	// when the list changes, teardown the old list bindings
	// and setup the new list
	onList: function onList(newList) {
		var current = this.currentList || [];
		newList = newList || [];
		if (current[offPatchesSymbol$1]) {
			current[offPatchesSymbol$1](this.onPatchesNotify, "notify");
		}
		var patches = list$1(current, newList);
		this.currentList = newList;
		this.onPatchesNotify(patches);
		if (newList[onPatchesSymbol$1]) {
			// If observable, set up bindings on list changes
			newList[onPatchesSymbol$1](this.onPatchesNotify, "notify");
		}
	},
	// This is when we get notified of patches on the underlying list.
	// Save the patches and queue up a `derive` task that will
	// call `domUI` updates.
	onPatchesNotify: function onPatchesNotify(patches) {
		// we are going to collect all patches
		this.patches.push.apply(this.patches, patches);
		// TODO: share priority
		canQueues.deriveQueue.enqueue(this.onPatchesDerive, this, [], {
			priority: this.priority
		});
	},
	// Let handlers (which should only be registered in `domUI`) know about patches
	// that they can apply.
	onPatchesDerive: function onPatchesDerive() {
		var patches = this.patches;
		this.patches = [];
		canQueues.enqueueByQueue(this.handlers.getNode([]), this.currentList, [patches, this.currentList], null,["Apply patches", patches]);
	}
};

canReflect.assignSymbols(Patcher.prototype, {
	"can.onPatches": function(handler, queue) {
		this.handlers.add([queue || "mutate", handler]);
	},
	"can.offPatches": function(handler, queue) {
		this.handlers.delete([queue || "mutate", handler]);
	}
});

var patcher = Patcher;

var patchSort = function(patches) {
	//!steal-remove-end


	var splitPatches = [];
	patches.forEach(function(patch){
		if (patch.type === "move") {
			splitPatches.push( {patch: patch, kind: "move"} );
		} else {
			if (patch.deleteCount) {
				splitPatches.push({
					type: "splice",
					index: patch.index,
					deleteCount: patch.deleteCount,
					insert: [],
				});
			}
			if (patch.insert && patch.insert.length) {
				splitPatches.push({
					type: "splice",
					index: patch.index,
					deleteCount: 0,
					insert: patch.insert
				});
			}
		}
	});
	if(patches.length !== 2) {
		return patches;
	}
	var first = splitPatches[0],
		second = splitPatches[1];
	// if insert before a delete
	if(first.insert && first.insert.length && second.deleteCount) {
		// lets swap the order.
		var insert = first,
			remove = second;
		if(insert.index < remove.index) {
			remove.index = remove.index - insert.insert.length;
		} else if(insert.index > remove.index) {
			insert.index = insert.index - remove.deleteCount;
		} else {
			throw "indexes the same!"
		}
		return [remove, insert];
	}
	return patches;
};

function SetObservable(initialValue, setter) {
	this.setter = setter;

	canSimpleObservable.call(this, initialValue);
}

SetObservable.prototype = Object.create(canSimpleObservable.prototype);
SetObservable.prototype.constructor = SetObservable;
SetObservable.prototype.set = function(newVal) {
	this.setter(newVal);
};


canReflect.assignSymbols(SetObservable.prototype, {
	"can.setValue": SetObservable.prototype.set
});

var setObservable = SetObservable;

var splice = [].splice;

// #### renderAndAddRangeNode
// a helper function that renders something and adds its nodeLists to newNodeLists
// in the right way for stache.
var renderAndAddRangeNode = function(render, context, args, document) {
		// call the renderer, passing in the new nodeList as the last argument
		var itemHTML = render.apply(context, args.concat()),
			// and put the output into a document fragment
			itemFrag = canFragment(itemHTML);

		var rangeNode = document.createTextNode("");
		itemFrag.appendChild(rangeNode);
		return itemFrag;
	};


function getFrag(first, last){
	var frag = first.ownerDocument.createDocumentFragment();
	var current,
		lastInserted;
	// hopefully this doesn't dispatch removed?
	while(last !== first) {
		current = last;
		last = current.previousSibling;
		frag.insertBefore(current, lastInserted);
		lastInserted = current;
	}
	frag.insertBefore(last, lastInserted);
	return frag;
}

var onPatchesSymbol = canSymbol.for("can.onPatches");
var offPatchesSymbol = canSymbol.for("can.offPatches");

function ListDOMPatcher(el, compute, render, context, falseyRender) {
	this.patcher = new patcher(compute);
	var observableName = canReflect.getName(compute);

	// argument cleanup

	// function callback binding

	// argument saving -----
	this.value = compute;
	this.render = render;
	this.context = context;
	this.falseyRender = falseyRender;
	this.range = helpers.range.create(el, observableName);

	// A mapping of indices to observables holding that index.
	this.indexMap = [];
	// A mapping of each item's end node
	this.itemEndNode = [];

	// A mapping of each item to its pending patches.
	this.domQueue = [];

	this.isValueLike = canReflect.isValueLike(this.value);
	this.isObservableLike = canReflect.isObservableLike(this.value);

	// Setup binding and teardown to add and remove events
	this.onPatches = this.onPatches.bind(this);
	this.processDomQueue = this.processDomQueue.bind(this);
	this.teardownValueBinding = this.teardownValueBinding.bind(this);

	this.meta = {reasonLog: "live.html add::"+observableName, element: this.range.start};
	//!steal-remove-end

	this.setupValueBinding();
}

var onPatchesSymbol = canSymbol.for("can.onPatches");
var offPatchesSymbol = canSymbol.for("can.offPatches");

ListDOMPatcher.prototype = {
	setupValueBinding: function() {
		// Teardown when the placeholder element is removed.
		this.teardownNodeRemoved = canDomMutate.onNodeRemoved(this.range.start, this.teardownValueBinding);

		// Listen to when the patcher produces patches.
		this.patcher[onPatchesSymbol](this.onPatches, "notify");

		// Initialize with the patcher's value
		if (this.patcher.currentList && this.patcher.currentList.length) {
			this.add(this.patcher.currentList, 0);
		} else {
			this.addFalseyIfEmpty();
		}
		//!steal-remove-end
	},
	teardownValueBinding: function() {

		this.exit = true;
		// Stop listening for teardowns
		this.teardownNodeRemoved();
		this.patcher[offPatchesSymbol](this.onPatches, "notify");
		//!steal-remove-end
	},
	onPatches: function ListDOMPatcher_onPatches(patches) {
		if (this.exit) {
			return;
		}
		var sortedPatches = [];
		patches.forEach(function(patch) {
			sortedPatches.push.apply(sortedPatches, patchSort([patch]));
		});
		// adjust so things can happen
		for (var i = 0, patchLen = sortedPatches.length; i < patchLen; i++) {
			var patch = sortedPatches[i];
			if (patch.type === "move") {
				this.addToDomQueue(
					this.move,
					[patch.toIndex, patch.fromIndex]
				);
			} else {
				if (patch.deleteCount) {
					// Remove any items scheduled for deletion from the patch.
					this.addToDomQueue(this.remove, [{
						length: patch.deleteCount
					}, patch.index]);
				}
				if (patch.insert && patch.insert.length) {
					// Insert any new items at the index
					this.addToDomQueue(this.add, [patch.insert, patch.index]);
				}
			}

		}
	},
	addToDomQueue: function(fn, args) {
		this.domQueue.push({
			fn: fn,
			args: args
		});
		canQueues.domQueue.enqueue(this.processDomQueue, this, [this.domQueue], this.meta);
	},
	processDomQueue: function() {
		this.domQueue.forEach(function(queueItem) {
			var fn = queueItem.fn;
			var args = queueItem.args;
			fn.apply(this, args);
		}.bind(this));
		this.domQueue = [];
	},
	add: function(items, index) {
		//if (!afterPreviousEvents) {
		//	return;
		//}
		// Collect new html and mappings
		var ownerDocument = this.range.start.ownerDocument,
			frag = ownerDocument.createDocumentFragment(),
			newEndNodes = [],
			newIndicies = [],
			render = this.render,
			context = this.context;
		// For each new item,
		items.forEach( function(item, key) {

			var itemIndex = new canSimpleObservable(key + index),
				itemCompute = new setObservable(item, function(newVal) {
					canReflect.setKeyValue(this.patcher.currentList, itemIndex.get(), newVal );
				}.bind(this)),
				itemFrag = renderAndAddRangeNode(render, context, [itemCompute, itemIndex], ownerDocument);

			newEndNodes.push(itemFrag.lastChild);
			// Hookup the fragment (which sets up child live-bindings) and
			// add it to the collection of all added elements.
			frag.appendChild(itemFrag);
			// track indicies;
			newIndicies.push(itemIndex);
		}, this);
		// The position of elements is always after the initial text placeholder node

		// TODO: this should probably happen earlier.
		// remove falsey if there's something there
		if (!this.indexMap.length) {
			// remove all leftover things
			helpers.range.remove(this.range);
			this.itemEndNode = [];
		}
		// figure out where we are placing things.
		var placeholder,
			endNodesLength = this.itemEndNode.length;
		if(index === endNodesLength ) {
			placeholder = this.range.end;
		} else if(index === 0) {
			placeholder = this.range.start.nextSibling;
		} else if(index < endNodesLength) {
			placeholder = this.itemEndNode[index - 1].nextSibling;
		} else {
			throw new Error("Unable to place item");
		}

		node_1.insertBefore.call(placeholder.parentNode,frag,placeholder);

		splice.apply(this.itemEndNode, [
			index,
			0
		].concat(newEndNodes));

		// update indices after insert point
		splice.apply(this.indexMap, [
			index,
			0
		].concat(newIndicies));

		for (var i = index + newIndicies.length, len = this.indexMap.length; i < len; i++) {
			this.indexMap[i].set(i);
		}
	},
	remove: function(items, index) {
		//if (!afterPreviousEvents) {
		//	return;
		//}

		// If this is because an element was removed, we should
		// check to make sure the live elements are still in the page.
		// If we did this during a teardown, it would cause an infinite loop.
		//if (!duringTeardown && this.data.teardownCheck(this.placeholder.parentNode)) {
		//	return;
		//}
		if (index < 0) {
			index = this.indexMap.length + index;
		}
		var removeStart;
		var removeEnd;
		var removeCount = items.length;
		var endIndex = index + removeCount - 1;
		if(index === 0) {
			removeStart = this.range.start;
		} else {
			removeStart = this.itemEndNode[index - 1];
		}
		removeEnd = this.itemEndNode[endIndex].nextSibling;

		this.itemEndNode.splice(index, items.length);

		if (removeStart && removeEnd) {
			helpers.range.remove({start: removeStart, end: removeEnd});
		}

		var indexMap = this.indexMap;

		// update indices after remove point
		indexMap.splice(index, items.length);
		for (var i = index, len = indexMap.length; i < len; i++) {
			indexMap[i].set(i);
		}

		// don't remove elements during teardown.  Something else will probably be doing that.
		if (!this.exit) {
			// adds the falsey section if the list is empty
			this.addFalseyIfEmpty();
		}
	},
	// #### addFalseyIfEmpty
	// Add the results of redering the "falsey" or inverse case render to the
	// master nodeList and the DOM if the live list is empty
	addFalseyIfEmpty: function() {
		if (this.falseyRender && this.indexMap.length === 0) {
			// If there are no items ... we should render the falsey template
			var falseyFrag = renderAndAddRangeNode(this.falseyRender, this.currentList, [this.currentList], this.range.start.ownerDocument);
			helpers.range.update(this.range, falseyFrag);
		}
	},
	move: function move(newIndex, currentIndex) {
		//if (!afterPreviousEvents) {
		//	return;
		//}
		// The position of elements is always after the initial text
		// placeholder node


		var currentFirstNode,
			currentEndNode = this.itemEndNode[currentIndex];
		if( currentIndex > 0 ) {
			currentFirstNode = this.itemEndNode[currentIndex - 1].nextSibling;
		} else {
			currentFirstNode = this.range.start.nextSibling;
		}
		var newIndexFirstNode;
		if (currentIndex < newIndex) {
			// we need to advance one spot, because removing at
			// current index will shift everything left
			newIndexFirstNode = this.itemEndNode[newIndex].nextSibling;
		} else {
			if( newIndex > 0 ) {
				newIndexFirstNode = this.itemEndNode[newIndex - 1].nextSibling;
			} else {
				newIndexFirstNode = this.range.start.nextSibling;
			}
		}
		// need to put this at the newIndex



		var frag = getFrag(currentFirstNode, currentEndNode);
		newIndexFirstNode.parentNode.insertBefore(frag, newIndexFirstNode);

		// update endNodes
		this.itemEndNode.splice(currentIndex, 1);
		this.itemEndNode.splice(newIndex, 0,currentEndNode);


		// Update indexMap
		newIndex = newIndex + 1;
		currentIndex = currentIndex + 1;

		var indexMap = this.indexMap;

		// Convert back to a zero-based array index
		newIndex = newIndex - 1;
		currentIndex = currentIndex - 1;

		// Grab the index compute from the `indexMap`
		var indexCompute = indexMap[currentIndex];

		// Remove the index compute from the `indexMap`
		[].splice.apply(indexMap, [currentIndex, 1]);

		// Move the index compute to the correct index in the `indexMap`
		[].splice.apply(indexMap, [newIndex, 0, indexCompute]);

		var i = Math.min(currentIndex, newIndex);
		var len = indexMap.length;

		for (len; i < len; i++) {
			// set each compute to have its current index in the map as its value
			indexMap[i].set(i);
		}
	}
};



/**
 * @function can-view-live.list list
 * @parent can-view-live
 * @release 2.0.4
 *
 * @signature `live.list(el, list, render, context)`
 *
 * Live binds a compute's list incrementally.
 *
 * ```js
 * // a compute that change's it's list
 * var todos = compute(function(){
 *   return new Todo.List({page: can.route.attr("page")})
 * })
 *
 * var placeholder = document.createTextNode(" ");
 * $("ul#todos").append(placeholder);
 *
 * can.view.live.list(
 *   placeholder,
 *   todos,
 *   function(todo, index){
 *     return "<li>"+todo.attr("name")+"</li>"
 *   });
 * ```
 *
 * @param {HTMLElement} el An html element to replace with the live-section.
 *
 * @param {Object} list An observable value or list type. If an observable value, it should contain
 * a falsey value or a list type.
 *
 * @param {function(this:*,*,index):String} render(index, index) A function that when called with
 * the incremental item to render and the index of the item in the list.
 *
 * @param {Object} context The `this` the `render` function will be called with.
 *
 * @body
 *
 * ## How it works
 *
 * If `list` is an observable value, `live.list` listens to changes in in that
 * observable value.  It will generally change from one list type (often a list type that implements `onPatches`)
 * to another.  When the value changes, a diff will be performed and the DOM updated.  Also, `live.list`
 * will listen to `.onPatches` on the new list and apply any patches emitted from it.
 *
 *
 */
var list = function(el, list, render, context, falseyRender) {
	new ListDOMPatcher(el, list, render, context, falseyRender);
};

/**
 * @function can-view-live.text text
 * @parent can-view-live
 * @release 2.0.4
 *
 * @signature `live.text(el, compute)`
 *
 * Replaces one element with some content while keeping [can-view-live.nodeLists nodeLists] data correct.
 */
var text = function(el, compute) {
	var handlerName = "";
	//!steal-remove-end

	// TODO: we can remove this at some point
	if (el.nodeType !== Node.TEXT_NODE) {
		var textNode;

		textNode = document.createTextNode("");
		el.parentNode.replaceChild(textNode, el);
		el = textNode;

	}

	new helpers.ListenUntilRemovedAndInitialize(compute, function liveTextUpdateTextNode(newVal) {
		el.nodeValue = helpers.makeString(newVal);
	},
	el,
	"dom", // TODO: should this still be domUI?
	handlerName);
};

/**	
 * @module {{}} can-view-live can-view-live	
 * @parent can-views	
 * @collection can-infrastructure	
 * @package ./package.json	
 *	
 * Setup live-binding between the DOM and a compute manually.	
 *	
 * @option {Object} An object with the live-binding methods:	
 * [can-view-live.html], [can-view-live.list], [can-view-live.text], and	
 * [can-view-live.attr].	
 *
 *	
 * @body	
 *	
 * ## Use	
 *	
 *  [can-view-live] is an object with utility methods for setting up	
 *  live-binding in relation to different parts of the DOM and DOM elements.  For	
 *  example, to make an `<h2>`'s text stay live with	
 *  a compute:	
 *	
 *  ```js	
 *  var live = require("can-view-live");	
 *  var text = canCompute("Hello World");	
 *  var textNode = $("h2").text(" ")[0].childNodes[0];	
 *  live.text(textNode, text);	
 *  ```	
 *	
 */
var live = {};
live.attr = attr_1;
live.attrs = attrs;
live.html = html;
live.list = list;
live.text = text;


var canViewLive = live;

var noop$1 = function(){};

var TextSectionBuilder = function(filename){
	if (filename) {
		this.filename = filename;
	}
	this.stack = [new TextSection()];
};

canAssign(TextSectionBuilder.prototype,utils.mixins);

canAssign(TextSectionBuilder.prototype,{
	// Adds a subsection.
	startSection: function(process){
		var subSection = new TextSection();
		this.last().add({process: process, truthy: subSection});
		this.stack.push(subSection);
	},
	endSection: function(){
		this.stack.pop();
	},
	inverse: function(){
		this.stack.pop();
		var falseySection = new TextSection();
		this.last().last().falsey = falseySection;
		this.stack.push(falseySection);
	},
	compile: function(state){

		var renderer = this.stack[0].compile();
		//!steal-remove-end

		return function(scope){
			function textSectionRender(){
				return renderer(scope);
			}
			//!steal-remove-end
			var observation = new canObservation(textSectionRender, null, {isObservable: false});

			canReflect.onValue(observation, noop$1);

			var value = canReflect.getValue(observation);
			if( canReflect.valueHasDependencies( observation ) ) {
				if(state.textContentOnly) {
					canViewLive.text(this, observation);
				}
				else if(state.attr) {
					canViewLive.attr(this, state.attr, observation);
				}
				else {
					canViewLive.attrs(this, observation, scope);
				}
				canReflect.offValue(observation, noop$1);
			} else {
				if(state.textContentOnly) {
					this.nodeValue = value;
				}
				else if(state.attr) {
					node_1.setAttribute.call(this, state.attr, value);
				}
				else {
					canViewLive.attrs(this, value);
				}
			}
		};
	}
});

var passTruthyFalsey = function(process, truthy, falsey){
	return function(scope){
		return process.call(this, scope, truthy, falsey);
	};
};

var TextSection = function(){
	this.values = [];
};

canAssign( TextSection.prototype, {
	add: function(data){
		this.values.push(data);
	},
	last: function(){
		return this.values[this.values.length - 1];
	},
	compile: function(){
		var values = this.values,
			len = values.length;

		for(var i = 0 ; i < len; i++) {
			var value = this.values[i];
			if(typeof value === "object") {
				values[i] = passTruthyFalsey( value.process,
				    value.truthy && value.truthy.compile(),
				    value.falsey && value.falsey.compile());
			}
		}

		return function(scope){
			var txt = "",
				value;
			for(var i = 0; i < len; i++){
				value = values[i];
				txt += typeof value === "string" ? value : value.call(this, scope);
			}
			return txt;
		};
	}
});

var text_section = TextSectionBuilder;

// ### Arg
// `new Arg(Expression [,modifierOptions] )`
// Used to identify an expression that should return a value.
var Arg = function(expression, modifiers){
	this.expr = expression;
	this.modifiers = modifiers || {};
	this.isCompute = false;
};
Arg.prototype.value = function(){
	return this.expr.value.apply(this.expr, arguments);
};
//!steal-remove-end

var arg = Arg;

// ### Literal
// For inline static values like `{{"Hello World"}}`
var Literal = function(value){
	this._value = value;
};
Literal.prototype.value = function(){
	return this._value;
};
//!steal-remove-end

var literal = Literal;

var setElementSymbol = canSymbol.for("can.setElement");

// SetterObservable's call a function when set. Their getter is backed up by an
// observation.
function SetterObservable(getter, setter) {
	this.setter = setter;
	this.observation = new canObservation(getter);
	this.handler = this.handler.bind(this);
	//!steal-remove-end
}

SetterObservable.prototype = Object.create(settable.prototype);
SetterObservable.prototype.constructor = SetterObservable;
SetterObservable.prototype.set = function(newVal) {
	this.setter(newVal);
};
SetterObservable.prototype.hasDependencies = function() {
	return canReflect.valueHasDependencies(this.observation);
};
canReflect.assignSymbols(SetterObservable.prototype, {
	"can.setValue": SetterObservable.prototype.set,
	"can.valueHasDependencies": SetterObservable.prototype.hasDependencies,
	"can.setElement": function(el) {
		this.observation[setElementSymbol](el);
	}
});

var setter = SetterObservable;

// ## Helpers

function getObservableValue_fromDynamicKey_fromObservable(key, root, helperOptions, readOptions) {
	// This needs to return something similar to a ScopeKeyData with intialValue and parentHasKey
	var getKeys = function(){
		return canStacheKey.reads(("" + canReflect.getValue(key)).replace(/\./g, "\\."));
	};
	var parentHasKey;
	var computeValue = new setter(function getDynamicKey() {
		var readData = canStacheKey.read( canReflect.getValue(root) , getKeys());
		parentHasKey = readData.parentHasKey;
		return readData.value;
	}, function setDynamicKey(newVal){
		canStacheKey.write(canReflect.getValue(root), getKeys(), newVal);
	});
	// This prevents lazy evalutaion
	canObservation.temporarilyBind(computeValue);

	// peek so no observable that might call getObservableValue_fromDynamicKey_fromObservable will re-evaluate if computeValue changes.
	computeValue.initialValue = canObservationRecorder.peekValue(computeValue);
	computeValue.parentHasKey = parentHasKey;
	// Todo:
	// 1. We should warn here if `initialValue` is undefined.  We can expose the warning function
	//    in can-view-scope and call it here.
	// 2. We should make this lazy if possible.  We can do that by making getter/setters for
	//    initialValue and parentHasKey (and possibly @@can.valueHasDependencies)
	return computeValue;
}

// If not a Literal or an Arg, convert to an arg for caching.
function convertToArgExpression(expr) {
	if(!(expr instanceof arg) && !(expr instanceof literal)) {
		return new arg(expr);
	} else {
		return expr;
	}
}

function toComputeOrValue(value) {
	// convert to non observable value
	if(canReflect.isObservableLike(value)) {
		// we only want to do this for things that `should` have dependencies, but dont.
		if(canReflect.isValueLike(value) && canReflect.valueHasDependencies(value) === false) {
			return canReflect.getValue(value);
		}
		// if compute data
		if(value.compute) {
			return value.compute;
		} else {
			return makeComputeLike(value);
		}
	}
	return value;
}

// try to make it a compute no matter what.  This is useful for
// ~ operator.
function toCompute(value) {
	if(value) {

		if(value.isComputed) {
			return value;
		}
		if(value.compute) {
			return value.compute;
		} else {
			return makeComputeLike(value);
		}
	}
	return value;
}

var expressionHelpers = {
	getObservableValue_fromDynamicKey_fromObservable: getObservableValue_fromDynamicKey_fromObservable,
	convertToArgExpression: convertToArgExpression,
	toComputeOrValue: toComputeOrValue,
	toCompute: toCompute
};

var Hashes = function(hashes){
	this.hashExprs = hashes;
};
Hashes.prototype.value = function(scope, helperOptions){
	var hash = {};
	for(var prop in this.hashExprs) {
		var val = expressionHelpers.convertToArgExpression(this.hashExprs[prop]),
			value = val.value.apply(val, arguments);

		hash[prop] = {
			call: !val.modifiers || !val.modifiers.compute,
			value: value
		};
	}
	return new canObservation(function(){
		var finalHash = {};
		for(var prop in hash) {
			finalHash[prop] = hash[prop].call ? canReflect.getValue( hash[prop].value ) : expressionHelpers.toComputeOrValue( hash[prop].value );
		}
		return finalHash;
	});
};
//!steal-remove-end

var hashes = Hashes;

//!steal-remove-end


// ### Bracket
// For accessing properties using bracket notation like `foo[bar]`
var Bracket = function (key, root, originalKey) {
	this.root = root;
	this.key = key;
	//!steal-remove-end
};
Bracket.prototype.value = function (scope, helpers) {
	var root = this.root ? this.root.value(scope, helpers) : scope.peek("this");
	return expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key.value(scope, helpers), root, scope, helpers, {});
};
//!steal-remove-end

Bracket.prototype.closingTag = function() {
	//!steal-remove-end
};

var bracket = Bracket;

var setIdentifier = function SetIdentifier(value){
	this.value = value;
};

canSymbol.for("can-stache.sourceText");
var isViewSymbol$1 = canSymbol.for("can.isView");



// ### Call
// `new Call( new Lookup("method"), [new ScopeExpr("name")], {})`
// A call expression like `method(arg1, arg2)` that, by default,
// calls `method` with non compute values.
var Call = function(methodExpression, argExpressions){
	this.methodExpr = methodExpression;
	this.argExprs = argExpressions.map(expressionHelpers.convertToArgExpression);
};
Call.prototype.args = function(scope, ignoreArgLookup) {
	var hashExprs = {};
	var args = [];
	var gotIgnoreFunction = typeof ignoreArgLookup === "function";

	for (var i = 0, len = this.argExprs.length; i < len; i++) {
		var arg = this.argExprs[i];
		if(arg.expr instanceof hashes){
			canAssign(hashExprs, arg.expr.hashExprs);
		}
		if (!gotIgnoreFunction || !ignoreArgLookup(i)) {
			var value = arg.value.apply(arg, arguments);
			args.push({
				// always do getValue unless compute is false
				call: !arg.modifiers || !arg.modifiers.compute,
				value: value
			});
		}
	}
	return function(doNotWrapArguments){
		var finalArgs = [];
		if(canReflect.size(hashExprs) > 0){
			finalArgs.hashExprs = hashExprs;
		}
		for(var i = 0, len = args.length; i < len; i++) {
			if (doNotWrapArguments) {
				finalArgs[i] = args[i].value;
			} else {
				finalArgs[i] = args[i].call ?
					canReflect.getValue( args[i].value ) :
					expressionHelpers.toCompute( args[i].value );
			}
		}
		return finalArgs;
	};
};

Call.prototype.value = function(scope, helperOptions){
	var callExpression = this;

	// proxyMethods must be false so that the `requiresOptionsArgument` and any
	// other flags stored on the function are preserved
	var method = this.methodExpr.value(scope, { proxyMethods: false });
	canObservation.temporarilyBind(method);
	var func = canReflect.getValue( method );

	var getArgs = callExpression.args(scope , func && func.ignoreArgLookup);

	var computeFn = function(newVal){
		var func = canReflect.getValue( method );
		if(typeof func === "function") {
			if (canReflect.isObservableLike(func)) {
				func = canReflect.getValue(func);
			}
			var args = getArgs(
				func.isLiveBound
			);

			if (func.requiresOptionsArgument) {
				if(args.hashExprs && helperOptions && helperOptions.exprData){
					helperOptions.exprData.hashExprs = args.hashExprs;
				}
				// For #581
				if(helperOptions !== undefined) {
					args.push(helperOptions);
				}
			}
			// we are calling a view!
			if(func[isViewSymbol$1] === true) {
				// if not a scope, we should create a scope that
				// includes the template scope
				if(!(args[0] instanceof canViewScope)){
					args[0] = scope.getTemplateContext().add(args[0]);
				}
			}
			if(arguments.length) {
				args.unshift(new setIdentifier(newVal));
			}

			// if this is a call like `foo.bar()` the method.thisArg will be set to `foo`
			// for a call like `foo()`, method.thisArg will not be set and we will default
			// to setting the scope as the context of the function
			return func.apply(method.thisArg || scope.peek("this"), args);
		}
	};
	//!steal-remove-end

	if (helperOptions && helperOptions.doNotWrapInObservation) {
		return computeFn();
	} else {
		var computeValue = new setter(computeFn, computeFn);

		return computeValue;
	}
};
//!steal-remove-end
Call.prototype.closingTag = function() {
	//!steal-remove-end
	return this.methodExpr.key;
};

var call = Call;

var Helper = function(methodExpression, argExpressions, hashExpressions){
	this.methodExpr = methodExpression;
	this.argExprs = argExpressions;
	this.hashExprs = hashExpressions;
	this.mode = null;
};
Helper.prototype.args = function(scope){
	var args = [];
	for(var i = 0, len = this.argExprs.length; i < len; i++) {
		var arg = this.argExprs[i];
		// TODO: once we know the helper, we should be able to avoid compute conversion
		args.push( expressionHelpers.toComputeOrValue( arg.value.apply(arg, arguments) ) );
	}
	return args;
};
Helper.prototype.hash = function(scope){
	var hash = {};
	for(var prop in this.hashExprs) {
		var val = this.hashExprs[prop];
		// TODO: once we know the helper, we should be able to avoid compute conversion
		hash[prop] = expressionHelpers.toComputeOrValue( val.value.apply(val, arguments) );
	}
	return hash;
};

Helper.prototype.value = function(scope, helperOptions){
	// If a literal, this means it should be treated as a key. But helpers work this way for some reason.
	// TODO: fix parsing so numbers will also be assumed to be keys.
	var methodKey = this.methodExpr instanceof literal ?
		"" + this.methodExpr._value :
		this.methodExpr.key,
		helperInstance = this,
		// proxyMethods must be false so that the `requiresOptionsArgument` and any
		// other flags stored on the function are preserved
		helperFn = scope.computeData(methodKey,  { proxyMethods: false }),
		initialValue = helperFn && helperFn.initialValue,
		thisArg = helperFn && helperFn.thisArg;

	if (typeof initialValue === "function") {
		helperFn = function helperFn() {
			var args = helperInstance.args(scope),
				helperOptionArg = canAssign(canAssign({}, helperOptions), {
					hash: helperInstance.hash(scope),
					exprData: helperInstance
				});

			args.push(helperOptionArg);

			return initialValue.apply(thisArg || scope.peek("this"), args);
		};
		//!steal-remove-end
	}
	//!steal-remove-end

	return  helperFn;
};

Helper.prototype.closingTag = function() {
	return this.methodExpr.key;
};
//!steal-remove-end

var helper = Helper;

var sourceTextSymbol$1 = canSymbol.for("can-stache.sourceText");


// ### Lookup
// `new Lookup(String, [Expression])`
// Finds a value in the scope or a helper.
var Lookup = function(key, root, sourceText) {
	this.key = key;
	this.rootExpr = root;
	canReflect.setKeyValue(this, sourceTextSymbol$1, sourceText);
};
Lookup.prototype.value = function(scope, readOptions){
	if (this.rootExpr) {
		return expressionHelpers.getObservableValue_fromDynamicKey_fromObservable(this.key, this.rootExpr.value(scope), scope, {}, {});
	} else {
		return scope.computeData(this.key, canAssign({
			warnOnMissingKey: true
		},readOptions));
	}
};
//!steal-remove-end

var lookup = Lookup;

// ## Expression Types
//
// These expression types return a value. They are assembled by `expression.parse`.













var last$1 = utils.last;



var sourceTextSymbol = canSymbol.for("can-stache.sourceText");

// ### Hash
// A placeholder. This isn't actually used.
var Hash = function(){ }; // jshint ignore:line

// NAME - \w
// KEY - foo, foo.bar, foo@bar, %foo (special), &foo (references), ../foo, ./foo
// ARG - ~KEY, KEY, CALLEXPRESSION, PRIMITIVE
// CALLEXPRESSION = KEY(ARG,ARG, NAME=ARG)
// HELPEREXPRESSION = KEY ARG ARG NAME=ARG
// DOT .NAME
// AT @NAME
//
var keyRegExp = /[\w\.\\\-_@\/\&%]+/,
	tokensRegExp = /('.*?'|".*?"|=|[\w\.\\\-_@\/*%\$]+|[\(\)]|,|\~|\[|\]\s*|\s*(?=\[))/g,
	bracketSpaceRegExp = /\]\s+/,
	literalRegExp = /^('.*?'|".*?"|-?[0-9]+\.?[0-9]*|true|false|null|undefined)$/;

var isTokenKey = function(token){
	return keyRegExp.test(token);
};

var testDot = /^[\.@]\w/;
var isAddingToExpression = function(token) {

	return isTokenKey(token) && testDot.test(token);
};

var ensureChildren = function(type) {
	if(!type.children) {
		type.children = [];
	}
	return type;
};

var Stack = function(){

	this.root = {children: [], type: "Root"};
	this.current = this.root;
	this.stack = [this.root];
};
canAssign(Stack.prototype,{
	top: function(){
		return last$1(this.stack);
	},
	isRootTop: function(){
		return this.top() === this.root;
	},
	popTo: function(types){
		this.popUntil(types);
		this.pop();
	},
	pop: function() {
		if(!this.isRootTop()) {
			this.stack.pop();
		}
	},
	first: function(types){
		var curIndex = this.stack.length - 1;
		while( curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1 ) {
			curIndex--;
		}
		return this.stack[curIndex];
	},
	firstParent: function(types){
		var curIndex = this.stack.length - 2;
		while( curIndex > 0 && types.indexOf(this.stack[curIndex].type) === -1 ) {
			curIndex--;
		}
		return this.stack[curIndex];
	},
	popUntil: function(types){
		while( types.indexOf(this.top().type) === -1 && !this.isRootTop() ) {
			this.stack.pop();
		}
		return this.top();
	},
	addTo: function(types, type){
		var cur = this.popUntil(types);
		ensureChildren(cur).children.push(type);
	},
	addToAndPush: function(types, type){
		this.addTo(types, type);
		this.stack.push(type);
	},
	push: function(type) {
		this.stack.push(type);
	},
	topLastChild: function(){
		return last$1(this.top().children);
	},
	replaceTopLastChild: function(type){
		var children = ensureChildren(this.top()).children;
		children.pop();
		children.push(type);
		return type;
	},
	replaceTopLastChildAndPush: function(type) {
		this.replaceTopLastChild(type);
		this.stack.push(type);
	},
	replaceTopAndPush: function(type){
		var children;
		if(this.top() === this.root) {
			children = ensureChildren(this.top()).children;
		} else {
			this.stack.pop();
			// get parent and clean
			children = ensureChildren(this.top()).children;
		}

		children.pop();
		children.push(type);
		this.stack.push(type);
		return type;
	}
});

// converts
// - "../foo" -> "../@foo",
// - "foo" -> "@foo",
// - ".foo" -> "@foo",
// - "./foo" -> "./@foo"
// - "foo.bar" -> "foo@bar"
var convertKeyToLookup = function(key){
	var lastPath = key.lastIndexOf("./");
	var lastDot = key.lastIndexOf(".");
	if(lastDot > lastPath) {
		return key.substr(0, lastDot)+"@"+key.substr(lastDot+1);
	}
	var firstNonPathCharIndex = lastPath === -1 ? 0 : lastPath+2;
	var firstNonPathChar = key.charAt(firstNonPathCharIndex);
	if(firstNonPathChar === "." || firstNonPathChar === "@" ) {
		return key.substr(0, firstNonPathCharIndex)+"@"+key.substr(firstNonPathCharIndex+1);
	} else {
		return key.substr(0, firstNonPathCharIndex)+"@"+key.substr(firstNonPathCharIndex);
	}
};
var convertToAtLookup = function(ast){
	if(ast.type === "Lookup") {
		canReflect.setKeyValue(ast, sourceTextSymbol, ast.key);
		ast.key = convertKeyToLookup(ast.key);
	}
	return ast;
};

var convertToHelperIfTopIsLookup = function(stack){
	var top = stack.top();
	// if two scopes, that means a helper
	if(top && top.type === "Lookup") {

		var base = stack.stack[stack.stack.length - 2];
		// That lookup shouldn't be part of a Helper already or
		if(base.type !== "Helper" && base) {
			stack.replaceTopAndPush({
				type: "Helper",
				method: top
			});
		}
	}
};

var expression$1 = {
	toComputeOrValue: expressionHelpers.toComputeOrValue,
	convertKeyToLookup: convertKeyToLookup,

	Literal: literal,
	Lookup: lookup,
	Arg: arg,
	Hash: Hash,
	Hashes: hashes,
	Call: call,
	Helper: helper,
	Bracket: bracket,

	SetIdentifier: setIdentifier,
	tokenize: function(expression){
		var tokens = [];
		(expression.trim() + ' ').replace(tokensRegExp, function (whole, arg) {
			if (bracketSpaceRegExp.test(arg)) {
				tokens.push(arg[0]);
				tokens.push(arg.slice(1));
			} else {
				tokens.push(arg);
			}
		});
		return tokens;
	},
	lookupRules: {
		"default": function(ast, methodType, isArg){
			return ast.type === "Helper" ? helper : lookup;
		},
		"method": function(ast, methodType, isArg){
			return lookup;
		}
	},
	methodRules: {
		"default": function(ast){
			return ast.type === "Call" ? call : helper;
		},
		"call": function(ast){
			return call;
		}
	},
	// ## expression.parse
	//
	// - {String} expressionString - A stache expression like "abc foo()"
	// - {Object} options
	//   - baseMethodType - Treat this like a Helper or Call.  Default to "Helper"
	//   - lookupRule - "default" or "method"
	//   - methodRule - "default" or "call"
	parse: function(expressionString, options){
		options =  options || {};
		var ast = this.ast(expressionString);

		if(!options.lookupRule) {
			options.lookupRule = "default";
		}
		if(typeof options.lookupRule === "string") {
			options.lookupRule = expression$1.lookupRules[options.lookupRule];
		}
		if(!options.methodRule) {
			options.methodRule = "default";
		}
		if(typeof options.methodRule === "string") {
			options.methodRule = expression$1.methodRules[options.methodRule];
		}

		var expr = this.hydrateAst(ast, options, options.baseMethodType || "Helper");

		return expr;
	},
	hydrateAst: function(ast, options, methodType, isArg){
		var hashes$1;
		if(ast.type === "Lookup") {
			var LookupRule = options.lookupRule(ast, methodType, isArg);
			var lookup = new LookupRule(ast.key, ast.root && this.hydrateAst(ast.root, options, methodType), ast[sourceTextSymbol] );
			return lookup;
		}
		else if(ast.type === "Literal") {
			return new literal(ast.value);
		}
		else if(ast.type === "Arg") {
			return new arg(this.hydrateAst(ast.children[0], options, methodType, isArg),{compute: true});
		}
		else if(ast.type === "Hash") {
			throw new Error("");
		}
		else if(ast.type === "Hashes") {
			hashes$1 = {};
			ast.children.forEach(function(hash){
				hashes$1[hash.prop] = this.hydrateAst( hash.children[0], options, methodType, true );
			}, this);
			return new hashes(hashes$1);
		}
		else if(ast.type === "Call" || ast.type === "Helper") {
			//get all arguments and hashes
			hashes$1 = {};
			var args = [],
				children = ast.children,
				ExpressionType = options.methodRule(ast);
			if(children) {
				for(var i = 0 ; i <children.length; i++) {
					var child = children[i];
					if(child.type === "Hashes" && ast.type === "Helper" &&
						(ExpressionType !== call)) {

						child.children.forEach(function(hash){
							hashes$1[hash.prop] = this.hydrateAst( hash.children[0], options, ast.type, true );
						}, this);

					} else {
						args.push( this.hydrateAst(child, options, ast.type, true) );
					}
				}
			}


			return new ExpressionType(this.hydrateAst(ast.method, options, ast.type),
																args, hashes$1);
		} else if (ast.type === "Bracket") {
			var originalKey;
			//!steal-remove-end
			return new bracket(
				this.hydrateAst(ast.children[0], options),
				ast.root ? this.hydrateAst(ast.root, options) : undefined,
				originalKey
			);
		}
	},
	ast: function(expression){
		var tokens = this.tokenize(expression);
		return this.parseAst(tokens, {
			index: 0
		});
	},
	parseAst: function(tokens, cursor) {
		// jshint maxdepth: 6
		var stack = new Stack(),
			top,
			firstParent,
			lastToken;

		while(cursor.index < tokens.length) {
			var token = tokens[cursor.index],
				nextToken = tokens[cursor.index+1];

			cursor.index++;

			// Hash
			if(nextToken === "=") {
				//convertToHelperIfTopIsLookup(stack);
				top = stack.top();

				// If top is a Lookup, we might need to convert to a helper.
				if(top && top.type === "Lookup") {
					// Check if current Lookup is part of a Call, Helper, or Hash
					// If it happens to be first within a Call or Root, that means
					// this is helper syntax.
					firstParent = stack.firstParent(["Call","Helper","Hash"]);
					if(firstParent.type === "Call" || firstParent.type === "Root") {

						stack.popUntil(["Call"]);
						top = stack.top();
						stack.replaceTopAndPush({
							type: "Helper",
							method: top.type === "Root" ? last$1(top.children) : top
						});

					}
				}

				firstParent = stack.first(["Call","Helper","Hashes","Root"]);
				// makes sure we are adding to Hashes if there already is one
				// otherwise we create one.
				var hash = {type: "Hash", prop: token};
				if(firstParent.type === "Hashes") {
					stack.addToAndPush(["Hashes"], hash);
				} else {
					stack.addToAndPush(["Helper", "Call","Root"], {
						type: "Hashes",
						children: [hash]
					});
					stack.push(hash);
				}
				cursor.index++;

			}
			// Literal
			else if(literalRegExp.test( token )) {
				convertToHelperIfTopIsLookup(stack);
				// only add to hash if there's not already a child.
				firstParent = stack.first(["Helper", "Call", "Hash", "Bracket"]);
				if(firstParent.type === "Hash" && (firstParent.children && firstParent.children.length > 0)) {
					stack.addTo(["Helper", "Call", "Bracket"], {type: "Literal", value: utils.jsonParse( token )});
				} else if(firstParent.type === "Bracket" && (firstParent.children && firstParent.children.length > 0)) {
					stack.addTo(["Helper", "Call", "Hash"], {type: "Literal", value: utils.jsonParse( token )});
				} else {
					stack.addTo(["Helper", "Call", "Hash", "Bracket"], {type: "Literal", value: utils.jsonParse( token )});
				}

			}
			// Lookup
			else if(keyRegExp.test(token)) {
				lastToken = stack.topLastChild();
				firstParent = stack.first(["Helper", "Call", "Hash", "Bracket"]);

				// if we had `foo().bar`, we need to change to a Lookup that looks up from lastToken.
				if(lastToken && (lastToken.type === "Call" || lastToken.type === "Bracket" ) && isAddingToExpression(token)) {
					stack.replaceTopLastChildAndPush({
						type: "Lookup",
						root: lastToken,
						key: token.slice(1) // remove leading `.`
					});
				}
				else if(firstParent.type === 'Bracket') {
					// a Bracket expression without children means we have
					// parsed `foo[` of an expression like `foo[bar]`
					// so we know to add the Lookup as a child of the Bracket expression
					if (!(firstParent.children && firstParent.children.length > 0)) {
						stack.addToAndPush(["Bracket"], {type: "Lookup", key: token});
					} else {
						// check if we are adding to a helper like `eq foo[bar] baz`
						// but not at the `.baz` of `eq foo[bar].baz xyz`
						if(stack.first(["Helper", "Call", "Hash", "Arg"]).type === 'Helper' && token[0] !== '.') {
							stack.addToAndPush(["Helper"], {type: "Lookup", key: token});
						} else {
							// otherwise, handle the `.baz` in expressions like `foo[bar].baz`
							stack.replaceTopAndPush({
								type: "Lookup",
								key: token.slice(1),
								root: firstParent
							});
						}
					}
				}
				else {
					// if two scopes, that means a helper
					convertToHelperIfTopIsLookup(stack);

					stack.addToAndPush(["Helper", "Call", "Hash", "Arg", "Bracket"], {type: "Lookup", key: token});
				}

			}
			// Arg
			else if(token === "~") {
				convertToHelperIfTopIsLookup(stack);
				stack.addToAndPush(["Helper", "Call", "Hash"], {type: "Arg", key: token});
			}
			// Call
			// foo[bar()]
			else if(token === "(") {
				top = stack.top();
				lastToken = stack.topLastChild();
				if(top.type === "Lookup") {
					stack.replaceTopAndPush({
						type: "Call",
						method: convertToAtLookup(top)
					});

				// Nested Call
				// foo()()
				} else if (lastToken && lastToken.type === "Call") {
					stack.replaceTopAndPush({
						type: "Call",
						method: lastToken
					});
				} else {
					throw new Error("Unable to understand expression "+tokens.join(''));
				}
			}
			// End Call
			else if(token === ")") {
				stack.popTo(["Call"]);
			}
			// End Call argument
			else if(token === ",") {
				// The {{let foo=zed, bar=car}} helper is not in a call
				// expression.
				var call = stack.first(["Call"]);
				if(call.type !== "Call") {
					stack.popUntil(["Hash"]);
				} else {
					stack.popUntil(["Call"]);
				}

			}
			// Bracket
			else if(token === "[") {
				top = stack.top();
				lastToken = stack.topLastChild();

				// foo()[bar] => top -> root, lastToken -> {t: call, m: "@foo"}
				// foo()[bar()] => same as above last thing we see was a call expression "rotate"
				// test['foo'][0] => lastToken => {root: test, t: Bracket, c: 'foo' }
				// log(thing['prop'][0]) =>
				//
				//     top -> {Call, children|args: [Bracket(Lookup(thing), c: ['[prop]'])]}
				//     last-> Bracket(Lookup(thing), c: ['[prop]'])
				if (lastToken && (lastToken.type === "Call" || lastToken.type === "Bracket"  )  ) {
					// must be on top of the stack as it recieves new stuff ...
					// however, what we really want is to
					stack.replaceTopLastChildAndPush({type: "Bracket", root: lastToken});
				} else if (top.type === "Lookup" || top.type === "Bracket") {
					var bracket = {type: "Bracket", root: top};
					//!steal-remove-end
					stack.replaceTopAndPush(bracket);
				} else if (top.type === "Call") {
					stack.addToAndPush(["Call"], { type: "Bracket" });
				} else if (top === " ") {
					stack.popUntil(["Lookup", "Call"]);
					convertToHelperIfTopIsLookup(stack);
					stack.addToAndPush(["Helper", "Call", "Hash"], {type: "Bracket"});
				} else {
					stack.replaceTopAndPush({type: "Bracket"});
				}
			}
			// End Bracket
			else if(token === "]") {
				stack.pop();
			}
			else if(token === " ") {
				stack.push(token);
			}
		}
		return stack.root.children[0];
	}
};

var expression_1 = expression$1;

//
// This provides helper utilities for Mustache processing. Currently,
// only stache uses these helpers.  Ideally, these utilities could be used
// in other libraries implementing Mustache-like features.






var expression = expression_1;








var toDOMSymbol = canSymbol.for("can.toDOM");

// Lazily lookup the context only if it's needed.
function HelperOptions(scope, exprData, stringOnly) {
	this.metadata = { rendered: false };
	this.stringOnly = stringOnly;
	this.scope = scope;
	this.exprData = exprData;
}
defineLazyValue(HelperOptions.prototype,"context", function(){
	return this.scope.peek("this");
});




// ## Helpers

var mustacheLineBreakRegExp$1 = /(?:(^|\r?\n)(\s*)(\{\{([\s\S]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([\s\S]*)\}\}\}?)/g,
	mustacheWhitespaceRegExp$1 = /\s*\{\{--\}\}\s*|\s*(\{\{\{?)-|-(\}\}\}?)\s*/g,
	k = function(){};
var viewInsertSymbol = canSymbol.for("can.viewInsert");


// DOM, safeString or the insertSymbol can opt-out of updating as text
function valueShouldBeInsertedAsHTML(value) {
	return value !== null && typeof value === "object" && (
		typeof value[toDOMSymbol] === "function" ||
		typeof value[viewInsertSymbol] === "function" ||
		typeof value.nodeType === "number" );
}




var core$1 = {
	expression: expression,
	// ## mustacheCore.makeEvaluator
	// Given a scope and expression, returns a function that evaluates that expression in the scope.
	//
	// This function first reads lookup values in the args and hash.  Then it tries to figure out
	// if a helper is being called or a value is being read.  Finally, depending on
	// if it's a helper, or not, and which mode the expression is in, it returns
	// a function that can quickly evaluate the expression.
	/**
	 * @hide
	 * Given a mode and expression data, returns a function that evaluates that expression.
	 * @param {can-view-scope} The scope in which the expression is evaluated.
	 * @param {can.view.Options} The option helpers in which the expression is evaluated.
	 * @param {String} mode Either null, #, ^. > is handled elsewhere
	 * @param {Object} exprData Data about what was in the mustache expression
	 * @param {renderer} [truthyRenderer] Used to render a subsection
	 * @param {renderer} [falseyRenderer] Used to render the inverse subsection
	 * @param {String} [stringOnly] A flag to indicate that only strings will be returned by subsections.
	 * @return {Function} An 'evaluator' function that evaluates the expression.
	 */
	makeEvaluator: function (scope, mode, exprData, truthyRenderer, falseyRenderer, stringOnly) {

		if(mode === "^") {
			var temp = truthyRenderer;
			truthyRenderer = falseyRenderer;
			falseyRenderer = temp;
		}

		var value,
			helperOptions = new HelperOptions(scope , exprData, stringOnly);
			// set up renderers
			utils.createRenderers(helperOptions, scope ,truthyRenderer, falseyRenderer, stringOnly);

		if(exprData instanceof expression.Call) {
			value = exprData.value(scope, helperOptions);
		} else if (exprData instanceof expression.Bracket) {
			value = exprData.value(scope);
		} else if (exprData instanceof expression.Lookup) {
			value = exprData.value(scope);
		} else if (exprData instanceof expression.Literal) {
			value = exprData.value.bind(exprData);
		} else if (exprData instanceof expression.Helper && exprData.methodExpr instanceof expression.Bracket) {
			// Brackets get wrapped in Helpers when used in attributes
			// like `<p class="{{ foo[bar] }}" />`
			value = exprData.methodExpr.value(scope, helperOptions);
		} else {
			value = exprData.value(scope, helperOptions);
			if (typeof value === "function") {
				return value;
			}
		}
		// {{#something()}}foo{{/something}}
		// return evaluator for no mode or rendered value if a renderer was called
		if(!mode || helperOptions.metadata.rendered) {
			return value;
		} else if( mode === "#" || mode === "^" ) {

			return function(){
				// Get the value
				var finalValue = canReflect.getValue(value);
				var result;

				// if options.fn or options.inverse was called, we take the observable's return value
				// as what should be put in the DOM.
				if(helperOptions.metadata.rendered) {
					result = finalValue;
				}
				// If it's an array, render.
				else if ( typeof finalValue !== "string" && canReflect.isListLike(finalValue) ) {
					var isObserveList = canReflect.isObservableLike(finalValue) &&
						canReflect.isListLike(finalValue);

					if(canReflect.getKeyValue(finalValue, "length")) {
						if (stringOnly) {
							result = utils.getItemsStringContent(finalValue, isObserveList, helperOptions);
						} else {
							result = canFragment(utils.getItemsFragContent(finalValue, helperOptions, scope));
						}
					} else {
						result = helperOptions.inverse(scope);
					}
				}
				else {
					result = finalValue ? helperOptions.fn(finalValue || scope) : helperOptions.inverse(scope);
				}
				// We always set the rendered result back to false.
				// - Future calls might change from returning a value to calling `.fn`
				// - We are calling `.fn` and `.inverse` ourselves.
				helperOptions.metadata.rendered = false;
				return result;
			};
		} else ;
	},
	// ## mustacheCore.makeLiveBindingPartialRenderer
	// Returns a renderer function that live binds a partial.
	/**
	 * @hide
	 * Returns a renderer function that live binds a partial.
	 * @param {String} expressionString
	 * @param {Object} state The html state of where the expression was found.
	 * @return {function(this:HTMLElement,can-view-scope,can.view.Options)} A renderer function
	 * live binds a partial.
	 */
	makeLiveBindingPartialRenderer: function(expressionString, state){
		expressionString = expressionString.trim();
		var exprData,
				partialName = expressionString.split(/\s+/).shift();

		if(partialName !== expressionString) {
			exprData = core$1.expression.parse(expressionString);
		}

		return function(scope){
			//!steal-remove-end

			var partialFrag = new canObservation(function(){
				var localPartialName = partialName;
				var partialScope = scope;
				// If the second parameter of a partial is a custom context
				if(exprData && exprData.argExprs.length === 1) {
					var newContext = canReflect.getValue( exprData.argExprs[0].value(scope) );
					if(typeof newContext === "undefined") ;else {
						partialScope = scope.add(newContext);
					}
				}
				// Look up partials in templateContext first
				var partial = canReflect.getKeyValue(partialScope.templateContext.partials, localPartialName);
				var renderer;

				if (partial) {
					renderer = function() {
						return partial.render ? partial.render(partialScope)
							: partial(partialScope);
					};
				}
				// Use can.view to get and render the partial.
				else {
					var scopePartialName = partialScope.read(localPartialName, {
						isArgument: true
					}).value;

					if (scopePartialName === null || !scopePartialName && localPartialName[0] === '*') {
						return canFragment("");
					}
					if (scopePartialName) {
						localPartialName = scopePartialName;
					}

					renderer = function() {
						if(typeof localPartialName === "function"){
							return localPartialName(partialScope, {});
						} else {
							var domRenderer = core$1.getTemplateById(localPartialName);
							//!steal-remove-end
							return domRenderer ? domRenderer(partialScope, {}) : document$1().createDocumentFragment();
						}
					};
				}
				var res = canObservationRecorder.ignore(renderer)();
				return canFragment(res);
			});

			canViewLive.html(this, partialFrag);
		};
	},
	// ## mustacheCore.makeStringBranchRenderer
	// Return a renderer function that evalutes to a string and caches
	// the evaluator on the scope.
	/**
	 * @hide
	 * Return a renderer function that evaluates to a string.
	 * @param {String} mode
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The html state of where the expression was found.
	 * @return {function(can.view.Scope,can.view.Options, can-stache.view, can.view.renderer)}
	 */
	makeStringBranchRenderer: function(mode, expressionString, state){
		var exprData = core$1.expression.parse(expressionString),
			// Use the full mustache expression as the cache key.
			fullExpression = mode+expressionString;

		// A branching renderer takes truthy and falsey renderer.
		var branchRenderer = function branchRenderer(scope, truthyRenderer, falseyRenderer){
			//!steal-remove-end
			// Check the scope's cache if the evaluator already exists for performance.
			var evaluator = scope.__cache[fullExpression];
			if(mode || !evaluator) {
				evaluator = makeEvaluator( scope, mode, exprData, truthyRenderer, falseyRenderer, true);
				if(!mode) {
					scope.__cache[fullExpression] = evaluator;
				}
			}
			var gotObservableValue = evaluator[canSymbol.for("can.onValue")],
				res;

			// Run the evaluator and return the result.
			if(gotObservableValue) {
				res = canReflect.getValue(evaluator);
			} else {
				res = evaluator();
			}

			if (res == null) {
				return "";
			}
			return res.nodeType === 11 ? res.textContent : ""+res;
		};

		branchRenderer.exprData = exprData;

		return branchRenderer;
	},
	// ## mustacheCore.makeLiveBindingBranchRenderer
	// Return a renderer function that evaluates the mustache expression and
	// sets up live binding if a compute with dependencies is found. Otherwise,
	// the element's value is set.
	//
	// This function works by creating a `can.compute` from the mustache expression.
	// If the compute has dependent observables, it passes the compute to `can.view.live`; otherwise,
	// it updates the element's property based on the compute's value.
	/**
	 * @hide
	 * Returns a renderer function that evaluates the mustache expression.
	 * @param {String} mode
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The html state of where the expression was found.
	 */
	makeLiveBindingBranchRenderer: function(mode, expressionString, state){
		// Pre-process the expression.
		var exprData = core$1.expression.parse(expressionString);

		// A branching renderer takes truthy and falsey renderer.
		var branchRenderer = function branchRenderer(scope, truthyRenderer, falseyRenderer){
			// If this is within a tag, make sure we only get string values.
			var stringOnly = state.tag;
			//!steal-remove-end

			// Get the evaluator. This does not need to be cached (probably) because if there
			// an observable value, it will be handled by `can.view.live`.
			var evaluator = makeEvaluator( scope, mode, exprData, truthyRenderer, falseyRenderer, stringOnly );

			// Create a compute that can not be observed by other
			// computes. This is important because this renderer is likely called by
			// parent expressions.  If this value changes, the parent expressions should
			// not re-evaluate. We prevent that by making sure this compute is ignored by
			// everyone else.
			//var compute = can.compute(evaluator, null, false);
			var gotObservableValue = evaluator[canSymbol.for("can.onValue")];
			var observable;
			if(gotObservableValue) {
				observable = evaluator;
			} else {
				//!steal-remove-end
				observable = new canObservation(evaluator,null,{isObservable: false});
			}

			// Bind on the computeValue to set the cached value. This helps performance
			// so live binding can read a cached value instead of re-calculating.
			canReflect.onValue(observable, k);

			var value = canReflect.getValue(observable);

			// If value is a function and not a Lookup ({{foo}}),
			// it's a helper that returned a function and should be called.
			if(typeof value === "function" && !(exprData instanceof expression.Lookup)) {

				// A helper function should do it's own binding.  Similar to how
				// we prevented this function's compute from being noticed by parent expressions,
				// we hide any observables read in the function by saving any observables that
				// have been read and then setting them back which overwrites any `can.__observe` calls
				// performed in value.
				canObservationRecorder.ignore(value)(this);

			}
			// If the computeValue has observable dependencies, setup live binding.
			else if( canReflect.valueHasDependencies(observable) ) {
				// Depending on where the template is, setup live-binding differently.
				if(state.attr) {
					canViewLive.attr(this, state.attr, observable);
				}
				else if( state.tag )  {
					canViewLive.attrs( this, observable );
				}
				else if(state.text && !valueShouldBeInsertedAsHTML(value)) {
					//!steal-remove-end
					canViewLive.text(this, observable);
				} else {
					canViewLive.html(this, observable);
				}
			}
			// If the computeValue has no observable dependencies, just set the value on the element.
			else {

				if(state.attr) {
					canDomMutate.setAttribute(this, state.attr, value);
				}
				else if(state.tag) {
					canViewLive.attrs(this, value);
				}
				else if(state.text && !valueShouldBeInsertedAsHTML(value)) {
					this.nodeValue = helpers.makeString(value);
				}
				else if( value != null ){
					if (typeof value[viewInsertSymbol] === "function") {
						var insert = value[viewInsertSymbol]({});
						this.parentNode.replaceChild( insert, this );
					} else {
						this.parentNode.replaceChild(canFragment(value, this.ownerDocument), this);
						//domMutateNode.replaceChild.call(this.parentNode, frag(value, this.ownerDocument), this);
					}
				}
			}
			// Unbind the compute.
			canReflect.offValue(observable, k);
		};

		branchRenderer.exprData = exprData;

		return branchRenderer;
	},
	// ## mustacheCore.splitModeFromExpression
	// Returns the mustache mode split from the rest of the expression.
	/**
	 * @hide
	 * Returns the mustache mode split from the rest of the expression.
	 * @param {can.stache.Expression} expression
	 * @param {Object} state The state of HTML where the expression was found.
	 */
	splitModeFromExpression: function(expression, state){
		expression = expression.trim();
		var mode = expression.charAt(0);

		if( "#/{&^>!<".indexOf(mode) >= 0 ) {
			expression =  expression.substr(1).trim();
		} else {
			mode = null;
		}
		// Triple braces do nothing within a tag.
		if(mode === "{" && state.node) {
			mode = null;
		}
		return {
			mode: mode,
			expression: expression
		};
	},
	// ## mustacheCore.cleanLineEndings
	// Removes line breaks accoding to the mustache specification.
	/**
	 * @hide
	 * Prunes line breaks accoding to the mustache specification.
	 * @param {String} template
	 * @return {String}
	 */
	cleanLineEndings: function(template){

		// Finds mustache tags with space around them or no space around them.
		return template.replace( mustacheLineBreakRegExp$1,
			function(whole,
				returnBefore,
				spaceBefore,
				special,
				expression,
				spaceAfter,
				returnAfter,
				// A mustache magic tag that has no space around it.
				spaceLessSpecial,
				spaceLessExpression,
				matchIndex){

			// IE 8 will provide undefined
			spaceAfter = (spaceAfter || "");
			returnBefore = (returnBefore || "");
			spaceBefore = (spaceBefore || "");

			var modeAndExpression = splitModeFromExpression$1(expression || spaceLessExpression,{});

			// If it's a partial or tripple stache, leave in place.
			if(spaceLessSpecial || ">{".indexOf( modeAndExpression.mode) >= 0) {
				return whole;
			}  else if( "^#!/".indexOf(  modeAndExpression.mode ) >= 0 ) {
				// Return the magic tag and a trailing linebreak if this did not
				// start a new line and there was an end line.
				// Add a normalized leading space, if there was any leading space, in case this abuts a tag name
				spaceBefore = (returnBefore + spaceBefore) && " ";
				return spaceBefore+special+( matchIndex !== 0 && returnAfter.length ? returnBefore+"\n" :"");


			} else {
				// There is no mode, return special with spaces around it.
				return spaceBefore+special+spaceAfter+(spaceBefore.length || matchIndex !== 0 ? returnBefore+"\n" : "");
			}

		});
	},
	// ## mustacheCore.cleanWhitespaceControl
	// Removes whitespace according to the whitespace control.
	/**
	 * @hide
	 * Prunes whitespace according to the whitespace control.
	 * @param {String} template
	 * @return {String}
	 */
	cleanWhitespaceControl: function(template) {
		return template.replace(mustacheWhitespaceRegExp$1, "$1$2");
	},
	getTemplateById: function(){}
};

// ## Local Variable Cache
//
// The following creates slightly more quickly accessible references of the following
// core functions.
var makeEvaluator = core$1.makeEvaluator,
	splitModeFromExpression$1 = core$1.splitModeFromExpression;

var mustache_core = core$1;

/**
 * @module {function} can-globals/base-url/base-url base-url
 * @parent can-globals/modules
 *
 * @signature `baseUrl(optionalBaseUrlToSet)`
 *
 * Get and/or set the "base" (containing path) of the document.
 *
 * ```js
 * var baseUrl = require("can-globals/base-url/base-url");
 *
 * console.log(baseUrl());           // -> "http://localhost:8080"
 * console.log(baseUrl(baseUrl() + "/foo/bar")); // -> "http://localhost:8080/foo/bar"
 * console.log(baseUrl());           // -> "http://localhost:8080/foo/bar"
 * ```
 *
 * @param {String} setUrl An optional base url to override reading the base URL from the known path.
 *
 * @return {String} Returns the set or computed base URL
 */

canGlobalsInstance.define('base-url', function(){
	var global = canGlobalsInstance.getKeyValue('global');
	var domDocument = canGlobalsInstance.getKeyValue('document');
	if (domDocument && 'baseURI' in domDocument) {
		return domDocument.baseURI;
	} else if(global.location) {
		var href = global.location.href;
		var lastSlash = href.lastIndexOf("/");
		return lastSlash !== -1 ? href.substr(0, lastSlash) : href;
	} else if(typeof process !== "undefined") {
		return process.cwd();
	}
});

var baseUrl = canGlobalsInstance.makeExport('base-url');

/**
 * @module {function} can-parse-uri can-parse-uri
 * @parent can-js-utilities
 * @collection can-infrastructure
 * @package ./package.json
 * @signature `parseURI(url)`
 *
 * Parse a URI into its components.
 *
 * ```js
 * import {parseURI} from "can"
 * parseURI("http://foo:8080/bar.html?query#change")
 * //-> {
 * //  authority: "//foo:8080",
 * //  hash: "#change",
 * //  host: "foo:8080",
 * //  hostname: "foo",
 * //  href: "http://foo:8080/bar.html?query#change",
 * //  pathname: "/bar.html",
 * //  port: "8080",
 * //  protocol: "http:",
 * //  search: "?query"
 * // }
 * ```
 *
 * @param {String} url The URL you want to parse.
 *
 * @return {Object} Returns an object with properties for each part of the URL. `null`
 * is returned if the url can not be parsed.
 */

var canParseUri = canNamespace.parseURI = function(url){
		var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
			// authority = '//' + user + ':' + pass '@' + hostname + ':' port
		return (m ? {
			href     : m[0] || '',
			protocol : m[1] || '',
			authority: m[2] || '',
			host     : m[3] || '',
			hostname : m[4] || '',
			port     : m[5] || '',
			pathname : m[6] || '',
			search   : m[7] || '',
			hash     : m[8] || ''
		} : null);
	};

var canJoinUris = canNamespace.joinURIs = function(base, href) {
	function removeDotSegments(input) {
		var output = [];
		input.replace(/^(\.\.?(\/|$))+/, '')
			.replace(/\/(\.(\/|$))+/g, '/')
			.replace(/\/\.\.$/, '/../')
			.replace(/\/?[^\/]*/g, function (p) {
				if (p === '/..') {
					output.pop();
				} else {
					output.push(p);
				}
			});
		return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
	}

	href = canParseUri(href || '');
	base = canParseUri(base || '');

	return !href || !base ? null : (href.protocol || base.protocol) +
		(href.protocol || href.authority ? href.authority : base.authority) +
		removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
			(href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
			href.hash;
};

function noop () {}
var resolveValue = noop;
var evaluateArgs = noop;
var __testing = {};
//!steal-remove-end

function debuggerHelper$1 (left, right) {
	//!steal-remove-end

	canLog.warn('Forgotten {{debugger}} helper');
}
debuggerHelper$1.requiresOptionsArgument = true;

var Debugger = {
	helper: debuggerHelper$1,
	evaluateArgs: evaluateArgs,
	resolveValue: resolveValue,

	// used only for testing purposes
	__testing: __testing
};

var truthyObservable = function(observable){
    return new canObservation(function truthyObservation(){
        var val = canReflect.getValue(observable);

        return !!val;
    });
};

function makeConverter(getterSetter){
	getterSetter = getterSetter || {};
	return function(newVal, source) {
		var args = canReflect.toArray(arguments);
		if(newVal instanceof setIdentifier) {
			return typeof getterSetter.set === "function" ?
				getterSetter.set.apply(this, [newVal.value].concat(args.slice(1))) :
				source(newVal.value);
		} else {
			return typeof getterSetter.get === "function" ?
				getterSetter.get.apply(this, args) :
				args[0];
		}
	};
}

var converter = makeConverter;

var bindAndRead = function (value) {
	if ( value && canReflect.isValueLike(value) ) {
		canObservation.temporarilyBind(value);
		return canReflect.getValue(value);
	} else {
		return value;
	}
};

function forOfInteger(integer, variableName, options) {
	var result = [];
	for (var i = 0; i < integer; i++) {
		var variableScope = {};
		if(variableName !== undefined){
			variableScope[variableName] = i;
		}
		result.push(
			options.fn( options.scope
				.add({ index: i }, { special: true })
				.addLetContext(variableScope) )
		);
	}

	return options.stringOnly ? result.join('') : result;
}

function forOfObject(object, variableName, options){
	var result = [];
	canReflect.each(object, function(val, key){
		// Allow key to contain a dot, for example: "My.key.has.dot"
		var value = new keyObservable(object, key.replace(/\./g, "\\."));
		var variableScope = {};
		if(variableName !== undefined){
			variableScope[variableName] = value;
		}
		result.push(
			options.fn( options.scope
				.add({ key: key }, { special: true })
				.addLetContext(variableScope) )
		);
	});

	return options.stringOnly ? result.join('') : result;
}

// this is called with the ast ... we are going to use that to our advantage.
var forHelper = function(helperOptions) {
	// lookup

	// TODO: remove in prod
	// make sure we got called with the right stuff
	if(helperOptions.exprData.argExprs.length !== 1) {
		throw new Error("for(of) broken syntax");
	}

	// TODO: check if an instance of helper;

	var helperExpr = helperOptions.exprData.argExprs[0].expr;
	var variableName, valueLookup, valueObservable;
	if(helperExpr instanceof expression_1.Lookup) {

		valueObservable = helperExpr.value(helperOptions.scope);

	} else if(helperExpr instanceof expression_1.Helper) {
		// TODO: remove in prod
		var inLookup = helperExpr.argExprs[0];
		if(inLookup.key !== "of") {
			throw new Error("for(of) broken syntax");
		}
		variableName = helperExpr.methodExpr.key;
		valueLookup = helperExpr.argExprs[1];
		valueObservable = valueLookup.value(helperOptions.scope);
	}

	var items =  valueObservable;

	var args = [].slice.call(arguments),
		options = args.pop(),
		resolved = bindAndRead(items);

	if(resolved && resolved === Math.floor(resolved)) {
		return forOfInteger(resolved, variableName, helperOptions);
	}
	if(resolved && !canReflect.isListLike(resolved)) {
		return forOfObject(resolved,variableName, helperOptions);
	}
	if(options.stringOnly) {
		var parts = [];
		canReflect.eachIndex(resolved, function(value, index){
			var variableScope = {};
			if(variableName !== undefined){
				variableScope[variableName] = value;
			}
			parts.push(
				helperOptions.fn( options.scope
					.add({ index: index }, { special: true })
					.addLetContext(variableScope) )
			);
		});
		return parts.join("");
	} else {
		// Tells that a helper has been called, this function should be returned through
		// checking its value.
		options.metadata.rendered = true;
		return function(el){

			var cb = function (item, index) {
				var variableScope = {};
				if(variableName !== undefined){
					variableScope[variableName] = item;
				}
				return options.fn(
					options.scope
					.add({ index: index }, { special: true })
					.addLetContext(variableScope),
					options.options
				);
			};

			canViewLive.list(el, items, cb, options.context, function(list){
				return options.inverse(options.scope, options.options);
			});
		};
	}
};
forHelper.isLiveBound = true;
forHelper.requiresOptionsArgument = true;
forHelper.ignoreArgLookup = function ignoreArgLookup(index) {
	return index === 0;
};

var ForOf = forHelper;

function isVariable(scope) {
	return scope._meta.variable === true;
}

// This sets variables so it needs to not causes changes.
var letHelper = canObservationRecorder.ignore(function(options){
	if(options.isSection){
		return options.fn( options.scope.addLetContext( options.hash ) );
	}
	var variableScope = options.scope.getScope(isVariable);
	if(!variableScope) {
		throw new Error("There is no variable scope!");
	}

	canReflect.assignMap(variableScope._context, options.hash);
	return document.createTextNode("");
});

var Let = letHelper;

var keepNodeSymbol = canSymbol.for("done.keepNode");

function portalHelper(elementObservable, options){
	var debugName = "portal(" + canReflect.getName(elementObservable) + ")";

	function portalContents() {
		var frag = options.fn(
			options.scope
			.addLetContext({}),
			options.options
		);

		var child = frag.firstChild;
		while(child) {
			// makes sure DoneJS does not remove these nodes
			child[keepNodeSymbol] = true;
			child = child.nextSibling;
		}


		return frag;
	}
	//!steal-remove-end


	// Where we are portalling
	var portalElement,
		startPortalledPlaceholder,
		endPortalledPlaceholder,
		commentPlaceholderDispose;
	function teardownPortalledContent() {

		if(portalElement) {
			canReflect.offValue(elementObservable, getElementAndRender);
			portalElement = null;
		}

		if(startPortalledPlaceholder && endPortalledPlaceholder) {
			var parentNode = startPortalledPlaceholder.parentNode;
			if(parentNode) {
				helpers.range.remove({start: startPortalledPlaceholder, end: endPortalledPlaceholder});
				node_1.removeChild.call(parentNode, startPortalledPlaceholder );
				node_1.removeChild.call(parentNode, endPortalledPlaceholder );
				startPortalledPlaceholder = endPortalledPlaceholder = null;
			}
		}
	}
	function teardownEverything(){
		if(commentPlaceholderDispose) {
			commentPlaceholderDispose();
		}
		teardownPortalledContent();
	}
	// The element has changed
	function getElementAndRender() {
		// remove the old rendered content and unbind if we've bound before
		teardownPortalledContent();

		canReflect.onValue(elementObservable, getElementAndRender);

		portalElement = canReflect.getValue(elementObservable);

		if(portalElement) {
			startPortalledPlaceholder = portalElement.ownerDocument.createComment(debugName+" contents");
			endPortalledPlaceholder = portalElement.ownerDocument.createComment("can-end-placeholder");
			startPortalledPlaceholder[keepNodeSymbol] = true;
			endPortalledPlaceholder[keepNodeSymbol] = true;
			portalElement.appendChild(startPortalledPlaceholder);
			portalElement.appendChild(endPortalledPlaceholder);

			var observable = new canObservation(portalContents, null, {isObservable: false});

			canViewLive.html(startPortalledPlaceholder, observable);
		} else {
			options.metadata.rendered = true;
		}

	}

	getElementAndRender();

	return function(placeholderElement) {
		var commentPlaceholder = placeholderElement.ownerDocument.createComment(debugName);

		placeholderElement.parentNode.replaceChild(commentPlaceholder, placeholderElement);
		commentPlaceholderDispose = canDomMutate.onNodeRemoved(commentPlaceholder, teardownEverything);
		return commentPlaceholder;
	};
}

portalHelper.isLiveBound = true;
portalHelper.requiresOptionsArgument = true;

var Portal = portalHelper;

var debuggerHelper = Debugger.helper;












var builtInHelpers = {};
var builtInConverters = {};
var converterPackages = new WeakMap();

// ## Helpers
var helpersCore = {
	looksLikeOptions: function(options){
		return options && typeof options.fn === "function" && typeof options.inverse === "function";
	},
	resolve: function(value) {
		if (value && canReflect.isValueLike(value)) {
			return canReflect.getValue(value);
		} else {
			return value;
		}
	},
	resolveHash: function(hash){
		var params = {};
		for(var prop in hash) {
			params[prop] = helpersCore.resolve(hash[prop]);
		}
		return params;
	},
	bindAndRead: function (value) {
		if ( value && canReflect.isValueLike(value) ) {
			canObservation.temporarilyBind(value);
			return canReflect.getValue(value);
		} else {
			return value;
		}
	},
	registerHelper: function(name, callback){
		//!steal-remove-end

		// mark passed in helper so it will be automatically passed
		// helperOptions (.fn, .inverse, etc) when called as Call Expressions
		callback.requiresOptionsArgument = true;

		// store on global helpers list
		canStacheHelpers[name] = callback;
	},
	registerHelpers: function(helpers) {
		var name, callback;
		for(name in helpers) {
			callback = helpers[name];
			helpersCore.registerHelper(name, helpersCore.makeSimpleHelper(callback));
		}
	},
	registerConverter: function(name, getterSetter) {
		helpersCore.registerHelper(name, converter(getterSetter));
	},
	makeSimpleHelper: function(fn) {
		return function() {
			var realArgs = [];
			canReflect.eachIndex(arguments, function(val) {
				realArgs.push(helpersCore.resolve(val));
			});
			return fn.apply(this, realArgs);
		};
	},
	addHelper: function(name, callback) {
		if(typeof name === "object") {
			return helpersCore.registerHelpers(name);
		}
		return helpersCore.registerHelper(name, helpersCore.makeSimpleHelper(callback));
	},
	addConverter: function(name, getterSetter) {
		if(typeof name === "object") {
			if(!converterPackages.has(name)) {
				converterPackages.set(name, true);
				canReflect.eachKey(name, function(getterSetter, name) {
					helpersCore.addConverter(name, getterSetter);
				});
			}
			return;
		}

		var helper = converter(getterSetter);
		helper.isLiveBound = true;
		helpersCore.registerHelper(name, helper);
	},

	// add helpers that set up their own internal live-binding
	// these helpers will not be wrapped in computes and will
	// receive observable arguments when called with Call Expressions
	addLiveHelper: function(name, callback) {
		callback.isLiveBound = true;
		return helpersCore.registerHelper(name, callback);
	},

	getHelper: function(name, scope) {
		var helper = scope && scope.getHelper(name);

		if (!helper) {
			helper = canStacheHelpers[name];
		}

		return helper;
	},
	__resetHelpers: function() {
		// remove all helpers from can-stache-helpers object
		for (var helper in canStacheHelpers) {
			delete canStacheHelpers[helper];
		}
		// Clear converterPackages map before re-adding converters
		converterPackages.delete(builtInConverters);

		helpersCore.addBuiltInHelpers();
		helpersCore.addBuiltInConverters();
	},
	addBuiltInHelpers: function() {
		canReflect.each(builtInHelpers, function(helper, helperName) {
			canStacheHelpers[helperName] = helper;
		});
	},
	addBuiltInConverters: function () {
		helpersCore.addConverter(builtInConverters);
	},
	_makeLogicHelper: function(name, logic){
		var logicHelper =  canAssign(function() {
			var args = Array.prototype.slice.call(arguments, 0),
				options;

			if( helpersCore.looksLikeOptions(args[args.length - 1]) ){
				options = args.pop();
			}

			function callLogic(){
				// if there are options, we want to prevent re-rendering if values are still truthy
				if(options) {
					return logic(args) ? true: false;
				} else {
					return logic(args);
				}

			}
			//!steal-remove-end
			var callFn = new canObservation(callLogic);

			if(options) {
				return callFn.get() ? options.fn() : options.inverse();
			} else {
				return callFn.get();
			}

		},{requiresOptionsArgument: true, isLiveBound: true});
		//!steal-remove-end

		return logicHelper;
	}
};



// ## IF HELPER
var ifHelper = canAssign(function ifHelper(expr, options) {
	var value;
	// if it's a function, wrap its value in a compute
	// that will only change values from true to false
	if (expr && canReflect.isValueLike(expr)) {
		value = canReflect.getValue(new truthyObservable(expr));
	} else {
		value = !! helpersCore.resolve(expr);
	}

	if (options) {
		return value ? options.fn(options.scope || this) : options.inverse(options.scope || this);
	}

	return !!value;
}, {requiresOptionsArgument: true, isLiveBound: true});




//## EQ/IS HELPER
var isHelper = helpersCore._makeLogicHelper("eq", function eqHelper(args){
	var curValue, lastValue;
	for (var i = 0; i < args.length; i++) {
		curValue = helpersCore.resolve(args[i]);
		curValue = typeof curValue === "function" ? curValue() : curValue;

		if (i > 0) {
			if (curValue !== lastValue) {
				return false;
			}
		}
		lastValue = curValue;
	}
	return true;
});

var andHelper = helpersCore._makeLogicHelper("and", function andHelper(args){
	if(args.length === 0 ) {
		return false;
	}
	var last;
	for (var i = 0, len = args.length; i < len; i++) {
		last = helpersCore.resolve(args[i]);
		if( !last  ) {
			return last;
		}
	}
	return last;
});

var orHelper = helpersCore._makeLogicHelper("or", function orHelper(args){
	if(args.length === 0 ) {
		return false;
	}
	var last;
	for (var i = 0, len = args.length; i < len; i++) {
		last = helpersCore.resolve(args[i]);
		if( last  ) {
			return last;
		}
	}
	return last;
});


var switchHelper = function(expression, options){
	helpersCore.resolve(expression);
	var found = false;

	var caseHelper = function(value, options) {
		if(!found && helpersCore.resolve(expression) === helpersCore.resolve(value)) {
			found = true;
			return options.fn(options.scope);
		}
	};
	caseHelper.requiresOptionsArgument = true;

	// create default helper as a value-like function
	// so that either {{#default}} or {{#default()}} will work
	var defaultHelper = function(options) {
		if (!found) {
			return options ? options.scope.peek('this') : true;
		}
	};
	defaultHelper.requiresOptionsArgument = true;
	canReflect.assignSymbols(defaultHelper, {
		"can.isValueLike": true,
		"can.isFunctionLike": false,
		"can.getValue": function() {
			// pass the helperOptions passed to {{#switch}}
			return this(options);
		}
	});

	var newScope = options.scope.add({
		case: caseHelper,
		default: defaultHelper
	}, { notContext: true });

	return options.fn(newScope, options);
};
switchHelper.requiresOptionsArgument = true;


// ## ODD HELPERS

var domDataHelper = function(attr, value) {
	var data = (helpersCore.looksLikeOptions(value) ? value.context : value) || this;
	return function setDomData(el) {
		canDomData.set( el, attr, data );
	};
};

var joinBaseHelper = function(firstExpr/* , expr... */){
	var args = [].slice.call(arguments);
	var options = args.pop();

	var moduleReference = args.map( function(expr){
		var value = helpersCore.resolve(expr);
		return typeof value === "function" ? value() : value;
	}).join("");

	var templateModule = canReflect.getKeyValue(options.scope.templateContext.helpers, 'module');
	var parentAddress = templateModule ? templateModule.uri: undefined;

	var isRelative = moduleReference[0] === ".";

	if(isRelative && parentAddress) {
		return canJoinUris(parentAddress, moduleReference);
	} else {
		var baseURL = (typeof System !== "undefined" &&
			(System.renderingBaseURL || System.baseURL)) ||	baseUrl();

		// Make sure one of them has a needed /
		if(moduleReference[0] !== "/" && baseURL[baseURL.length - 1] !== "/") {
			baseURL += "/";
		}

		return canJoinUris(baseURL, moduleReference);
	}
};
joinBaseHelper.requiresOptionsArgument = true;

// ## LEGACY HELPERS

// ### each
var eachHelper = function(items) {
	var args = [].slice.call(arguments),
		options = args.pop(),
		hashExprs = options.exprData.hashExprs,
		resolved = helpersCore.bindAndRead(items),
		hashOptions,
		aliases;

	// Check if using hash
	if (canReflect.size(hashExprs) > 0) {
		hashOptions = {};
		canReflect.eachKey(hashExprs, function (exprs, key) {
			hashOptions[exprs.key] = key;
		});
	}

	if ((
		canReflect.isObservableLike(resolved) && canReflect.isListLike(resolved) ||
			( canReflect.isListLike(resolved) && canReflect.isValueLike(items) )
	) && !options.stringOnly) {
		// Tells that a helper has been called, this function should be returned through
		// checking its value.
		options.metadata.rendered = true;
		return function(el){
			var cb = function (item, index) {
				var aliases = {};

				if (canReflect.size(hashOptions) > 0) {
					if (hashOptions.value) {
						aliases[hashOptions.value] = item;
					}
					if (hashOptions.index) {
						aliases[hashOptions.index] = index;
					}
				}

				return options.fn(
					options.scope
					.add(aliases, { notContext: true })
					.add({ index: index }, { special: true })
					.add(item),
				options.options
				);
			};

			canViewLive.list(el, items, cb, options.context , function(list){
				return options.inverse(options.scope.add(list), options.options);
			});
		};
	}

	var expr = helpersCore.resolve(items),
		result;

	if (!!expr && canReflect.isListLike(expr)) {
		result = utils.getItemsFragContent(expr, options, options.scope);
		return options.stringOnly ? result.join('') : result;
	} else if (canReflect.isObservableLike(expr) && canReflect.isMapLike(expr) || expr instanceof Object) {
		result = [];
		canReflect.each(expr, function(val, key){
			var value = new keyObservable(expr, key);
			aliases = {};

			if (canReflect.size(hashOptions) > 0) {
				if (hashOptions.value) {
					aliases[hashOptions.value] = value;
				}
				if (hashOptions.key) {
					aliases[hashOptions.key] = key;
				}
			}
			result.push(options.fn(
				options.scope
				.add(aliases, { notContext: true })
				.add({ key: key }, { special: true })
				.add(value)
			));
		});

		return options.stringOnly ? result.join('') : result;
	}
};
eachHelper.isLiveBound = true;
eachHelper.requiresOptionsArgument = true;
eachHelper.ignoreArgLookup = function ignoreArgLookup(index) {
	return index === 1;
};

// ### index
// This is legacy for `{{index(5)}}`
var indexHelper = canAssign(function indexHelper(offset, options) {
	if (!options) {
		options = offset;
		offset = 0;
	}
	var index = options.scope.peek("scope.index");
	return ""+((typeof(index) === "function" ? index() : index) + offset);
}, {requiresOptionsArgument: true});

// ### WITH HELPER
var withHelper = function (expr, options) {
	var ctx = expr;
	if(!options) {
		// hash-only case if no current context expression
		options = expr;
		expr = true;
		ctx = options.hash;
	} else {
		expr = helpersCore.resolve(expr);
		if(options.hash && canReflect.size(options.hash) > 0) {
			// presumably rare case of both a context object AND hash keys
			// Leaving it undocumented for now, but no reason not to support it.
			ctx = options.scope.add(options.hash, { notContext: true }).add(ctx);
		}
	}
	return options.fn(ctx || {});
};
withHelper.requiresOptionsArgument = true;

// ### data helper
var dataHelper = function(attr, value) {
	var data = (helpersCore.looksLikeOptions(value) ? value.context : value) || this;
	return function setData(el) {
		//!steal-remove-end
		canDomData.set( el, attr, data );
	};
};

// ## UNLESS HELPER
var unlessHelper = function (expr, options) {
	if(!options) {
		return !ifHelper.apply(this, [expr]);
	}
	return ifHelper.apply(this, [expr, canAssign(canAssign({}, options), {
		fn: options.inverse,
		inverse: options.fn
	})]);
};
unlessHelper.requiresOptionsArgument = true;
unlessHelper.isLiveBound = true;


// ## Converters
// ## NOT converter
var notConverter = {
	get: function(obs, options){
		if(helpersCore.looksLikeOptions(options)) {
			return canReflect.getValue(obs) ? options.inverse() : options.fn();
		} else {
			return !canReflect.getValue(obs);
		}
	},
	set: function(newVal, obs){
		canReflect.setValue(obs, !newVal);
	}
};

// ## Register as defaults

canAssign(builtInHelpers, {
	'debugger': debuggerHelper,
	each: eachHelper,
	eachOf: eachHelper,
	index: indexHelper,
	'if': ifHelper,
	is: isHelper,
	eq: isHelper,
	unless: unlessHelper,
	'with': withHelper,
	console: console,
	data: dataHelper,
	domData: domDataHelper,
	'switch': switchHelper,
	joinBase: joinBaseHelper,
	and: andHelper,
	or: orHelper,
	'let': Let,
	'for': ForOf,
	portal: Portal
});

canAssign(builtInConverters, {
	'not': notConverter
});

// add all the built-in helpers when stache is loaded
helpersCore.addBuiltInHelpers();
helpersCore.addBuiltInConverters();

var core = helpersCore;

var mustacheLineBreakRegExp = /(?:(^|\r?\n)(\s*)(\{\{([\s\S]*)\}\}\}?)([^\S\n\r]*)($|\r?\n))|(\{\{([\s\S]*)\}\}\}?)/g,
	mustacheWhitespaceRegExp = /(\s*)(\{\{\{?)(-?)([\s\S]*?)(-?)(\}\}\}?)(\s*)/g;

function splitModeFromExpression(expression, state){
	expression = expression.trim();
	var mode = expression.charAt(0);

	if( "#/{&^>!<".indexOf(mode) >= 0 ) {
		expression =  expression.substr(1).trim();
	} else {
		mode = null;
	}
	// Triple braces do nothing within a tag.
	if(mode === "{" && state.node) {
		mode = null;
	}
	return {
		mode: mode,
		expression: expression
	};
}

function cleanLineEndings(template) {
		// Finds mustache tags with space around them or no space around them.
		return template.replace( mustacheLineBreakRegExp,
			function(whole,
				returnBefore,
				spaceBefore,
				special,
				expression,
				spaceAfter,
				returnAfter,
				// A mustache magic tag that has no space around it.
				spaceLessSpecial,
				spaceLessExpression,
				matchIndex){

			// IE 8 will provide undefined
			spaceAfter = (spaceAfter || "");
			returnBefore = (returnBefore || "");
			spaceBefore = (spaceBefore || "");

			var modeAndExpression = splitModeFromExpression(expression || spaceLessExpression,{});

			// If it's a partial or tripple stache, leave in place.
			if(spaceLessSpecial || ">{".indexOf( modeAndExpression.mode) >= 0) {
				return whole;
			}  else if( "^#!/".indexOf(  modeAndExpression.mode ) >= 0 ) {
				// Return the magic tag and a trailing linebreak if this did not
				// start a new line and there was an end line.
				// Add a normalized leading space, if there was any leading space, in case this abuts a tag name
				spaceBefore = (returnBefore + spaceBefore) && " ";
				return spaceBefore+special+( matchIndex !== 0 && returnAfter.length ? returnBefore+"\n" :"");


			} else {
				// There is no mode, return special with spaces around it.
				return spaceBefore+special+spaceAfter+(spaceBefore.length || matchIndex !== 0 ? returnBefore+"\n" : "");
			}
		});
}

function whiteSpaceReplacement(
	whole,
	spaceBefore,
	bracketBefore,
	controlBefore,
	expression,
	controlAfter,
	bracketAfter,
	spaceAfter
) {

	if (controlBefore === '-') {
		spaceBefore = '';
	}

	if (controlAfter === '-') {
		spaceAfter = '';
	}

	return spaceBefore + bracketBefore + expression + bracketAfter + spaceAfter;
}

function cleanWhitespaceControl(template) {
	return template.replace(mustacheWhitespaceRegExp, whiteSpaceReplacement);
}

var cleanLineEndings_1 = cleanLineEndings;
var cleanWhitespaceControl_1 = cleanWhitespaceControl;

var controls = {
	cleanLineEndings: cleanLineEndings_1,
	cleanWhitespaceControl: cleanWhitespaceControl_1
};

var parse = function(filename, source){
	if (arguments.length === 1) {
		source = arguments[0];
		filename = undefined;
	}

	var template = source;
	template = controls.cleanWhitespaceControl(template);
	template = controls.cleanLineEndings(template);

	var imports = [],
		dynamicImports = [],
		importDeclarations = [],
		ases = {},
		attributes = new Map(),
		inImport = false,
		inFrom = false,
		inAs = false,
		isUnary = false,
		importIsDynamic = false,
		currentAs = "",
		currentFrom = "",
		currentAttrName = null;

	function processImport(line) {
		if(currentAs) {
			ases[currentAs] = currentFrom;
			currentAs = "";
		}
		if(importIsDynamic) {
			dynamicImports.push(currentFrom);
		} else {
			imports.push(currentFrom);
		}
		importDeclarations.push({
			specifier: currentFrom,
			loc: {
				line: line
			},
			attributes: attributes
		});

		// Reset this scope value so that the next import gets new attributes.
		attributes = new Map();
	}

	var program = canViewParser(template, {
		filename: filename,
		start: function( tagName, unary ){
			if(tagName === "can-import") {
				isUnary = unary;
				importIsDynamic = false; // assume static import unless there is content (chars/tags/special).
				inImport = true;
			} else if(tagName === "can-dynamic-import") {
				isUnary = unary;
				importIsDynamic = true;
				inImport = true;
			} else if(inImport) {
				importIsDynamic = true;  // found content inside can-import tag.
				inImport = false;
			}
		},
		attrStart: function( attrName ){
			currentAttrName = attrName;
			// Default to a boolean attribute, the attrValue hook will replace that.
			attributes.set(currentAttrName, true);

			if(attrName === "from") {
				inFrom = true;
			} else if(attrName === "as" || attrName === "export-as") {
				inAs = true;
			}
		},
		attrEnd: function( attrName ){
			if(attrName === "from") {
				inFrom = false;
			} else if(attrName === "as" || attrName === "export-as") {
				inAs = false;
			}
		},
		attrValue: function( value ){
			if(inImport) {
				attributes.set(currentAttrName, value);
			}
			if(inFrom && inImport) {
				currentFrom = value;
			} else if(inAs && inImport) {
				currentAs = value;
			}
		},
		end: function(tagName, unary, line){
			if((tagName === "can-import" || tagName === "can-dynamic-import") && isUnary) {
				processImport(line);
			}
		},
		close: function(tagName, unary, line){
			if((tagName === "can-import" || tagName === "can-dynamic-import")) {
				processImport(line);
			}
		},
		chars: function(text) {
			if(text.trim().length > 0) {
				importIsDynamic = true;
			}
		},
		special: function() {
			importIsDynamic = true;
		}
	}, true);

	return {
		intermediate: program,
		program: program,
		imports: imports,
		dynamicImports: dynamicImports,
		importDeclarations: importDeclarations,
		ases: ases,
		exports: ases
	};
};

var canStacheAst = {
	parse: parse
};

/**
 * @module {function} can-util/js/import/import import
 * @parent can-util/js
 * @signature `importModule(moduleName, parentName)`
 *
 * ```js
 * var importModule = require("can-util/js/import/import");
 *
 * importModule("foo.stache").then(function(){
 *   // module was imported
 * });
 * ```
 *
 * @param {String} moduleName The module to be imported.
 * @param {String} [parentName] A parent module that will be used as a reference for resolving relative module imports.
 * @return {Promise} A Promise that will resolve when the module has been imported.
 */

var canImportModule = canNamespace.import = function(moduleName, parentName) {
	return new Promise(function(resolve, reject) {
		try {
			var global = global_1();
			if(typeof global.System === "object" && isFunction(global.System["import"])) {
				global.System["import"](moduleName, {
					name: parentName
				}).then(resolve, reject);
			} else if(global.define && global.define.amd){
				global.require([moduleName], function(value){
					resolve(value);
				});
			} else if(global.require){
				resolve(global.require(moduleName));
			} else {
				// steal optimized build
				if (typeof stealRequire !== "undefined") {
					steal.import(moduleName, { name: parentName }).then(resolve, reject);
				} else {
					// ideally this will use can.getObject
					resolve();
				}
			}
		} catch(err) {
			reject(err);
		}
	});
};

function isFunction(fn) {
	return typeof fn === "function";
}

/* jshint undef: false */








var getIntermediateAndImports = canStacheAst.parse;

var makeRendererConvertScopes = utils.makeRendererConvertScopes;
var last = utils.last;












// Make sure that we can also use our modules with Stache as a plugin




if(!canViewCallbacks.tag("content")) {
	// This was moved from the legacy view/scanner.js to here.
	// This makes sure content elements will be able to have a callback.
	canViewCallbacks.tag("content", function(el, tagData) {
		return tagData.scope;
	});
}

var isViewSymbol = canSymbol.for("can.isView");
var svgNamespace = "http://www.w3.org/2000/svg",
xmlnsAttrNamespaceURI = "http://www.w3.org/2000/xmlns/",
xlinkHrefAttrNamespaceURI =  "http://www.w3.org/1999/xlink";
var namespaces = {
	"svg": svgNamespace,
	// this allows a partial to start with g.
	"g": svgNamespace,
	"defs": svgNamespace,
	"path": svgNamespace,
	"filter": svgNamespace,
	"feMorphology": svgNamespace,
	"feGaussianBlur": svgNamespace,
	"feOffset": svgNamespace,
	"feComposite": svgNamespace,
	"feColorMatrix": svgNamespace,
	"use": svgNamespace
},
	attrsNamespacesURI = {
		'xmlns': xmlnsAttrNamespaceURI,
		'xlink:href': xlinkHrefAttrNamespaceURI
	},
	textContentOnlyTag = {style: true, script: true};

function stache (filename, template) {
	if (arguments.length === 1) {
		template = arguments[0];
		filename = undefined;
	}

	var inlinePartials = {};

	// Remove line breaks according to mustache's specs.
	if(typeof template === "string") {
		template = mustache_core.cleanWhitespaceControl(template);
		template = mustache_core.cleanLineEndings(template);
	}

	// The HTML section that is the root section for the entire template.
	var section = new html_section(filename),
		// Tracks the state of the parser.
		state = {
			node: null,
			attr: null,
			// A stack of which node / section we are in.
			// There is probably a better way of doing this.
			sectionElementStack: [],
			// If text should be inserted and HTML escaped
			text: false,
			// which namespace we are in
			namespaceStack: [],
			// for style and script tags
			// we create a special TextSectionBuilder and add things to that
			// when the element is done, we compile the text section and
			// add it as a callback to `section`.
			textContentOnly: null

		},

		// This function is a catch all for taking a section and figuring out
		// how to create a "renderer" that handles the functionality for a
		// given section and modify the section to use that renderer.
		// For example, if an HTMLSection is passed with mode `#` it knows to
		// create a liveBindingBranchRenderer and pass that to section.add.
		// jshint maxdepth:5
		makeRendererAndUpdateSection = function(section, mode, stache, lineNo){

			if(mode === ">") {
				// Partials use liveBindingPartialRenderers
				section.add(mustache_core.makeLiveBindingPartialRenderer(stache, copyState({ filename: section.filename, lineNo: lineNo })));

			} else if(mode === "/") {

				var createdSection = section.last();
				if ( createdSection.startedWith === "<" ) {
					inlinePartials[ stache ] = section.endSubSectionAndReturnRenderer();
					// Remove *TWO* nodes because we now have a start and an end comment for the section....
					section.removeCurrentNode();
					section.removeCurrentNode();
				} else {
					section.endSection();
				}
				//!steal-remove-end

				if(section instanceof html_section) {
					state.sectionElementStack.pop();
				}
			} else if(mode === "else") {

				section.inverse();

			} else {

				// If we are an HTMLSection, we will generate a
				// a LiveBindingBranchRenderer; otherwise, a StringBranchRenderer.
				// A LiveBindingBranchRenderer function processes
				// the mustache text, and sets up live binding if an observable is read.
				// A StringBranchRenderer function processes the mustache text and returns a
				// text value.
				var makeRenderer = section instanceof html_section ?
					mustache_core.makeLiveBindingBranchRenderer:
					mustache_core.makeStringBranchRenderer;

				if(mode === "{" || mode === "&") {

					// Adds a renderer function that just reads a value or calls a helper.
					section.add(makeRenderer(null,stache, copyState({ filename: section.filename, lineNo: lineNo })));

				} else if(mode === "#" || mode === "^" || mode === "<") {
					// Adds a renderer function and starts a section.
					var renderer = makeRenderer(mode, stache, copyState({ filename: section.filename, lineNo: lineNo }));
					var sectionItem = {
						type: "section"
					};
					section.startSection(renderer, stache);
					section.last().startedWith = mode;

					// If we are a directly nested section, count how many we are within
					if(section instanceof html_section) {
						//!steal-remove-end

						state.sectionElementStack.push(sectionItem);
					}
				} else {
					// Adds a renderer function that only updates text.
					section.add(makeRenderer(null, stache, copyState({text: true, filename: section.filename, lineNo: lineNo })));
				}

			}
		},
		isDirectlyNested = function() {
			var lastElement = state.sectionElementStack[state.sectionElementStack.length - 1];
			return state.sectionElementStack.length ?
				lastElement.type === "section" || lastElement.type === "custom": true;
		},
		// Copys the state object for use in renderers.
		copyState = function(overwrites){

			var cur = {
				tag: state.node && state.node.tag,
				attr: state.attr && state.attr.name,
				// <content> elements should be considered direclty nested
				directlyNested: isDirectlyNested(),
				textContentOnly: !!state.textContentOnly
			};
			return overwrites ? canAssign(cur, overwrites) : cur;
		},
		addAttributesCallback = function(node, callback){
			if( !node.attributes ) {
				node.attributes = [];
			}
			node.attributes.unshift(callback);
		};

	canViewParser(template, {
		filename: filename,
		start: function(tagName, unary, lineNo){
			var matchedNamespace = namespaces[tagName];

			if (matchedNamespace && !unary ) {
				state.namespaceStack.push(matchedNamespace);
			}

			// either add templates: {} here or check below and decorate
			// walk up the stack/targetStack until you find the first node
			// with a templates property, and add the popped renderer
			state.node = {
				tag: tagName,
				children: [],
				namespace: matchedNamespace || last(state.namespaceStack)
			};
		},
		end: function(tagName, unary, lineNo){
			var isCustomTag =  canViewCallbacks.tag(tagName);
			var directlyNested = isDirectlyNested();
			if(unary){
				// If it's a custom tag with content, we need a section renderer.
				section.add(state.node);
				if(isCustomTag) {
					// Call directlyNested now as it's stateful.
					addAttributesCallback(state.node, function(scope){
						//!steal-remove-end
						canViewCallbacks.tagHandler(this,tagName, {
							scope: scope,
							subtemplate: null,
							templateType: "stache",
							directlyNested: directlyNested
						});
					});
				}
			} else {
				section.push(state.node);

				state.sectionElementStack.push({
					type: isCustomTag ? "custom" : null,
					tag: isCustomTag ? null : tagName,
					templates: {},
					directlyNested: directlyNested
				});

				// If it's a custom tag with content, we need a section renderer.
				if( isCustomTag ) {
					section.startSubSection();
				} else if(textContentOnlyTag[tagName]) {
					state.textContentOnly = new text_section(filename);
				}
			}


			state.node =null;

		},
		close: function(tagName, lineNo) {
			var matchedNamespace = namespaces[tagName];

			if (matchedNamespace  ) {
				state.namespaceStack.pop();
			}

			var isCustomTag = canViewCallbacks.tag(tagName),
				renderer;

			if( isCustomTag ) {
				renderer = section.endSubSectionAndReturnRenderer();
			}

			if(textContentOnlyTag[tagName]) {
				section.last().add(state.textContentOnly.compile(copyState()));
				state.textContentOnly = null;
			}

			var oldNode = section.pop();
			if( isCustomTag ) {
				if (tagName === "can-template") {
					// If we find a can-template we want to go back 2 in the stack to get it's inner content
					// rather than the <can-template> element itself
					var parent = state.sectionElementStack[state.sectionElementStack.length - 2];
					if (renderer) {// Only add the renderer if the template has content
						parent.templates[oldNode.attrs.name] = makeRendererConvertScopes(renderer);
					}
					section.removeCurrentNode();
				} else {
					// Get the last element in the stack
					var current = state.sectionElementStack[state.sectionElementStack.length - 1];
					addAttributesCallback(oldNode, function(scope){
						//!steal-remove-end
						canViewCallbacks.tagHandler(this,tagName, {
							scope: scope,
							subtemplate: renderer  ? makeRendererConvertScopes(renderer) : renderer,
							templateType: "stache",
							templates: current.templates,
							directlyNested: current.directlyNested
						});
					});
				}
			}
			state.sectionElementStack.pop();
		},
		attrStart: function(attrName, lineNo){
			if(state.node.section) {
				state.node.section.add(attrName+"=\"");
			} else {
				state.attr = {
					name: attrName,
					value: ""
				};
			}

		},
		attrEnd: function(attrName, lineNo){
			var matchedAttrNamespacesURI = attrsNamespacesURI[attrName];
			if(state.node.section) {
				state.node.section.add("\" ");
			} else {
				if(!state.node.attrs) {
					state.node.attrs = {};
				}

				if (state.attr.section) {
					state.node.attrs[state.attr.name] = state.attr.section.compile(copyState());
				} else if (matchedAttrNamespacesURI) {
					state.node.attrs[state.attr.name] = {
						value: state.attr.value,
						namespaceURI: attrsNamespacesURI[attrName]
					};
				} else {
					state.node.attrs[state.attr.name] = state.attr.value;
				}

				var attrCallback = canViewCallbacks.attr(attrName);
				//!steal-remove-end

				if(attrCallback) {
					if( !state.node.attributes ) {
						state.node.attributes = [];
					}
					state.node.attributes.push(function(scope){
						//!steal-remove-end
						attrCallback(this,{
							attributeName: attrName,
							scope: scope
						});
					});
				}

				state.attr = null;
			}
		},
		attrValue: function(value, lineNo){
			var section = state.node.section || state.attr.section;
			if(section){
				section.add(value);
			} else {
				state.attr.value += value;
			}
		},
		chars: function(text, lineNo) {
			(state.textContentOnly || section).add(text);
		},
		special: function(text, lineNo){
			var firstAndText = mustache_core.splitModeFromExpression(text, state),
				mode = firstAndText.mode,
				expression = firstAndText.expression;


			if(expression === "else") {
				var inverseSection;
				if(state.attr && state.attr.section) {
					inverseSection = state.attr.section;
				} else if(state.node && state.node.section ) {
					inverseSection = state.node.section;
				} else {
					inverseSection = state.textContentOnly || section;
				}
				inverseSection.inverse();
				return;
			}

			if(mode === "!") {
				return;
			}

			if(state.node && state.node.section) {

				makeRendererAndUpdateSection(state.node.section, mode, expression, lineNo);

				if(state.node.section.subSectionDepth() === 0){
					state.node.attributes.push( state.node.section.compile(copyState()) );
					delete state.node.section;
				}

			}
			// `{{}}` in an attribute like `class="{{}}"`
			else if(state.attr) {

				if(!state.attr.section) {
					state.attr.section = new text_section(filename);
					if(state.attr.value) {
						state.attr.section.add(state.attr.value);
					}
				}
				makeRendererAndUpdateSection(state.attr.section, mode, expression, lineNo);

			}
			// `{{}}` in a tag like `<div {{}}>`
			else if(state.node) {

				if(!state.node.attributes) {
					state.node.attributes = [];
				}
				if(!mode) {
					state.node.attributes.push(mustache_core.makeLiveBindingBranchRenderer(null, expression, copyState({ filename: section.filename, lineNo: lineNo })));
				} else if( mode === "#" || mode === "^" ) {
					if(!state.node.section) {
						state.node.section = new text_section(filename);
					}
					makeRendererAndUpdateSection(state.node.section, mode, expression, lineNo);
				} else {
					throw new Error(mode+" is currently not supported within a tag.");
				}
			}
			else {
				makeRendererAndUpdateSection(state.textContentOnly || section, mode, expression, lineNo);
			}
		},
		comment: function(text) {
			// create comment node
			section.add({
				comment: text
			});
		},
		done: function(lineNo){
			//!steal-remove-end
		}
	});

	var renderer = section.compile();

	var scopifiedRenderer = canObservationRecorder.ignore(function(scope, options){
		// if an object is passed to options, assume it is the helpers object
		if (options && !options.helpers && !options.partials && !options.tags) {
			options = {
				helpers: options
			};
		}
		// mark passed in helper so they will be automatically passed
		// helperOptions (.fn, .inverse, etc) when called as Call Expressions
		canReflect.eachKey(options && options.helpers, function(helperValue) {
			helperValue.requiresOptionsArgument = true;
		});

		// helpers, partials, tags, vars
		var templateContext$1 = new templateContext(options);

		// copy inline partials over
		canReflect.eachKey(inlinePartials, function(partial, partialName) {
			canReflect.setKeyValue(templateContext$1.partials, partialName, partial);
		});

		// allow the current renderer to be called with {{>scope.view}}
		canReflect.setKeyValue(templateContext$1, 'view', scopifiedRenderer);
		//!steal-remove-end


		// now figure out the final structure ...
		if ( !(scope instanceof canViewScope) ) {
			scope = new canViewScope(templateContext$1).add(scope);
		} else {
			// we are going to split ...
			var templateContextScope = new canViewScope(templateContext$1);
			templateContextScope._parent = scope._parent;
			scope._parent = templateContextScope;
		}

		return renderer(scope.addLetContext());
	});

	// Identify is a view type
	scopifiedRenderer[isViewSymbol] = true;

	return scopifiedRenderer;
}

// At this point, can.stache has been created
canAssign(stache, core);

stache.safeString = function(text){

	return canReflect.assignSymbols({},{
		"can.toDOM": function(){
			return text;
		}
	});
};
stache.async = function(source){
	var iAi = getIntermediateAndImports(source);
	var importPromises = iAi.imports.map(function(moduleName){
		return canImportModule(moduleName);
	});
	return Promise.all(importPromises).then(function(){
		return stache(iAi.intermediate);
	});
};
var templates = {};
stache.from = mustache_core.getTemplateById = function(id){
	if(!templates[id]) {
		var el = document$1().getElementById(id);
		if(el) {
			templates[id] = stache("#" + id, el.innerHTML);
		}
	}
	return templates[id];
};

stache.registerPartial = function(id, partial) {
	templates[id] = (typeof partial === "string" ? stache(partial) : partial);
};

stache.addBindings = canViewCallbacks.attrs;

var canStache = canNamespace.stache = stache;

var tag = canViewCallbacks.tag;



function setViewModel (element, viewModel) {
	element[canSymbol.for('can.viewModel')] = viewModel;
}

function processImport(el, tagData) {

	var moduleName = el.getAttribute("from");
	// If the module is part of the helpers pass that into can.import
	// as the parentName
	var templateModule = tagData.scope.get("scope.helpers.module");
	var parentName = templateModule ? templateModule.id : undefined;

	if(!moduleName) {
		return Promise.reject("No module name provided");
	}

	var importPromise = canImportModule(moduleName, parentName);
	importPromise.catch(function(err) {
		canLog.error(err);
	});

	// if this template was loaded by steal-stache, the module imported by this tag should already be loaded
	// we can provide it immediately by adding the `module` property to the tag viewModel
	var tagImportMap = tagData.scope.get("tagImportMap");
	if (tagImportMap && tagImportMap[moduleName]) {
		importPromise.module = tagImportMap[moduleName];

		// if a module binding is bound directly to a non-nested, undefined variable name, add it to the let context
		var moduleBindings = Array.prototype.filter.call(el.attributes, function(attr) {
			return /module(.*):to/.test(attr.name) && attr.value.indexOf('.') === -1 && !tagData.scope.find(attr.value);
		});
		var letContext = tagData.scope.getScope(function(scope) {
			return scope._meta.variable;
		});
		moduleBindings.forEach(function(attr) {
			// add null variable in closest let context. null var will be populated by binding.
			// causes binding to be made to let context rather defaulting bind to VM.
			letContext._context[attr.value] = null;
		});
	}

	// Set the viewModel to the promise
	setViewModel(el, importPromise);
	canDomData.set(el, "scope", importPromise);

	// Set the scope
	var scope = tagData.scope.add(importPromise, { notContext: true });

	// If there is a can-tag present we will hand-off rendering to that tag.
	var handOffTag = el.getAttribute("can-tag");

	if(handOffTag) {
		var callback = tag(handOffTag);

		// Verify hand off tag has been registered. Callback can be undefined or noop.
		if (!callback || callback === canViewCallbacks.defaultCallback) {
			//!steal-remove-start
			dev.error(new Error("The tag '" + handOffTag + "' has not been properly registered."));
			//!steal-remove-end
		} else {
			canDomData.set(el, "preventDataBindings", true);
			callback(el, canAssign(tagData, {
				scope: scope
			}));
			canDomData.set(el, "preventDataBindings", false);

			setViewModel(el, importPromise);
			canDomData.set(el, "scope", importPromise);
		}
	}
	else {

		var frag = tagData.subtemplate ?
			tagData.subtemplate(scope, tagData.options ) :
			document$1().createDocumentFragment();


		node_1.appendChild.call(el, frag);
	}
}

["can-import", "can-dynamic-import"].forEach(function(tagName) {
	tag(tagName, processImport.bind({ tagName: tagName }));
});

//!steal-remove-end

// Symbols
canSymbol.for("can.getChangesDependencyRecord");
var getValueSymbol = canSymbol.for("can.getValue");
var onValueSymbol$1 = canSymbol.for("can.onValue");
var onEmitSymbol$1 = canSymbol.for("can.onEmit");
var offEmitSymbol$1 = canSymbol.for("can.offEmit");
var setValueSymbol = canSymbol.for("can.setValue");
var canElementSymbol = canSymbol.for("can.element");

// Default implementations for setting the child and parent values
function defaultSetValue(newValue, observable) {
	canReflect.setValue(observable, newValue);
}

// onEmit function
function onEmit (listenToObservable, updateFunction, queue) {
	return listenToObservable[onEmitSymbol$1](updateFunction, queue);
}

// offEmit function
function offEmit (listenToObservable, updateFunction, queue) {
	return listenToObservable[offEmitSymbol$1](updateFunction, queue);
}

// Given an observable, stop listening to it and tear down the mutation dependencies
function turnOffListeningAndUpdate(listenToObservable, updateObservable, updateFunction, queue) {
	var offValueOrOffEmitFn;

	// Use either offValue or offEmit depending on which Symbols are on the `observable`
	if (listenToObservable[onValueSymbol$1]) {
		offValueOrOffEmitFn = canReflect.offValue;
	} else if (listenToObservable[onEmitSymbol$1]) {
		offValueOrOffEmitFn = offEmit;
	}

	if (offValueOrOffEmitFn) {
		offValueOrOffEmitFn(listenToObservable, updateFunction, queue);
		//!steal-remove-end
	}
}

// Given an observable, start listening to it and set up the mutation dependencies
function turnOnListeningAndUpdate(listenToObservable, updateObservable, updateFunction, queue) {
	var onValueOrOnEmitFn;

	// Use either onValue or onEmit depending on which Symbols are on the `observable`
	if (listenToObservable[onValueSymbol$1]) {
		onValueOrOnEmitFn = canReflect.onValue;
	} else if (listenToObservable[onEmitSymbol$1]) {
		onValueOrOnEmitFn = onEmit;
	}

	if (onValueOrOnEmitFn) {
		onValueOrOnEmitFn(listenToObservable, updateFunction, queue);

		//!steal-remove-end
	}
}

// Semaphores are used to keep track of updates to the child & parent
// For debugging purposes, Semaphore and Bind are highly coupled.
function Semaphore(binding, type) {
	this.value = 0;
	this._binding = binding;
	this._type = type;
}
canAssign(Semaphore.prototype, {
	decrement: function() {
		this.value -= 1;
	},
	increment: function(args) {
		this._incremented = true;
		this.value += 1;
		//!steal-remove-end
	}
});

function Bind(options) {
	this._options = options;
	//!steal-remove-end

	// queue; by default, domUI
	if (options.queue === undefined) {
		if(options.element) {
			options.queue = "dom";
		} else {
			options.queue = "domUI";
		}

	}

	// cycles: when an observable is set in a two-way binding, it can update the
	// other bound observable, which can then update the original observable the
	// “cycles” number of times. For example, a child is set and updates the parent;
	// with cycles: 0, the parent could not update the child;
	// with cycles: 1, the parent could update the child, which can update the parent
	// with cycles: 2, the parent can update the child again, and so on and so forth…
	if (options.cycles > 0 === false) {
		options.cycles = 0;
	}

	// onInitDoNotUpdateChild is false by default
	options.onInitDoNotUpdateChild =
		typeof options.onInitDoNotUpdateChild === "boolean" ?
			options.onInitDoNotUpdateChild
			: false;

	// onInitDoNotUpdateParent is false by default
	options.onInitDoNotUpdateParent =
		typeof options.onInitDoNotUpdateParent === "boolean" ?
			options.onInitDoNotUpdateParent
			: false;

	// onInitSetUndefinedParentIfChildIsDefined is true by default
	options.onInitSetUndefinedParentIfChildIsDefined =
		typeof options.onInitSetUndefinedParentIfChildIsDefined === "boolean" ?
			options.onInitSetUndefinedParentIfChildIsDefined
			: true;

	// The way the cycles are tracked is through semaphores; currently, when
	// either the child or parent is updated, we increase their respective
	// semaphore so that if it’s two-way binding, then the “other” observable
	// will only update if the total count for both semaphores is less than or
	// equal to twice the number of cycles (because a cycle means two updates).
	var childSemaphore = new Semaphore(this,"child");
	var parentSemaphore = new Semaphore(this,"parent");

	// Determine if this is a one-way or two-way binding; by default, accept
	// whatever options are passed in, but if they’re not defined, then check for
	// the getValue and setValue symbols on the child and parent values.
	var childToParent = true;
	if (typeof options.childToParent === "boolean") {
		// Always let the option override any checks
		childToParent = options.childToParent;
	} else if (options.child[getValueSymbol] == null) {
		// Child to parent won’t work if we can’t get the child’s value
		childToParent = false;
	} else if (options.setParent === undefined && options.parent[setValueSymbol] == null) {
		// Child to parent won’t work if we can’t set the parent’s value
		childToParent = false;
	}
	var parentToChild = true;
	if (typeof options.parentToChild === "boolean") {
		// Always let the option override any checks
		parentToChild = options.parentToChild;
	} else if (options.parent[getValueSymbol] == null) {
		// Parent to child won’t work if we can’t get the parent’s value
		parentToChild = false;
	} else if (options.setChild === undefined && options.child[setValueSymbol] == null) {
		// Parent to child won’t work if we can’t set the child’s value
		parentToChild = false;
	}
	if (childToParent === false && parentToChild === false) {
		throw new Error("Neither the child nor parent will be updated; this is a no-way binding");
	}
	this._childToParent = childToParent;
	this._parentToChild = parentToChild;

	// Custom child & parent setters can be supplied; if they aren’t provided,
	// then create our own.
	if (options.setChild === undefined) {
		options.setChild = defaultSetValue;
	}
	if (options.setParent === undefined) {
		options.setParent = defaultSetValue;
	}

	// Set the observables’ priority
	if (options.priority !== undefined) {
		canReflect.setPriority(options.child, options.priority);
		canReflect.setPriority(options.parent, options.priority);
	}

	// These variables keep track of how many updates are allowed in a cycle.
	// cycles is multipled by two because one update is allowed for each side of
	// the binding, child and parent. One more update is allowed depending on the
	// sticky option; if it’s sticky, then one more update needs to be allowed.
	var allowedUpdates = options.cycles * 2;
	var allowedChildUpdates = allowedUpdates + (options.sticky === "childSticksToParent" ? 1 : 0);
	var allowedParentUpdates = allowedUpdates + (options.sticky === "parentSticksToChild" ? 1 : 0);

	// This keeps track of whether we’re bound to the child and/or parent; this
	// allows startParent() to be called first and on() can be called later to
	// finish setting up the child binding. This is also checked when updating
	// values; if stop() has been called but updateValue() is called, then we
	// ignore the update.
	this._bindingState = {
		child: false,
		parent: false
	};

	// This is the listener that’s called when the parent changes
	this._updateChild = function(newValue) {
		updateValue.call(this, {
			bindingState: this._bindingState,
			newValue: newValue,

			// Some options used for debugging
			debugObservableName: "child",
			debugPartnerName: "parent",

			// Main observable values
			observable: options.child,
			setValue: options.setChild,
			semaphore: childSemaphore,

			// If the sum of the semaphores is less than or equal to this number, then
			// it’s ok to update the child with the new value.
			allowedUpdates: allowedChildUpdates,

			// If options.sticky === "parentSticksToChild", then after the parent sets
			// the child, check to see if the child matches the parent; if not, then
			// set the parent to the child’s value. This is used in cases where the
			// child modifies its own value and the parent should be kept in sync with
			// the child.
			sticky: options.sticky === "parentSticksToChild",

			// Partner observable values
			partner: options.parent,
			setPartner: options.setParent,
			partnerSemaphore: parentSemaphore
		});
	}.bind(this);

	// This is the listener that’s called when the child changes
	this._updateParent = function(newValue) {
		updateValue.call(this, {
			bindingState: this._bindingState,
			newValue: newValue,

			// Some options used for debugging
			debugObservableName: "parent",
			debugPartnerName: "child",

			// Main observable values
			observable: options.parent,
			setValue: options.setParent,
			semaphore: parentSemaphore,

			// If the sum of the semaphores is less than or equal to this number, then
			// it’s ok to update the parent with the new value.
			allowedUpdates: allowedParentUpdates,

			// If options.sticky === "childSticksToParent", then after the child sets
			// the parent, check to see if the parent matches the child; if not, then
			// set the child to the parent’s value. This is used in cases where the
			// parent modifies its own value and the child should be kept in sync with
			// the parent.
			sticky: options.sticky === "childSticksToParent",

			// Partner observable values
			partner: options.child,
			setPartner: options.setChild,
			partnerSemaphore: childSemaphore
		});
	}.bind(this);

	if(options.element) {
		this._updateChild[canElementSymbol] = this._updateParent[canElementSymbol] = options.element;
	}
	//!steal-remove-end

}

Object.defineProperty(Bind.prototype, "parentValue", {
	get: function() {
		return canReflect.getValue(this._options.parent);
	}
});

canAssign(Bind.prototype, {

	// Turn on any bindings that haven’t already been enabled;
	// also update the child or parent if need be.
	start: function() {
		var childValue;
		var options = this._options;
		var parentValue;

		// The tests don’t show that it matters which is bound first, but we’ll
		// bind to the parent first to stay consistent with how
		// can-stache-bindings did things.
		this.startParent();
		this.startChild();

		// Initialize the child & parent values
		if (this._childToParent === true && this._parentToChild === true) {
			// Two-way binding
			parentValue = canReflect.getValue(options.parent);
			if (parentValue === undefined) {
				childValue = canReflect.getValue(options.child);
				if (childValue === undefined) {
					// Check if updating the child is allowed
					if (options.onInitDoNotUpdateChild === false) {
						this._updateChild(parentValue);
					}
				} else if (options.onInitDoNotUpdateParent === false && options.onInitSetUndefinedParentIfChildIsDefined === true) {
					this._updateParent(childValue);
				}
			} else {
				// Check if updating the child is allowed
				if (options.onInitDoNotUpdateChild === false) {
					this._updateChild(parentValue);
				}
			}
			//!steal-remove-end

		} else if (this._childToParent === true) {
			// One-way child -> parent, so update the parent
			// Check if we are to initialize the parent
			if (options.onInitDoNotUpdateParent === false) {
				childValue = canReflect.getValue(options.child);
				this._updateParent(childValue);
			}

		} else if (this._parentToChild === true) {
			// One-way parent -> child, so update the child
			// Check if updating the child is allowed
			if (options.onInitDoNotUpdateChild === false) {
				parentValue = canReflect.getValue(options.parent);
				this._updateChild(parentValue);
			}
		}
	},

	// Listen for changes to the child observable and update the parent
	startChild: function() {
		if (this._bindingState.child === false && this._childToParent === true) {
			var options = this._options;
			this._bindingState.child = true;
			turnOnListeningAndUpdate(options.child, options.parent, this._updateParent, options.queue);
		}
	},

	// Listen for changes to the parent observable and update the child
	startParent: function() {
		if (this._bindingState.parent === false && this._parentToChild === true) {
			var options = this._options;
			this._bindingState.parent = true;
			turnOnListeningAndUpdate(options.parent, options.child, this._updateChild, options.queue);
		}
	},

	// Turn off all the bindings
	stop: function() {
		var bindingState = this._bindingState;
		var options = this._options;

		// Turn off the parent listener
		if (bindingState.parent === true && this._parentToChild === true) {
			bindingState.parent = false;
			turnOffListeningAndUpdate(options.parent, options.child, this._updateChild, options.queue);
		}

		// Turn off the child listener
		if (bindingState.child === true && this._childToParent === true) {
			bindingState.child = false;
			turnOffListeningAndUpdate(options.child, options.parent, this._updateParent, options.queue);
		}
	}

});

["parent", "child"].forEach(function(property){
	Object.defineProperty(Bind.prototype, property, {
		get: function(){
			return this._options[property];
		}
	});
});



// updateValue is a helper function that’s used by updateChild and updateParent
function updateValue(args) {
	/* jshint validthis: true */
	// Check to see whether the binding is active; ignore updates if it isn’t active
	var bindingState = args.bindingState;
	if (bindingState.child === false && bindingState.parent === false) {
		// We don’t warn the user about this because it’s a common occurrence in
		// can-stache-bindings, e.g. {{#if value}}<input value:bind="value"/>{{/if}}
		return;
	}

	// Now check the semaphore; if this change is happening because the partner
	// observable was just updated, we only want to update this observable again
	// if the total count for both semaphores is less than or equal to the number
	// of allowed updates.
	var semaphore = args.semaphore;
	if ((semaphore.value + args.partnerSemaphore.value) <= args.allowedUpdates) {
		canQueues.batch.start();

		// Increase the semaphore so that when the batch ends, if an update to the
		// partner observable’s value is made, then it won’t update this observable
		// again unless cycles are allowed.
		semaphore.increment(args);

		// Update the observable’s value; this uses either a custom function passed
		// in when the binding was initialized or canReflect.setValue.
		args.setValue(args.newValue, args.observable);



		// Decrease the semaphore after all other updates have occurred
		canQueues.mutateQueue.enqueue(semaphore.decrement, semaphore, []);

		canQueues.batch.stop();

		// Stickiness is used in cases where the call to args.setValue above might
		// have resulted in the observable being set to a different value than what
		// was passed into this function (args.newValue). If sticky:true, then set
		// the partner observable’s value so they’re kept in sync.
		if (args.sticky) {
			var observableValue = canReflect.getValue(args.observable);
			if (observableValue !== canReflect.getValue(args.partner)) {
				args.setPartner(observableValue, args.partner);
			}
		}

	}
}

var canBind = canNamespace.Bind = Bind;

var viewModelSymbol$1 = canSymbol.for('can.viewModel');

var canViewModel = canNamespace.viewModel = function (el, attr, val) {
	if (typeof el === "string") {
		el = document$1().querySelector(el);
	} else if (canReflect.isListLike(el) && !el.nodeType) {
		el = el[0];
	}

	if (canReflect.isObservableLike(attr) && canReflect.isMapLike(attr)) {
		el[viewModelSymbol$1] = attr;
		return;
	}

	var scope = el[viewModelSymbol$1];
	if(!scope) {
		scope = new canSimpleMap();
		el[viewModelSymbol$1] = scope;
	}
	switch (arguments.length) {
		case 0:
		case 1:
			return scope;
		case 2:
			return canReflect.getKeyValue(scope, attr);
		default:
			canReflect.setKeyValue(scope, attr, val);
			return el;
	}
};

var isDomEventTarget = util.isDomEventTarget;

var canEvent = {
	on: function on(eventName, handler, queue) {
		if (isDomEventTarget(this)) {
			canDomEvents.addEventListener(this, eventName, handler, queue);
		} else {
			canReflect.onKeyValue(this, eventName, handler, queue);
		}
	},
	off: function off(eventName, handler, queue) {
		if (isDomEventTarget(this)) {
			canDomEvents.removeEventListener(this, eventName, handler, queue);
		} else {
			canReflect.offKeyValue(this, eventName, handler, queue);
		}
	},
	one: function one(event, handler, queue) {
		// Unbind the listener after it has been executed
		var one = function() {
			canEvent.off.call(this, event, one, queue);
			return handler.apply(this, arguments);
		};

		// Bind the altered listener
		canEvent.on.call(this, event, one, queue);
		return this;
	}
};

var event = canEvent;

var isRadioInput$1 = function isRadioInput(el) {
	return el.nodeName.toLowerCase() === "input" && el.type === "radio";
};

// Determine the event or events we need to listen to when this value changes.
var getEventName$1 = function getEventName(el, prop) {
	var event = "change";

	if (isRadioInput$1(el) && prop === "checked" ) {
		event = "can-attribute-observable-radiochange";
	}

	if (behaviors$1.findSpecialListener(prop)) {
		event = prop;
	}

	return event;
};

function getRoot () {
	return document$1().documentElement;
}

function findParentForm (el) {
	while (el) {
		if (el.nodeName === 'FORM') {
			break;
		}
		el = el.parentNode;
	}
	return el;
}

function shouldReceiveEventFromRadio (source, dest) {
	// Must have the same name attribute and parent form
	var name = source.getAttribute('name');
	return (
		name &&
		name === dest.getAttribute('name') &&
		findParentForm(source) === findParentForm(dest)
	);
}

function isRadioInput (el) {
	return el.nodeName === 'INPUT' && el.type === 'radio';
}


function attachRootListener (domEvents, eventTypeTargets) {
	var root = getRoot();
	var newListener = function (event) {
		var target = event.target;
		if (!isRadioInput(target)) {
			return;
		}

		for (var eventType in eventTypeTargets) {
			var newEvent = {type: eventType};
			var listeningNodes = eventTypeTargets[eventType];
			listeningNodes.forEach(function (el) {
				if (shouldReceiveEventFromRadio(target, el)) {
					domEvents.dispatch(el, newEvent, false);
				}
			});
		}
	};
	domEvents.addEventListener(root, 'change', newListener);
	return newListener;
}

function detachRootListener (domEvents, listener) {
	var root = getRoot();
	domEvents.removeEventListener(root, 'change', listener);
}

/**
 * @module {events} can-event-dom-radiochange
 * @parent can-dom-utilities
 * @collection can-infrastructure
 * @package ./package.json
 *
 * A custom event for listening to changes of inputs with type "radio",
 * which fires when a conflicting radio input changes. A "conflicting"
 * radio button has the same "name" attribute and exists within in the
 * same form, or lack thereof. This event coordinates state bound to
 * whether a radio is checked. The "change" event does not fire for deselected
 * radios. By using this event instead, deselected radios receive notification.
 *
 * ```js
 * var domEvents = require('can-dom-events');
 * var radioChange = require('can-event-dom-radiochange');
 * domEvents.addEvent(radioChange);
 *
 * var target = document.createElement('input');
 *
 * function handler () {
 * 	console.log('radiochange event fired');
 * }
 *
 * domEvents.addEventListener(target, 'radiochange', handler);
 * domEvents.removeEventListener(target, 'radiochange', handler);
 * ```
 */
var radioChangeEvent = {
	defaultEventType: 'radiochange',

	addEventListener: function (target, eventType, handler) {
		if (!isRadioInput(target)) {
			throw new Error('Listeners for ' + eventType + ' must be radio inputs');
		}

		var eventTypeTrackedRadios = radioChangeEvent._eventTypeTrackedRadios;
		if (!eventTypeTrackedRadios) {
			eventTypeTrackedRadios = radioChangeEvent._eventTypeTrackedRadios = {};
			if (!radioChangeEvent._rootListener) {
				radioChangeEvent._rootListener = attachRootListener(this, eventTypeTrackedRadios);
			}			
		}

		var trackedRadios = radioChangeEvent._eventTypeTrackedRadios[eventType];
		if (!trackedRadios) {
			trackedRadios = radioChangeEvent._eventTypeTrackedRadios[eventType] = new Set();
		}

		trackedRadios.add(target);
		target.addEventListener(eventType, handler);
	},

	removeEventListener: function (target, eventType, handler) {
		target.removeEventListener(eventType, handler);

		var eventTypeTrackedRadios = radioChangeEvent._eventTypeTrackedRadios;
		if (!eventTypeTrackedRadios) {
			return;
		}

		var trackedRadios = eventTypeTrackedRadios[eventType];
		if (!trackedRadios) {
			return;
		}
	
		trackedRadios.delete(target);
		if (trackedRadios.size === 0) {
			delete eventTypeTrackedRadios[eventType];
			for (var key in eventTypeTrackedRadios) {
				if (eventTypeTrackedRadios.hasOwnProperty(key)) {
					return;
				}						
			}
			delete radioChangeEvent._eventTypeTrackedRadios;
			detachRootListener(this, radioChangeEvent._rootListener);
			delete radioChangeEvent._rootListener;
		}
	}
};

var canEventDomRadiochange = canNamespace.domEventRadioChange = radioChangeEvent;

var onValueSymbol = canSymbol.for('can.onValue');
var offValueSymbol = canSymbol.for('can.offValue');
var onEmitSymbol = canSymbol.for('can.onEmit');
var offEmitSymbol = canSymbol.for('can.offEmit');

// We register a namespaced radiochange event with the global
// event registry so it does not interfere with user-defined events.


var internalRadioChangeEventType = "can-attribute-observable-radiochange";
canDomEvents.addEvent(canEventDomRadiochange, internalRadioChangeEventType);

var isSelect = function isSelect(el) {
	return el.nodeName.toLowerCase() === "select";
};

var isMultipleSelect = function isMultipleSelect(el, prop) {
	return isSelect(el) && prop === "value" && el.multiple;
};

var slice = Array.prototype.slice;

function canUtilAEL () {
	var args = slice.call(arguments, 0);
	args.unshift(this);
	return canDomEvents.addEventListener.apply(null, args);
}

function canUtilREL () {
	var args = slice.call(arguments, 0);
	args.unshift(this);
	return canDomEvents.removeEventListener.apply(null, args);
}

function AttributeObservable(el, prop, bindingData, event) {
	if(typeof bindingData === "string") {
		event = bindingData;
		bindingData = undefined;
	}

	this.el = el;
	this.bound = false;
	this.prop = isMultipleSelect(el, prop) ? "values" : prop;
	this.event = event || getEventName$1(el, prop);
	this.handler = this.handler.bind(this);

	// If we have an event
	// remove onValue/offValue and add onEvent
	if (event !== undefined) {
		this[onValueSymbol] = null;
		this[offValueSymbol] = null;
		this[onEmitSymbol] = AttributeObservable.prototype.on;
		this[offEmitSymbol] = AttributeObservable.prototype.off;
	}
	//!steal-remove-end
}

AttributeObservable.prototype = Object.create(settable.prototype);

canAssign(AttributeObservable.prototype, {
	constructor: AttributeObservable,

	get: function get() {
		if (canObservationRecorder.isRecording()) {
			canObservationRecorder.add(this);
			if (!this.bound) {
				canObservation.temporarilyBind(this);
			}
		}
		var value = behaviors$1.get(this.el, this.prop);
		if (typeof value === 'function') {
			value = value.bind(this.el);
		}
		return value;
	},

	set: function set(newVal) {
		var setterDispatchedEvents = behaviors$1.setAttrOrProp(this.el, this.prop, newVal);
		// update the observation internal value
		if(!setterDispatchedEvents) {
			this._value = newVal;
		}


		return newVal;
	},

	handler: function handler(newVal, event) {
		var old = this._value;
		var queuesArgs = [];
		this._value = behaviors$1.get(this.el, this.prop);

		// If we have an event then we want to enqueue on all changes
		// otherwise only enquue when there are changes to the value
		if (event !== undefined || this._value !== old) {
			//!steal-remove-end


			queuesArgs = [
				this.handlers.getNode([]),
  			this,
  			[newVal, old]
  		];
			//!steal-remove-end
			// adds callback handlers to be called w/i their respective queue.
			canQueues.enqueueByQueue.apply(canQueues, queuesArgs);
		}
	},

	onBound: function onBound() {
		var observable = this;

		observable.bound = true;

		// make sure `this.handler` gets the new value instead of
		// the event object passed to the event handler
		observable._handler = function(event) {
			observable.handler(behaviors$1.get(observable.el, observable.prop), event);
		};

		if (observable.event === internalRadioChangeEventType) {
			event.on.call(observable.el, "change", observable._handler);
		}

		var specialBinding = behaviors$1.findSpecialListener(observable.prop);
		if (specialBinding) {
			observable._specialDisposal = specialBinding.call(observable.el, observable.prop, observable._handler, canUtilAEL);
		}

		event.on.call(observable.el, observable.event, observable._handler);

		// initial value
		this._value = behaviors$1.get(this.el, this.prop);
	},

	onUnbound: function onUnbound() {
		var observable = this;

		observable.bound = false;

		if (observable.event === internalRadioChangeEventType) {
			event.off.call(observable.el, "change", observable._handler);
		}

		if (observable._specialDisposal) {
			observable._specialDisposal.call(observable.el, canUtilREL);
			observable._specialDisposal = null;
		}

		event.off.call(observable.el, observable.event, observable._handler);
	},

	valueHasDependencies: function valueHasDependencies() {
		return true;
	},

	getValueDependencies: function getValueDependencies() {
		var m = new Map();
		var s = new Set();
		s.add(this.prop);
		m.set(this.el, s);
		return {
			keyDependencies: m
		};
	}
});

canReflect.assignSymbols(AttributeObservable.prototype, {
	"can.isMapLike": false,
	"can.getValue": AttributeObservable.prototype.get,
	"can.setValue": AttributeObservable.prototype.set,
	"can.onValue": AttributeObservable.prototype.on,
	"can.offValue": AttributeObservable.prototype.off,
	"can.valueHasDependencies": AttributeObservable.prototype.hasDependencies,
	"can.getValueDependencies": AttributeObservable.prototype.getValueDependencies
});

var canAttributeObservable = AttributeObservable;

// # can-stache-bindings.js
//
// This module provides CanJS's default data and event bindings.
// It's broken up into several parts:
//
// - Behaviors - Binding behaviors that run given an attribute or element.
// - Attribute Syntaxes - Hooks up custom attributes to their behaviors.
// - getObservableFrom - Methods that return a observable cross bound to the scope, viewModel, or element.
// - bind - Methods for setting up cross binding
// - getBindingInfo - A helper that returns the details of a data binding given an attribute.
// - makeDataBinding - A helper method for setting up a data binding.
// - initializeValues - A helper that initializes a data binding.























// Contains all of the stache bindings that will be exported.
var bindings = new Map();

var onMatchStr = "on:",
	vmMatchStr = "vm:",
	elMatchStr = "el:",
	byMatchStr = ":by:",
	toMatchStr = ":to",
	fromMatchStr = ":from",
	bindMatchStr = ":bind",
	viewModelBindingStr = "viewModel",
	attributeBindingStr = "attribute",
	scopeBindingStr = "scope",
	viewModelOrAttributeBindingStr = "viewModelOrAttribute",
	viewModelSymbol = canSymbol.for("can.viewModel"),
	preventDataBindingsSymbol = canSymbol.for("can.preventDataBindings");

var throwOnlyOneTypeOfBindingError = function() {
	throw new Error("can-stache-bindings - you can not have contextual bindings ( this:from='value' ) and key bindings ( prop:from='value' ) on one element.");
};

// This function checks if there bindings that are trying
// to set a property ON the viewModel _conflicting_ with bindings trying to
// set THE viewModel ITSELF.
// If there is a conflict, an error is thrown.
var checkBindingState = function(bindingState, siblingBindingData) {
	var isSettingOnViewModel = siblingBindingData.parent.exports && siblingBindingData.child.source === viewModelBindingStr;
	if (isSettingOnViewModel) {
		var bindingName = siblingBindingData.child.name;
		var isSettingViewModel = isSettingOnViewModel && ( bindingName === 'this' || bindingName === '.' );

		if (isSettingViewModel) {
			if (bindingState.isSettingViewModel || bindingState.isSettingOnViewModel) {
				throwOnlyOneTypeOfBindingError();
			} else {
				return {
					isSettingViewModel: true,
					initialViewModelData: undefined
				};
			}
		} else {
			// just setting on viewModel
			if (bindingState.isSettingViewModel) {
				throwOnlyOneTypeOfBindingError();
			} else {
				return {
					isSettingOnViewModel: true,
					initialViewModelData: bindingState.initialViewModelData
				};
			}
		}
	} else {
		return bindingState;
	}
};

var getEventBindingData = function (attributeName, el, scope) {
	var bindingCode = attributeName.substr(onMatchStr.length);
	var viewModel = el && el[viewModelSymbol];
	var elUsed = startsWith.call(bindingCode, elMatchStr);
	var vmUsed = startsWith.call(bindingCode, vmMatchStr);
	var byUsed = bindingCode.indexOf(byMatchStr) > -1;
	var scopeUsed;

	// The values being returned
	var bindingContext;
	var eventName;
	var bindingContextObservable;
	var shortBindingCode = "";

	// if explicit context is specified, trim the string down
	// else, determine value of which scope being used elUsed, vmUsed, scopeUsed
	if (vmUsed) {
		shortBindingCode = "vm";
		bindingCode = bindingCode.substr(vmMatchStr.length);
	} else if (elUsed) {
		shortBindingCode = "el";
		bindingCode = bindingCode.substr(elMatchStr.length);
	} else if (!vmUsed && !elUsed) {
		if (byUsed) {
			scopeUsed = true;
		} else if (viewModel)  {
			vmUsed = true;
		} else {
			elUsed = true;
		}
	}

	// if by is used, take the appropriate path to determine the bindingContext
	// and create the bindingKeyValue
	var bindingContextKey;
	if (byUsed) {
		var byIndex = bindingCode.indexOf(byMatchStr);
		bindingContextKey = bindingCode.substr(byIndex + byMatchStr.length);
		bindingCode = bindingCode.substr(0, byIndex);
	}
	eventName = bindingCode;
	if (elUsed) {
		if (byUsed) {
			throw new Error('binding with :by in element scope is not currently supported');
		} else {
			bindingContext = el;
		}
	} else if (vmUsed) {
		bindingContext = viewModel;
		if (byUsed) {
			bindingContext = viewModel.get(bindingContextKey);
			bindingContextObservable = new canViewScope(viewModel).computeData(bindingContextKey);
		}
	} else if (scopeUsed) {
		bindingContext = scope;
		if (byUsed) {
			bindingContext = bindingContext.get(bindingContextKey);
			bindingContextObservable = scope.computeData(bindingContextKey);
		}
	}

	return {
		// single observable object to listen to eventName directly on one observable object
		bindingContext: bindingContext,
		// this observable emits the bindingContext
		bindingContextObservable: bindingContextObservable,
		// the eventName string
		eventName: eventName,
		// which binding code was explicitly set by the user
		bindingCode: shortBindingCode,
	};
};

var onKeyValueSymbol = canSymbol.for("can.onKeyValue");
var makeScopeFromEvent = function(element, event, viewModel, args, data, bindingContext){
	// TODO: Remove in 6.0.  In 4 and 5 arguments were wrong.
	var shiftArgumentsForLegacyArguments = bindingContext && bindingContext[onKeyValueSymbol] !== undefined;

	var specialValues = {
		element: element,
		event: event,
		viewModel: viewModel,
		arguments: shiftArgumentsForLegacyArguments ? Array.prototype.slice.call(args, 1) : args,
		args: args
	};

	// make a scope with these things just under
	return data.scope.add(specialValues, { special: true });
};

var runEventCallback = function (el, ev, data, scope, expr, attributeName, attrVal) {
	// create "special" values that can be looked up using
	// {{scope.element}}, etc

	var updateFn = function() {
		var value = expr.value(scope, {
			doNotWrapInObservation: true
		});

		value = canReflect.isValueLike(value) ?
			canReflect.getValue(value) :
			value;

		return typeof value === 'function' ?
			value(el) :
			value;
	};
	//!steal-remove-end

	canQueues.batch.start();
	var mutateQueueArgs = [];
	mutateQueueArgs = [
		updateFn,
		null,
		null,
		{}
	];
	//!steal-remove-end
	canQueues.mutateQueue.enqueue.apply(canQueues.mutateQueue, mutateQueueArgs);
	canQueues.batch.stop();
};

// ## Behaviors
var behaviors = {
	// ## completeBindings
	// Given a list of bindings, initializes the bindings, then the viewModel then completes the bindings.
	// Arguments:
	// - bindings  - An array of `{binding, siblingBindingData}`
	// - initialViewModelData - Extra initial viewModel values
	// - makeViewModel - `makeViewModel(props, hasBindings, bindingsState)`
	// - bindingContext - optional, `{scope}`
	// Returns:
	// `{viewModel, onTeardowns, bindingsState}`
	initializeViewModel: function(bindings, initialViewModelData, makeViewModel, bindingContext) {

		var onCompleteBindings = [],
			onTeardowns = {};

		var bindingsState = {
			// if we have a binding like {something}="foo"
			isSettingOnViewModel: false,
			// if we have binding like {this}="bar"
			isSettingViewModel: false,
			initialViewModelData: initialViewModelData || {}
		};

		bindings.forEach(function(dataBinding){
			// Immediately bind to the parent so we can read its value
			dataBinding.binding.startParent();

			var siblingBindingData = dataBinding.siblingBindingData;
			bindingsState = checkBindingState(bindingsState, siblingBindingData);

			// For bindings that change the viewModel,
			// save the initial value on the viewModel.
			if (siblingBindingData.parent.exports) {

				var parentValue = siblingBindingData.child.setCompute ? makeComputeLike(dataBinding.binding.parent) : dataBinding.binding.parentValue;

				if (parentValue !== undefined) {

					if (bindingsState.isSettingViewModel) {
						// the initial data is the context
						// TODO: this is covered by can-component’s tests but not can-stache-bindings’ tests
						bindingsState.initialViewModelData = parentValue;
					} else {
						bindingsState.initialViewModelData[cleanVMName(siblingBindingData.child.name, bindingContext.scope)] = parentValue;
					}

				}
			}

			// Save what needs to happen after the `viewModel` is created.
			onCompleteBindings.push(dataBinding.binding.start.bind(dataBinding.binding));

			onTeardowns[siblingBindingData.bindingAttributeName] = dataBinding.binding.stop.bind(dataBinding.binding);
		});

		var viewModel = makeViewModel(bindingsState.initialViewModelData, bindings.length > 0, bindingsState);

		// bind on the viewModel so we can updat ethe parent
		for (var i = 0, len = onCompleteBindings.length; i < len; i++) {
			onCompleteBindings[i]();
		}
		return {viewModel: viewModel, onTeardowns: onTeardowns, bindingsState: bindingsState};
	},
	// ### bindings.behaviors.viewModel
	// Sets up all of an element's data binding attributes to a "soon-to-be-created"
	// `viewModel`.
	// This is primarily used by `Component` to ensure that its
	// `viewModel` is initialized with values from the data bindings as quickly as possible.
	// Component could look up the data binding values itself.  However, that lookup
	// would have to be duplicated when the bindings are established.
	// Instead, this uses the `makeDataBinding` helper, which allows creation of the `viewModel`
	// after scope values have been looked up.
	//
	// Arguments:
	// - `makeViewModel(initialViewModelData)` - a function that returns the `viewModel`.
	// - `initialViewModelData` any initial data that should already be added to the `viewModel`.
	//
	// Returns:
	// - `function` - a function that tears all the bindings down. Component
	// wants all the bindings active so cleanup can be done during a component being removed.
	viewModel: function(el, tagData, makeViewModel, initialViewModelData, staticDataBindingsOnly) {

		var attributeViewModelBindings = canAssign({}, initialViewModelData),

			// The data around the binding.
			bindingContext = canAssign({
				element: el,
				// this gets defined later
				viewModel: undefined
			}, tagData),

			// global settings for the bindings
			bindingSettings = {
				attributeViewModelBindings: attributeViewModelBindings,
				alreadyUpdatedChild: true,
				// force viewModel bindings in cases when it is ambiguous whether you are binding
				// on viewModel or an attribute (:to, :from, :bind)
				favorViewModel: true
			},
			dataBindings = [];

		// For each attribute, we create a dataBinding object.
		// These look like: `{binding, siblingBindingData}`
		canReflect.eachListLike(el.attributes || [], function(node) {
			var dataBinding = makeDataBinding(node, bindingContext, bindingSettings);

			if (dataBinding) {
				dataBindings.push(dataBinding);
			}
		});

		// If there are no binding, exit.
		if (staticDataBindingsOnly && dataBindings.length === 0) {
			return;
		}

		// Initialize the viewModel
		var completedData = behaviors.initializeViewModel(dataBindings, initialViewModelData, function(){
			// we need to make sure we have the viewModel available
			bindingContext.viewModel = makeViewModel.apply(this, arguments);
		}, bindingContext),
			onTeardowns = completedData.onTeardowns,
			bindingsState = completedData.bindingsState,
			siblingBindingDatas = {};


		// Listen to attribute changes and re-initialize
		// the bindings.
		var attributeDisposal;
		if (!bindingsState.isSettingViewModel) {
			// We need to update the child on any new bindings.
			bindingSettings.alreadyUpdatedChild = false;
			attributeDisposal = canDomMutate.onNodeAttributeChange(el, function(ev) {
				var attrName = ev.attributeName,
					value = el.getAttribute(attrName);

				if (onTeardowns[attrName]) {
					onTeardowns[attrName]();
				}
				// Parent attribute bindings we always re-setup.
				var parentBindingWasAttribute = siblingBindingDatas[attrName] && siblingBindingDatas[attrName].parent.source === attributeBindingStr;

				if (value !== null || parentBindingWasAttribute) {
					var dataBinding = makeDataBinding({
						name: attrName,
						value: value
					}, bindingContext, bindingSettings);
					if (dataBinding) {
						// The viewModel is created, so call callback immediately.
						dataBinding.binding.start();
						siblingBindingDatas[attrName] = dataBinding.siblingBindingData;
						onTeardowns[attrName] = dataBinding.binding.stop.bind(dataBinding.binding);
					}
				}
			});
		}

		return function() {
			if (attributeDisposal) {
				attributeDisposal();
				attributeDisposal = undefined;
			}
			for (var attrName in onTeardowns) {
				onTeardowns[attrName]();
			}
		};
	},
	// ### bindings.behaviors.data
	// This is called when an individual data binding attribute is placed on an element.
	// For example `{^value}="name"`.
	data: function(el, attrData) {
		if (el[preventDataBindingsSymbol] === true || canDomData.get(el, "preventDataBindings")) {
			return;
		}
		var viewModel,
			getViewModel = canObservationRecorder.ignore(function() {
				return viewModel || (viewModel = canViewModel(el));
			}),
			teardown,
			attributeDisposal,
			removedDisposal,
			bindingContext = {
				element: el,
				templateType: attrData.templateType,
				scope: attrData.scope,
				parentNodeList: attrData.nodeList,
				get viewModel(){
					return getViewModel();
				}
			};

		// Setup binding
		var dataBinding = makeDataBinding({
			name: attrData.attributeName,
			value: el.getAttribute(attrData.attributeName),
		}, bindingContext, {
			syncChildWithParent: false
		});
		//!steal-remove-end

		// Flag to prevent start binding twice in dev mode
		var started = false;
		//!steal-remove-end

		if (!started) {
			dataBinding.binding.start();
			started = true;
		}

		var attributeListener = function(ev) {
			var attrName = ev.attributeName,
				value = el.getAttribute(attrName);

			if (attrName === attrData.attributeName) {
				if (teardown) {
					teardown();
				}

				if(value !== null  ) {
					var dataBinding = makeDataBinding({name: attrName, value: value}, bindingContext, {
						syncChildWithParent: false
					});
					if(dataBinding) {
						// The viewModel is created, so call callback immediately.
						dataBinding.binding.start();
						teardown = dataBinding.binding.stop.bind(dataBinding.binding);
					}
					teardown = dataBinding.onTeardown;
				}
			}
		};


		var tearItAllDown = function() {
			if (teardown) {
				teardown();
				teardown = undefined;
			}

			if (removedDisposal) {
				removedDisposal();
				removedDisposal = undefined;
			}
			if (attributeDisposal) {
				attributeDisposal();
				attributeDisposal = undefined;
			}
		};



		// Listen for changes
		teardown = dataBinding.binding.stop.bind(dataBinding.binding);

		attributeDisposal = canDomMutate.onNodeAttributeChange(el, attributeListener);
		removedDisposal = canDomMutate.onNodeDisconnected(el, function() {
			var doc = el.ownerDocument;
			var ownerNode = doc.contains ? doc : doc.documentElement;
			if (!ownerNode || ownerNode.contains(el) === false) {
				tearItAllDown();
			}
		});
	},
	// ### bindings.behaviors.event
	// The following section contains code for implementing the can-EVENT attribute.
	// This binds on a wildcard attribute name. Whenever a view is being processed
	// and can-xxx (anything starting with can-), this callback will be run.  Inside, its setting up an event handler
	// that calls a method identified by the value of this attribute.
	event: function(el, data) {
		var eventBindingData;
		// Get the `event` name and if we are listening to the element or viewModel.
		// The attribute name is the name of the event.
		var attributeName = canAttributeEncoder.decode(data.attributeName),
			// the name of the event we are binding
			event,
			// the context to which we bind the event listener
			bindingContext,
			// if the bindingContext is null, then use this observable to watch for changes
			bindingContextObservable;

		// check for `on:event:value:to` type things and call data bindings
		if (attributeName.indexOf(toMatchStr + ":") !== -1 ||
			attributeName.indexOf(fromMatchStr + ":") !== -1 ||
			attributeName.indexOf(bindMatchStr + ":") !== -1
		) {
			return this.data(el, data);
		}

		if (startsWith.call(attributeName, onMatchStr)) {
			eventBindingData = getEventBindingData(attributeName, el, data.scope);
			event = eventBindingData.eventName;
			bindingContext = eventBindingData.bindingContext;
			bindingContextObservable = eventBindingData.bindingContextObservable;
			//!steal-remove-end
		} else {
			throw new Error("can-stache-bindings - unsupported event bindings " + attributeName);
		}

		// This is the method that the event will initially trigger. It will look up the method by the string name
		// passed in the attribute and call it.
		var handler = function(ev) {
			var attrVal = el.getAttribute(canAttributeEncoder.encode(attributeName));
			if (!attrVal) {
				return;
			}

			var viewModel = el[viewModelSymbol];

			// expression.parse will read the attribute
			// value and parse it identically to how mustache helpers
			// get parsed.
			var expr = expression_1.parse(attrVal, {
				lookupRule: function() {
					return expression_1.Lookup;
				},
				methodRule: "call"
			});

			var runScope = makeScopeFromEvent(el, ev, viewModel, arguments, data, bindingContext);

			if (expr instanceof expression_1.Hashes) {
				var hashExprs = expr.hashExprs;
				var key = Object.keys(hashExprs)[0];
				var value = expr.hashExprs[key].value(runScope);
				var isObservableValue = canReflect.isObservableLike(value) && canReflect.isValueLike(value);
				runScope.set(key, isObservableValue ? canReflect.getValue(value) : value);
			} else if (expr instanceof expression_1.Call) {
				runEventCallback(el, ev, data, runScope, expr);
			} else {
				throw new Error("can-stache-bindings: Event bindings must be a call expression. Make sure you have a () in " + data.attributeName + "=" + JSON.stringify(attrVal));
			}
		};

		var attributesDisposal,
			removalDisposal,
			removeObservation,
			currentContext;

		// Unbind the event when the attribute is removed from the DOM
		var attributesHandler = function(ev) {
			var isEventAttribute = ev.attributeName === attributeName;
			var isRemoved = !el.getAttribute(attributeName);
			var isEventAttributeRemoved = isEventAttribute && isRemoved;
			if (isEventAttributeRemoved) {
				unbindEvent();
			}
		};
		var removalHandler = function() {
			var doc = el.ownerDocument;
			var ownerNode = doc.contains ? doc : doc.documentElement;
			if (!ownerNode || !ownerNode.contains(el)) {
				unbindEvent();
			}
		};
		var unbindEvent = function() {
			if (bindingContext) {
				map.off.call(bindingContext, event, handler);
			}
			if (attributesDisposal) {
				attributesDisposal();
				attributesDisposal = undefined;
			}
			if (removalDisposal) {
				removalDisposal();
				removalDisposal = undefined;
			}
			if (removeObservation) {
				removeObservation();
				removeObservation = undefined;
			}
		};

		function updateListener(newVal, oldVal) {
			if (oldVal) {
				map.off.call(oldVal, event, handler);
			}
			if (newVal) {
				map.on.call(newVal, event, handler);
				currentContext = newVal;
			}
		}

		// Bind the handler defined above to the element we're currently processing and the event name provided in this
		// attribute name (can-click="foo")
		attributesDisposal = canDomMutate.onNodeAttributeChange(el, attributesHandler);
		removalDisposal = canDomMutate.onNodeDisconnected(el, removalHandler);
		if (!bindingContext && bindingContextObservable) {
			// on value changes of the observation, rebind the listener to the new context
			removeObservation = function () {
				if (currentContext) {
					map.off.call(currentContext, event, handler);
				}
				canReflect.offValue(bindingContextObservable, updateListener);
			};
			canReflect.onValue(bindingContextObservable, updateListener);
		} else {
			try {
				map.on.call(bindingContext, event, handler);
			} catch (error) {
				if (/Unable to bind/.test(error.message)) {
					var msg = 'can-stache-bindings - Unable to bind "' + event + '"';
					msg += ': "' + event  + '" is a property on a plain object "';
					msg += JSON.stringify(bindingContext);
					msg += '". Binding is available with observable objects only.';
					msg += ' For more details check https://canjs.com/doc/can-stache-bindings.html#Callafunctionwhenaneventhappensonavalueinthescope_animation_';
					throw new Error(msg);
				} else {
					throw error;
				}
			}
		}
	}
};


// ## Attribute Syntaxes
// The following sets up the bindings functions to be called
// when called in a template.


// value:to="bar" data bindings
// these are separate so that they only capture at the end
// to avoid (toggle)="bar" which is encoded as :lp:toggle:rp:="bar"
bindings.set(/[\w\.:]+:to$/, behaviors.data);
bindings.set(/[\w\.:]+:from$/, behaviors.data);
bindings.set(/[\w\.:]+:bind$/, behaviors.data);
bindings.set(/[\w\.:]+:raw$/, behaviors.data);
// value:to:on:input="bar" data bindings
bindings.set(/[\w\.:]+:to:on:[\w\.:]+/, behaviors.data);
bindings.set(/[\w\.:]+:from:on:[\w\.:]+/, behaviors.data);
bindings.set(/[\w\.:]+:bind:on:[\w\.:]+/, behaviors.data);


// `(EVENT)` event bindings.
bindings.set(/on:[\w\.:]+/, behaviors.event);

// ## getObservableFrom
// An object of helper functions that make a getter/setter observable
// on different types of objects.
var getObservableFrom = {
	// ### getObservableFrom.viewModelOrAttribute
	viewModelOrAttribute: function(bindingData, bindingContext) {
		var viewModel = bindingContext.element[viewModelSymbol];

		// if we have a viewModel, use it; otherwise, setup attribute binding
		if (viewModel) {
			return this.viewModel.apply(this, arguments);
		} else {
			return this.attribute.apply(this, arguments);
		}
	},
	// ### getObservableFrom.scope
	// Returns a compute from the scope.  This handles expressions like `someMethod(.,1)`.
	scope: function(bindingData, bindingContext) {
		var scope = bindingContext.scope,
			scopeProp = bindingData.name,
			mustBeGettable = bindingData.exports;

		if (!scopeProp) {
			return new canSimpleObservable();
		} else {
			// Check if we need to spend time building a scope-key-data
			// If we have a '(', it likely means a call expression.
			if (mustBeGettable || scopeProp.indexOf("(") >= 0 || scopeProp.indexOf("=") >= 0) {
				var parentExpression = expression_1.parse(scopeProp,{baseMethodType: "Call"});

				if (parentExpression instanceof expression_1.Hashes) {
					return new canSimpleObservable(function () {
						var hashExprs = parentExpression.hashExprs;
						var key = Object.keys(hashExprs)[0];
						var value = parentExpression.hashExprs[key].value(scope);
						var isObservableValue = canReflect.isObservableLike(value) && canReflect.isValueLike(value);
						scope.set(key, isObservableValue ? canReflect.getValue(value) : value);
					});
				} else {
					return parentExpression.value(scope);
				}
			} else {
				var observation = {};
				canReflect.assignSymbols(observation, {
					"can.getValue": function getValue() {},

					"can.valueHasDependencies": function hasValueDependencies() {
						return false;
					},

					"can.setValue": function setValue(newVal) {
						var expr = expression_1.parse(cleanVMName(scopeProp),{baseMethodType: "Call"});
						var value = expr.value(scope);
						canReflect.setValue(value, newVal);
					},

					// Register what the custom observation changes
					"can.getWhatIChange": function getWhatIChange() {
						var data = scope.getDataForScopeSet(cleanVMName(scopeProp));
						var m = new Map();
						var s = new Set();
						s.add(data.key);
						m.set(data.parent, s);

						return {
							mutate: {
								keyDependencies: m
							}
						};
					},

					"can.getName": function getName() {
						//!steal-remove-end
					},
				});

				var data = scope.getDataForScopeSet(cleanVMName(scopeProp));
				if (data.parent && data.key) {
					// Register what changes the Scope's parent key
					canReflectDependencies.addMutatedBy(data.parent, data.key, observation);
				}

				return observation;
			}
		}
	},
	// ### getObservableFrom.viewModel
	// Returns a compute that's two-way bound to the `viewModel` returned by
	// `options.bindingSettings()`.
	// Arguments:
	// - bindingData - {source, name, setCompute}
	// - bindingContext - {scope, element}
	// - bindingSettings - {getViewModel}
	viewModel: function(bindingData, bindingContext) {
		bindingContext.scope;
			var vmName = bindingData.name,
			setCompute = bindingData.setCompute;

		var setName = cleanVMName(vmName);
		var isBoundToContext = vmName === "." || vmName === "this";
		var keysToRead = isBoundToContext ? [] : canStacheKey.reads(vmName);

		function getViewModelProperty() {
			var viewModel = bindingContext.viewModel;
			return canStacheKey.read(viewModel, keysToRead, {}).value;
		}
		//!steal-remove-end

		var observation = new setter(
			getViewModelProperty,

			function setViewModelProperty(newVal) {
				var viewModel = bindingContext.viewModel;

				if (setCompute) {
					// If there is a binding like `foo:from="~bar"`, we need
					// to set the observable itself.
					var oldValue = canReflect.getKeyValue(viewModel, setName);
					if (canReflect.isObservableLike(oldValue)) {
						canReflect.setValue(oldValue, newVal);
					} else {
						canReflect.setKeyValue(
							viewModel,
							setName,
							new canSimpleObservable(canReflect.getValue(newVal))
						);
					}
				} else {
					if (isBoundToContext) {
						canReflect.setValue(viewModel, newVal);
					} else {
						canStacheKey.write(viewModel, keysToRead, newVal);
					}
				}
			}
		);
		//!steal-remove-end

		return observation;
	},
	// ### getObservableFrom.attribute
	// Returns a compute that is two-way bound to an attribute or property on the element.
	attribute: function(bindingData, bindingContext ) {

		if(bindingData.name === "this") {
			return canReflect.assignSymbols({}, {
				"can.getValue": function() {
					return bindingContext.element;
				},

				"can.valueHasDependencies": function() {
					return false;
				},
				"can.getName": function getName() {
					//!steal-remove-start
					return "<"+bindingContext.element.nodeName+">";
					//!steal-remove-end
				}
			});
		} else {
			return new canAttributeObservable(bindingContext.element, bindingData.name, {}, bindingData.event);
		}

	}
};

var startsWith = String.prototype.startsWith || function(text){
	return this.indexOf(text) === 0;
};

// Gets an event name in the after part.
function getEventName(result) {
	if (result.special.on !== undefined) {
		return result.tokens[result.special.on + 1];
	}
}

var siblingBindingRules = {
	to: {
		child: {
			exports: true,
			syncSibling: false
		},
		parent: {
			exports: false,
			syncSibling: false
		}
	},
	from: {
		child: {
			exports: false,
			syncSibling: false
		},
		parent: {
			exports: true,
			syncSibling: false
		}
	},
	bind: {
		child: {
			exports: true,
			syncSibling: false
		},
		parent: {
			exports: true,
			syncSibling: true
		}
	},
	raw: {
		child: {
			exports: false,
			syncSibling: false
		},
		parent: {
			exports: true,
			syncSibling: false
		}
	}
};
var bindingNames = [];
var special = {
	vm: true,
	on: true
};
canReflect.eachKey(siblingBindingRules, function(value, key) {
	bindingNames.push(key);
	special[key] = true;
});

// "on:click:value:to" //-> {tokens: [...], special: {on: 0, to: 3}}
function tokenize(source) {
	var splitByColon = source.split(":");
	// combine tokens that are not to, from, vm,
	var result = {
		tokens: [],
		special: {}
	};
	splitByColon.forEach(function(token) {
		if (special[token]) {
			result.special[token] = result.tokens.push(token) - 1;
		} else {
			result.tokens.push(token);
		}
	});

	return result;
}

// ## getChildBindingStr
var getChildBindingStr = function(tokens, favorViewModel) {
	if (tokens.indexOf('vm') >= 0) {
		return viewModelBindingStr;
	} else if (tokens.indexOf('el') >= 0) {
		return attributeBindingStr;
	} else {
		return favorViewModel ? viewModelBindingStr : viewModelOrAttributeBindingStr;
	}
};

// ## getSiblingBindingData
// Returns information about the binding read from an attribute node.
// Arguments:
// - node - An attribute node like: `{name, value}`
// - bindingSettings - Optional.  Has {favorViewModel: Boolean}
// Returns an object with:
// - `parent` - {source, name, event, exports, syncSibling}
// - `child` - {source, name, event, exports, syncSibling, setCompute}
// - `bindingAttributeName` - debugging name.
// - `initializeValues` - should parent and child be initialized to their counterpart.
//
// `parent` and `child` properties:
//
// - `source` - where is the value read from: "scope", "attribute", "viewModel".
// - `name` - the name of the property that should be read
// - `event` - an optional event name to listen to
// - `exports` - if the value is exported to its sibling
// - `syncSibling` - if the value is sticky. When this value is updated, should the value be checked after
//   and its sibling be updated immediately.
// - `setCompute` - set the value to a compute.
function getSiblingBindingData(node, bindingSettings) {

	var siblingBindingData,
		attributeName = canAttributeEncoder.decode(node.name),
		attributeValue = node.value || "";

	var result = tokenize(attributeName),
		dataBindingName,
		specialIndex;

	// check if there's a match of a binding name with at least a value before it
	bindingNames.forEach(function(name) {
		if (result.special[name] !== undefined && result.special[name] > 0) {
			dataBindingName = name;
			specialIndex = result.special[name];
			return false;
		}
	});

	if (dataBindingName) {
		var childEventName = getEventName(result);

		var initializeValues = childEventName && dataBindingName !== "bind" ? false : true;
		siblingBindingData = {
			parent: canAssign({
				source: scopeBindingStr,
				name: result.special.raw ? ('"' + attributeValue + '"') : attributeValue
			}, siblingBindingRules[dataBindingName].parent),
			child: canAssign({
				source: getChildBindingStr(result.tokens, bindingSettings && bindingSettings.favorViewModel),
				name: result.tokens[specialIndex - 1],
				event: childEventName
			}, siblingBindingRules[dataBindingName].child),
			bindingAttributeName: attributeName,
			initializeValues: initializeValues
		};
		if (attributeValue.trim().charAt(0) === "~") {
			siblingBindingData.child.setCompute = true;
		}
		return siblingBindingData;
	}
}



// ## makeDataBinding
// Makes a data binding for an attribute `node`.  Returns an object with information
// about the binding, including an `onTeardown` method that undoes the binding.
// If the data binding involves a `viewModel`, an `onCompleteBinding` method is returned on
// the object.  This method must be called after the element has a `viewModel` with the
// `viewModel` to complete the binding.
//
// Arguments:
// - `node` - an attribute node or an object with a `name` and `value` property.
// - `bindingContext` - The stache context  `{scope, element, parentNodeList}`
// - `bindingSettings` - Settings to control the behavior.
//   - `getViewModel`  - a function that returns the `viewModel` when called.  This function can be passed around (not called) even if the
//      `viewModel` doesn't exist yet.
//   - `attributeViewModelBindings` - properties already specified as being a viewModel<->attribute (as opposed to viewModel<->scope) binding.
//   - `favorViewModel`
//   - `alreadyUpdatedChild`
// Returns:
// - `undefined` - If this isn't a data binding.
// - `object` - An object with information about the binding:
//   - siblingBindingData: the binding behavior
//   - binding: canBinding
var makeDataBinding = function(node, bindingContext, bindingSettings) {
	// Get information about the binding.
	var siblingBindingData = getSiblingBindingData( node, bindingSettings );
	if (!siblingBindingData) {
		return;
	}

	// Get computes for the parent and child binding
	var parentObservable = getObservableFrom[siblingBindingData.parent.source](
		siblingBindingData.parent,
		bindingContext, bindingSettings
	),
	childObservable = getObservableFrom[siblingBindingData.child.source](
		siblingBindingData.child,
		bindingContext, bindingSettings,
		parentObservable
	);

	var childToParent = !!siblingBindingData.child.exports;
	var parentToChild = !!siblingBindingData.parent.exports;
	//!steal-remove-end

	var bindingOptions = {
		child: childObservable,
		childToParent: childToParent,
		// allow cycles if one directional
		cycles: childToParent === true && parentToChild === true ? 0 : 100,
		onInitDoNotUpdateChild: bindingSettings.alreadyUpdatedChild || siblingBindingData.initializeValues === false,
		onInitDoNotUpdateParent: siblingBindingData.initializeValues === false,
		onInitSetUndefinedParentIfChildIsDefined: true,
		parent: parentObservable,
		parentToChild: parentToChild,
		priority: bindingContext.parentNodeList ? bindingContext.parentNodeList.nesting + 1 : undefined,
		queue: "dom",
		sticky: siblingBindingData.parent.syncSibling ? "childSticksToParent" : undefined,
		element: bindingContext.element
	};
	//!steal-remove-end

	// Create the binding
	var canBinding = new canBind(bindingOptions);

	return {
		siblingBindingData: siblingBindingData,
		binding: canBinding
	};
};

var cleanVMName = function(name, scope) {
	//!steal-remove-end
	return name.replace(/@/g, "");
};

var canStacheBindings = {
	behaviors: behaviors,
	getSiblingBindingData: getSiblingBindingData,
	bindings: bindings,
	getObservableFrom: getObservableFrom,
	makeDataBinding: makeDataBinding
};

canStacheBindings[canSymbol.for("can.callbackMap")] = bindings;

var canStacheBindings_1 = canStacheBindings;

function upperCase(string){
  return string.toUpperCase();
}

var i_0 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	upperCase: upperCase
});

const foo = "world";

var i_1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': foo
});

window.IMPORT_MODULE = "module imported";

canStache.addBindings(canStacheBindings_1);
          var renderer = canStache([{"tokenType":"start","args":["can-import",true,1]},{"tokenType":"attrStart","args":["from",1]},{"tokenType":"attrValue","args":["./import",1]},{"tokenType":"attrEnd","args":["from",1]},{"tokenType":"end","args":["can-import",true,1]},{"tokenType":"chars","args":["\n",1]},{"tokenType":"start","args":["can-import",true,2]},{"tokenType":"attrStart","args":["from",2]},{"tokenType":"attrValue","args":["./upperCase",2]},{"tokenType":"attrEnd","args":["from",2]},{"tokenType":"attrStart","args":["module.upper:u:case:to",2]},{"tokenType":"attrValue","args":["upper",2]},{"tokenType":"attrEnd","args":["module.upper:u:case:to",2]},{"tokenType":"end","args":["can-import",true,2]},{"tokenType":"chars","args":["\n",2]},{"tokenType":"start","args":["can-import",true,3]},{"tokenType":"attrStart","args":["from",3]},{"tokenType":"attrValue","args":["./foo",3]},{"tokenType":"attrEnd","args":["from",3]},{"tokenType":"attrStart","args":["module.default:to",3]},{"tokenType":"attrValue","args":["world",3]},{"tokenType":"attrEnd","args":["module.default:to",3]},{"tokenType":"end","args":["can-import",true,3]},{"tokenType":"chars","args":["\n",3]},{"tokenType":"start","args":["can-import",true,4]},{"tokenType":"attrStart","args":["from",4]},{"tokenType":"attrValue","args":["./foo",4]},{"tokenType":"attrEnd","args":["from",4]},{"tokenType":"attrStart","args":["module.default:to",4]},{"tokenType":"attrValue","args":["bar",4]},{"tokenType":"attrEnd","args":["module.default:to",4]},{"tokenType":"end","args":["can-import",true,4]},{"tokenType":"special","args":["upper(\"hello\")",4]},{"tokenType":"chars","args":[" ",4]},{"tokenType":"special","args":["world",4]},{"tokenType":"chars","args":["\n\n",4]},{"tokenType":"done","args":[6]}]);

          

          function template (scope, options, nodeList) {
            if (!(scope instanceof canViewScope)) {
              scope = new canViewScope(scope);
            }
            var variableScope = scope.getScope(function (s) {
              return s._meta.variable === true
            });
            if (!variableScope) {
              scope = scope.addLetContext();
              variableScope = scope;
            }
            var moduleOptions = Object.assign({}, options);
            Object.assign(variableScope._context, {
              module: null,
              tagImportMap: {"./upperCase": i_0,"./foo": i_1}
            });

            return renderer(scope, moduleOptions, nodeList);
          }

window.IMPORT_MODULE += " before render view";
document.querySelector('#test').appendChild(template());
