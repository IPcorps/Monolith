var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","socket.io","./wsUpd"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.create=void 0;const o=__importDefault(e("socket.io")),r=__importDefault(e("./wsUpd"));t.create=function(e){const t=new o.default.Server(e);return t.on("connection",(e=>r.default(t,e))),t}}));