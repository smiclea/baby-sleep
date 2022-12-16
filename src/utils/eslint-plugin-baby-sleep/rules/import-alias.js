'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meta = undefined;
exports.create = create;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meta = exports.meta = {
  docs: {
    description: 'Restrict imports to path aliases or relative imports limited by a depth',
    category: 'Possible Errors',
    recommended: true
  },
  fixable: 'code',
  schema: [{
    type: 'object',
    properties: {
      rootDir: { type: 'string' },
      relativeDepth: { type: 'number' },
      aliases: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            alias: { type: 'string' },
            matcher: { type: 'string' }
          },
          required: ['alias', 'matcher']
        }
      }
    }
  }]
};

var RELATIVE_MATCHER = /^(?:\.{1,2}\/)+/;
// eslint-disable-next-line no-undef
var CWD = process.cwd();

/**
 * @param {string} matchedPath
 */
function getDepthCount(matchedPath) {
  return matchedPath.split('/').reduce(function (depth, segment) {
    return segment === '..' ? depth + 1 : depth;
  }, 0);
}

/**
 * @param {string} win32OrPosixPath
 */
function normalizeToPosixPath(win32OrPosixPath) {
  if (_path2.default.sep === '/') {
    // Paths are already posix-style paths, no need to fix
    return win32OrPosixPath;
  }
  return win32OrPosixPath.split(_path2.default.sep).join('/');
}

function create(context) {
  var _ref = context.options[0] || {},
      _ref$relativeDepth = _ref.relativeDepth,
      relativeDepth = _ref$relativeDepth === undefined ? -1 : _ref$relativeDepth,
      _ref$aliases = _ref.aliases,
      _aliases = _ref$aliases === undefined ? [] : _ref$aliases,
      _ref$rootDir = _ref.rootDir,
      rootDir = _ref$rootDir === undefined ? CWD : _ref$rootDir;

  var aliases = _aliases.map(function (item) {
    return Object.assign({}, item, {
      matcher: new RegExp(item.matcher)
    });
  });

  return {
    ImportDeclaration: function ImportDeclaration(node) {
      /** @type {string} */
      var importValue = node.source.value;
      var matches = importValue.match(RELATIVE_MATCHER);

      if (matches) {
        var depth = getDepthCount(matches[0]);

        if (depth > relativeDepth) {
          context.report({
            node: node,
            message: relativeDepth === -1 ? 'Import path mush be a path alias' : 'import statement must be an alias or no more than ' + relativeDepth + ' levels deep',
            fix: function fix(fixer) {
              var parsedPath = _path2.default.parse(context.getFilename());
              var importPath = _path2.default.relative(rootDir, _path2.default.resolve(parsedPath.dir, importValue));

              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = aliases[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var item = _step.value;

                  var match = importPath.match(item.matcher);

                  if (match) {
                    var matchingString = match[match.length - 1];
                    var index = match[0].indexOf(matchingString);
                    var result = normalizeToPosixPath(importPath.slice(0, index) + item.alias + importPath.slice(index + matchingString.length));

                    return fixer.replaceTextRange([node.source.range[0] + 1, node.source.range[1] - 1], result);
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }
          });
        }
      }
    }
  };
}