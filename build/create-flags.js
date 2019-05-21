"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var deep_computed_1 = require("deep-computed");
var utils_1 = require("./utils");
function createFlags() {
    var Context = react_1.default.createContext(null);
    Context.displayName = "Flag";
    var FlagsProvider = function (_a) {
        var flags = _a.flags, children = _a.children;
        var value = react_1.useMemo(function () { return deep_computed_1.deepComputed(flags); }, [flags]);
        return (react_1.default.createElement(Context.Provider, { value: value }, children));
    };
    var useFlags = function () { return react_1.useContext(Context); };
    var useFlag = function (keyPath) {
        var flags = useFlags();
        var result = flags;
        for (var _i = 0, _a = keyPath; _i < _a.length; _i++) {
            var next = _a[_i];
            /**
             * This trap is unreachable in TypeScript.
             */
            if (utils_1.isObject(result) && !(next in result)) {
                return undefined;
            }
            result = result[next];
        }
        return result;
    };
    function Flag(props) {
        var flags = react_1.useContext(Context);
        var flag = useFlag(props.name);
        var isEnabled = Boolean(flag);
        if (isEnabled && "children" in props) {
            return props.children;
        }
        if (isEnabled && "render" in props) {
            return props.render(flags);
        }
        if (isEnabled && "component" in props) {
            var Component = props.component;
            return react_1.default.createElement(Component, { flags: flags });
        }
        if (!isEnabled && "fallbackRender" in props && props.fallbackRender) {
            return props.fallbackRender(flags);
        }
        if (!isEnabled && "fallbackComponent" in props && props.fallbackComponent) {
            var Component = props.fallbackComponent;
            return react_1.default.createElement(Component, { flags: flags });
        }
        return null;
    }
    return {
        FlagsProvider: FlagsProvider,
        Flag: Flag,
        useFlag: useFlag,
        useFlags: useFlags
    };
}
exports.createFlags = createFlags;
exports.default = createFlags;