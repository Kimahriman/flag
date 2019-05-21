"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var merge_1 = __importDefault(require("lodash/merge"));
var react_redux_1 = require("react-redux");
var utils_1 = require("./utils");
var MERGE_FLAGS_ACTION_TYPE = "@@FLAG/SET_FLAGS";
function isSetFlagsAction(obj) {
    return (utils_1.isObject(obj) &&
        obj.type === MERGE_FLAGS_ACTION_TYPE &&
        utils_1.isObject(obj.payload));
}
var mapStateToProps = function (state) { return ({
    flags: state.flags
}); };
function createReduxBindings(FlagsProvider) {
    function setFlagsAction(payload) {
        return {
            type: MERGE_FLAGS_ACTION_TYPE,
            payload: payload
        };
    }
    function createFlagsReducer(initialFlags) {
        return function (state, action) {
            if (state === void 0) { state = initialFlags; }
            if (isSetFlagsAction(action)) {
                return merge_1.default({}, state, action.payload);
            }
            else {
                return state;
            }
        };
    }
    var ConnectedFlagsProvider = react_redux_1.connect(mapStateToProps, null)(FlagsProvider);
    return {
        setFlagsAction: setFlagsAction,
        createFlagsReducer: createFlagsReducer,
        ConnectedFlagsProvider: ConnectedFlagsProvider
    };
}
exports.createReduxBindings = createReduxBindings;
exports.default = createReduxBindings;
