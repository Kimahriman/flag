/// <reference types="react" />
import { AnyAction, Reducer } from "redux";
import { Computable } from "deep-computed";
import { ProviderProps } from "./create-flags";
declare type SetFlagsAction<T> = {
    type: `@@FLAG/SET_FLAGS`;
    payload: Computable<Partial<T>>;
};
export declare type CreateReduxBindings<T> = {
    setFlagsAction(payload: Computable<Partial<T>>): SetFlagsAction<T>;
    createFlagsReducer(initialFlags: Computable<T>): Reducer<Computable<T>, AnyAction>;
    ConnectedFlagsProvider: React.ComponentType<{}>;
};
export declare function createReduxBindings<T>(FlagsProvider: React.ComponentType<ProviderProps<T>>): CreateReduxBindings<T>;
export default createReduxBindings;