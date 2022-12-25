"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.rules = undefined;

const _importAlias = require("./rules/import-alias");

const ImportAliasRule = _interopRequireWildcard(_importAlias);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    const newObj = {};
    if (obj != null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

const rules = (exports.rules = {
  "import-alias": ImportAliasRule,
});
